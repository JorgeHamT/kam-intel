export const CASE2_SOURCE_COLUMNS = [
  "restaurant_id",
  "nombre",
  "ciudad",
  "vertical",
  "rating_actual",
  "rating_prom_30d",
  "delta_rating",
  "tasa_cancelacion_pct",
  "tiempo_entrega_avg_min",
  "ordenes_7d",
  "ordenes_7d_anterior",
  "var_ordenes_pct",
  "quejas_7d",
  "nps_score",
  "valor_ticket_prom_mxn",
  "kam_asignado",
  "activo_desde",
  "semaforo_riesgo",
] as const;

export type Case2SourceColumn = (typeof CASE2_SOURCE_COLUMNS)[number];

export type Case2InternalField =
  | "restaurantId"
  | "restaurantName"
  | "city"
  | "vertical"
  | "currentRating"
  | "rating30dAvg"
  | "deltaRatingOriginal"
  | "cancellationRatePct"
  | "avgDeliveryTimeMin"
  | "orders7d"
  | "orders7dPrevious"
  | "ordersVariancePctOriginal"
  | "complaints7d"
  | "npsScore"
  | "avgTicketMxn"
  | "kamAssigned"
  | "activeSince"
  | "riskTrafficLightOriginal";

export type Case2RawRow = Record<Case2SourceColumn, string | number | null>;

export type RiskTrafficLightNormalized =
  | "stable"
  | "at_risk"
  | "critical"
  | "unknown";

export type PeerGroupType = "city_vertical" | "vertical" | "city" | "global";

export type PeerGroupReliability = "reliable" | "caution";

export type Case2QualityFlagCode =
  | "missing_required_value"
  | "invalid_number"
  | "invalid_integer"
  | "out_of_range"
  | "invalid_date"
  | "duplicate_restaurant_id"
  | "delta_rating_mismatch"
  | "var_ordenes_pct_mismatch"
  | "var_ordenes_pct_requires_fallback"
  | "risk_label_unrecognized"
  | "benchmark_fallback_applied"
  | "benchmark_group_small";

export type Case2FlagSeverity = "info" | "warning" | "error";

export type Case2FlagCategory =
  | "reconciliation"
  | "benchmark_coverage"
  | "temporal_date"
  | "validation_range";

export type Case2QualityFlag = {
  code: Case2QualityFlagCode;
  category: Case2FlagCategory;
  severity: Case2FlagSeverity;
  field?: Case2InternalField | Case2SourceColumn | "benchmark";
  message: string;
};

export type Case2MismatchCategory =
  | "rounding_or_precision"
  | "materially_different_formula"
  | "percentage_convention"
  | "outlier_original_derived"
  | "not_applicable";

export type Case2RowMetrics = {
  deltaRatingRecalc: number | null;
  varOrdenesPctRecalc: number | null;
  ageDaysRecalc: number | null;
  gmvProxy7d: number | null;
};

export type Case2BenchmarkMetricKey =
  | "currentRating"
  | "deltaRatingRecalc"
  | "cancellationRatePct"
  | "avgDeliveryTimeMin"
  | "orders7d"
  | "varOrdenesPctRecalc"
  | "complaints7d"
  | "npsScore"
  | "gmvProxy7d";

export type Case2BenchmarkMetricSummary = {
  count: number;
  mean: number | null;
  median: number | null;
  min: number | null;
  max: number | null;
};

export type Case2BenchmarkMetricComparison = {
  value: number | null;
  deltaToMedian: number | null;
  deltaToMean: number | null;
};

export type Case2BenchmarkResult = {
  peerGroupType: PeerGroupType;
  peerGroupKey: string;
  peerCount: number;
  reliability: PeerGroupReliability;
  fallbackDepth: number;
  metrics: Record<Case2BenchmarkMetricKey, Case2BenchmarkMetricSummary>;
  comparisons: Record<Case2BenchmarkMetricKey, Case2BenchmarkMetricComparison>;
  riskLabelDistribution: Record<RiskTrafficLightNormalized, number>;
};

