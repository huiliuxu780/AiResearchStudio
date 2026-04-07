"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { ContextBackBar } from "@/components/shared/context-back-bar";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { ReportCard } from "@/components/shared/report-card";
import { SectionCard } from "@/components/shared/section-card";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { Button } from "@/components/ui/button";
import { getWorkbenchRepository } from "@/repositories";

export default function ReportsPage() {
  const searchParams = useSearchParams();
  const repository = getWorkbenchRepository();
  const reports = repository.getReports({
    state: (searchParams.get("state") as "ready" | "loading" | "empty" | "error" | null) ?? undefined,
    id: searchParams.get("id") ?? undefined
  });
  const state = reports.scenario;
  const selectedId = searchParams.get("id") ?? reports.data.selected_report_id;

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="\u6682\u65e0\u5468\u62a5" />;
  if (state === "error") return <ErrorState title="\u5468\u62a5\u52a0\u8f7d\u5931\u8d25" />;

  const selectedReport = reports.data.reports.find((item) => item.id === selectedId) ?? reports.data.reports[0];

  return (
    <PageShell
      title="\u7814\u7a76\u5468\u62a5"
      description="\u67e5\u770b\u81ea\u52a8\u751f\u6210\u5468\u62a5\uff08Phase 1 \u4e3a mock\uff09\u3002"
      actions={
        <>
          <Button size="sm" variant="secondary">
            Markdown \u5bfc\u51fa
          </Button>
          <Button size="sm" variant="outline">
            \u590d\u5236\u98de\u4e66\u7248\u672c
          </Button>
          <Button size="sm">\u4eba\u5de5\u7f16\u8f91\u4fdd\u5b58</Button>
        </>
      }
    >
      <ContextBackBar href="/" label="\u8fd4\u56de\u4eea\u8868\u76d8" contextText={`\u5f53\u524d\u5468\u62a5\uff1a${selectedReport.id}`} />

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-3">
          {reports.data.reports.map((report) => (
            <Link key={report.id} href={`/reports?id=${report.id}`} className="block">
              <div className={report.id === selectedReport.id ? "rounded-xl border border-primary/60" : "rounded-xl border border-transparent"}>
                <ReportCard report={report} />
              </div>
            </Link>
          ))}
        </div>

        <SectionCard title="\u5468\u62a5\u8be6\u60c5" description="Markdown \u5185\u5bb9\u9884\u89c8">
          <pre className="whitespace-pre-wrap rounded-md border border-border/60 bg-background/60 p-3 text-sm leading-6 text-foreground">
            {selectedReport.markdown_content}
          </pre>
        </SectionCard>
      </div>
    </PageShell>
  );
}

