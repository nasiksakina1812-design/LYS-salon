import React from 'react';
import { ArrowRight, Star, ArrowDown, MapPin } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden bg-white">
      {/* Soft pastel ambient background aura */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#E7F1E5]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F6F9F5] rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-6 z-10">
            {/* Location Tag */}
            <div className="inline-flex items-center gap-2 mb-6 text-[11px] font-semibold tracking-[0.22em] text-[#0A0C0A] uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BFD8BB] border border-[#6C8E68]" />
              <span>LYS SALON & SPA · LOWER PAREL, MUMBAI</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-normal leading-[1.08] tracking-[-0.02em] text-[#0A0C0A] text-balance mb-6">
              Beauty that <br />
              <span className="italic font-normal text-[#6C8E68]">feels like you.</span>
            </h1>

            {/* Editorial Body Copy */}
            <p className="font-sans text-base sm:text-lg leading-relaxed text-[#6B7269] max-w-xl mb-9 font-normal">
              Step into a world of thoughtful beauty rituals, personal expression,
              and moments made entirely for you. Filtered through an
              architectural, restorative lens.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#0A0C0A] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#BFD8BB] hover:text-[#0A0C0A] hover:border-[#BFD8BB] hover:shadow-md transition-all active:scale-[0.98] group cursor-pointer border border-[#0A0C0A]"
              >
                <span>BOOK YOUR VISIT</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#experience"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-[#0A0C0A]/20 bg-white text-[#0A0C0A] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#E7F1E5] hover:border-[#BFD8BB] transition-colors"
              >
                EXPLORE THE EXPERIENCE
              </a>
            </div>

            {/* Trust Proof & Scroll Cue */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#BFD8BB]/50 text-xs text-[#6B7269]">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center text-[#0A0C0A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#0A0C0A]" />
                  ))}
                </div>
                <span className="font-bold text-[#0A0C0A] tabular-nums">4.9 / 5</span>
                <span className="text-[#BFD8BB]">·</span>
                <span className="tracking-wide text-[#0A0C0A]">507 GOOGLE REVIEWS</span>
              </div>

              <a
                href="#philosophy"
                className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.16em] text-[#6B7269] hover:text-[#0A0C0A] transition-colors uppercase"
              >
                <span>SCROLL TO DISCOVER</span>
                <ArrowDown className="w-3 h-3 animate-bounce text-[#6C8E68]" />
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Arched Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[430px]">
              {/* Arched Frame Container */}
              <div className="relative rounded-t-[180px] rounded-b-3xl overflow-hidden shadow-[0_24px_50px_-12px_rgba(10,12,10,0.12)] border border-[#BFD8BB] bg-white">
                <SmartImage
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85"
                  alt="Radiant client portrait at LYS Salon & Spa"
                  className="w-full h-[520px] sm:h-[580px] object-cover object-top filter brightness-[0.98] contrast-[1.02]"
                  fallbackTitle="Bespoke Radiance"
                  fallbackSubtitle="Architectural beauty rituals tailored to your facial contours"
                />

                {/* Floating Atelier Badge (Top Right) */}
                <div className="absolute top-5 right-5 z-10 glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-[#BFD8BB]">
                  <MapPin className="w-3 h-3 text-[#6C8E68]" />
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-[#0A0C0A] uppercase">
                    LOWER PAREL ATELIER
                  </span>
                </div>

                {/* Bottom Signature Care Card */}
                <div className="absolute bottom-4 left-4 right-4 z-10 glass-panel p-4 rounded-2xl flex items-center justify-between gap-3 shadow-lg border border-[#BFD8BB]/70">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
