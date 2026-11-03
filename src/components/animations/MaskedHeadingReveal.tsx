import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useInView } from 'motion/react';
import { ANIMATION_CONFIG } from './animationConfig';

interface MaskedHeadingRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  className?: string;
  delay?: number;
  highlightWords?: string[];
  italicWords?: string[];
}

export const MaskedHeadingReveal: React.FC<MaskedHeadingRevealProps> = ({
  children,
  as = 'h2',
  className = '',
  delay = 0,
  highlightWords = [],
  italicWords = [],
}) => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const [hoveredWordIndex, setHoveredWordIndex] = useState<number | null>(null);

  const words = children.split(' ');
  const Component = as as any;

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      ref={containerRef}
      className={`${className} inline-flex flex-wrap gap-x-[0.26em] leading-[1.12]`}
    >
      {words.map((word, wordIndex) => {
        const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord
        );
        const isItalic = italicWords.some(
          (iw) => iw.toLowerCase() === cleanWord
        );
        const isHovered = hoveredWordIndex === wordIndex;

        return (
          <span
            key={wordIndex}
            className="inline-block overflow-hidden py-1"
            onMouseEnter={() => setHoveredWordIndex(wordIndex)}
            onMouseLeave={() => setHoveredWordIndex(null)}
          >
            <motion.span
              className={`inline-block transition-all duration-300 cursor-default select-none ${
                isHighlighted ? 'text-[#6C8E68]' : ''
              } ${isItalic ? 'italic' : ''}`}
              style={{
                fontWeight: isHovered ? 700 : undefined,
                letterSpacing: isHovered ? '0.02em' : undefined,
              }}
              initial={{
                y: '120%',
                opacity: 0,
                rotate: wordIndex % 2 === 0 ? 3.5 : -3.5,
              }}
              animate={
                isInView
                  ? { y: '0%', opacity: 1, rotate: 0 }
                  : {
                      y: '120%',
                      opacity: 0,
                      rotate: wordIndex % 2 === 0 ? 3.5 : -3.5,
                    }
              }
              transition={{
                duration: ANIMATION_CONFIG.timing.textWordDuration,
                delay:
                  delay + wordIndex * ANIMATION_CONFIG.timing.textWordStagger,
                ease: ANIMATION_CONFIG.easing.luxury,
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
};
