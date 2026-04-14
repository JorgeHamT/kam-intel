"use client";

import Link from "next/link";

import { Eyebrow } from "@/components/shared/reference-primitives";
import { createCase2DashboardViewModel } from "@/lib/data/case2/adapters";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import { usePresentationSnapshot } from "@/lib/demo/use-presentation-snapshot";
import { useDemoStore } from "@/lib/store/demo-store";

type DashboardPageClientProps = {
  baseOutput: Case2OutputBundle;
};

export function DashboardPageClient({ baseOutput }: DashboardPageClientProps) {
  const snapshot = usePresentationSnapshot(baseOutput);
  const viewModel = createCase2DashboardViewModel(snapshot.bundle);
  const lastRefresh = useDemoStore((state) => state.lastRefresh);
  const scenario = useDemoStore((state) => state.scenario);

  const cityRows = viewModel.cityRiskSummary.slice(0, 4);
  const totalCities = viewModel.cityRiskSummary.length;
  const verticalRows = viewModel.verticalRiskSummary.slice(0, 3);
  const topKams = viewModel.kamsUnderPressure.slice(0, 2);
  const healthScore = (10 - viewModel.summary.averagePriorityScore / 12).toFixed(1);
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
          message: "Alerta crítica: se detectó presión operativa en cuentas prioritarias",
          cta: "Ver detalle",
        }
      : scenario === "foco-kam"
        ? {
            tone: "critical" as const,
            message: "Prioridad de intervención KAM en portafolios de alto riesgo",
            cta: "Ver detalle",
          }
        : scenario === "discrepancias"
          ? {
              tone: "warning" as const,
              message: "Se detectaron discrepancias de datos que requieren validación",
              cta: "Revisar datos",
            }
          : null;

  return (
    <div className="space-y-6">
      {bannerConfig ? (
        <section
          className={`flex items-center justify-between rounded-[16px] px-5 py-3.5 ${
            bannerConfig.tone === "critical"
              ? "bg-brand text-white"
              : "bg-[#fff2e1] text-[#7a5616]"
          }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="text-sm">{bannerConfig.tone === "critical" ? "⚠" : "●"}</span>
            <p className="truncate text-[12px] font-semibold uppercase tracking-[0.08em]">
              {bannerConfig.message}
            </p>
          </div>

          <button
            type="button"
            className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${
              bannerConfig.tone === "critical"
                ? "bg-white/15 text-white"
                : "bg-white/70 text-[#7a5616]"
            }`}
          >
            {bannerConfig.cta}
          </button>
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
          label="Total monitoreado"
          value={viewModel.summary.totalRestaurants.toLocaleString()}
          detail={`+${viewModel.summary.topAlertCount} este mes`}
        />
        <KpiCard
          label="Riesgo crítico"
          value={`${viewModel.summary.criticalCount}`}
          detail="Requiere atención inmediata"
          tone="critical"
        />
        <KpiCard
          label="Exposición ingresos"
          value={`$${viewModel.summary.averagePriorityScore.toFixed(1)}M`}
          detail="Pérdida semanal estimada"
        />
        <KpiCard label="Salud promedio" value={healthScore} tone="health" />
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
                  label="Riesgo regional"
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
                <span className="text-right">Ing.</span>
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
                      ${Math.round(city.averagePriorityScore * 4.5)}k
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
                      Impacto semanal estimado: $
                      {Math.round(vertical.averagePriorityScore * 1.8)}k
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

function getLowerPanelContent(scenario: string) {
  switch (scenario) {
    case "crisis":
      return {
        signals: [
          "Aumentó la presión operativa en cuentas prioritarias.",
          "Se observa deterioro visible en indicadores recientes.",
          "Se requiere seguimiento urgente sobre casos críticos.",
        ],
        reason:
          "El escenario combina varias señales negativas al mismo tiempo y eleva la necesidad de intervención operativa inmediata.",
        interventionLabel: "Acción realizada",
        interventionBody:
          "Se activó revisión urgente con seguimiento sobre las cuentas de mayor riesgo.",
        interventionTime: "Hace 14 h",
      };
    case "foco-kam":
      return {
        signals: [
          "La presión se concentra en cuentas prioritarias del portafolio.",
          "La cartera del KAM requiere seguimiento más cercano.",
          "Hay focos puntuales que justifican revisión inmediata.",
        ],
        reason:
          "El sistema priorizó este escenario por la concentración de riesgo dentro de una cartera con alto impacto operativo.",
        interventionLabel: "Acción realizada",
        interventionBody:
          "Se solicitó revisión del portafolio prioritario con el KAM responsable.",
        interventionTime: "Hace 14 h",
      };
    case "discrepancias":
      return {
        signals: [
          "Se detectaron inconsistencias entre indicadores clave.",
          "Hay información pendiente de validación en cuentas relevantes.",
          "Se requiere revisión de calidad antes de escalar alertas.",
        ],
        reason:
          "El caso se señaló por diferencias de validación y consistencia de datos, no por una crisis operativa directa.",
        interventionLabel: "Acción realizada",
        interventionBody:
          "Se abrió una revisión de calidad para validar la información antes de definir la prioridad final.",
        interventionTime: "Hace 14 h",
      };
    case "estable":
      return {
        signals: [
          "La operación se mantiene estable en las cuentas monitoreadas.",
          "No se observan señales de presión relevante en este momento.",
        ],
        reason:
          "El sistema mantiene seguimiento preventivo sobre la operación, sin señales que indiquen una alerta mayor.",
        interventionLabel: "Acción realizada",
        interventionBody:
          "Se realizó una revisión preventiva para confirmar continuidad operativa sin hallazgos críticos.",
        interventionTime: "Hace 14 h",
      };
    case "base":
    default:
      return {
        signals: [
          "El monitoreo sigue activo sobre cuentas prioritarias.",
          "Se observan señales leves que conviene seguir de cerca.",
          "No hay presión crítica generalizada en el portafolio.",
        ],
        reason:
          "El dashboard resume el contexto general de monitoreo y ayuda a detectar cambios tempranos antes de una intervención mayor.",
        interventionLabel: "Acción realizada",
        interventionBody:
          "Se mantuvo seguimiento de rutina sobre cuentas prioritarias y revisión del comportamiento reciente.",
        interventionTime: "Hace 14 h",
      };
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
}: {
  label: string;
  value: string;
  detail?: string;
  tone?: "default" | "critical" | "health";
}) {
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
                ? "text-[#0b7b72]"
                : "text-[#17181b]"
          }`}
        >
          {value}
          {tone === "health" ? (
            <span className="text-base text-[#8b919d]"> / 10</span>
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
                className="h-full rounded-full bg-[#0b7b72]"
                style={{ width: "84%" }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
