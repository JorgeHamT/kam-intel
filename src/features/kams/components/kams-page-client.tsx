"use client";

import Link from "next/link";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { AvatarBadge } from "@/components/shared/avatar-badge";
import {
  Eyebrow,
  MetricTile,
  ReferenceCard,
} from "@/components/shared/reference-primitives";
import { createCase2KamsListViewModel } from "@/lib/data/case2/adapters";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import { usePresentationSnapshot } from "@/lib/demo/use-presentation-snapshot";

type KamsPageClientProps = {
  baseOutput: Case2OutputBundle;
};

function formatRevenue(priorityScore: number) {
  return `$${Math.round(priorityScore * 2.6)}k`;
}

export function KamsPageClient({ baseOutput }: KamsPageClientProps) {
  const snapshot = usePresentationSnapshot(baseOutput);
  const viewModel = createCase2KamsListViewModel(snapshot.bundle);
  const cards = [...viewModel.cards].sort(
    (left, right) => right.kam.priorityScore - left.kam.priorityScore,
  );

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <h1 className="text-[2.75rem] font-semibold leading-none tracking-[-0.06em] text-[#17181b]">
            KAM Command Center
          </h1>
          <p className="mt-2 text-sm text-[#7a818d]">
            Operational portfolio monitoring for LATAM Key Account Managers.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-[14px] border border-[#e6e7ec] bg-white p-1">
          <button
            type="button"
            className="rounded-[10px] bg-[#fff2f2] px-4 py-2 text-xs font-semibold text-brand"
          >
            Card View
          </button>
          <button
            type="button"
            className="rounded-[10px] px-4 py-2 text-xs font-semibold text-[#8b919d]"
          >
            List View
          </button>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-4">
        <MetricTile
          label="Portfolio health"
          value={`${(100 - viewModel.summary.underPressureCount * 7.9).toFixed(1)}%`}
          detail="+2.1%"
          accent="green"
        />
        <MetricTile
          label="Revenue at risk"
          value={`$${(viewModel.summary.totalAlerts * 0.12).toFixed(2)}M`}
          accent="brand"
        />
        <MetricTile
          label="Critical accounts"
          value={`${cards.reduce((sum, card) => sum + card.kam.portfolioBreakdown.criticalCount, 0)}`}
          detail={`/${cards.reduce((sum, card) => sum + card.kam.portfolioSize, 0)} total`}
        />
        <MetricTile
          label="Alert priority"
          value="HIGH"
          detail={`${viewModel.summary.totalAlerts} pending`}
        />
      </div>

      <ReferenceCard tone="brand" className="p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-brand">●</span>
          <div>
            <Eyebrow tone="brand">Intervention Priority Logic</Eyebrow>
            <p className="mt-2 text-sm font-medium leading-6 text-[#5d6470]">
              Management intervention is automatically flagged for KAMs where
              critical account density and portfolio pressure rise together.
            </p>
          </div>
        </div>
      </ReferenceCard>

      <div className="grid gap-5 xl:grid-cols-3">
        {cards.map(({ kam }, index) => {
          const total = Math.max(kam.portfolioSize, 1);
          const criticalPct = (kam.portfolioBreakdown.criticalCount / total) * 100;
          const pressurePct =
            ((kam.portfolioBreakdown.criticalCount +
              kam.portfolioBreakdown.atRiskCount) /
              total) *
            100;

          return (
            <ReferenceCard
              key={kam.kamId}
              className={index === 0 ? "border-[#ffd6d8]" : ""}
            >
              {index === 0 ? (
                <div className="-mt-2 mb-3 inline-flex rounded-full bg-brand px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  Intervention required
                </div>
              ) : null}

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <AvatarBadge name={kam.kamName ?? kam.kamId} />
                  <div>
                    <h2 className="text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-[#17181b]">
                      {kam.kamName ?? kam.kamId}
                    </h2>
                    <p className="mt-1 text-sm text-[#8b919d]">
                      {index === 0
                        ? "Enterprise Lead"
                        : index === 1
                          ? "Senior KAM"
                          : index === 2
                            ? "Regional Manager"
                            : "Account Executive"}
                    </p>
                  </div>
                </div>
                <EllipsisVerticalIcon className="h-5 w-5 text-[#a0a6b0]" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <MiniMetric label="Accounts" value={`${kam.portfolioSize}`} />
                <MiniMetric
                  label="At risk revenue"
                  value={formatRevenue(kam.priorityScore)}
                  tone="brand"
                />
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <Eyebrow>Account health</Eyebrow>
                  <p className="text-[11px] font-semibold text-brand">
                    {Math.round(criticalPct)}% critical
                  </p>
                </div>
                <div className="mt-3 flex gap-1">
                  <div
                    className="h-2 rounded-full bg-brand"
                    style={{ width: `${Math.max(criticalPct, 8)}%` }}
                  />
                  <div
                    className="h-2 rounded-full bg-[#f2b34f]"
                    style={{
                      width: `${Math.max((kam.portfolioBreakdown.atRiskCount / total) * 100, 8)}%`,
                    }}
                  />
                  <div className="h-2 flex-1 rounded-full bg-[#0c7a74]" />
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-3">
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <Eyebrow>Health</Eyebrow>
                    <p className="mt-2 text-[1.5rem] font-semibold leading-none text-brand">
                      {(10 - kam.priorityScore / 12).toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <Eyebrow>Pressure</Eyebrow>
                    <p className="mt-2 text-[1.5rem] font-semibold leading-none text-[#17181b]">
                      {Math.round(pressurePct)}%
                    </p>
                  </div>
                </div>

                <Link
                  href={`/kams/${kam.kamId}`}
                  className={`rounded-[12px] px-4 py-3 text-sm font-semibold ${
                    index === 0
                      ? "bg-[#17181b] text-white"
                      : "border border-[#e4e6eb] bg-white text-[#3d4350]"
                  }`}
                >
                  Review Portfolio
                </Link>
              </div>
            </ReferenceCard>
          );
        })}

        {Array.from({ length: Math.max(0, 6 - cards.length) }).map((_, index) => (
          <ReferenceCard
            key={`placeholder-${index}`}
            className="flex min-h-[280px] items-center justify-center border-dashed text-center text-[#c0c5ce]"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                Loading manager data
              </p>
              <p className="mt-2 text-xs">{index + cards.length + 1}/10...</p>
            </div>
          </ReferenceCard>
        ))}
      </div>
    </div>
  );
}

function MiniMetric({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "brand";
}) {
  return (
    <div className="rounded-[16px] bg-[#f6f7f9] p-4">
      <Eyebrow>{label}</Eyebrow>
      <p
        className={`mt-2 text-[1.9rem] font-semibold leading-none tracking-[-0.05em] ${
          tone === "brand" ? "text-brand" : "text-[#17181b]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
