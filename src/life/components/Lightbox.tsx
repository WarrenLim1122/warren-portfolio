/**
 * Lightbox — fully self-contained fullscreen photo viewer for /life.
 *
 * Deliberately NOT the portfolio's ImageOverlay: src/life must have zero
 * imports from src/components so the whole area deletes cleanly.
 */

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { CountryPhoto } from "../life-content";

export function Lightbox({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: CountryPhoto[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const reduced = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndex((index + dir + photos.length) % photos.length);
    },
    [index, onIndex, photos.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, go, onClose]);

  const photo = open ? photos[index] : null;

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${photo.location} photo viewer`}
          tabIndex={-1}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0A1A2F]/95 p-4 outline-none backdrop-blur-xl sm:p-8"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>

          <button
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white sm:left-6"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white sm:right-6"
          >
            <ChevronRight size={24} />
          </button>

          <motion.figure
            key={photo.url}
            className="flex max-h-full max-w-5xl flex-col items-center"
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="max-h-[78vh] w-auto rounded-lg object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
              {photo.location}
              <span className="ml-3 text-white/35">
                {(index ?? 0) + 1} / {photos.length}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
