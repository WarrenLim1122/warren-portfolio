/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Portfolio-owned. Changes vs. original (per approved redesign):
 *  - Removed the blocking ParticleHero "Enter" gate and CursorParticles
 *    (cost recruiters time / read gimmicky).
 *  - Added ScrollProgress (read bar + section rail).
 *  - New section order + minimal institutional nav.
 *  - Router is preserved EXACTLY: /journal/* -> JournalApp, /* -> Portfolio.
 *    The src/journal submodule contract is untouched.
 */

import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { PERSONAL_INFO } from "./constants";
import { cn } from "./lib/utils";
import {
  LinkedinIcon,
  WhatsappIcon,
  GithubIcon,
  InstagramIcon,
} from "./components/ui/icons";
import {
  LimelightContactRail,
  type LimelightItem,
} from "./components/ui/limelight-nav";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import Skills from "./components/Skills";
import SelectedWorks from "./components/SelectedWorks";
import Recognition from "./components/Recognition";
import ResumeViewer from "./components/ResumeViewer";
import { ScrollProgress, type NavSection } from "./components/ui/ScrollProgress";
import { ContactConnect } from "./components/ui/connect-with-us";

// Route-level code split: the journal (Firebase, Recharts, Spline) is heavy
// and irrelevant to the recruiter-facing portfolio. Lazy-loading it keeps
// it entirely off the "/" initial bundle. Submodule source is untouched.
const JournalApp = lazy(() => import("./journal/src/JournalApp"));

// /life — the personal "Beyond Work" area. Fully isolated in src/life/;
// lazy so it never enters the recruiter site's initial bundle. To drop
// the project cleanly: delete src/life/ and remove this import, the
// /life route below, and the "Beyond Work" nav pill.
const LifeApp = lazy(() => import("./life/LifeApp"));

function JournalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/15 border-t-white/70" />
    </div>
  );
}

const SECTIONS: NavSection[] = [
  { id: "experience", label: "Experience" },
  { id: "credentials", label: "Credentials" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "recognition", label: "Recognition" },
  { id: "resume", label: "Resume" },
];

const NAV_LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#resume", label: "Resume" },
];

// Contact rail in the nav. Neutral at rest; the sliding limelight beam
// (and the icon itself) take on each contact's own brand colour on hover
// — Email red, LinkedIn blue, WhatsApp green. See LimelightContactRail.
const NAV_CONTACTS: LimelightItem[] = [
  {
    id: "email",
    Icon: Mail,
    label: "Email",
    href: `mailto:${PERSONAL_INFO.email}`,
    tint: "#E5484D",
    external: false,
  },
  {
    id: "linkedin",
    Icon: LinkedinIcon,
    label: "LinkedIn",
    href: PERSONAL_INFO.linkedinUrl,
    tint: "#0A66C2",
    external: true,
  },
  {
    id: "github",
    Icon: GithubIcon,
    label: "GitHub",
    href: PERSONAL_INFO.github,
    tint: "#6E7681",
    external: true,
  },
  {
    id: "whatsapp",
    Icon: WhatsappIcon,
    label: "WhatsApp",
    href: `https://wa.me/${PERSONAL_INFO.phone.replace(/\D/g, "")}`,
    tint: "#25D366",
    external: true,
  },
  {
    id: "instagram",
    Icon: InstagramIcon,
    label: "Instagram",
    href: PERSONAL_INFO.instagramUrl,
    tint: "#E1306C",
    external: true,
  },
];

function Portfolio() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen scroll-smooth bg-paper font-sans text-ink">
      <ScrollProgress sections={SECTIONS} />

      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 py-4 transition-all duration-500 md:px-12 lg:px-20",
          scrolled
            ? "border-b border-line bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="#top"
            className={cn(
              "font-display text-base font-semibold tracking-tight transition-colors duration-500",
              scrolled ? "text-navy" : "text-paper",
            )}
          >
            Warren Lim Zhan Feng
          </a>
          <span
            aria-hidden
            className={cn(
              "h-5 w-px transition-colors duration-500",
              scrolled ? "bg-navy/20" : "bg-white/25",
            )}
          />
          <LimelightContactRail
            items={NAV_CONTACTS}
            tone={scrolled ? "light" : "dark"}
          />
        </div>

        <div className="flex items-center gap-7">
          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
                  scrolled
                    ? "text-graphite hover:text-navy"
                    : "text-white/55 hover:text-paper",
                )}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* /life entry — hidden on the smallest screens so the nav
              doesn't crowd; remove with the rest of the /life additions
              to drop the project. */}
          <Link
            to="/life"
            className={cn(
              "hidden rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:inline-block",
              scrolled
                ? "border-line text-navy hover:border-navy"
                : "border-white/20 text-paper hover:border-gold-bright hover:text-gold-bright",
            )}
          >
            Beyond Work
          </Link>

          <Link
            to="/journal"
            className={cn(
              "rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300",
              scrolled
                ? "border-line text-navy hover:border-navy"
                : "border-white/20 text-paper hover:border-gold-bright hover:text-gold-bright",
            )}
          >
            Trading Journal
          </Link>
        </div>
      </nav>

      <main>
        <Hero />
        <Experience />
        <Certificates />
        <Skills />
        <SelectedWorks />
        <Recognition />
        <ResumeViewer />
      </main>

      <footer className="border-t border-line bg-paper px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-navy">
              {PERSONAL_INFO.fullName}
            </p>
            <p className="mt-2 max-w-sm text-sm text-graphite">
              {PERSONAL_INFO.availability}
            </p>
          </div>
          <ContactConnect tone="light" className="lg:max-w-xl" />
        </div>
        <div className="mx-auto mt-12 w-full max-w-6xl border-t border-line pt-6">
          <p className="u-eyebrow text-[10px] text-graphite/70">
            © {new Date().getFullYear()} {PERSONAL_INFO.fullName} · Built &amp;
            engineered by Warren Lim
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/journal/*"
          element={
            <Suspense fallback={<JournalLoading />}>
              <JournalApp />
            </Suspense>
          }
        />
        <Route
          path="/life/*"
          element={
            <Suspense fallback={<div className="min-h-screen bg-paper" />}>
              <LifeApp />
            </Suspense>
          }
        />
        <Route path="/*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
