"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowPathIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { scenarioOptions } from "@/lib/demo";
import { useDemoStore } from "@/lib/store/demo-store";
import type { ScenarioId } from "@/types/domain";

const viewTitles: Record<string, string> = {
  "/": "Dashboard General",
  "/kams": "KAMs",
  "/alerts": "Alertas",
  "/validation": "Validación de datos",
  "/deck": "Deck interactivo",
};

function resolveTitle(pathname: string): string {
  if (pathname.startsWith("/restaurants/")) {
    return "Detalle de restaurante";
  }

  if (pathname.startsWith("/kams/")) {
    return "Detalle de KAM";
  }

  return viewTitles[pathname] ?? "Rappi KAM Intelligence";
}

export function Header() {
  const pathname = usePathname();
  const { scenario, lastRefresh, resetDemo, setScenario } = useDemoStore();
  const title = resolveTitle(pathname);

  return (
    <header className="sticky top-0 z-20 border-b border-white/80 bg-surface/90 px-4 py-4 backdrop-blur md:px-8 lg:px-10">
      <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
            Vista actual
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-ink">
            {title}
          </h2>
        </div>

        <div className="flex flex-col items-stretch gap-3 xl:flex-row xl:flex-wrap xl:items-center xl:justify-end">
          <label className="group flex min-w-[240px] items-center gap-3 rounded-2xl border border-white bg-white/95 px-4 py-3 text-sm shadow-sm xl:min-w-[280px]">
            <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Búsqueda global
              </p>
              <input
                aria-label="Buscar en la demo"
                value=""
                readOnly
                placeholder="Buscar KAM, alerta o restaurante"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </label>

          <label className="group flex min-w-64 items-center gap-3 rounded-2xl border border-brand-100 bg-white px-4 py-3 text-sm shadow-sm">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Escenario
              </p>
              <select
                aria-label="Seleccionar escenario"
                value={scenario}
                onChange={(event) => setScenario(event.target.value as ScenarioId)}
                className="w-full appearance-none bg-transparent pr-6 font-medium text-ink outline-none"
              >
                {scenarioOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <ChevronDownIcon className="h-4 w-4 text-muted" />
          </label>

          <button
            type="button"
            onClick={resetDemo}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Reiniciar demo
          </button>

          <div className="rounded-2xl border border-transparent bg-white/40 px-4 py-3 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Última actualización
            </p>
            <p className="text-sm font-medium text-slate-700">{lastRefresh}</p>
          </div>

          <Link
            href="/deck"
            className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-brand-700"
          >
            Deck
          </Link>

          <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700">
              JH
            </div>
            <div className="text-sm">
              <p className="font-medium text-ink">Jorge Ham</p>
              <p className="text-muted">Perfil demo</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
