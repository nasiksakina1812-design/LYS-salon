import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { ServiceCategory, ServiceItem } from '../types';

interface ServicesDossierProps {
  onSelectServiceItem: (service: ServiceItem) => void;
  onOpenBooking: () => void;
}

const serviceCategories: ServiceCategory[] = [
  {
    number: '01',
    title: 'Hair Craft & Couture Cuts',
    summary:
      'Bespoke cuts, tailored strand shaping, couture styling, and holistic restorative keratin treatments.',
    services: [
      {
        id: 'hair-1',
        name: 'Signature Restyling & Finish',
        price: '₹ 2,800+',
        duration: '60 min',
        category: 'Hair Craft & Couture Cuts',
        description: 'Complete aesthetic consultation, precision shape tailoring, and signature blowout.',
        sensoryNotes: ['Bergamot', 'Cedarwood'],
      },
      {
        id: 'hair-2',
        name: 'Botanical Scalp Detox Cut',
        price: '₹ 3,400+',
        duration: '75 min',
        category: 'Hair Craft & Couture Cuts',
        description: 'Deep micro-follicle clarifying wash, hair trim, and essential oil scalp rinse.',
        sensoryNotes: ['Peppermint', 'Tea Tree', 'Lavender'],
      },
      {
        id: 'hair-3',
        name: 'Deep Reconstruction Treatment',
        price: '₹ 4,500+',
        duration: '90 min',
        category: 'Hair Craft & Couture Cuts',
        description: 'Amino peptide rebuilding mask with steam activation for porous, sensitized strands.',
        sensoryNotes: ['Sandalwood', 'White Orchid'],
      },
      {
        id: 'hair-4',
        name: 'Editorial Blowdry & Wave',
        price: '₹ 1,800+',
        duration: '45 min',
        category: 'Hair Craft & Couture Cuts',
        description: 'Effortless Parisian textured movement with thermal barrier botanical shield.',
        sensoryNotes: ['Neroli', 'Grapefruit'],
      },
    ],
  },
  {
    number: '02',
    title: 'Artisan Colour & Balayage',
    summary:
      'Luminous dimensional painting, ammonia-free root blending, and high-gloss tonal glazing.',
    services: [
      {
        id: 'colour-1',
        name: 'Dimensional Balayage & Glaze',
        price: '₹ 6,200+',
        duration: '150 min',
        category: 'Artisan Colour & Balayage',
        description: 'Custom freehand placement that replicates natural sunlit depth, followed by peptide toner.',
        sensoryNotes: ['Vanilla Orchid', 'Almond Blossom'],
      },
      {
        id: 'colour-2',
        name: 'French Gloss & Tone Refinement',
        price: '₹ 3,200+',
        duration: '60 min',
        category: 'Artisan Colour & Balayage',
        description: 'Acidic pH gloss formulation to neutralize brassiness and seal the hair cuticle with mirror shine.',
        sensoryNotes: ['Citrus Blossom', 'White Tea'],
      },
      {
        id: 'colour-3',
        name: 'Organic Root Melt & Lightening',
        price: '₹ 4,800+',
        duration: '90 min',
        category: 'Artisan Colour & Balayage',
        description: 'Seamless low-maintenance regrowth transition formulated with organic botanical pigments.',
        sensoryNotes: ['Chamomile', 'Vetiver'],
      },
    ],
  },
  {
    number: '03',
    title: 'Editorial Styling & Occasion',
    summary:
      'High-fashion structured updos, romantic undone textures, and curated bridal previews.',
    services: [
      {
        id: 'style-1',
        name: 'Red Carpet & Editorial Updo',
        price: '₹ 3,500+',
        duration: '75 min',
        category: 'Editorial Styling & Occasion',
        description: 'Architectural structural silhouettes or soft romantic sculpted buns for gala evenings.',
        sensoryNotes: ['Amber', 'Damask Rose'],
      },
      {
        id: 'style-2',
        name: 'Textural Parisian Wave',
        price: '₹ 2,200+',
        duration: '50 min',
        category: 'Editorial Styling & Occasion',
        description: 'Carefree, lived-in bend with matte botanical sea-mineral texture.',
        sensoryNotes: ['Cardamom', 'Sea Salt'],
      },
      {
        id: 'style-3',
        name: 'Atelier Bridal Preview Session',
        price: '₹ 5,000+',
        duration: '120 min',
        category: 'Editorial Styling & Occasion',
        description: 'Comprehensive styling trial with veil placement and dupatta drape harmonization.',
        sensoryNotes: ['Jasmine Sambac', 'Saffron'],
      },
    ],
  },
  {
    number: '04',
    title: 'Skin & Barrier Restoration',
    summary:
      'Cellular hydration infusions, cold-stone lymphatic sculpting, and restorative bio-botanical peels.',
    services: [
      {
        id: 'skin-1',
        name: 'Botanical Lymphatic Facial Sculpt',
        price: '₹ 4,800+',
        duration: '75 min',
        category: 'Skin & Barrier Restoration',
        description: 'Manual gua sha drainage combined with cold-pressed rosehip seed extract to contour jawline.',
        sensoryNotes: ['Rose Otto', 'Frankincense'],
      },
      {
        id: 'skin-2',
        name: 'Cellular Hydration & Oxygen Drench',
        price: '₹ 5,200+',
        duration: '80 min',
        category: 'Skin & Barrier Restoration',
        description: 'Hyperbaric pressurized botanical serum delivery deep into cellular matrix for glass-skin glow.',
        sensoryNotes: ['Cucumber Water', 'Green Tea'],
      },
      {
        id: 'skin-3',
        name: 'Marine Algae Calming Mask Ritual',
        price: '₹ 3,900+',
        duration: '60 min',
        category: 'Skin & Barrier Restoration',
        description: 'Soothes inflammation, redness, and environmental barrier damage caused by urban pollution.',
        sensoryNotes: ['Blue Tansy', 'Helichrysum'],
      },
    ],
  },
  {
    number: '05',
    title: 'Sensory Spa & Wellness Rituals',
    summary:
      'Restorative scalp hydrotherapy, acoustic sound immersions, and tension-melting shoulder releases.',
    services: [
      {
        id: 'spa-1',
        name: 'Japanese Shiatsu Head Spa & Steam',
        price: '₹ 4,200+',
        duration: '75 min',
        category: 'Sensory Spa & Wellness Rituals',
        description: 'Continuous warm herbal waterfall bath, acupressure scalp stimulation, and herbal head mist.',
        sensoryNotes: ['Hinoki Wood', 'Yuzu'],
      },
      {
        id: 'spa-2',
        name: 'Aromatic Botanical Scalp Polish',
        price: '₹ 3,100+',
        duration: '60 min',
        category: 'Sensory Spa & Wellness Rituals',
        description: 'Gentle Himalayan pink salt scrub blended with jojoba oil to lift buildup and restore follicular health.',
        sensoryNotes: ['Eucalyptus', 'Rosemary'],
      },
      {
        id: 'spa-3',
        name: 'Tension Melt Neck & Shoulder Flow',
        price: '₹ 2,400+',
        duration: '45 min',
        category: 'Sensory Spa & Wellness Rituals',
        description: 'Targeted acupressure release designed specifically for professionals carrying screen tension.',
        sensoryNotes: ['Lavender Fine', 'Sweet Marjoram'],
      },
    ],
  },
];

