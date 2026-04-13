import type {
  AgentValidationOverlay,
  KamAssessment,
  RestaurantAssessment,
} from "../../../agent/contracts/agent-output.ts";
import type { Case2OutputBundle } from "../output.ts";

export function sortByPriority<T extends { priorityScore: number }>(
  items: T[],
): T[] {
  return [...items].sort(
    (left, right) => right.priorityScore - left.priorityScore,
  );
}

export function findKam(
  output: Case2OutputBundle,
  kamId: string,
): KamAssessment | undefined {
  return output.kams.find((kam) => kam.kamId === kamId);
}

export function findRestaurant(
  output: Case2OutputBundle,
  restaurantId: string,
): RestaurantAssessment | undefined {
  return output.restaurants.find(
    (restaurant) => restaurant.restaurantId === restaurantId,
  );
}

export function findValidationOverlay(
  output: Case2OutputBundle,
  entityId: string,
): AgentValidationOverlay | undefined {
  return output.validation.overlays.find(
    (overlay) => overlay.entityId === entityId,
  );
}

export function getProvisionalFlags(output: Case2OutputBundle) {
  return output.metadata.provisional;
}
