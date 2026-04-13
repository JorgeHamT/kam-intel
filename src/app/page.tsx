"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { AlertSummaryPanel } from "@/components/dashboard/alert-summary-panel";
import { CriticalBanner } from "@/components/dashboard/critical-banner";
import { KamPressureList } from "@/components/dashboard/kam-pressure-list";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { SignalsPanel } from "@/components/dashboard/signals-panel";
import { AgentCard } from "@/components/shared/agent-card";
import { ChartWrapper } from "@/components/shared/chart-wrapper";
import { DataCard } from "@/components/shared/data-card";
import { PageHeader } from "@/components/shared/page-header";
import { RankingTable } from "@/components/shared/ranking-table";
import { createDashboardViewModel } from "@/features/dashboard/adapters/dashboard-view-model";
import { useDemoSnapshot } from "@/lib/demo/use-demo-snapshot";

export default function DashboardPage() {
  const snapshot = useDemoSnapshot();
  const viewModel = createDashboardViewModel(snapshot);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={viewModel.header.eyebrow}
        title={viewModel.header.title}
        description={viewModel.header.description}
      >
        <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
          <DataCard
            eyebrow="Foco crítico"
            title="Riesgo prioritario del día"
            value="Cobertura comercial tensionada"
            accent="brand"
            description="Las señales activas se concentran en cuentas clave y ya requieren seguimiento coordinado entre KAM, operación y validación de datos."
          />
          <AgentCard label="Briefing ejecutivo" tone="neutral">
            El sistema ya expresa el patrón del agente en la primera lectura: detección,
            impacto, intervención sugerida y siguiente movimiento operativo.
          </AgentCard>
        </div>
      </PageHeader>

      <CriticalBanner
        headline={viewModel.digest.headline}
        detected={viewModel.digest.detected}
        whyItMatters={viewModel.digest.whyItMatters}
        recommendation={viewModel.digest.recommendation}
        nextStep={viewModel.digest.nextStep}
      />

      <KpiGrid items={viewModel.topKpis} />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <KamPressureList items={viewModel.kamPressureItems} />
        <SignalsPanel items={viewModel.digest.signals} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <ChartWrapper
          eyebrow="Concentración"
          title="Ciudades con cuentas bajo seguimiento"
          description="Lectura simple de concentración de riesgo por plaza usando solo el inventario mock ya visible."
        >
          <div className="space-y-4">
            {viewModel.cityBars.map((item) => {
              const width = `${Math.max((item.total / viewModel.restaurants.length) * 100, 16)}%`;

              return (
                <div key={item.city}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-700">{item.city}</p>
                    <p className="text-sm font-semibold text-ink">{item.total} cuentas</p>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-slate-100">
                    <div
                      className="h-3 rounded-full bg-brand"
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartWrapper>

        <RankingTable
          eyebrow="Intervención"
          title="KAMs priorizados para seguimiento"
          description="Orden visual para decidir dónde abrir el siguiente hilo de intervención."
          rows={viewModel.rankingRows}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <AlertSummaryPanel items={viewModel.alertSummary} />

        <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
            Resumen de intervención
          </p>
          <h2 className="mt-2 text-xl font-semibold text-ink">
            Qué hacer después de esta lectura
          </h2>
          <div className="mt-5 space-y-4">
            <AgentCard label="1. Validar" tone="warning">
              Confirmar que las señales con promo, owner y cobertura operativa no vienen de
              campos incompletos.
            </AgentCard>
            <AgentCard label="2. Priorizar" tone="critical">
              Enfocar la revisión táctica en los KAMs con más concentración de restaurantes
              críticos.
            </AgentCard>
            <AgentCard label="3. Ejecutar" tone="neutral">
              Abrir el detalle de cada cuenta con evidencia y acción recomendada antes del
              siguiente refresh.
            </AgentCard>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
            Navega a Alertas para operar la cola urgente
            <ArrowRightIcon className="h-4 w-4" />
          </div>
        </section>
      </div>
    </div>
  );
}
