import test from "node:test";
import assert from "node:assert/strict";

import {
  buildAgentInputFromCase2Dataset,
  buildCase2AgentBundle,
  buildCase2OutputBundle,
  buildCase2RestaurantDataset,
} from "./index.ts";

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
  assert.equal(firstRow.reconciliation.deltaRating.status, "approximate_match");
  assert.equal(
    firstRow.reconciliation.varOrdenesPct.status,
    "approximate_match",
  );
  assert.equal(firstRow.reconciliation.tolerances.deltaRating, 0.05);
  assert.equal(firstRow.reconciliation.tolerances.varOrdenesPct, 0.5);
  assert.ok(
    !firstRow.flags.some((flag) => flag.code === "delta_rating_mismatch"),
    "Tolerance freeze should suppress minor delta mismatches.",
  );
});

test("derives reference_date from the dataset instead of the system clock", () => {
  const dataset = buildCase2RestaurantDataset();
  const latestRestaurant = dataset.rows.find(
    (row) => row.restaurantId === "R0060",
  );

  assert.equal(dataset.summary.referenceDate, "2027-11-01");
  assert.equal(dataset.summary.referenceDateUsed, "2027-11-01");
  assert.equal(dataset.summary.referenceDateSource, "max_active_since");
  assert.equal(dataset.metadata.referenceDateUsed, "2027-11-01");
  assert.match(
    dataset.summary.referenceDateInterpretation,
    /dataset internal cutoff date/i,
  );
  assert.ok(latestRestaurant);
  assert.equal(latestRestaurant.metrics.ageDaysRecalc, 0);
});

test("builds benchmark peer groups with fallback metadata and aggregate outputs", () => {
  const dataset = buildCase2RestaurantDataset();
  const row = dataset.rows.find(
    (candidate) => candidate.restaurantId === "R0001",
  );
  const kamAggregate = dataset.aggregates.kams.find(
    (aggregate) => aggregate.key === "Isabella Moreno",
  );

  assert.ok(row?.benchmark);
  assert.ok(row.benchmark.peerCount >= 5);
  assert.ok(["reliable", "caution"].includes(row.benchmark.reliability));
  assert.equal(dataset.aggregates.restaurants.length, 200);
  assert.ok(kamAggregate);
  assert.ok(kamAggregate.rowCount > 0);
  assert.equal(dataset.summary.deltaRatingMismatchCount, 10);
  assert.equal(dataset.summary.varOrdenesPctMismatchCount, 22);
  assert.equal(dataset.summary.benchmarkFallbackCount, 76);
  assert.equal(dataset.summary.benchmarkReliableCount, 170);
  assert.equal(dataset.summary.benchmarkCautionCount, 30);
  assert.equal(dataset.summary.rowsWithFlags, 115);
});

test("separates flags by category and exposes mismatch category reporting", () => {
  const dataset = buildCase2RestaurantDataset();
  const fallbackRow = dataset.rows.find((row) => row.restaurantId === "R0005");

  assert.ok(fallbackRow);
  assert.ok(
    fallbackRow.flagsByCategory.benchmark_coverage.some(
      (flag) => flag.code === "benchmark_fallback_applied",
    ),
  );
  assert.equal(
    dataset.summary.mismatchSummary.deltaRating.rounding_or_precision,
    0,
  );
  assert.equal(
    dataset.summary.mismatchSummary.deltaRating.materially_different_formula,
    7,
  );
  assert.equal(
    dataset.summary.mismatchSummary.deltaRating.outlier_original_derived,
    3,
  );
  assert.equal(
    dataset.summary.mismatchSummary.varOrdenesPct.rounding_or_precision,
    0,
  );
  assert.equal(
    dataset.summary.mismatchSummary.varOrdenesPct.materially_different_formula,
    21,
  );
  assert.equal(
    dataset.summary.mismatchSummary.varOrdenesPct.outlier_original_derived,
    1,
  );
});

test("maps the processed dataset into the agent input contract without inventing extra metrics", () => {
  const dataset = buildCase2RestaurantDataset();
  const input = buildAgentInputFromCase2Dataset(
    dataset,
    "2026-04-13T12:00:00.000Z",
  );
  const firstRestaurant = input.restaurants.find(
    (restaurant) => restaurant.restaurantId === "R0001",
  );

  assert.equal(input.restaurants.length, dataset.rows.length);
  assert.ok(input.kams);
  assert.ok(input.kams.length > 0);
  assert.equal(input.generatedAt, "2026-04-13T12:00:00.000Z");
  assert.ok(firstRestaurant);
  assert.equal(firstRestaurant.deltaRatingRecalc, 0.2);
  assert.equal(firstRestaurant.varOrdenesPctRecalc, 5.52);
  assert.equal(firstRestaurant.gmvProxy7d, 97157.88);
  assert.equal(firstRestaurant.kamId, "Isabella Moreno");
  assert.equal(
    firstRestaurant.benchmark?.candidates[0]?.sampleSize,
    dataset.rows.find((row) => row.restaurantId === "R0001")?.benchmark
      ?.peerCount,
  );
  assert.equal(firstRestaurant.benchmark?.validatedRiskLabel, null);
});

test("builds the full Case 2 bundle and runs the official agent on the real dataset", () => {
  const bundle = buildCase2AgentBundle({
    generatedAt: "2026-04-13T12:00:00.000Z",
  });

  assert.equal(bundle.input.restaurants.length, 200);
  assert.equal(bundle.result.restaurants.length, 200);
  assert.equal(bundle.result.summary.totalRestaurants, 200);
  assert.ok(bundle.result.kams.length > 0);
  assert.ok(bundle.result.alerts.length > 0);
  assert.ok(
    bundle.result.validationOverlays.some(
      (overlay) => overlay.degradedByValidation,
    ),
  );
  assert.ok(
    bundle.result.restaurants.some(
      (restaurant) => restaurant.benchmark?.peerGroupUsed,
    ),
  );
});

test("builds the official Chat 07 output bundle with stable consolidated sections", () => {
  const output = buildCase2OutputBundle({
    generatedAt: "2026-04-13T12:00:00.000Z",
  });

  assert.equal(output.metadata.contractVersion, "case2-output-v1");
  assert.equal(output.metadata.generatedAt, "2026-04-13T12:00:00.000Z");
  assert.equal(output.metadata.source.sheetName, "Caso2_Restaurantes");
  assert.equal(output.restaurants.length, 200);
  assert.ok(output.kams.length > 0);
  assert.ok(output.alerts.length > 0);
  assert.equal(output.validation.summary.totalRows, 200);
  assert.equal(output.validation.overlays.length, output.restaurants.length);
  assert.equal(
    output.benchmark.reliablePeerCount + output.benchmark.cautionPeerCount,
    200,
  );
  assert.equal(output.global.dashboard.totalRestaurants, 200);
});

test("keeps the official Chat 07 output independent from demo snapshot fields", () => {
  const output = buildCase2OutputBundle();

  assert.equal("scenario" in output, false);
  assert.equal("topKpis" in output, false);
  assert.equal("agentDigest" in output, false);
  assert.equal(Array.isArray(output.restaurants), true);
  assert.equal(Array.isArray(output.alerts), true);
});
