# IA（Phase 1）

## 产品定位
- 产品形态：Research Workbench（研究工作台）
- 范围边界：只面向研究分析，不扩展为企业平台能力
- 路由约束：`/` 固定为 Dashboard，不创建 `/dashboard`

## 一级页面与目标

### 1. Dashboard（`/`）
- 页面目标：快速查看研究全局状态和本周重点
- Phase 1 必须模块：
  - 今日新增数
  - 本周新增数
  - 六层分布概览
  - 近期重点动态
  - 最新研究结论
  - 本周建议实验
- 用户路径：
  - 进入系统默认落地 Dashboard
  - 查看总览指标与重点
  - 跳转 Timeline / Insights / Reports 深读

### 2. Capability Map（`/capability-map`）
- 页面目标：按能力分层理解阿里 AI 全景
- Phase 1 必须模块：
  - 六层能力结构卡片
  - 每层说明
  - 每层关键能力卡片
  - 每层最近更新数
  - 代表性来源项
- 用户路径：
  - 从 Dashboard 的分层概览进入
  - 查看单层能力与更新密度
  - 跳转 Timeline 查看事实条目

### 3. Timeline（`/timeline`）
- 页面目标：按时间查看事实动态，不混入结论判断
- Phase 1 必须模块：
  - 信息流卡片列表
  - 来源筛选
  - 层级筛选
  - 主题筛选
  - 重要度筛选
  - 详情抽屉占位
- 用户路径：
  - 从 Dashboard / Capability Map 进入
  - 用筛选器定位事实
  - 打开详情查看证据与上下文
  - 可跳转 Insights 查看相关结论

### 4. Insights（`/insights`）
- 页面目标：沉淀研究结论，并可回看证据链
- Phase 1 必须模块：
  - 结论卡片列表
  - 结论详情区域
  - 关联证据列表
  - 结论状态标记
  - 人工修订入口（静态）
- 用户路径：
  - 从 Timeline 某条事实进入相关结论
  - 对比多条结论
  - 回看证据链来源

### 5. Reports（`/reports`）
- 页面目标：查看研究周报和分享输出（静态 mock）
- Phase 1 必须模块：
  - 周报列表
  - 周报详情
  - Markdown 导出入口（静态）
  - 复制飞书版本入口（静态）
  - 人工编辑保存入口（静态）
- 用户路径：
  - 从 Dashboard 或导航进入
  - 打开最近周报
  - 复制/导出用于外部同步

### 6. Settings（`/settings`）
- 页面目标：查看研究流程配置状态（仅静态配置面板）
- Phase 1 必须模块：
  - 信息源配置
  - 更新频率配置
  - 分类规则配置
  - 重要度规则配置
  - Prompt 配置
  - 抓取任务状态
- 用户路径：
  - 从侧边导航进入
  - 查看当前配置快照
  - 不提供复杂规则编辑器

## 页面关系
- Dashboard 是入口与汇总页
- Capability Map 与 Timeline 互相导流：
  - 地图负责结构全景
  - 时间线负责事实详情
- Insights 与 Timeline 通过证据链关联
- Reports 消费 Timeline 与 Insights 的结果
- Settings 对全局展示口径提供配置背景
