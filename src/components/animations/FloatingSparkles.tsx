import React, { useMemo } from 'react';
import { useReducedMotion } from 'motion/react';

interface FloatingSparklesProps {
  count?: number;
  className?: string;
  color?: string;
}

export const FloatingSparkles: React.FC<FloatingSparklesProps> = ({
  count = 8,
  className = '',
  color = '#BFD8BB',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const sparkles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${15 + Math.random() * 70}%`,
      size: 8 + Math.random() * 12,
      duration: 3.5 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
  }, [count]);

  if (shouldReduceMotion) return null;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute animate-float-sparkle"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 24" fill={color} className="w-full h-full opacity-60">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
