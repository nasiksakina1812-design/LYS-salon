/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Luxury Salon & Spa Template - Animation Architecture Configuration
 * Centralized settings for timing, easing curves, brand palettes, and feature flags.
 * Modify these parameters to calibrate motion aesthetics across the entire site.
 */

export const ANIMATION_CONFIG = {
  // Global timing constants in seconds
  timing: {
    // Brand intro loader duration (under 2.5s)
    loaderDuration: 2.2,
    loaderExitDuration: 0.65,

    // Scissor cursor snip duration
    scissorSnip: 0.16,
    scissorParticleLifetime: 0.85,

    // Text reveals: staggered duration per character/word
    textWordDuration: 0.85,
    textCharStagger: 0.02,
    textWordStagger: 0.035,

    // Mirror image vertical reveal & light sweep
    mirrorRevealDuration: 1.15,
    mirrorGlareDuration: 0.9,

    // Magnetic button spring responsiveness
    magneticStrength: 0.35,
    magneticRadius: 75, // pixels

    // Styling card fan spread & hover lift
    cardFanDuration: 0.8,
    cardTiltMax: 7, // degrees

    // Storytelling scroll pin scrubbing speed
    storytellingTransition: 0.6,

    // Testimonial infinite marquee speed (seconds per cycle)
    marqueeSpeed: 38,
    marqueeSlowSpeed: 110, // speed on hover
  },

  // Bespoke luxury easing curves
  easing: {
    // Custom luxury cubic bezier: crisp responsive attack with silky decelerating finish
    luxury: [0.16, 1, 0.3, 1] as const,
    luxuryCss: 'cubic-bezier(0.16, 1, 0.3, 1)',

    // GSAP string equivalents
    gsapLuxury: 'power4.out',
    gsapSmooth: 'power3.out',
    expoInOut: 'expo.inOut',
    hairBreeze: 'sine.inOut',
  },

  // Brand motion color palette
  colors: {
    obsidian: '#0A0C0A',
    pastelSage: '#BFD8BB',
    paleMint: '#E7F1E5',
    subtleCanvas: '#F6F9F5',
    deepForest: '#162217',
    pureWhite: '#FFFFFF',
    editorialMuted: '#6B7269',
    goldAccent: '#D4AF37',
    hairStrandHighlight: 'rgba(191, 216, 187, 0.55)',
    mirrorGlare: 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%)',
  },

  // Feature switches & runtime flags
  features: {
    enableCustomCursor: false,
    enableLenisSmoothScroll: true,
    enableHeroHairStrands: true,
    enableMirrorImageGlairs: true,
    enableScissorSlider: true,
    enableMagneticButtons: true,
    enableServiceCardFan: true,
    enableScrollStorytelling: true,
    enableSectionCurvedTransitions: true,
    enableBrandLoader: true,
    enableMicroSparkles: true,
    enableTestimonialMarquee: true,
  },
} as const;
