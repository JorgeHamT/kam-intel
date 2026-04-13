import { AlertsPageClient } from "@/features/alerts/components/alerts-page-client";
import { getCase2OutputBundle } from "@/lib/data/case2/get-output-bundle";

export default function AlertsPage() {
  const baseOutput = getCase2OutputBundle();

  return <AlertsPageClient baseOutput={baseOutput} />;
}
