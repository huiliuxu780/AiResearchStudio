"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { ContextBackBar } from "@/components/shared/context-back-bar";
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
  const selectedId = searchParams.get("id") ?? insightsMock.data.insights[0]?.id;

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="\u6682\u65e0\u7814\u7a76\u7ed3\u8bba" />;
  if (state === "error") return <ErrorState title="\u7814\u7a76\u7ed3\u8bba\u52a0\u8f7d\u5931\u8d25" />;

  const selectedInsight = insightsMock.data.insights.find((item) => item.id === selectedId) ?? insightsMock.data.insights[0];

  return (
    <PageShell title="\u7814\u7a76\u7ed3\u8bba" description="\u67e5\u770b\u7ed3\u8bba\u3001\u72b6\u6001\u4e0e\u8bc1\u636e\u94fe\u3002">
      <ContextBackBar href="/timeline" label="\u8fd4\u56de\u52a8\u6001\u65f6\u95f4\u7ebf" contextText={`\u5f53\u524d\u7ed3\u8bba\uff1a${selectedInsight.id}`} />

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-3">
          {insightsMock.data.insights.map((insight) => (
            <Link key={insight.id} href={`/insights?id=${insight.id}`} className="block">
              <div className={insight.id === selectedInsight.id ? "rounded-xl border border-primary/60" : "rounded-xl border border-transparent"}>
                <InsightCard insight={insight} />
              </div>
            </Link>
          ))}
        </div>

        <SectionCard title="\u7ed3\u8bba\u8be6\u60c5\u4e0e\u8bc1\u636e\u94fe" description="Phase 1 \u5c55\u793a\u9759\u6001\u8bc1\u636e\u56de\u6eaf\u7ed3\u6784\u3002">
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
