# 运行与验收最佳实践（AiResearchStudio）

## 端口策略
- 开发端口固定为 `4000`。
- 禁止使用 `3000`（避免与其他项目冲突）。
- 若端口冲突，先执行：
  - `netstat -ano | findstr ":4000 "`
  - `taskkill /PID <PID> /F`

## 启动与检查
- 启动：`npm run dev`（已固定 4000）
- 完整门禁：`npm run preflight`
- 路由验收：`npm run demo:check`（默认检查 `http://localhost:4000`）

## 发布前硬门禁
- 必须全部通过：
  - `npm run type-check`
  - `npm run lint`
  - `npm run build`
  - `npm run check:encoding`
- 中文可读性硬规则：
  - 禁止出现字面 `\\uXXXX`
  - 禁止出现替代字符 `�`

## UI开发规范（shadcn-first）
- 组件优先级：`shadcn/ui` > 项目共享组件 > 页面局部组件。
- 所有用户可见字段使用中文。
- 每页必须覆盖 `loading / empty / error` 状态。
- 共享交互优先复用（如列表卡片选中态统一组件）。

## 执行纪律
- 先本地 `preflight`，再提交。
- 发现编码或文案异常，先修复再继续功能开发。
- 出现事故必须记录复盘并落地到脚本/门禁，而不是只写结论。

## 收工交接（强制）
- 当用户明确表示“结束今天开发”时，必须立即执行：
  1. 运行必要检查（至少 `type-check` + `lint`）。
  2. 提交并推送当前分支到远端。
  3. 输出“下次启动开发提示词”，保证下一次可以无缝接上。
- 下次启动提示词必须包含：
  - 当前分支与最新提交
  - 已完成事项
  - 未完成事项
  - 待验证项
  - 下一步第一动作

## 共享组件与参数规范
- 共享组件 API：docs/shared-components-api.md
- 页面 Query 参数规范：docs/page-query-params-spec.md


