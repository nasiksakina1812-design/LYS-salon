import React from 'react';
import { ArrowRight, Star, ArrowDown, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SmartImage } from './SmartImage';
import { LUXURY_EASE } from './animations/MotionPrimitives';
import { HeroHairStrands } from './animations/HeroHairStrands';
import { MaskedHeadingReveal } from './animations/MaskedHeadingReveal';
import { MagneticButton } from './animations/MagneticButton';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden bg-white">
      {/* Hair-Strand Hero: Silky strands waving in breeze with mouse deflection and shifting brand gradient mesh */}
      <HeroHairStrands />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-6 z-10">
            {/* Location Tag */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: LUXURY_EASE }}
              className="inline-flex items-center gap-2 mb-6 text-[11px] font-semibold tracking-[0.22em] text-[#0A0C0A] uppercase"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#BFD8BB] border border-[#6C8E68] shadow-xs animate-pulse" />
              <span>YOUR SALON NAME · YOUR LOCATION</span>
            </motion.div>

            {/* Display Headline with Masked Character/Word Reveal & Variable-Font Hover Weight Shift */}
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-normal leading-[1.08] tracking-[-0.02em] text-[#0A0C0A] text-balance mb-6">
              <span className="block">
                <MaskedHeadingReveal as="span" delay={0.1} highlightWords={['Beauty']}>
                  Beauty that
                </MaskedHeadingReveal>
              </span>
              <span className="block mt-1">
                <MaskedHeadingReveal
                  as="span"
                  delay={0.25}
                  italicWords={['feels', 'like', 'you']}
                  highlightWords={['feels', 'like', 'you']}
                >
                  feels like you.
                </MaskedHeadingReveal>
              </span>
            </h1>

            {/* Editorial Body Copy */}
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: LUXURY_EASE }}
              className="font-sans text-base sm:text-lg leading-relaxed text-[#6B7269] max-w-xl mb-9 font-normal"
            >
              Step into a world of thoughtful beauty rituals, personal expression,
              and moments made entirely for you. Filtered through an
              architectural, restorative lens.
            </motion.p>

            {/* Interactive Magnetic CTAs */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.48, ease: LUXURY_EASE }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <MagneticButton
                onClick={onOpenBooking}
                className="px-7 py-3.5 rounded-full bg-[#0A0C0A] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:text-[#0A0C0A] transition-colors active:scale-[0.98] border border-[#0A0C0A] shadow-md group"
              >
                <span>BOOK YOUR VISIT</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </MagneticButton>

              <MagneticButton
                onClick={() => {
                  const el = document.getElementById('experience');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                fillColor="#E7F1E5"
                className="px-7 py-3.5 rounded-full border border-[#0A0C0A]/20 bg-white text-[#0A0C0A] text-xs font-semibold tracking-[0.14em] uppercase hover:border-[#BFD8BB] transition-all duration-300"
              >
                <span>EXPLORE THE EXPERIENCE</span>
              </MagneticButton>
            </motion.div>

            {/* Trust Proof & Scroll Cue */}
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: LUXURY_EASE }}
              className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#BFD8BB]/50 text-xs text-[#6B7269]"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex items-center text-[#0A0C0A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#0A0C0A]" />
                  ))}
                </div>
                <span className="font-bold text-[#0A0C0A] tabular-nums">5.0 / 5</span>
                <span className="text-[#BFD8BB]">·</span>
                <span className="tracking-wide text-[#0A0C0A]">SAMPLE RATING · 500+ REVIEWS</span>
              </div>

              <a
                href="#philosophy"
                className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] text-[#6B7269] hover:text-[#0A0C0A] transition-colors uppercase group"
              >
                <span>SCROLL TO DISCOVER</span>
                <ArrowDown className="w-3 h-3 text-[#6C8E68] transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Architectural Arched Portrait with Cinematic Mask & Subtle Float */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[430px]">
              {/* Arched Frame Container with Cinematic entrance reveal */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? {}
                    : {
                        opacity: 0,
                        clipPath: 'inset(12% 0% 0% 0% round 180px 180px 24px 24px)',
                        scale: 0.97,
                      }
                }
                animate={{
                  opacity: 1,
                  clipPath: 'inset(0% 0% 0% 0% round 180px 180px 24px 24px)',
                  scale: 1,
                }}
                transition={{ duration: 1.2, delay: 0.2, ease: LUXURY_EASE }}
                className="relative rounded-t-[180px] rounded-b-3xl overflow-hidden shadow-[0_24px_50px_-12px_rgba(10,12,10,0.12)] border border-[#BFD8BB] bg-white group"
              >
                {/* Architectural Portrait with hover zoom */}
                <div className="w-full h-full overflow-hidden">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format,compress&fit=crop&w=860&q=80&fm=webp"
                    srcSet="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format,compress&fit=crop&w=430&q=80&fm=webp 430w, https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format,compress&fit=crop&w=860&q=80&fm=webp 860w"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 430px"
                    alt="Radiant client portrait at Your Salon Name"
                    width={430}
                    height={580}
                    priority={true}
                    className="w-full h-[520px] sm:h-[580px] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    fallbackTitle="Bespoke Radiance"
                    fallbackSubtitle="Architectural beauty rituals tailored to your facial contours"
                  />
                </div>

                {/* Floating Atelier Badge (Top Right) */}
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: -15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.65, ease: LUXURY_EASE }}
                  className="absolute top-5 right-5 z-10 glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#BFD8BB]"
                >
                  <MapPin className="w-3 h-3 text-[#6C8E68]" />
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-[#0A0C0A] uppercase">
                    ATELIER · YOUR LOCATION
                  </span>
                </motion.div>

                {/* Bottom Signature Care Card */}
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 25, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.75, ease: LUXURY_EASE }}
                  className="absolute bottom-4 left-4 right-4 z-10 glass-panel p-4 rounded-2xl flex items-center justify-between gap-3 shadow-lg border border-[#BFD8BB]/70 transition-transform duration-300 hover:scale-[1.02]"
                >
                  <div>
                    <span className="block text-[9px] font-semibold tracking-[0.2em] text-[#6B7269] uppercase">
                      SIGNATURE CARE
                    </span>
                    <h3 className="font-serif text-base font-medium text-[#0A0C0A]">
                      Bespoke Radiance
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#E7F1E5] border border-[#BFD8BB] text-[10px] font-semibold tracking-wider text-[#0A0C0A] uppercase">
                    PRIVATE RITUAL
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
