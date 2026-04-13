import type { DemoSnapshot } from "@/lib/demo";

export function createAlertsViewModel(snapshot: DemoSnapshot) {
  return {
    tabs: [
      { id: "all", label: "Todas", count: snapshot.alertSummary.length },
      {
        id: "critical",
        label: "Bloqueando",
        count: snapshot.alertSummary.filter((alert) => alert.status.includes("Bloqueando")).length,
      },
      {
        id: "follow-up",
        label: "Seguimiento",
        count: snapshot.alertSummary.filter((alert) => alert.status.includes("seguimiento")).length,
      },
      {
        id: "pending",
        label: "Pendientes",
        count: snapshot.alertSummary.filter((alert) => alert.status.includes("Pendiente")).length,
      },
    ],
    alertCards: snapshot.alertSummary.map((alert) => {
      const restaurant = alert.restaurantId
        ? snapshot.restaurants.find((item) => item.id === alert.restaurantId)
        : undefined;
      const isBlocking = alert.status.includes("Bloqueando");

      return {
        alert,
        restaurant,
        isBlocking,
      };
    }),
  };
}
