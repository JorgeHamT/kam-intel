type BenchmarkBlockProps = {
  title: string;
  description: string;
  leftLabel: string;
  leftValue: string;
  rightLabel: string;
  rightValue: string;
  footnote?: string;
};

export function BenchmarkBlock({
  title,
  description,
  leftLabel,
  leftValue,
  rightLabel,
  rightValue,
  footnote,
}: BenchmarkBlockProps) {
  return (
    <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
        Benchmark
      </p>
      <h2 className="mt-2 text-xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <MetricPillar label={leftLabel} value={leftValue} />
        <MetricPillar label={rightLabel} value={rightValue} />
      </div>

      {footnote ? (
        <p className="mt-4 text-xs leading-5 text-slate-500">{footnote}</p>
      ) : null}
    </section>
  );
}

function MetricPillar({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
        {value}
      </p>
    </div>
  );
}
