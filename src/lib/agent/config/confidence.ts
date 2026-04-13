// Provisional confidence penalties and peer-group rules for v1. Confidence overlay behavior is stable; values may still move.
export const agentConfidence = {
  base: 1,
  minimum: 0.2,
  penalties: {
    validationWarning: 0.08,
    validationError: 0.16,
    lowQualityFlag: 0.12,
    benchmarkCaution: 0.1,
    benchmarkMissing: 0.14,
    benchmarkConflict: 0.1,
  },
  peerGroupRules: {
    reliableMinimum: 8,
    cautionMinimum: 5,
    reliableScore: 1,
    cautionScore: 0.72,
    fallbackScore: 0.55,
  },
} as const;

export type AgentConfidenceConfig = typeof agentConfidence;
