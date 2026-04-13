import type { AgentConfig } from "../config/index.ts";
import type { RestaurantAssessment, Signal } from "../contracts/agent-output.ts";
import { clamp, round } from "../helpers/scoring-utils.ts";

export function computeKamPriority(
  restaurants: RestaurantAssessment[],
  config: AgentConfig,
): { priorityScore: number; topSignals: Signal[]; confidence: number } {
  let score = 0;

  for (const restaurant of restaurants) {
    if (restaurant.status === "critical") {
      score += config.weights.kam.criticalRestaurant;
    } else if (restaurant.status === "at_risk") {
      score += config.weights.kam.atRiskRestaurant;
    } else if (restaurant.status === "watchlist") {
      score += config.weights.kam.watchlistRestaurant;
    }

    if (restaurant.signals.some((signal) => signal.type === "concentration_risk")) {
      score += config.weights.kam.concentrationRisk;
    }

    if (restaurant.confidence < config.thresholds.signals.confidence.lowConfidence) {
      score -= config.weights.kam.lowConfidencePenalty;
    }
  }

  const confidence = restaurants.length
    ? round(restaurants.reduce((acc, restaurant) => acc + restaurant.confidence, 0) / restaurants.length)
    : 1;

  const uniqueSignals = new Map<string, Signal>();
  for (const restaurant of restaurants) {
    for (const signal of restaurant.signals) {
      if (!uniqueSignals.has(signal.id)) {
        uniqueSignals.set(signal.id, signal);
      }
    }
  }

  return {
    priorityScore: clamp(score, 0, 100),
    topSignals: [...uniqueSignals.values()].sort(
      (left, right) =>
        config.weights.signalImpact[right.severityHint] - config.weights.signalImpact[left.severityHint],
    ).slice(0, 5),
    confidence,
  };
}

