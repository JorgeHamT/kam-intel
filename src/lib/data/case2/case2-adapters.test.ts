import test from "node:test";
import assert from "node:assert/strict";

import { getScenarioProjectionMetadata } from "../../demo/kpi-contract.ts";

import { buildCase2OutputBundle } from "./output.ts";
import {
  createCase2AlertsFeedViewModel,
  createCase2DashboardViewModel,
  createCase2KamDetailViewModel,
  createCase2KamsListViewModel,
  createCase2RestaurantDetailViewModel,
  createCase2ValidationViewModel,
} from "./adapters/index.ts";

test("dashboard adapter builds a stable view model from the official Chat 07 output", () => {
  const output = buildCase2OutputBundle();
  const viewModel = createCase2DashboardViewModel(output);

  assert.equal(viewModel.summary.totalRestaurants, 200);
  assert.ok(viewModel.topPriorityRestaurants.length > 0);
  assert.ok(viewModel.kamsUnderPressure.length > 0);
  assert.equal(viewModel.semantics.isGloballyComparable, true);
  assert.equal(viewModel.semantics.visibleStatusSource, "agent_status");
  assert.equal(
    viewModel.globalStatus.portfolioStatus,
    output.global.portfolio.portfolioStatus,
  );
  assert.equal(viewModel.alerts.activeKind, "global_comparable");
  assert.equal("scenario" in viewModel, false);
  assert.equal("topKpis" in viewModel, false);
});

test("dashboard adapter uses visible classification counts for Diego-focus consistency", () => {
  const output = buildCase2OutputBundle();
  const viewModel = createCase2DashboardViewModel(output);

  assert.equal(viewModel.summary.criticalCount, output.global.dashboard.criticalCount);
  assert.equal(viewModel.summary.atRiskCount, output.global.dashboard.atRiskCount);
  assert.equal(viewModel.summary.watchlistCount, output.global.dashboard.watchlistCount);
  assert.equal(viewModel.summary.stableCount, output.global.dashboard.stableCount);
  assert.equal(
    viewModel.summary.criticalCount +
      viewModel.summary.atRiskCount +
      viewModel.summary.watchlistCount +
      viewModel.summary.stableCount,
    viewModel.summary.totalRestaurants,
  );
});

test("dashboard adapter keeps comparable scenarios on global comparable semantics", () => {
  const output = buildCase2OutputBundle();
  const scenarioOutput = {
    ...output,
    metadata: {
      ...output.metadata,
      projection: getScenarioProjectionMetadata("crisis"),
    },
  };
  const viewModel = createCase2DashboardViewModel(scenarioOutput);

  assert.equal(viewModel.semantics.scenarioKind, "global_comparable");
  assert.equal(viewModel.semantics.universeKind, "full_case");
  assert.equal(viewModel.semantics.isGloballyComparable, true);
  assert.equal(viewModel.semantics.visibleStatusSource, "agent_status");
  assert.equal(
    viewModel.summary.totalRestaurants,
    scenarioOutput.global.dashboard.totalRestaurants,
  );
  assert.equal(viewModel.alerts.activeKind, "global_comparable");
  assert.equal(viewModel.spotlight.mode, "global_overview");
});

test("dashboard adapter exposes benchmark-projected semantics for dataset original", () => {
  const output = buildCase2OutputBundle();
  const scenarioOutput = {
    ...output,
    metadata: {
      ...output.metadata,
      projection: getScenarioProjectionMetadata("dataset-original"),
    },
  };
  const viewModel = createCase2DashboardViewModel(scenarioOutput);

  assert.equal(viewModel.semantics.scenarioKind, "global_comparable");
  assert.equal(viewModel.semantics.universeKind, "full_case");
  assert.equal(viewModel.semantics.isGloballyComparable, true);
  assert.equal(viewModel.semantics.visibleStatusSource, "benchmark_status");
  assert.equal(viewModel.globalStatus.isComparable, true);
  assert.equal(viewModel.alerts.activeKind, "global_comparable");
  assert.equal(viewModel.spotlight.mode, "global_overview");
  assert.equal(
    viewModel.spotlight.restaurant?.restaurantId,
    viewModel.topPriorityRestaurants[0]?.restaurantId,
  );
});

