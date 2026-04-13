import { cn } from "@/lib/utils/cn";
import type { HealthTone } from "@/types/domain";

const toneClasses: Record<HealthTone, string> = {
  critical: "bg-brand-50 text-brand-800 ring-brand-200",
  warning: "bg-amber-50 text-amber-800 ring-amber-200",
  stable: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  info: "bg-slate-100 text-slate-700 ring-slate-200",
};

type StatusBadgeProps = {
  label: string;
  tone: HealthTone;
};

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.01em] ring-1 ring-inset",
        toneClasses[tone],
      )}
    >
      {label}
    </span>
  );
}
