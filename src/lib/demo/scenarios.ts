import type {
  AlertFeedItem,
  CityRiskSummaryItem,
  KamAssessment,
  RestaurantAssessment,
  RecommendationCode,
  RestaurantMiniAssessment,
  SignalType,
  VerticalRiskSummaryItem,
} from "@/lib/agent/contracts/agent-output";
import type { RiskStatus, SeverityLevel } from "@/lib/agent/contracts/agent-input";
import { aggregateKamAssessment } from "@/lib/agent/aggregation/aggregate-kam-assessment";
import { buildAlertFeed } from "@/lib/agent/aggregation/build-alert-feed";
import { createAgentConfig } from "@/lib/agent/config";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import type { ScenarioId } from "@/types/domain";

import type { PresentationChannel, PresentationSnapshot } from "./contracts";
import { getScenarioProjectionMetadata } from "./kpi-contract";
import { getCanonicalWalkthroughTargets } from "./ranking";
import {
  FALLBACK_ROUTE,
  getScenarioOption,
  OFFICIAL_ENTRY_ROUTE,
} from "./options";

export const DEFAULT_SCENARIO_ID: ScenarioId = "dataset-original";
export const DEMO_REFRESH_LABEL = "15 dic 2027 · 09:00";

const PRESENTATION_CHANNEL: PresentationChannel = {
  id: "ops-email",
  kind: "email",
  label: "Correo operativo",
  destination: "ops-demo@kam-intelligence.local",
  status: "Configurado",
  description:
    "Canal complementario para enviar el resumen priorizado de alertas sin volverlo dependencia central del producto.",
  href: "mailto:ops-demo@kam-intelligence.local?subject=Rappi%20KAM%20Intelligence%20-%20Resumen%20operativo",
};

type ScenarioSelection = {
  restaurants: RestaurantAssessment[];
  narrative: PresentationSnapshot["narrative"];
};

function sortRestaurantsByPriority(restaurants: RestaurantAssessment[]) {
  return [...restaurants].sort(
    (left, right) => right.priorityScore - left.priorityScore,
  );
}

