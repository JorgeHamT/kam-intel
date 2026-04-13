import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

import { DataCard } from "@/components/shared/data-card";
import { StatusBadge } from "@/components/shared/status-badge";
import type { Kpi } from "@/types/domain";

type KpiGridProps = {
  items: Kpi[];
};

export function KpiGrid({ items }: KpiGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const isCritical = item.tone === "critical";
        const accent =
          item.tone === "critical"
            ? "brand"
            : item.tone === "warning"
              ? "warning"
              : item.tone === "stable"
                ? "stable"
                : "neutral";

        return (
          <DataCard
            key={item.id}
            eyebrow="Indicador clave"
            title={item.label}
            value={item.value}
            accent={accent}
            footer={
              <>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    {isCritical ? (
                      <ArrowTrendingUpIcon className="h-4 w-4 text-brand-600" />
                    ) : (
                      <ArrowTrendingDownIcon className="h-4 w-4 text-emerald-600" />
                    )}
                    {item.delta}
                  </div>
                  <StatusBadge
                    label={
                      item.tone === "critical"
                        ? "Atención"
                        : item.tone === "warning"
                          ? "Seguimiento"
                          : item.tone === "stable"
                            ? "Estable"
                            : "Contexto"
                    }
                    tone={item.tone}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.insight}
                </p>
              </>
            }
          />
        );
      })}
    </div>
  );
}
