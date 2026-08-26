# Kunal Tyagi Portfolio — Design (2026-08-26)

**Status:** Approved by user. Full implementation plan: `docs/superpowers/plans/2026-08-26-portfolio.md`

## Goal
Dark, card-based single-page developer portfolio (Vite + React 19 + Tailwind CSS v4) with an embedded on-page resume and one shared full-screen PDF viewer modal used for both the resume and all certificates.

## Architecture
- One section = one component under `src/components/`; all content centralized in `src/data.js`.
- App-level state `{ resumeOpen, activeCert }` drives a single shared `PdfModal({ src, title, onClose })` — Esc-close, backdrop-close, scroll-lock, focus management.
- Scroll-reveal via `useReveal` IntersectionObserver hook + `.reveal` CSS with `prefers-reduced-motion` fallback.
- Vitest + Testing Library: asset-integrity tests (every data.js path exists on disk) + PdfModal + App wiring tests.

## Visual Language
slate-950 bg · slate-900/60 glassy cards · border-slate-800 · indigo→cyan gradient accents only · Inter font · rounded-2xl cards · hover glow/lift.

## Key Decisions
- Vite over Next.js (static portfolio, no SSR needs) — user-approved.
- Certificates are PDFs → cert modals render native-PDF viewers, not `<img>` (user-approved).
- Real URLs provided by user: LinkedIn /in/kunal-tyagi1806, GitHub @kunal-1806; repo links on RAG-chatbot and Claude-clone project cards.

## Verification
`npm test`, `npm run lint`, `npm run build`, plus manual dev-server walkthrough of every section/modal at desktop + mobile widths.
