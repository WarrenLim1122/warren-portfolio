/**
 * places-data.ts — per-country list of specific places visited.
 *
 * Each Place drives a pin on the zoomed country globe. Coordinates are
 * geocoded by Claude from the photo filenames when Warren says
 * "update my life folder" or similar. Run that prompt after dropping new
 * photos into src/life/photos/<country>/ and Claude will identify the
 * places, look up their coordinates, and update this file.
 *
 * id    — unique within the country (used as React key)
 * label — displayed in the hover tooltip (Title Case)
 * lat   — decimal degrees, positive = North
 * lng   — decimal degrees, positive = East
 */

export interface Place {
  id: string;
  label: string;
  lat: number;
  lng: number;
}

export const PLACES: Record<string, Place[]> = {
  singapore: [],
  japan: [],
  italy: [],
  switzerland: [],
  "new-zealand": [],
  "south-korea": [],
};
