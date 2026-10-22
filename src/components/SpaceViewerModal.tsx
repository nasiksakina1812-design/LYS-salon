import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Layers, Eye } from 'lucide-react';
import { SmartImage } from './SmartImage';

interface SpaceViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpaceViewerModal: React.FC<SpaceViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const spaces = [
    {
      title: 'Styling Atelier Floor',
      eyebrow: 'ZONE 01 · CUT & COLOR',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
      materials: ['Italian Fluted Lime Plaster', 'Backlit Arched Brass Mirrors', 'Honed Travertine Floors'],
      desc: 'An open, airy salon floor illuminated with custom 4500K CRI 98 balanced daylight simulation, allowing exact tone fidelity during color placement.',
    },
    {
      title: 'Head Spa & Hydrotherapy Sanctuary',
      eyebrow: 'ZONE 02 · ACOUSTIC ISOLATION',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
      materials: ['Acoustic Felt Baffles', 'Charcoal Ceramic Basins', 'Gentle Waterfall Dispensers'],
      desc: 'Complete sensory decompression with dimmed ambient floor illumination, acoustic isolation from city sounds, and warm botanical steam mists.',
    },
    {
      title: 'Botanical Aromatherapy Dispensary',
      eyebrow: 'ZONE 03 · HERBAL APOTHECARY',
      image: 'https://images.unsplash.com/photo-1608248597359-57e0e7a256a2?auto=format&fit=crop&w=1200&q=85',
      materials: ['Hand-Carved Soapstone', 'Amber Apothecary Glass', 'Fresh Organic Botanical Extracts'],
      desc: 'Where every custom essential oil elixir is blended fresh prior to your session, paired with artisanal hot herbal tea.',
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveTab((prev) => (prev + 1) % spaces.length);
      if (e.key === 'ArrowLeft') setActiveTab((prev) => (prev - 1 + spaces.length) % spaces.length);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, spaces.length]);

  if (!isOpen) return null;

  const currentSpace = spaces[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#BFD8BB] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 bg-[#F6F9F5] border-b border-[#BFD8BB]/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E7F1E5] border border-[#BFD8BB] flex items-center justify-center text-[#0A0C0A]">
              <Eye className="w-4 h-4 text-[#6C8E68]" />
            </div>
            <div>
              <span className="block text-[9px] font-semibold tracking-[0.2em] text-[#6B7269] uppercase">
                SANCTUARY ARCHITECTURE
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-medium text-[#0A0C0A]">
                {currentSpace.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#BFD8BB] flex items-center justify-center text-[#6B7269] hover:text-[#0A0C0A] hover:bg-[#E7F1E5] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image Showcase Area */}
        <div className="relative aspect-[16/10] bg-[#0A0C0A] overflow-hidden flex-1 min-h-[300px]">
          <SmartImage
            src={currentSpace.image}
            alt={currentSpace.title}
            className="w-full h-full object-cover"
            fallbackTitle={currentSpace.title}
            fallbackSubtitle={currentSpace.desc}
          />

          {/* Nav arrows */}
          <button
            onClick={() => setActiveTab((prev) => (prev - 1 + spaces.length) % spaces.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[#BFD8BB] flex items-center justify-center text-[#0A0C0A] hover:bg-white transition-all cursor-pointer shadow-md"
            aria-label="Previous Space"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveTab((prev) => (prev + 1) % spaces.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-[#BFD8BB] flex items-center justify-center text-[#0A0C0A] hover:bg-white transition-all cursor-pointer shadow-md"
            aria-label="Next Space"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1 rounded-full bg-[#0A0C0A] text-[10px] font-semibold tracking-widest text-white uppercase shadow-xs">
            {currentSpace.eyebrow}
          </div>
        </div>

        {/* Detail Description & Material Specification */}
        <div className="p-6 sm:p-8 bg-white border-t border-[#BFD8BB]/50 space-y-4">
          <p className="font-sans text-xs sm:text-sm text-[#0A0C0A] leading-relaxed">
            {currentSpace.desc}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[10px] font-semibold tracking-wider text-[#6B7269] uppercase flex items-center gap-1 mr-2">
              <Layers className="w-3.5 h-3.5" />
              Material Palette:
            </span>
            {currentSpace.materials.map((m) => (
              <span
                key={m}
                className="px-3 py-1 rounded-full bg-[#E7F1E5] border border-[#BFD8BB] text-[11px] font-sans text-[#0A0C0A]"
              >
                {m}
              </span>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {spaces.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeTab === idx ? 'w-8 bg-[#0A0C0A]' : 'w-2 bg-[#BFD8BB]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
