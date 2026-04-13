"use client";

import Link from "next/link";

import {
  Eyebrow,
  ProgressBar,
  ReferenceCard,
} from "@/components/shared/reference-primitives";
import { createCase2DashboardViewModel } from "@/lib/data/case2/adapters";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import { usePresentationSnapshot } from "@/lib/demo/use-presentation-snapshot";
import { useDemoStore } from "@/lib/store/demo-store";

type DashboardPageClientProps = {
  baseOutput: Case2OutputBundle;
};

function formatCurrency(value: number) {
  return `$${Math.round(value)}k`;
}

export function DashboardPageClient({ baseOutput }: DashboardPageClientProps) {
  const snapshot = usePresentationSnapshot(baseOutput);
  const viewModel = createCase2DashboardViewModel(snapshot.bundle);
  const lastRefresh = useDemoStore((state) => state.lastRefresh);
  const verticals = viewModel.verticalRiskSummary.slice(0, 3);
  const cityRows = viewModel.cityRiskSummary.slice(0, 4);
  const topKams = viewModel.kamsUnderPressure.slice(0, 3);
  const healthScore = (10 - viewModel.summary.averagePriorityScore / 12).toFixed(1);

  return (
    <div className="space-y-5">
      <section className="flex items-center justify-between rounded-[12px] bg-brand px-5 py-3 text-white">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-sm">△</span>
          <p className="truncate text-[12px] font-semibold uppercase tracking-[0.04em]">
            {snapshot.narrative.title}
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-white/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em]"
        >
          Execute Deep Dive
        </button>
      </section>

      <section className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-[3.15rem] font-semibold leading-none tracking-[-0.065em] text-[#17181b]">
            Intelligence Overview
          </h1>
          <p className="mt-2 text-sm text-[#7a818d]">
            Real-time risk performance across LATAM markets.
          </p>
        </div>
        <div className="text-right">
          <Eyebrow>Last updated</Eyebrow>
          <p className="mt-1 text-[1.05rem] font-semibold text-[#17181b]">{lastRefresh}</p>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-4">
        <DashboardMetricCard
          label="Total monitored"
          value={viewModel.summary.totalRestaurants.toLocaleString()}
          detail={`+ ${viewModel.summary.topAlertCount} this month`}
        />
        <DashboardMetricCard
          label="Critical risk"
          value={`${viewModel.summary.criticalCount}`}
          detail="Requires immediate action"
          accent="critical"
        />
        <DashboardMetricCard
          label="Rev. exposure"
          value={`$${viewModel.summary.averagePriorityScore.toFixed(1)}M`}
          detail="USD Weekly Potential Loss"
        />
        <DashboardMetricCard
          label="Avg. health score"
          value={healthScore}
          detail="/ 10"
          accent="health"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.98fr_0.96fr_0.88fr]">
        <div className="space-y-5">
          <ReferenceCard className="overflow-hidden p-0">
            <div className="px-5 py-4">
              <h2 className="text-[1.02rem] font-semibold text-[#17181b]">
                Regional Concentration
              </h2>
              <p className="text-xs text-[#8b919d]">Geospatial risk distribution</p>
            </div>
            <div className="px-5 pb-5">
              <div className="relative h-[276px] overflow-hidden rounded-[18px] bg-[#1a1a1d]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(255,255,255,0.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]" />
                <div className="absolute inset-[7%] rounded-[46%_54%_56%_44%/26%_42%_58%_74%] bg-[linear-gradient(180deg,#8c8c8d_0%,#5b5c60_18%,#393a3f_48%,#23242a_100%)] opacity-90" />
                <div className="absolute inset-[8.5%] rounded-[44%_56%_52%_48%/32%_40%_60%_68%] border border-white/10" />
                <div className="absolute left-[50%] top-[58%] h-3.5 w-3.5 rounded-full bg-brand ring-4 ring-brand/20" />
                <div className="absolute left-[61%] top-[78%] h-2.5 w-2.5 rounded-full bg-[#59c98d] ring-4 ring-[#59c98d]/20" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-[12px] bg-[#efeff2] px-3.5 py-2.5 text-[#17181b]">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9096a0]">
                      Top risk hub
                    </p>
                    <p className="mt-1 text-xs font-semibold">Bogota</p>
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                    Bogota
                  </p>
                </div>
              </div>
            </div>
          </ReferenceCard>

          <ReferenceCard tone="dark" className="rounded-[18px]">
            <div className="flex items-center gap-2">
              <span className="text-brand">◉</span>
              <h2 className="text-[1.02rem] font-semibold">Signals Detected</h2>
            </div>
            <div className="mt-4 space-y-4">
              {viewModel.topPriorityRestaurants.slice(0, 3).map((restaurant) => (
                <div key={restaurant.restaurantId} className="flex gap-3 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand" />
                  <div>
                    <p className="font-medium leading-6 text-white/92">
                      {restaurant.whyFlagged[0] ?? "Visible signal in active portfolio."}
                    </p>
                    <p className="mt-1 text-xs text-white/55">
                      {restaurant.restaurantName ?? restaurant.restaurantId}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ReferenceCard>
        </div>

        <div className="space-y-5">
          <ReferenceCard className="p-0">
            <div className="px-5 py-4">
              <h2 className="text-[1.02rem] font-semibold text-[#17181b]">
                Cities by Oper. Risk
              </h2>
            </div>
            <div className="px-5 pb-5">
              <div className="grid grid-cols-[1.15fr_0.72fr_0.72fr] border-b border-[#ececf1] pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9aa0ab]">
                <span>City</span>
                <span>Risk</span>
                <span>Rev.</span>
              </div>
              <div className="mt-2 space-y-1">
                {cityRows.map((city) => {
                  const tone =
                    city.criticalCount > 0
                      ? "text-brand"
                      : city.atRiskCount > 0
                        ? "text-[#c98629]"
                        : "text-[#28a36a]";

                  return (
                    <div
                      key={city.city}
                      className="grid grid-cols-[1.15fr_0.72fr_0.72fr] items-center px-1 py-3 text-sm"
                    >
                      <span className="font-semibold text-[#17181b]">{city.city}</span>
                      <span className={tone}>
                        {city.criticalCount > 0
                          ? "High"
                          : city.atRiskCount > 0
                            ? "Med"
                            : "Low"}
                      </span>
                      <span className="font-medium text-[#545b66]">
                        {formatCurrency(city.averagePriorityScore * 4.5)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 text-center text-sm font-medium text-[#b1b6bf]">
                View All 42 Cities
              </div>
            </div>
          </ReferenceCard>

          <ReferenceCard className="rounded-[18px]">
            <div className="flex items-center gap-2">
              <span className="text-[#aab0ba]">◉</span>
              <h2 className="text-[1.02rem] font-semibold text-[#17181b]">
              Why Flagged (AI Logic)
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-[14px] bg-[#f7f7f9] p-4">
                <Eyebrow>Threshold breach</Eyebrow>
                <p className="mt-2 text-sm italic leading-6 text-[#6d7481]">
                  {snapshot.narrative.description}
                </p>
              </div>
              <div className="rounded-[14px] bg-[#f7f7f9] p-4">
                <Eyebrow>Predictive pattern</Eyebrow>
                <p className="mt-2 text-sm italic leading-6 text-[#6d7481]">
                  {snapshot.narrative.nextStep}
                </p>
              </div>
            </div>
          </ReferenceCard>
        </div>

        <div className="space-y-5">
          <ReferenceCard className="rounded-[18px]">
            <h2 className="text-[1.02rem] font-semibold text-[#17181b]">
              Risk Concentration by Vertical
            </h2>
            <div className="mt-5 space-y-5">
              {verticals.map((vertical) => {
                const riskPct = Math.min(
                  92,
                  Math.round((vertical.averagePriorityScore / 100) * 100),
                );

                return (
                  <div key={vertical.vertical}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <p className="font-semibold text-[#17181b]">{vertical.vertical}</p>
                      <p className={`font-semibold ${riskPct > 50 ? "text-brand" : riskPct > 25 ? "text-[#d68826]" : "text-[#2ca56f]"}`}>
                        {riskPct}% Risk
                      </p>
                    </div>
                    <ProgressBar
                      className="mt-2"
                      value={riskPct}
                      fillClassName={riskPct > 50 ? "bg-brand" : riskPct > 25 ? "bg-[#f2ac4b]" : "bg-[#31b274]"}
                    />
                    <p className="mt-1 text-xs text-[#a0a6b0]">
                      Impact: {formatCurrency(vertical.averagePriorityScore * 1.8)} weekly revenue
                    </p>
                  </div>
                );
              })}
            </div>
          </ReferenceCard>

          <ReferenceCard className="rounded-[18px]">
            <h2 className="text-[1.02rem] font-semibold text-[#17181b]">KAMs Under Pressure</h2>
            <div className="mt-4 space-y-4">
              {topKams.map((kam) => (
                <Link
                  key={kam.kamId}
                  href={`/kams/${kam.kamId}`}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#15161a] text-[10px] font-semibold text-white">
                      {(kam.kamName ?? kam.kamId)
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#17181b]">
                        {kam.kamName ?? kam.kamId}
                      </p>
                      <p className="text-[11px] text-[#a0a6b0]">
                        {kam.kamId.replaceAll("_", " ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-brand">
                      {Math.round(kam.priorityScore)}%
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#8b919d]">
                      Risk load
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ReferenceCard>

          <ReferenceCard className="rounded-[18px] p-0">
            <div className="flex items-center justify-between px-5 py-4">
              <Eyebrow>Review allocation</Eyebrow>
              <button
                type="button"
                className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-brand text-3xl text-white"
              >
                +
              </button>
            </div>
          </ReferenceCard>

          <ReferenceCard className="rounded-[18px]">
            <h2 className="text-[1.02rem] font-semibold text-[#17181b]">Last Intervention</h2>
            <div className="mt-4 rounded-[16px] bg-[#eef8f2] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2ca56f]">
                Successful action
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-[#35785b]">
                {snapshot.narrative.nextStep}
              </p>
              <p className="mt-2 text-xs text-[#5a9a7a]">14h ago</p>
            </div>
          </ReferenceCard>
        </div>
      </div>
    </div>
  );
}

function DashboardMetricCard({
  label,
  value,
  detail,
  accent = "default",
}: {
  label: string;
  value: string;
  detail?: string;
  accent?: "default" | "critical" | "health";
}) {
  return (
    <article
      className={`rounded-[18px] border bg-white px-5 py-4 shadow-[0_8px_24px_rgba(20,20,24,0.05)] ${
        accent === "critical"
          ? "border-[#ffd7d8] shadow-none ring-1 ring-inset ring-[#ff6d70]"
          : "border-[#e7e8ed]"
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9aa0ab]">
        {label}
      </p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`text-[2.2rem] font-semibold leading-none tracking-[-0.05em] ${
              accent === "critical"
                ? "text-brand"
                : accent === "health"
                  ? "text-[#0b7b72]"
                  : "text-[#17181b]"
            }`}
          >
            {value}
            {accent === "health" ? <span className="text-base text-[#8b919d]"> / 10</span> : null}
          </p>
          {detail ? (
            <p
              className={`mt-2 text-xs font-medium ${
                accent === "critical"
                  ? "text-brand"
                  : detail === "/ 10"
                    ? "text-[#8b919d]"
                    : "text-[#8b919d]"
              }`}
            >
              {accent === "health" ? " " : detail}
            </p>
          ) : null}
        </div>
        {accent === "health" ? (
          <div className="w-[86px]">
            <ProgressBar value={84} fillClassName="bg-[#0b7b72]" />
          </div>
        ) : null}
      </div>
    </article>
  );
}
