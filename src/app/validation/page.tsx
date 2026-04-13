import { ValidationPageClient } from "@/features/validation/components/validation-page-client";
import { getCase2OutputBundle } from "@/lib/data/case2/get-output-bundle";

export default function ValidationPage() {
  const baseOutput = getCase2OutputBundle();

  return <ValidationPageClient baseOutput={baseOutput} />;
}
