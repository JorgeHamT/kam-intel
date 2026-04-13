(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [974],
  {
    152: (e, t, a) => {
      "use strict";
      a.d(t, { A: () => i });
      var s = a(5155),
        r = a(6486);
      let l = {
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
          className: d,
        } = e;
        return (0, s.jsxs)("article", {
          className: (0, r.cn)(
            "rounded-[28px] border p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
            l[i],
            d,
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
              children: n,
            }),
          ],
        });
      }
    },
    439: (e, t, a) => {
      Promise.resolve().then(a.bind(a, 5986));
    },
    650: (e, t, a) => {
      "use strict";
      a.d(t, { W: () => i });
      var s = a(5155),
        r = a(6486);
      let l = {
        critical: "bg-brand-50 text-brand-800 ring-brand-200",
        warning: "bg-amber-50 text-amber-800 ring-amber-200",
        stable: "bg-emerald-50 text-emerald-800 ring-emerald-200",
        info: "bg-slate-100 text-slate-700 ring-slate-200",
      };
      function i(e) {
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
      a.d(t, { l: () => i });
      var s = a(5155),
        r = a(152),
        l = a(6726);
      function i(e) {
        let {
          eyebrow: t = "Patr\xf3n del agente",
          title: a,
          description: i,
          items: n,
        } = e;
        return (0, s.jsx)(l.i, {
          eyebrow: t,
          title: a,
          description: i,
          children: (0, s.jsx)("div", {
            className: "grid gap-3 md:grid-cols-2",
            children: n.map((e, t) => {
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
    3931: (e, t, a) => {
      "use strict";
      a.d(t, { b: () => n });
      var s = a(5155),
        r = a(6874),
        l = a.n(r),
        i = a(650);
      function n(e) {
        let { eyebrow: t, title: a, description: r, rows: n } = e;
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
                    children: n.map((e) =>
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
    5986: (e, t, a) => {
      "use strict";
      a.r(t), a.d(t, { default: () => L });
      var s = a(5155),
        r = a(2115);
      let l = r.forwardRef(function (e, t) {
        let { title: a, titleId: s, ...l } = e;
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
              ref: t,
              "aria-labelledby": s,
            },
            l,
          ),
          a ? r.createElement("title", { id: s }, a) : null,
          r.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3",
          }),
        );
      });
      var i = a(6874),
        n = a.n(i),
        d = a(6726),
        c = a(650);
      function o(e) {
        let { items: t } = e;
        return (0, s.jsx)(d.i, {
          eyebrow: "Seguimiento",
          title: "Resumen de alertas",
          description:
            "Cola inicial para demo, conectada visualmente con la narrativa del agente.",
          actions: (0, s.jsx)(n(), {
            href: "/alerts",
            className: "text-sm font-semibold text-brand-700",
            children: "Ver todas",
          }),
          children: (0, s.jsx)("div", {
            className: "overflow-hidden rounded-[24px] border border-slate-200",
            children: (0, s.jsxs)("table", {
              className: "min-w-full divide-y divide-slate-100 text-sm",
              children: [
                (0, s.jsx)("thead", {
                  className: "bg-slate-50",
                  children: (0, s.jsxs)("tr", {
                    className: "text-left text-slate-500",
                    children: [
                      (0, s.jsx)("th", {
                        className: "px-4 py-3 font-medium",
                        children: "Alerta",
                      }),
                      (0, s.jsx)("th", {
                        className: "px-4 py-3 font-medium",
                        children: "Owner",
                      }),
                      (0, s.jsx)("th", {
                        className: "px-4 py-3 font-medium",
                        children: "Estado",
                      }),
                      (0, s.jsx)("th", {
                        className: "px-4 py-3 font-medium",
                        children: "ETA",
                      }),
                    ],
                  }),
                }),
                (0, s.jsx)("tbody", {
                  className: "divide-y divide-slate-100 bg-white",
                  children: t.map((e) =>
                    (0, s.jsxs)(
                      "tr",
                      {
                        children: [
                          (0, s.jsx)("td", {
                            className: "px-4 py-4 font-medium text-ink",
                            children: e.title,
                          }),
                          (0, s.jsx)("td", {
                            className: "px-4 py-4 text-slate-700",
                            children: e.owner,
                          }),
                          (0, s.jsx)("td", {
                            className: "px-4 py-4 text-slate-700",
                            children: (0, s.jsx)(c.W, {
                              label: e.status,
                              tone: e.status.includes("Bloqueando")
                                ? "critical"
                                : e.status.includes("seguimiento")
                                  ? "warning"
                                  : "info",
                            }),
                          }),
                          (0, s.jsx)("td", {
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
      let m = r.forwardRef(function (e, t) {
        let { title: a, titleId: s, ...l } = e;
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
              ref: t,
              "aria-labelledby": s,
            },
            l,
          ),
          a ? r.createElement("title", { id: s }, a) : null,
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
          detected: a,
          whyItMatters: r,
          recommendation: l,
          nextStep: i,
        } = e;
        return (0, s.jsx)("section", {
          className:
            "overflow-hidden rounded-[34px] border border-brand-200 bg-[linear-gradient(135deg,#211f23_0%,#312326_60%,#5a2c30_100%)] p-6 text-white shadow-panel md:p-8",
          children: (0, s.jsxs)("div", {
            className:
              "flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between",
            children: [
              (0, s.jsxs)("div", {
                className: "max-w-3xl",
                children: [
                  (0, s.jsxs)("div", {
                    className:
                      "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-100",
                    children: [
                      (0, s.jsx)(m, { className: "h-4 w-4" }),
                      "Lectura del agente",
                    ],
                  }),
                  (0, s.jsx)("h2", {
                    className:
                      "mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] md:text-[2.65rem]",
                    children: t,
                  }),
                  (0, s.jsxs)("div", {
                    className:
                      "mt-5 max-w-2xl rounded-[28px] border border-white/10 bg-white/5 p-5",
                    children: [
                      (0, s.jsx)("p", {
                        className:
                          "text-xs font-semibold uppercase tracking-[0.22em] text-brand-100",
                        children: "Qu\xe9 detect\xf3",
                      }),
                      (0, s.jsx)("p", {
                        className: "mt-3 text-sm leading-7 text-white/82",
                        children: a,
                      }),
                    ],
                  }),
                ],
              }),
              (0, s.jsxs)("div", {
                className:
                  "grid max-w-xl gap-4 md:grid-cols-3 xl:w-[560px] xl:grid-cols-1",
                children: [
                  (0, s.jsx)(u, { label: "Por qu\xe9 importa", value: r }),
                  (0, s.jsx)(u, { label: "Qu\xe9 recomienda", value: l }),
                  (0, s.jsx)(u, { label: "Siguiente paso", value: i }),
                ],
              }),
            ],
          }),
        });
      }
      function u(e) {
        let { label: t, value: a } = e;
        return (0, s.jsxs)("div", {
          className: "rounded-[24px] border border-white/10 bg-white/5 p-4",
          children: [
            (0, s.jsx)("p", {
              className:
                "text-xs font-semibold uppercase tracking-[0.18em] text-brand-100",
              children: t,
            }),
            (0, s.jsx)("p", {
              className: "mt-2 text-sm leading-6 text-white/85",
              children: a,
            }),
          ],
        });
      }
      function p(e) {
        let { items: t } = e;
        return (0, s.jsx)(d.i, {
          eyebrow: "Prioridad",
          title: "KAMs bajo presi\xf3n",
          description:
            "Lectura operativa inicial con foco en d\xf3nde conviene actuar primero.",
          children: (0, s.jsx)("div", {
            className: "space-y-4",
            children: t.map((e) =>
              (0, s.jsx)(
                "article",
                {
                  className:
                    "rounded-[26px] border border-slate-200 bg-slate-50/80 p-5",
                  children: (0, s.jsxs)("div", {
                    className:
                      "flex flex-col gap-3 md:flex-row md:items-start md:justify-between",
                    children: [
                      (0, s.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, s.jsxs)("div", {
                            className: "flex items-center gap-3",
                            children: [
                              (0, s.jsx)("h3", {
                                className: "text-base font-semibold text-ink",
                                children: e.name,
                              }),
                              (0, s.jsx)(c.W, {
                                label: e.pressureLabel,
                                tone: "warning",
                              }),
                            ],
                          }),
                          (0, s.jsx)("p", {
                            className: "text-sm font-medium text-slate-700",
                            children: e.segment,
                          }),
                          (0, s.jsxs)("div", {
                            className: "grid gap-3 md:grid-cols-2",
                            children: [
                              (0, s.jsxs)("div", {
                                className:
                                  "rounded-2xl border border-white bg-white p-4",
                                children: [
                                  (0, s.jsx)("p", {
                                    className:
                                      "text-xs font-semibold uppercase tracking-[0.16em] text-slate-500",
                                    children: "Presi\xf3n operativa",
                                  }),
                                  (0, s.jsx)("p", {
                                    className:
                                      "mt-2 text-sm leading-6 text-slate-700",
                                    children: e.focus,
                                  }),
                                ],
                              }),
                              (0, s.jsxs)("div", {
                                className:
                                  "rounded-2xl border border-white bg-white p-4",
                                children: [
                                  (0, s.jsx)("p", {
                                    className:
                                      "text-xs font-semibold uppercase tracking-[0.16em] text-slate-500",
                                    children: "Siguiente paso",
                                  }),
                                  (0, s.jsx)("p", {
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
                      (0, s.jsx)(n(), {
                        href: "/kams/".concat(e.id),
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
      var b = a(7572);
      let h = r.forwardRef(function (e, t) {
        let { title: a, titleId: s, ...l } = e;
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
              ref: t,
              "aria-labelledby": s,
            },
            l,
          ),
          a ? r.createElement("title", { id: s }, a) : null,
          r.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181",
          }),
        );
      });
      var g = a(7993);
      function j(e) {
        let { items: t } = e;
        return (0, s.jsx)("div", {
          className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
          children: t.map((e) => {
            let t = "critical" === e.tone,
              a =
                "critical" === e.tone
                  ? "brand"
                  : "warning" === e.tone
                    ? "warning"
                    : "stable" === e.tone
                      ? "stable"
                      : "neutral";
            return (0, s.jsx)(
              g.p,
              {
                eyebrow: "Indicador clave",
                title: e.label,
                value: e.value,
                accent: a,
                footer: (0, s.jsxs)(s.Fragment, {
                  children: [
                    (0, s.jsxs)("div", {
                      className: "flex items-center justify-between gap-3",
                      children: [
                        (0, s.jsxs)("div", {
                          className:
                            "flex items-center gap-2 text-sm font-medium text-slate-700",
                          children: [
                            t
                              ? (0, s.jsx)(b.A, {
                                  className: "h-4 w-4 text-brand-600",
                                })
                              : (0, s.jsx)(h, {
                                  className: "h-4 w-4 text-emerald-600",
                                }),
                            e.delta,
                          ],
                        }),
                        (0, s.jsx)(c.W, {
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
                    (0, s.jsx)("p", {
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
      function f(e) {
        let { items: t } = e;
        return (0, s.jsx)(d.i, {
          eyebrow: "Se\xf1ales",
          title: "Se\xf1ales detectadas",
          description:
            "Patr\xf3n base visible desde el arranque: qu\xe9 detect\xf3, por qu\xe9 importa y c\xf3mo responder.",
          children: (0, s.jsx)("div", {
            className: "space-y-4",
            children: t.map((e, t) =>
              (0, s.jsxs)(
                "article",
                {
                  className:
                    "rounded-[26px] border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 p-5",
                  children: [
                    (0, s.jsxs)("div", {
                      className: "flex items-start justify-between gap-3",
                      children: [
                        (0, s.jsxs)("div", {
                          children: [
                            (0, s.jsx)("h3", {
                              className: "text-base font-semibold text-ink",
                              children: e.title,
                            }),
                            (0, s.jsx)("p", {
                              className:
                                "mt-2 text-sm leading-6 text-slate-600",
                              children: e.detection,
                            }),
                          ],
                        }),
                        (0, s.jsx)(c.W, {
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
                    (0, s.jsxs)("dl", {
                      className: "mt-4 grid gap-3 md:grid-cols-3",
                      children: [
                        (0, s.jsx)(v, {
                          label:
                            0 === t
                              ? "Por qu\xe9 fue marcado"
                              : "Por qu\xe9 importa",
                          value: e.whyItMatters,
                        }),
                        (0, s.jsx)(v, {
                          label: "Qu\xe9 recomienda",
                          value: e.recommendation,
                        }),
                        (0, s.jsx)(v, {
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
      function v(e) {
        let { label: t, value: a } = e;
        return (0, s.jsxs)("div", {
          className: "rounded-2xl bg-slate-50 p-4",
          children: [
            (0, s.jsx)("dt", {
              className:
                "text-xs font-semibold uppercase tracking-[0.16em] text-muted",
              children: t,
            }),
            (0, s.jsx)("dd", {
              className: "mt-2 text-sm leading-6 text-slate-700",
              children: a,
            }),
          ],
        });
      }
      var w = a(152),
        N = a(2721),
        y = a(4308),
        k = a(9551),
        E = a(3931),
        _ = a(6171),
        A = a(2138),
        C = a(5789);
      function L() {
        let e = (function (e) {
          let t = e.restaurants.reduce((e, t) => {
            var a;
            return (e[t.city] = (null != (a = e[t.city]) ? a : 0) + 1), e;
          }, {});
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
            cityBars: Object.entries(t).map((e) => {
              let [t, a] = e;
              return { city: t, total: a };
            }),
            rankingRows: e.kams.map((e) => ({
              id: e.id,
              title: e.name,
              subtitle: e.portfolio,
              metric: ""
                .concat(e.restaurantsAtRisk, " restaurantes en riesgo \xb7 ")
                .concat(e.openAlerts, " alertas abiertas"),
              tone: (0, A.k)(e.openAlerts),
              href: "/kams/".concat(e.id),
            })),
            digest: e.agentDigest,
          };
        })((0, C.t)());
        return (0, s.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, s.jsxs)(k.z, {
              eyebrow: e.header.eyebrow,
              title: e.header.title,
              description: e.header.description,
              children: [
                (0, s.jsxs)("div", {
                  className: "grid gap-4 xl:grid-cols-[1.15fr_0.85fr]",
                  children: [
                    (0, s.jsx)(g.p, {
                      eyebrow: "Foco cr\xedtico",
                      title: "Riesgo prioritario del d\xeda",
                      value: "Cobertura comercial tensionada",
                      accent: "brand",
                      description:
                        "Las se\xf1ales activas se concentran en cuentas clave y ya requieren seguimiento coordinado entre KAM, operaci\xf3n y validaci\xf3n de datos.",
                    }),
                    (0, s.jsx)(w.A, {
                      label: "Briefing ejecutivo",
                      tone: "neutral",
                      children:
                        "El sistema ya expresa el patr\xf3n del agente en la primera lectura: detecci\xf3n, impacto, intervenci\xf3n sugerida y siguiente movimiento operativo.",
                    }),
                  ],
                }),
                (0, s.jsx)(_.V, {
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
                      value: "".concat(e.digest.signals.length),
                      detail:
                        "Lectura abierta del agente en este snapshot controlado.",
                      tone: "warning",
                    },
                    {
                      id: "priority-kams",
                      label: "KAMs priorizados",
                      value: "".concat(e.kams.length),
                      detail:
                        "Managers visibles para decidir d\xf3nde bajar primero.",
                      tone: "critical",
                    },
                    {
                      id: "alerts",
                      label: "Alertas activas",
                      value: "".concat(e.alertSummary.length),
                      detail:
                        "Cola operativa lista para seguimiento y trazabilidad.",
                      tone: "stable",
                    },
                  ],
                }),
              ],
            }),
            (0, s.jsx)(x, {
              headline: e.digest.headline,
              detected: e.digest.detected,
              whyItMatters: e.digest.whyItMatters,
              recommendation: e.digest.recommendation,
              nextStep: e.digest.nextStep,
            }),
            (0, s.jsx)(j, { items: e.topKpis }),
            (0, s.jsxs)("div", {
              className: "grid gap-6 xl:grid-cols-[1.2fr_0.8fr]",
              children: [
                (0, s.jsx)(p, { items: e.kamPressureItems }),
                (0, s.jsx)(f, { items: e.digest.signals }),
              ],
            }),
            (0, s.jsxs)("div", {
              className: "grid gap-6 xl:grid-cols-[0.95fr_1.05fr]",
              children: [
                (0, s.jsx)(y._, {
                  eyebrow: "Concentraci\xf3n",
                  title: "Ciudades con cuentas bajo seguimiento",
                  description:
                    "Lectura simple de concentraci\xf3n de riesgo por plaza usando solo el inventario mock ya visible.",
                  children: (0, s.jsx)("div", {
                    className: "space-y-4",
                    children: e.cityBars.map((t) => {
                      let a = "".concat(
                        Math.max((t.total / e.restaurants.length) * 100, 16),
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
                                  children: t.city,
                                }),
                                (0, s.jsxs)("p", {
                                  className: "text-sm font-semibold text-ink",
                                  children: [t.total, " cuentas"],
                                }),
                              ],
                            }),
                            (0, s.jsx)("div", {
                              className: "mt-2 h-3 rounded-full bg-slate-100",
                              children: (0, s.jsx)("div", {
                                className: "h-3 rounded-full bg-brand",
                                style: { width: a },
                              }),
                            }),
                          ],
                        },
                        t.city,
                      );
                    }),
                  }),
                }),
                (0, s.jsx)(E.b, {
                  eyebrow: "Intervenci\xf3n",
                  title: "KAMs priorizados para seguimiento",
                  description:
                    "Orden visual para decidir d\xf3nde abrir el siguiente hilo de intervenci\xf3n.",
                  rows: e.rankingRows,
                }),
              ],
            }),
            (0, s.jsxs)("div", {
              className: "grid gap-6 xl:grid-cols-[1.05fr_0.95fr]",
              children: [
                (0, s.jsx)(o, { items: e.alertSummary }),
                (0, s.jsx)(N.l, {
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
            (0, s.jsxs)("div", {
              className:
                "inline-flex items-center gap-2 text-sm font-semibold text-brand-700",
              children: [
                "Navega a Alertas para operar la cola urgente",
                (0, s.jsx)(l, { className: "h-4 w-4" }),
              ],
            }),
          ],
        });
      }
    },
    6171: (e, t, a) => {
      "use strict";
      a.d(t, { V: () => n });
      var s = a(5155),
        r = a(6486);
      let l = {
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
        return (0, s.jsx)("div", {
          className: (0, r.cn)("grid gap-3", i[a], n),
          children: t.map((e) => {
            var t;
            return (0, s.jsxs)(
              "article",
              {
                className: (0, r.cn)(
                  "rounded-[24px] border p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
                  l[null != (t = e.tone) ? t : "neutral"],
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
            );
          }),
        });
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
          actions: i,
          children: n,
          className: d,
        } = e;
        return (0, s.jsxs)("section", {
          className: (0, r.cn)(
            "rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur",
            d,
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
                i,
              ],
            }),
            n,
          ],
        });
      }
    },
    7572: (e, t, a) => {
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
            d: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
          }),
        );
      });
    },
    7993: (e, t, a) => {
      "use strict";
      a.d(t, { p: () => i });
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
      function i(e) {
        let {
          eyebrow: t,
          title: a,
          value: i,
          description: n,
          accent: d = "neutral",
          icon: c,
          footer: o,
          className: m,
        } = e;
        return (0, s.jsxs)("article", {
          className: (0, r.cn)(
            "rounded-[28px] border p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]",
            l[d],
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
                c
                  ? (0, s.jsx)("div", {
                      className:
                        "flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-100",
                      children: c,
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
          badge: i,
          actions: n,
          children: d,
          className: c,
        } = e;
        return (0, s.jsxs)("section", {
          className: (0, r.cn)(
            "overflow-hidden rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel shadow-brand-100/20 backdrop-blur md:p-7",
            c,
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
                        i,
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
                n
                  ? (0, s.jsx)("div", {
                      className: "flex shrink-0 flex-wrap gap-3",
                      children: n,
                    })
                  : null,
              ],
            }),
            d ? (0, s.jsx)("div", { className: "mt-6", children: d }) : null,
          ],
        });
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [962, 261, 441, 684, 358], () => t(439)), (_N_E = e.O());
  },
]);
