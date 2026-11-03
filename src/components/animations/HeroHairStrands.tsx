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

    let animId: number;
    let isVisible = true;
    let time = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Generate 16 flowing hair strands distributed across the hero
    const rect = container.getBoundingClientRect();
    const strands: Strand[] = [];
    const strandCount = 18;
    const palette = [
      'rgba(191, 216, 187, 0.45)', // pastel sage
      'rgba(108, 142, 104, 0.35)', // mid sage
      'rgba(10, 12, 10, 0.12)',    // subtle dark strand
      'rgba(231, 241, 229, 0.65)', // pale mint
      'rgba(216, 235, 214, 0.50)',
    ];

    for (let i = 0; i < strandCount; i++) {
      strands.push({
        startX: (rect.width * 0.45) + (i / strandCount) * (rect.width * 0.55) + (Math.random() - 0.5) * 80,
        startY: -20 + Math.random() * 80,
        length: rect.height * 0.75 + Math.random() * (rect.height * 0.35),
        baseAngle: Math.PI * 0.48 + (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: 0.015 + Math.random() * 0.012,
        amplitude: 24 + Math.random() * 30,
        color: palette[i % palette.length],
        width: 1.0 + Math.random() * 1.4,
      });
    }

    const render = () => {
      if (isVisible) {
        time += 1;
        const rect = container.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);

        strands.forEach((strand) => {
          const segments = 24;
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
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
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
      {/* Brand Color Gradient Mesh Shifting softly */}
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div
          className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[100px] animate-pulse"
          style={{
            background:
              'radial-gradient(circle, rgba(191,216,187,0.45) 0%, rgba(231,241,229,0.2) 60%, transparent 80%)',
            animationDuration: '14s',
          }}
        />
        <div
          className="absolute top-[25%] -right-[15%] w-[650px] h-[650px] rounded-full blur-[110px]"
          style={{
            background:
              'radial-gradient(circle, rgba(231,241,229,0.7) 0%, rgba(191,216,187,0.3) 50%, transparent 75%)',
            animation: 'floatSlow 18s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute -bottom-[15%] left-[20%] w-[500px] h-[500px] rounded-full blur-[90px]"
          style={{
            background:
              'radial-gradient(circle, rgba(246,249,245,0.9) 0%, rgba(191,216,187,0.25) 55%, transparent 75%)',
          }}
        />
      </div>

      {/* Silky Hair Strands Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
