"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { SectionCard } from "@/components/shared/section-card";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { sourceTypeLabelMap } from "@/lib/label-maps";
import { getWorkbenchRepository } from "@/repositories";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const repository = getWorkbenchRepository();
  const settings = repository.getSettings({
    state: (searchParams.get("state") as "ready" | "loading" | "empty" | "error" | null) ?? undefined
  });
  const state = settings.scenario;

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="\u914d\u7f6e\u9762\u677f\u6682\u65e0\u5185\u5bb9" />;
  if (state === "error") return <ErrorState title="\u914d\u7f6e\u9762\u677f\u52a0\u8f7d\u5931\u8d25" />;

  return (
    <PageShell
      title="\u914d\u7f6e"
      description="Phase 1 \u4ec5\u5c55\u793a\u9759\u6001\u914d\u7f6e\u9762\u677f\uff0c\u4e0d\u5305\u542b\u590d\u6742\u89c4\u5219\u7f16\u8f91\u5668\u3002"
    >
      <div className="grid gap-4 xl:grid-cols-3">
        <SectionCard title="\u4fe1\u606f\u6e90\u914d\u7f6e" description="\u9759\u6001\u5c55\u793a\u5df2\u63a5\u5165\u6765\u6e90\u3002" className="xl:col-span-2">
          <div className="grid gap-2 text-sm md:grid-cols-2">
            {settings.data.sources.map((source) => (
              <div key={source.id} className="rounded-md border border-border/60 bg-background/50 p-3">
                <p className="font-medium">{source.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">\u7c7b\u578b\uff1a{sourceTypeLabelMap[source.source_type]}</p>
                <p className="text-xs text-muted-foreground">\u5730\u5740\uff1a{source.url}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="\u7cfb\u7edf\u8bbe\u5b9a" description="\u9759\u6001\u53c2\u6570\u5feb\u7167\u3002">
          <div className="space-y-2 text-sm">
            <div className="rounded-md border border-border/60 bg-background/50 p-3">\u66f4\u65b0\u9891\u7387\uff1a{settings.data.refresh_frequency}</div>
            <div className="rounded-md border border-border/60 bg-background/50 p-3">\u5206\u7c7b\u89c4\u5219\u7248\u672c\uff1a{settings.data.classification_rule_version}</div>
            <div className="rounded-md border border-border/60 bg-background/50 p-3">\u91cd\u8981\u5ea6\u89c4\u5219\u7248\u672c\uff1a{settings.data.importance_rule_version}</div>
            <div className="rounded-md border border-border/60 bg-background/50 p-3">Prompt \u914d\u7f6e\uff1a{settings.data.prompt_profile}</div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="\u6293\u53d6\u4efb\u52a1\u72b6\u6001" description="Phase 1 \u4ec5\u5c55\u793a\u9759\u6001\u4efb\u52a1\u8fd0\u884c\u7ed3\u679c\u3002">
        <div className="grid gap-2 text-sm md:grid-cols-2">
          {settings.data.crawl_job_status.map((job) => (
            <div key={job.job_name} className="rounded-md border border-border/60 bg-background/50 p-3">
              <p className="font-medium">{job.job_name}</p>
              <p className="text-xs text-muted-foreground">\u72b6\u6001\uff1a{job.status}</p>
              <p className="text-xs text-muted-foreground">\u6700\u8fd1\u8fd0\u884c\uff1a{job.last_run_at}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </PageShell>
  );
}

