# IA（Phase 1）

## 产品定位
- 产品形态：Research Workbench（研究工作台）
- 范围边界：仅面向研究分析，不扩展为企业平台
- 路由约束：`/` 固定为 Dashboard，不创建 `/dashboard`

## 一级页面与目标

### 1. Dashboard（`/`）
- 页面目标：快速查看全局研究状态和本周重点
- Phase 1 必须模块：
  - 今日新增数
  - 本周新增数
  - 六层分布概览
  - 近期重点动态
  - 最新研究结论
  - 本周建议实验
- 用户路径：进入系统后优先看总览，再跳转 Timeline / Insights / Reports

### 2. Capability Map（`/capability-map`）
- 页面目标：按能力分层查看 AI 全景
- Phase 1 必须模块：
  - 六层能力卡片
  - 每层说明
  - 关键能力条目
  - 最近更新数
- 用户路径：从 Dashboard 进入，定位到某层后跳转 Timeline 追踪事实

### 3. Timeline（`/timeline`）
- 页面目标：按时间查看事实动态，不混入结论判断
- Phase 1 必须模块：
  - 动态卡片列表
  - 来源筛选
  - 主题筛选
  - 重要度展示
  - 详情占位区
- 用户路径：从 Dashboard/Capability Map 进入，筛选后定位事实，再关联到 Insights

### 4. Insights（`/insights`）
- 页面目标：沉淀研究结论并回溯证据链
- Phase 1 必须模块：
  - 结论卡片列表
  - 结论详情区
  - 证据列表
  - 状态标记
  - 人工编辑入口（静态）
- 用户路径：从 Timeline 进入后对比结论并查看证据

### 5. Reports（`/reports`）
- 页面目标：查看研究周报与分享输出（mock）
- Phase 1 必须模块：
  - 周报列表
  - 周报详情
  - Markdown 导出入口（静态）
  - 复制分享入口（静态）
  - 人工编辑保存入口（静态）
- 用户路径：从 Dashboard 或导航进入，打开最新周报并导出

### 6. Settings（`/settings`）
- 页面目标：查看研究流程配置快照（静态面板）
- Phase 1 必须模块：
  - 信息源配置
  - 更新频率
  - 分类规则版本
  - 重要度规则版本
  - Prompt 配置
  - 抓取任务状态
- 用户路径：仅查看配置状态，不做复杂规则编辑器

## 页面关系
- Dashboard 是入口与汇总页
- Capability Map 与 Timeline 双向导流
- Timeline 与 Insights 通过证据链关联
- Reports 消费 Timeline/Insights 的结果
- Settings 提供全局配置背景
