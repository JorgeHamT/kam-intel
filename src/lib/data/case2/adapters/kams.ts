import type { Case2OutputBundle } from "../output.ts";
import type { Case2KamsListViewModel } from "./types.ts";
import { getProvisionalFlags } from "./helpers.ts";

export function createCase2KamsListViewModel(
  output: Case2OutputBundle,
): Case2KamsListViewModel {
  return {
    provisional: getProvisionalFlags(output),
    summary: {
      totalKams: output.kams.length,
      underPressureCount: output.kams.filter(
        (kam) => kam.portfolioStatus !== "stable",
      ).length,
      criticalPortfolioCount: output.kams.filter(
        (kam) => kam.portfolioStatus === "critical",
      ).length,
      totalAlerts: output.alerts.length,
    },
    cards: output.kams.map((kam) => ({
      kam,
      aggregate: output.dataset.aggregates.kams.find(
        (aggregate) => aggregate.key === kam.kamId,
      ),
      restaurants: output.restaurants.filter(
        (restaurant) => restaurant.kamId === kam.kamId,
      ),
    })),
    ranking: [...output.kams]
      .sort((left, right) => right.priorityScore - left.priorityScore)
      .map((kam) => ({
        kamId: kam.kamId,
        kamName: kam.kamName,
        priorityScore: kam.priorityScore,
        portfolioStatus: kam.portfolioStatus,
        portfolioSize: kam.portfolioSize,
        averageRestaurantPriority:
          kam.portfolioBreakdown.averageRestaurantPriority,
        lowConfidenceCount: kam.portfolioBreakdown.lowConfidenceCount,
      })),
  };
}
