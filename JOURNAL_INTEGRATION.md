# JOURNAL_INTEGRATION.md

Permanent reference for how the trading journal is integrated into this portfolio repo.

**Source repo:** https://github.com/WarrenLim1122/trading-journal.git  
**Local source path:** `/Users/warrenlimzhanfeng/trading-journal/`  
**Live route:** `warrenlimzf.com/journal`  
**Integration path:** `src/journal/` inside this portfolio repo

---

## 1. Integration structure

The trading journal is not a submodule or subtree — it is a **manual file copy** into `src/journal/`. The portfolio owns all tooling (Vite, React Router, Tailwind, index.css). The journal's own `App.tsx`, `main.tsx`, `index.html`, `index.css`, `vite.config.ts`, and `package.json` are **not copied**.

```
my-portfolio/
└── src/
    └── journal/                        ← everything from trading-journal/src/ lives here
        ├── JournalApp.tsx              ← CREATED (not from source) — routing wrapper
        ├── firebase-applet-config.json ← COPIED from trading-journal root
        ├── contexts/
        │   └── AuthContext.tsx
        ├── lib/
        │   ├── firebase.ts             ← COPIED + import path fixed
        │   ├── tradeService.ts
        │   └── utils.ts
        ├── types/
        │   └── trade.ts
        ├── pages/
        │   ├── Login.tsx               ← COPIED + navigate path fixed
        │   └── Dashboard.tsx           ← COPIED + back button + asChild fix
        └── components/
            ├── dashboard/
            │   ├── AddTradeDialog.tsx
            │   ├── CalendarView.tsx
            │   ├── ChartOverview.tsx
            │   ├── EditTradeDialog.tsx
            │   ├── EquityCurve.tsx     ← COPIED + props interface + formatter fix
            │   ├── ListOverview.tsx
            │   └── WinsVsLosses.tsx    ← COPIED + "LOSS"→"LOSE" + breakevenRate fix
            └── ui/
                ├── button.tsx
                ├── calendar.tsx
                ├── card.tsx
                ├── dialog.tsx
                ├── dropdown-menu.tsx
                ├── hover-card.tsx
                ├── input.tsx
                ├── label.tsx
                ├── popover.tsx
                ├── select.tsx
                ├── splite.tsx
                ├── spotlight.tsx
                ├── table.tsx
                └── tabs.tsx
```

---

## 2. Files copied from source repo

**From `trading-journal/src/` → `src/journal/`** (preserving subdirectory structure):

| Source path | Destination path | Notes |
|---|---|---|
| `src/contexts/AuthContext.tsx` | `src/journal/contexts/AuthContext.tsx` | No changes |
| `src/lib/firebase.ts` | `src/journal/lib/firebase.ts` | Import path changed (see §12) |
| `src/lib/tradeService.ts` | `src/journal/lib/tradeService.ts` | No changes |
| `src/lib/utils.ts` | `src/journal/lib/utils.ts` | `@/` → `@journal/` |
| `src/types/trade.ts` | `src/journal/types/trade.ts` | No changes |
| `src/pages/Login.tsx` | `src/journal/pages/Login.tsx` | `navigate("/")` → `navigate("/journal")` |
| `src/pages/Dashboard.tsx` | `src/journal/pages/Dashboard.tsx` | Back button added; `asChild` → `render` prop |
| `src/components/dashboard/*.tsx` | `src/journal/components/dashboard/*.tsx` | `@/` → `@journal/`; some files have bug fixes |
| `src/components/ui/*.tsx` (all 14) | `src/journal/components/ui/*.tsx` | `@/` → `@journal/` |

**From `trading-journal/` root → `src/journal/`**:

| Source path | Destination path | Notes |
|---|---|---|
| `firebase-applet-config.json` | `src/journal/firebase-applet-config.json` | Safe to commit — client-side keys only |

---

## 3. Files NOT copied from source repo

These files exist in the source repo but must **never** be copied — they would collide with or overwrite portfolio infrastructure:

