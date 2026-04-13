import path from "node:path";

import { runAgent, type AgentConfig } from "../../agent/index.ts";
import { readWorksheetFromWorkbook } from "./xlsx.ts";
import { buildAgentInputFromCase2Dataset } from "./agent-input.ts";
import {
  CASE2_SOURCE_COLUMNS,
  type Case2AggregateBase,
  type Case2Aggregates,
  type Case2BuildOptions,
  type Case2BenchmarkMetricComparison,
  type Case2BenchmarkMetricKey,
  type Case2BenchmarkMetricSummary,
  type Case2BenchmarkResult,
  type Case2DatasetResult,
  type Case2FlagCategory,
  type Case2FlagSeverity,
  type Case2InternalField,
  type Case2MismatchCategory,
  type Case2NamedAggregate,
  type Case2ParsedRow,
  type Case2QualityFlag,
  type Case2QualityFlagCode,
  type Case2RawRow,
  type ParsedWorksheetRow,
  type PeerGroupReliability,
  type PeerGroupType,
  type RiskTrafficLightNormalized,
} from "./types.ts";
import type { AgentInput } from "../../agent/contracts/agent-input.ts";
import type { AgentResult } from "../../agent/contracts/agent-output.ts";

export * from "./types.ts";
export * from "./agent-input.ts";
export * from "./output.ts";
export * from "./adapters/index.ts";

export type Case2AgentBundleOptions = Case2BuildOptions & {
  agentConfigOverrides?: Partial<AgentConfig>;
  generatedAt?: string;
};

export type Case2AgentBundle = {
  dataset: Case2DatasetResult;
  input: AgentInput;
  result: AgentResult;
};

const DEFAULT_WORKBOOK_PATH = path.join(
  process.cwd(),
  "data",
  "Rappi_AI_Builder_Challenge_Dataset.xlsx",
);
const DEFAULT_SHEET_NAME = "Caso2_Restaurantes";
const DELTA_RATING_TOLERANCE = 0.05;
const VAR_ORDENES_PCT_TOLERANCE = 0.5;
const REFERENCE_DATE_INTERPRETATION =
  "ageDaysRecalc is computed against the dataset internal cutoff date, not the system clock. This dataset is interpreted as an operational snapshot with a future/internal reference date.";

const BENCHMARK_METRICS: Case2BenchmarkMetricKey[] = [
  "currentRating",
  "deltaRatingRecalc",
  "cancellationRatePct",
  "avgDeliveryTimeMin",
  "orders7d",
  "varOrdenesPctRecalc",
  "complaints7d",
  "npsScore",
  "gmvProxy7d",
];

const FLAG_CODES: Case2QualityFlagCode[] = [
  "missing_required_value",
  "invalid_number",
  "invalid_integer",
  "out_of_range",
  "invalid_date",
  "duplicate_restaurant_id",
  "delta_rating_mismatch",
  "var_ordenes_pct_mismatch",
  "var_ordenes_pct_requires_fallback",
  "risk_label_unrecognized",
  "benchmark_fallback_applied",
  "benchmark_group_small",
];

function toTrimmedString(value: string | number | null): string {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function parseNumber(value: string | number | null): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  const normalized = value.replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseInteger(value: string | number | null): number | null {
  const parsed = parseNumber(value);
  return parsed === null ? null : Math.trunc(parsed);
}

function roundTo(value: number | null, decimals = 2): number | null {
  if (value === null || !Number.isFinite(value)) {
    return null;
  }

  const multiplier = 10 ** decimals;
  return Math.round(value * multiplier) / multiplier;
}

function parseIsoDate(value: string | number | null): string | null {
  const trimmed = toTrimmedString(value);
  if (!trimmed) {
    return null;
  }

  const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }

  const candidate = new Date(`${trimmed}T00:00:00Z`);
  return Number.isNaN(candidate.getTime()) ? null : trimmed;
}

function daysBetween(startDateIso: string, endDateIso: string): number {
  const start = new Date(`${startDateIso}T00:00:00Z`);
  const end = new Date(`${endDateIso}T00:00:00Z`);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.round((end.getTime() - start.getTime()) / millisecondsPerDay);
}

function average(values: Array<number | null>): number | null {
  const filtered = values.filter((value): value is number => value !== null);
  if (!filtered.length) {
    return null;
  }

  return roundTo(
    filtered.reduce((sum, value) => sum + value, 0) / filtered.length,
  );
}

