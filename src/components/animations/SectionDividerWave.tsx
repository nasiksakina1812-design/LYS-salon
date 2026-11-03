import React from 'react';

interface SectionDividerWaveProps {
  fromColor?: string;
  toColor?: string;
  variant?: 'hairSwoop' | 'wave' | 'arch';
  flipY?: boolean;
  className?: string;
}

export const SectionDividerWave: React.FC<SectionDividerWaveProps> = ({
  fromColor = 'transparent',
  toColor = '#F6F9F5',
  variant = 'hairSwoop',
  flipY = false,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none pointer-events-none z-10 ${className}`}
      style={{
        transform: flipY ? 'scaleY(-1)' : undefined,
      }}
    >
      {variant === 'hairSwoop' && (
        <svg
          className="relative block w-full h-12 sm:h-16 md:h-20"
          viewBox="0 0 1440 96"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Subtle secondary flowing hair underlayer */}
          <path
            d="M0,32 C320,80 520,10 820,54 C1120,98 1280,30 1440,64 L1440,96 L0,96 Z"
            fill={toColor}
            opacity="0.5"
          />
          {/* Primary organic flowing hair silhouette curve */}
          <path
            d="M0,48 C280,10 560,90 920,32 C1200,-15 1360,60 1440,48 L1440,96 L0,96 Z"
            fill={toColor}
          />
        </svg>
      )}

      {variant === 'wave' && (
        <svg
          className="relative block w-full h-10 sm:h-14"
          viewBox="0 0 1440 60"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,24 C360,54 720,6 1080,42 C1260,60 1380,30 1440,36 L1440,60 L0,60 Z"
            fill={toColor}
          />
        </svg>
      )}

      {variant === 'arch' && (
        <svg
          className="relative block w-full h-12 sm:h-16"
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z"
            fill={toColor}
          />
        </svg>
      )}
    </div>
  );
};
