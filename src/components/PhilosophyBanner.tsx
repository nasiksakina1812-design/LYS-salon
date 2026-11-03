import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  TextReveal,
  StaggerContainer,
  StaggerItem,
  CinematicSectionReveal,
  LUXURY_EASE,
} from './animations/MotionPrimitives';

export const PhilosophyBanner: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const pillars = [
    { label: 'CONSULTATION', value: '1-on-1 Atelier' },
    { label: 'FORMULATIONS', value: 'Clean Botanicals' },
    { label: 'SETTING', value: 'Acoustic Serenity' },
    { label: 'REPUTATION', value: '4.9 Star Sanctuary' },
  ];

  return (
    <CinematicSectionReveal
      id="philosophy"
      className="relative bg-[#0A0C0A] text-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Soft pastel green atmospheric aura with subtle breathing animation */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.15, 1],
                opacity: [0.15, 0.25, 0.15],
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#BFD8BB]/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                scale: [1, 1.12, 1],
                opacity: [0.1, 0.2, 0.1],
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#BFD8BB]/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-8 text-center z-10">
        {/* Eyebrow */}
        <p className="text-[11px] font-semibold tracking-[0.25em] text-[#BFD8BB] uppercase mb-4">
          THE PHILOSOPHY · LYS
        </p>

        {/* Display Headline with Staggered Word Reveals */}
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-2">
          <TextReveal as="span">MORE THAN A LOOK.</TextReveal>
        </h2>
        <div className="font-serif text-3xl sm:text-4xl lg:text-5xl italic font-normal text-[#BFD8BB] mb-8">
          <TextReveal as="span" delay={0.2}>
            love your soul.
          </TextReveal>
        </div>

        {/* Body Text */}
        <motion.p
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: LUXURY_EASE }}
          className="font-sans text-sm sm:text-base lg:text-lg leading-relaxed text-[#E7F1E5] max-w-2xl mx-auto mb-16 font-light"
        >
          Beauty is deeply personal. It is the quiet confidence you carry, the
          sacred care you bestow upon yourself, and the sensory rituals that
          return you to your natural balance.
        </motion.p>

        {/* 4 Pillars Strip with Staggered Entrance & Tactile Hover */}
        <StaggerContainer
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
          staggerDelay={0.08}
        >
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.label}>
              <div className="group p-5 rounded-xl bg-[#141714] border border-[#BFD8BB]/30 backdrop-blur-xs flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-[#BFD8BB] hover:bg-[#1A1F1A] hover:scale-[1.02] cursor-default shadow-xs">
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] text-[#BFD8BB] uppercase mb-1.5 transition-colors group-hover:text-white">
                  {pillar.label}
                </span>
                <span className="font-sans text-sm sm:text-base font-medium text-white tracking-tight">
                  {pillar.value}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </CinematicSectionReveal>
  );
};
