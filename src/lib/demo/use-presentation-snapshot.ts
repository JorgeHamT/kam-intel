"use client";

import type { Case2OutputBundle } from "@/lib/data/case2/output";
import { coerceActiveScenario } from "@/lib/demo/options";
import { useDemoStore } from "@/lib/store/demo-store";

import { getPresentationSnapshot } from "./scenarios";

export function usePresentationSnapshot(baseOutput: Case2OutputBundle) {
  const scenario = useDemoStore((state) => state.scenario);
  return getPresentationSnapshot(baseOutput, coerceActiveScenario(scenario));
}
