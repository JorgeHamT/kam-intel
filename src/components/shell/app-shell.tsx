import type { ReactNode } from "react";

import { Header } from "@/components/shell/header";
import { MobileNav } from "@/components/shell/mobile-nav";
import { Sidebar } from "@/components/shell/sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface bg-shell-gradient text-ink">
      <div className="mx-auto flex max-w-[1640px]">
        <Sidebar />
        <div className="min-h-screen flex-1">
          <Header />
          <main className="px-4 py-6 pb-24 md:px-8 lg:px-10 lg:pb-10">{children}</main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
