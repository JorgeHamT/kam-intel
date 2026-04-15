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

function translateValidationMessage(message: string) {
  if (message === "Original var_ordenes_pct differs from the official recalculation.") {
    return "La variación de órdenes del archivo no coincide con el recálculo del sistema.";
  }

  if (message === "Original delta_rating differs from the official recalculation.") {
    return "El cambio de rating del archivo no coincide con el recálculo del sistema.";
  }

  if (message === "restaurantId must be unique within the dataset.") {
    return "El identificador del restaurante aparece repetido y debe ser único.";
  }

  if (message === "Benchmark peer group fell back to vertical.") {
    return "No hubo suficientes casos comparables en el mismo grupo, así que se usó una referencia más general.";
  }

  if (message === "Benchmark peer group fell back to city.") {
    return "No hubo suficientes comparables directos, así que se usó una referencia por ciudad.";
  }

  if (message === "Benchmark peer group fell back to global.") {
    return "No hubo suficientes comparables directos, así que se usó una referencia general del dataset.";
  }

  if (
    message ===
    "Benchmark peer group is usable with caution because peer count is below 8."
  ) {
    return "La comparación existe, pero se apoya en pocos casos comparables y debe leerse con cautela.";
  }

  return message;
}

function translateConfidenceReason(reason: string) {
  if (reason === "Benchmark peer group fell back to vertical.") {
    return "No hubo suficientes casos comparables en el mismo grupo, así que se usó una referencia más general.";
  }

  if (reason.startsWith("Peer group ") && reason.includes(" con base suficiente")) {
    const normalized = reason.replace(/^Peer group /, "");
    return `La comparación se apoyó en una referencia sólida (${normalized}).`;
  }

  if (reason.startsWith("Peer group ") && reason.includes(" con muestra limitada")) {
    const normalized = reason.replace(/^Peer group /, "");
    return `La comparación existe, pero se apoya en una referencia más limitada (${normalized}).`;
  }

  if (reason === "Sin benchmark confiable; la comparación relativa es limitada.") {
    return "No hubo una referencia sólida para comparar este caso, así que la lectura debe tomarse con mayor prudencia.";
  }

  if (reason === "La calidad de datos obliga a usar la lectura con prudencia.") {
    return "La calidad del dato reduce la solidez de la lectura y exige una interpretación más prudente.";
  }

  if (reason === "Hay conflicto entre benchmark y etiqueta de riesgo previa.") {
    return "La referencia previa no coincide del todo con la lectura actual, por lo que conviene revisar el caso con más cuidado.";
  }

  if (reason === "Sin penalizaciones relevantes de confianza.") {
    return "No se detectaron señales metodológicas relevantes que reduzcan la confianza de lectura.";
  }

  return reason;
}

function translateValidationNote(note: string) {
  const match = note.match(
    /^Lectura moderada por (\d+) flags de calidad del dato\.$/,
  );

  if (match) {
    const count = Number(match[1] ?? "0");
    return `La lectura se moderó por ${count} ${
      count === 1 ? "observación" : "observaciones"
    } de calidad del dato.`;
  }

  return note;
}

function formatConfidencePercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

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
  const benchmarkReliable = viewModel.benchmarkSnapshot.reliablePeerCount;
  const benchmarkCaution = viewModel.benchmarkSnapshot.cautionPeerCount;
  const benchmarkFallback = viewModel.benchmarkSnapshot.fallbackPeerCount;
  const deltaRatingMismatchTotal = Object.values(
    viewModel.benchmarkSnapshot.mismatchSummary.deltaRating,
  ).reduce((sum, value) => sum + value, 0);
  const orderVarianceMismatchTotal = Object.values(
    viewModel.benchmarkSnapshot.mismatchSummary.varOrdenesPct,
  ).reduce((sum, value) => sum + value, 0);

  return (
    <div className="space-y-5">
      <section>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
          Control de calidad del análisis
        </p>
        <h1 className="text-[2.2rem] font-semibold leading-none tracking-[-0.05em] text-ink">
          Validación de confianza del dato
        </h1>
        <p className="mt-3 max-w-[780px] text-sm leading-6 text-slate-600">
          Antes de priorizar casos, el sistema revisa si los datos son
          confiables. Si encuentra inconsistencias o referencias débiles,
          reduce la confianza de lectura y lo deja visible.
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <CompactStatCard
          label="Registros auditados"
          value={`${viewModel.summary.totalRows}`}
          trailing={<CheckCircleIcon className="h-5 w-5 text-emerald-600" />}
          accent="neutral"
        />
        <CompactStatCard
          label="Con observaciones metodológicas"
          value={`${viewModel.summary.rowsWithFlags}`}
          trailing={<ExclamationCircleIcon className="h-5 w-5 text-brand-600" />}
          accent="brand"
        />
        <CompactStatCard
          label="Con errores a revisar"
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
                      {overlay.relatedValidationFlags.length}{" "}
                      {overlay.relatedValidationFlags.length === 1
                        ? "observación"
                        : "observaciones"}{" "}
                      ·
                      confianza {formatConfidencePercent(overlay.confidence)}
                    </p>
                  </div>
                  <StatusBadge
                    label={
                      overlay.degradedByValidation
                        ? "Lectura con prudencia"
                        : "Observación metodológica"
                    }
                    tone={getValidationSeverityTone(highestSeverity)}
                  />
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-[22px] bg-slate-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Qué se detectó
                    </p>
                    <div className="mt-2 space-y-2 text-sm font-medium text-slate-700">
                      {overlay.relatedValidationFlags.slice(0, 2).map((flag) => (
                        <p key={`${overlay.entityId}-${flag.code}`}>
                          {translateValidationMessage(flag.message)}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[22px] bg-slate-50 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Qué significa para la confianza
                    </p>
                    <div className="mt-2 space-y-2 text-sm font-medium text-slate-700">
                      <p>
                        {translateConfidenceReason(
                          overlay.confidenceReason[0] ??
                            "La lectura debe interpretarse con mayor prudencia.",
                        )}
                      </p>
                      {impacted?.validationNote ? (
                        <p>{translateValidationNote(impacted.validationNote)}</p>
                      ) : null}
                      {!impacted?.validationNote && overlay.degradedByValidation ? (
                        <p>Este caso requiere una lectura más prudente antes de convertirlo en prioridad operativa.</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <div className="space-y-5">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel">
            <h2 className="text-lg font-semibold text-ink">
              Calidad de la referencia comparativa
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Resume si el sistema pudo comparar cada caso contra una referencia
              sólida, si la comparación fue más limitada o si tuvo que apoyarse
              en una referencia alternativa.
            </p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Casos con comparación sólida
                </p>
                <p className="mt-2 text-xl font-semibold text-ink">
                  {benchmarkReliable}
                </p>
              </div>
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Casos con comparación limitada
                </p>
                <p className="mt-2 text-xl font-semibold text-ink">
                  {benchmarkCaution}
                </p>
              </div>
              <div className="rounded-[22px] bg-slate-50 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Casos con referencia alternativa
                </p>
                <p className="mt-2 text-xl font-semibold text-ink">
                  {benchmarkFallback}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel">
            <h2 className="text-lg font-semibold text-ink">
              Qué recalcula el sistema y por qué importa
            </h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-[22px] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Registros recalculados: {viewModel.summary.rowsRecalculated}
              </div>
              <div className="rounded-[22px] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Casos donde cambió el cálculo de rating:{" "}
                {deltaRatingMismatchTotal}
              </div>
              <div className="rounded-[22px] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Casos donde cambió la variación de órdenes:{" "}
                {orderVarianceMismatchTotal}
              </div>
              <div className="rounded-[22px] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Hoja auditada: {viewModel.summary.sourceSheetName}
              </div>
              <div className="rounded-[22px] bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                Fecha de referencia usada: {viewModel.summary.referenceDateUsed}
              </div>
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel">
            <h2 className="text-lg font-semibold text-ink">
              Cómo leer esta pantalla
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <p>
                Esta vista no muestra errores operativos del negocio. Muestra
                qué tan sólida es la base de datos sobre la que el sistema está
                leyendo el caso.
              </p>
              <p>
                Si la comparación es sólida, la lectura del agente es más
                confiable. Si la comparación es limitada o alternativa, la
                prioridad sigue visible, pero debe interpretarse con más
                prudencia.
              </p>
              <p>
                El objetivo de esta capa es demostrar que el sistema no toma el
                Excel al pie de la letra: primero revisa, recalcula y después
                prioriza.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
