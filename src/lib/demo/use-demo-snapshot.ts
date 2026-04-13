"use client";

import { useDemoStore } from "@/lib/store/demo-store";

import { getDemoSnapshot } from "./scenarios";

export function useDemoSnapshot() {
  const scenario = useDemoStore((state) => state.scenario);
  return getDemoSnapshot(scenario);
}
