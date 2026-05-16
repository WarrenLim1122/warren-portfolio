/**
 * SelectedWorks — the conversion centerpiece.
 *
 * Two finance calls, each argued as Context → Methodology → Impact. The
 * card surfaces the headline impact in big tabular type; the detail
 * dialog gives the full argument and links the source deck (PDF).
 *
 * The dialog is a hand-rolled accessible modal (Esc / backdrop close,
 * scroll lock, focus move) — same pattern as ImageOverlay, no new deps.
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, FileText, X } from "lucide-react";
import { PROJECTS, type Project } from "../constants";
import { EASE_OUT_EXPO } from "../lib/animations";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";

export default function SelectedWorks() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section
      id="work"
      index="04"
      eyebrow="Selected Works"
      title="Two calls, fully argued."
      description="Not a project dump. Each is a complete thesis — the context, the method, and the quantified outcome — with the source deck one click away."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <button
              type="button"
              onClick={() => setActive(p)}
              className="group flex h-full w-full flex-col rounded-3xl border border-line bg-white p-9 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-navy/20 hover:shadow-[0_44px_90px_-55px_rgba(15,48,87,0.45)] md:p-11"
            >
              <div className="flex items-center justify-between">
                <span className="u-eyebrow text-[10px] text-gold">
                  {p.category}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy transition-all duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-paper">
                  <ArrowUpRight size={17} />
                </span>
              </div>

              <h3 className="mt-7 font-display text-2xl font-semibold leading-snug tracking-tight text-navy md:text-3xl">
                {p.title}
              </h3>

              <p className="mt-6 border-l-2 border-gold pl-5 u-tabular text-lg font-semibold leading-snug text-navy md:text-xl">
                {p.impact}
              </p>

              <p className="mt-7 text-[15px] leading-relaxed text-graphite">
                {p.context}
              </p>

              <span className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
                Read the full case
                <ArrowUpRight size={15} />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <CaseDialog project={active} onClose={() => setActive(null)} />
    </Section>
  );
}

function CaseDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-surface/80 p-4 backdrop-blur-md md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${project.title}`}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-paper"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-start justify-between gap-6 border-b border-line bg-paper/95 p-8 backdrop-blur md:p-10">
              <div>
                <span className="u-eyebrow text-[10px] text-gold">
                  {project.category}
                </span>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-navy md:text-3xl">
                  {project.title}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line text-graphite transition-colors hover:bg-navy hover:text-paper"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-9 p-8 md:p-10">
              <p className="u-tabular border-l-2 border-gold pl-5 text-xl font-semibold leading-snug text-navy">
                {project.impact}
              </p>

              {(
                [
                  ["Context", project.context],
                  ["Methodology", project.methodology],
                  ["Outcome", project.description],
                ] as const
              ).map(([label, body]) => (
                <div key={label}>
                  <h4 className="u-eyebrow text-[10px] text-graphite">{label}</h4>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
                    {body}
                  </p>
                </div>
              ))}

              <a
                href={project.file}
                target="_blank"
                rel="noopener noreferrer"
                className="u-cta inline-flex rounded-full bg-navy px-7 py-3.5 text-paper transition-colors hover:bg-navy-700"
              >
                <FileText size={15} />
                Open full deck
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
