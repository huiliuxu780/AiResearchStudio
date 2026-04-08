"use client";

import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { ContextBackBar } from "@/components/shared/context-back-bar";
import { ReportCard } from "@/components/shared/report-card";
import { ScenarioStateGate } from "@/components/shared/scenario-state-gate";
import { SectionCard } from "@/components/shared/section-card";
import { SelectableCardLink } from "@/components/shared/selectable-card-link";
import { Button } from "@/components/ui/button";
import { getDetailQuery } from "@/lib/workbench-query";
import { getWorkbenchRepository } from "@/repositories";

export default function ReportsPage() {
  const searchParams = useSearchParams();
  const query = getDetailQuery(searchParams);
  const repository = getWorkbenchRepository();
  const reports = repository.getReports(query);
  const state = reports.scenario;
  const selectedId = query.id ?? reports.data.selected_report_id;

  const selectedReport = reports.data.reports.find((item) => item.id === selectedId) ?? reports.data.reports[0];

  return (
    <ScenarioStateGate scenario={state} emptyTitle="暂无周报" errorTitle="周报加载失败">
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
    </ScenarioStateGate>
  );
}

