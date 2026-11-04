import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { MagneticButton } from './animations/MagneticButton';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Top viewport scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks = [
    { name: 'THE EXPERIENCE', href: '#experience', id: 'experience' },
    { name: 'SERVICES', href: '#services', id: 'services' },
    { name: 'THE FOUNDER', href: '#founder', id: 'founder' },
    { name: 'OUR SPACE', href: '#space', id: 'space' },
    { name: 'REVIEWS', href: '#reviews', id: 'reviews' },
    { name: 'FIND US', href: '#find-us', id: 'find-us' },
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section observer for active nav indicator
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
      }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Cinematic Top Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#BFD8BB] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-white/92 backdrop-blur-md shadow-[0_4px_30px_rgba(10,12,10,0.05)] border-b border-[#BFD8BB]/50 py-3'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-6 lg:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-baseline gap-2 group tracking-tight text-[#0A0C0A] whitespace-nowrap shrink-0 transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-[#0A0C0A]">
              YOUR SALON
            </span>
            <span className="text-[10px] tracking-[0.22em] font-semibold text-[#6B7269] uppercase hidden sm:inline-block">
              SALON & SPA
            </span>
          </a>

          {/* Zone 2: Navigation Links with Active Indicator */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8 text-[11px] font-semibold tracking-[0.16em] text-[#0A0C0A]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1.5 px-1 transition-colors duration-300 whitespace-nowrap shrink-0 ${
                    isActive ? 'text-[#0A0C0A]' : 'text-[#6B7269] hover:text-[#0A0C0A]'
                  }`}
                >
                  <span>{link.name}</span>

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6C8E68] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Direct Desk & Booking Action */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href="tel:+915550000000"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[#0A0C0A] hover:text-[#6C8E68] transition-all px-3.5 py-1.5 rounded-full hover:bg-[#E7F1E5] active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-[#6C8E68]" />
              <span>+91 (555) 000-0000</span>
            </a>

            <MagneticButton
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-full bg-[#0A0C0A] text-white text-xs font-semibold tracking-[0.1em] uppercase hover:text-[#0A0C0A] transition-colors active:scale-[0.98] whitespace-nowrap shrink-0 border border-[#0A0C0A] shadow-xs group"
            >
              <span className="relative z-10">BOOK YOUR VISIT</span>
              <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#0A0C0A] hover:bg-[#E7F1E5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFD8BB] cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with Staggered Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 lg:hidden bg-white/98 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8"
          >
            <div className="flex flex-col gap-6 text-center my-auto">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="font-serif text-2xl text-[#0A0C0A] hover:text-[#6C8E68] transition-colors py-1"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-[#BFD8BB]/40 text-center">
              <a
                href="tel:+915550000000"
                className="text-sm font-semibold tracking-wider text-[#0A0C0A] flex items-center justify-center gap-2 py-2"
              >
                <Phone className="w-4 h-4 text-[#6C8E68]" />
                +91 (555) 000-0000
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
