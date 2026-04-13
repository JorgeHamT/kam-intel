import { agentConfidence, type AgentConfidenceConfig } from "./confidence.ts";
import { agentFeatureFlags, type AgentFeatureFlags } from "./feature-flags.ts";
import { agentThresholds, type AgentThresholds } from "./thresholds.ts";
import { agentWeights, type AgentWeights } from "./weights.ts";

export type AgentConfig = {
  thresholds: AgentThresholds;
  weights: AgentWeights;
  confidence: AgentConfidenceConfig;
  featureFlags: AgentFeatureFlags;
};

export const defaultAgentConfig: AgentConfig = {
  thresholds: agentThresholds,
  weights: agentWeights,
  confidence: agentConfidence,
  featureFlags: agentFeatureFlags,
};

export function createAgentConfig(
  overrides: Partial<AgentConfig> = {},
): AgentConfig {
  return {
    thresholds: { ...defaultAgentConfig.thresholds, ...overrides.thresholds },
    weights: { ...defaultAgentConfig.weights, ...overrides.weights },
    confidence: { ...defaultAgentConfig.confidence, ...overrides.confidence },
    featureFlags: {
      ...defaultAgentConfig.featureFlags,
      ...overrides.featureFlags,
    },
  } as AgentConfig;
}
