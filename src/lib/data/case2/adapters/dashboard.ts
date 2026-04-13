import type { Case2OutputBundle } from "../output.ts";
import type { Case2DashboardViewModel } from "./types.ts";
import { getProvisionalFlags, sortByPriority } from "./helpers.ts";

export function createCase2DashboardViewModel(
  output: Case2OutputBundle,
): Case2DashboardViewModel {
  return {
    provisional: getProvisionalFlags(output),
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
    topPriorityRestaurants: sortByPriority(output.restaurants).slice(0, 5),
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
