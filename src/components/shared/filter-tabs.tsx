import { cn } from "@/lib/utils/cn";

type FilterTab = {
  id: string;
  label: string;
  count?: number;
};

type FilterTabsProps = {
  tabs: FilterTab[];
  activeId: string;
};

export function FilterTabs({ tabs, activeId }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <div
            key={tab.id}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium",
              isActive
                ? "border-brand-200 bg-brand-50 text-brand-700"
                : "border-slate-200 bg-white text-slate-600",
            )}
          >
            <span>{tab.label}</span>
            {typeof tab.count === "number" ? (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-semibold",
                  isActive ? "bg-white text-brand-700" : "bg-slate-100 text-slate-600",
                )}
              >
                {tab.count}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
