"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BuildingOffice2Icon,
  BellAlertIcon,
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  MapPinIcon,
  PlayIcon,
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

const executiveItems = [
  { label: "Cities", icon: MapPinIcon },
  { label: "Verticals", icon: BuildingOffice2Icon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[228px] shrink-0 flex-col border-r border-[#e5e6eb] bg-[#fbfbfc] px-4 py-5 lg:flex">
      <div className="flex items-center gap-3 px-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-black text-white">
          R
        </div>
        <div>
          <h1 className="text-[17px] font-semibold tracking-[-0.03em] text-ink">
            Rappi KAM
          </h1>
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400">
            Intelligence
          </p>
        </div>
      </div>

      <nav className="mt-8 space-y-1.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || (href !== "/" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-[12px] px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-[#fff0f0] text-brand"
                  : "border border-transparent text-slate-600 hover:bg-white hover:text-[#17181b]",
              )}
            >
              <Icon className={cn("h-4.5 w-4.5", isActive ? "text-brand" : "")} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10">
        <p className="px-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
          Executive view
        </p>
        <div className="mt-3 space-y-1.5">
          {executiveItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className="flex w-full items-center gap-3 rounded-[12px] px-4 py-3 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-[#17181b]"
            >
              <Icon className="h-4.5 w-4.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-4">
        <div className="rounded-[16px] border border-[#e7e8ed] bg-white p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            System status
          </p>
          <div className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Real-time sync active
          </div>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17181b] text-xs font-semibold text-white">
            ER
          </div>
          <div>
            <p className="text-sm font-semibold text-[#17181b]">Elena Rodriguez</p>
            <p className="text-[11px] text-slate-500">Region Head</p>
          </div>
          <PlayIcon className="ml-auto h-4 w-4 text-slate-400" />
        </div>
      </div>
    </aside>
  );
}
