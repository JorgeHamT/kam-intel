(() => {
  var e = {};
  (e.id = 974),
    (e.ids = [974]),
    (e.modules = {
      280: (e, t, s) => {
        "use strict";
        s.r(t),
          s.d(t, {
            GlobalError: () => n.a,
            __next_app__: () => m,
            pages: () => c,
            routeModule: () => x,
            tree: () => o,
          });
        var a = s(5239),
          r = s(8088),
          i = s(8170),
          n = s.n(i),
          l = s(893),
          d = {};
        for (let e in l)
          0 >
            [
              "default",
              "tree",
              "pages",
              "GlobalError",
              "__next_app__",
              "routeModule",
            ].indexOf(e) && (d[e] = () => l[e]);
        s.d(t, d);
        let o = [
            "",
            {
              children: [
                "__PAGE__",
                {},
                {
                  page: [
                    () => Promise.resolve().then(s.bind(s, 1204)),
                    "/Users/jorge/ProyectosAI/kam-intel/src/app/page.tsx",
                  ],
                },
              ],
            },
            {
              layout: [
                () => Promise.resolve().then(s.bind(s, 8348)),
                "/Users/jorge/ProyectosAI/kam-intel/src/app/layout.tsx",
              ],
              "not-found": [
                () => Promise.resolve().then(s.t.bind(s, 7398, 23)),
                "next/dist/client/components/not-found-error",
              ],
              forbidden: [
                () => Promise.resolve().then(s.t.bind(s, 9999, 23)),
                "next/dist/client/components/forbidden-error",
              ],
              unauthorized: [
                () => Promise.resolve().then(s.t.bind(s, 5284, 23)),
                "next/dist/client/components/unauthorized-error",
              ],
            },
          ],
          c = ["/Users/jorge/ProyectosAI/kam-intel/src/app/page.tsx"],
          m = { require: s, loadChunk: () => Promise.resolve() },
          x = new a.AppPageRouteModule({
            definition: {
              kind: r.RouteKind.APP_PAGE,
              page: "/page",
              pathname: "/",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: o },
          });
      },
      626: (e, t, s) => {
        "use strict";
        s.d(t, { A: () => n });
        var a = s(687),
          r = s(7766);
        let i = {
          critical: "border-brand-200 bg-brand-50/80",
          warning: "border-amber-200 bg-amber-50/80",
          neutral: "border-slate-200 bg-slate-50/80",
        };
        function n({
          label: e,
          title: t,
          tone: s = "neutral",
          children: n,
          className: l,
        }) {
          return (0, a.jsxs)("article", {
            className: (0, r.cn)(
              "rounded-[28px] border p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
              i[s],
              l,
            ),
            children: [
              (0, a.jsx)("p", {
                className:
                  "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
                children: e,
              }),
              t
                ? (0, a.jsx)("h3", {
                    className: "mt-2 text-lg font-semibold text-ink",
                    children: t,
                  })
                : null,
              (0, a.jsx)("div", {
                className: "mt-3 text-sm leading-6 text-slate-700",
                children: n,
              }),
            ],
          });
        }
      },
      846: (e) => {
        "use strict";
        e.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
      },
      1204: (e, t, s) => {
        "use strict";
        s.r(t), s.d(t, { default: () => a });
        let a = (0, s(2907).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"/Users/jorge/ProyectosAI/kam-intel/src/app/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "/Users/jorge/ProyectosAI/kam-intel/src/app/page.tsx",
          "default",
        );
      },
      1227: (e, t, s) => {
        "use strict";
        s.d(t, { l: () => n });
        var a = s(687),
          r = s(626),
          i = s(5100);
        function n({
          eyebrow: e = "Patr\xf3n del agente",
          title: t,
          description: s,
          items: n,
        }) {
          return (0, a.jsx)(i.i, {
            eyebrow: e,
            title: t,
            description: s,
            children: (0, a.jsx)("div", {
              className: "grid gap-3 md:grid-cols-2",
              children: n.map((e, t) =>
                (0, a.jsx)(
                  r.A,
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
      2180: (e, t, s) => {
        "use strict";
        s.d(t, { W: () => n });
        var a = s(687),
          r = s(7766);
        let i = {
          critical: "bg-brand-50 text-brand-800 ring-brand-200",
          warning: "bg-amber-50 text-amber-800 ring-amber-200",
          stable: "bg-emerald-50 text-emerald-800 ring-emerald-200",
          info: "bg-slate-100 text-slate-700 ring-slate-200",
        };
        function n({ label: e, tone: t }) {
          return (0, a.jsx)("span", {
            className: (0, r.cn)(
              "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.01em] ring-1 ring-inset",
              i[t],
            ),
            children: e,
          });
        }
      },
      3033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      3229: (e, t, s) => {
        "use strict";
        s.d(t, { p: () => n });
        var a = s(687),
          r = s(7766);
        let i = {
          brand:
            "border-brand-100 bg-gradient-to-br from-white via-white to-brand-50/80",
          warning:
            "border-amber-200 bg-gradient-to-br from-white via-white to-amber-50/80",
          stable:
            "border-emerald-200 bg-gradient-to-br from-white via-white to-emerald-50/80",
          neutral: "border-slate-200 bg-white",
        };
        function n({
          eyebrow: e,
          title: t,
          value: s,
          description: n,
          accent: l = "neutral",
          icon: d,
          footer: o,
          className: c,
        }) {
          return (0, a.jsxs)("article", {
            className: (0, r.cn)(
              "rounded-[28px] border p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]",
              i[l],
              c,
            ),
            children: [
              (0, a.jsxs)("div", {
                className: "flex items-start justify-between gap-3",
                children: [
                  (0, a.jsxs)("div", {
                    children: [
                      e
                        ? (0, a.jsx)("p", {
                            className:
                              "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
                            children: e,
                          })
                        : null,
                      (0, a.jsx)("h3", {
                        className: "mt-2 text-sm font-medium text-slate-600",
                        children: t,
                      }),
                    ],
                  }),
                  d
                    ? (0, a.jsx)("div", {
                        className:
                          "flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-100",
                        children: d,
                      })
                    : null,
                ],
              }),
              s
                ? (0, a.jsx)("p", {
                    className:
                      "mt-5 text-3xl font-semibold tracking-[-0.04em] text-ink",
                    children: s,
                  })
                : null,
              n
                ? (0, a.jsx)("p", {
                    className: "mt-3 text-sm leading-6 text-slate-600",
                    children: n,
                  })
                : null,
              o ? (0, a.jsx)("div", { className: "mt-5", children: o }) : null,
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
      5100: (e, t, s) => {
        "use strict";
        s.d(t, { i: () => i });
        var a = s(687),
          r = s(7766);
        function i({
          eyebrow: e,
          title: t,
          description: s,
          actions: i,
          children: n,
          className: l,
        }) {
          return (0, a.jsxs)("section", {
            className: (0, r.cn)(
              "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
              l,
            ),
            children: [
              (0, a.jsxs)("div", {
                className:
                  "mb-5 flex flex-wrap items-start justify-between gap-3",
                children: [
                  (0, a.jsxs)("div", {
                    className: "space-y-1",
                    children: [
                      e
                        ? (0, a.jsx)("p", {
                            className:
                              "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                            children: e,
                          })
                        : null,
                      (0, a.jsx)("h2", {
                        className:
                          "text-xl font-semibold tracking-[-0.02em] text-ink",
                        children: t,
                      }),
                      s
                        ? (0, a.jsx)("p", {
                            className: "text-sm leading-6 text-slate-600",
                            children: s,
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
      5531: (e, t, s) => {
        "use strict";
        s.d(t, { V: () => l });
        var a = s(687),
          r = s(7766);
        let i = {
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
        function l({ items: e, columns: t = 4, className: s }) {
          return (0, a.jsx)("div", {
            className: (0, r.cn)("grid gap-3", n[t], s),
            children: e.map((e) =>
              (0, a.jsxs)(
                "article",
                {
                  className: (0, r.cn)(
                    "rounded-[24px] border p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
                    i[e.tone ?? "neutral"],
                  ),
                  children: [
                    (0, a.jsx)("p", {
                      className:
                        "text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500",
                      children: e.label,
                    }),
                    (0, a.jsx)("p", {
                      className:
                        "mt-2 text-lg font-semibold tracking-[-0.03em] text-ink",
                      children: e.value,
                    }),
                    e.detail
                      ? (0, a.jsx)("p", {
                          className: "mt-2 text-sm leading-6 text-slate-600",
                          children: e.detail,
                        })
                      : null,
                  ],
                },
                e.id,
              ),
            ),
          });
        }
      },
      5536: (e, t, s) => {
        "use strict";
        function a(e) {
          return "Cr\xedtico" === e
            ? "critical"
            : "En riesgo" === e
              ? "warning"
              : "info";
        }
        function r(e) {
          return e >= 4 ? "critical" : e >= 3 ? "warning" : "info";
        }
        s.d(t, { k: () => r, o: () => a });
      },
      5641: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 1204));
      },
      5647: (e, t, s) => {
        "use strict";
        s.d(t, { b: () => l });
        var a = s(687),
          r = s(5814),
          i = s.n(r),
          n = s(2180);
        function l({ eyebrow: e, title: t, description: s, rows: r }) {
          return (0, a.jsxs)("section", {
            className:
              "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
            children: [
              (0, a.jsxs)("div", {
                className: "mb-5",
                children: [
                  e
                    ? (0, a.jsx)("p", {
                        className:
                          "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                        children: e,
                      })
                    : null,
                  (0, a.jsx)("h2", {
                    className: "mt-2 text-xl font-semibold text-ink",
                    children: t,
                  }),
                  s
                    ? (0, a.jsx)("p", {
                        className: "mt-2 text-sm text-slate-600",
                        children: s,
                      })
                    : null,
                ],
              }),
              (0, a.jsx)("div", {
                className:
                  "overflow-hidden rounded-[24px] border border-slate-200",
                children: (0, a.jsxs)("table", {
                  className: "min-w-full divide-y divide-slate-200 text-sm",
                  children: [
                    (0, a.jsx)("thead", {
                      className: "bg-slate-50/90",
                      children: (0, a.jsxs)("tr", {
                        className: "text-left text-slate-500",
                        children: [
                          (0, a.jsx)("th", {
                            className: "px-5 py-3 font-medium",
                            children: "Cuenta",
                          }),
                          (0, a.jsx)("th", {
                            className: "px-5 py-3 font-medium",
                            children: "Se\xf1al",
                          }),
                          (0, a.jsx)("th", {
                            className: "px-5 py-3 font-medium",
                            children: "Prioridad",
                          }),
                        ],
                      }),
                    }),
                    (0, a.jsx)("tbody", {
                      className: "divide-y divide-slate-100 bg-white",
                      children: r.map((e) =>
                        (0, a.jsxs)(
                          "tr",
                          {
                            className: "align-top",
                            children: [
                              (0, a.jsxs)("td", {
                                className: "px-5 py-4",
                                children: [
                                  (0, a.jsx)("p", {
                                    className: "font-semibold text-ink",
                                    children: e.title,
                                  }),
                                  (0, a.jsx)("p", {
                                    className: "mt-1 text-slate-500",
                                    children: e.subtitle,
                                  }),
                                ],
                              }),
                              (0, a.jsx)("td", {
                                className: "px-5 py-4 text-slate-700",
                                children: e.metric,
                              }),
                              (0, a.jsx)("td", {
                                className: "px-5 py-4",
                                children: (0, a.jsxs)("div", {
                                  className: "flex items-center gap-3",
                                  children: [
                                    (0, a.jsx)(n.W, {
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
                                      ? (0, a.jsx)(i(), {
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
      5700: (e, t, s) => {
        "use strict";
        s.d(t, { A: () => r });
        var a = s(3210);
        let r = a.forwardRef(function ({ title: e, titleId: t, ...s }, r) {
          return a.createElement(
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
                ref: r,
                "aria-labelledby": t,
              },
              s,
            ),
            e ? a.createElement("title", { id: t }, e) : null,
            a.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
            }),
          );
        });
      },
      7275: (e, t, s) => {
        "use strict";
        s.d(t, { z: () => i });
        var a = s(687),
          r = s(7766);
        function i({
          eyebrow: e,
          title: t,
          description: s,
          badge: i,
          actions: n,
          children: l,
          className: d,
        }) {
          return (0, a.jsxs)("section", {
            className: (0, r.cn)(
              "overflow-hidden rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel shadow-brand-100/20 backdrop-blur md:p-7",
              d,
            ),
            children: [
              (0, a.jsxs)("div", {
                className:
                  "flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between",
                children: [
                  (0, a.jsxs)("div", {
                    className: "max-w-3xl",
                    children: [
                      e
                        ? (0, a.jsx)("p", {
                            className:
                              "text-xs font-semibold uppercase tracking-[0.26em] text-brand-600",
                            children: e,
                          })
                        : null,
                      (0, a.jsxs)("div", {
                        className: "mt-3 flex flex-wrap items-center gap-3",
                        children: [
                          (0, a.jsx)("h1", {
                            className:
                              "text-3xl font-semibold tracking-[-0.03em] text-ink md:text-[2.35rem]",
                            children: t,
                          }),
                          i,
                        ],
                      }),
                      s
                        ? (0, a.jsx)("p", {
                            className:
                              "mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-[15px]",
                            children: s,
                          })
                        : null,
                    ],
                  }),
                  n
                    ? (0, a.jsx)("div", {
                        className: "flex shrink-0 flex-wrap gap-3",
                        children: n,
                      })
                    : null,
                ],
              }),
              l ? (0, a.jsx)("div", { className: "mt-6", children: l }) : null,
            ],
          });
        }
      },
      7357: (e, t, s) => {
        "use strict";
        s.d(t, { t: () => i });
        var a = s(1272),
          r = s(5653);
        function i() {
          let e = (0, a.o)((e) => e.scenario);
          return (0, r.cz)(e);
        }
      },
      7377: (e, t, s) => {
        "use strict";
        s.r(t), s.d(t, { default: () => C });
        var a = s(687),
          r = s(3210);
        let i = r.forwardRef(function ({ title: e, titleId: t, ...s }, a) {
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
                ref: a,
                "aria-labelledby": t,
              },
              s,
            ),
            e ? r.createElement("title", { id: t }, e) : null,
            r.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3",
            }),
          );
        });
        var n = s(5814),
          l = s.n(n),
          d = s(5100),
          o = s(2180);
        function c({ items: e }) {
          return (0, a.jsx)(d.i, {
            eyebrow: "Seguimiento",
            title: "Resumen de alertas",
            description:
              "Cola inicial para demo, conectada visualmente con la narrativa del agente.",
            actions: (0, a.jsx)(l(), {
              href: "/alerts",
              className: "text-sm font-semibold text-brand-700",
              children: "Ver todas",
            }),
            children: (0, a.jsx)("div", {
              className:
                "overflow-hidden rounded-[24px] border border-slate-200",
              children: (0, a.jsxs)("table", {
                className: "min-w-full divide-y divide-slate-100 text-sm",
                children: [
                  (0, a.jsx)("thead", {
                    className: "bg-slate-50",
                    children: (0, a.jsxs)("tr", {
                      className: "text-left text-slate-500",
                      children: [
                        (0, a.jsx)("th", {
                          className: "px-4 py-3 font-medium",
                          children: "Alerta",
                        }),
                        (0, a.jsx)("th", {
                          className: "px-4 py-3 font-medium",
                          children: "Owner",
                        }),
                        (0, a.jsx)("th", {
                          className: "px-4 py-3 font-medium",
                          children: "Estado",
                        }),
                        (0, a.jsx)("th", {
                          className: "px-4 py-3 font-medium",
                          children: "ETA",
                        }),
                      ],
                    }),
                  }),
                  (0, a.jsx)("tbody", {
                    className: "divide-y divide-slate-100 bg-white",
                    children: e.map((e) =>
                      (0, a.jsxs)(
                        "tr",
                        {
                          children: [
                            (0, a.jsx)("td", {
                              className: "px-4 py-4 font-medium text-ink",
                              children: e.title,
                            }),
                            (0, a.jsx)("td", {
                              className: "px-4 py-4 text-slate-700",
                              children: e.owner,
                            }),
                            (0, a.jsx)("td", {
                              className: "px-4 py-4 text-slate-700",
                              children: (0, a.jsx)(o.W, {
                                label: e.status,
                                tone: e.status.includes("Bloqueando")
                                  ? "critical"
                                  : e.status.includes("seguimiento")
                                    ? "warning"
                                    : "info",
                              }),
                            }),
                            (0, a.jsx)("td", {
                              className: "px-4 py-4 text-slate-700",
                              children: e.eta,
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
          });
        }
        let m = r.forwardRef(function ({ title: e, titleId: t, ...s }, a) {
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
                ref: a,
                "aria-labelledby": t,
              },
              s,
            ),
            e ? r.createElement("title", { id: t }, e) : null,
            r.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
            }),
          );
        });
        function x(e) {
          let {
            headline: t,
            detected: s,
            whyItMatters: r,
            recommendation: i,
            nextStep: n,
          } = e;
          return (0, a.jsx)("section", {
            className:
              "overflow-hidden rounded-[34px] border border-brand-200 bg-[linear-gradient(135deg,#211f23_0%,#312326_60%,#5a2c30_100%)] p-6 text-white shadow-panel md:p-8",
            children: (0, a.jsxs)("div", {
              className:
                "flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between",
              children: [
                (0, a.jsxs)("div", {
                  className: "max-w-3xl",
                  children: [
                    (0, a.jsxs)("div", {
                      className:
                        "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-100",
                      children: [
                        (0, a.jsx)(m, { className: "h-4 w-4" }),
                        "Lectura del agente",
                      ],
                    }),
                    (0, a.jsx)("h2", {
                      className:
                        "mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-[2.65rem]",
                      children: t,
                    }),
                    (0, a.jsxs)("div", {
                      className:
                        "mt-5 max-w-2xl rounded-[28px] border border-white/10 bg-white/5 p-5",
                      children: [
                        (0, a.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.22em] text-brand-100",
                          children: "Qu\xe9 detect\xf3",
                        }),
                        (0, a.jsx)("p", {
                          className: "mt-3 text-sm leading-7 text-white/82",
                          children: s,
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsxs)("div", {
                  className:
                    "grid max-w-xl gap-4 md:grid-cols-3 xl:w-[560px] xl:grid-cols-1",
                  children: [
                    (0, a.jsx)(p, { label: "Por qu\xe9 importa", value: r }),
                    (0, a.jsx)(p, { label: "Qu\xe9 recomienda", value: i }),
                    (0, a.jsx)(p, { label: "Siguiente paso", value: n }),
                  ],
                }),
              ],
            }),
          });
        }
        function p({ label: e, value: t }) {
          return (0, a.jsxs)("div", {
            className: "rounded-[24px] border border-white/10 bg-white/5 p-4",
            children: [
              (0, a.jsx)("p", {
                className:
                  "text-xs font-semibold uppercase tracking-[0.18em] text-brand-100",
                children: e,
              }),
              (0, a.jsx)("p", {
                className: "mt-2 text-sm leading-6 text-white/85",
                children: t,
              }),
            ],
          });
        }
        function u({ items: e }) {
          return (0, a.jsx)(d.i, {
            eyebrow: "Prioridad",
            title: "KAMs bajo presi\xf3n",
            description:
              "Lectura operativa inicial con foco en d\xf3nde conviene actuar primero.",
            children: (0, a.jsx)("div", {
              className: "space-y-4",
              children: e.map((e) =>
                (0, a.jsx)(
                  "article",
                  {
                    className:
                      "rounded-[26px] border border-slate-200 bg-slate-50/80 p-5",
                    children: (0, a.jsxs)("div", {
                      className:
                        "flex flex-col gap-3 md:flex-row md:items-start md:justify-between",
                      children: [
                        (0, a.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, a.jsxs)("div", {
                              className: "flex items-center gap-3",
                              children: [
                                (0, a.jsx)("h3", {
                                  className: "text-base font-semibold text-ink",
                                  children: e.name,
                                }),
                                (0, a.jsx)(o.W, {
                                  label: e.pressureLabel,
                                  tone: "warning",
                                }),
                              ],
                            }),
                            (0, a.jsx)("p", {
                              className: "text-sm font-medium text-slate-700",
                              children: e.segment,
                            }),
                            (0, a.jsxs)("div", {
                              className: "grid gap-3 md:grid-cols-2",
                              children: [
                                (0, a.jsxs)("div", {
                                  className:
                                    "rounded-2xl border border-white bg-white p-4",
                                  children: [
                                    (0, a.jsx)("p", {
                                      className:
                                        "text-xs font-semibold uppercase tracking-[0.16em] text-slate-500",
                                      children: "Presi\xf3n operativa",
                                    }),
                                    (0, a.jsx)("p", {
                                      className:
                                        "mt-2 text-sm leading-6 text-slate-700",
                                      children: e.focus,
                                    }),
                                  ],
                                }),
                                (0, a.jsxs)("div", {
                                  className:
                                    "rounded-2xl border border-white bg-white p-4",
                                  children: [
                                    (0, a.jsx)("p", {
                                      className:
                                        "text-xs font-semibold uppercase tracking-[0.16em] text-slate-500",
                                      children: "Siguiente paso",
                                    }),
                                    (0, a.jsx)("p", {
                                      className:
                                        "mt-2 text-sm leading-6 text-slate-700",
                                      children: e.nextStep,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsx)(l(), {
                          href: `/kams/${e.id}`,
                          className:
                            "text-sm font-semibold text-brand-700 transition hover:text-brand-800",
                          children: "Ver detalle",
                        }),
                      ],
                    }),
                  },
                  e.id,
                ),
              ),
            }),
          });
        }
        var b = s(5700);
        let h = r.forwardRef(function ({ title: e, titleId: t, ...s }, a) {
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
                ref: a,
                "aria-labelledby": t,
              },
              s,
            ),
            e ? r.createElement("title", { id: t }, e) : null,
            r.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181",
            }),
          );
        });
        var g = s(3229);
        function j({ items: e }) {
          return (0, a.jsx)("div", {
            className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
            children: e.map((e) => {
              let t = "critical" === e.tone,
                s =
                  "critical" === e.tone
                    ? "brand"
                    : "warning" === e.tone
                      ? "warning"
                      : "stable" === e.tone
                        ? "stable"
                        : "neutral";
              return (0, a.jsx)(
                g.p,
                {
                  eyebrow: "Indicador clave",
                  title: e.label,
                  value: e.value,
                  accent: s,
                  footer: (0, a.jsxs)(a.Fragment, {
                    children: [
                      (0, a.jsxs)("div", {
                        className: "flex items-center justify-between gap-3",
                        children: [
                          (0, a.jsxs)("div", {
                            className:
                              "flex items-center gap-2 text-sm font-medium text-slate-700",
                            children: [
                              t
                                ? (0, a.jsx)(b.A, {
                                    className: "h-4 w-4 text-brand-600",
                                  })
                                : (0, a.jsx)(h, {
                                    className: "h-4 w-4 text-emerald-600",
                                  }),
                              e.delta,
                            ],
                          }),
                          (0, a.jsx)(o.W, {
                            label:
                              "critical" === e.tone
                                ? "Atenci\xf3n"
                                : "warning" === e.tone
                                  ? "Seguimiento"
                                  : "stable" === e.tone
                                    ? "Estable"
                                    : "Contexto",
                            tone: e.tone,
                          }),
                        ],
                      }),
                      (0, a.jsx)("p", {
                        className: "mt-3 text-sm leading-6 text-slate-600",
                        children: e.insight,
                      }),
                    ],
                  }),
                },
                e.id,
              );
            }),
          });
        }
        function f({ items: e }) {
          return (0, a.jsx)(d.i, {
            eyebrow: "Se\xf1ales",
            title: "Se\xf1ales detectadas",
            description:
              "Patr\xf3n base visible desde el arranque: qu\xe9 detect\xf3, por qu\xe9 importa y c\xf3mo responder.",
            children: (0, a.jsx)("div", {
              className: "space-y-4",
              children: e.map((e, t) =>
                (0, a.jsxs)(
                  "article",
                  {
                    className:
                      "rounded-[26px] border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 p-5",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "flex items-start justify-between gap-3",
                        children: [
                          (0, a.jsxs)("div", {
                            children: [
                              (0, a.jsx)("h3", {
                                className: "text-base font-semibold text-ink",
                                children: e.title,
                              }),
                              (0, a.jsx)("p", {
                                className:
                                  "mt-2 text-sm leading-6 text-slate-600",
                                children: e.detection,
                              }),
                            ],
                          }),
                          (0, a.jsx)(o.W, {
                            label:
                              "critical" === e.tone
                                ? "Cr\xedtico"
                                : "warning" === e.tone
                                  ? "En riesgo"
                                  : "Monitoreo",
                            tone: e.tone,
                          }),
                        ],
                      }),
                      (0, a.jsxs)("dl", {
                        className: "mt-4 grid gap-3 md:grid-cols-3",
                        children: [
                          (0, a.jsx)(v, {
                            label:
                              0 === t
                                ? "Por qu\xe9 fue marcado"
                                : "Por qu\xe9 importa",
                            value: e.whyItMatters,
                          }),
                          (0, a.jsx)(v, {
                            label: "Qu\xe9 recomienda",
                            value: e.recommendation,
                          }),
                          (0, a.jsx)(v, {
                            label: "Siguiente paso",
                            value: e.nextStep,
                          }),
                        ],
                      }),
                    ],
                  },
                  e.id,
                ),
              ),
            }),
          });
        }
        function v({ label: e, value: t }) {
          return (0, a.jsxs)("div", {
            className: "rounded-2xl bg-slate-50 p-4",
            children: [
              (0, a.jsx)("dt", {
                className:
                  "text-xs font-semibold uppercase tracking-[0.16em] text-muted",
                children: e,
              }),
              (0, a.jsx)("dd", {
                className: "mt-2 text-sm leading-6 text-slate-700",
                children: t,
              }),
            ],
          });
        }
        var w = s(626),
          N = s(1227),
          y = s(9708),
          k = s(7275),
          _ = s(5647),
          A = s(5531),
          P = s(5536),
          E = s(7357);
        function C() {
          let e = (function (e) {
            let t = e.restaurants.reduce(
              (e, t) => ((e[t.city] = (e[t.city] ?? 0) + 1), e),
              {},
            );
            return {
              header: {
                eyebrow: "Control tower",
                title: "Inteligencia operativa para foco comercial inmediato",
                description:
                  "Lectura ejecutiva del portafolio: d\xf3nde est\xe1 concentrado el riesgo, qu\xe9 ya detect\xf3 el agente y en qu\xe9 orden conviene intervenir sin sobreprometer precisi\xf3n no validada.",
              },
              scenario: e.scenarioOption,
              topKpis: e.topKpis,
              kamPressureItems: e.kamPressureItems,
              alertSummary: e.alertSummary,
              kams: e.kams,
              restaurants: e.restaurants,
              cityBars: Object.entries(t).map(([e, t]) => ({
                city: e,
                total: t,
              })),
              rankingRows: e.kams.map((e) => ({
                id: e.id,
                title: e.name,
                subtitle: e.portfolio,
                metric: `${e.restaurantsAtRisk} restaurantes en riesgo \xb7 ${e.openAlerts} alertas abiertas`,
                tone: (0, P.k)(e.openAlerts),
                href: `/kams/${e.id}`,
              })),
              digest: e.agentDigest,
            };
          })((0, E.t)());
          return (0, a.jsxs)("div", {
            className: "space-y-6",
            children: [
              (0, a.jsxs)(k.z, {
                eyebrow: e.header.eyebrow,
                title: e.header.title,
                description: e.header.description,
                children: [
                  (0, a.jsxs)("div", {
                    className: "grid gap-4 xl:grid-cols-[1.15fr_0.85fr]",
                    children: [
                      (0, a.jsx)(g.p, {
                        eyebrow: "Foco cr\xedtico",
                        title: "Riesgo prioritario del d\xeda",
                        value: "Cobertura comercial tensionada",
                        accent: "brand",
                        description:
                          "Las se\xf1ales activas se concentran en cuentas clave y ya requieren seguimiento coordinado entre KAM, operaci\xf3n y validaci\xf3n de datos.",
                      }),
                      (0, a.jsx)(w.A, {
                        label: "Briefing ejecutivo",
                        tone: "neutral",
                        children:
                          "El sistema ya expresa el patr\xf3n del agente en la primera lectura: detecci\xf3n, impacto, intervenci\xf3n sugerida y siguiente movimiento operativo.",
                      }),
                    ],
                  }),
                  (0, a.jsx)(A.V, {
                    className: "mt-4",
                    columns: 4,
                    items: [
                      {
                        id: "scenario",
                        label: "Escenario activo",
                        value: e.scenario.label,
                        detail: e.scenario.subtitle,
                        tone: "neutral",
                      },
                      {
                        id: "signals",
                        label: "Se\xf1ales visibles",
                        value: `${e.digest.signals.length}`,
                        detail:
                          "Lectura abierta del agente en este snapshot controlado.",
                        tone: "warning",
                      },
                      {
                        id: "priority-kams",
                        label: "KAMs priorizados",
                        value: `${e.kams.length}`,
                        detail:
                          "Managers visibles para decidir d\xf3nde bajar primero.",
                        tone: "critical",
                      },
                      {
                        id: "alerts",
                        label: "Alertas activas",
                        value: `${e.alertSummary.length}`,
                        detail:
                          "Cola operativa lista para seguimiento y trazabilidad.",
                        tone: "stable",
                      },
                    ],
                  }),
                ],
              }),
              (0, a.jsx)(x, {
                headline: e.digest.headline,
                detected: e.digest.detected,
                whyItMatters: e.digest.whyItMatters,
                recommendation: e.digest.recommendation,
                nextStep: e.digest.nextStep,
              }),
              (0, a.jsx)(j, { items: e.topKpis }),
              (0, a.jsxs)("div", {
                className: "grid gap-6 xl:grid-cols-[1.2fr_0.8fr]",
                children: [
                  (0, a.jsx)(u, { items: e.kamPressureItems }),
                  (0, a.jsx)(f, { items: e.digest.signals }),
                ],
              }),
              (0, a.jsxs)("div", {
                className: "grid gap-6 xl:grid-cols-[0.95fr_1.05fr]",
                children: [
                  (0, a.jsx)(y._, {
                    eyebrow: "Concentraci\xf3n",
                    title: "Ciudades con cuentas bajo seguimiento",
                    description:
                      "Lectura simple de concentraci\xf3n de riesgo por plaza usando solo el inventario mock ya visible.",
                    children: (0, a.jsx)("div", {
                      className: "space-y-4",
                      children: e.cityBars.map((t) => {
                        let s = `${Math.max((t.total / e.restaurants.length) * 100, 16)}%`;
                        return (0, a.jsxs)(
                          "div",
                          {
                            children: [
                              (0, a.jsxs)("div", {
                                className:
                                  "flex items-center justify-between gap-3",
                                children: [
                                  (0, a.jsx)("p", {
                                    className:
                                      "text-sm font-medium text-slate-700",
                                    children: t.city,
                                  }),
                                  (0, a.jsxs)("p", {
                                    className: "text-sm font-semibold text-ink",
                                    children: [t.total, " cuentas"],
                                  }),
                                ],
                              }),
                              (0, a.jsx)("div", {
                                className: "mt-2 h-3 rounded-full bg-slate-100",
                                children: (0, a.jsx)("div", {
                                  className: "h-3 rounded-full bg-brand",
                                  style: { width: s },
                                }),
                              }),
                            ],
                          },
                          t.city,
                        );
                      }),
                    }),
                  }),
                  (0, a.jsx)(_.b, {
                    eyebrow: "Intervenci\xf3n",
                    title: "KAMs priorizados para seguimiento",
                    description:
                      "Orden visual para decidir d\xf3nde abrir el siguiente hilo de intervenci\xf3n.",
                    rows: e.rankingRows,
                  }),
                ],
              }),
              (0, a.jsxs)("div", {
                className: "grid gap-6 xl:grid-cols-[1.05fr_0.95fr]",
                children: [
                  (0, a.jsx)(c, { items: e.alertSummary }),
                  (0, a.jsx)(N.l, {
                    eyebrow: "Resumen de intervenci\xf3n",
                    title: "Qu\xe9 hacer despu\xe9s de esta lectura",
                    description:
                      "La pantalla ya ordena el movimiento del operador sin vender una metodolog\xeda final que todav\xeda no est\xe1 congelada.",
                    items: [
                      {
                        id: "validate",
                        label: "Validar",
                        description:
                          "Confirmar que las se\xf1ales con promo, owner y cobertura operativa no vienen de campos incompletos.",
                        tone: "warning",
                      },
                      {
                        id: "prioritize",
                        label: "Priorizar",
                        description:
                          "Enfocar la revisi\xf3n t\xe1ctica en los KAMs con m\xe1s concentraci\xf3n de restaurantes cr\xedticos.",
                        tone: "critical",
                      },
                      {
                        id: "execute",
                        label: "Ejecutar",
                        description:
                          "Abrir el detalle de cada cuenta con evidencia y acci\xf3n recomendada antes del siguiente refresh.",
                        tone: "neutral",
                      },
                      {
                        id: "operate",
                        label: "Operar la cola",
                        description:
                          "Navegar a Alertas para sostener owner, ETA y seguimiento visible sobre los casos urgentes.",
                        tone: "neutral",
                      },
                    ],
                  }),
                ],
              }),
              (0, a.jsxs)("div", {
                className:
                  "inline-flex items-center gap-2 text-sm font-semibold text-brand-700",
                children: [
                  "Navega a Alertas para operar la cola urgente",
                  (0, a.jsx)(i, { className: "h-4 w-4" }),
                ],
              }),
            ],
          });
        }
      },
      7497: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 7377));
      },
      9121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      9294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      9708: (e, t, s) => {
        "use strict";
        s.d(t, { _: () => r });
        var a = s(687);
        function r({ eyebrow: e, title: t, description: s, children: r }) {
          return (0, a.jsxs)("section", {
            className:
              "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
            children: [
              e
                ? (0, a.jsx)("p", {
                    className:
                      "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                    children: e,
                  })
                : null,
              (0, a.jsx)("h2", {
                className: "mt-2 text-xl font-semibold text-ink",
                children: t,
              }),
              s
                ? (0, a.jsx)("p", {
                    className: "mt-2 text-sm text-slate-600",
                    children: s,
                  })
                : null,
              (0, a.jsx)("div", { className: "mt-6", children: r }),
            ],
          });
        }
      },
    });
  var t = require("../webpack-runtime.js");
  t.C(e);
  var s = (e) => t((t.s = e)),
    a = t.X(0, [370, 550], () => s(280));
  module.exports = a;
})();
