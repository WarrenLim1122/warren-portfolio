import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { motion } from 'motion/react';

interface ParticleHeroProps {
  primaryButton?: { text: string; onClick: () => void };
  className?: string;
  children?: ReactNode;
}

export const ParticleHero: React.FC<ParticleHeroProps> = ({ primaryButton, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLS = 18, ROWS = 12;
    type Particle = { x: number; y: number; baseX: number; baseY: number; size: number; alpha: number; speed: number };
    const particles: Particle[] = [];

    const init = () => {
      particles.length = 0;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = (c / (COLS - 1)) * canvas.width;
          const y = (r / (ROWS - 1)) * canvas.height;
          particles.push({
            x, y, baseX: x, baseY: y,
            size: Math.random() * 1.8 + 0.4,
            alpha: Math.random() * 0.4 + 0.05,
            speed: Math.random() * 0.3 + 0.1,
          });
        }
      }
    };
    init();

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.006;

      particles.forEach((p, i) => {
        const wave = Math.sin(t + i * 0.18) * 12 + Math.cos(t * 0.7 + i * 0.09) * 8;
        const dx = mouseRef.current.x - p.baseX;
        const dy = mouseRef.current.y - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repel = Math.max(0, 1 - dist / 220);
        const targetX = p.baseX - dx * repel * 0.25 + Math.sin(t * 0.5 + i * 0.3) * wave * 0.3;
        const targetY = p.baseY - dy * repel * 0.25 + Math.cos(t * 0.4 + i * 0.25) * wave * 0.3;

        p.x += (targetX - p.x) * p.speed;
        p.y += (targetY - p.y) * p.speed;

        const proximity = Math.max(0, 1 - dist / 180);
        const finalAlpha = p.alpha + proximity * 0.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + proximity * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 150, 77, ${finalAlpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onMove = (e: MouseEvent | TouchEvent) => {
      const ev = 'touches' in e ? e.touches[0] : e;
      mouseRef.current = { x: ev.clientX, y: ev.clientY };
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove as any);

    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove as any);
    };
  }, []);

  const stagger = (i: number) => ({ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] } });

  return (
    <section className={`relative w-full min-h-screen bg-[#0a1628] overflow-hidden flex items-center justify-center ${className}`}>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

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
          <span>Hover to interact</span>
          <div className="w-8 h-px bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
};
