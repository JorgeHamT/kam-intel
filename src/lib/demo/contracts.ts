import type { Case2OutputBundle } from "@/lib/data/case2/output";
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

export type PresentationSnapshot = {
  scenario: ScenarioId;
  scenarioOption: ScenarioOption;
  bundle: Case2OutputBundle;
  walkthrough: {
    entryRoute: string;
    fallbackRoute: string;
    primaryKamId?: string;
    primaryRestaurantId?: string;
  };
  narrative: {
    title: string;
    description: string;
    nextStep: string;
  };
  channel: PresentationChannel;
};
