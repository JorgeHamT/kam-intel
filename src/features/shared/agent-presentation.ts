import type {
  RiskStatus,
  SeverityLevel,
  ValidationSeverity,
} from "@/lib/agent/contracts/agent-input";
import type { HealthTone } from "@/types/domain";

export function getRiskStatusTone(status: RiskStatus): HealthTone {
  switch (status) {
    case "critical":
      return "critical";
    case "at_risk":
      return "warning";
    case "watchlist":
      return "info";
    case "stable":
    default:
      return "stable";
  }
}

export function getRiskStatusLabel(status: RiskStatus): string {
  switch (status) {
    case "critical":
      return "Crítico";
    case "at_risk":
      return "En riesgo";
    case "watchlist":
      return "Watchlist";
    case "stable":
    default:
      return "Estable";
  }
}

export function getSeverityTone(severity: SeverityLevel): HealthTone {
  switch (severity) {
    case "high":
      return "critical";
    case "medium":
      return "warning";
    case "low":
    default:
      return "info";
  }
}

export function getSeverityLabel(severity: SeverityLevel): string {
  switch (severity) {
    case "high":
      return "Alta";
    case "medium":
      return "Media";
    case "low":
    default:
      return "Baja";
  }
}

export function getValidationSeverityTone(
  severity: ValidationSeverity,
): HealthTone {
  switch (severity) {
    case "error":
      return "critical";
    case "warning":
      return "warning";
    case "info":
    default:
      return "info";
  }
}
