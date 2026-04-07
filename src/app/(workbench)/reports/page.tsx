"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { ReportCard } from "@/components/shared/report-card";
import { SectionCard } from "@/components/shared/section-card";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { Button } from "@/components/ui/button";
import { reportsMock } from "@/mock/reports.mock";

export default function ReportsPage() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state") ?? reportsMock.scenario;

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="暂无周报" />;
  if (state === "error") return <ErrorState title="周报加载失败" />;

  const selectedReport = reportsMock.data.reports.find((item) => item.id === reportsMock.data.selected_report_id) ?? reportsMock.data.reports[0];

  return (
    <PageShell
      title="研究周报"
      description="查看自动生成周报（Phase 1 为 mock）。"
      actions={
        <>
          <Button size="sm" variant="secondary">
            Markdown 导出
          </Button>
          <Button size="sm" variant="outline">
            复制飞书版本
          </Button>
          <Button size="sm">人工编辑保存</Button>
        </>
      }
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-3">
          {reportsMock.data.reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>

        <SectionCard title="周报详情" description="Markdown 内容预览">
          <pre className="whitespace-pre-wrap rounded-md border border-border/60 bg-background/60 p-3 text-sm leading-6 text-foreground">
            {selectedReport.markdown_content}
          </pre>
        </SectionCard>
      </div>
    </PageShell>
  );
}


