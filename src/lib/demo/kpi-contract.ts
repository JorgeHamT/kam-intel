import type { RiskStatus } from "../agent/contracts/agent-input.ts";
import type { ScenarioId } from "../../types/domain";

export type CanonicalKpiContractVersion = "canonical-kpi-contract-v1";

export type CanonicalUniverseId =
  | "full_case"
  | "focus_subset"
  | "screen_local";

export type CanonicalComparableScenarioId =
  | "dataset-original"
  | "agent-evaluation"
  | "crisis"
  ;

export type CanonicalScenarioKind = "global_comparable";

export type CanonicalKpiComparability = "global_comparable" | "local_or_focal";

export type CanonicalComparableKpiId =
  | "case_total_accounts"
  | "case_critical_accounts"
  | "case_at_risk_accounts"
  | "case_watchlist_accounts"
  | "case_stable_accounts"
  | "case_gmv_at_risk_mxn"
  | "case_operational_pressure_pct"
  | "case_kams_under_pressure";

export type CanonicalKpiDefinition = {
  id: CanonicalComparableKpiId;
  label: string;
  description: string;
  universe: "full_case";
  comparability: "global_comparable";
  comparableScenarios: CanonicalComparableScenarioId[];
  classificationSource: "scenario_projection" | "not_applicable";
};

export type CanonicalLocalKpiDefinition = {
  id: string;
  label: string;
  description: string;
  universe: Exclude<CanonicalUniverseId, "full_case">;
  comparability: "local_or_focal";
  comparableScenarios: [];
  classificationSource: "scenario_projection" | "not_applicable";
};

export type VisibleStatusContract = {
  official: true;
  source: "scenario_projection";
  defaultSource: "agent_status";
  fieldPath: "restaurants[].status";
  supportedSources: ("agent_status" | "benchmark_status")[];
  supportedStatuses: RiskStatus[];
  note: string;
};

export type BenchmarkStatusContract = {
  role: "comparative_reference";
  source: "original_risk_label";
  datasetField: "semaforo_riesgo";
  outputFieldPath: "restaurants[].benchmark.originalRiskLabel";
  note: string;
};

export type CanonicalScenarioContract = {
  scenarioId: ScenarioId;
  kind: CanonicalScenarioKind;
  preservesFullCaseUniverse: boolean;
  globallyComparable: boolean;
};

export type ScenarioProjectionMetadata = {
  scenarioId: ScenarioId;
  scenarioKind: CanonicalScenarioKind;
  universeKind: CanonicalUniverseId;
  isGloballyComparable: boolean;
  visibleStatusSource: "benchmark_status" | "agent_status";
  comparableKpiIds: CanonicalComparableKpiId[];
  hasFocusSubset: boolean;
  hasFullCaseReference: boolean;
  activeAlertKind: "global_comparable" | "focal_narrative";
  hasGlobalComparableAlerts: boolean;
  hasFocalAlerts: boolean;
};

export type CanonicalKpiContract = {
  version: CanonicalKpiContractVersion;
  classification: {
    visibleStatus: VisibleStatusContract;
    benchmarkStatus: BenchmarkStatusContract;
  };
  universes: Record<
    CanonicalUniverseId,
    {
      label: string;
      description: string;
    }
  >;
  scenarios: Record<ScenarioId, CanonicalScenarioContract>;
  comparableKpis: readonly CanonicalKpiDefinition[];
  localOrFocalKpis: readonly CanonicalLocalKpiDefinition[];
};

export const CANONICAL_COMPARABLE_SCENARIOS = [
  "dataset-original",
  "agent-evaluation",
  "crisis",
] as const satisfies readonly CanonicalComparableScenarioId[];

const SUPPORTED_VISIBLE_STATUSES = [
  "critical",
  "at_risk",
  "watchlist",
  "stable",
] as const satisfies readonly RiskStatus[];