function median(values: Array<number | null>): number | null {
  const filtered = values
    .filter((value): value is number => value !== null)
    .sort((a, b) => a - b);
  if (!filtered.length) {
    return null;
  }

  const midpoint = Math.floor(filtered.length / 2);
  if (filtered.length % 2 === 0) {
    return roundTo((filtered[midpoint - 1] + filtered[midpoint]) / 2);
  }

  return roundTo(filtered[midpoint]);
}

function numericSummary(
  values: Array<number | null>,
): Case2BenchmarkMetricSummary {
  const filtered = values
    .filter((value): value is number => value !== null)
    .sort((a, b) => a - b);
  return {
    count: filtered.length,
    mean: average(filtered),
    median: median(filtered),
    min: filtered.length ? roundTo(filtered[0]) : null,
    max: filtered.length ? roundTo(filtered[filtered.length - 1]) : null,
  };
}

function emptyFlagCounts(): Record<Case2QualityFlagCode, number> {
  return Object.fromEntries(FLAG_CODES.map((code) => [code, 0])) as Record<
    Case2QualityFlagCode,
    number
  >;
}

function emptyRiskDistribution(): Record<RiskTrafficLightNormalized, number> {
  return {
    stable: 0,
    at_risk: 0,
    critical: 0,
    unknown: 0,
  };
}

function emptyFlagCountsByCategory(): Record<Case2FlagCategory, number> {
  return {
    reconciliation: 0,
    benchmark_coverage: 0,
    temporal_date: 0,
    validation_range: 0,
  };
}

function emptyMismatchCounts(): Record<Case2MismatchCategory, number> {
  return {
    rounding_or_precision: 0,
    materially_different_formula: 0,
    percentage_convention: 0,
    outlier_original_derived: 0,
    not_applicable: 0,
  };
}

function pushFlag(
  flags: Case2QualityFlag[],
  code: Case2QualityFlagCode,
  category: Case2FlagCategory,
  severity: Case2FlagSeverity,
  message: string,
  field?: Case2QualityFlag["field"],
): void {
  flags.push({ code, category, severity, message, field });
}

function buildFlagsByCategory(
  flags: Case2QualityFlag[],
): Record<Case2FlagCategory, Case2QualityFlag[]> {
  return {
    reconciliation: flags.filter((flag) => flag.category === "reconciliation"),
    benchmark_coverage: flags.filter(
      (flag) => flag.category === "benchmark_coverage",
    ),
    temporal_date: flags.filter((flag) => flag.category === "temporal_date"),
    validation_range: flags.filter(
      (flag) => flag.category === "validation_range",
    ),
  };
}

function getReconciliationStatus(
  originalValue: number | null,
  recalculatedValue: number | null,
  tolerance: number,
): "exact_match" | "approximate_match" | "mismatch" | "not_applicable" {
  if (originalValue === null || recalculatedValue === null) {
    return "not_applicable";
  }

  const difference = Math.abs(originalValue - recalculatedValue);
  if (difference === 0) {
    return "exact_match";
  }

  if (difference <= tolerance) {
    return "approximate_match";
  }

  return "mismatch";
}

function classifyDeltaMismatch(
  originalValue: number | null,
  recalculatedValue: number | null,
): Case2MismatchCategory {
  const difference =
    originalValue !== null && recalculatedValue !== null
      ? Math.abs(originalValue - recalculatedValue)
      : null;

  if (difference === null || difference <= DELTA_RATING_TOLERANCE) {
    return "not_applicable";
  }

  if (difference >= 0.1) {
    return "outlier_original_derived";
  }

  if (difference > 0.05) {
    return "materially_different_formula";
  }

  return "rounding_or_precision";
}

function classifyVarOrdenesPctMismatch(
  row: Pick<
    Case2ParsedRow,
    "orders7d" | "orders7dPrevious" | "ordersVariancePctOriginal" | "metrics"
  >,
): Case2MismatchCategory {
  const originalValue = row.ordersVariancePctOriginal;
  const recalculatedValue = row.metrics.varOrdenesPctRecalc;
  const difference =
    originalValue !== null && recalculatedValue !== null
      ? Math.abs(originalValue - recalculatedValue)
      : null;

  if (difference === null || difference <= VAR_ORDENES_PCT_TOLERANCE) {
    return "not_applicable";
  }

  if (row.orders7dPrevious === 0) {
    return "percentage_convention";
  }

  if (
    originalValue !== null &&
    recalculatedValue !== null &&
    Math.sign(originalValue) !== Math.sign(recalculatedValue)
  ) {
    return "percentage_convention";
  }

  if (difference > 2) {
    return "outlier_original_derived";
  }

  if (difference > 0.5) {
    return "materially_different_formula";
  }

  return "rounding_or_precision";
}

