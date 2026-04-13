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

  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge label="Critical alert" tone="critical" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8b919d]">
              Vertical: Gourmet · Bogota, Colombia
            </span>
          </div>
          <h1 className="mt-3 text-[3rem] font-semibold leading-none tracking-[-0.06em] text-[#17181b]">
            {restaurant.restaurantName ?? restaurant.restaurantId}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#6c7380]">
            <span>Key account manager</span>
            <span className="font-semibold text-[#17181b]">
              {kam?.kamName ?? kam?.kamId ?? "Elena Rodriguez"}
            </span>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Eyebrow>Global risk score</Eyebrow>
            <div className="mt-1 text-right">
              <p className="text-[4rem] font-semibold leading-none tracking-[-0.07em] text-brand">
                {riskScore}
                <span className="text-[2rem] text-[#8b919d]">/100</span>
              </p>
              <ProgressBar className="mt-4 h-2.5" value={riskScore} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-7">
        <MetricTile label="Rating" value={formatMetricValue(aggregate?.averages.currentRating)} detail="-0.4%" />
        <MetricTile label="Cancellations" value={`${formatMetricValue(aggregate?.averages.cancellationRatePct)}%`} accent="brand" />
        <MetricTile label="Avg delivery" value={`${formatMetricValue(aggregate?.averages.avgDeliveryTimeMin)}m`} />
        <MetricTile label="Complaints" value="High intensity" accent="brand" />
        <MetricTile label="NPS" value="18" />
        <MetricTile label="Orders Δ" value="-15%" accent="brand" />
        <MetricTile label="Revenue risk" value={`$${Math.round(restaurant.priorityScore * 460)}`} detail="" accent="brand" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-5">
          <ReferenceCard className="p-0">
            <div className="flex items-center justify-between rounded-t-[24px] bg-[#17181b] px-5 py-4 text-white">
              <h2 className="text-xl font-semibold">Operational Diagnosis</h2>
              <p className="text-xs text-white/60">Analysis completed 08:14 AM</p>
            </div>
            <div className="grid gap-4 p-5 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="space-y-4">
                <div className="rounded-[18px] border border-[#ececf1] p-4">
                  <Eyebrow tone="brand">Signals detected</Eyebrow>
                  <div className="mt-3 space-y-3">
                    {restaurant.whyFlagged.slice(0, 2).map((reason) => (
                      <div key={reason} className="border-l-2 border-brand pl-3">
                        <p className="text-sm font-semibold text-[#17181b]">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[18px] border border-[#ececf1] p-4">
                  <Eyebrow tone="brand">Recommended action</Eyebrow>
                  <ul className="mt-3 space-y-2 text-sm text-[#4f5662]">
                    <li>• {restaurant.recommendedAction.label}</li>
                    <li>• Review kitchen capacity before peak hour dispatch.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[18px] bg-[#f7f7f9] p-4">
                  <Eyebrow>Why flagged</Eyebrow>
                  <p className="mt-3 text-sm italic leading-6 text-[#676f7c]">
                    {firstSentence(restaurant.businessSummary)}
                  </p>
                  <ProgressBar className="mt-4" value={85} />
                  <p className="mt-2 text-xs text-[#8b919d]">Churn probability: 85%</p>
                </div>

                <div className="rounded-[18px] p-4">
                  <Eyebrow>Next best step</Eyebrow>
                  <button
                    type="button"
                    className="mt-4 w-full rounded-[12px] bg-brand px-4 py-3 text-sm font-semibold text-white"
                  >
                    Schedule KAM Visit
                  </button>
                </div>
              </div>
            </div>
          </ReferenceCard>

          <div className="grid gap-5 lg:grid-cols-2">
            <ReferenceCard>
              <h2 className="text-lg font-semibold text-[#17181b]">Market Benchmark</h2>
              <div className="mt-4 space-y-5">
                {benchmark.map((item) => {
                  const width = Math.min(
                    100,
                    Math.max(18, Math.abs(item.deltaToMedian ?? 0) * 8),
                  );

                  return (
                    <div key={item.metric}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-[#5a6270]">{item.metric}</span>
                        <span className="font-semibold text-brand">
                          {formatMetricValue(item.deltaToMedian)}
                        </span>
                      </div>
                      <ProgressBar className="mt-2" value={width} />
                    </div>
                  );
                })}
              </div>
            </ReferenceCard>

            <ReferenceCard>
              <h2 className="text-lg font-semibold text-[#17181b]">Focus Area</h2>
              <div className="relative mt-4 h-[220px] rounded-[18px] bg-[#f2f2f4]">
                <div className="absolute inset-0 rounded-[18px] bg-[radial-gradient(circle_at_60%_65%,rgba(255,255,255,0.7),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(0,0,0,0.02))]" />
                <span className="absolute left-[48%] top-[56%] h-4 w-4 rounded-full bg-brand ring-4 ring-brand/20" />
                <p className="absolute right-4 top-4 text-[11px] font-medium text-[#8b919d]">
                  Chapinero Alto
                </p>
              </div>
            </ReferenceCard>
          </div>
        </div>

        <div className="space-y-5">
          <ReferenceCard>
            <Eyebrow>Financial impact</Eyebrow>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-[3rem] font-semibold leading-none tracking-[-0.05em] text-brand">
                  ${Math.round(restaurant.priorityScore * 460)}
                </p>
                <p className="mt-1 text-sm text-[#8b919d]">/mo</p>
                <p className="mt-3 text-sm leading-6 text-[#5d6470]">
                  Revenue leakage due to delivery friction and unresolved churn.
                </p>
              </div>
              <div
                className="relative flex h-28 w-28 items-center justify-center rounded-full"
                style={{
                  background: "conic-gradient(#f24d4f 0 75%, #f1f2f5 75% 100%)",
                }}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-xl font-semibold text-[#17181b]">
                  75%
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <DotLegend color="#f24d4f" label="Operational friction" />
              <DotLegend color="#f1b14e" label="Market attrition" />
            </div>
          </ReferenceCard>

          <ReferenceCard>
            <h2 className="text-lg font-semibold text-[#17181b]">Executive Summary</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[#5d6470]">
              <p>{restaurant.businessSummary}</p>
              {alert ? (
                <p>
                  Current alert score {Math.round(alert.priorityScore)} suggests immediate KAM
                  intervention.
                </p>
              ) : null}
              {validationOverlay ? (
                <div className="rounded-[16px] bg-[#f7f7f9] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-[#17181b]">Validation overlay</p>
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

          <div className="flex justify-end">
            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-3xl text-white"
            >
              +
            </button>
          </div>
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
