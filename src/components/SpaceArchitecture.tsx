import React, { useState } from 'react';
import { Sparkles, Maximize2, Shield } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface SpaceArchitectureProps {
  onOpenSpaceViewer: () => void;
}

export const SpaceArchitecture: React.FC<SpaceArchitectureProps> = ({
  onOpenSpaceViewer,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

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
    <section id="space" className="py-24 lg:py-32 bg-[#F6F9F5]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="block text-[11px] font-semibold tracking-[0.22em] text-[#6B7269] uppercase mb-3">
            THE ARCHITECTURE OF SERENITY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0A0C0A] mb-6">
            Designed for your moment.
          </h2>
          <p className="font-sans text-sm sm:text-base leading-relaxed text-[#6B7269]">
            A calm sanctuary situated above the historic pulse of Lower Parel.
            Thoughtfully realized with fluted lime plaster, arched illuminated
            mirrors, warm terrazzo, and tactile sage velvet.
          </p>
        </div>

        {/* 2-Column Asymmetric Architectural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Large Styling Atelier Showcase */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-white border border-[#BFD8BB] overflow-hidden shadow-[0_20px_40px_-15px_rgba(10,12,10,0.06)] group">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] bg-[#E7F1E5] overflow-hidden">
              <SmartImage
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85"
                alt="Styling Atelier at LYS Salon Lower Parel"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                fallbackTitle="Styling Atelier"
                fallbackSubtitle="Arched fluted mirrors and natural illumination"
              />

              {/* Overlay Badge */}
              <div className="absolute top-5 left-5 z-10 glass-panel px-3.5 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.16em] text-[#0A0C0A] uppercase shadow-xs border border-[#BFD8BB]">
                STYLING ATELIER · FLOOR
              </div>

              {/* Interactive Hotspots */}
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
                    className="relative group/btn cursor-pointer p-2"
                    aria-label={h.title}
                  >
                    <span className="w-5 h-5 rounded-full bg-white border border-[#0A0C0A] flex items-center justify-center text-[10px] font-bold text-[#0A0C0A] shadow-md transition-transform group-hover/btn:scale-110">
                      +
                    </span>
                    {activeHotspot === h.id && (
                      <div className="absolute left-7 top-0 w-52 p-3 rounded-xl bg-white border border-[#BFD8BB] text-left shadow-xl z-30 pointer-events-auto">
                        <h4 className="font-serif text-xs font-semibold text-[#0A0C0A]">
                          {h.title}
                        </h4>
                        <p className="font-sans text-[11px] text-[#6B7269] mt-1 leading-snug">
                          {h.desc}
                        </p>
                      </div>
                    )}
                  </button>
                </div>
              ))}

              {/* Expand View Icon */}
              <button
                onClick={onOpenSpaceViewer}
                className="absolute bottom-5 right-5 z-10 w-9 h-9 rounded-full bg-white/90 border border-[#BFD8BB] flex items-center justify-center text-[#0A0C0A] hover:bg-[#E7F1E5] transition-all shadow-md cursor-pointer"
                title="Open Gallery View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

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
            {/* Top: Aromatherapy Bar Photo */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#BFD8BB] shadow-[0_12px_32px_-12px_rgba(10,12,10,0.06)] group aspect-[16/10]">
              <SmartImage
                src="https://images.unsplash.com/photo-1608248597359-57e0e7a256a2?auto=format&fit=crop&w=800&q=80"
                alt="Aromatherapy Bar at LYS"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fallbackTitle="Aromatherapy Bar"
                fallbackSubtitle="Artisanal organic tinctures & cold-pressed oils"
              />
              <div className="absolute top-4 right-4 z-10 px-3.5 py-1 rounded-full bg-[#0A0C0A] text-[9px] font-semibold tracking-[0.2em] text-white uppercase shadow-xs">
                AROMATHERAPY BAR
              </div>
            </div>

            {/* Bottom: Location Details Card */}
            <div className="p-8 rounded-3xl bg-white border border-[#BFD8BB] shadow-[0_12px_32px_-12px_rgba(10,12,10,0.06)] flex flex-col justify-between flex-1">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
