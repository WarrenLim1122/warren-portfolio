/**
 * Reveal — the single scroll-entrance primitive for the portfolio.
 *
 * Every section composes from this so motion stays consistent and
 * `prefers-reduced-motion` is honoured in exactly one place: when reduced,
 * children render immediately with no transform.
 */

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, VIEWPORT_ONCE } from "../../lib/animations";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset (seconds) layered on top of the variant transition. */
  delay?: number;
  /** Override the entrance variant (defaults to fadeUp). */
  variants?: Variants;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeUp,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
