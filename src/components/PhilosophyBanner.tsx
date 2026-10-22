import React from 'react';

export const PhilosophyBanner: React.FC = () => {
  const pillars = [
    { label: 'CONSULTATION', value: '1-on-1 Atelier' },
    { label: 'FORMULATIONS', value: 'Clean Botanicals' },
    { label: 'SETTING', value: 'Acoustic Serenity' },
    { label: 'REPUTATION', value: '4.9 Star Sanctuary' },
  ];

  return (
    <section
      id="philosophy"
      className="relative bg-[#0A0C0A] text-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Soft pastel green aura in dark space */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#BFD8BB]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#BFD8BB]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-8 text-center z-10">
        {/* Eyebrow */}
        <p className="text-[11px] font-semibold tracking-[0.25em] text-[#BFD8BB] uppercase mb-4">
          THE PHILOSOPHY · LYS
        </p>

        {/* Display Headline */}
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-2">
          MORE THAN A LOOK.
        </h2>
        <div className="font-serif text-3xl sm:text-4xl lg:text-5xl italic font-normal text-[#BFD8BB] mb-8">
          love your soul.
        </div>

        {/* Body Text */}
        <p className="font-sans text-sm sm:text-base lg:text-lg leading-relaxed text-[#E7F1E5] max-w-2xl mx-auto mb-16 font-light">
          Beauty is deeply personal. It is the quiet confidence you carry, the
          sacred care you bestow upon yourself, and the sensory rituals that
          return you to your natural balance.
        </p>

        {/* 4 Pillars Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {pillars.map((pillar) => (
            <div
              key={pillar.label}
              className="p-5 rounded-xl bg-[#141714] border border-[#BFD8BB]/30 backdrop-blur-xs flex flex-col items-center justify-center text-center transition-all hover:border-[#BFD8BB] hover:bg-[#1A1F1A]"
            >
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] text-[#BFD8BB] uppercase mb-1.5">
                {pillar.label}
              </span>
              <span className="font-sans text-sm sm:text-base font-medium text-white tracking-tight">
                {pillar.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
