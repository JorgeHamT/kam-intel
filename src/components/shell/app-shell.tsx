import type { ReactNode } from "react";

import { Header } from "@/components/shell/header";
import { MobileNav } from "@/components/shell/mobile-nav";
import { Sidebar } from "@/components/shell/sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <Sidebar />
        <div className="min-h-screen flex-1 bg-[#f6f6f8]">
          <Header />
          <main className="px-5 py-5 pb-24 md:px-8 lg:px-8 lg:pb-10 xl:px-10">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
