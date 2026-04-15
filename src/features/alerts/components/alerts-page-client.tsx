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

function buildAlertTitle(params: {
  entityType: "restaurant" | "kam";
  entityId: string;
  title: string;
  restaurantName?: string;
  kamName?: string;
}) {
  if (params.entityType === "restaurant") {
    return params.restaurantName ?? params.title;
  }

  return params.kamName ?? params.entityId;
}

function buildAlertEntityLabel(entityType: "restaurant" | "kam") {
  return entityType === "restaurant" ? "Alerta de restaurante" : "Alerta de KAM";
}

function buildAlertContext(params: {
  entityType: "restaurant" | "kam";
  city?: string;
  vertical?: string;
}) {
  if (params.entityType === "restaurant") {
    return params.city ?? params.vertical ?? "Sin ubicación";
  }

  return "Portafolio KAM";
}

function buildAlertReason(params: {
  title: string;
  whyFlagged: string[];
  businessSummary?: string;
}) {
  const normalizedTitle = params.title.toLowerCase();
  const candidate = params.whyFlagged.find((line) => {
    const normalized = line.trim().toLowerCase();
    return normalized.length > 0 && normalized !== normalizedTitle;
  });

  return candidate ?? params.businessSummary ?? params.whyFlagged[0] ?? params.title;
}

function buildAlertAction(params: {
  entityType: "restaurant" | "kam";
  severity: "high" | "medium" | "low";
  recommendedActionLabel?: string;
  nextBestStepLabel?: string;
}) {
  if (params.recommendedActionLabel) {
    return params.recommendedActionLabel;
  }

  if (params.nextBestStepLabel) {
    return params.nextBestStepLabel;
  }

  if (params.entityType === "kam") {
    return params.severity === "high"
      ? "Escalar revisión del portafolio"
      : "Revisar portafolio prioritario";
  }

  return params.severity === "high"
    ? "Revisar operación hoy"
    : "Programar seguimiento";
}

function sortAlertsForDisplay(
  alerts: ReturnType<typeof createCase2AlertsFeedViewModel>["alerts"],
) {
  return [...alerts].sort((left, right) => {
    const entityWeight = {
      restaurant: 1,
      kam: 0,
    } as const;

    return (
      entityWeight[right.alert.entityType] - entityWeight[left.alert.entityType] ||
      right.alert.priorityScore - left.alert.priorityScore ||
      left.alert.alertId.localeCompare(right.alert.alertId, "es")
    );
  });
}

