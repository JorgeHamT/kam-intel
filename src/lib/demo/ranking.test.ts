import test from "node:test";
import assert from "node:assert/strict";

import { buildCase2OutputBundle } from "../data/case2/output.ts";

import {
  getCanonicalKamRanking,
  getCanonicalRestaurantRanking,
  getCanonicalWalkthroughTargets,
} from "./ranking.ts";
import { getPresentationSnapshot } from "./scenarios.ts";

test("canonical walkthrough ranking builds primary ids from domain inputs only", () => {
  const baseOutput = buildCase2OutputBundle();
  const targets = getCanonicalWalkthroughTargets({
    restaurants: baseOutput.restaurants,
    kams: baseOutput.kams,
  });

  assert.equal(targets.version, "canonical-walkthrough-ranking-v1");
  assert.ok(targets.restaurants.length > 0);
  assert.ok(targets.kams.length > 0);
  assert.equal(targets.primaryRestaurantId, targets.restaurants[0]?.restaurantId);
  assert.equal(targets.primaryKamId, targets.kams[0]?.kamId);
});

test("comparable scenarios use the canonical walkthrough ranking source", () => {
  const baseOutput = buildCase2OutputBundle();

  for (const scenario of [
    "dataset-original",
    "agent-evaluation",
    "crisis",
  ] as const) {
    const snapshot = getPresentationSnapshot(baseOutput, scenario);
    const targets = getCanonicalWalkthroughTargets({
      restaurants: snapshot.bundle.restaurants,
      kams: snapshot.bundle.kams,
    });

    assert.equal(snapshot.walkthrough.rankingSource, "canonical_comparable_v1");
    assert.equal(snapshot.walkthrough.primaryRestaurantId, targets.primaryRestaurantId);
    assert.equal(snapshot.walkthrough.primaryKamId, targets.primaryKamId);
  }
});

test("canonical ranking helpers return stable sorted entries", () => {
  const baseOutput = buildCase2OutputBundle();
  const restaurantRanking = getCanonicalRestaurantRanking(baseOutput.restaurants);
  const kamRanking = getCanonicalKamRanking(baseOutput.kams);

  assert.ok(restaurantRanking.length > 0);
  assert.ok(kamRanking.length > 0);
  assert.ok(
    restaurantRanking[0].priorityScore >=
      restaurantRanking[Math.min(1, restaurantRanking.length - 1)].priorityScore,
  );
  assert.ok(
    kamRanking[0].priorityScore >=
      kamRanking[Math.min(1, kamRanking.length - 1)].priorityScore,
  );
});
