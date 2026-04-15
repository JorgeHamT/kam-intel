import type { Case2OutputBundle } from "../output.ts";
import type { Case2KamDetailViewModel } from "./types.ts";
import { findKam, findValidationOverlay, getProvisionalFlags } from "./helpers.ts";

export function createCase2KamDetailViewModel(
  output: Case2OutputBundle,
  kamId: string,
): Case2KamDetailViewModel | null {
  const kam = findKam(output, kamId);

  if (!kam) {
    return null;
  }

  const restaurants = output.restaurants.filter(
    (restaurant) => restaurant.kamId === kam.kamId,
  );
  const aggregateByRestaurantId = new Map(
    output.dataset.aggregates.restaurants.map((item) => [item.key, item]),
  );
  const classifiedRestaurants = restaurants.map((restaurant) => {
    const originalRiskLabel = restaurant.benchmark?.originalRiskLabel ?? null;
    const displayStatus =
      restaurant.status === "watchlist" ? "at_risk" : restaurant.status;

    return {
      restaurant,
      displayStatus,
      originalRiskLabel,
    };
  });
  const criticalCount = classifiedRestaurants.filter(
    (item) => item.displayStatus === "critical",
  ).length;
  const atRiskCount = classifiedRestaurants.filter(
    (item) => item.displayStatus === "at_risk",
  ).length;
  const stableCount = classifiedRestaurants.filter(
    (item) => item.displayStatus === "stable",
  ).length;
  const totalCount = Math.max(classifiedRestaurants.length, 1);
  const revenueAtRiskMxn = classifiedRestaurants
    .filter(
      (item) =>
        item.displayStatus === "critical" || item.displayStatus === "at_risk",
    )
    .reduce(
      (sum, item) =>
        sum +
        (aggregateByRestaurantId.get(item.restaurant.restaurantId)?.sums.gmvProxy7d ?? 0),
      0,
    );
  const healthScore =
    ((stableCount * 100 + atRiskCount * 50) / totalCount);
  const opsPressurePct = ((criticalCount + atRiskCount) / totalCount) * 100;

  return {
    provisional: getProvisionalFlags(output),
    kam,
    aggregate: output.dataset.aggregates.kams.find(
      (aggregate) => aggregate.key === kam.kamId,
    ),
    restaurants,
    alerts: output.alerts.filter(
      (alert) => alert.entityType === "kam" && alert.entityId === kam.kamId,
    ),
    classifiedRestaurants,
    validationOverlays: restaurants
      .map((restaurant) =>
        findValidationOverlay(output, restaurant.restaurantId),
      )
      .filter(
        (overlay): overlay is NonNullable<typeof overlay> =>
          overlay !== undefined,
      ),
    portfolioBreakdown: kam.portfolioBreakdown,
    displayBreakdown: {
      criticalCount,
      atRiskCount,
      stableCount,
      totalCount,
      revenueAtRiskMxn,
      healthScore,
      opsPressurePct,
    },
  };
}
