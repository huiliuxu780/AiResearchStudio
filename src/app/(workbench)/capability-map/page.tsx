"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { CapabilityLayerCard } from "@/components/shared/capability-layer-card";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { capabilityMapMock } from "@/mock/capability.mock";
import { capabilityLayerDisplayOrder } from "@/lib/constants";

export default function CapabilityMapPage() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state") ?? capabilityMapMock.scenario;

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="能力地图暂无条目" />;
  if (state === "error") return <ErrorState title="能力地图加载失败" />;

  const sortedLayers = capabilityLayerDisplayOrder
    .map((layer) => capabilityMapMock.data.find((item) => item.capability_layer === layer))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <PageShell title="能力地图" description="按六层能力结构查看阿里 AI 全景。">
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {sortedLayers.map((layer) => (
          <CapabilityLayerCard key={layer.capability_layer} layer={layer} />
        ))}
      </div>
    </PageShell>
  );
}

