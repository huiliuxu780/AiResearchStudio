"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sourceTypeLabelMap, topicTypeLabelMap } from "@/lib/label-maps";
import type { SourceType, TopicType } from "@/types/enums";

interface FilterBarProps {
  sourceTypes: SourceType[];
  topicTypes: TopicType[];
  selectedTopic?: TopicType;
  onTopicChange?: (topic?: TopicType) => void;
}

export function FilterBar({ sourceTypes, topicTypes, selectedTopic, onTopicChange }: FilterBarProps) {
  const topicValue = selectedTopic ?? "all";

  return (
    <div className="grid gap-2 rounded-lg border border-border/60 bg-card/40 p-3 md:grid-cols-2">
      <Select defaultValue={sourceTypes[0]} disabled>
        <SelectTrigger aria-label="来源筛选（Phase 2 预留）">
          <SelectValue placeholder="来源筛选（Phase 2 预留）" />
        </SelectTrigger>
        <SelectContent>
          {sourceTypes.map((item) => (
            <SelectItem key={item} value={item}>
              {sourceTypeLabelMap[item]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={topicValue}
        onValueChange={(value) => {
          if (!onTopicChange) return;
          onTopicChange(value === "all" ? undefined : (value as TopicType));
        }}
      >
        <SelectTrigger aria-label="主题筛选">
          <SelectValue placeholder="主题筛选" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">全部主题</SelectItem>
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

