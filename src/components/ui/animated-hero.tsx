import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ParticleHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButton?: {
    text: string;
    onClick: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
  interactiveHint?: string;
  className?: string;
  particleCount?: number;
  children?: ReactNode;
}

export const ParticleHero: React.FC<ParticleHeroProps> = ({
  title = "WELCOME",
  subtitle = "Warren Lim Zhan Feng",
  description = "A sneak peek into my career, credentials & a little bit of life — click to step inside.",
  primaryButton,
  secondaryButton,
  interactiveHint = "Hover to Interact",
  className = "",
  particleCount = 12,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [staticCursor, setStaticCursor] = useState({ x: 0, y: 0 });
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isStaticAnimation, setIsStaticAnimation] = useState(false);
  const startTimeRef = useRef(Date.now());
  const lastMouseMoveRef = useRef(Date.now());

  const rows = particleCount;
  const totalParticles = rows * rows;

  // Initialize particles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    container.innerHTML = '';
    particlesRef.current = [];

    for (let i = 0; i < totalParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full will-change-transform';
      
      // Calculate grid position
      const row = Math.floor(i / rows);
      const col = i % rows;
      const centerRow = Math.floor(rows / 2);
      const centerCol = Math.floor(rows / 2);
      
      // Distance from center for stagger effects
      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      );
      
      // Staggered scale (larger in center)
      const scale = Math.max(0.1, 1.2 - distanceFromCenter * 0.12);
      
      // Staggered opacity (more opaque in center)
      const opacity = Math.max(0.05, 1 - distanceFromCenter * 0.1);
      
      // Color intensity based on distance (Gold / Neutral)
      const lightness = Math.max(30, 75 - distanceFromCenter * 6);
      
      // Glow intensity
      const glowSize = Math.max(0.5, 6 - distanceFromCenter * 0.5);
      
      // HSL 43 is yellowish/gold
      particle.style.cssText = `
        width: 0.4rem;
        height: 0.4rem;
        left: ${col * 1.8}rem;
        top: ${row * 1.8}rem;
        transform: scale(${scale});
        opacity: ${opacity};
        background: hsl(43, 85%, ${lightness}%);
        box-shadow: 0 0 ${glowSize * 0.2}rem 0 hsl(43, 85%, 60%);
        mix-blend-mode: screen;
        z-index: ${Math.round(totalParticles - distanceFromCenter * 5)};
        transition: transform 0.05s linear;
      `;
      
      container.appendChild(particle);
      particlesRef.current.push(particle);
    }
  }, [rows, totalParticles]);

  // Continuous animation
  useEffect(() => {
    const animate = () => {
      const currentTime = (Date.now() - startTimeRef.current) * 0.001;
      
      if (isAutoMode) {
        const x = Math.sin(currentTime * 0.3) * 200 + Math.sin(currentTime * 0.17) * 100;
        const y = Math.cos(currentTime * 0.2) * 150 + Math.cos(currentTime * 0.23) * 80;
        setCursor({ x, y });
      } else if (isStaticAnimation) {
        const timeSinceLastMove = Date.now() - lastMouseMoveRef.current;
        
        if (timeSinceLastMove > 200) {
          const animationStrength = Math.min((timeSinceLastMove - 200) / 1000, 1);
          const subtleX = Math.sin(currentTime * 1.5) * 20 * animationStrength;
          const subtleY = Math.cos(currentTime * 1.2) * 16 * animationStrength;
          
          setCursor({
            x: staticCursor.x + subtleX,
            y: staticCursor.y + subtleY
          });
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoMode, isStaticAnimation, staticCursor]);

  // Update particle positions
  useEffect(() => {
    particlesRef.current.forEach((particle, i) => {
      const row = Math.floor(i / rows);
      const col = i % rows;
      const centerRow = Math.floor(rows / 2);
      const centerCol = Math.floor(rows / 2);
      const distanceFromCenter = Math.sqrt(
        Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2)
      );
      
      const delay = distanceFromCenter * 8;
      const originalScale = Math.max(0.1, 1.2 - distanceFromCenter * 0.12);
      const dampening = Math.max(0.3, 1 - distanceFromCenter * 0.08);
      
      setTimeout(() => {
        const moveX = cursor.x * dampening;
        const moveY = cursor.y * dampening;
        
        particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${originalScale})`;
        particle.style.transition = `transform ${120 + distanceFromCenter * 20}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
      }, delay);
    });
  }, [cursor, rows]);

  // Mouse/touch movement handler
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const event = 'touches' in e ? e.touches[0] : e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const newCursor = {
      x: (event.clientX - centerX) * 0.8,
      y: (event.clientY - centerY) * 0.8
    };
    
    setCursor(newCursor);
    setStaticCursor(newCursor);
    setIsAutoMode(false);
    setIsStaticAnimation(false);
    lastMouseMoveRef.current = Date.now();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsStaticAnimation(true);
    }, 500);
    
    setTimeout(() => {
      if (Date.now() - lastMouseMoveRef.current >= 4000) {
        setIsAutoMode(true);
        setIsStaticAnimation(false);
        startTimeRef.current = Date.now();
      }
    }, 4000);
  };

  return (
    <section 
      className={`relative w-full min-h-screen bg-navy overflow-hidden ${className}`}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
    >
      {/* Particle Animation Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={containerRef}
          className="relative"
          style={{
            width: `${rows * 1.8}rem`,
            height: `${rows * 1.8}rem`
          }}
        />
      </div>
      
      {/* Hero Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {children ? (
          children
        ) : (
          <div className="text-center max-w-6xl mx-auto">
            {/* Main Title */}
            <div className="mb-12 md:mb-16">
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] mb-6 md:mb-8">
                <span className="bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-2xl">
                  {title}
                </span>
              </h1>
              
              {/* Subtitle */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-thin text-gold tracking-[0.2em] uppercase">
                  {subtitle}
                </h2>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
              </div>
            </div>
            
            {/* Description */}
            {description && (
              <div className="mb-16 md:mb-20">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>
            )}
            
            {/* Call to Action */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                {primaryButton && (
                  <button 
                    onClick={primaryButton.onClick}
                    className="group relative px-10 py-5 md:px-12 md:py-6 bg-transparent border border-gold/30 hover:border-gold text-gold hover:text-white font-medium text-base md:text-lg tracking-wider uppercase transition-all duration-500 overflow-hidden cursor-pointer rounded-sm"
                  >
                    <span className="relative z-10">{primaryButton.text}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </button>
                )}
                
                {secondaryButton && (
                  <button 
                    onClick={secondaryButton.onClick}
                    className="px-8 py-4 border-2 border-white/20 hover:border-gold text-white hover:text-gold font-semibold rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
                  >
                    {secondaryButton.text}
                  </button>
                )}
              </div>
              
              {/* Interactive hint */}
              {interactiveHint && (
                <div className="flex items-center justify-center gap-4 md:gap-6 text-gold/40 text-xs md:text-sm uppercase tracking-[0.3em]">
                  <div className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-gold/30"></div>
                  <span className="animate-pulse">{interactiveHint}</span>
                  <div className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-gold/30"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] bg-gradient-radial from-navy/3 to-transparent rounded-full"></div>
      </div>
    </section>
  );
};
