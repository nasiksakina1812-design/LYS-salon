import React from 'react';
import { Phone, Navigation, ArrowUpRight, Clock, MapPin } from 'lucide-react';

interface ReservationsSectionProps {
  onOpenBooking: () => void;
}

export const ReservationsSection: React.FC<ReservationsSectionProps> = ({
  onOpenBooking,
}) => {
  return (
    <section id="find-us" className="py-24 lg:py-32 bg-[#0A0C0A] text-white overflow-hidden relative">
      {/* Background ambient glow in pastel green */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#BFD8BB]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Reservations Callout */}
          <div className="lg:col-span-6">
            <span className="block text-[11px] font-semibold tracking-[0.25em] text-[#BFD8BB] uppercase mb-4">
              RESERVATIONS
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-2 leading-[1.12]">
              YOUR NEXT FAVOURITE
            </h2>
            <div className="font-serif text-3xl sm:text-4xl lg:text-5xl italic font-normal text-[#BFD8BB] mb-6">
              moment starts here.
            </div>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#E7F1E5] max-w-lg mb-10 font-light">
              Ready for a little time for yourself? Get in touch with our
              concierge team to schedule your personalized ritual.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="tel:09833535960"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-[#0A0C0A] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#BFD8BB] transition-all shadow-md active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5 text-[#0A0C0A]" />
                <span>CALL TO BOOK: 09833535960</span>
              </a>

              <a
                href="https://maps.google.com/?q=8A+Janata+Estate+Senapati+Bapat+Marg+Lower+Parel+Mumbai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#BFD8BB]/50 text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#BFD8BB] hover:text-[#0A0C0A] transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GET DIRECTIONS</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#BFD8BB] text-[#0A0C0A] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-white transition-colors cursor-pointer shadow-xs"
              >
                <span>BOOK ONLINE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Sanctuary Address Card with Stylized Map */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-white text-[#0A0C0A] shadow-[0_24px_50px_-15px_rgba(0,0,0,0.4)] border border-[#BFD8BB]">
              <span className="block text-[10px] font-semibold tracking-[0.22em] text-[#6B7269] uppercase mb-2">
                SANCTUARY ADDRESS
              </span>
              <h3 className="font-serif text-2xl font-normal text-[#0A0C0A] mb-3">
                LYS Salon & Spa
              </h3>

              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0A0C0A] leading-relaxed mb-6">
                <MapPin className="w-4 h-4 text-[#6C8E68] shrink-0 mt-0.5" />
                <span>
                  8A, Janata Estate, Senapati Bapat Marg, above Spice Klub,
                  next to Stanley, Lower Parel, Mumbai, Maharashtra 400013
                </span>
              </div>

              {/* Hours Grid */}
              <div className="p-4 rounded-xl bg-[#F6F9F5] border border-[#BFD8BB]/60 mb-6 space-y-2 text-xs">
                <div className="flex items-center justify-between font-sans">
                  <span className="text-[#6B7269] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#6C8E68]" />
                    Tuesday – Sunday
                  </span>
                  <span className="font-semibold text-[#0A0C0A] tabular-nums">
                    10:00 AM – 08:30 PM
                  </span>
                </div>
                <div className="flex items-center justify-between font-sans pt-1.5 border-t border-[#BFD8BB]/40">
                  <span className="text-[#6B7269]">Monday</span>
                  <span className="text-[#6B7269] italic font-medium">
                    Curated Appointments Only
                  </span>
                </div>
                <div className="flex items-center justify-between font-sans pt-1.5 border-t border-[#BFD8BB]/40">
                  <span className="text-[#6B7269]">Direct Desk</span>
                  <a
                    href="tel:09833535960"
                    className="font-bold text-[#0A0C0A] hover:text-[#6C8E68] tabular-nums"
                  >
                    09833535960
                  </a>
                </div>
              </div>

              {/* Sanctuary Location Map Preview */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/8] bg-[#E7F1E5] border border-[#BFD8BB] flex items-center justify-center group shadow-inner">
                <img
                  src="/assets/sanctuary_map.png"
                  alt="Map location of LYS Salon & Spa Sanctuary at Janata Estate, Lower Parel"
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0A0C0A]/10 group-hover:bg-transparent transition-colors" />

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="relative mb-2">
                    <div className="w-9 h-9 rounded-full bg-[#0A0C0A] text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-2.5 h-1 bg-black/30 rounded-full mx-auto blur-[1px]" />
                  </div>
                  <a
                    href="https://maps.google.com/?q=8A+Janata+Estate+Senapati+Bapat+Marg+Lower+Parel+Mumbai"
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto px-4 py-1.5 rounded-full bg-white text-[10px] font-semibold tracking-wider text-[#0A0C0A] shadow-lg hover:bg-[#BFD8BB] uppercase border border-[#BFD8BB] transition-transform hover:scale-105 active:scale-95"
                  >
                    VIEW ON GOOGLE MAPS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
