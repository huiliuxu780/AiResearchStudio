"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { ScenarioStateGate } from "@/components/shared/scenario-state-gate";
import { SectionCard } from "@/components/shared/section-card";
import { formatDateTime } from "@/lib/formatters";
import { sourceStatusLabelMap, sourceTypeLabelMap } from "@/lib/label-maps";
import { getStateQuery } from "@/lib/workbench-query";
import { getWorkbenchRepository } from "@/repositories";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const query = getStateQuery(searchParams);
  const repository = getWorkbenchRepository();
  const settings = repository.getSettings(query);
  const state = settings.scenario;

  return (
    <ScenarioStateGate scenario={state} emptyTitle="配置面板暂无内容" errorTitle="配置面板加载失败">
      <PageShell title="配置" description="Phase 1 仅展示静态配置面板，不包含复杂规则编辑器。">
        <div className="grid gap-4 xl:grid-cols-3">
          <SectionCard title="信息源配置" description="静态展示已接入来源。" className="xl:col-span-2">
            <div className="grid gap-2 text-sm md:grid-cols-2">
              {settings.data.sources.map((source) => (
                <div key={source.id} className="rounded-md border border-border/60 bg-background/50 p-3">
                  <p className="font-medium">{source.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">类型：{sourceTypeLabelMap[source.source_type]}</p>
                  <p className="text-xs text-muted-foreground">状态：{sourceStatusLabelMap[source.status]}</p>
                  <p className="text-xs text-muted-foreground">地址：{source.url}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="系统设定" description="静态参数快照。">
            <div className="space-y-2 text-sm">
              <div className="rounded-md border border-border/60 bg-background/50 p-3">更新频率：{settings.data.refresh_frequency}</div>
              <div className="rounded-md border border-border/60 bg-background/50 p-3">分类规则版本：{settings.data.classification_rule_version}</div>
              <div className="rounded-md border border-border/60 bg-background/50 p-3">重要度规则版本：{settings.data.importance_rule_version}</div>
              <div className="rounded-md border border-border/60 bg-background/50 p-3">Prompt 配置：{settings.data.prompt_profile}</div>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="抓取任务状态" description="Phase 1 仅展示静态任务运行结果。">
          <div className="grid gap-2 text-sm md:grid-cols-2">
            {settings.data.crawl_job_status.map((job) => (
              <div key={job.job_name} className="rounded-md border border-border/60 bg-background/50 p-3">
                <p className="font-medium">{job.job_name}</p>
                <p className="text-xs text-muted-foreground">状态：{job.status}</p>
                <p className="text-xs text-muted-foreground">最近运行：{formatDateTime(job.last_run_at)}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </PageShell>
    </ScenarioStateGate>
  );
}
