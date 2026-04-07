# Phase 1 Plan（静态可视化落地）

## 1. 阶段目标
在不接入真实后端的前提下，完成可演示的 Research Workbench 前端骨架：
- Next.js + TypeScript + Tailwind + shadcn/ui
- 全局 Layout（Sidebar / Header / Main Content）
- 6 个一级页面静态骨架
- mock data + 强类型数据契约
- 第一批共享组件
- loading / empty / error 状态覆盖

## 2. 范围定义

### In Scope（本阶段必须完成）
- 静态页面与交互占位
- mock 数据驱动展示
- 共享组件标准化
- 枚举中文映射与展示顺序常量
- Settings 页仅静态配置面板

### Out of Scope（本阶段不做）
- 真实抓取（Crawler）
- 数据库与持久化
- AI 处理链（摘要/分类/分层/结论生成）
- 真实鉴权与权限体系
- 复杂规则编辑器
- 企业平台化能力

## 3. 路由约束
- `/`：Dashboard
- `/capability-map`
- `/timeline`
- `/insights`
- `/reports`
- `/settings`
- 不创建 `/dashboard`

## 4. 任务顺序
1. 项目骨架与依赖：Next.js + TypeScript + Tailwind + shadcn/ui
2. 类型与契约：枚举、接口、label_map、展示顺序常量
3. 全局布局：Sidebar / Header / Main
4. 共享组件：PageShell、SectionCard、StatusBadge、四类研究卡片
5. 六个页面：静态骨架 + mock data 显示
6. 状态覆盖：loading / empty / error 三态\n8. 运行约束：开发端口固定 4000
7. 验收回归：路由可达、文案中文、样式一致、移动端可用

## 5. 验收标准
- 6 个一级页面可访问，且首页固定 `/`
- 全局导航高亮正确
- 深色 AI-native 风格一致
- 用户可见字段为中文（通过 label_map）
- 状态覆盖完整（loading/empty/error）
- Settings 为静态配置面板，不含复杂编辑器

## 6. 风险边界
- 风险：mock 与未来 API 演进不一致
  - 处理：以 `docs/data-contract.md` 为单一契约源
- 风险：视觉退化为传统后台风格
  - 处理：坚持 AI-native 深色基线与统一组件
- 风险：开发过程引入编码问题
  - 处理：发布前强制运行 `npm run check:encoding`

