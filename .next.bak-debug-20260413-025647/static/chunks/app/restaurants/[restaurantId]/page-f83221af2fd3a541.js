(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [244],
  {
    63: (e, a, t) => {
      "use strict";
      t.r(a), t.d(a, { default: () => v });
      var r = t(5155),
        s = t(6874),
        n = t.n(s),
        l = t(5695),
        i = t(3837),
        d = t(2115);
      let c = d.forwardRef(function (e, a) {
          let { title: t, titleId: r, ...s } = e;
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
                ref: a,
                "aria-labelledby": r,
              },
              s,
            ),
            t ? d.createElement("title", { id: r }, t) : null,
            d.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
            }),
            d.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z",
            }),
          );
        }),
        o = d.forwardRef(function (e, a) {
          let { title: t, titleId: r, ...s } = e;
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
                ref: a,
                "aria-labelledby": r,
              },
              s,
            ),
            t ? d.createElement("title", { id: r }, t) : null,
            d.createElement("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
            }),
          );
        });
      var m = t(152),
        x = t(2721),
        u = t(9303),
        b = t(7993),
        p = t(9896),
        h = t(9551),
        g = t(650),
        f = t(2138),
        j = t(5789);
      function v() {
        var e;
        let a = (0, l.useParams)(),
          t = (function (e, a) {
            let t = e.restaurants.find((e) => e.id === a);
            if (!t) return null;
            let r = e.kams.find((e) => e.id === t.kamId),
              s = (0, f.o)(t.status);
            return { restaurant: t, kam: r, tone: s };
          })((0, j.t)(), a.restaurantId);
        if (!t)
          return (0, r.jsx)(p.W, {
            title: "Restaurante no encontrado",
            description:
              "El identificador solicitado no existe en el snapshot actual de demo.",
          });
        let { restaurant: s, kam: d, tone: v } = t;
        return (0, r.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, r.jsx)(h.z, {
              eyebrow: "Diagn\xf3stico operativo",
              title: s.name,
              description: "".concat(
                s.city,
                ". La lectura del restaurante explica el riesgo visible, evita falsa precisi\xf3n y deja clara la acci\xf3n sugerida.",
              ),
              badge: (0, r.jsx)(g.W, { label: s.status, tone: v }),
              actions: d
                ? (0, r.jsx)(n(), {
                    href: "/kams/".concat(d.id),
                    className:
                      "inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-700",
                    children: "Volver al KAM",
                  })
                : null,
              children: (0, r.jsxs)("div", {
                className: "grid gap-4 md:grid-cols-4",
                children: [
                  (0, r.jsx)(b.p, {
                    eyebrow: "Riesgo",
                    title: "Estado actual",
                    value: s.status,
                    accent:
                      "critical" === v
                        ? "brand"
                        : "warning" === v
                          ? "warning"
                          : "neutral",
                    icon: (0, r.jsx)(i.A, { className: "h-5 w-5" }),
                  }),
                  (0, r.jsx)(b.p, {
                    eyebrow: "Cobertura",
                    title: "Ciudad",
                    value: s.city,
                    accent: "neutral",
                    icon: (0, r.jsx)(c, { className: "h-5 w-5" }),
                  }),
                  (0, r.jsx)(b.p, {
                    eyebrow: "Owner",
                    title: "KAM responsable",
                    value:
                      null != (e = null == d ? void 0 : d.name)
                        ? e
                        : "Sin asignar",
                    accent: "neutral",
                    icon: (0, r.jsx)(o, { className: "h-5 w-5" }),
                  }),
                  (0, r.jsx)(b.p, {
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
            (0, r.jsxs)("div", {
              className: "grid gap-6 xl:grid-cols-[1.05fr_0.95fr]",
              children: [
                (0, r.jsxs)("section", {
                  className: "space-y-6",
                  children: [
                    (0, r.jsxs)("div", {
                      className: "grid gap-4 md:grid-cols-2",
                      children: [
                        (0, r.jsx)(m.A, {
                          label: "Qu\xe9 pas\xf3",
                          tone: "critical" === v ? "critical" : "warning",
                          children: s.whyFlagged,
                        }),
                        (0, r.jsx)(m.A, {
                          label: "Por qu\xe9 importa",
                          tone: "neutral",
                          children:
                            "Una se\xf1al en esta cuenta puede afectar la percepci\xf3n de salud del portfolio y distorsionar la priorizaci\xf3n del KAM si no se explica bien.",
                        }),
                        (0, r.jsx)(m.A, {
                          label: "Qu\xe9 hacer",
                          tone: "neutral",
                          children: s.recommendation,
                        }),
                        (0, r.jsx)(m.A, {
                          label: "Siguiente paso",
                          tone: "warning",
                          children:
                            "Validar insumo operativo, revisar contexto comercial y decidir si el caso pasa a seguimiento reforzado.",
                        }),
                      ],
                    }),
                    (0, r.jsx)(x.l, {
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
                (0, r.jsxs)("section", {
                  className: "space-y-6",
                  children: [
                    (0, r.jsx)(u.x, {
                      title: "Contexto comparativo",
                      description:
                        "Referencia visual para comparar la lectura actual del restaurante con una expectativa operativa m\xe1s conservadora.",
                      leftLabel: "Lectura comparativa",
                      leftValue:
                        "Cr\xedtico" === s.status
                          ? "Por encima del umbral esperado"
                          : "Bajo observaci\xf3n",
                      rightLabel: "Confianza metodol\xf3gica",
                      rightValue: "Sujeta a validaci\xf3n",
                      footnote:
                        "La UI deja claro que el benchmark es contextual; no reemplaza el rec\xe1lculo del agente.",
                    }),
                    (0, r.jsxs)("div", {
                      className:
                        "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
                      children: [
                        (0, r.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                          children: "Navegaci\xf3n contextual",
                        }),
                        (0, r.jsx)("h2", {
                          className: "mt-2 text-xl font-semibold text-ink",
                          children: "Desde aqu\xed puedes seguir el caso",
                        }),
                        (0, r.jsxs)("div", {
                          className: "mt-5 space-y-3",
                          children: [
                            d
                              ? (0, r.jsxs)(n(), {
                                  href: "/kams/".concat(d.id),
                                  className:
                                    "block rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-brand-200 hover:bg-brand-50/60",
                                  children: [
                                    (0, r.jsx)("p", {
                                      className: "font-semibold text-ink",
                                      children: "Volver al detalle del KAM",
                                    }),
                                    (0, r.jsx)("p", {
                                      className:
                                        "mt-1 text-sm leading-6 text-slate-600",
                                      children:
                                        "Retoma el portfolio completo para entender si el caso es aislado o sist\xe9mico.",
                                    }),
                                  ],
                                })
                              : null,
                            (0, r.jsxs)(n(), {
                              href: "/alerts",
                              className:
                                "block rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-brand-200 hover:bg-brand-50/60",
                              children: [
                                (0, r.jsx)("p", {
                                  className: "font-semibold text-ink",
                                  children: "Ir a Alertas",
                                }),
                                (0, r.jsx)("p", {
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
    152: (e, a, t) => {
      "use strict";
      t.d(a, { A: () => l });
      var r = t(5155),
        s = t(6486);
      let n = {
        critical: "border-brand-200 bg-brand-50/80",
        warning: "border-amber-200 bg-amber-50/80",
        neutral: "border-slate-200 bg-slate-50/80",
      };
      function l(e) {
        let {
          label: a,
          title: t,
          tone: l = "neutral",
          children: i,
          className: d,
        } = e;
        return (0, r.jsxs)("article", {
          className: (0, s.cn)(
            "rounded-[28px] border p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
            n[l],
            d,
          ),
          children: [
            (0, r.jsx)("p", {
              className:
                "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
              children: a,
            }),
            t
              ? (0, r.jsx)("h3", {
                  className: "mt-2 text-lg font-semibold text-ink",
                  children: t,
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
    650: (e, a, t) => {
      "use strict";
      t.d(a, { W: () => l });
      var r = t(5155),
        s = t(6486);
      let n = {
        critical: "bg-brand-50 text-brand-800 ring-brand-200",
        warning: "bg-amber-50 text-amber-800 ring-amber-200",
        stable: "bg-emerald-50 text-emerald-800 ring-emerald-200",
        info: "bg-slate-100 text-slate-700 ring-slate-200",
      };
      function l(e) {
        let { label: a, tone: t } = e;
        return (0, r.jsx)("span", {
          className: (0, s.cn)(
            "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.01em] ring-1 ring-inset",
            n[t],
          ),
          children: a,
        });
      }
    },
    2138: (e, a, t) => {
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
      t.d(a, { k: () => s, o: () => r });
    },
    2721: (e, a, t) => {
      "use strict";
      t.d(a, { l: () => l });
      var r = t(5155),
        s = t(152),
        n = t(6726);
      function l(e) {
        let {
          eyebrow: a = "Patr\xf3n del agente",
          title: t,
          description: l,
          items: i,
        } = e;
        return (0, r.jsx)(n.i, {
          eyebrow: a,
          title: t,
          description: l,
          children: (0, r.jsx)("div", {
            className: "grid gap-3 md:grid-cols-2",
            children: i.map((e, a) => {
              var t;
              return (0, r.jsx)(
                s.A,
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
    3837: (e, a, t) => {
      "use strict";
      t.d(a, { A: () => s });
      var r = t(2115);
      let s = r.forwardRef(function (e, a) {
        let { title: t, titleId: s, ...n } = e;
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
              "aria-labelledby": s,
            },
            n,
          ),
          t ? r.createElement("title", { id: s }, t) : null,
          r.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z",
          }),
        );
      });
    },
    5695: (e, a, t) => {
      "use strict";
      var r = t(8999);
      t.o(r, "useParams") &&
        t.d(a, {
          useParams: function () {
            return r.useParams;
          },
        }),
        t.o(r, "usePathname") &&
          t.d(a, {
            usePathname: function () {
              return r.usePathname;
            },
          });
    },
    5789: (e, a, t) => {
      "use strict";
      t.d(a, { t: () => n });
      var r = t(9052),
        s = t(6853);
      function n() {
        let e = (0, r.o)((e) => e.scenario);
        return (0, s.cz)(e);
      }
    },
    6726: (e, a, t) => {
      "use strict";
      t.d(a, { i: () => n });
      var r = t(5155),
        s = t(6486);
      function n(e) {
        let {
          eyebrow: a,
          title: t,
          description: n,
          actions: l,
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
                    a
                      ? (0, r.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
                          children: a,
                        })
                      : null,
                    (0, r.jsx)("h2", {
                      className:
                        "text-xl font-semibold tracking-[-0.02em] text-ink",
                      children: t,
                    }),
                    n
                      ? (0, r.jsx)("p", {
                          className: "text-sm leading-6 text-slate-600",
                          children: n,
                        })
                      : null,
                  ],
                }),
                l,
              ],
            }),
            i,
          ],
        });
      }
    },
    7993: (e, a, t) => {
      "use strict";
      t.d(a, { p: () => l });
      var r = t(5155),
        s = t(6486);
      let n = {
        brand:
          "border-brand-100 bg-gradient-to-br from-white via-white to-brand-50/80",
        warning:
          "border-amber-200 bg-gradient-to-br from-white via-white to-amber-50/80",
        stable:
          "border-emerald-200 bg-gradient-to-br from-white via-white to-emerald-50/80",
        neutral: "border-slate-200 bg-white",
      };
      function l(e) {
        let {
          eyebrow: a,
          title: t,
          value: l,
          description: i,
          accent: d = "neutral",
          icon: c,
          footer: o,
          className: m,
        } = e;
        return (0, r.jsxs)("article", {
          className: (0, s.cn)(
            "rounded-[28px] border p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]",
            n[d],
            m,
          ),
          children: [
            (0, r.jsxs)("div", {
              className: "flex items-start justify-between gap-3",
              children: [
                (0, r.jsxs)("div", {
                  children: [
                    a
                      ? (0, r.jsx)("p", {
                          className:
                            "text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500",
                          children: a,
                        })
                      : null,
                    (0, r.jsx)("h3", {
                      className: "mt-2 text-sm font-medium text-slate-600",
                      children: t,
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
            l
              ? (0, r.jsx)("p", {
                  className:
                    "mt-5 text-3xl font-semibold tracking-[-0.04em] text-ink",
                  children: l,
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
    8045: (e, a, t) => {
      Promise.resolve().then(t.bind(t, 63));
    },
    9303: (e, a, t) => {
      "use strict";
      t.d(a, { x: () => s });
      var r = t(5155);
      function s(e) {
        let {
          title: a,
          description: t,
          leftLabel: s,
          leftValue: l,
          rightLabel: i,
          rightValue: d,
          footnote: c,
        } = e;
        return (0, r.jsxs)("section", {
          className:
            "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
          children: [
            (0, r.jsx)("p", {
              className:
                "text-xs font-semibold uppercase tracking-[0.24em] text-brand-600",
              children: "Benchmark",
            }),
            (0, r.jsx)("h2", {
              className: "mt-2 text-xl font-semibold text-ink",
              children: a,
            }),
            (0, r.jsx)("p", {
              className: "mt-2 text-sm leading-6 text-slate-600",
              children: t,
            }),
            (0, r.jsxs)("div", {
              className: "mt-6 grid gap-4 md:grid-cols-2",
              children: [
                (0, r.jsx)(n, { label: s, value: l }),
                (0, r.jsx)(n, { label: i, value: d }),
              ],
            }),
            c
              ? (0, r.jsx)("p", {
                  className: "mt-4 text-xs leading-5 text-slate-500",
                  children: c,
                })
              : null,
          ],
        });
      }
      function n(e) {
        let { label: a, value: t } = e;
        return (0, r.jsxs)("div", {
          className:
            "rounded-[24px] border border-slate-200 bg-slate-50/80 p-5",
          children: [
            (0, r.jsx)("p", {
              className:
                "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500",
              children: a,
            }),
            (0, r.jsx)("p", {
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
      t.d(a, { z: () => n });
      var r = t(5155),
        s = t(6486);
      function n(e) {
        let {
          eyebrow: a,
          title: t,
          description: n,
          badge: l,
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
                    a
                      ? (0, r.jsx)("p", {
                          className:
                            "text-xs font-semibold uppercase tracking-[0.26em] text-brand-600",
                          children: a,
                        })
                      : null,
                    (0, r.jsxs)("div", {
                      className: "mt-3 flex flex-wrap items-center gap-3",
                      children: [
                        (0, r.jsx)("h1", {
                          className:
                            "text-3xl font-semibold tracking-[-0.03em] text-ink md:text-[2.35rem]",
                          children: t,
                        }),
                        l,
                      ],
                    }),
                    n
                      ? (0, r.jsx)("p", {
                          className:
                            "mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-[15px]",
                          children: n,
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
    9896: (e, a, t) => {
      "use strict";
      t.d(a, { W: () => s });
      var r = t(5155);
      function s(e) {
        let { title: a, description: t } = e;
        return (0, r.jsxs)("div", {
          className:
            "rounded-[28px] border border-brand-200 bg-brand-50/70 p-6",
          children: [
            (0, r.jsx)("h3", {
              className: "text-lg font-semibold text-brand-800",
              children: a,
            }),
            (0, r.jsx)("p", {
              className: "mt-2 text-sm leading-6 text-brand-700",
              children: t,
            }),
          ],
        });
      }
    },
  },
  (e) => {
    var a = (a) => e((e.s = a));
    e.O(0, [962, 261, 441, 684, 358], () => a(8045)), (_N_E = e.O());
  },
]);
