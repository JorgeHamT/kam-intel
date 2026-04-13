(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [403],
  {
    152: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => n });
      var r = a(5155),
        s = a(6486);
      let l = {
        critical: "border-brand-200 bg-brand-50/80",
        warning: "border-amber-200 bg-amber-50/80",
        neutral: "border-slate-200 bg-slate-50/80",
      };
      function n(e) {
        let {
          label: t,
          title: a,
          tone: n = "neutral",
          children: i,
          className: d,
        } = e;
        return (0, r.jsxs)("article", {
          className: (0, s.cn)(
            "rounded-[28px] border p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
            l[n],
            d,
          ),
          children: [
            (0, r.jsx)("p", {
              className:
                "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
              children: t,
            }),
            a
              ? (0, r.jsx)("h3", {
                  className: "mt-2 text-lg font-semibold text-ink",
                  children: a,
                })
              : null,
            (0, r.jsx)("div", {
              className: "mt-3 text-sm leading-6 text-slate-700",
              children: i,
            }),
          ],
        });
      }
    },
    417: (e, t, a) => {
      "use strict";
      a.r(t), a.d(t, { default: () => j });
      var r = a(5155),
        s = a(6874),
        l = a.n(s),
        n = a(3837),
        i = a(2115);
      let d = i.forwardRef(function (e, t) {
        let { title: a, titleId: r, ...s } = e;
        return i.createElement(
          "svg",
          Object.assign(
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 1.5,
              stroke: "currentColor",
              "aria-hidden": "true",
              "data-slot": "icon",
              ref: t,
              "aria-labelledby": r,
            },
            s,
          ),
          a ? i.createElement("title", { id: r }, a) : null,
          i.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5",
          }),
        );
      });
      var c = a(7572),
        o = a(152),
        m = a(2721),
        x = a(7993),
        u = a(9551),
        b = a(3931),
        p = a(650),
        h = a(6171),
        g = a(2138),
        f = a(5789);
      function j() {
        var e;
        let t = (0, f.t)(),
          a = {
            summary: {
              totalAlerts: (e = t).kams.reduce((e, t) => e + t.openAlerts, 0),
              totalRestaurantsAtRisk: e.kams.reduce(
                (e, t) => e + t.restaurantsAtRisk,
                0,
              ),
            },
            cards: e.kams.map((t) => {
              var a;
              let r = e.restaurants.filter((e) => e.kamId === t.id),
                s = (a = r.map((e) => e.status)).includes("Cr\xedtico")
                  ? "critical"
                  : a.includes("En riesgo")
                    ? "warning"
                    : "info";
              return { kam: t, linkedRestaurants: r, tone: s };
            }),
            rankingRows: e.kams.map((e) => ({
              id: e.id,
              title: e.name,
              subtitle: e.portfolio,
              metric: ""
                .concat(e.restaurantsAtRisk, " cuentas en riesgo \xb7 ")
                .concat(e.openAlerts, " alertas"),
              tone: (0, g.k)(e.openAlerts),
              href: "/kams/".concat(e.id),
            })),
          };
        return (0, r.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, r.jsx)(u.z, {
              eyebrow: "Cobertura comercial",
              title: "Vista de KAMs",
              description:
                "Comparaci\xf3n ejecutiva de portafolios para detectar presi\xf3n operativa, cuentas cr\xedticas y prioridad de intervenci\xf3n sin cerrar una metodolog\xeda final que todav\xeda depende de otros frentes.",
              children: (0, r.jsxs)("div", {
                className: "grid gap-4 md:grid-cols-3",
                children: [
                  (0, r.jsx)(x.p, {
                    eyebrow: "Portafolio",
                    title: "KAMs visibles",
                    value: "".concat(t.kams.length),
                    accent: "neutral",
                    icon: (0, r.jsx)(n.A, { className: "h-5 w-5" }),
                    description: "Managers con lectura activa en la demo.",
                  }),
                  (0, r.jsx)(x.p, {
                    eyebrow: "Presi\xf3n",
                    title: "Cuentas bajo seguimiento",
                    value: "".concat(a.summary.totalRestaurantsAtRisk),
                    accent: "warning",
                    icon: (0, r.jsx)(d, { className: "h-5 w-5" }),
                    description:
                      "Restaurantes marcados dentro del portafolio actual.",
                  }),
                  (0, r.jsx)(x.p, {
                    eyebrow: "Intervenci\xf3n",
                    title: "Alertas abiertas",
                    value: "".concat(a.summary.totalAlerts),
                    accent: "brand",
                    icon: (0, r.jsx)(c.A, { className: "h-5 w-5" }),
                    description:
                      "Volumen total de seguimiento operativo pendiente.",
                  }),
                ],
              }),
            }),
            (0, r.jsxs)("div", {
              className: "grid gap-6 xl:grid-cols-[1.1fr_0.9fr]",
              children: [
                (0, r.jsx)("section", {
                  className: "space-y-4",
                  children: a.cards.map((e) => {
                    let { kam: t, linkedRestaurants: a, tone: s } = e;
                    return (0, r.jsxs)(
                      "article",
                      {
                        className:
                          "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
                        children: [
                          (0, r.jsxs)("div", {
                            className:
                              "flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between",
                            children: [
                              (0, r.jsxs)("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                  (0, r.jsxs)("div", {
                                    className:
                                      "flex flex-wrap items-center gap-3",
                                    children: [
                                      (0, r.jsx)("h2", {
                                        className:
                                          "text-2xl font-semibold tracking-[-0.03em] text-ink",
                                        children: t.name,
                                      }),
                                      (0, r.jsx)(p.W, {
                                        label:
                                          "critical" === s
                                            ? "Alta prioridad"
                                            : "warning" === s
                                              ? "Intervenci\xf3n sugerida"
                                              : "Monitoreo",
                                        tone: s,
                                      }),
                                    ],
                                  }),
                                  (0, r.jsx)("p", {
                                    className:
                                      "mt-2 text-sm font-medium text-slate-600",
                                    children: t.portfolio,
                                  }),
                                  (0, r.jsx)("p", {
                                    className:
                                      "mt-4 max-w-2xl text-sm leading-7 text-slate-600",
                                    children: t.narrative,
                                  }),
                                ],
                              }),
                              (0, r.jsx)(l(), {
                                href: "/kams/".concat(t.id),
                                className:
                                  "inline-flex items-center rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-100",
                                children: "Abrir detalle de KAM",
                              }),
                            ],
                          }),
                          (0, r.jsx)(h.V, {
                            className: "mt-5",
                            columns: 4,
                            items: [
                              {
                                id: "".concat(t.id, "-health"),
                                label: "Salud del portafolio",
                                value:
                                  "critical" === s
                                    ? "Tensionada"
                                    : "En revisi\xf3n",
                                tone: "critical" === s ? "critical" : "warning",
                              },
                              {
                                id: "".concat(t.id, "-linked"),
                                label: "Riesgo visible",
                                value: "".concat(
                                  a.length,
                                  " cuentas conectadas",
                                ),
                                tone: "neutral",
                              },
                              {
                                id: "".concat(t.id, "-critical"),
                                label: "Cuentas cr\xedticas",
                                value: "".concat(t.restaurantsAtRisk),
                                tone: "warning",
                              },
                              {
                                id: "".concat(t.id, "-alerts"),
                                label: "Alertas abiertas",
                                value: "".concat(t.openAlerts),
                                tone: "critical",
                              },
                            ],
                          }),
                          (0, r.jsxs)("div", {
                            className: "mt-5 grid gap-3 lg:grid-cols-3",
                            children: [
                              (0, r.jsx)(o.A, {
                                label: "Qu\xe9 pas\xf3",
                                tone: "warning",
                                children:
                                  "La se\xf1al se concentra en un mismo portfolio y ya amerita lectura de presi\xf3n operativa antes de ejecutar recovery comercial.",
                              }),
                              (0, r.jsx)(o.A, {
                                label: "Qu\xe9 hacer",
                                tone: "neutral",
                                children:
                                  "Revisar primero cuentas con owner o promo inconsistente y luego bajar a detalle por restaurante.",
                              }),
                              (0, r.jsx)(o.A, {
                                label: "Siguiente paso",
                                tone: "critical",
                                children:
                                  "Abrir la vista individual del KAM y ordenar las cuentas por severidad y dependencia de validaci\xf3n.",
                              }),
                            ],
                          }),
                        ],
                      },
                      t.id,
                    );
                  }),
                }),
                (0, r.jsxs)("div", {
                  className: "space-y-6",
                  children: [
                    (0, r.jsx)(b.b, {
                      eyebrow: "Comparativo",
                      title: "Prioridad entre managers",
                      description:
                        "Lectura lado a lado para decidir d\xf3nde intervenir primero.",
                      rows: a.rankingRows,
                    }),
                    (0, r.jsx)(m.l, {
                      eyebrow: "Briefing",
                      title: "C\xf3mo leer esta pantalla",
                      items: [
                        {
                          id: "portfolio-health",
                          label: "Salud del portafolio",
                          description:
                            "Mirar la cantidad de cuentas bajo seguimiento antes de entrar al detalle.",
                          tone: "neutral",
                        },
                        {
                          id: "kam-pressure",
                          label: "Presi\xf3n sobre el KAM",
                          description:
                            "Detectar d\xf3nde varias se\xf1ales convergen sobre el mismo manager.",
                          tone: "warning",
                        },
                        {
                          id: "intervention-priority",
                          label: "Prioridad de intervenci\xf3n",
                          description:
                            "Bajar primero al KAM con m\xe1s alertas abiertas y mayor concentraci\xf3n de riesgo.",
                          tone: "critical",
                        },
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
    },
    650: (e, t, a) => {
      "use strict";
      a.d(t, { W: () => n });
      var r = a(5155),
        s = a(6486);
      let l = {
        critical: "bg-brand-50 text-brand-800 ring-brand-200",
        warning: "bg-amber-50 text-amber-800 ring-amber-200",
        stable: "bg-emerald-50 text-emerald-800 ring-emerald-200",
        info: "bg-slate-100 text-slate-700 ring-slate-200",
      };
      function n(e) {
        let { label: t, tone: a } = e;
        return (0, r.jsx)("span", {
          className: (0, s.cn)(
            "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.01em] ring-1 ring-inset",
            l[a],
          ),
          children: t,
        });
      }
    },
    2138: (e, t, a) => {
      "use strict";
      function r(e) {
        return "Cr\xedtico" === e
          ? "critical"
          : "En riesgo" === e
            ? "warning"
            : "info";
      }
      function s(e) {
        return e >= 4 ? "critical" : e >= 3 ? "warning" : "info";
      }
      a.d(t, { k: () => s, o: () => r });
    },
    2376: (e, t, a) => {
      Promise.resolve().then(a.bind(a, 417));
    },
    2721: (e, t, a) => {
      "use strict";
      a.d(t, { l: () => n });
      var r = a(5155),
        s = a(152),
        l = a(6726);
      function n(e) {
        let {
          eyebrow: t = "Patr\xf3n del agente",
          title: a,
          description: n,
          items: i,
        } = e;
        return (0, r.jsx)(l.i, {
          eyebrow: t,
          title: a,
          description: n,
          children: (0, r.jsx)("div", {
            className: "grid gap-3 md:grid-cols-2",
            children: i.map((e, t) => {
              var a;
              return (0, r.jsx)(
                s.A,
                {
                  label: "".concat(t + 1, ". ").concat(e.label),
                  tone: null != (a = e.tone) ? a : "neutral",
                  children: e.description,
                },
                e.id,
              );
            }),
          }),
        });
      }
    },
    3837: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => s });
      var r = a(2115);
      let s = r.forwardRef(function (e, t) {
        let { title: a, titleId: s, ...l } = e;
        return r.createElement(
          "svg",
          Object.assign(
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 1.5,
              stroke: "currentColor",
              "aria-hidden": "true",
              "data-slot": "icon",
              ref: t,
              "aria-labelledby": s,
            },
            l,
          ),
          a ? r.createElement("title", { id: s }, a) : null,
          r.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z",
          }),
        );
      });
    },
    3931: (e, t, a) => {
      "use strict";
      a.d(t, { b: () => i });
      var r = a(5155),
        s = a(6874),
        l = a.n(s),
        n = a(650);
      function i(e) {
        let { eyebrow: t, title: a, description: s, rows: i } = e;
        return (0, r.jsxs)("section", {
          className:
            "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
          children: [
            (0, r.jsxs)("div", {
              className: "mb-5",
              children: [
                t
                  ? (0, r.jsx)("p", {
                      className:
                        "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                      children: t,
                    })
                  : null,
                (0, r.jsx)("h2", {
                  className: "mt-2 text-xl font-semibold text-ink",
                  children: a,
                }),
                s
                  ? (0, r.jsx)("p", {
                      className: "mt-2 text-sm text-slate-600",
                      children: s,
                    })
                  : null,
              ],
            }),
            (0, r.jsx)("div", {
              className:
                "overflow-hidden rounded-[24px] border border-slate-200",
              children: (0, r.jsxs)("table", {
                className: "min-w-full divide-y divide-slate-200 text-sm",
                children: [
                  (0, r.jsx)("thead", {
                    className: "bg-slate-50/90",
                    children: (0, r.jsxs)("tr", {
                      className: "text-left text-slate-500",
                      children: [
                        (0, r.jsx)("th", {
                          className: "px-5 py-3 font-medium",
                          children: "Cuenta",
                        }),
                        (0, r.jsx)("th", {
                          className: "px-5 py-3 font-medium",
                          children: "Se\xf1al",
                        }),
                        (0, r.jsx)("th", {
                          className: "px-5 py-3 font-medium",
                          children: "Prioridad",
                        }),
                      ],
                    }),
                  }),
                  (0, r.jsx)("tbody", {
                    className: "divide-y divide-slate-100 bg-white",
                    children: i.map((e) =>
                      (0, r.jsxs)(
                        "tr",
                        {
                          className: "align-top",
                          children: [
                            (0, r.jsxs)("td", {
                              className: "px-5 py-4",
                              children: [
                                (0, r.jsx)("p", {
                                  className: "font-semibold text-ink",
                                  children: e.title,
                                }),
                                (0, r.jsx)("p", {
                                  className: "mt-1 text-slate-500",
                                  children: e.subtitle,
                                }),
                              ],
                            }),
                            (0, r.jsx)("td", {
                              className: "px-5 py-4 text-slate-700",
                              children: e.metric,
                            }),
                            (0, r.jsx)("td", {
                              className: "px-5 py-4",
                              children: (0, r.jsxs)("div", {
                                className: "flex items-center gap-3",
                                children: [
                                  (0, r.jsx)(n.W, {
                                    label:
                                      "critical" === e.tone
                                        ? "Cr\xedtico"
                                        : "warning" === e.tone
                                          ? "En riesgo"
                                          : "stable" === e.tone
                                            ? "Estable"
                                            : "Monitoreo",
                                    tone: e.tone,
                                  }),
                                  e.href
                                    ? (0, r.jsx)(l(), {
                                        href: e.href,
                                        className:
                                          "font-semibold text-brand-700",
                                        children: "Abrir",
                                      })
                                    : null,
                                ],
                              }),
                            }),
                          ],
                        },
                        e.id,
                      ),
                    ),
                  }),
                ],
              }),
            }),
          ],
        });
      }
    },
    5789: (e, t, a) => {
      "use strict";
      a.d(t, { t: () => l });
      var r = a(9052),
        s = a(6853);
      function l() {
        let e = (0, r.o)((e) => e.scenario);
        return (0, s.cz)(e);
      }
    },
    6171: (e, t, a) => {
      "use strict";
      a.d(t, { V: () => i });
      var r = a(5155),
        s = a(6486);
      let l = {
          critical: "border-brand-100 bg-brand-50/70",
          warning: "border-amber-200 bg-amber-50/70",
          stable: "border-emerald-200 bg-emerald-50/70",
          neutral: "border-slate-200 bg-slate-50/70",
        },
        n = {
          2: "md:grid-cols-2",
          3: "md:grid-cols-3",
          4: "md:grid-cols-2 xl:grid-cols-4",
        };
      function i(e) {
        let { items: t, columns: a = 4, className: i } = e;
        return (0, r.jsx)("div", {
          className: (0, s.cn)("grid gap-3", n[a], i),
          children: t.map((e) => {
            var t;
            return (0, r.jsxs)(
              "article",
              {
                className: (0, s.cn)(
                  "rounded-[24px] border p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
                  l[null != (t = e.tone) ? t : "neutral"],
                ),
                children: [
                  (0, r.jsx)("p", {
                    className:
                      "text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500",
                    children: e.label,
                  }),
                  (0, r.jsx)("p", {
                    className:
                      "mt-2 text-lg font-semibold tracking-[-0.03em] text-ink",
                    children: e.value,
                  }),
                  e.detail
                    ? (0, r.jsx)("p", {
                        className: "mt-2 text-sm leading-6 text-slate-600",
                        children: e.detail,
                      })
                    : null,
                ],
              },
              e.id,
            );
          }),
        });
      }
    },
    6726: (e, t, a) => {
      "use strict";
      a.d(t, { i: () => l });
      var r = a(5155),
        s = a(6486);
      function l(e) {
        let {
          eyebrow: t,
          title: a,
          description: l,
          actions: n,
          children: i,
          className: d,
        } = e;
        return (0, r.jsxs)("section", {
          className: (0, s.cn)(
            "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
            d,
          ),
          children: [
            (0, r.jsxs)("div", {
              className:
                "mb-5 flex flex-wrap items-start justify-between gap-3",
              children: [
                (0, r.jsxs)("div", {
                  className: "space-y-1",
                  children: [
                    t
                      ? (0, r.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                          children: t,
                        })
                      : null,
                    (0, r.jsx)("h2", {
                      className:
                        "text-xl font-semibold tracking-[-0.02em] text-ink",
                      children: a,
                    }),
                    l
                      ? (0, r.jsx)("p", {
                          className: "text-sm leading-6 text-slate-600",
                          children: l,
                        })
                      : null,
                  ],
                }),
                n,
              ],
            }),
            i,
          ],
        });
      }
    },
    7572: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => s });
      var r = a(2115);
      let s = r.forwardRef(function (e, t) {
        let { title: a, titleId: s, ...l } = e;
        return r.createElement(
          "svg",
          Object.assign(
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 1.5,
              stroke: "currentColor",
              "aria-hidden": "true",
              "data-slot": "icon",
              ref: t,
              "aria-labelledby": s,
            },
            l,
          ),
          a ? r.createElement("title", { id: s }, a) : null,
          r.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
          }),
        );
      });
    },
    7993: (e, t, a) => {
      "use strict";
      a.d(t, { p: () => n });
      var r = a(5155),
        s = a(6486);
      let l = {
        brand:
          "border-brand-100 bg-gradient-to-br from-white via-white to-brand-50/80",
        warning:
          "border-amber-200 bg-gradient-to-br from-white via-white to-amber-50/80",
        stable:
          "border-emerald-200 bg-gradient-to-br from-white via-white to-emerald-50/80",
        neutral: "border-slate-200 bg-white",
      };
      function n(e) {
        let {
          eyebrow: t,
          title: a,
          value: n,
          description: i,
          accent: d = "neutral",
          icon: c,
          footer: o,
          className: m,
        } = e;
        return (0, r.jsxs)("article", {
          className: (0, s.cn)(
            "rounded-[28px] border p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]",
            l[d],
            m,
          ),
          children: [
            (0, r.jsxs)("div", {
              className: "flex items-start justify-between gap-3",
              children: [
                (0, r.jsxs)("div", {
                  children: [
                    t
                      ? (0, r.jsx)("p", {
                          className:
                            "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
                          children: t,
                        })
                      : null,
                    (0, r.jsx)("h3", {
                      className: "mt-2 text-sm font-medium text-slate-600",
                      children: a,
                    }),
                  ],
                }),
                c
                  ? (0, r.jsx)("div", {
                      className:
                        "flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-100",
                      children: c,
                    })
                  : null,
              ],
            }),
            n
              ? (0, r.jsx)("p", {
                  className:
                    "mt-5 text-3xl font-semibold tracking-[-0.04em] text-ink",
                  children: n,
                })
              : null,
            i
              ? (0, r.jsx)("p", {
                  className: "mt-3 text-sm leading-6 text-slate-600",
                  children: i,
                })
              : null,
            o ? (0, r.jsx)("div", { className: "mt-5", children: o }) : null,
          ],
        });
      }
    },
    9551: (e, t, a) => {
      "use strict";
      a.d(t, { z: () => l });
      var r = a(5155),
        s = a(6486);
      function l(e) {
        let {
          eyebrow: t,
          title: a,
          description: l,
          badge: n,
          actions: i,
          children: d,
          className: c,
        } = e;
        return (0, r.jsxs)("section", {
          className: (0, s.cn)(
            "overflow-hidden rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel shadow-brand-100/20 backdrop-blur md:p-7",
            c,
          ),
          children: [
            (0, r.jsxs)("div", {
              className:
                "flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between",
              children: [
                (0, r.jsxs)("div", {
                  className: "max-w-3xl",
                  children: [
                    t
                      ? (0, r.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.26em] text-brand-600",
                          children: t,
                        })
                      : null,
                    (0, r.jsxs)("div", {
                      className: "mt-3 flex flex-wrap items-center gap-3",
                      children: [
                        (0, r.jsx)("h1", {
                          className:
                            "text-3xl font-semibold tracking-[-0.03em] text-ink md:text-[2.35rem]",
                          children: a,
                        }),
                        n,
                      ],
                    }),
                    l
                      ? (0, r.jsx)("p", {
                          className:
                            "mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-[15px]",
                          children: l,
                        })
                      : null,
                  ],
                }),
                i
                  ? (0, r.jsx)("div", {
                      className: "flex shrink-0 flex-wrap gap-3",
                      children: i,
                    })
                  : null,
              ],
            }),
            d ? (0, r.jsx)("div", { className: "mt-6", children: d }) : null,
          ],
        });
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [962, 261, 441, 684, 358], () => t(2376)), (_N_E = e.O());
  },
]);
