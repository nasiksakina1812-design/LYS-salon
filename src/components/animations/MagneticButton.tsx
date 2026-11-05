import React, { useRef, useState, useEffect } from 'react';
import { ANIMATION_CONFIG } from './animationConfig';

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticRadius?: number;
  magneticPull?: number;
  fillColor?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  magneticRadius = ANIMATION_CONFIG.timing.magneticRadius,
  magneticPull = ANIMATION_CONFIG.timing.magneticStrength,
  fillColor = '#BFD8BB',
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillLayerRef = useRef<HTMLSpanElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isTouchRef = useRef<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    isTouchRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchRef.current || !buttonRef.current) return;
    setIsHovered(true);

    const rect = buttonRef.current.getBoundingClientRect();
    rectRef.current = {
      left: rect.left,
      top: rect.top,
      width: rect.width || 1,
      height: rect.height || 1,
    };

    if (fillLayerRef.current) {
      const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
      const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
      fillLayerRef.current.style.left = `${x}%`;
      fillLayerRef.current.style.top = `${y}%`;
      fillLayerRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }

    buttonRef.current.style.transition = 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouchRef.current || !rectRef.current || !buttonRef.current) return;

    if (rafIdRef.current) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      if (!rectRef.current || !buttonRef.current) return;

      const { left, top, width, height } = rectRef.current;
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < magneticRadius) {
        const mx = (dx * magneticPull).toFixed(2);
        const my = (dy * magneticPull).toFixed(2);
        buttonRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setIsHovered(false);
    rectRef.current = null;
    if (buttonRef.current) {
      buttonRef.current.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      buttonRef.current.style.transform = 'translate3d(0px, 0px, 0)';
    }
    if (fillLayerRef.current) {
      fillLayerRef.current.style.transform = 'translate(-50%, -50%) scale(0)';
    }
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      {...props}
    >
      {/* Directional Liquid Fill Layer */}
      <span
        ref={fillLayerRef}
        className="absolute w-[220%] h-[220%] rounded-full pointer-events-none transition-transform duration-500 ease-out z-0 scale-0"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) scale(0)',
          backgroundColor: fillColor,
        }}
      />

      {/* Sweeping Specular Shimmer Highlight */}
      <span
        className={`absolute inset-0 pointer-events-none z-10 transition-transform duration-700 ease-out ${
          isHovered ? 'translate-x-full' : '-translate-x-full'
        }`}
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)',
        }}
      />

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300">
        {children}
      </span>
    </button>
  );
};
