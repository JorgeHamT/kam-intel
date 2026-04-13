import { KamsPageClient } from "@/features/kams/components/kams-page-client";
import { getCase2OutputBundle } from "@/lib/data/case2/get-output-bundle";

export default function KamsPage() {
  const baseOutput = getCase2OutputBundle();

  return <KamsPageClient baseOutput={baseOutput} />;
}
