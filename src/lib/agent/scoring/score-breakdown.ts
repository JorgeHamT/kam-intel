import type { ScoreContribution, ScoreBreakdown } from "../contracts/agent-output.ts";

export function createEmptyBreakdown(): ScoreBreakdown {
  const emptySection = (): ScoreContribution[] => [];

  return {
    observedRisk: emptySection(),
    deteriorationMomentum: emptySection(),
    businessImpact: emptySection(),
    confidenceAdjustment: emptySection(),
    normalized: {
      total: 0,
      observedRisk: 0,
      deteriorationMomentum: 0,
      businessImpact: 0,
      confidenceAdjustment: 0,
    },
  };
}