export const CANONICAL_KPI_CONTRACT = {
  version: "canonical-kpi-contract-v1",
  classification: {
    visibleStatus: {
      official: true,
      source: "scenario_projection",
      defaultSource: "agent_status",
      fieldPath: "restaurants[].status",
      supportedSources: ["agent_status", "benchmark_status"],
      supportedStatuses: [...SUPPORTED_VISIBLE_STATUSES],
      note:
        "The visible classification is projected into restaurants[].status per scenario. Dataset original uses benchmark_status; agent evaluation and crisis use agent_status.",
    },
    benchmarkStatus: {
      role: "comparative_reference",
      source: "original_risk_label",
      datasetField: "semaforo_riesgo",
      outputFieldPath: "restaurants[].benchmark.originalRiskLabel",
      note:
        "Benchmark labels remain available for comparison and can drive the projected visible classification in the dataset-original scenario.",
    },
  },
  universes: {
    full_case: {
      label: "Full case",
      description:
        "Complete case universe used for globally comparable KPIs across Dataset original, Evaluación del agente and Crisis operativa.",
    },
    focus_subset: {
      label: "Focus subset",
      description:
        "Reserved for future focal drill-downs outside the active demo flow.",
    },
    screen_local: {
      label: "Screen local",
      description:
        "Local UI-only or screen-specific KPI universe that should not be treated as globally comparable by default.",
    },
  },
  scenarios: {
    "dataset-original": {
      scenarioId: "dataset-original",
      kind: "global_comparable",
      preservesFullCaseUniverse: true,
      globallyComparable: true,
    },
    "agent-evaluation": {
      scenarioId: "agent-evaluation",
      kind: "global_comparable",
      preservesFullCaseUniverse: true,
      globallyComparable: true,
    },
    crisis: {
      scenarioId: "crisis",
      kind: "global_comparable",
      preservesFullCaseUniverse: true,
      globallyComparable: true,
    },
  },
  comparableKpis: [
    {
      id: "case_total_accounts",
      label: "Total de cuentas del caso",
      description:
        "Total monitored accounts in the full case universe.",
      universe: "full_case",
      comparability: "global_comparable",
      comparableScenarios: [...CANONICAL_COMPARABLE_SCENARIOS],
      classificationSource: "not_applicable",
    },
    {
      id: "case_critical_accounts",
      label: "Cuentas críticas",
      description:
        "Accounts classified as critical using the active visible status projection of the scenario.",
      universe: "full_case",
      comparability: "global_comparable",
      comparableScenarios: [...CANONICAL_COMPARABLE_SCENARIOS],
      classificationSource: "scenario_projection",
    },
    {
      id: "case_at_risk_accounts",
      label: "Cuentas en riesgo",
      description:
        "Accounts classified as at_risk using the active visible status projection of the scenario.",
      universe: "full_case",
      comparability: "global_comparable",
      comparableScenarios: [...CANONICAL_COMPARABLE_SCENARIOS],
      classificationSource: "scenario_projection",
    },
    {
      id: "case_watchlist_accounts",
      label: "Cuentas watchlist",
      description:
        "Accounts classified as watchlist using the active visible status projection of the scenario.",
      universe: "full_case",
      comparability: "global_comparable",
      comparableScenarios: [...CANONICAL_COMPARABLE_SCENARIOS],
      classificationSource: "scenario_projection",
    },
    {
      id: "case_stable_accounts",
      label: "Cuentas estables",
      description:
        "Accounts classified as stable using the active visible status projection of the scenario.",
      universe: "full_case",
      comparability: "global_comparable",
      comparableScenarios: [...CANONICAL_COMPARABLE_SCENARIOS],
      classificationSource: "scenario_projection",
    },
    {
      id: "case_gmv_at_risk_mxn",
      label: "GMV en riesgo",
      description:
        "GMV exposure for accounts classified as critical or at_risk in the active visible status projection of the scenario.",
      universe: "full_case",
      comparability: "global_comparable",
      comparableScenarios: [...CANONICAL_COMPARABLE_SCENARIOS],
      classificationSource: "scenario_projection",
    },
    {
      id: "case_operational_pressure_pct",
      label: "Presión operativa",
      description:
        "Percentage of full-case accounts classified as critical or at_risk using the active visible status projection of the scenario.",
      universe: "full_case",
      comparability: "global_comparable",
      comparableScenarios: [...CANONICAL_COMPARABLE_SCENARIOS],
      classificationSource: "scenario_projection",
    },
    {
      id: "case_kams_under_pressure",
      label: "KAMs bajo presión",
      description:
        "KAM portfolios marked as under pressure or critical in the full case universe for the active scenario projection.",
      universe: "full_case",
      comparability: "global_comparable",
      comparableScenarios: [...CANONICAL_COMPARABLE_SCENARIOS],
      classificationSource: "scenario_projection",
    },
  ],
  localOrFocalKpis: [
    {
      id: "focus_subset_accounts",
      label: "Cuentas del subconjunto focal",
      description:
        "Narrative or focal subset account count used for focus scenarios and local drill-downs.",
      universe: "focus_subset",
      comparability: "local_or_focal",
      comparableScenarios: [],
      classificationSource: "not_applicable",
    },
    {
      id: "screen_local_priority_label",
      label: "Etiqueta local de prioridad",
      description:
        "Screen-local, heuristic or presentation-oriented priority indicator that must not be treated as globally comparable.",
      universe: "screen_local",
      comparability: "local_or_focal",
      comparableScenarios: [],
      classificationSource: "not_applicable",
    },
  ],
} as const satisfies CanonicalKpiContract;

export function getCanonicalComparableKpiDefinition(
  kpiId: CanonicalComparableKpiId,
) {
  return CANONICAL_KPI_CONTRACT.comparableKpis.find(
    (definition) => definition.id === kpiId,
  );
}

export function isGloballyComparableScenario(scenarioId: ScenarioId) {
  return CANONICAL_KPI_CONTRACT.scenarios[scenarioId].globallyComparable;
}

export function isGloballyComparableKpi(kpiId: string) {
  return CANONICAL_KPI_CONTRACT.comparableKpis.some(
    (definition) => definition.id === kpiId,
  );
}

export function getScenarioProjectionMetadata(
  scenarioId: ScenarioId,
): ScenarioProjectionMetadata {
  const scenarioContract = CANONICAL_KPI_CONTRACT.scenarios[scenarioId];

  return {
    scenarioId,
    scenarioKind: scenarioContract.kind,
    universeKind: "full_case",
    isGloballyComparable: scenarioContract.globallyComparable,
    visibleStatusSource:
      scenarioId === "dataset-original" ? "benchmark_status" : "agent_status",
    comparableKpiIds: [...CANONICAL_KPI_CONTRACT.comparableKpis.map(
      (definition) => definition.id,
    )],
    hasFocusSubset: false,
    hasFullCaseReference: true,
    activeAlertKind: "global_comparable",
    hasGlobalComparableAlerts: true,
    hasFocalAlerts: false,
  };
}
