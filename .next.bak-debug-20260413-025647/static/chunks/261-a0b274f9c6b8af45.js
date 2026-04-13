"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [261],
  {
    2715: (e, a, t) => {
      t.d(a, { f: () => i, o: () => n });
      let i = [
        {
          id: "baseline",
          label: "Base operativa",
          subtitle: "Vista controlada para walkthrough general",
        },
        {
          id: "promo-risk",
          label: "Riesgo promocional",
          subtitle: "Mock para ca\xedda de activaci\xf3n en cuentas clave",
        },
        {
          id: "coverage-gap",
          label: "Brecha de cobertura",
          subtitle: "Mock para revisar se\xf1ales de datos incompletos",
        },
      ];
      function n(e) {
        var a;
        return null != (a = i.find((a) => a.id === e)) ? a : i[0];
      }
    },
    6486: (e, a, t) => {
      t.d(a, { cn: () => i });
      function i() {
        for (var e = arguments.length, a = Array(e), t = 0; t < e; t++)
          a[t] = arguments[t];
        return a.filter(Boolean).join(" ");
      }
    },
    6853: (e, a, t) => {
      function i(e, a, t) {
        return Math.min(Math.max(e, a), t);
      }
      function n(e) {
        let a =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2,
          t = 10 ** a;
        return Math.round(e * t) / t;
      }
      function r(e) {
        return e.length ? n(e.reduce((e, a) => e + a, 0) / e.length) : 0;
      }
      function o(e) {
        return n(e.reduce((e, a) => e + a, 0));
      }
      function l(e, a, t) {
        return { code: e, label: a, rationale: t };
      }
      function s(e, a) {
        return { code: e, label: a };
      }
      function c(e) {
        return "critical" === e.portfolioStatus
          ? {
              recommendation: l(
                "portfolio_escalation",
                "Escalar revisi\xf3n del portfolio",
                "La presi\xf3n est\xe1 concentrada en varias cuentas relevantes del portfolio.",
              ),
              nextStep: s(
                "escalate_portfolio",
                "Escalar revisi\xf3n del portfolio",
              ),
            }
          : "under_pressure" === e.portfolioStatus
            ? {
                recommendation: l(
                  "priority_review",
                  "Priorizar revisi\xf3n del portfolio",
                  "El portfolio muestra presi\xf3n moderada y conviene alinear foco semanal del KAM.",
                ),
                nextStep: s("review_today", "Revisar esta cuenta hoy"),
              }
            : {
                recommendation: l(
                  "monitor_only",
                  "Monitoreo del portfolio",
                  "No hay presi\xf3n sist\xe9mica fuerte en el portfolio del KAM.",
                ),
                nextStep: s(
                  "monitor_next_window",
                  "Monitorear en la siguiente ventana",
                ),
              };
      }
      function d(e) {
        var a, t, i;
        return {
          id: e.id,
          type: e.type,
          label: e.label,
          severityHint: e.severityHint,
          evidence: e.evidence,
          confidenceEffect: null != (a = e.confidenceEffect) ? a : 0,
          affectsPriority: null == (t = e.affectsPriority) || t,
          affectsRecommendation: null == (i = e.affectsRecommendation) || i,
        };
      }
      t.d(a, { nq: () => S, xp: () => R, cz: () => I });
      let u = ["city_vertical", "vertical", "city", "global"];
      function p(e, a) {
        if (!(null == e ? void 0 : e.candidates.length))
          return {
            candidate: void 0,
            confidence: a.confidence.peerGroupRules.fallbackScore,
            caution: !0,
          };
        let t = [...e.candidates].sort(
            (e, a) => u.indexOf(e.type) - u.indexOf(a.type),
          ),
          i = t.find(
            (e) => e.sampleSize >= a.confidence.peerGroupRules.reliableMinimum,
          );
        if (i)
          return {
            candidate: i,
            confidence: a.confidence.peerGroupRules.reliableScore,
            caution: !1,
          };
        let n = t.find(
          (e) => e.sampleSize >= a.confidence.peerGroupRules.cautionMinimum,
        );
        return n
          ? {
              candidate: n,
              confidence: a.confidence.peerGroupRules.cautionScore,
              caution: !0,
            }
          : {
              candidate: t[t.length - 1],
              confidence: a.confidence.peerGroupRules.fallbackScore,
              caution: !0,
            };
      }
      function m(e, a, t) {
        return e <= 0 ? 0 : n(i((e / a) * 100, 0, 100) * t);
      }
      function v(e, a) {
        if ("number" == typeof a)
          return e.includes("pct")
            ? null === a
              ? "sin dato"
              : "".concat(n(a), "%")
            : null === a
              ? "sin dato"
              : String(n(a));
        return "boolean" == typeof a
          ? a
            ? "s\xed"
            : "no"
          : String(null != a ? a : "sin dato");
      }
      function g(e, a, t) {
        return { code: e, label: a, rationale: t };
      }
      function f(e, a) {
        return { code: e, label: a };
      }
      let y = {
          thresholds: {
            status: { critical: 75, atRisk: 50, watchlist: 25 },
            severity: { high: 70, medium: 40 },
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
                gmvHigh: 5e4,
                gmvVeryHigh: 9e4,
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
              confidence: { lowConfidence: 0.45, degradedConfidence: 0.7 },
            },
            alerts: { topRestaurantCount: 8, topKamCount: 4 },
          },
          weights: {
            score: {
              observedRisk: 0.4,
              deteriorationMomentum: 0.25,
              businessImpact: 0.25,
              confidenceAdjustment: 0.1,
            },
            signalImpact: {
              critical: 18,
              at_risk: 11,
              watchlist: 6,
              stable: 0,
            },
            benchmark: { strongNegative: 8, moderateNegative: 4 },
            dataQuality: { warningPenalty: 4, errorPenalty: 8 },
            kam: {
              criticalRestaurant: 12,
              atRiskRestaurant: 7,
              watchlistRestaurant: 3,
              concentrationRisk: 10,
              lowConfidencePenalty: 8,
            },
          },
          confidence: {
            base: 1,
            minimum: 0.2,
            penalties: {
              validationWarning: 0.08,
              validationError: 0.16,
              lowQualityFlag: 0.12,
              benchmarkCaution: 0.1,
              benchmarkMissing: 0.14,
              benchmarkConflict: 0.1,
            },
            peerGroupRules: {
              reliableMinimum: 8,
              cautionMinimum: 5,
              reliableScore: 1,
              cautionScore: 0.72,
              fallbackScore: 0.55,
            },
          },
          featureFlags: {
            enableBenchmarkConflict: !0,
            enableConcentrationRisk: !0,
            enableKamBriefing: !0,
            enableValidationBadge: !0,
            enableAggressiveActionsOnlyWithHighConfidence: !0,
          },
        },
        b = {
          restaurants: [
            {
              restaurantId: "rest-critical-1",
              restaurantName: "Taquer\xeda Centro",
              kamId: "kam-1",
              kamName: "Ana Torres",
              city: "CDMX",
              vertical: "Mexicana",
              deltaRatingRecalc: -0.34,
              varOrdenesPctRecalc: -31,
              gmvProxy7d: 125e3,
              ageDaysRecalc: 320,
              tasaCancelacionPct: 21,
              tiempoEntregaAvgMin: 67,
              quejas7d: 18,
              npsScore: 18,
              quality: {
                hasIssues: !0,
                degradedConfidence: !0,
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
              gmvProxy7d: 24e3,
              ageDaysRecalc: 130,
              tasaCancelacionPct: 8,
              tiempoEntregaAvgMin: 39,
              quejas7d: 4,
              npsScore: 44,
              quality: { hasIssues: !1, flags: [] },
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
              gmvProxy7d: 42e3,
              ageDaysRecalc: 480,
              tasaCancelacionPct: 4,
              tiempoEntregaAvgMin: 31,
              quejas7d: 1,
              npsScore: 62,
              quality: { hasIssues: !1, flags: [] },
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
              gmvProxy7d: 76e3,
              ageDaysRecalc: 60,
              tasaCancelacionPct: 13,
              tiempoEntregaAvgMin: 49,
              quejas7d: 9,
              npsScore: 32,
              quality: {
                hasIssues: !0,
                degradedConfidence: !0,
                flags: [
                  {
                    code: "benchmark_group_small",
                    severity: "warning",
                    field: "benchmark",
                    message:
                      "El grupo original es peque\xf1o y exige fallback.",
                  },
                  {
                    code: "var_ordenes_pct_mismatch",
                    severity: "error",
                    field: "var_ordenes_pct_recalc",
                    message:
                      "La variaci\xf3n recalculada difiere del valor original.",
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
            { kamId: "kam-1", kamName: "Ana Torres", portfolioName: "Centro" },
            { kamId: "kam-2", kamName: "Luis Vega", portfolioName: "Norte" },
          ],
        };
      var h = t(2715);
      let k = (function () {
          var e;
          let a = (function (e, a) {
            var t, l, s, u;
            let b = (function () {
                let e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
                return {
                  thresholds: { ...y.thresholds, ...e.thresholds },
                  weights: { ...y.weights, ...e.weights },
                  confidence: { ...y.confidence, ...e.confidence },
                  featureFlags: { ...y.featureFlags, ...e.featureFlags },
                };
              })(void 0),
              h = (function (e) {
                let a = new Map();
                for (let i of e) {
                  var t;
                  let e = null != (t = a.get(i.kamId)) ? t : [];
                  e.push(i), a.set(i.kamId, e);
                }
                return a;
              })(e.restaurants),
              k = new Map(
                (null != (t = e.kams) ? t : []).map((e) => [e.kamId, e]),
              ),
              _ = Object.fromEntries(
                e.restaurants.map((e) => [
                  e.restaurantId,
                  { city: e.city, vertical: e.vertical },
                ]),
              ),
              S = [],
              R = [];
            for (let a of e.restaurants) {
              let e = (null != (l = h.get(a.kamId)) ? l : []).reduce((e, a) => {
                  var t;
                  return e + (null != (t = a.gmvProxy7d) ? t : 0);
                }, 0),
                t = e > 0 ? (null != (s = a.gmvProxy7d) ? s : 0) / e : 0,
                { assessment: r, validationOverlay: c } = (function (e, a, t) {
                  var r, l, s, c, u, y, b;
                  let h = (function (e, a, t) {
                      var i,
                        n,
                        r,
                        o,
                        l,
                        s,
                        c,
                        u,
                        m,
                        v,
                        g,
                        f,
                        y,
                        b,
                        h,
                        k,
                        _,
                        S,
                        R,
                        w,
                        C,
                        M,
                        I,
                        P,
                        A,
                        x,
                        q,
                        z;
                      let N = [],
                        j = a.thresholds.signals,
                        D = p(e.benchmark, a).candidate,
                        E = "stable";
                      if (
                        ((null != (r = e.deltaRatingRecalc) ? r : 0) <=
                          j.absolute.deltaRatingCritical ||
                        (null != (o = e.tasaCancelacionPct) ? o : 0) >=
                          j.absolute.cancellationCriticalPct ||
                        (null != (l = e.tiempoEntregaAvgMin) ? l : 0) >=
                          j.absolute.deliveryCriticalMin ||
                        (null != (s = e.quejas7d) ? s : 0) >=
                          j.absolute.complaintsCritical ||
                        (null != (c = e.npsScore) ? c : 100) <=
                          j.absolute.npsCritical
                          ? (E = "critical")
                          : ((null != (u = e.deltaRatingRecalc) ? u : 0) <=
                              j.absolute.deltaRatingRisk ||
                              (null != (m = e.tasaCancelacionPct) ? m : 0) >=
                                j.absolute.cancellationRiskPct ||
                              (null != (v = e.tiempoEntregaAvgMin) ? v : 0) >=
                                j.absolute.deliveryRiskMin ||
                              (null != (g = e.quejas7d) ? g : 0) >=
                                j.absolute.complaintsRisk ||
                              (null != (f = e.npsScore) ? f : 100) <=
                                j.absolute.npsRisk) &&
                            (E = "at_risk"),
                        "stable" !== E &&
                          N.push(
                            d({
                              id: "".concat(e.restaurantId, "-absolute"),
                              type: "absolute_deterioration",
                              label:
                                "Deterioro absoluto en m\xe9tricas operativas",
                              severityHint: E,
                              evidence: [
                                {
                                  metric: "delta_rating_recalc",
                                  value: e.deltaRatingRecalc,
                                  reference: j.absolute.deltaRatingRisk,
                                  note: "Ca\xedda reciente de rating recalculado.",
                                },
                                {
                                  metric: "tasa_cancelacion_pct",
                                  value: e.tasaCancelacionPct,
                                  reference: j.absolute.cancellationRiskPct,
                                  note: "Cancelaci\xf3n por encima de banda provisional.",
                                },
                                {
                                  metric: "tiempo_entrega_avg_min",
                                  value: e.tiempoEntregaAvgMin,
                                  reference: j.absolute.deliveryRiskMin,
                                  note: "Tiempo de entrega elevado frente al umbral provisional.",
                                },
                              ],
                            }),
                          ),
                        D)
                      ) {
                        let a = D.comparisons,
                          t = [
                            (null == (y = a.delta_rating_recalc)
                              ? void 0
                              : y.deltaToMedian) !== null &&
                              (null == (b = a.delta_rating_recalc)
                                ? void 0
                                : b.deltaToMedian) !== void 0 &&
                              a.delta_rating_recalc.deltaToMedian <=
                                j.relative.peerDeltaRisk,
                            (null == (h = a.tasa_cancelacion_pct)
                              ? void 0
                              : h.deltaToMedian) !== null &&
                              (null == (k = a.tasa_cancelacion_pct)
                                ? void 0
                                : k.deltaToMedian) !== void 0 &&
                              a.tasa_cancelacion_pct.deltaToMedian >=
                                j.relative.peerCancellationRisk,
                            (null == (_ = a.tiempo_entrega_avg_min)
                              ? void 0
                              : _.deltaToMedian) !== null &&
                              (null == (S = a.tiempo_entrega_avg_min)
                                ? void 0
                                : S.deltaToMedian) !== void 0 &&
                              a.tiempo_entrega_avg_min.deltaToMedian >=
                                j.relative.peerDeliveryRisk,
                            (null == (R = a.quejas_7d)
                              ? void 0
                              : R.deltaToMedian) !== null &&
                              (null == (w = a.quejas_7d)
                                ? void 0
                                : w.deltaToMedian) !== void 0 &&
                              a.quejas_7d.deltaToMedian >=
                                j.relative.peerComplaintsRisk,
                            (null == (C = a.nps_score)
                              ? void 0
                              : C.deltaToMedian) !== null &&
                              (null == (M = a.nps_score)
                                ? void 0
                                : M.deltaToMedian) !== void 0 &&
                              a.nps_score.deltaToMedian <=
                                j.relative.peerNpsRisk,
                          ].filter(Boolean).length;
                        t > 0 &&
                          N.push(
                            d({
                              id: "".concat(e.restaurantId, "-relative"),
                              type: "relative_deterioration",
                              label:
                                "Desempe\xf1o por debajo de peers comparables",
                              severityHint: t >= 3 ? "critical" : "at_risk",
                              evidence: Object.entries(a)
                                .filter((e) => {
                                  let [, a] = e;
                                  return (
                                    (null == a ? void 0 : a.deltaToMedian) !==
                                      null &&
                                    (null == a ? void 0 : a.deltaToMedian) !==
                                      void 0
                                  );
                                })
                                .slice(0, 4)
                                .map((e) => {
                                  var a, t;
                                  let [i, n] = e;
                                  return {
                                    metric: i,
                                    value:
                                      null !=
                                      (a = null == n ? void 0 : n.entityValue)
                                        ? a
                                        : null,
                                    reference:
                                      null !=
                                      (t = null == n ? void 0 : n.peerMedian)
                                        ? t
                                        : null,
                                    note: "Comparaci\xf3n contra la mediana del peer group seleccionado.",
                                  };
                                }),
                            }),
                          );
                      }
                      if (
                        (null != (I = e.varOrdenesPctRecalc) ? I : 0) <=
                          j.momentum.ordersDropRiskPct &&
                        (null != (P = e.deltaRatingRecalc) ? P : 0) <=
                          j.absolute.deltaRatingRisk
                      ) {
                        let a =
                          (null != (A = e.ageDaysRecalc)
                            ? A
                            : Number.MAX_SAFE_INTEGER) <=
                          j.momentum.recentAccountDays;
                        N.push(
                          d({
                            id: "".concat(e.restaurantId, "-momentum"),
                            type: "accelerated_deterioration",
                            label: "Deterioro acelerado en corto plazo",
                            severityHint:
                              a ||
                              (null != (x = e.varOrdenesPctRecalc) ? x : 0) <=
                                j.momentum.ordersDropCriticalPct
                                ? "critical"
                                : "at_risk",
                            evidence: [
                              {
                                metric: "var_ordenes_pct_recalc",
                                value: e.varOrdenesPctRecalc,
                                reference: j.momentum.ordersDropRiskPct,
                                note: "Ca\xedda de \xf3rdenes en la ventana reciente.",
                              },
                              {
                                metric: "age_days_recalc",
                                value: e.ageDaysRecalc,
                                reference: j.momentum.recentAccountDays,
                                note: "Cuentas nuevas o recientes requieren lectura conservadora.",
                              },
                            ],
                          }),
                        );
                      }
                      let T = N.reduce(
                        (e, a) =>
                          (function (e, a) {
                            let t = [
                              "stable",
                              "watchlist",
                              "at_risk",
                              "critical",
                            ];
                            return t.indexOf(e) >= t.indexOf(a) ? e : a;
                          })(e, a.severityHint),
                        "stable",
                      );
                      return (
                        N.length >= 2 &&
                          "stable" !== T &&
                          N.push(
                            d({
                              id: "".concat(e.restaurantId, "-compound"),
                              type: "compound_risk",
                              label: "Combinaci\xf3n de se\xf1ales operativas",
                              severityHint:
                                N.length >= 3 ? "critical" : "at_risk",
                              evidence: [
                                {
                                  metric: "active_signals",
                                  value: N.length,
                                  note: "M\xe1s de una se\xf1al activa aumenta la presi\xf3n operativa.",
                                },
                              ],
                            }),
                          ),
                        (null != (q = e.gmvProxy7d) ? q : 0) >=
                          j.businessImpact.gmvHigh &&
                          "stable" !== T &&
                          N.push(
                            d({
                              id: "".concat(e.restaurantId, "-impact"),
                              type: "business_impact",
                              label: "Impacto de negocio relevante",
                              severityHint:
                                (null != (z = e.gmvProxy7d) ? z : 0) >=
                                j.businessImpact.gmvVeryHigh
                                  ? "critical"
                                  : "at_risk",
                              evidence: [
                                {
                                  metric: "gmv_proxy_7d",
                                  value: e.gmvProxy7d,
                                  reference: j.businessImpact.gmvHigh,
                                  note: "La cuenta tiene impacto material en GMV proxy.",
                                },
                              ],
                            }),
                          ),
                        a.featureFlags.enableConcentrationRisk &&
                          t.kamPortfolioGmv7d > 0 &&
                          t.concentrationShare >=
                            j.businessImpact.concentrationShareRisk &&
                          N.push(
                            d({
                              id: "".concat(e.restaurantId, "-concentration"),
                              type: "concentration_risk",
                              label:
                                "Concentraci\xf3n de riesgo en el portfolio",
                              severityHint:
                                t.concentrationShare >=
                                j.businessImpact.concentrationShareCritical
                                  ? "critical"
                                  : "at_risk",
                              evidence: [
                                {
                                  metric: "portfolio_gmv_share",
                                  value: t.concentrationShare,
                                  reference:
                                    j.businessImpact.concentrationShareRisk,
                                  note: "Esta cuenta concentra una porci\xf3n relevante del portfolio del KAM.",
                                },
                              ],
                            }),
                          ),
                        (null == (i = e.quality) ? void 0 : i.hasIssues) &&
                          N.push(
                            d({
                              id: "".concat(e.restaurantId, "-data-quality"),
                              type: "data_quality_risk",
                              label: "Riesgo por calidad de datos",
                              severityHint: e.quality.flags.some(
                                (e) => "error" === e.severity,
                              )
                                ? "at_risk"
                                : "watchlist",
                              evidence: e.quality.flags.slice(0, 3).map((e) => {
                                var a;
                                return {
                                  metric:
                                    null != (a = e.field) ? a : "validation",
                                  value: e.code,
                                  note: e.message,
                                };
                              }),
                              confidenceEffect: -0.15,
                            }),
                          ),
                        a.featureFlags.enableBenchmarkConflict &&
                          (null == (n = e.benchmark)
                            ? void 0
                            : n.originalRiskLabel) &&
                          "stable" !== T &&
                          e.benchmark.validatedRiskLabel &&
                          e.benchmark.validatedRiskLabel !== T &&
                          N.push(
                            d({
                              id: "".concat(
                                e.restaurantId,
                                "-benchmark-conflict",
                              ),
                              type: "benchmark_conflict",
                              label:
                                "Conflicto entre benchmark y lectura validada",
                              severityHint: "watchlist",
                              evidence: [
                                {
                                  metric: "original_risk_label",
                                  value: e.benchmark.originalRiskLabel,
                                  note: "Etiqueta previa u original de referencia.",
                                },
                                {
                                  metric: "validated_risk_label",
                                  value: e.benchmark.validatedRiskLabel,
                                  note: "Lectura validada disponible en el input procesado.",
                                },
                              ],
                              confidenceEffect: -0.1,
                              affectsPriority: !1,
                            }),
                          ),
                        N
                      );
                    })(e, a, t),
                    k = h.some((e) => "benchmark_conflict" === e.type),
                    _ = (function (e, a) {
                      var t, r, o, l;
                      let s =
                          arguments.length > 2 &&
                          void 0 !== arguments[2] &&
                          arguments[2],
                        c = a.confidence.base,
                        d = [],
                        u =
                          null !=
                          (l = null == (t = e.quality) ? void 0 : t.flags)
                            ? l
                            : [],
                        m = p(e.benchmark, a);
                      for (let e of (m.candidate
                        ? m.caution
                          ? ((c -= a.confidence.penalties.benchmarkCaution),
                            d.push(
                              "Peer group "
                                .concat(
                                  m.candidate.key,
                                  " con muestra limitada (",
                                )
                                .concat(m.candidate.sampleSize, ")."),
                            ))
                          : d.push(
                              "Peer group "
                                .concat(
                                  m.candidate.key,
                                  " con base suficiente (",
                                )
                                .concat(m.candidate.sampleSize, ")."),
                            )
                        : ((c -= a.confidence.penalties.benchmarkMissing),
                          d.push(
                            "Sin benchmark confiable; la comparaci\xf3n relativa es limitada.",
                          )),
                      u))
                        "error" === e.severity
                          ? (c -= a.confidence.penalties.validationError)
                          : "warning" === e.severity &&
                            (c -= a.confidence.penalties.validationWarning);
                      return (
                        (null == (r = e.quality)
                          ? void 0
                          : r.degradedConfidence) &&
                          ((c -= a.confidence.penalties.lowQualityFlag),
                          d.push(
                            "La calidad de datos obliga a usar la lectura con prudencia.",
                          )),
                        s &&
                          ((c -= a.confidence.penalties.benchmarkConflict),
                          d.push(
                            "Hay conflicto entre benchmark y etiqueta de riesgo previa.",
                          )),
                        d.length ||
                          d.push("Sin penalizaciones relevantes de confianza."),
                        {
                          entityId: e.restaurantId,
                          confidence: n(
                            i(c * m.confidence, a.confidence.minimum, 1),
                          ),
                          confidenceReason: d,
                          degradedByValidation: !!(
                            u.length ||
                            (null == (o = e.quality)
                              ? void 0
                              : o.degradedConfidence)
                          ),
                          relatedValidationFlags: u,
                        }
                      );
                    })(e, a, k),
                    { priorityScore: S, breakdown: R } = (function (
                      e,
                      a,
                      t,
                      r,
                    ) {
                      var l, s;
                      let c = (function () {
                        let e = () => [];
                        return {
                          observedRisk: e(),
                          deteriorationMomentum: e(),
                          businessImpact: e(),
                          confidenceAdjustment: e(),
                          normalized: {
                            total: 0,
                            observedRisk: 0,
                            deteriorationMomentum: 0,
                            businessImpact: 0,
                            confidenceAdjustment: 0,
                          },
                        };
                      })();
                      for (let e of a) {
                        let a = r.weights.signalImpact[e.severityHint];
                        if (!e.affectsPriority) {
                          c.confidenceAdjustment.push({
                            label: e.label,
                            value: -Math.abs(a / 2),
                            reason:
                              "Se\xf1al informativa o de prudencia que modera la lectura.",
                          });
                          continue;
                        }
                        "absolute_deterioration" === e.type ||
                        "relative_deterioration" === e.type
                          ? c.observedRisk.push({
                              label: e.label,
                              value: a,
                              reason:
                                "Empeoramiento observado en la operaci\xf3n o frente a peers.",
                            })
                          : "accelerated_deterioration" === e.type ||
                              "compound_risk" === e.type
                            ? c.deteriorationMomentum.push({
                                label: e.label,
                                value: a,
                                reason:
                                  "El patr\xf3n reciente sugiere presi\xf3n creciente.",
                              })
                            : c.businessImpact.push({
                                label: e.label,
                                value: a,
                                reason:
                                  "La se\xf1al aumenta la urgencia operativa por impacto o concentraci\xf3n.",
                              });
                      }
                      let d = (
                        null != (s = null == (l = e.quality) ? void 0 : l.flags)
                          ? s
                          : []
                      ).reduce(
                        (e, a) =>
                          "error" === a.severity
                            ? e + r.weights.dataQuality.errorPenalty
                            : "warning" === a.severity
                              ? e + r.weights.dataQuality.warningPenalty
                              : e,
                        0,
                      );
                      d > 0 &&
                        c.confidenceAdjustment.push({
                          label: "Penalizaci\xf3n por validaci\xf3n",
                          value: -d,
                          reason:
                            "La calidad del dato modera la prioridad operativa.",
                        });
                      let u = n((1 - t.confidence) * 20);
                      u > 0 &&
                        c.confidenceAdjustment.push({
                          label: "Ajuste por confianza",
                          value: -u,
                          reason: "Menor confianza reduce urgencia accionable.",
                        });
                      let p = o(c.observedRisk.map((e) => e.value)),
                        v = o(c.deteriorationMomentum.map((e) => e.value)),
                        g = o(c.businessImpact.map((e) => e.value)),
                        f = Math.abs(
                          o(c.confidenceAdjustment.map((e) => e.value)),
                        ),
                        y = {
                          observedRisk: m(p, 40, r.weights.score.observedRisk),
                          deteriorationMomentum: m(
                            v,
                            35,
                            r.weights.score.deteriorationMomentum,
                          ),
                          businessImpact: m(
                            g,
                            35,
                            r.weights.score.businessImpact,
                          ),
                          confidenceAdjustment: -m(
                            f,
                            25,
                            r.weights.score.confidenceAdjustment,
                          ),
                          total: 0,
                        };
                      return (
                        (y.total = i(
                          n(
                            y.observedRisk +
                              y.deteriorationMomentum +
                              y.businessImpact +
                              y.confidenceAdjustment,
                          ),
                          0,
                          100,
                        )),
                        (c.normalized = y),
                        { priorityScore: y.total, priority: y, breakdown: c }
                      );
                    })(e, h, _, a),
                    w =
                      h.some((e) => "critical" === e.severityHint) ||
                      S >= a.thresholds.status.critical
                        ? "critical"
                        : h.some((e) => "at_risk" === e.severityHint) ||
                            S >= a.thresholds.status.atRisk
                          ? "at_risk"
                          : h.some((e) => "watchlist" === e.severityHint) ||
                              S >= a.thresholds.status.watchlist
                            ? "watchlist"
                            : "stable",
                    C =
                      S >= a.thresholds.severity.high
                        ? "high"
                        : S >= a.thresholds.severity.medium
                          ? "medium"
                          : "low",
                    M = p(e.benchmark, a),
                    I = Object.entries(
                      null !=
                        (y = null == (r = M.candidate) ? void 0 : r.comparisons)
                        ? y
                        : {},
                    )
                      .filter((e) => {
                        let [, a] = e;
                        return a;
                      })
                      .slice(0, 4)
                      .map((e) => {
                        var a, t, i;
                        let [n, r] = e;
                        return {
                          metric: n,
                          entityValue:
                            null != (a = null == r ? void 0 : r.entityValue)
                              ? a
                              : null,
                          peerMedian:
                            null != (t = null == r ? void 0 : r.peerMedian)
                              ? t
                              : null,
                          deltaToMedian:
                            null != (i = null == r ? void 0 : r.deltaToMedian)
                              ? i
                              : null,
                        };
                      }),
                    P = M.candidate
                      ? {
                          peerGroupUsed: M.candidate.key,
                          peerGroupType: M.candidate.type,
                          peerGroupConfidence: M.confidence,
                          sampleSize: M.candidate.sampleSize,
                          notableDeltas: I,
                          benchmarkConflict: k,
                        }
                      : void 0,
                    { recommendedAction: A, nextBestStep: x } = (function (e) {
                      let {
                          status: a,
                          confidence: t,
                          signals: i,
                          config: n,
                        } = e,
                        r = i.some((e) => "data_quality_risk" === e.type),
                        o = i.some((e) => "business_impact" === e.type),
                        l = i.some((e) => "compound_risk" === e.type);
                      return r &&
                        t <= n.thresholds.signals.confidence.degradedConfidence
                        ? {
                            recommendedAction: g(
                              "validate_data_before_action",
                              "Validar datos antes de intervenir",
                              "La evidencia operativa existe, pero la calidad del dato no soporta una intervenci\xf3n fuerte todav\xeda.",
                            ),
                            nextBestStep: f(
                              "validate_before_intervention",
                              "Validar datos base antes de intervenir",
                            ),
                          }
                        : "critical" === a &&
                            o &&
                            t >=
                              n.thresholds.signals.confidence.degradedConfidence
                          ? {
                              recommendedAction: g(
                                "commercial_operational_audit",
                                "Auditor\xeda comercial-operativa",
                                "La cuenta combina deterioro y peso de negocio, por lo que conviene revisar operaci\xf3n y plan comercial en conjunto.",
                              ),
                              nextBestStep: f(
                                "audit_vs_peers",
                                "Auditar desempe\xf1o contra peers",
                              ),
                            }
                          : "critical" === a || ("at_risk" === a && l)
                            ? {
                                recommendedAction: g(
                                  "intensive_follow_up",
                                  "Seguimiento intensivo",
                                  "La presi\xf3n operativa amerita seguimiento cercano hasta ver estabilizaci\xf3n.",
                                ),
                                nextBestStep: f(
                                  "intensive_monitoring",
                                  "Incluir esta cuenta en seguimiento intensivo",
                                ),
                              }
                            : "at_risk" === a
                              ? {
                                  recommendedAction: g(
                                    "account_contact",
                                    "Contacto prioritario con la cuenta",
                                    "Hay se\xf1ales accionables suficientes para abrir contacto operativo/comercial con prudencia.",
                                  ),
                                  nextBestStep: f(
                                    "prioritize_contact",
                                    "Priorizar contacto con esta cuenta",
                                  ),
                                }
                              : "watchlist" === a
                                ? {
                                    recommendedAction: g(
                                      "priority_review",
                                      "Revisi\xf3n prioritaria",
                                      "Hay se\xf1ales tempranas, pero todav\xeda no justifican una escalada completa.",
                                    ),
                                    nextBestStep: f(
                                      "review_today",
                                      "Revisar esta cuenta hoy",
                                    ),
                                  }
                                : {
                                    recommendedAction: g(
                                      "monitor_only",
                                      "Monitoreo",
                                      "No hay evidencia suficiente para una intervenci\xf3n inmediata en esta corrida.",
                                    ),
                                    nextBestStep: f(
                                      "monitor_next_window",
                                      "Monitorear en la siguiente ventana",
                                    ),
                                  };
                    })({
                      status: w,
                      confidence: _.confidence,
                      signals: h,
                      config: a,
                    }),
                    q = {
                      restaurantId: e.restaurantId,
                      restaurantName: e.restaurantName,
                      kamId: e.kamId,
                      status: w,
                      priorityScore: S,
                      severity: C,
                      confidence: _.confidence,
                      peerGroupUsed: null == P ? void 0 : P.peerGroupUsed,
                      peerGroupConfidence:
                        null == P ? void 0 : P.peerGroupConfidence,
                      signals: h,
                      scoreBreakdown: R,
                      benchmark: P,
                      whyFlagged: (function (e) {
                        var a, t, i, n;
                        let r = e.signals
                            .filter((e) => e.affectsRecommendation)
                            .slice(0, 3),
                          o = r[0],
                          l = r.slice(1),
                          s = null == o ? void 0 : o.evidence[0],
                          c = [];
                        return (
                          o &&
                            c.push(
                              "Se\xf1al principal: "
                                .concat(o.label, ". Evidencia base: ")
                                .concat(
                                  null != (a = null == s ? void 0 : s.metric)
                                    ? a
                                    : "sin m\xe9trica",
                                  " en ",
                                )
                                .concat(
                                  v(
                                    null != (t = null == s ? void 0 : s.metric)
                                      ? t
                                      : "",
                                    null != (i = null == s ? void 0 : s.value)
                                      ? i
                                      : null,
                                  ),
                                  ".",
                                ),
                            ),
                          l.length > 0 &&
                            c.push(
                              "Se\xf1ales de soporte: ".concat(
                                l.map((e) => e.label).join(", "),
                                ".",
                              ),
                            ),
                          c.push(
                            (function (e) {
                              if (!(null == e ? void 0 : e.peerGroupUsed))
                                return "Sin referencia benchmark s\xf3lida en esta corrida.";
                              let a = e.notableDeltas[0];
                              if (!a) {
                                var t;
                                return "Benchmark contra "
                                  .concat(e.peerGroupUsed, " con muestra ")
                                  .concat(
                                    null != (t = e.sampleSize) ? t : "sin dato",
                                    ".",
                                  );
                              }
                              return "Referencia benchmark: "
                                .concat(a.metric, " vs mediana de ")
                                .concat(e.peerGroupUsed, " (")
                                .concat(v(a.metric, a.entityValue), " vs ")
                                .concat(v(a.metric, a.peerMedian), ").");
                            })(e.benchmark),
                          ),
                          c.push(
                            "Nivel de confianza: "
                              .concat(
                                (n = e.confidence) >= 0.85
                                  ? "alta"
                                  : n >= 0.7
                                    ? "media"
                                    : "reducida",
                                " (",
                              )
                              .concat(e.confidence, ")."),
                          ),
                          e.validationFlagsCount &&
                            e.validationFlagsCount > 0 &&
                            c.push(
                              e.validationNote
                                ? "Nota de validaci\xf3n: ".concat(
                                    e.validationNote,
                                  )
                                : "Nota de validaci\xf3n: ".concat(
                                    e.validationFlagsCount,
                                    " flags afectan la lectura.",
                                  ),
                            ),
                          c
                        );
                      })({
                        signals: h,
                        confidence: _.confidence,
                        benchmark: P,
                        validationNote:
                          null == (l = e.quality) ? void 0 : l.note,
                        validationFlagsCount:
                          null !=
                          (b =
                            null == (s = e.quality) ? void 0 : s.flags.length)
                            ? b
                            : 0,
                      }),
                      recommendedAction: A,
                      nextBestStep: x,
                      businessSummary: "",
                      validationFlags:
                        null == (c = e.quality) ? void 0 : c.flags,
                      validationNote: null == (u = e.quality) ? void 0 : u.note,
                    };
                  return (
                    (q.businessSummary = (function (e) {
                      var a, t, i;
                      let n =
                          "critical" === e.status
                            ? "Cuenta bajo presi\xf3n operativa relevante."
                            : "at_risk" === e.status
                              ? "Cuenta con deterioro que requiere seguimiento."
                              : "watchlist" === e.status
                                ? "Cuenta a observar con se\xf1ales tempranas."
                                : "Cuenta sin presi\xf3n operativa relevante en esta corrida.",
                        r = (
                          null == (a = e.benchmark) ? void 0 : a.peerGroupUsed
                        )
                          ? "Peer group usado: "
                              .concat(
                                e.benchmark.peerGroupUsed,
                                " con confianza ",
                              )
                              .concat(
                                null != (i = e.peerGroupConfidence)
                                  ? i
                                  : "sin dato",
                                ".",
                              )
                          : "Sin peer group usable para comparaci\xf3n fuerte.",
                        o = (
                          null == (t = e.validationFlags) ? void 0 : t.length
                        )
                          ? "Validaci\xf3n: ".concat(
                              e.validationFlags.length,
                              " flags moderan la lectura.",
                            )
                          : "Validaci\xf3n sin flags relevantes para esta cuenta.";
                      return ""
                        .concat(n, " Prioridad ")
                        .concat(e.priorityScore, "/100, severidad ")
                        .concat(e.severity, ", confianza ")
                        .concat(e.confidence, ". ")
                        .concat(r, " ")
                        .concat(o);
                    })(q)),
                    { assessment: q, validationOverlay: _ }
                  );
                })(a, b, { kamPortfolioGmv7d: e, concentrationShare: t });
              S.push(r), R.push(c);
            }
            let w = [...h.entries()].map((e) => {
                let [a] = e,
                  t = S.filter((e) => e.kamId === a);
                return (function (e, a, t) {
                  var o, l, s, u, p, m, v, g, f;
                  let y = a.filter((e) => "critical" === e.status).length,
                    b = a.filter((e) => "at_risk" === e.status).length,
                    h = a.filter(
                      (e) =>
                        e.confidence <
                        t.thresholds.signals.confidence.degradedConfidence,
                    ).length,
                    k = a.filter((e) =>
                      e.signals.some((e) => "concentration_risk" === e.type),
                    ).length,
                    _ = (function (e) {
                      let a = [];
                      return (
                        e.criticalCount >= 2 &&
                          a.push(
                            d({
                              id: "".concat(e.kamId, "-critical-portfolio"),
                              type: "compound_risk",
                              label:
                                "M\xfaltiples cuentas cr\xedticas en el portfolio",
                              severityHint: "critical",
                              evidence: [
                                {
                                  metric: "critical_restaurants",
                                  value: e.criticalCount,
                                  note: "El KAM concentra varias cuentas con presi\xf3n alta.",
                                },
                              ],
                            }),
                          ),
                        e.atRiskCount >= 2 &&
                          a.push(
                            d({
                              id: "".concat(e.kamId, "-portfolio-pressure"),
                              type: "absolute_deterioration",
                              label: "Portfolio bajo presi\xf3n operativa",
                              severityHint: "at_risk",
                              evidence: [
                                {
                                  metric: "at_risk_restaurants",
                                  value: e.atRiskCount,
                                  note: "Hay varias cuentas en deterioro moderado.",
                                },
                              ],
                            }),
                          ),
                        e.concentrationRiskCount > 0 &&
                          a.push(
                            d({
                              id: "".concat(e.kamId, "-concentration"),
                              type: "concentration_risk",
                              label:
                                "Concentraci\xf3n de riesgo en pocas cuentas",
                              severityHint: "at_risk",
                              evidence: [
                                {
                                  metric: "concentration_risk_restaurants",
                                  value: e.concentrationRiskCount,
                                  note: "Una o m\xe1s cuentas pesan demasiado en el portfolio.",
                                },
                              ],
                            }),
                          ),
                        e.lowConfidenceCount > 0 &&
                          a.push(
                            d({
                              id: "".concat(e.kamId, "-validation"),
                              type: "data_quality_risk",
                              label:
                                "Parte del portfolio requiere validar datos",
                              severityHint: "watchlist",
                              evidence: [
                                {
                                  metric: "low_confidence_restaurants",
                                  value: e.lowConfidenceCount,
                                  note: "La ejecuci\xf3n debe ser m\xe1s prudente en estas cuentas.",
                                },
                              ],
                              affectsPriority: !1,
                            }),
                          ),
                        a
                      );
                    })({
                      kamId:
                        null !=
                        (p =
                          null != (u = null == e ? void 0 : e.kamId)
                            ? u
                            : null == (o = a[0])
                              ? void 0
                              : o.kamId)
                          ? p
                          : "unknown-kam",
                      criticalCount: y,
                      atRiskCount: b,
                      lowConfidenceCount: h,
                      concentrationRiskCount: k,
                    }),
                    S = (function (e, a) {
                      let t = 0;
                      for (let i of e)
                        "critical" === i.status
                          ? (t += a.weights.kam.criticalRestaurant)
                          : "at_risk" === i.status
                            ? (t += a.weights.kam.atRiskRestaurant)
                            : "watchlist" === i.status &&
                              (t += a.weights.kam.watchlistRestaurant),
                          i.signals.some(
                            (e) => "concentration_risk" === e.type,
                          ) && (t += a.weights.kam.concentrationRisk),
                          i.confidence <
                            a.thresholds.signals.confidence.lowConfidence &&
                            (t -= a.weights.kam.lowConfidencePenalty);
                      let r = e.length
                          ? n(
                              e.reduce((e, a) => e + a.confidence, 0) /
                                e.length,
                            )
                          : 1,
                        o = new Map();
                      for (let a of e)
                        for (let e of a.signals) o.has(e.id) || o.set(e.id, e);
                      return {
                        priorityScore: i(t, 0, 100),
                        topSignals: [...o.values()]
                          .sort(
                            (e, t) =>
                              a.weights.signalImpact[t.severityHint] -
                              a.weights.signalImpact[e.severityHint],
                          )
                          .slice(0, 5),
                        confidence: r,
                      };
                    })(a, t),
                    R =
                      y > 0 || S.priorityScore >= 65
                        ? "critical"
                        : b > 0 || S.priorityScore >= 35
                          ? "under_pressure"
                          : "stable",
                    w = a
                      .filter(
                        (e) =>
                          "critical" === e.status || "at_risk" === e.status,
                      )
                      .sort((e, a) => a.priorityScore - e.priorityScore)
                      .slice(0, 5)
                      .map((e) => {
                        var a;
                        return (
                          (a = e.restaurantName),
                          {
                            restaurantId: e.restaurantId,
                            restaurantName: a,
                            status: e.status,
                            priorityScore: e.priorityScore,
                            severity: e.severity,
                            confidence: e.confidence,
                            whyFlagged: e.whyFlagged,
                          }
                        );
                      }),
                    C = c({
                      kamId:
                        null !=
                        (v =
                          null != (m = null == e ? void 0 : e.kamId)
                            ? m
                            : null == (l = a[0])
                              ? void 0
                              : l.kamId)
                          ? v
                          : "unknown-kam",
                      kamName: null == e ? void 0 : e.kamName,
                      portfolioSize: a.length,
                      portfolioStatus: R,
                      priorityScore: S.priorityScore,
                      confidence: S.confidence,
                      portfolioSummary: "",
                      topSignals: _,
                      topRecommendations: [],
                      criticalRestaurants: w,
                      portfolioBreakdown: {
                        criticalCount: 0,
                        atRiskCount: 0,
                        watchlistCount: 0,
                        stableCount: 0,
                        averageRestaurantPriority: 0,
                        lowConfidenceCount: 0,
                        concentrationRiskCount: 0,
                      },
                    }),
                    M = {
                      kamId:
                        null !=
                        (f =
                          null != (g = null == e ? void 0 : e.kamId)
                            ? g
                            : null == (s = a[0])
                              ? void 0
                              : s.kamId)
                          ? f
                          : "unknown-kam",
                      kamName: null == e ? void 0 : e.kamName,
                      portfolioSize: a.length,
                      portfolioStatus: R,
                      priorityScore: S.priorityScore,
                      confidence: S.confidence,
                      portfolioSummary: "",
                      topSignals: _.length ? _ : S.topSignals,
                      topRecommendations: [C.recommendation],
                      criticalRestaurants: w,
                      portfolioBreakdown: {
                        criticalCount: y,
                        atRiskCount: b,
                        watchlistCount: a.filter(
                          (e) => "watchlist" === e.status,
                        ).length,
                        stableCount: a.filter((e) => "stable" === e.status)
                          .length,
                        averageRestaurantPriority: r(
                          a.map((e) => e.priorityScore),
                        ),
                        lowConfidenceCount: h,
                        concentrationRiskCount: k,
                      },
                      validationSummary: h
                        ? "".concat(
                            h,
                            " cuentas requieren prudencia por confianza reducida.",
                          )
                        : void 0,
                      kamBriefing: void 0,
                    };
                  return (
                    (M.portfolioSummary =
                      "critical" === R
                        ? "Portfolio con presi\xf3n alta y necesidad de foco inmediato."
                        : "under_pressure" === R
                          ? "Portfolio con presi\xf3n moderada; conviene priorizar cuentas clave."
                          : "Portfolio estable en esta corrida."),
                    t.featureFlags.enableKamBriefing &&
                      (M.kamBriefing = ""
                        .concat(M.portfolioSummary, " ")
                        .concat(C.nextStep.label, ".")),
                    M
                  );
                })(k.get(a), t, b);
              }),
              C = {
                portfolioStatus: w.some((e) => "critical" === e.portfolioStatus)
                  ? "critical"
                  : w.some((e) => "under_pressure" === e.portfolioStatus)
                    ? "under_pressure"
                    : "stable",
                totalRestaurants: S.length,
                totalKams: w.length,
                concentrationRiskCount: S.filter((e) =>
                  e.signals.some((e) => "concentration_risk" === e.type),
                ).length,
                averagePriorityScore: r(S.map((e) => e.priorityScore)),
                highestPriorityRestaurants: S.sort(
                  (e, a) => a.priorityScore - e.priorityScore,
                )
                  .slice(0, 5)
                  .map((e) => ({
                    restaurantId: e.restaurantId,
                    restaurantName: e.restaurantName,
                    status: e.status,
                    priorityScore: e.priorityScore,
                    severity: e.severity,
                    confidence: e.confidence,
                    whyFlagged: e.whyFlagged,
                  })),
                kamsUnderPressure: w
                  .filter((e) => "stable" !== e.portfolioStatus)
                  .map((e) => ({
                    kamId: e.kamId,
                    kamName: e.kamName,
                    priorityScore: e.priorityScore,
                    portfolioStatus: e.portfolioStatus,
                  })),
              },
              M = [
                ...(u = {
                  restaurants: S,
                  kams: w,
                  topRestaurantCount: b.thresholds.alerts.topRestaurantCount,
                  topKamCount: b.thresholds.alerts.topKamCount,
                }).restaurants
                  .filter((e) => "stable" !== e.status)
                  .sort((e, a) => a.priorityScore - e.priorityScore)
                  .slice(0, u.topRestaurantCount)
                  .map((e) => ({
                    alertId: "restaurant-".concat(e.restaurantId),
                    entityType: "restaurant",
                    entityId: e.restaurantId,
                    title: e.restaurantName
                      ? "".concat(e.restaurantName, " requiere atenci\xf3n")
                      : "Restaurante ".concat(
                          e.restaurantId,
                          " requiere atenci\xf3n",
                        ),
                    priorityScore: e.priorityScore,
                    severity: e.severity,
                    whyFlagged: e.whyFlagged,
                    recommendedAction: e.recommendedAction,
                    nextBestStep: e.nextBestStep,
                    confidence: e.confidence,
                    createdFromSignals: e.signals.map((e) => e.id),
                  })),
                ...u.kams
                  .filter((e) => "stable" !== e.portfolioStatus)
                  .sort((e, a) => a.priorityScore - e.priorityScore)
                  .slice(0, u.topKamCount)
                  .map((e) => {
                    var a;
                    let t = c(e);
                    return {
                      alertId: "kam-".concat(e.kamId),
                      entityType: "kam",
                      entityId: e.kamId,
                      title: "".concat(
                        null != (a = e.kamName) ? a : e.kamId,
                        " bajo presi\xf3n",
                      ),
                      priorityScore: e.priorityScore,
                      severity:
                        e.priorityScore >= 70
                          ? "high"
                          : e.priorityScore >= 40
                            ? "medium"
                            : "low",
                      whyFlagged: [e.portfolioSummary],
                      recommendedAction: t.recommendation,
                      nextBestStep: t.nextStep,
                      confidence: e.confidence,
                      createdFromSignals: e.topSignals.map((e) => e.id),
                    };
                  }),
              ].sort((e, a) => a.priorityScore - e.priorityScore),
              I = (function (e) {
                let { restaurants: a, kams: t, metadata: i, alertCount: n } = e,
                  o = new Map(),
                  l = new Map();
                for (let e of a) {
                  var s, c;
                  for (let a of e.signals)
                    o.set(a.type, (null != (s = o.get(a.type)) ? s : 0) + 1);
                  l.set(
                    e.recommendedAction.code,
                    (null != (c = l.get(e.recommendedAction.code)) ? c : 0) + 1,
                  );
                }
                return {
                  totalRestaurants: a.length,
                  criticalCount: a.filter((e) => "critical" === e.status)
                    .length,
                  atRiskCount: a.filter((e) => "at_risk" === e.status).length,
                  watchlistCount: a.filter((e) => "watchlist" === e.status)
                    .length,
                  stableCount: a.filter((e) => "stable" === e.status).length,
                  topAlertCount: n,
                  kamUnderPressureCount: t.filter(
                    (e) => "stable" !== e.portfolioStatus,
                  ).length,
                  cityRiskSummary: (function (e, a) {
                    let t = new Map();
                    for (let r of e) {
                      var i, n, o;
                      let e =
                          null !=
                          (n =
                            null == (i = a[r.restaurantId]) ? void 0 : i.city)
                            ? n
                            : "unknown",
                        l = null != (o = t.get(e)) ? o : [];
                      l.push(r), t.set(e, l);
                    }
                    return [...t.entries()].map((e) => {
                      let [a, t] = e;
                      return {
                        city: a,
                        restaurantCount: t.length,
                        criticalCount: t.filter((e) => "critical" === e.status)
                          .length,
                        atRiskCount: t.filter((e) => "at_risk" === e.status)
                          .length,
                        averagePriorityScore: r(t.map((e) => e.priorityScore)),
                      };
                    });
                  })(a, i),
                  verticalRiskSummary: (function (e, a) {
                    let t = new Map();
                    for (let r of e) {
                      var i, n, o;
                      let e =
                          null !=
                          (n =
                            null == (i = a[r.restaurantId])
                              ? void 0
                              : i.vertical)
                            ? n
                            : "unknown",
                        l = null != (o = t.get(e)) ? o : [];
                      l.push(r), t.set(e, l);
                    }
                    return [...t.entries()].map((e) => {
                      let [a, t] = e;
                      return {
                        vertical: a,
                        restaurantCount: t.length,
                        criticalCount: t.filter((e) => "critical" === e.status)
                          .length,
                        atRiskCount: t.filter((e) => "at_risk" === e.status)
                          .length,
                        averagePriorityScore: r(t.map((e) => e.priorityScore)),
                      };
                    });
                  })(a, i),
                  topSignalsSummary: [...o.entries()]
                    .sort((e, a) => a[1] - e[1])
                    .slice(0, 5)
                    .map((e) => {
                      let [a, t] = e;
                      return { signalType: a, count: t };
                    }),
                  interventionSummary: [...l.entries()]
                    .sort((e, a) => a[1] - e[1])
                    .map((e) => {
                      let [a, t] = e;
                      return { recommendationCode: a, count: t };
                    }),
                };
              })({
                restaurants: S,
                kams: w,
                portfolio: C,
                metadata: _,
                alertCount: M.length,
              });
            return {
              restaurants: S,
              kams: w,
              portfolio: C,
              summary: I,
              alerts: M,
              validationOverlays: R,
            };
          })(b).restaurants[0];
          return {
            headline:
              "El agente detect\xf3 presi\xf3n operativa concentrada en cuentas clave.",
            detected:
              null != (e = a.whyFlagged[0])
                ? e
                : "Se detectaron se\xf1ales operativas relevantes.",
            whyItMatters: a.businessSummary,
            recommendation: a.recommendedAction.label,
            nextStep: a.nextBestStep.label,
            signals: a.signals.map((e) => {
              var t, i;
              return {
                id: e.id,
                title: e.label,
                detection:
                  null != (i = null == (t = e.evidence[0]) ? void 0 : t.note)
                    ? i
                    : e.label,
                whyItMatters: a.businessSummary,
                recommendation: a.recommendedAction.label,
                nextStep: a.nextBestStep.label,
                tone:
                  "critical" === e.severityHint
                    ? "critical"
                    : "at_risk" === e.severityHint
                      ? "warning"
                      : "watchlist" === e.severityHint
                        ? "info"
                        : "stable",
              };
            }),
          };
        })(),
        _ = {
          scenario: "baseline",
          scenarioOption: (0, h.o)("baseline"),
          topKpis: [
            {
              id: "revenue-at-risk",
              label: "Revenue en riesgo",
              value: "$2.4M",
              delta: "+12% vs. escenario base",
              insight:
                "Mock controlado para ilustrar presi\xf3n comercial sin f\xf3rmula final.",
              tone: "critical",
            },
            {
              id: "high-priority-kams",
              label: "KAMs bajo presi\xf3n",
              value: "5",
              delta: "2 requieren follow-up hoy",
              insight:
                "Se\xf1al compuesta provisional mientras llega el scoring oficial.",
              tone: "warning",
            },
            {
              id: "restaurants-flagged",
              label: "Restaurantes se\xf1alados",
              value: "18",
              delta: "6 con acci\xf3n recomendada pendiente",
              insight: "Lista priorizada por reglas mock del agente.",
              tone: "warning",
            },
            {
              id: "data-health",
              label: "Salud del dato",
              value: "91%",
              delta: "3 reglas de validaci\xf3n abiertas",
              insight:
                "Indicador visual temporal, no m\xe9trica oficial de calidad.",
              tone: "stable",
            },
          ],
          kamPressureItems: [
            {
              id: "maria-salgado",
              name: "Mar\xeda Salgado",
              segment: "Top Restaurants CDMX",
              pressureLabel: "Alta presi\xf3n por ca\xedda de activaci\xf3n",
              focus: "4 cuentas concentran la se\xf1al cr\xedtica del d\xeda.",
              nextStep:
                "Validar si la ca\xedda es operativa o de carga de datos.",
            },
            {
              id: "diego-rivera",
              name: "Diego Rivera",
              segment: "QSR Norte",
              pressureLabel: "Riesgo medio con tendencia negativa",
              focus: "Aumentaron alertas en restaurantes con promo activa.",
              nextStep: "Revisar cobertura de promos y owners asignados.",
            },
            {
              id: "valeria-gomez",
              name: "Valeria G\xf3mez",
              segment: "Long tail premium",
              pressureLabel: "Se\xf1al temprana de churn comercial",
              focus: "Hay dos cuentas clave con actividad inconsistente.",
              nextStep:
                "Preparar secuencia de recovery con narrativa del agente.",
            },
          ],
          alertSummary: [
            {
              id: "alert-01",
              title: "Restaurantes sin owner operativo",
              owner: "Ops Support",
              status: "Pendiente",
              eta: "Hoy 16:00",
              restaurantId: "burger-lab-cdmx",
            },
            {
              id: "alert-02",
              title: "Desviaci\xf3n entre promo activa y performance",
              owner: "KAM Lead",
              status: "En seguimiento",
              eta: "Hoy 18:30",
              restaurantId: "taco-hub-monterrey",
            },
            {
              id: "alert-03",
              title: "Campos base con cobertura incompleta",
              owner: "Data QA",
              status: "Bloqueando score final",
              eta: "Ma\xf1ana 10:00",
              restaurantId: "pasta-social-polanco",
            },
          ],
          kams: [
            {
              id: "maria-salgado",
              name: "Mar\xeda Salgado",
              portfolio: "Top Restaurants CDMX",
              restaurantsAtRisk: 6,
              openAlerts: 4,
              narrative:
                "Concentra la mayor presi\xf3n comercial del mock actual.",
            },
            {
              id: "diego-rivera",
              name: "Diego Rivera",
              portfolio: "QSR Norte",
              restaurantsAtRisk: 4,
              openAlerts: 3,
              narrative:
                "Tiene se\xf1ales cruzadas entre promo y activaci\xf3n.",
            },
            {
              id: "valeria-gomez",
              name: "Valeria G\xf3mez",
              portfolio: "Long tail premium",
              restaurantsAtRisk: 3,
              openAlerts: 2,
              narrative:
                "Prioridad media con necesidad de validaci\xf3n operativa.",
            },
          ],
          restaurants: [
            {
              id: "burger-lab-cdmx",
              name: "Burger Lab Roma",
              city: "CDMX",
              kamId: "maria-salgado",
              status: "Cr\xedtico",
              whyFlagged:
                "Disminuci\xf3n simult\xe1nea en activaci\xf3n y cobertura de owner.",
              recommendation:
                "Validar insumo operativo y definir recuperaci\xf3n comercial.",
            },
            {
              id: "taco-hub-monterrey",
              name: "Taco Hub Norte",
              city: "Monterrey",
              kamId: "diego-rivera",
              status: "En riesgo",
              whyFlagged:
                "Promoci\xf3n activa con performance por debajo del patr\xf3n esperado.",
              recommendation: "Revisar ejecuci\xf3n promo y acciones del KAM.",
            },
            {
              id: "pasta-social-polanco",
              name: "Pasta Social Polanco",
              city: "CDMX",
              kamId: "valeria-gomez",
              status: "Monitoreo",
              whyFlagged:
                "La narrativa depende de validar el input de coverage.",
              recommendation:
                "Esperar limpieza de dato antes de escalar prioridad final.",
            },
          ],
          validationIssues: [
            {
              id: "dq-01",
              rule: "Owner operativo no puede venir vac\xedo",
              affectedField: "owner_name",
              severity: "critical",
              status: "Abierta",
              note: "Impacta la capacidad de asignar next best step real.",
            },
            {
              id: "dq-02",
              rule: "Promo activa debe tener fecha de vigencia consistente",
              affectedField: "promo_window",
              severity: "warning",
              status: "En revisi\xf3n",
              note: "Evita falsos positivos en alertas promocionales.",
            },
            {
              id: "dq-03",
              rule: "Canal comercial debe mapear a cat\xe1logo vigente",
              affectedField: "channel_type",
              severity: "info",
              status: "Pendiente",
              note: "Preparado para integraci\xf3n del motor de datos.",
            },
          ],
          deckSections: [
            {
              id: "deck-01",
              title: "Narrativa ejecutiva",
              objective:
                "Explicar qu\xe9 detecta el agente y c\xf3mo prioriza.",
              status: "Ruta real con contenido stub controlado",
            },
            {
              id: "deck-02",
              title: "Flujo de demo",
              objective: "Guiar el walkthrough desde dashboard hasta detalle.",
              status: "Listo para conectar con Demo Flow",
            },
            {
              id: "deck-03",
              title: "Dependencias del motor",
              objective:
                "Mostrar qu\xe9 parte es mock y qu\xe9 depender\xe1 de c\xe1lculos oficiales.",
              status: "Visible para evitar sobreventa funcional",
            },
          ],
          agentDigest: k,
        },
        S = "baseline",
        R = "12 abr 2026 \xb7 23:20",
        w = {
          ..._,
          scenario: "promo-risk",
          scenarioOption: (0, h.o)("promo-risk"),
          topKpis: _.topKpis.map((e) =>
            "revenue-at-risk" === e.id
              ? {
                  ...e,
                  value: "$2.9M",
                  delta: "+21% vs. base operativa",
                  insight:
                    "Escenario de demo con promo activa y performance deteriorado en cuentas clave.",
                }
              : "restaurants-flagged" === e.id
                ? {
                    ...e,
                    value: "24",
                    delta: "9 con promoci\xf3n activa bajo revisi\xf3n",
                  }
                : e,
          ),
          kamPressureItems: _.kamPressureItems.map((e) =>
            "diego-rivera" === e.id
              ? {
                  ...e,
                  pressureLabel:
                    "Presi\xf3n alta por promo activa sin respuesta",
                  focus:
                    "Se acumularon desv\xedos en cuentas con campa\xf1a activa y ca\xedda de \xf3rdenes.",
                  nextStep:
                    "Separar falla de ejecuci\xf3n promo vs. problema operativo antes de escalar.",
                }
              : e,
          ),
          alertSummary: [
            {
              id: "alert-01",
              title: "Promos activas con ca\xedda de \xf3rdenes",
              owner: "KAM Lead",
              status: "Bloqueando score final",
              eta: "Hoy 14:30",
              restaurantId: "taco-hub-monterrey",
            },
            ..._.alertSummary.slice(1),
          ],
          restaurants: _.restaurants.map((e) =>
            "taco-hub-monterrey" === e.id
              ? {
                  ...e,
                  status: "Cr\xedtico",
                  whyFlagged:
                    "Promoci\xf3n activa con ca\xedda sostenida de \xf3rdenes y se\xf1al operativa desalineada.",
                  recommendation:
                    "Revisar ejecuci\xf3n promo, inventario y owner antes del siguiente corte.",
                }
              : e,
          ),
          agentDigest: {
            ..._.agentDigest,
            headline:
              "El agente detect\xf3 presi\xf3n promocional concentrada en cuentas con alta exposici\xf3n.",
            recommendation:
              "Separar de inmediato desviaci\xf3n promocional, cobertura comercial y calidad de input.",
            nextStep:
              "Abrir Alertas y bajar primero a restaurantes con promo activa y ca\xedda persistente.",
          },
        },
        C = {
          ..._,
          scenario: "coverage-gap",
          scenarioOption: (0, h.o)("coverage-gap"),
          topKpis: _.topKpis.map((e) =>
            "data-health" === e.id
              ? {
                  ...e,
                  value: "83%",
                  delta: "5 reglas cr\xedticas abiertas",
                  insight:
                    "Escenario donde la cobertura del input obliga a mayor prudencia operativa.",
                }
              : "high-priority-kams" === e.id
                ? {
                    ...e,
                    value: "3",
                    delta: "La prioridad depende de cerrar vac\xedos de dato",
                  }
                : e,
          ),
          alertSummary: [
            {
              id: "alert-coverage-01",
              title: "Owners operativos faltantes en cuentas prioritarias",
              owner: "Ops Support",
              status: "Bloqueando score final",
              eta: "Hoy 15:00",
              restaurantId: "burger-lab-cdmx",
            },
            ..._.alertSummary.slice(1),
          ],
          validationIssues: [
            {
              id: "dq-coverage-01",
              rule: "Owner operativo no puede venir vac\xedo",
              affectedField: "owner_name",
              severity: "critical",
              status: "Abierta",
              note: "En este escenario afecta directamente la trazabilidad del siguiente paso.",
            },
            {
              id: "dq-coverage-02",
              rule: "Cobertura promo debe mapear a cat\xe1logo vigente",
              affectedField: "promo_window",
              severity: "critical",
              status: "Abierta",
              note: "Sin este control se elevan falsos positivos en la cola operativa.",
            },
            ..._.validationIssues.slice(1),
          ],
          restaurants: _.restaurants.map((e) =>
            "burger-lab-cdmx" === e.id
              ? {
                  ...e,
                  status: "En riesgo",
                  whyFlagged:
                    "La se\xf1al sigue presente, pero la cobertura incompleta obliga a prudencia antes de concluir.",
                  recommendation:
                    "Validar owners y campos base antes de escalar el caso como cr\xedtico.",
                }
              : e,
          ),
          agentDigest: {
            ..._.agentDigest,
            headline:
              "El agente detect\xf3 brechas de cobertura que degradan la confianza operacional.",
            detected:
              "Hay se\xf1ales visibles, pero parte del input clave a\xfan exige validaci\xf3n antes de priorizar con dureza.",
            whyItMatters:
              "Cuando el dato base est\xe1 incompleto, la decisi\xf3n correcta es sostener prudencia expl\xedcita en vez de sobrerreaccionar.",
            recommendation:
              "Cerrar primero los vac\xedos de cobertura que afectan owner, promo y trazabilidad.",
            nextStep:
              "Entrar a Validation y confirmar qu\xe9 casos pueden seguir a cola operativa y cu\xe1les deben esperar.",
          },
        },
        M = { baseline: _, "promo-risk": w, "coverage-gap": C };
      function I(e) {
        var a;
        return null != (a = M[e]) ? a : M[S];
      }
    },
    9052: (e, a, t) => {
      t.d(a, { o: () => r });
      var i = t(5453),
        n = t(6853);
      let r = (0, i.v)((e) => ({
        scenario: n.nq,
        lastRefresh: n.xp,
        setScenario: (a) => e({ scenario: a, lastRefresh: n.xp }),
        resetDemo: () => e({ scenario: n.nq, lastRefresh: n.xp }),
      }));
    },
  },
]);
