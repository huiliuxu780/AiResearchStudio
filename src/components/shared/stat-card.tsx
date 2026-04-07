import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ImportanceLevel } from "@/types/enums";

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  importance_level: ImportanceLevel;
}

export function StatCard({ label, value, trend, importance_level }: StatCardProps) {
  const isPositive = trend.startsWith("+");

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-semibold tracking-tight">{value}</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              {isPositive ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400" /> : <ArrowDownRight className="h-3.5 w-3.5 text-amber-400" />}
              {trend}
            </span>
            <StatusBadge importanceLevel={importance_level} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

