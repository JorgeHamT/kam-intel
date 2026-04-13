(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [484],
  {
    152: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => n });
      var r = a(5155),
        l = a(6486);
      let s = {
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
          className: (0, l.cn)(
            "rounded-[28px] border p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
            s[n],
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
    650: (e, t, a) => {
      "use strict";
      a.d(t, { W: () => n });
      var r = a(5155),
        l = a(6486);
      let s = {
        critical: "bg-brand-50 text-brand-800 ring-brand-200",
        warning: "bg-amber-50 text-amber-800 ring-amber-200",
        stable: "bg-emerald-50 text-emerald-800 ring-emerald-200",
        info: "bg-slate-100 text-slate-700 ring-slate-200",
      };
      function n(e) {
        let { label: t, tone: a } = e;
        return (0, r.jsx)("span", {
          className: (0, l.cn)(
            "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.01em] ring-1 ring-inset",
            s[a],
          ),
          children: t,
        });
      }
    },
    2721: (e, t, a) => {
      "use strict";
      a.d(t, { l: () => n });
      var r = a(5155),
        l = a(152),
        s = a(6726);
      function n(e) {
        let {
          eyebrow: t = "Patr\xf3n del agente",
          title: a,
          description: n,
          items: i,
        } = e;
        return (0, r.jsx)(s.i, {
          eyebrow: t,
          title: a,
          description: n,
          children: (0, r.jsx)("div", {
            className: "grid gap-3 md:grid-cols-2",
            children: i.map((e, t) => {
              var a;
              return (0, r.jsx)(
                l.A,
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
    5261: (e, t, a) => {
      Promise.resolve().then(a.bind(a, 9952));
    },
    5789: (e, t, a) => {
      "use strict";
      a.d(t, { t: () => s });
      var r = a(9052),
        l = a(6853);
      function s() {
        let e = (0, r.o)((e) => e.scenario);
        return (0, l.cz)(e);
      }
    },
    6726: (e, t, a) => {
      "use strict";
      a.d(t, { i: () => s });
      var r = a(5155),
        l = a(6486);
      function s(e) {
        let {
          eyebrow: t,
          title: a,
          description: s,
          actions: n,
          children: i,
          className: d,
        } = e;
        return (0, r.jsxs)("section", {
          className: (0, l.cn)(
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
                    s
                      ? (0, r.jsx)("p", {
                          className: "text-sm leading-6 text-slate-600",
                          children: s,
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
    9551: (e, t, a) => {
      "use strict";
      a.d(t, { z: () => s });
      var r = a(5155),
        l = a(6486);
      function s(e) {
        let {
          eyebrow: t,
          title: a,
          description: s,
          badge: n,
          actions: i,
          children: d,
          className: c,
        } = e;
        return (0, r.jsxs)("section", {
          className: (0, l.cn)(
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
                    s
                      ? (0, r.jsx)("p", {
                          className:
                            "mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-[15px]",
                          children: s,
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
    9952: (e, t, a) => {
      "use strict";
      a.r(t), a.d(t, { default: () => f });
      var r = a(5155),
        l = a(2115);
      let s = l.forwardRef(function (e, t) {
          let { title: a, titleId: r, ...s } = e;
          return l.createElement(
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
            a ? l.createElement("title", { id: r }, a) : null,
            l.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z",
            }),
          );
        }),
        n = l.forwardRef(function (e, t) {
          let { title: a, titleId: r, ...s } = e;
          return l.createElement(
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
            a ? l.createElement("title", { id: r }, a) : null,
            l.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z",
            }),
          );
        }),
        i = l.forwardRef(function (e, t) {
          let { title: a, titleId: r, ...s } = e;
          return l.createElement(
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
            a ? l.createElement("title", { id: r }, a) : null,
            l.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
            }),
          );
        });
      var d = a(2721),
        c = a(6874),
        o = a.n(c),
        m = a(152),
        x = a(650);
      function u(e) {
        var t, a;
        let { alert: l, restaurant: s, isBlocking: n } = e;
        return (0, r.jsxs)("article", {
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
                      className: "flex flex-wrap items-center gap-3",
                      children: [
                        (0, r.jsx)("h2", {
                          className:
                            "text-xl font-semibold tracking-[-0.02em] text-ink",
                          children: l.title,
                        }),
                        (0, r.jsx)(x.W, {
                          label: n ? "Bloqueando" : "En seguimiento",
                          tone: n ? "critical" : "warning",
                        }),
                      ],
                    }),
                    (0, r.jsxs)("p", {
                      className: "mt-3 text-sm font-medium text-slate-600",
                      children: [
                        "Responsable: ",
                        l.owner,
                        " \xb7 ETA: ",
                        l.eta,
                      ],
                    }),
                  ],
                }),
                s
                  ? (0, r.jsx)(o(), {
                      href: "/restaurants/".concat(s.id),
                      className:
                        "inline-flex items-center rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-100",
                      children: "Abrir restaurante",
                    })
                  : null,
              ],
            }),
            (0, r.jsxs)("div", {
              className: "mt-5 grid gap-3 lg:grid-cols-3",
              children: [
                (0, r.jsx)(m.A, {
                  label: "Qu\xe9 pas\xf3",
                  tone: n ? "critical" : "warning",
                  children:
                    null != (t = null == s ? void 0 : s.whyFlagged)
                      ? t
                      : "La alerta existe para no perder seguimiento operativo entre owners.",
                }),
                (0, r.jsx)(m.A, {
                  label: "Qu\xe9 hacer",
                  tone: "neutral",
                  children:
                    null != (a = null == s ? void 0 : s.recommendation)
                      ? a
                      : "Usar la cola como disparador de intervenci\xf3n, no solo como registro.",
                }),
                (0, r.jsx)(m.A, {
                  label: "Siguiente paso",
                  tone: "neutral",
                  children:
                    "Confirmar responsable, bajar al detalle de la cuenta y mantener ETA visible hasta cierre.",
                }),
              ],
            }),
          ],
        });
      }
      var b = a(6486);
      function p(e) {
        let { tabs: t, activeId: a } = e;
        return (0, r.jsx)("div", {
          className: "flex flex-wrap gap-2",
          children: t.map((e) => {
            let t = e.id === a;
            return (0, r.jsxs)(
              "div",
              {
                className: (0, b.cn)(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
                  t
                    ? "border-brand-200 bg-brand-50 text-brand-700"
                    : "border-slate-200 bg-white text-slate-600",
                ),
                children: [
                  (0, r.jsx)("span", { children: e.label }),
                  "number" == typeof e.count
                    ? (0, r.jsx)("span", {
                        className: (0, b.cn)(
                          "rounded-full px-2 py-0.5 text-xs font-semibold",
                          t
                            ? "bg-white text-brand-700"
                            : "bg-slate-100 text-slate-600",
                        ),
                        children: e.count,
                      })
                    : null,
                ],
              },
              e.id,
            );
          }),
        });
      }
      var h = a(9551),
        g = a(5789);
      function f() {
        let e = (0, g.t)(),
          t = {
            tabs: [
              { id: "all", label: "Todas", count: e.alertSummary.length },
              {
                id: "critical",
                label: "Bloqueando",
                count: e.alertSummary.filter((e) =>
                  e.status.includes("Bloqueando"),
                ).length,
              },
              {
                id: "follow-up",
                label: "Seguimiento",
                count: e.alertSummary.filter((e) =>
                  e.status.includes("seguimiento"),
                ).length,
              },
              {
                id: "pending",
                label: "Pendientes",
                count: e.alertSummary.filter((e) =>
                  e.status.includes("Pendiente"),
                ).length,
              },
            ],
            alertCards: e.alertSummary.map((t) => {
              let a = t.restaurantId
                  ? e.restaurants.find((e) => e.id === t.restaurantId)
                  : void 0,
                r = t.status.includes("Bloqueando");
              return { alert: t, restaurant: a, isBlocking: r };
            }),
          };
        return (0, r.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, r.jsx)(h.z, {
              eyebrow: "Alertas",
              title: "Cola operativa",
              description:
                "Feed accionable para priorizar casos, entender por qu\xe9 fueron marcados y bajar r\xe1pido al restaurante afectado.",
              actions: (0, r.jsxs)("div", {
                className:
                  "inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600",
                children: [
                  (0, r.jsx)(s, { className: "h-4 w-4" }),
                  "Filtros activos de demo",
                ],
              }),
              children: (0, r.jsx)(p, { tabs: t.tabs, activeId: "all" }),
            }),
            (0, r.jsxs)("div", {
              className: "grid gap-6 xl:grid-cols-[1.05fr_0.95fr]",
              children: [
                (0, r.jsx)("section", {
                  className: "space-y-4",
                  children: t.alertCards.map((e) => {
                    let { alert: t, restaurant: a, isBlocking: l } = e;
                    return (0, r.jsx)(
                      u,
                      { alert: t, restaurant: a, isBlocking: l },
                      t.id,
                    );
                  }),
                }),
                (0, r.jsxs)("section", {
                  className: "space-y-6",
                  children: [
                    (0, r.jsxs)("div", {
                      className:
                        "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
                      children: [
                        (0, r.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                          children: "Cola urgente",
                        }),
                        (0, r.jsx)("h2", {
                          className: "mt-2 text-xl font-semibold text-ink",
                          children: "Acciones que no deber\xedan esperar",
                        }),
                        (0, r.jsx)("div", {
                          className: "mt-5 space-y-3",
                          children: e.alertSummary.map((e) =>
                            (0, r.jsxs)(
                              "div",
                              {
                                className:
                                  "flex items-start gap-3 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4",
                                children: [
                                  (0, r.jsx)("div", {
                                    className:
                                      "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700",
                                    children: (0, r.jsx)(n, {
                                      className: "h-4 w-4",
                                    }),
                                  }),
                                  (0, r.jsxs)("div", {
                                    children: [
                                      (0, r.jsx)("p", {
                                        className: "font-semibold text-ink",
                                        children: e.title,
                                      }),
                                      (0, r.jsxs)("p", {
                                        className:
                                          "mt-1 text-sm leading-6 text-slate-600",
                                        children: [
                                          e.owner,
                                          " debe mover este caso antes de ",
                                          e.eta,
                                          ".",
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              e.id,
                            ),
                          ),
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "space-y-6",
                      children: [
                        (0, r.jsx)(d.l, {
                          eyebrow: "Lectura del agente",
                          title: "C\xf3mo usar el feed",
                          items: [
                            {
                              id: "priority",
                              label: "Prioridad",
                              description:
                                "Empezar por lo bloqueante para no contaminar la priorizaci\xf3n posterior.",
                              tone: "critical",
                            },
                            {
                              id: "causality",
                              label: "Explicaci\xf3n causal",
                              description:
                                "Cada alerta ya expone por qu\xe9 importa y qu\xe9 acci\xf3n sugiere.",
                              tone: "warning",
                            },
                            {
                              id: "traceability",
                              label: "Trazabilidad",
                              description:
                                "Mantener owner y ETA visibles evita que la demo se vea como listado pasivo.",
                              tone: "neutral",
                            },
                          ],
                        }),
                        (0, r.jsxs)("div", {
                          className:
                            "mt-5 rounded-[24px] border border-slate-200 bg-slate-50/70 p-4",
                          children: [
                            (0, r.jsxs)("div", {
                              className:
                                "flex items-center gap-2 text-sm font-semibold text-slate-700",
                              children: [
                                (0, r.jsx)(i, { className: "h-4 w-4" }),
                                "Estado demo",
                              ],
                            }),
                            (0, r.jsx)("p", {
                              className:
                                "mt-2 text-sm leading-6 text-slate-600",
                              children:
                                "La pantalla ya comunica prioridad y siguiente acci\xf3n, mientras la l\xf3gica final de scoring sigue viviendo fuera de este frente.",
                            }),
                          ],
                        }),
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
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [962, 261, 441, 684, 358], () => t(5261)), (_N_E = e.O());
  },
]);
