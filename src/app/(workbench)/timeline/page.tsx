"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { ContextBackBar } from "@/components/shared/context-back-bar";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { TimelineItemCard } from "@/components/shared/timeline-item-card";
import { topicTypeLabelMap } from "@/lib/label-maps";
import { getWorkbenchRepository } from "@/repositories";

export default function TimelinePage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic");
  const itemId = searchParams.get("item_id");
  const repository = getWorkbenchRepository();
  const timeline = repository.getTimeline({
    state: (searchParams.get("state") as "ready" | "loading" | "empty" | "error" | null) ?? undefined,
    topic: topic ?? undefined,
    item_id: itemId ?? undefined
  });
  const state = timeline.scenario;

  const filteredItems = useMemo(() => {
    const byTopic = topic ? timeline.data.items.filter((item) => item.topic_type === topic) : timeline.data.items;
    if (!itemId) return byTopic;

    const selected = byTopic.find((item) => item.id === itemId);
    if (!selected) return byTopic;

    return [selected, ...byTopic.filter((item) => item.id !== itemId)];
  }, [timeline.data.items, topic, itemId]);

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="动态时间线暂无内容" />;
  if (state === "error") return <ErrorState title="动态时间线加载失败" />;

  const topicLabel = topic ? topicTypeLabelMap[topic as keyof typeof topicTypeLabelMap] ?? topic : null;

  return (
    <PageShell title="动态时间线" description="按时间查看事实动态，支持来源/层级/主题筛选。">
      <ContextBackBar
        href="/"
        label="返回仪表盘"
        contextText={topicLabel ? `上下文：${topicLabel}` : "上下文：全部主题"}
      />

      <FilterBar sourceTypes={timeline.data.filters.source_types} topicTypes={timeline.data.filters.topic_types} />

      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <EmptyState title="当前主题无匹配条目" />
        ) : (
          filteredItems.map((item) => <TimelineItemCard key={item.id} item={item} />)
        )}
      </div>
    </PageShell>
  );
}


