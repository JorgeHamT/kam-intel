import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type DataCardProps = {
  eyebrow?: string;
  title: string;
  value?: string;
  description?: string;
  accent?: "brand" | "warning" | "stable" | "neutral";
  icon?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

const accentClasses: Record<NonNullable<DataCardProps["accent"]>, string> = {
  brand: "border-brand-100 bg-gradient-to-br from-white via-white to-brand-50/80",
  warning: "border-amber-200 bg-gradient-to-br from-white via-white to-amber-50/80",
  stable: "border-emerald-200 bg-gradient-to-br from-white via-white to-emerald-50/80",
  neutral: "border-slate-200 bg-white",
};

export function DataCard({
  eyebrow,
  title,
  value,
  description,
  accent = "neutral",
  icon,
  footer,
  className,
}: DataCardProps) {
  return (
    <article
      className={cn(
        "rounded-[28px] border p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]",
        accentClasses[accent],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {eyebrow}
            </p>
          ) : null}
          <h3 className="mt-2 text-sm font-medium text-slate-600">{title}</h3>
        </div>
        {icon ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm ring-1 ring-slate-100">
            {icon}
          </div>
        ) : null}
      </div>

      {value ? (
        <p className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-ink">{value}</p>
      ) : null}

      {description ? <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p> : null}
      {footer ? <div className="mt-5">{footer}</div> : null}
    </article>
  );
}
