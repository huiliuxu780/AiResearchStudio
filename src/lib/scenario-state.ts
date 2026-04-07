import type { ReadonlyURLSearchParams } from "next/navigation";

import type { ScenarioState } from "@/types/enums";

const scenarioStateSet = new Set<ScenarioState>(["ready", "loading", "empty", "error"]);

export function getScenarioState(searchParams: ReadonlyURLSearchParams): ScenarioState | undefined {
  const value = searchParams.get("state");
  if (!value) return undefined;

  return scenarioStateSet.has(value as ScenarioState) ? (value as ScenarioState) : undefined;
}
