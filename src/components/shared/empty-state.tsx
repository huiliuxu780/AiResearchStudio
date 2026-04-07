import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "暂无可展示内容",
  description = "当前筛选条件下没有数据，请稍后重试或调整筛选条件。"
}: EmptyStateProps) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-card/30 px-6 text-center">
      <Inbox className="h-8 w-8 text-muted-foreground" />
      <h3 className="mt-3 text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-xl text-sm text-muted-foreground">{description}</p>
      <Button variant="secondary" size="sm" className="mt-4">
        重置筛选
      </Button>
    </div>
  );
}

