import type {
  AgentInput,
  BenchmarkMetricKey,
  DataQualityFlags,
  KamMetricsInput,
  MetricDelta,
  PeerBenchmarkContext,
  RestaurantMetricsInput,
  ValidationFlag,
} from "../../agent/contracts/agent-input.ts";
import type {
  Case2BenchmarkResult,
  Case2DatasetResult,
  Case2ParsedRow,
  Case2QualityFlag,
} from "./types.ts";

function mapValidationFlag(flag: Case2QualityFlag): ValidationFlag {
  return {
    code: flag.code,
    severity: flag.severity,
    field: flag.field,
    message: flag.message,
  };
}

function buildQualityFlags(row: Case2ParsedRow): DataQualityFlags | undefined {
  if (!row.flags.length) {
    return undefined;
  }

  const mappedFlags = row.flags.map(mapValidationFlag);
  const actionableFlags = mappedFlags.filter(
    (flag) => flag.severity !== "info",
  );

  return {
    hasIssues: mappedFlags.length > 0,
    degradedConfidence: actionableFlags.length > 0,
    flags: mappedFlags,
    note:
      actionableFlags.length > 0
        ? `Lectura moderada por ${actionableFlags.length} flags de calidad del dato.`
        : undefined,
  };
}

function buildMetricDelta(
  entityValue: number | null,
  peerMedian: number | null,
  deltaToMedian: number | null,
  direction: MetricDelta["direction"],
): MetricDelta {
  return {
    entityValue,
    peerMedian,
    deltaToMedian,
    direction,
  };
}

function mapBenchmarkComparisons(
  benchmark: Case2BenchmarkResult,
): Partial<Record<BenchmarkMetricKey, MetricDelta>> {
  return {
    delta_rating_recalc: buildMetricDelta(
      benchmark.comparisons.deltaRatingRecalc.value,
      benchmark.metrics.deltaRatingRecalc.median,
      benchmark.comparisons.deltaRatingRecalc.deltaToMedian,
      "lower_is_worse",
    ),
    var_ordenes_pct_recalc: buildMetricDelta(
      benchmark.comparisons.varOrdenesPctRecalc.value,
      benchmark.metrics.varOrdenesPctRecalc.median,
      benchmark.comparisons.varOrdenesPctRecalc.deltaToMedian,
      "lower_is_worse",
    ),
    tasa_cancelacion_pct: buildMetricDelta(
      benchmark.comparisons.cancellationRatePct.value,
      benchmark.metrics.cancellationRatePct.median,
      benchmark.comparisons.cancellationRatePct.deltaToMedian,
      "higher_is_worse",
    ),
    tiempo_entrega_avg_min: buildMetricDelta(
      benchmark.comparisons.avgDeliveryTimeMin.value,
      benchmark.metrics.avgDeliveryTimeMin.median,
      benchmark.comparisons.avgDeliveryTimeMin.deltaToMedian,
      "higher_is_worse",
    ),
    quejas_7d: buildMetricDelta(
      benchmark.comparisons.complaints7d.value,
      benchmark.metrics.complaints7d.median,
      benchmark.comparisons.complaints7d.deltaToMedian,
      "higher_is_worse",
    ),
    nps_score: buildMetricDelta(
      benchmark.comparisons.npsScore.value,
      benchmark.metrics.npsScore.median,
      benchmark.comparisons.npsScore.deltaToMedian,
      "lower_is_worse",
    ),
  };
}

function buildPeerBenchmarkContext(
  row: Case2ParsedRow,
): PeerBenchmarkContext | undefined {
  if (!row.benchmark) {
    return undefined;
  }

  return {
    // Preserve the original Excel label only as comparative context.
    originalRiskLabel: row.riskTrafficLightOriginal || null,
    validatedRiskLabel: null,
    candidates: [
      {
        type: row.benchmark.peerGroupType,
        key: row.benchmark.peerGroupKey,
        sampleSize: row.benchmark.peerCount,
        comparisons: mapBenchmarkComparisons(row.benchmark),
      },
    ],
  };
}

function buildOriginalVsValidatedDiff(
  row: Case2ParsedRow,
): RestaurantMetricsInput["originalVsValidatedDiff"] | undefined {
  const diff: NonNullable<RestaurantMetricsInput["originalVsValidatedDiff"]> = {
    delta_rating_difference: row.reconciliation.deltaRating.difference,
    delta_rating_status: row.reconciliation.deltaRating.status,
    var_ordenes_pct_difference: row.reconciliation.varOrdenesPct.difference,
    var_ordenes_pct_status: row.reconciliation.varOrdenesPct.status,
  };

  return Object.values(diff).some(
    (value) => value !== null && value !== undefined,
  )
    ? diff
    : undefined;
}

export function mapCase2RowToRestaurantMetricsInput(
  row: Case2ParsedRow,
): RestaurantMetricsInput {
  return {
    restaurantId: row.restaurantId,
    restaurantName: row.restaurantName,
    kamId: row.kamAssigned,
    kamName: row.kamAssigned,
    city: row.city,
    vertical: row.vertical,
    deltaRatingRecalc: row.metrics.deltaRatingRecalc,
    varOrdenesPctRecalc: row.metrics.varOrdenesPctRecalc,
    gmvProxy7d: row.metrics.gmvProxy7d,
    ageDaysRecalc: row.metrics.ageDaysRecalc,
    tasaCancelacionPct: row.cancellationRatePct,
    tiempoEntregaAvgMin: row.avgDeliveryTimeMin,
    quejas7d: row.complaints7d,
    npsScore: row.npsScore,
    benchmark: buildPeerBenchmarkContext(row),
    quality: buildQualityFlags(row),
    originalVsValidatedDiff: buildOriginalVsValidatedDiff(row),
    metadata: {
      rowNumber: row.rowNumber,
      riskTrafficLightNormalized: row.riskTrafficLightNormalized,
      activeSince: row.activeSince,
    },
  };
}

function buildKamInputs(rows: Case2ParsedRow[]): KamMetricsInput[] {
  const uniqueKams = new Map<string, KamMetricsInput>();

  for (const row of rows) {
    if (!uniqueKams.has(row.kamAssigned)) {
      uniqueKams.set(row.kamAssigned, {
        kamId: row.kamAssigned,
        kamName: row.kamAssigned,
        restaurantIds: [],
      });
    }

    const current = uniqueKams.get(row.kamAssigned);
    if (current?.restaurantIds) {
      current.restaurantIds.push(row.restaurantId);
    }
  }

  return [...uniqueKams.values()].sort((left, right) =>
    left.kamId.localeCompare(right.kamId),
  );
}

export function buildAgentInputFromCase2Dataset(
  dataset: Case2DatasetResult,
  generatedAt?: string,
): AgentInput {
  return {
    restaurants: dataset.rows.map(mapCase2RowToRestaurantMetricsInput),
    kams: buildKamInputs(dataset.rows),
    generatedAt,
    metadata: {
      datasetSheetName: dataset.metadata.sheetName,
      referenceDateUsed: dataset.metadata.referenceDateUsed,
      totalRows: dataset.summary.totalRows,
    },
  };
}
