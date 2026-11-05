import React, { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ANIMATION_CONFIG } from './animationConfig';

interface FannedCardStackProps {
  children: React.ReactNode[];
  className?: string;
}

export const FannedCardStack: React.FC<FannedCardStackProps> = ({
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Fan rotation angles for 3 or more cards
  const getFanRotation = (index: number, total: number) => {
    if (total === 1) return 0;
    if (total === 3) {
      if (index === 0) return -4.5;
      if (index === 1) return 0;
      if (index === 2) return 4.5;
    }
    const step = 8 / (total - 1);
    return -4 + index * step;
  };

  const getFanTranslateY = (index: number, total: number) => {
    if (total === 3) {
      if (index === 1) return -6;
      return 6;
    }
    return 0;
  };

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch group/deck ${className}`}
    >
      {React.Children.map(children, (child, index) => {
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;
        const isOther = isAnyHovered && !isHovered;
        const fanRotation = getFanRotation(index, React.Children.count(children));
        const fanY = getFanTranslateY(index, React.Children.count(children));

        if (shouldReduceMotion) {
          return <div className="h-full">{child}</div>;
        }

        return (
          <motion.div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{
              opacity: 0,
              y: 40,
              rotate: 0,
            }}
            animate={
              isInView
                ? {
                    opacity: isOther ? 0.6 : 1,
                    y: isHovered ? -12 : fanY,
                    rotate: isHovered ? 0 : fanRotation,
                    scale: isHovered ? 1.025 : 1,
                  }
                : {
                    opacity: 0,
                    y: 40,
                    rotate: 0,
                  }
            }
            transition={{
              duration: ANIMATION_CONFIG.timing.cardFanDuration,
              delay: index * 0.12,
              ease: ANIMATION_CONFIG.easing.luxury,
            }}
            className="h-full relative transition-shadow duration-300 z-10 hover:z-30"
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};
