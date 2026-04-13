import assert from "node:assert/strict";
import test from "node:test";

import { defaultAgentConfig } from "../config/index.ts";
import { agentFixtures } from "../fixtures/agent-fixtures.ts";
import { aggregateRestaurantAssessment } from "../aggregation/aggregate-restaurant-assessment.ts";

test("applies peer group fallback and degrades confidence with validation issues", () => {
  const restaurant = agentFixtures.restaurants[3];
  const result = aggregateRestaurantAssessment(restaurant, defaultAgentConfig, {
    kamPortfolioGmv7d: 118000,
    concentrationShare: 0.64,
  });

  assert.equal(result.assessment.peerGroupUsed, "global");
  assert.ok((result.assessment.peerGroupConfidence ?? 0) >= 0.55);
  assert.ok(result.assessment.confidence < 0.7);
  assert.equal(result.validationOverlay.degradedByValidation, true);
});

test("computes a bounded priority score with explicit breakdown sections", () => {
  const restaurant = agentFixtures.restaurants[0];
  const result = aggregateRestaurantAssessment(restaurant, defaultAgentConfig, {
    kamPortfolioGmv7d: 149000,
    concentrationShare: 0.84,
  });

  assert.ok(
    result.assessment.priorityScore >= 0 &&
      result.assessment.priorityScore <= 100,
  );
  assert.ok(result.assessment.scoreBreakdown.observedRisk.length > 0);
  assert.ok(result.assessment.scoreBreakdown.businessImpact.length > 0);
  assert.ok(
    result.assessment.scoreBreakdown.normalized.total ===
      result.assessment.priorityScore,
  );
});

test("classifies provisional severity bands", () => {
  const critical = aggregateRestaurantAssessment(
    agentFixtures.restaurants[0],
    defaultAgentConfig,
    {
      kamPortfolioGmv7d: 149000,
      concentrationShare: 0.84,
    },
  );
  const stable = aggregateRestaurantAssessment(
    agentFixtures.restaurants[2],
    defaultAgentConfig,
    {
      kamPortfolioGmv7d: 420000,
      concentrationShare: 0.1,
    },
  );

  assert.equal(critical.assessment.status, "critical");
  assert.equal(critical.assessment.severity, "high");
  assert.equal(stable.assessment.status, "stable");
});
