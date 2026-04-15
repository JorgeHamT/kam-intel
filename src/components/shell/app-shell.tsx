import type { ReactNode } from "react";

import { Header } from "@/components/shell/header";
import { MobileNav } from "@/components/shell/mobile-nav";
import { Sidebar } from "@/components/shell/sidebar";
import { getCase2OutputBundle } from "@/lib/data/case2/get-output-bundle";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const baseOutput = getCase2OutputBundle();
  const cityItems = Array.from(
    new Set(baseOutput.global.dashboard.cityRiskSummary.map((item) => item.city).filter(Boolean)),
  )
    .sort((left, right) => left.localeCompare(right))
    .map((city) => ({
      id: `city-${city}`,
      label: city,
      meta: "Ciudad",
      href: "/#ciudades-riesgo-operativo",
    }));

  const searchItems = [
    ...baseOutput.kams.map((kam) => ({
      id: `kam-${kam.kamId}`,
      label: kam.kamName ?? kam.kamId,
      meta: "KAM",
      href: `/kams/${encodeURIComponent(kam.kamId)}`,
    })),
    ...baseOutput.restaurants.map((restaurant) => ({
      id: `restaurant-${restaurant.restaurantId}`,
      label: restaurant.restaurantName ?? restaurant.restaurantId,
      meta: "Restaurante",
      href: `/restaurants/${encodeURIComponent(restaurant.restaurantId)}`,
    })),
    ...cityItems,
  ];

  return (
    <div className="min-h-screen bg-surface text-ink">
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <div className="min-h-screen flex-1 bg-[#f6f6f8]">
          <Header searchItems={searchItems} />
          <main className="px-5 py-5 pb-24 md:px-8 lg:px-8 lg:pb-10 xl:px-10">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
