import { getMockAgentDigest } from "@/lib/agent/mock-agent";
import {
  alertSummary,
  deckSections,
  kams,
  kamPressureItems,
  restaurants,
  topKpis,
  validationIssues,
} from "@/lib/mocks/demo-data";

import type { DemoSnapshot } from "./contracts";
import { getScenarioOption } from "./options";

const baselineDigest = getMockAgentDigest();

export const baselineSnapshot: DemoSnapshot = {
  scenario: "baseline",
  scenarioOption: getScenarioOption("baseline"),
  topKpis,
  kamPressureItems,
  alertSummary,
  kams,
  restaurants,
  validationIssues,
  deckSections,
  agentDigest: baselineDigest,
};
