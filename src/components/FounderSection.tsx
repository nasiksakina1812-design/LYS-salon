import React from 'react';
import { Sparkles, Award, Scissors, Leaf, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SmartImage } from './SmartImage';
import { TextReveal, TiltCard, LUXURY_EASE } from './animations/MotionPrimitives';
import { MaskedHeadingReveal } from './animations/MaskedHeadingReveal';

interface FounderSectionProps {
  onOpenBooking: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onOpenBooking }) => {
  const shouldReduceMotion = useReducedMotion();

  const milestones = [
    {
      icon: Award,
      title: 'Haute Coiffure Mastery',
      desc: '15+ years leading editorial styling teams across Paris, London, and New York fashion runways.',
    },
    {
      icon: Scissors,
      title: 'Architectural Dry-Cutting',
      desc: 'Pioneered custom dry weight sculpting that honors natural strand movement and effortless growth.',
    },
    {
      icon: Leaf,
      title: 'Clean Botanical Alchemy',
      desc: 'Curated 100% low-tox, biodynamic scalp infusions and ammonia-free restorative color formulations.',
    },
  ];

  return (
    <section id="founder" className="py-24 lg:py-32 bg-white relative overflow-hidden border-y border-[#BFD8BB]/50">
      {/* Ambient background glow: Optimized radial gradient without GPU blur-3xl pass */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(231,241,229,0.55) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F9F5] border border-[#BFD8BB] text-[10px] font-semibold tracking-[0.22em] text-[#6C8E68] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE ATELIER VISIONARY · FOUNDER & MASTER DIRECTOR</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0A0C0A] text-balance">
            <MaskedHeadingReveal as="span" highlightWords={['Artistry', 'Stillness']}>
              Artistry rooted in intention and stillness.
            </MaskedHeadingReveal>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6B7269] mt-4 leading-relaxed max-w-2xl mx-auto">
            Meet the creative force behind our sanctuary—dedicated to pairing couture precision
            with restorative botanical wellness.
          </p>
        </div>

        {/* Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Founder Editorial Portrait & Accents */}
          <div className="lg:col-span-5">
            <TiltCard maxTilt={4} className="relative group">
              <div className="relative rounded-3xl overflow-hidden border border-[#BFD8BB] bg-[#F6F9F5] p-3 shadow-[0_20px_50px_-20px_rgba(10,12,10,0.12)]">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#E7F1E5]">
                  <SmartImage
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format,compress&fit=crop&w=900&q=80&fm=webp"
                    srcSet="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format,compress&fit=crop&w=450&q=80&fm=webp 450w, https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format,compress&fit=crop&w=900&q=80&fm=webp 900w"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                    alt="Salon Founder and Creative Director in the atelier"
                    width={480}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    fallbackTitle="Founder & Creative Director"
                    fallbackSubtitle="Master Stylist & Botanical Aesthetician"
                  />

                  {/* Corner Luxury Badge */}
                  <div className="absolute top-4 left-4 z-10 glass-panel px-3.5 py-1.5 rounded-full border border-[#BFD8BB] shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6C8E68]" />
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[#0A0C0A] uppercase">
                      FOUNDER & CREATIVE DIRECTOR
                    </span>
                  </div>

                  {/* Bottom Accents Bar */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 glass-panel p-3.5 rounded-2xl border border-[#BFD8BB]/70 shadow-md backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-[9px] font-semibold tracking-wider text-[#6C8E68] uppercase">
                          ATELIER FOUNDER · EDITABLE
                        </span>
                        <h4 className="font-serif text-base font-medium text-[#0A0C0A]">
                          Helena Laurent
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-[#0A0C0A] text-white tracking-widest uppercase">
                        15+ YRS CRAFT
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Trailing Card Behind */}
              <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full rounded-3xl border border-[#BFD8BB]/40 bg-[#F6F9F5]/80 pointer-events-none hidden sm:block" />
            </TiltCard>
          </div>

          {/* Right Column: Narrative, Quote, & Core Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#6C8E68] uppercase mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>ABOUT THE FOUNDER</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#0A0C0A] leading-snug">
                "We built this space so you never have to choose between high-fashion refinement and peaceful restoration."
              </h3>
            </div>

            <div className="space-y-4 text-sm text-[#6B7269] leading-relaxed font-sans">
              <p>
                After more than a decade directing backstage styling teams for European fashion houses
                and working in premier private salons, Helena Laurent envisioned an entirely different salon experience:
                one free from clinical rush, toxic fumes, and cookie-cutter trends.
              </p>
              <p>
                Founded upon the belief that healthy hair is the prerequisite for timeless elegance,
                our salon combines precision dry sculpturing—cutting strands in their natural state to mirror
                individual facial geometry—with rare, cold-pressed botanicals that nourish the scalp at a cellular level.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {milestones.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: LUXURY_EASE }}
                    className="p-4 rounded-2xl bg-[#F6F9F5] border border-[#BFD8BB] hover:border-[#6C8E68] transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#BFD8BB] flex items-center justify-center text-[#0A0C0A] mb-3 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4 text-[#6C8E68]" />
                    </div>
                    <h5 className="font-serif text-sm font-medium text-[#0A0C0A] mb-1.5">
                      {item.title}
                    </h5>
                    <p className="text-xs text-[#6B7269] leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Founder Sign-off & Booking Action */}
            <div className="pt-4 border-t border-[#BFD8BB]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="block text-[10px] font-semibold tracking-[0.2em] text-[#6B7269] uppercase">
                  MASTER CONSULTATION
                </span>
                <p className="font-serif text-xl italic font-normal text-[#0A0C0A] mt-0.5">
                  Helena Laurent
                </p>
                <span className="block text-[11px] text-[#6C8E68] font-medium">
                  Founder & Creative Director
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 rounded-full bg-[#0A0C0A] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#BFD8BB] hover:text-[#0A0C0A] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md group border border-[#0A0C0A]"
                >
                  <span>RESERVE WITH FOUNDER</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
