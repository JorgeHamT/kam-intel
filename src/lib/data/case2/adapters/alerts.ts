import type { Case2OutputBundle } from "../output.ts";
import type { Case2AlertsFeedViewModel } from "./types.ts";
import {
  findKam,
  findRestaurant,
  findValidationOverlay,
  getProvisionalFlags,
} from "./helpers.ts";

export function createCase2AlertsFeedViewModel(
  output: Case2OutputBundle,
): Case2AlertsFeedViewModel {
  return {
    provisional: getProvisionalFlags(output),
    summary: {
      totalAlerts: output.alerts.length,
      restaurantAlerts: output.alerts.filter(
        (alert) => alert.entityType === "restaurant",
      ).length,
      kamAlerts: output.alerts.filter((alert) => alert.entityType === "kam")
        .length,
      highSeverityAlerts: output.alerts.filter(
        (alert) => alert.severity === "high",
      ).length,
    },
    alerts: output.alerts.map((alert) => ({
      alert,
      restaurant:
        alert.entityType === "restaurant"
          ? findRestaurant(output, alert.entityId)
          : undefined,
      kam:
        alert.entityType === "kam"
          ? findKam(output, alert.entityId)
          : undefined,
      validationOverlay:
        alert.entityType === "restaurant"
          ? findValidationOverlay(output, alert.entityId)
          : undefined,
    })),
  };
}
