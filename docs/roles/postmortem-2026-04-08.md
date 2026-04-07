# 2026-04-08 复盘（前端中文显示问题）

## 事件
- 页面出现字面 `\uXXXX` 与乱码文本，影响可读性与验收。

## 原因
- 测试门禁只覆盖“可达性/状态码”，缺少“中文可读性”检查。
- 发布前缺少统一 preflight 命令，依赖人工抽检。

## 责任与改进
- 测试侧：新增编码检查脚本，纳入发布前门禁。
- 产品/流程侧：强化发布前 No-Go 条件，问题未清零不放行。
- 工程侧：新增 `npm run preflight`，统一执行 type-check/lint/build/encoding-check。

## 已落地
- `scripts/check-encoding.ps1`
- `package.json` scripts:
  - `check:encoding`
  - `preflight`
