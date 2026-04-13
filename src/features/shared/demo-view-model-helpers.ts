import type { DemoRestaurantStatus, HealthTone } from "@/types/domain";

export function getRestaurantTone(status: DemoRestaurantStatus): HealthTone {
  if (status === "Crítico") {
    return "critical";
  }

  if (status === "En riesgo") {
    return "warning";
  }

  return "info";
}

export function getKamPriorityTone(openAlerts: number): HealthTone {
  if (openAlerts >= 4) {
    return "critical";
  }

  if (openAlerts >= 3) {
    return "warning";
  }

  return "info";
}
