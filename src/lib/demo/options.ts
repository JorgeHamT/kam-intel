import type { ScenarioId, ScenarioOption } from "@/types/domain";

export const scenarioOptions: ScenarioOption[] = [
  {
    id: "baseline",
    label: "Base operativa",
    subtitle: "Vista controlada para walkthrough general",
  },
  {
    id: "promo-risk",
    label: "Riesgo promocional",
    subtitle: "Mock para caída de activación en cuentas clave",
  },
  {
    id: "coverage-gap",
    label: "Brecha de cobertura",
    subtitle: "Mock para revisar señales de datos incompletos",
  },
];

export function getScenarioOption(scenario: ScenarioId): ScenarioOption {
  return (
    scenarioOptions.find((option) => option.id === scenario) ??
    scenarioOptions[0]
  );
}
