import type { AgentConfig } from "../config/index.ts";
import type {
  RestaurantMetricsInput,
  RiskStatus,
} from "../contracts/agent-input.ts";
import type { Signal } from "../contracts/agent-output.ts";
import { selectPeerGroup } from "../helpers/peer-group-utils.ts";
import { createSignal } from "./signal-rules.ts";

function maxStatus(left: RiskStatus, right: RiskStatus): RiskStatus {
  const order: RiskStatus[] = ["stable", "watchlist", "at_risk", "critical"];
  return order.indexOf(left) >= order.indexOf(right) ? left : right;
}

export function detectRestaurantSignals(
  restaurant: RestaurantMetricsInput,
  config: AgentConfig,
  portfolioContext: { kamPortfolioGmv7d: number; concentrationShare: number },
): Signal[] {
  const signals: Signal[] = [];
  const t = config.thresholds.signals;
  const selectedPeer = selectPeerGroup(restaurant.benchmark, config).candidate;

  let absoluteStatus: RiskStatus = "stable";
  if (
    (restaurant.deltaRatingRecalc ?? 0) <= t.absolute.deltaRatingCritical ||
    (restaurant.tasaCancelacionPct ?? 0) >=
      t.absolute.cancellationCriticalPct ||
    (restaurant.tiempoEntregaAvgMin ?? 0) >= t.absolute.deliveryCriticalMin ||
    (restaurant.quejas7d ?? 0) >= t.absolute.complaintsCritical ||
    (restaurant.npsScore ?? 100) <= t.absolute.npsCritical
  ) {
    absoluteStatus = "critical";
  } else if (
    (restaurant.deltaRatingRecalc ?? 0) <= t.absolute.deltaRatingRisk ||
    (restaurant.tasaCancelacionPct ?? 0) >= t.absolute.cancellationRiskPct ||
    (restaurant.tiempoEntregaAvgMin ?? 0) >= t.absolute.deliveryRiskMin ||
    (restaurant.quejas7d ?? 0) >= t.absolute.complaintsRisk ||
    (restaurant.npsScore ?? 100) <= t.absolute.npsRisk
  ) {
    absoluteStatus = "at_risk";
  }

  if (absoluteStatus !== "stable") {
    signals.push(
      createSignal({
        id: `${restaurant.restaurantId}-absolute`,
        type: "absolute_deterioration",
        label: "Deterioro absoluto en métricas operativas",
        severityHint: absoluteStatus,
        evidence: [
          {
            metric: "delta_rating_recalc",
            value: restaurant.deltaRatingRecalc,
            reference: t.absolute.deltaRatingRisk,
            note: "Caída reciente de rating recalculado.",
          },
          {
            metric: "tasa_cancelacion_pct",
            value: restaurant.tasaCancelacionPct,
            reference: t.absolute.cancellationRiskPct,
            note: "Cancelación por encima de banda provisional.",
          },
          {
            metric: "tiempo_entrega_avg_min",
            value: restaurant.tiempoEntregaAvgMin,
            reference: t.absolute.deliveryRiskMin,
            note: "Tiempo de entrega elevado frente al umbral provisional.",
          },
        ],
      }),
    );
  }

  if (selectedPeer) {
    const comparisons = selectedPeer.comparisons;
    const relativeHits = [
      comparisons.delta_rating_recalc?.deltaToMedian !== null &&
        comparisons.delta_rating_recalc?.deltaToMedian !== undefined &&
        comparisons.delta_rating_recalc.deltaToMedian <=
          t.relative.peerDeltaRisk,
      comparisons.tasa_cancelacion_pct?.deltaToMedian !== null &&
        comparisons.tasa_cancelacion_pct?.deltaToMedian !== undefined &&
        comparisons.tasa_cancelacion_pct.deltaToMedian >=
          t.relative.peerCancellationRisk,
      comparisons.tiempo_entrega_avg_min?.deltaToMedian !== null &&
        comparisons.tiempo_entrega_avg_min?.deltaToMedian !== undefined &&
        comparisons.tiempo_entrega_avg_min.deltaToMedian >=
          t.relative.peerDeliveryRisk,
      comparisons.quejas_7d?.deltaToMedian !== null &&
        comparisons.quejas_7d?.deltaToMedian !== undefined &&
        comparisons.quejas_7d.deltaToMedian >= t.relative.peerComplaintsRisk,
      comparisons.nps_score?.deltaToMedian !== null &&
        comparisons.nps_score?.deltaToMedian !== undefined &&
        comparisons.nps_score.deltaToMedian <= t.relative.peerNpsRisk,
    ].filter(Boolean).length;

    if (relativeHits > 0) {
      signals.push(
        createSignal({
          id: `${restaurant.restaurantId}-relative`,
          type: "relative_deterioration",
          label: "Desempeño por debajo de peers comparables",
          severityHint: relativeHits >= 3 ? "critical" : "at_risk",
          evidence: Object.entries(comparisons)
            .filter(
              ([, comparison]) =>
                comparison?.deltaToMedian !== null &&
                comparison?.deltaToMedian !== undefined,
            )
            .slice(0, 4)
            .map(([metric, comparison]) => ({
              metric,
              value: comparison?.entityValue ?? null,
              reference: comparison?.peerMedian ?? null,
              note: "Comparación contra la mediana del peer group seleccionado.",
            })),
        }),
      );
    }
  }

  if (
    (restaurant.varOrdenesPctRecalc ?? 0) <= t.momentum.ordersDropRiskPct &&
    (restaurant.deltaRatingRecalc ?? 0) <= t.absolute.deltaRatingRisk
  ) {
    const recentPenalty =
      (restaurant.ageDaysRecalc ?? Number.MAX_SAFE_INTEGER) <=
      t.momentum.recentAccountDays;
    signals.push(
      createSignal({
        id: `${restaurant.restaurantId}-momentum`,
        type: "accelerated_deterioration",
        label: "Deterioro acelerado en corto plazo",
        severityHint:
          recentPenalty ||
          (restaurant.varOrdenesPctRecalc ?? 0) <=
            t.momentum.ordersDropCriticalPct
            ? "critical"
            : "at_risk",
        evidence: [
          {
            metric: "var_ordenes_pct_recalc",
            value: restaurant.varOrdenesPctRecalc,
            reference: t.momentum.ordersDropRiskPct,
            note: "Caída de órdenes en la ventana reciente.",
          },
          {
            metric: "age_days_recalc",
            value: restaurant.ageDaysRecalc,
            reference: t.momentum.recentAccountDays,
            note: "Cuentas nuevas o recientes requieren lectura conservadora.",
          },
        ],
      }),
    );
  }

  const primaryRisk = signals.reduce<RiskStatus>(
    (current, signal) => maxStatus(current, signal.severityHint),
    "stable",
  );

  if (signals.length >= 2 && primaryRisk !== "stable") {
    signals.push(
      createSignal({
        id: `${restaurant.restaurantId}-compound`,
        type: "compound_risk",
        label: "Combinación de señales operativas",
        severityHint: signals.length >= 3 ? "critical" : "at_risk",
        evidence: [
          {
            metric: "active_signals",
            value: signals.length,
            note: "Más de una señal activa aumenta la presión operativa.",
          },
        ],
      }),
    );
  }

  if (
    (restaurant.gmvProxy7d ?? 0) >= t.businessImpact.gmvHigh &&
    primaryRisk !== "stable"
  ) {
    signals.push(
      createSignal({
        id: `${restaurant.restaurantId}-impact`,
        type: "business_impact",
        label: "Impacto de negocio relevante",
        severityHint:
          (restaurant.gmvProxy7d ?? 0) >= t.businessImpact.gmvVeryHigh
            ? "critical"
            : "at_risk",
        evidence: [
          {
            metric: "gmv_proxy_7d",
            value: restaurant.gmvProxy7d,
            reference: t.businessImpact.gmvHigh,
            note: "La cuenta tiene impacto material en GMV proxy.",
          },
        ],
      }),
    );
  }

  if (
    config.featureFlags.enableConcentrationRisk &&
    portfolioContext.kamPortfolioGmv7d > 0 &&
    portfolioContext.concentrationShare >=
      t.businessImpact.concentrationShareRisk
  ) {
    signals.push(
      createSignal({
        id: `${restaurant.restaurantId}-concentration`,
        type: "concentration_risk",
        label: "Concentración de riesgo en el portfolio",
        severityHint:
          portfolioContext.concentrationShare >=
          t.businessImpact.concentrationShareCritical
            ? "critical"
            : "at_risk",
        evidence: [
          {
            metric: "portfolio_gmv_share",
            value: portfolioContext.concentrationShare,
            reference: t.businessImpact.concentrationShareRisk,
            note: "Esta cuenta concentra una porción relevante del portfolio del KAM.",
          },
        ],
      }),
    );
  }

  if (restaurant.quality?.hasIssues) {
    signals.push(
      createSignal({
        id: `${restaurant.restaurantId}-data-quality`,
        type: "data_quality_risk",
        label: "Riesgo por calidad de datos",
        severityHint: restaurant.quality.flags.some(
          (flag) => flag.severity === "error",
        )
          ? "at_risk"
          : "watchlist",
        evidence: restaurant.quality.flags.slice(0, 3).map((flag) => ({
          metric: flag.field ?? "validation",
          value: flag.code,
          note: flag.message,
        })),
        confidenceEffect: -0.15,
      }),
    );
  }

  if (
    config.featureFlags.enableBenchmarkConflict &&
    restaurant.benchmark?.originalRiskLabel &&
    primaryRisk !== "stable" &&
    restaurant.benchmark.validatedRiskLabel &&
    restaurant.benchmark.validatedRiskLabel !== primaryRisk
  ) {
    signals.push(
      createSignal({
        id: `${restaurant.restaurantId}-benchmark-conflict`,
        type: "benchmark_conflict",
        label: "Conflicto entre benchmark y lectura validada",
        severityHint: "watchlist",
        evidence: [
          {
            metric: "original_risk_label",
            value: restaurant.benchmark.originalRiskLabel,
            note: "Etiqueta previa u original de referencia.",
          },
          {
            metric: "validated_risk_label",
            value: restaurant.benchmark.validatedRiskLabel,
            note: "Lectura validada disponible en el input procesado.",
          },
        ],
        confidenceEffect: -0.1,
        affectsPriority: false,
      }),
    );
  }

  return signals;
}
