import { RestaurantDetailPageClient } from "@/features/restaurant-detail/components/restaurant-detail-page-client";
import { getCase2OutputBundle } from "@/lib/data/case2/get-output-bundle";

type RestaurantDetailPageProps = {
  params: Promise<{
    restaurantId: string;
  }>;
};

export default async function RestaurantDetailPage({
  params,
}: RestaurantDetailPageProps) {
  const { restaurantId } = await params;
  const baseOutput = getCase2OutputBundle();

  return (
    <RestaurantDetailPageClient
      baseOutput={baseOutput}
      restaurantId={restaurantId}
    />
  );
}
