import React, { useState } from 'react';
import { Star, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ReviewItem } from '../types';
import { TiltCard, LUXURY_EASE } from './animations/MotionPrimitives';
import { FloatingSparkles } from './animations/FloatingSparkles';
import { InfiniteTestimonialMarquee } from './animations/InfiniteTestimonialMarquee';
import { MaskedHeadingReveal } from './animations/MaskedHeadingReveal';

const reviewsData: ReviewItem[] = [
  {
    id: '1',
    author: 'Sample Client A.',
    rating: 5,
    date: 'Sample Date',
    serviceCategory: 'Artisan Colour & Balayage',
    comment:
      'This is a sample client testimonial. Customize this quote to highlight your master colorists, personalized consultations, and natural balayage results.',
    verified: true,
  },
  {
    id: '2',
    author: 'Sample Client B.',
    rating: 5,
    date: 'Sample Date',
    serviceCategory: 'Sensory Spa & Head Spa',
    comment:
      'Sample review placeholder. Use this space to showcase your calming atmosphere, scalp therapy rituals, and restorative wellness experiences.',
    verified: true,
  },
  {
    id: '3',
    author: 'Sample Client C.',
    rating: 5,
    date: 'Sample Date',
    serviceCategory: 'Hair Craft & Couture Cuts',
    comment:
      'Editable client quote. Feature your precision styling, facial framing consultations, and friendly, welcoming salon team.',
    verified: true,
  },
  {
    id: '4',
    author: 'Sample Client D.',
    rating: 5,
    date: 'Sample Date',
    serviceCategory: 'Skin & Barrier Restoration',
    comment:
      'Sample feedback placeholder. Replace with genuine customer feedback from your Google Reviews, Yelp, Fresha, or booking platform.',
    verified: true,
  },
];

export const PatronReviews: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const displayedReviews = showAll ? reviewsData : reviewsData.slice(0, 2);

  return (
    <section id="reviews" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Floating Sparkle Micro-interactions */}
      <FloatingSparkles count={10} color="#BFD8BB" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Left Column: Editable Rating Card with 3D Tilt */}
          <div className="lg:col-span-5">
            <TiltCard
              maxTilt={4}
              className="p-8 sm:p-10 rounded-3xl bg-[#F6F9F5] border border-[#BFD8BB] text-center shadow-[0_20px_40px_-20px_rgba(10,12,10,0.06)] hover:border-[#6C8E68] flex flex-col items-center group transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle ambient sparkle in card */}
              <div className="absolute top-2 right-2 w-16 h-16 bg-[#BFD8BB]/20 rounded-full blur-xl pointer-events-none" />

              {/* Shield Badge */}
              <div className="w-12 h-12 rounded-full bg-[#E7F1E5] border border-[#BFD8BB] flex items-center justify-center text-[#0A0C0A] mb-5 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="w-6 h-6 text-[#6C8E68]" />
              </div>

              <span className="text-[10px] font-semibold tracking-[0.24em] text-[#6B7269] uppercase mb-4">
                SAMPLE RATING MODULE · EDITABLE
              </span>

              {/* Big Numerical Score */}
              <div className="font-serif text-5xl sm:text-6xl font-normal text-[#0A0C0A] tracking-tight mb-2">
                5.0 <span className="text-3xl text-[#6B7269] font-light">/ 5</span>
              </div>

              {/* 5 Stars with Subtle Stagger Animation */}
              <div className="flex items-center gap-1.5 text-[#0A0C0A] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#0A0C0A] transition-transform duration-300 hover:scale-125"
                  />
                ))}
              </div>

              <h3 className="font-serif text-lg font-medium text-[#0A0C0A] mb-3">
                500+ Sample Client Reviews
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#6B7269] leading-relaxed max-w-xs mb-8">
                Sample rating and reviews placeholder. Easily connect your live
                Google Reviews, Fresha, Vagaro, or Yelp profile.
              </p>

              <a
                href="#reviews"
                className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0C0A] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:text-[#0A0C0A] transition-colors border border-[#0A0C0A] cursor-pointer"
              >
                <span className="absolute inset-0 bg-[#BFD8BB] translate-y-full hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">CONNECT YOUR REVIEWS</span>
                <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </TiltCard>
          </div>

          {/* Right Column: Patron Testimonials List */}
          <div className="lg:col-span-7">
            <span className="block text-[11px] font-semibold tracking-[0.22em] text-[#6B7269] uppercase mb-3">
              CLIENT TESTIMONIALS · SAMPLE TEMPLATE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0A0C0A] mb-6">
              <MaskedHeadingReveal as="span" highlightWords={['experiences']}>
                Good experiences speak for themselves.
              </MaskedHeadingReveal>
            </h2>
            <motion.p
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: LUXURY_EASE }}
              className="font-sans text-sm sm:text-base leading-relaxed text-[#6B7269] mb-10"
            >
              We cultivate a culture of uncompromising craft and unhurried
              hospitality. Here is what our community experiences when they love
              their soul.
            </motion.p>

            {/* Testimonials List with Animated Presence */}
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {displayedReviews.map((review, idx) => (
                  <motion.div
                    key={review.id}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.05,
                      ease: LUXURY_EASE,
                    }}
                    className="p-6 sm:p-7 rounded-2xl bg-white border border-[#BFD8BB] shadow-xs transition-all duration-300 hover:border-[#6C8E68] hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div>
                        <h4 className="font-serif text-base font-medium text-[#0A0C0A]">
                          {review.author}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#6B7269] mt-0.5">
                          <span className="text-[#6C8E68] font-bold">Google Verified</span>
                          <span>·</span>
                          <span>{review.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-[#0A0C0A]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#0A0C0A]" />
                        ))}
                      </div>
                    </div>

                    <p className="font-serif italic text-sm sm:text-base text-[#0A0C0A] leading-relaxed">
                      “{review.comment}”
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Toggle More Reviews Button */}
            <div className="mt-6 text-center sm:text-left">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs font-semibold tracking-wider text-[#0A0C0A] hover:text-[#6C8E68] underline underline-offset-4 cursor-pointer transition-colors active:scale-95"
              >
                {showAll ? 'Show Fewer Reviews' : 'View More Sample Reviews (2 more)'}
              </button>
            </div>
          </div>
        </div>

        {/* Slow Infinite Testimonial Marquee (Slows on hover) */}
        <div className="pt-10 border-t border-[#BFD8BB]/50">
          <div className="text-center mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#6B7269]">
              SAMPLE CLIENT REFLECTIONS · EDITABLE TEMPLATE COMPONENT
            </span>
          </div>
          <InfiniteTestimonialMarquee reviews={reviewsData} />
        </div>
      </div>
    </section>
  );
};
