import type { ReadonlyURLSearchParams } from "next/navigation";

import { getScenarioState } from "@/lib/scenario-state";
import type { WorkbenchQuery } from "@/repositories/workbench/types";
import { topicTypeValues } from "@/types/enums";

const topicTypeSet = new Set<string>(topicTypeValues);

function getValue(searchParams: ReadonlyURLSearchParams, key: string): string | undefined {
  const raw = searchParams.get(key);
  if (!raw) return undefined;

  const value = raw.trim();
  return value.length > 0 ? value : undefined;
}

function getTopicValue(searchParams: ReadonlyURLSearchParams): string | undefined {
  const value = getValue(searchParams, "topic");
  if (!value) return undefined;

  return topicTypeSet.has(value) ? value : undefined;
}

export function resolveSelectedId<T extends { id: string }>(items: T[], requestedId?: string, preferredId?: string): string | undefined {
  if (requestedId && items.some((item) => item.id === requestedId)) return requestedId;
  if (preferredId && items.some((item) => item.id === preferredId)) return preferredId;

  return items[0]?.id;
}

export function getStateQuery(searchParams: ReadonlyURLSearchParams): Pick<WorkbenchQuery, "state"> {
  return {
    state: getScenarioState(searchParams)
  };
}

export function getTimelineQuery(searchParams: ReadonlyURLSearchParams): Pick<WorkbenchQuery, "state" | "topic" | "item_id"> {
  return {
    ...getStateQuery(searchParams),
    topic: getTopicValue(searchParams),
    item_id: getValue(searchParams, "item_id")
  };
}

export function getDetailQuery(searchParams: ReadonlyURLSearchParams): Pick<WorkbenchQuery, "state" | "id"> {
  return {
    ...getStateQuery(searchParams),
    id: getValue(searchParams, "id")
  };
}
