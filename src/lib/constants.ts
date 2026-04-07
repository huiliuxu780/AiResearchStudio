import type { CapabilityLayer, ImportanceLevel, InsightStatus } from "@/types/enums";

export const capabilityLayerDisplayOrder: CapabilityLayer[] = [
  "infrastructure",
  "model",
  "enhancement",
  "orchestration",
  "platform",
  "product"
];

export const importanceLevelDisplayOrder: ImportanceLevel[] = ["high", "medium", "low"];

export const insightStatusDisplayOrder: InsightStatus[] = ["candidate", "confirmed", "archived"];
