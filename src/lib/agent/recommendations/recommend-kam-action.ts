import type {
  KamAssessment,
  NextBestAction,
  Recommendation,
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

export function recommendKamAction(assessment: KamAssessment): {
  recommendation: Recommendation;
  nextStep: NextBestAction;
} {
  if (assessment.portfolioStatus === "critical") {
    return {
      recommendation: buildRecommendation(
        "portfolio_escalation",
        "Escalar revisión del portfolio",
        "La presión está concentrada en varias cuentas relevantes del portfolio.",
      ),
      nextStep: buildNextStep(
        "escalate_portfolio",
        "Escalar revisión del portfolio",
      ),
    };
  }

  if (assessment.portfolioStatus === "under_pressure") {
    return {
      recommendation: buildRecommendation(
        "priority_review",
        "Priorizar revisión del portfolio",
        "El portfolio muestra presión moderada y conviene alinear foco semanal del KAM.",
      ),
      nextStep: buildNextStep("review_today", "Revisar esta cuenta hoy"),
    };
  }

  return {
    recommendation: buildRecommendation(
      "monitor_only",
      "Monitoreo del portfolio",
      "No hay presión sistémica fuerte en el portfolio del KAM.",
    ),
    nextStep: buildNextStep(
      "monitor_next_window",
      "Monitorear en la siguiente ventana",
    ),
  };
}
