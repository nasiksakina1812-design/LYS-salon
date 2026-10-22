import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface CuratedJourneyProps {
  onSelectService: (serviceName: string) => void;
  onOpenSpaceViewer: () => void;
}

export const CuratedJourney: React.FC<CuratedJourneyProps> = ({
  onSelectService,
  onOpenSpaceViewer,
}) => {
  return (
    <section id="experience" className="py-24 lg:py-32 bg-[#F6F9F5]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          <div className="lg:col-span-7">
            <span className="block text-[11px] font-semibold tracking-[0.22em] text-[#6B7269] uppercase mb-3">
              A CURATED JOURNEY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0A0C0A] text-balance">
              Your moment. Your <br className="hidden sm:inline" />
              transformation.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#6B7269]">
              A dedicated sanctuary to unwind, refresh your aesthetic, and
              reconnect with the version of yourself you love most.
            </p>
          </div>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Architectural Strand Sculpting */}
          <div className="group flex flex-col justify-between rounded-2xl bg-white border border-[#BFD8BB] overflow-hidden shadow-[0_12px_32px_-12px_rgba(10,12,10,0.06)] hover:shadow-[0_20px_40px_-15px_rgba(10,12,10,0.1)] hover:border-[#6C8E68] transition-all">
            <div className="relative p-3 pb-0">
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#E7F1E5]">
                <SmartImage
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
                  alt="Architectural strand sculpting"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fallbackTitle="Couture Hair Sculpting"
                  fallbackSubtitle="Tailored facial framing and natural movement"
                />
                <div className="absolute bottom-3 left-3 z-10 px-3 py-1 rounded-full bg-[#0A0C0A] text-[9px] font-semibold tracking-[0.2em] text-white uppercase shadow-xs">
                  COUTURE RITUAL
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#0A0C0A] mb-3 group-hover:text-[#6C8E68] transition-colors">
                  Architectural Strand Sculpting
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6B7269] leading-relaxed mb-6">
                  Precision cutting and personalized movement tailoring informed by
                  your individual facial contours.
                </p>
              </div>

              <button
                onClick={() => onSelectService('Architectural Strand Sculpting')}
                className="pt-4 border-t border-[#BFD8BB]/50 flex items-center justify-between text-[11px] font-semibold tracking-[0.16em] text-[#0A0C0A] hover:text-[#6C8E68] transition-colors uppercase cursor-pointer"
              >
                <span>SESSION PROFILE: 60 - 90 MIN</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 2: Botanical Head Spa Infusion */}
          <div className="group flex flex-col justify-between rounded-2xl bg-white border border-[#BFD8BB] overflow-hidden shadow-[0_12px_32px_-12px_rgba(10,12,10,0.06)] hover:shadow-[0_20px_40px_-15px_rgba(10,12,10,0.1)] hover:border-[#6C8E68] transition-all">
            <div className="relative p-3 pb-0">
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#E7F1E5]">
                <SmartImage
                  src="https://images.unsplash.com/photo-1608248597359-57e0e7a256a2?auto=format&fit=crop&w=800&q=80"
                  alt="Botanical head spa infusion preparation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fallbackTitle="Botanical Herbal Oils"
                  fallbackSubtitle="Clean cold-pressed extracts for deep scalp therapy"
                />
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#0A0C0A] mb-3 group-hover:text-[#6C8E68] transition-colors">
                  Botanical Head Spa Infusion
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6B7269] leading-relaxed mb-6">
                  Steam-activated organic oils, micro-circulation massage, and
                  deep scalp detoxification.
                </p>
              </div>

              <button
                onClick={() => onSelectService('Botanical Head Spa Infusion')}
                className="pt-4 border-t border-[#BFD8BB]/50 flex items-center justify-between text-[11px] font-semibold tracking-[0.16em] text-[#0A0C0A] hover:text-[#6C8E68] transition-colors uppercase cursor-pointer"
              >
                <span>SESSION PROFILE: 75 MIN</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 3: Designed for Stillness */}
          <div className="group flex flex-col justify-between rounded-2xl bg-white border border-[#BFD8BB] overflow-hidden shadow-[0_12px_32px_-12px_rgba(10,12,10,0.06)] hover:shadow-[0_20px_40px_-15px_rgba(10,12,10,0.1)] hover:border-[#6C8E68] transition-all md:col-span-2 lg:col-span-1">
            <div className="relative p-3 pb-0">
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#E7F1E5]">
                <SmartImage
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
                  alt="Interior sanctuary architecture"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fallbackTitle="Architectural Stillness"
                  fallbackSubtitle="Fluted lime plaster and arched backlit mirrors"
                />
                <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-white/90 border border-[#BFD8BB] text-[9px] font-semibold tracking-[0.2em] text-[#0A0C0A] uppercase shadow-xs">
                  THE SANCTUARY
                </div>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#0A0C0A] mb-3 group-hover:text-[#6C8E68] transition-colors">
                  Designed for Stillness
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#6B7269] leading-relaxed mb-6">
                  Fluted lime plaster, acoustic dampening, and warm architectural
                  lighting away from city noise.
                </p>
              </div>

              <button
                onClick={onOpenSpaceViewer}
                className="pt-4 border-t border-[#BFD8BB]/50 flex items-center justify-between text-[11px] font-semibold tracking-[0.16em] text-[#0A0C0A] hover:text-[#6C8E68] transition-colors uppercase cursor-pointer"
              >
                <span>VIEW ARCHITECTURE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
