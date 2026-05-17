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

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { PERSONAL_INFO } from "./constants";
import { cn } from "./lib/utils";
import { LinkedinIcon, WhatsappIcon } from "./components/ui/icons";
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

// Contact rail in the nav. Neutral at rest, each tints to its own brand
// colour on hover (Email red, LinkedIn blue, WhatsApp green). The sliding
// "limelight" beam under the hovered icon is layered on in NavContactRail.
const NAV_CONTACTS = [
  {
    id: "email",
    Icon: Mail,
    label: "Email",
    href: `mailto:${PERSONAL_INFO.email}`,
    hover: "hover:text-[#E5484D]",
    external: false,
  },
  {
    id: "linkedin",
    Icon: LinkedinIcon,
    label: "LinkedIn",
    href: PERSONAL_INFO.linkedinUrl,
    hover: "hover:text-[#0A66C2]",
    external: true,
  },
  {
    id: "whatsapp",
    Icon: WhatsappIcon,
    label: "WhatsApp",
    href: `https://wa.me/${PERSONAL_INFO.phone.replace(/\D/g, "")}`,
    hover: "hover:text-[#25D366]",
    external: true,
  },
] as const;

// Contact rail with a hover-driven "limelight": a champagne beam slides
// under whichever icon the pointer (or keyboard focus) is on, with a soft
// downward cone. Icons also tint to their own brand colour on hover.
// Reduced motion is handled by the global CSS transition guard.
function NavContactRail({ scrolled }: { scrolled: boolean }) {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const beamRef = useRef<HTMLDivElement | null>(null);
  const [lit, setLit] = useState(false);

  const moveTo = (i: number) => {
    const el = itemRefs.current[i];
    const beam = beamRef.current;
    if (!el || !beam) return;
    beam.style.left = `${
      el.offsetLeft + el.offsetWidth / 2 - beam.offsetWidth / 2
    }px`;
    setLit(true);
  };

  return (
    <div
      className="relative flex items-center gap-1"
      onMouseLeave={() => setLit(false)}
    >
      {NAV_CONTACTS.map(({ id, Icon, label, href, hover, external }, i) => (
        <a
          key={id}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          aria-label={label}
          onMouseEnter={() => moveTo(i)}
          onFocus={() => moveTo(i)}
          onBlur={() => setLit(false)}
          className={cn(
            "relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:scale-110",
            scrolled ? "text-graphite" : "text-white/55",
            hover,
          )}
        >
          <Icon size={17} strokeWidth={1.9} />
        </a>
      ))}

      <div
        ref={beamRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-0 z-0 h-[3px] w-7 -translate-y-px rounded-full bg-gold transition-[left,opacity] duration-300 ease-out",
          lit ? "opacity-100" : "opacity-0",
        )}
        style={{ left: "-999px" }}
      >
        <div className="absolute left-[-40%] top-[3px] h-9 w-[180%] bg-gradient-to-b from-gold/35 to-transparent [clip-path:polygon(8%_100%,28%_0,72%_0,92%_100%)]" />
      </div>
    </div>
  );
}

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
          Warren Lim Zhan Feng
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

          <NavContactRail scrolled={scrolled} />

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
        <Route path="/*" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
