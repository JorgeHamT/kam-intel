import Link from "next/link";

import { StatusBadge } from "@/components/shared/status-badge";
import { Eyebrow, ReferenceCard } from "@/components/shared/reference-primitives";
import type { AlertSummaryItem, RestaurantRecord } from "@/types/domain";

type AlertCardProps = {
  alert: AlertSummaryItem;
  restaurant?: RestaurantRecord;
  isBlocking: boolean;
  scoreLabel: string;
  entityLabel: string;
  context: string;
  reason: string;
};

export function AlertCard({
  alert,
  restaurant,
  isBlocking,
  scoreLabel,
  entityLabel,
  context,
  reason,
}: AlertCardProps) {
  const primaryHref = restaurant
    ? `/restaurants/${restaurant.id}`
    : `/kams/${encodeURIComponent(alert.id.replace(/^kam-/, ""))}`;

  return (
    <ReferenceCard className="p-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] xl:items-stretch">
        <div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#ececf1] bg-[#17181b] text-xs font-semibold text-white">
                {(restaurant?.name ?? alert.title).slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <Eyebrow tone="brand">{entityLabel}</Eyebrow>
                <h2 className="mt-1 text-[1.9rem] font-semibold leading-[0.95] tracking-[-0.05em] text-[#17181b]">
                  {restaurant?.name ?? alert.title}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-5 text-[#7d8490]">
                  <span>{context}</span>
                  <span>◆</span>
                  <span>{alert.owner}</span>
                  <span>◆</span>
                  <span>{alert.eta}</span>
                </div>
              </div>
            </div>
            <div className="self-start lg:shrink-0">
              <StatusBadge
                label={isBlocking ? "Prioridad crítica" : "Seguimiento"}
                tone={isBlocking ? "critical" : "warning"}
              />
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            <div className="rounded-[16px] border border-[#ececf1] p-4">
              <Eyebrow tone="brand">Motivo</Eyebrow>
              <p className="mt-3 text-sm leading-6 text-[#545c68]">
                {reason}
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col rounded-[18px] border border-[#ececf1] p-4">
          <div>
            <Eyebrow>Prioridad</Eyebrow>
            <p className="mt-3 text-[3rem] font-semibold leading-none tracking-[-0.06em] text-brand">
              {scoreLabel}
              <span className="text-lg text-[#8b919d]">/100</span>
            </p>
          </div>

          <div className="mt-6 flex flex-1 flex-col justify-end gap-3">
            <Link
              href={primaryHref}
              className="flex min-h-[44px] items-center justify-center rounded-[12px] bg-brand px-4 py-3 text-center text-sm font-semibold leading-5 text-white"
            >
              {restaurant ? "Ver restaurante" : "Revisar KAM"}
            </Link>
          </div>
        </div>
      </div>
    </ReferenceCard>
  );
}
