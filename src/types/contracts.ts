import type {
  CapabilityLayer,
  ImportanceLevel,
  InsightStatus,
  InsightType,
  ItemType,
  SourceType,
  TopicType
} from "@/types/enums";

export interface Source {
  id: string;
  name: string;
  source_type: SourceType;
  url: string;
  enabled: boolean;
  crawl_strategy: string;
  last_crawled_at: string;
  status: "active" | "paused" | "error";
}

export interface RawItem {
  id: string;
  source_id: string;
  title: string;
  url: string;
  published_at: string;
  crawled_at: string;
  raw_content: string;
  content_hash: string;
  status: "pending" | "processed" | "discarded";
}

export interface NormalizedItem {
  id: string;
  raw_item_id: string;
  title: string;
  summary: string;
  source_name: string;
  source_type: SourceType;
  item_type: ItemType;
  topic_type: TopicType;
  capability_layer: CapabilityLayer;
  published_at: string;
  importance_level: ImportanceLevel;
  requires_manual_review: boolean;
  evidence_refs: string[];
}

export interface Insight {
  id: string;
  title: string;
  content: string;
  insight_type: InsightType;
  capability_layer: CapabilityLayer;
  confidence_score: number;
  insight_status: InsightStatus;
  related_item_ids: string[];
  is_human_edited: boolean;
  updated_at: string;
}

export interface WeeklyReport {
  id: string;
  week_start_date: string;
  week_end_date: string;
  title: string;
  markdown_content: string;
  highlights: string[];
  experiment_suggestions: string[];
  updated_at: string;
}

export interface CapabilityCatalog {
  id: string;
  name: string;
  capability_layer: CapabilityLayer;
  subcategory: TopicType;
  official_url: string;
  is_open_source: boolean;
  api_available: boolean;
  description: string;
  last_updated_at: string;
}
