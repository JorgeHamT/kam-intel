import type {
  AgentValidationOverlay,
  AlertFeedItem,
  KamAssessment,
  RestaurantAssessment,
} from "../../../agent/contracts/agent-output.ts";
import type { Case2NamedAggregate, Case2ValidationSummary } from "../types.ts";

export type Case2DashboardViewModel = {
  provisional: {
    agentScoring: true;
    agentThresholds: true;
    agentRecommendations: true;
  };
  summary: {
    totalRestaurants: number;
    criticalCount: number;
    atRiskCount: number;
    watchlistCount: number;
    stableCount: number;
    topAlertCount: number;
    kamUnderPressureCount: number;
    averagePriorityScore: number;
  };
  topPriorityRestaurants: RestaurantAssessment[];
  kamsUnderPressure: Array<
    Pick<
      KamAssessment,
      "kamId" | "kamName" | "priorityScore" | "portfolioStatus"
    >
  >;
  cityRiskSummary: Array<{
    city: string;
    restaurantCount: number;
    criticalCount: number;
    atRiskCount: number;
    averagePriorityScore: number;
  }>;
  verticalRiskSummary: Array<{
    vertical: string;
    restaurantCount: number;
    criticalCount: number;
    atRiskCount: number;
    averagePriorityScore: number;
  }>;
  topSignalsSummary: Array<{
    signalType: string;
    count: number;
  }>;
  interventionSummary: Array<{
    recommendationCode: string;
    count: number;
  }>;
  validationSnapshot: {
    rowsWithFlags: number;
    rowsWithErrors: number;
    benchmarkFallbackCount: number;
  };
  benchmarkSnapshot: {
    reliablePeerCount: number;
    cautionPeerCount: number;
    fallbackPeerCount: number;
  };
};

export type Case2KamsListViewModel = {
  provisional: Case2DashboardViewModel["provisional"];
  summary: {
    totalKams: number;
    underPressureCount: number;
    criticalPortfolioCount: number;
    totalAlerts: number;
  };
  cards: Array<{
    kam: KamAssessment;
    aggregate?: Case2NamedAggregate;
    restaurants: RestaurantAssessment[];
  }>;
  ranking: Array<{
    kamId: string;
    kamName?: string;
    priorityScore: number;
    portfolioStatus: KamAssessment["portfolioStatus"];
    portfolioSize: number;
    averageRestaurantPriority: number;
    lowConfidenceCount: number;
  }>;
};

export type Case2KamDetailViewModel = {
  provisional: Case2DashboardViewModel["provisional"];
  kam: KamAssessment;
  aggregate?: Case2NamedAggregate;
  restaurants: RestaurantAssessment[];
  alerts: AlertFeedItem[];
  validationOverlays: AgentValidationOverlay[];
  portfolioBreakdown: KamAssessment["portfolioBreakdown"];
};

export type Case2RestaurantDetailViewModel = {
  provisional: Case2DashboardViewModel["provisional"];
  restaurant: RestaurantAssessment;
  kam?: KamAssessment;
  aggregate?: Case2NamedAggregate;
  alert?: AlertFeedItem;
  validationOverlay?: AgentValidationOverlay;
};

export type Case2AlertsFeedViewModel = {
  provisional: Case2DashboardViewModel["provisional"];
  summary: {
    totalAlerts: number;
    restaurantAlerts: number;
    kamAlerts: number;
    highSeverityAlerts: number;
  };
  alerts: Array<{
    alert: AlertFeedItem;
    restaurant?: RestaurantAssessment;
    kam?: KamAssessment;
    validationOverlay?: AgentValidationOverlay;
  }>;
};

export type Case2ValidationViewModel = {
  provisional: Case2DashboardViewModel["provisional"];
  summary: Case2ValidationSummary;
  overlays: AgentValidationOverlay[];
  impactedRestaurants: Array<{
    restaurantId: string;
    restaurantName?: string;
    confidence: number;
    validationFlagsCount: number;
    validationNote?: string;
  }>;
  benchmarkSnapshot: {
    reliablePeerCount: number;
    cautionPeerCount: number;
    fallbackPeerCount: number;
    mismatchSummary: Case2ValidationSummary["mismatchSummary"];
  };
};
