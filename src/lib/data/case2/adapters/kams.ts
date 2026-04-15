import type { Case2OutputBundle } from "../output.ts";
import type { Case2KamsListViewModel } from "./types.ts";
import { getProvisionalFlags } from "./helpers.ts";

function getProjectedStatus(
  restaurant: Case2OutputBundle["restaurants"][number],
): "critical" | "at_risk" | "watchlist" | "stable" {
  return restaurant.status;
}

function getDisplayStatus(
  restaurant: Case2OutputBundle["restaurants"][number],
): "critical" | "at_risk" | "stable" {
  return restaurant.status === "watchlist" ? "at_risk" : restaurant.status;
}

function roundTo(value: number, digits = 2) {
  return Number(value.toFixed(digits));
}

function sumAtRiskRevenue(
  output: Case2OutputBundle,
  restaurantIds: string[],
): number {
  const aggregateByRestaurantId = new Map(
    output.dataset.aggregates.restaurants.map((aggregate) => [
      aggregate.key,
      aggregate,
    ]),
  );

  return roundTo(
    restaurantIds.reduce((sum, restaurantId) => {
      const aggregate = aggregateByRestaurantId.get(restaurantId);
      return sum + (aggregate?.sums.gmvProxy7d ?? 0);
    }, 0),
  );
}

export function createCase2KamsListViewModel(
  output: Case2OutputBundle,
  baselineOutput: Case2OutputBundle = output,
): Case2KamsListViewModel {
  void baselineOutput;

  return {
    provisional: getProvisionalFlags(output),
    summary: {
      totalKams: output.kams.length,
      underPressureCount: output.kams.filter((kam) => {
        const restaurants = output.restaurants.filter(
          (restaurant) => restaurant.kamId === kam.kamId,
        );
        return restaurants.some(
          (restaurant) =>
            getProjectedStatus(restaurant) === "critical" ||
            getProjectedStatus(restaurant) === "at_risk",
        );
      }).length,
      criticalPortfolioCount: output.kams.filter((kam) => {
        const restaurants = output.restaurants.filter(
          (restaurant) => restaurant.kamId === kam.kamId,
        );
        return restaurants.some(
          (restaurant) => getProjectedStatus(restaurant) === "critical",
        );
      }).length,
      totalAlerts: output.alerts.length,
    },
    cards: output.kams.map((kam) => {
      const restaurants = output.restaurants.filter(
        (restaurant) => restaurant.kamId === kam.kamId,
      );
      const classifiedRestaurants = restaurants.map((restaurant) => {
        return {
          restaurant,
          projectedStatus: getProjectedStatus(restaurant),
          displayStatus: getDisplayStatus(restaurant),
        };
      });
      const criticalRestaurants = classifiedRestaurants.filter(
        (item) => item.projectedStatus === "critical",
      );
      const atRiskRestaurants = classifiedRestaurants.filter(
        (item) => item.displayStatus === "at_risk",
      );
      const stableCount = classifiedRestaurants.filter(
        (item) => item.displayStatus === "stable",
      ).length;
      const totalCount = Math.max(restaurants.length, 1);
      const pressurePct =
        totalCount > 0
          ? roundTo(
              ((criticalRestaurants.length + atRiskRestaurants.length) / totalCount) * 100,
              1,
            )
          : 0;
      const healthScore =
        totalCount > 0
          ? roundTo(
              (stableCount * 100 + atRiskRestaurants.length * 50) / totalCount,
              1,
            )
          : 0;
      const visiblePriorityScore =
        criticalRestaurants.length * 1000 +
        atRiskRestaurants.length * 100 +
        pressurePct +
        roundTo(
          sumAtRiskRevenue(
            output,
            [...criticalRestaurants, ...atRiskRestaurants].map(
              (item) => item.restaurant.restaurantId,
            ),
          ) / 1000,
          1,
        );
      const alertCount = criticalRestaurants.length + atRiskRestaurants.length;

      return {
        kam: {
          ...kam,
          portfolioSize: totalCount,
        },
        aggregate: output.dataset.aggregates.kams.find(
          (aggregate) => aggregate.key === kam.kamId,
        ),
        restaurants,
        metrics: {
          revenueAtRiskMxn: sumAtRiskRevenue(
            output,
            [...criticalRestaurants, ...atRiskRestaurants].map(
              (item) => item.restaurant.restaurantId,
            ),
          ),
          healthScore,
          pressurePct,
          alertCount,
          visiblePriorityScore,
          portfolioMix: {
            criticalCount: criticalRestaurants.length,
            atRiskCount: atRiskRestaurants.length,
            stableCount,
            totalCount,
          },
        },
      };
    }),
    ranking: output.kams
      .map((kam) => {
        const restaurants = output.restaurants.filter(
          (restaurant) => restaurant.kamId === kam.kamId,
        );
        const classifiedRestaurants = restaurants.map((restaurant) =>
          getDisplayStatus(restaurant),
        );
        const criticalCount = classifiedRestaurants.filter(
          (status) => status === "critical",
        ).length;
        const atRiskCount = classifiedRestaurants.filter(
          (status) => status === "at_risk",
        ).length;
        const totalCount = Math.max(classifiedRestaurants.length, 1);
        const visiblePriorityScore =
          criticalCount * 1000 +
          atRiskCount * 100 +
          ((criticalCount + atRiskCount) / totalCount) * 100;

        return {
          kamId: kam.kamId,
          kamName: kam.kamName,
          priorityScore: visiblePriorityScore,
          portfolioStatus: kam.portfolioStatus,
          portfolioSize: restaurants.length || kam.portfolioSize,
          averageRestaurantPriority:
            kam.portfolioBreakdown.averageRestaurantPriority,
          lowConfidenceCount: kam.portfolioBreakdown.lowConfidenceCount,
        };
      })
      .sort((left, right) => right.priorityScore - left.priorityScore),
  };
}
