import type { ScenarioState, TopicType } from "@/types/enums";

type QueryValue = string | undefined;

function normalize(value: QueryValue): string | undefined {
  if (!value) return undefined;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function buildHref(pathname: string, entries: Array<[string, QueryValue]>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of entries) {
    const normalized = normalize(value);
    if (normalized) {
      searchParams.set(key, normalized);
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}

export function getCapabilityMapHref(options?: { layer?: string; state?: ScenarioState }): string {
  return buildHref("/capability-map", [
    ["layer", options?.layer],
    ["state", options?.state]
  ]);
}

export function getTimelineHref(options?: { topic?: TopicType; item_id?: string; state?: ScenarioState }): string {
  return buildHref("/timeline", [
    ["topic", options?.topic],
    ["item_id", options?.item_id],
    ["state", options?.state]
  ]);
}

export function getInsightsHref(options?: { id?: string; state?: ScenarioState }): string {
  return buildHref("/insights", [
    ["id", options?.id],
    ["state", options?.state]
  ]);
}

export function getReportsHref(options?: { id?: string; state?: ScenarioState }): string {
  return buildHref("/reports", [
    ["id", options?.id],
    ["state", options?.state]
  ]);
}
