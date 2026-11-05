import React, { useEffect, useRef, useState } from 'react';
import { ANIMATION_CONFIG } from './animationConfig';

interface Strand {
  startX: number;
  startY: number;
  length: number;
  baseAngle: number; // in radians
  phase: number;
  speed: number;
  amplitude: number;
  color: string;
  width: number;
}

export const HeroHairStrands: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(media.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || prefersReduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    let isVisible = true;
    let time = 0;
    let cachedWidth = 0;
    let cachedHeight = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      cachedWidth = rect.width;
      cachedHeight = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cachedWidth * dpr;
      canvas.height = cachedHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    let mouseMoveTicking = false;
    const onMouseMove = (e: MouseEvent) => {
      if (!mouseMoveTicking) {
        requestAnimationFrame(() => {
          if (!container) return;
          const rect = container.getBoundingClientRect();
          mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
            active: true,
          };
          mouseMoveTicking = false;
        });
        mouseMoveTicking = true;
      }
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // Generate flowing hair strands distributed across the hero
    const strands: Strand[] = [];
    const strandCount = 12; // Streamlined from 18 to 12 for high frame stability
    const palette = [
      'rgba(191, 216, 187, 0.45)', // pastel sage
      'rgba(108, 142, 104, 0.35)', // mid sage
      'rgba(10, 12, 10, 0.12)',    // subtle dark strand
      'rgba(231, 241, 229, 0.65)', // pale mint
    ];

    for (let i = 0; i < strandCount; i++) {
      strands.push({
        startX: (cachedWidth * 0.45) + (i / strandCount) * (cachedWidth * 0.55) + (Math.random() - 0.5) * 80,
        startY: -20 + Math.random() * 80,
        length: cachedHeight * 0.75 + Math.random() * (cachedHeight * 0.35),
        baseAngle: Math.PI * 0.48 + (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.012,
        amplitude: 24 + Math.random() * 30,
        color: palette[i % palette.length],
        width: 1.0 + Math.random() * 1.4,
      });
    }

    const startAnimation = () => {
      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const render = () => {
      if (!isVisible) {
        stopAnimation();
        return;
      }

      time += 1;
      ctx.clearRect(0, 0, cachedWidth, cachedHeight);

      strands.forEach((strand) => {
        const segments = 18; // Reduced bezier segments for 60fps rendering
        const segmentLen = strand.length / segments;

        ctx.beginPath();
        let currentX = strand.startX;
        let currentY = strand.startY;
        ctx.moveTo(currentX, currentY);

        for (let s = 1; s <= segments; s++) {
          const progress = s / segments;
          // Harmonic wave formula mimicking natural hair flow
          const wave =
            Math.sin(time * strand.speed + strand.phase + progress * 3.5) *
            strand.amplitude *
            progress;
          const subWave =
            Math.cos(time * strand.speed * 0.6 + strand.phase * 1.5) *
            (strand.amplitude * 0.3) *
            progress;

          let targetX =
            strand.startX +
            Math.cos(strand.baseAngle) * (s * segmentLen) +
            wave +
            subWave;
          let targetY =
            strand.startY + Math.sin(strand.baseAngle) * (s * segmentLen);

          // Subtle mouse repulsion: hair strands bend away from cursor
          if (mouseRef.current.active) {
            const dx = targetX - mouseRef.current.x;
            const dy = targetY - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 140;

            if (dist < maxDist && dist > 0) {
              const force = ((maxDist - dist) / maxDist) * 36 * progress;
              targetX += (dx / dist) * force;
              targetY += (dy / dist) * (force * 0.4);
            }
          }

          // Smooth quadratic bezier through hair segment
          const midX = (currentX + targetX) / 2;
          const midY = (currentY + targetY) / 2;
          ctx.quadraticCurveTo(currentX, currentY, midX, midY);

          currentX = targetX;
          currentY = targetY;
        }

        ctx.strokeStyle = strand.color;
        ctx.lineWidth = strand.width;
        ctx.lineCap = 'round';
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    startAnimation();

    return () => {
      stopAnimation();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      observer.disconnect();
    };
  }, [prefersReduced]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Brand Color Gradient Mesh: High-performance smooth radial gradients without expensive blur filters */}
      <div className="absolute inset-0 opacity-70 pointer-events-none">
        <div
          className="absolute -top-[10%] -left-[10%] w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(191,216,187,0.45) 0%, rgba(231,241,229,0.2) 45%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-[20%] -right-[10%] w-[550px] h-[550px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(231,241,229,0.65) 0%, rgba(191,216,187,0.25) 45%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-[10%] left-[20%] w-[450px] h-[450px] rounded-full pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(246,249,245,0.85) 0%, rgba(191,216,187,0.2) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Silky Hair Strands Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
