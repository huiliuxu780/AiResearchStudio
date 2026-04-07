# 下次启动开发提示词模板

请继续 `AiResearchStudio` 项目开发，基于以下上下文无缝衔接：

- 分支：`<branch_name>`
- 最新提交：`<commit_hash>`
- 今日已完成：
  1. <done_1>
  2. <done_2>
- 未完成：
  1. <todo_1>
  2. <todo_2>
- 待验证风险：
  1. <risk_1>
- 下一步第一动作：`<next_first_action>`

约束：
- 端口固定 `4000`
- 前端优先 `shadcn/ui`
- 所有用户可见字段保持中文
- 提交前至少通过 `npm run type-check` 与 `npm run lint`
