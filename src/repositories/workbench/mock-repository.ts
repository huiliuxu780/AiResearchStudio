import { capabilityMapMock } from "@/mock/capability.mock";
import { dashboardMock } from "@/mock/dashboard.mock";
import { insightsMock } from "@/mock/insights.mock";
import { reportsMock } from "@/mock/reports.mock";
import { settingsMock } from "@/mock/settings.mock";
import { timelineMock } from "@/mock/timeline.mock";
import type { WorkbenchRepository } from "@/repositories/workbench/repository";
import type {
  CapabilityMapState,
  DashboardState,
  InsightsState,
  ReportsState,
  SettingsState,
  TimelineState,
  WorkbenchQuery
} from "@/repositories/workbench/types";

function withScenario<T extends { scenario: string }>(payload: T, query?: WorkbenchQuery): T {
  if (!query?.state) return payload;
  return { ...payload, scenario: query.state };
}

export const mockWorkbenchRepository: WorkbenchRepository = {
  getDashboard(query?: WorkbenchQuery): DashboardState {
    return withScenario(dashboardMock, query);
  },
  getCapabilityMap(query?: WorkbenchQuery): CapabilityMapState {
    return withScenario(capabilityMapMock, query);
  },
  getTimeline(query?: WorkbenchQuery): TimelineState {
    return withScenario(timelineMock, query);
  },
  getInsights(query?: WorkbenchQuery): InsightsState {
    return withScenario(insightsMock, query);
  },
  getReports(query?: WorkbenchQuery): ReportsState {
    return withScenario(reportsMock, query);
  },
  getSettings(query?: WorkbenchQuery): SettingsState {
    return withScenario(settingsMock, query);
  }
};
