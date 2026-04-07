# Phase 1 Release Notes

## Release Summary
Phase 1 delivers a static, type-safe Research Workbench UI with six top-level pages, shared components, mock data contracts, and full loading/empty/error display states.

## Included in This Release
- Next.js + TypeScript + Tailwind + shadcn/ui style component baseline
- Global layout: Sidebar + Header + Main content shell
- Top-level routes:
  - `/` (Dashboard)
  - `/capability-map`
  - `/timeline`
  - `/insights`
  - `/reports`
  - `/settings`
- Mock-data-driven rendering aligned to `docs/data-contract.md`
- Chinese label mapping for user-visible enum values
- Context-aware page linking between Dashboard, Timeline, Insights, Reports
- Settings static panel (no complex editor)

## Explicitly Not Included
- Real source crawling and scheduling
- Database or persistence layer
- AI processing pipeline (summary/classification/insight generation)
- Auth and enterprise management modules

## Demo Highlights
1. Dashboard to Timeline context navigation via highlight cards
2. Timeline query context (`topic`, `item_id`) behavior
3. Insight detail switch by `id` query
4. Report detail switch by `id` query
5. Per-page state simulation via `?state=loading|empty|error`

## Known Environment Notes
- Some local environments may have dependency encoding anomalies in `node_modules`.
- Project source is type-safe (`npm run type-check`), but if lint/build fails unexpectedly, reinstall dependencies in a clean environment.

## Next Candidate Scope (Phase 2)
- API adapter layer on top of current contracts
- Read-only real datasource integration
- Basic backend contract mocking endpoint
