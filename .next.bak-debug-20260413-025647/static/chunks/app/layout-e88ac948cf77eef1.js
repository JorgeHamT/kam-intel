(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [177],
  {
    347: () => {},
    600: (e, t, r) => {
      "use strict";
      r.d(t, { A: () => s });
      var a = r(2115);
      let s = a.forwardRef(function (e, t) {
        let { title: r, titleId: s, ...n } = e;
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
              ref: t,
              "aria-labelledby": s,
            },
            n,
          ),
          r ? a.createElement("title", { id: s }, r) : null,
          a.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5",
          }),
        );
      });
    },
    5695: (e, t, r) => {
      "use strict";
      var a = r(8999);
      r.o(a, "useParams") &&
        r.d(t, {
          useParams: function () {
            return a.useParams;
          },
        }),
        r.o(a, "usePathname") &&
          r.d(t, {
            usePathname: function () {
              return a.usePathname;
            },
          });
    },
    5895: (e, t, r) => {
      "use strict";
      r.d(t, { Header: () => u });
      var a = r(5155),
        s = r(6874),
        n = r.n(s),
        l = r(5695),
        i = r(2115);
      let d = i.forwardRef(function (e, t) {
          let { title: r, titleId: a, ...s } = e;
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
                "aria-labelledby": a,
              },
              s,
            ),
            r ? i.createElement("title", { id: a }, r) : null,
            i.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
            }),
          );
        }),
        o = i.forwardRef(function (e, t) {
          let { title: r, titleId: a, ...s } = e;
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
                "aria-labelledby": a,
              },
              s,
            ),
            r ? i.createElement("title", { id: a }, r) : null,
            i.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "m19.5 8.25-7.5 7.5-7.5-7.5",
            }),
          );
        }),
        c = i.forwardRef(function (e, t) {
          let { title: r, titleId: a, ...s } = e;
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
                "aria-labelledby": a,
              },
              s,
            ),
            r ? i.createElement("title", { id: a }, r) : null,
            i.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99",
            }),
          );
        });
      var m = r(2715);
      r(6853);
      var x = r(9052);
      let h = {
        "/": "Dashboard General",
        "/kams": "KAMs",
        "/alerts": "Alertas",
        "/validation": "Validaci\xf3n de datos",
        "/deck": "Deck interactivo",
      };
      function u() {
        var e;
        let t = (0, l.usePathname)(),
          {
            scenario: r,
            lastRefresh: s,
            resetDemo: i,
            setScenario: u,
          } = (0, x.o)(),
          b = t.startsWith("/restaurants/")
            ? "Detalle de restaurante"
            : t.startsWith("/kams/")
              ? "Detalle de KAM"
              : null != (e = h[t])
                ? e
                : "Rappi KAM Intelligence";
        return (0, a.jsx)("header", {
          className:
            "sticky top-0 z-20 border-b border-white/80 bg-surface/90 px-4 py-4 backdrop-blur md:px-8 lg:px-10",
          children: (0, a.jsxs)("div", {
            className:
              "flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between",
            children: [
              (0, a.jsxs)("div", {
                className: "min-w-0",
                children: [
                  (0, a.jsx)("p", {
                    className:
                      "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                    children: "Vista actual",
                  }),
                  (0, a.jsx)("h2", {
                    className:
                      "mt-1 text-2xl font-semibold tracking-[-0.03em] text-ink",
                    children: b,
                  }),
                ],
              }),
              (0, a.jsxs)("div", {
                className:
                  "flex flex-col items-stretch gap-3 xl:flex-row xl:flex-wrap xl:items-center xl:justify-end",
                children: [
                  (0, a.jsxs)("label", {
                    className:
                      "group flex min-w-[240px] items-center gap-3 rounded-2xl border border-white bg-white/95 px-4 py-3 text-sm shadow-sm xl:min-w-[280px]",
                    children: [
                      (0, a.jsx)(d, { className: "h-5 w-5 text-slate-400" }),
                      (0, a.jsxs)("div", {
                        className: "min-w-0 flex-1",
                        children: [
                          (0, a.jsx)("p", {
                            className:
                              "text-xs font-semibold uppercase tracking-[0.18em] text-muted",
                            children: "B\xfasqueda global",
                          }),
                          (0, a.jsx)("input", {
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
                  (0, a.jsxs)("label", {
                    className:
                      "group flex min-w-64 items-center gap-3 rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm shadow-sm",
                    children: [
                      (0, a.jsxs)("div", {
                        className: "min-w-0 flex-1",
                        children: [
                          (0, a.jsx)("p", {
                            className:
                              "text-xs font-semibold uppercase tracking-[0.18em] text-muted",
                            children: "Escenario",
                          }),
                          (0, a.jsx)("select", {
                            "aria-label": "Seleccionar escenario",
                            value: r,
                            onChange: (e) => u(e.target.value),
                            className:
                              "w-full appearance-none bg-transparent pr-6 font-medium text-ink outline-none",
                            children: m.f.map((e) =>
                              (0, a.jsx)(
                                "option",
                                { value: e.id, children: e.label },
                                e.id,
                              ),
                            ),
                          }),
                        ],
                      }),
                      (0, a.jsx)(o, { className: "h-4 w-4 text-muted" }),
                    ],
                  }),
                  (0, a.jsxs)("button", {
                    type: "button",
                    onClick: i,
                    className:
                      "inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700",
                    children: [
                      (0, a.jsx)(c, { className: "h-4 w-4" }),
                      "Reiniciar demo",
                    ],
                  }),
                  (0, a.jsxs)("div", {
                    className:
                      "rounded-2xl border border-transparent bg-white/40 px-4 py-3 text-right",
                    children: [
                      (0, a.jsx)("p", {
                        className:
                          "text-xs font-semibold uppercase tracking-[0.18em] text-muted",
                        children: "\xdaltima actualizaci\xf3n",
                      }),
                      (0, a.jsx)("p", {
                        className: "text-sm font-medium text-slate-700",
                        children: s,
                      }),
                    ],
                  }),
                  (0, a.jsx)(n(), {
                    href: "/deck",
                    className:
                      "rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-brand-700",
                    children: "Deck",
                  }),
                  (0, a.jsxs)("div", {
                    className:
                      "flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm",
                    children: [
                      (0, a.jsx)("div", {
                        className:
                          "flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700",
                        children: "JH",
                      }),
                      (0, a.jsxs)("div", {
                        className: "text-sm",
                        children: [
                          (0, a.jsx)("p", {
                            className: "font-medium text-ink",
                            children: "Jorge Ham",
                          }),
                          (0, a.jsx)("p", {
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
    8399: (e, t, r) => {
      "use strict";
      r.d(t, { MobileNav: () => o });
      var a = r(5155),
        s = r(6874),
        n = r.n(s),
        l = r(5695),
        i = r(6486);
      let d = [
        { href: "/", label: "Dashboard" },
        { href: "/kams", label: "KAMs" },
        { href: "/alerts", label: "Alertas" },
        { href: "/validation", label: "Datos" },
      ];
      function o() {
        let e = (0, l.usePathname)();
        return (0, a.jsx)("nav", {
          className:
            "fixed bottom-4 left-4 right-4 z-30 rounded-3xl border border-white/70 bg-white/95 p-2 shadow-panel lg:hidden",
          children: (0, a.jsx)("div", {
            className: "grid grid-cols-4 gap-2",
            children: d.map((t) => {
              let r = e === t.href || ("/" !== t.href && e.startsWith(t.href));
              return (0, a.jsx)(
                n(),
                {
                  href: t.href,
                  className: (0, i.cn)(
                    "rounded-2xl px-3 py-3 text-center text-xs font-semibold",
                    r ? "bg-brand text-white" : "text-slate-600",
                  ),
                  children: t.label,
                },
                t.href,
              );
            }),
          }),
        });
      }
    },
    9288: (e, t, r) => {
      "use strict";
      r.d(t, { Sidebar: () => u });
      var a = r(5155),
        s = r(6874),
        n = r.n(s),
        l = r(5695),
        i = r(2115);
      let d = i.forwardRef(function (e, t) {
          let { title: r, titleId: a, ...s } = e;
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
                "aria-labelledby": a,
              },
              s,
            ),
            r ? i.createElement("title", { id: a }, r) : null,
            i.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z",
            }),
          );
        }),
        o = i.forwardRef(function (e, t) {
          let { title: r, titleId: a, ...s } = e;
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
                "aria-labelledby": a,
              },
              s,
            ),
            r ? i.createElement("title", { id: a }, r) : null,
            i.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z",
            }),
          );
        });
      var c = r(600);
      let m = i.forwardRef(function (e, t) {
        let { title: r, titleId: a, ...s } = e;
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
              "aria-labelledby": a,
            },
            s,
          ),
          r ? i.createElement("title", { id: a }, r) : null,
          i.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75",
          }),
        );
      });
      var x = r(6486);
      let h = [
        { href: "/", label: "Dashboard", icon: d },
        { href: "/kams", label: "KAMs", icon: o },
        { href: "/alerts", label: "Alertas", icon: c.A },
        { href: "/validation", label: "Validaci\xf3n de datos", icon: m },
      ];
      function u() {
        let e = (0, l.usePathname)();
        return (0, a.jsxs)("aside", {
          className:
            "sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/80 bg-[#fff7f5]/95 px-5 py-6 backdrop-blur lg:flex",
          children: [
            (0, a.jsxs)("div", {
              className:
                "rounded-[30px] border border-brand-100/80 bg-white p-5 shadow-panel",
              children: [
                (0, a.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [
                    (0, a.jsx)("div", {
                      className:
                        "flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-lg font-black text-white shadow-sm",
                      children: "R",
                    }),
                    (0, a.jsxs)("div", {
                      children: [
                        (0, a.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                          children: "Rappi",
                        }),
                        (0, a.jsx)("h1", {
                          className: "text-base font-semibold text-ink",
                          children: "KAM Intelligence",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsx)("p", {
                  className: "mt-4 text-sm leading-6 text-slate-600",
                  children:
                    "Torre de control operativa para lectura ejecutiva, priorizaci\xf3n y seguimiento de riesgo comercial.",
                }),
              ],
            }),
            (0, a.jsx)("nav", {
              className: "mt-8 space-y-2",
              children: h.map((t) => {
                let { href: r, label: s, icon: l } = t,
                  i = e === r || ("/" !== r && e.startsWith(r));
                return (0, a.jsxs)(
                  n(),
                  {
                    href: r,
                    className: (0, x.cn)(
                      "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                      i
                        ? "bg-brand text-white shadow-panel"
                        : "border border-transparent text-slate-700 hover:border-white hover:bg-white hover:text-brand-700",
                    ),
                    children: [(0, a.jsx)(l, { className: "h-5 w-5" }), s],
                  },
                  r,
                );
              }),
            }),
            (0, a.jsxs)("div", {
              className:
                "mt-auto rounded-[28px] border border-dashed border-brand-200 bg-white/70 p-5",
              children: [
                (0, a.jsx)("p", {
                  className:
                    "text-xs font-semibold uppercase tracking-[0.24em] text-brand-700",
                  children: "Agente visible",
                }),
                (0, a.jsx)("p", {
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
    9830: (e, t, r) => {
      Promise.resolve().then(r.t.bind(r, 347, 23)),
        Promise.resolve().then(r.bind(r, 5895)),
        Promise.resolve().then(r.bind(r, 8399)),
        Promise.resolve().then(r.bind(r, 9288));
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [690, 962, 261, 441, 684, 358], () => t(9830)), (_N_E = e.O());
  },
]);
