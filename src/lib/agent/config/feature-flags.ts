export const agentFeatureFlags = {
  enableBenchmarkConflict: true,
  enableConcentrationRisk: true,
  enableKamBriefing: true,
  enableValidationBadge: true,
  enableAggressiveActionsOnlyWithHighConfidence: true,
} as const;

export type AgentFeatureFlags = typeof agentFeatureFlags;
