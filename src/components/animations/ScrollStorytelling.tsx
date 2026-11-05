import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Scissors, Droplets, Wind, Sparkle, Eye } from 'lucide-react';
import { motion, useScroll } from 'motion/react';
import { ANIMATION_CONFIG } from './animationConfig';
import { SmartImage } from '../SmartImage';
import { MaskedHeadingReveal } from './MaskedHeadingReveal';

interface RitualStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  sensoryNotes: string[];
  image: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ritualSteps: RitualStep[] = [
  {
    number: '01',
    title: 'Consultation & Silhouette Study',
    subtitle: 'Aesthetic Architecture & Facial Framing',
    description:
      'Before a single strand is parted, we analyze your bone structure, natural wave pattern, daily lifestyle, and aesthetic intentions over a warm cup of botanical tea.',
    sensoryNotes: ['Bergamot', 'Cedarwood'],
    image:
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format,compress&fit=crop&w=900&q=80&fm=webp',
    icon: Sparkles,
  },
  {
    number: '02',
    title: 'Botanical Wash & Follicle Steam',
    subtitle: 'Dimly-Lit Scalp Sanctuary',
    description:
      'Recline in ergonomic wash recliners under acoustic stillness. Japanese micro-bubble water cleanses the scalp, followed by steam mist infused with essential oils.',
    sensoryNotes: ['Hinoki Wood', 'Peppermint', 'Tea Tree'],
    image:
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format,compress&fit=crop&w=900&q=80&fm=webp',
    icon: Droplets,
  },
  {
    number: '03',
    title: 'Architectural Scissor Cut',
    subtitle: 'Precision Strand Weight Distribution',
    description:
      'Using Japanese cobalt steel shears, our master stylists sculpt internal weight, creating movement that naturally falls into place without requiring hours of daily effort.',
    sensoryNotes: ['Organic Botanical Balm'],
    image:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format,compress&fit=crop&w=900&q=80&fm=webp',
    icon: Scissors,
  },
  {
    number: '04',
    title: 'Thermal Styling & Parisian Finish',
    subtitle: 'Restorative Blowout & Lived-in Texture',
    description:
      'A heat-protective botanical barrier is misted before sculpting soft, buoyant waves or glass-smooth sheets that reflect architectural light.',
    sensoryNotes: ['Neroli', 'White Orchid'],
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format,compress&fit=crop&w=900&q=80&fm=webp',
    icon: Wind,
  },
  {
    number: '05',
    title: 'The Mirror Reveal',
    subtitle: 'Aesthetic Stillness & Ritual Maintenance',
    description:
      'Turn to our 360° illuminated mirror. We review your personalized at-home ritual dossier and maintenance schedule to ensure your finish stays luminous for weeks.',
    sensoryNotes: ['Jasmine Infusion Tea'],
    image:
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format,compress&fit=crop&w=900&q=80&fm=webp',
    icon: Eye,
  },
];

export const ScrollStorytelling: React.FC<{ onOpenBooking?: () => void }> = ({
  onOpenBooking,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active step only when index changes to prevent re-render cascades
  useEffect(() => {
    let currentStepIndex = 0;
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const stepIndex = Math.min(
        ritualSteps.length - 1,
        Math.floor(latest * ritualSteps.length)
      );
      if (stepIndex !== currentStepIndex) {
        currentStepIndex = stepIndex;
        setActiveStep(stepIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentStep = ritualSteps[activeStep];
  const StepIcon = currentStep.icon;

  return (
    <section
      ref={containerRef}
      id="ritual-journey"
      className="relative bg-[#0A0C0A] text-white py-24 lg:py-32 selection:bg-[#BFD8BB] selection:text-[#0A0C0A] border-y border-[#BFD8BB]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-3 text-[11px] font-semibold tracking-[0.22em] text-[#BFD8BB] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#BFD8BB]" />
            <span>THE 5-STEP BESPOKE RITUAL</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
            <MaskedHeadingReveal
              as="span"
              className="text-white"
              highlightWords={['sensory', 'journey']}
            >
              From consultation to reveal: A continuous sensory journey.
            </MaskedHeadingReveal>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#BFD8BB]/80 mt-4 leading-relaxed">
            Every appointment at our salon is choreographed as an intentional transition
            from urban rush to absolute restorative stillness.
          </p>
        </div>

        {/* Pinned Two-Column Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          {/* Left Column: Progress Line & Milestones */}
          <div className="lg:col-span-5 relative">
            {/* Dynamic Vertical SVG Progress Line using GPU scaleY */}
            <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-white/10 hidden sm:block overflow-hidden">
              <motion.div
                className="w-full h-full bg-gradient-to-b from-[#BFD8BB] via-[#E7F1E5] to-[#6C8E68] origin-top"
                style={{ scaleY: scrollYProgress }}
              />
            </div>

            {/* Step Milestones */}
            <div className="space-y-6 sm:space-y-8 relative">
              {ritualSteps.map((step, index) => {
                const isActive = activeStep === index;
                const isPassed = activeStep > index;
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    onClick={() => setActiveStep(index)}
                    className={`relative flex items-start gap-5 p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white/10 border-[#BFD8BB] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                        : isPassed
                        ? 'bg-transparent border-white/5 opacity-60 hover:opacity-80'
                        : 'bg-transparent border-white/5 opacity-40 hover:opacity-70'
                    }`}
                  >
                    {/* Step Milestone Bubble */}
                    <div
                      className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isActive
                          ? 'bg-[#BFD8BB] text-[#0A0C0A] border-[#BFD8BB] shadow-[0_0_16px_rgba(191,216,187,0.8)] scale-110'
                          : isPassed
                          ? 'bg-white/20 text-[#BFD8BB] border-[#BFD8BB]/40'
                          : 'bg-white/5 text-white/50 border-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Step Text Summary */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-[#BFD8BB] font-semibold tracking-wider">
                          STEP {step.number}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full bg-[#BFD8BB]/20 text-[#BFD8BB] text-[9px] font-semibold uppercase tracking-wider">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <h4
                        className={`font-serif text-base sm:text-lg transition-colors ${
                          isActive ? 'text-white font-medium' : 'text-white/80'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#E7F1E5]/70 line-clamp-2 mt-1">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Hero Visual & Expanded Narrative */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden border border-[#BFD8BB]/30 bg-white/5 backdrop-blur-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] p-6 sm:p-8">
              {/* Atmospheric Glow */}
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#BFD8BB]/15 blur-3xl pointer-events-none" />

              {/* Step Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-6 bg-white/5 border border-white/10">
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />

                {/* Floating Sensory Badge */}
                <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-[#0A0C0A]/80 backdrop-blur-md border border-[#BFD8BB]/40 text-[#BFD8BB] text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>STEP {currentStep.number} OF 05</span>
                </div>
              </div>

              {/* Step Detail Narrative */}
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#BFD8BB] block mb-1">
                  {currentStep.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3">
                  {currentStep.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed mb-6 font-normal">
                  {currentStep.description}
                </p>

                {/* Sensory Notes */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-white/50">
                    SENSORY PROFILE:
                  </span>
                  {currentStep.sensoryNotes.map((note) => (
                    <span
                      key={note}
                      className="px-2.5 py-1 rounded-full bg-white/10 border border-[#BFD8BB]/30 text-white text-[11px] font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
