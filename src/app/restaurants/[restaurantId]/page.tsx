"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BuildingStorefrontIcon,
  MapPinIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { AgentCard } from "@/components/shared/agent-card";
import { BenchmarkBlock } from "@/components/shared/benchmark-block";
import { DataCard } from "@/components/shared/data-card";
import { ErrorState } from "@/components/shared/error-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { createRestaurantDetailViewModel } from "@/features/restaurant-detail/adapters/restaurant-detail-view-model";
import { useDemoSnapshot } from "@/lib/demo/use-demo-snapshot";

export default function RestaurantDetailPage() {
  const params = useParams<{ restaurantId: string }>();
  const snapshot = useDemoSnapshot();
  const viewModel = createRestaurantDetailViewModel(snapshot, params.restaurantId);

  if (!viewModel) {
    return (
      <ErrorState
        title="Restaurante no encontrado"
        description="El identificador solicitado no existe en el snapshot actual de demo."
      />
    );
  }

  const { restaurant, kam, tone } = viewModel;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Diagnóstico operativo"
        title={restaurant.name}
        description={`${restaurant.city}. La lectura del restaurante explica el riesgo visible, evita falsa precisión y deja clara la acción sugerida.`}
        badge={<StatusBadge label={restaurant.status} tone={tone} />}
        actions={
          kam ? (
            <Link
              href={`/kams/${kam.id}`}
              className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-700"
            >
              Volver al KAM
            </Link>
          ) : null
        }
      >
        <div className="grid gap-4 md:grid-cols-4">
          <DataCard
            eyebrow="Riesgo"
            title="Estado actual"
            value={restaurant.status}
            accent={tone === "critical" ? "brand" : tone === "warning" ? "warning" : "neutral"}
            icon={<BuildingStorefrontIcon className="h-5 w-5" />}
          />
          <DataCard
            eyebrow="Cobertura"
            title="Ciudad"
            value={restaurant.city}
            accent="neutral"
            icon={<MapPinIcon className="h-5 w-5" />}
          />
          <DataCard
            eyebrow="Owner"
            title="KAM responsable"
            value={kam?.name ?? "Sin asignar"}
            accent="neutral"
            icon={<UserCircleIcon className="h-5 w-5" />}
          />
          <DataCard
            eyebrow="Siguiente paso"
            title="Acción inmediata"
            value="Revisar evidencia"
            accent="warning"
            description="La automatización final no se cierra en este frente; la UI sí deja claro el siguiente movimiento."
          />
        </div>
      </PageHeader>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <AgentCard label="Qué detectó" tone={tone === "critical" ? "critical" : "warning"}>
              {restaurant.whyFlagged}
            </AgentCard>
            <AgentCard label="Por qué importa" tone="neutral">
              Una señal en esta cuenta puede afectar la percepción de salud del portfolio y
              distorsionar la priorización del KAM si no se explica bien.
            </AgentCard>
            <AgentCard label="Acción recomendada" tone="neutral">
              {restaurant.recommendation}
            </AgentCard>
            <AgentCard label="Siguiente paso" tone="warning">
              Validar insumo operativo, revisar contexto comercial y decidir si el caso pasa a
              seguimiento reforzado.
            </AgentCard>
          </div>

          <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
              Resumen ejecutivo
            </p>
            <h2 className="mt-2 text-xl font-semibold text-ink">
              Qué sabemos y qué todavía no debemos fingir
            </h2>
            <div className="mt-5 space-y-3">
              <AgentCard label="Diagnóstico operativo" tone="neutral">
                La cuenta ya muestra una causalidad legible para demo: señal, impacto y acción
                sugerida.
              </AgentCard>
              <AgentCard label="Límite metodológico" tone="warning">
                El score definitivo y la prioridad cuantitativa final dependen de otras capas
                todavía no congeladas.
              </AgentCard>
            </div>
          </section>
        </section>

        <section className="space-y-6">
          <BenchmarkBlock
            title="Contexto comparativo"
            description="Referencia visual para comparar la lectura actual del restaurante con una expectativa operativa más conservadora."
            leftLabel="Lectura comparativa"
            leftValue={restaurant.status === "Crítico" ? "Por encima del umbral esperado" : "Bajo observación"}
            rightLabel="Confianza metodológica"
            rightValue="Sujeta a validación"
            footnote="La UI deja claro que el benchmark es contextual; no reemplaza el recálculo del agente."
          />

          <div className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
              Navegación contextual
            </p>
            <h2 className="mt-2 text-xl font-semibold text-ink">
              Desde aquí puedes seguir el caso
            </h2>
            <div className="mt-5 space-y-3">
              {kam ? (
                <Link
                  href={`/kams/${kam.id}`}
                  className="block rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-brand-200 hover:bg-brand-50/60"
                >
                  <p className="font-semibold text-ink">Volver al detalle del KAM</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Retoma el portfolio completo para entender si el caso es aislado o
                    sistémico.
                  </p>
                </Link>
              ) : null}

              <Link
                href="/alerts"
                className="block rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-brand-200 hover:bg-brand-50/60"
              >
                <p className="font-semibold text-ink">Ir a Alertas</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Usa la cola operativa si el caso requiere owner, ETA y seguimiento visible.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
