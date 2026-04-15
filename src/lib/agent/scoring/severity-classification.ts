import type { AgentConfig } from "../config/index.ts";
import type { RiskStatus, SeverityLevel } from "../contracts/agent-input.ts";
import type { Signal } from "../contracts/agent-output.ts";

export function classifyStatus(
  priorityScore: number,
  signals: Signal[],
  config: AgentConfig,
): RiskStatus {
  const criticalSignalCount = signals.filter(
    (signal) => signal.severityHint === "critical",
  ).length;
  const hasAtRiskSignal = signals.some(
    (signal) =>
      signal.severityHint === "critical" || signal.severityHint === "at_risk",
  );
  const hasWatchlistSignal = signals.some(
    (signal) =>
      signal.severityHint === "critical" ||
      signal.severityHint === "at_risk" ||
      signal.severityHint === "watchlist",
  );

  if (priorityScore >= config.thresholds.status.critical) {
    return "critical";
  }

  if (
    criticalSignalCount >= 2 ||
    (criticalSignalCount === 1 &&
      priorityScore >= config.thresholds.status.atRisk)
  ) {
    return "critical";
  }

  if (
    hasAtRiskSignal ||
    priorityScore >= config.thresholds.status.atRisk
  ) {
    return "at_risk";
  }

  if (
    hasWatchlistSignal ||
    priorityScore >= config.thresholds.status.watchlist
  ) {
    return "watchlist";
  }

  return "stable";
}

export function classifySeverity(
  priorityScore: number,
  config: AgentConfig,
): SeverityLevel {
  if (priorityScore >= config.thresholds.severity.high) {
    return "high";
  }

  if (priorityScore >= config.thresholds.severity.medium) {
    return "medium";
  }

  return "low";
}
