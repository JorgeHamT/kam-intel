import assert from "node:assert/strict";
import test from "node:test";

import * as agentModule from "../index.ts";
import { runAgent } from "../run-agent.ts";
import { agentFixtures } from "../fixtures/agent-fixtures.ts";

test("runAgent orchestrates detection, scoring, recommendations, aggregation and alert generation", () => {
  const result = runAgent(agentFixtures);

  assert.equal(result.restaurants.length, agentFixtures.restaurants.length);
  assert.equal(result.kams.length, 2);
  assert.ok(result.summary.totalRestaurants > 0);
  assert.ok(result.alerts.length > 0);
  assert.ok(
    result.validationOverlays.some((overlay) => overlay.degradedByValidation),
  );
  assert.ok(result.portfolio.kamsUnderPressure.length > 0);
  assert.ok("restaurantName" in result.restaurants[0]);
  assert.equal(typeof result.summary.cityRiskSummary[0]?.city, "string");
  assert.equal(
    typeof result.summary.verticalRiskSummary[0]?.vertical,
    "string",
  );
  assert.equal(
    typeof result.summary.interventionSummary[0]?.recommendationCode,
    "string",
  );
});

test("public agent module does not export the mock bridge", () => {
  assert.equal("getMockAgentDigest" in agentModule, false);
});
