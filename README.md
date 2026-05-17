# Warren Lim | Personal Portfolio

A personal portfolio site for a penultimate Banking & Finance undergraduate at Nanyang Technological University (NTU). Clean minimalism, Apple-standard UX. The site is the host shell for the trading-journal frontend at `/journal/*` while the journal still lives on this domain. A separate self-contained personal area, "Beyond Work", lives at `/life` (a 3D globe photo gallery + a golf scrollytelling journey).

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
    ├── App.tsx              ← BrowserRouter; /journal, /life, /* (Portfolio) routes + nav
    ├── main.tsx
    ├── constants.ts         ← ALL portfolio content (text, images, links)
    ├── index.css            ← Tailwind theme + shadcn tokens (journal)
    ├── lib/                 ← animation variants + cn() helper
    ├── components/          ← Hero, Experience, Certificates, Skills, SelectedWorks, Recognition, ResumeViewer, ImageOverlay
    │   └── ui/              ← Section, Reveal, ScrollProgress, StatBadge, MagneticButton, CarouselShell, LampBackdrop, limelight-nav, icons, connect-with-us
    ├── life/                ← self-contained "Beyond Work" area (route /life)
    │   ├── LifeApp.tsx · life-content.ts · gallery.ts · life.css
    │   ├── photos/<country>/   ← LOCAL aesthetic photos (drop files here)
    │   └── components/      ← LifeNav, GlobeGallery, Globe, CountryList, PhotoGrid, Lightbox, GolfJourney, GolfMilestone
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
- **Hero** — large full-colour headshot in a framed portrait, name + value prop on the left, a wide ice-blue ambient ceiling-wash backdrop, glass-disc contact panel.
- **Nav** — brand, `LimelightContactRail` (Email/LinkedIn/GitHub/WhatsApp; neutral at rest, sliding champagne limelight beam + per-brand hover tint), section links, "Beyond Work" pill (`/life`), "Trading Journal" pill (`/journal`).
- **Experience timeline** — scroll-reveal; role is the heading, company + date the subheading.
- **Certificates** — featured crown credential + category carousel (drag / arrows / keyboard), each card opens the shared image+PDF overlay.
- **Selected Works** — project cards with thumbnail glance media and a full case dialog (Context / Methodology / Outcome + source deck).
- **Recognition** — dark band, EAMC championship, stacked full-width team photos.
- **Resume viewer** — full-height CV preview with sticky download rail.
- **Beyond Work** (`/life`) — self-contained personal area: a 3D globe gallery of countries visited (photos served from a local folder) and a scrollytelling golf journey (unlisted YouTube clips). Lazy + code-split, so it never weighs down the recruiter site.
- **Trade journal** (`/journal/*`) — Login via Firebase Auth; dashboard with chart overview, sortable list, calendar, win-vs-lose stats, equity curve; deposit/withdrawal cashflows; strategies; risk calculator; settings.

## Component map

| File | Responsibility |
| :--- | :--- |
| `App.tsx` | Route shell (`/journal/*`, `/life/*`, `/*`), nav (brand, `LimelightContactRail`, Beyond Work + Trading Journal pills) |
| `Hero.tsx` | Identity, value prop, CTAs, contact panel, framed portrait, ambient lamp wash |
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
| `ui/icons.tsx` | `LinkedinIcon`, `GithubIcon`, `WhatsappIcon` brand glyphs |
| `ui/connect-with-us.tsx` | `ContactConnect` glass-disc panel, tone-aware (Email/LinkedIn/GitHub/WhatsApp) |
| `ui/limelight-nav.tsx` | `LimelightContactRail` nav contact rail (sliding beam) |
| `ui/` (other) | `Reveal`, `ScrollProgress`, `MagneticButton` |
| `life/LifeApp.tsx` | `/life` entry: tabbed Gallery + Golf, hash-synced |
| `life/gallery.ts` | Local-folder photo loader + `COUNTRY_META` |
| `life/life-content.ts` | Golf milestones, `LIFE_TABS`; re-exports gallery |
| `journal/src/JournalApp.tsx` | (submodule) Trade journal integration entry |

## Content updates

All portfolio text lives in **`src/constants.ts`**. Edit strings there; no component changes for copy/contact/certificate/experience updates.

`/life` content is separate from `constants.ts`: aesthetic photos are local files under `src/life/photos/<country>/` (the filename becomes the location label); countries and globe pins live in `src/life/gallery.ts` (`COUNTRY_META`); golf milestones and clip IDs live in `src/life/life-content.ts`. See "Beyond Work (`/life`) workflows" below.

## Theme

Refined palette (2026-05-17 redesign). Full token list + rationale: `CLAUDE.md` → Design system.

| Token | Hex | Use |
| :--- | :--- | :--- |
| `navy` | `#0F2C4A` | Headings / primary text on ivory |
| `gold` | `#C7A878` | Muted champagne (the only accent) |
| `gold-bright` | `#D8C29A` | Champagne on the dark surface |
| `paper` | `#F7F5F0` | Warm ivory background |
| `ink` | `#16202C` | Body text |
| `graphite` | `#5C636E` | Secondary text |
| `surface` | `#0A1A2F` | The single dark canvas (Hero + Recognition) |

The journal uses separate shadcn CSS variables in a `.dark` scope; the two systems do not conflict.

## Beyond Work (`/life`) workflows

**Add aesthetic photos** — drop image files into `src/life/photos/<country>/` (e.g. `src/life/photos/japan/kyoto-temple.jpg`). The filename becomes the location label shown on the photo (a leading `01-` controls order; a trailing `-2` just keeps names unique). Supported: `.jpg .jpeg .png .webp .avif`. Keep them web-sized (~2000px long edge, 200 to 600 KB) since they live in git. No code change is needed. For a new country, add `{ id, name, lat, lng, order }` to `COUNTRY_META` in `src/life/gallery.ts` and create the matching folder. Details: `src/life/photos/README.md`.

**Add a golf clip (YouTube):**

1. youtube.com → **Create** → **Upload video**; select the clip; give it a title.
2. Visibility: choose **Unlisted** (not Private; Private videos cannot be embedded).
3. Copy the video ID from the URL: `youtube.com/watch?v=ABC123` gives `ABC123` (or the part after `youtu.be/`).
4. In `src/life/life-content.ts`, set that milestone's `media: { type: "youtube", id: "ABC123" }`.
5. Done. The still is taken from the YouTube thumbnail automatically and the player only loads when a visitor clicks play.

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
