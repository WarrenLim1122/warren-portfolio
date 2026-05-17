# CLAUDE.md — Warren Lim Portfolio

## Standing rules — read before doing anything

1. Read this file before working on this repo.
2. **`src/journal/` is a git submodule** pointing to the [`trading-journal`](https://github.com/WarrenLim1122/trading-journal) repo. Do NOT edit journal source through this repo. To change journal code: clone trading-journal separately, edit + commit + push there, then in this repo run `git submodule update --remote src/journal && git add src/journal && git commit && git push` to bump the pointer. The integrated entry consumed by App.tsx is `src/journal/src/JournalApp.tsx`. The alias `@journal/*` resolves to `./src/journal/src/*`.
3. Never blindly overwrite these portfolio-owned files:
   - `src/App.tsx`
   - `src/main.tsx`
   - `src/index.css`
   - `vite.config.ts`
   - `package.json`
   - `package-lock.json`
   - `vercel.json`
4. If any portfolio-owned file must be changed, explain why before changing it.
5. Run `npm install` only if new dependencies are being added.

---

## Standing preferences (recorded 2026-05-17)

Warren's confirmed design preferences. Apply these on every change unless he says otherwise.

1. **No em/en dashes ("—" / "–") in rendered copy.** Restructure with commas, colons, parentheses, or "to" for ranges. Ordinary hyphens in compound words (`buy-side`, `First-Class`) are fine. This applies to `constants.ts` strings and component `description`/`alt`/title props, not code comments.
2. **WhatsApp, not phone.** Contact points are Email / LinkedIn / WhatsApp. WhatsApp uses `https://wa.me/<digits>` and the `WhatsappIcon` from `components/ui/icons.tsx` (lucide has no WhatsApp glyph; `Linkedin` is deprecated in lucide so `LinkedinIcon` lives there too).
3. **Headshot is large and full colour** (never grayscale).
4. **Palette = "refined upgrade"** (chosen over all-dark / all-light / emerald): midnight surface, warm ivory, muted champagne accent. Dark/light section rhythm is intentional; the two dark bands (Hero, Recognition) must stay the identical `--color-surface`.
5. **Aesthetic is the priority.** When integrating third-party component snippets (21st.dev / shadcn / Next.js), adapt the *visual* into this project's stack (`motion/react`, palette tokens, Vite + React Router) — never copy shadcn/Next/`framer-motion` deps in verbatim.
6. **Nav contact icons:** neutral at rest; hover-tint Email = red, LinkedIn = blue, WhatsApp = green. A sliding "limelight" beam under the hovered icon (champagne) is the intended polish.
7. Brand text is "Warren Lim Zhan Feng"; the journal pill reads "Trading Journal" (route `/journal` unchanged).
8. **Never touch the `src/journal` submodule** for portfolio work.

---

## Automatic GitHub workflow

This workflow runs automatically after every successful code or documentation edit, unless Warren explicitly says **"do not push"** or **"do not merge"**.

### Step 1 — Diagnose

```bash
git status
git branch --show-current
git remote -v
```

### Step 2 — Classify changes

Label every changed file as one of:
- `portfolio-related` — anything in `src/` outside `src/journal/`
- `submodule-pointer-update` — when only `src/journal` (the submodule SHA) changes; commit message should be "Sync trading-journal submodule"
- `dependency-related` — `package.json`, `package-lock.json`
- `documentation-related` — `CLAUDE.md`, `README.md`
- `deployment-related` — `vercel.json`, `vite.config.ts`, `tsconfig.json`
- `other` — anything else

If `src/journal/` contents show up as modified (not just the submodule pointer), **stop** — journal source must be edited in the trading-journal repo, not here.

### Step 3 — Security check (hard stop if any are detected)

Never commit:
- `.env` / `.env.local` / any file matching `*.env`
- Firebase **admin** SDK keys (service account JSON files)
- Passwords or secret tokens
- Private API credentials

`src/journal/firebase-applet-config.json` is **safe to commit** — it contains only the public client-side Firebase config. Firebase security is enforced server-side by Firestore Rules.

### Step 4 — Generated folder check

Never commit `dist/`, `node_modules/`, or `.next/`. If any appear in `git status`:
1. Do not stage them.
2. Add to `.gitignore` if not already there.
3. Remove from Git tracking: `git rm -r --cached <folder>`
4. Then continue.

### Step 5 — Run checks

```bash
npm run build   # must pass
npm run lint    # must pass (zero errors)
```

If either fails:
- Do not commit, push, or merge.
- Explain the error and fix it if possible.
- Re-run checks before proceeding.

### Step 6 — Stage and commit

```bash
git add -A
git commit -m "<clear message describing the actual change>"
```

Commit message conventions:
- `Add <feature>` — new capability added
- `Update <thing>` — existing behaviour changed
- `Fix <bug>` — bug corrected
- `Sync trading journal — <description>` — journal file sync
- `Docs: <description>` — documentation only

### Step 7 — Push and PR rules

| Situation | Action |
|---|---|
| On a feature branch | Push the feature branch to `origin`; create PR; merge if checks pass |
| On `main`, change is small/safe | Push directly to `origin main` |
| On `main`, change is large or risky | Create a feature branch first, push it, create a PR, merge if checks pass |

**Never force push. Never delete branches unless explicitly asked.**

### Step 8 — Pull request and merge

Claude may create **and merge** a PR automatically if **all** of the following are true:
- `npm run build` passes
- `npm run lint` passes
- No secrets detected
- No generated folders included
- GitHub reports the branch can be merged cleanly
- The change matches what Warren requested

If GitHub CLI (`gh`) is available and authenticated:
```bash
gh pr create --base main --head <branch> --title "..." --body "..."
gh pr merge <number> --merge   # or --squash for cleaner history
```

If GitHub CLI is not available or auth fails:
- Push the branch
- Output the PR URL
- State clearly that manual browser merge is needed

### Step 9 — Stop and ask Warren if any of these occur

- Secrets detected in changed files
- `npm run build` or `npm run lint` fails and cannot be safely fixed
- Merge conflict
- GitHub authentication failure
- Change is destructive (data deletion, Firebase rules change, DNS/deployment config change)
- Files outside the expected project scope are modified
- Warren said "do not push" or "do not merge"

### Step 10 — Post-push summary (always provide)

After pushing and/or merging, always output:

| Item | Value |
|---|---|
| Files changed | list them, classified |
| Commit message | exact message used |
| Branch | which branch was pushed |
| Pushed to main? | yes / no |
| PR created? | yes (link) / no |
| PR merged? | yes / pending / not applicable |
| Vercel redeploy? | automatic if `main` was updated |
| URLs to test | listed below |

Always remind Warren to test:
- `https://warrenlimzf.com`
- `https://warrenlimzf.com/journal` (should redirect to `/journal/dashboard`)
- `https://warrenlimzf.com/journal/login`
- `https://warrenlimzf.com/journal/dashboard`

---

## Project identity

Personal portfolio website for Warren Lim Zhan Feng, a penultimate Banking & Finance undergraduate at NTU Singapore. Deployed at **warrenlimzf.com** via Vercel. The site showcases his professional experience, credentials, case competition wins, and finance research projects.

The trading journal is integrated at `warrenlimzf.com/journal`. Journal files live in `src/journal/` and are developed in-place in this repo.

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

- `path="/*"` → `<Portfolio />` — the main recruiter-facing portfolio
- `path="/journal/*"` → `<JournalApp />` — the trading journal (lazy-loaded, code-split)

### No entry gate (removed in the recruiter-conversion rebuild)

The old `ParticleHero` "Enter" gate and `CursorParticles` overlay were
removed (they cost recruiters time and read gimmicky). The portfolio now
renders straight into the Hero. There is no `isUnlocked` state.

### Nav

`Portfolio()` tracks `scrolled` (window.scrollY > 40) to swap the fixed
nav between transparent-on-hero and ivory-blur-on-scroll. The nav holds:
the brand link ("Warren Lim Zhan Feng"), `NAV_LINKS`
(Experience/Work/Resume anchors), `<NavContactRail>` (Email / LinkedIn /
WhatsApp icons — neutral at rest, hover-tint red/blue/green), and the
"Trading Journal" pill linking to `/journal`. `ScrollProgress` renders a
hairline read-progress bar plus a desktop section rail.

### Section order (in `<main>`)

```
<Hero />          → id="top"          (dark surface, lamp backdrop)
<Experience />    → id="experience"   (light)
<Certificates />  → id="credentials"  (light)
<Skills />        → id="skills"       (light)
<SelectedWorks /> → id="work"         (light)
<Recognition />   → id="recognition"  (dark surface)
<ResumeViewer />  → id="resume"       (light)
```

Dark/light rhythm is deliberate: Hero and Recognition share the **exact
same** `--color-surface`; all other sections are ivory. Both dark bands
read as one composed system, not an accident.

### Journal routing

`JournalApp` (`src/journal/src/JournalApp.tsx`, in the submodule) uses `<Routes>` only — no nested `BrowserRouter`. Routes inside it are relative to `/journal`:

- `path="login"` → `<Login />` (matches `/journal/login`)
- `index` → `<Navigate to="/journal/dashboard" replace />` (bare `/journal` redirects to dashboard)
- `path="dashboard"` → `<Dashboard />` guarded by `<ProtectedRoute>` (matches `/journal/dashboard`)
- `path="new-trade"` → `<NewTrade />`
- `path="strategies"` → `<StrategiesDashboard />`
- `path="risk-calculator"` → `<RiskCalculator />`
- `path="settings"` → `<Settings />`

Unauthenticated access redirects to `/journal/login`. After sign-in, Login navigates to `/journal/dashboard`.

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
    │   ├── Hero.tsx              ← dark hero, lamp backdrop, 3D stage
    │   ├── Experience.tsx        ← timeline; role = heading, company+date = sub
    │   ├── Certificates.tsx      ← featured crown + category carousel
    │   ├── Skills.tsx            ← three capability buckets (carousel)
    │   ├── SelectedWorks.tsx     ← project cards + case dialog
    │   ├── Recognition.tsx       ← dark band, EAMC win, stacked photos
    │   ├── ResumeViewer.tsx      ← full CV, sticky left rail
    │   ├── ImageOverlay.tsx      ← shared fullscreen image/PDF viewer
    │   └── ui/
    │       ├── Section.tsx       ← editorial shell (index/eyebrow/title)
    │       ├── Reveal.tsx        ← scroll-entrance primitive
    │       ├── ScrollProgress.tsx
    │       ├── StatBadge.tsx     ← big tabular metric (count opt-out via count={false})
    │       ├── MagneticButton.tsx
    │       ├── CarouselShell.tsx ← drag/arrow carousel (pointer-capture deferred)
    │       ├── Hero3DStage.tsx
    │       ├── LampBackdrop.tsx  ← hero lamp light (motion/react, palette tokens)
    │       ├── icons.tsx         ← LinkedinIcon, WhatsappIcon (brand glyphs)
    │       └── connect-with-us.tsx ← ContactConnect (Email/LinkedIn/WhatsApp)
    └── journal/                  ← git submodule → trading-journal repo
        ├── (submodule root has its own README, vite.config.ts, package.json
        │    for standalone deployment — those are not used by personal-website)
        └── src/                  ← journal source (what personal-website consumes)
            ├── JournalApp.tsx    ← integration entry (Routes only, no BrowserRouter)
            ├── App.tsx           ← standalone entry (BrowserRouter — used only when deployed independently)
            ├── firebase-applet-config.json
            ├── contexts/AuthContext.tsx
            ├── lib/firebase.ts / tradeService.ts / cashflowService.ts / tradeUtils.ts / mt5Calculation.ts / utils.ts
            ├── types/trade.ts / cashflow.ts
            ├── pages/Login.tsx / Dashboard.tsx / NewTrade.tsx
            │         Cashflows.tsx / RiskCalculator.tsx / StrategiesDashboard.tsx / Settings.tsx
            └── components/
                ├── layout/AppLayout.tsx  ← sidebar, mobile nav, user profile, logout
                ├── dashboard/  (AddTradeDialog, CalendarView, ChartOverview,
                │               EditTradeDialog, EquityCurve, ListOverview,
                │               TradeDetailDialog, WinsVsLosses)
                └── ui/         (shadcn/Base UI components)
```

---

## Content management

All displayed portfolio content is in `src/constants.ts`. Edit that file for text/data changes — no component edits needed.

| Export | Used by |
|---|---|
| `PERSONAL_INFO` | Hero, ContactConnect, nav (`NAV_CONTACTS`) |
| `TRUST_MARKERS`, `ADJECTIVES` | Hero |
| `EXPERIENCE` | Experience (`role` is the heading, `company`+`duration` the sub; `stat` no longer rendered) |
| `PROJECTS` | SelectedWorks (`thumbnail` is shown as the glance image) |
| `SKILLS` | Skills |
| `CERTIFICATES`, `FEATURED_CERT_TITLE` | Certificates |
| `CASE_COMPETITION` | Recognition |

---

## Design system

### Colour tokens (defined in `src/index.css` `@theme`)

Refined palette (2026-05-17 redesign — replaced the brassy navy/gold scheme):

| Token | Hex | Usage |
|---|---|---|
| `navy` | `#0F2C4A` | Headings / primary text on ivory |
| `navy-700` | `#0A2138` | Hover-darker navy |
| `gold` | `#C7A878` | Muted champagne — the only accent |
| `gold-bright` | `#D8C29A` | Champagne on the dark surface (lamp) |
| `paper` | `#F7F5F0` | Warm ivory background |
| `paper-2` | `#EFEDE6` | Warmer card / inset |
| `ink` | `#16202C` | Body text on ivory |
| `graphite` | `#5C636E` | Secondary text |
| `line` | `#E3E1DA` | Hairlines |
| `surface` | `#0A1A2F` | The single dark canvas (Hero + Recognition) |
| `surface-2` | `#0F2238` | Inset cards on the dark canvas |

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
    // Journal source lives inside the trading-journal git submodule at src/journal/src/
    '@journal': path.resolve(__dirname, './src/journal/src'),
    '@': path.resolve(__dirname, '.'),                     // project root (NOT src/)
  },
},
```

**Important:** `@/` resolves to the project root, not `src/`. This is non-standard. No portfolio files currently use the `@` alias — all use relative paths. Journal files use `@journal/` for their internal imports; that alias now points into the submodule.

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
  "rewrites": [
    { "source": "/:path*", "destination": "/index.html" }
  ]
}
```

