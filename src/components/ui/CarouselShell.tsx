/**
 * CarouselShell — one horizontal carousel engine, reused by Credentials
 * and Skills so the interaction is identical across the page.
 *
 * Scroll-snap track + drag-to-scroll + arrow controls + keyboard support
 * + edge fades. The caller supplies slides (each sets its own width).
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

type CarouselShellProps = {
  children: ReactNode;
  ariaLabel: string;
  /** px to advance per arrow press; defaults to ~one card. */
  step?: number;
  className?: string;
};

export function CarouselShell({
  children,
  ariaLabel,
  step = 360,
  className,
}: CarouselShellProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollBy = (dir: 1 | -1) =>
    trackRef.current?.scrollBy({ left: dir * step, behavior: "smooth" });

  const onPointerDown = (e: PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = (e: PointerEvent) => {
    drag.current.active = false;
    trackRef.current?.releasePointerCapture?.(e.pointerId);
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") scrollBy(1);
          if (e.key === "ArrowLeft") scrollBy(-1);
        }}
        onClickCapture={(e) => {
          // Suppress click that ends a drag (prevents accidental opens).
          if (drag.current.moved) {
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 outline-none [touch-action:pan-y]"
      >
        {children}
      </div>

      {/* Edge fades */}
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent transition-opacity duration-300",
          atStart && "opacity-0",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent transition-opacity duration-300",
          atEnd && "opacity-0",
        )}
      />

      <div className="mt-8 flex items-center gap-3">
        <CarouselArrow
          dir="prev"
          disabled={atStart}
          onClick={() => scrollBy(-1)}
        />
        <CarouselArrow dir="next" disabled={atEnd} onClick={() => scrollBy(1)} />
        <span className="u-eyebrow ml-2 text-[10px] text-graphite">
          Drag or use arrows
        </span>
      </div>
    </div>
  );
}

function CarouselArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300",
        disabled
          ? "cursor-not-allowed border-line text-line"
          : "border-navy/15 text-navy hover:border-navy hover:bg-navy hover:text-paper",
      )}
    >
      {dir === "prev" ? (
        <ArrowLeft size={17} strokeWidth={2.2} />
      ) : (
        <ArrowRight size={17} strokeWidth={2.2} />
      )}
    </button>
  );
}
