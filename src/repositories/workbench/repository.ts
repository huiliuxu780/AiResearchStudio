import type {
  CapabilityMapState,
  DashboardState,
  InsightsState,
  ReportsState,
  SettingsState,
  TimelineState,
  WorkbenchQuery
} from "@/repositories/workbench/types";

export interface WorkbenchRepository {
  getDashboard(query?: WorkbenchQuery): DashboardState;
  getCapabilityMap(query?: WorkbenchQuery): CapabilityMapState;
  getTimeline(query?: WorkbenchQuery): TimelineState;
  getInsights(query?: WorkbenchQuery): InsightsState;
  getReports(query?: WorkbenchQuery): ReportsState;
  getSettings(query?: WorkbenchQuery): SettingsState;
}
