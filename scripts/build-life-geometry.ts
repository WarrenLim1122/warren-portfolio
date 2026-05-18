/**
 * build-life-geometry.ts — DEV-ONLY. Not part of `npm run build`.
 *
 * Converts a WGS84 GeoJSON of a country's first-level regions into a
 * tiny static TS file of SVG path strings + a linear lng/lat->x/y
 * projection, so the app renders accurate maps with ZERO geo libraries.
 *
 * Run:  npx tsx scripts/build-life-geometry.ts
 *
 * Source data (open, free):
 *   Singapore planning areas — data.gov.sg URA Master Plan 2019
 *   (No Sea), Singapore Open Data Licence.
 *
 * To regenerate after swapping the raw GeoJSON, just re-run this script.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

interface Job {
  /** Raw GeoJSON path, relative to repo root. */
  src: string;
  /** Output .ts path, relative to repo root. */
  out: string;
  /** Exported const name. */
  exportName: string;
  /** Feature property holding the region name. */
  nameProp: string;
  /** Fallback name property if `nameProp` is empty. */
  nameAltProp?: string;
  /** Keep only features where properties[prop] === value. */
  filter?: { prop: string; value: string };
  /** Stripped from the resolved name before display (e.g. " Prefecture"). */
  stripRe?: RegExp;
  /** Source attribution line for the generated file banner. */
  source: string;
  /** Target SVG width in user units. */
  width: number;
  /** Inner padding in user units. */
  pad: number;
  /** Douglas-Peucker tolerance in projected user units (lower = sharper, bigger). */
  simplifyTol: number;
  /** Drop projected sub-polygons whose area is below this (user units^2). */
  minAreaPx: number;
}

const NE10M = "src/life/data-raw/ne10m-admin1.geojson";
const NE_SRC =
  "Natural Earth 10m Admin 1 (states / provinces), public domain.";

const JOBS: Job[] = [
  {
    src: "src/life/data-raw/sg-planning-areas.geojson",
    out: "src/life/regions/singapore.ts",
    exportName: "SINGAPORE_GEOMETRY",
    nameProp: "PLN_AREA_N",
    source:
      "data.gov.sg URA Master Plan 2019 Planning Area Boundary (No Sea), Singapore Open Data Licence.",
    width: 1000,
    pad: 28,
    simplifyTol: 0.7,
    minAreaPx: 2.0,
  },
  {
    src: NE10M,
    out: "src/life/regions/japan.ts",
    exportName: "JAPAN_GEOMETRY",
    nameProp: "name_en",
    nameAltProp: "name",
    filter: { prop: "admin", value: "Japan" },
    stripRe: / Prefecture$/,
    source: NE_SRC,
    width: 1000,
    pad: 24,
    simplifyTol: 1.0,
    minAreaPx: 1.5,
  },
  {
    src: NE10M,
    out: "src/life/regions/china.ts",
    exportName: "CHINA_GEOMETRY",
    nameProp: "name_en",
    nameAltProp: "name",
    filter: { prop: "admin", value: "China" },
    source: NE_SRC,
    width: 1000,
    pad: 24,
    simplifyTol: 1.5,
    minAreaPx: 3.0,
  },
  {
    src: NE10M,
    out: "src/life/regions/malaysia.ts",
    exportName: "MALAYSIA_GEOMETRY",
    nameProp: "name_en",
    nameAltProp: "name",
    filter: { prop: "admin", value: "Malaysia" },
    source: NE_SRC,
    width: 1000,
    pad: 24,
    simplifyTol: 0.9,
    minAreaPx: 1.2,
  },
  {
    src: NE10M,
    out: "src/life/regions/thailand.ts",
    exportName: "THAILAND_GEOMETRY",
    nameProp: "name_en",
    nameAltProp: "name",
    filter: { prop: "admin", value: "Thailand" },
    source: NE_SRC,
    width: 1000,
    pad: 24,
    simplifyTol: 0.9,
    minAreaPx: 1.0,
  },
];

type Pos = [number, number];
type Ring = Pos[];
type Poly = Ring[];

function titleCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bAnd\b/g, "and")
    .trim();
}

/** All polygons of a feature, normalised to Poly[] (array of rings-arrays). */
function polygonsOf(geom: any): Poly[] {
  if (geom.type === "Polygon") return [geom.coordinates as Poly];
  if (geom.type === "MultiPolygon") return geom.coordinates as Poly[];
  return [];
}

