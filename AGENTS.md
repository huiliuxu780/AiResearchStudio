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
- Product Manager Agent: Owns scope, acceptance criteria, and change intake.
- Frontend Expert Agent: Owns shadcn-first implementation and UI quality baseline.
- Test Expert Agent: Owns smoke/regression execution, defect grading, and release gate.

## Collaboration Entry
- Role details: `docs/roles/pm-agent.md`, `docs/roles/frontend-agent.md`, `docs/roles/test-agent.md`
- Workflow: `docs/roles/collaboration-flow.md`
