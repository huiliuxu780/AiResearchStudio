# Phase 1 Runbook

## Prerequisites
- Node.js and npm available in PATH
- Project root: `E:\AiResearchStudio`

## Install
```powershell
npm install
```

## Start Development Server (avoid port 3000)
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
npm run demo:check
```

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
- PM: `docs/roles/pm-agent.md`
- Frontend: `docs/roles/frontend-agent.md`
- Test: `docs/roles/test-agent.md`
- Workflow: `docs/roles/collaboration-flow.md`


