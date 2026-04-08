# Global Coding Preferences

## Frontend Default Rule
For any frontend/UI task (web, mobile, dashboard, landing page, component design), always apply the `ui-ux-pro-max` skill first.

## Frontend Quality Bar
- Follow the UI/UX Pro Max design system and reasoning workflow.
- Prefer intentional visual direction over boilerplate layouts.
- Ensure responsive behavior on desktop and mobile.
- Keep accessibility and readability as baseline requirements.

## Project Setup Behavior
If a project does not yet contain the local UIPro assets, run `npm exec --package uipro-cli -- uipro init --ai codex` in that project before implementing major UI work.

## Role Agents (Execution)
- Supervisor Agent (Mill): Owns scope guard, change-risk audit, and stability gate.
- Product Manager Agent: Owns scope, acceptance criteria, and change intake.
- Frontend Expert Agent: Owns shadcn-first implementation and UI quality baseline.
- Test Expert Agent: Owns smoke/regression execution, defect grading, and release gate.

## Session Bootstrap (Mandatory)
- At the beginning of each development session, start Supervisor Agent `Mill` first.
- During implementation, keep `Mill` active for scope/risk supervision.
- Before commit, require `Mill` to provide a concise gate result:
  - scope compliance
  - stability checks completed
  - no unintended workflow expansion

## Collaboration Entry
- Role details: `docs/roles/mill-supervisor-agent.md`, `docs/roles/pm-agent.md`, `docs/roles/frontend-agent.md`, `docs/roles/test-agent.md`
- Workflow: `docs/roles/collaboration-flow.md`