export type Case2ParsedRow = {
  rowNumber: number;
  raw: Case2RawRow;
  restaurantId: string;
  restaurantName: string;
  city: string;
  vertical: string;
  currentRating: number | null;
  rating30dAvg: number | null;
  deltaRatingOriginal: number | null;
  cancellationRatePct: number | null;
  avgDeliveryTimeMin: number | null;
  orders7d: number | null;
  orders7dPrevious: number | null;
  ordersVariancePctOriginal: number | null;
  complaints7d: number | null;
  npsScore: number | null;
  avgTicketMxn: number | null;
  kamAssigned: string;
  activeSince: string | null;
  riskTrafficLightOriginal: string;
  riskTrafficLightNormalized: RiskTrafficLightNormalized;
  metrics: Case2RowMetrics;
  flags: Case2QualityFlag[];
  flagsByCategory: Record<Case2FlagCategory, Case2QualityFlag[]>;
  reconciliation: {
    tolerances: {
      deltaRating: number;
      varOrdenesPct: number;
    };
    deltaRating: {
      difference: number | null;
      status:
        | "exact_match"
        | "approximate_match"
        | "mismatch"
        | "not_applicable";
      category: Case2MismatchCategory;
    };
    varOrdenesPct: {
      difference: number | null;
      status:
        | "exact_match"
        | "approximate_match"
        | "mismatch"
        | "not_applicable";
      category: Case2MismatchCategory;
    };
  };
  benchmark: Case2BenchmarkResult | null;
};

export type Case2ValidationSummary = {
  totalRows: number;
  validRows: number;
  rowsWithFlags: number;
  rowsWithErrors: number;
  rowsUnchanged: number;
  rowsRecalculated: number;
  duplicateRestaurantIds: string[];
  referenceDate: string;
  referenceDateUsed: string;
  referenceDateSource: "option" | "max_active_since";
  referenceDateInterpretation: string;
  headerRowNumber: number;
  sourceSheetName: string;
  flagCounts: Record<Case2QualityFlagCode, number>;
  flagCountsByCategory: Record<Case2FlagCategory, number>;
  nullFieldCounts: Partial<Record<Case2InternalField, number>>;
  deltaRatingMismatchCount: number;
  varOrdenesPctMismatchCount: number;
  benchmarkReliableCount: number;
  benchmarkCautionCount: number;
  benchmarkFallbackCount: number;
  mismatchSummary: {
    deltaRating: Record<Case2MismatchCategory, number>;
    varOrdenesPct: Record<Case2MismatchCategory, number>;
  };
};

export type Case2AggregateBase = {
  rowCount: number;
  distinctRestaurants: number;
  sums: {
    orders7d: number;
    orders7dPrevious: number;
    complaints7d: number;
    gmvProxy7d: number;
  };
  averages: {
    currentRating: number | null;
    rating30dAvg: number | null;
    cancellationRatePct: number | null;
    avgDeliveryTimeMin: number | null;
    ordersVariancePctRecalc: number | null;
    npsScore: number | null;
    avgTicketMxn: number | null;
    ageDaysRecalc: number | null;
  };
  riskLabelDistribution: Record<RiskTrafficLightNormalized, number>;
  flagCounts: Record<Case2QualityFlagCode, number>;
};

export type Case2NamedAggregate = Case2AggregateBase & {
  key: string;
  name: string;
};

export type Case2Aggregates = {
  restaurants: Case2NamedAggregate[];
  kams: Case2NamedAggregate[];
  cities: Case2NamedAggregate[];
  verticals: Case2NamedAggregate[];
};

export type Case2DatasetResult = {
  metadata: {
    sheetName: string;
    worksheetTitle: string | null;
    headerRowNumber: number;
    totalSourceRows: number;
    referenceDateUsed: string;
    referenceDateSource: "option" | "max_active_since";
    referenceDateInterpretation: string;
  };
  summary: Case2ValidationSummary;
  rows: Case2ParsedRow[];
  aggregates: Case2Aggregates;
};

export type Case2BuildOptions = {
  workbookPath?: string;
  sheetName?: string;
  referenceDate?: string;
};

export type ParsedWorksheetRow = Record<string, string | number | null>;

export type ParsedWorksheet = {
  sheetName: string;
  title: string | null;
  headerRowNumber: number;
  rows: ParsedWorksheetRow[];
};
