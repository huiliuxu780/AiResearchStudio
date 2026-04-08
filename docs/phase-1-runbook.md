# Phase 1 Runbook

## Prerequisites
- Node.js and npm available in PATH
- Project root: `E:\AiResearchStudio`

## Install
```powershell
npm install
```

## Start Development Server (fixed port)
```powershell
npm run dev
```
- URL: `http://localhost:4000`

## Stop Server (Windows)
```powershell
netstat -ano | findstr ":4000 "
taskkill /PID <PID> /F
```

## Quality Checks
```powershell
npm run type-check
npm run lint
npm run build
npm run preflight
npm run demo:check
```

## Preflight Gate
`npm run preflight` includes:
- `type-check`
- `lint`
- `build`
- `check:encoding`
- `check:query-scope`
- `check:query-links`

## Demo Check Coverage
`npm run demo:check` now covers:
- Route status checks
- Journey checks (`/ -> /timeline -> /insights -> /reports -> /settings`)
- Semantic fallback checks (`topic / item_id / id / state`)
- Warmup + retry to reduce local cold-start flakiness

## Manual Demo Route Set
- `/`
- `/capability-map`
- `/timeline`
- `/timeline?topic=workflow`
- `/insights`
- `/insights?id=ins_401`
- `/reports`
- `/reports?id=rep_2026w14`
- `/settings`

## State Simulation Routes
Append `?state=loading`, `?state=empty`, or `?state=error` to any top-level route.
Examples:
- `/timeline?state=loading`
- `/insights?state=empty`
- `/reports?state=error`

## Role Collaboration References
- Supervisor: `docs/roles/mill-supervisor-agent.md`
- PM: `docs/roles/pm-agent.md`
- Frontend: `docs/roles/frontend-agent.md`
- Test: `docs/roles/test-agent.md`
- Workflow: `docs/roles/collaboration-flow.md`

## Reference Docs
- Shared Components API: `docs/shared-components-api.md`
- Page Query Params Spec: `docs/page-query-params-spec.md`