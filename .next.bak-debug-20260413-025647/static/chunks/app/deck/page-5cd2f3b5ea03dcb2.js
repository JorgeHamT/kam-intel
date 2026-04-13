(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [558],
  {
    152: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => i });
      var l = a(5155),
        s = a(6486);
      let r = {
        critical: "border-brand-200 bg-brand-50/80",
        warning: "border-amber-200 bg-amber-50/80",
        neutral: "border-slate-200 bg-slate-50/80",
      };
      function i(e) {
        let {
          label: t,
          title: a,
          tone: i = "neutral",
          children: n,
          className: c,
        } = e;
        return (0, l.jsxs)("article", {
          className: (0, s.cn)(
            "rounded-[28px] border p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
            r[i],
            c,
          ),
          children: [
            (0, l.jsx)("p", {
              className:
                "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
              children: t,
            }),
            a
              ? (0, l.jsx)("h3", {
                  className: "mt-2 text-lg font-semibold text-ink",
                  children: a,
                })
              : null,
            (0, l.jsx)("div", {
              className: "mt-3 text-sm leading-6 text-slate-700",
              children: n,
            }),
          ],
        });
      }
    },
    2721: (e, t, a) => {
      "use strict";
      a.d(t, { l: () => i });
      var l = a(5155),
        s = a(152),
        r = a(6726);
      function i(e) {
        let {
          eyebrow: t = "Patr\xf3n del agente",
          title: a,
          description: i,
          items: n,
        } = e;
        return (0, l.jsx)(r.i, {
          eyebrow: t,
          title: a,
          description: i,
          children: (0, l.jsx)("div", {
            className: "grid gap-3 md:grid-cols-2",
            children: n.map((e, t) => {
              var a;
              return (0, l.jsx)(
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
    5453: (e, t, a) => {
      "use strict";
      a.d(t, { v: () => c });
      var l = a(2115);
      let s = (e) => {
          let t,
            a = new Set(),
            l = (e, l) => {
              let s = "function" == typeof e ? e(t) : e;
              if (!Object.is(s, t)) {
                let e = t;
                (t = (null != l ? l : "object" != typeof s || null === s)
                  ? s
                  : Object.assign({}, t, s)),
                  a.forEach((a) => a(t, e));
              }
            },
            s = () => t,
            r = {
              setState: l,
              getState: s,
              getInitialState: () => i,
              subscribe: (e) => (a.add(e), () => a.delete(e)),
            },
            i = (t = e(l, s, r));
          return r;
        },
        r = (e) => (e ? s(e) : s),
        i = (e) => e,
        n = (e) => {
          let t = r(e),
            a = (e) =>
              (function (e, t = i) {
                let a = l.useSyncExternalStore(
                  e.subscribe,
                  () => t(e.getState()),
                  () => t(e.getInitialState()),
                );
                return l.useDebugValue(a), a;
              })(t, e);
          return Object.assign(a, t), a;
        },
        c = (e) => (e ? n(e) : n);
    },
    5789: (e, t, a) => {
      "use strict";
      a.d(t, { t: () => r });
      var l = a(9052),
        s = a(6853);
      function r() {
        let e = (0, l.o)((e) => e.scenario);
        return (0, s.cz)(e);
      }
    },
    5891: (e, t, a) => {
      Promise.resolve().then(a.bind(a, 7655));
    },
    6171: (e, t, a) => {
      "use strict";
      a.d(t, { V: () => n });
      var l = a(5155),
        s = a(6486);
      let r = {
          critical: "border-brand-100 bg-brand-50/70",
          warning: "border-amber-200 bg-amber-50/70",
          stable: "border-emerald-200 bg-emerald-50/70",
          neutral: "border-slate-200 bg-slate-50/70",
        },
        i = {
          2: "md:grid-cols-2",
          3: "md:grid-cols-3",
          4: "md:grid-cols-2 xl:grid-cols-4",
        };
      function n(e) {
        let { items: t, columns: a = 4, className: n } = e;
        return (0, l.jsx)("div", {
          className: (0, s.cn)("grid gap-3", i[a], n),
          children: t.map((e) => {
            var t;
            return (0, l.jsxs)(
              "article",
              {
                className: (0, s.cn)(
                  "rounded-[24px] border p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
                  r[null != (t = e.tone) ? t : "neutral"],
                ),
                children: [
                  (0, l.jsx)("p", {
                    className:
                      "text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500",
                    children: e.label,
                  }),
                  (0, l.jsx)("p", {
                    className:
                      "mt-2 text-lg font-semibold tracking-[-0.03em] text-ink",
                    children: e.value,
                  }),
                  e.detail
                    ? (0, l.jsx)("p", {
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
      a.d(t, { i: () => r });
      var l = a(5155),
        s = a(6486);
      function r(e) {
        let {
          eyebrow: t,
          title: a,
          description: r,
          actions: i,
          children: n,
          className: c,
        } = e;
        return (0, l.jsxs)("section", {
          className: (0, s.cn)(
            "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
            c,
          ),
          children: [
            (0, l.jsxs)("div", {
              className:
                "mb-5 flex flex-wrap items-start justify-between gap-3",
              children: [
                (0, l.jsxs)("div", {
                  className: "space-y-1",
                  children: [
                    t
                      ? (0, l.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                          children: t,
                        })
                      : null,
                    (0, l.jsx)("h2", {
                      className:
                        "text-xl font-semibold tracking-[-0.02em] text-ink",
                      children: a,
                    }),
                    r
                      ? (0, l.jsx)("p", {
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
    7655: (e, t, a) => {
      "use strict";
      a.r(t), a.d(t, { default: () => d });
      var l = a(5155),
        s = a(2721),
        r = a(9551),
        i = a(6726),
        n = a(6171),
        c = a(5789);
      function d() {
        var e;
        let t = {
          sections: (e = (0, c.t)()).deckSections,
          scenario: e.scenarioOption,
        };
        return (0, l.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, l.jsx)(r.z, {
              eyebrow: "Deck",
              title: "Deck interactivo",
              description:
                "Ruta interna para apoyar el walkthrough de demo sin competir con la navegaci\xf3n operativa ni afirmar resultados todav\xeda no congelados.",
              children: (0, l.jsx)(n.V, {
                columns: 3,
                items: [
                  {
                    id: "scenario",
                    label: "Escenario activo",
                    value: t.scenario.label,
                    detail: t.scenario.subtitle,
                    tone: "neutral",
                  },
                  {
                    id: "sections",
                    label: "Bloques visibles",
                    value: "".concat(t.sections.length),
                    detail:
                      "Secciones stub conectadas al producto, no a una narrativa final cerrada.",
                    tone: "warning",
                  },
                  {
                    id: "purpose",
                    label: "Rol dentro del producto",
                    value: "Acompa\xf1ar demo",
                    detail:
                      "Sirve como apoyo de storytelling sin desplazar la lectura operativa.",
                    tone: "stable",
                  },
                ],
              }),
            }),
            (0, l.jsx)(i.i, {
              eyebrow: "Estructura actual",
              title: "Bloques visibles del deck",
              description:
                "Cada tarjeta expresa qu\xe9 parte del relato ya est\xe1 presente y qu\xe9 sigue deliberadamente abierto.",
              children: (0, l.jsx)("div", {
                className: "grid gap-4 xl:grid-cols-3",
                children: t.sections.map((e) =>
                  (0, l.jsxs)(
                    "article",
                    {
                      className:
                        "rounded-3xl border border-slate-100 bg-slate-50/70 p-5",
                      children: [
                        (0, l.jsx)("h3", {
                          className: "text-base font-semibold text-ink",
                          children: e.title,
                        }),
                        (0, l.jsx)("p", {
                          className: "mt-3 text-sm leading-6 text-muted",
                          children: e.objective,
                        }),
                        (0, l.jsx)("p", {
                          className: "mt-4 text-sm font-medium text-brand-700",
                          children: e.status,
                        }),
                      ],
                    },
                    e.id,
                  ),
                ),
              }),
            }),
            (0, l.jsx)(s.l, {
              eyebrow: "Uso recomendado",
              title: "C\xf3mo presentar este deck sin sobreprometer",
              items: [
                {
                  id: "problem",
                  label: "Qu\xe9 mostrar",
                  description:
                    "Usarlo para conectar problema, soluci\xf3n y flujo visual entre pantallas ya implementadas.",
                  tone: "neutral",
                },
                {
                  id: "limits",
                  label: "Qu\xe9 no fingir",
                  description:
                    "Evitar claims de scoring final, benchmark definitivo o validaci\xf3n metodol\xf3gica cerrada.",
                  tone: "warning",
                },
                {
                  id: "next",
                  label: "Siguiente paso",
                  description:
                    "Dejarlo listo para que storytelling final lo complete cuando los otros frentes congelen narrativa y evidencia.",
                  tone: "critical",
                },
              ],
            }),
          ],
        });
      }
    },
    9551: (e, t, a) => {
      "use strict";
      a.d(t, { z: () => r });
      var l = a(5155),
        s = a(6486);
      function r(e) {
        let {
          eyebrow: t,
          title: a,
          description: r,
          badge: i,
          actions: n,
          children: c,
          className: d,
        } = e;
        return (0, l.jsxs)("section", {
          className: (0, s.cn)(
            "overflow-hidden rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel shadow-brand-100/20 backdrop-blur md:p-7",
            d,
          ),
          children: [
            (0, l.jsxs)("div", {
              className:
                "flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between",
              children: [
                (0, l.jsxs)("div", {
                  className: "max-w-3xl",
                  children: [
                    t
                      ? (0, l.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.26em] text-brand-600",
                          children: t,
                        })
                      : null,
                    (0, l.jsxs)("div", {
                      className: "mt-3 flex flex-wrap items-center gap-3",
                      children: [
                        (0, l.jsx)("h1", {
                          className:
                            "text-3xl font-semibold tracking-[-0.03em] text-ink md:text-[2.35rem]",
                          children: a,
                        }),
                        i,
                      ],
                    }),
                    r
                      ? (0, l.jsx)("p", {
                          className:
                            "mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-[15px]",
                          children: r,
                        })
                      : null,
                  ],
                }),
                n
                  ? (0, l.jsx)("div", {
                      className: "flex shrink-0 flex-wrap gap-3",
                      children: n,
                    })
                  : null,
              ],
            }),
            c ? (0, l.jsx)("div", { className: "mt-6", children: c }) : null,
          ],
        });
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [261, 441, 684, 358], () => t(5891)), (_N_E = e.O());
  },
]);
