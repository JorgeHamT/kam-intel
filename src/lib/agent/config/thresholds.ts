// Provisional thresholds for v1. Keep logic stable and adjust values here as Chat 02/03 freeze definitions.
export const agentThresholds = {
  status: {
    critical: 75,
    atRisk: 50,
    watchlist: 25,
  },
  severity: {
    high: 70,
    medium: 40,
  },
  signals: {
    absolute: {
      deltaRatingCritical: -0.25,
      deltaRatingRisk: -0.12,
      cancellationRiskPct: 12,
      cancellationCriticalPct: 18,
      deliveryRiskMin: 45,
      deliveryCriticalMin: 60,
      complaintsRisk: 8,
      complaintsCritical: 14,
      npsRisk: 35,
      npsCritical: 20,
    },
    momentum: {
      ordersDropRiskPct: -12,
      ordersDropCriticalPct: -25,
      recentAccountDays: 45,
    },
    businessImpact: {
      gmvHigh: 50000,
      gmvVeryHigh: 90000,
      concentrationShareRisk: 0.3,
      concentrationShareCritical: 0.45,
    },
    relative: {
      peerDeltaRisk: -0.12,
      peerDeltaCritical: -0.25,
      peerCancellationRisk: 3,
      peerDeliveryRisk: 10,
      peerComplaintsRisk: 4,
      peerNpsRisk: -8,
    },
    confidence: {
      lowConfidence: 0.45,
      degradedConfidence: 0.7,
    },
  },
  alerts: {
    topRestaurantCount: 8,
    topKamCount: 4,
  },
} as const;

export type AgentThresholds = typeof agentThresholds;
