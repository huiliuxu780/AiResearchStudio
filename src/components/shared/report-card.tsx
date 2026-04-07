import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime } from "@/lib/formatters";
import type { WeeklyReport } from "@/types/contracts";

interface ReportCardProps {
  report: WeeklyReport;
}

export function ReportCard({ report }: ReportCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{report.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-xs text-muted-foreground">
          周期：{report.week_start_date} 至 {report.week_end_date}
        </p>
        <div>
          <p className="mb-1 text-xs text-muted-foreground">重点摘要</p>
          <ul className="space-y-1 text-sm text-foreground">
            {report.highlights.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted-foreground">更新时间：{formatDateTime(report.updated_at)}</p>
      </CardContent>
    </Card>
  );
}
