import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";

export function TopHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Alibaba AI Watch</p>
          <p className="text-sm text-foreground">研究节奏：每 6 小时更新（Mock）</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <CalendarDays className="h-4 w-4" />
            本周视图
          </Button>
          <Button size="sm">导出快照</Button>
        </div>
      </div>
    </header>
  );
}

