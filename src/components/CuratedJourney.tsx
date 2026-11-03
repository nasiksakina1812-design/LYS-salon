import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SmartImage } from './SmartImage';
import {
  TextReveal,
  TiltCard,
  CurvedImageReveal,
  LUXURY_EASE,
} from './animations/MotionPrimitives';
import { FannedCardStack } from './animations/FannedCardStack';
import { MaskedHeadingReveal } from './animations/MaskedHeadingReveal';
import { ScissorSlider } from './animations/ScissorSlider';

interface CuratedJourneyProps {
  onSelectService: (serviceName: string) => void;
  onOpenSpaceViewer: () => void;
}

export const CuratedJourney: React.FC<CuratedJourneyProps> = ({
  onSelectService,
  onOpenSpaceViewer,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-24 lg:py-32 bg-[#F6F9F5]/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          <div className="lg:col-span-7">
            <span className="block text-[11px] font-semibold tracking-[0.22em] text-[#6B7269] uppercase mb-3">
              A CURATED JOURNEY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0A0C0A] text-balance">
              <MaskedHeadingReveal as="span" highlightWords={['transformation']}>
                Your moment. Your transformation.
              </MaskedHeadingReveal>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: LUXURY_EASE }}
              className="font-sans text-sm sm:text-base leading-relaxed text-[#6B7269]"
            >
              A dedicated sanctuary to unwind, refresh your aesthetic, and
              reconnect with the version of yourself you love most.
            </motion.p>
          </div>
        </div>

        {/* 3 Featured Cards with Fanned Deck Physics & Hover Dimming */}
        <FannedCardStack>
          {/* Card 1: Architectural Strand Sculpting */}
          <TiltCard
            maxTilt={5}
            className="group flex flex-col justify-between rounded-2xl bg-white border border-[#BFD8BB] overflow-hidden shadow-[0_12px_32px_-12px_rgba(10,12,10,0.06)] hover:shadow-[0_24px_48px_-15px_rgba(10,12,10,0.12)] hover:border-[#6C8E68] transition-all duration-300"
          >
            <div className="relative p-3 pb-0">
              <CurvedImageReveal shape="circle" delay={0.1}>
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#E7F1E5]">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format,compress&fit=crop&w=760&q=80&fm=webp"
                    srcSet="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format,compress&fit=crop&w=380&q=80&fm=webp 380w, https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format,compress&fit=crop&w=760&q=80&fm=webp 760w"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    alt="Architectural strand sculpting"
                    width={400}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    fallbackTitle="Couture Hair Sculpting"
                    fallbackSubtitle="Tailored facial framing and natural movement"
                  />
                  <div className="absolute bottom-3 left-3 z-10 px-3 py-1 rounded-full bg-[#0A0C0A] text-[9px] font-semibold tracking-[0.2em] text-white uppercase shadow-xs transition-transform duration-300 group-hover:scale-105">
                    COUTURE RITUAL
                  </div>
                </div>
              </CurvedImageReveal>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#0A0C0A] mb-3 group-hover:text-[#6C8E68] transition-colors duration-300">
                  Architectural Strand Sculpting
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6B7269] leading-relaxed mb-6">
                  Precision cutting and personalized movement tailoring informed by
                  your individual facial contours.
                </p>
              </div>

              <button
                onClick={() => onSelectService('Architectural Strand Sculpting')}
                className="pt-4 border-t border-[#BFD8BB]/50 flex items-center justify-between text-[11px] font-semibold tracking-[0.16em] text-[#0A0C0A] group-hover:text-[#6C8E68] transition-colors uppercase cursor-pointer"
              >
                <span>SESSION PROFILE: 60 - 90 MIN</span>
                <span className="w-7 h-7 rounded-full bg-[#F6F9F5] border border-[#BFD8BB]/60 flex items-center justify-center group-hover:bg-[#BFD8BB] group-hover:border-[#6C8E68] transition-all">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </button>
            </div>
          </TiltCard>

          {/* Card 2: Botanical Head Spa Infusion */}
          <TiltCard
            maxTilt={5}
            className="group flex flex-col justify-between rounded-2xl bg-white border border-[#BFD8BB] overflow-hidden shadow-[0_12px_32px_-12px_rgba(10,12,10,0.06)] hover:shadow-[0_24px_48px_-15px_rgba(10,12,10,0.12)] hover:border-[#6C8E68] transition-all duration-300"
          >
            <div className="relative p-3 pb-0">
              <CurvedImageReveal shape="circle" delay={0.2}>
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#E7F1E5]">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1608248597359-57e0e7a256a2?auto=format,compress&fit=crop&w=760&q=80&fm=webp"
                    srcSet="https://images.unsplash.com/photo-1608248597359-57e0e7a256a2?auto=format,compress&fit=crop&w=380&q=80&fm=webp 380w, https://images.unsplash.com/photo-1608248597359-57e0e7a256a2?auto=format,compress&fit=crop&w=760&q=80&fm=webp 760w"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    alt="Botanical head spa infusion preparation"
                    width={400}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    fallbackTitle="Botanical Herbal Oils"
                    fallbackSubtitle="Clean cold-pressed extracts for deep scalp therapy"
                  />
                  <div className="absolute bottom-3 left-3 z-10 px-3 py-1 rounded-full bg-[#0A0C0A] text-[9px] font-semibold tracking-[0.2em] text-white uppercase shadow-xs transition-transform duration-300 group-hover:scale-105">
                    HERBAL ELIXIR
                  </div>
                </div>
              </CurvedImageReveal>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#0A0C0A] mb-3 group-hover:text-[#6C8E68] transition-colors duration-300">
                  Botanical Head Spa Infusion
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6B7269] leading-relaxed mb-6">
                  Steam-activated organic oils, micro-circulation massage, and
                  deep scalp detoxification.
                </p>
              </div>

              <button
                onClick={() => onSelectService('Botanical Head Spa Infusion')}
                className="pt-4 border-t border-[#BFD8BB]/50 flex items-center justify-between text-[11px] font-semibold tracking-[0.16em] text-[#0A0C0A] group-hover:text-[#6C8E68] transition-colors uppercase cursor-pointer"
              >
                <span>SESSION PROFILE: 75 MIN</span>
                <span className="w-7 h-7 rounded-full bg-[#F6F9F5] border border-[#BFD8BB]/60 flex items-center justify-center group-hover:bg-[#BFD8BB] group-hover:border-[#6C8E68] transition-all">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </button>
            </div>
          </TiltCard>

          {/* Card 3: Designed for Stillness */}
          <TiltCard
            maxTilt={5}
            className="group flex flex-col justify-between rounded-2xl bg-white border border-[#BFD8BB] overflow-hidden shadow-[0_12px_32px_-12px_rgba(10,12,10,0.06)] hover:shadow-[0_24px_48px_-15px_rgba(10,12,10,0.12)] hover:border-[#6C8E68] transition-all duration-300 md:col-span-2 lg:col-span-1"
          >
            <div className="relative p-3 pb-0">
              <CurvedImageReveal shape="circle" delay={0.3}>
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#E7F1E5]">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format,compress&fit=crop&w=760&q=80&fm=webp"
                    srcSet="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format,compress&fit=crop&w=380&q=80&fm=webp 380w, https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format,compress&fit=crop&w=760&q=80&fm=webp 760w"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                    alt="Interior sanctuary architecture"
                    width={400}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    fallbackTitle="Architectural Stillness"
                    fallbackSubtitle="Fluted lime plaster and arched backlit mirrors"
                  />
                  <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-white/95 border border-[#BFD8BB] text-[9px] font-semibold tracking-[0.2em] text-[#0A0C0A] uppercase shadow-xs transition-transform duration-300 group-hover:scale-105">
                    THE SANCTUARY
                  </div>
                </div>
              </CurvedImageReveal>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#0A0C0A] mb-3 group-hover:text-[#6C8E68] transition-colors duration-300">
                  Designed for Stillness
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6B7269] leading-relaxed mb-6">
                  Fluted lime plaster, acoustic dampening, and warm architectural
                  lighting away from city noise.
                </p>
              </div>

              <button
                onClick={onOpenSpaceViewer}
                className="pt-4 border-t border-[#BFD8BB]/50 flex items-center justify-between text-[11px] font-semibold tracking-[0.16em] text-[#0A0C0A] group-hover:text-[#6C8E68] transition-colors uppercase cursor-pointer"
              >
                <span>VIEW ARCHITECTURE</span>
                <span className="w-7 h-7 rounded-full bg-[#F6F9F5] border border-[#BFD8BB]/60 flex items-center justify-center group-hover:bg-[#BFD8BB] group-hover:border-[#6C8E68] transition-all">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </button>
            </div>
          </TiltCard>
        </FannedCardStack>

        {/* Before / After Transformation Scissor Slider Showcase */}
        <div className="mt-20 pt-16 border-t border-[#BFD8BB]/60">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 mb-2 text-[10px] font-semibold tracking-[0.22em] text-[#6C8E68] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ART OF THE CUT · PRECISION TRANSFORMATION</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#0A0C0A] font-normal">
              Drag shears to reveal structural transformation.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#6B7269] mt-2">
              Witness how custom weight removal and tailored perimeter contouring
              revitalize sensitized, heavy strands into buoyant, weightless movement.
            </p>
          </div>

          <ScissorSlider
            beforeImage="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format,compress&fit=crop&w=1200&q=80&fm=webp"
            afterImage="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format,compress&fit=crop&w=1200&q=80&fm=webp"
            beforeLabel="UNTREATED / DENSE PERIMETER"
            afterLabel="SCULPTED / ARCHITECTURAL FINISH"
          />
        </div>
      </div>
    </section>
  );
};
