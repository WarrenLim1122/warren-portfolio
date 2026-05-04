# CLAUDE.md — Warren Lim Portfolio

## Standing rules — read before doing anything

1. Read this file before working on this repo.
2. If the task touches `src/journal/`, the `/journal` route, Firebase, Auth, or anything related to the trading journal, **read `JOURNAL_INTEGRATION.md` first**.
3. Do not redo the full journal integration from scratch unless explicitly asked. The integration is complete — only sync changed files.
4. For trading journal update syncs, follow this order:
   - Pull latest from `/Users/warrenlimzhanfeng/trading-journal`
   - Read `AI_STUDIO_RULES.md` and `CHANGELOG.md` from the trading-journal repo if they exist
   - Use `git diff` to identify changed files since the last sync
   - Copy only changed files; run the `@/` → `@journal/` import rewrite on each
   - Re-apply compatibility patches documented in `JOURNAL_INTEGRATION.md §15`
   - Run `npm run lint` — must be zero errors before stopping
5. Never blindly overwrite these portfolio-owned files from a trading-journal sync:
   - `src/App.tsx`
   - `src/main.tsx`
   - `src/index.css`
   - `vite.config.ts`
   - `package.json`
   - `package-lock.json`
   - `vercel.json`
6. If any portfolio-owned file must be changed, explain why before changing it.
7. Run `npm install` only if new dependencies were added in the trading-journal's `package.json`.
8. After a sync, test:
   - `/` — portfolio entry gate and sections
   - `/journal` — redirects to login if unauthenticated
   - `/journal/login` — login page renders
9. After every successful journal sync, provide a summary covering: files changed, dependencies changed, Firebase/Auth/Firestore impact, routing impact, styling impact, and whether a push is needed.
10. After every successful journal sync, remind Warren:

> "Please open `GOOGLE_AI_STUDIO_RESET_PROMPT.md`, copy the full prompt inside, and paste it into Google AI Studio before making the next journal update."

11. Do not generate a reset prompt from scratch — always point to `GOOGLE_AI_STUDIO_RESET_PROMPT.md`.

---

## Project identity

Personal portfolio website for Warren Lim Zhan Feng, a penultimate Banking & Finance undergraduate at NTU Singapore. Deployed at **warrenlimzf.com** via Vercel. The site showcases his professional experience, credentials, case competition wins, and finance research projects.

The trading journal is integrated at `warrenlimzf.com/journal`. Source repo: https://github.com/WarrenLim1122/trading-journal.git. Journal files live in `src/journal/`. See `JOURNAL_INTEGRATION.md` for the full integration record.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 6.2 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| Animations | `motion/react` (import as `motion/react`, NOT `framer-motion`) |
| Routing | `react-router-dom ^7` — BrowserRouter owned by `App.tsx` |
| Icons | `lucide-react` |
| Font | Inter (sans) + Cormorant Garamond (serif) via Google Fonts |
| Deployment | Vercel — `vercel.json` at project root |

---

## Commands

```bash
npm run dev       # dev server on http://localhost:3000
npm run build     # production build → dist/
npm run preview   # serve dist/ locally
npm run lint      # tsc --noEmit (type check only, no ESLint)
npm run clean     # rm -rf dist
```

---

## Architecture — how the app works

`App.tsx` owns a `BrowserRouter`. Two top-level routes:

- `path="/*"` → `<Portfolio />` — the main portfolio (entry gate + all sections)
- `path="/journal/*"` → `<JournalApp />` — the trading journal

### Entry gate pattern

`Portfolio()` manages `isUnlocked` state. On load:
1. `ParticleHero` (`src/components/ui/animated-hero.tsx`) fills the screen as a fixed overlay (`z-[9999]`).
2. User clicks "Enter" → `isUnlocked = true`.
3. The gate animates out (`exit: opacity 0, y: "-100vh"`, 1.2s).
4. The main portfolio scrolls into view.
5. `CursorParticles` canvas overlay activates after unlock.

Do not remove the `AnimatePresence` wrapper around the gate — the exit animation depends on it.

### Scroll-triggered nav icons

`useScroll` from `motion/react` tracks `scrollY`. After 600px, contact icons (email, LinkedIn, phone) animate into the navbar via `AnimatePresence`. These link to `#contacts` inside the Hero section.

### Section order

```
<Hero />            → id="contacts" anchor inside here
<Experience />      → id="experience"
<Certificates />    → id="credentials"
<CaseCompetition /> → no id
<Projects />        → id="work"
<ResumeViewer />    → id="resume"
```

`TechnicalToolkit` exists in `src/components/` but is not rendered in `App.tsx`.

### Journal routing

`JournalApp` (`src/journal/JournalApp.tsx`) uses `<Routes>` only — no nested `BrowserRouter`. Routes inside it are relative to `/journal`:

- `path="login"` → `<Login />` (matches `/journal/login`)
- `index` → `<Dashboard />` guarded by `<ProtectedRoute>` (matches `/journal`)

Unauthenticated access redirects to `/journal/login`. After sign-in, Login navigates to `/journal`.

---

## File structure