function sortKamsByPriority(kams: KamAssessment[]) {
  return [...kams].sort(
    (left, right) => right.priorityScore - left.priorityScore,
  );
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function roundPriorityScore(value: number) {
  return Math.round(Math.max(0, Math.min(100, value)) * 100) / 100;
}

function severityFromStatus(status: RiskStatus): SeverityLevel {
  if (status === "critical") {
    return "high";
  }

  if (status === "at_risk") {
    return "medium";
  }

  return "low";
}

function normalizeOriginalRiskLabel(
  originalRiskLabel?: string | null,
): RiskStatus | null {
  const normalized = (originalRiskLabel ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

  if (normalized.includes("critico")) {
    return "critical";
  }

  if (normalized.includes("riesgo")) {
    return "at_risk";
  }

  if (normalized.includes("estable")) {
    return "stable";
  }

  return null;
}

function projectDatasetOriginalPriority(
  status: RiskStatus,
  currentPriorityScore: number,
) {
  if (status === "critical") {
    return roundPriorityScore(Math.max(78, currentPriorityScore));
  }

  if (status === "at_risk") {
    return roundPriorityScore(Math.max(45, Math.min(74, currentPriorityScore)));
  }

  if (status === "watchlist") {
    return roundPriorityScore(Math.max(25, Math.min(49, currentPriorityScore)));
  }

  return roundPriorityScore(Math.min(24, currentPriorityScore * 0.35));
}

function projectDatasetOriginalRestaurants(
  restaurants: RestaurantAssessment[],
) {
  return restaurants.map((restaurant) => {
    const benchmarkStatus =
      normalizeOriginalRiskLabel(restaurant.benchmark?.originalRiskLabel) ??
      restaurant.status;

    return {
      ...restaurant,
      status: benchmarkStatus,
      priorityScore: projectDatasetOriginalPriority(
        benchmarkStatus,
        restaurant.priorityScore,
      ),
      severity: severityFromStatus(benchmarkStatus),
    };
  });
}

function projectCrisisRestaurants(restaurants: RestaurantAssessment[]) {
  return restaurants.map((restaurant) => {
    let status = restaurant.status;
    let priorityScore = restaurant.priorityScore;

    if (restaurant.status === "at_risk") {
      status = "critical";
    } else if (restaurant.status === "watchlist") {
      status = "at_risk";
    }

    if (status === "critical") {
      priorityScore = roundPriorityScore(priorityScore * 1.18 + 6);
    } else if (status === "at_risk") {
      priorityScore = roundPriorityScore(priorityScore * 1.1 + 4);
    } else if (status === "watchlist") {
      priorityScore = roundPriorityScore(priorityScore * 1.05 + 2);
    }

    return {
      ...restaurant,
      status,
      priorityScore,
      severity: severityFromStatus(status),
    };
  });
}

function projectScenarioRestaurants(
  scenario: ScenarioId,
  restaurants: RestaurantAssessment[],
) {
  if (scenario === "dataset-original") {
    return projectDatasetOriginalRestaurants(restaurants);
  }

  if (scenario === "crisis") {
    return projectCrisisRestaurants(restaurants);
  }

  return restaurants;
}

function buildCityRiskSummary(
  restaurants: RestaurantAssessment[],
  restaurantMetadata: Case2OutputBundle["dataset"]["restaurantMetadata"],
): CityRiskSummaryItem[] {
  const groups = new Map<string, RestaurantAssessment[]>();

  for (const restaurant of restaurants) {
    const city = restaurantMetadata[restaurant.restaurantId]?.city ?? "Sin dato";
    const bucket = groups.get(city) ?? [];
    bucket.push(restaurant);
    groups.set(city, bucket);
  }

  return [...groups.entries()]
    .map(([city, items]) => ({
      city,
      restaurantCount: items.length,
      criticalCount: items.filter((item) => item.status === "critical").length,
      atRiskCount: items.filter((item) => item.status === "at_risk").length,
      averagePriorityScore: average(items.map((item) => item.priorityScore)),
    }))
    .sort((left, right) => right.averagePriorityScore - left.averagePriorityScore);
}

function buildVerticalRiskSummary(
  restaurants: RestaurantAssessment[],
  restaurantMetadata: Case2OutputBundle["dataset"]["restaurantMetadata"],
): VerticalRiskSummaryItem[] {
  const groups = new Map<string, RestaurantAssessment[]>();

  for (const restaurant of restaurants) {
    const vertical =
      restaurantMetadata[restaurant.restaurantId]?.vertical ?? "Sin dato";
    const bucket = groups.get(vertical) ?? [];
    bucket.push(restaurant);
    groups.set(vertical, bucket);
  }

  return [...groups.entries()]
    .map(([vertical, items]) => ({
      vertical,
      restaurantCount: items.length,
      criticalCount: items.filter((item) => item.status === "critical").length,
      atRiskCount: items.filter((item) => item.status === "at_risk").length,
      averagePriorityScore: average(items.map((item) => item.priorityScore)),
    }))
    .sort((left, right) => right.averagePriorityScore - left.averagePriorityScore);
}

function buildDerivedDashboardSummary(
  restaurants: RestaurantAssessment[],
  kams: KamAssessment[],
  baseOutput: Case2OutputBundle,
) {
  const signalCounts = new Map<SignalType, number>();
  const recommendationCounts = new Map<RecommendationCode, number>();

  for (const restaurant of restaurants) {
    for (const signal of restaurant.signals) {
      signalCounts.set(signal.type, (signalCounts.get(signal.type) ?? 0) + 1);
    }

    recommendationCounts.set(
      restaurant.recommendedAction.code,
      (recommendationCounts.get(restaurant.recommendedAction.code) ?? 0) + 1,
    );
  }

  return {
    totalRestaurants: restaurants.length,
    criticalCount: restaurants.filter(
      (restaurant) => restaurant.status === "critical",
    ).length,
    atRiskCount: restaurants.filter(
      (restaurant) => restaurant.status === "at_risk",
    ).length,
    watchlistCount: restaurants.filter(
      (restaurant) => restaurant.status === "watchlist",
    ).length,
    stableCount: restaurants.filter(
      (restaurant) => restaurant.status === "stable",
    ).length,
    topAlertCount: restaurants.filter(
      (restaurant) => restaurant.severity === "high",
    ).length,
    kamUnderPressureCount: kams.filter(
      (kam) => kam.portfolioStatus !== "stable",
    ).length,
    cityRiskSummary: buildCityRiskSummary(
      restaurants,
      baseOutput.dataset.restaurantMetadata,
    ),
    verticalRiskSummary: buildVerticalRiskSummary(
      restaurants,
      baseOutput.dataset.restaurantMetadata,
    ),
    topSignalsSummary: [...signalCounts.entries()]
      .map(([signalType, count]) => ({ signalType, count }))
      .sort((left, right) => right.count - left.count),
    interventionSummary: [...recommendationCounts.entries()]
      .map(([recommendationCode, count]) => ({ recommendationCode, count }))
      .sort((left, right) => right.count - left.count),
  };
}

function createMiniAssessment(
  restaurant: RestaurantAssessment,
): RestaurantMiniAssessment {
  return {
    restaurantId: restaurant.restaurantId,
    restaurantName: restaurant.restaurantName,
    status: restaurant.status,
    priorityScore: restaurant.priorityScore,
    severity: restaurant.severity,
    confidence: restaurant.confidence,
    whyFlagged: restaurant.whyFlagged,
  };
}

function buildDerivedPortfolio(
  restaurants: RestaurantAssessment[],
  kams: KamAssessment[],
) {
  const averagePriorityScore =
    restaurants.length > 0
      ? restaurants.reduce(
          (sum, restaurant) => sum + restaurant.priorityScore,
          0,
        ) / restaurants.length
      : 0;
  const concentrationRiskCount = kams.reduce(
    (sum, kam) => sum + kam.portfolioBreakdown.concentrationRiskCount,
    0,
  );
  const activeKams = kams.filter((kam) => kam.portfolioStatus !== "stable");
  const portfolioStatus: "critical" | "under_pressure" | "stable" =
    restaurants.some((restaurant) => restaurant.status === "critical")
      ? "critical"
      : restaurants.some((restaurant) => restaurant.status === "at_risk")
        ? "under_pressure"
        : "stable";

  return {
    portfolioStatus,
    totalRestaurants: restaurants.length,
    totalKams: kams.length,
    concentrationRiskCount,
    averagePriorityScore,
    highestPriorityRestaurants: sortRestaurantsByPriority(restaurants)
      .slice(0, 5)
      .map(createMiniAssessment),
    kamsUnderPressure: activeKams.map((kam) => ({
      kamId: kam.kamId,
      kamName: kam.kamName,
      priorityScore: kam.priorityScore,
      portfolioStatus: kam.portfolioStatus,
    })),
  };
}

function buildDerivedKamAssessments(
  restaurants: RestaurantAssessment[],
  baseOutput: Case2OutputBundle,
) {
  const config = createAgentConfig();
  const kamMetadata = new Map(
    baseOutput.kams.map((kam) => [
      kam.kamId,
      {
        kamId: kam.kamId,
        kamName: kam.kamName ?? kam.kamId,
        restaurantIds: [],
      },
    ]),
  );
  const restaurantsByKam = new Map<string, RestaurantAssessment[]>();

  for (const restaurant of restaurants) {
    const bucket = restaurantsByKam.get(restaurant.kamId) ?? [];
    bucket.push(restaurant);
    restaurantsByKam.set(restaurant.kamId, bucket);
  }

  return sortKamsByPriority(
    [...restaurantsByKam.entries()].map(([kamId, items]) =>
      aggregateKamAssessment(kamMetadata.get(kamId), items, config),
    ),
  );
}

function buildScenarioAlerts(params: {
  restaurants: RestaurantAssessment[];
  kams: KamAssessment[];
}) {
  const config = createAgentConfig();

  return buildAlertFeed({
    restaurants: params.restaurants,
    kams: params.kams,
    topRestaurantCount: config.thresholds.alerts.topRestaurantCount,
    topKamCount: config.thresholds.alerts.topKamCount,
  });
}

function buildScenarioBundle(
  baseOutput: Case2OutputBundle,
  selection: ScenarioSelection,
  scenario: ScenarioId,
): Case2OutputBundle {
  const scenarioRestaurants = projectScenarioRestaurants(
    scenario,
    selection.restaurants,
  );
  const kams = buildDerivedKamAssessments(scenarioRestaurants, baseOutput);
  const dashboard = buildDerivedDashboardSummary(
    scenarioRestaurants,
    kams,
    baseOutput,
  );
  const portfolio = buildDerivedPortfolio(scenarioRestaurants, kams);
  const alerts = buildScenarioAlerts({
    restaurants: scenarioRestaurants,
    kams,
  });

  return {
    ...baseOutput,
    metadata: {
      ...baseOutput.metadata,
      projection: getScenarioProjectionMetadata(scenario),
    },
    restaurants: scenarioRestaurants,
    kams,
    alerts,
    validation: {
      ...baseOutput.validation,
      overlays: baseOutput.validation.overlays,
    },
    global: {
      portfolio,
      dashboard,
    },
  };
}

function buildSnapshotAlertQueues(
  semantics: PresentationSnapshot["semantics"],
  activeAlerts: AlertFeedItem[],
): PresentationSnapshot["alerts"] {
  return {
    active: activeAlerts,
    activeKind: semantics.activeAlertKind,
    globalComparableAlerts: activeAlerts,
    focalAlerts: [],
  };
}

function selectDatasetOriginal(baseOutput: Case2OutputBundle): ScenarioSelection {
  const restaurants = [...baseOutput.restaurants].sort((left, right) => {
    const leftStatus =
      normalizeOriginalRiskLabel(left.benchmark?.originalRiskLabel) ?? left.status;
    const rightStatus =
      normalizeOriginalRiskLabel(right.benchmark?.originalRiskLabel) ?? right.status;
    const weight = {
      critical: 3,
      at_risk: 2,
      watchlist: 1,
      stable: 0,
    } satisfies Record<RiskStatus, number>;

    return (
      weight[rightStatus] - weight[leftStatus] ||
      right.priorityScore - left.priorityScore
    );
  });

  return {
    restaurants,
    narrative: {
      title: "Dataset original",
      description:
        "Muestra la lectura más cercana al semáforo con el que venía clasificado el archivo original.",
      nextStep:
        "Usar esta vista como baseline del Excel antes de pasar a la reevaluación del agente.",
    },
  };
}

function selectAgentEvaluation(baseOutput: Case2OutputBundle): ScenarioSelection {
  return {
    restaurants: baseOutput.restaurants,
    narrative: {
      title: "Evaluación del agente",
      description:
        "Reevalúa el mismo caso con señales, score, peers, momentum e impacto de negocio.",
      nextStep:
        "Comparar la reclasificación del agente contra el dataset original y luego bajar al caso prioritario.",
    },
  };
}

function selectCrisis(baseOutput: Case2OutputBundle): ScenarioSelection {
  const restaurants = [...baseOutput.restaurants].sort((left, right) => {
    const weight = {
      critical: 300,
      at_risk: 220,
      watchlist: 120,
      stable: 0,
    } satisfies Record<RiskStatus, number>;

    return (
      weight[right.status] - weight[left.status] ||
      right.priorityScore - left.priorityScore
    );
  });

  return {
    restaurants,
    narrative: {
      title: "Crisis operativa",
      description:
        "Intensifica presión y exposición sobre la lectura del agente para mostrar cómo reacciona la plataforma bajo estrés.",
      nextStep:
        "Mostrar primero el dashboard y luego bajar al KAM y a la cuenta con mayor urgencia visible.",
    },
  };
}

function getScenarioSelection(
  baseOutput: Case2OutputBundle,
  scenario: ScenarioId,
): ScenarioSelection {
  switch (scenario) {
    case "crisis":
      return selectCrisis(baseOutput);
    case "agent-evaluation":
      return selectAgentEvaluation(baseOutput);
    case "dataset-original":
    default:
      return selectDatasetOriginal(baseOutput);
  }
}

export function getPresentationSnapshot(
  baseOutput: Case2OutputBundle,
  scenario: ScenarioId,
): PresentationSnapshot {
  const selection = getScenarioSelection(baseOutput, scenario);
  const semantics = getScenarioProjectionMetadata(scenario);
  const bundle = buildScenarioBundle(baseOutput, selection, scenario);
  const comparableTargets = getCanonicalWalkthroughTargets({
    restaurants: bundle.restaurants,
    kams: bundle.kams,
  });

  return {
    scenario,
    scenarioOption: getScenarioOption(scenario),
    bundle,
    semantics,
    alerts: buildSnapshotAlertQueues(semantics, bundle.alerts),
    walkthrough: {
      entryRoute: OFFICIAL_ENTRY_ROUTE,
      fallbackRoute: FALLBACK_ROUTE,
      primaryKamId: comparableTargets.primaryKamId,
      primaryRestaurantId: comparableTargets.primaryRestaurantId,
      rankingSource: "canonical_comparable_v1",
      selectionKind: "comparable",
      selectionTrace: {
        source: "canonical_comparable_v1",
        reason:
          "Entidad primaria derivada del ranking canónico comparable del escenario activo.",
      },
    },
    narrative: selection.narrative,
    channel: PRESENTATION_CHANNEL,
  };
}
