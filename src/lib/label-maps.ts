import type {
  CapabilityLayer,
  ImportanceLevel,
  InsightStatus,
  InsightType,
  ItemType,
  SourceType,
  TopicType
} from "@/types/enums";

export const capabilityLayerLabelMap: Record<CapabilityLayer, string> = {
  infrastructure: "基础资源层",
  model: "模型层",
  enhancement: "模型增强层",
  orchestration: "编排执行层",
  platform: "平台工具层",
  product: "产品与场景层"
};

export const sourceTypeLabelMap: Record<SourceType, string> = {
  docs: "官方文档",
  blog: "官方博客",
  github: "GitHub",
  media: "媒体发布",
  manual: "手动录入"
};

export const sourceStatusLabelMap: Record<"active" | "paused" | "error", string> = {
  active: "运行中",
  paused: "已暂停",
  error: "异常"
};

export const sourceEnabledLabelMap: Record<"enabled" | "disabled", string> = {
  enabled: "已启用",
  disabled: "未启用"
};

export const crawlStrategyLabelMap: Record<"rss" | "html" | "api", string> = {
  rss: "RSS 订阅",
  html: "页面解析",
  api: "API 拉取"
};

export const topicTypeLabelMap: Record<TopicType, string> = {
  text_model: "文本模型",
  multimodal: "多模态",
  image_video: "图像/视频",
  agent: "Agent",
  workflow: "Workflow",
  rag: "RAG",
  plugin: "插件",
  mcp: "MCP",
  coding: "Coding",
  api: "API",
  open_source: "开源生态",
  case_study: "案例实践",
  pricing: "定价",
  security: "安全",
  deployment: "部署"
};

export const itemTypeLabelMap: Record<ItemType, string> = {
  release: "发布",
  update: "更新",
  documentation: "文档",
  api_reference: "API 参考",
  repository_change: "仓库变更",
  case_study: "案例",
  opinion: "观点",
  comparison: "对比"
};

export const importanceLevelLabelMap: Record<ImportanceLevel, string> = {
  high: "高",
  medium: "中",
  low: "低"
};

export const insightTypeLabelMap: Record<InsightType, string> = {
  trend_judgment: "趋势判断",
  opportunity: "机会识别",
  risk_alert: "风险提示",
  action_suggestion: "行动建议"
};

export const insightStatusLabelMap: Record<InsightStatus, string> = {
  candidate: "候选",
  confirmed: "已确认",
  archived: "已归档"
};
