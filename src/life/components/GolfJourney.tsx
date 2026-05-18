/**
 * GolfJourney — the scrollytelling spine, newbie to now.
 *
 * Desktop (lg+): a sticky vertical timeline rail on the LEFT tracks
 * scroll position (IntersectionObserver). Its progress fill rises as
 * you move down the story, the active node lights up, and that
 * chapter's date pops out beside it on every section change. A sticky
 * media column crossfades to the active milestone; the chapters sit on
 * the right.
 * Mobile / reduced motion: a clean stacked story, the date shown as a
 * chip in each chapter header, media inline, no pinning or observers.
 * Both render from GOLF_MILESTONES.
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
  const last = GOLF_MILESTONES.length - 1;
  const progress = last > 0 ? (active / last) * 100 : 0;

  const goTo = (i: number) =>
    sectionRefs.current[i]?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "center",
    });

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

      <div className="mt-16 lg:grid lg:grid-cols-[4.75rem_0.92fr_1.04fr] lg:gap-x-10">
        {/* Vertical scroll timeline — desktop only */}
        <div className="relative hidden lg:block">
          <div className="sticky top-24 flex h-[64vh] flex-col items-center">
            <span className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-graphite/55">
              Newbie
            </span>

            <div className="relative w-px flex-1 bg-line">
              {/* Progress fill, newbie -> now */}
              <motion.span
                className="absolute inset-x-0 top-0 w-px bg-gold shadow-[0_0_10px_rgba(199,168,120,0.7)]"
                initial={false}
                animate={{ height: `${progress}%` }}
                transition={{ type: "spring" as const, stiffness: 240, damping: 32 }}
              />

              {/* Nodes */}
              {GOLF_MILESTONES.map((m, i) => {
                const on = !reduced && i === active;
                const past = !reduced && i < active;
                const top = `${last > 0 ? (i / last) * 100 : 0}%`;
                return (
                  <div
                    key={m.id}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ top }}
                  >
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`${m.date}: ${m.title}`}
                      aria-current={on ? "step" : undefined}
                      className="relative grid h-7 w-7 cursor-pointer place-items-center outline-none"
                    >
                      <span
                        className={[
                          "block rounded-full transition-all duration-500",
                          on
                            ? "h-3.5 w-3.5 bg-gold shadow-[0_0_0_4px_rgba(199,168,120,0.22),0_0_14px_rgba(199,168,120,0.85)]"
                            : past
                              ? "h-2 w-2 bg-gold/70"
                              : "h-2 w-2 bg-line ring-1 ring-graphite/25",
                        ].join(" ")}
                      />
                    </button>

                    {/* Date pop-out — re-pops on every section change */}
                    <AnimatePresence>
                      {on && (
                        <motion.span
                          key={m.id}
                          className="pointer-events-none absolute left-full top-1/2 ml-3 flex -translate-y-1/2 items-center gap-2 whitespace-nowrap"
                          initial={
                            reduced
                              ? false
                              : { opacity: 0, x: -10, scale: 0.85 }
                          }
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={
                            reduced
                              ? undefined
                              : { opacity: 0, x: -10, scale: 0.85 }
                          }
                          transition={{
                            type: "spring" as const,
                            stiffness: 360,
                            damping: 26,
                          }}
                        >
                          <span className="h-px w-4 bg-gold/60" />
                          <span className="rounded-full bg-navy px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-paper shadow-[0_8px_22px_-10px_rgba(15,44,74,0.65)]">
                            {m.date}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <span className="mt-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
              Now
            </span>
          </div>
        </div>

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
                  <span
                    className="rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold lg:hidden"
                  >
                    {m.date}
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
