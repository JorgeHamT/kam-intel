import type { Case2OutputBundle } from "../output.ts";
import type { Case2KamDetailViewModel } from "./types.ts";
import { findValidationOverlay, getProvisionalFlags } from "./helpers.ts";

export function createCase2KamDetailViewModel(
  output: Case2OutputBundle,
  kamId: string,
): Case2KamDetailViewModel | null {
  const kam = output.kams.find((candidate) => candidate.kamId === kamId);

  if (!kam) {
    return null;
  }

  const restaurants = output.restaurants.filter(
    (restaurant) => restaurant.kamId === kam.kamId,
  );

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
    validationOverlays: restaurants
      .map((restaurant) =>
        findValidationOverlay(output, restaurant.restaurantId),
      )
      .filter(
        (overlay): overlay is NonNullable<typeof overlay> =>
          overlay !== undefined,
      ),
    portfolioBreakdown: kam.portfolioBreakdown,
  };
}
