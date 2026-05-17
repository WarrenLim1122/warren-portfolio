/**
 * StatBadge — a single pulled-out metric, rendered big in tabular Geist.
 *
 * Finance recruiters scan numbers first. When the badge enters the
 * viewport its value counts up once (expo ease); a non-numeric value
 * (e.g. "1 / 101") or reduced motion renders the final value instantly.
 */

import { useInView, useReducedMotion, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

type StatBadgeProps = {
  value: string;
  label: string;
  caption?: string;
  className?: string;
  dark?: boolean;
  size?: "md" | "lg";
  /** When false the value renders statically (no count-up). */
  count?: boolean;
};

const NUMERIC = /^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/;

export function StatBadge({
  value,
  label,
  caption,
  className,
  dark = false,
  size = "lg",
  count = true,
}: StatBadgeProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);

  const match = value.match(NUMERIC);

  useEffect(() => {
    if (!count || !inView || !match) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) =>
        setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, match, reduced, value]);

  return (
    <div ref={ref} className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "u-stat",
          size === "lg" ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl",
          dark ? "text-paper" : "text-navy",
        )}
      >
        {display}
      </span>
      <span
        className={cn(
          "u-eyebrow mt-3 text-[10px]",
          dark ? "text-gold-bright" : "text-gold",
        )}
      >
        {label}
      </span>
      {caption && (
        <span
          className={cn(
            "mt-2 max-w-[22ch] text-sm leading-snug",
            dark ? "text-white/50" : "text-graphite",
          )}
        >
          {caption}
        </span>
      )}
    </div>
  );
}
