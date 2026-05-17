/**
 * LampBackdrop — the Hero's signature entrance light.
 *
 * Adapted from a shadcn/Next "lamp" concept into this project's stack:
 * motion/react (never framer-motion), the portfolio palette tokens
 * (champagne on the midnight surface), and the shared expo easing.
 * Purely atmospheric: aria-hidden, pointer-events-none, and it degrades
 * to a static lit state under prefers-reduced-motion.
 */

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "../../lib/animations";

export function LampBackdrop() {
  const reduced = useReducedMotion();

  // One grow gesture (width + opacity) shared by every light element so
  // the lamp "opens" as a single coherent motion. Reduced motion snaps
  // straight to the lit final state.
  const grow = (from: string, to: string) =>
    reduced
      ? { animate: { width: to, opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { width: from, opacity: 0.5 },
          animate: { width: to, opacity: 1 },
          transition: { delay: 0.2, duration: 1, ease: EASE_OUT_EXPO },
        };

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* research-canvas grid, faded toward the lamp */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 28%, #000 40%, transparent 100%)",
        }}
      />

      {/* lamp light, anchored top-centre */}
      <div className="absolute inset-x-0 top-0 flex h-[440px] items-start justify-center">
        {/* left cone */}
        <motion.div
          {...grow("15rem", "32rem")}
          style={{
            backgroundImage:
              "conic-gradient(from 70deg at center top, color-mix(in srgb, var(--color-gold-bright) 50%, transparent), transparent, transparent)",
          }}
          className="absolute right-1/2 h-64 w-[32rem] overflow-visible"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-surface [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-surface [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* right cone */}
        <motion.div
          {...grow("15rem", "32rem")}
          style={{
            backgroundImage:
              "conic-gradient(from 290deg at center top, transparent, transparent, color-mix(in srgb, var(--color-gold-bright) 50%, transparent))",
          }}
          className="absolute left-1/2 h-64 w-[32rem]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-surface [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-surface [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* core bloom */}
        <div className="absolute top-0 h-36 w-[28rem] -translate-y-[30%] rounded-full bg-gold-bright/20 blur-3xl" />
        <motion.div
          {...grow("8rem", "16rem")}
          className="absolute top-0 h-36 -translate-y-[20%] rounded-full bg-gold/25 blur-2xl"
        />

        {/* hot filament line */}
        <motion.div
          {...grow("15rem", "30rem")}
          className="absolute top-0 h-px translate-y-[2px] bg-gold-bright/60"
        />
      </div>
    </div>
  );
}
