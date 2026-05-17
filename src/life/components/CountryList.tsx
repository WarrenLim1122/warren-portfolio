/**
 * CountryList — accessible country selector. This is the keyboard path
 * AND the fallback when the globe is unavailable (no WebGL / reduced
 * motion), performing the exact same focus action as a globe pin.
 */

import type { Country } from "../life-content";

export function CountryList({
  countries,
  activeId,
  onSelect,
}: {
  countries: Country[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <ul className="flex flex-wrap justify-center gap-2.5">
      {countries.map((c) => {
        const active = c.id === activeId;
        return (
          <li key={c.id}>
            <button
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(c.id)}
              className={[
                "rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gold",
                active
                  ? "border-gold bg-gold text-surface"
                  : "border-line bg-paper text-graphite hover:border-navy hover:text-navy",
              ].join(" ")}
            >
              {c.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
