/**
 * ContactConnect — a slim, theme-aware contact row (email · LinkedIn · phone).
 *
 * Refined from the original heavy glass card into an inline strip that
 * works on both the dark hero and the light footer. Each item is a real
 * link with an accessible label.
 */

import { Mail, Linkedin, Phone } from "lucide-react";
import { PERSONAL_INFO } from "../../constants";
import { cn } from "../../lib/utils";

type Tone = "light" | "dark";

const ITEMS = [
  {
    id: "email",
    Icon: Mail,
    label: "Email",
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    external: false,
  },
  {
    id: "linkedin",
    Icon: Linkedin,
    label: "LinkedIn",
    value: "in/warrenlimzf",
    href: PERSONAL_INFO.linkedinUrl,
    external: true,
  },
  {
    id: "phone",
    Icon: Phone,
    label: "Phone",
    value: PERSONAL_INFO.phone,
    href: `tel:${PERSONAL_INFO.phone.replace(/\s+/g, "")}`,
    external: false,
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
      {ITEMS.map(({ id, Icon, label, value, href, external }) => (
        <a
          key={id}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          aria-label={`${label}: ${value}`}
          className={cn(
            "group flex flex-1 items-center gap-3.5 px-5 py-4 transition-colors duration-300",
            dark ? "hover:bg-white/[0.06]" : "hover:bg-paper-2",
          )}
        >
          <span
            className={cn(
              "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300",
              dark
                ? "bg-white/[0.06] text-white/70 group-hover:bg-gold group-hover:text-surface"
                : "bg-navy/[0.04] text-navy group-hover:bg-navy group-hover:text-paper",
            )}
          >
            <Icon size={16} strokeWidth={1.9} />
          </span>
          <span className="flex min-w-0 flex-col">
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
                "truncate text-sm font-medium",
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
