/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { X, Mail, Linkedin } from "lucide-react";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import CaseCompetition from "./components/CaseCompetition";
import Projects from "./components/Projects";
import ResumeViewer from "./components/ResumeViewer";
import { PERSONAL_INFO } from "./constants";
import { ParticleHero } from "./components/ui/animated-hero";
import { CursorParticles } from "./components/ui/cursor-particles";

export default function App() {
  const { scrollY } = useScroll();
  const showIconsThreshold = 600; // Show icons after hero
  const [showIcons, setShowIcons] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShowIcons(latest > showIconsThreshold);
    });
  }, [scrollY]);

  return (
    <>
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            key="hero-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100vh" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-[9999]"
          >
            <ParticleHero
              primaryButton={{
                text: "Interested",
                onClick: () => setIsUnlocked(true)
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {isUnlocked && <CursorParticles />}

      <main className={`relative bg-[#FBFBFD] text-[#1D1D1F] font-sans selection:bg-gold/20 overflow-x-hidden scroll-smooth ${!isUnlocked ? "h-screen overflow-hidden" : "min-h-screen"}`}>
      
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-white/60 backdrop-blur-xl border-b border-gray-100 px-8 py-5 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-6">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="font-bold tracking-tight text-base text-navy"
          >
            {PERSONAL_INFO.fullName}
          </motion.span>

          <AnimatePresence>
            {showIcons && (
              <motion.div 
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                className="flex items-center gap-3 pl-6 border-l border-gray-200"
              >
                  <a 
                    href="#contacts" 
                    className="w-8 h-8 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                    title="Email Contact Info"
                  >
                    <img src="/email-icon.png" className="w-full h-full object-contain"  />
                  </a>
                  <a 
                    href="#contacts" 
                    className="w-8 h-8 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                    title="LinkedIn Contact Info"
                  >
                    <img src="/linkedin-icon.png" className="w-full h-full object-contain"  />
                  </a>
                  <a 
                    href="#contacts" 
                    className="w-8 h-8 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                    title="Mobile Contact Info"
                  >
                    <img src="/phone-icon.png" className="w-full h-full object-contain"  />
                  </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
          <a href="#experience" className="hover:text-navy transition-colors duration-300">Experience</a>
          <a href="#work" className="hover:text-navy transition-colors duration-300">Work</a>
          <a href="#resume" className="hover:text-navy transition-colors duration-300">Resume</a>
        </div>
      </nav>

      {/* SECTIONS */}
      <Hero />
      <Experience />
      <Certificates />
      <CaseCompetition />
      <Projects onSelectProject={() => {}} />
      <ResumeViewer />

      {/* FOOTER */}
      <footer className="py-24 text-center text-[10px] text-gray-400 uppercase tracking-[0.5em] font-medium bg-white border-t border-gray-50">
        © 2026 {PERSONAL_INFO.fullName} — All Rights Reserved.
      </footer>
    </main>
    </>
  );
}
