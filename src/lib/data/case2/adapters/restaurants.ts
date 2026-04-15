import type { Case2OutputBundle } from "../output.ts";
import type { Case2RestaurantsListViewModel } from "./types.ts";
import {
  findKam,
  findValidationOverlay,
  getProvisionalFlags,
} from "./helpers.ts";

function sortRestaurantsForIndex(
  restaurants: Case2OutputBundle["restaurants"],
) {
  return [...restaurants].sort((left, right) => {
    return (
      (left.restaurantName ?? left.restaurantId).localeCompare(
        right.restaurantName ?? right.restaurantId,
        "es",
      ) || left.restaurantId.localeCompare(right.restaurantId, "es")
    );
  });
}

export function createCase2RestaurantsListViewModel(
  output: Case2OutputBundle,
): Case2RestaurantsListViewModel {
  const aggregateByRestaurantId = new Map(
    output.dataset.aggregates.restaurants.map((aggregate) => [
      aggregate.key,
      aggregate,
    ]),
  );
  const alertByRestaurantId = new Map(
    output.alerts
      .filter((alert) => alert.entityType === "restaurant")
      .map((alert) => [alert.entityId, alert]),
  );

  const restaurants = sortRestaurantsForIndex(output.restaurants).map((restaurant) => {
    const aggregate = aggregateByRestaurantId.get(restaurant.restaurantId);

    return {
      restaurant,
      kam: findKam(output, restaurant.kamId),
      aggregate,
      alert: alertByRestaurantId.get(restaurant.restaurantId),
      validationOverlay: findValidationOverlay(output, restaurant.restaurantId),
      location: {
        city:
          output.dataset.restaurantMetadata[restaurant.restaurantId]?.city ??
          "Sin dato",
        vertical:
          output.dataset.restaurantMetadata[restaurant.restaurantId]?.vertical ??
          "Sin dato",
      },
      metrics: {
        gmvProxy7d: aggregate?.sums.gmvProxy7d ?? 0,
        currentRating: aggregate?.averages.currentRating ?? null,
        cancellationRatePct: aggregate?.averages.cancellationRatePct ?? null,
        avgDeliveryTimeMin: aggregate?.averages.avgDeliveryTimeMin ?? null,
      },
    };
  });

  return {
    provisional: getProvisionalFlags(output),
    semantics: {
      scenarioKind: output.metadata.projection.scenarioKind,
      universeKind: output.metadata.projection.universeKind,
      isGloballyComparable: output.metadata.projection.isGloballyComparable,
      visibleStatusSource: output.metadata.projection.visibleStatusSource,
      comparableKpiIds: output.metadata.projection.comparableKpiIds,
    },
    summary: {
      totalRestaurants: output.global.dashboard.totalRestaurants,
      criticalCount: output.global.dashboard.criticalCount,
      atRiskCount: output.global.dashboard.atRiskCount,
      watchlistCount: output.global.dashboard.watchlistCount,
      stableCount: output.global.dashboard.stableCount,
    },
    restaurants,
  };
}
