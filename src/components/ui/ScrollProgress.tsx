/**
 * ScrollProgress — a hairline read-progress bar plus a desktop section
 * rail so a recruiter can jump straight to Experience / Work / Resume.
 *
 * Scroll-linked (user-driven), so it stays active even under reduced
 * motion. The side rail collapses on touch / small viewports.
 */

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export type NavSection = { id: string; label: string };

export function ScrollProgress({ sections }: { sections: NavSection[] }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-gold"
        style={{ scaleX }}
        aria-hidden
      />

      <nav
        aria-label="Section navigation"
        className="fixed right-7 top-1/2 z-[110] hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
      >
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className="group flex items-center gap-3"
              aria-label={`Go to ${label}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={cn(
                  "u-eyebrow text-[10px] tracking-[0.24em] opacity-0 transition-all duration-300 group-hover:opacity-100",
                  isActive ? "text-navy opacity-100" : "text-graphite",
                )}
              >
                {label}
              </span>
              <span
                className={cn(
                  "h-px transition-all duration-300",
                  isActive
                    ? "w-8 bg-gold"
                    : "w-4 bg-line group-hover:w-6 group-hover:bg-navy/40",
                )}
              />
            </a>
          );
        })}
      </nav>
    </>
  );
}
