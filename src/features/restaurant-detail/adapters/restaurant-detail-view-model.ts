import type { DemoSnapshot } from "@/lib/demo";

import { getRestaurantTone } from "@/features/shared";

export function createRestaurantDetailViewModel(
  snapshot: DemoSnapshot,
  restaurantId: string,
) {
  const restaurant = snapshot.restaurants.find((item) => item.id === restaurantId);

  if (!restaurant) {
    return null;
  }

  const kam = snapshot.kams.find((item) => item.id === restaurant.kamId);
  const tone = getRestaurantTone(restaurant.status);

  return {
    restaurant,
    kam,
    tone,
  };
}
