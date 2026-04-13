"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BellAlertIcon,
  BuildingStorefrontIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

import { AgentCard } from "@/components/shared/agent-card";
import { ChartWrapper } from "@/components/shared/chart-wrapper";
import { DataCard } from "@/components/shared/data-card";
import { ErrorState } from "@/components/shared/error-state";
import { PageHeader } from "@/components/shared/page-header";
import { RankingTable } from "@/components/shared/ranking-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { createKamDetailViewModel } from "@/features/kam-detail/adapters/kam-detail-view-model";
import { useDemoSnapshot } from "@/lib/demo/use-demo-snapshot";

export default function KamDetailPage() {
  const params = useParams<{ kamId: string }>();
  const snapshot = useDemoSnapshot();
  const viewModel = createKamDetailViewModel(snapshot, params.kamId);

  if (!viewModel) {
    return (
      <ErrorState
        title="KAM no encontrado"
        description="El identificador solicitado no existe en el snapshot actual de demo."
      />
    );
  }

  const { kam, relatedRestaurants, criticalCount, monitoringCount, badgeTone, inventoryBars, rankingRows } =
    viewModel;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Torre de control individual"
        title={kam.name}
        description={`${kam.portfolio}. Vista individual para leer presión operativa del portfolio, ubicar cuentas a revisar y sostener una intervención más explicable.`}
        badge={
          <StatusBadge
            label={criticalCount > 0 ? "Intervención prioritaria" : "Seguimiento activo"}
            tone={badgeTone}
          />
        }
        actions={
          <Link
            href="/kams"
            className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            Volver a KAMs
          </Link>
        }
      >
        <div className="grid gap-4 md:grid-cols-4">
          <DataCard
            eyebrow="Portafolio"
            title="Restaurantes conectados"
            value={`${relatedRestaurants.length}`}
            accent="neutral"
            icon={<BuildingStorefrontIcon className="h-5 w-5" />}
          />
          <DataCard
            eyebrow="Alerta"
            title="Alertas activas"
            value={`${kam.openAlerts}`}
            accent="brand"
            icon={<BellAlertIcon className="h-5 w-5" />}
          />
          <DataCard
            eyebrow="Severidad"
            title="Cuentas críticas"
            value={`${criticalCount}`}
            accent="warning"
            icon={<Squares2X2Icon className="h-5 w-5" />}
          />
          <DataCard
            eyebrow="Monitoreo"
            title="Cuentas en observación"
            value={`${monitoringCount}`}
            accent="neutral"
            description="No se cierra score final; solo expresa el estado visible del mock."
          />
        </div>
      </PageHeader>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AgentCard label="Resumen ejecutivo" tone="critical">
              {kam.narrative} La presión se vuelve más relevante cuando varias cuentas del
              mismo bloque comparten señales operativas.
            </AgentCard>
            <AgentCard label="Señales detectadas" tone="warning">
              Caídas coordinadas en activación, owners incompletos o ejecución promocional
              por debajo del patrón esperado.
            </AgentCard>
            <AgentCard label="Intervención sugerida" tone="neutral">
              Revisar primero las cuentas críticas y separar qué parte es dato pendiente de
              qué parte es acción comercial inmediata.
            </AgentCard>
          </div>

          <ChartWrapper
            eyebrow="Distribución"
            title="Inventario del portafolio"
            description="Distribución simple de estados visibles por restaurante dentro del KAM."
          >
            <div className="space-y-4">
              {inventoryBars.map((item) => {
                const width = `${Math.max((item.value / relatedRestaurants.length) * 100, 8)}%`;

                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-slate-700">{item.label}</p>
                      <p className="text-sm font-semibold text-ink">{item.value}</p>
                    </div>
                    <div className="mt-2 h-3 rounded-full bg-slate-100">
                      <div className={`h-3 rounded-full ${item.toneClass}`} style={{ width }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartWrapper>
        </section>

        <section className="space-y-6">
          <RankingTable
            eyebrow="Top accounts"
            title="Cuentas a revisar primero"
            description="Orden táctico de apertura por restaurante dentro del portfolio."
            rows={rankingRows}
          />

          <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
              Siguiente movimiento
            </p>
            <h2 className="mt-2 text-xl font-semibold text-ink">
              Cómo operar este KAM sin cerrar lógica no congelada
            </h2>
            <div className="mt-5 space-y-3">
              <AgentCard label="Validar" tone="warning">
                Confirmar si la señal viene de cobertura operativa, promo o integridad del
                input.
              </AgentCard>
              <AgentCard label="Intervenir" tone="critical">
                Entrar al restaurante con estado crítico antes de ampliar acciones sobre todo
                el portfolio.
              </AgentCard>
              <AgentCard label="Escalar" tone="neutral">
                Si persiste la presión, mover el caso a Alertas para seguimiento estructurado.
              </AgentCard>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
