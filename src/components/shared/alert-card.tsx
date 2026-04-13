import Link from "next/link";

import { StatusBadge } from "@/components/shared/status-badge";
import { Eyebrow, ReferenceCard } from "@/components/shared/reference-primitives";
import type { AlertSummaryItem, RestaurantRecord } from "@/types/domain";

type AlertCardProps = {
  alert: AlertSummaryItem;
  restaurant?: RestaurantRecord;
  isBlocking: boolean;
  scoreLabel: string;
};

export function AlertCard({
  alert,
  restaurant,
  isBlocking,
  scoreLabel,
}: AlertCardProps) {
  return (
    <ReferenceCard className="p-5">
      <div className="grid gap-5 xl:grid-cols-[1.18fr_0.82fr]">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#ececf1] bg-[#17181b] text-xs font-semibold text-white">
                {(restaurant?.name ?? alert.title).slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-[1.9rem] font-semibold leading-none tracking-[-0.05em] text-[#17181b]">
                  {restaurant?.name ?? alert.title}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#7d8490]">
                  <span>{restaurant?.city ?? "LATAM"}</span>
                  <span>◆</span>
                  <span>{alert.owner}</span>
                  <span>◆</span>
                  <span>{alert.eta}</span>
                </div>
              </div>
            </div>
            <StatusBadge
              label={isBlocking ? "Critical Severity" : "At Risk"}
              tone={isBlocking ? "critical" : "warning"}
            />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[16px] border border-[#ececf1] p-4">
              <Eyebrow tone="brand">Why flagged</Eyebrow>
              <p className="mt-3 text-sm leading-6 text-[#545c68]">
                {restaurant?.whyFlagged ?? alert.title}
              </p>
            </div>
            <div className="rounded-[16px] border border-[#ececf1] p-4">
              <Eyebrow>Pushed to telegram</Eyebrow>
              <p className="mt-3 text-sm font-semibold text-[#31a56c]">
                {isBlocking ? "Pushed to Telegram" : "Not notified"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[18px] border border-[#ececf1] p-4">
          <div>
            <Eyebrow>Priority score</Eyebrow>
            <p className="mt-3 text-[3rem] font-semibold leading-none tracking-[-0.06em] text-brand">
              {scoreLabel}
              <span className="text-lg text-[#8b919d]">/100</span>
            </p>
          </div>

          <div className="mt-5 grid gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[12px] border border-[#ececf1] px-4 py-3 text-center text-sm font-semibold text-[#5b6370]">
                Review Operations
              </div>
              {restaurant ? (
                <Link
                  href={`/restaurants/${restaurant.id}`}
                  className="rounded-[12px] bg-brand px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Open Case
                </Link>
              ) : (
                <div className="rounded-[12px] bg-brand px-4 py-3 text-center text-sm font-semibold text-white">
                  Escalate Review
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ReferenceCard>
  );
}
