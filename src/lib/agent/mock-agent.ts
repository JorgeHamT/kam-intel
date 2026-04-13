/**
 * Puente temporal para la UI demo actual.
 *
 * No forma parte del motor oficial exportado por src/lib/agent/index.ts.
 * Solo adapta fixtures del agente a un digest simple legado mientras se migran
 * adapters de frontend fuera del motor.
 */
import { runAgent } from "./run-agent.ts";
import { agentFixtures } from "./fixtures/agent-fixtures.ts";

type AgentDigest = {
  headline: string;
  detected: string;
  whyItMatters: string;
  recommendation: string;
  nextStep: string;
  signals: Array<{
    id: string;
    title: string;
    detection: string;
    whyItMatters: string;
    recommendation: string;
    nextStep: string;
    tone: "critical" | "warning" | "stable" | "info";
  }>;
};

export function getMockAgentDigest(): AgentDigest {
  const result = runAgent(agentFixtures);
  const primary = result.restaurants[0];

  return {
    headline: "El agente detectó presión operativa concentrada en cuentas clave.",
    detected: primary.whyFlagged[0] ?? "Se detectaron señales operativas relevantes.",
    whyItMatters: primary.businessSummary,
    recommendation: primary.recommendedAction.label,
    nextStep: primary.nextBestStep.label,
    signals: primary.signals.map((signal) => ({
      id: signal.id,
      title: signal.label,
      detection: signal.evidence[0]?.note ?? signal.label,
      whyItMatters: primary.businessSummary,
      recommendation: primary.recommendedAction.label,
      nextStep: primary.nextBestStep.label,
      tone:
        signal.severityHint === "critical"
          ? "critical"
          : signal.severityHint === "at_risk"
            ? "warning"
            : signal.severityHint === "watchlist"
              ? "info"
              : "stable",
    })),
  };
}
