"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";

import { AvatarBadge } from "@/components/shared/avatar-badge";
import {
  Eyebrow,
  MetricTile,
  ReferenceCard,
} from "@/components/shared/reference-primitives";
import { createCase2KamsListViewModel } from "@/lib/data/case2/adapters";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import { usePresentationSnapshot } from "@/lib/demo/use-presentation-snapshot";

type KamsPageClientProps = {
  baseOutput: Case2OutputBundle;
};

type ViewMode = "cards" | "list";
type SortMode = "risk" | "alphabetical";

function formatRevenueMillions(valueMxn: number) {
  return `$${(valueMxn / 1_000_000).toFixed(2)}M`;
}

function formatRevenueCompact(valueMxn: number) {
  if (valueMxn >= 1_000_000) {
    return `$${(valueMxn / 1_000_000).toFixed(1)}M`;
  }

  return `$${Math.round(valueMxn / 1000)}k`;
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

function getKamRole(index: number) {
  if (index === 0) {
    return "Líder de cuentas estratégicas";
  }

  if (index === 1) {
    return "KAM senior";
  }

  if (index === 2) {
    return "Gerente regional";
  }

  return "Ejecutivo de cuentas";
}

function getAvatarPathHint(name: string) {
  return `/avatars/kams/${name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}.png`;
}

export function KamsPageClient({ baseOutput }: KamsPageClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [sortMode, setSortMode] = useState<SortMode>("risk");
  const snapshot = usePresentationSnapshot(baseOutput);
  const viewModel = createCase2KamsListViewModel(snapshot.bundle, baseOutput);
  const cards = useMemo(
    () =>
      [...viewModel.cards].sort((left, right) => {
        if (sortMode === "alphabetical") {
          return (left.kam.kamName ?? left.kam.kamId).localeCompare(
            right.kam.kamName ?? right.kam.kamId,
            "es",
          );
        }

        return right.metrics.visiblePriorityScore - left.metrics.visiblePriorityScore;
      }),
    [sortMode, viewModel.cards],
  );
  const baseTotalAccounts = baseOutput.global.dashboard.totalRestaurants;
  const baseTotalKams = baseOutput.kams.length;
  const totalCriticalAccounts = cards.reduce(
    (sum, card) => sum + card.metrics.portfolioMix.criticalCount,
    0,
  );
  const totalRevenueAtRisk = cards.reduce(
    (sum, card) => sum + card.metrics.revenueAtRiskMxn,
    0,
  );
  const averageHealth =
    cards.length > 0
      ? cards.reduce((sum, card) => sum + card.metrics.healthScore, 0) /
        cards.length
      : 0;
  const topPriorityCard = cards[0];
  const topPriorityLabel = topPriorityCard
    ? topPriorityCard.metrics.portfolioMix.criticalCount >= 4 ||
      topPriorityCard.metrics.pressurePct >= 35
      ? "Alta"
      : topPriorityCard.metrics.portfolioMix.atRiskCount >= 3
        ? "Media"
        : "Controlada"
    : "Controlada";

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-[2.75rem] font-semibold leading-none tracking-[-0.06em] text-[#17181b]">
            Centro de mando KAM
          </h1>
          <p className="mt-2 text-sm text-[#7a818d]">
            Lectura comparativa del portafolio activo para priorizar intervención,
            presión operativa y foco comercial por manager.
          </p>
        </div>
        <div className="flex flex-col gap-2 self-start xl:items-end">
          <ViewToggle
            labelA="Vista de tarjetas"
            labelB="Vista de lista"
            value={viewMode}
            optionA="cards"
            optionB="list"
            onChange={setViewMode}
          />
          <ViewToggle
            labelA="Mayor riesgo primero"
            labelB="Alfabético"
            value={sortMode}
            optionA="risk"
            optionB="alphabetical"
            onChange={setSortMode}
          />
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-4">
        <MetricTile
          label="Salud del portafolio"
          value={`${averageHealth.toFixed(1)} / 100`}
          detail={`${viewModel.summary.underPressureCount} de ${baseTotalKams} KAMs bajo presión`}
          accent="green"
        />
        <MetricTile
          label="Ingresos en riesgo"
          value={formatRevenueMillions(totalRevenueAtRisk)}
          detail={`Universo base: ${baseTotalAccounts} cuentas`}
          accent="brand"
        />
        <MetricTile
          label="Cuentas críticas"
          value={`${totalCriticalAccounts}`}
          detail={`de ${baseTotalAccounts} cuentas del caso`}
        />
        <MetricTile
          label="Prioridad de alerta"
          value={topPriorityLabel}
          detail={`${viewModel.summary.totalAlerts} alertas visibles en el escenario`}
        />
      </div>

      <ReferenceCard tone="brand" className="rounded-[22px] px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <span className="mt-1 text-brand">●</span>
            <div>
              <Eyebrow tone="brand">Lógica de prioridad de intervención</Eyebrow>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-[#5d6470]">
                Se eleva la prioridad cuando coinciden densidad de cuentas
                críticas, presión del portafolio y concentración de alertas en
                un mismo KAM. La vista ordena ese foco para acelerar revisión
                operativa.
              </p>
            </div>
          </div>
          <div className="hidden rounded-full border border-[#ffd4d6] bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand xl:block">
            Nota operativa
          </div>
        </div>
      </ReferenceCard>

      {cards.length === 0 ? (
        <ReferenceCard className="flex min-h-[240px] items-center justify-center text-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6d7481]">
              Sin KAMs disponibles
            </p>
            <p className="mt-2 text-sm text-[#8b919d]">
              El escenario activo no tiene portafolios para comparar en esta vista.
            </p>
          </div>
        </ReferenceCard>
      ) : viewMode === "cards" ? (
        <div className="grid gap-4 xl:grid-cols-3">
          {cards.map((card, index) => (
            <KamCard
              key={card.kam.kamId}
              card={card}
              index={index}
              highlight={sortMode === "risk" && index === 0}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {cards.map((card, index) => (
            <KamListRow
              key={card.kam.kamId}
              card={card}
              index={index}
              highlight={sortMode === "risk" && index === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ViewToggle<T extends string>({
  labelA,
  labelB,
  value,
  optionA,
  optionB,
  onChange,
}: {
  labelA: string;
  labelB: string;
  value: T;
  optionA: T;
  optionB: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="flex items-center gap-2 self-start rounded-[14px] border border-[#e6e7ec] bg-white p-1">
      <button
        type="button"
        onClick={() => onChange(optionA)}
        className={`rounded-[10px] px-4 py-2 text-xs font-semibold transition ${
          value === optionA
            ? "bg-[#fff2f2] text-brand"
            : "text-[#8b919d] hover:text-[#434955]"
        }`}
      >
        {labelA}
      </button>
      <button
        type="button"
        onClick={() => onChange(optionB)}
        className={`rounded-[10px] px-4 py-2 text-xs font-semibold transition ${
          value === optionB
            ? "bg-[#fff2f2] text-brand"
            : "text-[#8b919d] hover:text-[#434955]"
        }`}
      >
        {labelB}
      </button>
    </div>
  );
}

function SegmentedPortfolioBar({
  criticalPct,
  atRiskPct,
  healthyPct,
}: {
  criticalPct: number;
  atRiskPct: number;
  healthyPct: number;
}) {
  const normalizedCriticalPct = Math.max(0, Math.min(criticalPct, 100));
  const normalizedAtRiskPct = Math.max(
    0,
    Math.min(atRiskPct, 100 - normalizedCriticalPct),
  );
  const normalizedHealthyPct = Math.max(
    0,
    Math.min(healthyPct, 100 - normalizedCriticalPct - normalizedAtRiskPct),
  );
  const criticalEnd = normalizedCriticalPct;
  const atRiskEnd = normalizedCriticalPct + normalizedAtRiskPct;
  const healthyEnd = normalizedCriticalPct + normalizedAtRiskPct + normalizedHealthyPct;
  const background = healthyEnd
    ? `linear-gradient(90deg,
        #f24d4f 0%,
        #f24d4f ${criticalEnd}%,
        #f2b34f ${criticalEnd}%,
        #f2b34f ${atRiskEnd}%,
        #0c7a74 ${atRiskEnd}%,
        #0c7a74 ${healthyEnd}%,
        #eceef2 ${healthyEnd}%,
        #eceef2 100%)`
    : "#eceef2";
  const trackStyle = {
    background,
  } satisfies CSSProperties;

  return (
    <div
      className="mt-3 h-2.5 overflow-hidden rounded-full"
      style={trackStyle}
    />
  );
}

function MiniMetric({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "brand";
}) {
  return (
    <div className="rounded-[16px] border border-[#ebedf2] bg-[#f7f8fa] p-4">
      <Eyebrow>{label}</Eyebrow>
      <p
        className={`mt-2 text-[1.55rem] font-semibold leading-none tracking-[-0.05em] ${
          tone === "brand" ? "text-brand" : "text-[#17181b]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function KamCard({
  card,
  index,
  highlight,
}: {
  card: ReturnType<typeof createCase2KamsListViewModel>["cards"][number];
  index: number;
  highlight: boolean;
}) {
  const { kam, metrics } = card;
  const total = Math.max(kam.portfolioSize, 1);
  const criticalPct = (metrics.portfolioMix.criticalCount / total) * 100;
  const atRiskPct = (metrics.portfolioMix.atRiskCount / total) * 100;
  const healthyPct = (metrics.portfolioMix.stableCount / total) * 100;
  const pressurePct = metrics.pressurePct;
  const avatarPathHint = getAvatarPathHint(kam.kamName ?? kam.kamId);

  return (
    <ReferenceCard
      className={`rounded-[22px] p-4 ${
        highlight
          ? "border-[#ffd6d8] shadow-[0_14px_32px_rgba(242,77,79,0.12)]"
          : "shadow-[0_10px_28px_rgba(20,20,24,0.05)]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <AvatarBadge
            name={kam.kamName ?? kam.kamId}
            size="lg"
            imageSrc={avatarPathHint}
            className="bg-[linear-gradient(180deg,#484d59_0%,#262932_100%)]"
          />
          <div className="min-w-0">
            {highlight ? (
              <div className="mb-2 inline-flex rounded-full bg-[#fff1f1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                Prioridad de intervención
              </div>
            ) : null}
            <h2 className="truncate text-[1.35rem] font-semibold leading-tight tracking-[-0.04em] text-[#17181b]">
              {kam.kamName ?? kam.kamId}
            </h2>
            <p className="mt-1 text-sm text-[#7f8692]">{getKamRole(index)}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <MiniMetric label="Cuentas" value={`${kam.portfolioSize}`} />
        <MiniMetric
          label="Ingresos en riesgo"
          value={formatRevenueCompact(metrics.revenueAtRiskMxn)}
          tone="brand"
        />
      </div>

      <div className="mt-4 rounded-[18px] border border-[#eceef2] bg-[#fbfbfc] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Eyebrow>Mezcla del portafolio</Eyebrow>
            <p className="mt-2 text-sm font-medium text-[#4d5562]">
              Presión operativa en {formatPercent(pressurePct)} del portafolio
            </p>
          </div>
          <div className="text-right">
            <Eyebrow>Salud</Eyebrow>
            <p className="mt-2 text-lg font-semibold text-[#17181b]">
              {metrics.healthScore.toFixed(1)} / 100
            </p>
          </div>
        </div>
        <SegmentedPortfolioBar
          criticalPct={criticalPct}
          atRiskPct={atRiskPct}
          healthyPct={healthyPct}
        />
        <div className="mt-3 flex items-center justify-between text-[11px] text-[#7f8692]">
          <span>Crítico {metrics.portfolioMix.criticalCount}</span>
          <span>En riesgo {metrics.portfolioMix.atRiskCount}</span>
          <span>Estable {metrics.portfolioMix.stableCount}</span>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="grid grid-cols-2 gap-5 text-sm">
          <div>
            <Eyebrow>Presión operativa</Eyebrow>
            <p className="mt-2 text-[1.45rem] font-semibold leading-none text-brand">
              {formatPercent(pressurePct)}
            </p>
          </div>
          <div>
            <Eyebrow>Cuentas alertadas</Eyebrow>
            <p className="mt-2 text-[1.45rem] font-semibold leading-none text-[#17181b]">
              {metrics.alertCount}
            </p>
          </div>
        </div>

        <Link
          href={`/kams/${kam.kamId}`}
          className={`rounded-[12px] px-4 py-3 text-sm font-semibold ${
            highlight
              ? "bg-[#17181b] text-white"
              : "border border-[#e4e6eb] bg-white text-[#3d4350]"
          }`}
        >
          Revisar portafolio
        </Link>
      </div>
    </ReferenceCard>
  );
}

function KamListRow({
  card,
  index,
  highlight,
}: {
  card: ReturnType<typeof createCase2KamsListViewModel>["cards"][number];
  index: number;
  highlight: boolean;
}) {
  const { kam, metrics } = card;
  const total = Math.max(kam.portfolioSize, 1);
  const criticalPct = (metrics.portfolioMix.criticalCount / total) * 100;
  const atRiskPct = (metrics.portfolioMix.atRiskCount / total) * 100;
  const healthyPct = (metrics.portfolioMix.stableCount / total) * 100;
  const pressurePct = metrics.pressurePct;

  return (
    <ReferenceCard
      className={`rounded-[20px] px-4 py-4 ${
        highlight ? "border-[#ffd6d8] bg-[#fffafb]" : ""
      }`}
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <AvatarBadge
            name={kam.kamName ?? kam.kamId}
            size="md"
            imageSrc={getAvatarPathHint(kam.kamName ?? kam.kamId)}
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-lg font-semibold text-[#17181b]">
                {kam.kamName ?? kam.kamId}
              </h2>
              {highlight ? (
                <span className="rounded-full bg-[#fff1f1] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                  Prioritario
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-[#7f8692]">{getKamRole(index)}</p>
          </div>
        </div>

        <div className="grid flex-1 gap-3 xl:grid-cols-[0.9fr_0.85fr_1.1fr_auto] xl:items-center">
          <MiniMetric label="Cuentas" value={`${kam.portfolioSize}`} />
          <MiniMetric
            label="Ingresos en riesgo"
            value={formatRevenueCompact(metrics.revenueAtRiskMxn)}
            tone="brand"
          />
          <div className="rounded-[16px] border border-[#ebedf2] bg-[#f7f8fa] p-4">
            <div className="flex items-center justify-between gap-3">
              <Eyebrow>Salud del portafolio</Eyebrow>
              <span className="text-xs font-semibold text-brand">
                {formatPercent(pressurePct)} en presión
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#17181b]">
              {metrics.healthScore.toFixed(1)} / 100
            </p>
            <SegmentedPortfolioBar
              criticalPct={criticalPct}
              atRiskPct={atRiskPct}
              healthyPct={healthyPct}
            />
          </div>
          <div className="flex justify-start xl:justify-end">
            <Link
              href={`/kams/${kam.kamId}`}
              className={`rounded-[12px] px-4 py-3 text-sm font-semibold ${
                highlight
                  ? "bg-[#17181b] text-white"
                  : "border border-[#e4e6eb] bg-white text-[#3d4350]"
              }`}
            >
              Revisar portafolio
            </Link>
          </div>
        </div>
      </div>
    </ReferenceCard>
  );
}
