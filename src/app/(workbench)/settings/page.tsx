"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { SectionCard } from "@/components/shared/section-card";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { settingsMock } from "@/mock/settings.mock";
import { sourceTypeLabelMap } from "@/lib/label-maps";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state") ?? settingsMock.scenario;

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="配置面板暂无内容" />;
  if (state === "error") return <ErrorState title="配置面板加载失败" />;

  return (
    <PageShell title="配置" description="Phase 1 仅展示静态配置面板，不包含复杂规则编辑器。">
      <div className="grid gap-4 xl:grid-cols-2">
        <SectionCard title="信息源配置" description="静态展示已接入来源。">
          <div className="space-y-2 text-sm">
            {settingsMock.data.sources.map((source) => (
              <div key={source.id} className="rounded-md border border-border/60 bg-background/50 p-3">
                <p className="font-medium">{source.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">类型：{sourceTypeLabelMap[source.source_type]}</p>
                <p className="text-xs text-muted-foreground">地址：{source.url}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="规则与任务状态" description="仅静态占位。">
          <div className="space-y-2 text-sm">
            <div className="rounded-md border border-border/60 bg-background/50 p-3">更新频率：{settingsMock.data.refresh_frequency}</div>
            <div className="rounded-md border border-border/60 bg-background/50 p-3">分类规则版本：{settingsMock.data.classification_rule_version}</div>
            <div className="rounded-md border border-border/60 bg-background/50 p-3">重要度规则版本：{settingsMock.data.importance_rule_version}</div>
            <div className="rounded-md border border-border/60 bg-background/50 p-3">Prompt 配置：{settingsMock.data.prompt_profile}</div>
            {settingsMock.data.crawl_job_status.map((job) => (
              <div key={job.job_name} className="rounded-md border border-border/60 bg-background/50 p-3">
                <p className="font-medium">{job.job_name}</p>
                <p className="text-xs text-muted-foreground">状态：{job.status}</p>
                <p className="text-xs text-muted-foreground">最近运行：{job.last_run_at}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}

