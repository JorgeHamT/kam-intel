import type { Case2OutputBundle } from "../output.ts";
import type { Case2ValidationViewModel } from "./types.ts";
import { findRestaurant, getProvisionalFlags } from "./helpers.ts";

export function createCase2ValidationViewModel(
  output: Case2OutputBundle,
): Case2ValidationViewModel {
  return {
    provisional: getProvisionalFlags(output),
    summary: output.validation.summary,
    overlays: output.validation.overlays,
    impactedRestaurants: output.validation.overlays
      .filter((overlay) => overlay.relatedValidationFlags.length > 0)
      .sort((left, right) => left.confidence - right.confidence)
      .map((overlay) => {
        const restaurant = findRestaurant(output, overlay.entityId);
        return {
          restaurantId: overlay.entityId,
          restaurantName: restaurant?.restaurantName,
          confidence: overlay.confidence,
          validationFlagsCount: overlay.relatedValidationFlags.length,
          validationNote: restaurant?.validationNote,
        };
      }),
    benchmarkSnapshot: {
      reliablePeerCount: output.benchmark.reliablePeerCount,
      cautionPeerCount: output.benchmark.cautionPeerCount,
      fallbackPeerCount: output.benchmark.fallbackPeerCount,
      mismatchSummary: output.benchmark.mismatchSummary,
    },
  };
}
