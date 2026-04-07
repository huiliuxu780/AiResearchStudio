import { capabilityLayerLabelMap, insightTypeLabelMap } from "@/lib/label-maps";
import { formatDateTime } from "@/lib/formatters";
import type { Insight } from "@/types/contracts";

import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InsightCardProps {
  insight: Insight;
}

export function InsightCard({ insight }: InsightCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{insight.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-muted-foreground">{insight.content}</p>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>类型：{insightTypeLabelMap[insight.insight_type]}</span>
          <span>层级：{capabilityLayerLabelMap[insight.capability_layer]}</span>
          <span>置信度：{Math.round(insight.confidence_score * 100)}%</span>
          <span>更新时间：{formatDateTime(insight.updated_at)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">关联事实：{insight.related_item_ids.length}</span>
          <StatusBadge insightStatus={insight.insight_status} />
        </div>
      </CardContent>
    </Card>
  );
}

