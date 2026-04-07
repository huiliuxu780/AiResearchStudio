"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sourceTypeLabelMap, topicTypeLabelMap } from "@/lib/label-maps";
import type { SourceType, TopicType } from "@/types/enums";

interface FilterBarProps {
  sourceTypes: SourceType[];
  topicTypes: TopicType[];
}

export function FilterBar({ sourceTypes, topicTypes }: FilterBarProps) {
  return (
    <div className="grid gap-2 rounded-lg border border-border/60 bg-card/40 p-3 md:grid-cols-2">
      <Select defaultValue={sourceTypes[0]}>
        <SelectTrigger>
          <SelectValue placeholder="来源筛选" />
        </SelectTrigger>
        <SelectContent>
          {sourceTypes.map((item) => (
            <SelectItem key={item} value={item}>
              {sourceTypeLabelMap[item]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select defaultValue={topicTypes[0]}>
        <SelectTrigger>
          <SelectValue placeholder="主题筛选" />
        </SelectTrigger>
        <SelectContent>
          {topicTypes.map((item) => (
            <SelectItem key={item} value={item}>
              {topicTypeLabelMap[item]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

