import type {
  AgentSignal,
  AlertSummaryItem,
  DataValidationIssue,
  DeckSection,
  KamPressureItem,
  KamRecord,
  Kpi,
  RestaurantRecord,
  ScenarioId,
  ScenarioOption,
} from "@/types/domain";

export type DemoAgentDigest = {
  headline: string;
  detected: string;
  whyItMatters: string;
  recommendation: string;
  nextStep: string;
  signals: AgentSignal[];
};

export type DemoSnapshot = {
  scenario: ScenarioId;
  scenarioOption: ScenarioOption;
  topKpis: Kpi[];
  kamPressureItems: KamPressureItem[];
  alertSummary: AlertSummaryItem[];
  kams: KamRecord[];
  restaurants: RestaurantRecord[];
  validationIssues: DataValidationIssue[];
  deckSections: DeckSection[];
  agentDigest: DemoAgentDigest;
};
