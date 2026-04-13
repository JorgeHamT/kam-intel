import assert from "node:assert/strict";
import test from "node:test";

import { defaultAgentConfig } from "../config/index.ts";
import { agentFixtures } from "../fixtures/agent-fixtures.ts";
import { detectRestaurantSignals } from "../signals/detect-restaurant-signals.ts";

test("detects compound restaurant risk across multiple signal families", () => {
  const restaurant = agentFixtures.restaurants[0];
  const signals = detectRestaurantSignals(restaurant, defaultAgentConfig, {
    kamPortfolioGmv7d: 149000,
    concentrationShare: 0.84,
  });

  assert.ok(signals.some((signal) => signal.type === "absolute_deterioration"));
  assert.ok(signals.some((signal) => signal.type === "relative_deterioration"));
  assert.ok(signals.some((signal) => signal.type === "compound_risk"));
  assert.ok(signals.some((signal) => signal.type === "business_impact"));
  assert.ok(signals.some((signal) => signal.type === "concentration_risk"));
  assert.ok(signals.some((signal) => signal.type === "data_quality_risk"));
});

