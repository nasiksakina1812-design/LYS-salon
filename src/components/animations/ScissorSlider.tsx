import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { ANIMATION_CONFIG } from './animationConfig';

interface ScissorSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const ScissorSlider: React.FC<ScissorSliderProps> = ({
  beforeImage = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format,compress&fit=crop&w=1200&q=80&fm=webp',
  afterImage = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format,compress&fit=crop&w=1200&q=80&fm=webp',
  beforeAlt = 'Before architectural styling',
  afterAlt = 'After bespoke restyling and gloss treatment',
  beforeLabel = 'ORIGINAL TEXTURE',
  afterLabel = 'BESPOKE SCULPTED FINISH',
  className = '',
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; y: number }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const nextRippleId = useRef(0);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(percentage);

      // Trigger trim ripple along the cut line
      const rippleY = (Math.sin(percentage * 0.1) * 0.3 + 0.5) * rect.height;
      setRipples((prev) => [
        ...prev.slice(-4),
        { id: nextRippleId.current++, y: rippleY },
      ]);
    },
    []
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  useEffect(() => {
    const onMouseUpGlobal = () => setIsDragging(false);
    window.addEventListener('mouseup', onMouseUpGlobal);
    window.addEventListener('touchend', onMouseUpGlobal);
    return () => {
      window.removeEventListener('mouseup', onMouseUpGlobal);
      window.removeEventListener('touchend', onMouseUpGlobal);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      className={`relative select-none overflow-hidden rounded-2xl border border-[#BFD8BB] bg-[#0A0C0A] shadow-[0_20px_50px_-20px_rgba(10,12,10,0.2)] cursor-ew-resize group ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* After Image (Full width background base) */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
        <img
          src={afterImage}
          alt={afterAlt}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* After Tag */}
        <div className="absolute bottom-5 right-5 z-10 px-3.5 py-1.5 rounded-full bg-[#0A0C0A]/85 backdrop-blur-md border border-[#BFD8BB]/40 text-white text-[10px] font-semibold tracking-[0.2em] uppercase shadow-md flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#BFD8BB]" />
          <span>{afterLabel}</span>
        </div>
      </div>

      {/* Before Image (Clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
        }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="w-full h-full object-cover filter contrast-[1.03] saturate-[0.9]"
          loading="lazy"
          decoding="async"
        />

        {/* Before Tag */}
        <div className="absolute bottom-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#0A0C0A]/20 text-[#0A0C0A] text-[10px] font-semibold tracking-[0.2em] uppercase shadow-md">
          <span>{beforeLabel}</span>
        </div>
      </div>

      {/* Divider Seam Line */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Glow Line */}
        <div className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-gradient-to-b from-[#E7F1E5] via-[#BFD8BB] to-[#6C8E68] shadow-[0_0_12px_rgba(191,216,187,0.8)]" />

        {/* Visual Trim Ripples along the cut line */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute -left-6 w-12 h-12 rounded-full border border-[#BFD8BB] pointer-events-none animate-ping opacity-60"
            style={{
              top: `${ripple.y}px`,
              animationDuration: '0.8s',
            }}
          />
        ))}

        {/* The Cutting Scissor Handle */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12 rounded-full bg-white border border-[#0A0C0A] shadow-[0_6px_20px_rgba(10,12,10,0.35)] flex items-center justify-center transition-transform ${
            isDragging ? 'scale-110 shadow-[0_8px_25px_rgba(191,216,187,0.6)]' : 'group-hover:scale-105'
          }`}
        >
          {/* Scissor Icon that cuts */}
          <svg
            className={`w-6 h-6 transition-transform ${
              isDragging ? 'rotate-12 scale-110' : '-rotate-6'
            }`}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="6" cy="6" r="3" stroke="#0A0C0A" strokeWidth="1.6" fill="#E7F1E5" />
            <circle cx="6" cy="18" r="3" stroke="#0A0C0A" strokeWidth="1.6" fill="#BFD8BB" />
            <path d="M8.5 7.5L20 18" stroke="#0A0C0A" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M8.5 16.5L20 6" stroke="#0A0C0A" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="12" r="1.5" fill="#0A0C0A" />
          </svg>
        </div>
      </div>

      {/* Interactive Helper Hint */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1 rounded-full bg-[#0A0C0A]/70 backdrop-blur-xs text-[10px] font-medium tracking-widest text-[#E7F1E5] uppercase pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        Drag scissors to reveal transformation
      </div>
    </div>
  );
};