| Source file | Reason to skip |
|---|---|
| `src/App.tsx` | Portfolio owns the router |
| `src/main.tsx` | Portfolio owns the entry point |
| `src/index.css` | Merged manually into portfolio's index.css |
| `index.html` | Portfolio owns the HTML shell |
| `vite.config.ts` | Portfolio owns the build config |
| `package.json` | Portfolio owns all dependencies |
| `tsconfig.json` | Portfolio owns TypeScript config |
| `components.json` | shadcn CLI config — not needed at runtime |
| `eslint.config.js` | Dev tooling — not needed |
| `firestore.rules` | Deploy separately via Firebase CLI, not via this repo |
| `firestore.rules.test.ts` | Dev tooling |
| `firebase-blueprint.json` | Dev reference only |
| `security_spec.md` | Dev reference only |
| `metadata.json` | AI Studio metadata |
| `README.md` | Source repo docs |

---

## 4. Import path conversion

The trading journal source uses `@/` as an alias for `src/`. After copying into this portfolio (where `@/` points to the **project root**, not `src/`), all `@/` references in journal files must be rewritten to `@journal/`.

**Rule:** every occurrence of `@/` inside `src/journal/**` becomes `@journal/`.

**Example:**
```ts
// source repo
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// after copying into src/journal/
import { cn } from "@journal/lib/utils";
import { Button } from "@journal/components/ui/button";
```

When syncing updated files, run this sed command over the copied files to batch-convert:
```bash
find src/journal -type f -name "*.tsx" -o -name "*.ts" | \
  xargs sed -i '' 's|from "@/|from "@journal/|g'
```

---

## 5. `@journal` alias

The `@journal` alias resolves to `src/journal/` and is configured in two places:

**`vite.config.ts`** — build-time resolution  
**`tsconfig.json`** — IDE and type-check resolution

Both must be kept in sync. If a new alias is needed for the journal, add it to both files.

---

## 6. Changes to `vite.config.ts`

Added `@journal` alias **before** the existing `@` alias (order matters — more-specific first):

```ts
resolve: {
  alias: {
    '@journal': path.resolve(__dirname, './src/journal'),  // ← ADDED
    '@': path.resolve(__dirname, '.'),                     // existing — points to project root
  },
},
```

No other changes. The existing `GEMINI_API_KEY` define and HMR setting were left untouched.

---

## 7. Changes to `App.tsx`

All existing portfolio logic was preserved unchanged inside a `Portfolio()` function component. The root `App` component was rewritten to own the router:

```tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import JournalApp from "./journal/JournalApp";

// Portfolio() — all existing layout, gate logic, nav, sections unchanged
function Portfolio() { ... }

// Root — owns BrowserRouter; journal gets /journal/*
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/journal/*" element={<JournalApp />} />
        <Route path="/*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
```

A `<Link to="/journal">` was also added to the portfolio nav (gold color, uppercase, matching the existing nav style).

---

## 8. Changes to `index.css`

The journal's shadcn/Base UI CSS variables were **appended** to the end of the existing file. Nothing was removed or overwritten.

What was appended:
1. `@import "tw-animate-css"` — animation utilities for shadcn components
2. `@import "@fontsource-variable/geist"` — Geist font for journal UI
3. `@custom-variant dark (&:is(.dark *))` — Tailwind 4 dark mode variant, activated by `<div class="dark">` wrapper in JournalApp
4. `@theme inline { ... }` — maps CSS custom properties to Tailwind color tokens
5. `:root { ... }` — light mode CSS variable values (shadcn defaults)
6. `.dark { ... }` — dark mode CSS variable values (activated in journal only)
7. `.no-scrollbar` and `.custom-scrollbar` utilities

**Why no conflict with portfolio styles:** The portfolio uses `--color-navy`, `--color-gold`, `--color-paper` (custom `@theme` tokens). The journal's shadcn tokens use `--background`, `--foreground`, `--primary`, etc. These are completely separate namespaces. The `.dark` class is only applied inside `JournalApp`'s wrapper div, so portfolio pages are never affected.

---

## 9. Changes to `vercel.json`

