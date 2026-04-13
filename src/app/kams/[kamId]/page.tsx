import { KamDetailPageClient } from "@/features/kam-detail/components/kam-detail-page-client";
import { getCase2OutputBundle } from "@/lib/data/case2/get-output-bundle";

type KamDetailPageProps = {
  params: Promise<{
    kamId: string;
  }>;
};

export default async function KamDetailPage({ params }: KamDetailPageProps) {
  const { kamId } = await params;
  const baseOutput = getCase2OutputBundle();

  return <KamDetailPageClient baseOutput={baseOutput} kamId={kamId} />;
}
