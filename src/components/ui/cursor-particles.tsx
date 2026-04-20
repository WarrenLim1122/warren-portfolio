import { useEffect, useRef } from 'react';

export const CursorParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const COLS = 22, ROWS = 14;
    type Particle = { x: number; y: number; baseX: number; baseY: number; size: number; alpha: number; speed: number };
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = (c / (COLS - 1)) * canvas.width;
          const y = (r / (ROWS - 1)) * canvas.height;
          particles.push({
            x, y, baseX: x, baseY: y,
            size: Math.random() * 1.4 + 0.4,
            alpha: Math.random() * 0.07 + 0.02,
            speed: Math.random() * 0.22 + 0.07,
          });
        }
      }
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.005;

      particles.forEach((p, i) => {
        const wave = Math.sin(t + i * 0.18) * 10 + Math.cos(t * 0.7 + i * 0.09) * 6;
        const dx = mouseRef.current.x - p.baseX;
        const dy = mouseRef.current.y - p.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repel = Math.max(0, 1 - dist / 200);
        const targetX = p.baseX - dx * repel * 0.28 + Math.sin(t * 0.5 + i * 0.3) * wave * 0.3;
        const targetY = p.baseY - dy * repel * 0.28 + Math.cos(t * 0.4 + i * 0.25) * wave * 0.3;

        p.x += (targetX - p.x) * p.speed;
        p.y += (targetY - p.y) * p.speed;

        const proximity = Math.max(0, 1 - dist / 170);
        const finalAlpha = p.alpha + proximity * 0.3;
        const finalSize = p.size + proximity * 2.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, finalSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 48, 87, ${finalAlpha})`;
        ctx.fill();

        // Soft glow near cursor
        if (proximity > 0.05) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, finalSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196, 150, 77, ${proximity * 0.06})`;
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onMove = (e: MouseEvent | TouchEvent) => {
      const ev = 'touches' in e ? e.touches[0] : e;
      mouseRef.current = { x: ev.clientX, y: ev.clientY };
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove as EventListener);

    return () => {
      cancelAnimationFrame(rafRef.current!);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove as EventListener);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ mixBlendMode: 'multiply' }}
      className="fixed inset-0 w-full h-full pointer-events-none z-[2]"
    />
  );
};
