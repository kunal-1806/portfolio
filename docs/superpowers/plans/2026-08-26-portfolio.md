# Kunal Tyagi Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dark, card-based single-page developer portfolio for Kunal Tyagi (Vite + React + Tailwind v4) with an embedded on-page resume and one shared full-screen PDF viewer modal used for both the resume and all certificates.

**Architecture:** One section = one component under `src/components/`. ALL content lives in `src/data.js` — components never hardcode copy. App-level state `{ resumeOpen, activeCert }` drives a single shared `PdfModal`. Scroll-reveal via tiny `useReveal` IntersectionObserver hook.

**Tech Stack:** React 19, Vite 7, Tailwind CSS v4 (`@tailwindcss/vite`), lucide-react, Vitest + Testing Library (jsdom), ESLint 9 flat config.

## Global Constraints

- Palette: `slate-950` page bg, `slate-900/60` cards, `border-slate-800`, indigo→cyan gradient accents only.
- Exact spec strings preserved verbatim: name "Kunal Tyagi"; email kunaltyagi1606@gmail.com; phone +91-7599429696; location Punjab, India; CGPA 8.80; LPU B.Tech CSE (Aug 2025 – Present); Indraprastha Public School Intermediate 80% (Aug 2022 – Mar 2024); certs: "DBMS Part - 1" (Infosys, Feb 2026, /cert-dbms.pdf), "Data Analysis with Pandas & Python" (Infosys, Mar 2026, /cert-pandas.pdf), "Programming Fundamentals using Python" (Infosys, June 2025, /cert-python.pdf); achievement "Solved 150+ Python programming problems on Codetantra" (Jan 2025); download link `/cv-pel134.pdf`; resume iframe class `w-full h-[800px] rounded-xl border border-slate-800`.
- Real profile URLs (user-provided): LinkedIn `https://www.linkedin.com/in/kunal-tyagi1806/`, GitHub `https://github.com/kunal-1806`. No TODO placeholders anywhere.
- Project cards with a known repo render a GitHub icon link: RAG chatbot → `https://github.com/kunal-1806/rag--chatbot-`, Terminal AI assistant → `https://github.com/kunal-1806/Claude-clone`; third project has none.
- Certificates are PDFs → cert modal renders embedded native-PDF viewer via shared PdfModal (user-approved deviation from "image preview").
- Every task ends in a commit. Tests red→green where behavior exists.
- Locked interfaces: `PdfModal({ src, title, onClose })`, `Hero({ onOpenResume })`, `Certifications({ onOpenCert })`; section ids `#about #skills #projects #certifications #resume #education`.
- Project root: `/Users/kunaltyagi/resume`

---

### Task 0: Repo init + docs

**Files:**
- Create: `.gitignore`, copy of this plan at `docs/superpowers/plans/2026-08-26-portfolio.md`, design summary at `docs/superpowers/specs/2026-08-26-portfolio-design.md`

**Steps**
- [ ] `git init` inside `/Users/kunaltyagi/resume`
- [ ] `.gitignore`: `node_modules/`, `dist/`, `.superpowers/`
- [ ] Copy plan + write short design doc; commit: `chore: add design docs and implementation plan`

---

### Task 1: Scaffold Vite + React + Tailwind v4

**Files:**
- Create: `package.json`, `vite.config.js`, `eslint.config.js`, `index.html`, `public/favicon.svg`, `src/main.jsx`, `src/index.css`, `src/App.jsx` (placeholder), `src/test/setup.js`

**Interfaces:**
- Produces: runnable dev server/build; `npm test` wired to vitest; Tailwind v4 pipeline.

- [ ] **Step 1: Write package.json**

```json
{
  "name": "kunal-tyagi-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run"
  }
}
```

Then install deps (let npm resolve latest compatible):
```bash
npm install react react-dom lucide-react
npm install -D vite @vitejs/plugin-react tailwindcss@^4 @tailwindcss/vite@^4 vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh globals
```

- [ ] **Step 2: Write vite.config.js**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
  },
})
```

- [ ] **Step 3: Write eslint.config.js**

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: { ecmaVersion: 'latest', ecmaFeatures: { jsx: true }, sourceType: 'module' },
    },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
]
```

- [ ] **Step 4: Write index.html**

