import { useRef, useState } from 'react';
import {
  Check,
  Gift,
  Heart,
  Minus,
  Moon,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
  Tag,
  Truck,
} from 'lucide-react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import {
  CANDY_BOX_SIZES,
  CANDY_FLAVORS,
  CANDY_REVIEWS,
  DemoLang,
} from '../../data/examplesDemosContent';

interface DemoCandyPopBandProps {
  lang: DemoLang;
  onBuildInStyle: (description: string) => void;
}

export function DemoCandyPopBand({
  lang,
  onBuildInStyle,
}: DemoCandyPopBandProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isDark, setIsDark] = useState(false);
  const [activeNavIdx, setActiveNavIdx] = useState(0);
  const [flavorId, setFlavorId] = useState(CANDY_FLAVORS[0].id);
  const [sizeId, setSizeId] = useState(CANDY_BOX_SIZES[0].id);
  const [qty, setQty] = useState(1);
  const [bagCount, setBagCount] = useState(2);
  const [promoApplied, setPromoApplied] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const rotateX = useSpring(tiltXRaw, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(tiltYRaw, { stiffness: 220, damping: 20 });

  const activeFlavor =
    CANDY_FLAVORS.find((f) => f.id === flavorId) ?? CANDY_FLAVORS[0];
  const activeSize =
    CANDY_BOX_SIZES.find((s) => s.id === sizeId) ?? CANDY_BOX_SIZES[0];

  const baseSubtotal = activeSize.price * qty;
  const discountAmount = promoApplied ? Math.round(baseSubtotal * 0.15) : 0;
  const finalTotal = baseSubtotal - discountAmount;

  const scrollToBuilder = () => {
    document
      .getElementById('candy-pop-shop-tool')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || e.pointerType === 'touch') return;
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    tiltXRaw.set(-ny * 13);
    tiltYRaw.set(nx * 14);
  };

  const handleStagePointerLeave = () => {
    tiltXRaw.set(0);
    tiltYRaw.set(0);
  };

  const handleQuickAdd = () => {
    setBagCount((c) => c + qty);
    setOrderCompleted(true);
  };

  const navItems = [
    { label: lang === 'nl' ? 'Shop Alles' : 'Shop All', icon: ShoppingBag },
    { label: lang === 'nl' ? 'Gift Boxes' : 'Gift Boxes', icon: Gift },
    { label: lang === 'nl' ? 'Reviews' : 'Reviews', icon: Heart },
  ];

  const t = {
    nl: {
      demoTag: 'Demo 06 · Candy Pop 3D Glassy Webshop',
      bagLabel: 'Tas',
      eyebrow: 'Bestseller · Gelimiteerde Batch',
      headlineLead: 'Dagelijks Geluk,',
      headlinePop: 'Glossy Bezorgd.',
      sub: 'Speelse 3D glassy productkaarten, glanzende snoepaccenten en één-klik cadeauverpakking die bezoekers direct laten afrekenen.',
      ctaHero: `Toevoegen — € ${finalTotal} →`,
      freeShip: 'Gratis verzending',
      ratedLabel: '4.9 ★ (2.4K reviews)',
      dispatchLabel: 'Vandaag verzonden',
      wrapLabel: 'Luxe cadeauverpakking',
      toolTitle: 'Interactieve 3D Glossy Candy Box Configurator',
      flavorLabel: 'Kies smaak & glazuurlaag',
      sizeLabel: 'Doosformaat',
      promoLabel: promoApplied ? 'CANDY15 actief (−15%)' : 'Pas −15% code CANDY15 toe',
      checkoutBtn: `Bestel Box (€ ${finalTotal}) →`,
      addedMsg: `${qty}× ${activeSize.label.nl} (${activeFlavor.name.nl}) toegevoegd aan tas!`,
      buildThis: 'Bouw in deze Candy Pop 3D-stijl →',
      themeLabel: isDark
        ? 'Wissel naar lichte parelmoer candy-modus'
        : 'Wissel naar donkere neon-berry candy-modus',
    },
    en: {
      demoTag: 'Demo 06 · Candy Pop 3D Glassy Webshop',
      bagLabel: 'Bag',
      eyebrow: 'Bestseller · Limited Batch',
      headlineLead: 'Daily Joy,',
      headlinePop: 'Glossy Delivered.',
      sub: 'Tactile 3D glassy cards, candy-coated shine bevels, and one-tap treat box checkout crafted to spark impulse gifting.',
      ctaHero: `Add to Bag — € ${finalTotal} →`,
      freeShip: 'Free Shipping',
      ratedLabel: '4.9 ★ (2.4K reviews)',
      dispatchLabel: 'Same-day dispatch',
      wrapLabel: 'Gift wrapped',
      toolTitle: 'Interactive 3D Glossy Treat Box Configurator',
      flavorLabel: 'Pick flavor glaze',
      sizeLabel: 'Box edition',
      promoLabel: promoApplied ? 'CANDY15 active (−15%)' : 'Apply −15% code CANDY15',
      checkoutBtn: `Add to Bag (€ ${finalTotal}) →`,
      addedMsg: `Added ${qty}× ${activeSize.label.en} (${activeFlavor.name.en}) to your bag!`,
      buildThis: 'Build in this Candy Pop 3D style →',
      themeLabel: isDark
        ? 'Switch to pearl candy light mode'
        : 'Switch to midnight berry dark mode',
    },
  }[lang];

  const activeReview = CANDY_REVIEWS[reviewIdx % CANDY_REVIEWS.length];

  const renderThemeSwitch = () => (
    <button
      type="button"
      onClick={() => setIsDark((prev) => !prev)}
      aria-label={t.themeLabel}
      aria-pressed={isDark}
      className={`inline-flex h-8 items-center gap-0.5 rounded-full border p-0.5 backdrop-blur-md transition-colors shrink-0 ${
        isDark
          ? 'border-white/20 bg-white/10 text-white'
          : 'border-white/90 bg-white/75 text-[#1C1917] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]'
      }`}
    >
      <span
        className={`flex h-6.5 w-6.5 items-center justify-center rounded-full transition-colors ${
          !isDark
            ? 'bg-[#FF3B6B] text-white shadow-[0_2px_8px_rgba(255,59,107,0.45)]'
            : 'text-white/50'
        }`}
      >
        <Sun className="h-3.5 w-3.5" />
      </span>
      <span
        className={`flex h-6.5 w-6.5 items-center justify-center rounded-full transition-colors ${
          isDark
            ? 'bg-[#2563EB] text-white shadow-[0_2px_8px_rgba(37,99,235,0.5)]'
            : 'text-[#1C1917]/45'
        }`}
      >
        <Moon className="h-3.5 w-3.5" />
      </span>
    </button>
  );

  return (
    <section
      aria-label={t.demoTag}
      className={`relative overflow-hidden rounded-3xl border transition-colors duration-300 ${
        isDark
          ? 'border-white/15 bg-[#150B1C] text-[#FFFDF7] shadow-[0_28px_70px_-24px_rgba(0,0,0,0.68)]'
          : 'border-white/90 bg-[#FFFDF7] text-[#1C1917] shadow-[0_28px_70px_-24px_rgba(255,59,107,0.22)]'
      }`}
      style={{
        backgroundImage: isDark
          ? `radial-gradient(circle at 18% 18%, rgba(255,59,107,0.30), transparent 46%),
             radial-gradient(circle at 86% 24%, rgba(37,99,235,0.28), transparent 46%),
             radial-gradient(circle at 52% 92%, rgba(52,211,153,0.16), transparent 48%)`
          : `radial-gradient(circle at 14% 16%, rgba(255,59,107,0.18), transparent 44%),
             radial-gradient(circle at 84% 22%, rgba(250,204,21,0.22), transparent 46%),
             radial-gradient(circle at 50% 92%, rgba(52,211,153,0.18), transparent 48%)`,
      }}
    >
      {/* Floating 3D Glossy Candy Spheres (Ambient Depth Layer) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-14 -right-6 h-32 w-32 rounded-full opacity-80 blur-[1px]"
        style={{
          background: `radial-gradient(circle at 30% 28%, #FFFFFF 0%, ${activeFlavor.secondaryHex} 28%, ${activeFlavor.primaryHex} 88%)`,
          boxShadow:
            'inset 0 -10px 18px rgba(0,0,0,0.16), inset 0 6px 12px rgba(255,255,255,0.85)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-12 h-28 w-28 rounded-full opacity-75"
        style={{
          background:
            'radial-gradient(circle at 30% 28%, #FFFFFF 0%, #A7F3D0 32%, #10B981 90%)',
          boxShadow:
            'inset 0 -8px 16px rgba(0,0,0,0.14), inset 0 6px 12px rgba(255,255,255,0.85)',
        }}
      />

      {/* HEADER VARIANT 6: Glossy Candy-Glass Floating Pill Header */}
      <div className="relative z-10 px-3 pt-3 md:px-8 md:pt-6">
        <header
          className={`flex items-center justify-between gap-2 rounded-2xl border px-3.5 py-2 backdrop-blur-xl transition-colors duration-300 md:rounded-full md:px-5 ${
            isDark
              ? 'border-white/18 bg-white/10 shadow-[0_14px_34px_-12px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.25)]'
              : 'border-white/95 bg-white/75 shadow-[0_16px_38px_-14px_rgba(255,59,107,0.20),inset_0_2px_1px_rgba(255,255,255,0.95)]'
          }`}
        >
          <a
            href="#demo-candyshop"
            onClick={(e) => {
              e.preventDefault();
              setActiveNavIdx(0);
              scrollToBuilder();
            }}
            className="inline-flex items-center gap-2 pl-1 whitespace-nowrap shrink-0"
          >
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full shadow-[inset_0_2px_2px_rgba(255,255,255,0.8),0_4px_10px_rgba(255,59,107,0.35)]"
              style={{
                background:
                  'linear-gradient(145deg, #FF7CA0 0%, #FF3B6B 55%, #D91E4E 100%)',
              }}
            >
              <Sparkles className="h-3 w-3 text-white" />
            </span>
            <span className="text-[13px] font-extrabold tracking-[0.04em] uppercase md:text-[15px]">
              GOODS &amp; TREATS
            </span>
          </a>

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
                    scrollToBuilder();
                  }}
                  className={`inline-flex h-8.5 items-center gap-1.5 rounded-full px-3.5 text-[12px] font-semibold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? isDark
                        ? 'bg-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]'
                        : 'bg-[#FF3B6B]/12 text-[#FF3B6B] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]'
                      : isDark
                        ? 'text-white/70 hover:text-white'
                        : 'text-[#1C1917]/70 hover:text-[#1C1917]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {renderThemeSwitch()}

            <motion.button
              key={`candy-bag-${bagCount}`}
              type="button"
              onClick={scrollToBuilder}
              initial={prefersReducedMotion ? false : { scale: 1.16 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex h-8.5 items-center gap-1.5 rounded-full px-3.5 text-[11.5px] font-bold text-white whitespace-nowrap shrink-0"
              style={{
                background:
                  'linear-gradient(180deg, #FF658E 0%, #FF3B6B 55%, #E02454 100%)',
                boxShadow:
                  '0 10px 22px -6px rgba(255,59,107,0.58), inset 0 2px 1px rgba(255,255,255,0.65)',
              }}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="font-mono-tabular">
                {t.bagLabel} ({bagCount})
              </span>
            </motion.button>
          </div>
        </header>
      </div>

      {/* HERO + 3D GLOSSY VITRINE */}
      <div className="relative z-10 px-4 pt-5 pb-5 md:px-10 md:pt-8 md:pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold">
          <span className={isDark ? 'text-white/65' : 'text-[#1C1917]/60'}>
            {t.demoTag} · #FFFDF7 · #FF3B6B · #2563EB · #34D399
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase"
            style={{
              background: isDark
                ? 'rgba(250,204,21,0.2)'
                : 'linear-gradient(180deg, #FEF08A 0%, #FACC15 100%)',
              color: isDark ? '#FDE047' : '#422006',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.8)',
            }}
          >
            <Star className="h-3 w-3 fill-current" />
            <span>{t.eyebrow}</span>
          </span>
        </div>

        <div className="mt-5 grid grid-cols-1 items-center gap-7 lg:grid-cols-12 lg:gap-8">
          {/* Left Hero Story + Glossy Pill Metrics */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'TREATS', bg: '#FACC15', fg: '#422006' },
                { label: 'GIFT BOXES', bg: '#FFDBE6', fg: '#9D174D' },
                { label: 'LIMITED', bg: '#A7F3D0', fg: '#065F46' },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className="rounded-full px-3 py-1 text-[10px] font-extrabold tracking-[0.06em] uppercase"
                  style={{
                    background: tag.bg,
                    color: tag.fg,
                    boxShadow:
                      '0 6px 14px -6px rgba(0,0,0,0.16), inset 0 2px 1px rgba(255,255,255,0.8)',
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.35rem)] leading-[0.98] font-extrabold tracking-[-0.03em]">
              <span className="block">{t.headlineLead}</span>
              <span
                className="block"
                style={{
                  backgroundImage:
                    'linear-gradient(95deg, #FF3B6B 0%, #FF6B95 45%, #2563EB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t.headlinePop}
              </span>
            </h2>

            <p
              className={`mt-3 max-w-lg text-[14px] leading-[1.6] md:text-[15px] ${
                isDark ? 'text-white/75' : 'text-[#1C1917]/75'
              }`}
            >
              {t.sub}
            </p>

            {/* Primary Glossy 3D Jelly CTAs */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleQuickAdd}
                className="inline-flex h-11 items-center justify-center rounded-full px-6 text-[13px] font-extrabold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background:
                    'linear-gradient(180deg, #FF658E 0%, #FF3B6B 55%, #D91E4E 100%)',
                  boxShadow:
                    '0 14px 28px -8px rgba(255,59,107,0.58), inset 0 2px 1px rgba(255,255,255,0.75)',
                }}
              >
                {t.ctaHero}
              </button>

              <span
                className="inline-flex h-11 items-center gap-1.5 rounded-full px-5 text-[12px] font-bold text-white"
                style={{
                  background:
                    'linear-gradient(180deg, #60A5FA 0%, #2563EB 60%, #1D4ED8 100%)',
                  boxShadow:
                    '0 12px 24px -8px rgba(37,99,235,0.5), inset 0 2px 1px rgba(255,255,255,0.68)',
                }}
              >
                <Truck className="h-3.5 w-3.5" />
                <span>{t.freeShip}</span>
              </span>
            </div>

            {/* 3 Candy-Tinted Frosted Glass Benefit Cards */}
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {[
                {
                  top: 'RATED',
                  val: t.ratedLabel,
                  bg: isDark ? 'rgba(250,204,21,0.14)' : 'rgba(254,243,199,0.85)',
                  border: isDark ? 'rgba(250,204,21,0.3)' : 'rgba(255,255,255,0.95)',
                },
                {
                  top: 'DISPATCH',
                  val: t.dispatchLabel,
                  bg: isDark ? 'rgba(52,211,153,0.14)' : 'rgba(209,250,229,0.85)',
                  border: isDark ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.95)',
                },
                {
                  top: 'PACKAGING',
                  val: t.wrapLabel,
                  bg: isDark ? 'rgba(96,165,250,0.16)' : 'rgba(219,234,254,0.85)',
                  border: isDark ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.95)',
                },
              ].map((stat) => (
                <div
                  key={stat.top}
                  className="rounded-2xl border p-3 backdrop-blur-md"
                  style={{
                    background: stat.bg,
                    borderColor: stat.border,
                    boxShadow:
                      '0 12px 24px -14px rgba(0,0,0,0.15), inset 0 2px 1px rgba(255,255,255,0.65)',
                  }}
                >
                  <span className="font-mono-tabular block text-[9px] font-bold tracking-[0.06em] opacity-65 uppercase">
                    {stat.top}
                  </span>
                  <span className="mt-1 block text-[11.5px] font-extrabold leading-snug md:text-[12.5px]">
                    {stat.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Interactive 3D Glossy Treat Box Stage */}
          <div className="lg:col-span-6">
            <div
              ref={stageRef}
              onPointerMove={handleStagePointerMove}
              onPointerLeave={handleStagePointerLeave}
              style={{ perspective: 950 }}
            >
              <motion.div
                style={
                  prefersReducedMotion
                    ? undefined
                    : {
                        rotateX,
                        rotateY,
                        transformStyle: 'preserve-3d',
                      }
                }
                className={`relative rounded-[28px] border p-5 backdrop-blur-xl transition-colors md:p-6 ${
                  isDark
                    ? 'border-white/20 bg-white/10 shadow-[0_28px_60px_-18px_rgba(0,0,0,0.72),inset_0_2px_2px_rgba(255,255,255,0.28)]'
                    : 'border-white bg-white/72 shadow-[0_32px_68px_-20px_rgba(255,59,107,0.26),inset_0_2px_2px_rgba(255,255,255,0.98)]'
                }`}
              >
                {/* Glossy Stage Backdrop */}
                <div
                  className="relative flex aspect-[16/11] w-full items-center justify-center overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: isDark
                      ? 'rgba(255,255,255,0.16)'
                      : 'rgba(255,255,255,0.9)',
                    background: isDark
                      ? `radial-gradient(circle at 30% 25%, ${activeFlavor.primaryHex}55, rgba(20,12,28,0.92) 72%)`
                      : `linear-gradient(135deg, #FFF5F8 0%, #FEF9C3 52%, #DCFCE7 100%)`,
                    boxShadow: 'inset 0 2px 10px rgba(255,255,255,0.55)',
                  }}
                >
                  {/* Top-right Tilted Glossy Bestseller Sticker */}
                  <span
                    className="absolute top-3.5 right-3.5 z-20 rotate-6 rounded-full px-3.5 py-1 text-[10px] font-black tracking-[0.06em] text-[#422006] uppercase"
                    style={{
                      background:
                        'linear-gradient(180deg, #FEF08A 0%, #FACC15 100%)',
                      boxShadow:
                        '0 8px 18px -6px rgba(0,0,0,0.22), inset 0 2px 1px rgba(255,255,255,0.9)',
                    }}
                  >
                    BESTSELLER ★
                  </span>

                  {/* 3D Floating Candy Orbs around Box */}
                  <div
                    aria-hidden="true"
                    className="absolute top-8 left-8 h-10 w-10 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 28%, #FFFFFF 0%, ${activeFlavor.secondaryHex} 34%, ${activeFlavor.primaryHex} 92%)`,
                      boxShadow:
                        '0 12px 20px -8px rgba(0,0,0,0.28), inset 0 2px 2px rgba(255,255,255,0.9)',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute bottom-8 right-10 h-8 w-8 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 28%, #FFFFFF 0%, #93C5FD 34%, ${activeFlavor.ribbonHex} 92%)`,
                      boxShadow:
                        '0 10px 18px -6px rgba(0,0,0,0.24), inset 0 2px 2px rgba(255,255,255,0.9)',
                    }}
                  />

                  {/* Central 3D Glossy Gift Box */}
                  <div
                    className="relative flex flex-col items-center"
                    style={{ transform: 'translateZ(26px)' }}
                  >
                    {/* Ribbon Bow Loops */}
                    <div className="relative -mb-2 flex items-center justify-center">
                      <div
                        className="h-7 w-10 -rotate-12 rounded-full border-2 border-white/80"
                        style={{
                          background: `linear-gradient(160deg, #FFFFFF44, ${activeFlavor.ribbonHex})`,
                          boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.75)',
                        }}
                      />
                      <div
                        className="h-7 w-10 rotate-12 rounded-full border-2 border-white/80"
                        style={{
                          background: `linear-gradient(160deg, #FFFFFF44, ${activeFlavor.ribbonHex})`,
                          boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.75)',
                        }}
                      />
                    </div>

                    {/* Glossy Lid */}
                    <div
                      className="relative z-10 h-9 w-52 rounded-xl border border-white/85 md:w-60"
                      style={{
                        background: `linear-gradient(180deg, #FFFFFF55 0%, ${activeFlavor.primaryHex} 45%, ${activeFlavor.primaryHex}DD 100%)`,
                        boxShadow:
                          '0 10px 24px -8px rgba(0,0,0,0.28), inset 0 3px 2px rgba(255,255,255,0.88)',
                      }}
                    />

                    {/* Glossy Box Body */}
                    <div
                      className="relative flex h-32 w-48 items-center justify-center overflow-hidden rounded-b-2xl border border-t-0 border-white/85 md:h-36 md:w-56"
                      style={{
                        background: `linear-gradient(155deg, #FFFFFFAA 0%, ${activeFlavor.secondaryHex}EE 55%, ${activeFlavor.primaryHex}66 100%)`,
                        boxShadow:
                          '0 24px 36px -14px rgba(28,25,23,0.28), inset 0 2px 4px rgba(255,255,255,0.9)',
                      }}
                    >
                      {/* Vertical Glossy Ribbon */}
                      <div
                        className="absolute inset-y-0 w-7"
                        style={{
                          background: `linear-gradient(90deg, ${activeFlavor.ribbonHex}DD, ${activeFlavor.ribbonHex}, ${activeFlavor.ribbonHex}DD)`,
                          boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.65)',
                        }}
                      />
                      {/* Specular Diagonal Gloss Shine Strip */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-10 -left-10 h-56 w-20 rotate-24 bg-white/35 blur-xs"
                      />

                      {/* Label Plate */}
                      <div className="relative z-10 rounded-xl border border-white bg-white/95 px-4 py-2 text-center shadow-[0_8px_18px_-8px_rgba(0,0,0,0.22)]">
                        <span className="font-mono-tabular block text-[9px] font-bold tracking-[0.14em] text-[#1C1917]/55 uppercase">
                          GOODS &amp; TREATS
                        </span>
                        <span className="mt-0.5 block text-[12px] font-black tracking-[0.06em] text-[#1C1917] uppercase">
                          EDITION N°1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Caption Bar inside 3D Vitrine */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-extrabold">
                      {activeSize.label[lang]} · {activeFlavor.name[lang]}
                    </p>
                    <p className="text-[11.5px] opacity-70">
                      {activeFlavor.tag[lang]}
                    </p>
                  </div>
                  <span
                    className="font-mono-tabular text-[19px] font-black"
                    style={{ color: activeFlavor.primaryHex }}
                  >
                    € {finalTotal},00
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE CANDY POP CONFIGURATOR & CHECKOUT BAR */}
      <div
        id="candy-pop-shop-tool"
        className={`relative z-10 border-t px-4 py-6 backdrop-blur-xl md:px-10 md:py-7 ${
          isDark
            ? 'border-white/12 bg-black/28'
            : 'border-white/90 bg-white/62'
        }`}
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4 lg:max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono-tabular text-[11px] font-bold tracking-[0.06em] text-[#FF3B6B] uppercase">
                {t.toolTitle}
              </span>
            </div>

            {/* Flavor Colorway Glossy Pills */}
            <div>
              <span className="mb-2 block text-[11px] font-bold tracking-[0.04em] opacity-65 uppercase">
                {t.flavorLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {CANDY_FLAVORS.map((flav) => {
                  const selected = flav.id === flavorId;
                  return (
                    <button
                      key={flav.id}
                      type="button"
                      onClick={() => {
                        setFlavorId(flav.id);
                        setOrderCompleted(false);
                      }}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-all ${
                        selected
                          ? isDark
                            ? 'border-white bg-white/18 text-white shadow-[0_8px_20px_-8px_rgba(255,59,107,0.5)]'
                            : 'border-[#1C1917] bg-white text-[#1C1917] shadow-[0_10px_22px_-10px_rgba(0,0,0,0.2)]'
                          : isDark
                            ? 'border-white/15 bg-white/6 text-white/75 hover:bg-white/12'
                            : 'border-white bg-white/75 text-[#1C1917]/75 hover:bg-white'
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]"
                        style={{ backgroundColor: flav.primaryHex }}
                      />
                      <span>{flav.name[lang]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Box Size & Qty + Promo Toggle */}
            <div className="flex flex-wrap items-center gap-2.5">
              {CANDY_BOX_SIZES.map((sz) => {
                const active = sz.id === sizeId;
                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => {
                      setSizeId(sz.id);
                      setOrderCompleted(false);
                    }}
                    className={`rounded-full px-3.5 py-1.5 text-[11.5px] font-bold transition-all ${
                      active
                        ? 'bg-[#1C1917] text-white'
                        : isDark
                          ? 'bg-white/10 text-white/75 hover:bg-white/16'
                          : 'bg-[#1C1917]/6 text-[#1C1917]/78 hover:bg-[#1C1917]/12'
                    }`}
                  >
                    {sz.label[lang]} · €{sz.price}
                  </button>
                );
              })}

              {/* Quantity Stepper */}
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-2 py-1 ${
                  isDark ? 'border-white/20 bg-white/10' : 'border-white bg-white'
                }`}
              >
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/8"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="font-mono-tabular min-w-[1.2ch] text-center text-[12px] font-bold">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-black/8"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>

              {/* Promo Code Chip */}
              <button
                type="button"
                onClick={() => setPromoApplied((p) => !p)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors ${
                  promoApplied
                    ? 'bg-[#10B981] text-white shadow-[0_6px_16px_-6px_rgba(16,185,129,0.55)]'
                    : isDark
                      ? 'border border-white/20 bg-white/8 text-white/80'
                      : 'border border-[#2563EB]/25 bg-[#2563EB]/10 text-[#2563EB]'
                }`}
              >
                <Tag className="h-3 w-3" />
                <span>{t.promoLabel}</span>
              </button>
            </div>
          </div>

          {/* Right Checkout Action + Review Snippet */}
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="inline-flex h-11 items-center justify-center rounded-full px-6 text-[13px] font-extrabold text-white transition-transform hover:-translate-y-0.5"
              style={{
                background:
                  'linear-gradient(180deg, #FF658E 0%, #FF3B6B 55%, #D91E4E 100%)',
                boxShadow:
                  '0 14px 28px -8px rgba(255,59,107,0.58), inset 0 2px 1px rgba(255,255,255,0.75)',
              }}
            >
              {t.checkoutBtn}
            </button>

            {orderCompleted && (
              <p className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#10B981]">
                <Check className="h-3.5 w-3.5" />
                <span>{t.addedMsg}</span>
              </p>
            )}

            <button
              type="button"
              onClick={() => setReviewIdx((i) => i + 1)}
              className={`max-w-sm rounded-xl border px-3 py-2 text-left text-[11.5px] transition-colors ${
                isDark
                  ? 'border-white/14 bg-white/6 text-white/80 hover:bg-white/10'
                  : 'border-white bg-white/80 text-[#1C1917]/80 hover:bg-white'
              }`}
            >
              <span className="block font-medium">{activeReview.quote[lang]}</span>
              <span className="mt-0.5 block text-[10px] font-bold text-[#FF3B6B]">
                ★★★★★ {activeReview.author}
              </span>
            </button>
          </div>
        </div>

        {/* Footer CTA inside Demo 06 Band */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-black/8 pt-4">
          <span className="text-[11.5px] opacity-65">
            Candy Pop 3D · Glassmorphism · Glossy Highlights · Dopamine Commerce
          </span>
          <button
            type="button"
            onClick={() =>
              onBuildInStyle(
                `High-Converting Webshop (${activeFlavor.name.en} Candy Pop 3D Glassy Style)`,
              )
            }
            className="text-[12.5px] font-bold text-[#FF3B6B] underline-offset-4 hover:underline"
          >
            {t.buildThis}
          </button>
        </div>
      </div>
    </section>
  );
}
