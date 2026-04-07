"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { InsightCard } from "@/components/shared/insight-card";
import { SectionCard } from "@/components/shared/section-card";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { StatCard } from "@/components/shared/stat-card";
import { dashboardMock } from "@/mock/dashboard.mock";
import { capabilityLayerDisplayOrder } from "@/lib/constants";
import { capabilityLayerLabelMap } from "@/lib/label-maps";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state") ?? dashboardMock.scenario;

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="仪表盘暂无数据" />;
  if (state === "error") return <ErrorState title="仪表盘加载失败" />;

  return (
    <PageShell title="仪表盘" description="快速查看研究全局状态与本周重点。">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMock.data.metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <SectionCard title="六层分布概览" description="按能力分层观察本周信息密度。">
          <div className="space-y-2">
            {capabilityLayerDisplayOrder.map((layer) => {
              const item = dashboardMock.data.layer_distribution.find((entry) => entry.capability_layer === layer);
              return (
                <div key={layer} className="flex items-center justify-between rounded-md border border-border/50 px-3 py-2 text-sm">
                  <span>{capabilityLayerLabelMap[layer]}</span>
                  <span className="font-medium text-primary">{item?.count ?? 0}</span>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="近期重点动态" description="高价值事实卡片。">
          <div className="space-y-3">
            {dashboardMock.data.recent_highlights.map((item) => (
              <div key={item.id} className="rounded-md border border-border/60 bg-background/50 p-3">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.summary}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="最新研究结论" description="最近更新的研究判断。">
          <div className="space-y-3">
            {dashboardMock.data.latest_insights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard title="本周建议实验" description="用于推进 PoC 与选型验证。">
        <ul className="space-y-2 text-sm">
          {dashboardMock.data.experiment_suggestions.map((item) => (
            <li key={item} className="rounded-md border border-border/50 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="状态演示" description="通过 URL 参数切换：?state=loading|empty|error">
        <p className="text-sm text-muted-foreground">当前状态：{state}。示例：/timeline?state=empty</p>
      </SectionCard>
    </PageShell>
  );
}


