import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type CompactStatCardProps = {
  label: string;
  value: string;
  detail?: string;
  accent?: "brand" | "warning" | "stable" | "neutral" | "dark";
  trailing?: ReactNode;
  className?: string;
};

const accentClasses: Record<
  NonNullable<CompactStatCardProps["accent"]>,
  string
> = {
  brand: "border-brand-200 bg-white text-ink",
  warning: "border-amber-200 bg-white text-ink",
  stable: "border-emerald-200 bg-white text-ink",
  neutral: "border-slate-200 bg-white text-ink",
  dark: "border-slate-800 bg-[#151515] text-white",
};

export function CompactStatCard({
  label,
  value,
  detail,
  accent = "neutral",
  trailing,
  className,
}: CompactStatCardProps) {
  return (
    <article
      className={cn(
        "rounded-[24px] border p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]",
        accentClasses[accent],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.22em]",
              accent === "dark" ? "text-white/60" : "text-slate-500",
            )}
          >
            {label}
          </p>
          <p className="mt-2 text-[1.95rem] font-semibold leading-none tracking-[-0.05em]">
            {value}
          </p>
          {detail ? (
            <p
              className={cn(
                "mt-2 text-xs font-medium",
                accent === "dark" ? "text-white/70" : "text-slate-500",
              )}
            >
              {detail}
            </p>
          ) : null}
        </div>
        {trailing}
      </div>
    </article>
  );
}