function normalizeRiskLabel(value: string): RiskTrafficLightNormalized {
  const normalized = value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

  if (normalized.includes("estable")) {
    return "stable";
  }

  if (normalized.includes("riesgo")) {
    return "at_risk";
  }

  if (normalized.includes("critico")) {
    return "critical";
  }

  return "unknown";
}

function validateRange(
  flags: Case2QualityFlag[],
  field: Case2InternalField,
  value: number | null,
  min: number,
  max: number,
): void {
  if (value === null) {
    return;
  }

  if (value < min || value > max) {
    pushFlag(
      flags,
      "out_of_range",
      "validation_range",
      "error",
      `${field} is outside the expected range.`,
      field,
    );
  }
}

function validateInteger(
  flags: Case2QualityFlag[],
  field: Case2InternalField,
  originalValue: string | number | null,
): void {
  const parsed = parseNumber(originalValue);
  if (parsed === null) {
    return;
  }

  if (!Number.isInteger(parsed)) {
    pushFlag(
      flags,
      "invalid_integer",
      "validation_range",
      "warning",
      `${field} should be an integer value.`,
      field,
    );
  }
}

function buildRawRow(source: ParsedWorksheetRow): Case2RawRow {
  return Object.fromEntries(
    CASE2_SOURCE_COLUMNS.map((column) => [column, source[column] ?? null]),
  ) as Case2RawRow;
}

