"use client";

import { useMemo, useState } from "react";

import { AlertCard } from "@/components/shared/alert-card";
import {
  Eyebrow,
  MetricTile,
  ReferenceCard,
} from "@/components/shared/reference-primitives";
import { createCase2AlertsFeedViewModel } from "@/lib/data/case2/adapters";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import { usePresentationSnapshot } from "@/lib/demo/use-presentation-snapshot";

type AlertsPageClientProps = {
  baseOutput: Case2OutputBundle;
};

export function AlertsPageClient({ baseOutput }: AlertsPageClientProps) {
  const [activeTab, setActiveTab] = useState<
    "all" | "critical" | "follow-up" | "sent"
  >("critical");
  const snapshot = usePresentationSnapshot(baseOutput);
  const viewModel = createCase2AlertsFeedViewModel(snapshot.bundle);

  const tabs = [
    { id: "critical", label: "Critical", count: viewModel.summary.highSeverityAlerts },
    {
      id: "follow-up",
      label: "At Risk",
      count: Math.max(
        viewModel.summary.totalAlerts - viewModel.summary.highSeverityAlerts,
        0,
      ),
    },
    { id: "all", label: "All Alerts", count: viewModel.summary.totalAlerts },
    { id: "sent", label: "Sent Alerts", count: Math.min(3, viewModel.summary.totalAlerts) },
  ] as const;

  const filteredAlerts = useMemo(() => {
    if (activeTab === "critical") {
      return viewModel.alerts.filter((item) => item.alert.severity === "high");
    }

    if (activeTab === "follow-up") {
      return viewModel.alerts.filter((item) => item.alert.severity !== "high");
    }

    if (activeTab === "sent") {
      return viewModel.alerts.slice(0, 3);
    }

    return viewModel.alerts;
  }, [activeTab, viewModel.alerts]);

  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <div>
          <Eyebrow tone="brand">Live portfolio health</Eyebrow>
          <h1 className="mt-2 text-[2.9rem] font-semibold leading-none tracking-[-0.06em] text-[#17181b]">
            Proactive Alert Management
          </h1>
          <p className="mt-2 text-sm text-[#7a818d]">
            Operational command feed for LATAM account monitoring.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <MetricTile
            label="Critical"
            value={`${viewModel.summary.highSeverityAlerts}`}
            accent="brand"
          />
          <MetricTile
            label="At risk"
            value={`${Math.max(viewModel.summary.totalAlerts - viewModel.summary.highSeverityAlerts, 0)}`}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-5 border-b border-[#e5e7ec]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 pb-3 text-sm font-semibold ${
                activeTab === tab.id
                  ? "border-brand text-brand"
                  : "border-transparent text-[#7a818d]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {["City", "Vertical", "KAM"].map((filter) => (
            <button
              key={filter}
              type="button"
              className="rounded-full border border-[#e4e6eb] bg-white px-4 py-2 text-xs font-semibold text-[#5f6672]"
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <section className="space-y-4">
          {filteredAlerts.map(({ alert, restaurant, kam }) => (
            <AlertCard
              key={alert.alertId}
              alert={{
                id: alert.alertId,
                title: alert.title,
                owner: kam?.kamName ?? restaurant?.kamId ?? "Sistema operativo",
                status:
                  alert.severity === "high"
                    ? "Bloqueando atención inmediata"
                    : "Seguimiento",
                eta: alert.nextBestStep.label,
                restaurantId: restaurant?.restaurantId,
              }}
              restaurant={
                restaurant
                  ? {
                      id: restaurant.restaurantId,
                      name: restaurant.restaurantName ?? restaurant.restaurantId,
                      city: "Bogota",
                      kamId: restaurant.kamId,
                      status:
                        restaurant.status === "critical"
                          ? "Crítico"
                          : restaurant.status === "at_risk"
                            ? "En riesgo"
                            : "Monitoreo",
                      whyFlagged:
                        restaurant.whyFlagged[0] ?? restaurant.businessSummary,
                      recommendation: restaurant.recommendedAction.label,
                    }
                  : undefined
              }
              isBlocking={alert.severity === "high"}
              scoreLabel={`${Math.round(alert.priorityScore)}`}
            />
          ))}
        </section>

        <section className="space-y-5">
          <ReferenceCard>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-[#17181b]">
                Urgent Action Queue
              </h2>
              <span className="rounded-full bg-[#fff2f2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                {filteredAlerts.length} pending
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {filteredAlerts.slice(0, 3).map(({ alert }, index) => (
                <div key={alert.alertId} className="rounded-[16px] bg-[#f7f7f9] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                    {index === 0 ? "Due now" : index === 1 ? "14:00 today" : "Tomorrow"}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#17181b]">
                    {alert.nextBestStep.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#7b828d]">{alert.title}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-4 w-full rounded-[12px] border border-[#e4e6eb] bg-white px-4 py-3 text-sm font-semibold text-[#5f6672]"
            >
              View Full Task Queue
            </button>
          </ReferenceCard>

          <ReferenceCard tone="brand" className="bg-brand text-white">
            <Eyebrow tone="dark">System performance</Eyebrow>
            <p className="mt-4 text-[2rem] font-semibold leading-tight">
              Alert precision at 98.4% this week.
            </p>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Data sync confirms reduction in false-positive flags across all
              regions. Alert-to-action conversion is up 14%.
            </p>
            <button
              type="button"
              className="mt-6 rounded-[12px] bg-white px-4 py-3 text-sm font-semibold text-brand"
            >
              Download Weekly Audit
            </button>
          </ReferenceCard>
        </section>
      </div>
    </div>
  );
}
