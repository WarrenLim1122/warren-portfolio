/**
 * ContactConnect — the contact "placeholder" panel (hero + footer).
 *
 * Adapted from a reference SocialConnect snippet into this project's
 * stack (no styled-jsx / Next): a glowing 3D container holding circular
 * icon buttons, each showing only the icon + the contact's name (no raw
 * address / handle). The glow is white (tone-aware so it still reads on
 * the light footer). The hover treatment is the project's own limelight
 * (a brand-tinted beam + downward cone), NOT the reference's shake — and
 * the icons are the existing glyphs (Mail / LinkedIn / WhatsApp) plus a
 * new GitHub contact. Same component is rendered in the dark hero
 * (tone="dark") and the light footer (tone="light").
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
    tint: "#E5484D",
  },
  {
    id: "linkedin",
    Icon: LinkedinIcon,
    label: "LinkedIn",
    href: PERSONAL_INFO.linkedinUrl,
    external: true,
    tint: "#0A66C2",
  },
  {
    id: "github",
    Icon: GithubIcon,
    label: "GitHub",
    href: PERSONAL_INFO.github,
    external: true,
    // GitHub's mark is monochrome — tone-aware so the limelight reads on
    // both the dark hero and the light footer.
    tint: "#FFFFFF",
    tintLight: "#0F2C4A",
  },
  {
    id: "whatsapp",
    Icon: WhatsappIcon,
    label: "WhatsApp",
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
        "relative overflow-hidden rounded-3xl border p-8 backdrop-blur-2xl transition-all duration-500 sm:p-10",
        dark
          ? "border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.015]"
          : "border-line bg-gradient-to-br from-white to-paper-2",
        className,
      )}
      style={{
        boxShadow: dark
          ? "0 0 46px rgba(255,255,255,0.10), 0 0 96px rgba(255,255,255,0.05)"
          : "0 30px 70px -36px rgba(15,48,87,0.30)",
      }}
    >
      <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-8 sm:gap-x-14">
        {ITEMS.map((it) => {
          const tint =
            !dark && "tintLight" in it ? it.tintLight : it.tint;
          const { id, Icon, label, href, external } = it;
          return (
            <a
              key={id}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              aria-label={label}
              style={{ "--tint": tint } as CSSProperties}
              className="group relative flex flex-col items-center outline-none"
            >
              {/* Limelight: brand-tinted beam + downward cone (the
                  project's lamp effect), on hover / keyboard focus */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-1 left-1/2 h-[3px] w-14 -translate-x-1/2 rounded-full bg-[var(--tint)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ boxShadow: "0 6px 26px 1px var(--tint)" }}
              >
                <span
                  className="absolute left-[-45%] top-[3px] h-[72px] w-[190%] [clip-path:polygon(12%_100%,30%_0,70%_0,88%_100%)]"
                  style={{
                    background:
                      "linear-gradient(to bottom, color-mix(in srgb, var(--tint) 34%, transparent), transparent)",
                  }}
                />
              </span>

              {/* Icon disc */}
              <span
                className={cn(
                  "relative flex h-[72px] w-[72px] items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-2.5 group-hover:text-[var(--tint)]",
                  dark
                    ? "border-white/10 bg-white/[0.05] text-white/75 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
                    : "border-line bg-navy/[0.03] text-navy shadow-[0_8px_28px_rgba(15,48,87,0.10)]",
                )}
              >
                <Icon size={26} strokeWidth={1.9} />
              </span>

              {/* Name only — no raw address / handle */}
              <span
                className={cn(
                  "mt-3.5 text-sm font-medium opacity-70 transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-100 group-hover:text-[var(--tint)]",
                  dark ? "text-white" : "text-navy",
                )}
              >
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