The SPA rewrite is required so all `/journal/*` paths don't 404 on hard refresh. Use `/:path*` (Vercel's glob syntax) — **not** `/(.*)`  (regex syntax). The regex form fails silently on nested paths like `/journal/dashboard` at Vercel's edge layer. Do not change this pattern.

### ⚠ Do NOT add `cleanUrls`, `trailingSlash`, or `i18n` to `vercel.json`

These three Vercel options interfere with SPA catch-all rewrites. **`cleanUrls` was removed in commit `720e1da` after it caused hard-refresh 404s on `/journal/dashboard`.**

Why it broke: Vercel's routing pipeline runs in this order:
`headers → redirects → rewrites (pre-filesystem) → filesystem + cleanUrls → rewrites (post-filesystem fallthrough)`

`cleanUrls: true` lives in the **filesystem stage**. For any path without a file extension (e.g. `/journal/dashboard`), Vercel looks for `dist/journal/dashboard.html` — not found — and returns `NOT_FOUND` from the filesystem stage, **before the post-filesystem rewrites ever run**. The `/:path*` catch-all was correct; it just never got evaluated.

**Diagnostic sign:** if you ever see Vercel's own 404 error page (not your React app's UI) on a nested path after a hard refresh, a rewrite is not firing — check for `cleanUrls`, `trailingSlash`, or `i18n` in `vercel.json` first.

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

