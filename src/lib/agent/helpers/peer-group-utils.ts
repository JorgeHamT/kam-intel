import type { PeerBenchmarkContext, PeerGroupCandidate, PeerGroupType } from "../contracts/agent-input.ts";
import type { AgentConfig } from "../config/index.ts";

const ORDER: PeerGroupType[] = ["city_vertical", "vertical", "city", "global"];

export type SelectedPeerGroup = {
  candidate?: PeerGroupCandidate;
  confidence: number;
  caution: boolean;
};

export function selectPeerGroup(
  benchmark: PeerBenchmarkContext | undefined,
  config: AgentConfig,
): SelectedPeerGroup {
  if (!benchmark?.candidates.length) {
    return {
      candidate: undefined,
      confidence: config.confidence.peerGroupRules.fallbackScore,
      caution: true,
    };
  }

  const sorted = [...benchmark.candidates].sort(
    (left, right) => ORDER.indexOf(left.type) - ORDER.indexOf(right.type),
  );
  const reliable = sorted.find(
    (candidate) => candidate.sampleSize >= config.confidence.peerGroupRules.reliableMinimum,
  );

  if (reliable) {
    return {
      candidate: reliable,
      confidence: config.confidence.peerGroupRules.reliableScore,
      caution: false,
    };
  }

  const cautious = sorted.find(
    (candidate) => candidate.sampleSize >= config.confidence.peerGroupRules.cautionMinimum,
  );

  if (cautious) {
    return {
      candidate: cautious,
      confidence: config.confidence.peerGroupRules.cautionScore,
      caution: true,
    };
  }

  const fallback = sorted[sorted.length - 1];
  return {
    candidate: fallback,
    confidence: config.confidence.peerGroupRules.fallbackScore,
    caution: true,
  };
}

