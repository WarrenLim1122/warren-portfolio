/**
 * CountryMap — the 2D illustrated region map shown when a country is
 * picked. Pure inline SVG (no WebGL, no map library, no API): accurate
 * official region geometry generated at build time, styled in the site
 * palette, with curated place pins that reveal a short blurb on
 * hover / focus / tap.
 *
 * Geometry is registered per country in GEOMETRY below. Countries with
 * no geometry yet return null so GlobeGallery can fall back gracefully.
 */

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
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

export function CountryMap({
  country,
  places,
}: {
  country: Country;
  places: Place[];
}) {
  const reduced = useReducedMotion();
  const geo = GEOMETRY[country.id];
  const [hoverRegion, setHoverRegion] = useState<string | null>(null);
  // Transient (pointer/focus) vs sticky (click/keyboard) so a tap that
  // both focuses and clicks doesn't toggle the tooltip back off.
  const [hoverPlace, setHoverPlace] = useState<string | null>(null);
  const [pinnedPlace, setPinnedPlace] = useState<string | null>(null);

  if (!geo) return null;

  const { width, height, proj, regions } = geo;
  const projectX = (lng: number) => lng * proj.sx + proj.ox;
  const projectY = (lat: number) => lat * proj.sy + proj.oy;

  // Tooltip card size in viewBox units.
  const TW = 320;
  const TH = 96;

  return (
    <div className="flex h-full w-full items-center justify-center p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        role="group"
        aria-label={`Map of ${country.name} with notable places`}
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

        {/* Regions */}
        <g>
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
                style={{ transition: "fill .18s, stroke-opacity .18s" }}
                onMouseEnter={() => setHoverRegion(r.id)}
                onMouseLeave={() =>
                  setHoverRegion((cur) => (cur === r.id ? null : cur))
                }
              />
            );
          })}
        </g>

        {/* Region labels */}
        <g aria-hidden style={{ pointerEvents: "none" }}>
          {regions.map((r) => {
            const hot = hoverRegion === r.id;
            return (
              <text
                key={r.id}
                x={r.cx}
                y={r.cy}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: hot ? 15 : 12.5,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  fill: hot
                    ? "rgba(247,245,240,0.95)"
                    : "rgba(247,245,240,0.42)",
                  transition: "fill .18s, font-size .18s",
                }}
              >
                {r.name}
              </text>
            );
          })}
        </g>

        {/* Curated place pins */}
        <g>
          {places.map((p) => {
            const x = projectX(p.lng);
            const y = projectY(p.lat);
            const on = pinnedPlace === p.id || hoverPlace === p.id;

            // Clamp the tooltip horizontally inside the viewBox.
            const tx = Math.min(Math.max(x - TW / 2, 8), width - TW - 8);
            const above = y - TH - 22 > 0;
            const ty = above ? y - TH - 20 : y + 22;

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
                    x={tx}
                    y={ty}
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
    </div>
  );
}
