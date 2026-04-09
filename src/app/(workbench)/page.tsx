"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { InsightCard } from "@/components/shared/insight-card";
import { ScenarioStateGate } from "@/components/shared/scenario-state-gate";
import { SectionCard } from "@/components/shared/section-card";
import { StatCard } from "@/components/shared/stat-card";
import { capabilityLayerDisplayOrder } from "@/lib/constants";
import { capabilityLayerLabelMap } from "@/lib/label-maps";
import { getStateQuery } from "@/lib/workbench-query";
import { getCapabilityMapHref, getInsightsHref, getTimelineHref } from "@/lib/workbench-routes";
import { getWorkbenchRepository } from "@/repositories";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const query = getStateQuery(searchParams);
  const repository = getWorkbenchRepository();
  const dashboard = repository.getDashboard(query);
  const state = dashboard.scenario;

  return (
    <ScenarioStateGate scenario={state} emptyTitle="仪表盘暂无数据" errorTitle="仪表盘加载失败">
      <PageShell title="仪表盘" description="快速查看研究全局状态与本周重点。">
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {dashboard.data.metrics.map((metric) => (
            <StatCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          <SectionCard title="六层分布概览" description="按能力分层观察本周信息密度。">
            <div className="space-y-2">
              {capabilityLayerDisplayOrder.map((layer) => {
                const item = dashboard.data.layer_distribution.find((entry) => entry.capability_layer === layer);
                return (
                  <Link
                    key={layer}
                    href={getCapabilityMapHref({ layer })}
                    className="group flex items-center justify-between rounded-md border border-border/50 px-3 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-accent/40"
                  >
                    <span className="transition-colors group-hover:text-foreground">{capabilityLayerLabelMap[layer]}</span>
                    <span className="font-medium text-primary">{item?.count ?? 0}</span>
                  </Link>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="近期重点动态" description="高价值事实卡片。">
            <div className="space-y-3">
              {dashboard.data.recent_highlights.map((item) => (
                <Link
                  key={item.id}
                  href={getTimelineHref({ item_id: item.id, topic: item.topic_type })}
                  className="group block rounded-md border border-border/60 bg-background/50 p-3 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-accent/30"
                >
                  <p className="text-sm font-medium transition-colors group-hover:text-foreground">{item.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.summary}</p>
                </Link>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="最新研究结论" description="最近更新的研究判断。">
            <div className="space-y-3">
              {dashboard.data.latest_insights.map((insight) => (
                <Link
                  key={insight.id}
                  href={getInsightsHref({ id: insight.id })}
                  className="block rounded-xl border border-transparent transition-all hover:-translate-y-0.5 hover:border-primary/60"
                >
                  <InsightCard insight={insight} />
                </Link>
              ))}
            </div>
          </SectionCard>
        </section>

        <SectionCard title="本周建议实验" description="用于推进 PoC 与选型验证。">
          <ul className="space-y-2 text-sm">
            {dashboard.data.experiment_suggestions.map((item) => (
              <li key={item} className="rounded-md border border-border/50 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="状态演示" description="通过 URL 参数切换，state=loading|empty|error">
          <p className="text-sm text-muted-foreground">当前状态：{state}。示例：/timeline?state=empty</p>
        </SectionCard>
      </PageShell>
    </ScenarioStateGate>
  );
}
