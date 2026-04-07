"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { ContextBackBar } from "@/components/shared/context-back-bar";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { ReportCard } from "@/components/shared/report-card";
import { SectionCard } from "@/components/shared/section-card";
import { SelectableCardLink } from "@/components/shared/selectable-card-link";
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
  if (state === "empty") return <EmptyState title="暂无周报" />;
  if (state === "error") return <ErrorState title="周报加载失败" />;

  const selectedReport = reports.data.reports.find((item) => item.id === selectedId) ?? reports.data.reports[0];

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
      <ContextBackBar href="/" label="返回仪表盘" contextText={`当前周报：${selectedReport.id}`} />

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-3">
          {reports.data.reports.map((report) => (
            <SelectableCardLink key={report.id} href={`/reports?id=${report.id}`} selected={report.id === selectedReport.id}>
              <ReportCard report={report} />
            </SelectableCardLink>
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
