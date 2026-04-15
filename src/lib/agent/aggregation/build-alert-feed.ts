import type {
  AlertFeedItem,
  KamAssessment,
  RestaurantAssessment,
} from "../contracts/agent-output.ts";
import { recommendKamAction } from "../recommendations/recommend-kam-action.ts";

export function buildAlertFeed(params: {
  restaurants: RestaurantAssessment[];
  kams: KamAssessment[];
  maxVisibleCount: number;
}): AlertFeedItem[] {
  const restaurantAlerts = params.restaurants
    .filter((restaurant) => restaurant.status !== "stable")
    .sort((left, right) => right.priorityScore - left.priorityScore)
    .map<AlertFeedItem>((restaurant) => ({
      alertId: `restaurant-${restaurant.restaurantId}`,
      entityType: "restaurant",
      entityId: restaurant.restaurantId,
      title: restaurant.restaurantName
        ? `${restaurant.restaurantName} requiere atención`
        : `Restaurante ${restaurant.restaurantId} requiere atención`,
      priorityScore: restaurant.priorityScore,
      severity: restaurant.severity,
      whyFlagged: restaurant.whyFlagged,
      recommendedAction: restaurant.recommendedAction,
      nextBestStep: restaurant.nextBestStep,
      confidence: restaurant.confidence,
      createdFromSignals: restaurant.signals.map((signal) => signal.id),
    }));

  const kamAlerts = params.kams
    .filter((kam) => kam.portfolioStatus !== "stable")
    .sort((left, right) => right.priorityScore - left.priorityScore)
    .map<AlertFeedItem>((kam) => {
      const recommendation = recommendKamAction(kam);
      return {
        alertId: `kam-${kam.kamId}`,
        entityType: "kam",
        entityId: kam.kamId,
        title: `${kam.kamName ?? kam.kamId} bajo presión`,
        priorityScore: kam.priorityScore,
        severity:
          kam.priorityScore >= 70
            ? "high"
            : kam.priorityScore >= 40
              ? "medium"
              : "low",
        whyFlagged: [kam.portfolioSummary],
        recommendedAction: recommendation.recommendation,
        nextBestStep: recommendation.nextStep,
        confidence: kam.confidence,
        createdFromSignals: kam.topSignals.map((signal) => signal.id),
      };
    });

  const severityWeight = {
    high: 3,
    medium: 2,
    low: 1,
  } as const;

  return [...restaurantAlerts, ...kamAlerts]
    .sort(
      (left, right) =>
        severityWeight[right.severity] - severityWeight[left.severity] ||
        right.priorityScore - left.priorityScore,
    )
    .slice(0, params.maxVisibleCount);
}