function buildBaseRow(raw: Case2RawRow, rowNumber: number): Case2ParsedRow {
  const flags: Case2QualityFlag[] = [];

  const restaurantId = toTrimmedString(raw.restaurant_id);
  const restaurantName = toTrimmedString(raw.nombre);
  const city = toTrimmedString(raw.ciudad);
  const vertical = toTrimmedString(raw.vertical);
  const kamAssigned = toTrimmedString(raw.kam_asignado);
  const riskTrafficLightOriginal = toTrimmedString(raw.semaforo_riesgo);

  const currentRating = parseNumber(raw.rating_actual);
  const rating30dAvg = parseNumber(raw.rating_prom_30d);
  const deltaRatingOriginal = parseNumber(raw.delta_rating);
  const cancellationRatePct = parseNumber(raw.tasa_cancelacion_pct);
  const avgDeliveryTimeMin = parseNumber(raw.tiempo_entrega_avg_min);
  const orders7d = parseInteger(raw.ordenes_7d);
  const orders7dPrevious = parseInteger(raw.ordenes_7d_anterior);
  const ordersVariancePctOriginal = parseNumber(raw.var_ordenes_pct);
  const complaints7d = parseInteger(raw.quejas_7d);
  const npsScore = parseNumber(raw.nps_score);
  const avgTicketMxn = parseNumber(raw.valor_ticket_prom_mxn);
  const activeSince = parseIsoDate(raw.activo_desde);
  const riskTrafficLightNormalized = normalizeRiskLabel(
    riskTrafficLightOriginal,
  );
  const numericRawValues: Array<
    [Case2InternalField, string | number | null, number | null]
  > = [
    ["currentRating", raw.rating_actual, currentRating],
    ["rating30dAvg", raw.rating_prom_30d, rating30dAvg],
    ["deltaRatingOriginal", raw.delta_rating, deltaRatingOriginal],
    ["cancellationRatePct", raw.tasa_cancelacion_pct, cancellationRatePct],
    ["avgDeliveryTimeMin", raw.tiempo_entrega_avg_min, avgDeliveryTimeMin],
    ["orders7d", raw.ordenes_7d, orders7d],
    ["orders7dPrevious", raw.ordenes_7d_anterior, orders7dPrevious],
    [
      "ordersVariancePctOriginal",
      raw.var_ordenes_pct,
      ordersVariancePctOriginal,
    ],
    ["complaints7d", raw.quejas_7d, complaints7d],
    ["npsScore", raw.nps_score, npsScore],
    ["avgTicketMxn", raw.valor_ticket_prom_mxn, avgTicketMxn],
  ];

  const requiredStrings: Array<[Case2InternalField, string]> = [
    ["restaurantId", restaurantId],
    ["restaurantName", restaurantName],
    ["city", city],
    ["vertical", vertical],
    ["kamAssigned", kamAssigned],
  ];

  for (const [field, value] of requiredStrings) {
    if (!value) {
      pushFlag(
        flags,
        "missing_required_value",
        "validation_range",
        "error",
        `${field} is required.`,
        field,
      );
    }
  }

  const requiredNumbers: Array<[Case2InternalField, number | null]> = [
    ["currentRating", currentRating],
    ["rating30dAvg", rating30dAvg],
    ["cancellationRatePct", cancellationRatePct],
    ["avgDeliveryTimeMin", avgDeliveryTimeMin],
    ["orders7d", orders7d],
    ["orders7dPrevious", orders7dPrevious],
    ["complaints7d", complaints7d],
    ["npsScore", npsScore],
    ["avgTicketMxn", avgTicketMxn],
  ];

  for (const [field, value] of requiredNumbers) {
    if (value === null) {
      pushFlag(
        flags,
        "missing_required_value",
        "validation_range",
        "error",
        `${field} is required.`,
        field,
      );
    }
  }

  for (const [field, rawValue, parsedValue] of numericRawValues) {
    if (toTrimmedString(rawValue) && parsedValue === null) {
      pushFlag(
        flags,
        "invalid_number",
        "validation_range",
        "error",
        `${field} must be numeric.`,
        field,
      );
    }
  }

  if (toTrimmedString(raw.activo_desde) && !activeSince) {
    pushFlag(
      flags,
      "invalid_date",
      "temporal_date",
      "error",
      "activeSince must be a valid ISO date.",
      "activeSince",
    );
  }

  if (riskTrafficLightOriginal && riskTrafficLightNormalized === "unknown") {
    pushFlag(
      flags,
      "risk_label_unrecognized",
      "validation_range",
      "warning",
      "riskTrafficLightOriginal could not be normalized.",
      "riskTrafficLightOriginal",
    );
  }

  validateInteger(flags, "orders7d", raw.ordenes_7d);
  validateInteger(flags, "orders7dPrevious", raw.ordenes_7d_anterior);
  validateInteger(flags, "complaints7d", raw.quejas_7d);

  validateRange(flags, "currentRating", currentRating, 0, 5);
  validateRange(flags, "rating30dAvg", rating30dAvg, 0, 5);
  validateRange(flags, "cancellationRatePct", cancellationRatePct, 0, 100);
  validateRange(flags, "avgDeliveryTimeMin", avgDeliveryTimeMin, 0, 240);
  validateRange(flags, "orders7d", orders7d, 0, 1_000_000);
  validateRange(flags, "orders7dPrevious", orders7dPrevious, 0, 1_000_000);
  validateRange(flags, "complaints7d", complaints7d, 0, 1_000_000);
  validateRange(flags, "npsScore", npsScore, -100, 100);
  validateRange(flags, "avgTicketMxn", avgTicketMxn, 0, 1_000_000);

  return {
    rowNumber,
    raw,
    restaurantId,
    restaurantName,
    city,
    vertical,
    currentRating,
    rating30dAvg,
    deltaRatingOriginal,
    cancellationRatePct,
    avgDeliveryTimeMin,
    orders7d,
    orders7dPrevious,
    ordersVariancePctOriginal,
    complaints7d,
    npsScore,
    avgTicketMxn,
    kamAssigned,
    activeSince,
    riskTrafficLightOriginal,
    riskTrafficLightNormalized,
    metrics: {
      deltaRatingRecalc: null,
      varOrdenesPctRecalc: null,
      ageDaysRecalc: null,
      gmvProxy7d: null,
    },
    flags,
    flagsByCategory: buildFlagsByCategory(flags),
    reconciliation: {
      tolerances: {
        deltaRating: DELTA_RATING_TOLERANCE,
        varOrdenesPct: VAR_ORDENES_PCT_TOLERANCE,
      },
      deltaRating: {
        difference: null,
        status: "not_applicable",
        category: "not_applicable",
      },
      varOrdenesPct: {
        difference: null,
        status: "not_applicable",
        category: "not_applicable",
      },
    },
    benchmark: null,
  };
}

