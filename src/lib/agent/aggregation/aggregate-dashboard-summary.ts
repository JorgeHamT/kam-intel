import type {
  CityRiskSummaryItem,
  DashboardAgentSummary,
  InterventionSummaryItem,
  KamAssessment,
  PortfolioAssessment,
  RestaurantAssessment,
  TopSignalsSummaryItem,
  VerticalRiskSummaryItem,
} from "../contracts/agent-output.ts";
import { average } from "../helpers/scoring-utils.ts";

function buildCityRiskSummary(
  restaurants: RestaurantAssessment[],
  metadata: Record<string, { city: string; vertical: string }>,
): CityRiskSummaryItem[] {
  const groups = new Map<string, RestaurantAssessment[]>();

  for (const restaurant of restaurants) {
    const value = metadata[restaurant.restaurantId]?.city ?? "unknown";
    const bucket = groups.get(value) ?? [];
    bucket.push(restaurant);
    groups.set(value, bucket);
  }

  return [...groups.entries()].map(([groupValue, items]) => ({
    city: groupValue,
    restaurantCount: items.length,
    criticalCount: items.filter((item) => item.status === "critical").length,
    atRiskCount: items.filter((item) => item.status === "at_risk").length,
    averagePriorityScore: average(items.map((item) => item.priorityScore)),
  }));
}

function buildVerticalRiskSummary(
  restaurants: RestaurantAssessment[],
  metadata: Record<string, { city: string; vertical: string }>,
): VerticalRiskSummaryItem[] {
  const groups = new Map<string, RestaurantAssessment[]>();

  for (const restaurant of restaurants) {
    const value = metadata[restaurant.restaurantId]?.vertical ?? "unknown";
    const bucket = groups.get(value) ?? [];
    bucket.push(restaurant);
    groups.set(value, bucket);
  }

  return [...groups.entries()].map(([groupValue, items]) => ({
    vertical: groupValue,
    restaurantCount: items.length,
    criticalCount: items.filter((item) => item.status === "critical").length,
    atRiskCount: items.filter((item) => item.status === "at_risk").length,
    averagePriorityScore: average(items.map((item) => item.priorityScore)),
  }));
}

export function aggregateDashboardSummary(params: {
  restaurants: RestaurantAssessment[];
  kams: KamAssessment[];
  portfolio: PortfolioAssessment;
  metadata: Record<string, { city: string; vertical: string }>;
  alertCount: number;
}): DashboardAgentSummary {
  const { restaurants, kams, metadata, alertCount } = params;
  const signalCounts = new Map<TopSignalsSummaryItem["signalType"], number>();
  const interventionCounts = new Map<
    InterventionSummaryItem["recommendationCode"],
    number
  >();

  for (const restaurant of restaurants) {
    for (const signal of restaurant.signals) {
      signalCounts.set(signal.type, (signalCounts.get(signal.type) ?? 0) + 1);
    }

    interventionCounts.set(
      restaurant.recommendedAction.code,
      (interventionCounts.get(restaurant.recommendedAction.code) ?? 0) + 1,
    );
  }

  return {
    totalRestaurants: restaurants.length,
    criticalCount: restaurants.filter(
      (restaurant) => restaurant.status === "critical",
    ).length,
    atRiskCount: restaurants.filter(
      (restaurant) => restaurant.status === "at_risk",
    ).length,
    watchlistCount: restaurants.filter(
      (restaurant) => restaurant.status === "watchlist",
    ).length,
    stableCount: restaurants.filter(
      (restaurant) => restaurant.status === "stable",
    ).length,
    topAlertCount: alertCount,
    kamUnderPressureCount: kams.filter(
      (kam) => kam.portfolioStatus !== "stable",
    ).length,
    cityRiskSummary: buildCityRiskSummary(restaurants, metadata),
    verticalRiskSummary: buildVerticalRiskSummary(restaurants, metadata),
    topSignalsSummary: [...signalCounts.entries()]
      .sort((left, right) => right[1] - left[1])
      .slice(0, 5)
      .map(([signalType, count]) => ({ signalType, count })),
    interventionSummary: [...interventionCounts.entries()]
      .sort((left, right) => right[1] - left[1])
      .map(([recommendationCode, count]) => ({ recommendationCode, count })),
  };
}
