(() => {
  var e = {};
  (e.id = 558),
    (e.ids = [558]),
    (e.modules = {
      229: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => s });
        let s = (0, r(2907).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"/Users/jorge/ProyectosAI/kam-intel/src/app/deck/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "/Users/jorge/ProyectosAI/kam-intel/src/app/deck/page.tsx",
          "default",
        );
      },
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
      3033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      3295: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
      },
      3413: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 8539));
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
      5531: (e, t, r) => {
        "use strict";
        r.d(t, { V: () => l });
        var s = r(687),
          a = r(7766);
        let n = {
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
        function l({ items: e, columns: t = 4, className: r }) {
          return (0, s.jsx)("div", {
            className: (0, a.cn)("grid gap-3", i[t], r),
            children: e.map((e) =>
              (0, s.jsxs)(
                "article",
                {
                  className: (0, a.cn)(
                    "rounded-[24px] border p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
                    n[e.tone ?? "neutral"],
                  ),
                  children: [
                    (0, s.jsx)("p", {
                      className:
                        "text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500",
                      children: e.label,
                    }),
                    (0, s.jsx)("p", {
                      className:
                        "mt-2 text-lg font-semibold tracking-[-0.03em] text-ink",
                      children: e.value,
                    }),
                    e.detail
                      ? (0, s.jsx)("p", {
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
      8539: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => d });
        var s = r(687),
          a = r(1227),
          n = r(7275),
          i = r(5100),
          l = r(5531),
          o = r(7357);
        function d() {
          var e;
          let t = {
            sections: (e = (0, o.t)()).deckSections,
            scenario: e.scenarioOption,
          };
          return (0, s.jsxs)("div", {
            className: "space-y-6",
            children: [
              (0, s.jsx)(n.z, {
                eyebrow: "Deck",
                title: "Deck interactivo",
                description:
                  "Ruta interna para apoyar el walkthrough de demo sin competir con la navegaci\xf3n operativa ni afirmar resultados todav\xeda no congelados.",
                children: (0, s.jsx)(l.V, {
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
                      value: `${t.sections.length}`,
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
              (0, s.jsx)(i.i, {
                eyebrow: "Estructura actual",
                title: "Bloques visibles del deck",
                description:
                  "Cada tarjeta expresa qu\xe9 parte del relato ya est\xe1 presente y qu\xe9 sigue deliberadamente abierto.",
                children: (0, s.jsx)("div", {
                  className: "grid gap-4 xl:grid-cols-3",
                  children: t.sections.map((e) =>
                    (0, s.jsxs)(
                      "article",
                      {
                        className:
                          "rounded-3xl border border-slate-100 bg-slate-50/70 p-5",
                        children: [
                          (0, s.jsx)("h3", {
                            className: "text-base font-semibold text-ink",
                            children: e.title,
                          }),
                          (0, s.jsx)("p", {
                            className: "mt-3 text-sm leading-6 text-muted",
                            children: e.objective,
                          }),
                          (0, s.jsx)("p", {
                            className:
                              "mt-4 text-sm font-medium text-brand-700",
                            children: e.status,
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                }),
              }),
              (0, s.jsx)(a.l, {
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
      9078: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.a,
            __next_app__: () => p,
            pages: () => c,
            routeModule: () => m,
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
                  "deck",
                  {
                    children: [
                      "__PAGE__",
                      {},
                      {
                        page: [
                          () => Promise.resolve().then(r.bind(r, 229)),
                          "/Users/jorge/ProyectosAI/kam-intel/src/app/deck/page.tsx",
                        ],
                      },
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
          c = ["/Users/jorge/ProyectosAI/kam-intel/src/app/deck/page.tsx"],
          p = { require: r, loadChunk: () => Promise.resolve() },
          m = new s.AppPageRouteModule({
            definition: {
              kind: a.RouteKind.APP_PAGE,
              page: "/deck/page",
              pathname: "/deck",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      9121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      9294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      9493: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 229));
      },
    });
  var t = require("../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    s = t.X(0, [370, 550], () => r(9078));
  module.exports = s;
})();
