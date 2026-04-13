import { cn } from "@/lib/utils/cn";
import type { HealthTone } from "@/types/domain";

const toneClasses: Record<HealthTone, string> = {
  critical: "bg-[#fff0f0] text-[#f24d4f] ring-[#ffd0d2]",
  warning: "bg-[#fff6ea] text-[#c87a1f] ring-[#f5dcc0]",
  stable: "bg-[#eef8f2] text-[#1f8b5b] ring-[#cae8d8]",
  info: "bg-[#f3f3f6] text-[#5d6470] ring-[#e3e4e9]",
};

type StatusBadgeProps = {
  label: string;
  tone: HealthTone;
};

export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ring-1 ring-inset",
        toneClasses[tone],
      )}
    >
      {label}
    </span>
  );
}
