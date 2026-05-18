/**
 * gallery.ts — the aesthetic gallery, loaded from a LOCAL FOLDER.
 *
 * No Vercel Blob, no upload step. To add photos: drop image files into
 *
 *     src/life/photos/<country-id>/<your-file>.jpg
 *
 * and they appear automatically (Vite hashes + optimises them on build).
 * The folder name must match a `id` in COUNTRY_META below.
 *
 * Filename becomes the on-photo location label:
 *   "kyoto-fushimi-inari.jpg"      -> "Kyoto Fushimi Inari"
 *   "02-hakone.jpg"                -> "Hakone"          (order prefix stripped)
 *   "venice-2.jpg"                 -> "Venice"          (dedupe index stripped)
 * Files sort by name, so prefix with 01-, 02- to control order.
 *
 * To add / rename a country or fix its globe pin, edit COUNTRY_META.
 */

export interface CountryPhoto {
  /** Resolved, build-hashed URL of a file in src/life/photos/. */
  url: string;
  /** The only text shown with a photo (location-only gallery). */
  location: string;
  alt: string;
}

export interface Country {
  id: string;
  name: string;
  /** Real coordinates so the globe marker lands correctly. */
  lat: number;
  lng: number;
  /** Globe camera altitude when zoomed into this country (globe-radius units). */
  zoomAlt: number;
  photos: CountryPhoto[];
}

interface CountryMeta {
  /** Must equal the folder name under src/life/photos/. */
  id: string;
  name: string;
  lat: number;
  lng: number;
  /** Display order, low to high. */
  order: number;
  /** Globe camera altitude when zoomed into this country (globe-radius units). */
  zoomAlt: number;
}

const COUNTRY_META: CountryMeta[] = [
  { id: "singapore", name: "Singapore", lat:  1.3521, lng: 103.8198, order: 1, zoomAlt: 0.30 },
  { id: "malaysia",  name: "Malaysia",  lat:  4.2105, lng: 101.9758, order: 2, zoomAlt: 0.80 },
  { id: "thailand",  name: "Thailand",  lat: 15.8700, lng: 100.9925, order: 3, zoomAlt: 0.85 },
  { id: "china",     name: "China",     lat: 35.8617, lng: 104.1954, order: 4, zoomAlt: 1.20 },
  { id: "japan",     name: "Japan",     lat: 36.2048, lng: 138.2529, order: 5, zoomAlt: 1.00 },
];

// Every image dropped into src/life/photos/<country>/ is picked up here.
const FILES = import.meta.glob<string>(
  "./photos/*/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,avif}",
  { eager: true, import: "default", query: "?url" },
);

function toLabel(filePath: string): string {
  const base = filePath.split("/").pop()!.replace(/\.[^.]+$/, "");
  return base
    .replace(/^\d+[-_]/, "") // strip leading order prefix "01-"
    .replace(/[-_]\d+$/, "") // strip trailing dedupe index "-2"
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

const byCountry = new Map<string, CountryPhoto[]>();
for (const path of Object.keys(FILES).sort()) {
  const m = path.match(/\.\/photos\/([^/]+)\//);
  if (!m) continue;
  const label = toLabel(path);
  const list = byCountry.get(m[1]) ?? [];
  list.push({ url: FILES[path], location: label, alt: label });
  byCountry.set(m[1], list);
}

/**
 * All configured countries (so the globe + chips are populated even
 * before any photo is added). Countries with no files yet simply have
 * an empty `photos` array; the Gallery shows a tasteful empty state.
 */
export const COUNTRIES: Country[] = COUNTRY_META.slice()
  .sort((a, b) => a.order - b.order)
  .map(({ id, name, lat, lng, zoomAlt }) => ({
    id,
    name,
    lat,
    lng,
    zoomAlt,
    photos: byCountry.get(id) ?? [],
  }));
