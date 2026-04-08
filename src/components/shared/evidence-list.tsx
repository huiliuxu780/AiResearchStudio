import type { NormalizedItem } from "@/types/contracts";

import { TimelineItemCard } from "@/components/shared/timeline-item-card";

interface EvidenceListProps {
  title?: string;
  items: NormalizedItem[];
}

export function EvidenceList({ title = "关联证据", items }: EvidenceListProps) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <TimelineItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
