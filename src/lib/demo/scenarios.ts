import type {
  AlertFeedItem,
  KamAssessment,
  RecommendationCode,
  RestaurantAssessment,
  RestaurantMiniAssessment,
  SignalType,
} from "@/lib/agent/contracts/agent-output";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import type { ScenarioId } from "@/types/domain";

import type { PresentationChannel, PresentationSnapshot } from "./contracts";
import {
  FALLBACK_ROUTE,
  getScenarioOption,
  OFFICIAL_ENTRY_ROUTE,
} from "./options";

export const DEFAULT_SCENARIO_ID: ScenarioId = "base";
export const DEMO_REFRESH_LABEL = "13 abr 2026 · 09:00";

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
  kams: KamAssessment[];
  alerts: AlertFeedItem[];
  primaryKamId?: string;
  primaryRestaurantId?: string;
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

function sortAlertsByPriority(alerts: AlertFeedItem[]) {
  return [...alerts].sort(
    (left, right) => right.priorityScore - left.priorityScore,
  );
}

function sortRestaurantsByStability(restaurants: RestaurantAssessment[]) {
  return [...restaurants].sort((left, right) => {
    if (left.priorityScore !== right.priorityScore) {
      return left.priorityScore - right.priorityScore;
    }

    return right.confidence - left.confidence;
  });
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
    cityRiskSummary: baseOutput.global.dashboard.cityRiskSummary,
    verticalRiskSummary: baseOutput.global.dashboard.verticalRiskSummary,
    topSignalsSummary: [...signalCounts.entries()]
      .map(([signalType, count]) => ({ signalType, count }))
      .sort((left, right) => right.count - left.count),
    interventionSummary: [...recommendationCounts.entries()]
      .map(([recommendationCode, count]) => ({ recommendationCode, count }))
      .sort((left, right) => right.count - left.count),
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

function buildScenarioBundle(
  baseOutput: Case2OutputBundle,
  selection: ScenarioSelection,
): Case2OutputBundle {
  const selectedRestaurantIds = new Set(
    selection.restaurants.map((restaurant) => restaurant.restaurantId),
  );
  const dashboard = buildDerivedDashboardSummary(
    selection.restaurants,
    selection.kams,
    baseOutput,
  );
  const portfolio = buildDerivedPortfolio(
    selection.restaurants,
    selection.kams,
  );

  return {
    ...baseOutput,
    restaurants: selection.restaurants,
    kams: selection.kams,
    alerts: selection.alerts,
    validation: {
      ...baseOutput.validation,
      overlays: baseOutput.validation.overlays.filter((overlay) =>
        selectedRestaurantIds.has(overlay.entityId),
      ),
    },
    global: {
      portfolio,
      dashboard,
    },
  };
}

function selectBase(baseOutput: Case2OutputBundle): ScenarioSelection {
  const primaryKam = sortKamsByPriority(baseOutput.kams)[0];
  const primaryRestaurant = sortRestaurantsByPriority(
    baseOutput.restaurants,
  )[0];

  return {
    restaurants: baseOutput.restaurants,
    kams: baseOutput.kams,
    alerts: sortAlertsByPriority(baseOutput.alerts),
    primaryKamId: primaryKam?.kamId,
    primaryRestaurantId: primaryRestaurant?.restaurantId,
    narrative: {
      title: "Base operativa",
      description:
        "Usa el bundle completo para recorrer la lectura ejecutiva, comparar KAMs y bajar hasta el caso individual sin ramas paralelas.",
      nextStep: "Entrar al dashboard y bajar a la vista KAM priorizada.",
    },
  };
}

function selectCrisis(baseOutput: Case2OutputBundle): ScenarioSelection {
  const crisisRestaurants = sortRestaurantsByPriority(
    baseOutput.restaurants.filter(
      (restaurant) =>
        restaurant.status === "critical" || restaurant.status === "at_risk",
    ),
  ).slice(0, 12);
  const restaurants =
    crisisRestaurants.length > 0
      ? crisisRestaurants
      : sortRestaurantsByPriority(baseOutput.restaurants).slice(0, 12);
  const kamIds = new Set(restaurants.map((restaurant) => restaurant.kamId));
  const kams = sortKamsByPriority(
    baseOutput.kams.filter(
      (kam) => kamIds.has(kam.kamId) || kam.portfolioStatus !== "stable",
    ),
  );
  const alerts = sortAlertsByPriority(
    baseOutput.alerts.filter(
      (alert) =>
        (alert.entityType === "restaurant" &&
          restaurants.some((item) => item.restaurantId === alert.entityId)) ||
        (alert.entityType === "kam" &&
          kams.some((item) => item.kamId === alert.entityId)),
    ),
  );

  return {
    restaurants,
    kams,
    alerts,
    primaryKamId: kams[0]?.kamId,
    primaryRestaurantId: restaurants[0]?.restaurantId,
    narrative: {
      title: "Escenario de crisis",
      description:
        "Concentra la lectura en los casos críticos y en riesgo ya presentes en el bundle oficial para explicar urgencia sin inventar scoring nuevo.",
      nextStep:
        "Mostrar primero el dashboard y luego abrir el KAM con mayor prioridad visible.",
    },
  };
}

function selectDiscrepancias(baseOutput: Case2OutputBundle): ScenarioSelection {
  const overlaysByRestaurantId = new Map(
    baseOutput.validation.overlays.map((overlay) => [
      overlay.entityId,
      overlay,
    ]),
  );
  const discrepancyRestaurants = sortRestaurantsByPriority(
    baseOutput.restaurants.filter((restaurant) => {
      const overlay = overlaysByRestaurantId.get(restaurant.restaurantId);
      return (
        overlay?.degradedByValidation ||
        (overlay?.relatedValidationFlags.length ?? 0) > 0 ||
        restaurant.benchmark?.benchmarkConflict ||
        restaurant.signals.some(
          (signal) =>
            signal.type === "benchmark_conflict" ||
            signal.type === "data_quality_risk",
        )
      );
    }),
  ).slice(0, 12);
  const restaurants =
    discrepancyRestaurants.length > 0
      ? discrepancyRestaurants
      : sortRestaurantsByPriority(
          [...baseOutput.restaurants].sort(
            (left, right) => left.confidence - right.confidence,
          ),
        ).slice(0, 12);
  const kamIds = new Set(restaurants.map((restaurant) => restaurant.kamId));
  const kams = sortKamsByPriority(
    baseOutput.kams.filter((kam) => kamIds.has(kam.kamId)),
  );
  const alerts = sortAlertsByPriority(
    baseOutput.alerts.filter(
      (alert) =>
        (alert.entityType === "restaurant" &&
          restaurants.some((item) => item.restaurantId === alert.entityId)) ||
        (alert.entityType === "kam" && kamIds.has(alert.entityId)),
    ),
  );

  return {
    restaurants,
    kams,
    alerts,
    primaryKamId: kams[0]?.kamId,
    primaryRestaurantId: restaurants[0]?.restaurantId,
    narrative: {
      title: "Escenario de discrepancias",
      description:
        "Resalta conflictos de benchmark, degradación de confianza y alertas donde la decisión correcta es prudencia explícita.",
      nextStep:
        "Usar Validation como bloque de defensa y luego bajar a un caso afectado.",
    },
  };
}

function selectEstable(baseOutput: Case2OutputBundle): ScenarioSelection {
  const stableRestaurants = sortRestaurantsByStability(
    baseOutput.restaurants.filter(
      (restaurant) =>
        restaurant.status === "stable" || restaurant.status === "watchlist",
    ),
  ).slice(0, 12);
  const restaurants =
    stableRestaurants.length > 0
      ? stableRestaurants
      : sortRestaurantsByStability(baseOutput.restaurants).slice(0, 12);
  const kamIds = new Set(restaurants.map((restaurant) => restaurant.kamId));
  const kams = sortKamsByPriority(
    baseOutput.kams.filter((kam) => kamIds.has(kam.kamId)),
  );
  const alerts = sortAlertsByPriority(
    baseOutput.alerts.filter((alert) => {
      if (alert.entityType === "restaurant") {
        return restaurants.some((item) => item.restaurantId === alert.entityId);
      }

      return kamIds.has(alert.entityId);
    }),
  );

  return {
    restaurants,
    kams,
    alerts,
    primaryKamId: kams[0]?.kamId,
    primaryRestaurantId: restaurants[0]?.restaurantId,
    narrative: {
      title: "Escenario estable",
      description:
        "Recorta el walkthrough a portfolios y cuentas con menor urgencia para demostrar que la app también soporta lectura prudente y seguimiento.",
      nextStep:
        "Mostrar cómo cambia la priorización sin alterar fórmulas ni umbrales oficiales.",
    },
  };
}

function selectFocusedKam(baseOutput: Case2OutputBundle): ScenarioSelection {
  const primaryKam = sortKamsByPriority(baseOutput.kams)[0];
  const restaurants = sortRestaurantsByPriority(
    baseOutput.restaurants.filter(
      (restaurant) => restaurant.kamId === primaryKam?.kamId,
    ),
  );
  const kams = primaryKam ? [primaryKam] : [];
  const alerts = sortAlertsByPriority(
    baseOutput.alerts.filter((alert) => {
      if (!primaryKam) {
        return false;
      }

      if (alert.entityType === "kam") {
        return alert.entityId === primaryKam.kamId;
      }

      return restaurants.some(
        (restaurant) => restaurant.restaurantId === alert.entityId,
      );
    }),
  );

  return {
    restaurants,
    kams,
    alerts,
    primaryKamId: primaryKam?.kamId,
    primaryRestaurantId: restaurants[0]?.restaurantId,
    narrative: {
      title: "Foco KAM",
      description:
        "Bloquea el walkthrough en un solo portfolio para explicar continuidad entre resumen ejecutivo, detalle KAM y detalle de restaurante.",
      nextStep:
        "Entrar directo al KAM priorizado y bajar desde ahí a la cuenta principal.",
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
    case "discrepancias":
      return selectDiscrepancias(baseOutput);
    case "estable":
      return selectEstable(baseOutput);
    case "foco-kam":
      return selectFocusedKam(baseOutput);
    case "base":
    default:
      return selectBase(baseOutput);
  }
}

export function getPresentationSnapshot(
  baseOutput: Case2OutputBundle,
  scenario: ScenarioId,
): PresentationSnapshot {
  const selection = getScenarioSelection(baseOutput, scenario);
  const bundle = buildScenarioBundle(baseOutput, selection);

  return {
    scenario,
    scenarioOption: getScenarioOption(scenario),
    bundle,
    walkthrough: {
      entryRoute: OFFICIAL_ENTRY_ROUTE,
      fallbackRoute: FALLBACK_ROUTE,
      primaryKamId: selection.primaryKamId,
      primaryRestaurantId: selection.primaryRestaurantId,
    },
    narrative: selection.narrative,
    channel: PRESENTATION_CHANNEL,
  };
}
