/**
 * Globe — the react-globe.gl primitive. Imported ONLY via lazy() from
 * GlobeGallery, so three.js stays out of the main site bundle and out
 * of /life until the Gallery actually needs it.
 *
 * Full-colour Earth (NASA blue marble), gentle auto-rotate, and a
 * cartoon push-pin marker per country (red rounded head + grey stem,
 * billboarded so it reads as a 3D pin from any angle). The selected
 * country drives an animated camera move and a larger, glowing pin.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import type { Country } from "../life-content";

type Marker = Country & { active: boolean };

// Cartoon push-pin (matches the reference: red ball + soft highlight +
// tapered grey stem). Tip is the bottom-centre, so the wrapper anchors
// it exactly on the coordinate.
function pinHtml(active: boolean): string {
  const scale = active ? 1.22 : 1;
  const glow = active
    ? "filter:drop-shadow(0 0 7px rgba(215,194,154,0.95));"
    : "filter:drop-shadow(0 3px 4px rgba(0,0,0,0.45));";
  return `
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
}

export default function GlobeView({
  countries,
  activeId,
  onSelect,
}: {
  countries: Country[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // New objects when activeId changes so react-globe.gl rebuilds the
  // pin elements with the correct active styling.
  const markers = useMemo<Marker[]>(
    () => countries.map((c) => ({ ...c, active: c.id === activeId })),
    [countries, activeId],
  );

  // Measure the container so the canvas fits the stage exactly.
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

  // Gentle idle spin; user drag still works, zoom disabled (keeps it calm).
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls() as unknown as {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
    };
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
    controls.enableZoom = false;
    g.pointOfView({ lat: 12, lng: 90, altitude: 2.4 }, 0);
  }, []);

  // Fly to the active country whenever it changes.
  useEffect(() => {
    const g = globeRef.current;
    const c = countries.find((x) => x.id === activeId);
    if (!g || !c) return;
    g.pointOfView({ lat: c.lat, lng: c.lng, altitude: 1.7 }, 1100);
  }, [activeId, countries]);

  return (
    <div ref={wrapRef} className="h-full w-full">
      {size.w > 0 && (
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere
          atmosphereColor="#9ec6f0"
          atmosphereAltitude={0.18}
          htmlElementsData={markers}
          htmlLat={(d: object) => (d as Marker).lat}
          htmlLng={(d: object) => (d as Marker).lng}
          htmlAltitude={0.012}
          htmlElement={(d: object) => {
            const m = d as Marker;
            const el = document.createElement("div");
            el.innerHTML = pinHtml(m.active);
            el.style.pointerEvents = "auto";
            el.title = m.name;
            el.setAttribute("role", "button");
            el.setAttribute("aria-label", m.name);
            el.onclick = () => onSelect(m.id);
            return el;
          }}
          htmlTransitionDuration={300}
        />
      )}
    </div>
  );
}
