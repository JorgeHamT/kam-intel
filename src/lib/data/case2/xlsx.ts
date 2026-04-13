import { inflateRawSync } from "node:zlib";
import { readFileSync } from "node:fs";

import type { ParsedWorksheet, ParsedWorksheetRow } from "./types.ts";

type ZipEntry = {
  fileName: string;
  compressionMethod: number;
  compressedSize: number;
  uncompressedSize: number;
  localHeaderOffset: number;
};

const EOCD_SIGNATURE = 0x06054b50;
const CENTRAL_DIRECTORY_SIGNATURE = 0x02014b50;
const LOCAL_FILE_SIGNATURE = 0x04034b50;
const XML_NS_REGEX = /xmlns(:\w+)?="[^"]*"/g;

function findEndOfCentralDirectory(buffer: Buffer): number {
  const minOffset = Math.max(0, buffer.length - 65557);
  for (let offset = buffer.length - 22; offset >= minOffset; offset -= 1) {
    if (buffer.readUInt32LE(offset) === EOCD_SIGNATURE) {
      return offset;
    }
  }

  throw new Error("Invalid XLSX file: end of central directory not found.");
}

function readZipEntries(buffer: Buffer): Map<string, ZipEntry> {
  const eocdOffset = findEndOfCentralDirectory(buffer);
  const totalEntries = buffer.readUInt16LE(eocdOffset + 10);
  const centralDirectoryOffset = buffer.readUInt32LE(eocdOffset + 16);
  const entries = new Map<string, ZipEntry>();

  let offset = centralDirectoryOffset;

  for (let index = 0; index < totalEntries; index += 1) {
    if (buffer.readUInt32LE(offset) !== CENTRAL_DIRECTORY_SIGNATURE) {
      throw new Error("Invalid XLSX file: malformed central directory.");
    }

    const compressionMethod = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const uncompressedSize = buffer.readUInt32LE(offset + 24);
    const fileNameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localHeaderOffset = buffer.readUInt32LE(offset + 42);
    const fileName = buffer
      .subarray(offset + 46, offset + 46 + fileNameLength)
      .toString("utf8");

    entries.set(fileName, {
      fileName,
      compressionMethod,
      compressedSize,
      uncompressedSize,
      localHeaderOffset,
    });

    offset += 46 + fileNameLength + extraLength + commentLength;
  }

  return entries;
}

function readZipEntry(buffer: Buffer, entry: ZipEntry): string {
  const localOffset = entry.localHeaderOffset;
  if (buffer.readUInt32LE(localOffset) !== LOCAL_FILE_SIGNATURE) {
    throw new Error(
      `Invalid XLSX file: malformed local header for ${entry.fileName}.`,
    );
  }

  const fileNameLength = buffer.readUInt16LE(localOffset + 26);
  const extraLength = buffer.readUInt16LE(localOffset + 28);
  const dataOffset = localOffset + 30 + fileNameLength + extraLength;
  const compressed = buffer.subarray(
    dataOffset,
    dataOffset + entry.compressedSize,
  );

  if (entry.compressionMethod === 0) {
    return compressed.toString("utf8");
  }

  if (entry.compressionMethod === 8) {
    return inflateRawSync(compressed).toString("utf8");
  }

  throw new Error(
    `Unsupported ZIP compression method ${entry.compressionMethod}.`,
  );
}

