import React, { useRef } from 'react';
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
  const isInView = useInView(containerRef, { once: true, margin: '120px 0px 50px 0px' });

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

        return (
          <span
            key={wordIndex}
            className="inline-block overflow-hidden py-1 group/word"
          >
            <motion.span
              className={`inline-block transition-transform duration-300 cursor-default select-none group-hover/word:text-[#6C8E68] ${
                isHighlighted ? 'text-[#6C8E68]' : ''
              } ${isItalic ? 'italic' : ''}`}
              initial={{
                y: '110%',
                opacity: 0,
              }}
              animate={
                isInView
                  ? { y: '0%', opacity: 1 }
                  : {
                      y: '110%',
                      opacity: 0,
                    }
              }
              transition={{
                duration: ANIMATION_CONFIG.timing.textWordDuration,
                delay:
                  delay + Math.min(wordIndex * 0.025, 0.3),
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
