import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { capabilityLayerLabelMap } from "@/lib/label-maps";
import type { CapabilityLayerSummary } from "@/mock/capability.mock";

interface CapabilityLayerCardProps {
  layer: CapabilityLayerSummary;
}

export function CapabilityLayerCard({ layer }: CapabilityLayerCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{capabilityLayerLabelMap[layer.capability_layer]}</span>
          <span className="text-sm text-primary">{layer.recent_update_count} 条更新</span>
        </CardTitle>
        <CardDescription>{layer.layer_description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {layer.key_capabilities.length === 0 ? (
          <p className="text-sm text-muted-foreground">Phase 1 仅展示结构占位，后续接入真实能力条目。</p>
        ) : (
          layer.key_capabilities.map((item) => (
            <div key={item.id} className="rounded-md border border-border/60 bg-background/50 p-3">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
