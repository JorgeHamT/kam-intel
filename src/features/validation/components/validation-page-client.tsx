"use client";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

import { CompactStatCard } from "@/components/shared/compact-stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { getValidationSeverityTone } from "@/features/shared/agent-presentation";
import { createCase2ValidationViewModel } from "@/lib/data/case2/adapters";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import { usePresentationSnapshot } from "@/lib/demo/use-presentation-snapshot";

type ValidationPageClientProps = {
  baseOutput: Case2OutputBundle;
};

export function ValidationPageClient({
  baseOutput,
}: ValidationPageClientProps) {
  const snapshot = usePresentationSnapshot(baseOutput);
  const viewModel = createCase2ValidationViewModel(snapshot.bundle);
  const impactedByRestaurantId = new Map(
    viewModel.impactedRestaurants.map((item) => [item.restaurantId, item]),
  );
  const impactedOverlays = viewModel.overlays.filter(
    (overlay) => overlay.relatedValidationFlags.length > 0,
  );

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-[2.2rem] font-semibold leading-none tracking-[-0.05em] text-ink">
          Validación de datos
        </h1>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <CompactStatCard
          label="Filas auditadas"
          value={`${viewModel.summary.totalRows}`}
          trailing={<CheckCircleIcon className="h-5 w-5 text-emerald-600" />}
          accent="neutral"
        />
        <CompactStatCard
          label="Registros con flags"
          value={`${viewModel.summary.rowsWithFlags}`}
          trailing={<ExclamationCircleIcon className="h-5 w-5 text-brand-600" />}
          accent="brand"
        />
        <CompactStatCard
          label="Registros con errores"
          value={`${viewModel.summary.rowsWithErrors}`}
          accent="warning"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <section className="space-y-4">
          {impactedOverlays.map((overlay) => {
            const impacted = impactedByRestaurantId.get(overlay.entityId);
            const highestSeverity =
              overlay.relatedValidationFlags.find((flag) => flag.severity === "error")?.severity ??
              overlay.relatedValidationFlags.find((flag) => flag.severity === "warning")?.severity ??
              "info";

            return (
              <article
                key={overlay.entityId}
                className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-ink">
                      {impacted?.restaurantName ?? overlay.entityId}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                      {overlay.relatedValidationFlags.length} flags · confianza {overlay.confidence.toFixed(2)}
                    </p>
                  </div>
                  <StatusBadge
                    label={overlay.degradedByValidation ? "Lectura degradada" : "Observación"}
                    tone={getValidationSeverityTone(highestSeverity)}
                  />
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-[22px] bg-slate-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Flags visibles
                    </p>
                    <div className="mt-2 space-y-2 text-sm font-medium text-slate-700">
                      {overlay.relatedValidationFlags.slice(0, 2).map((flag) => (
                        <p key={`${overlay.entityId}-${flag.code}`}>{flag.message}</p>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[22px] bg-slate-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Impacto
                    </p>
                    <div className="mt-2 space-y-2 text-sm font-medium text-slate-700">
                      <p>{overlay.confidenceReason[0] ?? "Impacto visible en lectura."}</p>
                      {impacted?.validationNote ? <p>{impacted.validationNote}</p> : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <div className="space-y-5">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel">
            <h2 className="text-lg font-semibold text-ink">Benchmark vs. agente</h2>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Peer groups confiables
                </p>
                <p className="mt-2 text-xl font-semibold text-ink">
                  {viewModel.benchmarkSnapshot.reliablePeerCount}
                </p>
              </div>
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Benchmark fallback
                </p>
                <p className="mt-2 text-xl font-semibold text-ink">
                  {viewModel.benchmarkSnapshot.fallbackPeerCount}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel">
            <h2 className="text-lg font-semibold text-ink">Nota metodológica</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-[22px] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Fecha de referencia: {viewModel.summary.referenceDateUsed}
              </div>
              <div className="rounded-[22px] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Filas recalculadas: {viewModel.summary.rowsRecalculated}
              </div>
              <div className="rounded-[22px] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Source sheet: {viewModel.summary.sourceSheetName}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
