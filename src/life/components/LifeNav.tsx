/**
 * LifeNav — the minimal bar for /life: a way back to the portfolio and
 * the data-driven tab switcher (LIFE_TABS). The active state is a single
 * pill that SLIDES between tabs (shared layout animation), so switching
 * reads as motion, not an instant swap. Adding a future tab is a content
 * edit; this renders whatever tabs exist.
 */

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { LIFE_TABS, type LifeTabId } from "../life-content";

export function LifeNav({
  active,
  onChange,
}: {
  active: LifeTabId;
  onChange: (id: LifeTabId) => void;
}) {
  return (
    <nav className="sticky top-0 z-[120] flex items-center justify-between border-b border-line bg-paper/85 px-6 py-4 backdrop-blur-xl md:px-12 lg:px-20">
      <Link
        to="/"
        className="group flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
      >
        <ArrowLeft
          size={16}
          className="transition-transform duration-300 group-hover:-translate-x-1"
        />
        <span className="hidden sm:inline">Warren Lim</span>
        <span className="text-graphite/50">/ Beyond Work</span>
      </Link>

      <div className="flex items-center gap-1.5 rounded-full border border-line bg-paper-2 p-1">
        {LIFE_TABS.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              aria-current={on ? "page" : undefined}
              className="relative rounded-full px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-gold"
            >
              {on && (
                <motion.span
                  layoutId="life-tab-pill"
                  className="absolute inset-0 rounded-full bg-navy shadow-sm"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                  }}
                />
              )}
              <span
                className={[
                  "relative z-10 transition-colors duration-300",
                  on ? "text-paper" : "text-graphite hover:text-navy",
                ].join(" ")}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