function deriveReferenceDate(
  rows: Case2ParsedRow[],
  explicitReferenceDate?: string,
): {
  referenceDate: string;
  source: "option" | "max_active_since";
} {
  if (explicitReferenceDate) {
    return {
      referenceDate: explicitReferenceDate,
      source: "option",
    };
  }

  const validDates = rows
    .map((row) => row.activeSince)
    .filter((value): value is string => value !== null)
    .sort();

  if (!validDates.length) {
    throw new Error(
      "Unable to derive a reference date because activo_desde is missing.",
    );
  }

  return {
    referenceDate: validDates[validDates.length - 1],
    source: "max_active_since",
  };
}

function applyRecalculations(
  rows: Case2ParsedRow[],
  referenceDate: string,
): void {
  for (const row of rows) {
    row.metrics.deltaRatingRecalc =
      row.currentRating !== null && row.rating30dAvg !== null
        ? roundTo(row.currentRating - row.rating30dAvg)
        : null;

    if (row.orders7dPrevious === null || row.orders7d === null) {
      row.metrics.varOrdenesPctRecalc = null;
    } else if (row.orders7dPrevious === 0) {
      row.metrics.varOrdenesPctRecalc = row.orders7d === 0 ? 0 : null;
      if (row.orders7d > 0) {
        pushFlag(
          row.flags,
          "var_ordenes_pct_requires_fallback",
          "reconciliation",
          "warning",
          "orders variance cannot be recalculated with a zero previous baseline.",
          "ordersVariancePctOriginal",
        );
      }
    } else {
      row.metrics.varOrdenesPctRecalc = roundTo(
        ((row.orders7d - row.orders7dPrevious) / row.orders7dPrevious) * 100,
      );
    }

    row.metrics.ageDaysRecalc =
      row.activeSince !== null
        ? daysBetween(row.activeSince, referenceDate)
        : null;
    row.metrics.gmvProxy7d =
      row.orders7d !== null && row.avgTicketMxn !== null
        ? roundTo(row.orders7d * row.avgTicketMxn)
        : null;

    row.reconciliation.deltaRating.difference =
      row.deltaRatingOriginal !== null && row.metrics.deltaRatingRecalc !== null
        ? roundTo(
            Math.abs(row.deltaRatingOriginal - row.metrics.deltaRatingRecalc),
            4,
          )
        : null;
    row.reconciliation.deltaRating.status = getReconciliationStatus(
      row.deltaRatingOriginal,
      row.metrics.deltaRatingRecalc,
      DELTA_RATING_TOLERANCE,
    );
    row.reconciliation.deltaRating.category = classifyDeltaMismatch(
      row.deltaRatingOriginal,
      row.metrics.deltaRatingRecalc,
    );

    row.reconciliation.varOrdenesPct.difference =
      row.ordersVariancePctOriginal !== null &&
      row.metrics.varOrdenesPctRecalc !== null
        ? roundTo(
            Math.abs(
              row.ordersVariancePctOriginal - row.metrics.varOrdenesPctRecalc,
            ),
            4,
          )
        : null;
    row.reconciliation.varOrdenesPct.status = getReconciliationStatus(
      row.ordersVariancePctOriginal,
      row.metrics.varOrdenesPctRecalc,
      VAR_ORDENES_PCT_TOLERANCE,
    );
    row.reconciliation.varOrdenesPct.category =
      classifyVarOrdenesPctMismatch(row);

    if (row.reconciliation.deltaRating.status === "mismatch") {
      pushFlag(
        row.flags,
        "delta_rating_mismatch",
        "reconciliation",
        "warning",
        "Original delta_rating differs from the official recalculation.",
        "deltaRatingOriginal",
      );
    }

    if (row.reconciliation.varOrdenesPct.status === "mismatch") {
      pushFlag(
        row.flags,
        "var_ordenes_pct_mismatch",
        "reconciliation",
        "warning",
        "Original var_ordenes_pct differs from the official recalculation.",
        "ordersVariancePctOriginal",
      );
    }

    row.flagsByCategory = buildFlagsByCategory(row.flags);
  }
}

function addDuplicateFlags(rows: Case2ParsedRow[]): string[] {
  const seen = new Map<string, number>();
  const duplicates = new Set<string>();

  for (const row of rows) {
    if (!row.restaurantId) {
      continue;
    }

    const count = seen.get(row.restaurantId) ?? 0;
    seen.set(row.restaurantId, count + 1);
    if (count >= 1) {
      duplicates.add(row.restaurantId);
    }
  }

  for (const row of rows) {
    if (duplicates.has(row.restaurantId)) {
      pushFlag(
        row.flags,
        "duplicate_restaurant_id",
        "validation_range",
        "error",
        "restaurantId must be unique within the dataset.",
        "restaurantId",
      );
      row.flagsByCategory = buildFlagsByCategory(row.flags);
    }
  }

  return [...duplicates].sort();
}

