/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Download } from "lucide-react";
import { PERSONAL_INFO } from "../constants";
import { ContactConnect } from "./ui/connect-with-us";

interface HeroProps {
  onJournalEnter: () => void;
}

const blurReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const springBtn = { type: "spring" as const, stiffness: 400, damping: 30 };

export default function Hero({ onJournalEnter }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const headShotY  = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textY      = useTransform(scrollYProgress, [0, 1], [0, -28]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-20 w-full overflow-hidden bg-void"
    >
      {/* Gradient mesh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-1/3 -left-1/4 w-[60%] h-[60%] rounded-full blur-[140px]"
          style={{ backgroundColor: "rgba(196,150,77,0.07)", animation: "gradient-pulse 9s ease-in-out infinite" }}
        />
        <div
          className="absolute -bottom-1/3 -right-1/4 w-[55%] h-[55%] rounded-full blur-[140px]"
          style={{ backgroundColor: "rgba(100,255,218,0.05)", animation: "gradient-pulse 12s ease-in-out infinite reverse" }}
        />
      </div>

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20 relative z-10">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          className="flex-1 flex flex-col justify-center gap-8 min-w-0"
          style={{ y: prefersReduced ? 0 : textY }}
        >
          {/* Meta label row */}
          <motion.div
            {...(prefersReduced ? {} : blurReveal(0.08))}
            className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.35em] text-white/25"
          >
            <span>Portfolio</span>
            <span className="w-8 h-px bg-white/15" />
            <span>2026</span>
            <span className="w-8 h-px bg-white/15" />
            <span>Singapore</span>
          </motion.div>

          {/* Dual identity badges */}
          <motion.div
            {...(prefersReduced ? {} : blurReveal(0.18))}
            className="flex flex-wrap gap-3"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/25 bg-gold/8 text-gold text-[11px] font-bold uppercase tracking-[0.18em]">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" style={{ animation: "gradient-pulse 2s ease-in-out infinite" }} />
              Banking &amp; Finance · NTU
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal/25 bg-teal/8 text-teal text-[11px] font-bold uppercase tracking-[0.18em]">
              <span className="w-1.5 h-1.5 rounded-full bg-teal" style={{ animation: "gradient-pulse 2s ease-in-out infinite 0.5s" }} />
              Algo Trader · Builder
            </span>
          </motion.div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(3rem, 9vw, 8rem)", lineHeight: 0.9, fontWeight: 700, letterSpacing: "-0.03em" }}>
            <motion.span className="block text-white" {...(prefersReduced ? {} : blurReveal(0.28))}>
              Warren,
            </motion.span>
            <motion.span
              className="block"
              style={{ backgroundImage: "linear-gradient(135deg, #ffffff 30%, #C4964D 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              {...(prefersReduced ? {} : blurReveal(0.40))}
            >
              Lim Zhan Feng
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-white/45 text-base md:text-lg font-light leading-relaxed max-w-lg"
            {...(prefersReduced ? {} : blurReveal(0.50))}
          >
            Penultimate Banking and Finance undergraduate at{" "}
            <span className="text-white/75 font-medium">Nanyang Technological University</span>.{" "}
            Building algorithmic trading systems on the side.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3"
            {...(prefersReduced ? {} : blurReveal(0.58))}
          >
            <motion.a
              href="#experience"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={springBtn}
              className="px-7 py-4 bg-white text-[#0B0E1A] rounded-2xl text-xs font-black tracking-[0.2em] uppercase shadow-[0_20px_40px_-10px_rgba(255,255,255,0.12)] cursor-pointer"
            >
              My Experience
            </motion.a>
            <motion.button
              onClick={onJournalEnter}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={springBtn}
              className="px-7 py-4 border border-teal/35 text-teal rounded-2xl text-xs font-black tracking-[0.2em] uppercase hover:bg-teal/8 transition-colors cursor-pointer flex items-center gap-2"
            >
              Trading Journal <span className="opacity-50 text-xs">↗</span>
            </motion.button>
          </motion.div>

          {/* Contact card */}
          <motion.div id="contacts" {...(prefersReduced ? {} : blurReveal(0.66))}>
            <ContactConnect />
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — headshot ── */}
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ y: prefersReduced ? 0 : headShotY }}
          className="flex-shrink-0 flex flex-col items-center lg:items-stretch gap-4 w-full lg:w-[300px] xl:w-[340px]"
        >
          {/* Headshot frame with breathing gold glow */}
          <motion.div
            className="relative w-full max-w-[300px] lg:max-w-none mx-auto lg:mx-0 aspect-[5/6] overflow-hidden rounded-[2rem] flex-1"
            style={{ border: "1px solid rgba(196,150,77,0.2)" }}
            animate={{
              boxShadow: [
                "0 0 50px rgba(196,150,77,0.10), 0 40px 80px -20px rgba(0,0,0,0.6)",
                "0 0 80px rgba(196,150,77,0.22), 0 40px 80px -20px rgba(0,0,0,0.6)",
                "0 0 50px rgba(196,150,77,0.10), 0 40px 80px -20px rgba(0,0,0,0.6)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-gold/50 rounded-tl-[2rem] pointer-events-none z-10" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-gold/50 rounded-br-[2rem] pointer-events-none z-10" />

            <img
              src={PERSONAL_INFO.headshot}
              alt={PERSONAL_INFO.fullName}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Download CV */}
          <motion.a
            href="/resume.pdf"
            download="Warren_Lim_Resume.pdf"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={springBtn}
            className="w-full max-w-[300px] lg:max-w-none mx-auto lg:mx-0 py-4 border border-white/10 rounded-2xl text-xs font-black tracking-[0.2em] uppercase flex items-center justify-center gap-2 text-white/50 bg-white/4 hover:bg-white/8 hover:border-white/20 hover:text-white/80 transition-all cursor-pointer"
          >
            <Download size={15} strokeWidth={3} /> Download CV
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
