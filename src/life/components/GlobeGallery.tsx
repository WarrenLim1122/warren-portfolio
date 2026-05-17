/**
 * GlobeGallery — the Gallery tab. A 3D globe of the places visited; pick
 * a country (pin or chip) and the globe zooms in, showing city-level pins.
 * A Back button returns to the world view.
 *
 * The globe is lazy + guarded: skipped entirely under reduced motion or
 * when WebGL is unavailable, falling back to the country chips, which
 * perform the identical selection.
 */

import { lazy, Suspense, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { COUNTRIES, PLACES } from "../life-content";
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
  const reduced  = useReducedMotion();
  const [activeId,  setActiveId]  = useState(COUNTRIES[0].id);
  const [viewMode,  setViewMode]  = useState<"world" | "country">("world");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const useGlobe = useMemo(() => !reduced && webglAvailable(), [reduced]);
  const active   = COUNTRIES.find((c) => c.id === activeId) ?? COUNTRIES[0];
  const places   = PLACES[activeId] ?? [];

  function handleCountrySelect(id: string) {
    setActiveId(id);
    if (useGlobe) setViewMode("country");
  }

  function handleBack() {
    setViewMode("world");
  }

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

        {/* Back button + country label — visible only in country zoom mode */}
        <AnimatePresence>
          {useGlobe && viewMode === "country" && (
            <motion.div
              key="globe-ui-overlay"
              className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between px-5 pt-4"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <button
                type="button"
                onClick={handleBack}
                className="pointer-events-auto flex cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-surface/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm transition-all hover:border-gold/50 hover:text-gold"
              >
                <ArrowLeft className="h-3 w-3" />
                Back
              </button>
              <span className="rounded-full border border-white/10 bg-surface/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold/80 backdrop-blur-sm">
                {active.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

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
                onSelect={handleCountrySelect}
                viewMode={viewMode}
                places={places}
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
            onSelect={handleCountrySelect}
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
            {active.photos.length > 0
              ? `${active.photos.length} frames`
              : "Coming soon"}
          </span>
        </div>
        {active.photos.length > 0 ? (
          <PhotoGrid photos={active.photos} onOpen={setLightboxIndex} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line bg-paper-2/60 px-6 py-20 text-center">
            <p className="font-serif text-xl italic text-navy">
              Photographs from {active.name} are on the way
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-graphite">
              This country is mapped; the frames are still being chosen.
              Spin the globe or pick another place meanwhile.
            </p>
          </div>
        )}
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
