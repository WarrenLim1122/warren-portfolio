/**
 * Certificates — credentials, signal-first.
 *
 * The crown credential (FMVA®) is featured large; the full ladder lives
 * in a category-switchable carousel (shared CarouselShell) so 27 certs
 * never dilute the headline. Any card opens the existing ImageOverlay
 * for a full view + the source PDF.
 */

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, FileText, Maximize2 } from "lucide-react";
import {
  CERTIFICATES,
  FEATURED_CERT_TITLE,
  type Certificate,
} from "../constants";
import { EASE_OUT_EXPO } from "../lib/animations";
import { cn } from "../lib/utils";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { CarouselShell } from "./ui/CarouselShell";
import { ImageOverlay } from "./ImageOverlay";

export default function Certificates() {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [activeCat, setActiveCat] = useState(0);

  const featured = useMemo(
    () =>
      CERTIFICATES.flatMap((c) => c.items).find(
        (i) => i.title === FEATURED_CERT_TITLE,
      ),
    [],
  );

  const totalCerts = useMemo(
    () => CERTIFICATES.reduce((n, c) => n + c.items.length, 0),
    [],
  );

  const current = CERTIFICATES[activeCat];

  return (
    <Section
      id="credentials"
      index="02"
      eyebrow="Validation of Expertise"
      title="Credentials that back the work."
      description={`${totalCerts} verified certificates across Corporate Finance Institute, Bloomberg, and Google — anchored by the FMVA® designation.`}
    >
      {/* Featured crown credential */}
      {featured && (
        <Reveal className="mb-16">
          <button
            type="button"
            onClick={() => setSelected(featured)}
            className="group grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-line bg-white text-left transition-shadow duration-500 hover:shadow-[0_40px_90px_-50px_rgba(15,48,87,0.4)] md:grid-cols-[1.1fr_1fr]"
          >
            <div className="flex flex-col justify-between gap-10 p-9 md:p-12">
              <div className="flex items-center gap-3 text-gold">
                <Award size={18} />
                <span className="u-eyebrow text-[10px]">Crown Credential</span>
              </div>
              <div>
                <h3 className="font-display text-3xl font-semibold leading-tight tracking-tight text-navy md:text-4xl">
                  Financial Modeling &amp; Valuation Analyst
                  <span className="text-gold"> (FMVA)®</span>
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-graphite">
                  Corporate Finance Institute · the full executive ladder —
                  3-statement modelling, DCF, comparables, scenario &amp;
                  sensitivity analysis.
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
                  <FileText size={15} />
                  View certificate
                </span>
              </div>
            </div>
            <div className="relative min-h-[260px] overflow-hidden border-t border-line bg-paper-2 md:border-l md:border-t-0">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-surface/70 text-paper backdrop-blur">
                <Maximize2 size={15} />
              </span>
            </div>
          </button>
        </Reveal>
      )}

      {/* Category switcher */}
      <Reveal className="mb-9 flex flex-wrap gap-x-8 gap-y-3 border-b border-line">
        {CERTIFICATES.map((cat, i) => {
          const active = i === activeCat;
          return (
            <button
              key={cat.category}
              type="button"
              onClick={() => setActiveCat(i)}
              className={cn(
                "relative pb-4 text-sm font-semibold transition-colors duration-300",
                active ? "text-navy" : "text-graphite hover:text-navy",
              )}
            >
              {cat.category}
              <span className="ml-2 u-tabular text-xs text-graphite/60">
                {cat.items.length}
              </span>
              {active && (
                <motion.span
                  layoutId="cert-tab"
                  className="absolute -bottom-px left-0 h-0.5 w-full bg-gold"
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                />
              )}
            </button>
          );
        })}
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCat}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
        >
          <CarouselShell
            ariaLabel={`${current.category} certificates`}
            step={320}
          >
            {current.items.map((cert) => (
              <button
                key={cert.title}
                type="button"
                onClick={() => setSelected(cert)}
                className="group flex w-[280px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-line bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:border-navy/20"
              >
                <div className="relative h-44 overflow-hidden bg-paper-2">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-surface/0 opacity-0 transition-all duration-300 group-hover:bg-surface/40 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-xs font-semibold text-navy">
                      <Maximize2 size={13} /> Open
                    </span>
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span className="u-eyebrow text-[9px] text-gold">
                    {cert.issuer}
                  </span>
                  <span className="text-sm font-semibold leading-snug text-navy">
                    {cert.title}
                  </span>
                  <span className="mt-auto u-tabular pt-3 text-xs text-graphite">
                    {cert.date}
                  </span>
                </div>
              </button>
            ))}
          </CarouselShell>
        </motion.div>
      </AnimatePresence>

      <ImageOverlay cert={selected} onClose={() => setSelected(null)} />
    </Section>
  );
}
