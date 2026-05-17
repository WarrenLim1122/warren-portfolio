/**
 * life-content.ts — the SINGLE source of content for /life.
 *
 * Everything the personal area shows is data here. Swapping placeholders
 * for real assets is editing this file only (no component changes):
 *
 *  - Photos: replace each `url` with the Vercel Blob public URL
 *    (https://<store>.public.blob.vercel-storage.com/...). The current
 *    picsum.photos URLs are deterministic, always-available PLACEHOLDERS.
 *  - Golf clips: switch a milestone's `media` from { type: "image" } to
 *    { type: "youtube", id: "<id>" } or { type: "vimeo", id: "<id>" }
 *    using the unlisted upload's id.
 *  - New section later: add an entry to LIFE_TABS, a component, and one
 *    line in the registry in LifeApp.tsx. Nothing else changes.
 *
 * Copy convention (project standing rule): no em / en dashes in strings.
 */

export const LIFE_TABS = [
  { id: "gallery", label: "Gallery" },
  { id: "golf", label: "Golf" },
] as const;

export type LifeTabId = (typeof LIFE_TABS)[number]["id"];

/* ------------------------------------------------------------------ */
/* Gallery — aesthetic photography, organised by country               */
/* ------------------------------------------------------------------ */

export interface CountryPhoto {
  /** Vercel Blob public URL in production; picsum placeholder for now. */
  url: string;
  /** The only text shown with a photo (location-only gallery). */
  location: string;
  /** Accessible description. */
  alt: string;
}

export interface Country {
  id: string;
  name: string;
  /** Real coordinates so the globe marker lands correctly. */
  lat: number;
  lng: number;
  photos: CountryPhoto[];
}

// Deterministic placeholder image (always resolves, clearly not final).
const ph = (seed: string) =>
  `https://picsum.photos/seed/${seed}/1200/1500`;

export const COUNTRIES: Country[] = [
  {
    id: "singapore",
    name: "Singapore",
    lat: 1.3521,
    lng: 103.8198,
    photos: [
      { url: ph("sg-1"), location: "Marina Bay", alt: "City skyline at dusk" },
      { url: ph("sg-2"), location: "Gardens by the Bay", alt: "Illuminated gardens" },
      { url: ph("sg-3"), location: "Chinatown", alt: "Lantern-lit street" },
      { url: ph("sg-4"), location: "East Coast", alt: "Calm coastline" },
    ],
  },
  {
    id: "japan",
    name: "Japan",
    lat: 36.2048,
    lng: 138.2529,
    photos: [
      { url: ph("jp-1"), location: "Kyoto", alt: "Torii path through trees" },
      { url: ph("jp-2"), location: "Tokyo", alt: "Neon crossing at night" },
      { url: ph("jp-3"), location: "Hakone", alt: "Mountain reflected in a lake" },
      { url: ph("jp-4"), location: "Nara", alt: "Quiet temple grounds" },
    ],
  },
  {
    id: "italy",
    name: "Italy",
    lat: 41.8719,
    lng: 12.5674,
    photos: [
      { url: ph("it-1"), location: "Venice", alt: "Canal at golden hour" },
      { url: ph("it-2"), location: "Florence", alt: "Terracotta rooftops" },
      { url: ph("it-3"), location: "Rome", alt: "Ancient stone arches" },
    ],
  },
  {
    id: "switzerland",
    name: "Switzerland",
    lat: 46.8182,
    lng: 8.2275,
    photos: [
      { url: ph("ch-1"), location: "Lauterbrunnen", alt: "Waterfall valley" },
      { url: ph("ch-2"), location: "Zermatt", alt: "Snow peak at sunrise" },
      { url: ph("ch-3"), location: "Lucerne", alt: "Lake below the alps" },
    ],
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    lat: -40.9006,
    lng: 174.886,
    photos: [
      { url: ph("nz-1"), location: "Queenstown", alt: "Lake ringed by mountains" },
      { url: ph("nz-2"), location: "Fiordland", alt: "Mist over a sound" },
      { url: ph("nz-3"), location: "Wanaka", alt: "Lone tree in still water" },
    ],
  },
  {
    id: "south-korea",
    name: "South Korea",
    lat: 35.9078,
    lng: 127.7669,
    photos: [
      { url: ph("kr-1"), location: "Seoul", alt: "Palace under autumn leaves" },
      { url: ph("kr-2"), location: "Busan", alt: "Coastal village in colour" },
      { url: ph("kr-3"), location: "Jeju", alt: "Volcanic coastline" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Golf — scrollytelling milestones, newbie to now                     */
/* ------------------------------------------------------------------ */

export type GolfMedia =
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string }
  | { type: "image"; url: string };

export interface GolfMilestone {
  id: string;
  /** Short chapter index shown alongside the title, e.g. "01". */
  index: string;
  title: string;
  /** One or two sentences of story. */
  blurb: string;
  /** Poster image always shown; embeds load on click (facade). */
  poster: string;
  media: GolfMedia;
}

export const GOLF_INTRO = {
  eyebrow: "Beyond the desk",
  title: "The golf journey",
  subtitle:
    "From a first lesson with no idea where the ball would go, to a swing I am genuinely proud of. Scroll the story.",
};

export const GOLF_MILESTONES: GolfMilestone[] = [
  {
    id: "first-lesson",
    index: "01",
    title: "The first lesson",
    blurb:
      "A borrowed seven iron, a bucket of range balls, and almost no contact. Humbling, and the start of everything.",
    poster: ph("golf-1"),
    media: { type: "image", url: ph("golf-1") },
  },
  {
    id: "first-contact",
    index: "02",
    title: "First clean strike",
    blurb:
      "Weeks of mishits, then one shot that actually compressed and flew. That single feeling was enough to keep going.",
    poster: ph("golf-2"),
    media: { type: "image", url: ph("golf-2") },
  },
  {
    id: "first-round",
    index: "03",
    title: "First full round",
    blurb:
      "Eighteen holes, far too many strokes, and one putt that dropped. Walking off the last green I was hooked for good.",
    poster: ph("golf-3"),
    media: { type: "image", url: ph("golf-3") },
  },
  {
    id: "first-par",
    index: "04",
    title: "First par",
    blurb:
      "Tee to green to cup without a wasted shot. Small on paper, enormous in the moment.",
    poster: ph("golf-4"),
    media: { type: "image", url: ph("golf-4") },
  },
  {
    id: "now",
    index: "05",
    title: "The swing today",
    blurb:
      "Repeatable, balanced, and still improving. The same patience that reads a company reads a golf course.",
    poster: ph("golf-5"),
    // When the real clip is uploaded unlisted, switch to:
    // media: { type: "youtube", id: "YOUR_VIDEO_ID" },
    media: { type: "image", url: ph("golf-5") },
  },
];
