import type { AgentConfig } from "../config/index.ts";
import type { KamMetricsInput } from "../contracts/agent-input.ts";
import type { KamAssessment, RestaurantAssessment, RestaurantMiniAssessment } from "../contracts/agent-output.ts";
import { average } from "../helpers/scoring-utils.ts";
import { recommendKamAction } from "../recommendations/recommend-kam-action.ts";
import { computeKamPriority } from "../scoring/compute-kam-priority.ts";
import { detectKamSignals } from "../signals/detect-kam-signals.ts";

function toMiniAssessment(assessment: RestaurantAssessment, restaurantName?: string): RestaurantMiniAssessment {
  return {
    restaurantId: assessment.restaurantId,
    restaurantName,
    status: assessment.status,
    priorityScore: assessment.priorityScore,
    severity: assessment.severity,
    confidence: assessment.confidence,
    whyFlagged: assessment.whyFlagged,
  };
}

export function aggregateKamAssessment(
  kam: KamMetricsInput | undefined,
  restaurants: RestaurantAssessment[],
  config: AgentConfig,
): KamAssessment {
  const criticalCount = restaurants.filter((restaurant) => restaurant.status === "critical").length;
  const atRiskCount = restaurants.filter((restaurant) => restaurant.status === "at_risk").length;
  const lowConfidenceCount = restaurants.filter(
    (restaurant) => restaurant.confidence < config.thresholds.signals.confidence.degradedConfidence,
  ).length;
  const concentrationRiskCount = restaurants.filter((restaurant) =>
    restaurant.signals.some((signal) => signal.type === "concentration_risk")
  ).length;
  const syntheticSignals = detectKamSignals({
    kamId: kam?.kamId ?? restaurants[0]?.kamId ?? "unknown-kam",
    criticalCount,
    atRiskCount,
    lowConfidenceCount,
    concentrationRiskCount,
  });

  const computed = computeKamPriority(restaurants, config);
  const portfolioStatus = criticalCount > 0 || computed.priorityScore >= 65
    ? "critical"
    : atRiskCount > 0 || computed.priorityScore >= 35
      ? "under_pressure"
      : "stable";

  const criticalRestaurants = restaurants
    .filter((restaurant) => restaurant.status === "critical" || restaurant.status === "at_risk")
    .sort((left, right) => right.priorityScore - left.priorityScore)
    .slice(0, 5)
    .map((restaurant) => toMiniAssessment(restaurant, restaurant.restaurantName));

  const recommendationBundle = recommendKamAction({
    kamId: kam?.kamId ?? restaurants[0]?.kamId ?? "unknown-kam",
    kamName: kam?.kamName,
    portfolioSize: restaurants.length,
    portfolioStatus,
    priorityScore: computed.priorityScore,
    confidence: computed.confidence,
    portfolioSummary: "",
    topSignals: syntheticSignals,
    topRecommendations: [],
    criticalRestaurants,
    portfolioBreakdown: {
      criticalCount: 0,
      atRiskCount: 0,
      watchlistCount: 0,
      stableCount: 0,
      averageRestaurantPriority: 0,
      lowConfidenceCount: 0,
      concentrationRiskCount: 0,
    },
  });

  const assessment: KamAssessment = {
    kamId: kam?.kamId ?? restaurants[0]?.kamId ?? "unknown-kam",
    kamName: kam?.kamName,
    portfolioSize: restaurants.length,
    portfolioStatus,
    priorityScore: computed.priorityScore,
    confidence: computed.confidence,
    portfolioSummary: "",
    topSignals: syntheticSignals.length ? syntheticSignals : computed.topSignals,
    topRecommendations: [recommendationBundle.recommendation],
    criticalRestaurants,
    portfolioBreakdown: {
      criticalCount,
      atRiskCount,
      watchlistCount: restaurants.filter((restaurant) => restaurant.status === "watchlist").length,
      stableCount: restaurants.filter((restaurant) => restaurant.status === "stable").length,
      averageRestaurantPriority: average(restaurants.map((restaurant) => restaurant.priorityScore)),
      lowConfidenceCount,
      concentrationRiskCount,
    },
    validationSummary: lowConfidenceCount
      ? `${lowConfidenceCount} cuentas requieren prudencia por confianza reducida.`
      : undefined,
    kamBriefing: undefined,
  };

  assessment.portfolioSummary = portfolioStatus === "critical"
    ? "Portfolio con presión alta y necesidad de foco inmediato."
    : portfolioStatus === "under_pressure"
      ? "Portfolio con presión moderada; conviene priorizar cuentas clave."
      : "Portfolio estable en esta corrida.";

  if (config.featureFlags.enableKamBriefing) {
    assessment.kamBriefing = `${assessment.portfolioSummary} ${recommendationBundle.nextStep.label}.`;
  }

  return assessment;
}
