import { useEffect, useRef, useState } from 'react';
import { cosmicEvents } from '../../utils/cosmicEventBus';
import type { CosmicEventType } from '../../utils/cosmicEventBus';
import { useSettings } from '../../context/SettingsContext';

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { settings } = useSettings();
  const [activeEvent, setActiveEvent] = useState<CosmicEventType | null>(null);
  const activeEventRef = useRef<CosmicEventType | null>(null);
  const settingsRef = useRef(settings);

  useEffect(() => {
    activeEventRef.current = activeEvent;
  }, [activeEvent]);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    return cosmicEvents.subscribe((type) => {
      setActiveEvent(type);
      if (type === 'star') {
        setTimeout(() => {
          setActiveEvent(null);
        }, 15000);
      }
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let stars: any[] = [];
    let meteors: any[] = [];
    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let dpr = 1;

    const resize = () => {
      // Handle high-DPI scaling safely
      dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
      width = window.innerWidth;
      height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(1, 1); // We'll handle scaling manually in coordinates for easier mouse math
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initStars();
    };

    const initStars = () => {
      stars = [];
      const area = width * height;
      
      // Significantly more stars for a rich space feel
      const numTiny = Math.min(Math.floor(area / 1500), 1200);
      const numMedium = Math.min(Math.floor(area / 8000), 300);
      const numBright = Math.min(Math.floor(area / 30000), 50);

      // Create cluster points to make distribution feel natural/irregular
      const clusters = Array.from({ length: 5 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.max(width, height) * (0.2 + Math.random() * 0.3)
      }));

      const getPosition = (isClustered: boolean) => {
        if (!isClustered || Math.random() > 0.6) {
          // Uniform random
          return { x: Math.random() * width, y: Math.random() * height };
        }
        // Clustered
        const cluster = clusters[Math.floor(Math.random() * clusters.length)];
        const angle = Math.random() * Math.PI * 2;
        // Distribute within cluster radius, weighted towards center
        const r = cluster.radius * Math.pow(Math.random(), 1.5);
        return {
          x: cluster.x + Math.cos(angle) * r,
          y: cluster.y + Math.sin(angle) * r
        };
      };

      const createStar = (sizeRange: [number, number], glow: boolean, twinkleSpeedRange: [number, number], canTwinkle: boolean, clustered: boolean) => {
        const pos = getPosition(clustered);
        // Cool whites, pale lavenders
        const hues = [240, 260, 280]; // Blue to purple spectrum
        const hue = hues[Math.floor(Math.random() * hues.length)];
        const sat = 20 + Math.random() * 30; // 20-50%
        
        return {
          x: pos.x,
          y: pos.y,
          size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
          glow,
          color: `hsl(${hue}, ${sat}%, 95%)`, // Almost white, faint tint
          opacityBase: 0.1 + Math.random() * (canTwinkle ? 0.4 : 0.6),
          canTwinkle,
          twinkleSpeed: twinkleSpeedRange[0] + Math.random() * (twinkleSpeedRange[1] - twinkleSpeedRange[0]),
          twinkleOffset: Math.random() * Math.PI * 2
        };
      };

      // 1. MANY tiny stars (1px, dim, heavily clustered)
      for (let i = 0; i < numTiny; i++) {
        stars.push(createStar([0.3, 0.7], false, [0.0005, 0.001], Math.random() > 0.5, true));
      }
      
      // 2. SOME medium stars (1.5-2px, subtle glow, mildly clustered)
      for (let i = 0; i < numMedium; i++) {
        stars.push(createStar([0.8, 1.2], true, [0.001, 0.003], Math.random() > 0.3, true));
      }
      
      // 3. VERY FEW accent stars (2-3px, noticeable glow, scattered)
      for (let i = 0; i < numBright; i++) {
        stars.push(createStar([1.5, 2.2], true, [0.002, 0.005], true, false));
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now();
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      for (const star of stars) {
        const isStarEvent = activeEventRef.current === 'star';
        let baseOpacity = star.opacityBase;
        let speed = star.twinkleSpeed;
        
        if (isStarEvent) {
          baseOpacity = Math.min(1, baseOpacity * 2.5); // Brighter
          speed *= 3; // Twinkle faster
        }

        let opacity = baseOpacity;
        
        if (!prefersReducedMotion && star.canTwinkle && settingsRef.current.starTwinkling) {
          // Slow, independent sine wave twinkle
          opacity = baseOpacity + Math.sin(time * speed + star.twinkleOffset) * (isStarEvent ? 0.6 : 0.4);
        }
        
        opacity = Math.max(0.05, Math.min(1, opacity));

        if (star.glow) {
          ctx.beginPath();
          ctx.arc(star.x * dpr, star.y * dpr, star.size * 4 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = star.color.replace('95%)', '95%, ' + (opacity * 0.15) + ')');
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x * dpr, star.y * dpr, star.size * dpr, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace('95%)', '95%, ' + opacity + ')');
        ctx.fill();
      }

      // Draw interactive constellation lines
      if (mouseX > 0 && mouseY > 0 && settingsRef.current.constellation) {
        const interactionRadius = 150 * dpr;
        const mx = mouseX * dpr;
        const my = mouseY * dpr;
        
        ctx.lineWidth = 0.8;
        
        for (const star of stars) {
          if (!star.glow) continue; // Only connect medium/bright stars
          
          const sx = star.x * dpr;
          const sy = star.y * dpr;
          const dx = mx - sx;
          const dy = my - sy;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < interactionRadius) {
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(sx, sy);
            const opacity = 0.4 * (1 - distance / interactionRadius);
            ctx.strokeStyle = `rgba(180, 190, 255, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      const isStarEvent = activeEventRef.current === 'star';

      // Handle Meteors
      if (isStarEvent && Math.random() < 0.05) {
        meteors.push({
          x: Math.random() * width,
          y: -50,
          length: 40 + Math.random() * 80,
          speed: 15 + Math.random() * 20,
          opacity: 1,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1) // Diagonal down-right
        });
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.015;

        if (m.opacity <= 0) {
          meteors.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - Math.cos(m.angle) * m.length, m.y - Math.sin(m.angle) * m.length);
        
        // Gradient for meteor tail
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - Math.cos(m.angle) * m.length, m.y - Math.sin(m.angle) * m.length);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`);
        grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };
    
    const handleMouseOut = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseout', handleMouseOut);
    
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    // Base is near-black/black-blue space: #030308
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#030308] overflow-hidden">
      
      {/* 
        CSS Nebula Layers
        Extremely soft, restricted to corners/edges so 90% is black space.
        Uses muted purple, dark violet, deep indigo.
      */}
      <div 
        className={`absolute inset-0 mix-blend-screen transition-opacity duration-[3000ms] ${activeEvent === 'star' ? 'opacity-100' : 'opacity-60'}`}
        style={{
          background: `
            radial-gradient(circle at -10% 110%, rgba(30, 15, 60, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 110% -10%, rgba(20, 25, 70, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 90% 90%, rgba(40, 10, 50, 0.08) 0%, transparent 35%)
          `
        }}
      />
      
      {/* Canvas Stars */}
      <canvas ref={canvasRef} className="block absolute inset-0 w-full h-full" />
      
      {/* Subtle Constellation Overlay - Dots slightly brighter, lines still faint */}
      {settings.constellation && (
        <svg className={`absolute top-[15%] left-[65%] w-48 h-48 transition-all duration-[3000ms] ${activeEvent === 'star' ? 'opacity-80 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]' : 'opacity-40'}`} viewBox="0 0 100 100">
          <polyline points="20,80 40,50 70,60 85,30" fill="none" stroke="#c5c3e5" strokeWidth="0.5" strokeDasharray="1, 3" className={`transition-all duration-[3000ms] ${activeEvent === 'star' ? 'opacity-80' : 'opacity-40'}`} />
          <circle cx="20" cy="80" r="1.5" fill="#ffffff" className={`transition-all duration-[3000ms] ${activeEvent === 'star' ? 'drop-shadow-[0_0_4px_rgba(255,255,255,1)]' : ''}`} />
          <circle cx="40" cy="50" r="2" fill="#ffffff" className={`transition-all duration-[3000ms] ${activeEvent === 'star' ? 'drop-shadow-[0_0_4px_rgba(255,255,255,1)]' : ''}`} />
          <circle cx="70" cy="60" r="1.5" fill="#ffffff" className={`transition-all duration-[3000ms] ${activeEvent === 'star' ? 'drop-shadow-[0_0_4px_rgba(255,255,255,1)]' : ''}`} />
          <circle cx="85" cy="30" r="2.5" fill="#ffffff" className={`transition-all duration-[3000ms] ${activeEvent === 'star' ? 'drop-shadow-[0_0_4px_rgba(255,255,255,1)]' : ''}`} />
        </svg>
      )}
    </div>
  );
}
