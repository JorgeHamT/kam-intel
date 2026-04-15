import type { ScenarioId, ScenarioOption } from "@/types/domain";

export type ActiveScenarioId =
  | "dataset-original"
  | "agent-evaluation"
  | "crisis";

export const OFFICIAL_ENTRY_ROUTE = "/";
export const FALLBACK_ROUTE = "/validation";

export const scenarioOptions: ScenarioOption[] = [
  {
    id: "dataset-original",
    label: "Dataset original",
    subtitle: "Lectura visible más cercana al semáforo original del archivo",
  },
  {
    id: "agent-evaluation",
    label: "Evaluación del agente",
    subtitle: "Reinterpretación analítica del mismo caso por el agente",
  },
  {
    id: "crisis",
    label: "Crisis operativa",
    subtitle: "Proyección agravada para mostrar reacción bajo presión",
  },
];

const ACTIVE_SCENARIO_IDS = new Set<ScenarioId>(
  scenarioOptions.map((option) => option.id),
);

export function isActiveScenario(scenario: ScenarioId): scenario is ActiveScenarioId {
  return ACTIVE_SCENARIO_IDS.has(scenario);
}

export function coerceActiveScenario(scenario: ScenarioId): ActiveScenarioId {
  return isActiveScenario(scenario) ? scenario : "dataset-original";
}

export function getScenarioOption(scenario: ScenarioId): ScenarioOption {
  return (
    scenarioOptions.find((option) => option.id === coerceActiveScenario(scenario)) ??
    scenarioOptions[0]
  );
}
