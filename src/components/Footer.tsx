import React from 'react';
import { Star, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-[#0A0C0A] border-t border-[#BFD8BB]/50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#BFD8BB]/40">
          {/* Column 1: Brand & Soul Manifesto */}
          <div className="lg:col-span-5 pr-0 lg:pr-8">
            <h3 className="font-serif text-3xl font-medium tracking-tight text-[#0A0C0A] mb-1">
              LYS
            </h3>
            <div className="font-serif italic text-lg text-[#6C8E68] mb-4">
              Love Your Soul
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#6B7269] leading-relaxed max-w-sm mb-6">
              An elite urban sanctuary filtered through an architectural,
              editorial lens in the historic textile heart of Lower Parel,
              Mumbai.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#0A0C0A]">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#0A0C0A]" />
                ))}
              </div>
              <span className="font-bold tabular-nums">4.9 / 5</span>
              <span className="text-[#BFD8BB]">·</span>
              <span className="text-[#6B7269]">507 Google Reviews</span>
            </div>
          </div>

          {/* Column 2: Sanctuary Coordinates */}
          <div className="lg:col-span-3">
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-[#6B7269] uppercase mb-4">
              SANCTUARY COORDINATES
            </span>
            <p className="font-sans text-xs text-[#0A0C0A] leading-relaxed mb-3">
              8A, Janata Estate, Senapati Bapat Marg, above Spice Klub, next to
              Stanley, Lower Parel, Mumbai, Maharashtra 400013
            </p>
            <div className="space-y-1.5 text-xs">
              <div className="text-[#6B7269]">
                Concierge:{' '}
                <a
                  href="tel:09833535960"
                  className="font-semibold text-[#0A0C0A] hover:text-[#6C8E68]"
                >
                  09833535960
                </a>
              </div>
              <a
                href="https://maps.google.com/?q=8A+Janata+Estate+Senapati+Bapat+Marg+Lower+Parel+Mumbai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider text-[#0A0C0A] hover:text-[#6C8E68] uppercase mt-1"
              >
                <span>GET DIRECTIONS</span>
                <ArrowUpRight className="w-3 h-3 text-[#6C8E68]" />
              </a>
            </div>
          </div>

          {/* Column 3: Navigation */}
          <div className="lg:col-span-2">
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-[#6B7269] uppercase mb-4">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 text-xs font-sans text-[#0A0C0A]">
              <li>
                <a href="#experience" className="hover:text-[#6C8E68] transition-colors">
                  The Experience
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#6C8E68] transition-colors">
                  Services Dossier
                </a>
              </li>
              <li>
                <a href="#space" className="hover:text-[#6C8E68] transition-colors">
                  Our Space
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#6C8E68] transition-colors">
                  Patron Reviews
                </a>
              </li>
              <li>
                <a href="#find-us" className="hover:text-[#6C8E68] transition-colors">
                  Visiting Lower Parel
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Retreat Hours */}
          <div className="lg:col-span-2">
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-[#6B7269] uppercase mb-4">
              RETREAT HOURS
            </span>
            <div className="space-y-3 text-xs font-sans">
              <div>
                <span className="block text-[#6B7269]">Tuesday – Sunday</span>
                <span className="font-semibold text-[#0A0C0A] tabular-nums">
                  10:00 AM – 08:30 PM
                </span>
              </div>
              <div>
                <span className="block text-[#6B7269]">Monday</span>
                <span className="italic text-[#6B7269]">
                  Curated Appointments Only
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6B7269]">
          <p>© {new Date().getFullYear()} LYS Salon & Spa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() =>
                alert(
                  'LYS Sanctuary Privacy: Patron data and consultation notes are strictly private and never shared.'
                )
              }
              className="hover:text-[#0A0C0A] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() =>
                alert(
                  'Terms of Retreat: 24-hour rescheduling courtesy is kindly requested to honor our artisans’ focused schedule.'
                )
              }
              className="hover:text-[#0A0C0A] transition-colors cursor-pointer"
            >
              Terms of Retreat
            </button>
            <a
              href="tel:09833535960"
              className="hover:text-[#0A0C0A] transition-colors"
            >
              Concierge Desk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
