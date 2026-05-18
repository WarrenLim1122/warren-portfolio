/**
 * Globe — the react-globe.gl primitive. Imported ONLY via lazy() from
 * GlobeGallery so three.js stays out of the main bundle.
 *
 * Two marker modes driven by `viewMode`:
 *   "world"   — red push-pin per country, auto-rotate on, altitude 1.7
 *   "country" — blue push-pin per place, auto-rotate off, altitude = country.zoomAlt
 *
 * htmlAltitude is 0 so pins anchor exactly on the surface with no
 * 3-D projection offset when the globe spins.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import type { Country, Place } from "../life-content";

// Instant low-res globe, then swap to the sharper local 4K Blue Marble
// (public domain, NASA Visible Earth) once it has preloaded.
const LOW_RES_EARTH =
  "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
const HI_RES_EARTH = "/life/earth-4k.jpg";

type CountryMarker = Country & { _kind: "country"; active: boolean };
type PlaceMarker   = Place   & { _kind: "place" };
type AnyMarker     = CountryMarker | PlaceMarker;

function makeCountryEl(
  m: CountryMarker,
  onSelect: (id: string) => void,
): HTMLElement {
  const outer = document.createElement("div");
  outer.style.cssText = "cursor:pointer;line-height:0;";
  outer.title = m.name;
  outer.setAttribute("role", "button");
  outer.setAttribute("aria-label", m.name);
  outer.onclick = () => onSelect(m.id);

  const scale = m.active ? 1.22 : 1;
  const glow  = m.active
    ? "filter:drop-shadow(0 0 7px rgba(215,194,154,0.95));"
    : "filter:drop-shadow(0 3px 4px rgba(0,0,0,0.45));";

  outer.innerHTML = `
    <div style="transform:translate(-50%,-100%) scale(${scale});
                transform-origin:50% 100%;cursor:pointer;
                transition:transform .25s ease;${glow}">
      <svg width="34" height="46" viewBox="0 0 34 46" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M17 46 L13.6 22 H20.4 Z" fill="#5f6671"/>
        <circle cx="17" cy="15" r="13" fill="#e23b3b"/>
        <circle cx="17" cy="15" r="13" fill="none"
                stroke="#b91c1c" stroke-opacity="0.5" stroke-width="1.5"/>
        <circle cx="12" cy="10" r="4.4" fill="#ff8d8d" fill-opacity="0.9"/>
      </svg>
    </div>`;

  return outer;
}

function makePlaceEl(m: PlaceMarker): HTMLElement {
  const outer = document.createElement("div");
  outer.style.cssText = "cursor:pointer;line-height:0;";
  outer.setAttribute("role", "button");
  outer.setAttribute("aria-label", m.label);

  const wrap = document.createElement("div");
  wrap.style.cssText =
    "display:inline-block;position:relative;" +
    "transform:translate(-50%,-100%);" +
    "transform-origin:50% 100%;" +
    "transition:transform .2s ease;";

  wrap.innerHTML = `
    <svg width="22" height="30" viewBox="0 0 22 30" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M11 30 L8.8 17 H13.2 Z" fill="#4a85c8"/>
      <circle cx="11" cy="9.5" r="8.5" fill="#4C7FB8"/>
      <circle cx="11" cy="9.5" r="8.5" fill="none"
              stroke="#2563eb" stroke-opacity="0.4" stroke-width="1"/>
      <circle cx="7.5" cy="6.5" r="2.8" fill="#93c5fd" fill-opacity="0.8"/>
    </svg>`;

  const tip = document.createElement("div");
  tip.style.cssText =
    "position:absolute;bottom:calc(100% + 5px);left:50%;" +
    "transform:translateX(-50%);white-space:nowrap;pointer-events:none;" +
    "background:rgba(10,26,47,0.90);color:#F7F5F0;" +
    "font-size:10px;font-weight:700;letter-spacing:0.06em;" +
    "font-family:Inter,sans-serif;" +
    "padding:3px 8px;border-radius:5px;" +
    "border:1px solid rgba(199,168,120,0.35);" +
    "opacity:0;transition:opacity .15s ease;";
  tip.textContent = m.label;
  wrap.appendChild(tip);

  outer.appendChild(wrap);

  outer.addEventListener("mouseenter", () => {
    wrap.style.transform = "translate(-50%,-100%) scale(1.3)";
    tip.style.opacity    = "1";
  });
  outer.addEventListener("mouseleave", () => {
    wrap.style.transform = "translate(-50%,-100%) scale(1)";
    tip.style.opacity    = "0";
  });

  return outer;
}

export default function GlobeView({
  countries,
  activeId,
  onSelect,
  viewMode,
  places,
}: {
  countries: Country[];
  activeId:  string;
  onSelect:  (id: string) => void;
  viewMode:  "world" | "country";
  places:    Place[];
}) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [earthUrl, setEarthUrl] = useState(LOW_RES_EARTH);

  const countryMarkers = useMemo<CountryMarker[]>(
    () =>
      countries.map((c) => ({
        ...c,
        _kind:  "country" as const,
        active: c.id === activeId,
      })),
    [countries, activeId],
  );

  const placeMarkers = useMemo<PlaceMarker[]>(
    () => places.map((p) => ({ ...p, _kind: "place" as const })),
    [places],
  );

  const displayData: AnyMarker[] =
    viewMode === "world" ? countryMarkers : placeMarkers;

  // Measure container so the canvas fits exactly.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Preload the sharper texture, then swap it in (no blank-globe flash).
  useEffect(() => {
    const img = new Image();
    img.onload = () => setEarthUrl(HI_RES_EARTH);
    img.src = HI_RES_EARTH;
  }, []);

  // One-time globe setup: enable scroll-zoom (clamped), idle spin, POV.
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const ctrl = g.controls() as {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
      minDistance: number;
      maxDistance: number;
      zoomSpeed: number;
    };
    ctrl.enableZoom      = true;
    ctrl.zoomSpeed       = 0.8;
    ctrl.minDistance     = 125; // ~0.25 globe-radii above the surface
    ctrl.maxDistance     = 520; // can't fly off into empty space
    ctrl.autoRotate      = true;
    ctrl.autoRotateSpeed = 0.45;
    g.pointOfView({ lat: 12, lng: 90, altitude: 2.4 }, 0);
  }, []);

  // Camera + rotation whenever view mode or active country changes.
  useEffect(() => {
    const g = globeRef.current;
    const c = countries.find((x) => x.id === activeId);
    if (!g || !c) return;
    const ctrl = g.controls() as {
      autoRotate: boolean;
      autoRotateSpeed: number;
    };
    if (viewMode === "country") {
      ctrl.autoRotate = false;
      g.pointOfView({ lat: c.lat, lng: c.lng, altitude: c.zoomAlt }, 1400);
    } else {
      ctrl.autoRotate      = true;
      ctrl.autoRotateSpeed = 0.45;
      g.pointOfView({ lat: c.lat, lng: c.lng, altitude: 1.7 }, 1100);
    }
  }, [activeId, countries, viewMode]);

  return (
    <div ref={wrapRef} className="h-full w-full" style={{ cursor: "grab" }}>
      {size.w > 0 && (
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={earthUrl}
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere
          atmosphereColor="#9ec6f0"
          atmosphereAltitude={0.18}
          htmlElementsData={displayData}
          htmlLat={(d: object) => (d as AnyMarker).lat}
          htmlLng={(d: object) => (d as AnyMarker).lng}
          htmlAltitude={0}
          htmlElement={(d: object) => {
            const m = d as AnyMarker;
            return m._kind === "country"
              ? makeCountryEl(m, onSelect)
              : makePlaceEl(m);
          }}
          htmlTransitionDuration={200}
        />
      )}
    </div>
  );
}
