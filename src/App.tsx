/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { BookingModal } from './components/BookingModal';
import { SpaceViewerModal } from './components/SpaceViewerModal';
import { ServiceItem } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSpaceViewerOpen, setIsSpaceViewerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleOpenBooking = () => {
    setSelectedService(null);
    setIsBookingOpen(true);
  };

  const handleSelectServiceItem = (service: ServiceItem) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleSelectServiceByName = (serviceName: string) => {
    setSelectedService({
      id: 'quick-select',
      name: serviceName,
      price: serviceName.includes('Sculpting') ? '₹ 2,800+' : '₹ 3,400+',
      duration: serviceName.includes('Sculpting') ? '60 - 90 min' : '75 min',
      category: 'Curated Ritual',
    });
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0C0A] flex flex-col font-sans selection:bg-[#BFD8BB] selection:text-[#0A0C0A]">
      {/* Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenBooking={handleOpenBooking} />

        {/* Philosophy Dark Green Banner */}
        <PhilosophyBanner />

        {/* Curated Journey (3 Cards) */}
        <CuratedJourney
          onSelectService={handleSelectServiceByName}
          onOpenSpaceViewer={() => setIsSpaceViewerOpen(true)}
        />

        {/* Services Dossier (Accordions 01-05) */}
        <ServicesDossier
          onSelectServiceItem={handleSelectServiceItem}
          onOpenBooking={handleOpenBooking}
        />

        {/* Sensory Interlude: Interactive Fluid Touch Canvas */}
        <SensoryInterlude />

        {/* Space & Architecture Section */}
        <SpaceArchitecture
          onOpenSpaceViewer={() => setIsSpaceViewerOpen(true)}
        />

        {/* Patron Reviews & Google Verified Score */}
        <PatronReviews />

        {/* Reservations & Location */}
        <ReservationsSection onOpenBooking={handleOpenBooking} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Concierge Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={selectedService}
      />

      {/* Architecture Space Walkthrough Modal */}
      <SpaceViewerModal
        isOpen={isSpaceViewerOpen}
        onClose={() => setIsSpaceViewerOpen(false)}
      />
    </div>
  );
}
