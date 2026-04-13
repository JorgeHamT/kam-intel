import { DashboardPageClient } from "@/features/dashboard/components/dashboard-page-client";
import { getCase2OutputBundle } from "@/lib/data/case2/get-output-bundle";

export default function DashboardPage() {
  const baseOutput = getCase2OutputBundle();

  return <DashboardPageClient baseOutput={baseOutput} />;
}
