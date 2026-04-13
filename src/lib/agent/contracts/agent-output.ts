import type {
  PeerGroupType,
  RiskStatus,
  SeverityLevel,
  ValidationFlag,
} from "./agent-input.ts";

export type SignalType =
  | "absolute_deterioration"
  | "relative_deterioration"
  | "accelerated_deterioration"
  | "compound_risk"
  | "business_impact"
  | "concentration_risk"
  | "data_quality_risk"
  | "benchmark_conflict";

export type SignalEvidence = {
  metric: string;
  value: number | string | boolean | null;
  reference?: number | string | null;
  note: string;
};

export type Signal = {
  id: string;
  type: SignalType;
  label: string;
  severityHint: RiskStatus;
  evidence: SignalEvidence[];
  confidenceEffect: number;
  affectsPriority: boolean;
  affectsRecommendation: boolean;
};

export type PriorityScore = {
  total: number;
  observedRisk: number;
  deteriorationMomentum: number;
  businessImpact: number;
  confidenceAdjustment: number;
};

export type ScoreContribution = {
  label: string;
  value: number;
  reason: string;
};

export type ScoreBreakdown = {
  observedRisk: ScoreContribution[];
  deteriorationMomentum: ScoreContribution[];
  businessImpact: ScoreContribution[];
  confidenceAdjustment: ScoreContribution[];
  normalized: PriorityScore;
};

export type ConfidenceOverlay = {
  entityId: string;
  confidence: number;
  confidenceReason: string[];
  degradedByValidation: boolean;
  relatedValidationFlags: ValidationFlag[];
};

export type BenchmarkComparison = {
  peerGroupUsed?: string;
  peerGroupType?: PeerGroupType;
  peerGroupConfidence?: number;
  sampleSize?: number;
  notableDeltas: Array<{
    metric: string;
    entityValue: number | null;
    peerMedian: number | null;
    deltaToMedian: number | null;
  }>;
  benchmarkConflict?: boolean;
};

export type RecommendationCode =
  | "priority_review"
  | "account_contact"
  | "intensive_follow_up"
  | "commercial_operational_audit"
  | "validate_data_before_action"
  | "portfolio_escalation"
  | "monitor_only";

export type Recommendation = {
  code: RecommendationCode;
  label: string;
  rationale: string;
};

export type NextBestActionCode =
  | "review_today"
  | "validate_before_intervention"
  | "prioritize_contact"
  | "intensive_monitoring"
  | "audit_vs_peers"
  | "escalate_portfolio"
  | "monitor_next_window";

export type NextBestAction = {
  code: NextBestActionCode;
  label: string;
};

export type RestaurantAssessment = {
  restaurantId: string;
  restaurantName?: string;
  kamId: string;
  status: RiskStatus;
  priorityScore: number;
  severity: SeverityLevel;
  confidence: number;
  peerGroupUsed?: string;
  peerGroupConfidence?: number;
  signals: Signal[];
  scoreBreakdown: ScoreBreakdown;
  benchmark?: BenchmarkComparison;
  whyFlagged: string[];
  recommendedAction: Recommendation;
  nextBestStep: NextBestAction;
  businessSummary: string;
  validationFlags?: ValidationFlag[];
  validationNote?: string;
};

export type RestaurantMiniAssessment = Pick<
  RestaurantAssessment,
  "restaurantId" | "status" | "priorityScore" | "severity" | "confidence" | "whyFlagged"
> & {
  restaurantName?: string;
};

export type KamAssessment = {
  kamId: string;
  kamName?: string;
  portfolioSize: number;
  portfolioStatus: "critical" | "under_pressure" | "stable";
  priorityScore: number;
  confidence: number;
  portfolioSummary: string;
  topSignals: Signal[];
  topRecommendations: Recommendation[];
  criticalRestaurants: RestaurantMiniAssessment[];
  portfolioBreakdown: PortfolioBreakdown;
  validationSummary?: string;
  kamBriefing?: string;
};

export type PortfolioBreakdown = {
  criticalCount: number;
  atRiskCount: number;
  watchlistCount: number;
  stableCount: number;
  averageRestaurantPriority: number;
  lowConfidenceCount: number;
  concentrationRiskCount: number;
};

export type CityRiskSummaryItem = {
  city: string;
  restaurantCount: number;
  criticalCount: number;
  atRiskCount: number;
  averagePriorityScore: number;
};

export type VerticalRiskSummaryItem = {
  vertical: string;
  restaurantCount: number;
  criticalCount: number;
  atRiskCount: number;
  averagePriorityScore: number;
};

export type TopSignalsSummaryItem = {
  signalType: SignalType;
  count: number;
};

export type InterventionSummaryItem = {
  recommendationCode: RecommendationCode;
  count: number;
};

export type PortfolioAssessment = {
  portfolioStatus: "critical" | "under_pressure" | "stable";
  totalRestaurants: number;
  totalKams: number;
  concentrationRiskCount: number;
  averagePriorityScore: number;
  highestPriorityRestaurants: RestaurantMiniAssessment[];
  kamsUnderPressure: Array<Pick<KamAssessment, "kamId" | "kamName" | "priorityScore" | "portfolioStatus">>;
};

export type DashboardAgentSummary = {
  totalRestaurants: number;
  criticalCount: number;
  atRiskCount: number;
  watchlistCount: number;
  stableCount: number;
  topAlertCount: number;
  kamUnderPressureCount: number;
  cityRiskSummary: CityRiskSummaryItem[];
  verticalRiskSummary: VerticalRiskSummaryItem[];
  topSignalsSummary: TopSignalsSummaryItem[];
  interventionSummary: InterventionSummaryItem[];
};

export type AlertFeedItem = {
  alertId: string;
  entityType: "restaurant" | "kam";
  entityId: string;
  title: string;
  priorityScore: number;
  severity: SeverityLevel;
  whyFlagged: string[];
  recommendedAction: Recommendation;
  nextBestStep: NextBestAction;
  confidence: number;
  createdFromSignals: string[];
};

export type AgentValidationOverlay = ConfidenceOverlay;

export type AgentResult = {
  restaurants: RestaurantAssessment[];
  kams: KamAssessment[];
  portfolio: PortfolioAssessment;
  summary: DashboardAgentSummary;
  alerts: AlertFeedItem[];
  validationOverlays: AgentValidationOverlay[];
};
