import type { AgentConfig } from "../config/index.ts";
import type { RestaurantMetricsInput, ValidationFlag } from "../contracts/agent-input.ts";
import type { ConfidenceOverlay } from "../contracts/agent-output.ts";
import { clamp, round } from "./scoring-utils.ts";
import { selectPeerGroup } from "./peer-group-utils.ts";

export function buildRestaurantConfidenceOverlay(
  restaurant: RestaurantMetricsInput,
  config: AgentConfig,
  benchmarkConflict = false,
): ConfidenceOverlay {
  let confidence = config.confidence.base;
  const reasons: string[] = [];
  const relatedFlags: ValidationFlag[] = restaurant.quality?.flags ?? [];
  const selection = selectPeerGroup(restaurant.benchmark, config);

  if (!selection.candidate) {
    confidence -= config.confidence.penalties.benchmarkMissing;
    reasons.push("Sin benchmark confiable; la comparación relativa es limitada.");
  } else if (selection.caution) {
    confidence -= config.confidence.penalties.benchmarkCaution;
    reasons.push(
      `Peer group ${selection.candidate.key} con muestra limitada (${selection.candidate.sampleSize}).`,
    );
  } else {
    reasons.push(
      `Peer group ${selection.candidate.key} con base suficiente (${selection.candidate.sampleSize}).`,
    );
  }

  for (const flag of relatedFlags) {
    if (flag.severity === "error") {
      confidence -= config.confidence.penalties.validationError;
    } else if (flag.severity === "warning") {
      confidence -= config.confidence.penalties.validationWarning;
    }
  }

  if (restaurant.quality?.degradedConfidence) {
    confidence -= config.confidence.penalties.lowQualityFlag;
    reasons.push("La calidad de datos obliga a usar la lectura con prudencia.");
  }

  if (benchmarkConflict) {
    confidence -= config.confidence.penalties.benchmarkConflict;
    reasons.push("Hay conflicto entre benchmark y etiqueta de riesgo previa.");
  }

  if (!reasons.length) {
    reasons.push("Sin penalizaciones relevantes de confianza.");
  }

  return {
    entityId: restaurant.restaurantId,
    confidence: round(clamp(confidence * selection.confidence, config.confidence.minimum, 1)),
    confidenceReason: reasons,
    degradedByValidation: Boolean(relatedFlags.length || restaurant.quality?.degradedConfidence),
    relatedValidationFlags: relatedFlags,
  };
}

