/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useReducedMotion } from "motion/react";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import CaseCompetition from "./components/CaseCompetition";
import Projects from "./components/Projects";
import ResumeViewer from "./components/ResumeViewer";
import Marquee from "./components/Marquee";
import { PERSONAL_INFO } from "./constants";
import { ParticleHero } from "./components/ui/animated-hero";
import { CursorParticles } from "./components/ui/cursor-particles";
import JournalApp from "./journal/JournalApp";

// ─── Stealth footer sigil (kept as a bonus easter-egg) ──────────────────────
function StealthSigil({ onActivate }: { onActivate: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative inline-flex items-center cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onActivate}
      onKeyDown={(e) => e.key === "Enter" && onActivate()}
      role="button"
      tabIndex={0}
      aria-label="Access terminal"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="tip"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute -top-7 right-0 whitespace-nowrap pointer-events-none"
            style={{ fontFamily: "monospace", fontSize: "10px", color: "#64FFDA" }}
          >
            {">"} access terminal
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" as const }}
            >_</motion.span>
          </motion.span>
        )}
      </AnimatePresence>
      <motion.span
        style={{ fontFamily: "monospace", fontSize: "11px" }}
        animate={{ opacity: hovered ? 1 : 0.12, color: hovered ? "#64FFDA" : "#4B5563" }}
        transition={{ duration: 0.25 }}
      >{"{ }"}</motion.span>
    </div>
  );
}

// ─── Portfolio page ──────────────────────────────────────────────────────────
function Portfolio({ onJournalEnter }: { onJournalEnter: () => void }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [showIcons, setShowIcons] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setShowIcons(v > 600));
  }, [scrollY]);

  return (
    <>
      {/* Gold scroll progress thread */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] z-[102] origin-left"
        style={{ scaleX: scrollYProgress, backgroundColor: "#C4964D" }}
      />

      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            key="gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100vh" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] as const }}
            className="fixed inset-0 z-[9999]"
          >
            <ParticleHero primaryButton={{ text: "Interested", onClick: () => setIsUnlocked(true) }} />
          </motion.div>
        )}
      </AnimatePresence>

      {isUnlocked && <CursorParticles />}

      <main className={`relative bg-void text-[#F1F5FF] font-sans overflow-x-hidden scroll-smooth ${!isUnlocked ? "h-screen overflow-hidden" : "min-h-screen"}`}>

        {/* ── FLOATING GLASS NAV ── */}
        <nav className="fixed top-4 left-4 right-4 z-[100] flex items-center justify-between bg-[#0B0E1A]/85 backdrop-blur-xl border border-white/8 rounded-2xl px-6 py-3.5 transition-all duration-300">
          <div className="flex items-center gap-5">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold tracking-tight text-sm text-white"
            >
              {PERSONAL_INFO.fullName}
            </motion.span>

            <AnimatePresence>
              {showIcons && (
                <motion.div
                  initial={{ opacity: 0, x: -16, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -16, scale: 0.85 }}
                  className="flex items-center gap-2.5 pl-5 border-l border-white/10"
                >
                  <a href="#contacts" className="w-7 h-7 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform opacity-70 hover:opacity-100" title="Email">
                    <img src="/email-icon.png" className="w-full h-full object-contain" />
                  </a>
                  <a href="#contacts" className="w-7 h-7 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform opacity-70 hover:opacity-100" title="LinkedIn">
                    <img src="/linkedin-icon.png" className="w-full h-full object-contain" />
                  </a>
                  <a href="#contacts" className="w-7 h-7 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform opacity-70 hover:opacity-100" title="Phone">
                    <img src="/phone-icon.png" className="w-full h-full object-contain" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:flex items-center gap-7 text-[11px] font-bold uppercase tracking-widest">
            <a href="#experience" className="text-white/40 hover:text-white transition-colors duration-200">Experience</a>
            <a href="#work"       className="text-white/40 hover:text-white transition-colors duration-200">Work</a>
            <a href="#resume"     className="text-white/40 hover:text-white transition-colors duration-200">Resume</a>
            <button
              onClick={onJournalEnter}
              className="flex items-center gap-1.5 text-teal hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Trading Journal
              <span className="text-[9px] opacity-50">↗</span>
            </button>
          </div>
        </nav>

        {/* ── SECTIONS ── */}
        <Hero onJournalEnter={onJournalEnter} />
        <Marquee />
        <Experience />
        <Certificates />
        <CaseCompetition />
        <Projects onSelectProject={() => {}} />
        <ResumeViewer />

        {/* ── FOOTER ── */}
        <footer className="py-16 px-8 bg-void border-t border-white/5">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <span className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-medium">
              © 2026 {PERSONAL_INFO.fullName} — All Rights Reserved.
            </span>
            <StealthSigil onActivate={onJournalEnter} />
          </div>
        </footer>
      </main>
    </>
  );
}

// ─── App content — owns dark-wipe + routing ──────────────────────────────────
function AppContent() {
  const [wiping, setWiping] = useState(false);
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();

  return (
    <>
      {wiping && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-[#0A0A0F]"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: prefersReduced ? 0 : 0.9, ease: [0.76, 0, 0.24, 1] as const }}
          onAnimationComplete={() => { navigate("/journal"); setWiping(false); }}
        />
      )}
      <Routes>
        <Route path="/journal/*" element={<JournalApp />} />
        <Route path="/*" element={<Portfolio onJournalEnter={() => setWiping(true)} />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
