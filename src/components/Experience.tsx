/**
 * Experience — the trajectory as a research-note timeline.
 *
 * Reverse-chronological (newest at top, all visible, zero clicks). The
 * role title leads as the heading; the company sits beneath it with the
 * dates as an engaging "calendar" chip. A single drawn spine threads the
 * roles together, each pinned by a filled node and a short connector tick
 * so the eye tracks role → content cleanly.
 */

import { motion, useReducedMotion } from "motion/react";
import { Calendar } from "lucide-react";
import { EXPERIENCE } from "../constants";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "../lib/animations";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";

export default function Experience() {
  const reduced = useReducedMotion();

  return (
    <Section
      id="experience"
      index="01"
      eyebrow="Professional History"
      title="A buy-side trajectory, built deliberately."
      description="From automating wealth-management workflows to incoming buy-side investment analysis, each role chosen to compound technical and analytical range."
    >
      <div className="relative md:pl-2">
        {/* Spine */}
        <motion.div
          aria-hidden
          className="absolute left-[5px] top-1 hidden w-px origin-top bg-gradient-to-b from-gold via-navy/25 to-transparent md:block"
          style={{ height: "100%" }}
          initial={reduced ? false : { scaleY: 0 }}
          whileInView={reduced ? undefined : { scaleY: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.3, ease: EASE_OUT_EXPO }}
        />

        <div className="flex flex-col gap-16 md:gap-20">
          {EXPERIENCE.map((exp, idx) => (
            <Reveal key={exp.company} delay={idx * 0.05}>
              <article className="relative md:pl-16">
                {/* Node + connector tick */}
                <span
                  aria-hidden
                  className="absolute left-0 top-2 hidden h-3 w-3 -translate-x-[5px] rounded-full bg-gold ring-4 ring-paper md:block"
                />
                <span
                  aria-hidden
                  className="absolute left-[6px] top-[15px] hidden h-px w-9 bg-line md:block"
                />

                <div className="max-w-3xl">
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-navy md:text-4xl">
                    {exp.role}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2.5">
                    <span className="text-lg font-semibold text-navy/85 md:text-xl">
                      {exp.company}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-2/70 px-3 py-1 u-tabular text-[11px] font-medium text-graphite">
                      <Calendar size={12} className="text-gold" />
                      {exp.duration}
                    </span>
                  </div>

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