function decodeXmlText(input: string): string {
  return input
    .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function stripXmlNamespaces(xml: string): string {
  return xml.replace(XML_NS_REGEX, "");
}

function getAttributeValue(tag: string, attributeName: string): string | null {
  const match = tag.match(new RegExp(`${attributeName}="([^"]*)"`, "i"));
  return match ? decodeXmlText(match[1]) : null;
}

function parseSharedStrings(xml: string): string[] {
  const cleanXml = stripXmlNamespaces(xml);
  const items = cleanXml.match(/<si\b[\s\S]*?<\/si>/g) ?? [];

  return items.map((item) => {
    const textMatches = item.match(/<t\b[^>]*>[\s\S]*?<\/t>/g) ?? [];
    return textMatches
      .map((textTag) => decodeXmlText(textTag.replace(/<\/?t\b[^>]*>/g, "")))
      .join("");
  });
}

function parseRelationships(xml: string): Map<string, string> {
  const cleanXml = stripXmlNamespaces(xml);
  const relationships = new Map<string, string>();
  const tags = cleanXml.match(/<Relationship\b[^>]*\/>/g) ?? [];

  for (const tag of tags) {
    const id = getAttributeValue(tag, "Id");
    const target = getAttributeValue(tag, "Target");

    if (id && target) {
      relationships.set(id, target);
    }
  }

  return relationships;
}

function parseWorkbookSheets(
  xml: string,
): Array<{ name: string; relationshipId: string }> {
  const cleanXml = stripXmlNamespaces(xml);
  const tags = cleanXml.match(/<sheet\b[^>]*\/>/g) ?? [];

  return tags
    .map((tag) => {
      const name = getAttributeValue(tag, "name");
      const relationshipId = getAttributeValue(tag, "r:id");
      return name && relationshipId ? { name, relationshipId } : null;
    })
    .filter(
      (value): value is { name: string; relationshipId: string } =>
        value !== null,
    );
}

function columnLettersToIndex(reference: string): number {
  const letters = reference.replace(/[0-9]/g, "");
  let index = 0;

  for (const letter of letters) {
    index = index * 26 + (letter.toUpperCase().charCodeAt(0) - 64);
  }

  return index - 1;
}

function parseCellValue(
  cellXml: string,
  sharedStrings: string[],
): string | number | null {
  const cellTag = cellXml.match(/^<c\b[^>]*>/)?.[0] ?? "<c>";
  const cellType = getAttributeValue(cellTag, "t");
  const valueMatch = cellXml.match(/<v>([\s\S]*?)<\/v>/);

  if (cellType === "inlineStr") {
    const inlineText = cellXml.match(/<t\b[^>]*>([\s\S]*?)<\/t>/);
    return inlineText ? decodeXmlText(inlineText[1]) : null;
  }

  if (!valueMatch) {
    return null;
  }

  const rawValue = decodeXmlText(valueMatch[1]);

  if (cellType === "s") {
    return sharedStrings[Number(rawValue)] ?? null;
  }

  if (cellType === "str") {
    return rawValue;
  }

  const maybeNumber = Number(rawValue);
  return Number.isNaN(maybeNumber) ? rawValue : maybeNumber;
}

function parseWorksheetXml(
  xml: string,
  sharedStrings: string[],
): Array<{ rowNumber: number; values: Map<number, string | number | null> }> {
  const cleanXml = stripXmlNamespaces(xml);
  const rowMatches = cleanXml.match(/<row\b[\s\S]*?<\/row>/g) ?? [];

  return rowMatches.map((rowXml) => {
    const rowTag = rowXml.match(/^<row\b[^>]*>/)?.[0] ?? "<row>";
    const rowNumber = Number(getAttributeValue(rowTag, "r") ?? "0");
    const cellMatches = rowXml.match(/<c\b[\s\S]*?<\/c>|<c\b[^>]*\/>/g) ?? [];
    const values = new Map<number, string | number | null>();

    for (const cellXml of cellMatches) {
      const cellTag = cellXml.match(/^<c\b[^>]*>/)?.[0] ?? "<c>";
      const reference = getAttributeValue(cellTag, "r");

      if (!reference) {
        continue;
      }

      values.set(
        columnLettersToIndex(reference),
        parseCellValue(cellXml, sharedStrings),
      );
    }

    return { rowNumber, values };
  });
}

function identifyHeaderRow(
  rows: Array<{
    rowNumber: number;
    values: Map<number, string | number | null>;
  }>,
): {
  headerRowNumber: number;
  headers: string[];
  startIndex: number;
} {
  for (const row of rows) {
    const orderedValues = [...row.values.entries()]
      .sort(([left], [right]) => left - right)
      .map(([, value]) => (typeof value === "string" ? value.trim() : value));

    const allStrings = orderedValues.every(
      (value) => typeof value === "string",
    );
    const hasRestaurantId = orderedValues.includes("restaurant_id");
    const hasRisk = orderedValues.includes("semaforo_riesgo");

    if (allStrings && hasRestaurantId && hasRisk) {
      const firstIndex =
        [...row.values.keys()].sort((left, right) => left - right)[0] ?? 0;
      return {
        headerRowNumber: row.rowNumber,
        headers: orderedValues as string[],
        startIndex: firstIndex,
      };
    }
  }

  throw new Error("Unable to identify the header row in worksheet.");
}

function buildWorksheetRows(
  rows: Array<{
    rowNumber: number;
    values: Map<number, string | number | null>;
  }>,
  headerRowNumber: number,
  headers: string[],
  startIndex: number,
): ParsedWorksheetRow[] {
  return rows
    .filter((row) => row.rowNumber > headerRowNumber)
    .map((row) => {
      const record: ParsedWorksheetRow = {};
      let hasValue = false;

      headers.forEach((header, offset) => {
        const value = row.values.get(startIndex + offset) ?? null;
        record[header] = value;
        hasValue = hasValue || value !== null;
      });

      return hasValue ? record : null;
    })
    .filter((row): row is ParsedWorksheetRow => row !== null);
}

export function readWorksheetFromWorkbook(
  workbookPath: string,
  sheetName: string,
): ParsedWorksheet {
  const buffer = readFileSync(workbookPath);
  const entries = readZipEntries(buffer);
  const workbookXml = readZipEntry(
    buffer,
    entries.get("xl/workbook.xml") ??
      (() => {
        throw new Error("Workbook definition not found.");
      })(),
  );
  const workbookRelsXml = readZipEntry(
    buffer,
    entries.get("xl/_rels/workbook.xml.rels") ??
      (() => {
        throw new Error("Workbook relationships not found.");
      })(),
  );

  const sharedStringsEntry = entries.get("xl/sharedStrings.xml");
  const sharedStrings = sharedStringsEntry
    ? parseSharedStrings(readZipEntry(buffer, sharedStringsEntry))
    : [];
  const relationships = parseRelationships(workbookRelsXml);
  const workbookSheets = parseWorkbookSheets(workbookXml);
  const selectedSheet = workbookSheets.find(
    (sheet) => sheet.name === sheetName,
  );

  if (!selectedSheet) {
    throw new Error(`Worksheet "${sheetName}" not found in workbook.`);
  }

  const target = relationships.get(selectedSheet.relationshipId);
  if (!target) {
    throw new Error(
      `Relationship "${selectedSheet.relationshipId}" not found for worksheet.`,
    );
  }

  const worksheetPath = `xl/${target.replace(/^\/+/, "")}`;
  const worksheetEntry = entries.get(worksheetPath);

  if (!worksheetEntry) {
    throw new Error(`Worksheet XML "${worksheetPath}" not found in workbook.`);
  }

  const worksheetXml = readZipEntry(buffer, worksheetEntry);
  const parsedRows = parseWorksheetXml(worksheetXml, sharedStrings);
  const { headerRowNumber, headers, startIndex } =
    identifyHeaderRow(parsedRows);
  const titleRow = parsedRows.find(
    (row) => row.rowNumber === headerRowNumber - 1,
  );
  const title = titleRow
    ? [...titleRow.values.values()].find(
        (value) => typeof value === "string" && value.trim().length > 0,
      )
    : null;

  return {
    sheetName,
    title: typeof title === "string" ? title.trim() : null,
    headerRowNumber,
    rows: buildWorksheetRows(parsedRows, headerRowNumber, headers, startIndex),
  };
}
