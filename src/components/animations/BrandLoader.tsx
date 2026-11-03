import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ANIMATION_CONFIG } from './animationConfig';

interface BrandLoaderProps {
  onComplete?: () => void;
}

export const BrandLoader: React.FC<BrandLoaderProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // If reduced motion is requested or already shown in this tab, finish quickly
    if (shouldReduceMotion) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setIsDone(true);
      onComplete?.();
    }, ANIMATION_CONFIG.timing.loaderDuration * 1000);

    return () => clearTimeout(timer);
  }, [shouldReduceMotion, onComplete]);

  const handleSkip = () => {
    setIsDone(true);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="brand-loader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: {
              duration: ANIMATION_CONFIG.timing.loaderExitDuration,
              ease: ANIMATION_CONFIG.easing.luxury,
            },
          }}
          className="fixed inset-0 z-[10000] bg-[#0A0C0A] text-white flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Subtle ambient pastel glow in background */}
          <div className="absolute w-[450px] h-[450px] rounded-full bg-[#BFD8BB]/10 blur-[100px] pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 z-20 px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-mono tracking-widest text-white/60 hover:text-white hover:border-white/50 transition-colors uppercase cursor-pointer"
          >
            Skip Intro
          </button>

          {/* Centerpiece Container */}
          <div className="relative w-full max-w-md px-6 text-center">
            {/* Top Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#BFD8BB] mb-4"
            >
              URBAN SANCTUARY · YOUR LOCATION
            </motion.div>

            {/* Brand Title Masked Reveal */}
            <div className="overflow-hidden py-1 mb-2">
              <motion.h1
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.7,
                  ease: ANIMATION_CONFIG.easing.luxury,
                }}
                className="font-serif text-4xl sm:text-5xl font-normal tracking-wider text-white"
              >
                YOUR SALON NAME
              </motion.h1>
            </div>

            {/* Baseline Line with Comb Sweeping across */}
            <div className="relative w-full h-8 flex items-center justify-center my-3">
              {/* Thin Baseline drawing from center */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.25,
                  ease: ANIMATION_CONFIG.easing.luxury,
                }}
                className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#BFD8BB] to-transparent origin-center"
              />

              {/* Minimalist Salon Comb SVG sweeping across the line */}
              <motion.div
                initial={{ x: '-180px', opacity: 0 }}
                animate={{ x: '180px', opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 1.4,
                  delay: 0.4,
                  ease: 'easeInOut',
                }}
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <svg
                  className="w-10 h-6 text-[#BFD8BB]"
                  viewBox="0 0 40 24"
                  fill="none"
                >
                  {/* Comb Spine */}
                  <rect x="2" y="3" width="36" height="3" rx="1.5" fill="#BFD8BB" />
                  {/* Comb Teeth */}
                  {[4, 8, 12, 16, 20, 24, 28, 32, 36].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="6"
                      x2={x}
                      y2="18"
                      stroke="#BFD8BB"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  ))}
                </svg>
              </motion.div>
            </div>

            {/* Sub-headline Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="text-xs font-sans tracking-[0.2em] text-[#E7F1E5]/70 uppercase font-light"
            >
              Architectural Hair & Sensory Stillness
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
