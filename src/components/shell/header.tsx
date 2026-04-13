"use client";

import { useRouter } from "next/navigation";
import {
  BellIcon,
  BoltIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { scenarioOptions } from "@/lib/demo";
import { useDemoStore } from "@/lib/store/demo-store";
import type { ScenarioId } from "@/types/domain";

export function Header() {
  const router = useRouter();
  const { scenario, resetDemo, setScenario, entryRoute } = useDemoStore();

  return (
    <header className="sticky top-0 z-20 border-b border-[#e5e6eb] bg-[#fbfbfc] px-5 py-3 md:px-8 lg:px-8 xl:px-10">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <label className="group flex h-11 min-w-[260px] flex-1 items-center gap-3 rounded-[14px] border border-[#e5e7ec] bg-[#f4f4f6] px-4 text-sm xl:max-w-[470px]">
            <MagnifyingGlassIcon className="h-4 w-4 text-slate-400" />
            <input
              aria-label="Buscar en la demo"
              value=""
              readOnly
              placeholder="Search accounts, KAMs, or cities..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2 xl:justify-end">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-[10px] bg-[#17181b] px-4 text-xs font-semibold text-white"
          >
            <BoltIcon className="h-3.5 w-3.5" />
            Run Analysis
          </button>

          <button
            type="button"
            onClick={() => {
              resetDemo();
              router.replace(entryRoute);
            }}
            className="inline-flex h-10 items-center justify-center rounded-[10px] border border-transparent bg-transparent px-3 text-xs font-semibold text-slate-600 transition hover:text-[#17181b]"
          >
            Reset Demo
          </button>

          <label className="inline-flex h-10 items-center rounded-[10px] border border-transparent bg-transparent px-3 text-xs font-semibold text-slate-600">
            <span className="mr-2">Scenario</span>
            <select
              aria-label="Seleccionar escenario"
              value={scenario}
              onChange={(event) => setScenario(event.target.value as ScenarioId)}
              className="appearance-none bg-transparent pr-2 text-xs font-semibold text-[#17181b] outline-none"
            >
              {scenarioOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-[10px] border border-transparent bg-transparent px-3 text-xs font-semibold text-[#f24d4f]"
          >
            Send Alert
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-transparent text-slate-500"
            aria-label="Notificaciones"
          >
            <BellIcon className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 rounded-full border border-[#e2e4e9] bg-white px-1.5 py-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#17181b] text-xs font-semibold text-white">
              JH
            </div>
            <div className="pr-1 text-xs">
              <p className="font-semibold text-ink">●</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
