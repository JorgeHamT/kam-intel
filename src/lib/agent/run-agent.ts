import { aggregateDashboardSummary } from "./aggregation/aggregate-dashboard-summary.ts";
import { aggregateKamAssessment } from "./aggregation/aggregate-kam-assessment.ts";
import { aggregateRestaurantAssessment } from "./aggregation/aggregate-restaurant-assessment.ts";
import { buildAlertFeed } from "./aggregation/build-alert-feed.ts";
import { createAgentConfig, type AgentConfig } from "./config/index.ts";
import type {
  AgentInput,
  KamMetricsInput,
  RestaurantMetricsInput,
} from "./contracts/agent-input.ts";
import type {
  AgentResult,
  PortfolioAssessment,
  RestaurantAssessment,
} from "./contracts/agent-output.ts";
import { average } from "./helpers/scoring-utils.ts";

function groupByKam(
  restaurants: RestaurantMetricsInput[],
): Map<string, RestaurantMetricsInput[]> {
  const result = new Map<string, RestaurantMetricsInput[]>();

  for (const restaurant of restaurants) {
    const group = result.get(restaurant.kamId) ?? [];
    group.push(restaurant);
    result.set(restaurant.kamId, group);
  }

  return result;
}

function mapKamMetadata(
  kams: KamMetricsInput[] | undefined,
): Map<string, KamMetricsInput> {
  return new Map((kams ?? []).map((kam) => [kam.kamId, kam]));
}

export function runAgent(
  input: AgentInput,
  configOverrides?: Partial<AgentConfig>,
): AgentResult {
  const config = createAgentConfig(configOverrides);
  const restaurantsByKam = groupByKam(input.restaurants);
  const kamMetadata = mapKamMetadata(input.kams);
  const metadataByRestaurant = Object.fromEntries(
    input.restaurants.map((restaurant) => [
      restaurant.restaurantId,
      { city: restaurant.city, vertical: restaurant.vertical },
    ]),
  );

  const restaurantAssessments: RestaurantAssessment[] = [];
  const validationOverlays = [];

  for (const restaurant of input.restaurants) {
    const portfolioRestaurants = restaurantsByKam.get(restaurant.kamId) ?? [];
    const kamPortfolioGmv7d = portfolioRestaurants.reduce(
      (acc, current) => acc + (current.gmvProxy7d ?? 0),
      0,
    );
    const concentrationShare =
      kamPortfolioGmv7d > 0
        ? (restaurant.gmvProxy7d ?? 0) / kamPortfolioGmv7d
        : 0;
    const { assessment, validationOverlay } = aggregateRestaurantAssessment(
      restaurant,
      config,
      {
        kamPortfolioGmv7d,
        concentrationShare,
      },
    );

    restaurantAssessments.push(assessment);
    validationOverlays.push(validationOverlay);
  }

  const kamAssessments = [...restaurantsByKam.entries()].map(([kamId]) => {
    const kamRestaurants = restaurantAssessments.filter(
      (assessment) => assessment.kamId === kamId,
    );
    return aggregateKamAssessment(
      kamMetadata.get(kamId),
      kamRestaurants,
      config,
    );
  });

  const portfolio: PortfolioAssessment = {
    portfolioStatus: kamAssessments.some(
      (kam) => kam.portfolioStatus === "critical",
    )
      ? "critical"
      : kamAssessments.some((kam) => kam.portfolioStatus === "under_pressure")
        ? "under_pressure"
        : "stable",
    totalRestaurants: restaurantAssessments.length,
    totalKams: kamAssessments.length,
    concentrationRiskCount: restaurantAssessments.filter((restaurant) =>
      restaurant.signals.some((signal) => signal.type === "concentration_risk"),
    ).length,
    averagePriorityScore: average(
      restaurantAssessments.map((restaurant) => restaurant.priorityScore),
    ),
    highestPriorityRestaurants: restaurantAssessments
      .sort((left, right) => right.priorityScore - left.priorityScore)
      .slice(0, 5)
      .map((restaurant) => ({
        restaurantId: restaurant.restaurantId,
        restaurantName: restaurant.restaurantName,
        status: restaurant.status,
        priorityScore: restaurant.priorityScore,
        severity: restaurant.severity,
        confidence: restaurant.confidence,
        whyFlagged: restaurant.whyFlagged,
      })),
    kamsUnderPressure: kamAssessments
      .filter((kam) => kam.portfolioStatus !== "stable")
      .map((kam) => ({
        kamId: kam.kamId,
        kamName: kam.kamName,
        priorityScore: kam.priorityScore,
        portfolioStatus: kam.portfolioStatus,
      })),
  };

  const alerts = buildAlertFeed({
    restaurants: restaurantAssessments,
    kams: kamAssessments,
    topRestaurantCount: config.thresholds.alerts.topRestaurantCount,
    topKamCount: config.thresholds.alerts.topKamCount,
  });

  const summary = aggregateDashboardSummary({
    restaurants: restaurantAssessments,
    kams: kamAssessments,
    portfolio,
    metadata: metadataByRestaurant,
    alertCount: alerts.length,
  });

  return {
    restaurants: restaurantAssessments,
    kams: kamAssessments,
    portfolio,
    summary,
    alerts,
    validationOverlays,
  };
}
