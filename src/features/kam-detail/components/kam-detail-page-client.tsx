"use client";

import Link from "next/link";

import { AvatarBadge } from "@/components/shared/avatar-badge";
import { ErrorState } from "@/components/shared/error-state";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  DotLegend,
  Eyebrow,
  ProgressBar,
  ReferenceCard,
} from "@/components/shared/reference-primitives";
import { createCase2KamDetailViewModel } from "@/lib/data/case2/adapters";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import { usePresentationSnapshot } from "@/lib/demo/use-presentation-snapshot";
import {
  getRiskStatusLabel,
  getRiskStatusTone,
} from "@/features/shared/agent-presentation";

type KamDetailPageClientProps = {
  baseOutput: Case2OutputBundle;
  kamId: string;
};

function slugifyName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function firstSentence(value: string | null | undefined) {
  if (!value) {
    return "Sin detalle adicional.";
  }

  return value.split(".")[0] || value;
}

function formatRevenueCompact(valueMxn: number) {
  return `$${Math.round(valueMxn / 1_000)}k`;
}

function formatScore(value: number) {
  return `${Math.round(value)}/100`;
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

function getRole(portfolioSize: number) {
  if (portfolioSize >= 20) {
    return "KAM senior";
  }

  if (portfolioSize >= 14) {
    return "KAM estratégico";
  }

  return "KAM de portafolio";
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
  tone?: "default" | "critical" | "positive" | "warning";
}) {
  const valueClass =
    tone === "critical"
      ? "text-brand"
      : tone === "warning"
        ? "text-[#f5b449]"
      : tone === "positive"
        ? "text-[#12b67b]"
        : "text-[#17181b]";

  return (
    <ReferenceCard className="min-h-[104px] rounded-[18px] px-4 py-3 shadow-[0_6px_14px_rgba(20,20,24,0.04)]">
      <Eyebrow>{label}</Eyebrow>
      <p className={`mt-2 text-[1.3rem] font-semibold leading-none ${valueClass}`}>
        {value}
      </p>
      {detail ? (
        <p className="mt-2 text-[11px] font-medium text-[#7f8793]">{detail}</p>
      ) : (
        <span className="mt-2 block h-[14px]" />
      )}
    </ReferenceCard>
  );
}

