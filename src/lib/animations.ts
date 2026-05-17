/**
 * Shared motion language for the portfolio.
 *
 * Direction: snappy-precise. Short durations, decisive expo/quint easing —
 * motion that reads as "execution", not ambient drift. Every consumer
 * should pair these with `useReducedMotion()` from motion/react and fall
 * back to a static state (the global CSS guard in index.css is a safety net,
 * not a substitute).
 */

import type { Variants, Transition } from "motion/react";

// ── Easings (mirror the CSS custom props in index.css) ───────────────
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

// Kept for backwards-compatibility with any transitional code.
export const MOTION_CURVE = [0.25, 0.1, 0.25, 1] as const;
export const SPRING_UI = { type: "spring" as const, stiffness: 120, damping: 20 };
export const SPRING_PREMIUM = { type: "spring" as const, stiffness: 80, damping: 15, mass: 1 };

// Magnetic-pointer feel for primary CTAs.
export const SPRING_MAGNETIC = { type: "spring" as const, stiffness: 220, damping: 18, mass: 0.6 };

// ── Scroll-reveal primitives ─────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT_QUINT } },
};

/** Wipe-up under a clip mask — used for headline reveals. */
export const clipReveal: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Tighter cascade for dense lists (timeline bullets, skill chips). */
export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

/** Index-aware slide; pass `custom={i}`. */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.09, duration: 0.7, ease: EASE_OUT_EXPO },
  }),
};

// ── Legacy exports (do not remove until all consumers migrated) ───────
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: MOTION_CURVE },
  },
};

export const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

// ── Shared viewport config for whileInView ───────────────────────────
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;

export const transition = (
  duration = 0.7,
  delay = 0,
): Transition => ({ duration, delay, ease: EASE_OUT_EXPO });