/** Douglas-Peucker on projected [x,y] points (keeps the closing point). */
function simplify(pts: Pos[], tol: number): Pos[] {
  if (pts.length < 4) return pts;
  const closed =
    pts[0][0] === pts[pts.length - 1][0] &&
    pts[0][1] === pts[pts.length - 1][1];
  const open = closed ? pts.slice(0, -1) : pts;
  if (open.length < 3) return pts;

  const keep = new Uint8Array(open.length);
  keep[0] = 1;
  keep[open.length - 1] = 1;
  const stack: [number, number][] = [[0, open.length - 1]];
  const tol2 = tol * tol;

  while (stack.length) {
    const [a, b] = stack.pop()!;
    let maxD = -1,
      idx = -1;
    const [ax, ay] = open[a];
    const [bx, by] = open[b];
    const dx = bx - ax,
      dy = by - ay;
    const len2 = dx * dx + dy * dy || 1e-12;
    for (let i = a + 1; i < b; i++) {
      const [px0, py0] = open[i];
      const t = ((px0 - ax) * dx + (py0 - ay) * dy) / len2;
      const cx = ax + t * dx,
        cy = ay + t * dy;
      const d2 = (px0 - cx) ** 2 + (py0 - cy) ** 2;
      if (d2 > maxD) {
        maxD = d2;
        idx = i;
      }
    }
    if (maxD > tol2 && idx > -1) {
      keep[idx] = 1;
      stack.push([a, idx], [idx, b]);
    }
  }

  const out: Pos[] = [];
  for (let i = 0; i < open.length; i++) if (keep[i]) out.push(open[i]);
  out.push(out[0]); // re-close
  return out;
}

/** Shoelace area (absolute) of a projected ring. */
function ringArea(ring: Pos[]): number {
  let a = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    a += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  return Math.abs(a / 2);
}

/** Area-weighted centroid of the largest ring (for the label anchor). */
function ringCentroid(ring: Ring): { cx: number; cy: number; area: number } {
  let a = 0,
    cx = 0,
    cy = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const [x0, y0] = ring[i];
    const [x1, y1] = ring[i + 1];
    const f = x0 * y1 - x1 * y0;
    a += f;
    cx += (x0 + x1) * f;
    cy += (y0 + y1) * f;
  }
  a *= 0.5;
  if (Math.abs(a) < 1e-12) {
    // Degenerate: fall back to vertex mean.
    const mx = ring.reduce((s, p) => s + p[0], 0) / ring.length;
    const my = ring.reduce((s, p) => s + p[1], 0) / ring.length;
    return { cx: mx, cy: my, area: 0 };
  }
  return { cx: cx / (6 * a), cy: cy / (6 * a), area: Math.abs(a) };
}

