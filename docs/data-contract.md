# Data Contract（Phase 1）

## 适用范围
- 本文定义 Phase 1 的数据契约与枚举口径
- API JSON 字段统一使用 `snake_case`
- 前端展示统一通过中文 `label_map` 映射，不直接显示枚举值

## 核心枚举

### capability_layer
```json
[
  "infrastructure",
  "model",
  "enhancement",
  "orchestration",
  "platform",
  "product"
]
```

### topic_type
```json
[
  "text_model",
  "multimodal",
  "image_video",
  "agent",
  "workflow",
  "rag",
  "plugin",
  "mcp",
  "coding",
  "api",
  "open_source",
  "case_study",
  "pricing",
  "security",
  "deployment"
]
```

### source_type
```json
[
  "docs",
  "blog",
  "github",
  "media",
  "manual"
]
```

### item_type
```json
[
  "release",
  "update",
  "documentation",
  "api_reference",
  "repository_change",
  "case_study",
  "opinion",
  "comparison"
]
```

### importance_level
```json
["high", "medium", "low"]
```

### insight_type
```json
["trend_judgment", "opportunity", "risk_alert", "action_suggestion"]
```

### insight_status
```json
["candidate", "confirmed", "archived"]
```

## 展示顺序常量（前端控制）
```json
{
  "capability_layer_display_order": [
    "infrastructure",
    "model",
    "enhancement",
    "orchestration",
    "platform",
    "product"
  ],
  "importance_level_display_order": ["high", "medium", "low"],
  "insight_status_display_order": ["candidate", "confirmed", "archived"]
}
```

## 数据对象契约

### Source
```json
{
  "id": "src_001",
  "name": "通义千问官方文档",
  "source_type": "docs",
  "url": "https://example.com/docs",
  "enabled": true,
  "crawl_strategy": "rss",
  "last_crawled_at": "2026-04-07T08:00:00Z",
  "status": "active"
}
```

### Raw Item
```json
{
  "id": "raw_001",
  "source_id": "src_001",
  "title": "Qwen API 新增结构化输出能力",
  "url": "https://example.com/post/1",
  "published_at": "2026-04-06T10:30:00Z",
  "crawled_at": "2026-04-06T11:00:00Z",
  "raw_content": "原始正文...",
  "content_hash": "sha256_xxx",
  "status": "processed"
}
```

### Normalized Item
```json
{
  "id": "norm_001",
  "raw_item_id": "raw_001",
  "title": "结构化输出能力更新",
  "summary": "新增可控 JSON 输出，降低后处理复杂度。",
  "source_name": "通义千问官方文档",
  "source_type": "docs",
  "item_type": "api_reference",
  "topic_type": "api",
  "capability_layer": "platform",
  "published_at": "2026-04-06T10:30:00Z",
  "importance_level": "high",
  "requires_manual_review": false,
  "evidence_refs": ["raw_001"]
}
```

### Insight
```json
{
  "id": "ins_001",
  "title": "平台层 API 能力趋于标准化输出",
  "content": "建议优先验证字段约束与错误处理。",
  "insight_type": "trend_judgment",
  "capability_layer": "platform",
  "confidence_score": 0.82,
  "insight_status": "candidate",
  "related_item_ids": ["norm_001"],
  "is_human_edited": false,
  "updated_at": "2026-04-07T02:00:00Z"
}
```

### Weekly Report
```json
{
  "id": "rep_2026w14",
  "week_start_date": "2026-03-30",
  "week_end_date": "2026-04-05",
  "title": "第14周 AI 研究周报",
  "markdown_content": "# 本周摘要...",
  "highlights": ["平台层更新活跃", "Agent 编排案例增加"],
  "experiment_suggestions": ["验证结构化输出在工作流节点的兼容性"],
  "updated_at": "2026-04-06T18:30:00Z"
}
```

### Capability Catalog
```json
{
  "id": "cap_001",
  "name": "结构化输出 API",
  "capability_layer": "platform",
  "subcategory": "api",
  "official_url": "https://example.com/api",
  "is_open_source": false,
  "api_available": true,
  "description": "支持稳定 schema 输出与约束校验。",
  "last_updated_at": "2026-04-06T10:30:00Z"
}
```

## 前端中文 label_map 约定
- 文件位置：`src/lib/label-maps.ts`
- 必须映射：`capability_layer`、`topic_type`、`source_type`、`item_type`、`importance_level`、`insight_type`、`insight_status`
- 所有页面展示文本必须走映射
