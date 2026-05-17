/**
 * GolfMilestone — one chapter's media. Image milestones render as a
 * still. Video milestones use a poster + play FACADE: the YouTube /
 * Vimeo iframe only mounts on click, so a scroll story of five chapters
 * never loads five players at once.
 */

import { useState } from "react";
import { Play } from "lucide-react";
import type { GolfMedia } from "../life-content";

function embedSrc(media: GolfMedia): string | null {
  if (media.type === "youtube")
    return `https://www.youtube-nocookie.com/embed/${media.id}?autoplay=1&rel=0`;
  if (media.type === "vimeo")
    return `https://player.vimeo.com/video/${media.id}?autoplay=1`;
  return null;
}

export function GolfMedia({
  media,
  poster,
  title,
}: {
  media: GolfMedia;
  poster: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const src = embedSrc(media);

  if (!src) {
    return (
      <img
        src={poster}
        alt={title}
        loading="lazy"
        decoding="async"
        className="h-full w-full rounded-2xl object-cover"
      />
    );
  }

  if (playing) {
    return (
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full rounded-2xl border-0"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className="group relative block h-full w-full overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-gold"
    >
      <img
        src={poster}
        alt={title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-surface/30 transition-colors group-hover:bg-surface/15">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-surface shadow-xl transition-transform duration-300 group-hover:scale-110">
          <Play size={24} className="ml-1" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}
