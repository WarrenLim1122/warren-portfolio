/**
 * LimelightContactRail — the contact icon rail with a sliding "limelight".
 *
 * Adapted from a shadcn/Next "limelight-nav" snippet into this project's
 * stack: no framer-motion / Next imports (palette tokens + plain refs,
 * per CLAUDE.md rule 5). The beam is hover/focus driven (the animation
 * Warren had on the nav) and now takes on the hovered contact's own
 * brand colour — Email red, LinkedIn blue, WhatsApp green — with a soft
 * downward cone, exactly like the reference component's limelight.
 *
 * Reused by the navbar (beside the brand) and any other contact group.
 * Reduced motion is handled by the global CSS transition guard.
 */

import { useRef, useState, type ComponentType } from "react";
import { cn } from "../../lib/utils";

export type LimelightItem = {
  id: string;
  Icon: ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
    gradient?: boolean;
  }>;
  label: string;
  href: string;
  external?: boolean;
  /** Brand colour the beam + icon take on while active. */
  tint: string;
  /** Paint the glyph with its own brand gradient (Instagram); the
   *  hover-tint colour override is then skipped so the gradient holds. */
  gradientIcon?: boolean;
};

export function LimelightContactRail({
  items,
  tone = "dark",
  className,
}: {
  items: LimelightItem[];
  tone?: "dark" | "light";
  className?: string;
}) {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const beamRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const moveTo = (i: number) => {
    const el = itemRefs.current[i];
    const beam = beamRef.current;
    if (!el || !beam) return;
    beam.style.left = `${
      el.offsetLeft + el.offsetWidth / 2 - beam.offsetWidth / 2
    }px`;
    setActive(i);
  };

  const tint = active != null ? items[active].tint : "var(--color-gold)";

  return (
    <div
      className={cn("relative flex items-center gap-1", className)}
      onMouseLeave={() => setActive(null)}
    >
      {items.map(({ id, Icon, label, href, external, tint, gradientIcon }, i) => (
        <a
          key={id}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          aria-label={label}
          onMouseEnter={() => moveTo(i)}
          onFocus={() => moveTo(i)}
          onBlur={() => setActive(null)}
          style={
            active === i && !gradientIcon ? { color: tint } : undefined
          }
          className={cn(
            "relative z-10 flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:scale-110",
            tone === "light" ? "text-graphite" : "text-white/55",
          )}
        >
          <Icon
            size={17}
            strokeWidth={1.9}
            gradient={gradientIcon ? active === i : undefined}
          />
        </a>
      ))}

      <div
        ref={beamRef}
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-0 z-0 h-[3px] w-7 -translate-y-px rounded-full transition-[left,opacity] duration-300 ease-out",
          active != null ? "opacity-100" : "opacity-0",
        )}
        style={{
          left: "-999px",
          background: tint,
          boxShadow: `0 6px 22px 1px ${tint}`,
        }}
      >
        <div
          className="absolute left-[-40%] top-[3px] h-9 w-[180%] [clip-path:polygon(8%_100%,28%_0,72%_0,92%_100%)]"
          style={{
            background: `linear-gradient(to bottom, color-mix(in srgb, ${tint} 38%, transparent), transparent)`,
          }}
        />
      </div>
    </div>
  );
}
