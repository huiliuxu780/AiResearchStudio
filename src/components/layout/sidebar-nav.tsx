"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, Clock3, FileText, LayoutDashboard, Map, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "仪表盘", icon: LayoutDashboard },
  { href: "/capability-map", label: "能力地图", icon: Map },
  { href: "/timeline", label: "动态时间线", icon: Clock3 },
  { href: "/insights", label: "研究结论", icon: BrainCircuit },
  { href: "/reports", label: "研究周报", icon: FileText },
  { href: "/settings", label: "配置", icon: Settings }
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-border/60 bg-black/30 backdrop-blur xl:block">
      <div className="flex h-full flex-col px-5 py-6">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Research Workbench</p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">千问研究工作台</h2>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-primary/20 text-primary shadow-glow"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-lg border border-border/60 bg-card/60 p-3">
          <p className="text-xs text-muted-foreground">当前模式</p>
          <p className="mt-1 text-sm font-medium text-foreground">Phase 1 静态演示</p>
        </div>
      </div>
    </aside>
  );
}

export function TopMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border/60 bg-card/40 px-4 py-2 xl:hidden">
      <div className="flex gap-2 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "whitespace-nowrap rounded-md border px-3 py-1.5 text-xs",
                isActive ? "border-primary/70 bg-primary/20 text-primary" : "border-border/60 text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