export function KamDetailPageClient({
  baseOutput,
  kamId,
}: KamDetailPageClientProps) {
  const snapshot = usePresentationSnapshot(baseOutput);
  const viewModel = createCase2KamDetailViewModel(snapshot.bundle, kamId);

  if (!viewModel) {
    return (
      <ErrorState
        title="KAM no disponible en el escenario activo"
        description="El portafolio solicitado no forma parte del recorte actual."
      />
    );
  }

  const {
    kam,
    restaurants,
    classifiedRestaurants,
    displayBreakdown,
  } = viewModel;
  const totalAccounts = Math.max(displayBreakdown.totalCount, 1);
  const aggregateByRestaurantId = new Map(
    snapshot.bundle.dataset.aggregates.restaurants.map((item) => [item.key, item]),
  );

  const sortedRestaurants = [...classifiedRestaurants].sort(
    (left, right) => right.restaurant.priorityScore - left.restaurant.priorityScore,
  );
  const topAccounts = sortedRestaurants.slice(0, 2);
  const inventoryRows = sortedRestaurants.slice(0, 4);

  const cityCounts = restaurants.reduce<Map<string, number>>((map, restaurant) => {
    const city =
      snapshot.bundle.dataset.restaurantMetadata[restaurant.restaurantId]?.city ??
      "Sin dato";
    map.set(city, (map.get(city) ?? 0) + 1);
    return map;
  }, new Map());

  const topCity =
    [...cityCounts.entries()].sort((left, right) => right[1] - left[1])[0]?.[0] ??
    "Sin ciudad dominante";

  const verticalTotals = [...restaurants.reduce<Map<string, number>>((map, restaurant) => {
    const vertical =
      snapshot.bundle.dataset.restaurantMetadata[restaurant.restaurantId]?.vertical ??
      "Sin dato";
    const gmv = aggregateByRestaurantId.get(restaurant.restaurantId)?.sums.gmvProxy7d ?? 0;
    map.set(vertical, (map.get(vertical) ?? 0) + gmv);
    return map;
  }, new Map()).entries()]
    .map(([vertical, total]) => ({ vertical, total }))
    .sort((left, right) => right.total - left.total);

  const topVerticalLabel = verticalTotals
    .slice(0, 2)
    .map((item) => item.vertical)
    .join(" + ");
  const maxVerticalTotal = verticalTotals[0]?.total ?? 0;

  const revenueAtRiskMxn = displayBreakdown.revenueAtRiskMxn;
  const healthValue = displayBreakdown.healthScore;
  const opsPressure = displayBreakdown.opsPressurePct;
  const criticalPct = (displayBreakdown.criticalCount / totalAccounts) * 100;
  const atRiskPct = (displayBreakdown.atRiskCount / totalAccounts) * 100;
  const stablePct = (displayBreakdown.stableCount / totalAccounts) * 100;

  const avatarSrc = `/avatars/kams/${slugifyName(kam.kamName ?? kam.kamId)}.png`;
  const matrixPoints = sortedRestaurants.slice(0, 4).map((item, index) => {
    const impact =
      aggregateByRestaurantId.get(item.restaurant.restaurantId)?.sums.gmvProxy7d ?? 0;
    return {
      id: item.restaurant.restaurantId,
      name: item.restaurant.restaurantName ?? item.restaurant.restaurantId,
      priorityScore: item.restaurant.priorityScore,
      impact,
      x: Math.max(
        18,
        Math.min(86, 26 + index * 17 + item.restaurant.priorityScore * 0.18),
      ),
      y: Math.max(14, Math.min(82, 80 - impact / Math.max(revenueAtRiskMxn, 1) * 42)),
      tone:
        item.displayStatus === "critical"
          ? "critical"
          : item.displayStatus === "at_risk"
            ? "warning"
            : "stable",
    };
  });
  const primarySignal = kam.topSignals[0];
  const secondarySignals = [
    ...kam.topSignals.slice(1),
    ...sortedRestaurants.flatMap((item) => item.restaurant.signals),
  ]
    .filter(
      (signal, index, collection) =>
        signal.label !== primarySignal?.label &&
        collection.findIndex((candidate) => candidate.id === signal.id) === index,
    )
    .slice(0, 3);
  const riskLine =
    displayBreakdown.criticalCount > 0 || displayBreakdown.atRiskCount > 0
      ? `${displayBreakdown.criticalCount} críticas, ${displayBreakdown.atRiskCount} en riesgo y ${formatRevenueCompact(
          revenueAtRiskMxn,
        )} comprometidos en el corte activo.`
      : "No hay cuentas críticas ni en riesgo en el escenario activo.";
  const priorityLine =
    displayBreakdown.criticalCount > 0
      ? "Atención inmediata sobre cuentas críticas y de mayor impacto."
      : displayBreakdown.atRiskCount > 0
        ? "Seguimiento cercano sobre cuentas en riesgo con presión operativa."
        : "Monitoreo preventivo del portafolio en esta corrida.";
  const nextBestStep =
    topAccounts[0]?.restaurant.restaurantName
      ? `Revisar primero ${topAccounts[0].restaurant.restaurantName} y confirmar fricción operativa.`
      : "Revisar las cuentas de mayor score en este corte.";

  return (
    <div className="mx-auto max-w-[1240px] space-y-4 pb-6">
      <ReferenceCard className="rounded-[24px] px-5 py-4 shadow-[0_10px_24px_rgba(20,20,24,0.04)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <AvatarBadge
              name={kam.kamName ?? kam.kamId}
              size="lg"
              imageSrc={avatarSrc}
              className="bg-[linear-gradient(180deg,#505563_0%,#242731_100%)]"
            />
            <div className="min-w-0">
              <h1 className="text-[2rem] font-semibold leading-none tracking-[-0.05em] text-[#17181b]">
                {kam.kamName ?? kam.kamId}
              </h1>
              <p className="mt-2 text-sm text-[#59606d]">
                {getRole(kam.portfolioSize)}
                <span className="mx-1.5 text-[#c3c8d0]">•</span>
                <span className="text-brand">Segmento estratégico LATAM</span>
                <span className="mx-1.5 text-[#c3c8d0]">•</span>
                {kam.portfolioSize} cuentas activas
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#525866]">
                <span>{kam.portfolioSize} cuentas</span>
                <span className="text-[#b9bfca]">•</span>
                <span>{topVerticalLabel || "Sin vertical dominante"}</span>
              </div>
            </div>
          </div>
        </div>
      </ReferenceCard>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
        <KpiCard
          label="Alertas críticas"
          value={`${displayBreakdown.criticalCount}`}
          tone="critical"
        />
        <KpiCard
          label="En riesgo"
          value={`${displayBreakdown.atRiskCount}`}
          tone="warning"
        />
        <KpiCard
          label="Estables"
          value={`${displayBreakdown.stableCount}`}
          tone="positive"
        />
        <KpiCard
          label="Ingresos en riesgo"
          value={formatRevenueCompact(revenueAtRiskMxn)}
          detail="Últimos 7 días"
        />
        <KpiCard
          label="Salud del portafolio"
          value={`${healthValue.toFixed(1)} / 100`}
          detail="Score compuesto · últimos 7 días"
        />
        <KpiCard
          label="Presión operativa"
          value={formatPercent(opsPressure)}
          detail="Cuentas críticas + en riesgo"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="space-y-4">
          <ReferenceCard className="rounded-[24px] p-0 shadow-[0_10px_24px_rgba(20,20,24,0.04)]">
            <div className="flex items-center justify-between gap-3 border-b border-[#ececf1] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="text-brand">✣</span>
                <h2 className="text-[1.02rem] font-semibold text-[#17181b]">
                  Señal de desempeño del portafolio
                </h2>
              </div>
              <div className="rounded-full bg-[#fff3f3] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                Análisis activo
              </div>
            </div>

            <div className="space-y-4 px-5 py-4">
              <div className="rounded-[18px] border border-[#f2d7da] bg-white px-4 py-4 shadow-[inset_4px_0_0_0_#ff4d57]">
                <div className="space-y-2.5 text-[14px] leading-6 text-[#464d59]">
                  <p>
                    <span className="font-semibold text-brand">Señal:</span>{" "}
                    {primarySignal?.label ?? kam.portfolioSummary}
                  </p>
                  <p>
                    <span className="font-semibold text-brand">Riesgo:</span>{" "}
                    {riskLine}
                  </p>
                  <p>
                    <span className="font-semibold text-brand">Prioridad:</span>{" "}
                    {priorityLine}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-[16px] bg-[#f7f8fb] px-4 py-4">
                  <Eyebrow>Por qué se priorizó</Eyebrow>
                  <p className="mt-2 text-sm leading-6 text-[#454c59]">
                    {primarySignal?.evidence[0]?.note ??
                      firstSentence(kam.kamBriefing ?? kam.portfolioSummary)}
                  </p>
                </div>
                <div className="rounded-[16px] bg-[#f7f8fb] px-4 py-4">
                  <Eyebrow>Intervención recomendada</Eyebrow>
                  <p className="mt-2 text-sm leading-6 text-[#454c59]">
                    {kam.topRecommendations[0]?.label ??
                      "Negociar soporte operativo para las cuentas más sensibles."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#ececf1] pt-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <Eyebrow>Siguiente mejor paso</Eyebrow>
                  <p className="mt-2 text-sm text-[#454c59]">
                    {nextBestStep}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center rounded-[12px] bg-[#171b24] px-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
                >
                  Tomar acción
                </button>
              </div>
            </div>
          </ReferenceCard>

          <ReferenceCard className="rounded-[24px] px-5 py-5 shadow-[0_10px_24px_rgba(20,20,24,0.04)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <Eyebrow>Cuentas prioritarias</Eyebrow>
                <h3 className="mt-2 text-[1.55rem] font-semibold tracking-[-0.04em] text-[#17181b]">
                  Cuentas a revisar hoy
                </h3>
              </div>
              <Link
                href="/alerts"
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand"
              >
                Ver cola prioritaria
              </Link>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {topAccounts.map(({ restaurant, displayStatus }) => (
                <Link
                  key={restaurant.restaurantId}
                  href={`/restaurants/${restaurant.restaurantId}`}
                  className="rounded-[18px] border border-[#e9ebf0] bg-white px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[1.05rem] font-semibold text-[#17181b]">
                        {restaurant.restaurantName ?? restaurant.restaurantId}
                      </p>
                      <p className="mt-1 text-xs text-[#949baa]">
                        {topVerticalLabel.split(" + ")[0] || "Gourmet"} • {topCity}
                      </p>
                    </div>
                    <StatusBadge
                      label={getRiskStatusLabel(displayStatus)}
                      tone={getRiskStatusTone(displayStatus)}
                    />
                  </div>

                  <div className="mt-4 border-t border-[#ececf1] pt-3">
                    <Eyebrow>Score de alerta</Eyebrow>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span className="text-[1.05rem] font-semibold text-brand">
                        {formatScore(restaurant.priorityScore)}
                      </span>
                      <div className="h-1.5 flex-1 rounded-full bg-[#f4d3d6]">
                        <div
                          className="h-1.5 rounded-full bg-brand"
                          style={{ width: `${Math.max(12, restaurant.priorityScore)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[10px] bg-[#171b24] px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                    Tomar acción
                  </div>
                </Link>
              ))}
            </div>
          </ReferenceCard>

          <ReferenceCard className="rounded-[24px] p-0 shadow-[0_10px_24px_rgba(20,20,24,0.04)]">
            <div className="flex items-center justify-between border-b border-[#ececf1] px-5 py-4">
              <div>
                <Eyebrow>Inventario del portafolio</Eyebrow>
                <h3 className="mt-2 text-[1.2rem] font-semibold text-[#17181b]">
                  Cuentas en revisión
                </h3>
              </div>
              <div className="flex items-center gap-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8f96a3]">
                <span>Exportar CSV</span>
                <span>Filtro</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-[1.5fr_0.9fr_0.95fr_0.9fr_0.35fr] bg-[#fbfbfc] px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">
                  <span>Cuenta</span>
                  <span>Estado</span>
                  <span>Score alerta</span>
                  <span>Ing. en riesgo</span>
                  <span className="text-center">Acciones</span>
                </div>

                {inventoryRows.map(({ restaurant, displayStatus }) => {
                  const rowRevenue =
                    aggregateByRestaurantId.get(restaurant.restaurantId)?.sums.gmvProxy7d ?? 0;

                  return (
                    <div
                      key={restaurant.restaurantId}
                      className="grid grid-cols-[1.5fr_0.9fr_0.95fr_0.9fr_0.35fr] items-center border-t border-[#ececf1] px-5 py-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-[0.98rem] font-semibold text-[#17181b]">
                          {restaurant.restaurantName ?? restaurant.restaurantId}
                        </p>
                        <p className="mt-1 text-xs text-[#9198a5]">{topCity}</p>
                      </div>

                      <div>
                        <StatusBadge
                          label={getRiskStatusLabel(displayStatus)}
                          tone={getRiskStatusTone(displayStatus)}
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-20 rounded-full bg-[#f4d3d6]">
                          <div
                            className="h-1.5 rounded-full bg-brand"
                            style={{ width: `${Math.max(10, restaurant.priorityScore)}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-[#17181b]">
                          {Math.round(restaurant.priorityScore)}
                        </span>
                      </div>

                      <span className="text-[0.98rem] font-semibold text-[#17181b]">
                        {formatRevenueCompact(rowRevenue)}
                      </span>

                      <div className="text-center text-[#7f8793]">⋮</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ReferenceCard>
        </div>

        <div className="space-y-4">
          <ReferenceCard tone="dark" className="rounded-[24px] px-4 py-4 shadow-[0_10px_24px_rgba(20,20,24,0.18)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <Eyebrow tone="dark">Señales detectadas · últimas 24 h</Eyebrow>
                <p className="mt-2 text-lg font-semibold text-white">Feed operativo</p>
              </div>
              <span className="text-brand">◉</span>
            </div>

            <div className="mt-4 space-y-3">
              {secondarySignals.map((signal, index) => (
                <div
                  key={signal.id}
                  className="rounded-[16px] border border-white/10 bg-white/[0.05] px-3.5 py-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p
                        className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                          index === 0
                            ? "text-brand"
                            : index === 1
                              ? "text-white/75"
                              : "text-[#14c38e]"
                        }`}
                      >
                        {signal.type.replaceAll("_", " ")}
                      </p>
                      <p className="mt-1.5 text-sm font-semibold leading-5 text-white">
                        {signal.label}
                      </p>
                    </div>
                    <StatusBadge
                      label={getRiskStatusLabel(signal.severityHint)}
                      tone={getRiskStatusTone(signal.severityHint)}
                    />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/68">
                    {signal.evidence[0]?.note ??
                      "Señal visible en el corte activo del portafolio."}
                  </p>
                </div>
              ))}
            </div>
          </ReferenceCard>

          <ReferenceCard className="rounded-[24px] px-5 py-5 shadow-[0_10px_24px_rgba(20,20,24,0.04)]">
            <Eyebrow>Distribución de riesgo del portafolio</Eyebrow>
            <div className="mt-4 flex justify-center">
              <div
                className="relative flex h-[170px] w-[170px] items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#ff4d57 0 ${criticalPct}%, #f5b449 ${criticalPct}% ${
                    criticalPct + atRiskPct
                  }%, #12b67b ${criticalPct + atRiskPct}% 100%)`,
                }}
              >
                <div className="flex h-[112px] w-[112px] items-center justify-center rounded-full bg-white text-center">
                  <div>
                    <p className="text-[2rem] font-semibold leading-none text-[#17181b]">
                      {displayBreakdown.totalCount}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#98a0ad]">
                      Cuentas
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <DotLegend
                color="#ff4d57"
                label="Crítico"
                value={`${displayBreakdown.criticalCount} (${formatPercent(criticalPct)})`}
              />
              <DotLegend
                color="#f5b449"
                label="En riesgo"
                value={`${displayBreakdown.atRiskCount} (${formatPercent(atRiskPct)})`}
              />
              <DotLegend
                color="#12b67b"
                label="Estable"
                value={`${displayBreakdown.stableCount} (${formatPercent(stablePct)})`}
              />
            </div>
          </ReferenceCard>

          <ReferenceCard className="rounded-[24px] px-5 py-5 shadow-[0_10px_24px_rgba(20,20,24,0.04)]">
            <Eyebrow>Matriz urgencia vs impacto</Eyebrow>
            <div className="relative mt-4 h-[210px] rounded-[16px] border border-[#edf0f3] bg-[#fcfcfd]">
              <div className="absolute inset-x-4 top-1/2 border-t border-[#eef0f3]" />
              <div className="absolute inset-y-4 left-1/2 border-l border-[#eef0f3]" />
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-medium uppercase tracking-[0.12em] text-[#8e95a2]">
                Urgencia de acción
              </p>
              <p className="absolute left-[-12px] top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-medium uppercase tracking-[0.12em] text-[#8e95a2]">
                Impacto financiero
              </p>
              {matrixPoints.map((point) => (
                <span
                  key={point.id}
                  title={`${point.name} · Score ${Math.round(
                    point.priorityScore,
                  )} · Impacto ${formatRevenueCompact(point.impact)} · Urgencia ${Math.round(
                    point.priorityScore,
                  )}/100`}
                  className={`absolute h-4 w-4 rounded-full border-2 bg-white ${
                    point.tone === "critical"
                      ? "border-brand"
                      : point.tone === "warning"
                        ? "border-[#ff9d4d]"
                        : "border-[#14c38e]"
                  }`}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                />
              ))}
            </div>
          </ReferenceCard>

          <ReferenceCard className="rounded-[24px] px-5 py-5 shadow-[0_10px_24px_rgba(20,20,24,0.04)]">
            <Eyebrow>Distribución de GMV por vertical</Eyebrow>
            <p className="mt-2 text-xs text-[#7f8793]">
              GMV del portafolio · últimos 7 días
            </p>
            <div className="mt-4 space-y-5">
              {verticalTotals.slice(0, 2).map((item, index) => {
                const width = maxVerticalTotal > 0 ? (item.total / maxVerticalTotal) * 100 : 0;

                return (
                  <div key={item.vertical}>
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold text-[#17181b]">
                        {item.vertical}
                      </span>
                      <span
                        className={
                          index === 0
                            ? "font-semibold text-brand"
                            : "font-semibold text-[#6f7785]"
                        }
                      >
                        {formatRevenueCompact(item.total)}
                      </span>
                    </div>
                    <ProgressBar
                      className="mt-3"
                      value={width}
                      fillClassName={index === 0 ? "bg-brand" : "bg-[#9da3af]"}
                    />
                  </div>
                );
              })}
            </div>
          </ReferenceCard>
        </div>
      </div>
    </div>
  );
}
