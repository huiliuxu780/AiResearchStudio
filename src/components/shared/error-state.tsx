import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
}

export function ErrorState({
  title = "加载失败",
  description = "当前为静态演示环境，请稍后重试。"
}: ErrorStateProps) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-destructive/40 bg-destructive/5 px-6 text-center">
      <AlertTriangle className="h-8 w-8 text-destructive" />
      <h3 className="mt-3 text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-xl text-sm text-muted-foreground">{description}</p>
      <Button variant="outline" size="sm" className="mt-4">
        重试
      </Button>
    </div>
  );
}

