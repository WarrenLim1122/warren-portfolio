/**
 * ContactConnect — the slim, theme-aware contact row (email · LinkedIn ·
 * WhatsApp). The card layout is unchanged (Warren confirmed it reads
 * well); each card now carries the same "limelight" treatment as the
 * navbar rail: on hover/focus a beam in the contact's own brand colour
 * lights the top of the card with a soft downward cone, and the icon +
 * value tint to match (Email red, LinkedIn blue, WhatsApp green).
 */

import { type CSSProperties } from "react";
import { Mail } from "lucide-react";
import { PERSONAL_INFO } from "../../constants";
import { cn } from "../../lib/utils";
import { LinkedinIcon, WhatsappIcon } from "./icons";

const WA_NUMBER = PERSONAL_INFO.phone.replace(/\D/g, "");

type Tone = "light" | "dark";

const ITEMS = [
  {
    id: "email",
    Icon: Mail,
    label: "Email",
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    external: false,
    tint: "#E5484D",
  },
  {
    id: "linkedin",
    Icon: LinkedinIcon,
    label: "LinkedIn",
    value: "in/warrenlimzf",
    href: PERSONAL_INFO.linkedinUrl,
    external: true,
    tint: "#0A66C2",
  },
  {
    id: "whatsapp",
    Icon: WhatsappIcon,
    label: "WhatsApp",
    value: PERSONAL_INFO.phone,
    href: `https://wa.me/${WA_NUMBER}`,
    external: true,
    tint: "#25D366",
  },
] as const;

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
        "flex flex-col gap-px overflow-hidden rounded-2xl border sm:flex-row",
        dark ? "border-white/12 bg-white/[0.03]" : "border-line bg-white",
        className,
      )}
    >
      {ITEMS.map(({ id, Icon, label, value, href, external, tint }) => (
        <a
          key={id}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          aria-label={`${label}: ${value}`}
          style={{ "--tint": tint } as CSSProperties}
          className={cn(
            "group relative flex flex-1 items-center gap-3.5 overflow-hidden px-5 py-4 transition-colors duration-300",
            dark ? "hover:bg-white/[0.06]" : "hover:bg-paper-2",
          )}
        >
          {/* Limelight: beam + downward cone in the contact's brand colour */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[3px] w-16 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            style={{
              background: tint,
              boxShadow: `0 6px 26px 1px ${tint}`,
            }}
          >
            <span
              className="absolute left-[-45%] top-[3px] h-16 w-[190%] [clip-path:polygon(10%_100%,30%_0,70%_0,90%_100%)]"
              style={{
                background: `linear-gradient(to bottom, color-mix(in srgb, ${tint} 32%, transparent), transparent)`,
              }}
            />
          </span>

          <span
            className={cn(
              "relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300",
              dark
                ? "bg-white/[0.06] text-white/70"
                : "bg-navy/[0.04] text-navy",
              "group-hover:bg-[var(--tint)] group-hover:text-white",
            )}
          >
            <Icon size={16} strokeWidth={1.9} />
          </span>
          <span className="relative flex min-w-0 flex-col">
            <span
              className={cn(
                "u-eyebrow text-[9px]",
                dark ? "text-white/40" : "text-graphite",
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "truncate text-sm font-medium transition-colors duration-300 group-hover:text-[var(--tint)]",
                dark ? "text-white/85" : "text-navy",
              )}
            >
              {value}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
