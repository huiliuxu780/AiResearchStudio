import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "千问研究工作台",
  description: "阿里 AI 能力地图与研究工作台（Phase 1 静态演示）"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body>{children}</body>
    </html>
  );
}

