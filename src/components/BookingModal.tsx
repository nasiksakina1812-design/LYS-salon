import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ServiceItem } from '../types';
import { LUXURY_EASE } from './animations/MotionPrimitives';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedService, setSelectedService] = useState<string>(
    preselectedService?.name || 'Architectural Strand Sculpting'
  );
  const [selectedPrice, setSelectedPrice] = useState<string>(
    preselectedService?.price || '₹ 3,500+'
  );
  const [selectedDuration, setSelectedDuration] = useState<string>(
    preselectedService?.duration || '60 min'
  );

  const dates = [
    { label: 'Today', day: '22 Oct', weekday: 'Thu' },
    { label: 'Tomorrow', day: '23 Oct', weekday: 'Fri' },
    { label: 'Weekend', day: '24 Oct', weekday: 'Sat' },
    { label: 'Weekend', day: '25 Oct', weekday: 'Sun' },
    { label: 'Weekday', day: '27 Oct', weekday: 'Tue' },
  ];

  const timeSlots = [
    '10:30 AM',
    '12:00 PM',
    '02:15 PM',
    '04:00 PM',
    '05:30 PM',
    '07:00 PM',
  ];

  const sensoryAromas = [
    { name: 'Bergamot & Cedarwood', desc: 'Calming mental clarity & focus' },
    { name: 'Hinoki Wood & Yuzu', desc: 'Japanese spa steam bath relaxation' },
    { name: 'Rose Otto & Frankincense', desc: 'Deep cellular restoration' },
    { name: 'Fragrance-Free Pure', desc: 'Hypoallergenic botanical balance' },
  ];

  const [selectedDate, setSelectedDate] = useState('23 Oct');
  const [selectedTime, setSelectedTime] = useState('12:00 PM');
  const [selectedAroma, setSelectedAroma] = useState('Bergamot & Cedarwood');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService.name);
      setSelectedPrice(preselectedService.price);
      setSelectedDuration(preselectedService.duration);
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackToHome = () => {
    setIsSubmitted(false);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestPhone.trim()) return;
    setIsSubmitted(true);
  };

  const progressScore = React.useMemo(() => {
    let score = 25;
    if (selectedDate && selectedTime) score += 25;
    if (selectedAroma) score += 20;
    if (guestName.trim().length > 1) score += 15;
    if (guestPhone.trim().length >= 8) score += 15;
    return Math.min(100, score);
  }, [selectedDate, selectedTime, selectedAroma, guestName, guestPhone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#0A0C0A]/75 backdrop-blur-xs overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleBackToHome();
      }}
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.3, ease: LUXURY_EASE }}
        className="relative w-full max-w-4xl max-h-[94vh] sm:max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl border border-[#BFD8BB] shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Sticky Top Navigation Bar with Clear "Back to Home" & Clickable Logo */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-[#F6F9F5] border-b border-[#BFD8BB]/50 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Back to Home Button */}
            <button
              type="button"
              onClick={handleBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#BFD8BB] bg-white text-[#0A0C0A] hover:bg-[#E7F1E5] hover:border-[#6C8E68] transition-all text-xs font-semibold cursor-pointer shadow-xs active:scale-95 group shrink-0"
              aria-label="Back to Homepage"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#6C8E68] transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </button>

            {/* Clickable Brand Logo */}
            <button
              type="button"
              onClick={handleBackToHome}
              className="flex items-baseline gap-1.5 cursor-pointer group text-left truncate"
              title="Return to Homepage"
            >
              <span className="font-serif text-base sm:text-lg font-medium tracking-tight text-[#0A0C0A] group-hover:text-[#6C8E68] transition-colors truncate">
                YOUR SALON
              </span>
              <span className="text-[9px] tracking-[0.2em] font-semibold text-[#6B7269] uppercase hidden md:inline shrink-0">
                SALON & SPA
              </span>
            </button>
          </div>

          {/* Right Header Elements: Progress indicator & Close Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white border border-[#BFD8BB]/70 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#6C8E68]" />
              <span className="text-[10px] font-bold text-[#0A0C0A] tabular-nums">
                {progressScore}% Complete
              </span>
            </div>

            <button
              type="button"
              onClick={handleBackToHome}
              className="w-8 h-8 rounded-full bg-white border border-[#BFD8BB] flex items-center justify-center text-[#6B7269] hover:text-[#0A0C0A] hover:bg-[#E7F1E5] transition-colors cursor-pointer"
              aria-label="Close"
              title="Close and return to Homepage"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 overscroll-contain">
          {isSubmitted ? (
            <div className="p-6 sm:p-10 text-center max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#E7F1E5] border border-[#BFD8BB] flex items-center justify-center text-[#0A0C0A] mx-auto mb-4">
                <Check className="w-7 h-7 text-[#6C8E68]" />
              </div>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#6C8E68] uppercase font-bold">
                CONFIRMATION NO. #YSN-8492
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-normal text-[#0A0C0A] mt-1.5 mb-2">
                Your ritual is reserved.
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#6B7269] mb-6 leading-relaxed">
                We look forward to welcoming you to our sanctuary on{' '}
                <strong className="text-[#0A0C0A] font-semibold">{selectedDate}</strong> at{' '}
                <strong className="text-[#0A0C0A] font-semibold">{selectedTime}</strong> for{' '}
                <strong className="text-[#0A0C0A] font-semibold">{selectedService}</strong>.
              </p>

              <div className="p-4 rounded-xl bg-[#F6F9F5] border border-[#BFD8BB] text-left text-xs mb-6 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6B7269]">Ritual</span>
                  <span className="font-medium text-[#0A0C0A]">{selectedService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7269]">Aromatherapy</span>
                  <span className="font-medium text-[#0A0C0A]">{selectedAroma}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7269]">Patron Name</span>
                  <span className="font-medium text-[#0A0C0A]">{guestName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7269]">Desk Contact</span>
                  <span className="font-bold text-[#0A0C0A]">+91 (555) 000-0000</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleBackToHome}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#0A0C0A] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#BFD8BB] hover:text-[#0A0C0A] transition-colors cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-start">
              {/* Left Column: Ritual + Schedule + Aromatherapy */}
              <div className="md:col-span-6 space-y-4">
                {/* Step 1: Selected Treatment */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-bold tracking-[0.16em] text-[#6B7269] uppercase">
                      1. Selected Treatment
                    </label>
                    <span className="text-[10px] text-[#6C8E68] font-semibold uppercase">
                      Concierge Ritual
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F6F9F5] border border-[#BFD8BB] flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <h4 className="font-serif text-sm sm:text-base font-medium text-[#0A0C0A] truncate">
                        {selectedService}
                      </h4>
                      <span className="text-[11px] text-[#6B7269]">{selectedDuration} Profile</span>
                    </div>
                    <span className="font-sans text-xs sm:text-sm font-bold text-[#0A0C0A] shrink-0 tabular-nums px-2.5 py-1 rounded-md bg-white border border-[#BFD8BB]/70">
                      {selectedPrice}
                    </span>
                  </div>
                </div>

                {/* Step 2: Date & Time Selection */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-bold tracking-[0.16em] text-[#6B7269] uppercase">
                      2. Select Date & Slot
                    </label>
                    <span className="text-[10px] text-[#6B7269] flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3 text-[#6C8E68]" />
                      October 2026
                    </span>
                  </div>

                  {/* Compact Date Chips */}
                  <div className="grid grid-cols-5 gap-1.5 mb-2.5">
                    {dates.map((d) => {
                      const isSelected = selectedDate === d.day;
                      return (
                        <button
                          key={d.day}
                          type="button"
                          onClick={() => setSelectedDate(d.day)}
                          className={`p-1.5 sm:p-2 rounded-lg border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#E7F1E5] border-[#0A0C0A] text-[#0A0C0A] shadow-xs font-semibold'
                              : 'bg-white border-[#BFD8BB]/80 text-[#0A0C0A] hover:bg-[#F6F9F5]'
                          }`}
                        >
                          <span className="block text-[8px] font-semibold uppercase text-[#6B7269] leading-tight">
                            {d.weekday}
                          </span>
                          <span className="font-serif text-xs sm:text-sm font-medium">{d.day.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Compact Time Slots */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-1.5 px-1 text-center rounded-lg border text-[11px] font-sans transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#0A0C0A] text-white border-[#0A0C0A] shadow-xs font-semibold'
                              : 'bg-white border-[#BFD8BB]/80 text-[#0A0C0A] hover:bg-[#E7F1E5]'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Complimentary Sensory Aromatherapy */}
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.16em] text-[#6B7269] uppercase mb-1.5">
                    3. Aromatherapy Infusion (Complimentary)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {sensoryAromas.map((aroma) => {
                      const isSelected = selectedAroma === aroma.name;
                      return (
                        <button
                          key={aroma.name}
                          type="button"
                          onClick={() => setSelectedAroma(aroma.name)}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#E7F1E5] border-[#0A0C0A] text-[#0A0C0A] shadow-xs'
                              : 'bg-white border-[#BFD8BB]/80 text-[#0A0C0A] hover:bg-[#F6F9F5]'
                          }`}
                        >
                          <span className="font-serif text-xs font-semibold block text-[#0A0C0A] truncate">
                            {aroma.name}
                          </span>
                          <span className="text-[10px] text-[#6B7269] block truncate mt-0.5">
                            {aroma.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Patron Details & Submission */}
              <div className="md:col-span-6 space-y-3.5 flex flex-col justify-between h-full">
                <div>
                  <label className="block text-[10px] font-bold tracking-[0.16em] text-[#6B7269] uppercase mb-1.5">
                    4. Patron Contact Details
                  </label>
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Full Name */}
                      <div>
                        <label htmlFor="guestName" className="block text-[10px] font-semibold text-[#0A0C0A] uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <input
                          id="guestName"
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="e.g. Victoria Sterling"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#BFD8BB] text-xs sm:text-sm text-[#0A0C0A] focus:outline-none focus:border-[#0A0C0A] focus:ring-1 focus:ring-[#0A0C0A]/10 transition-all placeholder:text-[#6B7269]/60"
                        />
                      </div>

                      {/* WhatsApp / Phone */}
                      <div>
                        <label htmlFor="guestPhone" className="block text-[10px] font-semibold text-[#0A0C0A] uppercase tracking-wider mb-1">
                          WhatsApp / Phone *
                        </label>
                        <input
                          id="guestPhone"
                          type="tel"
                          required
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+91 000 000 0000"
                          className="w-full px-3 py-2 rounded-xl bg-white border border-[#BFD8BB] text-xs sm:text-sm text-[#0A0C0A] focus:outline-none focus:border-[#0A0C0A] focus:ring-1 focus:ring-[#0A0C0A]/10 transition-all placeholder:text-[#6B7269]/60"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="guestEmail" className="block text-[10px] font-semibold text-[#0A0C0A] uppercase tracking-wider mb-1">
                        Email (Calendar Sync)
                      </label>
                      <input
                        id="guestEmail"
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#BFD8BB] text-xs sm:text-sm text-[#0A0C0A] focus:outline-none focus:border-[#0A0C0A] focus:ring-1 focus:ring-[#0A0C0A]/10 transition-all placeholder:text-[#6B7269]/60"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label htmlFor="specialNotes" className="block text-[10px] font-semibold text-[#0A0C0A] uppercase tracking-wider mb-1">
                        Hair / Scalp Notes for Stylist
                      </label>
                      <textarea
                        id="specialNotes"
                        rows={2}
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        placeholder="Notes for aesthetician (e.g. sensitive scalp, toner preference)..."
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#BFD8BB] text-xs sm:text-sm text-[#0A0C0A] focus:outline-none focus:border-[#0A0C0A] focus:ring-1 focus:ring-[#0A0C0A]/10 transition-all resize-none placeholder:text-[#6B7269]/60"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#0A0C0A] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#BFD8BB] hover:text-[#0A0C0A] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.99] border border-[#0A0C0A] group"
                  >
                    <span>Confirm Concierge Reservation</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <p className="text-center text-[10px] text-[#6B7269] mt-2">
                    No advance deposit required · Immediate confirmation sent
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
