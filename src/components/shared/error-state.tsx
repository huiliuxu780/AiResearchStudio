import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
}

export function ErrorState({
  title = "\u52a0\u8f7d\u5931\u8d25",
  description = "\u5f53\u524d\u4e3a\u9759\u6001\u6f14\u793a\u73af\u5883\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u3002"
}: ErrorStateProps) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-destructive/40 bg-destructive/5 px-6 text-center">
      <AlertTriangle className="h-8 w-8 text-destructive" />
      <h3 className="mt-3 text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-xl text-sm text-muted-foreground">{description}</p>
      <Button variant="outline" size="sm" className="mt-4">
        \u91cd\u8bd5
      </Button>
    </div>
  );
}
