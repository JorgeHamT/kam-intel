import Link from "next/link";

import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import type { KamPressureItem } from "@/types/domain";

type KamPressureListProps = {
  items: KamPressureItem[];
};

export function KamPressureList({ items }: KamPressureListProps) {
  return (
    <SectionCard
      eyebrow="Prioridad"
      title="KAMs bajo presión"
      description="Lectura operativa inicial con foco en dónde conviene actuar primero."
    >
      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-5"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-base font-semibold text-ink">
                    {item.name}
                  </h3>
                  <StatusBadge label={item.pressureLabel} tone="warning" />
                </div>
                <p className="text-sm font-medium text-slate-700">
                  {item.segment}
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Presión operativa
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {item.focus}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Siguiente paso
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {item.nextStep}
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href={`/kams/${item.id}`}
                className="text-sm font-semibold text-brand-700 transition hover:text-brand-800"
              >
                Ver detalle
              </Link>
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
