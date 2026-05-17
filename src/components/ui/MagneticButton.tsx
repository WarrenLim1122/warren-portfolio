/**
 * MagneticButton — primary call-to-action with a pointer-magnetic pull.
 *
 * The cursor "attracts" the button within a small radius, then it springs
 * back. This is a controlled, premium micro-interaction (not a gimmick):
 * disabled entirely under reduced motion or coarse pointers (touch), where
 * it degrades to a normal, fully-functional button/link.
 */

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode, type MouseEvent, type Ref } from "react";
import { cn } from "../../lib/utils";
import { SPRING_MAGNETIC } from "../../lib/animations";

type Variant = "primary" | "ghost" | "ghost-dark";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  download?: string | boolean;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-navy text-paper hover:bg-navy-700 px-8 py-4 rounded-full shadow-[0_18px_40px_-16px_rgba(15,48,87,0.5)]",
  ghost:
    "border border-line text-navy hover:border-navy hover:bg-navy/[0.03] px-8 py-4 rounded-full",
  "ghost-dark":
    "border border-white/20 text-paper hover:border-gold-bright hover:text-gold-bright px-8 py-4 rounded-full",
};

export function MagneticButton({
  children,
  href,
  download,
  onClick,
  variant = "primary",
  className,
  ariaLabel,
  target,
  rel,
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING_MAGNETIC);
  const sy = useSpring(y, SPRING_MAGNETIC);

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.32);
    y.set(relY * 0.34);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn("u-cta select-none", VARIANTS[variant], className);
  const style = { x: sx, y: sy };

  if (href) {
    return (
      <motion.a
        ref={ref as unknown as Ref<HTMLAnchorElement>}
        href={href}
        download={download}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={classes}
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={reset}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as unknown as Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.button>
  );
}
