import type {
  AgentValidationOverlay,
  AlertFeedItem,
  DashboardAgentSummary,
  KamAssessment,
  PortfolioAssessment,
  RestaurantAssessment,
} from "../../agent/contracts/agent-output.ts";
import {
  CANONICAL_KPI_CONTRACT,
  type CanonicalKpiContract,
  getScenarioProjectionMetadata,
  type ScenarioProjectionMetadata,
} from "../../demo/kpi-contract.ts";

import {
  buildCase2AgentBundle,
  type Case2AgentBundleOptions,
} from "./index.ts";
import type {
  Case2Aggregates,
  Case2DatasetResult,
  Case2ValidationSummary,
} from "./types.ts";

export type Case2OutputContractVersion = "case2-output-v1";

export type Case2OutputMetadata = {
  contractVersion: Case2OutputContractVersion;
  generatedAt?: string;
  source: Case2DatasetResult["metadata"];
  provisional: {
    agentScoring: true;
    agentThresholds: true;
    agentRecommendations: true;
  };
  semantics: CanonicalKpiContract;
  projection: ScenarioProjectionMetadata;
};

export type Case2OutputValidation = {
  summary: Case2ValidationSummary;
  overlays: AgentValidationOverlay[];
};

export type Case2OutputBenchmarkSummary = {
  reliablePeerCount: number;
  cautionPeerCount: number;
  fallbackPeerCount: number;
  mismatchSummary: Case2ValidationSummary["mismatchSummary"];
  riskLabelDistribution: Case2Aggregates["cities"][number]["riskLabelDistribution"];
};

export type Case2OutputGlobalSummary = {
  portfolio: PortfolioAssessment;
  dashboard: DashboardAgentSummary;
};

export type Case2OutputBundle = {
  metadata: Case2OutputMetadata;
  dataset: {
    metadata: Case2DatasetResult["metadata"];
    aggregates: Case2Aggregates;
    restaurantMetadata: Record<
      string,
      {
        city: string;
        vertical: string;
      }
    >;
  };
  restaurants: RestaurantAssessment[];
  kams: KamAssessment[];
  alerts: AlertFeedItem[];
  validation: Case2OutputValidation;
  benchmark: Case2OutputBenchmarkSummary;
  global: Case2OutputGlobalSummary;
};

function buildGlobalRiskDistribution(
  dataset: Case2DatasetResult,
): Case2OutputBenchmarkSummary["riskLabelDistribution"] {
  return dataset.rows.reduce(
    (acc, row) => {
      acc[row.riskTrafficLightNormalized] += 1;
      return acc;
    },
    {
      stable: 0,
      at_risk: 0,
      critical: 0,
      unknown: 0,
    },
  );
}

export function buildCase2OutputBundle(
  options: Case2AgentBundleOptions = {},
): Case2OutputBundle {
  const bundle = buildCase2AgentBundle(options);
  const restaurantMetadata = Object.fromEntries(
    bundle.dataset.rows.map((row) => [
      row.restaurantId,
      {
        city: row.city,
        vertical: row.vertical,
      },
    ]),
  );

  return {
    metadata: {
      contractVersion: "case2-output-v1",
      generatedAt: bundle.input.generatedAt,
      source: bundle.dataset.metadata,
      provisional: {
        agentScoring: true,
        agentThresholds: true,
        agentRecommendations: true,
      },
      semantics: CANONICAL_KPI_CONTRACT,
      projection: getScenarioProjectionMetadata("agent-evaluation"),
    },
    dataset: {
      metadata: bundle.dataset.metadata,
      aggregates: bundle.dataset.aggregates,
      restaurantMetadata,
    },
    restaurants: bundle.result.restaurants,
    kams: bundle.result.kams,
    alerts: bundle.result.alerts,
    validation: {
      summary: bundle.dataset.summary,
      overlays: bundle.result.validationOverlays,
    },
    benchmark: {
      reliablePeerCount: bundle.dataset.summary.benchmarkReliableCount,
      cautionPeerCount: bundle.dataset.summary.benchmarkCautionCount,
      fallbackPeerCount: bundle.dataset.summary.benchmarkFallbackCount,
      mismatchSummary: bundle.dataset.summary.mismatchSummary,
      riskLabelDistribution: buildGlobalRiskDistribution(bundle.dataset),
    },
    global: {
      portfolio: bundle.result.portfolio,
      dashboard: bundle.result.summary,
    },
  };
}
