/**
 * LampBackdrop — the Hero's signature entrance light.
 *
 * Adapted from a shadcn/Next "lamp" concept into this project's stack:
 * motion/react (never framer-motion) and the shared expo easing. The
 * earlier version rendered a hard conic "lamp cone" plus a 1px filament
 * line, which read as a bright horizontal bar slicing across the eyebrow
 * and name. This version is a single WIDE ambient wash: a cool ice-blue
 * dome that spans the full section width and fades out well above the
 * headline, so it lights the section without ever banding over the
 * introduction copy. Purely atmospheric: aria-hidden, pointer-events
 * -none, and it degrades to a static lit state under reduced motion.
 */

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "../../lib/animations";

// Cool ice/steel blue — a clean spotlight wash on the midnight surface
// that contrasts the gold name instead of washing into it.
const ICE = "#4C7FB8";
const ICE_HI = "#86AEDC";

export function LampBackdrop() {
  const reduced = useReducedMotion();

  // One "open" gesture: the light widens (scaleX) + brightens once on
  // load as a single coherent motion. Reduced motion snaps to lit.
  const open = reduced
    ? { animate: { opacity: 1, scaleX: 1 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, scaleX: 0.55 },
        animate: { opacity: 1, scaleX: 1 },
        transition: { delay: 0.15, duration: 1.2, ease: EASE_OUT_EXPO },
      };

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* research-canvas grid, faded toward the top light */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 95% 55% at 50% 0%, #000 30%, transparent 78%)",
        }}
      />

      {/* Wide ambient ceiling wash — spans the full section width and
          fades out high (centre sits above the top edge) so it never
          forms a bright band across the introduction text. */}
      <motion.div
        {...open}
        className="absolute inset-x-0 top-0 h-[62vh] origin-top"
        style={{
          background: `radial-gradient(ellipse 78% 52% at 50% -10%, color-mix(in srgb, ${ICE} 44%, transparent) 0%, color-mix(in srgb, ${ICE} 15%, transparent) 36%, transparent 66%)`,
        }}
      />

      {/* Broad soft core just under the top edge — no hard edge */}
      <motion.div
        {...open}
        className="absolute inset-x-0 top-0 mx-auto h-44 w-[68%] max-w-4xl -translate-y-1/3 rounded-[100%] blur-3xl"
        style={{
          backgroundColor: `color-mix(in srgb, ${ICE_HI} 26%, transparent)`,
        }}
      />

      {/* Faint crown highlight — very wide, very soft, no filament bar */}
      <motion.div
        {...open}
        className="absolute inset-x-0 top-0 mx-auto h-px w-[88%] max-w-5xl blur-[2px]"
        style={{
          background: `linear-gradient(to right, transparent, color-mix(in srgb, ${ICE_HI} 42%, transparent), transparent)`,
        }}
      />
    </div>
  );
}
