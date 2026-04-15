export {
  scenarioOptions,
  getScenarioOption,
  OFFICIAL_ENTRY_ROUTE,
  FALLBACK_ROUTE,
} from "./options";
export {
  DEFAULT_SCENARIO_ID,
  DEMO_REFRESH_LABEL,
  getPresentationSnapshot,
} from "./scenarios";
export type { PresentationChannel, PresentationSnapshot } from "./contracts";
export {
  CANONICAL_COMPARABLE_SCENARIOS,
  CANONICAL_KPI_CONTRACT,
  getCanonicalComparableKpiDefinition,
  getScenarioProjectionMetadata,
  isGloballyComparableKpi,
  isGloballyComparableScenario,
} from "./kpi-contract";
export type {
  CanonicalComparableKpiId,
  CanonicalComparableScenarioId,
  CanonicalKpiComparability,
  CanonicalKpiContract,
  CanonicalKpiContractVersion,
  CanonicalKpiDefinition,
  CanonicalLocalKpiDefinition,
  CanonicalScenarioKind,
  CanonicalUniverseId,
  ScenarioProjectionMetadata,
} from "./kpi-contract";
export {
  getCanonicalKamRanking,
  getCanonicalRestaurantRanking,
  getCanonicalWalkthroughTargets,
  getFocalWalkthroughTargets,
} from "./ranking";
export type {
  CanonicalKamRankingEntry,
  CanonicalRestaurantRankingEntry,
  CanonicalWalkthroughRankingVersion,
  CanonicalWalkthroughTargets,
  FocalWalkthroughRankingVersion,
  FocalWalkthroughTargets,
} from "./ranking";
