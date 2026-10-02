---
name: feature-driven-structure
description: Enforces this project's feature-driven folder structure (components, hooks, services, types, constants per feature). Use whenever adding, moving, or refactoring any page, section, component, hook, API call, type, or static content in src/, or when asked where code should live.
---

# Feature-driven structure

Code is grouped by **feature**, not by technical kind. Each feature owns everything it needs.

```
src/
  app/                      # routing only: layout.tsx, page.tsx, route handlers. Compose features, no logic/data here.
  components/ui/            # shadcn primitives only (add via shadcn CLI)
  hooks/  lib/              # truly global hooks / utilities (cn, use-mobile)
  features/
    <feature>/              # e.g. home, auth, analysis, blogs
      components/           # UI used by this feature (kebab-case.tsx, default export)
      hooks/                # use-*.ts hooks used only by this feature
      services/             # data access: fetch/API/server actions, mapping responses to types
      types/                # index.ts - interfaces/types for this feature
      constants/            # static content & config (lists, nav links, copy), no JSX
      utils/                # (optional) pure helpers for this feature
    shared/                 # same sub-folders, but used by 2+ features (navbar, footer, section-header)
```

Create a sub-folder only when it has content; don't add empty ones.

## Rules

1. **Placement**: if only one feature uses it, it lives in that feature. When a second feature needs it, move it to `features/shared/` (don't import across features).
2. **Dependencies flow one way**: `app` -> `features/*` -> `features/shared` / `components/ui` / `lib`. A feature never imports from another feature, and `shared` never imports from a feature.
3. **Components are presentational**: no hard-coded content arrays, no fetching. Content goes in `constants/`, remote data in `services/`, props/data shapes in `types/`.
4. **Types**: declare in `types/index.ts`, import with `@/features/<feature>/types`. Never export types from component files.
5. **Constants**: `export const` in `constants/<topic>.ts` (kebab-case file, camelCase names, typed with the feature's types). Icons (component references) are fine there.
6. **Services**: plain async functions (`getBlogs()`), no React, return typed data. Components (server) call them directly; client components go through a hook in `hooks/`.
7. **Hooks**: `use-*.ts`, client-only logic. Add `"use client"` where needed.
8. **Imports**: always use the `@/` alias (`@/features/home/constants/plans`), no deep relative `../../`. Same-folder `./x` is fine.
9. **Server by default**: add `"use client"` only to components/hooks that need state, effects or browser APIs.
10. `app/page.tsx` stays thin: import section components and render them in order.

## Adding a new feature (checklist)

1. `src/features/<name>/components/` with the components.
2. Move any inline arrays to `constants/`, any interfaces to `types/index.ts`.
3. Add `services/` / `hooks/` only if data fetching or client logic exists.
4. Wire into `src/app/<route>/page.tsx`.
5. Run `npm run lint` and `npx tsc --noEmit`.

## Refactoring existing code

For each component, look for: inline data arrays -> `constants/`; exported interfaces -> `types/`; fetch/API calls -> `services/`; stateful logic -> `hooks/`; things used by multiple features -> `shared/`. Move, fix imports, and verify the build still passes with no behaviour change.
