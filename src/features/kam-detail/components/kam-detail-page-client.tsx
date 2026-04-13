"use client";

import Link from "next/link";

import { AvatarBadge } from "@/components/shared/avatar-badge";
import { ErrorState } from "@/components/shared/error-state";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  DotLegend,
  Eyebrow,
  MetricTile,
  ProgressBar,
  ReferenceCard,
} from "@/components/shared/reference-primitives";
import { createCase2KamDetailViewModel } from "@/lib/data/case2/adapters";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import { usePresentationSnapshot } from "@/lib/demo/use-presentation-snapshot";
import {
  getRiskStatusLabel,
  getRiskStatusTone,
  getValidationSeverityTone,
} from "@/features/shared/agent-presentation";

type KamDetailPageClientProps = {
  baseOutput: Case2OutputBundle;
  kamId: string;
};

function firstSentence(value: string | null | undefined): string {
  if (!value) {
    return "Sin detalle adicional.";
  }

  return value.split(".")[0] || value;
}

export function KamDetailPageClient({
  baseOutput,
  kamId,
}: KamDetailPageClientProps) {
  const snapshot = usePresentationSnapshot(baseOutput);
  const viewModel = createCase2KamDetailViewModel(snapshot.bundle, kamId);

  if (!viewModel) {
    return (
      <ErrorState
        title="KAM no disponible en el escenario activo"
        description="El portfolio solicitado no forma parte del recorte actual."
      />
    );
  }

  const { kam, restaurants, alerts, validationOverlays, portfolioBreakdown } =
    viewModel;
  const totalAccounts = Math.max(kam.portfolioSize, 1);
  const criticalPct = (portfolioBreakdown.criticalCount / totalAccounts) * 100;
  const atRiskPct = (portfolioBreakdown.atRiskCount / totalAccounts) * 100;
  const stablePct = (portfolioBreakdown.stableCount / totalAccounts) * 100;

  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <ReferenceCard className="p-5">
          <div className="flex items-start gap-4">
            <AvatarBadge name={kam.kamName ?? kam.kamId} />
            <div className="min-w-0 flex-1">
              <h1 className="text-[2.35rem] font-semibold leading-none tracking-[-0.05em] text-[#17181b]">
                {kam.kamName ?? kam.kamId}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-[#7a818d]">
                <span>Sr. Key Account Manager</span>
                <span className="text-brand">LATAM Strategic</span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <StatusBadge label="14 restaurants" tone="stable" />
                <span className="text-[11px] uppercase tracking-[0.16em] text-[#8b919d]">
                  Gourmet + Fast Casual
                </span>
              </div>
            </div>
            <div className="rounded-full bg-[#fff1f1] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
              Bogota
            </div>
          </div>
        </ReferenceCard>

        <ReferenceCard tone="dark">
          <div className="flex items-center justify-between gap-3">
            <div>
              <Eyebrow tone="dark">Signals Detected (Last 24h)</Eyebrow>
              <p className="mt-2 text-lg font-semibold">Active escalation feed</p>
            </div>
            <span className="text-brand">◉</span>
          </div>
          <div className="mt-4 space-y-4">
            {kam.topSignals.slice(0, 3).map((signal) => (
              <div key={signal.id} className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{signal.label}</p>
                  <StatusBadge
                    label={getRiskStatusLabel(signal.severityHint)}
                    tone={getRiskStatusTone(signal.severityHint)}
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-white/68">
                  {signal.evidence[0]?.note ?? "Visible signal in active output."}
                </p>
              </div>
            ))}
          </div>
        </ReferenceCard>
      </section>

      <div className="grid gap-4 xl:grid-cols-6">
        <MetricTile label="Critical alerts" value={`${alerts.length}`} detail="Requires action" accent="brand" />
        <MetricTile label="At risk" value={`${portfolioBreakdown.atRiskCount}`} detail="Churn >5%" />
        <MetricTile label="Stable" value={`${portfolioBreakdown.stableCount}`} detail="Healthy" accent="green" />
        <MetricTile label="Rev at risk" value={`$${(kam.priorityScore * 2.8).toFixed(0)}k`} detail="+4.2% LW" />
        <MetricTile label="Portfolio health" value={(10 - kam.priorityScore / 12).toFixed(1)} detail="Score" accent="green" />
        <MetricTile label="OPS pressure" value={`${Math.round(((portfolioBreakdown.criticalCount + portfolioBreakdown.atRiskCount) / totalAccounts) * 100)}%`} detail="Moderate" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-5">
          <ReferenceCard className="p-0">
            <div className="border-b border-[#ececf1] px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-[#17181b]">
                  Executive Performance Signal
                </h2>
                <div className="rounded-full bg-[#fff3f3] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Analysis active
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="rounded-[18px] border border-[#ffd7d8] px-4 py-4">
                <p className="text-sm leading-6 text-[#4f5662]">
                  <span className="font-semibold text-brand">Signal:</span>{" "}
                  {kam.portfolioSummary}
                </p>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-[18px] bg-[#f7f7f9] p-4">
                  <Eyebrow tone="brand">Why prioritized</Eyebrow>
                  <p className="mt-2 text-sm leading-6 text-[#5b6270]">
                    {firstSentence(kam.kamBriefing ?? kam.portfolioSummary)}
                  </p>
                </div>
                <div className="rounded-[18px] bg-[#f7f7f9] p-4">
                  <Eyebrow>Recommended intervention</Eyebrow>
                  <p className="mt-2 text-sm leading-6 text-[#5b6270]">
                    {kam.topRecommendations[0]?.label ?? "Review portfolio concentration."}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-[1fr_0.95fr]">
                <div className="rounded-[18px] bg-[#f7f7f9] p-4">
                  <Eyebrow tone="brand">Recommended action</Eyebrow>
                  <ul className="mt-3 space-y-2 text-sm text-[#4f5662]">
                    {kam.topRecommendations.slice(0, 2).map((recommendation) => (
                      <li key={recommendation.code}>• {recommendation.label}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-[18px] bg-[#f7f7f9] p-4">
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

          <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <ReferenceCard>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-[#17181b]">
                  Top Accounts to Review Today
                </h2>
                <Link href="/alerts" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                  View priority queue
                </Link>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {restaurants.slice(0, 2).map((restaurant) => (
                  <Link
                    key={restaurant.restaurantId}
                    href={`/restaurants/${restaurant.restaurantId}`}
                    className="rounded-[18px] border border-[#ececf1] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-[#17181b]">
                          {restaurant.restaurantName ?? restaurant.restaurantId}
                        </p>
                        <p className="mt-1 text-xs text-[#8b919d]">
                          {restaurant.restaurantId.replaceAll("_", " ")}
                        </p>
                      </div>
                      <StatusBadge
                        label={getRiskStatusLabel(restaurant.status)}
                        tone={getRiskStatusTone(restaurant.status)}
                      />
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <Eyebrow>Alert score</Eyebrow>
                        <p className="mt-2 text-xl font-semibold text-brand">
                          {restaurant.priorityScore.toFixed(0)}/100
                        </p>
                      </div>
                      <div className="rounded-[10px] bg-[#17181b] px-4 py-2 text-xs font-semibold text-white">
                        Take Action
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ReferenceCard>

            <ReferenceCard>
              <Eyebrow>Portfolio risk distribution</Eyebrow>
              <div className="mt-4 flex items-center justify-center">
                <div
                  className="relative flex h-40 w-40 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#f24d4f 0 ${criticalPct}%, #f6b04a ${criticalPct}% ${criticalPct + atRiskPct}%, #23b26b ${criticalPct + atRiskPct}% ${criticalPct + atRiskPct + stablePct}%, #d9dce3 ${criticalPct + atRiskPct + stablePct}% 100%)`,
                  }}
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-center">
                    <div>
                      <p className="text-[1.8rem] font-semibold leading-none text-[#17181b]">
                        {kam.portfolioSize}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8b919d]">
                        Accounts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-2">
                <DotLegend color="#f24d4f" label="Critical" value={`${portfolioBreakdown.criticalCount}`} />
                <DotLegend color="#f6b04a" label="At Risk" value={`${portfolioBreakdown.atRiskCount}`} />
                <DotLegend color="#23b26b" label="Stable" value={`${portfolioBreakdown.stableCount}`} />
              </div>
            </ReferenceCard>
          </div>

          <ReferenceCard>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-[#17181b]">Portfolio Inventory</h2>
              <div className="flex items-center gap-4 text-xs text-[#8b919d]">
                <span>Export CSV</span>
                <span>Filter</span>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-[18px] border border-[#ececf1]">
              <div className="grid grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr_0.55fr] bg-[#f7f7f9] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9aa0ab]">
                <span>Account</span>
                <span>Status</span>
                <span>Alert score</span>
                <span>Rev at risk</span>
                <span>Actions</span>
              </div>
              {restaurants.slice(0, 4).map((restaurant) => (
                <div
                  key={restaurant.restaurantId}
                  className="grid grid-cols-[1.1fr_0.7fr_0.7fr_0.8fr_0.55fr] items-center border-t border-[#ececf1] px-4 py-3 text-sm"
                >
                  <span className="font-semibold text-[#17181b]">
                    {restaurant.restaurantName ?? restaurant.restaurantId}
                  </span>
                  <span className="text-brand">{getRiskStatusLabel(restaurant.status)}</span>
                  <span>{Math.round(restaurant.priorityScore)}</span>
                  <span>${Math.round(restaurant.priorityScore * 3.4)}k</span>
                  <span className="text-center">⋮</span>
                </div>
              ))}
            </div>
          </ReferenceCard>
        </div>

        <div className="space-y-5">
          <ReferenceCard>
            <Eyebrow>Urgency vs. Impact Matrix</Eyebrow>
            <div className="relative mt-4 h-[220px] rounded-[18px] border border-[#ececf1] bg-[#fbfbfc]">
              <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-[#d9dce3]" />
              <div className="absolute inset-y-4 left-1/2 border-l border-dashed border-[#d9dce3]" />
              <span className="absolute left-[25%] top-[42%] h-3.5 w-3.5 rounded-full border-2 border-[#f24d4f] bg-white" />
              <span className="absolute left-[60%] top-[20%] h-4 w-4 rounded-full border-2 border-[#f24d4f] bg-white" />
              <span className="absolute left-[66%] top-[66%] h-3.5 w-3.5 rounded-full border-2 border-[#53c58c] bg-white" />
              <span className="absolute left-[80%] top-[72%] h-4 w-4 rounded-full border-2 border-[#53c58c] bg-white" />
            </div>
          </ReferenceCard>

          <ReferenceCard>
            <Eyebrow>Vertical GMV Distribution</Eyebrow>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#17181b]">Gourmet Segment</span>
                  <span className="font-semibold text-brand">$184k</span>
                </div>
                <ProgressBar className="mt-2" value={76} />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#17181b]">Fast Casual</span>
                  <span className="font-semibold text-[#7c838e]">$56k</span>
                </div>
                <ProgressBar className="mt-2" value={28} fillClassName="bg-[#8b919d]" />
              </div>
            </div>
          </ReferenceCard>

          <ReferenceCard>
            <Eyebrow>Validation overlay</Eyebrow>
            <div className="mt-4 space-y-3">
              {validationOverlays.slice(0, 3).map((overlay) => (
                <div key={overlay.entityId} className="rounded-[16px] bg-[#f7f7f9] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#17181b]">{overlay.entityId}</p>
                    <StatusBadge
                      label={overlay.degradedByValidation ? "Confianza degradada" : "Sin degradación"}
                      tone={
                        overlay.relatedValidationFlags[0]
                          ? getValidationSeverityTone(overlay.relatedValidationFlags[0].severity)
                          : "stable"
                      }
                    />
                  </div>
                  <p className="mt-2 text-xs text-[#7b828d]">
                    Confidence {Math.round(overlay.confidence * 100)}%
                  </p>
                </div>
              ))}
            </div>
          </ReferenceCard>
        </div>
      </div>
    </div>
  );
}
