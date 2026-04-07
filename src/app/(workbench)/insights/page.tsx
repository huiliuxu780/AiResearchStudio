"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { ContextBackBar } from "@/components/shared/context-back-bar";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { EvidenceList } from "@/components/shared/evidence-list";
import { InsightCard } from "@/components/shared/insight-card";
import { SectionCard } from "@/components/shared/section-card";
import { SelectableCardLink } from "@/components/shared/selectable-card-link";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { getWorkbenchRepository } from "@/repositories";

export default function InsightsPage() {
  const searchParams = useSearchParams();
  const repository = getWorkbenchRepository();
  const insights = repository.getInsights({
    state: (searchParams.get("state") as "ready" | "loading" | "empty" | "error" | null) ?? undefined,
    id: searchParams.get("id") ?? undefined
  });
  const state = insights.scenario;
  const selectedId = searchParams.get("id") ?? insights.data.insights[0]?.id;

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="暂无研究结论" />;
  if (state === "error") return <ErrorState title="研究结论加载失败" />;

  const selectedInsight = insights.data.insights.find((item) => item.id === selectedId) ?? insights.data.insights[0];

  return (
    <PageShell title="研究结论" description="查看结论、状态与证据链。">
      <ContextBackBar href="/timeline" label="返回动态时间线" contextText={`当前结论：${selectedInsight.id}`} />

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-3">
          {insights.data.insights.map((insight) => (
            <SelectableCardLink key={insight.id} href={`/insights?id=${insight.id}`} selected={insight.id === selectedInsight.id}>
              <InsightCard insight={insight} />
            </SelectableCardLink>
          ))}
        </div>

        <SectionCard title="结论详情与证据链" description="Phase 1 展示静态证据回溯结构。">
          <div className="space-y-3">
            <p className="text-sm font-medium">{selectedInsight.title}</p>
            <p className="text-sm text-muted-foreground">{selectedInsight.content}</p>
            <EvidenceList items={insights.data.evidence_items[selectedInsight.id] ?? []} />
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
