# Warren Lim | Personal Portfolio

A personal portfolio site for a penultimate Banking & Finance undergraduate at Nanyang Technological University (NTU). Clean minimalism, Apple-standard UX. The site is the host shell for the trading-journal frontend at `/journal/*` while the journal still lives on this domain.

**Live:** [warrenlimzf.com](https://warrenlimzf.com) — `/journal` route is the trade dashboard.
**Stack:** React 19 · TypeScript · Tailwind CSS v4 · `motion/react` · Vite 6 · Vercel.

---

## Layout

```
personal-website/
├── README.md
├── CLAUDE.md                ← standing rules for development
├── index.html · vite.config.ts · vercel.json · tsconfig.json · package.json
├── public/                  ← static assets (PDFs, headshot, icons, decks)
└── src/
    ├── App.tsx              ← BrowserRouter + portfolio shell + /journal route
    ├── main.tsx
    ├── constants.ts         ← ALL portfolio content (text, images, links)
    ├── index.css            ← Tailwind theme + shadcn tokens (journal)
    ├── lib/                 ← animation variants + cn() helper
    ├── components/          ← Hero, Experience, Certificates, Projects, Resume, etc.
    │   └── ui/              ← animated-hero, cursor-particles, connect-with-us, ImageOverlay
    └── journal/             ← git submodule → trading-journal repo
```

The `src/journal/` directory is a **git submodule** pointing to [`trading-journal`](https://github.com/WarrenLim1122/trading-journal). The submodule mounts the full trading-journal repo (which has its own standalone Vite scaffolding for future independent deployment); the integrated entry consumed by this site is at `src/journal/src/JournalApp.tsx`. Path alias `@journal/` resolves to `./src/journal/src` (see `vite.config.ts` and `tsconfig.json`).

## Working with the journal submodule

```bash
# First clone — pull submodule in one go
git clone --recurse-submodules https://github.com/WarrenLim1122/personal-website.git

# Or on an existing clone
git submodule update --init --recursive

# After upstream trading-journal commits, pull the latest into this repo
git submodule update --remote src/journal
git add src/journal
git commit -m "Sync trading-journal submodule"
```

Edit journal code directly in [`trading-journal`](https://github.com/WarrenLim1122/trading-journal); commit + push there; then bump the submodule pointer in this repo.

---

## Site features

- **Particle landing gate** — DOM-div grid particles translate toward the cursor with distance-based dampening; auto-mode sinusoidal animation when idle. Slides away on "Enter".
- **Cursor overlay** — Low-opacity canvas particle field on the main portfolio reacts to mouse proximity.
- **Hero layout** — Name + glass contact card on the left, headshot + CTAs on the right.
- **Certificate carousel** — Stacked category cards (CFI / Bloomberg / Analytical Skills); arrow + swipe to cycle.
- **Experience timeline** — Spring-physics scroll reveal with staggered bullets.
- **Projects / Case portfolio** — Full-screen modal viewer for PDFs/images.
- **Resume viewer** — Embedded PDF with download link.
- **Trade journal** (`/journal/*`) — Login via Firebase Auth; dashboard with chart overview, sortable list, calendar, win-vs-lose stats, equity curve; deposit/withdrawal cashflows; strategies; risk calculator; settings.

## Component map

| File | Responsibility |
| :--- | :--- |
| `App.tsx` | Route shell, landing gate, nav, `/journal/*` mount |
| `Hero.tsx` | Identity, contact card, CTA buttons |
| `Experience.tsx` | Animated career timeline |
| `Certificates.tsx` | Unified certificate category carousel |
| `CaseCompetition.tsx` | Team achievement gallery |
| `Projects.tsx` | Deal / project portfolio |
| `ResumeViewer.tsx` | CV preview & download |
| `ui/animated-hero.tsx` | Particle landing screen |
| `ui/cursor-particles.tsx` | Main-page cursor particle canvas |
| `ui/connect-with-us.tsx` | Glass contact card |
| `ui/ImageOverlay.tsx` | Full-screen PDF / image modal |
| `journal/src/JournalApp.tsx` | (submodule) Trade journal integration entry |

## Content updates

All portfolio text lives in **`src/constants.ts`**. Edit strings there — no component changes for copy/contact/certificate/experience updates.

## Theme

| Token | Value |
| :--- | :--- |
| Background | `#FBFBFD` |
| Primary (Navy) | `#0F3057` |
| Accent (Gold) | `#C4964D` |
| Landing bg | `#0a1628` |

The journal uses separate shadcn CSS variables in a `.dark` scope; the two systems do not conflict.

## Local dev

```bash
git submodule update --init --recursive   # first time only
npm install
npm run dev       # http://localhost:3000
npm run build
npm run lint      # tsc --noEmit
```

---

## Related repos

- [`trading-journal`](https://github.com/WarrenLim1122/trading-journal) — the journal source (this repo's `src/journal/` submodule). Will move to its own domain in the future.
- [`arbitrage-trading`](https://github.com/WarrenLim1122/arbitrage-trading) — the trading bot that writes deals into Firestore for the journal to render.

---

*Warren Lim Zhan Feng · NTU Banking & Finance · 2026*
