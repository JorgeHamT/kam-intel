import type { ScenarioId } from "@/types/domain";

import type { DemoSnapshot } from "./contracts";
import { baselineSnapshot } from "./baseline";
import { getScenarioOption, scenarioOptions } from "./options";

export const DEFAULT_SCENARIO_ID: ScenarioId = "baseline";
export const DEMO_REFRESH_LABEL = "12 abr 2026 · 23:20";

const promoRiskSnapshot: DemoSnapshot = {
  ...baselineSnapshot,
  scenario: "promo-risk",
  scenarioOption: getScenarioOption("promo-risk"),
  topKpis: baselineSnapshot.topKpis.map((item) => {
    if (item.id === "revenue-at-risk") {
      return {
        ...item,
        value: "$2.9M",
        delta: "+21% vs. base operativa",
        insight: "Escenario de demo con promo activa y performance deteriorado en cuentas clave.",
      };
    }

    if (item.id === "restaurants-flagged") {
      return {
        ...item,
        value: "24",
        delta: "9 con promoción activa bajo revisión",
      };
    }

    return item;
  }),
  kamPressureItems: baselineSnapshot.kamPressureItems.map((item) =>
    item.id === "diego-rivera"
      ? {
          ...item,
          pressureLabel: "Presión alta por promo activa sin respuesta",
          focus: "Se acumularon desvíos en cuentas con campaña activa y caída de órdenes.",
          nextStep: "Separar falla de ejecución promo vs. problema operativo antes de escalar.",
        }
      : item,
  ),
  alertSummary: [
    {
      id: "alert-01",
      title: "Promos activas con caída de órdenes",
      owner: "KAM Lead",
      status: "Bloqueando score final",
      eta: "Hoy 14:30",
      restaurantId: "taco-hub-monterrey",
    },
    ...baselineSnapshot.alertSummary.slice(1),
  ],
  restaurants: baselineSnapshot.restaurants.map((item) =>
    item.id === "taco-hub-monterrey"
      ? {
          ...item,
          status: "Crítico",
          whyFlagged: "Promoción activa con caída sostenida de órdenes y señal operativa desalineada.",
          recommendation: "Revisar ejecución promo, inventario y owner antes del siguiente corte.",
        }
      : item,
  ),
  agentDigest: {
    ...baselineSnapshot.agentDigest,
    headline: "El agente detectó presión promocional concentrada en cuentas con alta exposición.",
    recommendation: "Separar de inmediato desviación promocional, cobertura comercial y calidad de input.",
    nextStep: "Abrir Alertas y bajar primero a restaurantes con promo activa y caída persistente.",
  },
};

const coverageGapSnapshot: DemoSnapshot = {
  ...baselineSnapshot,
  scenario: "coverage-gap",
  scenarioOption: getScenarioOption("coverage-gap"),
  topKpis: baselineSnapshot.topKpis.map((item) => {
    if (item.id === "data-health") {
      return {
        ...item,
        value: "83%",
        delta: "5 reglas críticas abiertas",
        insight: "Escenario donde la cobertura del input obliga a mayor prudencia operativa.",
      };
    }

    if (item.id === "high-priority-kams") {
      return {
        ...item,
        value: "3",
        delta: "La prioridad depende de cerrar vacíos de dato",
      };
    }

    return item;
  }),
  alertSummary: [
    {
      id: "alert-coverage-01",
      title: "Owners operativos faltantes en cuentas prioritarias",
      owner: "Ops Support",
      status: "Bloqueando score final",
      eta: "Hoy 15:00",
      restaurantId: "burger-lab-cdmx",
    },
    ...baselineSnapshot.alertSummary.slice(1),
  ],
  validationIssues: [
    {
      id: "dq-coverage-01",
      rule: "Owner operativo no puede venir vacío",
      affectedField: "owner_name",
      severity: "critical",
      status: "Abierta",
      note: "En este escenario afecta directamente la trazabilidad del siguiente paso.",
    },
    {
      id: "dq-coverage-02",
      rule: "Cobertura promo debe mapear a catálogo vigente",
      affectedField: "promo_window",
      severity: "critical",
      status: "Abierta",
      note: "Sin este control se elevan falsos positivos en la cola operativa.",
    },
    ...baselineSnapshot.validationIssues.slice(1),
  ],
  restaurants: baselineSnapshot.restaurants.map((item) =>
    item.id === "burger-lab-cdmx"
      ? {
          ...item,
          status: "En riesgo",
          whyFlagged: "La señal sigue presente, pero la cobertura incompleta obliga a prudencia antes de concluir.",
          recommendation: "Validar owners y campos base antes de escalar el caso como crítico.",
        }
      : item,
  ),
  agentDigest: {
    ...baselineSnapshot.agentDigest,
    headline: "El agente detectó brechas de cobertura que degradan la confianza operacional.",
    detected: "Hay señales visibles, pero parte del input clave aún exige validación antes de priorizar con dureza.",
    whyItMatters:
      "Cuando el dato base está incompleto, la decisión correcta es sostener prudencia explícita en vez de sobrerreaccionar.",
    recommendation: "Cerrar primero los vacíos de cobertura que afectan owner, promo y trazabilidad.",
    nextStep: "Entrar a Validation y confirmar qué casos pueden seguir a cola operativa y cuáles deben esperar.",
  },
};

const snapshotsByScenario: Record<ScenarioId, DemoSnapshot> = {
  baseline: baselineSnapshot,
  "promo-risk": promoRiskSnapshot,
  "coverage-gap": coverageGapSnapshot,
};

export function getDemoSnapshot(scenario: ScenarioId): DemoSnapshot {
  return snapshotsByScenario[scenario] ?? snapshotsByScenario[DEFAULT_SCENARIO_ID];
}
