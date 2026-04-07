import { Badge } from "@/components/ui/badge";
import { importanceLevelLabelMap, insightStatusLabelMap } from "@/lib/label-maps";
import type { ImportanceLevel, InsightStatus } from "@/types/enums";

interface StatusBadgeProps {
  importanceLevel?: ImportanceLevel;
  insightStatus?: InsightStatus;
}

export function StatusBadge({ importanceLevel, insightStatus }: StatusBadgeProps) {
  if (importanceLevel) {
    const variant = importanceLevel === "high" ? "destructive" : importanceLevel === "medium" ? "secondary" : "outline";
    return <Badge variant={variant}>{importanceLevelLabelMap[importanceLevel]}</Badge>;
  }

  if (insightStatus) {
    const variant = insightStatus === "confirmed" ? "default" : insightStatus === "candidate" ? "secondary" : "outline";
    return <Badge variant={variant}>{insightStatusLabelMap[insightStatus]}</Badge>;
  }

  return <Badge variant="outline">未知</Badge>;
}

