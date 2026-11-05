import React, { useState } from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { ReviewItem } from '../../types';
import { ANIMATION_CONFIG } from './animationConfig';

interface InfiniteTestimonialMarqueeProps {
  reviews: ReviewItem[];
  className?: string;
}

export const InfiniteTestimonialMarquee: React.FC<InfiniteTestimonialMarqueeProps> = ({
  reviews,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items for a seamless infinite loop
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full overflow-hidden py-4 ${className}`}
    >
      {/* Side gradient feathering for smooth fade in/out */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div
        className="flex items-stretch gap-6 w-max will-change-transform"
        style={{
          animation: `marqueeScroll ${
            isHovered
              ? ANIMATION_CONFIG.timing.marqueeSlowSpeed
              : ANIMATION_CONFIG.timing.marqueeSpeed
          }s linear infinite`,
        }}
      >
        {duplicatedReviews.map((review, i) => (
          <div
            key={`${review.id}-${i}`}
            className="w-[320px] sm:w-[380px] p-6 rounded-2xl bg-[#F6F9F5] border border-[#BFD8BB] flex flex-col justify-between shrink-0 shadow-xs hover:border-[#0A0C0A] hover:bg-white transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-3.5 h-3.5 fill-[#0A0C0A] text-[#0A0C0A]"
                    />
                  ))}
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-[10px] font-medium text-[#6C8E68]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Patron</span>
                  </div>
                )}
              </div>
              <p className="font-serif italic text-sm text-[#0A0C0A] leading-relaxed mb-4">
                "{review.comment}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#BFD8BB]/50 text-xs">
              <span className="font-sans font-semibold text-[#0A0C0A]">
                {review.author}
              </span>
              <span className="text-[11px] text-[#6B7269]">
                {review.serviceCategory}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};
