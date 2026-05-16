/**
 * Recognition — the proof, given gravitas.
 *
 * A dark band so it reads as a milestone. One editorial serif pull-quote
 * (the only Cormorant moment on the page), the placement stated plainly
 * with the field size, and the two team photos (click to enlarge via the
 * shared ImageOverlay).
 */

import { useState } from "react";
import { CASE_COMPETITION } from "../constants";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { ImageOverlay } from "./ImageOverlay";

export default function Recognition() {
  const [zoom, setZoom] = useState<string | null>(null);
  const c = CASE_COMPETITION;

  return (
    <Section
      id="recognition"
      index="05"
      eyebrow="Recognition"
      title="Champions — Eurasia Asset Management Challenge."
      dark
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <Reveal>
            <p className="font-serif text-3xl font-medium italic leading-snug text-paper md:text-4xl">
              <span className="text-gold">“</span>
              {c.pullQuote}
              <span className="text-gold">”</span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-7 max-w-md text-sm leading-relaxed text-white/50">
              {c.quote}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-12 flex flex-wrap gap-x-12 gap-y-8 border-t border-white/12 pt-9">
              <Metric value={c.placement} label="Placement" />
              <Metric value={c.teamCount} label="Field" />
              <Metric value={c.team} label="Team" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
          {c.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setZoom(src)}
              aria-label={`Enlarge team photo ${i + 1}`}
              className={`group relative overflow-hidden rounded-2xl border border-white/12 ${
                i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
              }`}
            >
              <img
                src={src}
                alt={`${c.team} — ${c.event}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-surface/0 transition-colors duration-300 group-hover:bg-surface/20" />
            </button>
          ))}
        </Reveal>
      </div>

      <ImageOverlay src={zoom} onClose={() => setZoom(null)} />
    </Section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="u-stat text-2xl text-paper md:text-3xl">{value}</span>
      <span className="u-eyebrow mt-2 text-[10px] text-gold-bright">
        {label}
      </span>
    </div>
  );
}
