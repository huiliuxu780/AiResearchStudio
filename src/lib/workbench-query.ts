import type { ReadonlyURLSearchParams } from "next/navigation";

import { getScenarioState } from "@/lib/scenario-state";
import type { WorkbenchQuery } from "@/repositories/workbench/types";

function getValue(searchParams: ReadonlyURLSearchParams, key: string): string | undefined {
  const raw = searchParams.get(key);
  if (!raw) return undefined;

  const value = raw.trim();
  return value.length > 0 ? value : undefined;
}

export function getStateQuery(searchParams: ReadonlyURLSearchParams): Pick<WorkbenchQuery, "state"> {
  return {
    state: getScenarioState(searchParams)
  };
}

export function getTimelineQuery(searchParams: ReadonlyURLSearchParams): Pick<WorkbenchQuery, "state" | "topic" | "item_id"> {
  return {
    ...getStateQuery(searchParams),
    topic: getValue(searchParams, "topic"),
    item_id: getValue(searchParams, "item_id")
  };
}

export function getDetailQuery(searchParams: ReadonlyURLSearchParams): Pick<WorkbenchQuery, "state" | "id"> {
  return {
    ...getStateQuery(searchParams),
    id: getValue(searchParams, "id")
  };
}
