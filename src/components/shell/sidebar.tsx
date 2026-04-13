"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellAlertIcon,
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils/cn";
import type { NavItem } from "@/types/domain";

const navItems: Array<NavItem & { icon: typeof ChartBarSquareIcon }> = [
  { href: "/", label: "Dashboard", icon: ChartBarSquareIcon },
  { href: "/kams", label: "KAMs", icon: UserGroupIcon },
  { href: "/alerts", label: "Alertas", icon: BellAlertIcon },
  {
    href: "/validation",
    label: "Validación de datos",
    icon: ClipboardDocumentCheckIcon,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/80 bg-[#fff7f5]/95 px-5 py-6 backdrop-blur lg:flex">
      <div className="rounded-[30px] border border-brand-100/80 bg-white p-5 shadow-panel">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-lg font-black text-white shadow-sm">
            R
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">
              Rappi
            </p>
            <h1 className="text-base font-semibold text-ink">KAM Intelligence</h1>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Torre de control operativa para lectura ejecutiva, priorización y seguimiento
          de riesgo comercial.
        </p>
      </div>

      <nav className="mt-8 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || (href !== "/" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-brand text-white shadow-panel"
                  : "border border-transparent text-slate-700 hover:border-white hover:bg-white hover:text-brand-700",
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[28px] border border-dashed border-brand-200 bg-white/70 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700">
          Agente visible
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          La interfaz prioriza cuatro preguntas en cada vista: qué detectó, por qué
          importa, qué recomienda y cuál es el siguiente paso.
        </p>
      </div>
    </aside>
  );
}