```
my-portfolio/
├── CLAUDE.md
├── JOURNAL_INTEGRATION.md
├── GOOGLE_AI_STUDIO_RESET_PROMPT.md
├── index.html
├── vite.config.ts
├── vercel.json
├── tsconfig.json
├── package.json
├── public/               ← static assets served at root
└── src/
    ├── main.tsx            ← entry point
    ├── App.tsx             ← BrowserRouter, route split, Portfolio component
    ├── constants.ts        ← ALL portfolio content data
    ├── index.css           ← Tailwind @theme + global styles + journal shadcn tokens (appended)
    ├── lib/
    │   ├── animations.ts   ← shared motion variants
    │   └── utils.ts        ← cn() helper
    ├── components/
    │   ├── Hero.tsx
    │   ├── Experience.tsx
    │   ├── Certificates.tsx
    │   ├── CaseCompetition.tsx
    │   ├── Projects.tsx
    │   ├── ResumeViewer.tsx
    │   ├── AnimatedCard.tsx
    │   ├── ImageOverlay.tsx
    │   ├── TechnicalToolkit.tsx  ← built but not rendered
    │   └── ui/
    │       ├── animated-hero.tsx
    │       ├── cursor-particles.tsx
    │       └── connect-with-us.tsx
    └── journal/                  ← trading journal (copied from source repo)
        ├── JournalApp.tsx        ← created here, not from source
        ├── firebase-applet-config.json
        ├── contexts/AuthContext.tsx
        ├── lib/firebase.ts / tradeService.ts / utils.ts
        ├── types/trade.ts
        ├── pages/Login.tsx / Dashboard.tsx
        └── components/
            ├── dashboard/  (AddTradeDialog, CalendarView, ChartOverview,
            │               EditTradeDialog, EquityCurve, ListOverview, WinsVsLosses)
            └── ui/         (14 shadcn/Base UI components)
```

---

## Content management

All displayed portfolio content is in `src/constants.ts`. Edit that file for text/data changes — no component edits needed.

| Export | Used by |
|---|---|
| `PERSONAL_INFO` | Hero, ContactConnect, nav |
| `EXPERIENCE` | Experience |
| `PROJECTS` | Projects |
| `SKILLS` | TechnicalToolkit (unused) |
| `CERTIFICATES` | Certificates |
| `CASE_COMPETITION` | CaseCompetition |

---

## Design system

### Colour tokens (defined in `src/index.css` `@theme`)

| Token | Hex | Usage |
|---|---|---|
| `navy` | `#0F3057` | Primary text, headings, buttons, borders |
| `gold` | `#C4964D` | Accent — labels, highlights, hover states |
| `paper` | `#F9FAFB` | Background |
| `ink` | `#1A1A1A` | Body text |

These are Tailwind classes: `text-navy`, `bg-gold`, `border-gold/10`, etc.

The journal uses separate shadcn CSS variables (`--background`, `--foreground`, etc.) in a `.dark` scope. The two systems do not conflict.

### Typography

- Headings: `font-sans font-bold` (Inter)
- Decorative italic: `font-serif italic` (Cormorant Garamond) — used sparingly
- Label caps: `text-[10px] uppercase tracking-[0.4em] font-black`

### Animation conventions

Import from `motion/react` only — never `framer-motion` directly in portfolio components.

```ts
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
```

Shared variants in `src/lib/animations.ts`:
- `revealVariants` — fade + blur in on scroll
- `staggerContainer` — staggers children
- `slideUpVariants` — slide up with custom delay via `custom` prop
- `floatAnimation` — infinite float loop

All `ease` arrays must be typed `as const` (e.g. `[0.25, 0.1, 0.25, 1] as const`) and spring `type` values must be `"spring" as const` — required by motion/react's strict TypeScript types.

Standard scroll trigger: `whileInView="visible" viewport={{ once: true, amount: 0.1 }}`.

---

## Vite config

```ts
resolve: {
  alias: {
    '@journal': path.resolve(__dirname, './src/journal'),  // journal imports
    '@': path.resolve(__dirname, '.'),                     // project root (NOT src/)
  },
},
```

**Important:** `@/` resolves to the project root, not `src/`. This is non-standard. No portfolio files currently use the `@` alias — all use relative paths. Journal files use `@journal/` for their internal imports.

Both aliases must also be reflected in `tsconfig.json` under `compilerOptions.paths`.

`process.env.GEMINI_API_KEY` is injected at build time via Vite `define`. Set it in `.env` locally or in Vercel env vars for production.

---

## Vercel deployment

Current `vercel.json`:
```json
{
  "buildCommand": "npx vite build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "cleanUrls": true,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

The SPA rewrite is required so `/journal` and `/journal/login` don't 404 on hard refresh. Do not remove it.

---

## Certificates component

`Certificates.tsx` renders a stacked card carousel. Position offset: `idx - currentStep`. Cards at offset > 2 are hidden. Clicking a non-active card brings it to front. Active card has a fullscreen button opening `ImageOverlay`.

Per-category active index is tracked in a `steps` array — each category remembers its position independently.

---

## ImageOverlay component

Shared by `Certificates` (receives a `cert` object: `.image`, `.title`, `.issuer`, `.file`, `.date`) and `CaseCompetition` (receives just `src` string). Handles both via the `cert?.image || src` pattern.

---

## Known issues

- `TechnicalToolkit` is built but not rendered in `App.tsx`. Safe to add or leave out.
- `AnimatedCard` is imported in `Projects.tsx` but not actually used in the render output. Can be integrated or removed.
- Portfolio nav has unused lucide imports (`X`, `Mail`, `Linkedin`) — contact icons use image files from `public/`, not lucide.
