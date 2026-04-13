// Provisional scoring weights for v1. The score composition is stable; these coefficients are not final.
export const agentWeights = {
  score: {
    observedRisk: 0.4,
    deteriorationMomentum: 0.25,
    businessImpact: 0.25,
    confidenceAdjustment: 0.1,
  },
  signalImpact: {
    critical: 18,
    at_risk: 11,
    watchlist: 6,
    stable: 0,
  },
  benchmark: {
    strongNegative: 8,
    moderateNegative: 4,
  },
  dataQuality: {
    warningPenalty: 4,
    errorPenalty: 8,
  },
  kam: {
    criticalRestaurant: 12,
    atRiskRestaurant: 7,
    watchlistRestaurant: 3,
    concentrationRisk: 10,
    lowConfidencePenalty: 8,
  },
} as const;

export type AgentWeights = typeof agentWeights;
