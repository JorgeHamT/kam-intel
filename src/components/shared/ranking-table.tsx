import Link from "next/link";

import { StatusBadge } from "@/components/shared/status-badge";

type RankingRow = {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  tone: "critical" | "warning" | "stable" | "info";
  href?: string;
};

type RankingTableProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  rows: RankingRow[];
};

export function RankingTable({
  eyebrow,
  title,
  description,
  rows,
}: RankingTableProps) {
  return (
    <section className="rounded-[32px] border border-white/80 bg-white/95 p-6 shadow-panel backdrop-blur">
      <div className="mb-5">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-xl font-semibold text-ink">{title}</h2>
        {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
      </div>

      <div className="overflow-hidden rounded-[24px] border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50/90">
            <tr className="text-left text-slate-500">
              <th className="px-5 py-3 font-medium">Cuenta</th>
              <th className="px-5 py-3 font-medium">Señal</th>
              <th className="px-5 py-3 font-medium">Prioridad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rows.map((row) => (
              <tr key={row.id} className="align-top">
                <td className="px-5 py-4">
                  <p className="font-semibold text-ink">{row.title}</p>
                  <p className="mt-1 text-slate-500">{row.subtitle}</p>
                </td>
                <td className="px-5 py-4 text-slate-700">{row.metric}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <StatusBadge
                      label={
                        row.tone === "critical"
                          ? "Crítico"
                          : row.tone === "warning"
                            ? "En riesgo"
                            : row.tone === "stable"
                              ? "Estable"
                              : "Monitoreo"
                      }
                      tone={row.tone}
                    />
                    {row.href ? (
                      <Link href={row.href} className="font-semibold text-brand-700">
                        Abrir
                      </Link>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
