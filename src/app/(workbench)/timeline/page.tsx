"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { ContextBackBar } from "@/components/shared/context-back-bar";
import { EmptyState } from "@/components/shared/empty-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { ScenarioStateGate } from "@/components/shared/scenario-state-gate";
import { TimelineItemCard } from "@/components/shared/timeline-item-card";
import { sourceTypeLabelMap, topicTypeLabelMap } from "@/lib/label-maps";
import { getTimelineQuery, resolveSelectedId } from "@/lib/workbench-query";
import { getWorkbenchRepository } from "@/repositories";
import type { SourceType, TopicType } from "@/types/enums";

export default function TimelinePage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = getTimelineQuery(searchParams);
  const topic = query.topic;
  const itemId = query.item_id;
  const [source, setSource] = useState<SourceType | undefined>(undefined);
  const repository = getWorkbenchRepository();
  const timeline = repository.getTimeline(query);
  const state = timeline.scenario;

  const handleTopicChange = useCallback(
    (nextTopic?: TopicType) => {
      const next = new URLSearchParams(searchParams.toString());

      if (nextTopic) {
        next.set("topic", nextTopic);
      } else {
        next.delete("topic");
      }

      // Topic changed means previously focused item may not belong to new topic filter.
      next.delete("item_id");

      const queryString = next.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const handleResetFilters = useCallback(() => {
    setSource(undefined);

    const next = new URLSearchParams(searchParams.toString());
    next.delete("topic");
    next.delete("item_id");

    const queryString = next.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [pathname, router, searchParams, setSource]);

  const filteredItems = useMemo(() => {
    const bySource = source ? timeline.data.items.filter((item) => item.source_type === source) : timeline.data.items;
    const byTopic = topic ? bySource.filter((item) => item.topic_type === topic) : bySource;
    const selectedId = resolveSelectedId(byTopic, itemId);
    if (!selectedId) return byTopic;

    const selected = byTopic.find((item) => item.id === selectedId);
    if (!selected) return byTopic;

    return [selected, ...byTopic.filter((item) => item.id !== selectedId)];
  }, [timeline.data.items, source, topic, itemId]);

  const topicLabel = topic ? topicTypeLabelMap[topic as keyof typeof topicTypeLabelMap] ?? topic : null;
  const sourceLabel = source ? sourceTypeLabelMap[source] : null;
  const contextParts = [sourceLabel, topicLabel].filter(Boolean);

  return (
    <ScenarioStateGate scenario={state} emptyTitle="动态时间线暂无内容" errorTitle="动态时间线加载失败">
      <PageShell title="动态时间线" description="按时间查看事实动态，支持来源/层级/主题筛选。">
        <ContextBackBar
          href="/"
          label="返回仪表盘"
          contextText={contextParts.length > 0 ? `上下文：${contextParts.join(" / ")}` : "上下文：全部来源 / 全部主题"}
        />

        <FilterBar
          sourceTypes={timeline.data.filters.source_types}
          topicTypes={timeline.data.filters.topic_types}
          selectedSource={source}
          selectedTopic={topic}
          onSourceChange={setSource}
          onTopicChange={handleTopicChange}
          onReset={handleResetFilters}
        />

        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <EmptyState title="当前筛选条件无匹配条目" onReset={handleResetFilters} />
          ) : (
            filteredItems.map((item) => <TimelineItemCard key={item.id} item={item} />)
          )}
        </div>
      </PageShell>
    </ScenarioStateGate>
  );
}


