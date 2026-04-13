export type ScenarioId =
  | "base"
  | "crisis"
  | "discrepancias"
  | "estable"
  | "foco-kam";

export type HealthTone = "critical" | "warning" | "stable" | "info";

export type DemoRestaurantStatus = "Crítico" | "En riesgo" | "Monitoreo";

export type NavItem = {
  href: string;
  label: string;
};

export type Kpi = {
  id: string;
  label: string;
  value: string;
  delta: string;
  insight: string;
  tone: HealthTone;
};

export type KamPressureItem = {
  id: string;
  name: string;
  segment: string;
  pressureLabel: string;
  focus: string;
  nextStep: string;
};

export type AgentSignal = {
  id: string;
  title: string;
  detection: string;
  whyItMatters: string;
  recommendation: string;
  nextStep: string;
  tone: HealthTone;
};

export type AlertSummaryItem = {
  id: string;
  title: string;
  owner: string;
  status: string;
  eta: string;
  restaurantId?: string;
};

export type KamRecord = {
  id: string;
  name: string;
  portfolio: string;
  restaurantsAtRisk: number;
  openAlerts: number;
  narrative: string;
};

export type RestaurantRecord = {
  id: string;
  name: string;
  city: string;
  kamId: string;
  status: DemoRestaurantStatus;
  whyFlagged: string;
  recommendation: string;
};

export type DataValidationIssue = {
  id: string;
  rule: string;
  affectedField: string;
  severity: HealthTone;
  status: string;
  note: string;
};

export type DeckSection = {
  id: string;
  title: string;
  objective: string;
  status: string;
};

export type ScenarioOption = {
  id: ScenarioId;
  label: string;
  subtitle: string;
};
