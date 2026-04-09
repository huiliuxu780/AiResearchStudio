import type { CapabilityCatalog } from "@/types/contracts";
import type { UiState } from "@/types/view-models";

export interface CapabilityLayerSummary {
  capability_layer: CapabilityCatalog["capability_layer"];
  layer_description: string;
  recent_update_count: number;
  key_capabilities: CapabilityCatalog[];
}

export const capabilityMapMock: UiState<CapabilityLayerSummary[]> = {
  scenario: "ready",
  data: [
    {
      capability_layer: "infrastructure",
      layer_description: "云底座、数据接入、部署与安全合规基础能力。",
      recent_update_count: 8,
      key_capabilities: [
        {
          id: "cap_101",
          name: "企业网络安全接入模板",
          capability_layer: "infrastructure",
          subcategory: "security",
          official_url: "https://example.com/security-template",
          is_open_source: false,
          api_available: false,
          description: "提供标准化网络隔离与访问控制说明。",
          last_updated_at: "2026-04-05T03:00:00Z"
        }
      ]
    },
    {
      capability_layer: "model",
      layer_description: "文本、多模态、图像视频模型及版本演进。",
      recent_update_count: 17,
      key_capabilities: [
        {
          id: "cap_102",
          name: "Qwen 多模态系列",
          capability_layer: "model",
          subcategory: "multimodal",
          official_url: "https://example.com/qwen-mm",
          is_open_source: true,
          api_available: true,
          description: "覆盖图文理解与多模态问答。",
          last_updated_at: "2026-04-06T09:10:00Z"
        }
      ]
    },
    {
      capability_layer: "enhancement",
      layer_description: "RAG、插件、MCP、工具调用等模型增强能力。",
      recent_update_count: 19,
      key_capabilities: []
    },
    {
      capability_layer: "orchestration",
      layer_description: "Agent 与 Workflow 的编排、执行和复用。",
      recent_update_count: 14,
      key_capabilities: []
    },
    {
      capability_layer: "platform",
      layer_description: "控制台、API/SDK、调试发布与管理工具。",
      recent_update_count: 22,
      key_capabilities: []
    },
    {
      capability_layer: "product",
      layer_description: "场景化产品、行业案例、应用落地能力。",
      recent_update_count: 16,
      key_capabilities: []
    }
  ]
};
