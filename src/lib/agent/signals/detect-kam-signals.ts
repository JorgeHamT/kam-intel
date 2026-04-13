import type { Signal } from "../contracts/agent-output.ts";
import { createSignal } from "./signal-rules.ts";

export function detectKamSignals(params: {
  kamId: string;
  criticalCount: number;
  atRiskCount: number;
  lowConfidenceCount: number;
  concentrationRiskCount: number;
}): Signal[] {
  const signals: Signal[] = [];

  if (params.criticalCount >= 2) {
    signals.push(
      createSignal({
        id: `${params.kamId}-critical-portfolio`,
        type: "compound_risk",
        label: "Múltiples cuentas críticas en el portfolio",
        severityHint: "critical",
        evidence: [
          {
            metric: "critical_restaurants",
            value: params.criticalCount,
            note: "El KAM concentra varias cuentas con presión alta.",
          },
        ],
      }),
    );
  }

  if (params.atRiskCount >= 2) {
    signals.push(
      createSignal({
        id: `${params.kamId}-portfolio-pressure`,
        type: "absolute_deterioration",
        label: "Portfolio bajo presión operativa",
        severityHint: "at_risk",
        evidence: [
          {
            metric: "at_risk_restaurants",
            value: params.atRiskCount,
            note: "Hay varias cuentas en deterioro moderado.",
          },
        ],
      }),
    );
  }

  if (params.concentrationRiskCount > 0) {
    signals.push(
      createSignal({
        id: `${params.kamId}-concentration`,
        type: "concentration_risk",
        label: "Concentración de riesgo en pocas cuentas",
        severityHint: "at_risk",
        evidence: [
          {
            metric: "concentration_risk_restaurants",
            value: params.concentrationRiskCount,
            note: "Una o más cuentas pesan demasiado en el portfolio.",
          },
        ],
      }),
    );
  }

  if (params.lowConfidenceCount > 0) {
    signals.push(
      createSignal({
        id: `${params.kamId}-validation`,
        type: "data_quality_risk",
        label: "Parte del portfolio requiere validar datos",
        severityHint: "watchlist",
        evidence: [
          {
            metric: "low_confidence_restaurants",
            value: params.lowConfidenceCount,
            note: "La ejecución debe ser más prudente en estas cuentas.",
          },
        ],
        affectsPriority: false,
      }),
    );
  }

  return signals;
}