export function AlertsPageClient({ baseOutput }: AlertsPageClientProps) {
  const [activeTab, setActiveTab] = useState<"all" | "critical" | "follow-up">(
    "critical",
  );
  const snapshot = usePresentationSnapshot(baseOutput);
  const viewModel = createCase2AlertsFeedViewModel(snapshot.bundle);
  const restaurantMetadataById = useMemo(
    () =>
      new Map(
        snapshot.bundle.restaurants.map((restaurant) => [
          restaurant.restaurantId,
          snapshot.bundle.dataset.restaurantMetadata[restaurant.restaurantId],
        ]),
      ),
    [snapshot.bundle.dataset.restaurantMetadata, snapshot.bundle.restaurants],
  );

  const tabs = [
    {
      id: "critical",
      label: "Críticas",
      count: viewModel.summary.highSeverityAlerts,
    },
    {
      id: "follow-up",
      label: "Seguimiento",
      count: Math.max(
        viewModel.summary.totalAlerts - viewModel.summary.highSeverityAlerts,
        0,
      ),
    },
    { id: "all", label: "Todas", count: viewModel.summary.totalAlerts },
  ] as const;

  const filteredAlerts = useMemo(() => {
    if (activeTab === "critical") {
      return sortAlertsForDisplay(
        viewModel.alerts.filter((item) => item.alert.severity === "high"),
      );
    }

    if (activeTab === "follow-up") {
      return sortAlertsForDisplay(
        viewModel.alerts.filter((item) => item.alert.severity !== "high"),
      );
    }

    return sortAlertsForDisplay(viewModel.alerts);
  }, [activeTab, viewModel.alerts]);

  const urgentQueue = filteredAlerts.slice(0, 3);

  return (
    <div className="space-y-5">
      <section className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <div>
          <Eyebrow tone="brand">Centro de alertas</Eyebrow>
          <h1 className="mt-2 text-[2.9rem] font-semibold leading-none tracking-[-0.06em] text-[#17181b]">
            Top 10 alertas priorizadas
          </h1>
          <p className="mt-2 text-sm text-[#7a818d]">
            Cola priorizada del escenario activo con las alertas más relevantes
            para intervención inmediata o seguimiento.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricTile
            label="Críticas"
            value={`${viewModel.summary.highSeverityAlerts}`}
            accent="brand"
          />
          <MetricTile
            label="Seguimiento"
            value={`${Math.max(viewModel.summary.totalAlerts - viewModel.summary.highSeverityAlerts, 0)}`}
          />
          <MetricTile
            label="Por restaurante"
            value={`${viewModel.summary.restaurantAlerts}`}
          />
          <MetricTile
            label="Por KAM"
            value={`${viewModel.summary.kamAlerts}`}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4">
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
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <section className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <ReferenceCard>
              <p className="text-sm text-[#5f6672]">
                No hay alertas para esta vista.
              </p>
            </ReferenceCard>
          ) : null}
          {filteredAlerts.map(({ alert, restaurant, kam }) => {
            const metadata = restaurant
              ? restaurantMetadataById.get(restaurant.restaurantId)
              : undefined;
            const title = buildAlertTitle({
              entityType: alert.entityType,
              entityId: alert.entityId,
              title: alert.title,
              restaurantName: restaurant?.restaurantName,
              kamName: kam?.kamName,
            });
            const actionLabel = buildAlertAction({
              entityType: alert.entityType,
              severity: alert.severity,
              recommendedActionLabel:
                restaurant?.recommendedAction.label ?? alert.recommendedAction.label,
              nextBestStepLabel:
                restaurant?.nextBestStep.label ?? alert.nextBestStep.label,
            });
            const reason = buildAlertReason({
              title,
              whyFlagged: restaurant?.whyFlagged ?? alert.whyFlagged,
              businessSummary: restaurant?.businessSummary,
            });

            return (
              <AlertCard
                key={alert.alertId}
                alert={{
                  id: alert.alertId,
                  title,
                  owner: kam?.kamName ?? restaurant?.kamId ?? "Sistema operativo",
                  status:
                    alert.entityType === "restaurant"
                      ? "Alerta de restaurante"
                      : "Alerta de KAM",
                  eta: alert.nextBestStep.label,
                  restaurantId: restaurant?.restaurantId,
                }}
                restaurant={
                  restaurant
                    ? {
                        id: restaurant.restaurantId,
                        name: restaurant.restaurantName ?? restaurant.restaurantId,
                        city: metadata?.city ?? "Sin ciudad",
                        kamId: restaurant.kamId,
                        status:
                          restaurant.status === "critical"
                            ? "Crítico"
                            : restaurant.status === "at_risk"
                              ? "En riesgo"
                              : restaurant.status === "watchlist"
                                ? "Monitoreo"
                                : "Monitoreo",
                        whyFlagged: reason,
                        recommendation: actionLabel,
                      }
                    : undefined
                }
                isBlocking={alert.severity === "high"}
                scoreLabel={`${Math.round(alert.priorityScore)}`}
                entityLabel={buildAlertEntityLabel(alert.entityType)}
                context={buildAlertContext({
                  entityType: alert.entityType,
                  city: metadata?.city,
                  vertical: metadata?.vertical,
                })}
                reason={reason}
              />
            );
          })}
        </section>

        <section className="space-y-5">
          <ReferenceCard>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-[#17181b]">
                Cola urgente
              </h2>
              <span className="rounded-full bg-[#fff2f2] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                {urgentQueue.length} pendientes
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {urgentQueue.length === 0 ? (
                <div className="rounded-[16px] bg-[#f7f7f9] p-4">
                  <p className="text-sm text-[#5f6672]">
                    No hay alertas urgentes en esta vista.
                  </p>
                </div>
              ) : null}
              {urgentQueue.map(({ alert, restaurant, kam }) => {
                const metadata = restaurant
                  ? restaurantMetadataById.get(restaurant.restaurantId)
                  : undefined;
                const title = buildAlertTitle({
                  entityType: alert.entityType,
                  entityId: alert.entityId,
                  title: alert.title,
                  restaurantName: restaurant?.restaurantName,
                  kamName: kam?.kamName,
                });
                const reason = buildAlertReason({
                  title,
                  whyFlagged: restaurant?.whyFlagged ?? alert.whyFlagged,
                  businessSummary: restaurant?.businessSummary,
                });
                const actionLabel = buildAlertAction({
                  entityType: alert.entityType,
                  severity: alert.severity,
                  recommendedActionLabel:
                    restaurant?.recommendedAction.label ?? alert.recommendedAction.label,
                  nextBestStepLabel:
                    restaurant?.nextBestStep.label ?? alert.nextBestStep.label,
                });
                const context = buildAlertContext({
                  entityType: alert.entityType,
                  city: metadata?.city,
                  vertical: metadata?.vertical,
                });

                return (
                  <div key={alert.alertId} className="rounded-[16px] bg-[#f7f7f9] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                      {alert.entityType === "restaurant"
                        ? "Restaurante"
                        : "KAM"}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#17181b]">
                      {actionLabel}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#7b828d]">
                      {title}
                      {context ? ` · ${context}` : ""}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#7b828d]">
                      {reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </ReferenceCard>
        </section>
      </div>
    </div>
  );
}
