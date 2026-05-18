/**
 * life-content.ts — content for /life that is NOT the photo folder.
 *
 *  - Gallery photos come from the local folder (see ./gallery.ts). The
 *    Country / CountryPhoto types and COUNTRIES are re-exported here so
 *    every component keeps importing from "../life-content" unchanged.
 *  - Golf milestones live here. Clips are unlisted YouTube videos: set a
 *    milestone's media to { type: "youtube", id: "<VIDEO_ID>" }. The still
 *    image is taken automatically from the YouTube thumbnail, so no poster
 *    file is needed (see README "Adding golf clips").
 *  - A future section is: add to LIFE_TABS, add a component, add one line
 *    to REGISTRY in LifeApp.tsx.
 *
 * Copy convention (project standing rule): no em / en dashes in strings.
 */

export type { Country, CountryPhoto } from "./gallery";
export { COUNTRIES } from "./gallery";

export type { Place } from "./places-data";
export { PLACES } from "./places-data";

export const LIFE_TABS = [
  { id: "gallery", label: "Gallery" },
  { id: "golf", label: "Golf" },
] as const;

export type LifeTabId = (typeof LIFE_TABS)[number]["id"];

/* ------------------------------------------------------------------ */
/* Golf — scrollytelling milestones, newbie to now                     */
/* ------------------------------------------------------------------ */

export type GolfMedia =
  | { type: "youtube"; id: string }
  | { type: "vimeo"; id: string }
  | { type: "image"; url: string };

export interface GolfMilestone {
  id: string;
  /** Short chapter index shown beside the title, e.g. "01". */
  index: string;
  /**
   * Short date label that pops out on the scroll timeline as this
   * chapter becomes active. Placeholder years for now; Warren edits
   * these to the real dates. No em / en dashes (project copy rule).
   */
  date: string;
  title: string;
  /** One or two sentences of story. */
  blurb: string;
  media: GolfMedia;
  /**
   * Optional override still. Not needed for YouTube (thumbnail is
   * used) or image milestones (the image itself is used).
   */
  poster?: string;
}

export const GOLF_INTRO = {
  eyebrow: "Beyond the desk",
  title: "My golf journey",
  subtitle:
    "From a first lesson with no idea where the ball would go, to a swing I am genuinely proud of. Scroll the story.",
};

// Deterministic placeholder still (always resolves; clearly not final).
// Replace each milestone's media with { type: "youtube", id: "..." }
// once the unlisted clip is uploaded.
const ph = (seed: string) => `https://picsum.photos/seed/${seed}/1280/1600`;

export const GOLF_MILESTONES: GolfMilestone[] = [
  {
    id: "first-lesson",
    index: "01",
    date: "2021",
    title: "The first lesson",
    blurb:
      "A borrowed seven iron, a bucket of range balls, and almost no contact. Humbling, and the start of everything.",
    media: { type: "image", url: ph("golf-1") },
  },
  {
    id: "first-contact",
    index: "02",
    date: "2022",
    title: "First clean strike",
    blurb:
      "Weeks of mishits, then one shot that actually compressed and flew. That single feeling was enough to keep going.",
    media: { type: "image", url: ph("golf-2") },
  },
  {
    id: "first-round",
    index: "03",
    date: "2023",
    title: "First full round",
    blurb:
      "Eighteen holes, far too many strokes, and one putt that dropped. Walking off the last green I was hooked for good.",
    media: { type: "image", url: ph("golf-3") },
  },
  {
    id: "first-par",
    index: "04",
    date: "2024",
    title: "First par",
    blurb:
      "Tee to green to cup without a wasted shot. Small on paper, enormous in the moment.",
    media: { type: "image", url: ph("golf-4") },
  },
  {
    id: "now",
    index: "05",
    date: "Today",
    title: "The swing today",
    blurb:
      "Repeatable, balanced, and still improving. The same patience that reads a company reads a golf course.",
    // When the clip is uploaded unlisted, replace the line below with:
    //   media: { type: "youtube", id: "PASTE_VIDEO_ID_HERE" },
    media: { type: "image", url: ph("golf-5") },
  },
];
