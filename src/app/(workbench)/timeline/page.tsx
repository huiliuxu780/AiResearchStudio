"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { TimelineItemCard } from "@/components/shared/timeline-item-card";
import { timelineMock } from "@/mock/timeline.mock";

export default function TimelinePage() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state") ?? timelineMock.scenario;

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="动态时间线暂无内容" />;
  if (state === "error") return <ErrorState title="动态时间线加载失败" />;

  return (
    <PageShell title="动态时间线" description="按时间查看事实动态，支持来源/层级/主题筛选。">
      <FilterBar sourceTypes={timelineMock.data.filters.source_types} topicTypes={timelineMock.data.filters.topic_types} />
      <div className="space-y-3">
        {timelineMock.data.items.map((item) => (
          <TimelineItemCard key={item.id} item={item} />
        ))}
      </div>
    </PageShell>
  );
}

