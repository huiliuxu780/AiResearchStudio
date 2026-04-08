# 共享组件 API 文档（Phase 1）

本文用于统一 `src/components/shared` 与 `src/components/layout` 的组件使用方式，减少页面重复实现。

## 1. 布局容器

### `PageShell`
- 文件：`src/components/layout/page-shell.tsx`
- 作用：页面主标题、描述、右侧操作区与主体内容容器。
- Props：
  - `title: string` 页面标题
  - `description: string` 页面描述
  - `actions?: ReactNode` 顶部右侧操作区
  - `children: ReactNode` 页面内容

### `SectionCard`
- 文件：`src/components/shared/section-card.tsx`
- 作用：通用分区卡片容器，支持标题、副标题和右侧 actions。
- Props：
  - `title: string`
  - `description?: string`
  - `actions?: ReactNode`
  - `className?: string`
  - `children: ReactNode`

## 2. 状态与反馈

### `ScenarioStateGate`
- 文件：`src/components/shared/scenario-state-gate.tsx`
- 作用：统一处理 `ready/loading/empty/error` 四态渲染。
- Props：
  - `scenario: ScenarioState`
  - `children: ReactNode`
  - `loadingFallback?: ReactNode`（默认 `SkeletonBlock`）
  - `emptyTitle: string`
  - `emptyDescription?: string`
  - `errorTitle: string`
  - `errorDescription?: string`
- 行为：
  - `loading` -> `loadingFallback` 或 `SkeletonBlock`
  - `empty` -> `EmptyState`
  - `error` -> `ErrorState`
  - `ready` -> `children`

### `EmptyState`
- 文件：`src/components/shared/empty-state.tsx`
- Props：
  - `title?: string`（默认：暂无可展示内容）
  - `description?: string`

### `ErrorState`
- 文件：`src/components/shared/error-state.tsx`
- Props：
  - `title?: string`（默认：加载失败）
  - `description?: string`

### `SkeletonBlock`
- 文件：`src/components/shared/skeleton-block.tsx`
- Props：无
- 作用：列表/卡片页 loading 占位骨架屏。

## 3. 导航与选中态

### `ContextBackBar`
- 文件：`src/components/shared/context-back-bar.tsx`
- 作用：返回入口 + 当前上下文提示。
- Props：
  - `href: string`
  - `label: string`
  - `contextText?: string`
  - `className?: string`

### `SelectableCardLink`
- 文件：`src/components/shared/selectable-card-link.tsx`
- 作用：可点击卡片包装，支持 selected 视觉态。
- Props：
  - `href: string`
  - `selected?: boolean`（默认 `false`）
  - `className?: string`
  - `children: ReactNode`

## 4. 业务展示组件

### `StatCard`
- 文件：`src/components/shared/stat-card.tsx`
- Props：
  - `label: string`
  - `value: string`
  - `trend: string`（`+` 开头视为上升）
  - `importance_level: ImportanceLevel`

### `StatusBadge`
- 文件：`src/components/shared/status-badge.tsx`
- Props：
  - `importanceLevel?: ImportanceLevel`
  - `insightStatus?: InsightStatus`
- 规则：
  - 两者都传时优先 `importanceLevel`
  - 都不传时回退为 outline badge

### `TimelineItemCard`
- 文件：`src/components/shared/timeline-item-card.tsx`
- Props：
  - `item: NormalizedItem`

### `InsightCard`
- 文件：`src/components/shared/insight-card.tsx`
- Props：
  - `insight: Insight`

### `ReportCard`
- 文件：`src/components/shared/report-card.tsx`
- Props：
  - `report: WeeklyReport`

### `EvidenceList`
- 文件：`src/components/shared/evidence-list.tsx`
- Props：
  - `title?: string`
  - `items: NormalizedItem[]`

### `CapabilityLayerCard`
- 文件：`src/components/shared/capability-layer-card.tsx`
- Props：
  - `layer: CapabilityLayerSummary`

### `FilterBar`
- 文件：`src/components/shared/filter-bar.tsx`
- Props：
  - `sourceTypes: SourceType[]`
  - `topicTypes: TopicType[]`
- 说明：当前支持来源与主题筛选联动，其中主题会回写 URL；来源筛选目前仅在页面内生效（不回写 URL）。

## 5. 组合建议
- 页面必须先走 `ScenarioStateGate`，再渲染 `PageShell`。
- 需要“列表 + 右侧详情”时，左侧列表项统一使用 `SelectableCardLink`。
- 需要“返回仪表盘 + 当前上下文”时统一使用 `ContextBackBar`。
- 新页面优先复用上述组件；避免新增同类展示壳组件。

