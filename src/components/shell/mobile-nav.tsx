"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/kams", label: "KAMs" },
  { href: "/alerts", label: "Alertas" },
  { href: "/validation", label: "Datos" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-30 rounded-3xl border border-white/70 bg-white/95 p-2 shadow-panel lg:hidden">
      <div className="grid grid-cols-4 gap-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-2xl px-3 py-3 text-center text-xs font-semibold",
                isActive ? "bg-brand text-white" : "text-slate-600",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
