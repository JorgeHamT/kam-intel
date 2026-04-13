import type { DemoSnapshot } from "@/lib/demo";

export function createDeckViewModel(snapshot: DemoSnapshot) {
  return {
    sections: snapshot.deckSections,
    scenario: snapshot.scenarioOption,
  };
}
