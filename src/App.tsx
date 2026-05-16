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

import { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { PERSONAL_INFO } from "./constants";
import { cn } from "./lib/utils";
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
        <a
          href="#top"
          className={cn(
            "font-display text-base font-semibold tracking-tight transition-colors duration-500",
            scrolled ? "text-navy" : "text-paper",
          )}
        >
          Warren Lim
        </a>

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
          <Link
            to="/journal"
            className={cn(
              "rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300",
              scrolled
                ? "border-line text-navy hover:border-navy"
                : "border-white/20 text-paper hover:border-gold-bright hover:text-gold-bright",
            )}
          >
            Journal
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
        <Route path="/*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
