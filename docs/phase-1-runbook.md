# Phase 1 Runbook

## Prerequisites
- Node.js and npm available in PATH
- Project root: `E:\AiResearchStudio`

## Install
```powershell
npm install
```

## Start Development Server
```powershell
npm run dev -- -p 3001`n``` `nDefault URL: `http://localhost:3001`

## Stop Server (Windows)
```powershell
netstat -ano | findstr ":3000 "
taskkill /PID <PID> /F
```

## Useful Commands
```powershell
npm run type-check
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

## Troubleshooting
- Default dev port is set to 3001 to avoid conflicts with other local projects.
- If type check fails, ensure no local file encoding corruption and rerun:
```powershell
npm run type-check
```

