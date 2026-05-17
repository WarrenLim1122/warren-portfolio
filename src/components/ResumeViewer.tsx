/**
 * ResumeViewer — close on the full record.
 *
 * The section header (index / eyebrow / title / description) lives in the
 * left sticky column so it top-aligns with the resume document on the
 * right — no tall stack of header above an empty gap, the two columns
 * start on the same line. The left rail then carries the academic
 * standing and the two download actions, and stays pinned alongside the
 * long document on desktop.
 */

import { motion, useReducedMotion } from "motion/react";
import { Download, FileText } from "lucide-react";
import { EASE_OUT_EXPO, VIEWPORT_ONCE } from "../lib/animations";
import { Reveal } from "./ui/Reveal";
import { StatBadge } from "./ui/StatBadge";
import { MagneticButton } from "./ui/MagneticButton";

export default function ResumeViewer() {
  const reduced = useReducedMotion();

  return (
    <section
      id="resume"
      className="relative scroll-mt-24 px-6 py-28 text-ink md:px-12 md:py-36 lg:px-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* The report rule — same rhythm as every other section */}
        <motion.div
          className="u-hairline h-px w-full origin-left"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={reduced ? undefined : { scaleX: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO }}
        />

        <div className="grid grid-cols-1 gap-14 pt-12 md:pt-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          {/* LEFT — header (top-aligned with the PDF) + standing + actions */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="flex items-baseline gap-4 md:flex-col md:gap-3">
              <span className="u-index text-5xl text-navy/12 md:text-7xl">
                06
              </span>
              <span className="u-eyebrow text-gold">Curriculum Vitae</span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-navy md:text-5xl">
                The full record.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-lg leading-relaxed text-graphite md:text-xl">
                First-Class Honours track at NTU. The complete CV covering
                experience, credentials, and academics in one document.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-12 border-t border-line pt-10">
                <StatBadge
                  value="4.61"
                  label="GPA · 5.00 scale"
                  count={false}
                />
                <p className="mt-4 max-w-[28ch] text-base leading-relaxed text-graphite md:text-lg">
                  First-Class Honours standing in Banking &amp; Finance, NTU
                  Singapore.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap gap-4">
                <MagneticButton
                  href="/resume.pdf"
                  download="Warren_Lim_Resume.pdf"
                  variant="primary"
                  ariaLabel="Download Warren Lim's CV (PDF)"
                >
                  <Download size={16} strokeWidth={2.4} />
                  Download CV
                </MagneticButton>
                <MagneticButton
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  ariaLabel="Open CV in a new tab"
                >
                  <FileText size={15} />
                  Open in tab
                </MagneticButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <figure className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_40px_90px_-55px_rgba(15,48,87,0.4)]">
              <figcaption className="flex items-center justify-between border-b border-line bg-paper-2/60 px-6 py-3.5">
                <span className="u-eyebrow text-[10px] text-graphite">
                  Warren_Lim_Resume.pdf
                </span>
                <span className="u-tabular text-[11px] text-graphite/70">
                  PDF
                </span>
              </figcaption>
              <div className="p-4 sm:p-7">
                <img
                  src="/resume.jpg"
                  alt="Warren Lim, Curriculum Vitae"
                  className="w-full rounded-lg border border-line"
                />
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
