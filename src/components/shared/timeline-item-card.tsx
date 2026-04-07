import { itemTypeLabelMap, sourceTypeLabelMap, topicTypeLabelMap } from "@/lib/label-maps";
import { formatDateTime } from "@/lib/formatters";
import type { NormalizedItem } from "@/types/contracts";

import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItemCardProps {
  item: NormalizedItem;
}

export function TimelineItemCard({ item }: TimelineItemCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{item.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-muted-foreground">{item.summary}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>来源：{sourceTypeLabelMap[item.source_type]}</span>
          <span>类型：{itemTypeLabelMap[item.item_type]}</span>
          <span>主题：{topicTypeLabelMap[item.topic_type]}</span>
          <span>时间：{formatDateTime(item.published_at)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">证据数：{item.evidence_refs.length}</span>
          <StatusBadge importanceLevel={item.importance_level} />
        </div>
      </CardContent>
    </Card>
  );
}

