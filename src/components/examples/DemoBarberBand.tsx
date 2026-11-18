import { useState } from 'react';
import {
  Calendar,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageSquare,
  Moon,
  Plus,
  Scissors,
  Star,
  Sun,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import barberPortraitImg from '../../assets/images/demo_barber_portrait_1794958788770.jpg';
import {
  BARBER_SERVICES,
  BARBER_SLOTS,
  BarberReviewItem,
  DemoLang,
  INITIAL_BARBER_REVIEWS,
} from '../../data/examplesDemosContent';

interface DemoBarberBandProps {
  lang: DemoLang;
  onBuildInStyle: (description: string) => void;
}

export function DemoBarberBand({ lang, onBuildInStyle }: DemoBarberBandProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isDark, setIsDark] = useState(true);
  const [activeNavIdx, setActiveNavIdx] = useState(0);
  const [selectedServiceId, setSelectedServiceId] = useState(BARBER_SERVICES[0].id);
  const [selectedSlot, setSelectedSlot] = useState(BARBER_SLOTS[1]);
  const [bookedSlot, setBookedSlot] = useState<string | null>(null);

  const [reviews, setReviews] = useState<BarberReviewItem[]>(INITIAL_BARBER_REVIEWS);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [reviewDir, setReviewDir] = useState<1 | -1>(1);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewerText, setNewReviewerText] = useState('');

  const activeService =
    BARBER_SERVICES.find((s) => s.id === selectedServiceId) ?? BARBER_SERVICES[0];
  const currentReview = reviews[reviewIdx] ?? reviews[0];

  const handleAddSampleReview = (e: React.FormEvent) => {
    e.preventDefault();
    const author = newReviewerName.trim() || 'Sander Meijer';
    const body =
      newReviewerText.trim() ||
      (lang === 'nl'
        ? 'Super strakke overloop en ontspannen sfeer. Kom zeker terug!'
        : 'Super clean taper and relaxed studio vibe. Definitely coming back!');

    const created: BarberReviewItem = {
      id: `rev-${Date.now()}`,
      author,
      rating: 5,
      date: { nl: 'Zojuist', en: 'Just now' },
      text: { nl: body, en: body },
    };

    setReviews((prev) => [created, ...prev]);
    setReviewDir(-1);
    setReviewIdx(0);
    setNewReviewerName('');
    setNewReviewerText('');
    setShowAddReview(false);
  };

  const scrollToConsole = () => {
    document
      .getElementById('barber-interactive-console')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const navItems = [
    { label: lang === 'nl' ? 'Behandelingen' : 'Services', icon: Scissors },
    { label: lang === 'nl' ? 'Galerij' : 'Gallery', icon: Camera },
    { label: lang === 'nl' ? 'Reviews' : 'Reviews', icon: Star },
    { label: lang === 'nl' ? 'Contact' : 'Contact', icon: MessageSquare },
  ];

  const t = {
    nl: {
      demoTag: 'Demo 03 · Herenkapsalon & Barbershop',
      ctaNav: 'Reserveren',
      ctaNavDesktop: 'Stoel reserveren',
      headline: 'EEN STIJL DIE VOOR ZICH SPREEKT',
      sub: 'Strakke fades, verzorgde baarden en traditionele aandacht in een moderne Rotterdamse herenzaak.',
      ctaHero: 'Afspraak maken',
      buildThis: 'Bouw in deze Barber-stijl →',
      highlights: ['Fade & Schaarwerk', 'Hot Towel Scheerbeurt', 'Persoonlijk Advies'],
      ratingLabel: '4.9/5 · 320+ Google reviews',
      consoleBookTitle: 'Direct Behandeling & Tijdstip Kiezen',
      consoleReviewTitle: 'Interactieve Google Reviews Widget',
      confirmBtn: 'Bevestig via WhatsApp →',
      confirmedText: 'Gereserveerd:',
      addReviewBtn: '+ Test-review plaatsen',
      saveReviewBtn: 'Toevoegen aan reviews',
      namePh: 'Jouw naam',
      textPh: 'Korte ervaring...',
      themeLabel: isDark ? 'Wissel naar lichte barbershop-modus' : 'Wissel naar donkere barbershop-modus',
    },
    en: {
      demoTag: 'Demo 03 · Modern Barber & Grooming Lounge',
      ctaNav: 'Book chair',
      ctaNavDesktop: 'Book a chair',
      headline: 'A CUT THAT SPEAKS FOR ITSELF',
      sub: 'Precision fades, tailored beard shaping, and calm craftsmanship in a sharp charcoal-and-crimson grooming studio.',
      ctaHero: 'Reserve your slot',
      buildThis: 'Build in this Barber style →',
      highlights: ['Precision Fades', 'Hot Towel Shave', 'Tailored Styling'],
      ratingLabel: '4.9/5 · 320+ Google reviews',
      consoleBookTitle: 'Live Treatment & Time Slot Picker',
      consoleReviewTitle: 'Interactive Google Reviews Widget',
      confirmBtn: 'Confirm via WhatsApp →',
      confirmedText: 'Reserved:',
      addReviewBtn: '+ Add test review',
      saveReviewBtn: 'Post review',
      namePh: 'Your name',
      textPh: 'Short review note...',
      themeLabel: isDark ? 'Switch to light ivory mode' : 'Switch to dark charcoal mode',
    },
  }[lang];

  const renderThemeSwitch = () => (
    <button
      type="button"
      onClick={() => setIsDark((prev) => !prev)}
      aria-label={t.themeLabel}
      aria-pressed={isDark}
      className={`inline-flex h-8 items-center gap-0.5 rounded-full border p-0.5 transition-colors shrink-0 ${
        isDark
          ? 'border-[#EDE6D8]/16 bg-[#1C1C1C] text-[#EDE6D8]'
          : 'border-[#1C1C1C]/14 bg-[#F5F0E6] text-[#1C1C1C]'
      }`}
    >
      <span
        className={`flex h-6.5 w-6.5 items-center justify-center rounded-full transition-colors ${
          !isDark ? 'bg-white text-[#B3261E] shadow-xs' : 'text-[#EDE6D8]/45'
        }`}
      >
        <Sun className="h-3.5 w-3.5" />
      </span>
      <span
        className={`flex h-6.5 w-6.5 items-center justify-center rounded-full transition-colors ${
          isDark ? 'bg-[#B3261E] text-white shadow-xs' : 'text-[#1C1C1C]/45'
        }`}
      >
        <Moon className="h-3.5 w-3.5" />
      </span>
    </button>
  );

  return (
    <section
      aria-label={t.demoTag}
      className={`font-demo-dmsans relative overflow-hidden rounded-3xl border transition-colors duration-300 ${
        isDark
          ? 'border-[#EDE6D8]/12 bg-[#1C1C1C] text-[#EDE6D8] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]'
          : 'border-[#1C1C1C]/12 bg-[#F5F0E6] text-[#1C1C1C] shadow-[0_24px_60px_-24px_rgba(28,28,28,0.16)]'
      }`}
    >
      {/* Breathing Barber-Red Atmospheric Backlight */}
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [0.92, 1.14, 0.92],
                opacity: isDark ? [0.38, 0.72, 0.38] : [0.16, 0.32, 0.16],
              }
        }
        transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-24 right-0 h-[460px] w-[560px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(179,38,30,0.85) 0%, rgba(179,38,30,0) 70%)',
        }}
      />

      {/* HEADER VARIANT 3: Liquid-Wave Pill Crest + Sun/Moon Toggle */}
      <div className="relative z-10 px-3 pt-3 md:px-8 md:pt-6">
        <header
          className={`relative flex flex-col gap-1.5 overflow-hidden rounded-2xl border px-3.5 py-2 transition-colors duration-300 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:rounded-full lg:px-5 ${
            isDark
              ? 'border-[#EDE6D8]/14 bg-[#111113] shadow-[0_14px_34px_-12px_rgba(0,0,0,0.7)]'
              : 'border-[#1C1C1C]/10 bg-white shadow-[0_12px_30px_-12px_rgba(28,28,28,0.14)]'
          }`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#B3261E]/60 to-transparent"
          />

          <div className="flex items-center justify-between gap-2">
            <a
              href="#demo-barber"
              onClick={(e) => {
                e.preventDefault();
                setActiveNavIdx(0);
                scrollToConsole();
              }}
              className={`font-demo-oswald inline-flex items-center gap-1.5 pl-1 text-[14.5px] font-bold tracking-[0.07em] uppercase whitespace-nowrap shrink-0 md:gap-2 md:text-[17px] ${
                isDark ? 'text-[#EDE6D8]' : 'text-[#1C1C1C]'
              }`}
            >
              <Scissors className="h-3.5 w-3.5 text-[#B3261E] md:h-4 md:w-4" />
              <span>NOORD BARBERS</span>
            </a>

            <div className="flex items-center gap-1.5 lg:hidden">
              {renderThemeSwitch()}
              <button
                type="button"
                onClick={scrollToConsole}
                className="inline-flex h-8 items-center justify-center rounded-full bg-[#B3261E] px-2.5 text-[11px] font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#951E17]"
              >
                {t.ctaNav}
              </button>
            </div>
          </div>

          <nav
            aria-label="Barber sections"
            className={`grid grid-cols-4 gap-1 border-t pt-1 lg:hidden ${
              isDark ? 'border-[#EDE6D8]/8' : 'border-[#1C1C1C]/8'
            }`}
          >
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeNavIdx === idx;
              return (
                <button
                  key={`m-${item.label}`}
                  type="button"
                  onClick={() => {
                    setActiveNavIdx(idx);
                    scrollToConsole();
                  }}
                  className={`relative flex h-8 items-center justify-center transition-colors ${
                    isActive
                      ? isDark
                        ? 'text-[#EDE6D8]'
                        : 'text-[#1C1C1C]'
                      : isDark
                        ? 'text-[#EDE6D8]/55 hover:text-[#EDE6D8]'
                        : 'text-[#1C1C1C]/55 hover:text-[#1C1C1C]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="barber-wave-crest-m"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className="pointer-events-none absolute inset-0"
                    >
                      <div
                        className="absolute inset-x-1 top-1 bottom-0 rounded-t-full opacity-45"
                        style={{
                          background:
                            'radial-gradient(ellipse at bottom, rgba(179,38,30,0.65) 0%, transparent 72%)',
                        }}
                      />
                      <svg
                        viewBox="0 0 120 18"
                        preserveAspectRatio="none"
                        className="absolute inset-x-1 bottom-0 h-3 w-[calc(100%-8px)] overflow-visible"
                      >
                        <path
                          d="M0 17 C24 17 34 3 60 3 C86 3 96 17 120 17"
                          fill="none"
                          stroke="#B3261E"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  )}
                  <Icon
                    className={`relative z-10 h-3.5 w-3.5 ${
                      isActive ? 'text-[#B3261E]' : ''
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeNavIdx === idx;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setActiveNavIdx(idx);
                    scrollToConsole();
                  }}
                  className={`relative inline-flex h-10 items-center gap-2 px-4 text-[12.5px] font-medium whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? isDark
                        ? 'font-semibold text-[#EDE6D8]'
                        : 'font-semibold text-[#1C1C1C]'
                      : isDark
                        ? 'text-[#EDE6D8]/60 hover:text-[#EDE6D8]'
                        : 'text-[#1C1C1C]/60 hover:text-[#1C1C1C]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="barber-wave-crest"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      className="pointer-events-none absolute inset-0"
                    >
                      <div
                        className="absolute inset-x-1 top-1 bottom-0 rounded-t-full opacity-45"
                        style={{
                          background: isDark
                            ? 'radial-gradient(ellipse at bottom, rgba(179,38,30,0.65) 0%, transparent 72%)'
                            : 'radial-gradient(ellipse at bottom, rgba(179,38,30,0.26) 0%, transparent 72%)',
                        }}
                      />
                      <svg
                        viewBox="0 0 120 18"
                        preserveAspectRatio="none"
                        className="absolute inset-x-0 bottom-0 h-3.5 w-full overflow-visible"
                      >
                        <path
                          d="M0 17 C24 17 34 3 60 3 C86 3 96 17 120 17"
                          fill="none"
                          stroke="#B3261E"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  )}
                  <Icon
                    className={`relative z-10 h-3.5 w-3.5 ${
                      isActive ? 'text-[#B3261E]' : ''
                    }`}
                  />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex shrink-0">
            {renderThemeSwitch()}
            <button
              type="button"
              onClick={scrollToConsole}
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#B3261E] px-4.5 text-[12px] font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#951E17]"
            >
              {t.ctaNavDesktop}
            </button>
          </div>
        </header>
      </div>

      {/* HERO SECTION */}
      <div className="relative z-10 px-4 pt-5 pb-5 md:px-10 md:pt-10 md:pb-10">
        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div
              className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] font-medium md:text-[12px] ${
                isDark ? 'text-[#EDE6D8]/60' : 'text-[#1C1C1C]/60'
              }`}
            >
              <span>{t.demoTag}</span>
              <span aria-hidden="true">·</span>
              <span>
                {isDark
                  ? '#1C1C1C · #EDE6D8 · #B3261E'
                  : '#F5F0E6 · #1C1C1C · #B3261E'}
              </span>
            </div>

            <h2
              className={`font-demo-oswald mt-2 max-w-[13ch] text-[clamp(2rem,4.5vw,4rem)] leading-[0.98] font-bold tracking-[-0.01em] uppercase [text-wrap:balance] md:mt-3 ${
                isDark ? 'text-[#EDE6D8]' : 'text-[#1C1C1C]'
              }`}
            >
              {t.headline}
            </h2>

            <p
              className={`mt-2.5 max-w-[42ch] text-[13.5px] leading-[1.55] md:mt-4 md:text-[15.5px] md:leading-[1.6] ${
                isDark ? 'text-[#EDE6D8]/76' : 'text-[#1C1C1C]/76'
              }`}
            >
              {t.sub}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 md:mt-6 md:gap-4">
              <button
                type="button"
                onClick={scrollToConsole}
                className="inline-flex h-10 items-center rounded-full bg-[#B3261E] px-5 text-[13px] font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#951E17] md:h-11 md:px-6 md:text-[13.5px]"
              >
                {t.ctaHero}
              </button>

              <button
                type="button"
                onClick={() =>
                  onBuildInStyle(
                    `Barber Demo (${isDark ? 'Charcoal' : 'Warm Ivory'} & Barber Red) — ${activeService.name[lang]}`,
                  )
                }
                className={`text-[12.5px] font-medium underline-offset-4 transition-colors hover:underline md:text-[13px] ${
                  isDark
                    ? 'text-[#EDE6D8]/75 hover:text-[#EDE6D8]'
                    : 'text-[#1C1C1C]/75 hover:text-[#1C1C1C]'
                }`}
              >
                {t.buildThis}
              </button>
            </div>

            <div
              className={`mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t pt-3 text-[11px] font-medium md:mt-8 md:gap-x-5 md:gap-y-2 md:pt-4 md:text-[12px] ${
                isDark
                  ? 'border-[#EDE6D8]/12 text-[#EDE6D8]/80'
                  : 'border-[#1C1C1C]/12 text-[#1C1C1C]/80'
              }`}
            >
              {t.highlights.map((item, idx) => (
                <span key={item} className="inline-flex items-center gap-2.5 md:gap-3">
                  {idx > 0 && (
                    <span aria-hidden="true" className="text-[#B3261E]">
                      /
                    </span>
                  )}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className={`group relative overflow-hidden rounded-2xl border ${
                isDark
                  ? 'border-[#B3261E]/35 bg-[#141414] shadow-[0_24px_60px_-20px_rgba(179,38,30,0.45)]'
                  : 'border-[#1C1C1C]/12 bg-white shadow-[0_24px_60px_-20px_rgba(28,28,28,0.2)]'
              }`}
            >
              <motion.img
                src={barberPortraitImg}
                alt={
                  lang === 'nl'
                    ? 'Herenkapsalon portret met strakke fade en baard in Barber Red belichting'
                    : 'Editorial studio portrait of clean fade haircut in dark red rim lighting'
                }
                referrerPolicy="no-referrer"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [1, 1.035, 1] }
                }
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="aspect-[16/10] w-full object-cover object-[50%_22%] sm:aspect-[4/3]"
              />
              <div
                className={`relative z-10 flex items-center justify-between border-t px-3.5 py-2 text-[11.5px] md:px-4 md:py-2.5 md:text-[12px] ${
                  isDark
                    ? 'border-[#EDE6D8]/10 bg-[#181818]/95'
                    : 'border-[#1C1C1C]/10 bg-white/95'
                }`}
              >
                <span
                  className={`inline-flex items-center gap-1.5 font-semibold ${
                    isDark ? 'text-[#EDE6D8]' : 'text-[#1C1C1C]'
                  }`}
                >
                  <Star className="h-3.5 w-3.5 fill-[#B3261E] text-[#B3261E]" />
                  <span>{t.ratingLabel}</span>
                </span>
                <span
                  className={`font-mono-tabular text-[11px] ${
                    isDark ? 'text-[#EDE6D8]/55' : 'text-[#1C1C1C]/55'
                  }`}
                >
                  Noord · Rotterdam
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* INTERACTIVE BOOKING + LIVE REVIEW WIDGET */}
        <div
          id="barber-interactive-console"
          className="mt-5 grid grid-cols-1 gap-4 md:mt-8 md:gap-5 lg:grid-cols-12"
        >
          {/* Left 7 cols: Treatment & Slot Selector */}
          <div
            className={`rounded-2xl border p-3.5 transition-colors duration-300 md:p-5 lg:col-span-7 ${
              isDark
                ? 'border-[#EDE6D8]/12 bg-[#242424]'
                : 'border-[#1C1C1C]/12 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 text-[12.5px] font-semibold text-[#B3261E]">
              <Calendar className="h-4 w-4" />
              <span>{t.consoleBookTitle}</span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {BARBER_SERVICES.map((svc) => {
                const active = svc.id === selectedServiceId;
                return (
                  <motion.button
                    key={svc.id}
                    type="button"
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                    animate={{ scale: active && !prefersReducedMotion ? 1.02 : 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                    onClick={() => {
                      setSelectedServiceId(svc.id);
                      setBookedSlot(null);
                    }}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      active
                        ? isDark
                          ? 'border-[#B3261E] bg-[#B3261E]/22 text-[#EDE6D8] shadow-[0_0_24px_-6px_rgba(179,38,30,0.6)]'
                          : 'border-[#B3261E] bg-[#B3261E]/10 text-[#1C1C1C] shadow-[0_0_20px_-8px_rgba(179,38,30,0.35)]'
                        : isDark
                          ? 'border-[#EDE6D8]/10 bg-[#1C1C1C] text-[#EDE6D8]/80 hover:border-[#EDE6D8]/30'
                          : 'border-[#1C1C1C]/10 bg-[#FAF6EE] text-[#1C1C1C]/80 hover:border-[#1C1C1C]/30'
                    }`}
                  >
                    <p className="text-[13px] font-bold">{svc.name[lang]}</p>
                    <p
                      className={`font-mono-tabular mt-1 text-[11.5px] ${
                        isDark ? 'text-[#EDE6D8]/60' : 'text-[#1C1C1C]/60'
                      }`}
                    >
                      {svc.duration} · € {svc.price}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            <div
              className={`mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4 ${
                isDark ? 'border-[#EDE6D8]/10' : 'border-[#1C1C1C]/10'
              }`}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                <Clock
                  className={`mr-1 h-4 w-4 ${
                    isDark ? 'text-[#EDE6D8]/55' : 'text-[#1C1C1C]/55'
                  }`}
                />
                {BARBER_SLOTS.map((slot) => {
                  const activeSlot = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setSelectedSlot(slot);
                        setBookedSlot(null);
                      }}
                      className={`font-mono-tabular relative rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                        activeSlot
                          ? isDark
                            ? 'text-[#1C1C1C]'
                            : 'text-[#F5F0E6]'
                          : isDark
                            ? 'border border-[#EDE6D8]/15 bg-[#1C1C1C] text-[#EDE6D8]/80 hover:border-[#EDE6D8]/40'
                            : 'border border-[#1C1C1C]/15 bg-[#FAF6EE] text-[#1C1C1C]/80 hover:border-[#1C1C1C]/40'
                      }`}
                    >
                      {activeSlot && (
                        <motion.span
                          layoutId="barber-slot-pill"
                          transition={{
                            type: 'spring',
                            stiffness: 460,
                            damping: 30,
                          }}
                          className={`absolute inset-0 rounded-lg ${
                            isDark ? 'bg-[#EDE6D8]' : 'bg-[#1C1C1C]'
                          }`}
                        />
                      )}
                      <span className="relative z-10">{slot}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  setBookedSlot(`${activeService.name[lang]} · ${selectedSlot}`)
                }
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#B3261E] px-5 text-[12.5px] font-semibold text-white whitespace-nowrap transition-transform active:scale-95 hover:bg-[#951E17]"
              >
                <span>{t.confirmBtn}</span>
              </button>
            </div>

            {bookedSlot && (
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={`mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}
              >
                <Check className="h-4 w-4" />
                <span>
                  {t.confirmedText} {bookedSlot} (€ {activeService.price})
                </span>
              </motion.p>
            )}
          </div>

          {/* Right 5 cols: Animated Client Reviews Sandbox */}
          <div
            className={`flex flex-col justify-between rounded-2xl border p-5 transition-colors duration-300 lg:col-span-5 ${
              isDark
                ? 'border-[#EDE6D8]/12 bg-[#242424]'
                : 'border-[#1C1C1C]/12 bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[12.5px] font-semibold ${
                    isDark ? 'text-[#EDE6D8]' : 'text-[#1C1C1C]'
                  }`}
                >
                  {t.consoleReviewTitle}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Previous review"
                    onClick={() => {
                      setReviewDir(-1);
                      setReviewIdx(
                        (idx) => (idx - 1 + reviews.length) % reviews.length,
                      );
                    }}
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-md border ${
                      isDark
                        ? 'border-[#EDE6D8]/15 text-[#EDE6D8]/80 hover:border-[#EDE6D8]/40'
                        : 'border-[#1C1C1C]/15 text-[#1C1C1C]/80 hover:border-[#1C1C1C]/40'
                    }`}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next review"
                    onClick={() => {
                      setReviewDir(1);
                      setReviewIdx((idx) => (idx + 1) % reviews.length);
                    }}
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-md border ${
                      isDark
                        ? 'border-[#EDE6D8]/15 text-[#EDE6D8]/80 hover:border-[#EDE6D8]/40'
                        : 'border-[#1C1C1C]/15 text-[#1C1C1C]/80 hover:border-[#1C1C1C]/40'
                    }`}
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {!showAddReview ? (
                <div className="mt-4 overflow-hidden" style={{ perspective: 700 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentReview.id}
                      initial={
                        prefersReducedMotion
                          ? false
                          : {
                              opacity: 0,
                              x: reviewDir * 44,
                              rotateY: reviewDir * -10,
                              scale: 0.94,
                            }
                      }
                      animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                      exit={
                        prefersReducedMotion
                          ? undefined
                          : {
                              opacity: 0,
                              x: reviewDir * -44,
                              rotateY: reviewDir * 10,
                              scale: 0.94,
                            }
                      }
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`rounded-xl border p-4 shadow-sm ${
                        isDark
                          ? 'border-[#EDE6D8]/14 bg-[#1C1C1C]'
                          : 'border-[#1C1C1C]/12 bg-[#FAF6EE]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5 text-[#B3261E]">
                          {Array.from({ length: currentReview.rating }).map(
                            (_, i) => (
                              <motion.span
                                key={i}
                                initial={
                                  prefersReducedMotion
                                    ? false
                                    : { scale: 0, rotate: -20 }
                                }
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 500,
                                  damping: 20,
                                  delay: prefersReducedMotion ? 0 : i * 0.04,
                                }}
                              >
                                <Star className="h-3.5 w-3.5 fill-current" />
                              </motion.span>
                            ),
                          )}
                        </div>
                        <span
                          className={`text-[11px] ${
                            isDark ? 'text-[#EDE6D8]/50' : 'text-[#1C1C1C]/50'
                          }`}
                        >
                          {currentReview.date[lang]}
                        </span>
                      </div>
                      <p
                        className={`mt-2.5 text-[13.5px] leading-[1.55] ${
                          isDark ? 'text-[#EDE6D8]/90' : 'text-[#1C1C1C]/88'
                        }`}
                      >
                        &ldquo;{currentReview.text[lang]}&rdquo;
                      </p>
                      <p
                        className={`mt-2 text-[12px] font-semibold ${
                          isDark ? 'text-[#EDE6D8]' : 'text-[#1C1C1C]'
                        }`}
                      >
                        — {currentReview.author}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                <form onSubmit={handleAddSampleReview} className="mt-3 space-y-2">
                  <input
                    type="text"
                    value={newReviewerName}
                    onChange={(e) => setNewReviewerName(e.target.value)}
                    placeholder={t.namePh}
                    className={`h-9 w-full rounded-lg border px-3 text-[12.5px] focus:border-[#B3261E] focus:outline-none ${
                      isDark
                        ? 'border-[#EDE6D8]/18 bg-[#1C1C1C] text-[#EDE6D8]'
                        : 'border-[#1C1C1C]/18 bg-[#FAF6EE] text-[#1C1C1C]'
                    }`}
                  />
                  <input
                    type="text"
                    value={newReviewerText}
                    onChange={(e) => setNewReviewerText(e.target.value)}
                    placeholder={t.textPh}
                    className={`h-9 w-full rounded-lg border px-3 text-[12.5px] focus:border-[#B3261E] focus:outline-none ${
                      isDark
                        ? 'border-[#EDE6D8]/18 bg-[#1C1C1C] text-[#EDE6D8]'
                        : 'border-[#1C1C1C]/18 bg-[#FAF6EE] text-[#1C1C1C]'
                    }`}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddReview(false)}
                      className={`px-2.5 text-[11.5px] ${
                        isDark
                          ? 'text-[#EDE6D8]/60 hover:text-[#EDE6D8]'
                          : 'text-[#1C1C1C]/60 hover:text-[#1C1C1C]'
                      }`}
                    >
                      {lang === 'nl' ? 'Annuleer' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-[#B3261E] px-3 py-1.5 text-[11.5px] font-semibold text-white"
                    >
                      {t.saveReviewBtn}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {!showAddReview && (
              <div className="mt-3 flex items-center justify-between text-[11.5px]">
                <span
                  className={`font-mono-tabular ${
                    isDark ? 'text-[#EDE6D8]/50' : 'text-[#1C1C1C]/50'
                  }`}
                >
                  {reviewIdx + 1} / {reviews.length}
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddReview(true)}
                  className={`inline-flex items-center gap-1 font-semibold hover:text-[#B3261E] ${
                    isDark ? 'text-[#EDE6D8]/80' : 'text-[#1C1C1C]/80'
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>{t.addReviewBtn}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
