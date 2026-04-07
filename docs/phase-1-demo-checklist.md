# Phase 1 Demo Checklist

## Scope Lock
- Keep this phase as static research workbench UI only.
- No crawler, no database, no AI processing pipeline.
- Route `/` is Dashboard and must remain the homepage.

## Route Checklist
- `/` Dashboard
- `/capability-map`
- `/timeline`
- `/insights`
- `/reports`
- `/settings`

## Visual Checklist
- Dark AI-native dashboard direction is consistent across all pages.
- Sidebar, header, and content containers share the same spacing system.
- Chinese labels are visible for all user-facing fields.
- Mobile layout remains usable for navigation and cards.

## Interaction Checklist
- Dashboard cards can navigate to Timeline/Insights context.
- Timeline supports query-based context (`topic`, `item_id`) and fallback display.
- Insights supports query-based selection (`id`) and evidence panel update.
- Reports supports query-based selection (`id`) and detail panel update.
- Loading/empty/error states are available on every top-level page via `?state=`.

## Mock Data Checklist
- API-shaped fields use `snake_case`.
- Enum values follow `docs/data-contract.md`.
- Label mapping is handled in UI through `src/lib/label-maps.ts`.

## What Is Intentionally Deferred
- Real source ingestion and scheduler execution.
- Editable rule engine in Settings.
- Authentication, multi-tenant, and enterprise workflow modules.

## Quick Demo Script
1. Open `/` and click a highlighted dynamic item to jump to Timeline context.
2. In Timeline, verify context bar and filtered sequence behavior.
3. Open an Insight card and validate evidence list updates by selected `id`.
4. Open Reports and switch report by URL query `id`.
5. Append `?state=loading`, `?state=empty`, `?state=error` to each page URL.
