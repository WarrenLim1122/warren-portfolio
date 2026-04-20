# Warren Lim | Personal Portfolio

A personal portfolio site for a penultimate Banking & Finance undergraduate at Nanyang Technological University (NTU). Built with a clean minimalism aesthetic and Apple-standard UX.

**Live:** [warren-portfolio.vercel.app](https://warren-portfolio.vercel.app) · **Stack:** React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Vite

---

## Features

- **Particle landing gate** — DOM-div grid particles that translate toward the cursor with distance-based dampening, auto-mode sinusoidal animation when idle, and a subtle oscillation on mouse stop. Slides away on "Enter".
- **Cursor overlay** — Low-opacity canvas particle field on the main portfolio that reacts to mouse proximity with a soft repel and glow.
- **Hero layout** — Name + subtitle + glass contact card on the left; headshot + stacked CTA buttons on the right.
- **Certificate carousel** — Single unified stack with category switching (CFI / Bloomberg / Analytical Skills). Left/right arrows change category with animated heading; inner arrows + swipe (mouse & touch) cycle through cards within a category. Dot legend below tracks active category.
- **Experience timeline** — Spring-physics scroll reveal with staggered bullet entrances.
- **Projects / Case portfolio** — Full-screen modal viewer for PDFs and images.
- **Resume viewer** — Embedded PDF with download link.

---

## Component Map

| File | Responsibility |
| :--- | :--- |
| `App.tsx` | Route shell, landing gate, nav, cursor overlay |
| `Hero.tsx` | Identity, contact card, CTA buttons |
| `Experience.tsx` | Animated career timeline |
| `Certificates.tsx` | Unified certificate category carousel |
| `CaseCompetition.tsx` | Team achievement gallery |
| `Projects.tsx` | Deal / project portfolio |
| `ResumeViewer.tsx` | CV preview & download |
| `ui/animated-hero.tsx` | Particle landing screen |
| `ui/cursor-particles.tsx` | Main-page cursor particle canvas |
| `ui/connect-with-us.tsx` | Glass contact card (email / LinkedIn / phone) |
| `ui/ImageOverlay.tsx` | Full-screen PDF / image modal |

---

## Content Updates

All text content lives in **`src/constants.ts`**. Edit strings there — no component changes needed for copy updates, contact details, or certificate/experience entries.

---

## Static Assets (`/public`)

| Purpose | Files |
| :--- | :--- |
| Identity | `headshot.jpg`, `email-icon.png`, `linkedin-icon.png`, `phone-icon.png` |
| Resume | `resume.pdf` |
| Certificates | `fmva-final.pdf/.jpg`, `cfi-1` → `cfi-14`, `cfi-e1` → `cfi-e3`, `bloomberg-*.pdf/.jpg`, `bac-excel-vba.*`, `google-data-analytics.*` |
| Case competition | `win-1.jpg`, `win-2.jpg` |
| Project decks | `acesis-deck.pdf`, `sunway-deck.pdf`, `acesis-icon.png`, `sunway-icon.png` |

---

## Theme

| Token | Value |
| :--- | :--- |
| Background | `#FBFBFD` |
| Primary (Navy) | `#0F3057` |
| Accent (Gold) | `#C4964D` |
| Landing bg | `#0a1628` |

---

## Local Dev

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
```

---

## Backlog

- **Golf / personal interests section** — embed unlisted YouTube videos to avoid GitHub's 100 MB file limit.

---

*Warren Lim Zhan Feng · NTU Banking & Finance · 2026*
