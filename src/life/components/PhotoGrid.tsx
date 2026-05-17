/**
 * PhotoGrid — the focused country's photographs. CSS multi-column for an
 * editorial, gallery-wall rhythm. Each tile opens the Lightbox.
 */

import { motion, useReducedMotion } from "motion/react";
import type { CountryPhoto } from "../life-content";

export function PhotoGrid({
  photos,
  onOpen,
}: {
  photos: CountryPhoto[];
  onOpen: (i: number) => void;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
      {photos.map((p, i) => (
        <motion.button
          key={p.url}
          type="button"
          onClick={() => onOpen(i)}
          aria-label={`Open ${p.location} photo`}
          className="group relative block w-full overflow-hidden rounded-xl border border-line bg-paper-2 outline-none focus-visible:ring-2 focus-visible:ring-gold"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: reduced ? 0 : (i % 3) * 0.06 }}
        >
          <img
            src={p.url}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-navy/70 via-navy/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
              {p.location}
            </span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}
