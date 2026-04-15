import type { RestaurantAssessment } from "../../../agent/contracts/agent-output.ts";
import type { Case2OutputBundle } from "../output.ts";
import type { Case2DashboardViewModel } from "./types.ts";
import { getProvisionalFlags } from "./helpers.ts";

function buildDashboardAlerts(
  output: Case2OutputBundle,
): Case2DashboardViewModel["alerts"] {
  const items = output.alerts;

  return {
    activeKind: output.metadata.projection.activeAlertKind,
    items,
    summary: {
      totalAlerts: items.length,
      restaurantAlerts: items.filter((alert) => alert.entityType === "restaurant")
        .length,
      kamAlerts: items.filter((alert) => alert.entityType === "kam").length,
      highSeverityAlerts: items.filter((alert) => alert.severity === "high")
        .length,
    },
  };
}

function buildDashboardSpotlight(
  output: Case2OutputBundle,
  topPriorityRestaurants: RestaurantAssessment[],
): Case2DashboardViewModel["spotlight"] {
  return {
    mode: "global_overview",
    hasFocusSubset: output.metadata.projection.hasFocusSubset,
    restaurant: topPriorityRestaurants[0],
  };
}

export function createCase2DashboardViewModel(
  output: Case2OutputBundle,
): Case2DashboardViewModel {
  const topPriorityRestaurants = output.restaurants.slice(0, 5);

  return {
    provisional: getProvisionalFlags(output),
    semantics: {
      scenarioKind: output.metadata.projection.scenarioKind,
      universeKind: output.metadata.projection.universeKind,
      isGloballyComparable: output.metadata.projection.isGloballyComparable,
      visibleStatusSource: output.metadata.projection.visibleStatusSource,
      comparableKpiIds: output.metadata.projection.comparableKpiIds,
    },
    summary: {
      totalRestaurants: output.global.dashboard.totalRestaurants,
      criticalCount: output.global.dashboard.criticalCount,
      atRiskCount: output.global.dashboard.atRiskCount,
      watchlistCount: output.global.dashboard.watchlistCount,
      stableCount: output.global.dashboard.stableCount,
      topAlertCount: output.global.dashboard.topAlertCount,
      kamUnderPressureCount: output.global.dashboard.kamUnderPressureCount,
      averagePriorityScore: output.global.portfolio.averagePriorityScore,
    },
    globalStatus: {
      portfolioStatus: output.global.portfolio.portfolioStatus,
      totalKams: output.global.portfolio.totalKams,
      concentrationRiskCount: output.global.portfolio.concentrationRiskCount,
      isComparable: output.metadata.projection.isGloballyComparable,
    },
    spotlight: buildDashboardSpotlight(output, topPriorityRestaurants),
    alerts: buildDashboardAlerts(output),
    topPriorityRestaurants,
    kamsUnderPressure: output.global.portfolio.kamsUnderPressure,
    cityRiskSummary: output.global.dashboard.cityRiskSummary,
    verticalRiskSummary: output.global.dashboard.verticalRiskSummary,
    topSignalsSummary: output.global.dashboard.topSignalsSummary,
    interventionSummary: output.global.dashboard.interventionSummary,
    validationSnapshot: {
      rowsWithFlags: output.validation.summary.rowsWithFlags,
      rowsWithErrors: output.validation.summary.rowsWithErrors,
      benchmarkFallbackCount: output.validation.summary.benchmarkFallbackCount,
    },
    benchmarkSnapshot: {
      reliablePeerCount: output.benchmark.reliablePeerCount,
      cautionPeerCount: output.benchmark.cautionPeerCount,
      fallbackPeerCount: output.benchmark.fallbackPeerCount,
    },
  };
}
