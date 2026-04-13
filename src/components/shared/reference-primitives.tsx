import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type SectionFrameProps = {
  children: ReactNode;
  className?: string;
};

type EyebrowProps = {
  children: ReactNode;
  tone?: "brand" | "muted" | "dark";
  className?: string;
};

type ReferenceCardProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "dark" | "soft" | "brand";
};

type MetricTileProps = {
  label: string;
  value: string;
  detail?: string;
  accent?: "default" | "brand" | "green" | "dark";
  className?: string;
};

type ProgressBarProps = {
  value: number;
  className?: string;
  fillClassName?: string;
};

const toneClasses: Record<NonNullable<ReferenceCardProps["tone"]>, string> = {
  default: "border-[#e7e8ed] bg-white text-[#17181b]",
  dark: "border-[#1f2024] bg-[#17181b] text-white",
  soft: "border-[#ececf1] bg-[#f8f8fa] text-[#17181b]",
  brand: "border-[#ffd9da] bg-[#fff5f5] text-[#17181b]",
};

const metricAccentClasses: Record<
  NonNullable<MetricTileProps["accent"]>,
  string
> = {
  default: "border-[#e7e8ed] bg-white text-[#17181b]",
  brand: "border-[#ffd7d8] bg-white text-[#17181b]",
  green: "border-[#d2ece2] bg-white text-[#17181b]",
  dark: "border-[#202227] bg-[#17181b] text-white",
};

export function SectionFrame({ children, className }: SectionFrameProps) {
  return (
    <section
      className={cn(
        "rounded-[24px] border border-[#e7e8ed] bg-white shadow-[0_8px_24px_rgba(20,20,24,0.05)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, tone = "muted", className }: EyebrowProps) {
  const toneClass =
    tone === "brand"
      ? "text-[#f24d4f]"
      : tone === "dark"
        ? "text-white/65"
        : "text-[#8b919d]";

  return (
    <p
      className={cn(
        "text-[10px] font-semibold uppercase tracking-[0.22em]",
        toneClass,
        className,
      )}
    >
      {children}
    </p>
  );
}

export function ReferenceCard({
  children,
  className,
  tone = "default",
}: ReferenceCardProps) {
  return (
    <article
      className={cn(
        "rounded-[24px] border p-5 shadow-[0_8px_24px_rgba(20,20,24,0.05)]",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </article>
  );
}

export function MetricTile({
  label,
  value,
  detail,
  accent = "default",
  className,
}: MetricTileProps) {
  return (
    <ReferenceCard className={cn("min-h-[104px] p-4", className, metricAccentClasses[accent])}>
      <Eyebrow tone={accent === "dark" ? "dark" : "muted"}>{label}</Eyebrow>
      <p className="mt-2 text-[2.05rem] font-semibold leading-none tracking-[-0.05em]">
        {value}
      </p>
      {detail ? (
        <p
          className={cn(
            "mt-2 text-xs font-medium",
            accent === "dark" ? "text-white/70" : "text-[#7a818d]",
          )}
        >
          {detail}
        </p>
      ) : null}
    </ReferenceCard>
  );
}

export function ProgressBar({
  value,
  className,
  fillClassName = "bg-[#f24d4f]",
}: ProgressBarProps) {
  const width = Math.max(0, Math.min(value, 100));

  return (
    <div className={cn("h-2 rounded-full bg-[#ececf1]", className)}>
      <div
        className={cn("h-2 rounded-full", fillClassName)}
        style={{ width: `${width}%` } satisfies CSSProperties}
      />
    </div>
  );
}

export function DotLegend({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 text-[#6d7481]">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color } satisfies CSSProperties}
        />
        <span>{label}</span>
      </div>
      {value ? <span className="font-semibold text-[#17181b]">{value}</span> : null}
    </div>
  );
}
