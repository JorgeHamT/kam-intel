import type { DemoSnapshot } from "@/lib/demo";

import { getKamPriorityTone } from "@/features/shared";

export function createDashboardViewModel(snapshot: DemoSnapshot) {
  const restaurantsByCity = snapshot.restaurants.reduce<Record<string, number>>((acc, restaurant) => {
    acc[restaurant.city] = (acc[restaurant.city] ?? 0) + 1;
    return acc;
  }, {});

  return {
    header: {
      eyebrow: "Control tower",
      title: "Inteligencia operativa para foco comercial inmediato",
      description:
        "Lectura ejecutiva del portafolio: dónde está concentrado el riesgo, qué ya detectó el agente y en qué orden conviene intervenir sin sobreprometer precisión no validada.",
    },
    scenario: snapshot.scenarioOption,
    topKpis: snapshot.topKpis,
    kamPressureItems: snapshot.kamPressureItems,
    alertSummary: snapshot.alertSummary,
    kams: snapshot.kams,
    restaurants: snapshot.restaurants,
    cityBars: Object.entries(restaurantsByCity).map(([city, total]) => ({
      city,
      total,
    })),
    rankingRows: snapshot.kams.map((kam) => ({
      id: kam.id,
      title: kam.name,
      subtitle: kam.portfolio,
      metric: `${kam.restaurantsAtRisk} restaurantes en riesgo · ${kam.openAlerts} alertas abiertas`,
      tone: getKamPriorityTone(kam.openAlerts),
      href: `/kams/${kam.id}`,
    })),
    digest: snapshot.agentDigest,
  };
}
