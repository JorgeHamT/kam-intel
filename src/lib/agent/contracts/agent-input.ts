export type MetricDirection = "higher_is_worse" | "lower_is_worse";

export type PeerGroupType = "city_vertical" | "vertical" | "city" | "global";

export type RiskStatus = "critical" | "at_risk" | "watchlist" | "stable";

export type SeverityLevel = "high" | "medium" | "low";

export type ValidationSeverity = "info" | "warning" | "error";

export type ValidationFlag = {
  code: string;
  severity: ValidationSeverity;
  field?: string;
  message: string;
};

export type DataQualityFlags = {
  hasIssues: boolean;
  degradedConfidence?: boolean;
  flags: ValidationFlag[];
  qualityScore?: number;
  note?: string;
};

export type BenchmarkMetricKey =
  | "delta_rating_recalc"
  | "var_ordenes_pct_recalc"
  | "gmv_proxy_7d"
  | "age_days_recalc"
  | "tasa_cancelacion_pct"
  | "tiempo_entrega_avg_min"
  | "quejas_7d"
  | "nps_score";

export type MetricDelta = {
  entityValue: number | null;
  peerMedian: number | null;
  deltaToMedian: number | null;
  direction: MetricDirection;
};

export type PeerGroupCandidate = {
  type: PeerGroupType;
  key: string;
  sampleSize: number;
  comparisons: Partial<Record<BenchmarkMetricKey, MetricDelta>>;
};

export type PeerBenchmarkContext = {
  candidates: PeerGroupCandidate[];
  originalRiskLabel?: string | null;
  validatedRiskLabel?: RiskStatus | null;
};

export type RestaurantMetricsInput = {
  restaurantId: string;
  restaurantName: string;
  kamId: string;
  kamName?: string;
  city: string;
  vertical: string;
  deltaRatingRecalc: number | null;
  varOrdenesPctRecalc: number | null;
  gmvProxy7d: number | null;
  ageDaysRecalc: number | null;
  tasaCancelacionPct: number | null;
  tiempoEntregaAvgMin: number | null;
  quejas7d: number | null;
  npsScore: number | null;
  benchmark?: PeerBenchmarkContext;
  quality?: DataQualityFlags;
  originalVsValidatedDiff?: Partial<Record<string, number | string | boolean | null>>;
  metadata?: Record<string, unknown>;
};

export type KamMetricsInput = {
  kamId: string;
  kamName?: string;
  city?: string;
  vertical?: string;
  portfolioName?: string;
  restaurantIds?: string[];
  metadata?: Record<string, unknown>;
};

export type AgentInput = {
  restaurants: RestaurantMetricsInput[];
  kams?: KamMetricsInput[];
  generatedAt?: string;
  metadata?: Record<string, unknown>;
};

