export const capabilityLayerValues = [
  "infrastructure",
  "model",
  "enhancement",
  "orchestration",
  "platform",
  "product"
] as const;

export const sourceTypeValues = ["docs", "blog", "github", "media", "manual"] as const;

export const topicTypeValues = [
  "text_model",
  "multimodal",
  "image_video",
  "agent",
  "workflow",
  "rag",
  "plugin",
  "mcp",
  "coding",
  "api",
  "open_source",
  "case_study",
  "pricing",
  "security",
  "deployment"
] as const;

export const itemTypeValues = [
  "release",
  "update",
  "documentation",
  "api_reference",
  "repository_change",
  "case_study",
  "opinion",
  "comparison"
] as const;

export const importanceLevelValues = ["high", "medium", "low"] as const;

export const insightTypeValues = [
  "trend_judgment",
  "opportunity",
  "risk_alert",
  "action_suggestion"
] as const;

export const insightStatusValues = ["candidate", "confirmed", "archived"] as const;

export type CapabilityLayer = (typeof capabilityLayerValues)[number];
export type SourceType = (typeof sourceTypeValues)[number];
export type TopicType = (typeof topicTypeValues)[number];
export type ItemType = (typeof itemTypeValues)[number];
export type ImportanceLevel = (typeof importanceLevelValues)[number];
export type InsightType = (typeof insightTypeValues)[number];
export type InsightStatus = (typeof insightStatusValues)[number];

export type ScenarioState = "ready" | "loading" | "empty" | "error";
