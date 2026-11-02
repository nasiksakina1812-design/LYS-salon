import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Waves, Sparkles, Wind } from 'lucide-react';

export const SensoryInterlude: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayPromptRef = useRef<HTMLDivElement | null>(null);
  const [activeMode, setActiveMode] = useState<'flow' | 'ripples' | 'mist'>('flow');

  // Stable mode change handler
  const handleModeChange = useCallback((mode: 'flow' | 'ripples' | 'mist') => {
    setActiveMode(mode);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number = 0;
    let isVisible = false;
    let isTabActive = !document.hidden;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cap DPR to 2 to prevent excessive memory/CPU strain on high-DPI mobile screens
    const getDpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = getDpr();
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    resizeCanvas();

    // Particle / wave simulation state
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      life: number;
    }> = [];

    const mouse = { x: -1000, y: -1000, active: false };
    let step = 0;
    let hidePromptTimeout: number | undefined;

    const render = () => {
      // If not in viewport or tab hidden, pause execution to conserve 100% CPU/battery
      if (!isVisible || !isTabActive) {
        return;
      }

      step += 0.015;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      // Soft fading clear for organic silk trailing
      ctx.fillStyle = 'rgba(255, 255, 255, 0.24)';
      ctx.fillRect(0, 0, w, h);

      // Render calming organic fluid waves in pastel green
      const wavesCount = 4;
      for (let i = 0; i < wavesCount; i++) {
        ctx.beginPath();
        const baseAmp = 18 + i * 10;
        const freq = 0.003 + i * 0.0012;
        const speed = step * (0.8 + i * 0.4);

        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 18) {
          // Dynamic mouse influence
          const distToMouse = Math.hypot(x - mouse.x, h * 0.5 - mouse.y);
          const mouseDisp = Math.max(0, 1 - distToMouse / 220) * 32;

          const y =
            h * 0.45 +
            i * 28 +
            Math.sin(x * freq + speed) * baseAmp +
            Math.cos(x * freq * 1.5 - speed * 0.7) * (baseAmp * 0.5) -
            mouseDisp;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        // Pastel green & soft mint fluid palette
        const gradients = [
          'rgba(191, 216, 187, 0.38)',
          'rgba(231, 241, 229, 0.55)',
          'rgba(142, 178, 138, 0.25)',
          'rgba(10, 12, 10, 0.06)',
        ];
        ctx.fillStyle = gradients[i % gradients.length];
        ctx.fill();
      }

      // Spawn interactive fluid droplets (throttled)
      if (mouse.active || Math.random() < 0.2) {
        if (particles.length < 35) {
          const px = mouse.active ? mouse.x + (Math.random() - 0.5) * 36 : Math.random() * w;
          const py = mouse.active ? mouse.y + (Math.random() - 0.5) * 36 : h * 0.4 + (Math.random() - 0.5) * 70;

          particles.push({
            x: px,
            y: py,
            vx: (Math.random() - 0.5) * 1.4,
            vy: -Math.random() * 1.4 - 0.4,
            radius: Math.random() * 3.5 + 1.5,
            alpha: 0.55,
            life: 1,
          });
        }
      }

      // Update and draw fluid particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.014;
        p.alpha = p.life * 0.5;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10, 12, 10, ${p.alpha * 0.7})`;
        ctx.fill();
      }

      // Loop only if reduced motion is false
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const startAnimation = () => {
      cancelAnimationFrame(animationFrameId);
      render();
    };

    const stopAnimation = () => {
      cancelAnimationFrame(animationFrameId);
    };

    // IntersectionObserver to completely halt CPU animation when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    // Pause animation when user switches tabs or window minimizes
    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && isVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    // Window resize (passive, debounced)
    let resizeTimer: number;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resizeCanvas, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // High performance pointer tracking without React state re-renders
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      mouse.active = true;

      // Update overlay prompt visibility via direct DOM style to prevent 60fps React re-renders
      if (overlayPromptRef.current) {
        overlayPromptRef.current.style.opacity = '0';
        window.clearTimeout(hidePromptTimeout);
        hidePromptTimeout = window.setTimeout(() => {
          if (overlayPromptRef.current && !mouse.active) {
            overlayPromptRef.current.style.opacity = '0.4';
          }
        }, 3000);
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
      if (overlayPromptRef.current) {
        overlayPromptRef.current.style.opacity = '0.4';
      }
    };

    canvas.addEventListener('mousemove', handlePointerMove, { passive: true });
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
    canvas.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    canvas.addEventListener('touchend', handlePointerLeave, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      stopAnimation();
      window.clearTimeout(hidePromptTimeout);
      window.clearTimeout(resizeTimer);

      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('mouseleave', handlePointerLeave);
      canvas.removeEventListener('touchend', handlePointerLeave);
    };
  }, [activeMode]);

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-white text-center overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {/* Eyebrow */}
        <p className="text-[11px] font-semibold tracking-[0.25em] text-[#6B7269] uppercase mb-4">
          SENSORY INTERLUDE
        </p>

        {/* Display Headline */}
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#0A0C0A] mb-2">
          TAKE A BREATH.
        </h2>
        <div className="font-serif text-3xl sm:text-4xl lg:text-5xl italic font-normal text-[#6C8E68] mb-12">
          make it yours.
        </div>

        {/* Interactive Responsive Touch Canvas Container */}
        <div className="relative rounded-3xl overflow-hidden border border-[#BFD8BB] bg-[#F6F9F5] shadow-[0_20px_50px_-20px_rgba(10,12,10,0.08)]">
          <canvas
            ref={canvasRef}
            className="w-full h-[320px] sm:h-[400px] cursor-grab active:cursor-grabbing block touch-pan-y"
          />

          {/* Center Floating Label Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 glass-panel px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xs pointer-events-none border border-[#BFD8BB]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0A0C0A]" />
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#0A0C0A] uppercase">
              3D FLUID DYNAMICS · RESPONSIVE TOUCH
            </span>
          </div>

          {/* Interactive Mode Pills Bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 glass-panel p-1.5 rounded-full shadow-md border border-[#BFD8BB]">
            <button
              onClick={() => handleModeChange('flow')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider transition-all cursor-pointer ${
                activeMode === 'flow'
                  ? 'bg-[#0A0C0A] text-white shadow-xs'
                  : 'text-[#6B7269] hover:text-[#0A0C0A]'
              }`}
            >
              <Waves className="w-3 h-3" />
              <span>GENTLE FLOW</span>
            </button>
            <button
              onClick={() => handleModeChange('ripples')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider transition-all cursor-pointer ${
                activeMode === 'ripples'
                  ? 'bg-[#0A0C0A] text-white shadow-xs'
                  : 'text-[#6B7269] hover:text-[#0A0C0A]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>AROMA RIPPLES</span>
            </button>
            <button
              onClick={() => handleModeChange('mist')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider transition-all cursor-pointer ${
                activeMode === 'mist'
                  ? 'bg-[#0A0C0A] text-white shadow-xs'
                  : 'text-[#6B7269] hover:text-[#0A0C0A]'
              }`}
            >
              <Wind className="w-3 h-3" />
              <span>HERBAL MIST</span>
            </button>
          </div>

          {/* Touch Prompt Overlay with direct ref transition */}
          <div
            ref={overlayPromptRef}
            className="absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-500 opacity-40"
          >
            <span className="font-sans text-xs tracking-widest text-[#0A0C0A] uppercase bg-white/80 px-4 py-1.5 rounded-full border border-[#BFD8BB]">
              Move cursor or touch to ripple
            </span>
          </div>
        </div>

        {/* Sensory Manifesto Caption */}
        <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#6B7269] max-w-xl mx-auto mt-8 font-normal">
          Immerse yourself in intentional tranquility. At LYS, every curve, light
          beam, and aromatic top note is curated for your inner calm.
        </p>
      </div>
    </section>
  );
};
