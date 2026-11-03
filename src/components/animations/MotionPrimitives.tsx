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
  const isInView = useInView(ref, { once: true, margin: '-50px' });

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
  const isInView = useInView(ref, { once: true, margin: '-60px' });

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
  shape = 'circle',
  delay = 0.15,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Predefined luxury curved mask paths
  const getClipPath = (isRevealed: boolean) => {
    if (shape === 'circle') {
      return isRevealed
        ? 'circle(150% at 50% 50%)'
        : 'circle(0% at 50% 50%)';
    }
    if (shape === 'arch') {
      return isRevealed
        ? 'inset(0% 0% 0% 0% round 180px 180px 24px 24px)'
        : 'inset(100% 0% 0% 0% round 180px 180px 24px 24px)';
    }
    // oval
    return isRevealed
      ? 'ellipse(140% 140% at 50% 50%)'
      : 'ellipse(0% 0% at 50% 50%)';
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{
        clipPath: getClipPath(false),
        opacity: 0.85,
        scale: 1.04,
      }}
      animate={
        isInView
          ? {
              clipPath: getClipPath(true),
              opacity: 1,
              scale: 1,
            }
          : {
              clipPath: getClipPath(false),
              opacity: 0.85,
              scale: 1.04,
            }
      }
      transition={{
        duration: 1.1,
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
  maxTilt = 6,
  glareOpacity = 0.12,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    setTilt({
      rotateX: -yPct * maxTilt,
      rotateY: xPct * maxTilt,
    });

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: glareOpacity,
    });
  };

  const handleMouseEnter = () => {
    if (isTouchDevice || shouldReduceMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
      {...props}
    >
      <div
        style={{
          transform: !shouldReduceMotion && !isTouchDevice
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${
                isHovered ? 1.015 : 1
              }, ${isHovered ? 1.015 : 1}, 1)`
            : undefined,
          transition: isHovered
            ? 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="w-full h-full relative"
      >
        {children}

        {/* Dynamic Specular Sheen Overlay */}
        {!isTouchDevice && !shouldReduceMotion && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-30"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.85) 0%, rgba(191, 216, 187, 0.25) 40%, transparent 70%)`,
            }}
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
  const isInView = useInView(ref, { once: true, margin: '-70px' });

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
