import test from "node:test";
import assert from "node:assert/strict";

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
  assert.equal("scenario" in viewModel, false);
  assert.equal("topKpis" in viewModel, false);
});

test("kams adapter builds cards and ranking without depending on demo mocks", () => {
  const output = buildCase2OutputBundle();
  const viewModel = createCase2KamsListViewModel(output);

  assert.ok(viewModel.summary.totalKams > 0);
  assert.equal(viewModel.cards.length, output.kams.length);
  assert.equal(viewModel.ranking.length, output.kams.length);
  assert.equal("agentDigest" in viewModel, false);
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
