import type { AgentConfig } from "../config/index.ts";
import type { RestaurantMetricsInput } from "../contracts/agent-input.ts";
import type {
  BenchmarkComparison,
  RestaurantAssessment,
} from "../contracts/agent-output.ts";
import { buildRestaurantConfidenceOverlay } from "../helpers/confidence-utils.ts";
import { selectPeerGroup } from "../helpers/peer-group-utils.ts";
import { computeRestaurantPriority } from "../scoring/compute-restaurant-priority.ts";
import {
  classifySeverity,
  classifyStatus,
} from "../scoring/severity-classification.ts";
import {
  buildBusinessSummary,
  buildWhyFlagged,
} from "../recommendations/narrative-templates.ts";
import { recommendRestaurantAction } from "../recommendations/recommend-restaurant-action.ts";
import { detectRestaurantSignals } from "../signals/detect-restaurant-signals.ts";

export function aggregateRestaurantAssessment(
  restaurant: RestaurantMetricsInput,
  config: AgentConfig,
  portfolioContext: { kamPortfolioGmv7d: number; concentrationShare: number },
): {
  assessment: RestaurantAssessment;
  validationOverlay: ReturnType<typeof buildRestaurantConfidenceOverlay>;
} {
  const preliminarySignals = detectRestaurantSignals(
    restaurant,
    config,
    portfolioContext,
  );
  const benchmarkConflict = preliminarySignals.some(
    (signal) => signal.type === "benchmark_conflict",
  );
  const validationOverlay = buildRestaurantConfidenceOverlay(
    restaurant,
    config,
    benchmarkConflict,
  );
  const { priorityScore, breakdown } = computeRestaurantPriority(
    restaurant,
    preliminarySignals,
    validationOverlay,
    config,
  );
  const status = classifyStatus(priorityScore, preliminarySignals, config);
  const severity = classifySeverity(priorityScore, config);
  const benchmarkSelection = selectPeerGroup(restaurant.benchmark, config);
  const notableDeltas = Object.entries(
    benchmarkSelection.candidate?.comparisons ?? {},
  )
    .filter(([, value]) => value)
    .slice(0, 4)
    .map(([metric, value]) => ({
      metric,
      entityValue: value?.entityValue ?? null,
      peerMedian: value?.peerMedian ?? null,
      deltaToMedian: value?.deltaToMedian ?? null,
    }));

  const benchmark: BenchmarkComparison | undefined =
    benchmarkSelection.candidate
      ? {
          originalRiskLabel: restaurant.benchmark?.originalRiskLabel ?? null,
          validatedRiskLabel: restaurant.benchmark?.validatedRiskLabel ?? null,
          peerGroupUsed: benchmarkSelection.candidate.key,
          peerGroupType: benchmarkSelection.candidate.type,
          peerGroupConfidence: benchmarkSelection.confidence,
          sampleSize: benchmarkSelection.candidate.sampleSize,
          notableDeltas,
          benchmarkConflict,
        }
      : undefined;

  const { recommendedAction, nextBestStep } = recommendRestaurantAction({
    status,
    confidence: validationOverlay.confidence,
    signals: preliminarySignals,
    config,
  });

  const assessment: RestaurantAssessment = {
    restaurantId: restaurant.restaurantId,
    restaurantName: restaurant.restaurantName,
    kamId: restaurant.kamId,
    status,
    priorityScore,
    severity,
    confidence: validationOverlay.confidence,
    peerGroupUsed: benchmark?.peerGroupUsed,
    peerGroupConfidence: benchmark?.peerGroupConfidence,
    signals: preliminarySignals,
    scoreBreakdown: breakdown,
    benchmark,
    whyFlagged: buildWhyFlagged({
      signals: preliminarySignals,
      confidence: validationOverlay.confidence,
      benchmark,
      validationNote: restaurant.quality?.note,
      validationFlagsCount: restaurant.quality?.flags.length ?? 0,
    }),
    recommendedAction,
    nextBestStep,
    businessSummary: "",
    validationFlags: restaurant.quality?.flags,
    validationNote: restaurant.quality?.note,
  };

  assessment.businessSummary = buildBusinessSummary(assessment);

  return {
    assessment,
    validationOverlay,
  };
}
