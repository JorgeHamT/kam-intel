import type { ScenarioId, ScenarioOption } from "@/types/domain";

export const OFFICIAL_ENTRY_ROUTE = "/";
export const FALLBACK_ROUTE = "/validation";

export const scenarioOptions: ScenarioOption[] = [
  {
    id: "base",
    label: "Base",
    subtitle: "Lectura operativa completa para el walkthrough oficial",
  },
  {
    id: "crisis",
    label: "Crisis",
    subtitle: "Enfatiza presión crítica y cola prioritaria real",
  },
  {
    id: "discrepancias",
    label: "Discrepancias",
    subtitle: "Resalta conflictos de dato y confianza degradada",
  },
  {
    id: "estable",
    label: "Estable",
    subtitle: "Recorta la lectura a señales de menor urgencia",
  },
  {
    id: "foco-kam",
    label: "Foco KAM",
    subtitle: "Centra la presentación en un portfolio prioritario",
  },
];

export function getScenarioOption(scenario: ScenarioId): ScenarioOption {
  return (
    scenarioOptions.find((option) => option.id === scenario) ??
    scenarioOptions[0]
  );
}
