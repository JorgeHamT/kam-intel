import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type AgentCardProps = {
  label: string;
  title?: string;
  tone?: "critical" | "warning" | "neutral";
  children: ReactNode;
  className?: string;
};

const toneClasses: Record<NonNullable<AgentCardProps["tone"]>, string> = {
  critical: "border-brand-200 bg-brand-50/80",
  warning: "border-amber-200 bg-amber-50/80",
  neutral: "border-slate-200 bg-slate-50/80",
};

export function AgentCard({
  label,
  title,
  tone = "neutral",
  children,
  className,
}: AgentCardProps) {
  return (
    <article
      className={cn(
        "rounded-[28px] border p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
        toneClasses[tone],
        className,
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
        {label}
      </p>
      {title ? <h3 className="mt-2 text-lg font-semibold text-ink">{title}</h3> : null}
      <div className="mt-3 text-sm leading-6 text-slate-700">{children}</div>
    </article>
  );
}
