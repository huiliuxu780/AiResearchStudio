import type { WeeklyReport } from "@/types/contracts";
import type { UiState } from "@/types/view-models";

export interface ReportMock {
  reports: WeeklyReport[];
  selected_report_id: string;
}

export const reportsMock: UiState<ReportMock> = {
  scenario: "ready",
  data: {
    selected_report_id: "rep_2026w14",
    reports: [
      {
        id: "rep_2026w14",
        week_start_date: "2026-03-30",
        week_end_date: "2026-04-05",
        title: "第 14 周阿里 AI 研究周报",
        markdown_content: "# 本周摘要\n\n- 平台层 API 更新活跃\n- 编排层案例增长明显\n\n## 建议实验\n\n1. 并发节点稳定性验证\n2. MCP 鉴权链路演练",
        highlights: ["平台层更新活跃", "编排层案例增长"],
        experiment_suggestions: ["并发节点稳定性验证", "MCP 鉴权链路演练"],
        updated_at: "2026-04-06T18:30:00Z"
      },
      {
        id: "rep_2026w13",
        week_start_date: "2026-03-23",
        week_end_date: "2026-03-29",
        title: "第 13 周阿里 AI 研究周报",
        markdown_content: "# 上周摘要\n\n- 多模态能力迭代\n- 文档体系更新",
        highlights: ["多模态迭代", "文档体系更新"],
        experiment_suggestions: ["多模态评测样本补充"],
        updated_at: "2026-03-30T09:00:00Z"
      }
    ]
  }
};
