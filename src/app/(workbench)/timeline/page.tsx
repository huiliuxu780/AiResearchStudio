"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { FilterBar } from "@/components/shared/filter-bar";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { TimelineItemCard } from "@/components/shared/timeline-item-card";
import { topicTypeLabelMap } from "@/lib/label-maps";
import { timelineMock } from "@/mock/timeline.mock";

export default function TimelinePage() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state") ?? timelineMock.scenario;
  const topic = searchParams.get("topic");

  const filteredItems = useMemo(() => {
    if (!topic) return timelineMock.data.items;
    return timelineMock.data.items.filter((item) => item.topic_type === topic);
  }, [topic]);

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="\u52a8\u6001\u65f6\u95f4\u7ebf\u6682\u65e0\u5185\u5bb9" />;
  if (state === "error") return <ErrorState title="\u52a8\u6001\u65f6\u95f4\u7ebf\u52a0\u8f7d\u5931\u8d25" />;

  return (
    <PageShell title="\u52a8\u6001\u65f6\u95f4\u7ebf" description="\u6309\u65f6\u95f4\u67e5\u770b\u4e8b\u5b9e\u52a8\u6001\uff0c\u652f\u6301\u6765\u6e90/\u5c42\u7ea7/\u4e3b\u9898\u7b5b\u9009\u3002">
      <FilterBar sourceTypes={timelineMock.data.filters.source_types} topicTypes={timelineMock.data.filters.topic_types} />

      {topic ? (
        <p className="text-xs text-muted-foreground">
          \u5f53\u524d\u4e3b\u9898\u7b5b\u9009\uff1a{topicTypeLabelMap[topic as keyof typeof topicTypeLabelMap] ?? topic}
        </p>
      ) : null}

      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <EmptyState title="\u5f53\u524d\u4e3b\u9898\u65e0\u5339\u914d\u6761\u76ee" />
        ) : (
          filteredItems.map((item) => <TimelineItemCard key={item.id} item={item} />)
        )}
      </div>
    </PageShell>
  );
}
