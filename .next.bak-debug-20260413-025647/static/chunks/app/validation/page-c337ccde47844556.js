(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [8],
  {
    152: (e, a, t) => {
      "use strict";
      t.d(a, { A: () => i });
      var s = t(5155),
        l = t(6486);
      let r = {
        critical: "border-brand-200 bg-brand-50/80",
        warning: "border-amber-200 bg-amber-50/80",
        neutral: "border-slate-200 bg-slate-50/80",
      };
      function i(e) {
        let {
          label: a,
          title: t,
          tone: i = "neutral",
          children: n,
          className: c,
        } = e;
        return (0, s.jsxs)("article", {
          className: (0, l.cn)(
            "rounded-[28px] border p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
            r[i],
            c,
          ),
          children: [
            (0, s.jsx)("p", {
              className:
                "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
              children: a,
            }),
            t
              ? (0, s.jsx)("h3", {
                  className: "mt-2 text-lg font-semibold text-ink",
                  children: t,
                })
              : null,
            (0, s.jsx)("div", {
              className: "mt-3 text-sm leading-6 text-slate-700",
              children: n,
            }),
          ],
        });
      }
    },
    650: (e, a, t) => {
      "use strict";
      t.d(a, { W: () => i });
      var s = t(5155),
        l = t(6486);
      let r = {
        critical: "bg-brand-50 text-brand-800 ring-brand-200",
        warning: "bg-amber-50 text-amber-800 ring-amber-200",
        stable: "bg-emerald-50 text-emerald-800 ring-emerald-200",
        info: "bg-slate-100 text-slate-700 ring-slate-200",
      };
      function i(e) {
        let { label: a, tone: t } = e;
        return (0, s.jsx)("span", {
          className: (0, l.cn)(
            "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.01em] ring-1 ring-inset",
            r[t],
          ),
          children: a,
        });
      }
    },
    2721: (e, a, t) => {
      "use strict";
      t.d(a, { l: () => i });
      var s = t(5155),
        l = t(152),
        r = t(6726);
      function i(e) {
        let {
          eyebrow: a = "Patr\xf3n del agente",
          title: t,
          description: i,
          items: n,
        } = e;
        return (0, s.jsx)(r.i, {
          eyebrow: a,
          title: t,
          description: i,
          children: (0, s.jsx)("div", {
            className: "grid gap-3 md:grid-cols-2",
            children: n.map((e, a) => {
              var t;
              return (0, s.jsx)(
                l.A,
                {
                  label: "".concat(a + 1, ". ").concat(e.label),
                  tone: null != (t = e.tone) ? t : "neutral",
                  children: e.description,
                },
                e.id,
              );
            }),
          }),
        });
      }
    },
    4637: (e, a, t) => {
      "use strict";
      t.r(a), t.d(a, { default: () => b });
      var s = t(5155),
        l = t(2115);
      let r = l.forwardRef(function (e, a) {
          let { title: t, titleId: s, ...r } = e;
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
                ref: a,
                "aria-labelledby": s,
              },
              r,
            ),
            t ? l.createElement("title", { id: s }, t) : null,
            l.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
            }),
          );
        }),
        i = l.forwardRef(function (e, a) {
          let { title: t, titleId: s, ...r } = e;
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
                ref: a,
                "aria-labelledby": s,
              },
              r,
            ),
            t ? l.createElement("title", { id: s }, t) : null,
            l.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z",
            }),
          );
        });
      var n = t(152),
        c = t(2721),
        d = t(9303),
        o = t(7993),
        m = t(9551),
        x = t(650),
        u = t(5789);
      function b() {
        var e;
        let a = {
          criticalIssues: (e = (0, u.t)()).validationIssues.filter(
            (e) => "critical" === e.severity,
          ).length,
          openIssues: e.validationIssues.filter((e) => "Resuelta" !== e.status)
            .length,
          validationIssues: e.validationIssues,
        };
        return (0, s.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, s.jsx)(m.z, {
              eyebrow: "Validaci\xf3n",
              title: "Validaci\xf3n de datos",
              description:
                "Vista sobria para explicar qu\xe9 se valid\xf3, qu\xe9 sigue abierto y por qu\xe9 la confiabilidad metodol\xf3gica importa antes de confiar en cualquier priorizaci\xf3n del agente.",
              children: (0, s.jsxs)("div", {
                className: "grid gap-4 md:grid-cols-3",
                children: [
                  (0, s.jsx)(o.p, {
                    eyebrow: "Cobertura",
                    title: "Reglas visibles",
                    value: "".concat(a.validationIssues.length),
                    accent: "neutral",
                    icon: (0, s.jsx)(r, { className: "h-5 w-5" }),
                    description:
                      "Controles activos sobre campos que s\xed impactan la lectura operativa.",
                  }),
                  (0, s.jsx)(o.p, {
                    eyebrow: "Riesgo",
                    title: "Issues cr\xedticos",
                    value: "".concat(a.criticalIssues),
                    accent: "brand",
                    icon: (0, s.jsx)(i, { className: "h-5 w-5" }),
                    description:
                      "Bloquean o degradan la capacidad de recomendar una acci\xf3n confiable.",
                  }),
                  (0, s.jsx)(o.p, {
                    eyebrow: "Seguimiento",
                    title: "Issues abiertos",
                    value: "".concat(a.openIssues),
                    accent: "warning",
                    description:
                      "Pendientes antes de usar el benchmark solo como referencia comparativa.",
                  }),
                ],
              }),
            }),
            (0, s.jsxs)("div", {
              className: "grid gap-6 xl:grid-cols-[1.05fr_0.95fr]",
              children: [
                (0, s.jsx)("section", {
                  className: "space-y-4",
                  children: a.validationIssues.map((e) =>
                    (0, s.jsxs)(
                      "article",
                      {
                        className:
                          "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
                        children: [
                          (0, s.jsxs)("div", {
                            className:
                              "flex flex-col gap-4 md:flex-row md:items-start md:justify-between",
                            children: [
                              (0, s.jsxs)("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                  (0, s.jsxs)("div", {
                                    className:
                                      "flex flex-wrap items-center gap-3",
                                    children: [
                                      (0, s.jsx)("h2", {
                                        className:
                                          "text-lg font-semibold text-ink",
                                        children: e.rule,
                                      }),
                                      (0, s.jsx)(x.W, {
                                        label: e.status,
                                        tone: e.severity,
                                      }),
                                    ],
                                  }),
                                  (0, s.jsxs)("p", {
                                    className:
                                      "mt-3 text-sm font-medium text-slate-600",
                                    children: [
                                      "Campo afectado: ",
                                      e.affectedField,
                                    ],
                                  }),
                                ],
                              }),
                              (0, s.jsx)("div", {
                                className:
                                  "rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-600",
                                children: "Impacto visible en la demo",
                              }),
                            ],
                          }),
                          (0, s.jsxs)("div", {
                            className: "mt-5 grid gap-3 lg:grid-cols-3",
                            children: [
                              (0, s.jsx)(n.A, {
                                label: "Qu\xe9 se valid\xf3",
                                tone: "neutral",
                                children:
                                  "Regla aplicada al campo base para evitar depender ciegamente de derivados.",
                              }),
                              (0, s.jsx)(n.A, {
                                label: "Anomal\xeda detectada",
                                tone:
                                  "critical" === e.severity
                                    ? "critical"
                                    : "warning",
                                children: e.note,
                              }),
                              (0, s.jsx)(n.A, {
                                label: "Por qu\xe9 importa",
                                tone: "neutral",
                                children:
                                  "Si esta regla falla, el agente debe ser m\xe1s prudente con la lectura y la priorizaci\xf3n.",
                              }),
                            ],
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                }),
                (0, s.jsxs)("section", {
                  className: "space-y-6",
                  children: [
                    (0, s.jsx)(d.x, {
                      title:
                        "Comparaci\xf3n entre benchmark y lectura del agente",
                      description:
                        "La UI deja visible que cualquier benchmark heredado sirve como referencia comparativa, no como fuente de verdad central.",
                      leftLabel: "Benchmark heredado",
                      leftValue: "Solo referencia",
                      rightLabel: "Lectura actual del agente",
                      rightValue: "Recalcula antes de concluir",
                      footnote:
                        "Placeholder honesto: la comparaci\xf3n cuantitativa definitiva depende del frente de datos y del motor del agente.",
                    }),
                    (0, s.jsx)(c.l, {
                      eyebrow: "Nota metodol\xf3gica",
                      title: "Confiabilidad antes que precisi\xf3n aparente",
                      items: [
                        {
                          id: "base-fields",
                          label: "Campos base",
                          description:
                            "La vista privilegia campos base y reglas recalculadas antes de confiar en un score derivado.",
                          tone: "neutral",
                        },
                        {
                          id: "severity",
                          label: "Severidad",
                          description:
                            "La severidad visible expresa urgencia operativa, no una metodolog\xeda final congelada.",
                          tone: "warning",
                        },
                        {
                          id: "limit",
                          label: "L\xedmite expl\xedcito",
                          description:
                            "Cuando la evidencia no alcanza, el sistema debe seguir comunicando que hay informaci\xf3n insuficiente para concluir.",
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
    5453: (e, a, t) => {
      "use strict";
      t.d(a, { v: () => c });
      var s = t(2115);
      let l = (e) => {
          let a,
            t = new Set(),
            s = (e, s) => {
              let l = "function" == typeof e ? e(a) : e;
              if (!Object.is(l, a)) {
                let e = a;
                (a = (null != s ? s : "object" != typeof l || null === l)
                  ? l
                  : Object.assign({}, a, l)),
                  t.forEach((t) => t(a, e));
              }
            },
            l = () => a,
            r = {
              setState: s,
              getState: l,
              getInitialState: () => i,
              subscribe: (e) => (t.add(e), () => t.delete(e)),
            },
            i = (a = e(s, l, r));
          return r;
        },
        r = (e) => (e ? l(e) : l),
        i = (e) => e,
        n = (e) => {
          let a = r(e),
            t = (e) =>
              (function (e, a = i) {
                let t = s.useSyncExternalStore(
                  e.subscribe,
                  () => a(e.getState()),
                  () => a(e.getInitialState()),
                );
                return s.useDebugValue(t), t;
              })(a, e);
          return Object.assign(t, a), t;
        },
        c = (e) => (e ? n(e) : n);
    },
    5789: (e, a, t) => {
      "use strict";
      t.d(a, { t: () => r });
      var s = t(9052),
        l = t(6853);
      function r() {
        let e = (0, s.o)((e) => e.scenario);
        return (0, l.cz)(e);
      }
    },
    6726: (e, a, t) => {
      "use strict";
      t.d(a, { i: () => r });
      var s = t(5155),
        l = t(6486);
      function r(e) {
        let {
          eyebrow: a,
          title: t,
          description: r,
          actions: i,
          children: n,
          className: c,
        } = e;
        return (0, s.jsxs)("section", {
          className: (0, l.cn)(
            "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
            c,
          ),
          children: [
            (0, s.jsxs)("div", {
              className:
                "mb-5 flex flex-wrap items-start justify-between gap-3",
              children: [
                (0, s.jsxs)("div", {
                  className: "space-y-1",
                  children: [
                    a
                      ? (0, s.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                          children: a,
                        })
                      : null,
                    (0, s.jsx)("h2", {
                      className:
                        "text-xl font-semibold tracking-[-0.02em] text-ink",
                      children: t,
                    }),
                    r
                      ? (0, s.jsx)("p", {
                          className: "text-sm leading-6 text-slate-600",
                          children: r,
                        })
                      : null,
                  ],
                }),
                i,
              ],
            }),
            n,
          ],
        });
      }
    },
    7313: (e, a, t) => {
      Promise.resolve().then(t.bind(t, 4637));
    },
    7993: (e, a, t) => {
      "use strict";
      t.d(a, { p: () => i });
      var s = t(5155),
        l = t(6486);
      let r = {
        brand:
          "border-brand-100 bg-gradient-to-br from-white via-white to-brand-50/80",
        warning:
          "border-amber-200 bg-gradient-to-br from-white via-white to-amber-50/80",
        stable:
          "border-emerald-200 bg-gradient-to-br from-white via-white to-emerald-50/80",
        neutral: "border-slate-200 bg-white",
      };
      function i(e) {
        let {
          eyebrow: a,
          title: t,
          value: i,
          description: n,
          accent: c = "neutral",
          icon: d,
          footer: o,
          className: m,
        } = e;
        return (0, s.jsxs)("article", {
          className: (0, l.cn)(
            "rounded-[28px] border p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]",
            r[c],
            m,
          ),
          children: [
            (0, s.jsxs)("div", {
              className: "flex items-start justify-between gap-3",
              children: [
                (0, s.jsxs)("div", {
                  children: [
                    a
                      ? (0, s.jsx)("p", {
                          className:
                            "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
                          children: a,
                        })
                      : null,
                    (0, s.jsx)("h3", {
                      className: "mt-2 text-sm font-medium text-slate-600",
                      children: t,
                    }),
                  ],
                }),
                d
                  ? (0, s.jsx)("div", {
                      className:
                        "flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-100",
                      children: d,
                    })
                  : null,
              ],
            }),
            i
              ? (0, s.jsx)("p", {
                  className:
                    "mt-5 text-3xl font-semibold tracking-[-0.04em] text-ink",
                  children: i,
                })
              : null,
            n
              ? (0, s.jsx)("p", {
                  className: "mt-3 text-sm leading-6 text-slate-600",
                  children: n,
                })
              : null,
            o ? (0, s.jsx)("div", { className: "mt-5", children: o }) : null,
          ],
        });
      }
    },
    9303: (e, a, t) => {
      "use strict";
      t.d(a, { x: () => l });
      var s = t(5155);
      function l(e) {
        let {
          title: a,
          description: t,
          leftLabel: l,
          leftValue: i,
          rightLabel: n,
          rightValue: c,
          footnote: d,
        } = e;
        return (0, s.jsxs)("section", {
          className:
            "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
          children: [
            (0, s.jsx)("p", {
              className:
                "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
              children: "Benchmark",
            }),
            (0, s.jsx)("h2", {
              className: "mt-2 text-xl font-semibold text-ink",
              children: a,
            }),
            (0, s.jsx)("p", {
              className: "mt-2 text-sm leading-6 text-slate-600",
              children: t,
            }),
            (0, s.jsxs)("div", {
              className: "mt-6 grid gap-4 md:grid-cols-2",
              children: [
                (0, s.jsx)(r, { label: l, value: i }),
                (0, s.jsx)(r, { label: n, value: c }),
              ],
            }),
            d
              ? (0, s.jsx)("p", {
                  className: "mt-4 text-xs leading-5 text-slate-500",
                  children: d,
                })
              : null,
          ],
        });
      }
      function r(e) {
        let { label: a, value: t } = e;
        return (0, s.jsxs)("div", {
          className:
            "rounded-[24px] border border-slate-200 bg-slate-50/80 p-5",
          children: [
            (0, s.jsx)("p", {
              className:
                "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500",
              children: a,
            }),
            (0, s.jsx)("p", {
              className:
                "mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink",
              children: t,
            }),
          ],
        });
      }
    },
    9551: (e, a, t) => {
      "use strict";
      t.d(a, { z: () => r });
      var s = t(5155),
        l = t(6486);
      function r(e) {
        let {
          eyebrow: a,
          title: t,
          description: r,
          badge: i,
          actions: n,
          children: c,
          className: d,
        } = e;
        return (0, s.jsxs)("section", {
          className: (0, l.cn)(
            "overflow-hidden rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel shadow-brand-100/20 backdrop-blur md:p-7",
            d,
          ),
          children: [
            (0, s.jsxs)("div", {
              className:
                "flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between",
              children: [
                (0, s.jsxs)("div", {
                  className: "max-w-3xl",
                  children: [
                    a
                      ? (0, s.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.26em] text-brand-600",
                          children: a,
                        })
                      : null,
                    (0, s.jsxs)("div", {
                      className: "mt-3 flex flex-wrap items-center gap-3",
                      children: [
                        (0, s.jsx)("h1", {
                          className:
                            "text-3xl font-semibold tracking-[-0.03em] text-ink md:text-[2.35rem]",
                          children: t,
                        }),
                        i,
                      ],
                    }),
                    r
                      ? (0, s.jsx)("p", {
                          className:
                            "mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-[15px]",
                          children: r,
                        })
                      : null,
                  ],
                }),
                n
                  ? (0, s.jsx)("div", {
                      className: "flex shrink-0 flex-wrap gap-3",
                      children: n,
                    })
                  : null,
              ],
            }),
            c ? (0, s.jsx)("div", { className: "mt-6", children: c }) : null,
          ],
        });
      }
    },
  },
  (e) => {
    var a = (a) => e((e.s = a));
    e.O(0, [261, 441, 684, 358], () => a(7313)), (_N_E = e.O());
  },
]);
