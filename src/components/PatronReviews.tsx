import React, { useState } from 'react';
import { Star, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { ReviewItem } from '../types';

const reviewsData: ReviewItem[] = [
  {
    id: '1',
    author: 'Ananya M.',
    rating: 5,
    date: '2 weeks ago',
    serviceCategory: 'Artisan Colour & Balayage',
    comment:
      'The aesthetic of this salon is unmatched in Lower Parel. It feels like an art gallery, but the stylists take so much time to understand hair texture. My balayage turned out so soft and effortless.',
    verified: true,
  },
  {
    id: '2',
    author: 'Rohan K.',
    rating: 5,
    date: '1 month ago',
    serviceCategory: 'Sensory Spa & Head Spa',
    comment:
      'Hands down the best head spa in South Mumbai. You step off Senapati Bapat Marg into total serene calm. The scalp therapy and massage relieve weeks of desk tension.',
    verified: true,
  },
  {
    id: '3',
    author: 'Dr. Meera P.',
    rating: 5,
    date: '3 weeks ago',
    serviceCategory: 'Hair Craft & Couture Cuts',
    comment:
      'The 1-on-1 consultation here is genuinely unlike any typical salon. No rushing, no pushy upsells—just genuine care for strand health and face shape framing. Truly a sanctuary.',
    verified: true,
  },
  {
    id: '4',
    author: 'Zoya K.',
    rating: 5,
    date: '2 months ago',
    serviceCategory: 'Skin & Barrier Restoration',
    comment:
      'The botanical facial sculpt gave my skin the most insane dewy glass finish without any redness. The complimentary hot botanical tea at the end is such a thoughtful ritual.',
    verified: true,
  },
];

export const PatronReviews: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviewsData : reviewsData.slice(0, 2);

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Verified Google Rating Card */}
          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#F6F9F5] border border-[#BFD8BB] text-center shadow-[0_20px_40px_-20px_rgba(10,12,10,0.06)] flex flex-col items-center">
              {/* Shield Badge */}
              <div className="w-12 h-12 rounded-full bg-[#E7F1E5] border border-[#BFD8BB] flex items-center justify-center text-[#0A0C0A] mb-5">
                <ShieldCheck className="w-6 h-6 text-[#6C8E68]" />
              </div>

              <span className="text-[10px] font-semibold tracking-[0.24em] text-[#6B7269] uppercase mb-4">
                VERIFIED GOOGLE RATING
              </span>

              {/* Big Numerical Score */}
              <div className="font-serif text-5xl sm:text-6xl font-normal text-[#0A0C0A] tracking-tight mb-2">
                4.9 <span className="text-3xl text-[#6B7269] font-light">/ 5</span>
              </div>

              {/* 5 Stars */}
              <div className="flex items-center gap-1.5 text-[#0A0C0A] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#0A0C0A]" />
                ))}
              </div>

              <h3 className="font-serif text-lg font-medium text-[#0A0C0A] mb-3">
                507 Verified Google Reviews
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#6B7269] leading-relaxed max-w-xs mb-8">
                Independent, unfiltered reviews from patrons celebrating
                transformations at our Lower Parel retreat.
              </p>

              <a
                href="https://maps.google.com/?q=LYS+Salon+Spa+Lower+Parel+Janata+Estate"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A0C0A] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#BFD8BB] hover:text-[#0A0C0A] transition-colors border border-[#0A0C0A]"
              >
                <span>READ ON GOOGLE MAPS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Patron Testimonials List */}
          <div className="lg:col-span-7">
            <span className="block text-[11px] font-semibold tracking-[0.22em] text-[#6B7269] uppercase mb-3">
              PATRON TESTIMONIALS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#0A0C0A] mb-6">
              Good experiences speak for themselves.
            </h2>
            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#6B7269] mb-10">
              We cultivate a culture of uncompromising craft and unhurried
              hospitality. Here is what our community experiences when they love
              their soul.
            </p>

            {/* Testimonials List */}
            <div className="space-y-4">
              {displayedReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-[#BFD8BB] shadow-xs transition-all hover:border-[#6C8E68]"
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
                </div>
              ))}
            </div>

            {/* Toggle More Reviews Button */}
            <div className="mt-6 text-center sm:text-left">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-xs font-semibold tracking-wider text-[#0A0C0A] hover:text-[#6C8E68] underline underline-offset-4 cursor-pointer"
              >
                {showAll ? 'Show Fewer Reviews' : 'View More Verified Patron Reviews (2 more)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
