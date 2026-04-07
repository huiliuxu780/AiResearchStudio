"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { InsightCard } from "@/components/shared/insight-card";
import { SectionCard } from "@/components/shared/section-card";
import { SkeletonBlock } from "@/components/shared/skeleton-block";
import { StatCard } from "@/components/shared/stat-card";
import { capabilityLayerDisplayOrder } from "@/lib/constants";
import { capabilityLayerLabelMap } from "@/lib/label-maps";
import { dashboardMock } from "@/mock/dashboard.mock";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state") ?? dashboardMock.scenario;

  if (state === "loading") return <SkeletonBlock />;
  if (state === "empty") return <EmptyState title="\u4eea\u8868\u76d8\u6682\u65e0\u6570\u636e" />;
  if (state === "error") return <ErrorState title="\u4eea\u8868\u76d8\u52a0\u8f7d\u5931\u8d25" />;

  return (
    <PageShell title="\u4eea\u8868\u76d8" description="\u5feb\u901f\u67e5\u770b\u7814\u7a76\u5168\u5c40\u72b6\u6001\u4e0e\u672c\u5468\u91cd\u70b9\u3002">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMock.data.metrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <SectionCard title="\u516d\u5c42\u5206\u5e03\u6982\u89c8" description="\u6309\u80fd\u529b\u5206\u5c42\u89c2\u5bdf\u672c\u5468\u4fe1\u606f\u5bc6\u5ea6\u3002">
          <div className="space-y-2">
            {capabilityLayerDisplayOrder.map((layer) => {
              const item = dashboardMock.data.layer_distribution.find((entry) => entry.capability_layer === layer);
              return (
                <Link
                  key={layer}
                  href={`/capability-map?layer=${layer}`}
                  className="group flex items-center justify-between rounded-md border border-border/50 px-3 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-accent/40"
                >
                  <span className="transition-colors group-hover:text-foreground">{capabilityLayerLabelMap[layer]}</span>
                  <span className="font-medium text-primary">{item?.count ?? 0}</span>
                </Link>
              );
            })}
          </div>
        </SectionCard>

        <SectionCard title="\u8fd1\u671f\u91cd\u70b9\u52a8\u6001" description="\u9ad8\u4ef7\u503c\u4e8b\u5b9e\u5361\u7247\u3002">
          <div className="space-y-3">
            {dashboardMock.data.recent_highlights.map((item) => (
              <Link
                key={item.id}
                href={`/timeline?item_id=${item.id}&topic=${item.topic_type}`}
                className="group block rounded-md border border-border/60 bg-background/50 p-3 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-accent/30"
              >
                <p className="text-sm font-medium transition-colors group-hover:text-foreground">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.summary}</p>
              </Link>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="\u6700\u65b0\u7814\u7a76\u7ed3\u8bba" description="\u6700\u8fd1\u66f4\u65b0\u7684\u7814\u7a76\u5224\u65ad\u3002">
          <div className="space-y-3">
            {dashboardMock.data.latest_insights.map((insight) => (
              <Link key={insight.id} href={`/insights?id=${insight.id}`} className="block rounded-xl border border-transparent transition-all hover:-translate-y-0.5 hover:border-primary/60">
                <InsightCard insight={insight} />
              </Link>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard title="\u672c\u5468\u5efa\u8bae\u5b9e\u9a8c" description="\u7528\u4e8e\u63a8\u8fdb PoC \u4e0e\u9009\u578b\u9a8c\u8bc1\u3002">
        <ul className="space-y-2 text-sm">
          {dashboardMock.data.experiment_suggestions.map((item) => (
            <li key={item} className="rounded-md border border-border/50 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="\u72b6\u6001\u6f14\u793a" description="\u901a\u8fc7 URL \u53c2\u6570\u5207\u6362\uff1fstate=loading|empty|error">
        <p className="text-sm text-muted-foreground">\u5f53\u524d\u72b6\u6001\uff1a{state}\u3002\u793a\u4f8b\uff1a/timeline?state=empty</p>
      </SectionCard>
    </PageShell>
  );
}
