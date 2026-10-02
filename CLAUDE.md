# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)

No test runner is configured.

## Stack

Next.js 16 (App Router, `src/app`), React 19, Tailwind CSS v4 (`@tailwindcss/postcss`, config lives in `src/app/globals.css`), TypeScript. Next 16 differs from older versions; consult `node_modules/next/dist/docs/` before using Next APIs (see AGENTS.md).

## Architecture

- Single landing page: `src/app/page.tsx` composes section components from `src/features/home/components/` (hero, about, why-choose-us, services, plans, blogs, banner). `src/app/layout.tsx` wraps every page with the shared `Navbar` and `Footer`.
- Feature-based layout: page-specific components go in `src/features/<feature>/components/`; cross-page pieces (navbar, footer, section-header, auth-links) go in `src/features/shared/components/`.
- `src/components/ui/` holds shadcn components (style `radix-nova`, base color neutral, config in `components.json`). Add new ones with the shadcn CLI rather than hand-writing. Helpers: `cn` in `src/lib/utils.ts`, hooks in `src/hooks/`.
- Path alias `@/*` → `src/*`.
- Font: Century Gothic loaded via `next/font/local` from `public/fonts/` and exposed as the `--font-century-gothic` CSS variable.
- Layout metadata is still the create-next-app default.
