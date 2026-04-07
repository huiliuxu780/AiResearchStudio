# Data Contract（Phase 1）

## 1. 适用范围
- 本文定义 Phase 1 的前后端数据契约与枚举口径。
- API 字段统一使用 `snake_case`。
- 前端用户可见文案统一通过中文 `label_map` 映射，不直接显示枚举值。

## 2. 设计原则
- 枚举值保持稳定业务语义，不包含展示顺序语义。
- `source_type` 与 `item_type` 严格分离：
  - `source_type` 描述来源渠道
  - `item_type` 描述内容性质
- 展示顺序由常量数组控制，不写入枚举值。

## 3. 核心枚举

### 3.1 capability_layer
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

### 3.2 source_type
```json
[
  "docs",
  "blog",
  "github",
  "media",
  "manual"
]
```

### 3.3 topic_type
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

### 3.4 item_type
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

### 3.5 importance_level
```json
[
  "high",
  "medium",
  "low"
]
```

### 3.6 insight_type
```json
[
  "trend_judgment",
  "opportunity",
  "risk_alert",
  "action_suggestion"
]
```

### 3.7 insight_status
```json
[
  "candidate",
  "confirmed",
  "archived"
]
```

## 4. 展示顺序常量（前端控制）
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

## 5. 数据对象契约

### 5.1 Source
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

字段说明：
- `id`: 信息源 ID
- `name`: 来源名称（中文展示）
- `source_type`: 来源渠道枚举
- `url`: 来源地址
- `enabled`: 是否启用
- `crawl_strategy`: 抓取策略（Phase 1 mock）
- `last_crawled_at`: 上次抓取时间
- `status`: 状态（`active` / `paused` / `error`）

### 5.2 Raw Item
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

### 5.3 Normalized Item
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

### 5.4 Insight
```json
{
  "id": "ins_001",
  "title": "平台层 API 能力趋向标准化输出",
  "content": "结构化输出将提升接入一致性，建议优先验证字段约束与错误处理。",
  "insight_type": "trend_judgment",
  "capability_layer": "platform",
  "confidence_score": 0.82,
  "insight_status": "candidate",
  "related_item_ids": ["norm_001"],
  "is_human_edited": false,
  "updated_at": "2026-04-07T02:00:00Z"
}
```

### 5.5 Weekly Report
```json
{
  "id": "rep_2026w14",
  "week_start_date": "2026-03-30",
  "week_end_date": "2026-04-05",
  "title": "第 14 周阿里 AI 研究周报",
  "markdown_content": "# 本周摘要...",
  "highlights": ["平台层更新活跃", "Agent 编排案例增加"],
  "experiment_suggestions": ["验证结构化输出与工作流节点兼容性"],
  "updated_at": "2026-04-06T18:30:00Z"
}
```

### 5.6 Capability Catalog
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

## 6. 前端中文 label map 约定

```json
{
  "capability_layer": {
    "infrastructure": "基础资源层",
    "model": "模型层",
    "enhancement": "模型增强层",
    "orchestration": "编排执行层",
    "platform": "平台工具层",
    "product": "产品与场景层"
  },
  "source_type": {
    "docs": "官方文档",
    "blog": "官方博客",
    "github": "GitHub",
    "media": "媒体/发布",
    "manual": "手动录入"
  },
  "importance_level": {
    "high": "高",
    "medium": "中",
    "low": "低"
  },
  "insight_status": {
    "candidate": "候选",
    "confirmed": "已确认",
    "archived": "已归档"
  }
}
```

说明：
- label map 由前端维护在 `src/lib/label-maps.ts`。
- 所有页面展示字段（筛选项、标签、状态）必须经 label map 转中文。
