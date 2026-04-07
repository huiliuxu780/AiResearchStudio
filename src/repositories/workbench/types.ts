import type { CapabilityLayerSummary } from "@/mock/capability.mock";
import type { DashboardMock } from "@/mock/dashboard.mock";
import type { InsightMock } from "@/mock/insights.mock";
import type { ReportMock } from "@/mock/reports.mock";
import type { SettingsMock } from "@/mock/settings.mock";
import type { TimelineMock } from "@/mock/timeline.mock";
import type { ScenarioState, TopicType } from "@/types/enums";
import type { UiState } from "@/types/view-models";

export interface WorkbenchQuery {
  state?: ScenarioState;
  topic?: TopicType | string;
  item_id?: string;
  id?: string;
  layer?: string;
}

export type DashboardState = UiState<DashboardMock>;
export type CapabilityMapState = UiState<CapabilityLayerSummary[]>;
export type TimelineState = UiState<TimelineMock>;
export type InsightsState = UiState<InsightMock>;
export type ReportsState = UiState<ReportMock>;
export type SettingsState = UiState<SettingsMock>;
