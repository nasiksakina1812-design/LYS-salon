import React, { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion, useInView } from 'motion/react';
import { ANIMATION_CONFIG } from './animationConfig';

interface MirrorImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  enableTilt?: boolean;
  aspectRatio?: string;
}

export const MirrorImageReveal: React.FC<MirrorImageRevealProps> = ({
  children,
  className = '',
  delay = 0.1,
  enableTilt = true,
  aspectRatio,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseEnter = () => {
    if (isTouchDevice || shouldReduceMotion || !enableTilt || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    rectRef.current = {
      left: rect.left,
      top: rect.top,
      width: rect.width || 1,
      height: rect.height || 1,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !enableTilt || !rectRef.current) return;

    if (rafIdRef.current) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      if (!rectRef.current) return;

      const { left, top, width, height } = rectRef.current;
      const x = clientX - left;
      const y = clientY - top;

      const xPct = (x / width - 0.5) * 2;
      const yPct = (y / height - 0.5) * 2;

      setTilt({
        rotateX: -yPct * ANIMATION_CONFIG.timing.cardTiltMax,
        rotateY: xPct * ANIMATION_CONFIG.timing.cardTiltMax,
      });

      setGlarePos({
        x: (x / width) * 100,
        y: (y / height) * 100,
        opacity: 0.16,
      });
    });
  };

  const handleMouseLeave = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    rectRef.current = null;
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  if (shouldReduceMotion) {
    return (
      <div className={`relative ${className}`} style={{ aspectRatio }}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        aspectRatio,
      }}
    >
      {/* 3D Parallax Tilt Anchor */}
      <div
        className="w-full h-full relative"
        style={{
          transform: !isTouchDevice
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
            : undefined,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Mirror Wipe Mask: Vertical salon mirror reveal */}
        <motion.div
          className="w-full h-full relative overflow-hidden"
          initial={{
            clipPath: 'inset(100% 0% 0% 0%)',
            scale: 1.04,
            opacity: 0.8,
          }}
          animate={
            isInView
              ? {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  scale: 1,
                  opacity: 1,
                }
              : {
                  clipPath: 'inset(100% 0% 0% 0%)',
                  scale: 1.04,
                  opacity: 0.8,
                }
          }
          transition={{
            duration: ANIMATION_CONFIG.timing.mirrorRevealDuration,
            delay,
            ease: ANIMATION_CONFIG.easing.luxury,
          }}
        >
          {children}

          {/* Sweeping Mirror Glare once on reveal */}
          <motion.div
            className="absolute -inset-full pointer-events-none z-20"
            style={{
              background:
                'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.75) 50%, rgba(191,216,187,0.3) 55%, transparent 70%)',
            }}
            initial={{ transform: 'translateX(-100%) translateY(-100%)' }}
            animate={
              isInView
                ? { transform: 'translateX(100%) translateY(100%)' }
                : { transform: 'translateX(-100%) translateY(-100%)' }
            }
            transition={{
              duration: ANIMATION_CONFIG.timing.mirrorGlareDuration,
              delay: delay + 0.3,
              ease: 'easeInOut',
            }}
          />

          {/* Dynamic Specular Sheen following cursor */}
          {!isTouchDevice && (
            <div
              className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
              style={{
                opacity: glarePos.opacity,
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.7) 0%, rgba(191, 216, 187, 0.2) 35%, transparent 65%)`,
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};
