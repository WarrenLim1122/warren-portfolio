import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'motion/react';

interface ParticleHeroProps {
  primaryButton?: { text: string; onClick: () => void };
  className?: string;
  children?: ReactNode;
}

export const ParticleHero: React.FC<ParticleHeroProps> = ({ primaryButton, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [staticCursor, setStaticCursor] = useState({ x: 0, y: 0 });
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isStaticAnimation, setIsStaticAnimation] = useState(false);
  const startTimeRef = useRef(Date.now());
  const lastMouseMoveRef = useRef(Date.now());

  const COLS = 20;
  const ROWS = 13;
  const totalParticles = COLS * ROWS;

  // Build particle grid
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.innerHTML = '';
    particlesRef.current = [];

    for (let i = 0; i < totalParticles; i++) {
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      const centerRow = Math.floor(ROWS / 2);
      const centerCol = Math.floor(COLS / 2);
      const distFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      );

      const scale = Math.max(0.08, 1.1 - distFromCenter * 0.09);
      const opacity = Math.max(0.03, 0.55 - distFromCenter * 0.07);
      // Gold hue: hsl(38, 65%, lightness%)
      const lightness = Math.max(20, 68 - distFromCenter * 5);
      const glowSize = Math.max(0.5, 5 - distFromCenter * 0.4);

      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 0.38rem;
        height: 0.38rem;
        border-radius: 9999px;
        will-change: transform;
        left: ${col * 2.1}rem;
        top: ${row * 2.1}rem;
        transform: scale(${scale});
        opacity: ${opacity};
        background: hsl(38, 65%, ${lightness}%);
        box-shadow: 0 0 ${glowSize * 0.25}rem 0 hsl(38, 65%, 58%);
        mix-blend-mode: screen;
        z-index: ${Math.round(totalParticles - distFromCenter * 5)};
        transition: transform 0.05s linear;
      `;
      container.appendChild(particle);
      particlesRef.current.push(particle);
    }
  }, [totalParticles]);

  // Drive cursor position: auto-mode or static-hover animation
  useEffect(() => {
    const animate = () => {
      const currentTime = (Date.now() - startTimeRef.current) * 0.001;

      if (isAutoMode) {
        const x = Math.sin(currentTime * 0.3) * 180 + Math.sin(currentTime * 0.17) * 90;
        const y = Math.cos(currentTime * 0.2) * 130 + Math.cos(currentTime * 0.23) * 70;
        setCursor({ x, y });
      } else if (isStaticAnimation) {
        const timeSinceLastMove = Date.now() - lastMouseMoveRef.current;
        if (timeSinceLastMove > 200) {
          const strength = Math.min((timeSinceLastMove - 200) / 1000, 1);
          const subtleX = Math.sin(currentTime * 1.5) * 18 * strength;
          const subtleY = Math.cos(currentTime * 1.2) * 14 * strength;
          setCursor({ x: staticCursor.x + subtleX, y: staticCursor.y + subtleY });
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [isAutoMode, isStaticAnimation, staticCursor]);

  // Apply translate to each particle based on cursor
  useEffect(() => {
    particlesRef.current.forEach((particle: HTMLDivElement, i: number) => {
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      const centerRow = Math.floor(ROWS / 2);
      const centerCol = Math.floor(COLS / 2);
      const distFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      );

      const delay = distFromCenter * 7;
      const originalScale = Math.max(0.08, 1.1 - distFromCenter * 0.09);
      const dampening = Math.max(0.25, 1 - distFromCenter * 0.07);

      setTimeout(() => {
        const moveX = cursor.x * dampening;
        const moveY = cursor.y * dampening;
        particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${originalScale})`;
        particle.style.transition = `transform ${110 + distFromCenter * 18}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      }, delay);
    });
  }, [cursor]);

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const event = 'touches' in e ? e.touches[0] : e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const newCursor = {
      x: (event.clientX - centerX) * 0.75,
      y: (event.clientY - centerY) * 0.75,
    };

    setCursor(newCursor);
    setStaticCursor(newCursor);
    setIsAutoMode(false);
    setIsStaticAnimation(false);
    lastMouseMoveRef.current = Date.now();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsStaticAnimation(true), 500);

    setTimeout(() => {
      if (Date.now() - lastMouseMoveRef.current >= 4000) {
        setIsAutoMode(true);
        setIsStaticAnimation(false);
        startTimeRef.current = Date.now();
      }
    }, 4000);
  };

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      className={`relative w-full min-h-screen bg-[#0a1628] overflow-hidden flex items-center justify-center ${className}`}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
    >
      {/* DOM particle grid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={containerRef}
          className="relative"
          style={{
            width: `${COLS * 2.1}rem`,
            height: `${ROWS * 2.1}rem`,
          }}
        />
      </div>

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_30%,#0a1628_100%)] pointer-events-none" />

      {/* Thin horizontal accent lines */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
        className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none"
      />
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 1 }}
        className="absolute bottom-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto select-none">

        {/* Eyebrow label */}
        <motion.div {...stagger(0)} className="mb-8 flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-gold/40" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold/60">Portfolio · 2026</span>
          <div className="w-12 h-px bg-gold/40" />
        </motion.div>

        {/* Name */}
        <motion.h1 {...stagger(1)} className="font-black leading-[0.88] tracking-tighter mb-2">
          <span className="block text-[13vw] sm:text-[11vw] md:text-[9.5vw] bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
            Warren
          </span>
          <span className="block text-[8vw] sm:text-[6.5vw] md:text-[5.5vw] font-thin italic text-gold tracking-[0.08em]" style={{ fontFamily: 'Georgia, serif' }}>
            Lim Zhan Feng
          </span>
        </motion.h1>

        {/* Role tags */}
        <motion.div {...stagger(2)} className="mt-8 mb-10 flex flex-wrap items-center justify-center gap-2">
          {["Banking & Finance · NTU", "FMVA® Certified", "Singapore"].map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-medium px-3 py-1 border border-white/10 rounded-full">
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p {...stagger(3)} className="text-white/50 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed mb-14">
          A sneak peek into my career, credentials &amp; a little bit of life —<br className="hidden sm:block" /> click to step inside.
        </motion.p>

        {/* CTA */}
        {primaryButton && (
          <motion.div {...stagger(4)}>
            <button
              onClick={primaryButton.onClick}
              className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full border border-gold/30 hover:border-gold text-white/70 hover:text-white text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <span className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500 rounded-full" />
              <span className="relative">Enter</span>
              <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        )}

        {/* Scroll hint */}
        <motion.div {...stagger(5)} className="mt-12 flex items-center justify-center gap-3 text-white/20 text-[10px] uppercase tracking-[0.4em]">
          <div className="w-8 h-px bg-white/10" />
          <span>Move to interact</span>
          <div className="w-8 h-px bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
};
