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
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [fillOrigin, setFillOrigin] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < magneticRadius) {
      setOffset({
        x: dx * magneticPull,
        y: dy * magneticPull,
      });
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch || !buttonRef.current) return;
    setIsHovered(true);

    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setFillOrigin({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: !isTouch
          ? `translate3d(${offset.x}px, ${offset.y}px, 0)`
          : undefined,
        transition: isHovered
          ? 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      {...props}
    >
      {/* Directional Liquid Fill Layer */}
      <span
        className="absolute w-[220%] h-[220%] rounded-full pointer-events-none transition-transform duration-500 ease-out z-0"
        style={{
          left: `${fillOrigin.x}%`,
          top: `${fillOrigin.y}%`,
          transform: isHovered
            ? 'translate(-50%, -50%) scale(1)'
            : 'translate(-50%, -50%) scale(0)',
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
