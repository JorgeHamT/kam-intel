import type {
  BenchmarkComparison,
  RestaurantAssessment,
  Signal,
} from "../contracts/agent-output.ts";
import { toFixedMetric, toPercentage } from "../helpers/scoring-utils.ts";

function formatEvidenceValue(
  metric: string,
  value: number | string | boolean | null,
): string {
  if (typeof value === "number") {
    return metric.includes("pct") ? toPercentage(value) : toFixedMetric(value);
  }

  if (typeof value === "boolean") {
    return value ? "sí" : "no";
  }

  return String(value ?? "sin dato");
}

function buildConfidenceLabel(confidence: number): string {
  if (confidence >= 0.85) {
    return "alta";
  }

  if (confidence >= 0.7) {
    return "media";
  }

  return "reducida";
}

function buildBenchmarkReference(benchmark?: BenchmarkComparison): string {
  if (!benchmark?.peerGroupUsed) {
    return "Sin referencia benchmark sólida en esta corrida.";
  }

  const notable = benchmark.notableDeltas[0];
  if (!notable) {
    return `Benchmark contra ${benchmark.peerGroupUsed} con muestra ${benchmark.sampleSize ?? "sin dato"}.`;
  }

  return `Referencia benchmark: ${notable.metric} vs mediana de ${benchmark.peerGroupUsed} (${formatEvidenceValue(notable.metric, notable.entityValue)} vs ${formatEvidenceValue(notable.metric, notable.peerMedian)}).`;
}

export function buildWhyFlagged(params: {
  signals: Signal[];
  confidence: number;
  benchmark?: BenchmarkComparison;
  validationNote?: string;
  validationFlagsCount?: number;
}): string[] {
  const primarySignals = params.signals
    .filter((signal) => signal.affectsRecommendation)
    .slice(0, 3);
  const primarySignal = primarySignals[0];
  const supportSignals = primarySignals.slice(1);
  const mainEvidence = primarySignal?.evidence[0];

  const narratives: string[] = [];

  if (primarySignal) {
    narratives.push(
      `Señal principal: ${primarySignal.label}. Evidencia base: ${mainEvidence?.metric ?? "sin métrica"} en ${formatEvidenceValue(mainEvidence?.metric ?? "", mainEvidence?.value ?? null)}.`,
    );
  }

  if (supportSignals.length > 0) {
    narratives.push(
      `Señales de soporte: ${supportSignals.map((signal) => signal.label).join(", ")}.`,
    );
  }

  narratives.push(buildBenchmarkReference(params.benchmark));
  narratives.push(
    `Nivel de confianza: ${buildConfidenceLabel(params.confidence)} (${params.confidence}).`,
  );

  if (params.validationFlagsCount && params.validationFlagsCount > 0) {
    narratives.push(
      params.validationNote
        ? `Nota de validación: ${params.validationNote}`
        : `Nota de validación: ${params.validationFlagsCount} flags afectan la lectura.`,
    );
  }

  return narratives;
}

export function buildBusinessSummary(assessment: RestaurantAssessment): string {
  const lead =
    assessment.status === "critical"
      ? "Cuenta bajo presión operativa relevante."
      : assessment.status === "at_risk"
        ? "Cuenta con deterioro que requiere seguimiento."
        : assessment.status === "watchlist"
          ? "Cuenta a observar con señales tempranas."
          : "Cuenta sin presión operativa relevante en esta corrida.";
  const benchmarkLine = assessment.benchmark?.peerGroupUsed
    ? `Peer group usado: ${assessment.benchmark.peerGroupUsed} con confianza ${assessment.peerGroupConfidence ?? "sin dato"}.`
    : "Sin peer group usable para comparación fuerte.";
  const validationLine = assessment.validationFlags?.length
    ? `Validación: ${assessment.validationFlags.length} flags moderan la lectura.`
    : "Validación sin flags relevantes para esta cuenta.";

  return `${lead} Prioridad ${assessment.priorityScore}/100, severidad ${assessment.severity}, confianza ${assessment.confidence}. ${benchmarkLine} ${validationLine}`;
}
