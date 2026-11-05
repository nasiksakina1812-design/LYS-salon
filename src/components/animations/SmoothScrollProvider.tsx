import React, { useEffect } from 'react';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  isModalOpen?: boolean;
}

/**
 * High-performance scroll provider that relies on native browser scrolling
 * for stutter-free 60fps/120fps scrolling on desktop and mobile.
 */
export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({
  children,
  isModalOpen = false,
}) => {
  // Lock body scroll cleanly when modal is active, restore on close
  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
  }, [isModalOpen]);

  return <>{children}</>;
};
