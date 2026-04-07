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

function applyScenario<T extends { scenario: string }>(payload: T, query?: WorkbenchQuery): T {
  if (!query?.state) return payload;
  return { ...payload, scenario: query.state };
}

// Phase 2 placeholder: keep UI stable while API adapter contracts are introduced.
export const httpWorkbenchRepository: WorkbenchRepository = {
  getDashboard(query?: WorkbenchQuery): DashboardState {
    return applyScenario(dashboardMock, query);
  },
  getCapabilityMap(query?: WorkbenchQuery): CapabilityMapState {
    return applyScenario(capabilityMapMock, query);
  },
  getTimeline(query?: WorkbenchQuery): TimelineState {
    return applyScenario(timelineMock, query);
  },
  getInsights(query?: WorkbenchQuery): InsightsState {
    return applyScenario(insightsMock, query);
  },
  getReports(query?: WorkbenchQuery): ReportsState {
    return applyScenario(reportsMock, query);
  },
  getSettings(query?: WorkbenchQuery): SettingsState {
    return applyScenario(settingsMock, query);
  }
};