Added an SPA rewrite rule so that `/journal` and `/journal/login` don't 404 on hard refresh:

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

The rewrite was not present in the original portfolio `vercel.json` because the portfolio used hash-based navigation only. It is now required for React Router paths to work on Vercel.

---

## 10. Dependencies added to `package.json`

These were installed via `npm install` — the `package.json` was not hand-edited.

**Runtime dependencies added for the journal:**

| Package | Purpose |
|---|---|
| `react-router-dom ^7.14.2` | Client-side routing (portfolio + journal) |
| `firebase ^12.12.1` | Auth and Firestore |
| `@base-ui/react ^1.4.1` | Headless UI primitives for shadcn components |
| `class-variance-authority ^0.7.1` | CVA — variant styling for shadcn Button etc. |
| `date-fns ^4.1.0` | Date utilities (CalendarView, trade dates) |
| `framer-motion ^12.38.0` | Motion library used by journal components |
| `jspdf ^4.2.1` | PDF export |
| `jspdf-autotable ^5.0.7` | PDF table formatting |
| `recharts ^3.8.1` | Charts (EquityCurve, WinsVsLosses) |
| `tw-animate-css ^1.4.0` | CSS animations for shadcn transitions |
| `uuid ^14.0.0` | Trade ID generation |
| `xlsx ^0.18.5` | Excel export |
| `@splinetool/react-spline ^4.1.0` | 3D scene on login page |
| `@splinetool/runtime ^1.12.90` | Spline runtime |
| `@fontsource-variable/geist ^5.2.8` | Geist font |
| `react-day-picker ^9.14.0` | Calendar component |
| `shadcn ^4.6.0` | shadcn CLI (devDep) |

**Dev dependencies added:**

| Package | Purpose |
|---|---|
| `@types/react ^19` | React 19 type definitions |
| `@types/react-dom ^19` | ReactDOM type definitions |
| `@types/uuid` | UUID type definitions |

---

## 11. How the `/journal` route works

```
User visits warrenlimzf.com/journal
  → Vercel rewrite sends request to index.html
  → React app boots, BrowserRouter reads the path
  → Route path="/journal/*" matches → renders <JournalApp />
  → JournalApp wraps everything in <AuthProvider> and <div class="dark">
  → If user is not authenticated → <Navigate to="/journal/login" replace />
  → If user is authenticated → renders <Dashboard />

User visits warrenlimzf.com/journal/login
  → Same Vercel rewrite → index.html → BrowserRouter
  → Route path="/journal/*" matches
  → "login" relative path matches the <Route path="login"> inside JournalApp
  → Renders <Login />
  → After successful sign-in, Login navigates to "/journal"
```

The `<Route path="/journal/*">` in App.tsx strips `/journal` from the path before passing it to JournalApp's `<Routes>`. So inside JournalApp, `path="login"` matches `/journal/login` and `index` matches `/journal` exactly.

---

## 12. Firebase config

The client config file is `src/journal/firebase-applet-config.json`. It is safe to commit — Firebase security is enforced by Firestore rules, not by keeping the config secret.

`src/journal/lib/firebase.ts` imports it with a relative path:
```ts
import firebaseConfig from "../firebase-applet-config.json";
```

**Why this path was changed from the source:** In the source repo, `firebase.ts` lives at `src/lib/firebase.ts` and the config is at the root, so the import was `../../firebase-applet-config.json`. After copying into `src/journal/lib/firebase.ts`, one `../` level was removed — `../firebase-applet-config.json` now correctly resolves to `src/journal/firebase-applet-config.json`.

When syncing from the source repo: do **not** overwrite the import path in `firebase.ts`. The source repo's relative path is wrong for this repo's layout.

---

## 13. How to test locally

```bash
npm run dev
# Dev server starts at http://localhost:3000 (or 5173 if port 3000 is taken)
```

| URL | Expected behaviour |
|---|---|
| `http://localhost:PORT/` | Portfolio — entry gate (ParticleHero), then scrollable sections |
| `http://localhost:PORT/journal` | Redirects to `/journal/login` if not signed in |
| `http://localhost:PORT/journal/login` | Login page with 3D Spline background |
| `http://localhost:PORT/journal` (after login) | Dashboard with trade data |
| Hard refresh on `/journal` | Should NOT 404 (Vite dev server handles all paths; Vercel rewrite handles production) |

