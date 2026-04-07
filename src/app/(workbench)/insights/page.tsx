"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { EvidenceList } from "@/components/shared/evidence-list";
import { InsightCard } from "@/components/shared/insight-card";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { SectionCard } from "@/components/shared/section-card";
import { insightsMock } from "@/mock/insights.mock";

export default function InsightsPage() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state") ?? insightsMock.scenario;

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="暂无研究结论" />;
  if (state === "error") return <ErrorState title="研究结论加载失败" />;

  const selectedInsight = insightsMock.data.insights[0];

  return (
    <PageShell title="研究结论" description="查看结论、状态与证据链。">
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-3">
          {insightsMock.data.insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>

        <SectionCard title="结论详情与证据链" description="Phase 1 展示静态证据回溯结构。">
          <div className="space-y-3">
            <p className="text-sm font-medium">{selectedInsight.title}</p>
            <p className="text-sm text-muted-foreground">{selectedInsight.content}</p>
            <EvidenceList items={insightsMock.data.evidence_items[selectedInsight.id] ?? []} />
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}


