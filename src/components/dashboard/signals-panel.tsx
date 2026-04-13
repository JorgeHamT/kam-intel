import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import type { AgentSignal } from "@/types/domain";

type SignalsPanelProps = {
  items: AgentSignal[];
};

export function SignalsPanel({ items }: SignalsPanelProps) {
  return (
    <SectionCard
      eyebrow="Señales"
      title="Señales detectadas"
      description="Patrón base visible desde el arranque: qué detectó, por qué importa y cómo responder."
    >
      <div className="space-y-4">
        {items.map((item, index) => (
          <article
            key={item.id}
            className="rounded-[26px] border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.detection}
                </p>
              </div>
              <StatusBadge
                label={
                  item.tone === "critical"
                    ? "Crítico"
                    : item.tone === "warning"
                      ? "En riesgo"
                      : "Monitoreo"
                }
                tone={item.tone}
              />
            </div>

            <dl className="mt-4 grid gap-3 md:grid-cols-3">
              <InfoBlock
                label={index === 0 ? "Por qué fue marcado" : "Por qué importa"}
                value={item.whyItMatters}
              />
              <InfoBlock label="Qué recomienda" value={item.recommendation} />
              <InfoBlock label="Siguiente paso" value={item.nextStep} />
            </dl>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-slate-700">{value}</dd>
    </div>
  );
}
