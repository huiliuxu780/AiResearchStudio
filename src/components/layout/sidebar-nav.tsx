"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, Clock3, FileText, LayoutDashboard, Map, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "\u4eea\u8868\u76d8", icon: LayoutDashboard },
  { href: "/capability-map", label: "\u80fd\u529b\u5730\u56fe", icon: Map },
  { href: "/timeline", label: "\u52a8\u6001\u65f6\u95f4\u7ebf", icon: Clock3 },
  { href: "/insights", label: "\u7814\u7a76\u7ed3\u8bba", icon: BrainCircuit },
  { href: "/reports", label: "\u7814\u7a76\u5468\u62a5", icon: FileText },
  { href: "/settings", label: "\u914d\u7f6e", icon: Settings }
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-border/60 bg-black/30 backdrop-blur xl:block">
      <div className="flex h-full flex-col px-5 py-6">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Research Workbench</p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">\u5343\u95ee\u7814\u7a76\u5de5\u4f5c\u53f0</h2>
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
          <p className="text-xs text-muted-foreground">\u5f53\u524d\u6a21\u5f0f</p>
          <p className="mt-1 text-sm font-medium text-foreground">Phase 1 \u9759\u6001\u6f14\u793a</p>
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
