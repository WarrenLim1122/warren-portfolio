# Portfolio Redesign Pass — Design & Record (2026-05-17)

Branch: `redesign/recruiter-conversion`. Approved interactively by Warren, then implemented in the same session.

## Decision: palette + section rhythm

Chosen direction: **"Refined upgrade + intentional rhythm"** (over all-dark, all-light, ink+emerald).

- Midnight `--color-surface #0A1A2F`, warm ivory `--color-paper #F7F5F0`, body ink `#16202C`, muted champagne accent `--color-gold #C7A878`, hairline `#E3E1DA`.
- Dark/light rhythm is deliberate: Hero (dark) → Experience · Credentials · Skills · Work (light) → Recognition (dark) → Resume (light). Hero and Recognition share the **exact same** surface.
- The journal's `.dark` shadcn token block in `index.css` is untouched.

## Scope implemented

1. **`index.css`** — palette `@theme` tokens rewritten; `grain-card` warmed.
2. **`constants.ts`** — all rendered em/en dashes restructured (commas / colons / parentheses / "to" for ranges); compound-word hyphens kept.
3. **`components/ui/icons.tsx`** (new) — `LinkedinIcon`, `WhatsappIcon` brand glyphs (lucide has no WhatsApp; lucide `Linkedin` is deprecated).
4. **`connect-with-us.tsx`** — phone → WhatsApp (`https://wa.me/<digits>`, label "WhatsApp"); LinkedIn switched to local glyph.
5. **`App.tsx`** — brand "Warren Lim Zhan Feng"; pill "Trading Journal"; new `NavContactRail` (Email/LinkedIn/WhatsApp, neutral rest, hover-tint red/blue/green).
6. **`Hero.tsx` + `LampBackdrop.tsx`** (new) — lamp light effect adapted to `motion/react` + palette tokens (no Next/shadcn/framer-motion deps); headshot ~1.5× larger and full colour; eyebrow enlarged.
7. **`Experience.tsx`** — left rail (decorative StatBadge + duration) removed; Position is the heading, Company + date the subheading; spine kept.
8. **`CarouselShell.tsx`** — pointer-capture deferred until a real drag move, fixing the "certificates won't open" bug (capture-on-pointerdown was swallowing the card click).
9. **`SelectedWorks.tsx`** — project `thumbnail` shown as glance media; gamified interactions (level index, media zoom, animated underline, moving arrow).
10. **`Recognition.tsx`** — both team photos full-width stacked (second matches the first); title/alt dashes removed.
11. **`StatBadge.tsx` + `ResumeViewer.tsx`** — `count={false}` opt-out added; GPA renders static `4.61` (no broken-looking count-up); CV shown in full (no `max-h` clamp); left rail sticky and top-aligned.
12. **`CLAUDE.md`** — architecture / file-structure / colour tokens / content table refreshed; "Standing preferences" section added.
13. **`NavContactRail` limelight** — sliding champagne beam under the hovered icon (final polish task, per instruction).

## Verification

`npm run build` and `npm run lint` (tsc --noEmit) both pass clean. Trading-journal submodule untouched.