function getMetricValue(
  row: Case2ParsedRow,
  metric: Case2BenchmarkMetricKey,
): number | null {
  switch (metric) {
    case "currentRating":
      return row.currentRating;
    case "deltaRatingRecalc":
      return row.metrics.deltaRatingRecalc;
    case "cancellationRatePct":
      return row.cancellationRatePct;
    case "avgDeliveryTimeMin":
      return row.avgDeliveryTimeMin;
    case "orders7d":
      return row.orders7d;
    case "varOrdenesPctRecalc":
      return row.metrics.varOrdenesPctRecalc;
    case "complaints7d":
      return row.complaints7d;
    case "npsScore":
      return row.npsScore;
    case "gmvProxy7d":
      return row.metrics.gmvProxy7d;
  }
}

function peerGroupLabel(type: PeerGroupType, row: Case2ParsedRow): string {
  switch (type) {
    case "city_vertical":
      return `${row.city}__${row.vertical}`;
    case "vertical":
      return row.vertical;
    case "city":
      return row.city;
    case "global":
      return "global";
  }
}

function buildBenchmark(
  rows: Case2ParsedRow[],
  row: Case2ParsedRow,
): Case2BenchmarkResult {
  const strategies: Array<{
    type: PeerGroupType;
    filter: (candidate: Case2ParsedRow) => boolean;
  }> = [
    {
      type: "city_vertical",
      filter: (candidate) =>
        candidate.city === row.city && candidate.vertical === row.vertical,
    },
    {
      type: "vertical",
      filter: (candidate) => candidate.vertical === row.vertical,
    },
    {
      type: "city",
      filter: (candidate) => candidate.city === row.city,
    },
    {
      type: "global",
      filter: () => true,
    },
  ];

  let selectedType: PeerGroupType = "global";
  let selectedRows: Case2ParsedRow[] = rows;
  let fallbackDepth = strategies.length - 1;

  for (let index = 0; index < strategies.length; index += 1) {
    const candidateRows = rows.filter(strategies[index].filter);
    if (candidateRows.length >= 8 || index === strategies.length - 1) {
      selectedType = strategies[index].type;
      selectedRows = candidateRows;
      fallbackDepth = index;
      break;
    }

    if (candidateRows.length >= 5) {
      selectedType = strategies[index].type;
      selectedRows = candidateRows;
      fallbackDepth = index;
      break;
    }
  }

  const peerCount = selectedRows.length;
  const reliability: PeerGroupReliability =
    peerCount >= 8 ? "reliable" : "caution";
  const metrics = Object.fromEntries(
    BENCHMARK_METRICS.map((metric) => [
      metric,
      numericSummary(
        selectedRows.map((candidate) => getMetricValue(candidate, metric)),
      ),
    ]),
  ) as Record<Case2BenchmarkMetricKey, Case2BenchmarkMetricSummary>;

  const comparisons = Object.fromEntries(
    BENCHMARK_METRICS.map((metric) => {
      const value = getMetricValue(row, metric);
      const summary = metrics[metric];
      const comparison: Case2BenchmarkMetricComparison = {
        value,
        deltaToMedian:
          value !== null && summary.median !== null
            ? roundTo(value - summary.median)
            : null,
        deltaToMean:
          value !== null && summary.mean !== null
            ? roundTo(value - summary.mean)
            : null,
      };
      return [metric, comparison];
    }),
  ) as Record<Case2BenchmarkMetricKey, Case2BenchmarkMetricComparison>;

  const riskLabelDistribution = emptyRiskDistribution();
  for (const candidate of selectedRows) {
    riskLabelDistribution[candidate.riskTrafficLightNormalized] += 1;
  }

  return {
    peerGroupType: selectedType,
    peerGroupKey: peerGroupLabel(selectedType, row),
    peerCount,
    reliability,
    fallbackDepth,
    metrics,
    comparisons,
    riskLabelDistribution,
  };
}

function attachBenchmarks(rows: Case2ParsedRow[]): void {
  for (const row of rows) {
    const benchmark = buildBenchmark(rows, row);
    row.benchmark = benchmark;

    if (benchmark.fallbackDepth > 0) {
      pushFlag(
        row.flags,
        "benchmark_fallback_applied",
        "benchmark_coverage",
        "info",
        `Benchmark peer group fell back to ${benchmark.peerGroupType}.`,
        "benchmark",
      );
    }

    if (benchmark.reliability === "caution") {
      pushFlag(
        row.flags,
        "benchmark_group_small",
        "benchmark_coverage",
        "info",
        "Benchmark peer group is usable with caution because peer count is below 8.",
        "benchmark",
      );
    }

    row.flagsByCategory = buildFlagsByCategory(row.flags);
  }
}

