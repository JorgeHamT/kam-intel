import type { AlertFeedItem } from "@/lib/agent/contracts/agent-output";
import type { Case2OutputBundle } from "@/lib/data/case2/output";
import type { ScenarioProjectionMetadata } from "@/lib/demo/kpi-contract";
import type { ScenarioId, ScenarioOption } from "@/types/domain";

export type PresentationChannel = {
  id: "ops-email";
  kind: "email";
  label: string;
  destination: string;
  status: "Configurado";
  description: string;
  href: string;
};

export type PresentationAlertQueues = {
  active: AlertFeedItem[];
  activeKind: "global_comparable" | "focal_narrative";
  globalComparableAlerts: AlertFeedItem[];
  focalAlerts: AlertFeedItem[];
};

export type PresentationSnapshot = {
  scenario: ScenarioId;
  scenarioOption: ScenarioOption;
  bundle: Case2OutputBundle;
  semantics: ScenarioProjectionMetadata;
  alerts: PresentationAlertQueues;
  walkthrough: {
    entryRoute: string;
    fallbackRoute: string;
    primaryKamId?: string;
    primaryRestaurantId?: string;
    rankingSource: "canonical_comparable_v1" | "scenario_focal";
    selectionKind: "comparable" | "focal";
    selectionTrace: {
      source:
        | "canonical_comparable_v1"
        | "focal_kam_narrative_v1";
      reason: string;
      focalKamId?: string;
      focalRestaurantCount?: number;
    };
  };
  narrative: {
    title: string;
    description: string;
    nextStep: string;
  };
  channel: PresentationChannel;
};
