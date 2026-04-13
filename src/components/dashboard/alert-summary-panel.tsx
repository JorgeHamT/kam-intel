import Link from "next/link";

import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import type { AlertSummaryItem } from "@/types/domain";

type AlertSummaryPanelProps = {
  items: AlertSummaryItem[];
};

export function AlertSummaryPanel({ items }: AlertSummaryPanelProps) {
  return (
    <SectionCard
      eyebrow="Seguimiento"
      title="Resumen de alertas"
      description="Cola inicial para demo, conectada visualmente con la narrativa del agente."
      actions={
        <Link href="/alerts" className="text-sm font-semibold text-brand-700">
          Ver todas
        </Link>
      }
    >
      <div className="overflow-hidden rounded-[24px] border border-slate-200">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-slate-500">
              <th className="px-4 py-3 font-medium">Alerta</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">ETA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-4 font-medium text-ink">{item.title}</td>
                <td className="px-4 py-4 text-slate-700">{item.owner}</td>
                <td className="px-4 py-4 text-slate-700">
                  <StatusBadge
                    label={item.status}
                    tone={
                      item.status.includes("Bloqueando")
                        ? "critical"
                        : item.status.includes("seguimiento")
                          ? "warning"
                          : "info"
                    }
                  />
                </td>
                <td className="px-4 py-4 text-slate-700">{item.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
