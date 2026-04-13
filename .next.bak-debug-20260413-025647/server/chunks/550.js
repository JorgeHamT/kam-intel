(exports.id = 550),
  (exports.ids = [550]),
  (exports.modules = {
    736: (e, a, t) => {
      Promise.resolve().then(t.t.bind(t, 6346, 23)),
        Promise.resolve().then(t.t.bind(t, 7924, 23)),
        Promise.resolve().then(t.t.bind(t, 5656, 23)),
        Promise.resolve().then(t.t.bind(t, 99, 23)),
        Promise.resolve().then(t.t.bind(t, 8243, 23)),
        Promise.resolve().then(t.t.bind(t, 8827, 23)),
        Promise.resolve().then(t.t.bind(t, 2763, 23)),
        Promise.resolve().then(t.t.bind(t, 7173, 23));
    },
    1008: (e, a, t) => {
      Promise.resolve().then(t.t.bind(t, 6444, 23)),
        Promise.resolve().then(t.t.bind(t, 6042, 23)),
        Promise.resolve().then(t.t.bind(t, 8170, 23)),
        Promise.resolve().then(t.t.bind(t, 9477, 23)),
        Promise.resolve().then(t.t.bind(t, 9345, 23)),
        Promise.resolve().then(t.t.bind(t, 2089, 23)),
        Promise.resolve().then(t.t.bind(t, 6577, 23)),
        Promise.resolve().then(t.t.bind(t, 1307, 23));
    },
    1135: () => {},
    1272: (e, a, t) => {
      "use strict";
      t.d(a, { o: () => n });
      var i = t(6787),
        r = t(5653);
      let n = (0, i.v)((e) => ({
        scenario: r.nq,
        lastRefresh: r.xp,
        setScenario: (a) => e({ scenario: a, lastRefresh: r.xp }),
        resetDemo: () => e({ scenario: r.nq, lastRefresh: r.xp }),
      }));
    },
    3271: (e, a, t) => {
      "use strict";
      t.d(a, { Sidebar: () => i });
      let i = (0, t(2907).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call Sidebar() from the server but Sidebar is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "/Users/jorge/ProyectosAI/kam-intel/src/components/shell/sidebar.tsx",
        "Sidebar",
      );
    },
    4208: (e, a, t) => {
      "use strict";
      t.d(a, { Header: () => i });
      let i = (0, t(2907).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call Header() from the server but Header is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "/Users/jorge/ProyectosAI/kam-intel/src/components/shell/header.tsx",
        "Header",
      );
    },
    5018: (e, a, t) => {
      Promise.resolve().then(t.bind(t, 7724)),
        Promise.resolve().then(t.bind(t, 5423)),
        Promise.resolve().then(t.bind(t, 8233));
    },
    5423: (e, a, t) => {
      "use strict";
      t.d(a, { MobileNav: () => c });
      var i = t(687),
        r = t(5814),
        n = t.n(r),
        o = t(6189),
        s = t(7766);
      let l = [
        { href: "/", label: "Dashboard" },
        { href: "/kams", label: "KAMs" },
        { href: "/alerts", label: "Alertas" },
        { href: "/validation", label: "Datos" },
      ];
      function c() {
        let e = (0, o.usePathname)();
        return (0, i.jsx)("nav", {
          className:
            "fixed bottom-4 left-4 right-4 z-30 rounded-3xl border border-white/70 bg-white/95 p-2 shadow-panel lg:hidden",
          children: (0, i.jsx)("div", {
            className: "grid grid-cols-4 gap-2",
            children: l.map((a) => {
              let t = e === a.href || ("/" !== a.href && e.startsWith(a.href));
              return (0, i.jsx)(
                n(),
                {
                  href: a.href,
                  className: (0, s.cn)(
                    "rounded-2xl px-3 py-3 text-center text-xs font-semibold",
                    t ? "bg-brand text-white" : "text-slate-600",
                  ),
                  children: a.label,
                },
                a.href,
              );
            }),
          }),
        });
      }
    },
    5653: (e, a, t) => {
      "use strict";
      function i(e, a, t) {
        return Math.min(Math.max(e, a), t);
      }
      function r(e, a = 2) {
        let t = 10 ** a;
        return Math.round(e * t) / t;
      }
      function n(e) {
        return e.length ? r(e.reduce((e, a) => e + a, 0) / e.length) : 0;
      }
      function o(e) {
        return r(e.reduce((e, a) => e + a, 0));
      }
      function s(e, a, t) {
        return { code: e, label: a, rationale: t };
      }
      function l(e, a) {
        return { code: e, label: a };
      }
      function c(e) {
        return "critical" === e.portfolioStatus
          ? {
              recommendation: s(
                "portfolio_escalation",
                "Escalar revisi\xf3n del portfolio",
                "La presi\xf3n est\xe1 concentrada en varias cuentas relevantes del portfolio.",
              ),
              nextStep: l(
                "escalate_portfolio",
                "Escalar revisi\xf3n del portfolio",
              ),
            }
          : "under_pressure" === e.portfolioStatus
            ? {
                recommendation: s(
                  "priority_review",
                  "Priorizar revisi\xf3n del portfolio",
                  "El portfolio muestra presi\xf3n moderada y conviene alinear foco semanal del KAM.",
                ),
                nextStep: l("review_today", "Revisar esta cuenta hoy"),
              }
            : {
                recommendation: s(
                  "monitor_only",
                  "Monitoreo del portfolio",
                  "No hay presi\xf3n sist\xe9mica fuerte en el portfolio del KAM.",
                ),
                nextStep: l(
                  "monitor_next_window",
                  "Monitorear en la siguiente ventana",
                ),
              };
      }
      function d(e) {
        return {
          id: e.id,
          type: e.type,
          label: e.label,
          severityHint: e.severityHint,
          evidence: e.evidence,
          confidenceEffect: e.confidenceEffect ?? 0,
          affectsPriority: e.affectsPriority ?? !0,
          affectsRecommendation: e.affectsRecommendation ?? !0,
        };
      }
      t.d(a, { nq: () => _, xp: () => w, cz: () => M });
      let u = ["city_vertical", "vertical", "city", "global"];
      function m(e, a) {
        if (!e?.candidates.length)
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
        let r = t.find(
          (e) => e.sampleSize >= a.confidence.peerGroupRules.cautionMinimum,
        );
        return r
          ? {
              candidate: r,
              confidence: a.confidence.peerGroupRules.cautionScore,
              caution: !0,
            }
          : {
              candidate: t[t.length - 1],
              confidence: a.confidence.peerGroupRules.fallbackScore,
              caution: !0,
            };
      }
      function p(e, a, t) {
        return e <= 0 ? 0 : r(i((e / a) * 100, 0, 100) * t);
      }
      function v(e, a) {
        if ("number" == typeof a)
          return e.includes("pct")
            ? null === a
              ? "sin dato"
              : `${r(a)}%`
            : null === a
              ? "sin dato"
              : String(r(a));
        return "boolean" == typeof a
          ? a
            ? "s\xed"
            : "no"
          : String(a ?? "sin dato");
      }
      function g(e, a, t) {
        return { code: e, label: a, rationale: t };
      }
      function f(e, a) {
        return { code: e, label: a };
      }
      let h = {
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
      var y = t(7243);
      let k = (function () {
          let e = (function (e, a) {
            var t;
            let s = (function (e = {}) {
                return {
                  thresholds: { ...h.thresholds, ...e.thresholds },
                  weights: { ...h.weights, ...e.weights },
                  confidence: { ...h.confidence, ...e.confidence },
                  featureFlags: { ...h.featureFlags, ...e.featureFlags },
                };
              })(void 0),
              l = (function (e) {
                let a = new Map();
                for (let t of e) {
                  let e = a.get(t.kamId) ?? [];
                  e.push(t), a.set(t.kamId, e);
                }
                return a;
              })(e.restaurants),
              u = new Map((e.kams ?? []).map((e) => [e.kamId, e])),
              b = Object.fromEntries(
                e.restaurants.map((e) => [
                  e.restaurantId,
                  { city: e.city, vertical: e.vertical },
                ]),
              ),
              y = [],
              k = [];
            for (let a of e.restaurants) {
              let e = (l.get(a.kamId) ?? []).reduce(
                  (e, a) => e + (a.gmvProxy7d ?? 0),
                  0,
                ),
                t = e > 0 ? (a.gmvProxy7d ?? 0) / e : 0,
                { assessment: n, validationOverlay: c } = (function (e, a, t) {
                  let n = (function (e, a, t) {
                      let i = [],
                        r = a.thresholds.signals,
                        n = m(e.benchmark, a).candidate,
                        o = "stable";
                      if (
                        ((e.deltaRatingRecalc ?? 0) <=
                          r.absolute.deltaRatingCritical ||
                        (e.tasaCancelacionPct ?? 0) >=
                          r.absolute.cancellationCriticalPct ||
                        (e.tiempoEntregaAvgMin ?? 0) >=
                          r.absolute.deliveryCriticalMin ||
                        (e.quejas7d ?? 0) >= r.absolute.complaintsCritical ||
                        (e.npsScore ?? 100) <= r.absolute.npsCritical
                          ? (o = "critical")
                          : ((e.deltaRatingRecalc ?? 0) <=
                              r.absolute.deltaRatingRisk ||
                              (e.tasaCancelacionPct ?? 0) >=
                                r.absolute.cancellationRiskPct ||
                              (e.tiempoEntregaAvgMin ?? 0) >=
                                r.absolute.deliveryRiskMin ||
                              (e.quejas7d ?? 0) >= r.absolute.complaintsRisk ||
                              (e.npsScore ?? 100) <= r.absolute.npsRisk) &&
                            (o = "at_risk"),
                        "stable" !== o &&
                          i.push(
                            d({
                              id: `${e.restaurantId}-absolute`,
                              type: "absolute_deterioration",
                              label:
                                "Deterioro absoluto en m\xe9tricas operativas",
                              severityHint: o,
                              evidence: [
                                {
                                  metric: "delta_rating_recalc",
                                  value: e.deltaRatingRecalc,
                                  reference: r.absolute.deltaRatingRisk,
                                  note: "Ca\xedda reciente de rating recalculado.",
                                },
                                {
                                  metric: "tasa_cancelacion_pct",
                                  value: e.tasaCancelacionPct,
                                  reference: r.absolute.cancellationRiskPct,
                                  note: "Cancelaci\xf3n por encima de banda provisional.",
                                },
                                {
                                  metric: "tiempo_entrega_avg_min",
                                  value: e.tiempoEntregaAvgMin,
                                  reference: r.absolute.deliveryRiskMin,
                                  note: "Tiempo de entrega elevado frente al umbral provisional.",
                                },
                              ],
                            }),
                          ),
                        n)
                      ) {
                        let a = n.comparisons,
                          t = [
                            a.delta_rating_recalc?.deltaToMedian !== null &&
                              a.delta_rating_recalc?.deltaToMedian !== void 0 &&
                              a.delta_rating_recalc.deltaToMedian <=
                                r.relative.peerDeltaRisk,
                            a.tasa_cancelacion_pct?.deltaToMedian !== null &&
                              a.tasa_cancelacion_pct?.deltaToMedian !==
                                void 0 &&
                              a.tasa_cancelacion_pct.deltaToMedian >=
                                r.relative.peerCancellationRisk,
                            a.tiempo_entrega_avg_min?.deltaToMedian !== null &&
                              a.tiempo_entrega_avg_min?.deltaToMedian !==
                                void 0 &&
                              a.tiempo_entrega_avg_min.deltaToMedian >=
                                r.relative.peerDeliveryRisk,
                            a.quejas_7d?.deltaToMedian !== null &&
                              a.quejas_7d?.deltaToMedian !== void 0 &&
                              a.quejas_7d.deltaToMedian >=
                                r.relative.peerComplaintsRisk,
                            a.nps_score?.deltaToMedian !== null &&
                              a.nps_score?.deltaToMedian !== void 0 &&
                              a.nps_score.deltaToMedian <=
                                r.relative.peerNpsRisk,
                          ].filter(Boolean).length;
                        t > 0 &&
                          i.push(
                            d({
                              id: `${e.restaurantId}-relative`,
                              type: "relative_deterioration",
                              label:
                                "Desempe\xf1o por debajo de peers comparables",
                              severityHint: t >= 3 ? "critical" : "at_risk",
                              evidence: Object.entries(a)
                                .filter(
                                  ([, e]) =>
                                    e?.deltaToMedian !== null &&
                                    e?.deltaToMedian !== void 0,
                                )
                                .slice(0, 4)
                                .map(([e, a]) => ({
                                  metric: e,
                                  value: a?.entityValue ?? null,
                                  reference: a?.peerMedian ?? null,
                                  note: "Comparaci\xf3n contra la mediana del peer group seleccionado.",
                                })),
                            }),
                          );
                      }
                      if (
                        (e.varOrdenesPctRecalc ?? 0) <=
                          r.momentum.ordersDropRiskPct &&
                        (e.deltaRatingRecalc ?? 0) <= r.absolute.deltaRatingRisk
                      ) {
                        let a =
                          (e.ageDaysRecalc ?? Number.MAX_SAFE_INTEGER) <=
                          r.momentum.recentAccountDays;
                        i.push(
                          d({
                            id: `${e.restaurantId}-momentum`,
                            type: "accelerated_deterioration",
                            label: "Deterioro acelerado en corto plazo",
                            severityHint:
                              a ||
                              (e.varOrdenesPctRecalc ?? 0) <=
                                r.momentum.ordersDropCriticalPct
                                ? "critical"
                                : "at_risk",
                            evidence: [
                              {
                                metric: "var_ordenes_pct_recalc",
                                value: e.varOrdenesPctRecalc,
                                reference: r.momentum.ordersDropRiskPct,
                                note: "Ca\xedda de \xf3rdenes en la ventana reciente.",
                              },
                              {
                                metric: "age_days_recalc",
                                value: e.ageDaysRecalc,
                                reference: r.momentum.recentAccountDays,
                                note: "Cuentas nuevas o recientes requieren lectura conservadora.",
                              },
                            ],
                          }),
                        );
                      }
                      let s = i.reduce(
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
                        i.length >= 2 &&
                          "stable" !== s &&
                          i.push(
                            d({
                              id: `${e.restaurantId}-compound`,
                              type: "compound_risk",
                              label: "Combinaci\xf3n de se\xf1ales operativas",
                              severityHint:
                                i.length >= 3 ? "critical" : "at_risk",
                              evidence: [
                                {
                                  metric: "active_signals",
                                  value: i.length,
                                  note: "M\xe1s de una se\xf1al activa aumenta la presi\xf3n operativa.",
                                },
                              ],
                            }),
                          ),
                        (e.gmvProxy7d ?? 0) >= r.businessImpact.gmvHigh &&
                          "stable" !== s &&
                          i.push(
                            d({
                              id: `${e.restaurantId}-impact`,
                              type: "business_impact",
                              label: "Impacto de negocio relevante",
                              severityHint:
                                (e.gmvProxy7d ?? 0) >=
                                r.businessImpact.gmvVeryHigh
                                  ? "critical"
                                  : "at_risk",
                              evidence: [
                                {
                                  metric: "gmv_proxy_7d",
                                  value: e.gmvProxy7d,
                                  reference: r.businessImpact.gmvHigh,
                                  note: "La cuenta tiene impacto material en GMV proxy.",
                                },
                              ],
                            }),
                          ),
                        a.featureFlags.enableConcentrationRisk &&
                          t.kamPortfolioGmv7d > 0 &&
                          t.concentrationShare >=
                            r.businessImpact.concentrationShareRisk &&
                          i.push(
                            d({
                              id: `${e.restaurantId}-concentration`,
                              type: "concentration_risk",
                              label:
                                "Concentraci\xf3n de riesgo en el portfolio",
                              severityHint:
                                t.concentrationShare >=
                                r.businessImpact.concentrationShareCritical
                                  ? "critical"
                                  : "at_risk",
                              evidence: [
                                {
                                  metric: "portfolio_gmv_share",
                                  value: t.concentrationShare,
                                  reference:
                                    r.businessImpact.concentrationShareRisk,
                                  note: "Esta cuenta concentra una porci\xf3n relevante del portfolio del KAM.",
                                },
                              ],
                            }),
                          ),
                        e.quality?.hasIssues &&
                          i.push(
                            d({
                              id: `${e.restaurantId}-data-quality`,
                              type: "data_quality_risk",
                              label: "Riesgo por calidad de datos",
                              severityHint: e.quality.flags.some(
                                (e) => "error" === e.severity,
                              )
                                ? "at_risk"
                                : "watchlist",
                              evidence: e.quality.flags
                                .slice(0, 3)
                                .map((e) => ({
                                  metric: e.field ?? "validation",
                                  value: e.code,
                                  note: e.message,
                                })),
                              confidenceEffect: -0.15,
                            }),
                          ),
                        a.featureFlags.enableBenchmarkConflict &&
                          e.benchmark?.originalRiskLabel &&
                          "stable" !== s &&
                          e.benchmark.validatedRiskLabel &&
                          e.benchmark.validatedRiskLabel !== s &&
                          i.push(
                            d({
                              id: `${e.restaurantId}-benchmark-conflict`,
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
                        i
                      );
                    })(e, a, t),
                    s = n.some((e) => "benchmark_conflict" === e.type),
                    l = (function (e, a, t = !1) {
                      let n = a.confidence.base,
                        o = [],
                        s = e.quality?.flags ?? [],
                        l = m(e.benchmark, a);
                      for (let e of (l.candidate
                        ? l.caution
                          ? ((n -= a.confidence.penalties.benchmarkCaution),
                            o.push(
                              `Peer group ${l.candidate.key} con muestra limitada (${l.candidate.sampleSize}).`,
                            ))
                          : o.push(
                              `Peer group ${l.candidate.key} con base suficiente (${l.candidate.sampleSize}).`,
                            )
                        : ((n -= a.confidence.penalties.benchmarkMissing),
                          o.push(
                            "Sin benchmark confiable; la comparaci\xf3n relativa es limitada.",
                          )),
                      s))
                        "error" === e.severity
                          ? (n -= a.confidence.penalties.validationError)
                          : "warning" === e.severity &&
                            (n -= a.confidence.penalties.validationWarning);
                      return (
                        e.quality?.degradedConfidence &&
                          ((n -= a.confidence.penalties.lowQualityFlag),
                          o.push(
                            "La calidad de datos obliga a usar la lectura con prudencia.",
                          )),
                        t &&
                          ((n -= a.confidence.penalties.benchmarkConflict),
                          o.push(
                            "Hay conflicto entre benchmark y etiqueta de riesgo previa.",
                          )),
                        o.length ||
                          o.push("Sin penalizaciones relevantes de confianza."),
                        {
                          entityId: e.restaurantId,
                          confidence: r(
                            i(n * l.confidence, a.confidence.minimum, 1),
                          ),
                          confidenceReason: o,
                          degradedByValidation: !!(
                            s.length || e.quality?.degradedConfidence
                          ),
                          relatedValidationFlags: s,
                        }
                      );
                    })(e, a, s),
                    { priorityScore: c, breakdown: u } = (function (
                      e,
                      a,
                      t,
                      n,
                    ) {
                      let s = (function () {
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
                        let a = n.weights.signalImpact[e.severityHint];
                        if (!e.affectsPriority) {
                          s.confidenceAdjustment.push({
                            label: e.label,
                            value: -Math.abs(a / 2),
                            reason:
                              "Se\xf1al informativa o de prudencia que modera la lectura.",
                          });
                          continue;
                        }
                        "absolute_deterioration" === e.type ||
                        "relative_deterioration" === e.type
                          ? s.observedRisk.push({
                              label: e.label,
                              value: a,
                              reason:
                                "Empeoramiento observado en la operaci\xf3n o frente a peers.",
                            })
                          : "accelerated_deterioration" === e.type ||
                              "compound_risk" === e.type
                            ? s.deteriorationMomentum.push({
                                label: e.label,
                                value: a,
                                reason:
                                  "El patr\xf3n reciente sugiere presi\xf3n creciente.",
                              })
                            : s.businessImpact.push({
                                label: e.label,
                                value: a,
                                reason:
                                  "La se\xf1al aumenta la urgencia operativa por impacto o concentraci\xf3n.",
                              });
                      }
                      let l = (e.quality?.flags ?? []).reduce(
                        (e, a) =>
                          "error" === a.severity
                            ? e + n.weights.dataQuality.errorPenalty
                            : "warning" === a.severity
                              ? e + n.weights.dataQuality.warningPenalty
                              : e,
                        0,
                      );
                      l > 0 &&
                        s.confidenceAdjustment.push({
                          label: "Penalizaci\xf3n por validaci\xf3n",
                          value: -l,
                          reason:
                            "La calidad del dato modera la prioridad operativa.",
                        });
                      let c = r((1 - t.confidence) * 20);
                      c > 0 &&
                        s.confidenceAdjustment.push({
                          label: "Ajuste por confianza",
                          value: -c,
                          reason: "Menor confianza reduce urgencia accionable.",
                        });
                      let d = o(s.observedRisk.map((e) => e.value)),
                        u = o(s.deteriorationMomentum.map((e) => e.value)),
                        m = o(s.businessImpact.map((e) => e.value)),
                        v = Math.abs(
                          o(s.confidenceAdjustment.map((e) => e.value)),
                        ),
                        g = {
                          observedRisk: p(d, 40, n.weights.score.observedRisk),
                          deteriorationMomentum: p(
                            u,
                            35,
                            n.weights.score.deteriorationMomentum,
                          ),
                          businessImpact: p(
                            m,
                            35,
                            n.weights.score.businessImpact,
                          ),
                          confidenceAdjustment: -p(
                            v,
                            25,
                            n.weights.score.confidenceAdjustment,
                          ),
                          total: 0,
                        };
                      return (
                        (g.total = i(
                          r(
                            g.observedRisk +
                              g.deteriorationMomentum +
                              g.businessImpact +
                              g.confidenceAdjustment,
                          ),
                          0,
                          100,
                        )),
                        (s.normalized = g),
                        { priorityScore: g.total, priority: g, breakdown: s }
                      );
                    })(e, n, l, a),
                    h =
                      n.some((e) => "critical" === e.severityHint) ||
                      c >= a.thresholds.status.critical
                        ? "critical"
                        : n.some((e) => "at_risk" === e.severityHint) ||
                            c >= a.thresholds.status.atRisk
                          ? "at_risk"
                          : n.some((e) => "watchlist" === e.severityHint) ||
                              c >= a.thresholds.status.watchlist
                            ? "watchlist"
                            : "stable",
                    b =
                      c >= a.thresholds.severity.high
                        ? "high"
                        : c >= a.thresholds.severity.medium
                          ? "medium"
                          : "low",
                    y = m(e.benchmark, a),
                    k = Object.entries(y.candidate?.comparisons ?? {})
                      .filter(([, e]) => e)
                      .slice(0, 4)
                      .map(([e, a]) => ({
                        metric: e,
                        entityValue: a?.entityValue ?? null,
                        peerMedian: a?.peerMedian ?? null,
                        deltaToMedian: a?.deltaToMedian ?? null,
                      })),
                    x = y.candidate
                      ? {
                          peerGroupUsed: y.candidate.key,
                          peerGroupType: y.candidate.type,
                          peerGroupConfidence: y.confidence,
                          sampleSize: y.candidate.sampleSize,
                          notableDeltas: k,
                          benchmarkConflict: s,
                        }
                      : void 0,
                    { recommendedAction: _, nextBestStep: w } = (function (e) {
                      let {
                          status: a,
                          confidence: t,
                          signals: i,
                          config: r,
                        } = e,
                        n = i.some((e) => "data_quality_risk" === e.type),
                        o = i.some((e) => "business_impact" === e.type),
                        s = i.some((e) => "compound_risk" === e.type);
                      return n &&
                        t <= r.thresholds.signals.confidence.degradedConfidence
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
                              r.thresholds.signals.confidence.degradedConfidence
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
                          : "critical" === a || ("at_risk" === a && s)
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
                      status: h,
                      confidence: l.confidence,
                      signals: n,
                      config: a,
                    }),
                    S = {
                      restaurantId: e.restaurantId,
                      restaurantName: e.restaurantName,
                      kamId: e.kamId,
                      status: h,
                      priorityScore: c,
                      severity: b,
                      confidence: l.confidence,
                      peerGroupUsed: x?.peerGroupUsed,
                      peerGroupConfidence: x?.peerGroupConfidence,
                      signals: n,
                      scoreBreakdown: u,
                      benchmark: x,
                      whyFlagged: (function (e) {
                        var a;
                        let t = e.signals
                            .filter((e) => e.affectsRecommendation)
                            .slice(0, 3),
                          i = t[0],
                          r = t.slice(1),
                          n = i?.evidence[0],
                          o = [];
                        return (
                          i &&
                            o.push(
                              `Se\xf1al principal: ${i.label}. Evidencia base: ${n?.metric ?? "sin m\xe9trica"} en ${v(n?.metric ?? "", n?.value ?? null)}.`,
                            ),
                          r.length > 0 &&
                            o.push(
                              `Se\xf1ales de soporte: ${r.map((e) => e.label).join(", ")}.`,
                            ),
                          o.push(
                            (function (e) {
                              if (!e?.peerGroupUsed)
                                return "Sin referencia benchmark s\xf3lida en esta corrida.";
                              let a = e.notableDeltas[0];
                              return a
                                ? `Referencia benchmark: ${a.metric} vs mediana de ${e.peerGroupUsed} (${v(a.metric, a.entityValue)} vs ${v(a.metric, a.peerMedian)}).`
                                : `Benchmark contra ${e.peerGroupUsed} con muestra ${e.sampleSize ?? "sin dato"}.`;
                            })(e.benchmark),
                          ),
                          o.push(
                            `Nivel de confianza: ${(a = e.confidence) >= 0.85 ? "alta" : a >= 0.7 ? "media" : "reducida"} (${e.confidence}).`,
                          ),
                          e.validationFlagsCount &&
                            e.validationFlagsCount > 0 &&
                            o.push(
                              e.validationNote
                                ? `Nota de validaci\xf3n: ${e.validationNote}`
                                : `Nota de validaci\xf3n: ${e.validationFlagsCount} flags afectan la lectura.`,
                            ),
                          o
                        );
                      })({
                        signals: n,
                        confidence: l.confidence,
                        benchmark: x,
                        validationNote: e.quality?.note,
                        validationFlagsCount: e.quality?.flags.length ?? 0,
                      }),
                      recommendedAction: _,
                      nextBestStep: w,
                      businessSummary: "",
                      validationFlags: e.quality?.flags,
                      validationNote: e.quality?.note,
                    };
                  return (
                    (S.businessSummary = (function (e) {
                      let a =
                          "critical" === e.status
                            ? "Cuenta bajo presi\xf3n operativa relevante."
                            : "at_risk" === e.status
                              ? "Cuenta con deterioro que requiere seguimiento."
                              : "watchlist" === e.status
                                ? "Cuenta a observar con se\xf1ales tempranas."
                                : "Cuenta sin presi\xf3n operativa relevante en esta corrida.",
                        t = e.benchmark?.peerGroupUsed
                          ? `Peer group usado: ${e.benchmark.peerGroupUsed} con confianza ${e.peerGroupConfidence ?? "sin dato"}.`
                          : "Sin peer group usable para comparaci\xf3n fuerte.",
                        i = e.validationFlags?.length
                          ? `Validaci\xf3n: ${e.validationFlags.length} flags moderan la lectura.`
                          : "Validaci\xf3n sin flags relevantes para esta cuenta.";
                      return `${a} Prioridad ${e.priorityScore}/100, severidad ${e.severity}, confianza ${e.confidence}. ${t} ${i}`;
                    })(S)),
                    { assessment: S, validationOverlay: l }
                  );
                })(a, s, { kamPortfolioGmv7d: e, concentrationShare: t });
              y.push(n), k.push(c);
            }
            let x = [...l.entries()].map(([e]) => {
                let a = y.filter((a) => a.kamId === e);
                return (function (e, a, t) {
                  let o = a.filter((e) => "critical" === e.status).length,
                    s = a.filter((e) => "at_risk" === e.status).length,
                    l = a.filter(
                      (e) =>
                        e.confidence <
                        t.thresholds.signals.confidence.degradedConfidence,
                    ).length,
                    u = a.filter((e) =>
                      e.signals.some((e) => "concentration_risk" === e.type),
                    ).length,
                    m = (function (e) {
                      let a = [];
                      return (
                        e.criticalCount >= 2 &&
                          a.push(
                            d({
                              id: `${e.kamId}-critical-portfolio`,
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
                              id: `${e.kamId}-portfolio-pressure`,
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
                              id: `${e.kamId}-concentration`,
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
                              id: `${e.kamId}-validation`,
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
                      kamId: e?.kamId ?? a[0]?.kamId ?? "unknown-kam",
                      criticalCount: o,
                      atRiskCount: s,
                      lowConfidenceCount: l,
                      concentrationRiskCount: u,
                    }),
                    p = (function (e, a) {
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
                      let n = e.length
                          ? r(
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
                        confidence: n,
                      };
                    })(a, t),
                    v =
                      o > 0 || p.priorityScore >= 65
                        ? "critical"
                        : s > 0 || p.priorityScore >= 35
                          ? "under_pressure"
                          : "stable",
                    g = a
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
                    f = c({
                      kamId: e?.kamId ?? a[0]?.kamId ?? "unknown-kam",
                      kamName: e?.kamName,
                      portfolioSize: a.length,
                      portfolioStatus: v,
                      priorityScore: p.priorityScore,
                      confidence: p.confidence,
                      portfolioSummary: "",
                      topSignals: m,
                      topRecommendations: [],
                      criticalRestaurants: g,
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
                    h = {
                      kamId: e?.kamId ?? a[0]?.kamId ?? "unknown-kam",
                      kamName: e?.kamName,
                      portfolioSize: a.length,
                      portfolioStatus: v,
                      priorityScore: p.priorityScore,
                      confidence: p.confidence,
                      portfolioSummary: "",
                      topSignals: m.length ? m : p.topSignals,
                      topRecommendations: [f.recommendation],
                      criticalRestaurants: g,
                      portfolioBreakdown: {
                        criticalCount: o,
                        atRiskCount: s,
                        watchlistCount: a.filter(
                          (e) => "watchlist" === e.status,
                        ).length,
                        stableCount: a.filter((e) => "stable" === e.status)
                          .length,
                        averageRestaurantPriority: n(
                          a.map((e) => e.priorityScore),
                        ),
                        lowConfidenceCount: l,
                        concentrationRiskCount: u,
                      },
                      validationSummary: l
                        ? `${l} cuentas requieren prudencia por confianza reducida.`
                        : void 0,
                      kamBriefing: void 0,
                    };
                  return (
                    (h.portfolioSummary =
                      "critical" === v
                        ? "Portfolio con presi\xf3n alta y necesidad de foco inmediato."
                        : "under_pressure" === v
                          ? "Portfolio con presi\xf3n moderada; conviene priorizar cuentas clave."
                          : "Portfolio estable en esta corrida."),
                    t.featureFlags.enableKamBriefing &&
                      (h.kamBriefing = `${h.portfolioSummary} ${f.nextStep.label}.`),
                    h
                  );
                })(u.get(e), a, s);
              }),
              _ = {
                portfolioStatus: x.some((e) => "critical" === e.portfolioStatus)
                  ? "critical"
                  : x.some((e) => "under_pressure" === e.portfolioStatus)
                    ? "under_pressure"
                    : "stable",
                totalRestaurants: y.length,
                totalKams: x.length,
                concentrationRiskCount: y.filter((e) =>
                  e.signals.some((e) => "concentration_risk" === e.type),
                ).length,
                averagePriorityScore: n(y.map((e) => e.priorityScore)),
                highestPriorityRestaurants: y
                  .sort((e, a) => a.priorityScore - e.priorityScore)
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
                kamsUnderPressure: x
                  .filter((e) => "stable" !== e.portfolioStatus)
                  .map((e) => ({
                    kamId: e.kamId,
                    kamName: e.kamName,
                    priorityScore: e.priorityScore,
                    portfolioStatus: e.portfolioStatus,
                  })),
              },
              w = [
                ...(t = {
                  restaurants: y,
                  kams: x,
                  topRestaurantCount: s.thresholds.alerts.topRestaurantCount,
                  topKamCount: s.thresholds.alerts.topKamCount,
                }).restaurants
                  .filter((e) => "stable" !== e.status)
                  .sort((e, a) => a.priorityScore - e.priorityScore)
                  .slice(0, t.topRestaurantCount)
                  .map((e) => ({
                    alertId: `restaurant-${e.restaurantId}`,
                    entityType: "restaurant",
                    entityId: e.restaurantId,
                    title: e.restaurantName
                      ? `${e.restaurantName} requiere atenci\xf3n`
                      : `Restaurante ${e.restaurantId} requiere atenci\xf3n`,
                    priorityScore: e.priorityScore,
                    severity: e.severity,
                    whyFlagged: e.whyFlagged,
                    recommendedAction: e.recommendedAction,
                    nextBestStep: e.nextBestStep,
                    confidence: e.confidence,
                    createdFromSignals: e.signals.map((e) => e.id),
                  })),
                ...t.kams
                  .filter((e) => "stable" !== e.portfolioStatus)
                  .sort((e, a) => a.priorityScore - e.priorityScore)
                  .slice(0, t.topKamCount)
                  .map((e) => {
                    let a = c(e);
                    return {
                      alertId: `kam-${e.kamId}`,
                      entityType: "kam",
                      entityId: e.kamId,
                      title: `${e.kamName ?? e.kamId} bajo presi\xf3n`,
                      priorityScore: e.priorityScore,
                      severity:
                        e.priorityScore >= 70
                          ? "high"
                          : e.priorityScore >= 40
                            ? "medium"
                            : "low",
                      whyFlagged: [e.portfolioSummary],
                      recommendedAction: a.recommendation,
                      nextBestStep: a.nextStep,
                      confidence: e.confidence,
                      createdFromSignals: e.topSignals.map((e) => e.id),
                    };
                  }),
              ].sort((e, a) => a.priorityScore - e.priorityScore),
              S = (function (e) {
                let { restaurants: a, kams: t, metadata: i, alertCount: r } = e,
                  o = new Map(),
                  s = new Map();
                for (let e of a) {
                  for (let a of e.signals)
                    o.set(a.type, (o.get(a.type) ?? 0) + 1);
                  s.set(
                    e.recommendedAction.code,
                    (s.get(e.recommendedAction.code) ?? 0) + 1,
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
                  topAlertCount: r,
                  kamUnderPressureCount: t.filter(
                    (e) => "stable" !== e.portfolioStatus,
                  ).length,
                  cityRiskSummary: (function (e, a) {
                    let t = new Map();
                    for (let i of e) {
                      let e = a[i.restaurantId]?.city ?? "unknown",
                        r = t.get(e) ?? [];
                      r.push(i), t.set(e, r);
                    }
                    return [...t.entries()].map(([e, a]) => ({
                      city: e,
                      restaurantCount: a.length,
                      criticalCount: a.filter((e) => "critical" === e.status)
                        .length,
                      atRiskCount: a.filter((e) => "at_risk" === e.status)
                        .length,
                      averagePriorityScore: n(a.map((e) => e.priorityScore)),
                    }));
                  })(a, i),
                  verticalRiskSummary: (function (e, a) {
                    let t = new Map();
                    for (let i of e) {
                      let e = a[i.restaurantId]?.vertical ?? "unknown",
                        r = t.get(e) ?? [];
                      r.push(i), t.set(e, r);
                    }
                    return [...t.entries()].map(([e, a]) => ({
                      vertical: e,
                      restaurantCount: a.length,
                      criticalCount: a.filter((e) => "critical" === e.status)
                        .length,
                      atRiskCount: a.filter((e) => "at_risk" === e.status)
                        .length,
                      averagePriorityScore: n(a.map((e) => e.priorityScore)),
                    }));
                  })(a, i),
                  topSignalsSummary: [...o.entries()]
                    .sort((e, a) => a[1] - e[1])
                    .slice(0, 5)
                    .map(([e, a]) => ({ signalType: e, count: a })),
                  interventionSummary: [...s.entries()]
                    .sort((e, a) => a[1] - e[1])
                    .map(([e, a]) => ({ recommendationCode: e, count: a })),
                };
              })({
                restaurants: y,
                kams: x,
                portfolio: _,
                metadata: b,
                alertCount: w.length,
              });
            return {
              restaurants: y,
              kams: x,
              portfolio: _,
              summary: S,
              alerts: w,
              validationOverlays: k,
            };
          })(b).restaurants[0];
          return {
            headline:
              "El agente detect\xf3 presi\xf3n operativa concentrada en cuentas clave.",
            detected:
              e.whyFlagged[0] ??
              "Se detectaron se\xf1ales operativas relevantes.",
            whyItMatters: e.businessSummary,
            recommendation: e.recommendedAction.label,
            nextStep: e.nextBestStep.label,
            signals: e.signals.map((a) => ({
              id: a.id,
              title: a.label,
              detection: a.evidence[0]?.note ?? a.label,
              whyItMatters: e.businessSummary,
              recommendation: e.recommendedAction.label,
              nextStep: e.nextBestStep.label,
              tone:
                "critical" === a.severityHint
                  ? "critical"
                  : "at_risk" === a.severityHint
                    ? "warning"
                    : "watchlist" === a.severityHint
                      ? "info"
                      : "stable",
            })),
          };
        })(),
        x = {
          scenario: "baseline",
          scenarioOption: (0, y.o)("baseline"),
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
        _ = "baseline",
        w = "12 abr 2026 \xb7 23:20",
        S = {
          ...x,
          scenario: "promo-risk",
          scenarioOption: (0, y.o)("promo-risk"),
          topKpis: x.topKpis.map((e) =>
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
          kamPressureItems: x.kamPressureItems.map((e) =>
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
            ...x.alertSummary.slice(1),
          ],
          restaurants: x.restaurants.map((e) =>
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
            ...x.agentDigest,
            headline:
              "El agente detect\xf3 presi\xf3n promocional concentrada en cuentas con alta exposici\xf3n.",
            recommendation:
              "Separar de inmediato desviaci\xf3n promocional, cobertura comercial y calidad de input.",
            nextStep:
              "Abrir Alertas y bajar primero a restaurantes con promo activa y ca\xedda persistente.",
          },
        },
        R = {
          ...x,
          scenario: "coverage-gap",
          scenarioOption: (0, y.o)("coverage-gap"),
          topKpis: x.topKpis.map((e) =>
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
            ...x.alertSummary.slice(1),
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
            ...x.validationIssues.slice(1),
          ],
          restaurants: x.restaurants.map((e) =>
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
            ...x.agentDigest,
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
        C = { baseline: x, "promo-risk": S, "coverage-gap": R };
      function M(e) {
        return C[e] ?? C[_];
      }
    },
    6866: (e, a, t) => {
      Promise.resolve().then(t.bind(t, 4208)),
        Promise.resolve().then(t.bind(t, 7885)),
        Promise.resolve().then(t.bind(t, 3271));
    },
    7243: (e, a, t) => {
      "use strict";
      t.d(a, { f: () => i, o: () => r });
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
      function r(e) {
        return i.find((a) => a.id === e) ?? i[0];
      }
    },
    7724: (e, a, t) => {
      "use strict";
      t.d(a, { Header: () => p });
      var i = t(687),
        r = t(5814),
        n = t.n(r),
        o = t(6189),
        s = t(922),
        l = t(7010),
        c = t(9579),
        d = t(7243);
      t(5653);
      var u = t(1272);
      let m = {
        "/": "Dashboard General",
        "/kams": "KAMs",
        "/alerts": "Alertas",
        "/validation": "Validaci\xf3n de datos",
        "/deck": "Deck interactivo",
      };
      function p() {
        let e = (0, o.usePathname)(),
          {
            scenario: a,
            lastRefresh: t,
            resetDemo: r,
            setScenario: p,
          } = (0, u.o)(),
          v = e.startsWith("/restaurants/")
            ? "Detalle de restaurante"
            : e.startsWith("/kams/")
              ? "Detalle de KAM"
              : (m[e] ?? "Rappi KAM Intelligence");
        return (0, i.jsx)("header", {
          className:
            "sticky top-0 z-20 border-b border-white/80 bg-surface/90 px-4 py-4 backdrop-blur md:px-8 lg:px-10",
          children: (0, i.jsxs)("div", {
            className:
              "flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between",
            children: [
              (0, i.jsxs)("div", {
                className: "min-w-0",
                children: [
                  (0, i.jsx)("p", {
                    className:
                      "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                    children: "Vista actual",
                  }),
                  (0, i.jsx)("h2", {
                    className:
                      "mt-1 text-2xl font-semibold tracking-[-0.03em] text-ink",
                    children: v,
                  }),
                ],
              }),
              (0, i.jsxs)("div", {
                className:
                  "flex flex-col items-stretch gap-3 xl:flex-row xl:flex-wrap xl:items-center xl:justify-end",
                children: [
                  (0, i.jsxs)("label", {
                    className:
                      "group flex min-w-[240px] items-center gap-3 rounded-2xl border border-white bg-white/95 px-4 py-3 text-sm shadow-sm xl:min-w-[280px]",
                    children: [
                      (0, i.jsx)(s.A, { className: "h-5 w-5 text-slate-400" }),
                      (0, i.jsxs)("div", {
                        className: "min-w-0 flex-1",
                        children: [
                          (0, i.jsx)("p", {
                            className:
                              "text-xs font-semibold uppercase tracking-[0.18em] text-muted",
                            children: "B\xfasqueda global",
                          }),
                          (0, i.jsx)("input", {
                            "aria-label": "Buscar en la demo",
                            value: "",
                            readOnly: !0,
                            placeholder: "Buscar KAM, alerta o restaurante",
                            className:
                              "w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400",
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, i.jsxs)("label", {
                    className:
                      "group flex min-w-64 items-center gap-3 rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm shadow-sm",
                    children: [
                      (0, i.jsxs)("div", {
                        className: "min-w-0 flex-1",
                        children: [
                          (0, i.jsx)("p", {
                            className:
                              "text-xs font-semibold uppercase tracking-[0.18em] text-muted",
                            children: "Escenario",
                          }),
                          (0, i.jsx)("select", {
                            "aria-label": "Seleccionar escenario",
                            value: a,
                            onChange: (e) => p(e.target.value),
                            className:
                              "w-full appearance-none bg-transparent pr-6 font-medium text-ink outline-none",
                            children: d.f.map((e) =>
                              (0, i.jsx)(
                                "option",
                                { value: e.id, children: e.label },
                                e.id,
                              ),
                            ),
                          }),
                        ],
                      }),
                      (0, i.jsx)(l.A, { className: "h-4 w-4 text-muted" }),
                    ],
                  }),
                  (0, i.jsxs)("button", {
                    type: "button",
                    onClick: r,
                    className:
                      "inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700",
                    children: [
                      (0, i.jsx)(c.A, { className: "h-4 w-4" }),
                      "Reiniciar demo",
                    ],
                  }),
                  (0, i.jsxs)("div", {
                    className:
                      "rounded-2xl border border-transparent bg-white/40 px-4 py-3 text-right",
                    children: [
                      (0, i.jsx)("p", {
                        className:
                          "text-xs font-semibold uppercase tracking-[0.18em] text-muted",
                        children: "\xdaltima actualizaci\xf3n",
                      }),
                      (0, i.jsx)("p", {
                        className: "text-sm font-medium text-slate-700",
                        children: t,
                      }),
                    ],
                  }),
                  (0, i.jsx)(n(), {
                    href: "/deck",
                    className:
                      "rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-brand-700",
                    children: "Deck",
                  }),
                  (0, i.jsxs)("div", {
                    className:
                      "flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm",
                    children: [
                      (0, i.jsx)("div", {
                        className:
                          "flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700",
                        children: "JH",
                      }),
                      (0, i.jsxs)("div", {
                        className: "text-sm",
                        children: [
                          (0, i.jsx)("p", {
                            className: "font-medium text-ink",
                            children: "Jorge Ham",
                          }),
                          (0, i.jsx)("p", {
                            className: "text-muted",
                            children: "Perfil demo",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        });
      }
    },
    7766: (e, a, t) => {
      "use strict";
      function i(...e) {
        return e.filter(Boolean).join(" ");
      }
      t.d(a, { cn: () => i });
    },
    7885: (e, a, t) => {
      "use strict";
      t.d(a, { MobileNav: () => i });
      let i = (0, t(2907).registerClientReference)(
        function () {
          throw Error(
            "Attempted to call MobileNav() from the server but MobileNav is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
          );
        },
        "/Users/jorge/ProyectosAI/kam-intel/src/components/shell/mobile-nav.tsx",
        "MobileNav",
      );
    },
    8233: (e, a, t) => {
      "use strict";
      t.d(a, { Sidebar: () => p });
      var i = t(687),
        r = t(5814),
        n = t.n(r),
        o = t(6189),
        s = t(3445),
        l = t(3635),
        c = t(8552),
        d = t(7446),
        u = t(7766);
      let m = [
        { href: "/", label: "Dashboard", icon: s.A },
        { href: "/kams", label: "KAMs", icon: l.A },
        { href: "/alerts", label: "Alertas", icon: c.A },
        { href: "/validation", label: "Validaci\xf3n de datos", icon: d.A },
      ];
      function p() {
        let e = (0, o.usePathname)();
        return (0, i.jsxs)("aside", {
          className:
            "sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/80 bg-[#fff7f5]/95 px-5 py-6 backdrop-blur lg:flex",
          children: [
            (0, i.jsxs)("div", {
              className:
                "rounded-[30px] border border-brand-100/80 bg-white p-5 shadow-panel",
              children: [
                (0, i.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [
                    (0, i.jsx)("div", {
                      className:
                        "flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-lg font-black text-white shadow-sm",
                      children: "R",
                    }),
                    (0, i.jsxs)("div", {
                      children: [
                        (0, i.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                          children: "Rappi",
                        }),
                        (0, i.jsx)("h1", {
                          className: "text-base font-semibold text-ink",
                          children: "KAM Intelligence",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, i.jsx)("p", {
                  className: "mt-4 text-sm leading-6 text-slate-600",
                  children:
                    "Torre de control operativa para lectura ejecutiva, priorizaci\xf3n y seguimiento de riesgo comercial.",
                }),
              ],
            }),
            (0, i.jsx)("nav", {
              className: "mt-8 space-y-2",
              children: m.map(({ href: a, label: t, icon: r }) => {
                let o = e === a || ("/" !== a && e.startsWith(a));
                return (0, i.jsxs)(
                  n(),
                  {
                    href: a,
                    className: (0, u.cn)(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                      o
                        ? "bg-brand text-white shadow-panel"
                        : "border border-transparent text-slate-700 hover:border-white hover:bg-white hover:text-brand-700",
                    ),
                    children: [(0, i.jsx)(r, { className: "h-5 w-5" }), t],
                  },
                  a,
                );
              }),
            }),
            (0, i.jsxs)("div", {
              className:
                "mt-auto rounded-[28px] border border-dashed border-brand-200 bg-white/70 p-5",
              children: [
                (0, i.jsx)("p", {
                  className:
                    "text-xs font-semibold uppercase tracking-[0.24em] text-brand-700",
                  children: "Agente visible",
                }),
                (0, i.jsx)("p", {
                  className: "mt-3 text-sm leading-6 text-slate-700",
                  children:
                    "La interfaz prioriza cuatro preguntas en cada vista: qu\xe9 detect\xf3, por qu\xe9 importa, qu\xe9 recomienda y cu\xe1l es el siguiente paso.",
                }),
              ],
            }),
          ],
        });
      }
    },
    8348: (e, a, t) => {
      "use strict";
      t.r(a), t.d(a, { default: () => c, metadata: () => l });
      var i = t(7413),
        r = t(4208),
        n = t(7885),
        o = t(3271);
      function s({ children: e }) {
        return (0, i.jsxs)("div", {
          className: "min-h-screen bg-surface bg-shell-gradient text-ink",
          children: [
            (0, i.jsxs)("div", {
              className: "mx-auto flex max-w-[1640px]",
              children: [
                (0, i.jsx)(o.Sidebar, {}),
                (0, i.jsxs)("div", {
                  className: "min-h-screen flex-1",
                  children: [
                    (0, i.jsx)(r.Header, {}),
                    (0, i.jsx)("main", {
                      className: "px-4 py-6 pb-24 md:px-8 lg:px-10 lg:pb-10",
                      children: e,
                    }),
                  ],
                }),
              ],
            }),
            (0, i.jsx)(n.MobileNav, {}),
          ],
        });
      }
      t(1135);
      let l = {
        title: "Rappi KAM Intelligence",
        description:
          "Demo operativa con shell funcional y narrativa de agente.",
      };
      function c({ children: e }) {
        return (0, i.jsx)("html", {
          lang: "es",
          children: (0, i.jsx)("body", {
            children: (0, i.jsx)(s, { children: e }),
          }),
        });
      }
    },
  });
