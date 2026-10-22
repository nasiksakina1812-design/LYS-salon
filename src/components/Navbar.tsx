import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'THE EXPERIENCE', href: '#experience' },
    { name: 'SERVICES', href: '#services' },
    { name: 'OUR SPACE', href: '#space' },
    { name: 'REVIEWS', href: '#reviews' },
    { name: 'FIND US', href: '#find-us' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_24px_rgba(10,12,10,0.04)] border-b border-[#BFD8BB]/40 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-6 lg:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-baseline gap-2 group tracking-tight text-[#0A0C0A] whitespace-nowrap shrink-0"
          >
            <span className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-[#0A0C0A]">
              LYS
            </span>
            <span className="text-[10px] tracking-[0.22em] font-semibold text-[#6B7269] uppercase hidden sm:inline-block">
              SALON & SPA
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-[11px] font-semibold tracking-[0.16em] text-[#0A0C0A]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#6C8E68] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#BFD8BB] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Direct Desk & Booking Action */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href="tel:09833535960"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#0A0C0A] hover:text-[#6C8E68] transition-colors px-3 py-1.5 rounded-full hover:bg-[#E7F1E5]"
            >
              <Phone className="w-3.5 h-3.5 text-[#6C8E68]" />
              <span>09833535960</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A0C0A] text-white text-xs font-semibold tracking-[0.1em] uppercase hover:bg-[#BFD8BB] hover:text-[#0A0C0A] hover:border-[#BFD8BB] transition-all active:scale-[0.98] whitespace-nowrap shrink-0 border border-[#0A0C0A] shadow-xs cursor-pointer"
            >
              <span>BOOK YOUR VISIT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#0A0C0A] hover:bg-[#E7F1E5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFD8BB]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-white/98 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8 transition-all animate-in fade-in duration-200">
          <div className="flex flex-col gap-6 text-center my-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl text-[#0A0C0A] hover:text-[#6C8E68] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-[#BFD8BB]/40 text-center">
            <a
              href="tel:09833535960"
              className="text-sm font-semibold tracking-wider text-[#0A0C0A] flex items-center justify-center gap-2 py-2"
            >
              <Phone className="w-4 h-4 text-[#6C8E68]" />
              09833535960
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-[#0A0C0A] text-white text-xs font-semibold tracking-widest uppercase hover:bg-[#BFD8BB] hover:text-[#0A0C0A] transition-colors"
            >
              BOOK YOUR VISIT
            </button>
          </div>
        </div>
      )}
    </>
  );
};
