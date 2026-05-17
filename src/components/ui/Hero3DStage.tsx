/**
 * Hero3DStage — the page's one signature 3D moment.
 *
 * A "data monolith": layered translucent panes in real CSS 3D space that
 * read as a financial model assembling itself — a grid canvas, a faux
 * three-statement table, and a rising chart card, with concept tags
 * (DCF / IRR / LBO) floating at depth. The cursor tilts the whole group
 * (springed, clamped); page scroll lifts and fades it.
 *
 * This is the proof-of-craft. Under reduced motion or a coarse pointer
 * (touch), it renders as a fixed, deliberately-composed static tableau —
 * still designed, just not interactive.
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

// Positioned to stay inside the stage box (the hero clips overflow).
const TAGS = [
  { t: "DCF", x: "2%", y: "10%", z: 80 },
  { t: "IRR", x: "70%", y: "20%", z: 64 },
  { t: "Sharpe", x: "0%", y: "70%", z: 96 },
  { t: "LBO", x: "68%", y: "82%", z: 48 },
];

export function Hero3DStage() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    setInteractive(
      !reduced && window.matchMedia("(pointer: fine)").matches,
    );
  }, [reduced]);

  // Pointer tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [12, -12]), {
    stiffness: 120,
    damping: 18,
  });
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-16, 16]), {
    stiffness: 120,
    damping: 18,
  });

  // Scroll lift/fade as the hero leaves
  const { scrollY } = useScroll();
  const lift = useTransform(scrollY, [0, 700], [0, -90]);
  const fade = useTransform(scrollY, [0, 600], [1, 0]);

  const handleMove = (e: MouseEvent) => {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ y: reduced ? 0 : lift, opacity: reduced ? 1 : fade }}
      className="relative mx-auto aspect-square w-full max-w-[440px] select-none"
    >
      {/* Ambient gold bloom */}
      <div
        className="absolute inset-6 rounded-full bg-gold/20 blur-[90px]"
        aria-hidden
      />

      <div
        className="absolute inset-0"
        style={{ perspective: "1500px" }}
        aria-hidden
      >
        <motion.div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
            rotateX: interactive ? rotX : -8,
            rotateY: interactive ? rotY : -14,
          }}
        >
          {/* Pane A — model grid canvas (deepest) */}
          <Pane z={-50} className="bg-surface-2/80 border-white/10">
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(196,150,77,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(196,150,77,0.18) 1px, transparent 1px)",
                backgroundSize: "34px 34px",
              }}
            />
            <span className="u-eyebrow absolute left-5 top-5 text-[9px] text-white/30">
              Model · Canvas
            </span>
          </Pane>

          {/* Pane B — faux three-statement table */}
          <Pane z={20} className="bg-surface/70 border-white/10 backdrop-blur-sm">
            <div className="flex h-full flex-col gap-3 p-6">
              <span className="u-eyebrow text-[9px] text-gold-bright">
                Statements
              </span>
              {[68, 52, 80, 44, 61].map((w, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="h-1.5 rounded-full bg-white/15"
                    style={{ width: `${w}%` }}
                  />
                  <div className="ml-auto h-1.5 w-8 rounded-full bg-gold/40" />
                </div>
              ))}
            </div>
          </Pane>

          {/* Pane C — rising chart card (frontmost) */}
          <Pane
            z={75}
            className="border-white/15 bg-gradient-to-br from-surface-2/95 to-surface/95 backdrop-blur"
          >
            <ChartFace animate={!reduced} />
          </Pane>

          {/* Floating concept tags */}
          {TAGS.map(({ t, x, y, z }) => (
            <div
              key={t}
              className="absolute"
              style={{
                left: x,
                top: y,
                transform: `translateZ(${z}px)`,
              }}
            >
              <span className="u-eyebrow rounded-full border border-white/15 bg-surface/80 px-3 py-1.5 text-[9px] text-white/60 backdrop-blur">
                {t}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function Pane({
  z,
  className,
  children,
}: {
  z: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`absolute inset-[12%] overflow-hidden rounded-[26px] border shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)] ${className ?? ""}`}
      style={{ transform: `translateZ(${z}px)` }}
    >
      {children}
    </div>
  );
}

function ChartFace({ animate }: { animate: boolean }) {
  const area =
    "M0,150 L0,118 C30,110 52,86 86,92 C120,98 140,60 178,52 C212,45 236,24 264,30 L264,150 Z";
  const line =
    "M0,118 C30,110 52,86 86,92 C120,98 140,60 178,52 C212,45 236,24 264,30";
  return (
    <div className="flex h-full flex-col p-6">
      <div className="flex items-center justify-between">
        <span className="u-eyebrow text-[9px] text-gold-bright">
          Backtest
        </span>
        <span className="u-tabular text-[10px] font-medium text-white/40">
          ▲ trend
        </span>
      </div>
      <svg
        viewBox="0 0 264 150"
        className="mt-auto h-[62%] w-full overflow-visible"
        preserveAspectRatio="none"
      >
        {[40, 80, 120].map((y) => (
          <line
            key={y}
            x1="0"
            x2="264"
            y1={y}
            y2={y}
            stroke="rgba(255,255,255,0.06)"
          />
        ))}
        <defs>
          <linearGradient id="hero-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#C4964D" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C4964D" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#hero-fill)" />
        <motion.path
          d={line}
          fill="none"
          stroke="#D8AF6A"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={animate ? { pathLength: 0 } : false}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        />
        <motion.circle
          cx="264"
          cy="30"
          r="4.5"
          fill="#D8AF6A"
          initial={animate ? { scale: 0 } : false}
          animate={animate ? { scale: 1 } : undefined}
          transition={{ delay: 1.9, type: "spring", stiffness: 300 }}
        />
      </svg>
    </div>
  );
}
