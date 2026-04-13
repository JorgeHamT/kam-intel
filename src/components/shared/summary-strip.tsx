import { cn } from "@/lib/utils/cn";

type SummaryStripItem = {
  id: string;
  label: string;
  value: string;
  detail?: string;
  tone?: "critical" | "warning" | "stable" | "neutral";
};

type SummaryStripProps = {
  items: SummaryStripItem[];
  columns?: 2 | 3 | 4;
  className?: string;
};

const toneClasses: Record<NonNullable<SummaryStripItem["tone"]>, string> = {
  critical: "border-brand-100 bg-brand-50/70",
  warning: "border-amber-200 bg-amber-50/70",
  stable: "border-emerald-200 bg-emerald-50/70",
  neutral: "border-slate-200 bg-slate-50/70",
};

const columnClasses: Record<
  NonNullable<SummaryStripProps["columns"]>,
  string
> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
};

export function SummaryStrip({
  items,
  columns = 4,
  className,
}: SummaryStripProps) {
  return (
    <div className={cn("grid gap-3", columnClasses[columns], className)}>
      {items.map((item) => (
        <article
          key={item.id}
          className={cn(
            "rounded-[24px] border p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]",
            toneClasses[item.tone ?? "neutral"],
          )}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            {item.label}
          </p>
          <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-ink">
            {item.value}
          </p>
          {item.detail ? (
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {item.detail}
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