```html
<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Kunal Tyagi — AI & Backend Developer. RAG systems, terminal coding assistants, reliable backend systems." />
    <title>Kunal Tyagi — Developer Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Write public/favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="#0f172a"/>
  <text x="50" y="70" font-size="54" text-anchor="middle" fill="#818cf8" font-family="sans-serif" font-weight="bold">K</text>
</svg>
```

- [ ] **Step 6: Write src/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 7: Write src/index.css**

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

body {
  background-color: #020617;
  color: #e2e8f0;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background-color: rgba(99, 102, 241, 0.4);
}

::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #020617; }
::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 8px; }
::-webkit-scrollbar-thumb:hover { background: #334155; }

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .reveal { transition: none; transform: none; opacity: 1; }
}
```

- [ ] **Step 8: Write src/test/setup.js**

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 9: Placeholder src/App.jsx**

```jsx
export default function App() {
  return (
    <div className="min-h-screen">
      <h1 className="p-10 text-3xl font-bold">Kunal Tyagi</h1>
    </div>
  )
}
```

- [ ] **Step 10: Verify + commit**

Run: `npm run build && npm run lint` → both exit 0.
```bash
git add -A && git commit -m "feat: scaffold Vite + React + Tailwind v4 project"
```

---

### Task 2: public/ PDFs + data.js + asset-integrity tests

**Files:**
- Create: `src/data.js`, `src/data.test.js`
- Copy (not move): root PDFs into `public/` (`cert-dbms.pdf`, `cert-pandas.pdf`, `cert-python.pdf`, `cv-pel134.pdf`) + duplicate `cv-pel134.pdf` → `public/resume.pdf`

**Interfaces:**
- Produces (consumed by every later task): exports `PROFILE`, `SKILLS`, `PROJECTS`, `CERTIFICATES`, `EDUCATION`, `ACHIEVEMENTS`, `RESUME`.

- [ ] **Step 1: RED — write failing test first (src/data.test.js)**

```js
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { CERTIFICATES, RESUME } from './data'

const publicDir = path.join(process.cwd(), 'public')

describe('asset integrity', () => {
  it.each(CERTIFICATES.map((c) => [c.title, c.src]))('%s file exists on disk', (_title, src) => {
    expect(fs.existsSync(path.join(publicDir, src))).toBe(true)
  })

  it('resume view file exists (/resume.pdf)', () => {
    expect(fs.existsSync(path.join(publicDir, RESUME.viewSrc))).toBe(true)
  })

  it('resume download file exists (/cv-pel134.pdf)', () => {
    expect(fs.existsSync(path.join(publicDir, RESUME.downloadHref))).toBe(true)
  })
})
```

- [ ] **Step 2: Run to verify RED** — `npx vitest run src/data.test.js` → FAIL (cannot resolve ./data)

- [ ] **Step 3: GREEN — copy assets + write data.js**

```bash
cp cert-dbms.pdf cert-pandas.pdf cert-python.pdf cv-pel134.pdf public/
cp cv-pel134.pdf public/resume.pdf
```

```js
// src/data.js — single source of truth for ALL site content.

export const PROFILE = {
  name: 'Kunal Tyagi',
  role: 'AI & Backend Developer',
  bio: 'I focus on building Retrieval-Augmented Generation (RAG) models, terminal coding assistants, and reliable backend systems.',
  email: 'kunaltyagi1606@gmail.com',
  phone: '+91-7599429696',
  location: 'Punjab, India',
  linkedin: 'https://www.linkedin.com/in/kunal-tyagi1806/',
  github: 'https://github.com/kunal-1806',
}

