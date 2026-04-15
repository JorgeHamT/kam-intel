"use client";

import Link from "next/link";

import { ErrorState } from "@/components/shared/error-state";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  DotLegend,
  Eyebrow,
  MetricTile,
  ProgressBar,
  ReferenceCard,
} from "@/components/shared/reference-primitives";
import {
  getValidationSeverityTone,
} from "@/features/shared/agent-presentation";
import { createCase2RestaurantDetailViewModel } from "@/lib/data/case2/adapters";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import { usePresentationSnapshot } from "@/lib/demo/use-presentation-snapshot";

type RestaurantDetailPageClientProps = {
  baseOutput: Case2OutputBundle;
  restaurantId: string;
};

function firstSentence(value: string | null | undefined): string {
  if (!value) {
    return "Sin detalle adicional.";
  }

  return value.split(".")[0] || value;
}

function formatMetricValue(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return "N/D";
  }

  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function formatPercent(value: number | null | undefined, suffix = "%") {
  if (value === null || value === undefined) return "N/D";
  // value is a percent already (e.g., 12.3) or a ratio 0-1? dataset uses percent values.
  return Number.isInteger(value) ? `${value}${suffix}` : `${value.toFixed(1)}${suffix}`;
}

export function RestaurantDetailPageClient({
  baseOutput,
  restaurantId,
}: RestaurantDetailPageClientProps) {
  const snapshot = usePresentationSnapshot(baseOutput);
  const viewModel = createCase2RestaurantDetailViewModel(
    snapshot.bundle,
    restaurantId,
  );

  if (!viewModel) {
    return (
      <ErrorState
        title="Restaurante no disponible en el escenario activo"
        description="El caso solicitado no forma parte del recorte actual."
      />
    );
  }

  const { restaurant, kam, alert, aggregate, validationOverlay } = viewModel;
  const benchmark = restaurant.benchmark?.notableDeltas.slice(0, 3) ?? [];
  const riskScore = Math.round(restaurant.priorityScore);

  function formatCurrency(value: number) {
    try {
      return `$${value.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } catch {
      return `$${value.toFixed(2)}`;
    }
  }

  function computeRevenueDropProxy() {
    // Formula: max(ordenes_7d_anterior - ordenes_7d, 0) * valor_ticket_prom_mxn * 4
    const prev = aggregate?.sums.orders7dPrevious;
    const curr = aggregate?.sums.orders7d;
    const avgTicket = aggregate?.averages.avgTicketMxn;

    if (
      prev == null ||
      curr == null ||
      avgTicket == null ||
      typeof prev !== "number" ||
      typeof curr !== "number" ||
      typeof avgTicket !== "number"
    ) {
      return null;
    }

    const drop = Math.max(prev - curr, 0);
    const monthly = drop * avgTicket * 4;
    return monthly;
  }

  function computeOrdersDropPercent() {
    // Formula: max(ordenes_7d_anterior - ordenes_7d, 0) / max(ordenes_7d_anterior, 1) * 100
    const prev = aggregate?.sums.orders7dPrevious;
    const curr = aggregate?.sums.orders7d;

    if (prev == null || curr == null || typeof prev !== "number" || typeof curr !== "number") {
      return null;
    }

    const drop = Math.max(prev - curr, 0);
    const denom = Math.max(prev, 1);
    const pct = (drop / denom) * 100;
    return pct;
  }

  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge label="Alerta crítica" tone="critical" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b919d]">
              Vertical: {viewModel.location.vertical} · {viewModel.location.city}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-[#17181b]">
            {restaurant.restaurantName ?? restaurant.restaurantId}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#6c7380]">
            <span>Responsable (KAM)</span>
            <span className="font-semibold text-[#17181b]">
              {kam?.kamName ?? kam?.kamId ?? "No asignado"}
            </span>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Eyebrow>Riesgo global</Eyebrow>
            <div className="mt-1 text-right">
              <p className="text-4xl font-semibold leading-none tracking-tight text-brand">
                {riskScore}
                <span className="text-sm text-[#8b919d]">/100</span>
              </p>
              <ProgressBar className="mt-4 h-2.5" value={riskScore} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-7">
        <MetricTile
          label="Calificación"
          value={formatMetricValue(aggregate?.averages.currentRating)}
          detail={aggregate?.averages.rating30dAvg ? `${formatMetricValue(aggregate.averages.rating30dAvg)} 30d` : undefined}
        />
        <MetricTile
          label="Cancelaciones"
          value={aggregate?.averages.cancellationRatePct != null ? `${formatMetricValue(aggregate.averages.cancellationRatePct)}%` : "N/D"}
          accent="brand"
        />
        <MetricTile
          label="Entrega promedio (min)"
          value={aggregate?.averages.avgDeliveryTimeMin != null ? `${formatMetricValue(aggregate.averages.avgDeliveryTimeMin)}m` : "N/D"}
        />
        <MetricTile
          label="Quejas (7d)"
          value={aggregate?.sums.complaints7d != null ? `${aggregate.sums.complaints7d}` : "N/D"}
          accent="brand"
        />
        <MetricTile label="NPS" value={aggregate?.averages.npsScore != null ? `${formatMetricValue(aggregate.averages.npsScore)}` : "N/D"} />
        <MetricTile
          label="Var. órdenes"
          value={aggregate?.averages.ordersVariancePctRecalc != null ? formatPercent(aggregate.averages.ordersVariancePctRecalc) : "N/D"}
          accent="brand"
        />
        <MetricTile label="Caída estimada de ingresos (4 semanas)" value={(() => {
          const v = computeRevenueDropProxy();
          return v == null ? "N/D" : formatCurrency(v);
        })()} detail="Proxy basada en órdenes y ticket promedio" accent="brand" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-5">
          <ReferenceCard className="p-0">
            <div className="flex items-center justify-between rounded-t-[24px] bg-[#17181b] px-5 py-4 text-white">
              <h2 className="text-xl font-semibold">Diagnóstico Operativo</h2>
              <p className="text-xs text-white/60">Análisis finalizado 08:14 AM</p>
            </div>
            <div className="grid gap-4 p-5 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="space-y-4">
                <div className="rounded-[18px] border border-[#ececf1] p-4">
                  <Eyebrow tone="brand">Señales detectadas</Eyebrow>
                  <div className="mt-3 space-y-3">
                    {restaurant.whyFlagged.slice(0, 2).map((reason) => (
                      <div key={reason} className="border-l-2 border-brand pl-3">
                        <p className="text-sm font-semibold text-[#17181b]">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[18px] border border-[#ececf1] p-4">
                  <Eyebrow tone="brand">Acción recomendada</Eyebrow>
                  <ul className="mt-3 space-y-2 text-sm text-[#4f5662]">
                    <li>• {restaurant.recommendedAction?.label ?? "Sin acción definida"}</li>
                    {restaurant.recommendedAction?.label ? (
                      <li>• Revisar operaciones y priorizar contacto con KAM.</li>
                    ) : null}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[18px] bg-[#f7f7f9] p-4">
                  <Eyebrow>Motivo de alerta</Eyebrow>
                  <p className="mt-3 text-sm italic leading-6 text-[#676f7c]">{firstSentence(restaurant.businessSummary)}</p>
                  <ProgressBar className="mt-4" value={riskScore} />
                  <p className="mt-2 text-xs text-[#8b919d]">Puntaje de prioridad: {riskScore}/100</p>
                </div>

                <div className="rounded-[18px] p-4">
                  <Eyebrow>Siguiente paso</Eyebrow>
                  <button
                    type="button"
                    className="mt-4 w-full rounded-[12px] bg-brand px-4 py-3 text-sm font-semibold text-white"
                  >
                    Agendar Visita KAM
                  </button>
                </div>
              </div>
            </div>
          </ReferenceCard>

          <div className="grid gap-5 lg:grid-cols-2">
            <ReferenceCard>
              <h2 className="text-lg font-semibold text-[#17181b]">Benchmark de mercado</h2>
              <div className="mt-4 space-y-4">
                {benchmark.map((item) => {
                  const width = Math.min(100, Math.max(18, Math.abs(item.deltaToMedian ?? 0) * 8));
                  const labelMap: Record<string, string> = {
                    currentRating: "Cambio en calificación",
                    deltaRatingRecalc: "Cambio en calificación",
                    varOrdenesPctRecalc: "Variación de órdenes",
                    cancellationRatePct: "Tasa de cancelación",
                    avgDeliveryTimeMin: "Tiempo de entrega (min)",
                    complaints7d: "Quejas (7d)",
                    npsScore: "NPS",
                    gmvProxy7d: "GMV (7d)",
                  };

                  const humanLabel = labelMap[item.metric] ?? item.metric.replace(/[_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

                  return (
                    <div key={item.metric}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-[#5a6270]">{humanLabel}</span>
                        <span className="font-semibold text-brand">{item.deltaToMedian == null ? "N/D" : formatMetricValue(item.deltaToMedian)}</span>
                      </div>
                      <ProgressBar className="mt-2" value={width} />
                      <p className="mt-2 text-xs text-[#8b919d]">Diferencia respecto a la mediana: {item.deltaToMedian == null ? "Sin dato" : formatMetricValue(item.deltaToMedian)}</p>
                    </div>
                  );
                })}
              </div>
            </ReferenceCard>
          </div>
        </div>

        <div className="space-y-5">
          <ReferenceCard>
            <Eyebrow>Impacto financiero</Eyebrow>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-4xl font-semibold leading-none tracking-tight text-brand">
                  {(() => {
                    const v = computeRevenueDropProxy();
                    return v == null ? "N/D" : formatCurrency(v);
                  })()}
                </p>
                <p className="mt-1 text-sm text-[#8b919d]">Proxy basada en órdenes y ticket promedio</p>
                <p className="mt-3 text-sm leading-6 text-[#5d6470]">
                  Estimación mensual basada en la caída de órdenes y el ticket promedio.
                </p>
              </div>
              {(() => {
                const pct = computeOrdersDropPercent();
                const safePct = pct == null ? 0 : Math.min(100, Math.max(0, pct));
                const bg = `conic-gradient(#f24d4f 0 ${safePct}%, #f1f2f5 ${safePct}% 100%)`;

                return (
                  <div
                    className="relative flex h-28 w-28 items-center justify-center rounded-full"
                    style={{ background: bg }}
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-xl font-semibold text-[#17181b]">
                      {pct == null ? "N/D" : (Number.isInteger(pct) ? `${Math.round(pct)}%` : `${pct.toFixed(1)}%`)}
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="mt-4 space-y-2">
              <DotLegend color="#f24d4f" label="Fricción operativa" />
              <DotLegend color="#f1b14e" label="Deserción de mercado" />
            </div>
          </ReferenceCard>

          <ReferenceCard>
            <h2 className="text-lg font-semibold text-[#17181b]">Resumen Ejecutivo</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[#5d6470]">
              <p>{restaurant.businessSummary}</p>
              {alert ? (
                <p>
                  El puntaje actual de {Math.round(alert.priorityScore)} sugiere una intervención
                  inmediata del KAM.
                </p>
              ) : null}
              {validationOverlay ? (
                <div className="rounded-[16px] bg-[#f7f7f9] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-[#17181b]">Capa de validación</p>
                    <StatusBadge
                      label={validationOverlay.degradedByValidation ? "Confianza degradada" : "Sin degradación"}
                      tone={
                        validationOverlay.relatedValidationFlags[0]
                          ? getValidationSeverityTone(validationOverlay.relatedValidationFlags[0].severity)
                          : "stable"
                      }
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </ReferenceCard>

          <div className="flex justify-end" />
        </div>
      </div>

      {kam ? (
        <div className="flex justify-start">
          <Link
            href={`/kams/${kam.kamId}`}
            className="rounded-full border border-[#e2e4e9] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6672]"
          >
            Volver a KAM
          </Link>
        </div>
      ) : null}
    </div>
  );
}
