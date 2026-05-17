/**
 * GlobeGallery — the Gallery tab. A 3D globe of the places visited; pick
 * a country (pin or chip) and its photographs fill the stage below.
 *
 * The globe is lazy + guarded: skipped entirely under reduced motion or
 * when WebGL is unavailable, falling back to the country chips, which
 * perform the identical selection. So three.js never loads unless the
 * globe will actually render.
 */

import { lazy, Suspense, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { COUNTRIES } from "../life-content";
import { CountryList } from "./CountryList";
import { PhotoGrid } from "./PhotoGrid";
import { Lightbox } from "./Lightbox";

const GlobeView = lazy(() => import("./Globe"));

function webglAvailable() {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function GlobeGallery() {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState(COUNTRIES[0].id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const useGlobe = useMemo(() => !reduced && webglAvailable(), [reduced]);
  const active =
    COUNTRIES.find((c) => c.id === activeId) ?? COUNTRIES[0];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-28 pt-10 md:px-12 lg:px-20">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">
          Around the world
        </p>
        <h2 className="mt-4 font-serif text-4xl italic text-navy sm:text-5xl">
          Places that made me look twice
        </h2>
        <p className="mt-4 text-base leading-relaxed text-graphite">
          A camera is just an excuse to pay attention. Spin the globe, or
          pick a country, and wander what caught my eye there.
        </p>
      </header>

      {/* Globe stage (or graceful fallback) */}
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-surface to-surface-2">
        <div className="h-[44vh] min-h-[320px] w-full sm:h-[56vh]">
          {useGlobe ? (
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-gold" />
                </div>
              }
            >
              <GlobeView
                countries={COUNTRIES}
                activeId={activeId}
                onSelect={setActiveId}
              />
            </Suspense>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
              <p className="font-serif text-2xl italic text-white/90">
                {active.name}
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Choose a country below
              </p>
            </div>
          )}
        </div>
        <div className="border-t border-white/10 bg-surface/70 px-5 py-5 backdrop-blur-sm">
          <CountryList
            countries={COUNTRIES}
            activeId={activeId}
            onSelect={setActiveId}
          />
        </div>
      </div>

      {/* Selected country's photographs */}
      <motion.section
        key={active.id}
        className="mt-14"
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-7 flex items-baseline justify-between border-b border-line pb-4">
          <h3 className="font-sans text-2xl font-bold tracking-tight text-navy">
            {active.name}
          </h3>
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-graphite">
            {active.photos.length} frames
          </span>
        </div>
        <PhotoGrid photos={active.photos} onOpen={setLightboxIndex} />
      </motion.section>

      <Lightbox
        photos={active.photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndex={setLightboxIndex}
      />
    </div>
  );
}
