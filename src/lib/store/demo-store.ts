"use client";

import { create } from "zustand";

import { DEFAULT_SCENARIO_ID, DEMO_REFRESH_LABEL } from "@/lib/demo/scenarios";
import {
  coerceActiveScenario,
  FALLBACK_ROUTE,
  OFFICIAL_ENTRY_ROUTE,
} from "@/lib/demo/options";
import type { ScenarioId } from "@/types/domain";

type DemoState = {
  scenario: ScenarioId;
  lastRefresh: string;
  entryRoute: string;
  fallbackRoute: string;
  setScenario: (scenario: ScenarioId) => void;
  resetDemo: () => void;
};

export const useDemoStore = create<DemoState>((set) => ({
  scenario: DEFAULT_SCENARIO_ID,
  lastRefresh: DEMO_REFRESH_LABEL,
  entryRoute: OFFICIAL_ENTRY_ROUTE,
  fallbackRoute: FALLBACK_ROUTE,
  setScenario: (scenario) =>
    set({
      scenario: coerceActiveScenario(scenario),
      lastRefresh: DEMO_REFRESH_LABEL,
    }),
  resetDemo: () =>
    set({
      scenario: DEFAULT_SCENARIO_ID,
      lastRefresh: DEMO_REFRESH_LABEL,
      entryRoute: OFFICIAL_ENTRY_ROUTE,
      fallbackRoute: FALLBACK_ROUTE,
    }),
}));
