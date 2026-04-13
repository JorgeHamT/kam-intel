import type { DemoSnapshot } from "@/lib/demo";

export function createValidationViewModel(snapshot: DemoSnapshot) {
  return {
    criticalIssues: snapshot.validationIssues.filter((issue) => issue.severity === "critical")
      .length,
    openIssues: snapshot.validationIssues.filter((issue) => issue.status !== "Resuelta").length,
    validationIssues: snapshot.validationIssues,
  };
}
