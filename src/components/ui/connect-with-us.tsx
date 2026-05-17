/**
 * ContactConnect — the contact panel (rendered in the dark hero and the
 * light footer).
 *
 * This is a faithful adaptation of the reference SocialConnect snippet:
 * a glowing 3D container holding circular glass icon discs. The disc,
 * hover lift + scale, per-brand background + glow, the SVG shake, the
 * label fade/slide and the radial ::before highlight all match the
 * reference behaviour exactly. Adapted to this stack:
 *   - styled-jsx (Next-only) -> a plain <style> deduped via React 19's
 *     `precedence` so the two instances inject the rule set once;
 *   - the container glow is champagne gold (the brand accent), not the
 *     reference purple;
 *   - the contacts are Email / LinkedIn / GitHub / WhatsApp using the
 *     project's own glyphs (no raw address / handle shown);
 *   - tone-aware: identical motion on the dark hero (tone="dark") and
 *     the light footer (tone="light").
 */

import { type CSSProperties } from "react";
import { Mail } from "lucide-react";
import { PERSONAL_INFO } from "../../constants";
import { cn } from "../../lib/utils";
import { LinkedinIcon, WhatsappIcon, GithubIcon } from "./icons";

const WA_NUMBER = PERSONAL_INFO.phone.replace(/\D/g, "");

type Tone = "light" | "dark";

const ITEMS = [
  {
    id: "email",
    Icon: Mail,
    label: "Email",
    href: `mailto:${PERSONAL_INFO.email}`,
    external: false,
    bg: "#E5484D",
    glow: "rgba(229, 72, 77, 0.6)",
  },
  {
    id: "linkedin",
    Icon: LinkedinIcon,
    label: "LinkedIn",
    href: PERSONAL_INFO.linkedinUrl,
    external: true,
    bg: "#0077b5",
    glow: "rgba(0, 119, 181, 0.6)",
  },
  {
    id: "github",
    Icon: GithubIcon,
    label: "GitHub",
    href: PERSONAL_INFO.github,
    external: true,
    bg: "#333333",
    glow: "rgba(51, 51, 51, 0.6)",
  },
  {
    id: "whatsapp",
    Icon: WhatsappIcon,
    label: "WhatsApp",
    href: `https://wa.me/${WA_NUMBER}`,
    external: true,
    bg: "#25D366",
    glow: "rgba(37, 211, 102, 0.6)",
  },
] as const;

const STYLES = `
.cc-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}
.cc-disc {
  display: inline-flex;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.cc-disc::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}
.cc-label {
  margin-top: 12px;
  font-weight: 500;
  opacity: 0.7;
  transition: all 0.3s ease;
}
.cc-icon:hover .cc-disc {
  transform: translateY(-10px) scale(1.1);
  background: var(--cc-bg);
  box-shadow: 0 0 20px var(--cc-glow);
}
.cc-icon:hover .cc-disc::before { opacity: 1; }
.cc-icon:hover .cc-disc svg { animation: cc-shake 0.5s; color: #fff; }
.cc-icon:hover .cc-label { opacity: 1; transform: translateY(5px); }
.cc-icon:focus-visible .cc-disc {
  transform: translateY(-10px) scale(1.1);
  background: var(--cc-bg);
  box-shadow: 0 0 20px var(--cc-glow);
  outline: none;
}
.cc-icon:focus-visible .cc-disc svg { color: #fff; }
.cc-icon:focus-visible .cc-label { opacity: 1; transform: translateY(5px); }
.cc-dark .cc-disc {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.cc-dark .cc-disc svg { color: #ffffff; }
.cc-dark .cc-label { color: #ffffff; }
.cc-light .cc-disc {
  background: rgba(15, 44, 74, 0.04);
  border: 1px solid #E3E1DA;
}
.cc-light .cc-disc svg { color: #0F2C4A; }
.cc-light .cc-label { color: #0F2C4A; }
@keyframes cc-shake {
  0%, 100% { transform: translateX(0) rotate(0); }
  20% { transform: translateX(-5px) rotate(-5deg); }
  40% { transform: translateX(5px) rotate(5deg); }
  60% { transform: translateX(-5px) rotate(-5deg); }
  80% { transform: translateX(5px) rotate(5deg); }
}
@media (prefers-reduced-motion: reduce) {
  .cc-icon, .cc-disc, .cc-disc::before, .cc-label { transition: none; }
  .cc-icon:hover .cc-disc svg, .cc-icon:focus-visible .cc-disc svg { animation: none; }
}
`;

export function ContactConnect({
  tone = "light",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "cc-root group relative overflow-hidden rounded-3xl border p-8 backdrop-blur-3xl transition-all duration-500 hover:scale-[1.03] sm:p-10",
        dark ? "cc-dark" : "cc-light",
        dark
          ? "border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.015]"
          : "border-line bg-gradient-to-br from-white to-paper-2",
        className,
      )}
      style={{
        boxShadow: dark
          ? "0 0 50px rgba(199, 168, 120, 0.42), 0 0 90px rgba(199, 168, 120, 0.22)"
          : "0 0 44px rgba(199, 168, 120, 0.28), 0 30px 70px -36px rgba(15, 48, 87, 0.30)",
      }}
    >
      {/* React 19 dedupes this by `href` precedence, so the rule set is
          injected once even though the panel renders in hero + footer. */}
      <style href="contact-connect-styles" precedence="default">
        {STYLES}
      </style>

      <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-8 sm:gap-x-14">
        {ITEMS.map(({ id, Icon, label, href, external, bg, glow }) => (
          <a
            key={id}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            aria-label={label}
            className="cc-icon"
            style={
              { "--cc-bg": bg, "--cc-glow": glow } as CSSProperties
            }
          >
            <span className="cc-disc">
              <Icon size={32} strokeWidth={1.9} className="h-8 w-8" />
            </span>
            <span className="cc-label text-sm">{label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
