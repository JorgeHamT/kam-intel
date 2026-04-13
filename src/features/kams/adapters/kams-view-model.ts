import type { HealthTone } from "@/types/domain";
import type { DemoSnapshot } from "@/lib/demo";

import { getKamPriorityTone } from "@/features/shared";

function getKamTone(statuses: DemoSnapshot["restaurants"][number]["status"][]): HealthTone {
  if (statuses.includes("Crítico")) {
    return "critical";
  }

  if (statuses.includes("En riesgo")) {
    return "warning";
  }

  return "info";
}

export function createKamsViewModel(snapshot: DemoSnapshot) {
  const totalAlerts = snapshot.kams.reduce((acc, kam) => acc + kam.openAlerts, 0);
  const totalRestaurantsAtRisk = snapshot.kams.reduce(
    (acc, kam) => acc + kam.restaurantsAtRisk,
    0,
  );

  return {
    summary: {
      totalAlerts,
      totalRestaurantsAtRisk,
    },
    cards: snapshot.kams.map((kam) => {
      const linkedRestaurants = snapshot.restaurants.filter((item) => item.kamId === kam.id);
      const tone = getKamTone(linkedRestaurants.map((restaurant) => restaurant.status));

      return {
        kam,
        linkedRestaurants,
        tone,
      };
    }),
    rankingRows: snapshot.kams.map((kam) => ({
      id: kam.id,
      title: kam.name,
      subtitle: kam.portfolio,
      metric: `${kam.restaurantsAtRisk} cuentas en riesgo · ${kam.openAlerts} alertas`,
      tone: getKamPriorityTone(kam.openAlerts),
      href: `/kams/${kam.id}`,
    })),
  };
}
