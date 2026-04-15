import test from "node:test";
import assert from "node:assert/strict";

import { buildCase2OutputBundle } from "./output.ts";

test("case2 output metadata exposes the canonical KPI contract", () => {
  const output = buildCase2OutputBundle();
  const contract = output.metadata.semantics;

  assert.equal(contract.version, "canonical-kpi-contract-v1");
  assert.equal(contract.classification.visibleStatus.source, "scenario_projection");
  assert.equal(contract.classification.visibleStatus.defaultSource, "agent_status");
  assert.equal(
    contract.classification.benchmarkStatus.role,
    "comparative_reference",
  );
  assert.deepEqual(
    contract.comparableKpis.map((definition) => definition.id),
    [
      "case_total_accounts",
      "case_critical_accounts",
      "case_at_risk_accounts",
      "case_watchlist_accounts",
      "case_stable_accounts",
      "case_gmv_at_risk_mxn",
      "case_operational_pressure_pct",
      "case_kams_under_pressure",
    ],
  );
});

test("canonical KPI contract distinguishes globally comparable and focus scenarios", () => {
  const output = buildCase2OutputBundle();
  const contract = output.metadata.semantics;

  assert.equal(contract.scenarios["dataset-original"].globallyComparable, true);
  assert.equal(contract.scenarios["dataset-original"].preservesFullCaseUniverse, true);
  assert.equal(contract.scenarios["agent-evaluation"].globallyComparable, true);
  assert.equal(contract.scenarios["agent-evaluation"].preservesFullCaseUniverse, true);
  assert.equal(contract.scenarios.crisis.preservesFullCaseUniverse, true);
  assert.ok("full_case" in contract.universes);
  assert.ok("focus_subset" in contract.universes);
  assert.equal(output.metadata.projection.scenarioId, "agent-evaluation");
  assert.equal(output.metadata.projection.universeKind, "full_case");
  assert.equal(output.metadata.projection.isGloballyComparable, true);
  assert.equal(output.metadata.projection.visibleStatusSource, "agent_status");
  assert.equal(output.metadata.projection.activeAlertKind, "global_comparable");
  assert.equal(output.metadata.projection.hasGlobalComparableAlerts, true);
  assert.equal(output.metadata.projection.hasFocalAlerts, false);
});
