import type { ImportanceLevel, ScenarioState } from "@/types/enums";

export interface UiState<T> {
  scenario: ScenarioState;
  data: T;
  error_message?: string;
}

export interface MetricViewModel {
  label: string;
  value: string;
  trend: string;
  importance: ImportanceLevel;
}
