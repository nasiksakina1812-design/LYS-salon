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
              YOUR SALON
            </h3>
            <div className="font-serif italic text-lg text-[#6C8E68] mb-4">
              Bespoke Beauty Sanctuary
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#6B7269] leading-relaxed max-w-sm mb-6">
              An elite urban sanctuary filtered through an architectural,
              editorial lens. Thoughtfully crafted beauty rituals tailored
              to your personal aesthetic.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#0A0C0A]">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#0A0C0A]" />
                ))}
              </div>
              <span className="font-bold tabular-nums">5.0 / 5</span>
              <span className="text-[#BFD8BB]">·</span>
              <span className="text-[#6B7269]">Sample Rating · 500+ Reviews</span>
            </div>
          </div>

          {/* Column 2: Sanctuary Coordinates */}
          <div className="lg:col-span-3">
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-[#6B7269] uppercase mb-4">
              SANCTUARY COORDINATES
            </span>
            <p className="font-sans text-xs text-[#0A0C0A] leading-relaxed mb-3">
              123 Atelier Boulevard, Suite 100, Design District,
              Your City, State 12345
            </p>
            <div className="space-y-1.5 text-xs">
              <div className="text-[#6B7269]">
                Concierge:{' '}
                <a
                  href="tel:+915550000000"
                  className="font-semibold text-[#0A0C0A] hover:text-[#6C8E68]"
                >
                  +91 (555) 000-0000
                </a>
              </div>
              <div className="text-[#6B7269]">
                Email:{' '}
                <a
                  href="mailto:concierge@yoursalonname.com"
                  className="font-semibold text-[#0A0C0A] hover:text-[#6C8E68]"
                >
                  concierge@yoursalonname.com
                </a>
              </div>
              <a
                href="https://maps.google.com/?q=Your+Salon+Name+Location"
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
                <a href="#founder" className="hover:text-[#6C8E68] transition-colors">
                  The Founder
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#6C8E68] transition-colors">
                  Patron Reviews
                </a>
              </li>
              <li>
                <a href="#find-us" className="hover:text-[#6C8E68] transition-colors">
                  Visiting Our Atelier
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
          <p>© {new Date().getFullYear()} Your Salon Name. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[#6B7269]">
              Patron Privacy Guaranteed
            </span>
            <span>·</span>
            <span className="text-[#6B7269]">
              24h Rescheduling Courtesy
            </span>
            <span>·</span>
            <a
              href="tel:+915550000000"
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
