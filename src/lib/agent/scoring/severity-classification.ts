import type { AgentConfig } from "../config/index.ts";
import type { RiskStatus, SeverityLevel } from "../contracts/agent-input.ts";
import type { Signal } from "../contracts/agent-output.ts";

export function classifyStatus(
  priorityScore: number,
  signals: Signal[],
  config: AgentConfig,
): RiskStatus {
  if (signals.some((signal) => signal.severityHint === "critical")) {
    return "critical";
  }

  if (priorityScore >= config.thresholds.status.critical) {
    return "critical";
  }

  if (
    signals.some((signal) => signal.severityHint === "at_risk") ||
    priorityScore >= config.thresholds.status.atRisk
  ) {
    return "at_risk";
  }

  if (
    signals.some((signal) => signal.severityHint === "watchlist") ||
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
