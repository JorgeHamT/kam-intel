import assert from "node:assert/strict";
import test from "node:test";

import { buildAlertFeed } from "../aggregation/build-alert-feed.ts";
import { aggregateKamAssessment } from "../aggregation/aggregate-kam-assessment.ts";
import { defaultAgentConfig } from "../config/index.ts";
import { aggregateRestaurantAssessment } from "../aggregation/aggregate-restaurant-assessment.ts";
import { agentFixtures } from "../fixtures/agent-fixtures.ts";

test("aggregates portfolio pressure at KAM level", () => {
  const restaurants = agentFixtures.restaurants
    .filter((restaurant) => restaurant.kamId === "kam-1")
    .map(
      (restaurant) =>
        aggregateRestaurantAssessment(restaurant, defaultAgentConfig, {
          kamPortfolioGmv7d: 149000,
          concentrationShare:
            restaurant.restaurantId === "rest-critical-1" ? 0.84 : 0.16,
        }).assessment,
    );

  const kam = aggregateKamAssessment(
    agentFixtures.kams?.[0],
    restaurants,
    defaultAgentConfig,
  );

  assert.equal(kam.portfolioStatus, "critical");
  assert.ok(kam.criticalRestaurants.length > 0);
  assert.ok(kam.topRecommendations.length > 0);
});

test("builds an alert feed for restaurants and KAMs", () => {
  const restaurantAssessments = agentFixtures.restaurants.map((restaurant) => ({
    ...aggregateRestaurantAssessment(restaurant, defaultAgentConfig, {
      kamPortfolioGmv7d: restaurant.kamId === "kam-1" ? 149000 : 118000,
      concentrationShare:
        restaurant.restaurantId === "rest-critical-1"
          ? 0.84
          : restaurant.restaurantId === "rest-fallback-1"
            ? 0.64
            : 0.36,
    }).assessment,
    restaurantName: restaurant.restaurantName,
  }));
  const kamAssessment = aggregateKamAssessment(
    agentFixtures.kams?.[0],
    restaurantAssessments.filter((item) => item.kamId === "kam-1"),
    defaultAgentConfig,
  );
  const alerts = buildAlertFeed({
    restaurants: restaurantAssessments,
    kams: [kamAssessment],
    maxVisibleCount: 10,
  });

  assert.ok(alerts.length > 0);
  assert.ok(alerts.length <= 10);
  assert.ok(alerts.some((alert) => alert.entityType === "restaurant"));
  assert.ok(alerts.some((alert) => alert.entityType === "kam"));
});
