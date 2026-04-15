import type {
  KamAssessment,
  RestaurantAssessment,
} from "@/lib/agent/contracts/agent-output";

const RESTAURANT_STATUS_WEIGHT = {
  critical: 4,
  at_risk: 3,
  watchlist: 2,
  stable: 1,
} as const;

const RESTAURANT_SEVERITY_WEIGHT = {
  high: 3,
  medium: 2,
  low: 1,
} as const;

const KAM_STATUS_WEIGHT = {
  critical: 3,
  under_pressure: 2,
  stable: 1,
} as const;

export type CanonicalWalkthroughRankingVersion =
  "canonical-walkthrough-ranking-v1";

export type CanonicalRestaurantRankingEntry = {
  entityType: "restaurant";
  entityId: string;
  restaurantId: string;
  kamId: string;
  priorityScore: number;
  status: RestaurantAssessment["status"];
  severity: RestaurantAssessment["severity"];
  confidence: number;
};

export type CanonicalKamRankingEntry = {
  entityType: "kam";
  entityId: string;
  kamId: string;
  priorityScore: number;
  portfolioStatus: KamAssessment["portfolioStatus"];
  confidence: number;
  portfolioSize: number;
  averageRestaurantPriority: number;
};

export type CanonicalWalkthroughTargets = {
  version: CanonicalWalkthroughRankingVersion;
  restaurants: CanonicalRestaurantRankingEntry[];
  kams: CanonicalKamRankingEntry[];
  primaryRestaurantId?: string;
  primaryKamId?: string;
};

export type FocalWalkthroughRankingVersion = "focal-kam-narrative-v1";

export type FocalWalkthroughTargets = {
  version: FocalWalkthroughRankingVersion;
  focalKamId?: string;
  focalRestaurants: CanonicalRestaurantRankingEntry[];
  primaryRestaurantId?: string;
  primaryKamId?: string;
};

function compareTextFallback(left?: string, right?: string) {
  return (left ?? "").localeCompare(right ?? "", "es");
}

export function getCanonicalRestaurantRanking(
  restaurants: RestaurantAssessment[],
): CanonicalRestaurantRankingEntry[] {
  return restaurants
    .map((restaurant) => ({
      entityType: "restaurant" as const,
      entityId: restaurant.restaurantId,
      restaurantId: restaurant.restaurantId,
      kamId: restaurant.kamId,
      priorityScore: restaurant.priorityScore,
      status: restaurant.status,
      severity: restaurant.severity,
      confidence: restaurant.confidence,
    }))
    .sort((left, right) => {
      return (
        right.priorityScore - left.priorityScore ||
        RESTAURANT_STATUS_WEIGHT[right.status] -
          RESTAURANT_STATUS_WEIGHT[left.status] ||
        RESTAURANT_SEVERITY_WEIGHT[right.severity] -
          RESTAURANT_SEVERITY_WEIGHT[left.severity] ||
        right.confidence - left.confidence ||
        compareTextFallback(left.restaurantId, right.restaurantId)
      );
    });
}

export function getCanonicalKamRanking(
  kams: KamAssessment[],
): CanonicalKamRankingEntry[] {
  return kams
    .map((kam) => ({
      entityType: "kam" as const,
      entityId: kam.kamId,
      kamId: kam.kamId,
      priorityScore: kam.priorityScore,
      portfolioStatus: kam.portfolioStatus,
      confidence: kam.confidence,
      portfolioSize: kam.portfolioSize,
      averageRestaurantPriority: kam.portfolioBreakdown.averageRestaurantPriority,
    }))
    .sort((left, right) => {
      return (
        right.priorityScore - left.priorityScore ||
        KAM_STATUS_WEIGHT[right.portfolioStatus] -
          KAM_STATUS_WEIGHT[left.portfolioStatus] ||
        right.averageRestaurantPriority - left.averageRestaurantPriority ||
        right.confidence - left.confidence ||
        right.portfolioSize - left.portfolioSize ||
        compareTextFallback(left.kamId, right.kamId)
      );
    });
}

export function getCanonicalWalkthroughTargets(params: {
  restaurants: RestaurantAssessment[];
  kams: KamAssessment[];
}): CanonicalWalkthroughTargets {
  const restaurantRanking = getCanonicalRestaurantRanking(params.restaurants);
  const kamRanking = getCanonicalKamRanking(params.kams);

  return {
    version: "canonical-walkthrough-ranking-v1",
    restaurants: restaurantRanking,
    kams: kamRanking,
    primaryRestaurantId: restaurantRanking[0]?.restaurantId,
    primaryKamId:
      kamRanking[0]?.kamId ?? restaurantRanking[0]?.kamId,
  };
}

export function getFocalWalkthroughTargets(params: {
  focalKamId?: string;
  restaurants: RestaurantAssessment[];
  kams: KamAssessment[];
}): FocalWalkthroughTargets {
  const primaryKamId =
    params.focalKamId ??
    getCanonicalKamRanking(params.kams)[0]?.kamId;
  const focalRestaurants = getCanonicalRestaurantRanking(
    params.restaurants.filter(
      (restaurant) => restaurant.kamId === primaryKamId,
    ),
  );

  return {
    version: "focal-kam-narrative-v1",
    focalKamId: primaryKamId,
    focalRestaurants,
    primaryKamId,
    primaryRestaurantId: focalRestaurants[0]?.restaurantId,
  };
}
