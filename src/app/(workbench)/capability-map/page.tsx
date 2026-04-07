"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { CapabilityLayerCard } from "@/components/shared/capability-layer-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { capabilityLayerDisplayOrder } from "@/lib/constants";
import { getWorkbenchRepository } from "@/repositories";

export default function CapabilityMapPage() {
  const searchParams = useSearchParams();
  const repository = getWorkbenchRepository();
  const capabilityMap = repository.getCapabilityMap({
    state: (searchParams.get("state") as "ready" | "loading" | "empty" | "error" | null) ?? undefined
  });
  const state = capabilityMap.scenario;

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="\u80fd\u529b\u5730\u56fe\u6682\u65e0\u6761\u76ee" />;
  if (state === "error") return <ErrorState title="\u80fd\u529b\u5730\u56fe\u52a0\u8f7d\u5931\u8d25" />;

  const sortedLayers = capabilityLayerDisplayOrder
    .map((layer) => capabilityMap.data.find((item) => item.capability_layer === layer))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <PageShell title="\u80fd\u529b\u5730\u56fe" description="\u6309\u516d\u5c42\u80fd\u529b\u7ed3\u6784\u67e5\u770b\u963f\u91cc AI \u5168\u666f\u3002">
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {sortedLayers.map((layer) => (
          <CapabilityLayerCard key={layer.capability_layer} layer={layer} />
        ))}
      </div>
    </PageShell>
  );
}

