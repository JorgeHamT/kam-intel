"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BellIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { scenarioOptions } from "@/lib/demo";
import { useDemoStore } from "@/lib/store/demo-store";
import type { ScenarioId } from "@/types/domain";

type SearchItem = {
  id: string;
  label: string;
  meta: string;
  href: string;
};

type HeaderProps = {
  searchItems: SearchItem[];
};

function getSearchPriority(item: SearchItem, query: string) {
  const label = item.label.toLowerCase();
  const meta = item.meta.toLowerCase();
  const combined = `${label} ${meta}`;

  if (label.startsWith(query)) {
    return 0;
  }

  if (label.split(/\s+/).some((word) => word.startsWith(query))) {
    return 1;
  }

  if (combined.split(/\s+/).some((word) => word.startsWith(query))) {
    return 2;
  }

  if (label.includes(query)) {
    return 3;
  }

  if (combined.includes(query)) {
    return 4;
  }

  return Number.POSITIVE_INFINITY;
}

export function Header({ searchItems }: HeaderProps) {
  const router = useRouter();
  const { scenario, resetDemo, setScenario, entryRoute } = useDemoStore();
  const [query, setQuery] = useState("");
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isAlertSent, setIsAlertSent] = useState(false);
  const trimmedQuery = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!trimmedQuery) {
      return [];
    }

    return searchItems
      .map((item) => ({
        item,
        priority: getSearchPriority(item, trimmedQuery),
      }))
      .filter(({ priority }) => Number.isFinite(priority))
      .sort((left, right) => {
        if (left.priority !== right.priority) {
          return left.priority - right.priority;
        }

        return left.item.label.localeCompare(right.item.label);
      })
      .map(({ item }) => item)
      .slice(0, 6);
  }, [searchItems, trimmedQuery]);

  function goToResult(href: string) {
    setQuery("");
    router.push(href);
  }

  function openAlertModal() {
    setIsAlertSent(false);
    setIsAlertModalOpen(true);
  }

  function closeAlertModal() {
    setIsAlertModalOpen(false);
    setIsAlertSent(false);
  }

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-[#e5e6eb] bg-[#fbfbfc] px-5 py-3 md:px-8 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-1 items-center gap-3">
          <form
            className="relative min-w-[260px] flex-1 xl:max-w-[560px]"
            onSubmit={(event) => {
              event.preventDefault();
              if (matches[0]) {
                goToResult(matches[0].href);
              }
            }}
          >
            <label className="group flex h-11 items-center gap-3 rounded-[14px] border border-[#e5e7ec] bg-[#f4f4f6] px-4 text-sm">
              <MagnifyingGlassIcon className="h-4 w-4 text-slate-400" />
              <input
                aria-label="Buscar en la demo"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setQuery("");
                  }
                }}
                placeholder="Buscar cuentas, KAMs o ciudades..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="inline-flex h-8 items-center justify-center rounded-[10px] bg-[#17181b] px-3 text-[11px] font-semibold text-white transition hover:bg-[#2a2c33]"
              >
                Buscar
              </button>
            </label>

            {trimmedQuery ? (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-[16px] border border-[#e5e7ec] bg-white shadow-[0_18px_40px_rgba(23,24,27,0.12)]">
                {matches.length > 0 ? (
                  <div className="py-2">
                    {matches.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => goToResult(item.href)}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-[#f7f7f9]"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-[#17181b]">
                            {item.label}
                          </span>
                          <span className="block text-xs text-slate-500">{item.meta}</span>
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                          Ir
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-4 text-sm text-slate-500">
                    No encontramos resultados para tu búsqueda.
                  </div>
                )}
              </div>
            ) : null}
          </form>
          </div>

          <div className="flex flex-wrap items-center gap-2 xl:justify-end">
            <button
              type="button"
              onClick={() => {
                resetDemo();
                router.replace(entryRoute);
              }}
              className="inline-flex h-10 items-center justify-center rounded-[10px] border border-transparent bg-transparent px-3 text-xs font-semibold text-slate-600 transition hover:text-[#17181b]"
            >
              Reiniciar demo
            </button>

            <label className="inline-flex h-10 items-center rounded-[10px] border border-transparent bg-transparent px-3 text-xs font-semibold text-slate-600">
              <span className="mr-2">Escenario</span>
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
              onClick={openAlertModal}
              className="inline-flex h-10 items-center justify-center rounded-[10px] border border-transparent bg-transparent px-3 text-xs font-semibold text-[#f24d4f]"
            >
              Enviar alerta
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

      {isAlertModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17181b]/45 px-4">
          <div className="w-full max-w-[520px] rounded-[24px] border border-[#e7e8ed] bg-white shadow-[0_24px_60px_rgba(23,24,27,0.18)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#ececf1] px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-[#17181b]">
                  Enviar alerta operativa
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Simulación de envío del resumen priorizado.
                </p>
              </div>
              <button
                type="button"
                onClick={closeAlertModal}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-[#f7f7f9] hover:text-[#17181b]"
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Destinatario
                </p>
                <p className="mt-1 text-sm font-medium text-[#17181b]">
                  ops-demo@kam-intelligence.local
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Asunto
                </p>
                <p className="mt-1 text-sm font-medium text-[#17181b]">
                  Alerta prioritaria de operación en cuentas clave
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Mensaje
                </p>
                <div className="mt-2 rounded-[16px] bg-[#f7f7f9] px-4 py-4 text-sm leading-6 text-[#4f5662]">
                  Se identificaron señales de presión operativa en cuentas prioritarias.
                  Se recomienda revisar el portafolio activo y confirmar seguimiento con
                  el KAM responsable.
                </div>
              </div>

              {isAlertSent ? (
                <div className="rounded-[14px] border border-[#d8f1e4] bg-[#eef8f2] px-4 py-3 text-sm font-medium text-[#2f7d5c]">
                  Alerta enviada
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[#ececf1] px-6 py-5">
              <button
                type="button"
                onClick={closeAlertModal}
                className="inline-flex h-11 items-center justify-center rounded-[12px] border border-[#e1e4ea] px-4 text-sm font-semibold text-slate-600 transition hover:text-[#17181b]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => setIsAlertSent(true)}
                className="inline-flex h-11 items-center justify-center rounded-[12px] bg-brand px-4 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Confirmar envío
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
