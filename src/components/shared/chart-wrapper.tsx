import type { ReactNode } from "react";

type ChartWrapperProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function ChartWrapper({
  eyebrow,
  title,
  description,
  children,
}: ChartWrapperProps) {
  return (
    <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-xl font-semibold text-ink">{title}</h2>
      {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}
