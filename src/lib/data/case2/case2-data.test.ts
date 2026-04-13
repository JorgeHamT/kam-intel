import test from "node:test";
import assert from "node:assert/strict";

import { buildCase2RestaurantDataset } from "./index.ts";

test("reads the official Caso2_Restaurantes worksheet from the XLSX workbook", () => {
  const dataset = buildCase2RestaurantDataset();

  assert.equal(dataset.metadata.sheetName, "Caso2_Restaurantes");
  assert.equal(dataset.metadata.headerRowNumber, 2);
  assert.equal(dataset.summary.totalRows, 200);
  assert.equal(dataset.metadata.totalSourceRows, 200);
  assert.equal(
    dataset.rows[0].raw.restaurant_id,
    "R0001",
    "The original Excel value must be preserved.",
  );
});

test("recalculates official metrics and preserves original values side by side", () => {
  const dataset = buildCase2RestaurantDataset();
  const firstRow = dataset.rows.find((row) => row.restaurantId === "R0001");

  assert.ok(firstRow);
  assert.equal(firstRow.raw.delta_rating, 0.17);
  assert.equal(firstRow.metrics.deltaRatingRecalc, 0.2);
  assert.equal(firstRow.raw.var_ordenes_pct, 5.5);
  assert.equal(firstRow.metrics.varOrdenesPctRecalc, 5.52);
  assert.equal(firstRow.metrics.gmvProxy7d, 97157.88);
  assert.ok(
    firstRow.flags.some((flag) => flag.code === "delta_rating_mismatch"),
    "Differences between original and recalculated metrics should be flagged.",
  );
});

test("derives reference_date from the dataset instead of the system clock", () => {
  const dataset = buildCase2RestaurantDataset();
  const latestRestaurant = dataset.rows.find((row) => row.restaurantId === "R0060");

  assert.equal(dataset.summary.referenceDate, "2027-11-01");
  assert.equal(dataset.summary.referenceDateSource, "max_active_since");
  assert.ok(latestRestaurant);
  assert.equal(latestRestaurant.metrics.ageDaysRecalc, 0);
});

test("builds benchmark peer groups with fallback metadata and aggregate outputs", () => {
  const dataset = buildCase2RestaurantDataset();
  const row = dataset.rows.find((candidate) => candidate.restaurantId === "R0001");
  const kamAggregate = dataset.aggregates.kams.find(
    (aggregate) => aggregate.key === "Isabella Moreno",
  );

  assert.ok(row?.benchmark);
  assert.ok(row.benchmark.peerCount >= 5);
  assert.ok(["reliable", "caution"].includes(row.benchmark.reliability));
  assert.equal(dataset.aggregates.restaurants.length, 200);
  assert.ok(kamAggregate);
  assert.ok(kamAggregate.rowCount > 0);
});
