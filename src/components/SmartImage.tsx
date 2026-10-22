import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  containerClassName?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt = 'Visual presentation',
  className = '',
  containerClassName = '',
  fallbackTitle,
  fallbackSubtitle,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white via-[#F4F8F3] to-[#E7F1E5] border border-[#BFD8BB]/60 text-center overflow-hidden ${containerClassName} ${className}`}
      >
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0A0C0A_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0A0C0A] mb-3 z-10 border border-[#BFD8BB]">
          <Sparkles className="w-5 h-5 text-[#0A0C0A]" />
        </div>
        {fallbackTitle && (
          <h4 className="font-serif text-[#0A0C0A] text-base font-medium z-10">
            {fallbackTitle}
          </h4>
        )}
        {fallbackSubtitle && (
          <p className="font-sans text-xs text-[#6B7269] mt-1 max-w-[220px] z-10">
            {fallbackSubtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[#E7F1E5] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`transition-opacity duration-700 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
