import { Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "\u6682\u65e0\u53ef\u5c55\u793a\u5185\u5bb9",
  description = "\u5f53\u524d\u7b5b\u9009\u6761\u4ef6\u4e0b\u6ca1\u6709\u6570\u636e\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\u6216\u8c03\u6574\u7b5b\u9009\u6761\u4ef6\u3002"
}: EmptyStateProps) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-border/70 bg-card/30 px-6 text-center">
      <Inbox className="h-8 w-8 text-muted-foreground" />
      <h3 className="mt-3 text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-xl text-sm text-muted-foreground">{description}</p>
      <Button variant="secondary" size="sm" className="mt-4">
        \u91cd\u7f6e\u7b5b\u9009
      </Button>
    </div>
  );
}
