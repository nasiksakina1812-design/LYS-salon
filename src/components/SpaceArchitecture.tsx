import React, { useState } from 'react';
import { Sparkles, Maximize2, Shield } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SmartImage } from './SmartImage';
import {
  TextReveal,
  CurvedImageReveal,
  TiltCard,
  LUXURY_EASE,
} from './animations/MotionPrimitives';

interface SpaceArchitectureProps {
  onOpenSpaceViewer: () => void;
}

export const SpaceArchitecture: React.FC<SpaceArchitectureProps> = ({
  onOpenSpaceViewer,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const hotspots = [
    {
      id: 'mirrors',
      x: '38%',
      y: '42%',
      title: 'Arched Backlit Mirrors',
      desc: 'Soft warm diffuse LED rings mimic 4500K golden daylight.',
    },
    {
      id: 'plaster',
      x: '68%',
      y: '30%',
      title: 'Fluted Lime Plaster',
      desc: 'Tactile acoustic surface crafted by Italian artisans.',
    },
    {
      id: 'seating',
      x: '48%',
      y: '72%',
      title: 'Sage Velvet Loungers',
      desc: 'Ergonomic lumbar support for prolonged restorative rituals.',
    },
  ];

  return (
    <section id="space" className="py-24 lg:py-32 bg-[#F6F9F5]/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="block text-[11px] font-semibold tracking-[0.22em] text-[#6B7269] uppercase mb-3">
            THE ARCHITECTURE OF SERENITY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0A0C0A] mb-6">
            <TextReveal as="span">Designed for your moment.</TextReveal>
          </h2>
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: LUXURY_EASE }}
            className="font-sans text-sm sm:text-base leading-relaxed text-[#6B7269]"
          >
            A calm sanctuary situated above the historic pulse of Lower Parel.
            Thoughtfully realized with fluted lime plaster, arched illuminated
            mirrors, warm terrazzo, and tactile sage velvet.
          </motion.p>
        </div>

        {/* 2-Column Asymmetric Architectural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Large Styling Atelier Showcase with Curved Mask Reveal */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-white border border-[#BFD8BB] overflow-hidden shadow-[0_20px_40px_-15px_rgba(10,12,10,0.06)] group">
            <CurvedImageReveal shape="oval" delay={0.1} className="relative aspect-[16/11] sm:aspect-[16/10] bg-[#E7F1E5]">
              <SmartImage
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format,compress&fit=crop&w=1000&q=80&fm=webp"
                srcSet="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format,compress&fit=crop&w=600&q=80&fm=webp 600w, https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format,compress&fit=crop&w=1000&q=80&fm=webp 1000w"
                sizes="(max-width: 1024px) 100vw, 700px"
                alt="Styling Atelier at LYS Salon Lower Parel"
                width={700}
                height={450}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                fallbackTitle="Styling Atelier"
                fallbackSubtitle="Arched fluted mirrors and natural illumination"
              />

              {/* Overlay Badge */}
              <div className="absolute top-5 left-5 z-10 glass-panel px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.16em] text-[#0A0C0A] uppercase shadow-xs border border-[#BFD8BB]">
                STYLING ATELIER · FLOOR
              </div>

              {/* Interactive Hotspots with Rhythmic Pulse and Animated Popovers */}
              {hotspots.map((h) => (
                <div
                  key={h.id}
                  style={{ top: h.y, left: h.x }}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    onClick={() =>
                      setActiveHotspot(activeHotspot === h.id ? null : h.id)
                    }
                    className="relative group/btn cursor-pointer p-2.5"
                    aria-label={h.title}
                  >
                    {/* Concentric Ambient Pulse Ring */}
                    <span className="absolute inset-2 rounded-full bg-[#BFD8BB]/70 animate-ping pointer-events-none" />

                    <span className="relative w-6 h-6 rounded-full bg-white border border-[#0A0C0A] flex items-center justify-center text-[11px] font-bold text-[#0A0C0A] shadow-md transition-transform duration-300 group-hover/btn:scale-115">
                      +
                    </span>

                    {/* Animated Details Popover */}
                    <AnimatePresence>
                      {activeHotspot === h.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 5 }}
                          transition={{ duration: 0.25, ease: LUXURY_EASE }}
                          className="absolute left-9 top-0 w-56 p-3.5 rounded-xl bg-white/98 backdrop-blur-md border border-[#BFD8BB] text-left shadow-xl z-30 pointer-events-auto"
                        >
                          <h4 className="font-serif text-xs font-semibold text-[#0A0C0A]">
                            {h.title}
                          </h4>
                          <p className="font-sans text-[11px] text-[#6B7269] mt-1 leading-snug">
                            {h.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              ))}

              {/* Expand View Icon with Smooth Scale Hover */}
              <button
                onClick={onOpenSpaceViewer}
                className="absolute bottom-5 right-5 z-10 w-9 h-9 rounded-full bg-white/90 border border-[#BFD8BB] flex items-center justify-center text-[#0A0C0A] hover:bg-[#E7F1E5] hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer"
                title="Open Gallery View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </CurvedImageReveal>

            {/* Bottom Caption Bar */}
            <div className="p-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#BFD8BB]/50 text-xs text-[#6B7269]">
              <span className="font-sans font-medium text-[#0A0C0A]">
                Curated by Interior Architects
              </span>
              <span className="font-sans tracking-wider uppercase text-[11px] text-[#6C8E68] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#6C8E68]" />
                NATURAL ILLUMINATION
              </span>
            </div>
          </div>

          {/* Right Column: Aromatherapy Bar & Location Signature Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Top: Aromatherapy Bar Photo with Curved Reveal */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#BFD8BB] shadow-[0_12px_32px_-12px_rgba(10,12,10,0.06)] group aspect-[16/10]">
              <CurvedImageReveal shape="circle" delay={0.25} className="w-full h-full">
                <SmartImage
                  src="https://images.unsplash.com/photo-1608248597359-57e0e7a256a2?auto=format,compress&fit=crop&w=800&q=80&fm=webp"
                  srcSet="https://images.unsplash.com/photo-1608248597359-57e0e7a256a2?auto=format,compress&fit=crop&w=400&q=80&fm=webp 400w, https://images.unsplash.com/photo-1608248597359-57e0e7a256a2?auto=format,compress&fit=crop&w=800&q=80&fm=webp 800w"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  alt="Aromatherapy Bar at LYS"
                  width={500}
                  height={320}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  fallbackTitle="Aromatherapy Bar"
                  fallbackSubtitle="Artisanal organic tinctures & cold-pressed oils"
                />
                <div className="absolute top-4 right-4 z-10 px-3.5 py-1 rounded-full bg-[#0A0C0A] text-[9px] font-semibold tracking-[0.2em] text-white uppercase shadow-xs transition-transform duration-300 group-hover:scale-105">
                  AROMATHERAPY BAR
                </div>
              </CurvedImageReveal>
            </div>

            {/* Bottom: Location Details Card with 3D Tilt */}
            <TiltCard
              maxTilt={4}
              className="p-8 rounded-3xl bg-white border border-[#BFD8BB] shadow-[0_12px_32px_-12px_rgba(10,12,10,0.06)] hover:border-[#6C8E68] flex flex-col justify-between flex-1 transition-all duration-300"
            >
              <div>
                <span className="block text-[10px] font-semibold tracking-[0.2em] text-[#6B7269] uppercase mb-2">
                  LOCATION SIGNATURE
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#0A0C0A] mb-4">
                  Janata Estate, Senapati Bapat Marg
                </h3>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-[#6B7269] mb-6">
                  Elevated comfortably on the first floor above Spice Klub,
                  offering a peaceful respite from Mumbai’s bustling financial
                  and fashion district.
                </p>
              </div>

              <div className="pt-4 border-t border-[#BFD8BB]/50 flex items-center gap-2.5 text-xs text-[#0A0C0A] font-semibold">
                <Shield className="w-4 h-4 text-[#6C8E68]" />
                <span>Valet Parking & Private Reception Available</span>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
