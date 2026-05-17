/**
 * Section — the editorial shell every content block sits in.
 *
 * Visual language: an equity-research note. A drawn hairline, an oversized
 * tabular index figure (01 / 02 …), a tracked eyebrow, then the heading.
 * This is the structural rhythm that makes the page scan like a report.
 */

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "../../lib/animations";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Inverts to the dark surface palette (used by Recognition). */
  dark?: boolean;
};

export function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  children,
  className,
  dark = false,
}: SectionProps) {
  const reduced = useReducedMotion();

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 px-6 py-28 md:px-12 md:py-36 lg:px-20",
        dark ? "bg-surface text-paper" : "text-ink",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Drawn hairline — the report rule */}
        <motion.div
          className={cn("h-px w-full origin-left", dark ? "bg-white/15" : "u-hairline")}
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={reduced ? undefined : { scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
        />

        <header className="grid grid-cols-1 gap-x-12 gap-y-8 pt-10 md:grid-cols-[auto_1fr] md:pt-14">
          <Reveal className="flex items-baseline gap-4 md:flex-col md:gap-3">
            <span
              className={cn(
                "u-index text-5xl md:text-7xl",
                dark ? "text-white/15" : "text-navy/12",
              )}
            >
              {index}
            </span>
            <span
              className={cn(
                "u-eyebrow",
                dark ? "text-gold-bright" : "text-gold",
              )}
            >
              {eyebrow}
            </span>
          </Reveal>

          <div className="max-w-3xl">
            <Reveal delay={0.06}>
              <h2
                className={cn(
                  "font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl",
                  dark ? "text-paper" : "text-navy",
                )}
              >
                {title}
              </h2>
            </Reveal>
            {description && (
              <Reveal delay={0.12}>
                <p
                  className={cn(
                    "mt-5 text-base leading-relaxed md:text-lg",
                    dark ? "text-white/55" : "text-graphite",
                  )}
                >
                  {description}
                </p>
              </Reveal>
            )}
          </div>
        </header>

        <div className="pt-16 md:pt-20">{children}</div>
      </div>
    </section>
  );
}
