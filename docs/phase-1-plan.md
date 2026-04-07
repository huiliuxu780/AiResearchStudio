# Phase 1 Plan（静态可视化落地）

## 1. 阶段目标
在不接入真实后端的前提下，完成可演示的 Research Workbench 前端骨架：
- Next.js + TypeScript + Tailwind + shadcn/ui
- 全局 Layout（Sidebar / Header / Main Content）
- 6 个一级页面静态骨架
- mock data + 强类型契约
- 第一批共享组件
- loading / empty / error 状态

## 2. 范围定义

### 2.1 In Scope（本阶段必须完成）
- 静态页面与交互占位
- mock 数据驱动展示
- 共享组件标准化
- 枚举中文映射与显示顺序常量
- Settings 页面仅静态配置面板

### 2.2 Out of Scope（本阶段明确不做）
- 真实抓取（Crawler）
- 数据库与持久化
- AI 摘要/分类/分层/结论链路
- 真实鉴权与权限体系
- 复杂规则编辑器
- 企业级任务调度

## 3. 路由与页面约束
- `/`：Dashboard（固定首页）
- `/capability-map`
- `/timeline`
- `/insights`
- `/reports`
- `/settings`
- 不创建 `/dashboard` 路由

## 4. 任务顺序

### Step 1：项目骨架初始化
- 初始化 Next.js + TypeScript + Tailwind
- 配置 shadcn/ui 基础组件
- 建立目录结构（`app` / `components` / `mock` / `types` / `lib`）

### Step 2：数据与类型基线
- 建立枚举类型与数据契约类型（snake_case）
- 建立 `label_map` 与展示顺序常量
- 建立 6 个页面 mock 数据文件

### Step 3：全局布局
- 实现 Sidebar / Header / Main Content
- 深色 AI-native dashboard 视觉基线
- 移动端与桌面端响应式适配

### Step 4：第一批共享组件
- 基础容器组件：PageShell / SectionCard / StatusBadge
- 状态组件：Loading / Empty / Error
- 研究卡片组件：
  - CapabilityLayerCard
  - TimelineItemCard
  - InsightCard
  - ReportCard
  - EvidenceList

### Step 5：6 个页面静态骨架
- Dashboard
- Capability Map
- Timeline
- Insights
- Reports
- Settings（静态配置面板）

### Step 6：状态覆盖与验收
- 每页接入 loading / empty / error 演示态
- 校验中文字段展示
- 校验路由与导航一致性

## 5. 验收标准

### 5.1 结构验收
- 6 个一级页面可访问
- 首页为 `/`
- 左侧导航高亮正确

### 5.2 视觉验收
- 深色 AI-native dashboard 风格统一
- 信息密度中高且层次清晰
- 桌面与移动端均可正常显示

### 5.3 数据验收
- 所有 mock 数据字段遵循 snake_case
- 枚举值使用统一契约
- 前端展示均经过中文 label map

### 5.4 交互验收
- 页面具有基础筛选/切换占位能力
- loading / empty / error 三态完整
- Settings 仅静态展示，不包含复杂编辑器

## 6. 风险边界与处理

### 风险 1：无真实后端导致交互预期偏差
- 边界：仅验证信息架构与组件结构，不承诺真实数据时序。

### 风险 2：mock 字段与后续 API 演进不一致
- 边界：以 `docs/data-contract.md` 为单一契约源，后续改动先改契约再改页面。

### 风险 3：组件扩张为通用后台系统
- 边界：仅服务研究工作台场景，不引入企业平台模块。

### 风险 4：视觉趋于传统后台模板
- 边界：坚持 AI-native 深色风格，不使用传统 Ant Design 后台观感。
