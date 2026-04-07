import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";

export function TopHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-4 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Alibaba AI Watch</p>
          <p className="text-sm text-foreground">\u7814\u7a76\u8282\u594f\uff1a\u6bcf 6 \u5c0f\u65f6\u66f4\u65b0\uff08Mock\uff09</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm">
            <CalendarDays className="h-4 w-4" />
            \u672c\u5468\u89c6\u56fe
          </Button>
          <Button size="sm">\u5bfc\u51fa\u5feb\u7167</Button>
        </div>
      </div>
    </header>
  );
}
