import React, { useState, useEffect } from 'react';
import { X, Check, Calendar, ArrowRight } from 'lucide-react';
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
    preselectedService?.price || '₹ 2,800+'
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
    { name: 'Bergamot & Cedarwood', desc: 'Calming mental clarity & grounded focus' },
    { name: 'Hinoki Wood & Yuzu', desc: 'Japanese spa steam bath relaxation' },
    { name: 'Rose Otto & Frankincense', desc: 'Deep cellular restoration & grounding' },
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
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const progressScore = React.useMemo(() => {
    let score = 25;
    if (selectedDate && selectedTime) score += 25;
    if (selectedAroma) score += 20;
    if (guestName.trim().length > 1) score += 15;
    if (guestPhone.trim().length >= 8) score += 15;
    return Math.min(100, score);
  }, [selectedDate, selectedTime, selectedAroma, guestName, guestPhone]);

  const circumference = 2 * Math.PI * 15;
  const strokeDashoffset = circumference - (progressScore / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A0C0A]/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.35, ease: LUXURY_EASE }}
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#BFD8BB] shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Header with Live Progress Ring */}
        <div className="p-6 sm:p-8 bg-[#F6F9F5] border-b border-[#BFD8BB]/50 flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-semibold tracking-[0.2em] text-[#6B7269] uppercase">
              CONCIERGE RESERVATION
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#0A0C0A] mt-0.5">
              Curate Your Sanctuary Visit
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* SVG Circular Progress Ring */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#BFD8BB] shadow-xs">
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  className="stroke-[#E7F1E5]"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  className="stroke-[#0A0C0A] transition-all duration-500 ease-out"
                  strokeWidth="3"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="text-right">
                <span className="block text-[10px] font-bold text-[#0A0C0A] tabular-nums">
                  {progressScore}%
                </span>
                <span className="block text-[8px] tracking-wider text-[#6B7269] uppercase">
                  READY
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white border border-[#BFD8BB] flex items-center justify-center text-[#6B7269] hover:text-[#0A0C0A] hover:bg-[#E7F1E5] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#E7F1E5] border border-[#BFD8BB] flex items-center justify-center text-[#0A0C0A] mx-auto mb-6">
              <Check className="w-8 h-8 text-[#6C8E68]" />
            </div>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#6C8E68] uppercase font-bold">
              CONFIRMATION NO. #LYS-8492
            </span>
            <h4 className="font-serif text-3xl font-normal text-[#0A0C0A] mt-2 mb-3">
              Your ritual is reserved.
            </h4>
            <p className="font-sans text-sm text-[#6B7269] max-w-md mx-auto mb-8 leading-relaxed">
              We look forward to welcoming you to our Lower Parel sanctuary on{' '}
              <strong className="text-[#0A0C0A] font-semibold">{selectedDate}</strong> at{' '}
              <strong className="text-[#0A0C0A] font-semibold">{selectedTime}</strong> for{' '}
              <strong className="text-[#0A0C0A] font-semibold">{selectedService}</strong>.
            </p>

            <div className="p-5 rounded-2xl bg-[#F6F9F5] border border-[#BFD8BB] max-w-md mx-auto text-left text-xs mb-8 space-y-2">
              <div className="flex justify-between">
                <span className="text-[#6B7269]">Ritual</span>
                <span className="font-medium text-[#0A0C0A]">{selectedService}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7269]">Aromatherapy Note</span>
                <span className="font-medium text-[#0A0C0A]">{selectedAroma}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7269]">Patron Name</span>
                <span className="font-medium text-[#0A0C0A]">{guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7269]">Desk Contact</span>
                <span className="font-bold text-[#0A0C0A]">09833535960</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3.5 rounded-full bg-[#0A0C0A] text-white text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#BFD8BB] hover:text-[#0A0C0A] transition-colors cursor-pointer"
            >
              RETURN TO SANCTUARY
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            {/* Step 1: Selected Ritual */}
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.18em] text-[#6B7269] uppercase mb-2">
                1. Selected Treatment
              </label>
              <div className="p-4 rounded-2xl bg-[#F6F9F5] border border-[#BFD8BB] flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg text-[#0A0C0A]">{selectedService}</h4>
                  <span className="text-xs text-[#6B7269]">{selectedDuration} Profile</span>
                </div>
                <span className="font-sans text-sm font-semibold text-[#0A0C0A] tabular-nums">
                  {selectedPrice}
                </span>
              </div>
            </div>

            {/* Step 2: Curated Date & Time Slot Carousel */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-semibold tracking-[0.18em] text-[#6B7269] uppercase">
                  2. Select Date & Concierge Slot
                </label>
                <span className="text-xs text-[#6B7269] flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#6C8E68]" />
                  October 2026
                </span>
              </div>

              {/* Date Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {dates.map((d) => {
                  const isSelected = selectedDate === d.day;
                  return (
                    <button
                      key={d.day}
                      type="button"
                      onClick={() => setSelectedDate(d.day)}
                      className={`px-4 py-2.5 rounded-xl border text-left shrink-0 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E7F1E5] border-[#0A0C0A] text-[#0A0C0A] shadow-xs'
                          : 'bg-white border-[#BFD8BB] text-[#0A0C0A] hover:bg-[#F6F9F5]'
                      }`}
                    >
                      <span className="block text-[9px] font-semibold tracking-wider uppercase text-[#6B7269]">
                        {d.label}
                      </span>
                      <span className="font-serif text-sm font-medium">{d.day}</span>
                    </button>
                  );
                })}
              </div>

              {/* Time Slots Carousel */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-1 text-center rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0A0C0A] text-white border-[#0A0C0A] shadow-xs'
                          : 'bg-white border-[#BFD8BB] text-[#0A0C0A] hover:bg-[#E7F1E5]'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Sensory Aromatherapy Notes */}
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.18em] text-[#6B7269] uppercase mb-2">
                3. Complimentary Sensory Aromatherapy Infusion
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sensoryAromas.map((aroma) => {
                  const isSelected = selectedAroma === aroma.name;
                  return (
                    <button
                      key={aroma.name}
                      type="button"
                      onClick={() => setSelectedAroma(aroma.name)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E7F1E5] border-[#0A0C0A] text-[#0A0C0A]'
                          : 'bg-white border-[#BFD8BB] text-[#0A0C0A] hover:bg-[#F6F9F5]'
                      }`}
                    >
                      <span className="font-serif text-sm font-medium block text-[#0A0C0A]">
                        {aroma.name}
                      </span>
                      <span className="text-[11px] text-[#6B7269] block mt-0.5">
                        {aroma.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Patron Information with Animated Floating Labels */}
            <div className="space-y-4">
              <label className="block text-[11px] font-semibold tracking-[0.18em] text-[#6B7269] uppercase mb-1">
                4. Patron Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name Floating Field */}
                <div className="relative">
                  <input
                    id="guestName"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder=" "
                    className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-[#BFD8BB] text-sm text-[#0A0C0A] focus:outline-none focus:border-[#0A0C0A] focus:ring-1 focus:ring-[#0A0C0A]/10 transition-all"
                  />
                  <label
                    htmlFor="guestName"
                    className="absolute left-4 top-2 text-[10px] uppercase tracking-wider font-semibold text-[#6C8E68] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#6B7269] peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:font-semibold peer-focus:text-[#0A0C0A]"
                  >
                    Full Name *
                  </label>
                </div>

                {/* Contact Phone Floating Field */}
                <div className="relative">
                  <input
                    id="guestPhone"
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder=" "
                    className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-[#BFD8BB] text-sm text-[#0A0C0A] focus:outline-none focus:border-[#0A0C0A] focus:ring-1 focus:ring-[#0A0C0A]/10 transition-all"
                  />
                  <label
                    htmlFor="guestPhone"
                    className="absolute left-4 top-2 text-[10px] uppercase tracking-wider font-semibold text-[#6C8E68] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#6B7269] peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:font-semibold peer-focus:text-[#0A0C0A]"
                  >
                    WhatsApp Contact *
                  </label>
                </div>
              </div>

              {/* Email Floating Field */}
              <div className="relative">
                <input
                  id="guestEmail"
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-[#BFD8BB] text-sm text-[#0A0C0A] focus:outline-none focus:border-[#0A0C0A] focus:ring-1 focus:ring-[#0A0C0A]/10 transition-all"
                />
                <label
                  htmlFor="guestEmail"
                  className="absolute left-4 top-2 text-[10px] uppercase tracking-wider font-semibold text-[#6C8E68] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#6B7269] peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:font-semibold peer-focus:text-[#0A0C0A]"
                >
                  Email Address (for calendar sync)
                </label>
              </div>

              {/* Notes Floating Field */}
              <div className="relative">
                <textarea
                  id="specialNotes"
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder=" "
                  className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-white border border-[#BFD8BB] text-sm text-[#0A0C0A] focus:outline-none focus:border-[#0A0C0A] focus:ring-1 focus:ring-[#0A0C0A]/10 transition-all resize-none"
                />
                <label
                  htmlFor="specialNotes"
                  className="absolute left-4 top-2 text-[10px] uppercase tracking-wider font-semibold text-[#6C8E68] transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#6B7269] peer-placeholder-shown:normal-case peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:font-semibold peer-focus:text-[#0A0C0A]"
                >
                  Specific hair or scalp notes for aesthetician
                </label>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#0A0C0A] text-white text-xs font-semibold tracking-[0.16em] uppercase hover:bg-[#BFD8BB] hover:text-[#0A0C0A] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.99] border border-[#0A0C0A] group"
              >
                <span>CONFIRM CONCIERGE RESERVATION</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="text-center text-[10px] text-[#6B7269] mt-3">
                No advance deposit required. Direct confirmation sent via WhatsApp.
              </p>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
