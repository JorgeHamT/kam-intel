import assert from "node:assert/strict";
import test from "node:test";

import { defaultAgentConfig } from "../config/index.ts";
import { aggregateRestaurantAssessment } from "../aggregation/aggregate-restaurant-assessment.ts";
import { agentFixtures } from "../fixtures/agent-fixtures.ts";

test("generates controlled why_flagged narratives and a cautious recommendation when confidence is low", () => {
  const result = aggregateRestaurantAssessment(agentFixtures.restaurants[3], defaultAgentConfig, {
    kamPortfolioGmv7d: 118000,
    concentrationShare: 0.64,
  });

  assert.ok(result.assessment.whyFlagged.length > 0);
  assert.match(result.assessment.whyFlagged[0] ?? "", /Señal principal:/);
  assert.ok(result.assessment.whyFlagged.some((line) => line.includes("Nivel de confianza:")));
  assert.ok(result.assessment.whyFlagged.some((line) => line.includes("Nota de validación:")));
  assert.equal(result.assessment.recommendedAction.code, "validate_data_before_action");
  assert.equal(result.assessment.nextBestStep.code, "validate_before_intervention");
});
