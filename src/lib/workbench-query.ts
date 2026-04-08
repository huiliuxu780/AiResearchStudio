import type { ReadonlyURLSearchParams } from "next/navigation";

import { getScenarioState } from "@/lib/scenario-state";
import type { WorkbenchQuery } from "@/repositories/workbench/types";
import { topicTypeValues } from "@/types/enums";
import type { TopicType } from "@/types/enums";

const topicTypeSet = new Set<string>(topicTypeValues);

type StateQuery = Pick<WorkbenchQuery, "state">;
type TimelineQuery = StateQuery & { topic?: TopicType; item_id?: string };
type DetailQuery = StateQuery & { id?: string };

function getValue(searchParams: ReadonlyURLSearchParams, key: string): string | undefined {
  const raw = searchParams.get(key);
  if (!raw) return undefined;

  const value = raw.trim();
  return value.length > 0 ? value : undefined;
}

function getTopicValue(searchParams: ReadonlyURLSearchParams): TopicType | undefined {
  const value = getValue(searchParams, "topic");
  if (!value) return undefined;

  return topicTypeSet.has(value) ? (value as TopicType) : undefined;
}

export function resolveSelectedId<T extends { id: string }>(items: T[], requestedId?: string, preferredId?: string): string | undefined {
  if (requestedId && items.some((item) => item.id === requestedId)) return requestedId;
  if (preferredId && items.some((item) => item.id === preferredId)) return preferredId;

  return items[0]?.id;
}

export function getStateQuery(searchParams: ReadonlyURLSearchParams): StateQuery {
  return {
    state: getScenarioState(searchParams)
  };
}

export function getTimelineQuery(searchParams: ReadonlyURLSearchParams): TimelineQuery {
  return {
    ...getStateQuery(searchParams),
    topic: getTopicValue(searchParams),
    item_id: getValue(searchParams, "item_id")
  };
}

export function getDetailQuery(searchParams: ReadonlyURLSearchParams): DetailQuery {
  return {
    ...getStateQuery(searchParams),
    id: getValue(searchParams, "id")
  };
}
