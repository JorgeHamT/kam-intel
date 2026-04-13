"use client";

import Link from "next/link";
import { BoltIcon, ClockIcon, FunnelIcon } from "@heroicons/react/24/outline";

import { AgentCard } from "@/components/shared/agent-card";
import { FilterTabs } from "@/components/shared/filter-tabs";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { createAlertsViewModel } from "@/features/alerts/adapters/alerts-view-model";
import { useDemoSnapshot } from "@/lib/demo/use-demo-snapshot";

export default function AlertsPage() {
  const snapshot = useDemoSnapshot();
  const viewModel = createAlertsViewModel(snapshot);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Alertas"
        title="Cola operativa"
        description="Feed accionable para priorizar casos, entender por qué fueron marcados y bajar rápido al restaurante afectado."
        actions={
          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600">
            <FunnelIcon className="h-4 w-4" />
            Filtros activos de demo
          </div>
        }
      >
        <FilterTabs tabs={viewModel.tabs} activeId="all" />
      </PageHeader>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-4">
          {viewModel.alertCards.map(({ alert, restaurant, isBlocking }) => {

            return (
              <article
                key={alert.id}
                className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">
                        {alert.title}
                      </h2>
                      <StatusBadge
                        label={isBlocking ? "Bloqueando" : "En seguimiento"}
                        tone={isBlocking ? "critical" : "warning"}
                      />
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-600">
                      Responsable: {alert.owner} · ETA: {alert.eta}
                    </p>
                  </div>

                  {restaurant ? (
                    <Link
                      href={`/restaurants/${restaurant.id}`}
                      className="inline-flex items-center rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
                    >
                      Abrir restaurante
                    </Link>
                  ) : null}
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-3">
                  <AgentCard label="Por qué fue marcado" tone={isBlocking ? "critical" : "warning"}>
                    {restaurant?.whyFlagged ??
                      "La alerta existe para no perder seguimiento operativo entre owners."}
                  </AgentCard>
                  <AgentCard label="Acción sugerida" tone="neutral">
                    {restaurant?.recommendation ??
                      "Usar la cola como disparador de intervención, no solo como registro."}
                  </AgentCard>
                  <AgentCard label="Siguiente paso" tone="neutral">
                    Confirmar responsable, bajar al detalle de la cuenta y mantener ETA visible
                    hasta cierre.
                  </AgentCard>
                </div>
              </article>
            );
          })}
        </section>

        <section className="space-y-6">
          <div className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
              Cola urgente
            </p>
            <h2 className="mt-2 text-xl font-semibold text-ink">
              Acciones que no deberían esperar
            </h2>
            <div className="mt-5 space-y-3">
              {snapshot.alertSummary.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4"
                >
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <BoltIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{alert.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {alert.owner} debe mover este caso antes de {alert.eta}.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
              Lectura del agente
            </p>
            <h2 className="mt-2 text-xl font-semibold text-ink">Cómo usar el feed</h2>
            <div className="mt-5 space-y-3">
              <AgentCard label="1. Prioridad" tone="critical">
                Empezar por lo bloqueante para no contaminar la priorización posterior.
              </AgentCard>
              <AgentCard label="2. Explicación causal" tone="warning">
                Cada alerta ya expone por qué importa y qué acción sugiere.
              </AgentCard>
              <AgentCard label="3. Trazabilidad" tone="neutral">
                Mantener owner y ETA visibles evita que la demo se vea como listado pasivo.
              </AgentCard>
            </div>

            <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <ClockIcon className="h-4 w-4" />
                Estado demo
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                La pantalla ya comunica prioridad y siguiente acción, mientras la lógica final
                de scoring sigue viviendo fuera de este frente.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
