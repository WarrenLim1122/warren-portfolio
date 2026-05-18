/**
 * GlobeGallery — the Gallery tab.
 *
 * Flow:
 *   1. "globe"  — a sharp auto-rotating 3D globe of every country.
 *   2. "zoomed" — pick a country (pin or chip): the camera flies in to
 *                 that country with its pin highlighted, the globe
 *                 slides to the right, and a panel animates in on the
 *                 left asking whether to open the 2D map.
 *   3. "map"    — "See 2D map" swaps the stage to the accurate 2D
 *                 region map with the curated place pins.
 * Back steps out one level (map -> zoomed -> globe).
 *
 * The globe is lazy + guarded: skipped under reduced motion or when
 * WebGL is unavailable. In that case selecting a country goes straight
 * to the 2D map (pure SVG, works everywhere), so the chips remain a
 * complete keyboard / no-WebGL path.
 */

import { lazy, Suspense, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Map as MapIcon } from "lucide-react";
import { COUNTRIES, PLACES } from "../life-content";
import { CountryList } from "./CountryList";
import { PhotoGrid } from "./PhotoGrid";
import { Lightbox } from "./Lightbox";
import { CountryMap, hasCountryMap } from "./CountryMap";

const GlobeView = lazy(() => import("./Globe"));

type Stage = "globe" | "zoomed" | "map";

const STAGE_H = "h-[44vh] min-h-[320px] sm:h-[56vh]";

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
  const [stage, setStage] = useState<Stage>("globe");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const useGlobe = useMemo(() => !reduced && webglAvailable(), [reduced]);
  const active = COUNTRIES.find((c) => c.id === activeId) ?? COUNTRIES[0];
  const places = PLACES[activeId] ?? [];
  const mapReady = hasCountryMap(activeId);

  function handleCountrySelect(id: string) {
    setActiveId(id);
    const mapOk = hasCountryMap(id);
    if (!useGlobe) {
      setStage(mapOk ? "map" : "globe");
      return;
    }
    setStage((s) => (s === "map" && mapOk ? "map" : "zoomed"));
  }

  function handleBack() {
    setStage((s) => {
      if (s === "map") return useGlobe ? "zoomed" : "globe";
      return "globe";
    });
  }

  function openMap() {
    if (mapReady) setStage("map");
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

      {/* Globe / prompt / country-map stage */}
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-surface to-surface-2">

        {/* Back button + country label — zoomed & map only */}
        <AnimatePresence>
          {stage !== "globe" && (
            <motion.div
              key="stage-ui-overlay"
              className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-5 pt-4"
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
                {stage === "map" && useGlobe ? "Back to globe view" : "Back to globe"}
              </button>
              <span className="rounded-full border border-white/10 bg-surface/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold/80 backdrop-blur-sm">
                {active.name}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {stage === "map" ? (
          <motion.div
            key={`map-${active.id}`}
            className={`w-full ${STAGE_H}`}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <CountryMap country={active} places={places} />
          </motion.div>
        ) : (
          <div
            className={
              stage === "zoomed"
                ? "flex flex-col lg:grid lg:grid-cols-2 lg:h-[56vh] lg:min-h-[360px]"
                : "block"
            }
          >
            {/* The "see 2D map?" prompt — left side, zoomed only */}
            <AnimatePresence>
              {stage === "zoomed" && (
                <motion.div
                  key="map-prompt"
                  className="order-2 flex flex-col justify-center gap-5 px-7 py-9 sm:px-10 lg:order-1 lg:h-full lg:py-0"
                  initial={reduced ? false : { opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduced ? undefined : { opacity: 0, x: -28 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const }}
                >
                  <motion.p
                    className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold/80"
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.4 }}
                  >
                    Now in view
                  </motion.p>
                  <motion.h3
                    className="font-serif text-4xl italic text-gold-bright sm:text-5xl"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18, duration: 0.45 }}
                  >
                    {active.name}
                  </motion.h3>
                  <motion.p
                    className="max-w-sm text-base leading-relaxed text-white/65"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24, duration: 0.45 }}
                  >
                    The globe has flown you in and dropped the pin. Open the
                    2D map to see the places worth a detour, each with a
                    short note.
                  </motion.p>
                  <motion.div
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32, duration: 0.45 }}
                  >
                    {mapReady ? (
                      <button
                        type="button"
                        onClick={openMap}
                        className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-gold px-6 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-surface shadow-[0_14px_34px_-12px_rgba(199,168,120,0.85)] outline-none transition-all hover:scale-[1.03] hover:bg-gold-bright focus-visible:ring-2 focus-visible:ring-gold-bright"
                      >
                        <MapIcon className="h-4 w-4" />
                        See 2D map
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                        2D map coming soon
                      </span>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The globe — persistent across globe & zoomed (no remount,
                so the fly-in camera animates instead of snapping) */}
            <div
              className={
                stage === "zoomed"
                  ? "order-1 h-[38vh] min-h-[260px] sm:h-[44vh] lg:order-2 lg:h-full"
                  : `w-full ${STAGE_H}`
              }
            >
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
                    viewMode={stage === "zoomed" ? "focus" : "world"}
                    places={[]}
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
          </div>
        )}

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
