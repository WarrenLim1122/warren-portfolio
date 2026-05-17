/**
 * Hero — the dark anchored entrance. Text leads; the framed portrait
 * (full, uncropped) is the signature visual. The strongest proof
 * (trust strip) lands in the first 5 seconds. One orchestrated
 * page-load cascade, then stillness.
 */

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Download, ArrowDownRight } from "lucide-react";
import {
  PERSONAL_INFO,
  TRUST_MARKERS,
  ADJECTIVES,
} from "../constants";
import { EASE_OUT_EXPO } from "../lib/animations";
import { MagneticButton } from "./ui/MagneticButton";
import { ContactConnect } from "./ui/connect-with-us";
import { LampBackdrop } from "./ui/LampBackdrop";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

function ClipLine({ children, delay }: { children: string; delay: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className="block">{children}</span>;
  return (
    <motion.span
      className="block"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.span>
  );
}

/**
 * The framed portrait — full, uncropped, no circle crop, so the
 * headshot reads at size as the hero's signature visual.
 */
function HeroPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] lg:ml-auto lg:mr-0">
      {/* cool ambient halo, matched to the lowered lamp */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[3rem] bg-[#3E6FB0]/12 blur-3xl"
      />

      {/* Framed portrait — full, uncropped */}
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-surface-2 shadow-[0_60px_130px_-45px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
        <img
          src={PERSONAL_INFO.headshot}
          alt={PERSONAL_INFO.fullName}
          className="aspect-[4/5] w-full object-cover object-top"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 ring-1 ring-inset ring-white/[0.06]"
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative isolate min-h-screen overflow-hidden bg-surface px-6 pb-24 pt-32 text-paper md:px-12 md:pt-36 lg:px-20"
    >
      {/* Atmosphere: the signature lamp entrance light (cooler, lowered) */}
      <LampBackdrop />

      <motion.div
        variants={container}
        initial={reduced ? false : "hidden"}
        animate={reduced ? undefined : "visible"}
        className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"
      >
        {/* LEFT — narrative */}
        <div>
          <motion.div
            variants={item}
            className="u-eyebrow flex items-center gap-3 text-xs text-white/70"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            Banking &amp; Finance · NTU Singapore
          </motion.div>

          <h1 className="mt-7 font-display text-[clamp(2.5rem,6vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-balance lg:pr-6">
            <ClipLine delay={0.15}>Warren</ClipLine>
            <span className="block bg-gradient-to-r from-gold-bright to-gold bg-clip-text text-transparent">
              <ClipLine delay={0.27}>Lim Zhan Feng</ClipLine>
            </span>
          </h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl"
          >
            {PERSONAL_INFO.valueProp}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-sm leading-relaxed text-white/45"
          >
            {PERSONAL_INFO.ethos}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-7 flex items-center gap-4 u-eyebrow text-[10px] text-gold-bright"
          >
            {ADJECTIVES.map((a, i) => (
              <span key={a} className="flex items-center gap-4">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-white/20" />}
                {a}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="/resume.pdf"
              download="Warren_Lim_Resume.pdf"
              variant="primary"
              ariaLabel="Download Warren Lim's CV (PDF)"
              className="bg-gold text-surface hover:bg-gold-bright"
            >
              <Download size={16} strokeWidth={2.4} />
              Download CV
            </MagneticButton>
            <MagneticButton
              href="#work"
              variant="ghost-dark"
              ariaLabel="Jump to selected work"
            >
              Selected Work
              <ArrowDownRight size={16} strokeWidth={2.2} />
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7"
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {TRUST_MARKERS.map((m, i) => (
                <span
                  key={m}
                  className="flex items-center gap-5 text-sm font-medium text-white/80"
                >
                  {i > 0 && (
                    <span className="text-gold/50" aria-hidden>
                      ◆
                    </span>
                  )}
                  {m}
                </span>
              ))}
            </div>
            <p className="u-eyebrow text-[10px] text-white/35">
              {PERSONAL_INFO.availability}
            </p>
          </motion.div>
        </div>

        {/* RIGHT — the framed portrait + backtest card */}
        <motion.div variants={item} className="order-first lg:order-none">
          <HeroPortrait />
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial={reduced ? false : "hidden"}
        animate={reduced ? undefined : "visible"}
        className="relative mx-auto mt-20 w-full max-w-6xl"
      >
        <ContactConnect tone="dark" />
      </motion.div>
    </section>
  );
}
