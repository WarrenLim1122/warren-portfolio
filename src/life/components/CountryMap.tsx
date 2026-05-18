/**
 * CountryMap — the 2D illustrated region map shown when a country is
 * picked. Pure inline SVG (no WebGL, no map library, no API): accurate
 * official region geometry generated at build time, styled in the site
 * palette, with curated place pins that reveal a short blurb on
 * hover / focus / tap.
 *
 * Enlargeable: zoom in / out (buttons, scroll wheel toward the cursor)
 * and drag to pan. Only the country GEOMETRY scales; region labels,
 * place pins and tooltips are re-projected through the same transform
 * but drawn at a CONSTANT size, so zooming in never squeezes the words,
 * it just makes the map bigger underneath them.
 *
 * Wheel / drag use native non-passive listeners (a React onWheel is
 * passive at the root, so preventDefault would not hold and the page
 * would scroll while zooming).
 *
 * Geometry is registered per country in GEOMETRY below. Countries with
 * no geometry yet return null so GlobeGallery can fall back gracefully.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Plus, Minus, Maximize2 } from "lucide-react";
import type { Country, Place } from "../life-content";
import {
  SINGAPORE_GEOMETRY,
  type CountryGeometry,
} from "../regions/singapore";
import { MALAYSIA_GEOMETRY } from "../regions/malaysia";
import { THAILAND_GEOMETRY } from "../regions/thailand";
import { CHINA_GEOMETRY } from "../regions/china";
import { JAPAN_GEOMETRY } from "../regions/japan";

const GEOMETRY: Record<string, CountryGeometry> = {
  singapore: SINGAPORE_GEOMETRY,
  malaysia: MALAYSIA_GEOMETRY,
  thailand: THAILAND_GEOMETRY,
  china: CHINA_GEOMETRY,
  japan: JAPAN_GEOMETRY,
};

export function hasCountryMap(id: string): boolean {
  return id in GEOMETRY;
}

const MIN_K = 1;
const MAX_K = 9;

export function CountryMap({
  country,
  places,
}: {
  country: Country;
  places: Place[];
}) {
  const reduced = useReducedMotion();
  const geo = GEOMETRY[country.id];
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [hoverRegion, setHoverRegion] = useState<string | null>(null);
  // Transient (pointer/focus) vs sticky (click/keyboard) so a tap that
  // both focuses and clicks doesn't toggle the tooltip back off.
  const [hoverPlace, setHoverPlace] = useState<string | null>(null);
  const [pinnedPlace, setPinnedPlace] = useState<string | null>(null);

  // View transform: screen = world * k + (tx, ty). State drives the
  // render; refs give the native listeners a non-stale view.
  const [view, setView] = useState({ k: 1, tx: 0, ty: 0 });
  const viewRef = useRef(view);
  viewRef.current = view;

  const geoRef = useRef(geo);
  geoRef.current = geo;

  // Reset whenever the country changes.
  useEffect(() => {
    setView({ k: 1, tx: 0, ty: 0 });
    setPinnedPlace(null);
    setHoverPlace(null);
  }, [country.id]);

  // Clamp the pan so the scaled map always covers the viewBox.
  const clampView = useCallback(
    (k: number, tx: number, ty: number) => {
      const g = geoRef.current;
      if (!g) return { k, tx: 0, ty: 0 };
      const ck = Math.min(MAX_K, Math.max(MIN_K, k));
      const cx = Math.min(0, Math.max(g.width * (1 - ck), tx));
      const cy = Math.min(0, Math.max(g.height * (1 - ck), ty));
      return { k: ck, tx: cx, ty: cy };
    },
    [],
  );

  const applyView = useCallback(
    (k: number, tx: number, ty: number) => setView(clampView(k, tx, ty)),
    [clampView],
  );

  // Client point -> viewBox coords (respecting xMidYMid-meet letterbox).
  const toViewBox = useCallback((clientX: number, clientY: number) => {
    const el = svgRef.current;
    const g = geoRef.current;
    if (!el || !g) return null;
    const r = el.getBoundingClientRect();
    const s = Math.min(r.width / g.width, r.height / g.height);
    const ox = (r.width - g.width * s) / 2;
    const oy = (r.height - g.height * s) / 2;
    return {
      x: (clientX - r.left - ox) / s,
      y: (clientY - r.top - oy) / s,
      s,
    };
  }, []);

  const zoomAround = useCallback(
    (nextK: number, vbX: number, vbY: number) => {
      const { k, tx, ty } = viewRef.current;
      const ck = Math.min(MAX_K, Math.max(MIN_K, nextK));
      const w0 = (vbX - tx) / k;
      const h0 = (vbY - ty) / k;
      applyView(ck, vbX - w0 * ck, vbY - h0 * ck);
    },
    [applyView],
  );

  // Native non-passive wheel + drag-to-pan, bound once per country.
  useEffect(() => {
    const el = svgRef.current;
    const g = geoRef.current;
    if (!el || !g) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const p = toViewBox(e.clientX, e.clientY);
      if (!p) return;
      // Gentle, magnitude-aware zoom: clamp the (mouse vs trackpad)
      // delta and map it through a soft exponential so one notch is a
      // small, predictable step instead of a jump.
      const d = Math.max(-50, Math.min(50, e.deltaY));
      const factor = Math.exp(-d * 0.0012);
      zoomAround(viewRef.current.k * factor, p.x, p.y);
    };

    let drag: { x: number; y: number; on: boolean } | null = null;

    const onDown = (e: PointerEvent) => {
      if (viewRef.current.k <= 1) return;
      drag = { x: e.clientX, y: e.clientY, on: false };
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) return;
      const p = toViewBox(0, 0);
      const s = p?.s ?? 1;
      const dx = (e.clientX - drag.x) / s;
      const dy = (e.clientY - drag.y) / s;
      if (!drag.on && Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) > 3) {
        drag.on = true;
        el.setPointerCapture(e.pointerId);
        el.style.cursor = "grabbing";
      }
      if (!drag.on) return;
      e.preventDefault();
      drag.x = e.clientX;
      drag.y = e.clientY;
      const v = viewRef.current;
      applyView(v.k, v.tx + dx, v.ty + dy);
    };
    const onUp = (e: PointerEvent) => {
      if (drag?.on && el.hasPointerCapture(e.pointerId))
        el.releasePointerCapture(e.pointerId);
      drag = null;
      el.style.cursor = viewRef.current.k > 1 ? "grab" : "default";
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove, { passive: false });
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [country.id, toViewBox, zoomAround, applyView]);

  if (!geo) return null;

  const { width, height, proj, regions } = geo;
  const { k, tx, ty } = view;
  const projectX = (lng: number) => lng * proj.sx + proj.ox;
  const projectY = (lat: number) => lat * proj.sy + proj.oy;

  // World point -> on-canvas (post-transform) point.
  const TX = (x: number) => x * k + tx;
  const TY = (y: number) => y * k + ty;

  // Tooltip card size in viewBox units.
  const TW = 320;
  const TH = 96;

  const zoomBy = (factor: number) =>
    zoomAround(view.k * factor, width / 2, height / 2);
  const ZOOM_STEP = 1.4;
  const resetView = () => applyView(1, 0, 0);
  const atRest = k === 1 && tx === 0 && ty === 0;

  return (
    <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-6">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full touch-none select-none"
        role="group"
        aria-label={`Map of ${country.name} with notable places`}
        style={{ cursor: k > 1 ? "grab" : "default" }}
      >
        <defs>
          <filter id="pin-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="3.5"
              floodColor="#D8C29A"
              floodOpacity="0.55"
            />
          </filter>
        </defs>

        {/* Regions — the only layer that scales with zoom */}
        <g transform={`translate(${tx} ${ty}) scale(${k})`}>
          {regions.map((r) => {
            const hot = hoverRegion === r.id;
            return (
              <path
                key={r.id}
                d={r.d}
                fill={
                  hot ? "rgba(199,168,120,0.16)" : "rgba(247,245,240,0.045)"
                }
                stroke="#C7A878"
                strokeOpacity={hot ? 0.85 : 0.4}
                strokeWidth={hot ? 1.6 : 1}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                style={{ transition: "fill .18s, stroke-opacity .18s" }}
                onMouseEnter={() => setHoverRegion(r.id)}
                onMouseLeave={() =>
                  setHoverRegion((cur) => (cur === r.id ? null : cur))
                }
              />
            );
          })}
        </g>

        {/* Region labels — re-projected but drawn at a CONSTANT size */}
        <g aria-hidden style={{ pointerEvents: "none" }}>
          {regions.map((r) => {
            const hot = hoverRegion === r.id;
            const lx = TX(r.cx);
            const ly = TY(r.cy);
            if (lx < -40 || lx > width + 40 || ly < -20 || ly > height + 20)
              return null;
            return (
              <text
                key={r.id}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: hot ? 22 : 17,
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  // Dark halo behind the glyphs so the (now larger)
                  // labels stay readable over the busy region lines.
                  paintOrder: "stroke",
                  stroke: "rgba(8,20,36,0.55)",
                  strokeWidth: 2.6,
                  strokeLinejoin: "round",
                  fill: hot
                    ? "rgba(247,245,240,0.98)"
                    : "rgba(247,245,240,0.6)",
                  transition: "fill .18s, font-size .18s",
                }}
              >
                {r.name}
              </text>
            );
          })}
        </g>

        {/* Curated place pins — re-projected, CONSTANT pin + tooltip size */}
        <g>
          {places.map((p) => {
            const x = TX(projectX(p.lng));
            const y = TY(projectY(p.lat));
            if (x < -20 || x > width + 20 || y < -20 || y > height + 20)
              return null;
            const on = pinnedPlace === p.id || hoverPlace === p.id;

            // Clamp the tooltip horizontally inside the viewBox.
            const tipX = Math.min(Math.max(x - TW / 2, 8), width - TW - 8);
            const above = y - TH - 22 > 0;
            const tipY = above ? y - TH - 20 : y + 22;

            return (
              <g key={p.id}>
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={`${p.label}. ${p.blurb}`}
                  style={{ cursor: "pointer" }}
                  transform={`translate(${x} ${y})`}
                  onMouseEnter={() => setHoverPlace(p.id)}
                  onMouseLeave={() =>
                    setHoverPlace((cur) => (cur === p.id ? null : cur))
                  }
                  onFocus={() => setHoverPlace(p.id)}
                  onBlur={() =>
                    setHoverPlace((cur) => (cur === p.id ? null : cur))
                  }
                  onClick={() =>
                    setPinnedPlace((cur) => (cur === p.id ? null : p.id))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPinnedPlace((cur) => (cur === p.id ? null : p.id));
                    }
                  }}
                >
                  <motion.g
                    initial={false}
                    animate={reduced ? {} : { scale: on ? 1.28 : 1 }}
                    transition={{ type: "spring" as const, stiffness: 320, damping: 20 }}
                    style={{ transformOrigin: "center" }}
                    filter="url(#pin-glow)"
                  >
                    <circle r="9" fill="#C7A878" stroke="#0A1A2F" strokeWidth="2" />
                    <circle r="3.4" fill="#0A1A2F" />
                  </motion.g>
                </g>

                {on && (
                  <foreignObject
                    x={tipX}
                    y={tipY}
                    width={TW}
                    height={TH}
                    style={{ pointerEvents: "none", overflow: "visible" }}
                  >
                    <div
                      style={{
                        boxSizing: "border-box",
                        width: `${TW}px`,
                        minHeight: `${TH}px`,
                        background: "rgba(10,26,47,0.96)",
                        border: "1px solid rgba(199,168,120,0.5)",
                        borderRadius: "12px",
                        padding: "12px 14px",
                        fontFamily: "Inter, sans-serif",
                        color: "#F7F5F0",
                        boxShadow: "0 14px 34px rgba(0,0,0,0.45)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          letterSpacing: "0.01em",
                          marginBottom: "5px",
                        }}
                      >
                        {p.label}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          lineHeight: 1.45,
                          color: "rgba(247,245,240,0.78)",
                        }}
                      >
                        {p.blurb}
                      </div>
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => zoomBy(ZOOM_STEP)}
          disabled={k >= MAX_K}
          aria-label="Zoom in"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-surface/80 text-white/75 backdrop-blur-sm transition-all hover:border-gold/50 hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => zoomBy(1 / ZOOM_STEP)}
          disabled={k <= MIN_K}
          aria-label="Zoom out"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-surface/80 text-white/75 backdrop-blur-sm transition-all hover:border-gold/50 hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Minus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={resetView}
          disabled={atRest}
          aria-label="Reset map view"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-surface/80 text-white/75 backdrop-blur-sm transition-all hover:border-gold/50 hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {atRest && (
        <span className="pointer-events-none absolute bottom-5 left-5 rounded-full border border-white/10 bg-surface/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 backdrop-blur-sm">
          Scroll to zoom · drag to pan
        </span>
      )}
    </div>
  );
}
