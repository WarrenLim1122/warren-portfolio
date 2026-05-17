# /life photos

This is the **local photo folder** for the Gallery tab. No Vercel Blob,
no upload step. Drop image files in here and they appear on the site
automatically (Vite optimises + cache-hashes them on build).

## How to add photos

1. Pick the country sub-folder (the folder name is the country `id`):

   ```
   src/life/photos/japan/
   src/life/photos/italy/
   src/life/photos/singapore/
   ...
   ```

2. Copy your image files into it. Supported: `.jpg .jpeg .png .webp .avif`.

3. **Name the file after the place.** The filename becomes the small
   location label shown on the photo:

   | File | Shows as |
   |---|---|
   | `kyoto-fushimi-inari.jpg` | Kyoto Fushimi Inari |
   | `02-hakone.jpg` | Hakone (leading `02-` is just for ordering) |
   | `venice-2.jpg` | Venice (trailing `-2` just keeps names unique) |

4. Photos sort by filename. Prefix `01-`, `02-`, `03-` to control order.

That's it. No code changes. `npm run dev` (or the next deploy) shows them.

## Adding a new country

Edit `src/life/gallery.ts` -> `COUNTRY_META`: add
`{ id, name, lat, lng, order }` (the `id` must match the folder name),
then create `src/life/photos/<id>/` and drop photos in. The globe pin
uses the `lat` / `lng`.

## Notes

- Keep files web-sized (resize to ~2000px on the long edge, compress).
  They live in git and ship in the deploy, so multi-MB camera originals
  bloat the repo. 200 to 600 KB per photo is a good target.
- A country with no photos yet still appears on the globe and shows a
  tasteful "Coming soon" state, so it is safe to add countries early.
- The `.gitkeep` files only exist so empty folders are tracked by git.
  Leave them; they are ignored by the loader.
