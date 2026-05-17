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
    ├── components/          ← Hero, Experience, Certificates, Skills, SelectedWorks, Recognition, ResumeViewer, ImageOverlay
    │   └── ui/              ← Section, Reveal, ScrollProgress, StatBadge, MagneticButton, CarouselShell, Hero3DStage, LampBackdrop, icons, connect-with-us
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

- **No landing gate** — opens straight into the Hero (the old particle gate and cursor overlay were removed as recruiter friction).
- **Hero** — large full-colour headshot, name + value prop on the left, 3D stage on the right, animated lamp light backdrop, contact strip.
- **Nav** — brand, section links, `NavContactRail` (Email/LinkedIn/WhatsApp; neutral at rest, hover-tints red/blue/green with a sliding limelight beam), Trading Journal pill.
- **Experience timeline** — scroll-reveal; role is the heading, company + date the subheading.
- **Certificates** — featured crown credential + category carousel (drag / arrows / keyboard), each card opens the shared image+PDF overlay.
- **Selected Works** — project cards with thumbnail glance media and a full case dialog (Context / Methodology / Outcome + source deck).
- **Recognition** — dark band, EAMC championship, stacked full-width team photos.
- **Resume viewer** — full-height CV preview with sticky download rail.
- **Trade journal** (`/journal/*`) — Login via Firebase Auth; dashboard with chart overview, sortable list, calendar, win-vs-lose stats, equity curve; deposit/withdrawal cashflows; strategies; risk calculator; settings.

## Component map

| File | Responsibility |
| :--- | :--- |
| `App.tsx` | Route shell, nav (brand, `NavContactRail`, Trading Journal pill), `/journal/*` mount |
| `Hero.tsx` | Identity, value prop, CTAs, contact strip, lamp backdrop |
| `Experience.tsx` | Career timeline (role = heading, company + date = sub) |
| `Certificates.tsx` | Featured crown credential + category carousel |
| `Skills.tsx` | Three capability buckets |
| `SelectedWorks.tsx` | Project cards (thumbnail glance) + case dialog |
| `Recognition.tsx` | Dark band, EAMC win, stacked team photos |
| `ResumeViewer.tsx` | Full-height CV preview & download |
| `ImageOverlay.tsx` | Full-screen image / PDF modal (shared) |
| `ui/Section.tsx` | Editorial section shell (index/eyebrow/title) |
| `ui/LampBackdrop.tsx` | Hero lamp light (motion/react, palette tokens) |
| `ui/CarouselShell.tsx` | Drag/arrow carousel engine |
| `ui/StatBadge.tsx` | Big tabular metric (`count={false}` for static) |
| `ui/icons.tsx` | `LinkedinIcon`, `WhatsappIcon` brand glyphs |
| `ui/connect-with-us.tsx` | Theme-aware contact strip (Email/LinkedIn/WhatsApp) |
| `ui/` (other) | `Reveal`, `ScrollProgress`, `MagneticButton`, `Hero3DStage` |
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
