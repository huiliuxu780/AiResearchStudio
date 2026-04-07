import type { NormalizedItem } from "@/types/contracts";
import type { UiState } from "@/types/view-models";

export interface TimelineMock {
  filters: {
    source_types: NormalizedItem["source_type"][];
    capability_layers: NormalizedItem["capability_layer"][];
    topic_types: NormalizedItem["topic_type"][];
    importance_levels: NormalizedItem["importance_level"][];
  };
  items: NormalizedItem[];
}

export const timelineMock: UiState<TimelineMock> = {
  scenario: "ready",
  data: {
    filters: {
      source_types: ["docs", "blog", "github", "media"],
      capability_layers: ["model", "enhancement", "orchestration", "platform"],
      topic_types: ["api", "workflow", "mcp", "open_source"],
      importance_levels: ["high", "medium", "low"]
    },
    items: [
      {
        id: "norm_201",
        raw_item_id: "raw_201",
        title: "MCP 插件接入文档补充鉴权段落",
        summary: "增强了插件集成的安全接入说明。",
        source_name: "通义千问官方文档",
        source_type: "docs",
        item_type: "documentation",
        topic_type: "mcp",
        capability_layer: "enhancement",
        published_at: "2026-04-07T06:30:00Z",
        importance_level: "medium",
        requires_manual_review: true,
        evidence_refs: ["raw_201"]
      },
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
    ]
  }
};
