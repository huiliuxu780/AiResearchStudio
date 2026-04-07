"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { CapabilityLayerCard } from "@/components/shared/capability-layer-card";
import { ScenarioStateGate } from "@/components/shared/scenario-state-gate";
import { capabilityLayerDisplayOrder } from "@/lib/constants";
import { getScenarioState } from "@/lib/scenario-state";
import { getWorkbenchRepository } from "@/repositories";

export default function CapabilityMapPage() {
  const searchParams = useSearchParams();
  const repository = getWorkbenchRepository();
  const capabilityMap = repository.getCapabilityMap({ state: getScenarioState(searchParams) });
  const state = capabilityMap.scenario;

  const sortedLayers = capabilityLayerDisplayOrder
    .map((layer) => capabilityMap.data.find((item) => item.capability_layer === layer))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <ScenarioStateGate scenario={state} emptyTitle="能力地图暂无条目" errorTitle="能力地图加载失败">
      <PageShell title="能力地图" description="按六层能力结构查看阿里 AI 全景。">
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {sortedLayers.map((layer) => (
            <CapabilityLayerCard key={layer.capability_layer} layer={layer} />
          ))}
        </div>
      </PageShell>
    </ScenarioStateGate>
  );
}