function aggregateGroup(
  rows: Case2ParsedRow[],
  key: string,
  name: string,
): Case2NamedAggregate {
  const flagCounts = emptyFlagCounts();
  const riskLabelDistribution = emptyRiskDistribution();

  for (const row of rows) {
    for (const flag of row.flags) {
      flagCounts[flag.code] += 1;
    }
    riskLabelDistribution[row.riskTrafficLightNormalized] += 1;
  }

  const base: Case2AggregateBase = {
    rowCount: rows.length,
    distinctRestaurants: new Set(rows.map((row) => row.restaurantId)).size,
    sums: {
      orders7d: rows.reduce((sum, row) => sum + (row.orders7d ?? 0), 0),
      orders7dPrevious: rows.reduce(
        (sum, row) => sum + (row.orders7dPrevious ?? 0),
        0,
      ),
      complaints7d: rows.reduce((sum, row) => sum + (row.complaints7d ?? 0), 0),
      gmvProxy7d:
        roundTo(
          rows.reduce((sum, row) => sum + (row.metrics.gmvProxy7d ?? 0), 0),
          2,
        ) ?? 0,
    },
    averages: {
      currentRating: average(rows.map((row) => row.currentRating)),
      rating30dAvg: average(rows.map((row) => row.rating30dAvg)),
      cancellationRatePct: average(rows.map((row) => row.cancellationRatePct)),
      avgDeliveryTimeMin: average(rows.map((row) => row.avgDeliveryTimeMin)),
      ordersVariancePctRecalc: average(
        rows.map((row) => row.metrics.varOrdenesPctRecalc),
      ),
      npsScore: average(rows.map((row) => row.npsScore)),
      avgTicketMxn: average(rows.map((row) => row.avgTicketMxn)),
      ageDaysRecalc: average(rows.map((row) => row.metrics.ageDaysRecalc)),
    },
    riskLabelDistribution,
    flagCounts,
  };

  return {
    key,
    name,
    ...base,
  };
}

function buildNamedAggregates(
  rows: Case2ParsedRow[],
  keySelector: (row: Case2ParsedRow) => string,
  nameSelector: (row: Case2ParsedRow) => string,
): Case2NamedAggregate[] {
  const grouped = new Map<string, Case2ParsedRow[]>();

  for (const row of rows) {
    const key = keySelector(row);
    const group = grouped.get(key) ?? [];
    group.push(row);
    grouped.set(key, group);
  }

  return [...grouped.entries()]
    .map(([key, groupRows]) =>
      aggregateGroup(groupRows, key, nameSelector(groupRows[0])),
    )
    .sort((left, right) => left.name.localeCompare(right.name));
}

function buildAggregates(rows: Case2ParsedRow[]): Case2Aggregates {
  return {
    restaurants: buildNamedAggregates(
      rows,
      (row) => row.restaurantId,
      (row) => row.restaurantName,
    ),
    kams: buildNamedAggregates(
      rows,
      (row) => row.kamAssigned,
      (row) => row.kamAssigned,
    ),
    cities: buildNamedAggregates(
      rows,
      (row) => row.city,
      (row) => row.city,
    ),
    verticals: buildNamedAggregates(
      rows,
      (row) => row.vertical,
      (row) => row.vertical,
    ),
  };
}

