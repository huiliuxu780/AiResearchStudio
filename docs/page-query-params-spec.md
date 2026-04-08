# 页面级 Query 参数规范（Phase 1）

目标：统一 `topic / item_id / id / state` 的命名、适用路由和容错策略，避免页面各自定义。

## 1. 统一原则
- URL 参数名一律小写，优先 `snake_case`。
- `state` 为全局调试参数，可用于所有顶层页面。
- 语义化参数仅在对应页面生效，其他页面忽略。`source` 不属于 Phase 1 URL 参数规范。
- 解析入口统一使用：`getScenarioState(searchParams)`（见 `src/lib/scenario-state.ts`）。

## 2. 参数定义

### `state`
- 含义：驱动页面进入指定场景态（用于演示/验收）。
- 允许值：`ready | loading | empty | error`
- 适用路由：`/`、`/capability-map`、`/timeline`、`/insights`、`/reports`、`/settings`
- 解析规则：
  - 缺失或非法值 -> 视为 `undefined`（由仓储返回默认 `ready`）

### `topic`
- 含义：Timeline 主题过滤。
- 适用路由：`/timeline`
- 允许值：推荐使用 `TopicType` 枚举值（见 `src/types/enums.ts`）。
- 解析规则：
  - 缺失 -> 不做主题过滤
  - 非法值 -> 当前实现会返回空列表（与 empty UX 一致）

### `item_id`
- 含义：Timeline 目标条目定位（高亮/聚焦）。
- 适用路由：`/timeline`
- 类型：字符串 ID（如 `norm_201`）
- 解析规则：
  - 缺失 -> 展示主题过滤结果首条（若存在）
  - 不存在 ID -> 退化为首条

### `id`
- 含义：详情页当前选中项 ID。
- 适用路由：`/insights`、`/reports`
- 类型：字符串 ID
- 解析规则：
  - 缺失 -> 使用页面默认首项
  - 不存在 ID -> 退化为首项

## 3. 路由参数矩阵

- `/`：`state`
- `/capability-map`：`state`
- `/timeline`：`state`、`topic`、`item_id`
- `/insights`：`state`、`id`
- `/reports`：`state`、`id`
- `/settings`：`state`


## 3.1 明确不纳入 URL 的参数（Phase 1）
- `source`：当前仅作为 Timeline 页面内筛选状态，不回写 URL。
- 原因：保持 Phase 1 参数面最小化，仅保留 `topic / item_id / id / state`。
## 4. 推荐 URL 示例
- `/timeline?topic=workflow&item_id=norm_202`
- `/insights?id=ins_401`
- `/reports?id=rep_2026w14`
- `/timeline?state=loading`
- `/insights?state=empty`
- `/reports?state=error`

## 5. 新页面接入约束
- 新页面若接入场景态，必须使用 `getScenarioState`，禁止手写 `searchParams.get("state")` 分支。
- 若新增语义参数，先补本文档再上线，并明确：
  - 参数名
  - 适用路由
  - 允许值/类型
  - 缺失/非法值回退策略
- `id` 保留给“单条详情选择”；列表页筛选参数不要复用 `id`。

## 6. 与仓储接口对齐
`WorkbenchQuery` 当前定义：
- `state?: ScenarioState`
- `topic?: TopicType | string`
- `item_id?: string`
- `id?: string`
- `layer?: string`（预留，Phase 1 未启用）

参考：`src/repositories/workbench/types.ts`

