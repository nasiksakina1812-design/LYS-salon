import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ANIMATION_CONFIG } from './animationConfig';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  isModalOpen?: boolean;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
  isModalOpen = false,
}) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!ANIMATION_CONFIG.features.enableLenisSmoothScroll) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // luxury smooth deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // When a modal is open, pause Lenis to prevent window background scrolling
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isModalOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isModalOpen]);

  return <>{children}</>;
};
