import { FormEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar, Check, Clock, X } from 'lucide-react';
import { PROJECT_CATEGORIES, ProjectCategory } from '../data/projects';

interface SprintBookingDrawerProps {
  isOpen: boolean;
  initialTab: 'brief' | 'call';
  prefilledCategory?: ProjectCategory;
  prefilledProjectTitle?: string;
  onClose: () => void;
}

const CATEGORIES: ProjectCategory[] = PROJECT_CATEGORIES;

const CALL_DAYS = ['Tomorrow', 'In 48 Hours', 'Next Monday'];
const CALL_SLOTS = ['10:00 EST', '11:30 EST', '14:00 EST', '16:30 EST'];

export function SprintBookingDrawer({
  isOpen,
  initialTab,
  prefilledCategory,
  prefilledProjectTitle,
  onClose,
}: SprintBookingDrawerProps) {
  const [activeTab, setActiveTab] = useState<'brief' | 'call'>(initialTab);
  const [category, setCategory] = useState<ProjectCategory>(
    prefilledCategory || PROJECT_CATEGORIES[0],
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brandName, setBrandName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDay, setSelectedDay] = useState(CALL_DAYS[0]);
  const [selectedSlot, setSelectedSlot] = useState(CALL_SLOTS[1]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<{
    code: string;
    mode: 'brief' | 'call';
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setActiveTab(initialTab);
    if (prefilledCategory) setCategory(prefilledCategory);
    if (prefilledProjectTitle) {
      setNotes(
        `Selected Design Direction: ${prefilledProjectTitle} — tailored to our brand within 24 hours.`,
      );
    }
    setErrorMsg(null);
  }, [isOpen, initialTab, prefilledCategory, prefilledProjectTitle]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter your name and a valid work email address.');
      return;
    }
    setErrorMsg(null);
    const randomCode = `FRM-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef({ code: randomCode, mode: activeTab });
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setErrorMsg(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="sprint-drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex justify-end bg-black/65"
          role="dialog"
          aria-modal="true"
          aria-label="FORMA 24h Sprint Brief & Discovery Call Scheduler"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-[540px] flex-col overflow-y-auto bg-[#F7F5F0] p-6 text-[#1C1B18] md:p-9"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#1C1B18]/10 pb-5">
              <div>
                <p className="text-[11px] font-medium tracking-[0.06em] text-[#C98A3A]">
                  FORMA · 24H SPRINT DESK
                </p>
                <h2 className="display-tight mt-1.5 text-[28px] leading-[1.08] font-semibold">
                  {activeTab === 'brief'
                    ? 'Initiate a 24h Sprint'
                    : 'Book a 15-min call'}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close booking drawer"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1C1B18]/12 bg-white text-[#1C1B18] transition-colors hover:bg-[#1C1B18] hover:text-[#F7F5F0]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tab Switcher */}
            {!submittedRef && (
              <div
                role="tablist"
                aria-label="Booking mode"
                className="mt-5 grid grid-cols-2 rounded-full border border-[#1C1B18]/10 bg-white p-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'brief'}
                  onClick={() => {
                    setActiveTab('brief');
                    setErrorMsg(null);
                  }}
                  className={`rounded-full py-2 text-[12px] font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'brief'
                      ? 'bg-[#1C1B18] text-[#F7F5F0]'
                      : 'text-[#1C1B18]/70 hover:text-[#1C1B18]'
                  }`}
                >
                  24h Sprint Brief
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'call'}
                  onClick={() => {
                    setActiveTab('call');
                    setErrorMsg(null);
                  }}
                  className={`rounded-full py-2 text-[12px] font-medium whitespace-nowrap transition-colors ${
                    activeTab === 'call'
                      ? 'bg-[#1C1B18] text-[#F7F5F0]'
                      : 'text-[#1C1B18]/70 hover:text-[#1C1B18]'
                  }`}
                >
                  15-Min Discovery Call
                </button>
              </div>
            )}

            {/* Confirmed State */}
            {submittedRef ? (
              <div className="my-auto py-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C98A3A] text-white">
                  <Check className="h-6 w-6" />
                </div>

                <p className="font-mono-tabular mt-6 text-[11px] font-medium text-[#1C1B18]/60">
                  RESERVATION {submittedRef.code}
                </p>
                <h3 className="display-tight mt-2 text-[28px] leading-[1.1] font-semibold">
                  {submittedRef.mode === 'call'
                    ? `Confirmed for ${selectedDay}, ${selectedSlot}`
                    : 'Your 24h sprint brief is locked'}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-[#1C1B18]/75">
                  Thank you, {name}. Our New York editorial lead has received your{' '}
                  {category} specification{brandName ? ` for ${brandName}` : ''} and
                  sent calendar & sprint onboarding details to{' '}
                  <span className="font-medium text-[#1C1B18]">{email}</span>.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-10 items-center justify-center rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold text-[#F7F5F0] transition-colors hover:bg-[#C98A3A]"
                  >
                    Return to portfolio
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-[#1C1B18]/15 bg-white px-5 text-[12px] font-medium text-[#1C1B18] transition-colors hover:bg-[#1C1B18]/5"
                  >
                    Submit another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-1 flex-col gap-5">
                {prefilledProjectTitle && (
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-[#C98A3A]/35 bg-[#C98A3A]/10 px-4 py-2.5 text-[12px]">
                    <span className="text-[#1C1B18]/75">Selected Direction</span>
                    <span className="font-semibold text-[#1C1B18]">
                      {prefilledProjectTitle}
                    </span>
                  </div>
                )}

                {/* Discipline Selector */}
                <div>
                  <label className="block text-[12px] font-medium text-[#1C1B18]/70">
                    Business Category
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {CATEGORIES.map((item) => {
                      const active = category === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setCategory(item)}
                          className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium whitespace-nowrap transition-colors ${
                            active
                              ? 'border-[#1C1B18] bg-[#1C1B18] text-[#F7F5F0]'
                              : 'border-[#1C1B18]/15 bg-white text-[#1C1B18]/75 hover:border-[#1C1B18]/40'
                          }`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Call Scheduler Controls */}
                {activeTab === 'call' && (
                  <div className="rounded-xl border border-[#1C1B18]/10 bg-white p-4">
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[#1C1B18]">
                      <Calendar className="h-3.5 w-3.5 text-[#C98A3A]" />
                      <span>Select Window</span>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {CALL_DAYS.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setSelectedDay(day)}
                          className={`rounded-lg border px-2.5 py-2 text-[12px] font-medium transition-colors ${
                            selectedDay === day
                              ? 'border-[#1C1B18] bg-[#1C1B18] text-[#F7F5F0]'
                              : 'border-[#1C1B18]/10 bg-[#F7F5F0] text-[#1C1B18]/75 hover:border-[#1C1B18]/30'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[#1C1B18]">
                      <Clock className="h-3.5 w-3.5 text-[#C98A3A]" />
                      <span>15-Min Slot (New York Time)</span>
                    </div>
                    <div className="mt-2.5 grid grid-cols-2 gap-2">
                      {CALL_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`font-mono-tabular rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors ${
                            selectedSlot === slot
                              ? 'border-[#C98A3A] bg-[#C98A3A] text-white'
                              : 'border-[#1C1B18]/10 bg-[#F7F5F0] text-[#1C1B18]/80 hover:border-[#1C1B18]/30'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Identity Inputs */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="sprint-name"
                      className="block text-[12px] font-medium text-[#1C1B18]/70"
                    >
                      Your Name *
                    </label>
                    <input
                      id="sprint-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="mt-1.5 h-10 w-full rounded-lg border border-[#1C1B18]/15 bg-white px-3 text-[13px] text-[#1C1B18] placeholder:text-[#1C1B18]/35 focus:border-[#1C1B18] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sprint-email"
                      className="block text-[12px] font-medium text-[#1C1B18]/70"
                    >
                      Work Email *
                    </label>
                    <input
                      id="sprint-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="mt-1.5 h-10 w-full rounded-lg border border-[#1C1B18]/15 bg-white px-3 text-[13px] text-[#1C1B18] placeholder:text-[#1C1B18]/35 focus:border-[#1C1B18] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sprint-brand"
                    className="block text-[12px] font-medium text-[#1C1B18]/70"
                  >
                    Company / Brand Name
                  </label>
                  <input
                    id="sprint-brand"
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Your company or studio name"
                    className="mt-1.5 h-10 w-full rounded-lg border border-[#1C1B18]/15 bg-white px-3 text-[13px] text-[#1C1B18] placeholder:text-[#1C1B18]/35 focus:border-[#1C1B18] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sprint-notes"
                    className="block text-[12px] font-medium text-[#1C1B18]/70"
                  >
                    Project Goals &amp; Brand Notes
                  </label>
                  <textarea
                    id="sprint-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share your business, preferred design direction, key pages, and target launch date..."
                    className="mt-1.5 w-full resize-none rounded-lg border border-[#1C1B18]/15 bg-white p-3 text-[13px] text-[#1C1B18] placeholder:text-[#1C1B18]/35 focus:border-[#1C1B18] focus:outline-none"
                  />
                </div>

                {errorMsg && (
                  <p role="alert" className="text-[12px] font-medium text-[#B34329]">
                    {errorMsg}
                  </p>
                )}

                <div className="mt-auto border-t border-[#1C1B18]/10 pt-5">
                  <button
                    type="submit"
                    className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#1C1B18] px-6 text-[13px] font-semibold text-[#F7F5F0] transition-colors hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
                  >
                    {activeTab === 'brief'
                      ? 'Reserve 24-Hour Sprint'
                      : `Confirm ${selectedDay} · ${selectedSlot}`}
                  </button>
                  <p className="mt-3 text-center text-[11px] text-[#1C1B18]/55">
                    Fixed-scope 24h delivery · Direct senior partner execution
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
