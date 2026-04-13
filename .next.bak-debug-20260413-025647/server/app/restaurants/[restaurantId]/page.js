(() => {
  var e = {};
  (e.id = 244),
    (e.ids = [244]),
    (e.modules = {
      107: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 624));
      },
      624: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => a });
        let a = (0, r(2907).registerClientReference)(
          function () {
            throw Error(
              "Attempted to call the default export of \"/Users/jorge/ProyectosAI/kam-intel/src/app/restaurants/[restaurantId]/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.",
            );
          },
          "/Users/jorge/ProyectosAI/kam-intel/src/app/restaurants/[restaurantId]/page.tsx",
          "default",
        );
      },
      626: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => i });
        var a = r(687),
          s = r(7766);
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
          return (0, a.jsxs)("article", {
            className: (0, s.cn)(
              "rounded-[28px] border p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
              n[r],
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
        var a = r(687),
          s = r(626),
          n = r(5100);
        function i({
          eyebrow: e = "Patr\xf3n del agente",
          title: t,
          description: r,
          items: i,
        }) {
          return (0, a.jsx)(n.i, {
            eyebrow: e,
            title: t,
            description: r,
            children: (0, a.jsx)("div", {
              className: "grid gap-3 md:grid-cols-2",
              children: i.map((e, t) =>
                (0, a.jsx)(
                  s.A,
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
      1791: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { default: () => j });
        var a = r(687),
          s = r(5814),
          n = r.n(s),
          i = r(6189),
          l = r(5879),
          o = r(3210);
        let d = o.forwardRef(function ({ title: e, titleId: t, ...r }, a) {
            return o.createElement(
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
              e ? o.createElement("title", { id: t }, e) : null,
              o.createElement("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
              }),
              o.createElement("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
              }),
            );
          }),
          c = o.forwardRef(function ({ title: e, titleId: t, ...r }, a) {
            return o.createElement(
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
              e ? o.createElement("title", { id: t }, e) : null,
              o.createElement("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
              }),
            );
          });
        var m = r(626),
          u = r(1227),
          x = r(2771),
          p = r(3229),
          b = r(3184),
          h = r(7275),
          g = r(2180),
          f = r(5536),
          v = r(7357);
        function j() {
          let e = (0, i.useParams)(),
            t = (function (e, t) {
              let r = e.restaurants.find((e) => e.id === t);
              if (!r) return null;
              let a = e.kams.find((e) => e.id === r.kamId),
                s = (0, f.o)(r.status);
              return { restaurant: r, kam: a, tone: s };
            })((0, v.t)(), e.restaurantId);
          if (!t)
            return (0, a.jsx)(b.W, {
              title: "Restaurante no encontrado",
              description:
                "El identificador solicitado no existe en el snapshot actual de demo.",
            });
          let { restaurant: r, kam: s, tone: o } = t;
          return (0, a.jsxs)("div", {
            className: "space-y-6",
            children: [
              (0, a.jsx)(h.z, {
                eyebrow: "Diagn\xf3stico operativo",
                title: r.name,
                description: `${r.city}. La lectura del restaurante explica el riesgo visible, evita falsa precisi\xf3n y deja clara la acci\xf3n sugerida.`,
                badge: (0, a.jsx)(g.W, { label: r.status, tone: o }),
                actions: s
                  ? (0, a.jsx)(n(), {
                      href: `/kams/${s.id}`,
                      className:
                        "inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-700",
                      children: "Volver al KAM",
                    })
                  : null,
                children: (0, a.jsxs)("div", {
                  className: "grid gap-4 md:grid-cols-4",
                  children: [
                    (0, a.jsx)(p.p, {
                      eyebrow: "Riesgo",
                      title: "Estado actual",
                      value: r.status,
                      accent:
                        "critical" === o
                          ? "brand"
                          : "warning" === o
                            ? "warning"
                            : "neutral",
                      icon: (0, a.jsx)(l.A, { className: "h-5 w-5" }),
                    }),
                    (0, a.jsx)(p.p, {
                      eyebrow: "Cobertura",
                      title: "Ciudad",
                      value: r.city,
                      accent: "neutral",
                      icon: (0, a.jsx)(d, { className: "h-5 w-5" }),
                    }),
                    (0, a.jsx)(p.p, {
                      eyebrow: "Owner",
                      title: "KAM responsable",
                      value: s?.name ?? "Sin asignar",
                      accent: "neutral",
                      icon: (0, a.jsx)(c, { className: "h-5 w-5" }),
                    }),
                    (0, a.jsx)(p.p, {
                      eyebrow: "Siguiente paso",
                      title: "Acci\xf3n inmediata",
                      value: "Revisar evidencia",
                      accent: "warning",
                      description:
                        "La automatizaci\xf3n final no se cierra en este frente; la UI s\xed deja claro el siguiente movimiento.",
                    }),
                  ],
                }),
              }),
              (0, a.jsxs)("div", {
                className: "grid gap-6 xl:grid-cols-[1.05fr_0.95fr]",
                children: [
                  (0, a.jsxs)("section", {
                    className: "space-y-6",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "grid gap-4 md:grid-cols-2",
                        children: [
                          (0, a.jsx)(m.A, {
                            label: "Qu\xe9 pas\xf3",
                            tone: "critical" === o ? "critical" : "warning",
                            children: r.whyFlagged,
                          }),
                          (0, a.jsx)(m.A, {
                            label: "Por qu\xe9 importa",
                            tone: "neutral",
                            children:
                              "Una se\xf1al en esta cuenta puede afectar la percepci\xf3n de salud del portfolio y distorsionar la priorizaci\xf3n del KAM si no se explica bien.",
                          }),
                          (0, a.jsx)(m.A, {
                            label: "Qu\xe9 hacer",
                            tone: "neutral",
                            children: r.recommendation,
                          }),
                          (0, a.jsx)(m.A, {
                            label: "Siguiente paso",
                            tone: "warning",
                            children:
                              "Validar insumo operativo, revisar contexto comercial y decidir si el caso pasa a seguimiento reforzado.",
                          }),
                        ],
                      }),
                      (0, a.jsx)(u.l, {
                        eyebrow: "Resumen ejecutivo",
                        title:
                          "Qu\xe9 sabemos y qu\xe9 todav\xeda no debemos fingir",
                        items: [
                          {
                            id: "diagnosis",
                            label: "Diagn\xf3stico operativo",
                            description:
                              "La cuenta ya muestra una causalidad legible para demo: se\xf1al, impacto y acci\xf3n sugerida.",
                            tone: "neutral",
                          },
                          {
                            id: "limit",
                            label: "L\xedmite metodol\xf3gico",
                            description:
                              "El score definitivo y la prioridad cuantitativa final dependen de otras capas todav\xeda no congeladas.",
                            tone: "warning",
                          },
                        ],
                      }),
                    ],
                  }),
                  (0, a.jsxs)("section", {
                    className: "space-y-6",
                    children: [
                      (0, a.jsx)(x.x, {
                        title: "Contexto comparativo",
                        description:
                          "Referencia visual para comparar la lectura actual del restaurante con una expectativa operativa m\xe1s conservadora.",
                        leftLabel: "Lectura comparativa",
                        leftValue:
                          "Cr\xedtico" === r.status
                            ? "Por encima del umbral esperado"
                            : "Bajo observaci\xf3n",
                        rightLabel: "Confianza metodol\xf3gica",
                        rightValue: "Sujeta a validaci\xf3n",
                        footnote:
                          "La UI deja claro que el benchmark es contextual; no reemplaza el rec\xe1lculo del agente.",
                      }),
                      (0, a.jsxs)("div", {
                        className:
                          "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
                        children: [
                          (0, a.jsx)("p", {
                            className:
                              "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                            children: "Navegaci\xf3n contextual",
                          }),
                          (0, a.jsx)("h2", {
                            className: "mt-2 text-xl font-semibold text-ink",
                            children: "Desde aqu\xed puedes seguir el caso",
                          }),
                          (0, a.jsxs)("div", {
                            className: "mt-5 space-y-3",
                            children: [
                              s
                                ? (0, a.jsxs)(n(), {
                                    href: `/kams/${s.id}`,
                                    className:
                                      "block rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-brand-200 hover:bg-brand-50/60",
                                    children: [
                                      (0, a.jsx)("p", {
                                        className: "font-semibold text-ink",
                                        children: "Volver al detalle del KAM",
                                      }),
                                      (0, a.jsx)("p", {
                                        className:
                                          "mt-1 text-sm leading-6 text-slate-600",
                                        children:
                                          "Retoma el portfolio completo para entender si el caso es aislado o sist\xe9mico.",
                                      }),
                                    ],
                                  })
                                : null,
                              (0, a.jsxs)(n(), {
                                href: "/alerts",
                                className:
                                  "block rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-brand-200 hover:bg-brand-50/60",
                                children: [
                                  (0, a.jsx)("p", {
                                    className: "font-semibold text-ink",
                                    children: "Ir a Alertas",
                                  }),
                                  (0, a.jsx)("p", {
                                    className:
                                      "mt-1 text-sm leading-6 text-slate-600",
                                    children:
                                      "Usa la cola operativa si el caso requiere owner, ETA y seguimiento visible.",
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
              }),
            ],
          });
        }
      },
      2162: (e, t, r) => {
        "use strict";
        r.r(t),
          r.d(t, {
            GlobalError: () => i.a,
            __next_app__: () => m,
            pages: () => c,
            routeModule: () => u,
            tree: () => d,
          });
        var a = r(5239),
          s = r(8088),
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
                  "restaurants",
                  {
                    children: [
                      "[restaurantId]",
                      {
                        children: [
                          "__PAGE__",
                          {},
                          {
                            page: [
                              () => Promise.resolve().then(r.bind(r, 624)),
                              "/Users/jorge/ProyectosAI/kam-intel/src/app/restaurants/[restaurantId]/page.tsx",
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
            "/Users/jorge/ProyectosAI/kam-intel/src/app/restaurants/[restaurantId]/page.tsx",
          ],
          m = { require: r, loadChunk: () => Promise.resolve() },
          u = new a.AppPageRouteModule({
            definition: {
              kind: s.RouteKind.APP_PAGE,
              page: "/restaurants/[restaurantId]/page",
              pathname: "/restaurants/[restaurantId]",
              bundlePath: "",
              filename: "",
              appPaths: [],
            },
            userland: { loaderTree: d },
          });
      },
      2180: (e, t, r) => {
        "use strict";
        r.d(t, { W: () => i });
        var a = r(687),
          s = r(7766);
        let n = {
          critical: "bg-brand-50 text-brand-800 ring-brand-200",
          warning: "bg-amber-50 text-amber-800 ring-amber-200",
          stable: "bg-emerald-50 text-emerald-800 ring-emerald-200",
          info: "bg-slate-100 text-slate-700 ring-slate-200",
        };
        function i({ label: e, tone: t }) {
          return (0, a.jsx)("span", {
            className: (0, s.cn)(
              "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.01em] ring-1 ring-inset",
              n[t],
            ),
            children: e,
          });
        }
      },
      2771: (e, t, r) => {
        "use strict";
        r.d(t, { x: () => s });
        var a = r(687);
        function s({
          title: e,
          description: t,
          leftLabel: r,
          leftValue: s,
          rightLabel: i,
          rightValue: l,
          footnote: o,
        }) {
          return (0, a.jsxs)("section", {
            className:
              "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
            children: [
              (0, a.jsx)("p", {
                className:
                  "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                children: "Benchmark",
              }),
              (0, a.jsx)("h2", {
                className: "mt-2 text-xl font-semibold text-ink",
                children: e,
              }),
              (0, a.jsx)("p", {
                className: "mt-2 text-sm leading-6 text-slate-600",
                children: t,
              }),
              (0, a.jsxs)("div", {
                className: "mt-6 grid gap-4 md:grid-cols-2",
                children: [
                  (0, a.jsx)(n, { label: r, value: s }),
                  (0, a.jsx)(n, { label: i, value: l }),
                ],
              }),
              o
                ? (0, a.jsx)("p", {
                    className: "mt-4 text-xs leading-5 text-slate-500",
                    children: o,
                  })
                : null,
            ],
          });
        }
        function n({ label: e, value: t }) {
          return (0, a.jsxs)("div", {
            className:
              "rounded-[24px] border border-slate-200 bg-slate-50/80 p-5",
            children: [
              (0, a.jsx)("p", {
                className:
                  "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500",
                children: e,
              }),
              (0, a.jsx)("p", {
                className:
                  "mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink",
                children: t,
              }),
            ],
          });
        }
      },
      3033: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
      },
      3184: (e, t, r) => {
        "use strict";
        r.d(t, { W: () => s });
        var a = r(687);
        function s({ title: e, description: t }) {
          return (0, a.jsxs)("div", {
            className:
              "rounded-[28px] border border-brand-200 bg-brand-50/70 p-6",
            children: [
              (0, a.jsx)("h3", {
                className: "text-lg font-semibold text-brand-800",
                children: e,
              }),
              (0, a.jsx)("p", {
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
        var a = r(687),
          s = r(7766);
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
          return (0, a.jsxs)("article", {
            className: (0, s.cn)(
              "rounded-[28px] border p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]",
              n[l],
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
                  o
                    ? (0, a.jsx)("div", {
                        className:
                          "flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-100",
                        children: o,
                      })
                    : null,
                ],
              }),
              r
                ? (0, a.jsx)("p", {
                    className:
                      "mt-5 text-3xl font-semibold tracking-[-0.04em] text-ink",
                    children: r,
                  })
                : null,
              i
                ? (0, a.jsx)("p", {
                    className: "mt-3 text-sm leading-6 text-slate-600",
                    children: i,
                  })
                : null,
              d ? (0, a.jsx)("div", { className: "mt-5", children: d }) : null,
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
        var a = r(687),
          s = r(7766);
        function n({
          eyebrow: e,
          title: t,
          description: r,
          actions: n,
          children: i,
          className: l,
        }) {
          return (0, a.jsxs)("section", {
            className: (0, s.cn)(
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
                      r
                        ? (0, a.jsx)("p", {
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
        function a(e) {
          return "Cr\xedtico" === e
            ? "critical"
            : "En riesgo" === e
              ? "warning"
              : "info";
        }
        function s(e) {
          return e >= 4 ? "critical" : e >= 3 ? "warning" : "info";
        }
        r.d(t, { k: () => s, o: () => a });
      },
      5879: (e, t, r) => {
        "use strict";
        r.d(t, { A: () => s });
        var a = r(3210);
        let s = a.forwardRef(function ({ title: e, titleId: t, ...r }, s) {
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
                ref: s,
                "aria-labelledby": t,
              },
              r,
            ),
            e ? a.createElement("title", { id: t }, e) : null,
            a.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z",
            }),
          );
        });
      },
      7275: (e, t, r) => {
        "use strict";
        r.d(t, { z: () => n });
        var a = r(687),
          s = r(7766);
        function n({
          eyebrow: e,
          title: t,
          description: r,
          badge: n,
          actions: i,
          children: l,
          className: o,
        }) {
          return (0, a.jsxs)("section", {
            className: (0, s.cn)(
              "overflow-hidden rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel shadow-brand-100/20 backdrop-blur md:p-7",
              o,
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
                          n,
                        ],
                      }),
                      r
                        ? (0, a.jsx)("p", {
                            className:
                              "mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-[15px]",
                            children: r,
                          })
                        : null,
                    ],
                  }),
                  i
                    ? (0, a.jsx)("div", {
                        className: "flex shrink-0 flex-wrap gap-3",
                        children: i,
                      })
                    : null,
                ],
              }),
              l ? (0, a.jsx)("div", { className: "mt-6", children: l }) : null,
            ],
          });
        }
      },
      7357: (e, t, r) => {
        "use strict";
        r.d(t, { t: () => n });
        var a = r(1272),
          s = r(5653);
        function n() {
          let e = (0, a.o)((e) => e.scenario);
          return (0, s.cz)(e);
        }
      },
      9121: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/action-async-storage.external.js");
      },
      9294: (e) => {
        "use strict";
        e.exports = require("next/dist/server/app-render/work-async-storage.external.js");
      },
      9427: (e, t, r) => {
        Promise.resolve().then(r.bind(r, 1791));
      },
    });
  var t = require("../../../webpack-runtime.js");
  t.C(e);
  var r = (e) => t((t.s = e)),
    a = t.X(0, [370, 550], () => r(2162));
  module.exports = a;
})();
