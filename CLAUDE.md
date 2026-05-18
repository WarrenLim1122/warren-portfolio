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
6. **`src/life/` is the self-contained "Beyond Work" area** (route `/life`). Its photos are LOCAL files in `src/life/photos/<country>/` (no Vercel Blob). See the "/life — personal area" section.

---

## Standing preferences (recorded 2026-05-17)

Warren's confirmed design preferences. Apply these on every change unless he says otherwise.

1. **No em/en dashes ("—" / "–") in rendered copy.** Restructure with commas, colons, parentheses, or "to" for ranges. Ordinary hyphens in compound words (`buy-side`, `First-Class`) are fine. This applies to `constants.ts` strings and component `description`/`alt`/title props, not code comments.
2. **WhatsApp, not phone.** Contact points are Email / LinkedIn / GitHub / WhatsApp / Instagram (in that order, in both `NAV_CONTACTS` in `App.tsx` and `ITEMS` in `connect-with-us.tsx`). WhatsApp uses `https://wa.me/<digits>`; Instagram uses `PERSONAL_INFO.instagramUrl`. All brand glyphs (`WhatsappIcon`, `GithubIcon`, `InstagramIcon`, plus `LinkedinIcon` since lucide's `Linkedin` is deprecated and it has no WhatsApp/Instagram-brand glyph) are local SVGs in `components/ui/icons.tsx`. The mono ones use `currentColor` so the tone-aware + hover-tint system works. `InstagramIcon` additionally takes an optional `gradient` prop: when set it paints the glyph with Instagram's real brand gradient (used in the nav rail); left off it stays `currentColor` (used in `ContactConnect`, where the disc itself goes gradient on hover). The `public/instagram-icon.png` Warren added is intentionally unused (a raster cannot inherit `currentColor` or tint cleanly); the SVG glyph is the correct path and may be deleted from `public/`.
3. **Headshot is large and full colour** (never grayscale).
4. **Palette = "refined upgrade"** (chosen over all-dark / all-light / emerald): midnight surface, warm ivory, muted champagne accent. Dark/light section rhythm is intentional; the two dark bands (Hero, Recognition) must stay the identical `--color-surface`.
5. **Aesthetic is the priority.** When integrating third-party component snippets (21st.dev / shadcn / Next.js), adapt the *visual* into this project's stack (`motion/react`, palette tokens, Vite + React Router) — never copy shadcn/Next/`framer-motion` deps in verbatim.
6. **Nav contact icons:** neutral at rest (every icon, Instagram included, inherits the plain neutral colour at rest — no colour until interaction). On hover/focus: Email = red, LinkedIn = blue, GitHub = grey, WhatsApp = green tint. **Instagram is the exception only on hover**: instead of a flat tint it reveals its real brand gradient (the camera in Instagram's purple-to-pink-to-orange) via the icon's `gradient` prop, which is passed only while that item is the active (hovered/focused) one — `gradientIcon ? active === i : undefined` in `limelight-nav.tsx`. Its hover-tint colour override is skipped so the gradient holds; the limelight beam under it uses `#E1306C` as a single-colour stand-in. In `ContactConnect` the Instagram disc background goes the full IG gradient on hover (white glyph on top), never flat pink; that disc is scoped with a `cc-ig` class that clips overflow, drops the 1px ring and calms the centre sheen so the circle stays a clean edge. A sliding "limelight" beam under the hovered icon (champagne) is the intended polish.
7. Brand text is "Warren Lim Zhan Feng"; the journal pill reads "Trading Journal" (route `/journal` unchanged).
8. **Never touch the `src/journal` submodule** for portfolio work.

---

## Automatic GitHub workflow

**Default: push to `origin main` automatically after every successful edit.** No permission needed. Never ask Warren whether to push — just do it. Only stop if a hard-stop condition from Step 9 fires.

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

### Step 9 — Hard stops (the only reasons NOT to push)

- Secrets detected in changed files
- `npm run build` or `npm run lint` fails and cannot be safely fixed
- Merge conflict
- GitHub authentication failure
- Change is destructive (data deletion, Firebase rules change, DNS/deployment config change)
- Files outside the expected project scope are modified
- Warren explicitly says "do not push" for this session

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
| 3D globe | `react-globe.gl` + `three` (ONLY in the lazy `/life` Gallery chunk) |
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

`App.tsx` owns a `BrowserRouter`. Three top-level routes (order matters: specific routes before the `/*` catch-all):

- `path="/journal/*"` → `<JournalApp />` — the trading journal (lazy-loaded, code-split)
- `path="/life/*"` → `<LifeApp />` — the personal "Beyond Work" area (lazy-loaded, code-split; see the "/life — personal area" section)
- `path="/*"` → `<Portfolio />` — the main recruiter-facing portfolio

### No entry gate (removed in the recruiter-conversion rebuild)

The old `ParticleHero` "Enter" gate and `CursorParticles` overlay were
removed (they cost recruiters time and read gimmicky). The portfolio now
renders straight into the Hero. There is no `isUnlocked` state.

### Nav

`Portfolio()` tracks `scrolled` (window.scrollY > 40) to swap the fixed
nav between transparent-on-hero and ivory-blur-on-scroll. The nav holds:
the brand link ("Warren Lim Zhan Feng"), the `LimelightContactRail`
(`NAV_CONTACTS`: Email, LinkedIn, GitHub, WhatsApp, Instagram icons;
neutral at rest, a sliding champagne "limelight" beam plus per-brand
hover tint),
the `NAV_LINKS` (Experience/Work/Resume anchors), a "Beyond Work" pill
linking to `/life` (hidden below the `sm` breakpoint), and the "Trading
Journal" pill linking to `/journal`. `ScrollProgress` renders a hairline
read-progress bar plus a desktop section rail.

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

### /life routing

`LifeApp` (`src/life/LifeApp.tsx`) is mounted at `/life/*`. It is NOT a nested router: it is a single page with a data-driven tab switcher (`LIFE_TABS`) synced to the URL hash (`/life#gallery`, `/life#golf`). Full design in the "/life — personal area" section.

---

## File structure

```
my-portfolio/
├── CLAUDE.md
├── README.md
├── docs/                 ← journal API/schema notes + superpowers/specs
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
    │   ├── Hero.tsx              ← dark hero, lamp backdrop, framed portrait (no backtest card)
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
    │       ├── LampBackdrop.tsx  ← hero ambient ceiling wash (wide ice-blue glow)
    │       ├── icons.tsx         ← LinkedinIcon, GithubIcon, WhatsappIcon, InstagramIcon (brand glyphs)
    │       └── connect-with-us.tsx ← ContactConnect (glass-disc panel; Email/LinkedIn/GitHub/WhatsApp)
    ├── life/                     ← self-contained "Beyond Work" area (route /life)
    │   ├── LifeApp.tsx           ← entry: tab state + #hash sync + REGISTRY
    │   ├── life-content.ts       ← golf milestones + LIFE_TABS; re-exports gallery
    │   ├── gallery.ts            ← COUNTRY_META + local-folder photo loader (import.meta.glob)
    │   ├── vite-env.d.ts         ← vite/client types for import.meta.glob
    │   ├── life.css              ← styles scoped under .life-root only
    │   ├── photos/<country>/     ← LOCAL aesthetic photos (drop files here; see photos/README.md)
    │   └── components/  (LifeNav, GlobeGallery, Globe, CountryList,
    │                     PhotoGrid, Lightbox, GolfJourney, GolfMilestone)
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

**`/life` content is separate from `constants.ts`:**

| What | Where |
|---|---|
| Aesthetic photos | drop files in `src/life/photos/<country>/` (filename becomes the location label) |
| Countries / globe pins | `src/life/gallery.ts` → `COUNTRY_META` (`id` must match the folder name) |
| Golf milestones / clips | `src/life/life-content.ts` → `GOLF_MILESTONES` (set `media` to `{ type: "youtube", id: "..." }`; each entry has a `date` string that pops out on the scroll timeline, currently placeholder years for Warren to edit) |
| Add a section/tab | `src/life/life-content.ts` → `LIFE_TABS` + a component + a line in `REGISTRY` in `LifeApp.tsx` |

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

### Hero atmosphere & contact panel (2026-05-17 polish)

- **`LampBackdrop`** is a **wide ambient ceiling wash** (cool ice-blue `#4C7FB8`), full section width, fading out above the headline. The old conic "lamp cone + 1px filament" was removed (it banded a bright bar across the intro text). Keep it soft and wide; do not reintroduce a hard horizontal edge.
- **`ContactConnect`** (`connect-with-us.tsx`) is a faithful adaptation of a reference "SocialConnect": glass icon discs, hover lift + `scale`, per-brand background + glow, an icon shake, label reveal, radial `::before`. The container glow is **champagne gold** (never the reference purple). Tone-aware (`tone="dark"` hero, `tone="light"` footer). Its CSS is one `<style href precedence>` block, React 19 dedupes it across the hero + footer instances. Contacts: Email, LinkedIn, GitHub, WhatsApp.
- The Hero portrait no longer carries the floating "Backtest" chart card (it rendered nothing; removed 2026-05-17).

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

`Certificates.tsx` leads with the featured **crown credential** (FMVA®) as a large clickable card that opens `ImageOverlay`. Below it, category tabs (`CFI Executive Suite` / `Bloomberg Specialist` / `Analytical Skills`) switch the active set; each set renders in the shared `CarouselShell` (drag + arrow + keyboard scroll). Any card opens `ImageOverlay` with the full image and source PDF.

`CarouselShell` defers pointer-capture until a real drag begins — capturing on pointerdown previously swallowed the card click so certificates would not open. Do not reinstate capture-on-pointerdown.

---

## ImageOverlay component

Shared by `Certificates` (receives a `cert` object: `.image`, `.title`, `.issuer`, `.file`, `.date`) and `Recognition` (receives just `src` string). Handles both via the `cert?.image || src` pattern.

---

## /life — personal area ("Beyond Work")

Route `/life` (lazy, code-split). Everything lives in `src/life/`. The only pre-existing-file edits are 3 additive lines in `App.tsx` (lazy import, the `/life/*` route, the "Beyond Work" pill) plus the `react-globe.gl` + `three` deps. To drop the area entirely: delete `src/life/`, remove those 3 `App.tsx` lines, then `npm remove react-globe.gl three`.

Single page, data-driven tabs (`LIFE_TABS`: Gallery, Golf) synced to the URL hash. Adding a future section is a content addition: a `LIFE_TABS` entry, a component, and one line in `REGISTRY` in `LifeApp.tsx`.

### Adding aesthetic photos (no Vercel Blob)

1. Put image files in `src/life/photos/<country-id>/`, e.g. `src/life/photos/japan/kyoto-fushimi-inari.jpg`.
2. The filename becomes the on-photo location label: `kyoto-fushimi-inari.jpg` shows as "Kyoto Fushimi Inari". A leading `01-` controls order; a trailing `-2` just keeps names unique. Files sort by name.
3. Supported: `.jpg .jpeg .png .webp .avif`. Keep them web-sized (about 2000px on the long edge, 200 to 600 KB): they live in git and ship in the deploy.
4. No code change. `import.meta.glob` in `gallery.ts` picks them up on the next dev reload / build.
5. New country: add `{ id, name, lat, lng, order, zoomAlt }` to `COUNTRY_META` in `gallery.ts` (the `id` must equal the folder name), then create that folder. A country with no photos yet still appears on the globe with a tasteful "Coming soon" state. Full notes: `src/life/photos/README.md`.

### Gallery update workflow (triggered by "update my life folder", "update my gallery" etc.)

When Warren says a prompt like "update my life folder", "update my gallery page", "update my gallery using local files", or "I added photos" — run this workflow:

1. **Scan photo folders**: `ls src/life/photos/*/` to see which country folders exist and what files are in them.
2. **Parse filenames**: for each file, apply the same `toLabel()` logic (`replace(/^\d+[-_]/, "")`, `replace(/[-_]\d+$/, "")`, `replace(/[-_]+/g, " ")`, Title Case). This is the place name the photo grid will show.
3. **Geocode with your knowledge**: identify the real-world lat/lng for each place name. Use geographic knowledge to assign coordinates. For ambiguous names, use the most well-known location in that country context.
4. **Update `src/life/places-data.ts`**: for each country that now has photos, add/update its `Place[]` array with `{ id, label, lat, lng }`. The `id` should be a kebab-case slug of the label. Do not remove existing entries unless the file was deleted.
5. **New country folders**: if a folder exists that is not yet in `COUNTRY_META` in `gallery.ts`, add it with appropriate `{ id, name, lat, lng, order, zoomAlt }` and also add an empty entry in `PLACES` in `places-data.ts`.
6. **Build check**: run `npm run build` to confirm no regressions.
7. **Report**: list which countries were updated, which new places were added, and their coordinates.

### Adding a country's 2D region map + globe pin (triggered by "add this country", "I added a <country> folder", "do the same for <country>")

The `/life` Gallery is a 3-stage flow (`GlobeGallery.tsx`, state `stage: "globe" | "zoomed" | "map"`): (1) **globe** — a sharp auto-rotating 3D globe (world view); (2) click a country (pin or chip) → **zoomed** — `Globe.tsx` `viewMode="focus"` flies the camera in to that country with its pin highlighted, the globe slides to the right (lg) / top (mobile), and a panel animates in on the left asking "See 2D map?"; (3) the button → **map** — the stage swaps to an **accurate 2D region map** of that country (`CountryMap.tsx`, pure inline SVG, no WebGL/API) with curated place pins that reveal a short blurb. The map is **enlargeable**: zoom via wheel-toward-cursor / +/- / reset buttons, drag to pan; only the GEOMETRY scales (`vector-effect:non-scaling-stroke`), while region labels, pins and tooltips are re-projected through the same transform but drawn at a **constant size** so words never squeeze. The globe element is persistent across globe↔zoomed (no remount, so the fly-in animates). `Globe.tsx` `viewMode` is `"world" | "focus" | "country"`. Back steps out one level (map → zoomed → globe). No WebGL / reduced motion → selecting a country goes straight to the 2D map (chips stay a complete keyboard / no-WebGL path). Each country needs four things wired. Folder names in `src/life/photos/` are the source of truth for the country id; everything keys off that exact id.

When Warren adds a folder to `src/life/photos/<id>/` and asks to "add this country", do ALL of the following, exactly as was done for Singapore (do not skip the geometry — a country without it has no 2D map):

1. **Scan** `ls src/life/photos/*/` for the country ids that exist. The id is the literal folder name (kebab-case, e.g. `south-korea`).
2. **Source boundary geometry (free, public, no API key):**
   - Generic countries: **Natural Earth 10m Admin 1** (states/provinces), public domain. One-time dev download to the gitignored `src/life/data-raw/ne10m-admin1.geojson`:
     `curl -s -o src/life/data-raw/ne10m-admin1.geojson https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson` (≈39 MB; Node may need `NODE_OPTIONS=--max-old-space-size=3072`). Filter features by `properties.admin === "<Country Name>"`.
   - Singapore is special-cased to its ~55 planning areas (data.gov.sg URA Master Plan 2019, "No Sea", Singapore Open Data Licence) because Admin-1 does not subdivide a city-state. `src/life/data-raw/sg-planning-areas.geojson`.
   - `src/life/data-raw/` is **dev-only and gitignored** (large). Only the small generated output is committed.
3. **Add a job** to `JOBS` in `scripts/build-life-geometry.ts`: `{ src, out: "src/life/regions/<id>.ts", exportName: "<ID>_GEOMETRY", nameProp: "name_en", nameAltProp: "name", filter: { prop: "admin", value: "<Country>" }, stripRe?: / Prefecture$/, source: NE_SRC, width: 1000, pad: 24, simplifyTol, minAreaPx }`. Tune `simplifyTol` (≈0.9–1.5; higher = smaller file, less detail) and `minAreaPx` to keep the generated `.ts` roughly ≤ ~50 KB. Then run `NODE_OPTIONS=--max-old-space-size=3072 npx tsx scripts/build-life-geometry.ts`. This is **dev-only**, NOT part of `npm run build`. It writes `src/life/regions/<id>.ts` (committed).
4. **Register** the geometry in `src/life/components/CountryMap.tsx`: import `<ID>_GEOMETRY` and add `"<id>": <ID>_GEOMETRY` to the `GEOMETRY` map.
5. **`COUNTRY_META`** in `src/life/gallery.ts`: add `{ id, name, lat, lng, order, zoomAlt }` (id MUST equal the photo folder name). Remove entries whose photo folder Warren deleted.
6. **Curated places** in `src/life/places-data.ts`: add `<id>: Place[]` with 5–6 notable places, each `{ id, label, lat, lng, blurb }`. Draft the blurbs from general knowledge (one short line, **no em/en dashes** per the standing copy rule); Warren personalises later. `lat/lng` must be real so the pin projects onto the SVG. Empty `[]` is acceptable until curated. Remove keys for deleted folders.
7. **Verify**: `npm run lint` (zero errors) and `npm run build` (passes), then load `localhost:3000/life`, select the country, confirm the shape is recognisable, labels read, pins land, and the blurb tooltip opens. Watch for far-flung territories stretching the bounding box (tall countries render small with side margins — a known, accepted layout trade-off; note it, don't block).
8. **Report**: countries added/removed, region counts, generated file sizes, and the resulting lazy `LifeApp` chunk size (it is code-split off the main bundle, so growth there does not affect the recruiter-facing initial load — but keep it reasonable).

Notes: the globe texture is the vendored public-domain NASA Blue Marble at `public/life/earth-4k.jpg` (4096×2048, the device-safe ceiling — do NOT ship >4096-wide, many mobile GPUs cap there). Globe scroll-zoom is enabled with clamped min/max distance. `CountryMap` works without WebGL, so the country drill-down is the robust path even when the globe is skipped.

### Adding golf clips (YouTube), step-by-step

1. youtube.com → **Create** (top-right) → **Upload video**.
2. Select the clip, give it a title.
3. On the Visibility step choose **Unlisted** (NOT Private: Private videos cannot be embedded; Unlisted means only people with the link or the embed can see it). Save/Publish.
4. Open the video and copy its ID from the URL: in `https://www.youtube.com/watch?v=ABC123xyz` the ID is `ABC123xyz` (for a `https://youtu.be/ABC123xyz` link it is the part after the slash).
5. In `src/life/life-content.ts`, find the milestone in `GOLF_MILESTONES` and set its media to `media: { type: "youtube", id: "ABC123xyz" },`.
6. Done. The still is taken from the YouTube thumbnail automatically (no poster file needed) and the player only mounts when a visitor clicks play. Vimeo is the same with `{ type: "vimeo", id: "<numericId>" }` (add an optional `poster:` for Vimeo, its thumbnail is not auto-derived).

### Pending content / TODO (Warren to provide; recorded 2026-05-18)

- [ ] **Aesthetic photos** — drop image files into `src/life/photos/<country>/` for the current countries: `singapore`, `malaysia`, `thailand`, `china`, `japan` (each already has an accurate 2D region map + curated pins; only photos are pending). Filename becomes the on-photo location label. Until added, each country shows the "Coming soon" empty state. To add a NEW country, follow "Adding a country's 2D region map + globe pin" above.
- [ ] **Golf clips** — upload each clip to YouTube as **Unlisted**, then either give the video IDs to wire into `GOLF_MILESTONES` or set each milestone's `media: { type: "youtube", id: "..." }` in `life-content.ts`.
- **Layout is intentionally NOT finalised.** Once the real photos/clips are in, Claude decides the precise arrangement, gallery grid density (uniform vs masonry), per-country ordering, lightbox behaviour, and the golf media layout, scaled to the actual asset count. Do not lock a fixed layout before the real assets exist.

### Behaviour notes

- The Gallery globe (`react-globe.gl`) is guarded: skipped under `prefers-reduced-motion` or when WebGL is unavailable; the country chips perform the identical selection (and are the keyboard path).
- `src/life/vite-env.d.ts` pulls in `vite/client` types so `import.meta.glob` type-checks under `tsc --noEmit`.
- `src/life/` imports nothing from `src/components`; `index.css` is untouched (styles are scoped in `src/life/life.css` under `.life-root`).

---

## Known issues

- `EXPERIENCE[].stat` is still in `constants.ts` but no longer rendered (the Experience left rail was removed). Harmless; data kept for possible reuse.
- The journal bundle triggers a Vite "chunk > 500 kB" warning at build. Pre-existing and benign — the journal is lazy-loaded and route-split off the portfolio's initial bundle.
- `lucide-react` has no WhatsApp glyph and its `Linkedin` export is deprecated; both live as local glyphs in `src/components/ui/icons.tsx` (alongside `GithubIcon`).
- The `/life` Gallery globe (`react-globe.gl` + `three`) builds a ~1.8 MB chunk. **Benign**: it is lazy + code-split, loads only on the Gallery tab when WebGL is available and reduced-motion is off, and is absent from the main and journal bundles. The main `index` chunk is unchanged by `/life`.
- `/life` ships with placeholder media: gallery countries show a "Coming soon" empty state until photos are added to `src/life/photos/`; golf milestones use picsum stills until clips are wired (`{ type: "youtube", id }`).
- A `/favicon.ico` 404 in the console is pre-existing and unrelated to any feature.

---

## Latest Session Summary — `/life` flow + Instagram contact

*Recorded 2026-05-19. Newest summary; the summaries below remain valid.*

Four scoped changes to the portfolio repo (the journal submodule was not touched):

1. **Gallery flow reworked** (`GlobeGallery.tsx`, `Globe.tsx`). `activeId` starts `null` — **no country is active on first load**; the globe just spins until the visitor picks one (pin or chip), and the photo section shows a "pick a country" prompt. Selecting a country no longer jumps straight to the 2D map. New `stage` machine: `globe` → `zoomed` (camera fly-in via the new `Globe.tsx` `viewMode="focus"`, globe slides right on lg / top on mobile, an animated "See 2D map?" panel enters on the left) → `map`. The globe stays mounted across globe↔zoomed so the fly-in animates rather than snapping. Back steps out one level. No-WebGL / reduced-motion still goes straight to the map (chips remain the full keyboard path).
2. **2D maps are enlargeable** (`CountryMap.tsx`). Wheel-toward-cursor zoom (native non-passive listener so the page does not scroll), +/- / reset buttons, drag-to-pan with clamped bounds. Wheel zoom is intentionally **gentle**: the delta is clamped to ±50 and passed through `exp(-d * 0.0012)` so one notch is a small predictable step (mouse and trackpad feel the same); the +/- buttons step by `1.4`. Max zoom is `9` (`MAX_K`) so dense maps (Japan, China) can be enlarged well past a glance. Only the region GEOMETRY scales (`vector-effect:non-scaling-stroke`); region labels, place pins and tooltips are re-projected through the same transform but rendered at a **constant size**, so zooming never squeezes the words. Region labels are sized in **screen pixels** (`(hot?19:15) / renderScale`, where `renderScale` is the measured viewBox-unit-to-px ratio from a ResizeObserver) so they read at a constant on-screen size on every country, including tall ones like Thailand whose SVG would otherwise scale fixed viewBox-unit text down to tiny; a dark `paint-order` halo keeps them legible over the busy province lines. View resets on country change.
3. **Golf timeline moved left + scroll-following** (`GolfJourney.tsx`). The old centred horizontal "Newbie → Now" bar is gone. lg+ now has a sticky **vertical** rail on the far left (grid col `7.5rem`): a progress fill rises with scroll, the active node lights up, and that chapter's **date pops out to the LEFT of the rail line** (AnimatePresence, re-pops on every section change) — deliberately left so the sticky media card on the right never covers it. Nodes are clickable (scroll-to-chapter). Mobile shows the date as a chip in each chapter header. New `date` field on `GolfMilestone` / `GOLF_MILESTONES` (placeholder years: 2021/2022/2023/2024/Today — Warren edits to the real dates).
4. **Instagram contact added everywhere, brand-gradient.** `PERSONAL_INFO.instagram` + `instagramUrl` (`https://www.instagram.com/warrenlimzf/`) in `constants.ts`; new `InstagramIcon` in `components/ui/icons.tsx` with an optional `gradient` prop (real IG gradient via an inline `linearGradient` keyed by `useId`; default `currentColor`); appended to `NAV_CONTACTS` (`App.tsx`, `gradientIcon: true`; the glyph is **neutral at rest like every other nav icon** and only reveals the gradient on hover/focus — `gradient` is passed as `gradientIcon ? active === i : undefined` — with the hover-tint override skipped; beam stays `#E1306C`) and `ITEMS` (`connect-with-us.tsx`, where the disc `--cc-bg` is the full IG gradient string so hover shows a white glyph on the real gradient, not flat pink; the disc carries a `cc-ig` class: on hover the gradient is painted to the full `border-box` with a transparent border so the "border" is the same gradient as the fill (no seam/ring), plus `overflow:hidden` and a softened `::before` sheen for a clean circle). The `public/instagram-icon.png` PNG is unused and can be deleted.

`npm run lint` and `npm run build` both pass. Only the pre-existing benign >500 kB chunk warning remains (lazy `Globe` / journal chunks). The recruiter-facing initial bundle is unchanged (`/life` stays lazy + code-split).

---

## Latest Session Summary — Redesign polish + `/life` area

*Recorded 2026-05-18. Newest summary; the journal note below remains valid.*

### Hero / contact polish
- `LampBackdrop` rebuilt as a wide ice-blue ambient ceiling wash (was a hard conic lamp that banded a bar over the intro text).
- `ContactConnect` rebuilt to the reference "SocialConnect" design (glass discs, hover lift+scale, per-brand glow, icon shake, label reveal); champagne-gold container glow; tone-aware; GitHub contact added; `GithubIcon` added to `ui/icons.tsx`. The nav rail is `LimelightContactRail` with `NAV_CONTACTS` (Email, LinkedIn, GitHub, WhatsApp).
- The Hero portrait "Backtest" card was removed.

### `/life` — "Beyond Work" personal area
- New route `/life/*` → lazy `src/life/LifeApp.tsx`; a "Beyond Work" nav pill was added in `App.tsx`. Those 3 `App.tsx` lines plus the `react-globe.gl` / `three` deps are the only pre-existing-file touchpoints.
- Self-contained `src/life/` (no imports from `src/components`; `index.css` untouched; styles scoped in `src/life/life.css`).
- Single page, data-driven tabs (`LIFE_TABS`: Gallery, Golf) synced to the URL hash; future sections are content additions.
- **Gallery**: 3D globe (`react-globe.gl`, lazy, WebGL/reduced-motion guarded with a chips fallback) of countries; pick a country, its photos fill the stage, opening a self-contained `Lightbox`. Photos are **local files** in `src/life/photos/<country>/` loaded via `import.meta.glob` (no Vercel Blob, decided against). Filename becomes the location label. An empty country shows a "Coming soon" state.
- **Golf**: scrollytelling milestones (newbie to now) with sticky media on desktop; YouTube/Vimeo facade (iframe mounts only on click; the YouTube still is auto-derived from the thumbnail, no poster file needed).
- Workflows for adding photos and golf clips: see the "/life — personal area" section above.

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

Claude pushes to `origin main` automatically after every successful edit — no permission needed. Hard stops only: secrets detected, build/lint fails, merge conflict, auth failure, destructive change. Full rules: `CLAUDE.md §Automatic GitHub workflow`.

### 7. Visual styling — current status

The `/journal` dark theme is stable. `AppLayout` provides `min-h-screen bg-background` for all protected routes. If new regressions appear, check: (a) portals have dark CSS variables, (b) `html.dark` is applied by `JournalApp.tsx`, (c) all `src/journal/**` imports use `@journal/` not `@/`.
