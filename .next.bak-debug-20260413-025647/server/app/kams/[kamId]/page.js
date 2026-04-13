(() => {
  var e = {};
  (e.id = 976),
    (e.ids = [976]),
    (e.modules = {
      626: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        var s = r(687),
          a = r(7766);
        let n = {
          critical: "border-brand-200 bg-brand-50/80",
          warning: "border-amber-200 bg-amber-50/80",
          neutral: "border-slate-200 bg-slate-50/80",
        };
        function i({
          label: e,
          title: t,
          tone: r = "neutral",
          children: i,
          className: l,
        }) {
          return (0, s.jsxs)("article", {
            className: (0, a.cn)(
              "rounded-[28px] border p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
              n[r],
              l,
            ),
            children: [
              (0, s.jsx)("p", {
                className:
                  "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
                children: e,
              }),
              t
                ? (0, s.jsx)("h3", {
                    className: "mt-2 text-lg font-semibold text-ink",
                    children: t,
                  })
                : null,
              (0, s.jsx)("div", {
                className: "mt-3 text-sm leading-6 text-slate-700",
                children: i,
              }),
            ],
          });
        }
      },
      846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      1227: (e, t, r) => {
        "use strict";
        r.d(t, { l: () => i });
        var s = r(687),
          a = r(626),
          n = r(5100);
        function i({
          eyebrow: e = "Patr\xf3n del agente",
          title: t,
          description: r,
          items: i,
        }) {
          return (0, s.jsx)(n.i, {
            eyebrow: e,
            title: t,
            description: r,
            children: (0, s.jsx)("div", {
              className: "grid gap-3 md:grid-cols-2",
              children: i.map((e, t) =>
                (0, s.jsx)(
                  a.A,
                  {
                    label: `${t + 1}. ${e.label}`,
                    tone: e.tone ?? "neutral",
                    children: e.description,
                  },
                  e.id,
                ),
              ),
            }),
          });
        }
      },
      2180: (e, t, r) => {
        "use strict";
        r.d(t, { W: () => i });
        var s = r(687),
          a = r(7766);
        let n = {
          critical: "bg-brand-50 text-brand-800 ring-brand-200",
          warning: "bg-amber-50 text-amber-800 ring-amber-200",
          stable: "bg-emerald-50 text-emerald-800 ring-emerald-200",
          info: "bg-slate-100 text-slate-700 ring-slate-200",
        };
        function i({ label: e, tone: t }) {
          return (0, s.jsx)("span", {
            className: (0, a.cn)(
              "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.01em] ring-1 ring-inset",
              n[t],
            ),
            children: e,
          });
        }
      },
      3033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      3184: (e, t, r) => {
        "use strict";
        r.d(t, { W: () => a });
        var s = r(687);
        function a({ title: e, description: t }) {
          return (0, s.jsxs)("div", {
            className:
              "rounded-[28px] border border-brand-200 bg-brand-50/70 p-6",
            children: [
              (0, s.jsx)("h3", {
                className: "text-lg font-semibold text-brand-800",
                children: e,
              }),
              (0, s.jsx)("p", {
                className: "mt-2 text-sm leading-6 text-brand-700",
                children: t,
              }),
            ],
          });
        }
      },
      3229: (e, t, r) => {
        "use strict";
        r.d(t, { p: () => i });
        var s = r(687),
          a = r(7766);
        let n = {
          brand:
            "border-brand-100 bg-gradient-to-br from-white via-white to-brand-50/80",
          warning:
            "border-amber-200 bg-gradient-to-br from-white via-white to-amber-50/80",
          stable:
            "border-emerald-200 bg-gradient-to-br from-white via-white to-emerald-50/80",
          neutral: "border-slate-200 bg-white",
        };
        function i({
          eyebrow: e,
          title: t,
          value: r,
          description: i,
          accent: l = "neutral",
          icon: o,
          footer: d,
          className: c,
        }) {
          return (0, s.jsxs)("article", {
            className: (0, a.cn)(
              "rounded-[28px] border p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]",
              n[l],
              c,
            ),
            children: [
              (0, s.jsxs)("div", {
                className: "flex items-start justify-between gap-3",
                children: [
                  (0, s.jsxs)("div", {
                    children: [
                      e
                        ? (0, s.jsx)("p", {
                            className:
                              "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
                            children: e,
                          })
                        : null,
                      (0, s.jsx)("h3", {
                        className: "mt-2 text-sm font-medium text-slate-600",
                        children: t,
                      }),
                    ],
                  }),
                  o
                    ? (0, s.jsx)("div", {
                        className:
                          "flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-100",
                        children: o,
                      })
                    : null,
                ],
              }),
              r
                ? (0, s.jsx)("p", {
                    className:
                      "mt-5 text-3xl font-semibold tracking-[-0.04em] text-ink",
                    children: r,
                  })
                : null,
              i
                ? (0, s.jsx)("p", {
                    className: "mt-3 text-sm leading-6 text-slate-600",
                    children: i,
                  })
                : null,
              d ? (0, s.jsx)("div", { className: "mt-5", children: d }) : null,
            ],
          });
        }
      },
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3873: (e) => {
        "use strict";
        e.exports = require("path");
      },
      5100: (e, t, r) => {
        "use strict";
        r.d(t, { i: () => n });
        var s = r(687),
          a = r(7766);
        function n({
          eyebrow: e,
          title: t,
          description: r,
          actions: n,
          children: i,
          className: l,
        }) {
          return (0, s.jsxs)("section", {
            className: (0, a.cn)(
              "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
              l,
            ),
            children: [
              (0, s.jsxs)("div", {
                className:
                  "mb-5 flex flex-wrap items-start justify-between gap-3",
                children: [
                  (0, s.jsxs)("div", {
                    className: "space-y-1",
                    children: [
                      e
                        ? (0, s.jsx)("p", {
                            className:
                              "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                            children: e,
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
                  n,
                ],
              }),
              i,
            ],
          });
        }
      },
      5536: (e, t, r) => {
        "use strict";
        function s(e) {
          return "Cr\xedtico" === e
            ? "critical"
            : "En riesgo" === e
              ? "warning"
              : "info";
        }
        function a(e) {
          return e >= 4 ? "critical" : e >= 3 ? "warning" : "info";
        }
        r.d(t, { k: () => a, o: () => s });
      },
      5647: (e, t, r) => {
        "use strict";
        r.d(t, { b: () => l });
        var s = r(687),
          a = r(5814),
          n = r.n(a),
          i = r(2180);
        function l({ eyebrow: e, title: t, description: r, rows: a }) {
          return (0, s.jsxs)("section", {
            className:
              "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
            children: [
              (0, s.jsxs)("div", {
                className: "mb-5",
                children: [
                  e
                    ? (0, s.jsx)("p", {
                        className:
                          "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                        children: e,
                      })
                    : null,
                  (0, s.jsx)("h2", {
                    className: "mt-2 text-xl font-semibold text-ink",
                    children: t,
                  }),
                  r
                    ? (0, s.jsx)("p", {
                        className: "mt-2 text-sm text-slate-600",
                        children: r,
                      })
                    : null,
                ],
              }),
              (0, s.jsx)("div", {
                className:
                  "overflow-hidden rounded-[24px] border border-slate-200",
                children: (0, s.jsxs)("table", {
                  className: "min-w-full divide-y divide-slate-200 text-sm",
                  children: [
                    (0, s.jsx)("thead", {
                      className: "bg-slate-50/90",
                      children: (0, s.jsxs)("tr", {
                        className: "text-left text-slate-500",
                        children: [
                          (0, s.jsx)("th", {
                            className: "px-5 py-3 font-medium",
                            children: "Cuenta",
                          }),
                          (0, s.jsx)("th", {
                            className: "px-5 py-3 font-medium",
                            children: "Se\xf1al",
                          }),
                          (0, s.jsx)("th", {
                            className: "px-5 py-3 font-medium",
                            children: "Prioridad",
                          }),
                        ],
                      }),
                    }),
                    (0, s.jsx)("tbody", {
                      className: "divide-y divide-slate-100 bg-white",
                      children: a.map((e) =>
                        (0, s.jsxs)(
                          "tr",
                          {
                            className: "align-top",
                            children: [
                              (0, s.jsxs)("td", {
                                className: "px-5 py-4",
                                children: [
                                  (0, s.jsx)("p", {
                                    className: "font-semibold text-ink",
                                    children: e.title,
                                  }),
                                  (0, s.jsx)("p", {
                                    className: "mt-1 text-slate-500",
                                    children: e.subtitle,
                                  }),
                                ],
                              }),
                              (0, s.jsx)("td", {
                                className: "px-5 py-4 text-slate-700",
                                children: e.metric,
                              }),
                              (0, s.jsx)("td", {
                                className: "px-5 py-4",
                                children: (0, s.jsxs)("div", {
                                  className: "flex items-center gap-3",
                                  children: [
                                    (0, s.jsx)(i.W, {
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
                                      ? (0, s.jsx)(n(), {
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
      5879: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => a });
        var s = r(3210);
        let a = s.forwardRef(function ({ title: e, titleId: t, ...r }, a) {
          return s.createElement(
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
                "aria-labelledby": t,
              },
              r,
            ),
            e ? s.createElement("title", { id: t }, e) : null,
            s.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z",
            }),
          );
        });
      },
      6005: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 8960));
      },
      7275: (e, t, r) => {
        "use strict";
        r.d(t, { z: () => n });
        var s = r(687),
          a = r(7766);
        function n({
          eyebrow: e,
          title: t,
          description: r,
          badge: n,
          actions: i,
          children: l,
          className: o,
        }) {
          return (0, s.jsxs)("section", {
            className: (0, a.cn)(
              "overflow-hidden rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel shadow-brand-100/20 backdrop-blur md:p-7",
              o,
            ),
            children: [
              (0, s.jsxs)("div", {
                className:
                  "flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between",
                children: [
                  (0, s.jsxs)("div", {
                    className: "max-w-3xl",
                    children: [
                      e
                        ? (0, s.jsx)("p", {
                            className:
                              "text-xs font-semibold uppercase tracking-[0.26em] text-brand-600",
                            children: e,
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
                          n,
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
                  i
                    ? (0, s.jsx)("div", {
                        className: "flex shrink-0 flex-wrap gap-3",
                        children: i,
                      })
                    : null,
                ],
              }),
              l ? (0, s.jsx)("div", { className: "mt-6", children: l }) : null,
            ],
          });
        }
      },
      7357: (e, t, r) => {
        "use strict";
        r.d(t, { t: () => n });
        var s = r(1272),
          a = r(5653);
        function n() {
          let e = (0, s.o)((e) => e.scenario);
          return (0, a.cz)(e);
        }
      },
      7921: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => w });
        var s = r(687),
          a = r(5814),
          n = r.n(a),
          i = r(6189),
          l = r(5879),
          o = r(8552),
          d = r(3210);
        let c = d.forwardRef(function ({ title: e, titleId: t, ...r }, s) {
          return d.createElement(
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
                ref: s,
                "aria-labelledby": t,
              },
              r,
            ),
            e ? d.createElement("title", { id: t }, e) : null,
            d.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
            }),
          );
        });
        var m = r(626),
          x = r(1227),
          p = r(9708),
          u = r(3229),
          b = r(3184),
          h = r(7275),
          g = r(5647),
          f = r(2180),
          v = r(5536),
          j = r(7357);
        function w() {
          let e = (0, i.useParams)(),
            t = (function (e, t) {
              let r = e.kams.find((e) => e.id === t);
              if (!r) return null;
              let s = e.restaurants.filter((e) => e.kamId === r.id),
                a = s.filter((e) => "Cr\xedtico" === e.status).length,
                n = s.filter((e) => "Monitoreo" === e.status).length;
              return {
                kam: r,
                relatedRestaurants: s,
                criticalCount: a,
                monitoringCount: n,
                badgeTone: a > 0 ? "critical" : "warning",
                inventoryBars: [
                  {
                    label: "Cr\xedtico",
                    value: s.filter((e) => "Cr\xedtico" === e.status).length,
                    toneClass: "bg-brand",
                  },
                  {
                    label: "En riesgo",
                    value: s.filter((e) => "En riesgo" === e.status).length,
                    toneClass: "bg-amber-500",
                  },
                  { label: "Monitoreo", value: n, toneClass: "bg-slate-400" },
                ],
                rankingRows: s.map((e) => ({
                  id: e.id,
                  title: e.name,
                  subtitle: e.city,
                  metric: e.whyFlagged,
                  tone: (0, v.o)(e.status),
                  href: `/restaurants/${e.id}`,
                })),
              };
            })((0, j.t)(), e.kamId);
          if (!t)
            return (0, s.jsx)(b.W, {
              title: "KAM no encontrado",
              description:
                "El identificador solicitado no existe en el snapshot actual de demo.",
            });
          let {
            kam: r,
            relatedRestaurants: a,
            criticalCount: d,
            monitoringCount: w,
            badgeTone: N,
            inventoryBars: k,
            rankingRows: y,
          } = t;
          return (0, s.jsxs)("div", {
            className: "space-y-6",
            children: [
              (0, s.jsx)(h.z, {
                eyebrow: "Torre de control individual",
                title: r.name,
                description: `${r.portfolio}. Vista individual para leer presi\xf3n operativa del portfolio, ubicar cuentas a revisar y sostener una intervenci\xf3n m\xe1s explicable.`,
                badge: (0, s.jsx)(f.W, {
                  label:
                    d > 0
                      ? "Intervenci\xf3n prioritaria"
                      : "Seguimiento activo",
                  tone: N,
                }),
                actions: (0, s.jsx)(n(), {
                  href: "/kams",
                  className:
                    "inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-700",
                  children: "Volver a KAMs",
                }),
                children: (0, s.jsxs)("div", {
                  className: "grid gap-4 md:grid-cols-4",
                  children: [
                    (0, s.jsx)(u.p, {
                      eyebrow: "Portafolio",
                      title: "Restaurantes conectados",
                      value: `${a.length}`,
                      accent: "neutral",
                      icon: (0, s.jsx)(l.A, { className: "h-5 w-5" }),
                    }),
                    (0, s.jsx)(u.p, {
                      eyebrow: "Alerta",
                      title: "Alertas activas",
                      value: `${r.openAlerts}`,
                      accent: "brand",
                      icon: (0, s.jsx)(o.A, { className: "h-5 w-5" }),
                    }),
                    (0, s.jsx)(u.p, {
                      eyebrow: "Severidad",
                      title: "Cuentas cr\xedticas",
                      value: `${d}`,
                      accent: "warning",
                      icon: (0, s.jsx)(c, { className: "h-5 w-5" }),
                    }),
                    (0, s.jsx)(u.p, {
                      eyebrow: "Monitoreo",
                      title: "Cuentas en observaci\xf3n",
                      value: `${w}`,
                      accent: "neutral",
                      description:
                        "No se cierra score final; solo expresa el estado visible del mock.",
                    }),
                  ],
                }),
              }),
              (0, s.jsxs)("div", {
                className: "grid gap-6 xl:grid-cols-[1.05fr_0.95fr]",
                children: [
                  (0, s.jsxs)("section", {
                    className: "space-y-6",
                    children: [
                      (0, s.jsxs)("div", {
                        className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
                        children: [
                          (0, s.jsxs)(m.A, {
                            label: "Qu\xe9 pas\xf3",
                            tone: "critical",
                            children: [
                              r.narrative,
                              " La presi\xf3n se vuelve m\xe1s relevante cuando varias cuentas del mismo bloque comparten se\xf1ales operativas.",
                            ],
                          }),
                          (0, s.jsx)(m.A, {
                            label: "Por qu\xe9 importa",
                            tone: "warning",
                            children:
                              "Ca\xeddas coordinadas en activaci\xf3n, owners incompletos o ejecuci\xf3n promocional por debajo del patr\xf3n esperado.",
                          }),
                          (0, s.jsx)(m.A, {
                            label: "Qu\xe9 hacer",
                            tone: "neutral",
                            children:
                              "Revisar primero las cuentas cr\xedticas y separar qu\xe9 parte es dato pendiente de qu\xe9 parte es acci\xf3n comercial inmediata.",
                          }),
                        ],
                      }),
                      (0, s.jsx)(p._, {
                        eyebrow: "Distribuci\xf3n",
                        title: "Inventario del portafolio",
                        description:
                          "Distribuci\xf3n simple de estados visibles por restaurante dentro del KAM.",
                        children: (0, s.jsx)("div", {
                          className: "space-y-4",
                          children: k.map((e) => {
                            let t = `${Math.max((e.value / a.length) * 100, 8)}%`;
                            return (0, s.jsxs)(
                              "div",
                              {
                                children: [
                                  (0, s.jsxs)("div", {
                                    className:
                                      "flex items-center justify-between gap-3",
                                    children: [
                                      (0, s.jsx)("p", {
                                        className:
                                          "text-sm font-medium text-slate-700",
                                        children: e.label,
                                      }),
                                      (0, s.jsx)("p", {
                                        className:
                                          "text-sm font-semibold text-ink",
                                        children: e.value,
                                      }),
                                    ],
                                  }),
                                  (0, s.jsx)("div", {
                                    className:
                                      "mt-2 h-3 rounded-full bg-slate-100",
                                    children: (0, s.jsx)("div", {
                                      className: `h-3 rounded-full ${e.toneClass}`,
                                      style: { width: t },
                                    }),
                                  }),
                                ],
                              },
                              e.label,
                            );
                          }),
                        }),
                      }),
                    ],
                  }),
                  (0, s.jsxs)("section", {
                    className: "space-y-6",
                    children: [
                      (0, s.jsx)(g.b, {
                        eyebrow: "Top accounts",
                        title: "Cuentas a revisar primero",
                        description:
                          "Orden t\xe1ctico de apertura por restaurante dentro del portfolio.",
                        rows: y,
                      }),
                      (0, s.jsx)(x.l, {
                        eyebrow: "Siguiente movimiento",
                        title:
                          "C\xf3mo operar este KAM sin cerrar l\xf3gica no congelada",
                        items: [
                          {
                            id: "validate",
                            label: "Validar",
                            description:
                              "Confirmar si la se\xf1al viene de cobertura operativa, promo o integridad del input.",
                            tone: "warning",
                          },
                          {
                            id: "intervene",
                            label: "Intervenir",
                            description:
                              "Entrar al restaurante con estado cr\xedtico antes de ampliar acciones sobre todo el portfolio.",
                            tone: "critical",
                          },
                          {
                            id: "escalate",
                            label: "Escalar",
                            description:
                              "Si persiste la presi\xf3n, mover el caso a Alertas para seguimiento estructurado.",
                            tone: "neutral",
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
      8960: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => s });
        let s = (0, r(2907).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"/Users/jorge/ProyectosAI/kam-intel/src/app/kams/[kamId]/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "/Users/jorge/ProyectosAI/kam-intel/src/app/kams/[kamId]/page.tsx",
          "default",
        );
      },
      9121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      9294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      9534: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.a,
            __next_app__: () => m,
            pages: () => c,
            routeModule: () => x,
            tree: () => d,
          });
        var s = r(5239),
          a = r(8088),
          n = r(8170),
          i = r.n(n),
          l = r(893),
          o = {};
        for (let e in l)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (o[e] = () => l[e]);
        r.d(t, o);
        let d = {
            children: [
              "",
              {
                children: [
                  "kams",
                  {
                    children: [
                      "[kamId]",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 8960)),
                              "/Users/jorge/ProyectosAI/kam-intel/src/app/kams/[kamId]/page.tsx",
                            ],
                          },
                        ],
                      },
                      {},
                    ],
                  },
                  {},
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(r.bind(r, 8348)),
                  "/Users/jorge/ProyectosAI/kam-intel/src/app/layout.tsx",
                ],
                "not-found": [
                  () => Promise.resolve().then(r.t.bind(r, 7398, 23)),
                  "next/dist/client/components/not-found-error",
                ],
                forbidden: [
                  () => Promise.resolve().then(r.t.bind(r, 9999, 23)),
                  "next/dist/client/components/forbidden-error",
                ],
                unauthorized: [
                  () => Promise.resolve().then(r.t.bind(r, 5284, 23)),
                  "next/dist/client/components/unauthorized-error",
                ],
              },
            ],
          }.children,
          c = [
            "/Users/jorge/ProyectosAI/kam-intel/src/app/kams/[kamId]/page.tsx",
          ],
          m = { require: r, loadChunk: () => Promise.resolve() },
          x = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/kams/[kamId]/page",
              pathname: "/kams/[kamId]",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      9573: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 7921));
      },
      9708: (e, t, r) => {
        "use strict";
        r.d(t, { _: () => a });
        var s = r(687);
        function a({ eyebrow: e, title: t, description: r, children: a }) {
          return (0, s.jsxs)("section", {
            className:
              "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
            children: [
              e
                ? (0, s.jsx)("p", {
                    className:
                      "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                    children: e,
                  })
                : null,
              (0, s.jsx)("h2", {
                className: "mt-2 text-xl font-semibold text-ink",
                children: t,
              }),
              r
                ? (0, s.jsx)("p", {
                    className: "mt-2 text-sm text-slate-600",
                    children: r,
                  })
                : null,
              (0, s.jsx)("div", { className: "mt-6", children: a }),
            ],
          });
        }
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [370, 550], () => r(9534));
  module.exports = s;
})();