Type-check (no build required):
```bash
npm run lint   # tsc --noEmit — must report zero errors
```

Production build:
```bash
npm run build  # outputs to dist/
```

---

## 14. How to sync future updates from the trading-journal repo

### Before starting

1. Read this file (`JOURNAL_INTEGRATION.md`) — understand what was changed during integration.
2. In the trading-journal repo, check for `AI_STUDIO_RULES.md` — if it exists, read it first. It may contain rules that override default behaviour.
3. Check for `CHANGELOG.md` in the trading-journal repo — if present, read it to find out which files changed since the last sync.
4. If no changelog exists, use `git log` or `git diff` in the trading-journal repo to identify changed files since the last sync commit (last sync commit is recorded in §17).

### What to sync (and what not to)

**Sync these:** Any changed files under `src/` in the trading-journal repo that correspond to files in `src/journal/` here.

**Never sync / always skip:**
- `src/App.tsx` (source) — the portfolio's `App.tsx` is completely different
- `src/main.tsx` — portfolio owns the entry point
- `src/index.css` — portfolio owns styles; shadcn tokens were appended manually
- `index.html`, `vite.config.ts`, `package.json`, `tsconfig.json` — portfolio infrastructure
- Any file in the "Files NOT copied" list in §3

### Step-by-step sync process

```bash
# 1. Pull latest changes in the trading-journal source repo
cd /Users/warrenlimzhanfeng/trading-journal
git pull

# 2. See what changed since last sync (replace <last-sync-commit> with the commit hash)
git diff --name-only <last-sync-commit> HEAD -- src/

# 3. For each changed file in src/ (except the skipped ones), copy it:
#    Example: src/components/dashboard/EquityCurve.tsx changed
cp src/components/dashboard/EquityCurve.tsx \
   /Users/warrenlimzhanfeng/my-portfolio/src/journal/components/dashboard/EquityCurve.tsx

# 4. Convert @/ imports to @journal/ in the freshly copied file(s):
sed -i '' 's|from "@/|from "@journal/|g' \
  /Users/warrenlimzhanfeng/my-portfolio/src/journal/components/dashboard/EquityCurve.tsx

# 5. Re-apply any compatibility patches (see §15) to changed files
# 6. Run lint to catch new type errors:
cd /Users/warrenlimzhanfeng/my-portfolio
npm run lint

# 7. Test locally:
npm run dev
```

