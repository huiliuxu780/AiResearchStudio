import type { Insight, NormalizedItem } from "@/types/contracts";
import type { UiState } from "@/types/view-models";

export interface InsightMock {
  insights: Insight[];
  evidence_items: Record<string, NormalizedItem[]>;
}

export const insightsMock: UiState<InsightMock> = {
  scenario: "ready",
  data: {
    insights: [
      {
        id: "ins_401",
        title: "平台层 API 正在强化标准化输出能力",
        content: "建议优先验证 schema 约束下的链路兼容性。",
        insight_type: "action_suggestion",
        capability_layer: "platform",
        confidence_score: 0.88,
        insight_status: "confirmed",
        related_item_ids: ["norm_202"],
        is_human_edited: true,
        updated_at: "2026-04-07T04:20:00Z"
      },
      {
        id: "ins_402",
        title: "MCP 生态文档持续完善，但接入细节仍需人工验证",
        content: "建议在安全边界和权限策略上补充内部规范。",
        insight_type: "risk_alert",
        capability_layer: "enhancement",
        confidence_score: 0.73,
        insight_status: "candidate",
        related_item_ids: ["norm_201"],
        is_human_edited: false,
        updated_at: "2026-04-07T03:00:00Z"
      }
    ],
    evidence_items: {
      ins_401: [
        {
          id: "norm_202",
          raw_item_id: "raw_202",
          title: "官方仓库新增工作流示例模板",
          summary: "新增多任务编排模板，降低上手成本。",
          source_name: "Qwen GitHub",
          source_type: "github",
          item_type: "repository_change",
          topic_type: "workflow",
          capability_layer: "orchestration",
          published_at: "2026-04-07T05:10:00Z",
          importance_level: "high",
          requires_manual_review: false,
          evidence_refs: ["raw_202"]
        }
      ],
      ins_402: [
        {
          id: "norm_201",
          raw_item_id: "raw_201",
          title: "MCP 插件接入文档补充鉴权章节",
          summary: "增强插件集成的安全接入说明，减少接入误配风险。",
          source_name: "通义千问官方文档",
          source_type: "docs",
          item_type: "documentation",
          topic_type: "mcp",
          capability_layer: "enhancement",
          published_at: "2026-04-07T06:30:00Z",
          importance_level: "medium",
          requires_manual_review: true,
          evidence_refs: ["raw_201"]
        }
      ]
    }
  }
};
