import type { Case2OutputBundle } from "../output.ts";
import type { Case2RestaurantDetailViewModel } from "./types.ts";
import {
  findKam,
  findValidationOverlay,
  getProvisionalFlags,
} from "./helpers.ts";

export function createCase2RestaurantDetailViewModel(
  output: Case2OutputBundle,
  restaurantId: string,
): Case2RestaurantDetailViewModel | null {
  const restaurant = output.restaurants.find(
    (candidate) => candidate.restaurantId === restaurantId,
  );

  if (!restaurant) {
    return null;
  }
  const meta = output.dataset.restaurantMetadata[restaurant.restaurantId];
  const location = {
    city: meta?.city ?? "Sin dato",
    vertical: meta?.vertical ?? "Sin dato",
  };

  return {
    provisional: getProvisionalFlags(output),
    restaurant,
    kam: findKam(output, restaurant.kamId),
    aggregate: output.dataset.aggregates.restaurants.find(
      (aggregate) => aggregate.key === restaurant.restaurantId,
    ),
    alert: output.alerts.find(
      (alert) =>
        alert.entityType === "restaurant" &&
        alert.entityId === restaurant.restaurantId,
    ),
    validationOverlay: findValidationOverlay(output, restaurant.restaurantId),
    location,
  };
}