function run(job: Job) {
  const gj = JSON.parse(readFileSync(resolve(ROOT, job.src), "utf8"));
  const feats: any[] = job.filter
    ? gj.features.filter(
        (f: any) => f.properties[job.filter!.prop] === job.filter!.value,
      )
    : gj.features;
  if (feats.length === 0) {
    throw new Error(
      `${job.exportName}: no features after filter ${JSON.stringify(
        job.filter,
      )}`,
    );
  }

  // Bounding box in lng/lat.
  let minLng = 180,
    maxLng = -180,
    minLat = 90,
    maxLat = -90;
  const visit = (c: any) => {
    if (typeof c[0] === "number") {
      minLng = Math.min(minLng, c[0]);
      maxLng = Math.max(maxLng, c[0]);
      minLat = Math.min(minLat, c[1]);
      maxLat = Math.max(maxLat, c[1]);
    } else c.forEach(visit);
  };
  feats.forEach((f) => visit(f.geometry.coordinates));

  // Equirectangular with cos(meanLat) x-correction — exact at this scale.
  const meanLat = ((minLat + maxLat) / 2) * (Math.PI / 180);
  const lngSpan = (maxLng - minLng) * Math.cos(meanLat);
  const latSpan = maxLat - minLat;
  const innerW = job.width - job.pad * 2;
  const k = innerW / lngSpan; // user units per degree
  const innerH = latSpan * k;
  const height = Math.round(innerH + job.pad * 2);

  // x = lng*sx + ox ; y = lat*sy + oy   (y flips: north = up)
  const sx = k * Math.cos(meanLat);
  const ox = job.pad - minLng * sx;
  const sy = -k;
  const oy = job.pad - maxLat * sy;

  const projRing = (ring: Ring): Pos[] =>
    ring.map(([lng, lat]) => [lng * sx + ox, lat * sy + oy] as Pos);

  const ringPath = (pts: Pos[]): string => {
    let d = "";
    for (let i = 0; i < pts.length; i++) {
      d +=
        (i === 0 ? "M" : "L") +
        (+pts[i][0].toFixed(1)) +
        " " +
        (+pts[i][1].toFixed(1));
    }
    return d + "Z";
  };

  const regions = feats
    .map((f) => {
      let rawName = String(
        f.properties[job.nameProp] ??
          (job.nameAltProp ? f.properties[job.nameAltProp] : "") ??
          "",
      ).trim();
      if (job.stripRe) rawName = rawName.replace(job.stripRe, "").trim();
      const name = titleCase(rawName);
      const id = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      // Sub-polygons sorted largest-first so a fallback can keep the biggest.
      const polys = polygonsOf(f.geometry)
        .map((poly) => ({ poly, outer: projRing(poly[0]) }))
        .sort((a, b) => ringArea(b.outer) - ringArea(a.outer));

      let d = "";
      let best = { cx: 0, cy: 0, area: -1 };

      polys.forEach(({ poly, outer }, i) => {
        const keepAnyway = i === 0; // never drop a region entirely
        if (!keepAnyway && ringArea(outer) < job.minAreaPx) return;

        const so = simplify(outer, job.simplifyTol);
        if (so.length < 4) return;
        d += ringPath(so);

        for (let h = 1; h < poly.length; h++) {
          const hole = projRing(poly[h]);
          if (ringArea(hole) < job.minAreaPx) continue;
          const sh = simplify(hole, job.simplifyTol);
          if (sh.length >= 4) d += ringPath(sh);
        }

        const c = ringCentroid(so);
        if (c.area > best.area) best = c;
      });

      return {
        id,
        name,
        d,
        cx: +best.cx.toFixed(1),
        cy: +best.cy.toFixed(1),
      };
    })
    .filter((r) => r.d)
    .sort((a, b) => a.name.localeCompare(b.name));

  const banner =
    "/**\n" +
    " * GENERATED by scripts/build-life-geometry.ts - do not hand-edit.\n" +
    ` * Source: ${job.source}\n` +
    " * Re-run the script to refresh.\n" +
    " */\n\n";

  const body =
    banner +
    "export interface RegionShape {\n" +
    "  id: string;\n  name: string;\n  /** SVG path data in the country viewBox. */\n  d: string;\n" +
    "  /** Label anchor (centroid) in the same viewBox. */\n  cx: number;\n  cy: number;\n}\n\n" +
    "export interface CountryGeometry {\n  width: number;\n  height: number;\n" +
    "  /** Linear projection: x = lng*sx + ox ; y = lat*sy + oy. */\n" +
    "  proj: { sx: number; sy: number; ox: number; oy: number };\n" +
    "  regions: RegionShape[];\n}\n\n" +
    `export const ${job.exportName}: CountryGeometry = {\n` +
    `  width: ${job.width},\n  height: ${height},\n` +
    `  proj: { sx: ${+sx.toFixed(6)}, sy: ${+sy.toFixed(6)}, ox: ${+ox.toFixed(
      4,
    )}, oy: ${+oy.toFixed(4)} },\n` +
    "  regions: [\n" +
    regions
      .map(
        (r) =>
          `    { id: ${JSON.stringify(r.id)}, name: ${JSON.stringify(
            r.name,
          )}, cx: ${r.cx}, cy: ${r.cy}, d: ${JSON.stringify(r.d)} },`,
      )
      .join("\n") +
    "\n  ],\n};\n";

  const outAbs = resolve(ROOT, job.out);
  mkdirSync(dirname(outAbs), { recursive: true });
  writeFileSync(outAbs, body, "utf8");
  const kb = (body.length / 1024).toFixed(1);
  console.log(
    `${job.exportName}: ${regions.length} regions -> ${job.out} (${kb} KB), viewBox 0 0 ${job.width} ${height}`,
  );
}

for (const job of JOBS) run(job);