export const SKILLS = [
  { category: 'Languages', items: ['Python', 'C'] },
  { category: 'Frameworks & Libs', items: ['LangChain', 'LangGraph', 'FastAPI', 'Streamlit', 'Chromadb'] },
  { category: 'Databases', items: ['PostgreSQL', 'SQL'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Linux', 'VS Code'] },
  { category: 'Core CS & Soft Skills', items: ['DSA', 'OOP', 'DBMS', 'OS', 'Computer Networks', 'Analytical Thinking', 'Collaboration', 'Persistence', 'Innovation'] },
]

export const PROJECTS = [
  {
    title: 'RAG Based Chatbot',
    date: 'Feb 2026',
    repo: 'https://github.com/kunal-1806/rag--chatbot-',
    points: [
      'Vector embeddings for semantic document understanding',
      'Similarity search across embedded knowledge base',
      'Chunking / indexing pipeline for fast retrieval',
      'Dynamic context retrieval for accurate answers',
    ],
    tech: ['Python', 'Streamlit', 'LangChain', 'Chromadb'],
  },
  {
    title: 'Terminal-Based AI Coding Assistant',
    date: 'Nov 2025',
    repo: 'https://github.com/kunal-1806/Claude-clone',
    points: [
      'File I/O automation inside the terminal',
      'Context retrieval across project files',
      'Streaming API responses in real time',
      'Dynamic window management with interactive UI',
    ],
    tech: ['Python', 'rich', 'click'],
  },
  {
    title: 'Adaptive Frequency-Hopping 2-Way Communication System',
    date: 'Mar 2025',
    points: [
      'ESP32 & Arduino Nano dual-microcontroller setup',
      'Dynamic multi-band RF transmission',
    ],
    tech: ['ESP32', 'Arduino Nano'],
  },
]

export const CERTIFICATES = [
  { title: 'DBMS Part - 1', issuer: 'Infosys', date: 'Feb 2026', src: '/cert-dbms.pdf' },
  { title: 'Data Analysis with Pandas & Python', issuer: 'Infosys', date: 'Mar 2026', src: '/cert-pandas.pdf' },
  { title: 'Programming Fundamentals using Python', issuer: 'Infosys', date: 'June 2025', src: '/cert-python.pdf' },
]

export const EDUCATION = [
  { school: 'Lovely Professional University', degree: 'B.Tech CSE', score: 'CGPA: 8.80', period: 'Aug 2025 – Present' },
  { school: 'Indraprastha Public School', degree: 'Intermediate', score: '80%', period: 'Aug 2022 – Mar 2024' },
]

export const ACHIEVEMENTS = [
  { text: 'Solved 150+ Python programming problems on Codetantra', date: 'Jan 2025' },
]

export const RESUME = {
  viewSrc: '/resume.pdf',
  downloadHref: '/cv-pel134.pdf',
}
```

- [ ] **Step 4: Run to verify GREEN** — `npm test` → 5 passing
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: centralize content data with asset integrity tests"`

---

### Task 3: Shared PdfModal component (TDD)

**Files:**
- Create: `src/components/PdfModal.jsx`, `src/components/PdfModal.test.jsx`

**Interfaces:**
- Produces: `PdfModal({ src, title, onClose })` — consumed by Task 9 (App) for resume AND certificates.

- [ ] **Step 1: RED — write failing test**

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PdfModal from './PdfModal'

describe('PdfModal', () => {
  it('renders an iframe with the given src and title', () => {
    render(<PdfModal src="/resume.pdf" title="Resume" onClose={() => {}} />)
    expect(screen.getByTitle('Resume')).toHaveAttribute('src', '/resume.pdf')
  })

  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn()
    render(<PdfModal src="/x.pdf" title="X" onClose={onClose} />)
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when the Close button is clicked', async () => {
    const onClose = vi.fn()
    render(<PdfModal src="/x.pdf" title="X" onClose={onClose} />)
    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('locks body scroll while open and restores it after unmount', () => {
    const { unmount } = render(<PdfModal src="/x.pdf" title="X" onClose={() => {}} />)
    expect(document.body.style.overflow).toBe('hidden')
    unmount()
    expect(document.body.style.overflow).toBe('')
  })
})
```

- [ ] **Step 2: Verify RED** — `npx vitest run src/components/PdfModal.test.jsx` → FAIL (module not found)

- [ ] **Step 3: GREEN — implement PdfModal.jsx**

```jsx
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function PdfModal({ src, title, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div className="mx-auto mb-4 flex w-full max-w-5xl items-center justify-between">
        <h3 className="truncate pr-4 text-lg font-semibold text-slate-100">{title}</h3>
        <button
          ref={closeRef}
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          aria-label="Close viewer"
          className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-indigo-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Close <X size={16} />
        </button>
      </div>
      <div
        className="mx-auto flex w-full max-w-5xl flex-1 overflow-hidden rounded-xl border border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe src={src} title={title} className="h-full min-h-[80vh] w-full bg-white" />
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Verify GREEN** — `npm test` → all passing, output pristine
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: shared full-screen PDF viewer modal"`

---

### Task 4: useReveal hook + SectionHeading

**Files:**
- Create: `src/hooks/useReveal.js`, `src/components/SectionHeading.jsx`

**Interfaces:**
- Produces: `useReveal()` → returns ref to attach to any section root (adds `.reveal-visible` once ≥12% visible).
- Produces: `SectionHeading({ eyebrow, title })` used by About/Skills/Projects/Certifications/Resume/Education.

- [ ] **Step 1: useReveal.js**

```js
import { useEffect, useRef } from 'react'

export default function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
```

- [ ] **Step 2: SectionHeading.jsx**

```jsx
export default function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-12 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">{title}</h2>
    </div>
  )
}
```

- [ ] **Step 3: Verify** — `npm run build && npm run lint` exit 0
- [ ] **Step 4: Commit** — `git commit -am "feat: scroll-reveal hook and shared section heading"`

---

### Task 5: Navbar + Hero (header & contact)

**Files:**
- Create: `src/components/Navbar.jsx`, `src/components/Hero.jsx`

**Interfaces:**
- Consumes: `PROFILE`, `RESUME` from data.js; `useReveal`; lucide icons.
- Produces: `Hero({ onOpenResume })` — App passes `() => setResumeOpen(true)`.

- [ ] **Step 1: Navbar.jsx**

```jsx
import { Code2 } from 'lucide-react'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#resume', label: 'Resume' },
  { href: '#education', label: 'Education' },
]

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950">
            <Code2 size={18} />
          </span>
          Kunal&nbsp;<span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">Tyagi</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-slate-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#resume"
          className="rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-90 md:hidden"
        >
          Resume
        </a>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Hero.jsx**

```jsx
import { Mail, Phone, MapPin, Linkedin, Github, Eye, Download } from 'lucide-react'
import { PROFILE, RESUME } from '../data'
import useReveal from '../hooks/useReveal'

const chipClass =
  'inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-4 py-1.5 transition hover:border-indigo-500/50'

export default function Hero({ onOpenResume }) {
  const ref = useReveal()

  return (
    <section
      id="top"
      ref={ref}
      className="reveal mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 pt-16 text-center sm:px-6"
    >
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
        {PROFILE.role}
      </span>

      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
        <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
          {PROFILE.name}
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">{PROFILE.bio}</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300">
        <a href={`mailto:${PROFILE.email}`} className={chipClass}>
          <Mail size={15} className="text-indigo-400" /> {PROFILE.email}
        </a>
        <a href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`} className={chipClass}>
          <Phone size={15} className="text-indigo-400" /> {PROFILE.phone}
        </a>
        <span className={chipClass}>
          <MapPin size={15} className="text-indigo-400" /> {PROFILE.location}
        </span>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={onOpenResume}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-indigo-500/40"
        >
          <Eye size={18} /> View Resume
        </button>
        <a
          href={RESUME.downloadHref}
          download
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-indigo-500/60 hover:text-white"
        >
          <Download size={18} /> Download Resume
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 text-slate-400 transition hover:-translate-y-0.5 hover:border-indigo-500/60 hover:text-white"
        >
          <Linkedin size={18} />
        </a>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 text-slate-400 transition hover:-translate-y-0.5 hover:border-indigo-500/60 hover:text-white"
        >
          <Github size={18} />
        </a>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify** — `npm run build && npm run lint` exit 0
- [ ] **Step 4: Commit** — `git commit -am "feat: sticky navbar and hero contact header"`

---

### Task 6: About + Skills

**Files:**
- Create: `src/components/About.jsx`, `src/components/Skills.jsx`

**Interfaces:**
- Consumes: `PROFILE`, `SKILLS`; `SectionHeading`; `useReveal`; lucide icons.

- [ ] **Step 1: About.jsx**

```jsx
import { MapPin, GraduationCap, Award } from 'lucide-react'
import { PROFILE } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

const FACTS = [
  { icon: MapPin, label: 'Location', value: 'Punjab, India' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE at Lovely Professional University' },
  { icon: Award, label: 'CGPA', value: '8.80' },
]

const cardClass =
  'rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" ref={ref} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Who I Am" title="About Me" />

      <div className="grid gap-6 sm:grid-cols-3">
        {FACTS.map(({ icon: Icon, label, value }) => (
          <div key={label} className={cardClass}>
            <Icon size={24} className="mb-4 text-indigo-400" />
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</p>
            <p className="mt-1 font-medium text-slate-200">{value}</p>
          </div>
        ))}
      </div>

      <div className={`${cardClass} mt-6`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Bio</p>
        <p className="mt-2 leading-relaxed text-slate-300">{PROFILE.bio}</p>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Skills.jsx**

```jsx
import { Braces, Layers, Database, Wrench, BrainCircuit } from 'lucide-react'
import { SKILLS } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

const CATEGORY_ICONS = [Braces, Layers, Database, Wrench, BrainCircuit]

const cardClass =
  'rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10'

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" ref={ref} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="What I Work With" title="Skills" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map(({ category, items }, i) => {
          const Icon = CATEGORY_ICONS[i % CATEGORY_ICONS.length]
          return (
            <div key={category} className={cardClass}>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Icon size={20} />
                </span>
                <h3 className="font-semibold text-slate-100">{category}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-slate-700/60 bg-slate-800/60 px-3 py-1.5 text-sm text-slate-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify + commit** — `npm run build && npm run lint` exit 0; `git commit -am "feat: about quick facts and skills grid"`

---

### Task 7: Projects + Education

**Files:**
- Create: `src/components/Projects.jsx`, `src/components/Education.jsx`

**Interfaces:**
- Consumes: `PROJECTS`, `EDUCATION`; `SectionHeading`; `useReveal`; lucide icons.

- [ ] **Step 1: Projects.jsx** — note the article className MUST be `` className={`${cardClass} flex flex-col`} `` (template literal), not `className={`cardClass flex flex-col`}`.

```jsx
import { ChevronRight, CalendarDays, Github } from 'lucide-react'
import { PROJECTS } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

const cardClass =
  'group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10'

export default function Projects() {
  const ref = useReveal()

  return (
    <section id="projects" ref={ref} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="What I've Built" title="Featured Projects" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map(({ title, date, repo, points, tech }) => (
          <article key={title} className={`${cardClass} flex flex-col`}>
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="font-semibold leading-snug text-slate-100">{title}</h3>
              <div className="flex shrink-0 items-center gap-2">
                {repo && (
                  <a
                    href={repo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${title} — source code on GitHub`}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-400 transition hover:border-indigo-500/60 hover:text-white"
                  >
                    <Github size={14} />
                  </a>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                  <CalendarDays size={12} /> {date}
                </span>
              </div>
            </div>
            <ul className="mb-5 space-y-2 text-sm text-slate-400">
              {points.map((point) => (
                <li key={point} className="flex gap-2">
                  <ChevronRight size={15} className="mt-0.5 shrink-0 text-indigo-400" />
                  {point}
                </li>
              ))}
            </ul>
            <ul className="mt-auto flex flex-wrap gap-2 border-t border-slate-800 pt-4">
              {tech.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-cyan-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Education.jsx**

```jsx
import { GraduationCap } from 'lucide-react'
import { EDUCATION } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

export default function Education() {
  const ref = useReveal()

  return (
    <section id="education" ref={ref} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Where I Studied" title="Education" />

      <ol className="relative space-y-8 border-l border-slate-800 pl-8">
        {EDUCATION.map(({ school, degree, score, period }) => (
          <li key={school} className="relative">
            <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950">
              <GraduationCap size={12} />
            </span>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-indigo-500/50">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-slate-100">{school}</h3>
                <span className="text-sm text-slate-500">{period}</span>
              </div>
              <p className="mt-1 text-slate-300">
                {degree} · <span className="font-medium text-cyan-300">{score}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
```

- [ ] **Step 3: Verify + commit** — `npm run build && npm run lint` exit 0; `git commit -am "feat: featured projects and education timeline"`

---

### Task 8: Certifications + ResumeSection + Footer

**Files:**
- Create: `src/components/Certifications.jsx`, `src/components/ResumeSection.jsx`, `src/components/Footer.jsx`

**Interfaces:**
- Consumes: `CERTIFICATES`, `ACHIEVEMENTS`, `RESUME`. Does NOT import PdfModal — calls `onOpenCert(cert)`.
- Produces: `Certifications({ onOpenCert })`.

- [ ] **Step 1: Certifications.jsx**

```jsx
import { ArrowUpRight, FileBadge2, Trophy } from 'lucide-react'
import { CERTIFICATES, ACHIEVEMENTS } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

const cardClass =
  'w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-left transition hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'

export default function Certifications({ onOpenCert }) {
  const ref = useReveal()

  return (
    <section id="certifications" ref={ref} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Credentials" title="Certifications & Achievements" />

      <div className="grid gap-6 md:grid-cols-3">
        {CERTIFICATES.map(({ title, issuer, date, src }) => (
          <button key={src} type="button" onClick={() => onOpenCert({ title, issuer, date, src })} className={cardClass}>
            <FileBadge2 size={26} className="mb-4 text-indigo-400" />
            <h3 className="font-semibold leading-snug text-slate-100">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {issuer} · {date}
            </p>
            <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-300">
              View certificate <ArrowUpRight size={15} />
            </p>
          </button>
        ))}
      </div>

      {ACHIEVEMENTS.map(({ text, date }) => (
        <div
          key={text}
          className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950">
            <Trophy size={20} />
          </span>
          <p className="font-medium text-slate-200">{text}</p>
          <span className="ml-auto rounded-full border border-indigo-500/30 px-3 py-1 text-xs text-indigo-300">{date}</span>
        </div>
      ))}
    </section>
  )
}
```

- [ ] **Step 2: ResumeSection.jsx**

```jsx
import { Download } from 'lucide-react'
import { RESUME } from '../data'
import SectionHeading from './SectionHeading'
import useReveal from '../hooks/useReveal'

export default function ResumeSection() {
  const ref = useReveal()

  return (
    <section id="resume" ref={ref} className="reveal mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Resume" title="Resume / CV" />

      <div className="flex justify-center">
        <a
          href={RESUME.downloadHref}
          download
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-indigo-500/40"
        >
          <Download size={18} /> Download PDF
        </a>
      </div>

      <iframe
        src={RESUME.viewSrc}
        title="Kunal Tyagi — Resume"
        className="mt-10 h-[800px] w-full rounded-xl border border-slate-800"
      />

      <p className="mt-3 text-center text-sm text-slate-500">
        PDF not loading?{' '}
        <a href={RESUME.downloadHref} download className="text-indigo-400 transition hover:text-indigo-300">
          Download it instead
        </a>
        .
      </p>
    </section>
  )
}
```

- [ ] **Step 3: Footer.jsx**

```jsx
import { Code2 } from 'lucide-react'
import { PROFILE } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-sm text-slate-500 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-bold text-slate-300">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-slate-950">
            <Code2 size={14} />
          </span>
          {PROFILE.name}
        </a>
        <p>
          © {new Date().getFullYear()} {PROFILE.name} · Built with React &amp; Tailwind CSS
        </p>
        <a href={`mailto:${PROFILE.email}`} className="transition hover:text-indigo-300">
          {PROFILE.email}
        </a>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Verify + commit** — `npm run build && npm run lint` exit 0; `git commit -am "feat: certifications with pdf modals, embedded resume, footer"`

---

### Task 9: App wiring + full verification

**Files:**
- Modify: `src/App.jsx` (replace placeholder)
- Test: `src/App.test.jsx`

**Interfaces:**
- Consumes everything above. Renders `{resumeOpen && <PdfModal …/>}` and `{activeCert && <PdfModal …/>}`.

- [ ] **Step 1: RED — App.test.jsx**

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the hero name', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Kunal Tyagi')
  })

  it('View Resume opens the resume modal and Close dismisses it', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: /view resume/i }))
    expect(screen.getByRole('dialog', { name: /Kunal Tyagi — Resume/i })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /close viewer/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Verify RED**, then implement App.jsx:

```jsx
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import ResumeSection from './components/ResumeSection'
import Education from './components/Education'
import Footer from './components/Footer'
import PdfModal from './components/PdfModal'
import { RESUME } from './data'

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false)
  const [activeCert, setActiveCert] = useState(null)

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <Hero onOpenResume={() => setResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Certifications onOpenCert={setActiveCert} />
        <ResumeSection />
        <Education />
      </main>
      <Footer />

      {resumeOpen && (
        <PdfModal
          src={RESUME.viewSrc}
          title="Kunal Tyagi — Resume"
          onClose={() => setResumeOpen(false)}
        />
      )}
      {activeCert && (
        <PdfModal
          src={activeCert.src}
          title={`${activeCert.title} — ${activeCert.issuer}`}
          onClose={() => setActiveCert(null)}
        />
      )}
    </div>
  )
}
```

- [ ] **Step 3: Full verification** — `npm test` all green pristine; `npm run lint` clean; `npm run build` exit 0; manual walkthrough via `npm run dev`: every section renders, View Resume modal opens/closes (Esc, backdrop, button), each certificate opens its correct PDF, download links hit `/cv-pel134.pdf`, layout holds at 375px width.
- [ ] **Step 4: Final commit** — `git commit -am "feat: wire app state, modals, and full page composition"`
