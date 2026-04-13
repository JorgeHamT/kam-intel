import type { DemoSnapshot } from "@/lib/demo";
import type { HealthTone } from "@/types/domain";

import { getRestaurantTone } from "@/features/shared";

export function createKamDetailViewModel(snapshot: DemoSnapshot, kamId: string) {
  const kam = snapshot.kams.find((item) => item.id === kamId);

  if (!kam) {
    return null;
  }

  const relatedRestaurants = snapshot.restaurants.filter((item) => item.kamId === kam.id);
  const criticalCount = relatedRestaurants.filter((item) => item.status === "Crítico").length;
  const monitoringCount = relatedRestaurants.filter((item) => item.status === "Monitoreo").length;

  return {
    kam,
    relatedRestaurants,
    criticalCount,
    monitoringCount,
    badgeTone: (criticalCount > 0 ? "critical" : "warning") as HealthTone,
    inventoryBars: [
      {
        label: "Crítico",
        value: relatedRestaurants.filter((item) => item.status === "Crítico").length,
        toneClass: "bg-brand",
      },
      {
        label: "En riesgo",
        value: relatedRestaurants.filter((item) => item.status === "En riesgo").length,
        toneClass: "bg-amber-500",
      },
      {
        label: "Monitoreo",
        value: monitoringCount,
        toneClass: "bg-slate-400",
      },
    ],
    rankingRows: relatedRestaurants.map((restaurant) => ({
      id: restaurant.id,
      title: restaurant.name,
      subtitle: restaurant.city,
      metric: restaurant.whyFlagged,
      tone: getRestaurantTone(restaurant.status),
      href: `/restaurants/${restaurant.id}`,
    })),
  };
}
