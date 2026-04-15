import { RestaurantsPageClient } from "@/features/restaurants/components/restaurants-page-client";
import { getCase2OutputBundle } from "@/lib/data/case2/get-output-bundle";

export default function RestaurantsPage() {
  const baseOutput = getCase2OutputBundle();

  return <RestaurantsPageClient baseOutput={baseOutput} />;
}
