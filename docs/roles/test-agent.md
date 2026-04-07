# 测试专家 Agent 职责与发布门禁

## 角色职责
- 维护测试用例与回归范围。
- 执行冒烟测试并产出放行建议。
- 缺陷分级（P0-P3）与修复优先级协同。
- 发布前执行 Go/No-Go 质量签字。

## 冒烟测试（每次构建必跑）
- S01 应用可启动：`npm run dev -- -p 3001`
- S02 核心路由可达：`/` `/capability-map` `/timeline` `/insights` `/reports` `/settings`
- S03 Timeline 参数联动：`/timeline?topic=workflow`
- S04 Insights 详情联动：`/insights?id=ins_401`
- S05 Reports 详情联动：`/reports?id=rep_2026w14`
- S06 状态机制：`?state=loading|empty|error`
- S07 首页跳转链路：卡片跳转到 Timeline/Insights 且参数正确
- S08 中文映射检查：不直接暴露英文枚举值
- S09 响应式检查：桌面与移动端无重叠/截断
- S10 数据源兜底：未设 `NEXT_PUBLIC_DATA_SOURCE` 时默认 `mock`

## 缺陷分级
- P0 阻断：启动失败、白屏、核心路由不可用、关键流程不可继续。
- P1 严重：核心结果错误（参数失效、详情错配、映射错误）。
- P2 一般：局部异常且存在可绕行路径。
- P3 轻微：低风险视觉或文案问题。

## 发布门禁（Go/No-Go）
- 自动检查必须通过：
  - `npm run type-check`
  - `npm run lint`
  - `npm run build`
  - `npm run demo:check`
- 手工检查必须通过：
  - 冒烟用例 S01-S10 全绿
  - 桌面与移动端关键路径抽检
  - 缺陷条件：P0=0 且 P1=0
