"use client";

import { create } from "zustand";

import { DEFAULT_SCENARIO_ID, DEMO_REFRESH_LABEL } from "@/lib/demo/scenarios";
import type { ScenarioId } from "@/types/domain";

type DemoState = {
  scenario: ScenarioId;
  lastRefresh: string;
  setScenario: (scenario: ScenarioId) => void;
  resetDemo: () => void;
};

export const useDemoStore = create<DemoState>((set) => ({
  scenario: DEFAULT_SCENARIO_ID,
  lastRefresh: DEMO_REFRESH_LABEL,
  setScenario: (scenario) =>
    set({
      scenario,
      lastRefresh: DEMO_REFRESH_LABEL,
    }),
  resetDemo: () =>
    set({
      scenario: DEFAULT_SCENARIO_ID,
      lastRefresh: DEMO_REFRESH_LABEL,
    }),
}));
