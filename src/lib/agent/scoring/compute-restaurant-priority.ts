import type { AgentConfig } from "../config/index.ts";
import type { RestaurantMetricsInput } from "../contracts/agent-input.ts";
import type { ConfidenceOverlay, PriorityScore, ScoreBreakdown, Signal } from "../contracts/agent-output.ts";
import { clamp, round, sum } from "../helpers/scoring-utils.ts";
import { createEmptyBreakdown } from "./score-breakdown.ts";

function statusToPoints(signal: Signal, config: AgentConfig): number {
  return config.weights.signalImpact[signal.severityHint];
}

function normalizeSection(rawPoints: number, sectionCap: number, sectionWeight: number): number {
  if (rawPoints <= 0) {
    return 0;
  }

  return round(clamp((rawPoints / sectionCap) * 100, 0, 100) * sectionWeight);
}

export function computeRestaurantPriority(
  restaurant: RestaurantMetricsInput,
  signals: Signal[],
  confidenceOverlay: ConfidenceOverlay,
  config: AgentConfig,
): { priorityScore: number; priority: PriorityScore; breakdown: ScoreBreakdown } {
  const breakdown = createEmptyBreakdown();

  for (const signal of signals) {
    const points = statusToPoints(signal, config);
    if (!signal.affectsPriority) {
      breakdown.confidenceAdjustment.push({
        label: signal.label,
        value: -Math.abs(points / 2),
        reason: "Señal informativa o de prudencia que modera la lectura.",
      });
      continue;
    }

    if (signal.type === "absolute_deterioration" || signal.type === "relative_deterioration") {
      breakdown.observedRisk.push({
        label: signal.label,
        value: points,
        reason: "Empeoramiento observado en la operación o frente a peers.",
      });
    } else if (signal.type === "accelerated_deterioration" || signal.type === "compound_risk") {
      breakdown.deteriorationMomentum.push({
        label: signal.label,
        value: points,
        reason: "El patrón reciente sugiere presión creciente.",
      });
    } else {
      breakdown.businessImpact.push({
        label: signal.label,
        value: points,
        reason: "La señal aumenta la urgencia operativa por impacto o concentración.",
      });
    }
  }

  const validationPenalty = (restaurant.quality?.flags ?? []).reduce((acc, flag) => {
    if (flag.severity === "error") {
      return acc + config.weights.dataQuality.errorPenalty;
    }

    if (flag.severity === "warning") {
      return acc + config.weights.dataQuality.warningPenalty;
    }

    return acc;
  }, 0);

  if (validationPenalty > 0) {
    breakdown.confidenceAdjustment.push({
      label: "Penalización por validación",
      value: -validationPenalty,
      reason: "La calidad del dato modera la prioridad operativa.",
    });
  }

  const confidencePenalty = round((1 - confidenceOverlay.confidence) * 20);
  if (confidencePenalty > 0) {
    breakdown.confidenceAdjustment.push({
      label: "Ajuste por confianza",
      value: -confidencePenalty,
      reason: "Menor confianza reduce urgencia accionable.",
    });
  }

  const observedRiskRaw = sum(breakdown.observedRisk.map((item) => item.value));
  const deteriorationMomentumRaw = sum(breakdown.deteriorationMomentum.map((item) => item.value));
  const businessImpactRaw = sum(breakdown.businessImpact.map((item) => item.value));
  const confidenceAdjustmentRaw = Math.abs(sum(breakdown.confidenceAdjustment.map((item) => item.value)));

  const weighted: PriorityScore = {
    observedRisk: normalizeSection(
      observedRiskRaw,
      40,
      config.weights.score.observedRisk,
    ),
    deteriorationMomentum: normalizeSection(
      deteriorationMomentumRaw,
      35,
      config.weights.score.deteriorationMomentum,
    ),
    businessImpact: normalizeSection(
      businessImpactRaw,
      35,
      config.weights.score.businessImpact,
    ),
    confidenceAdjustment: -normalizeSection(
      confidenceAdjustmentRaw,
      25,
      config.weights.score.confidenceAdjustment,
    ),
    total: 0,
  };

  weighted.total = clamp(
    round(
      weighted.observedRisk +
        weighted.deteriorationMomentum +
        weighted.businessImpact +
        weighted.confidenceAdjustment,
    ),
    0,
    100,
  );

  breakdown.normalized = weighted;

  return {
    priorityScore: weighted.total,
    priority: weighted,
    breakdown,
  };
}
