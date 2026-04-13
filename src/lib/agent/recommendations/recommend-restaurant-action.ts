import type { AgentConfig } from "../config/index.ts";
import type { RiskStatus } from "../contracts/agent-input.ts";
import type {
  NextBestAction,
  Recommendation,
  Signal,
} from "../contracts/agent-output.ts";

function buildRecommendation(
  code: Recommendation["code"],
  label: string,
  rationale: string,
): Recommendation {
  return { code, label, rationale };
}

function buildNextStep(
  code: NextBestAction["code"],
  label: string,
): NextBestAction {
  return { code, label };
}

export function recommendRestaurantAction(params: {
  status: RiskStatus;
  confidence: number;
  signals: Signal[];
  config: AgentConfig;
}): { recommendedAction: Recommendation; nextBestStep: NextBestAction } {
  const { status, confidence, signals, config } = params;
  const hasDataRisk = signals.some(
    (signal) => signal.type === "data_quality_risk",
  );
  const hasImpact = signals.some((signal) => signal.type === "business_impact");
  const hasCompound = signals.some((signal) => signal.type === "compound_risk");

  if (
    hasDataRisk &&
    confidence <= config.thresholds.signals.confidence.degradedConfidence
  ) {
    return {
      recommendedAction: buildRecommendation(
        "validate_data_before_action",
        "Validar datos antes de intervenir",
        "La evidencia operativa existe, pero la calidad del dato no soporta una intervención fuerte todavía.",
      ),
      nextBestStep: buildNextStep(
        "validate_before_intervention",
        "Validar datos base antes de intervenir",
      ),
    };
  }

  if (
    status === "critical" &&
    hasImpact &&
    confidence >= config.thresholds.signals.confidence.degradedConfidence
  ) {
    return {
      recommendedAction: buildRecommendation(
        "commercial_operational_audit",
        "Auditoría comercial-operativa",
        "La cuenta combina deterioro y peso de negocio, por lo que conviene revisar operación y plan comercial en conjunto.",
      ),
      nextBestStep: buildNextStep(
        "audit_vs_peers",
        "Auditar desempeño contra peers",
      ),
    };
  }

  if (status === "critical" || (status === "at_risk" && hasCompound)) {
    return {
      recommendedAction: buildRecommendation(
        "intensive_follow_up",
        "Seguimiento intensivo",
        "La presión operativa amerita seguimiento cercano hasta ver estabilización.",
      ),
      nextBestStep: buildNextStep(
        "intensive_monitoring",
        "Incluir esta cuenta en seguimiento intensivo",
      ),
    };
  }

  if (status === "at_risk") {
    return {
      recommendedAction: buildRecommendation(
        "account_contact",
        "Contacto prioritario con la cuenta",
        "Hay señales accionables suficientes para abrir contacto operativo/comercial con prudencia.",
      ),
      nextBestStep: buildNextStep(
        "prioritize_contact",
        "Priorizar contacto con esta cuenta",
      ),
    };
  }

  if (status === "watchlist") {
    return {
      recommendedAction: buildRecommendation(
        "priority_review",
        "Revisión prioritaria",
        "Hay señales tempranas, pero todavía no justifican una escalada completa.",
      ),
      nextBestStep: buildNextStep("review_today", "Revisar esta cuenta hoy"),
    };
  }

  return {
    recommendedAction: buildRecommendation(
      "monitor_only",
      "Monitoreo",
      "No hay evidencia suficiente para una intervención inmediata en esta corrida.",
    ),
    nextBestStep: buildNextStep(
      "monitor_next_window",
      "Monitorear en la siguiente ventana",
    ),
  };
}
