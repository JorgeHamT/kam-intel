"use client";

import Link from "next/link";

import { StatusBadge } from "@/components/shared/status-badge";
import {
  Eyebrow,
  MetricTile,
  ReferenceCard,
} from "@/components/shared/reference-primitives";
import { createCase2RestaurantsListViewModel } from "@/lib/data/case2/adapters";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import { usePresentationSnapshot } from "@/lib/demo/use-presentation-snapshot";
import {
  getRiskStatusLabel,
  getRiskStatusTone,
  getValidationSeverityTone,
} from "@/features/shared/agent-presentation";

type RestaurantsPageClientProps = {
  baseOutput: Case2OutputBundle;
};

function formatCompactCurrency(valueMxn: number) {
  if (valueMxn >= 1_000_000) {
    return `$${(valueMxn / 1_000_000).toFixed(1)}M`;
  }

  return `$${Math.round(valueMxn / 1_000)}k`;
}

function formatMetric(value: number | null) {
  if (value === null) {
    return "N/D";
  }

  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

export function RestaurantsPageClient({
  baseOutput,
}: RestaurantsPageClientProps) {
  const snapshot = usePresentationSnapshot(baseOutput);
  const viewModel = createCase2RestaurantsListViewModel(snapshot.bundle);

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-[2.75rem] font-semibold leading-none tracking-[-0.06em] text-[#17181b]">
            Restaurantes
          </h1>
          <p className="mt-2 text-sm text-[#7a818d]">
            Lista completa de restaurantes visibles en el escenario activo, con
            acceso directo al detalle individual.
          </p>
        </div>
        <div className="rounded-[16px] border border-[#e7e8ed] bg-white px-4 py-3">
          <Eyebrow>Escenario activo</Eyebrow>
          <p className="mt-2 text-sm font-semibold text-[#17181b]">
            {viewModel.semantics.visibleStatusSource === "benchmark_status"
              ? "Dataset original"
              : snapshot.scenarioOption.label}
          </p>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-4">
        <MetricTile
          label="Restaurantes visibles"
          value={`${viewModel.summary.totalRestaurants}`}
        />
        <MetricTile
          label="Críticos"
          value={`${viewModel.summary.criticalCount}`}
          accent="brand"
        />
        <MetricTile
          label="En riesgo"
          value={`${viewModel.summary.atRiskCount}`}
        />
        <MetricTile
          label="Watchlist / estables"
          value={`${viewModel.summary.watchlistCount} / ${viewModel.summary.stableCount}`}
        />
      </div>

      <div className="space-y-3">
        {viewModel.restaurants.map((item) => {
          const highestValidationSeverity =
            item.validationOverlay?.relatedValidationFlags.find(
              (flag) => flag.severity === "error",
            )?.severity ??
            item.validationOverlay?.relatedValidationFlags.find(
              (flag) => flag.severity === "warning",
            )?.severity;

          return (
            <Link
              key={item.restaurant.restaurantId}
              href={`/restaurants/${item.restaurant.restaurantId}`}
              className="block"
            >
              <ReferenceCard className="rounded-[20px] px-5 py-4 transition hover:border-[#dfe2e8] hover:shadow-[0_10px_24px_rgba(20,20,24,0.06)]">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge
                        label={getRiskStatusLabel(item.restaurant.status)}
                        tone={getRiskStatusTone(item.restaurant.status)}
                      />
                      {item.validationOverlay ? (
                        <StatusBadge
                          label={
                            item.validationOverlay.degradedByValidation
                              ? "Confianza degradada"
                              : "Validación"
                          }
                          tone={getValidationSeverityTone(
                            highestValidationSeverity ?? "info",
                          )}
                        />
                      ) : null}
                    </div>

                    <h2 className="mt-3 text-xl font-semibold leading-tight text-[#17181b]">
                      {item.restaurant.restaurantName ?? item.restaurant.restaurantId}
                    </h2>

                    <p className="mt-2 text-sm text-[#6d7481]">
                      {item.location.city}
                      <span className="mx-2 text-[#c5cad3]">•</span>
                      {item.location.vertical}
                      <span className="mx-2 text-[#c5cad3]">•</span>
                      {item.kam?.kamName ?? item.restaurant.kamId}
                    </p>

                    <p className="mt-3 text-sm leading-6 text-[#5d6470]">
                      {item.restaurant.whyFlagged[0] ?? item.restaurant.businessSummary}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:min-w-[420px] xl:grid-cols-4">
                    <MiniMetric
                      label="Score"
                      value={`${Math.round(item.restaurant.priorityScore)}/100`}
                    />
                    <MiniMetric
                      label="GMV 7d"
                      value={formatCompactCurrency(item.metrics.gmvProxy7d)}
                    />
                    <MiniMetric
                      label="Rating"
                      value={formatMetric(item.metrics.currentRating)}
                    />
                    <MiniMetric
                      label="Cancelación"
                      value={`${formatMetric(item.metrics.cancellationRatePct)}%`}
                    />
                  </div>
                </div>
              </ReferenceCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[16px] bg-[#f7f7f9] px-4 py-3">
      <Eyebrow>{label}</Eyebrow>
      <p className="mt-2 text-base font-semibold text-[#17181b]">{value}</p>
    </div>
  );
}
