/**
 * GolfJourney — the scrollytelling spine, newbie to now.
 *
 * Desktop (lg+): a sticky media column on the left crossfades to the
 * milestone whose text is centred in the viewport (IntersectionObserver).
 * Mobile / reduced motion: a clean stacked story, media inline with each
 * chapter, no pinning or observers. Both render from GOLF_MILESTONES.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { GOLF_INTRO, GOLF_MILESTONES } from "../life-content";
import { GolfMedia } from "./GolfMilestone";

export function GolfJourney() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.idx);
            if (!Number.isNaN(i)) setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sectionRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  const current = GOLF_MILESTONES[active];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-32 pt-10 md:px-12 lg:px-20">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
          {GOLF_INTRO.eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-4xl italic text-navy sm:text-5xl">
          {GOLF_INTRO.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          {GOLF_INTRO.subtitle}
        </p>
      </header>

      <div className="mt-16 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* Sticky media column — desktop only */}
        <div className="hidden lg:block">
          <div className="sticky top-24 h-[64vh] overflow-hidden rounded-3xl border border-line bg-paper-2 shadow-[0_40px_90px_-50px_rgba(15,44,74,0.5)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="h-full w-full"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <GolfMedia
                  media={current.media}
                  poster={current.poster}
                  title={current.title}
                />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute left-5 top-5 rounded-full bg-surface/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur">
              Newbie to now
            </div>
          </div>
        </div>

        {/* The chapters */}
        <div>
          {GOLF_MILESTONES.map((m, i) => (
            <div
              key={m.id}
              data-idx={i}
              ref={(el) => {
                sectionRefs.current[i] = el;
              }}
              className="lg:flex lg:min-h-[64vh] lg:flex-col lg:justify-center"
            >
              <motion.article
                className="border-b border-line py-10 lg:border-none lg:py-0"
                initial={reduced ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={[
                      "font-serif text-3xl italic transition-colors duration-500",
                      !reduced && i === active
                        ? "text-gold"
                        : "text-graphite/40",
                    ].join(" ")}
                  >
                    {m.index}
                  </span>
                  <span className="h-px flex-1 bg-line" />
                </div>

                <h3 className="mt-5 font-sans text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  {m.title}
                </h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-graphite">
                  {m.blurb}
                </p>

                {/* Inline media — mobile / reduced motion */}
                <div className="mt-7 h-[58vw] max-h-[420px] overflow-hidden rounded-2xl border border-line lg:hidden">
                  <GolfMedia
                    media={m.media}
                    poster={m.poster}
                    title={m.title}
                  />
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
