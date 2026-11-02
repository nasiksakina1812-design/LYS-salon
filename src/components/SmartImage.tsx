import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  containerClassName?: string;
  priority?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt = 'Visual presentation',
  className = '',
  containerClassName = '',
  fallbackTitle,
  fallbackSubtitle,
  priority = false,
  loading,
  decoding,
  fetchPriority,
  width,
  height,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // If image is already cached in memory, mark as loaded immediately to avoid flash
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  // Optimize Unsplash image URL with modern WebP compression if not already formatted
  const optimizedSrc = React.useMemo(() => {
    if (!src || typeof src !== 'string') return src;
    if (src.includes('images.unsplash.com') && !src.includes('fm=')) {
      const separator = src.includes('?') ? '&' : '?';
      return `${src}${separator}auto=format,compress&fm=webp&q=80`;
    }
    return src;
  }, [src]);

  if (error || !optimizedSrc) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white via-[#F4F8F3] to-[#E7F1E5] border border-[#BFD8BB]/60 text-center overflow-hidden ${containerClassName} ${className}`}
        style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
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

  const computedLoading = priority ? 'eager' : (loading || 'lazy');
  const computedDecoding = priority ? 'sync' : (decoding || 'async');
  const computedFetchPriority = priority ? 'high' : (fetchPriority || 'auto');

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      style={width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      {!loaded && !priority && (
        <div className="absolute inset-0 bg-[#E7F1E5] animate-pulse pointer-events-none transition-opacity duration-300" />
      )}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={computedLoading}
        decoding={computedDecoding}
        // @ts-expect-error React 19 types support fetchPriority, fallback for strict TS
        fetchpriority={computedFetchPriority}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`transition-opacity duration-500 ease-out ${
          loaded || priority ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