test("dashboard adapter preserves scenario-provided restaurant ordering for spotlight", () => {
  const output = buildCase2OutputBundle();
  const reorderedOutput = {
    ...output,
    restaurants: [...output.restaurants].reverse(),
  };
  const viewModel = createCase2DashboardViewModel(reorderedOutput);

  assert.equal(
    viewModel.topPriorityRestaurants[0]?.restaurantId,
    reorderedOutput.restaurants[0]?.restaurantId,
  );
  assert.equal(
    viewModel.spotlight.restaurant?.restaurantId,
    reorderedOutput.restaurants[0]?.restaurantId,
  );
});

test("kams adapter builds cards and ranking without depending on demo mocks", () => {
  const output = buildCase2OutputBundle();
  const viewModel = createCase2KamsListViewModel(output);
  const revenueValues = new Set(
    viewModel.cards.map((card) => card.metrics.revenueAtRiskMxn),
  );

  assert.ok(viewModel.summary.totalKams > 0);
  assert.equal(viewModel.cards.length, output.kams.length);
  assert.equal(viewModel.ranking.length, output.kams.length);
  assert.ok(revenueValues.size > 1);
  assert.ok(
    viewModel.cards.some(
      (card) => card.metrics.healthScore > 0 && card.metrics.healthScore < 100,
    ),
  );
  assert.equal("agentDigest" in viewModel, false);
});

test("kams adapter uses the visible classification breakdown for Diego Vargas", () => {
  const output = buildCase2OutputBundle();
  const viewModel = createCase2KamsListViewModel(output);
  const diego = viewModel.cards.find((card) => card.kam.kamName === "Diego Vargas");

  assert.ok(diego);
  assert.deepEqual(diego.metrics.portfolioMix, {
    criticalCount: 7,
    atRiskCount: 9,
    stableCount: 6,
    totalCount: 22,
  });
  assert.equal(diego.metrics.pressurePct, 72.7);
  assert.equal(diego.metrics.healthScore, 47.7);
  assert.equal(diego.metrics.alertCount, 16);
});

test("kam detail adapter resolves a real KAM detail view model", () => {
  const output = buildCase2OutputBundle();
  const kamId = output.kams[0]?.kamId;

  assert.ok(kamId);
  const viewModel = createCase2KamDetailViewModel(output, kamId);

  assert.ok(viewModel);
  assert.equal(viewModel.kam.kamId, kamId);
  assert.ok(viewModel.restaurants.length > 0);
});

test("kam detail adapter exposes a consistent display breakdown for Diego Vargas", () => {
  const output = buildCase2OutputBundle();
  const viewModel = createCase2KamDetailViewModel(output, "Diego Vargas");

  assert.ok(viewModel);
  assert.deepEqual(viewModel.displayBreakdown, {
    criticalCount: 4,
    atRiskCount: 5,
    stableCount: 13,
    totalCount: 22,
    revenueAtRiskMxn: viewModel.displayBreakdown.revenueAtRiskMxn,
    healthScore: viewModel.displayBreakdown.healthScore,
    opsPressurePct: viewModel.displayBreakdown.opsPressurePct,
  });
  assert.equal(viewModel.classifiedRestaurants.length, viewModel.restaurants.length);
  assert.equal(
    viewModel.classifiedRestaurants.filter(
      (item) => item.displayStatus === "at_risk",
    ).length,
    5,
  );
});

test("restaurant detail adapter resolves a real restaurant detail view model", () => {
  const output = buildCase2OutputBundle();
  const restaurantId = output.restaurants[0]?.restaurantId;

  assert.ok(restaurantId);
  const viewModel = createCase2RestaurantDetailViewModel(output, restaurantId);

  assert.ok(viewModel);
  assert.equal(viewModel.restaurant.restaurantId, restaurantId);
  assert.ok(viewModel.validationOverlay);
});

test("alerts adapter builds an alert feed view model with linked entities", () => {
  const output = buildCase2OutputBundle();
  const viewModel = createCase2AlertsFeedViewModel(output);

  assert.equal(viewModel.summary.totalAlerts, output.alerts.length);
  assert.ok(viewModel.alerts.length > 0);
  assert.ok(viewModel.alerts.some((item) => item.restaurant || item.kam));
});

test("validation adapter exposes validation summary and impacted restaurants", () => {
  const output = buildCase2OutputBundle();
  const viewModel = createCase2ValidationViewModel(output);

  assert.equal(viewModel.summary.totalRows, 200);
  assert.equal(viewModel.overlays.length, output.validation.overlays.length);
  assert.ok(viewModel.impactedRestaurants.length > 0);
  assert.equal("validationIssues" in viewModel, false);
});