---

## Latest Session Summary — Journal extracted to submodule

*Recorded 2026-05-13. Supersedes the earlier 2026-05-07 "single-repo" note.*

### 1. Submodule setup

The trade journal source has been moved BACK out into [`trading-journal`](https://github.com/WarrenLim1122/trading-journal) so it can be deployed independently in the future (own domain). `personal-website/src/journal/` is now a **git submodule** mounting the full trading-journal repo. The submodule's `src/` is the actual code root; everything else at the submodule root (own `vite.config.ts`, `package.json`, `index.html`, `App.tsx`, `firestore.rules`) is for standalone deployment and is not used by personal-website's build.

- `warrenlimzf.com/journal` → redirects to `/journal/dashboard`.
- `warrenlimzf.com/journal/dashboard` → main dashboard (redirects to login if unauthenticated).
- `warrenlimzf.com/journal/login` → login page; redirects to `/journal/dashboard` after sign-in.
- This repo owns the `BrowserRouter`. `JournalApp` uses `<Routes>` only — never a nested `BrowserRouter`.

### 2. Compatibility changes already in place — never overwrite these

| File | What was changed |
|---|---|
| `src/journal/JournalApp.tsx` | Created here (not from source). Adds/removes `html.dark`. Index route redirects to `/journal/dashboard`. |
| `src/journal/components/layout/AppLayout.tsx` | Created here. All nav paths use `/journal/*` prefix. Dashboard path is `/journal/dashboard`. |
| `src/journal/lib/firebase.ts` | Import path: `../../` → `../firebase-applet-config.json` |
| `src/journal/pages/Login.tsx` | `navigate("/")` → `navigate("/journal/dashboard")`; `text-white` on h1 + Google button for dark-card visibility |
| `src/journal/pages/NewTrade.tsx` | `navigate("/journal")` → `navigate("/journal/dashboard")` (save + back button) |
| `src/journal/pages/Dashboard.tsx` | Removed old min-h-screen wrapper and manual header; `asChild` → `render` prop (Base UI) |
| `src/journal/components/dashboard/EquityCurve.tsx` | Optional props interface; Recharts formatter type fix |
| `src/journal/components/dashboard/WinsVsLosses.tsx` | `"LOSS"` → `"LOSE"`; `breakevenRate` added to useMemo return |
| `src/journal/components/dashboard/TradeDetailDialog.tsx` | `sm:max-w-[90vw] w-[90vw]` overrides base `sm:max-w-sm`; stats left (35%), chart right (65%); Net PNL centered via 3-col flex; labels text-xs, values text-base |
| `src/journal/components/dashboard/ListOverview.tsx` | BOT badge removed; Symbol cell is plain text |
| All `src/journal/**` imports | `@/` → `@journal/` |

### 4. Dark theme architecture — why it works this way

The source trading journal sets `class="dark"` on `<html>` in `index.html`. The integrated version cannot do that statically (it would break the portfolio). Instead, `JournalApp.tsx` uses:

```ts
useEffect(() => {
  document.documentElement.classList.add("dark");
  return () => document.documentElement.classList.remove("dark");
}, []);
```

This is required because Base UI portals (dropdown, select, dialog, popover) render into `document.body`, outside any scoped `<div class="dark">`. Without `html.dark`, portal elements get `:root` (light) CSS variables and appear white. `index.css` also includes a scoped `@layer base` border reset to fix calendar/grid borders.

### 5. Firebase Auth — already resolved, do not re-debug

Firebase unauthorized-domain error was fixed manually in the Firebase Console. Authorized domains must include:
- `warrenlimzf.com`
- `warren-portfolio.vercel.app`
- `localhost`
- `127.0.0.1`

Do not change Firebase config or Firestore rules unless explicitly requested.

### 6. GitHub workflow — Claude has automatic permission

Claude may commit, push, create PRs, and merge PRs automatically after every successful edit, **unless Warren says "do not push" or "do not merge"**. Hard stops: secrets detected, build/lint fails, merge conflict, auth failure, destructive change. Full rules: `CLAUDE.md §Automatic GitHub workflow`.

### 7. Visual styling — current status

The `/journal` dark theme is stable. `AppLayout` provides `min-h-screen bg-background` for all protected routes. If new regressions appear, check: (a) portals have dark CSS variables, (b) `html.dark` is applied by `JournalApp.tsx`, (c) all `src/journal/**` imports use `@journal/` not `@/`.
