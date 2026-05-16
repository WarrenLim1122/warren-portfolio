/**
 * Experience — the trajectory as a research-note timeline.
 *
 * Reverse-chronological (newest at top, all visible — zero clicks). Each
 * role pulls one headline figure out as a big tabular number so a
 * recruiter scans progression in seconds. Tool tags signal the stack.
 */

import { motion, useReducedMotion } from "motion/react";
import { EXPERIENCE } from "../constants";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "../lib/animations";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { StatBadge } from "./ui/StatBadge";

export default function Experience() {
  const reduced = useReducedMotion();

  return (
    <Section
      id="experience"
      index="01"
      eyebrow="Professional History"
      title="A buy-side trajectory, built deliberately."
      description="From automating wealth-management workflows to incoming buy-side investment analysis — each role chosen to compound technical and analytical range."
    >
      <div className="relative">
        {/* Spine */}
        <motion.div
          aria-hidden
          className="absolute left-[7px] top-2 hidden w-px origin-top bg-gradient-to-b from-gold via-navy/30 to-transparent md:block"
          style={{ height: "100%" }}
          initial={reduced ? false : { scaleY: 0 }}
          whileInView={reduced ? undefined : { scaleY: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.3, ease: EASE_OUT_EXPO }}
        />

        <div className="flex flex-col gap-20 md:gap-28">
          {EXPERIENCE.map((exp, idx) => (
            <Reveal key={exp.company} delay={idx * 0.05}>
              <article className="relative grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-[auto_minmax(0,1fr)] md:pl-0">
                {/* Node */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1.5 hidden h-3.5 w-3.5 -translate-x-[5px] rounded-full border-2 border-gold bg-paper md:block"
                />

                {/* Left rail — duration + pulled-out stat */}
                <div className="flex flex-col gap-7 md:w-56 md:pl-12">
                  <span className="u-eyebrow text-[10px] text-graphite u-tabular">
                    {exp.duration}
                  </span>
                  {exp.stat && (
                    <StatBadge
                      value={exp.stat.value}
                      label={exp.stat.label}
                      size="md"
                    />
                  )}
                </div>

                {/* Main */}
                <div className="md:pl-2">
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
                    {exp.company}
                  </h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
                    {exp.role}
                  </p>

                  <ul className="mt-7 flex flex-col gap-5">
                    {exp.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-4 text-[15px] leading-relaxed text-graphite md:text-base"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold/60"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.tools && (
                    <div className="mt-7 flex flex-wrap gap-2.5">
                      {exp.tools.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line bg-paper-2/60 px-3.5 py-1.5 text-[11px] font-medium text-navy/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
