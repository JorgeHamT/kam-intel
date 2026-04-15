"use client";

import Link from "next/link";

import { Eyebrow } from "@/components/shared/reference-primitives";
import { createCase2DashboardViewModel } from "@/lib/data/case2/adapters";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import { coerceActiveScenario } from "@/lib/demo/options";
import { usePresentationSnapshot } from "@/lib/demo/use-presentation-snapshot";
import { useDemoStore } from "@/lib/store/demo-store";

type DashboardPageClientProps = {
  baseOutput: Case2OutputBundle;
};

export function DashboardPageClient({ baseOutput }: DashboardPageClientProps) {
  const snapshot = usePresentationSnapshot(baseOutput);
  const viewModel = createCase2DashboardViewModel(snapshot.bundle);
  const lastRefresh = useDemoStore((state) => state.lastRefresh);
  const scenario = coerceActiveScenario(useDemoStore((state) => state.scenario));

  const cityRows = viewModel.cityRiskSummary.slice(0, 4);
  const totalCities = viewModel.cityRiskSummary.length;
  const verticalRows = viewModel.verticalRiskSummary.slice(0, 3);
  const topKams = viewModel.kamsUnderPressure.slice(0, 2);
  const baseTotalRestaurants = baseOutput.global.dashboard.totalRestaurants;
  const scenarioRestaurantCount = viewModel.summary.totalRestaurants;
  const scenarioAtRiskRevenue = snapshot.bundle.restaurants
    .filter(
      (restaurant) =>
        restaurant.status === "critical" || restaurant.status === "at_risk",
    )
    .reduce((sum, restaurant) => {
      const aggregate = snapshot.bundle.dataset.aggregates.restaurants.find(
        (item) => item.key === restaurant.restaurantId,
      );
      return sum + (aggregate?.sums.gmvProxy7d ?? 0);
    }, 0);
  const healthScore =
    scenarioRestaurantCount > 0
      ? Math.max(
          0,
          Math.min(
            100,
            ((viewModel.summary.stableCount * 100 +
              viewModel.summary.atRiskCount * 50) /
              scenarioRestaurantCount),
          ),
        )
      : 0;
  const healthTone =
    healthScore >= 70 ? "healthy" : healthScore >= 45 ? "warning" : "critical";
  const highestPressureCity = [...cityRows].sort(
    (a, b) => b.averagePriorityScore - a.averagePriorityScore,
  )[0];
  const mostStableCity = [...cityRows].sort(
    (a, b) => a.averagePriorityScore - b.averagePriorityScore,
  )[0];
  const regionalRiskShare = Math.round(
    ((viewModel.summary.criticalCount + viewModel.summary.atRiskCount) /
      Math.max(viewModel.summary.totalRestaurants, 1)) *
      100,
  );
  const lowerPanelContent = getLowerPanelContent(scenario);
  const bannerConfig =
    scenario === "crisis"
      ? {
          tone: "critical" as const,
          message: "Crisis operativa: se intensificó la presión visible en cuentas prioritarias",
        }
      : null;
  const scenarioMicrocopy =
    scenario === "dataset-original"
      ? "Clasificación visible tomada del archivo original."
      : scenario === "agent-evaluation"
        ? "Clasificación visible recalculada por el agente."
        : null;

  return (
    <div className="space-y-6">
      {bannerConfig ? (
        <section
          className={`flex items-center justify-between rounded-[16px] px-5 py-3.5 ${
            bannerConfig.tone === "critical"
              ? "bg-brand text-white"
              : "border text-[#5f231d] shadow-[0_10px_24px_rgba(187,88,78,0.16)]"
          }`}
          style={
            bannerConfig.tone === "critical"
              ? undefined
              : {
                  backgroundColor: "#f5aba4",
                  borderColor: "#e89189",
                }
          }
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="text-sm">{bannerConfig.tone === "critical" ? "⚠" : "●"}</span>
            <p className="truncate text-[12px] font-semibold uppercase tracking-[0.08em]">
              {bannerConfig.message}
            </p>
          </div>
        </section>
      ) : null}

      <section className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[3.2rem] font-semibold leading-[0.95] tracking-[-0.07em] text-[#17181b]">
            Resumen de inteligencia
          </h1>
          <p className="mt-2 text-[15px] text-[#707784]">
            Seguimiento del riesgo operativo en cuentas y ciudades de LATAM.
          </p>
          {scenarioMicrocopy ? (
            <p className="mt-2 text-[12px] font-medium text-[#8b919d]">
              {scenarioMicrocopy}
            </p>
          ) : null}
        </div>

        <div className="pt-1 text-right">
          <Eyebrow>Última actualización</Eyebrow>
          <p className="mt-1 text-[1rem] font-semibold text-[#17181b]">
            {formatRefreshLabel(lastRefresh)}
          </p>
        </div>
      </section>

      <section
        className="grid gap-5"
        style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
      >
        <KpiCard
          label="Cuentas en seguimiento"
          value={scenarioRestaurantCount.toLocaleString()}
          detail={`de ${baseTotalRestaurants} cuentas del caso`}
        />
        <KpiCard
          label="Casos críticos"
          value={`${viewModel.summary.criticalCount}`}
          detail={`${viewModel.summary.atRiskCount} adicionales en riesgo`}
          tone="critical"
        />
        <KpiCard
          label="GMV en riesgo"
          value={formatCompactCurrency(scenarioAtRiskRevenue)}
          detail="Exposición visible · últimos 7 días"
        />
        <KpiCard
          label="Presión del grupo priorizado"
          value={healthScore.toFixed(1)}
          detail={`${scenarioRestaurantCount} cuentas en seguimiento · intensidad compuesta`}
          tone="health"
          healthTone={healthTone}
        />
      </section>

      <section
        className="grid items-stretch gap-5"
        style={{ gridTemplateColumns: "1.08fr 1fr 1fr 0.8fr" }}
      >
        <PanelCard className="flex min-h-[220px] p-0">
          <div className="flex w-full flex-col">
            <DashboardSectionHeader
              title="Concentración regional"
              subtitle="Resumen ejecutivo por ciudad y riesgo"
            />

          <div className="flex-1 px-5 pb-4">
            <div className="h-full rounded-[18px] bg-[#f6f7fa] px-4 py-4 text-[#17181b]">
              <div className="grid gap-4.5">
                <RegionalMetric
                  label="Ciudad con mayor presión"
                  value={highestPressureCity?.city ?? "Sin dato"}
                  tone="brand"
                />
                <RegionalMetric
                  label="Ciudad más estable"
                  value={mostStableCity?.city ?? "Sin dato"}
                  tone="success"
                />
                <RegionalMetric
                  label="Cuentas críticas detectadas"
                  value={`${viewModel.summary.criticalCount}`}
                  tone="amber"
                />
                <RegionalMetric
                  label="Cobertura en presión"
                  value={`${regionalRiskShare}%`}
                  tone="brand"
                />
                </div>
              </div>
            </div>
          </div>
        </PanelCard>

        <PanelCard
          id="ciudades-riesgo-operativo"
          className="flex min-h-[220px] p-0"
        >
          <div className="flex w-full flex-col">
            <DashboardSectionHeader
              title="Ciudades por riesgo operativo"
              subtitle="Ciudades priorizadas en seguimiento"
            />

            <div className="flex-1 px-5 pb-3">
              <div
                className="grid items-center border-b border-[#ececf1] pb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a1a6b0]"
                style={{ gridTemplateColumns: "minmax(0,1.35fr) 88px 92px" }}
              >
                <span className="text-left">Ciudad</span>
                <span className="text-center">Riesgo</span>
                <span className="text-right">Score</span>
              </div>

              <div className="mt-1.5">
                {cityRows.map((city) => {
                const tone =
                  city.criticalCount > 0
                    ? "bg-[#ffe8e8] text-brand"
                    : city.atRiskCount > 0
                      ? "bg-[#fff2e1] text-[#d68826]"
                      : "bg-[#eaf8f0] text-[#2ca56f]";

                const label =
                  city.criticalCount > 0
                    ? "Alto"
                    : city.atRiskCount > 0
                      ? "Medio"
                      : "Bajo";

                return (
                  <div
                    key={city.city}
                    className="grid items-center rounded-[12px] px-1 py-1.5 text-sm"
                    style={{ gridTemplateColumns: "minmax(0,1.35fr) 88px 92px" }}
                  >
                    <span className="truncate pr-3 font-semibold text-[#17181b]">
                      {city.city}
                    </span>
                    <span className="flex justify-center">
                      <span
                        className={`inline-flex min-w-[58px] items-center justify-center rounded-full px-2.5 py-1 text-[11px] font-medium ${tone}`}
                      >
                        {label}
                      </span>
                    </span>
                    <span className="text-right font-medium text-[#555c67]">
                      {Math.round(city.averagePriorityScore)}
                    </span>
                  </div>
                );
                })}
              </div>

              <div className="mt-3 flex justify-center">
                <Link
                  href="/#ciudades-riesgo-operativo"
                  className="inline-flex items-center justify-center rounded-full border border-[#ececf1] px-4 py-2 text-sm font-semibold text-[#6d7481] transition hover:border-[#d9dde4] hover:text-[#17181b]"
                >
                  Ver {totalCities} ciudades
                </Link>
              </div>
            </div>
          </div>
        </PanelCard>

        <PanelCard
          id="concentracion-verticales"
          className="flex min-h-[220px]"
        >
          <div className="flex w-full flex-col">
            <DashboardSectionHeader
              title="Concentración de riesgo por vertical"
              subtitle="Verticales con mayor presión operativa"
            />

            <div className="flex-1 px-5 pb-4">
              <div className="space-y-3">
                {verticalRows.map((vertical) => {
              const riskPct = Math.min(
                92,
                Math.round((vertical.averagePriorityScore / 100) * 100),
              );
              const fillClass =
                riskPct > 50
                  ? "bg-brand"
                  : riskPct > 25
                    ? "bg-[#f2ac4b]"
                    : "bg-[#18a873]";
              const toneClass =
                riskPct > 50
                  ? "text-brand"
                  : riskPct > 25
                    ? "text-[#d68826]"
                    : "text-[#18a873]";

                return (
                  <div key={vertical.vertical}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <p className="font-semibold text-[#17181b]">{vertical.vertical}</p>
                      <p className={`font-semibold ${toneClass}`}>{riskPct}%</p>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#eceef2]">
                      <div
                        className={`h-full rounded-full ${fillClass}`}
                        style={{ width: `${riskPct}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-[#a2a8b2]">
                      Score promedio del vertical: {vertical.averagePriorityScore.toFixed(1)}
                    </p>
                  </div>
                );
                })}
              </div>
            </div>
          </div>
        </PanelCard>

        <PanelCard className="flex min-h-[220px] flex-col">
          <DashboardSectionHeader
            title="KAMs bajo presión"
            subtitle="Carteras que requieren seguimiento prioritario"
          />

          <div className="flex-1 px-5 pb-4">
          <div className="space-y-4.5">
            {topKams.map((kam) => (
              <Link
                key={kam.kamId}
                href={`/kams/${kam.kamId}`}
                className="flex items-center justify-between gap-3 rounded-[14px] border border-[#eef0f4] px-3 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7e8ed] bg-white text-[10px] font-semibold text-[#17181b]">
                    {(kam.kamName ?? kam.kamId)
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-5 text-[#17181b]">
                      {kam.kamName ?? kam.kamId}
                    </p>
                    <p className="text-[11px] text-[#9da3ad]">
                      {kam.priorityScore >= 85
                        ? "Seguimiento inmediato"
                        : kam.priorityScore >= 70
                          ? "Cartera con presión operativa"
                          : "Requiere revisión"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-brand">
                    {kam.priorityScore >= 85
                      ? "Prioridad alta"
                      : kam.priorityScore >= 70
                        ? "Riesgo alto"
                        : "Atención activa"}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#9aa0ab]">
                    Portafolio
                  </p>
                </div>
              </Link>
            ))}
          </div>
          </div>

          <button
            type="button"
            className="mx-5 mb-4 mt-6 flex h-12 items-center justify-center rounded-[16px] bg-brand px-4 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(242,77,79,0.28)]"
          >
            Revisar KAMs
          </button>
        </PanelCard>
      </section>

      <section
        className="grid items-stretch gap-5"
        style={{ gridTemplateColumns: "1.02fr 0.95fr 0.78fr" }}
      >
        <PanelCard tone="dark" className="min-h-[250px]">
          <div className="flex items-center gap-2">
            <span className="text-brand">◉</span>
            <h2 className="text-[1.02rem] font-semibold text-white">Señales detectadas</h2>
          </div>

          <div className="mt-6 space-y-4">
            {lowerPanelContent.signals.map((item) => (
              <div key={item} className="flex gap-3">
                <span className="mt-2 h-[7px] w-[7px] rounded-full bg-brand" />
                <p className="text-sm leading-6 text-white/88">{item}</p>
              </div>
            ))}
          </div>
        </PanelCard>

        <PanelCard className="min-h-[250px]">
          <h2 className="text-[1.02rem] font-semibold text-[#17181b]">
            Por qué se señaló
          </h2>

          <div className="mt-6">
            <p className="text-sm leading-7 text-[#6d7481]">
              {lowerPanelContent.reason}
            </p>
          </div>
        </PanelCard>

        <PanelCard className="min-h-[250px]">
          <h2 className="text-[1.02rem] font-semibold text-[#17181b]">
            Última intervención
          </h2>

          <div className="mt-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2ca56f]">
              {lowerPanelContent.interventionLabel}
            </p>
            <p className="mt-3 text-sm font-medium leading-7 text-[#35785b]">
              {lowerPanelContent.interventionBody}
            </p>
            <p className="mt-4 text-xs text-[#5a9a7a]">{lowerPanelContent.interventionTime}</p>
          </div>
        </PanelCard>
      </section>
    </div>
  );
}

function RegionalMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "brand" | "amber" | "success";
}) {
  const dotClass =
    tone === "brand"
      ? "bg-brand"
      : tone === "amber"
        ? "bg-[#f2ac4b]"
        : "bg-[#29C087]";

  const valueClass =
    tone === "brand"
      ? "text-[#17181b]"
      : tone === "amber"
        ? "text-[#8f6421]"
        : "text-[#167a58]";

  return (
    <div className="flex items-center justify-between rounded-[14px] bg-white px-3.5 py-4">
      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
        <span className="text-sm font-medium leading-[1.5] text-[#5d6470]">{label}</span>
      </div>
      <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}

function DashboardSectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="px-5 py-4">
      <h2 className="text-[1.02rem] font-semibold leading-[1.2] text-[#17181b]">
        {title}
      </h2>
      <p className="mt-1 text-xs leading-[1.35] text-[#8c919c]">{subtitle}</p>
    </div>
  );
}

function getLowerPanelContent(
  scenario: "dataset-original" | "agent-evaluation" | "crisis",
) {
  switch (scenario) {
    case "dataset-original":
      return {
        signals: [
          "La lectura visible replica el semáforo con el que venía clasificado el archivo.",
          "Sirve como baseline metodológico antes de aplicar la reevaluación del agente.",
          "Permite contrastar qué cuentas cambian al reinterpretar el mismo caso.",
        ],
        reason:
          "Este escenario prioriza el benchmark original del dataset para mostrar la clasificación heredada del Excel sin intensificar presión adicional.",
        interventionLabel: "Referencia activa",
        interventionBody:
          "Se mantiene esta vista como baseline de comparación para contrastar la reclasificación posterior del agente.",
        interventionTime: "Baseline del archivo",
      };
    case "agent-evaluation":
      return {
        signals: [
          "La clasificación visible ya incorpora señales, peers y momentum.",
          "El agente prioriza cuentas con deterioro compuesto aunque el benchmark original sea más conservador.",
          "Esta lectura resume la interpretación operativa del sistema sobre el mismo caso.",
        ],
        reason:
          "El dashboard refleja la reevaluación analítica del agente sobre el dataset completo y permite comparar benchmark original contra status recalculado.",
        interventionLabel: "Lectura activa",
        interventionBody:
          "Se mantiene monitoreo priorizado sobre la reclasificación del agente para anticipar intervención en cuentas sensibles.",
        interventionTime: "Motor del agente",
      };
    case "crisis":
      return {
        signals: [
          "Aumentó la presión operativa visible en cuentas prioritarias.",
          "La exposición en riesgo y la urgencia de seguimiento se intensifican frente a la evaluación del agente.",
          "La cola ejecutiva se reordena para reaccionar bajo estrés operativo.",
        ],
        reason:
          "La crisis operativa agrava el status y la prioridad sobre el universo completo para mostrar cómo responde la plataforma bajo mayor presión.",
        interventionLabel: "Acción realizada",
        interventionBody:
          "Se activó revisión urgente con seguimiento sobre las cuentas de mayor riesgo.",
        interventionTime: "Hace 14 h",
      };
    default:
      return getLowerPanelContent("agent-evaluation");
  }
}

function formatRefreshLabel(value: string) {
  return value
    .replace("minutes ago", "minutos")
    .replace("minute ago", "minuto")
    .replace("hours ago", "horas")
    .replace("hour ago", "hora");
}

function PanelCard({
  children,
  className,
  id,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "light" | "dark";
}) {
  return (
    <section
      id={id}
      className={[
        "rounded-[18px] border px-5 py-5 shadow-[0_8px_24px_rgba(20,20,24,0.05)]",
        tone === "dark"
          ? "border-[#1f2024] bg-[#17181b] text-white"
          : "border-[#e7e8ed] bg-white text-[#17181b]",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </section>
  );
}

function KpiCard({
  label,
  value,
  detail,
  tone = "default",
  healthTone = "healthy",
}: {
  label: string;
  value: string;
  detail?: string;
  tone?: "default" | "critical" | "health";
  healthTone?: "healthy" | "warning" | "critical";
}) {
  const healthValueClass =
    healthTone === "critical"
      ? "text-brand"
      : healthTone === "warning"
        ? "text-[#d68826]"
        : "text-[#0b7b72]";
  const healthTrackClass =
    healthTone === "critical"
      ? "bg-brand"
      : healthTone === "warning"
        ? "bg-[#f2ac4b]"
        : "bg-[#0b7b72]";

  return (
    <article
      className={`rounded-[18px] border bg-white px-5 py-5 shadow-[0_8px_24px_rgba(20,20,24,0.05)] ${
        tone === "critical"
          ? "border-[#ffd7d8] ring-1 ring-inset ring-[#ff6d70]"
          : "border-[#e7e8ed]"
      }`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9aa0ab]">
        {label}
      </p>

      <div className="mt-4">
        <p
          className={`text-[2.2rem] font-semibold leading-none tracking-[-0.05em] ${
            tone === "critical"
              ? "text-brand"
              : tone === "health"
                ? healthValueClass
                : "text-[#17181b]"
          }`}
        >
          {value}
          {tone === "health" ? (
            <span className="text-base text-[#8b919d]"> / 100</span>
          ) : null}
        </p>

        {detail ? (
          <p
            className={`mt-3 text-xs font-medium ${
              tone === "critical" ? "text-brand" : "text-[#8b919d]"
            }`}
          >
            {detail}
          </p>
        ) : null}

        {tone === "health" ? (
          <div className="mt-4 w-[140px]">
            <div className="h-2.5 overflow-hidden rounded-full bg-[#e8ebef]">
              <div
                className={`h-full rounded-full ${healthTrackClass}`}
                style={{ width: `${Math.max(0, Math.min(Number(value), 100))}%` }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function formatCompactCurrency(value: number) {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }

  return `$${Math.round(value / 1_000)}k`;
}