function buildSummary(
  rows: Case2ParsedRow[],
  duplicates: string[],
  referenceDate: string,
  referenceDateSource: "option" | "max_active_since",
  headerRowNumber: number,
  sourceSheetName: string,
): Case2DatasetResult["summary"] {
  const flagCounts = emptyFlagCounts();
  const flagCountsByCategory = emptyFlagCountsByCategory();
  const nullFieldCounts: Partial<Record<Case2InternalField, number>> = {};
  const deltaMismatchSummary = emptyMismatchCounts();
  const varMismatchSummary = emptyMismatchCounts();

  const nullableFields: Case2InternalField[] = [
    "currentRating",
    "rating30dAvg",
    "deltaRatingOriginal",
    "cancellationRatePct",
    "avgDeliveryTimeMin",
    "orders7d",
    "orders7dPrevious",
    "ordersVariancePctOriginal",
    "complaints7d",
    "npsScore",
    "avgTicketMxn",
    "activeSince",
  ];

  for (const row of rows) {
    for (const flag of row.flags) {
      flagCounts[flag.code] += 1;
      flagCountsByCategory[flag.category] += 1;
    }

    deltaMismatchSummary[row.reconciliation.deltaRating.category] += 1;
    varMismatchSummary[row.reconciliation.varOrdenesPct.category] += 1;

    for (const field of nullableFields) {
      const value = row[field];
      if (value === null) {
        nullFieldCounts[field] = (nullFieldCounts[field] ?? 0) + 1;
      }
    }
  }

  return {
    totalRows: rows.length,
    validRows: rows.filter(
      (row) => !row.flags.some((flag) => flag.severity === "error"),
    ).length,
    rowsWithFlags: rows.filter((row) => row.flags.length > 0).length,
    rowsWithErrors: rows.filter((row) =>
      row.flags.some((flag) => flag.severity === "error"),
    ).length,
    rowsUnchanged: rows.filter(
      (row) =>
        row.reconciliation.deltaRating.status === "exact_match" &&
        row.reconciliation.varOrdenesPct.status === "exact_match",
    ).length,
    rowsRecalculated: rows.filter(
      (row) =>
        row.metrics.deltaRatingRecalc !== null ||
        row.metrics.varOrdenesPctRecalc !== null ||
        row.metrics.ageDaysRecalc !== null ||
        row.metrics.gmvProxy7d !== null,
    ).length,
    duplicateRestaurantIds: duplicates,
    referenceDate,
    referenceDateUsed: referenceDate,
    referenceDateSource,
    referenceDateInterpretation: REFERENCE_DATE_INTERPRETATION,
    headerRowNumber,
    sourceSheetName,
    flagCounts,
    flagCountsByCategory,
    nullFieldCounts,
    deltaRatingMismatchCount: flagCounts.delta_rating_mismatch,
    varOrdenesPctMismatchCount: flagCounts.var_ordenes_pct_mismatch,
    benchmarkReliableCount: rows.filter(
      (row) => row.benchmark?.reliability === "reliable",
    ).length,
    benchmarkCautionCount: rows.filter(
      (row) => row.benchmark?.reliability === "caution",
    ).length,
    benchmarkFallbackCount: rows.filter(
      (row) => (row.benchmark?.fallbackDepth ?? 0) > 0,
    ).length,
    mismatchSummary: {
      deltaRating: deltaMismatchSummary,
      varOrdenesPct: varMismatchSummary,
    },
  };
}

export function buildCase2RestaurantDataset(
  options: Case2BuildOptions = {},
): Case2DatasetResult {
  const workbookPath = options.workbookPath ?? DEFAULT_WORKBOOK_PATH;
  const sheetName = options.sheetName ?? DEFAULT_SHEET_NAME;
  const worksheet = readWorksheetFromWorkbook(workbookPath, sheetName);

  const rows = worksheet.rows.map((sourceRow, index) =>
    buildBaseRow(buildRawRow(sourceRow), worksheet.headerRowNumber + index + 1),
  );
  const { referenceDate, source } = deriveReferenceDate(
    rows,
    options.referenceDate,
  );

  applyRecalculations(rows, referenceDate);
  const duplicates = addDuplicateFlags(rows);
  attachBenchmarks(rows);

  return {
    metadata: {
      sheetName: worksheet.sheetName,
      worksheetTitle: worksheet.title,
      headerRowNumber: worksheet.headerRowNumber,
      totalSourceRows: worksheet.rows.length,
      referenceDateUsed: referenceDate,
      referenceDateSource: source,
      referenceDateInterpretation: REFERENCE_DATE_INTERPRETATION,
    },
    summary: buildSummary(
      rows,
      duplicates,
      referenceDate,
      source,
      worksheet.headerRowNumber,
      worksheet.sheetName,
    ),
    rows,
    aggregates: buildAggregates(rows),
  };
}

export function buildCase2AgentBundle(
  options: Case2AgentBundleOptions = {},
): Case2AgentBundle {
  const dataset = buildCase2RestaurantDataset(options);
  const input = buildAgentInputFromCase2Dataset(dataset, options.generatedAt);
  const result = runAgent(input, options.agentConfigOverrides);

  return {
    dataset,
    input,
    result,
  };
}
