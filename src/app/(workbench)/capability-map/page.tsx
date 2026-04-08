"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { CapabilityLayerCard } from "@/components/shared/capability-layer-card";
import { ScenarioStateGate } from "@/components/shared/scenario-state-gate";
import { capabilityLayerDisplayOrder } from "@/lib/constants";
import { capabilityLayerLabelMap } from "@/lib/label-maps";
import { cn } from "@/lib/utils";
import { getCapabilityMapQuery } from "@/lib/workbench-query";
import { getWorkbenchRepository } from "@/repositories";

export default function CapabilityMapPage() {
  const searchParams = useSearchParams();
  const query = getCapabilityMapQuery(searchParams);
  const repository = getWorkbenchRepository();
  const capabilityMap = repository.getCapabilityMap(query);
  const state = capabilityMap.scenario;

  const baseSortedLayers = capabilityLayerDisplayOrder
    .map((layer) => capabilityMap.data.find((item) => item.capability_layer === layer))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const sortedLayers = query.layer
    ? [
        ...baseSortedLayers.filter((item) => item.capability_layer === query.layer),
        ...baseSortedLayers.filter((item) => item.capability_layer !== query.layer)
      ]
    : baseSortedLayers;

  const description = query.layer
    ? `按六层能力结构查看阿里 AI 全景。当前聚焦：${capabilityLayerLabelMap[query.layer]}`
    : "按六层能力结构查看阿里 AI 全景。";

  return (
    <ScenarioStateGate scenario={state} emptyTitle="能力地图暂无条目" errorTitle="能力地图加载失败">
      <PageShell title="能力地图" description={description}>
        {query.layer ? <p className="text-xs text-muted-foreground">当前按能力层聚焦排序，聚焦层已高亮显示。</p> : null}

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3" data-focus-layer={query.layer ?? "all"} data-focused-layer-first={sortedLayers[0]?.capability_layer ?? "none"}>
          {sortedLayers.map((layer) => {
            const isFocused = query.layer === layer.capability_layer;

            return (
              <div
                key={layer.capability_layer}
                data-layer-focused={isFocused ? "true" : "false"}
                data-layer={layer.capability_layer}
                className={cn(isFocused ? "rounded-xl ring-2 ring-primary/50 ring-offset-2 ring-offset-background" : "")}
              >
                <CapabilityLayerCard layer={layer} />
              </div>
            );
          })}
        </div>
      </PageShell>
    </ScenarioStateGate>
  );
}