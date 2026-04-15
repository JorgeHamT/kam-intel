import test from "node:test";
import assert from "node:assert/strict";

import { buildCase2OutputBundle } from "../data/case2/output.ts";

import { coerceActiveScenario, scenarioOptions } from "./options.ts";
import { getPresentationSnapshot } from "./scenarios.ts";

test("presentation snapshot exposes comparable semantics for the three official demo scenarios", () => {
  const baseOutput = buildCase2OutputBundle();

  for (const scenario of [
    "dataset-original",
    "agent-evaluation",
    "crisis",
  ] as const) {
    const snapshot = getPresentationSnapshot(baseOutput, scenario);

    assert.equal(snapshot.semantics.scenarioId, scenario);
    assert.equal(snapshot.semantics.scenarioKind, "global_comparable");
    assert.equal(snapshot.semantics.universeKind, "full_case");
    assert.equal(snapshot.semantics.isGloballyComparable, true);
    assert.equal(snapshot.semantics.hasFocusSubset, false);
    assert.equal(snapshot.semantics.hasFullCaseReference, true);
    assert.equal(snapshot.semantics.activeAlertKind, "global_comparable");
    assert.equal(snapshot.semantics.hasGlobalComparableAlerts, true);
    assert.equal(snapshot.semantics.hasFocalAlerts, false);
    assert.equal(snapshot.walkthrough.rankingSource, "canonical_comparable_v1");
    assert.equal(snapshot.walkthrough.selectionKind, "comparable");
    assert.equal(
      snapshot.walkthrough.selectionTrace.source,
      "canonical_comparable_v1",
    );
    assert.deepEqual(snapshot.alerts.globalComparableAlerts, snapshot.bundle.alerts);
    assert.deepEqual(snapshot.alerts.focalAlerts, []);
    assert.deepEqual(snapshot.bundle.metadata.projection, snapshot.semantics);
  }
});

test("visible status source changes between dataset original and agent-based scenarios", () => {
  const baseOutput = buildCase2OutputBundle();
  const datasetSnapshot = getPresentationSnapshot(baseOutput, "dataset-original");
  const agentSnapshot = getPresentationSnapshot(baseOutput, "agent-evaluation");
  const crisisSnapshot = getPresentationSnapshot(baseOutput, "crisis");

  assert.equal(datasetSnapshot.semantics.visibleStatusSource, "benchmark_status");
  assert.equal(agentSnapshot.semantics.visibleStatusSource, "agent_status");
  assert.equal(crisisSnapshot.semantics.visibleStatusSource, "agent_status");
});

test("official demo scenarios preserve the full case universe", () => {
  const baseOutput = buildCase2OutputBundle();
  const baseRestaurantCount = baseOutput.restaurants.length;
  const baseKamCount = baseOutput.kams.length;

  for (const scenario of [
    "dataset-original",
    "agent-evaluation",
    "crisis",
  ] as const) {
    const snapshot = getPresentationSnapshot(baseOutput, scenario);

    assert.equal(snapshot.bundle.restaurants.length, baseRestaurantCount);
    assert.equal(snapshot.bundle.kams.length, baseKamCount);
    assert.equal(snapshot.bundle.global.dashboard.totalRestaurants, baseRestaurantCount);
    assert.equal(snapshot.bundle.global.portfolio.totalRestaurants, baseRestaurantCount);
    assert.equal(snapshot.bundle.global.portfolio.totalKams, baseKamCount);
  }
});

test("dataset original, agent evaluation and crisis expose differentiated global summaries", () => {
  const baseOutput = buildCase2OutputBundle();
  const datasetSnapshot = getPresentationSnapshot(baseOutput, "dataset-original");
  const agentSnapshot = getPresentationSnapshot(baseOutput, "agent-evaluation");
  const crisisSnapshot = getPresentationSnapshot(baseOutput, "crisis");

  assert.notEqual(
    datasetSnapshot.bundle.global.dashboard.criticalCount,
    agentSnapshot.bundle.global.dashboard.criticalCount,
  );
  assert.ok(
    crisisSnapshot.bundle.global.dashboard.criticalCount >=
      agentSnapshot.bundle.global.dashboard.criticalCount,
  );
  assert.ok(
    crisisSnapshot.bundle.global.portfolio.averagePriorityScore >
      agentSnapshot.bundle.global.portfolio.averagePriorityScore,
  );
});

test("scenario alerts belong to the active universe of each official snapshot", () => {
  const baseOutput = buildCase2OutputBundle();

  for (const scenario of [
    "dataset-original",
    "agent-evaluation",
    "crisis",
  ] as const) {
    const snapshot = getPresentationSnapshot(baseOutput, scenario);
    const restaurantIds = new Set(
      snapshot.bundle.restaurants.map((restaurant) => restaurant.restaurantId),
    );
    const kamIds = new Set(snapshot.bundle.kams.map((kam) => kam.kamId));

    for (const alert of snapshot.bundle.alerts) {
      if (alert.entityType === "restaurant") {
        assert.equal(restaurantIds.has(alert.entityId), true);
      } else {
        assert.equal(kamIds.has(alert.entityId), true);
      }
    }
  }
});

test("active demo scenarios are limited to dataset original, agent evaluation and crisis", () => {
  assert.deepEqual(
    scenarioOptions.map((option) => option.id),
    ["dataset-original", "agent-evaluation", "crisis"],
  );
  assert.equal(coerceActiveScenario("dataset-original"), "dataset-original");
  assert.equal(coerceActiveScenario("agent-evaluation"), "agent-evaluation");
  assert.equal(coerceActiveScenario("crisis"), "crisis");
});
