"use client";

import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

import { AgentCard } from "@/components/shared/agent-card";
import { BenchmarkBlock } from "@/components/shared/benchmark-block";
import { DataCard } from "@/components/shared/data-card";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { createValidationViewModel } from "@/features/validation/adapters/validation-view-model";
import { useDemoSnapshot } from "@/lib/demo/use-demo-snapshot";

export default function ValidationPage() {
  const snapshot = useDemoSnapshot();
  const viewModel = createValidationViewModel(snapshot);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Validación"
        title="Validación de datos"
        description="Vista sobria para explicar qué se validó, qué sigue abierto y por qué la confiabilidad metodológica importa antes de confiar en cualquier priorización del agente."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <DataCard
            eyebrow="Cobertura"
            title="Reglas visibles"
            value={`${viewModel.validationIssues.length}`}
            accent="neutral"
            icon={<CheckCircleIcon className="h-5 w-5" />}
            description="Controles activos sobre campos que sí impactan la lectura operativa."
          />
          <DataCard
            eyebrow="Riesgo"
            title="Issues críticos"
            value={`${viewModel.criticalIssues}`}
            accent="brand"
            icon={<ExclamationCircleIcon className="h-5 w-5" />}
            description="Bloquean o degradan la capacidad de recomendar una acción confiable."
          />
          <DataCard
            eyebrow="Seguimiento"
            title="Issues abiertos"
            value={`${viewModel.openIssues}`}
            accent="warning"
            description="Pendientes antes de usar el benchmark solo como referencia comparativa."
          />
        </div>
      </PageHeader>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-4">
          {viewModel.validationIssues.map((issue) => (
            <article
              key={issue.id}
              className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-ink">{issue.rule}</h2>
                    <StatusBadge label={issue.status} tone={issue.severity} />
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-600">
                    Campo afectado: {issue.affectedField}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600">
                  Impacto visible en la demo
                </div>
              </div>

              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                <AgentCard label="Qué se validó" tone="neutral">
                  Regla aplicada al campo base para evitar depender ciegamente de derivados.
                </AgentCard>
                <AgentCard label="Anomalía detectada" tone={issue.severity === "critical" ? "critical" : "warning"}>
                  {issue.note}
                </AgentCard>
                <AgentCard label="Por qué importa" tone="neutral">
                  Si esta regla falla, el agente debe ser más prudente con la lectura y la
                  priorización.
                </AgentCard>
              </div>
            </article>
          ))}
        </section>

        <section className="space-y-6">
          <BenchmarkBlock
            title="Comparación entre benchmark y lectura del agente"
            description="La UI deja visible que cualquier benchmark heredado sirve como referencia comparativa, no como fuente de verdad central."
            leftLabel="Benchmark heredado"
            leftValue="Solo referencia"
            rightLabel="Lectura actual del agente"
            rightValue="Recalcula antes de concluir"
            footnote="Placeholder honesto: la comparación cuantitativa definitiva depende del frente de datos y del motor del agente."
          />

          <div className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
              Nota metodológica
            </p>
            <h2 className="mt-2 text-xl font-semibold text-ink">
              Confiabilidad antes que precisión aparente
            </h2>
            <div className="mt-5 space-y-3">
              <AgentCard label="Campos base" tone="neutral">
                La vista privilegia campos base y reglas recalculadas antes de confiar en un
                score derivado.
              </AgentCard>
              <AgentCard label="Severidad" tone="warning">
                La severidad visible expresa urgencia operativa, no una metodología final
                congelada.
              </AgentCard>
              <AgentCard label="Límite explícito" tone="critical">
                Cuando la evidencia no alcanza, el sistema debe seguir comunicando que hay
                información insuficiente para concluir.
              </AgentCard>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
