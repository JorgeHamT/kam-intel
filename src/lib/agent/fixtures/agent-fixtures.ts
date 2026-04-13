import type { AgentInput } from "../contracts/agent-input.ts";

export const agentFixtures: AgentInput = {
  restaurants: [
    {
      restaurantId: "rest-critical-1",
      restaurantName: "Taquería Centro",
      kamId: "kam-1",
      kamName: "Ana Torres",
      city: "CDMX",
      vertical: "Mexicana",
      deltaRatingRecalc: -0.34,
      varOrdenesPctRecalc: -31,
      gmvProxy7d: 125000,
      ageDaysRecalc: 320,
      tasaCancelacionPct: 21,
      tiempoEntregaAvgMin: 67,
      quejas7d: 18,
      npsScore: 18,
      quality: {
        hasIssues: true,
        degradedConfidence: true,
        note: "Se detectaron diferencias relevantes entre valores originales y recalculados.",
        flags: [
          {
            code: "delta_rating_mismatch",
            severity: "warning",
            field: "delta_rating_recalc",
            message: "El delta original difiere del recalculado.",
          },
        ],
      },
      benchmark: {
        originalRiskLabel: "estable",
        validatedRiskLabel: "critical",
        candidates: [
          {
            type: "city_vertical",
            key: "CDMX|Mexicana",
            sampleSize: 6,
            comparisons: {
              delta_rating_recalc: {
                entityValue: -0.34,
                peerMedian: -0.08,
                deltaToMedian: -0.26,
                direction: "lower_is_worse",
              },
              tasa_cancelacion_pct: {
                entityValue: 21,
                peerMedian: 10,
                deltaToMedian: 11,
                direction: "higher_is_worse",
              },
              tiempo_entrega_avg_min: {
                entityValue: 67,
                peerMedian: 46,
                deltaToMedian: 21,
                direction: "higher_is_worse",
              },
            },
          },
          {
            type: "vertical",
            key: "Mexicana",
            sampleSize: 11,
            comparisons: {
              delta_rating_recalc: {
                entityValue: -0.34,
                peerMedian: -0.05,
                deltaToMedian: -0.29,
                direction: "lower_is_worse",
              },
              nps_score: {
                entityValue: 18,
                peerMedian: 40,
                deltaToMedian: -22,
                direction: "lower_is_worse",
              },
            },
          },
        ],
      },
    },
    {
      restaurantId: "rest-watch-1",
      restaurantName: "Bowl Studio",
      kamId: "kam-1",
      kamName: "Ana Torres",
      city: "CDMX",
      vertical: "Saludable",
      deltaRatingRecalc: -0.08,
      varOrdenesPctRecalc: -7,
      gmvProxy7d: 24000,
      ageDaysRecalc: 130,
      tasaCancelacionPct: 8,
      tiempoEntregaAvgMin: 39,
      quejas7d: 4,
      npsScore: 44,
      quality: {
        hasIssues: false,
        flags: [],
      },
      benchmark: {
        validatedRiskLabel: "watchlist",
        candidates: [
          {
            type: "city_vertical",
            key: "CDMX|Saludable",
            sampleSize: 4,
            comparisons: {
              delta_rating_recalc: {
                entityValue: -0.08,
                peerMedian: -0.02,
                deltaToMedian: -0.06,
                direction: "lower_is_worse",
              },
            },
          },
          {
            type: "vertical",
            key: "Saludable",
            sampleSize: 9,
            comparisons: {
              delta_rating_recalc: {
                entityValue: -0.08,
                peerMedian: -0.03,
                deltaToMedian: -0.05,
                direction: "lower_is_worse",
              },
            },
          },
        ],
      },
    },
    {
      restaurantId: "rest-stable-1",
      restaurantName: "Pizza Norte",
      kamId: "kam-2",
      kamName: "Luis Vega",
      city: "Monterrey",
      vertical: "Pizza",
      deltaRatingRecalc: 0.03,
      varOrdenesPctRecalc: 6,
      gmvProxy7d: 42000,
      ageDaysRecalc: 480,
      tasaCancelacionPct: 4,
      tiempoEntregaAvgMin: 31,
      quejas7d: 1,
      npsScore: 62,
      quality: {
        hasIssues: false,
        flags: [],
      },
      benchmark: {
        validatedRiskLabel: "stable",
        candidates: [
          {
            type: "city_vertical",
            key: "Monterrey|Pizza",
            sampleSize: 10,
            comparisons: {
              nps_score: {
                entityValue: 62,
                peerMedian: 55,
                deltaToMedian: 7,
                direction: "lower_is_worse",
              },
            },
          },
        ],
      },
    },
    {
      restaurantId: "rest-fallback-1",
      restaurantName: "Sushi Sur",
      kamId: "kam-2",
      kamName: "Luis Vega",
      city: "Puebla",
      vertical: "Japonesa",
      deltaRatingRecalc: -0.16,
      varOrdenesPctRecalc: -18,
      gmvProxy7d: 76000,
      ageDaysRecalc: 60,
      tasaCancelacionPct: 13,
      tiempoEntregaAvgMin: 49,
      quejas7d: 9,
      npsScore: 32,
      quality: {
        hasIssues: true,
        degradedConfidence: true,
        flags: [
          {
            code: "benchmark_group_small",
            severity: "warning",
            field: "benchmark",
            message: "El grupo original es pequeño y exige fallback.",
          },
          {
            code: "var_ordenes_pct_mismatch",
            severity: "error",
            field: "var_ordenes_pct_recalc",
            message: "La variación recalculada difiere del valor original.",
          },
        ],
      },
      benchmark: {
        originalRiskLabel: "en riesgo",
        validatedRiskLabel: "at_risk",
        candidates: [
          {
            type: "city_vertical",
            key: "Puebla|Japonesa",
            sampleSize: 3,
            comparisons: {
              delta_rating_recalc: {
                entityValue: -0.16,
                peerMedian: -0.04,
                deltaToMedian: -0.12,
                direction: "lower_is_worse",
              },
            },
          },
          {
            type: "global",
            key: "global",
            sampleSize: 20,
            comparisons: {
              tasa_cancelacion_pct: {
                entityValue: 13,
                peerMedian: 7,
                deltaToMedian: 6,
                direction: "higher_is_worse",
              },
              tiempo_entrega_avg_min: {
                entityValue: 49,
                peerMedian: 37,
                deltaToMedian: 12,
                direction: "higher_is_worse",
              },
            },
          },
        ],
      },
    },
  ],
  kams: [
    {
      kamId: "kam-1",
      kamName: "Ana Torres",
      portfolioName: "Centro",
    },
    {
      kamId: "kam-2",
      kamName: "Luis Vega",
      portfolioName: "Norte",
    },
  ],
};
