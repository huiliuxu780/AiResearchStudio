import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";

export function TopHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-3 sm:h-16 sm:px-4 lg:px-8">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">Alibaba AI Watch</p>
          <p className="text-xs text-foreground sm:text-sm">\u7814\u7a76\u8282\u594f\uff1a\u6bcf 6 \u5c0f\u65f6\u66f4\u65b0\uff08Mock\uff09</p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button variant="secondary" size="sm" className="px-2.5 sm:px-3">
            <CalendarDays className="h-4 w-4" />
            <span className="hidden sm:inline">\u672c\u5468\u89c6\u56fe</span>
          </Button>
          <Button size="sm" className="px-2.5 sm:px-3">
            <span className="hidden sm:inline">\u5bfc\u51fa\u5feb\u7167</span>
            <span className="sm:hidden">\u5bfc\u51fa</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
