import type { Insight, NormalizedItem } from "@/types/contracts";
import type { UiState } from "@/types/view-models";

export interface DashboardMock {
  metrics: Array<{ label: string; value: string; trend: string; importance_level: "high" | "medium" | "low" }>;
  layer_distribution: Array<{ capability_layer: string; count: number }>;
  recent_highlights: NormalizedItem[];
  latest_insights: Insight[];
  experiment_suggestions: string[];
}

export const dashboardMock: UiState<DashboardMock> = {
  scenario: "ready",
  data: {
    metrics: [
      { label: "今日新增数", value: "18", trend: "+5", importance_level: "high" },
      { label: "本周新增数", value: "96", trend: "+14", importance_level: "high" },
      { label: "高重要度条目", value: "21", trend: "+3", importance_level: "medium" },
      { label: "待人工复核", value: "7", trend: "-2", importance_level: "low" }
    ],
    layer_distribution: [
      { capability_layer: "infrastructure", count: 8 },
      { capability_layer: "model", count: 17 },
      { capability_layer: "enhancement", count: 19 },
      { capability_layer: "orchestration", count: 14 },
      { capability_layer: "platform", count: 22 },
      { capability_layer: "product", count: 16 }
    ],
    recent_highlights: [
      {
        id: "norm_101",
        raw_item_id: "raw_101",
        title: "百炼工作流节点新增工具并发执行能力",
        summary: "编排执行效率提升，适合复杂 Agent 场景。",
        source_name: "阿里云官方博客",
        source_type: "blog",
        item_type: "update",
        topic_type: "workflow",
        capability_layer: "orchestration",
        published_at: "2026-04-07T09:20:00Z",
        importance_level: "high",
        requires_manual_review: false,
        evidence_refs: ["raw_101"]
      },
      {
        id: "norm_102",
        raw_item_id: "raw_102",
        title: "Qwen API 新增函数调用参数校验",
        summary: "平台层 API 稳定性增强，减少运行期参数错误。",
        source_name: "通义千问官方文档",
        source_type: "docs",
        item_type: "api_reference",
        topic_type: "api",
        capability_layer: "platform",
        published_at: "2026-04-07T07:30:00Z",
        importance_level: "high",
        requires_manual_review: false,
        evidence_refs: ["raw_102"]
      }
    ],
    latest_insights: [
      {
        id: "ins_301",
        title: "编排层能力正在向可复用任务链演进",
        content: "建议优先验证并发节点与工具调用异常恢复策略。",
        insight_type: "trend_judgment",
        capability_layer: "orchestration",
        confidence_score: 0.84,
        insight_status: "candidate",
        related_item_ids: ["norm_101"],
        is_human_edited: false,
        updated_at: "2026-04-07T10:20:00Z"
      }
    ],
    experiment_suggestions: [
      "验证工作流并发节点在 3 类真实任务中的稳定性",
      "对比结构化输出在链路监控中的可观测性收益"
    ]
  }
};
