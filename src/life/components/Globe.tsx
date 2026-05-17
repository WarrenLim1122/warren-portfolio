/**
 * Globe — the react-globe.gl primitive. Imported ONLY via lazy() from
 * GlobeGallery, so three.js stays out of the main site bundle and out
 * of /life until the Gallery actually needs it.
 *
 * Tasteful, not gimmicky: slow auto-rotate, muted champagne markers,
 * transparent background so the warm page shows through. The selected
 * country drives an animated camera move.
 */

import { useEffect, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import type { Country } from "../life-content";

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
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere
          atmosphereColor="#C7A878"
          atmosphereAltitude={0.16}
          pointsData={countries}
          pointLat={(d: object) => (d as Country).lat}
          pointLng={(d: object) => (d as Country).lng}
          pointColor={(d: object) =>
            (d as Country).id === activeId ? "#D8C29A" : "#C7A878"
          }
          pointAltitude={(d: object) =>
            (d as Country).id === activeId ? 0.14 : 0.06
          }
          pointRadius={0.42}
          pointLabel={(d: object) => (d as Country).name}
          pointsTransitionDuration={600}
          onPointClick={(d: object) => onSelect((d as Country).id)}
        />
      )}
    </div>
  );
}
