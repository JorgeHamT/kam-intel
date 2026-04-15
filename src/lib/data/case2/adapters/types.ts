import type {
  AgentValidationOverlay,
  AlertFeedItem,
  KamAssessment,
  RestaurantAssessment,
} from "../../../agent/contracts/agent-output.ts";
import type { Case2OutputBundle } from "../output.ts";
import type { Case2NamedAggregate, Case2ValidationSummary } from "../types.ts";

export type Case2DashboardViewModel = {
  provisional: Case2OutputBundle["metadata"]["provisional"];
  semantics: {
    scenarioKind: Case2OutputBundle["metadata"]["projection"]["scenarioKind"];
    universeKind: Case2OutputBundle["metadata"]["projection"]["universeKind"];
    isGloballyComparable: Case2OutputBundle["metadata"]["projection"]["isGloballyComparable"];
    visibleStatusSource: Case2OutputBundle["metadata"]["projection"]["visibleStatusSource"];
    comparableKpiIds: Case2OutputBundle["metadata"]["projection"]["comparableKpiIds"];
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
  globalStatus: {
    portfolioStatus: Case2OutputBundle["global"]["portfolio"]["portfolioStatus"];
    totalKams: number;
    concentrationRiskCount: number;
    isComparable: boolean;
  };
  spotlight: {
    mode: "global_overview" | "focus_narrative";
    hasFocusSubset: boolean;
    restaurant?: RestaurantAssessment;
  };
  alerts: {
    activeKind: Case2OutputBundle["metadata"]["projection"]["activeAlertKind"];
    items: AlertFeedItem[];
    summary: {
      totalAlerts: number;
      restaurantAlerts: number;
      kamAlerts: number;
      highSeverityAlerts: number;
    };
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
    metrics: {
      revenueAtRiskMxn: number;
      healthScore: number;
      pressurePct: number;
      alertCount: number;
      visiblePriorityScore: number;
      portfolioMix: {
        criticalCount: number;
        atRiskCount: number;
        stableCount: number;
        totalCount: number;
      };
    };
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
  classifiedRestaurants: Array<{
    restaurant: RestaurantAssessment;
    displayStatus: "critical" | "at_risk" | "stable";
    originalRiskLabel?: string | null;
  }>;
  alerts: AlertFeedItem[];
  validationOverlays: AgentValidationOverlay[];
  portfolioBreakdown: KamAssessment["portfolioBreakdown"];
  displayBreakdown: {
    criticalCount: number;
    atRiskCount: number;
    stableCount: number;
    totalCount: number;
    revenueAtRiskMxn: number;
    healthScore: number;
    opsPressurePct: number;
  };
};

export type Case2RestaurantDetailViewModel = {
  provisional: Case2DashboardViewModel["provisional"];
  restaurant: RestaurantAssessment;
  kam?: KamAssessment;
  aggregate?: Case2NamedAggregate;
  alert?: AlertFeedItem;
  validationOverlay?: AgentValidationOverlay;
  location: {
    city: string;
    vertical: string;
  };
};

export type Case2RestaurantsListViewModel = {
  provisional: Case2DashboardViewModel["provisional"];
  semantics: Case2DashboardViewModel["semantics"];
  summary: {
    totalRestaurants: number;
    criticalCount: number;
    atRiskCount: number;
    watchlistCount: number;
    stableCount: number;
  };
  restaurants: Array<{
    restaurant: RestaurantAssessment;
    kam?: KamAssessment;
    aggregate?: Case2NamedAggregate;
    alert?: AlertFeedItem;
    validationOverlay?: AgentValidationOverlay;
    location: {
      city: string;
      vertical: string;
    };
    metrics: {
      gmvProxy7d: number;
      currentRating: number | null;
      cancellationRatePct: number | null;
      avgDeliveryTimeMin: number | null;
    };
  }>;
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