### If `firebase-applet-config.json` changes in the source repo
Copy it again — it is safe to overwrite (it's just client config, no path changes needed):
```bash
cp /Users/warrenlimzhanfeng/trading-journal/firebase-applet-config.json \
   /Users/warrenlimzhanfeng/my-portfolio/src/journal/firebase-applet-config.json
```

### If new files are added to the source repo
Copy them into the corresponding location under `src/journal/`, run the `sed` import rewrite, then run `npm run lint`.

### If new npm dependencies are added to trading-journal's `package.json`
Install them in this repo manually:
```bash
npm install <new-package>
```
Do not copy `package.json` from the source repo.

---

## 15. Compatibility patches — do not overwrite these

These are changes made to copied files that fix bugs or adapt the code to this repo's context. If a future sync overwrites these files, re-apply the patches below.

### `src/journal/lib/firebase.ts`
**Change:** Import path for `firebase-applet-config.json`
```ts
// CORRECT for this repo (src/journal/lib/ → ../  = src/journal/)
import firebaseConfig from "../firebase-applet-config.json";

// Source repo has (WRONG here — resolves to src/firebase-applet-config.json):
// import firebaseConfig from "../../firebase-applet-config.json";
```

### `src/journal/pages/Login.tsx`
**Change:** Post-login redirect path
```ts
// CORRECT for this repo
navigate("/journal");

// Source repo has (WRONG here — sends user to portfolio homepage):
// navigate("/");
```

### `src/journal/pages/Dashboard.tsx`
**Change 1:** "← Portfolio" back button in header (added above the existing logout button area):
```tsx
import { Link } from "react-router-dom";

// In the header section:
<Link
  to="/"
  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground border border-border rounded-lg px-3 h-8 hover:text-white hover:border-white/30 transition-colors"
>
  ← Portfolio
</Link>
```

**Change 2:** Export dropdown trigger — Base UI uses `render` prop, not `asChild`:
```tsx
// CORRECT for this repo (Base UI pattern)
<DropdownMenuTrigger render={
  <Button variant="outline" size="sm" className="font-mono h-9 gap-2">
    <Download size={16} /> Export
  </Button>
} />

// Source repo uses Radix UI asChild (WRONG here — TypeScript error with @base-ui/react):
// <DropdownMenuTrigger asChild>
//   <Button variant="outline" size="sm" className="font-mono h-9 gap-2">
//     <Download size={16} /> Export
//   </Button>
// </DropdownMenuTrigger>
```

### `src/journal/components/dashboard/EquityCurve.tsx`
**Change 1:** Props interface accepts optional external controlled state (Dashboard.tsx passes these props):
```tsx
interface Props {
  trades: Trade[];
  startingBalance?: string;
  setStartingBalance?: (v: string) => void;
}
export function EquityCurve({ trades, startingBalance: externalBalance, setStartingBalance: externalSetBalance }: Props) {
  const [internalBalance, setInternalBalance] = useState("1000");
  const startingBalance = externalBalance ?? internalBalance;
  const setStartingBalance = externalSetBalance ?? setInternalBalance;
  // ...
}
```

**Change 2:** Recharts tooltip formatter — remove explicit `number` type annotation (Recharts `ValueType` can be undefined):
```tsx
// CORRECT
formatter={(value) => { return [`${Number(value).toFixed(2)}`, 'Balance'] }}

// Source repo (TypeScript error — value could be undefined):
// formatter={(value: number) => ...}
```

### `src/journal/components/dashboard/WinsVsLosses.tsx`
**Change 1:** Trade outcome typo — source repo uses `"LOSS"` but `Trade` type defines it as `"LOSE"`:
```tsx
// CORRECT
trades.filter(t => t.outcome === "LOSE")
if (t.outcome === "LOSE") stratMap[strat].loss += 1;

// Source repo (TypeScript error — "WIN" | "LOSE" | "BREAKEVEN" has no overlap with "LOSS"):
// trades.filter(t => t.outcome === "LOSS")
// if (t.outcome === "LOSS") stratMap[strat].loss += 1;
```

**Change 2:** `breakevenRate` must be included in the `useMemo` return object (it is computed but was missing from the return):
```tsx
// CORRECT — include breakevenRate in the returned object
return { winRate, lossesRate, breakevenRate, breakevens, totalProfit, totalTrades: total, wins, losses, strategyData, tradeData };

// Source repo (TypeScript error — stats.breakevenRate does not exist):
// return { winRate, lossesRate, breakevens, totalProfit, ... };
```

---

## 16. Post-sync workflow

After every successful sync from the trading-journal repo, do the following before closing the Claude Code session:

**Step 1 — Confirm zero lint errors:**
```bash
npm run lint   # must output nothing
```

**Step 2 — Confirm build passes:**
```bash
npm run build
```

**Step 3 — Update the integration history table in §17.**

**Step 4 — Commit and push the personal website repo:**
```bash
git add -A
git commit -m "Sync trading journal — <brief description of what changed>"
git push origin main
```

**Step 5 — Reset Google AI Studio context.**
Open `GOOGLE_AI_STUDIO_RESET_PROMPT.md`, copy the full prompt inside, and paste it into Google AI Studio as the first message of a new session before making any more journal changes.

---

## 17. Integration history

| Date | Sync type | Summary |
|---|---|---|
| 2026-05-04 | Initial integration | Full copy of trading-journal `src/` into `src/journal/`. All TypeScript errors resolved. `npm run lint` zero errors. Production build passes. |
