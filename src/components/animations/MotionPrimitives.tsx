import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useReducedMotion,
  useInView,
  HTMLMotionProps,
} from 'motion/react';

// Luxury easing curve: crisp attack, silky decelerating finish
export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Text reveal where words or lines slide up from behind an overflow:hidden mask
 */
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  as = 'div',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '100px 0px 50px 0px' });

  if (shouldReduceMotion) {
    const Component = as as any;
    return <Component className={className}>{children}</Component>;
  }

  const words = children.split(' ');
  const Component = as as any;

  return (
    <Component ref={ref} className={`${className} inline-flex flex-wrap gap-x-[0.28em]`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-0.5">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.035,
              ease: LUXURY_EASE,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};

/**
 * StaggerContainer for cascading section reveals
 */
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}> = ({ children, className = '', delay = 0, staggerDelay = 0.1 }) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '100px 0px 50px 0px' });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}> = ({ children, className = '', yOffset = 24 }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: LUXURY_EASE,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Curved or Circular Image Reveal mask
 * Unfolds an organic circle or arch mask when scrolling into view
 */
interface CurvedImageRevealProps {
  children: React.ReactNode;
  className?: string;
  shape?: 'circle' | 'arch' | 'oval';
  delay?: number;
}

export const CurvedImageReveal: React.FC<CurvedImageRevealProps> = ({
  children,
  className = '',
  delay = 0.1,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '150px 0px 100px 0px' });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{
        opacity: 0.85,
        scale: 1.025,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
            }
          : {
              opacity: 0.85,
              scale: 1.025,
            }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: LUXURY_EASE,
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Premium 3D Tilt Card with dynamic specular glare
 * Gracefully disables on touch screens for 60fps mobile scrolling
 */
interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 5,
  glareOpacity = 0.12,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const isTouchDeviceRef = useRef<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    isTouchDeviceRef.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  const handleMouseEnter = () => {
    if (isTouchDeviceRef.current || shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rectRef.current = {
      left: rect.left,
      top: rect.top,
      width: rect.width || 1,
      height: rect.height || 1,
    };
    if (innerRef.current) {
      innerRef.current.style.transition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDeviceRef.current || shouldReduceMotion || !rectRef.current) return;

    if (rafIdRef.current) return; // Drop redundant frames

    const clientX = e.clientX;
    const clientY = e.clientY;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      if (!rectRef.current || !innerRef.current) return;

      const { left, top, width, height } = rectRef.current;
      const x = clientX - left;
      const y = clientY - top;

      const xPct = Math.max(-1, Math.min(1, (x / width - 0.5) * 2));
      const yPct = Math.max(-1, Math.min(1, (y / height - 0.5) * 2));

      const rotX = -yPct * maxTilt;
      const rotY = xPct * maxTilt;

      innerRef.current.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.012, 1.012, 1)`;

      if (glareRef.current) {
        const gx = ((x / width) * 100).toFixed(1);
        const gy = ((y / height) * 100).toFixed(1);
        glareRef.current.style.opacity = `${glareOpacity}`;
        glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255, 255, 255, 0.7) 0%, rgba(191, 216, 187, 0.2) 40%, transparent 70%)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    rectRef.current = null;
    if (innerRef.current) {
      innerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      innerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
      {...props}
    >
      <div
        ref={innerRef}
        className="w-full h-full relative"
      >
        {children}

        {/* Specular Sheen Overlay */}
        {!shouldReduceMotion && (
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-30 opacity-0"
          />
        )}
      </div>
    </div>
  );
};

/**
 * Cinematic Section Reveal wrapper with subtle scale and clip-mask
 */
export const CinematicSectionReveal: React.FC<{
  children: React.ReactNode;
  id?: string;
  className?: string;
}> = ({ children, id, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '100px 0px 50px 0px' });

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 32, scale: 0.99 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 32, scale: 0.99 }
      }
      transition={{
        duration: 0.9,
        ease: LUXURY_EASE,
      }}
    >
      {children}
    </motion.section>
  );
};
