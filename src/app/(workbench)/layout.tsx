import type { ReactNode } from "react";

import { SidebarNav, TopMobileNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";

export default function WorkbenchLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen xl:flex">
      <SidebarNav />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopHeader />
        <TopMobileNav />
        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

