/**
 * places-data.ts — per-country curated places shown on the 2D country map.
 *
 * These are hand-authored highlights (not tied to the photo folder), each
 * with a short blurb. Claude drafts the blurbs from general knowledge;
 * Warren edits / personalises them. Coordinates are real lat/lng so the
 * pin lands correctly when projected onto the country's SVG map.
 *
 * id    — unique within the country (React key + map pin id)
 * label — shown on the pin tooltip / list (Title Case)
 * lat   — decimal degrees, positive = North
 * lng   — decimal degrees, positive = East
 * blurb — one short line, no em / en dashes (project copy rule)
 *
 * Keys must match a country id in COUNTRY_META (src/life/gallery.ts).
 */

export interface Place {
  id: string;
  label: string;
  lat: number;
  lng: number;
  blurb: string;
}

export const PLACES: Record<string, Place[]> = {
  singapore: [
    {
      id: "marina-bay",
      label: "Marina Bay",
      lat: 1.2834,
      lng: 103.8607,
      blurb:
        "The skyline that introduces the city, best at blue hour when the water mirrors every tower.",
    },
    {
      id: "gardens-by-the-bay",
      label: "Gardens by the Bay",
      lat: 1.2816,
      lng: 103.8636,
      blurb:
        "Supertrees that look engineered by a more optimistic century, loudest at the nightly light show.",
    },
    {
      id: "sentosa",
      label: "Sentosa",
      lat: 1.2494,
      lng: 103.8303,
      blurb:
        "Where the island drops to a beach pace, the easiest place to lose a slow Sunday.",
    },
    {
      id: "chinatown",
      label: "Chinatown",
      lat: 1.2820,
      lng: 103.8443,
      blurb:
        "Shophouse rows, temple incense, and the lunch queues worth standing in.",
    },
    {
      id: "botanic-gardens",
      label: "Botanic Gardens",
      lat: 1.3138,
      lng: 103.8159,
      blurb:
        "A UNESCO green lung in the middle of the map; the orchid garden alone earns the detour.",
    },
    {
      id: "jewel-changi",
      label: "Jewel, Changi",
      lat: 1.3601,
      lng: 103.9890,
      blurb:
        "An airport built around an indoor waterfall, the rare terminal people visit on purpose.",
    },
  ],

  malaysia: [
    {
      id: "kuala-lumpur",
      label: "Kuala Lumpur",
      lat: 3.1579,
      lng: 101.7116,
      blurb:
        "The Petronas Towers still set the skyline, sharpest from the KLCC park lake.",
    },
    {
      id: "penang",
      label: "Penang",
      lat: 5.4141,
      lng: 100.3288,
      blurb:
        "George Town street art, clan jetties, and the country's loudest food debates.",
    },
    {
      id: "langkawi",
      label: "Langkawi",
      lat: 6.3500,
      lng: 99.8000,
      blurb: "Cable cars and quiet beaches, the Andaman at its calmest.",
    },
    {
      id: "malacca",
      label: "Malacca",
      lat: 2.1896,
      lng: 102.2501,
      blurb:
        "A trading port layered in Dutch, Portuguese and Peranakan history.",
    },
    {
      id: "cameron-highlands",
      label: "Cameron Highlands",
      lat: 4.4710,
      lng: 101.3771,
      blurb: "Tea terraces in cool mountain air, a different Malaysia entirely.",
    },
    {
      id: "kota-kinabalu",
      label: "Kota Kinabalu",
      lat: 5.9804,
      lng: 116.0735,
      blurb: "Borneo's gateway, with Mount Kinabalu watching over the sunsets.",
    },
  ],

  thailand: [
    {
      id: "bangkok",
      label: "Bangkok",
      lat: 13.7500,
      lng: 100.4914,
      blurb:
        "Temple spires and tuk-tuk chaos, the country's loud, golden heart.",
    },
    {
      id: "chiang-mai",
      label: "Chiang Mai",
      lat: 18.7883,
      lng: 98.9853,
      blurb: "Old-city moats, mountain temples, and a slower northern rhythm.",
    },
    {
      id: "phuket",
      label: "Phuket",
      lat: 7.8804,
      lng: 98.3923,
      blurb: "Andaman beaches and limestone bays, the postcard south.",
    },
    {
      id: "ayutthaya",
      label: "Ayutthaya",
      lat: 14.3692,
      lng: 100.5877,
      blurb: "Ruined stupas of a former capital, brick and banyan roots.",
    },
    {
      id: "krabi",
      label: "Krabi",
      lat: 8.0863,
      lng: 98.8377,
      blurb: "Climbers' cliffs rising straight out of turquoise water.",
    },
    {
      id: "sukhothai",
      label: "Sukhothai",
      lat: 17.0070,
      lng: 99.7035,
      blurb: "The first Siamese capital, lotus-bud stupas in a calm park.",
    },
  ],

  china: [
    {
      id: "beijing",
      label: "Beijing",
      lat: 39.9163,
      lng: 116.3972,
      blurb: "Imperial courtyards on an axis, the Forbidden City's endless gates.",
    },
    {
      id: "shanghai",
      label: "Shanghai",
      lat: 31.2397,
      lng: 121.4900,
      blurb:
        "The Bund facing Pudong, a century of skyline in one river bend.",
    },
    {
      id: "great-wall",
      label: "The Great Wall",
      lat: 40.4319,
      lng: 116.5704,
      blurb: "A stone ridgeline running off into the hills, longer than the eye allows.",
    },
    {
      id: "xian",
      label: "Xi'an",
      lat: 34.3853,
      lng: 109.2785,
      blurb: "Ranks of clay soldiers guarding a buried emperor.",
    },
    {
      id: "guilin",
      label: "Guilin",
      lat: 25.2736,
      lng: 110.2907,
      blurb: "Karst peaks along the Li River, the landscape on the banknote.",
    },
    {
      id: "chengdu",
      label: "Chengdu",
      lat: 30.5728,
      lng: 104.0668,
      blurb: "Teahouses, spice, and pandas, the relaxed face of the southwest.",
    },
  ],

  japan: [
    {
      id: "tokyo",
      label: "Tokyo",
      lat: 35.6762,
      lng: 139.6503,
      blurb: "Neon and calm in the same block, the city that rewards wandering.",
    },
    {
      id: "kyoto",
      label: "Kyoto",
      lat: 35.0116,
      lng: 135.7681,
      blurb: "A thousand temples and quiet lanes, old Japan kept carefully.",
    },
    {
      id: "osaka",
      label: "Osaka",
      lat: 34.6937,
      lng: 135.5023,
      blurb: "Street food and brash energy, the country's appetite.",
    },
    {
      id: "mount-fuji",
      label: "Mount Fuji",
      lat: 35.3606,
      lng: 138.7274,
      blurb: "The near-perfect cone, best caught from a Hakone train window.",
    },
    {
      id: "hiroshima",
      label: "Hiroshima",
      lat: 34.3853,
      lng: 132.4553,
      blurb: "The Peace Memorial, history held with great stillness.",
    },
    {
      id: "sapporo",
      label: "Sapporo",
      lat: 43.0618,
      lng: 141.3545,
      blurb: "Snow, ramen and wide northern streets, Hokkaido's hub.",
    },
  ],
};
