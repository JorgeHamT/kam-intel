(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [976],
  {
    152: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => n });
      var s = a(5155),
        r = a(6486);
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
          className: c,
        } = e;
        return (0, s.jsxs)("article", {
          className: (0, r.cn)(
            "rounded-[28px] border p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
            l[n],
            c,
          ),
          children: [
            (0, s.jsx)("p", {
              className:
                "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
              children: t,
            }),
            a
              ? (0, s.jsx)("h3", {
                  className: "mt-2 text-lg font-semibold text-ink",
                  children: a,
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
    600: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => r });
      var s = a(2115);
      let r = s.forwardRef(function (e, t) {
        let { title: a, titleId: r, ...l } = e;
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
              ref: t,
              "aria-labelledby": r,
            },
            l,
          ),
          a ? s.createElement("title", { id: r }, a) : null,
          s.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5",
          }),
        );
      });
    },
    650: (e, t, a) => {
      "use strict";
      a.d(t, { W: () => n });
      var s = a(5155),
        r = a(6486);
      let l = {
        critical: "bg-brand-50 text-brand-800 ring-brand-200",
        warning: "bg-amber-50 text-amber-800 ring-amber-200",
        stable: "bg-emerald-50 text-emerald-800 ring-emerald-200",
        info: "bg-slate-100 text-slate-700 ring-slate-200",
      };
      function n(e) {
        let { label: t, tone: a } = e;
        return (0, s.jsx)("span", {
          className: (0, r.cn)(
            "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.01em] ring-1 ring-inset",
            l[a],
          ),
          children: t,
        });
      }
    },
    2138: (e, t, a) => {
      "use strict";
      function s(e) {
        return "Cr\xedtico" === e
          ? "critical"
          : "En riesgo" === e
            ? "warning"
            : "info";
      }
      function r(e) {
        return e >= 4 ? "critical" : e >= 3 ? "warning" : "info";
      }
      a.d(t, { k: () => r, o: () => s });
    },
    2721: (e, t, a) => {
      "use strict";
      a.d(t, { l: () => n });
      var s = a(5155),
        r = a(152),
        l = a(6726);
      function n(e) {
        let {
          eyebrow: t = "Patr\xf3n del agente",
          title: a,
          description: n,
          items: i,
        } = e;
        return (0, s.jsx)(l.i, {
          eyebrow: t,
          title: a,
          description: n,
          children: (0, s.jsx)("div", {
            className: "grid gap-3 md:grid-cols-2",
            children: i.map((e, t) => {
              var a;
              return (0, s.jsx)(
                r.A,
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
    3545: (e, t, a) => {
      "use strict";
      a.r(t), a.d(t, { default: () => w });
      var s = a(5155),
        r = a(6874),
        l = a.n(r),
        n = a(5695),
        i = a(3837),
        c = a(600),
        d = a(2115);
      let o = d.forwardRef(function (e, t) {
        let { title: a, titleId: s, ...r } = e;
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
              ref: t,
              "aria-labelledby": s,
            },
            r,
          ),
          a ? d.createElement("title", { id: s }, a) : null,
          d.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z",
          }),
        );
      });
      var m = a(152),
        x = a(2721),
        u = a(4308),
        b = a(7993),
        p = a(9896),
        h = a(9551),
        g = a(3931),
        f = a(650),
        v = a(2138),
        j = a(5789);
      function w() {
        let e = (0, n.useParams)(),
          t = (function (e, t) {
            let a = e.kams.find((e) => e.id === t);
            if (!a) return null;
            let s = e.restaurants.filter((e) => e.kamId === a.id),
              r = s.filter((e) => "Cr\xedtico" === e.status).length,
              l = s.filter((e) => "Monitoreo" === e.status).length;
            return {
              kam: a,
              relatedRestaurants: s,
              criticalCount: r,
              monitoringCount: l,
              badgeTone: r > 0 ? "critical" : "warning",
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
                { label: "Monitoreo", value: l, toneClass: "bg-slate-400" },
              ],
              rankingRows: s.map((e) => ({
                id: e.id,
                title: e.name,
                subtitle: e.city,
                metric: e.whyFlagged,
                tone: (0, v.o)(e.status),
                href: "/restaurants/".concat(e.id),
              })),
            };
          })((0, j.t)(), e.kamId);
        if (!t)
          return (0, s.jsx)(p.W, {
            title: "KAM no encontrado",
            description:
              "El identificador solicitado no existe en el snapshot actual de demo.",
          });
        let {
          kam: a,
          relatedRestaurants: r,
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
              title: a.name,
              description: "".concat(
                a.portfolio,
                ". Vista individual para leer presi\xf3n operativa del portfolio, ubicar cuentas a revisar y sostener una intervenci\xf3n m\xe1s explicable.",
              ),
              badge: (0, s.jsx)(f.W, {
                label:
                  d > 0 ? "Intervenci\xf3n prioritaria" : "Seguimiento activo",
                tone: N,
              }),
              actions: (0, s.jsx)(l(), {
                href: "/kams",
                className:
                  "inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-700",
                children: "Volver a KAMs",
              }),
              children: (0, s.jsxs)("div", {
                className: "grid gap-4 md:grid-cols-4",
                children: [
                  (0, s.jsx)(b.p, {
                    eyebrow: "Portafolio",
                    title: "Restaurantes conectados",
                    value: "".concat(r.length),
                    accent: "neutral",
                    icon: (0, s.jsx)(i.A, { className: "h-5 w-5" }),
                  }),
                  (0, s.jsx)(b.p, {
                    eyebrow: "Alerta",
                    title: "Alertas activas",
                    value: "".concat(a.openAlerts),
                    accent: "brand",
                    icon: (0, s.jsx)(c.A, { className: "h-5 w-5" }),
                  }),
                  (0, s.jsx)(b.p, {
                    eyebrow: "Severidad",
                    title: "Cuentas cr\xedticas",
                    value: "".concat(d),
                    accent: "warning",
                    icon: (0, s.jsx)(o, { className: "h-5 w-5" }),
                  }),
                  (0, s.jsx)(b.p, {
                    eyebrow: "Monitoreo",
                    title: "Cuentas en observaci\xf3n",
                    value: "".concat(w),
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
                            a.narrative,
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
                    (0, s.jsx)(u._, {
                      eyebrow: "Distribuci\xf3n",
                      title: "Inventario del portafolio",
                      description:
                        "Distribuci\xf3n simple de estados visibles por restaurante dentro del KAM.",
                      children: (0, s.jsx)("div", {
                        className: "space-y-4",
                        children: k.map((e) => {
                          let t = "".concat(
                            Math.max((e.value / r.length) * 100, 8),
                            "%",
                          );
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
                                    className: "h-3 rounded-full ".concat(
                                      e.toneClass,
                                    ),
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
    3837: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => r });
      var s = a(2115);
      let r = s.forwardRef(function (e, t) {
        let { title: a, titleId: r, ...l } = e;
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
              ref: t,
              "aria-labelledby": r,
            },
            l,
          ),
          a ? s.createElement("title", { id: r }, a) : null,
          s.createElement("path", {
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
      var s = a(5155),
        r = a(6874),
        l = a.n(r),
        n = a(650);
      function i(e) {
        let { eyebrow: t, title: a, description: r, rows: i } = e;
        return (0, s.jsxs)("section", {
          className:
            "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
          children: [
            (0, s.jsxs)("div", {
              className: "mb-5",
              children: [
                t
                  ? (0, s.jsx)("p", {
                      className:
                        "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                      children: t,
                    })
                  : null,
                (0, s.jsx)("h2", {
                  className: "mt-2 text-xl font-semibold text-ink",
                  children: a,
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
                    children: i.map((e) =>
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
                                  (0, s.jsx)(n.W, {
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
                                    ? (0, s.jsx)(l(), {
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
    4308: (e, t, a) => {
      "use strict";
      a.d(t, { _: () => r });
      var s = a(5155);
      function r(e) {
        let { eyebrow: t, title: a, description: r, children: l } = e;
        return (0, s.jsxs)("section", {
          className:
            "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
          children: [
            t
              ? (0, s.jsx)("p", {
                  className:
                    "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                  children: t,
                })
              : null,
            (0, s.jsx)("h2", {
              className: "mt-2 text-xl font-semibold text-ink",
              children: a,
            }),
            r
              ? (0, s.jsx)("p", {
                  className: "mt-2 text-sm text-slate-600",
                  children: r,
                })
              : null,
            (0, s.jsx)("div", { className: "mt-6", children: l }),
          ],
        });
      }
    },
    5695: (e, t, a) => {
      "use strict";
      var s = a(8999);
      a.o(s, "useParams") &&
        a.d(t, {
          useParams: function () {
            return s.useParams;
          },
        }),
        a.o(s, "usePathname") &&
          a.d(t, {
            usePathname: function () {
              return s.usePathname;
            },
          });
    },
    5789: (e, t, a) => {
      "use strict";
      a.d(t, { t: () => l });
      var s = a(9052),
        r = a(6853);
      function l() {
        let e = (0, s.o)((e) => e.scenario);
        return (0, r.cz)(e);
      }
    },
    6726: (e, t, a) => {
      "use strict";
      a.d(t, { i: () => l });
      var s = a(5155),
        r = a(6486);
      function l(e) {
        let {
          eyebrow: t,
          title: a,
          description: l,
          actions: n,
          children: i,
          className: c,
        } = e;
        return (0, s.jsxs)("section", {
          className: (0, r.cn)(
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
                    t
                      ? (0, s.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                          children: t,
                        })
                      : null,
                    (0, s.jsx)("h2", {
                      className:
                        "text-xl font-semibold tracking-[-0.02em] text-ink",
                      children: a,
                    }),
                    l
                      ? (0, s.jsx)("p", {
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
    7993: (e, t, a) => {
      "use strict";
      a.d(t, { p: () => n });
      var s = a(5155),
        r = a(6486);
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
          accent: c = "neutral",
          icon: d,
          footer: o,
          className: m,
        } = e;
        return (0, s.jsxs)("article", {
          className: (0, r.cn)(
            "rounded-[28px] border p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]",
            l[c],
            m,
          ),
          children: [
            (0, s.jsxs)("div", {
              className: "flex items-start justify-between gap-3",
              children: [
                (0, s.jsxs)("div", {
                  children: [
                    t
                      ? (0, s.jsx)("p", {
                          className:
                            "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
                          children: t,
                        })
                      : null,
                    (0, s.jsx)("h3", {
                      className: "mt-2 text-sm font-medium text-slate-600",
                      children: a,
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
            n
              ? (0, s.jsx)("p", {
                  className:
                    "mt-5 text-3xl font-semibold tracking-[-0.04em] text-ink",
                  children: n,
                })
              : null,
            i
              ? (0, s.jsx)("p", {
                  className: "mt-3 text-sm leading-6 text-slate-600",
                  children: i,
                })
              : null,
            o ? (0, s.jsx)("div", { className: "mt-5", children: o }) : null,
          ],
        });
      }
    },
    9551: (e, t, a) => {
      "use strict";
      a.d(t, { z: () => l });
      var s = a(5155),
        r = a(6486);
      function l(e) {
        let {
          eyebrow: t,
          title: a,
          description: l,
          badge: n,
          actions: i,
          children: c,
          className: d,
        } = e;
        return (0, s.jsxs)("section", {
          className: (0, r.cn)(
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
                    t
                      ? (0, s.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.26em] text-brand-600",
                          children: t,
                        })
                      : null,
                    (0, s.jsxs)("div", {
                      className: "mt-3 flex flex-wrap items-center gap-3",
                      children: [
                        (0, s.jsx)("h1", {
                          className:
                            "text-3xl font-semibold tracking-[-0.03em] text-ink md:text-[2.35rem]",
                          children: a,
                        }),
                        n,
                      ],
                    }),
                    l
                      ? (0, s.jsx)("p", {
                          className:
                            "mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-[15px]",
                          children: l,
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
            c ? (0, s.jsx)("div", { className: "mt-6", children: c }) : null,
          ],
        });
      }
    },
    9779: (e, t, a) => {
      Promise.resolve().then(a.bind(a, 3545));
    },
    9896: (e, t, a) => {
      "use strict";
      a.d(t, { W: () => r });
      var s = a(5155);
      function r(e) {
        let { title: t, description: a } = e;
        return (0, s.jsxs)("div", {
          className:
            "rounded-[28px] border border-brand-200 bg-brand-50/70 p-6",
          children: [
            (0, s.jsx)("h3", {
              className: "text-lg font-semibold text-brand-800",
              children: t,
            }),
            (0, s.jsx)("p", {
              className: "mt-2 text-sm leading-6 text-brand-700",
              children: a,
            }),
          ],
        });
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [962, 261, 441, 684, 358], () => t(9779)), (_N_E = e.O());
  },
]);
