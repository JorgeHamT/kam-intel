import type {
  Signal,
  SignalEvidence,
  SignalType,
} from "../contracts/agent-output.ts";
import type { RiskStatus } from "../contracts/agent-input.ts";

export function createSignal(params: {
  id: string;
  type: SignalType;
  label: string;
  severityHint: RiskStatus;
  evidence: SignalEvidence[];
  confidenceEffect?: number;
  affectsPriority?: boolean;
  affectsRecommendation?: boolean;
}): Signal {
  return {
    id: params.id,
    type: params.type,
    label: params.label,
    severityHint: params.severityHint,
    evidence: params.evidence,
    confidenceEffect: params.confidenceEffect ?? 0,
    affectsPriority: params.affectsPriority ?? true,
    affectsRecommendation: params.affectsRecommendation ?? true,
  };
}
