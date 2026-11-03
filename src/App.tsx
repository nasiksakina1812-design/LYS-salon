/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PhilosophyBanner } from './components/PhilosophyBanner';
import { CuratedJourney } from './components/CuratedJourney';
import { ServicesDossier } from './components/ServicesDossier';
import { SensoryInterlude } from './components/SensoryInterlude';
import { SpaceArchitecture } from './components/SpaceArchitecture';
import { PatronReviews } from './components/PatronReviews';
import { ReservationsSection } from './components/ReservationsSection';
import { Footer } from './components/Footer';
import { ServiceItem } from './types';

// Signature Luxury Animation Primitives & Providers
import { BrandLoader } from './components/animations/BrandLoader';
import { SmoothScrollProvider } from './components/animations/SmoothScrollProvider';
import { ScrollStorytelling } from './components/animations/ScrollStorytelling';
import { SectionDividerWave } from './components/animations/SectionDividerWave';
import { ANIMATION_CONFIG } from './components/animations/animationConfig';

// Code-split modals so their bundle is only downloaded on demand
const BookingModal = React.lazy(() =>
  import('./components/BookingModal').then((m) => ({ default: m.BookingModal }))
);
const SpaceViewerModal = React.lazy(() =>
  import('./components/SpaceViewerModal').then((m) => ({ default: m.SpaceViewerModal }))
);

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSpaceViewerOpen, setIsSpaceViewerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOpenBooking = useCallback(() => {
    setSelectedService(null);
    setIsBookingOpen(true);
  }, []);

  const handleCloseBooking = useCallback(() => {
    setIsBookingOpen(false);
  }, []);

  const handleOpenSpaceViewer = useCallback(() => {
    setIsSpaceViewerOpen(true);
  }, []);

  const handleCloseSpaceViewer = useCallback(() => {
    setIsSpaceViewerOpen(false);
  }, []);

  const handleSelectServiceItem = useCallback((service: ServiceItem) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  }, []);

  const handleSelectServiceByName = useCallback((serviceName: string) => {
    setSelectedService({
      id: 'quick-select',
      name: serviceName,
      price: serviceName.includes('Sculpting') ? '₹ 2,800+' : '₹ 3,400+',
      duration: serviceName.includes('Sculpting') ? '60 - 90 min' : '75 min',
      category: 'Curated Ritual',
    });
    setIsBookingOpen(true);
  }, []);

  const isModalActive = isBookingOpen || isSpaceViewerOpen;

  return (
    <SmoothScrollProvider isModalOpen={isModalActive}>
      {/* 10. LOADER: Elegant intro (<2.5s) with thin drawn line, comb sweep, and brand unveil */}
      {ANIMATION_CONFIG.features.enableBrandLoader && <BrandLoader />}

      <div className="min-h-screen bg-white text-[#0A0C0A] flex flex-col font-sans selection:bg-[#BFD8BB] selection:text-[#0A0C0A]">
        {/* Navigation */}
        <Navbar onOpenBooking={handleOpenBooking} />

        <main className="flex-1">
          {/* 2. HERO SECTION with Flowing Hair Strands & Shifting Gradient Mesh */}
          <Hero onOpenBooking={handleOpenBooking} />

          {/* 9. SECTION TRANSITION: Organic Hair Swoop from White to Deep Obsidian */}
          <SectionDividerWave
            fromColor="#FFFFFF"
            toColor="#0A0C0A"
            variant="hairSwoop"
            className="-mb-[1px]"
          />

          {/* Philosophy Dark Green Banner */}
          <PhilosophyBanner />

          {/* 9. SECTION TRANSITION: Hair Swoop from Obsidian to Soft Mint */}
          <SectionDividerWave
            fromColor="#0A0C0A"
            toColor="#F6F9F5"
            variant="hairSwoop"
            className="-mt-[1px] -mb-[1px]"
          />

          {/* 7. CURATED JOURNEY with Fanned Card Stack & 5. Before/After Scissor Slider */}
          <CuratedJourney
            onSelectService={handleSelectServiceByName}
            onOpenSpaceViewer={handleOpenSpaceViewer}
          />

          {/* 9. SECTION TRANSITION: Flowing Hair Silhouette into Ritual Storytelling */}
          <SectionDividerWave
            fromColor="#F6F9F5"
            toColor="#0A0C0A"
            variant="hairSwoop"
            className="-mb-[1px]"
          />

          {/* 8. SCROLL STORYTELLING: Pinned 5-Step Continuous Journey with Dynamic Progress Line */}
          <ScrollStorytelling onOpenBooking={handleOpenBooking} />

          {/* 9. SECTION TRANSITION: Hair Swoop from Obsidian back to White */}
          <SectionDividerWave
            fromColor="#0A0C0A"
            toColor="#FFFFFF"
            variant="hairSwoop"
            className="-mt-[1px] -mb-[1px]"
          />

          {/* Services Dossier (Accordions 01-05) */}
          <ServicesDossier
            onSelectServiceItem={handleSelectServiceItem}
            onOpenBooking={handleOpenBooking}
          />

          {/* Sensory Interlude: Interactive Fluid Touch Canvas */}
          <SensoryInterlude />

          {/* Space & Architecture Section */}
          <SpaceArchitecture onOpenSpaceViewer={handleOpenSpaceViewer} />

          {/* 11. PATRON REVIEWS with Floating Sparkles & Infinite Marquee that slows on hover */}
          <PatronReviews />

          {/* Reservations & Location */}
          <ReservationsSection onOpenBooking={handleOpenBooking} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Code-split Modals with Suspense fallback */}
        <Suspense fallback={null}>
          {isBookingOpen && (
            <BookingModal
              isOpen={isBookingOpen}
              onClose={handleCloseBooking}
              preselectedService={selectedService}
            />
          )}
          {isSpaceViewerOpen && (
            <SpaceViewerModal
              isOpen={isSpaceViewerOpen}
              onClose={handleCloseSpaceViewer}
            />
          )}
        </Suspense>
      </div>
    </SmoothScrollProvider>
  );
}