export const ServicesDossier: React.FC<ServicesDossierProps> = ({
  onSelectServiceItem,
  onOpenBooking,
}) => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-white border-y border-[#BFD8BB]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Dossier Context & Concierge Assurance */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="block text-[11px] font-semibold tracking-[0.22em] text-[#6B7269] uppercase mb-3">
              SERVICES DOSSIER
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0A0C0A] mb-6">
              Find your <br />
              ritual.
            </h2>
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#6B7269] mb-10">
              Every appointment begins with an in-depth dialogue to harmonize
              your desired aesthetic with hair and skin integrity.
            </p>

            {/* Concierge Assurance Card */}
            <div className="p-6 rounded-2xl bg-[#F6F9F5] border border-[#BFD8BB] shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#E7F1E5] border border-[#BFD8BB] flex items-center justify-center text-[#0A0C0A]">
                  <ShieldCheck className="w-4 h-4 text-[#6C8E68]" />
                </div>
                <h3 className="font-serif text-base font-medium text-[#0A0C0A]">
                  Master Stylists & Aestheticians
                </h3>
              </div>
              <p className="font-sans text-xs text-[#6B7269] leading-relaxed mb-4">
                Each service includes complimentary organic tea service and tailored
                sensory aromatherapy.
              </p>
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-[#0A0C0A] hover:text-[#6C8E68] uppercase group cursor-pointer"
              >
                <span>DIRECT CONCIERGE BOOKING</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Accordion Services */}
          <div className="lg:col-span-7 space-y-4">
            {serviceCategories.map((cat, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={cat.number}
                  className={`rounded-2xl bg-white border transition-all duration-300 ${
                    isOpen ? 'border-[#BFD8BB] shadow-sm' : 'border-[#BFD8BB]/50 hover:border-[#BFD8BB]'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-[#F6F9F5] cursor-pointer rounded-2xl"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-sans text-xs font-bold text-[#6C8E68] tracking-widest">
                        {cat.number}
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-normal text-[#0A0C0A]">
                        {cat.title}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-[#BFD8BB] flex items-center justify-center text-[#0A0C0A] shrink-0 bg-[#E7F1E5]">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#0A0C0A]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#0A0C0A]" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-[#BFD8BB]/40 animate-in fade-in duration-200">
                      <p className="font-sans text-xs sm:text-sm text-[#6B7269] leading-relaxed mb-6">
                        {cat.summary}
                      </p>

                      <div className="space-y-3">
                        {cat.services.map((item) => (
                          <div
                            key={item.id}
                            className="p-4 rounded-xl bg-[#F6F9F5] border border-[#BFD8BB]/50 hover:border-[#BFD8BB] hover:bg-[#E7F1E5]/40 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                          >
                            <div className="flex-1 pr-2">
                              <div className="flex items-baseline justify-between gap-2 sm:justify-start">
                                <h4 className="font-serif text-base font-normal text-[#0A0C0A] group-hover:text-[#6C8E68] transition-colors">
                                  {item.name}
                                </h4>
                                <span className="text-[11px] font-sans text-[#6B7269]">
                                  ({item.duration})
                                </span>
                              </div>
                              {item.description && (
                                <p className="font-sans text-xs text-[#6B7269] mt-1 line-clamp-1">
                                  {item.description}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#BFD8BB]/40">
                              <span className="font-sans text-sm font-semibold text-[#0A0C0A] tabular-nums">
                                {item.price}
                              </span>

                              <button
                                onClick={() => onSelectServiceItem(item)}
                                className="px-3.5 py-1.5 rounded-full bg-[#0A0C0A] text-white text-[10px] font-semibold tracking-wider uppercase hover:bg-[#BFD8BB] hover:text-[#0A0C0A] transition-colors active:scale-95 cursor-pointer shadow-2xs"
                              >
                                SELECT
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
