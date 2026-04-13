"use client";

import Link from "next/link";
import {
  ArrowTrendingUpIcon,
  BuildingStorefrontIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";

import { AgentCard } from "@/components/shared/agent-card";
import { DataCard } from "@/components/shared/data-card";
import { PageHeader } from "@/components/shared/page-header";
import { RankingTable } from "@/components/shared/ranking-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { createKamsViewModel } from "@/features/kams/adapters/kams-view-model";
import { useDemoSnapshot } from "@/lib/demo/use-demo-snapshot";

export default function KamsPage() {
  const snapshot = useDemoSnapshot();
  const viewModel = createKamsViewModel(snapshot);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Cobertura comercial"
        title="Vista de KAMs"
        description="Comparación ejecutiva de portafolios para detectar presión operativa, cuentas críticas y prioridad de intervención sin cerrar una metodología final que todavía depende de otros frentes."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <DataCard
            eyebrow="Portafolio"
            title="KAMs visibles"
            value={`${snapshot.kams.length}`}
            accent="neutral"
            icon={<BuildingStorefrontIcon className="h-5 w-5" />}
            description="Managers con lectura activa en la demo."
          />
          <DataCard
            eyebrow="Presión"
            title="Cuentas bajo seguimiento"
            value={`${viewModel.summary.totalRestaurantsAtRisk}`}
            accent="warning"
            icon={<FlagIcon className="h-5 w-5" />}
            description="Restaurantes marcados dentro del portafolio actual."
          />
          <DataCard
            eyebrow="Intervención"
            title="Alertas abiertas"
            value={`${viewModel.summary.totalAlerts}`}
            accent="brand"
            icon={<ArrowTrendingUpIcon className="h-5 w-5" />}
            description="Volumen total de seguimiento operativo pendiente."
          />
        </div>
      </PageHeader>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-4">
          {viewModel.cards.map(({ kam, linkedRestaurants, tone }) => {

            return (
              <article
                key={kam.id}
                className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink">
                        {kam.name}
                      </h2>
                      <StatusBadge
                        label={
                          tone === "critical"
                            ? "Alta prioridad"
                            : tone === "warning"
                              ? "Intervención sugerida"
                              : "Monitoreo"
                        }
                        tone={tone}
                      />
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-600">{kam.portfolio}</p>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                      {kam.narrative}
                    </p>
                  </div>

                  <Link
                    href={`/kams/${kam.id}`}
                    className="inline-flex items-center rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-100"
                  >
                    Abrir detalle de KAM
                  </Link>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-4">
                  <MetricCard
                    label="Salud del portafolio"
                    value={tone === "critical" ? "Tensionada" : "En revisión"}
                  />
                  <MetricCard
                    label="Riesgo visible"
                    value={`${linkedRestaurants.length} cuentas conectadas`}
                  />
                  <MetricCard
                    label="Cuentas críticas"
                    value={`${kam.restaurantsAtRisk}`}
                  />
                  <MetricCard label="Alertas abiertas" value={`${kam.openAlerts}`} />
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-3">
                  <AgentCard label="Por qué fue marcado" tone="warning">
                    La señal se concentra en un mismo portfolio y ya amerita lectura de
                    presión operativa antes de ejecutar recovery comercial.
                  </AgentCard>
                  <AgentCard label="Acción recomendada" tone="neutral">
                    Revisar primero cuentas con owner o promo inconsistente y luego bajar a
                    detalle por restaurante.
                  </AgentCard>
                  <AgentCard label="Siguiente paso" tone="critical">
                    Abrir la vista individual del KAM y ordenar las cuentas por severidad y
                    dependencia de validación.
                  </AgentCard>
                </div>
              </article>
            );
          })}
        </section>

        <div className="space-y-6">
          <RankingTable
            eyebrow="Comparativo"
            title="Prioridad entre managers"
            description="Lectura lado a lado para decidir dónde intervenir primero."
            rows={viewModel.rankingRows}
          />

          <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
              Briefing
            </p>
            <h2 className="mt-2 text-xl font-semibold text-ink">Cómo leer esta pantalla</h2>
            <div className="mt-5 space-y-3">
              <AgentCard label="1. Salud del portafolio" tone="neutral">
                Mirar la cantidad de cuentas bajo seguimiento antes de entrar al detalle.
              </AgentCard>
              <AgentCard label="2. Presión sobre el KAM" tone="warning">
                Detectar dónde varias señales convergen sobre el mismo manager.
              </AgentCard>
              <AgentCard label="3. Prioridad de intervención" tone="critical">
                Bajar primero al KAM con más alertas abiertas y mayor concentración de riesgo.
              </AgentCard>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold tracking-[-0.03em] text-ink">{value}</p>
    </div>
  );
}
