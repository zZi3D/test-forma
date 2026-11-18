import { useState } from 'react';
import {
  Check,
  Eye,
  Flame,
  Glasses,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import fashionModelImg from '../../assets/images/demo_fashion_campaign_1794958789947.jpg';
import {
  DemoLang,
  FASHION_FITS,
  FASHION_VARIANTS,
} from '../../data/examplesDemosContent';

interface DemoFashionBandProps {
  lang: DemoLang;
  onBuildInStyle: (description: string) => void;
}

export function DemoFashionBand({ lang, onBuildInStyle }: DemoFashionBandProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [activeNavIdx, setActiveNavIdx] = useState(0);
  const [variantId, setVariantId] = useState(FASHION_VARIANTS[0].id);
  const [fit, setFit] = useState(FASHION_FITS[0]);
  const [bagCount, setBagCount] = useState(1);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const activeVariant =
    FASHION_VARIANTS.find((v) => v.id === variantId) ?? FASHION_VARIANTS[0];
  const totalEur = bagCount * activeVariant.price;

  const scrollToDrop = () => {
    document
      .getElementById('fashion-drop-module')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const navItems = [
    { label: lang === 'nl' ? 'Zonnebrillen' : 'Sunglasses', icon: Glasses },
    { label: lang === 'nl' ? 'Optiek' : 'Optical', icon: Eye },
    { label: lang === 'nl' ? 'Drops' : 'Drops', icon: Flame },
    { label: lang === 'nl' ? 'Boetieks' : 'Stores', icon: MapPin },
  ];

  const t = {
    nl: {
      demoTag: 'Demo 05 · Fashion & Eyewear Webshop',
      bagLabel: 'Tas',
      eyebrow: 'Zomercollectie · Gelimiteerde Drop',
      headline: 'SOLARIS',
      specs: 'Spiegelende UV400 schildlenzen · Handgemaakt acetaat · Direct leverbaar',
      ctaHero: 'Shop Solaris Drop ↓',
      buildThis: 'Bouw in deze Fashion-stijl →',
      moduleTitle: 'Direct Maat, Kleur & WhatsApp-Bestelling',
      colorLabel: 'Montuurkleur',
      fitLabel: 'Pasvorm',
      stockText: `Nog ${activeVariant.stock} stuks op voorraad`,
      checkoutBtn: 'Bestel direct via WhatsApp →',
      orderMsg: `WhatsApp order klaar: ${bagCount}× Solaris (${activeVariant.label.nl}, ${fit}) — € ${totalEur}`,
    },
    en: {
      demoTag: 'Demo 05 · High-Contrast Fashion Store',
      bagLabel: 'Bag',
      eyebrow: 'The Summer Capsule · Limited Release',
      headline: 'SOLARIS',
      specs: 'Mirrored shield lenses · Full UV400 protection · Made in Italy',
      ctaHero: 'Shop Solaris Drop ↓',
      buildThis: 'Build in this Fashion style →',
      moduleTitle: 'Live Variant Selector & WhatsApp Checkout',
      colorLabel: 'Frame Colorway',
      fitLabel: 'Frame Fit',
      stockText: `${activeVariant.stock} pieces left in studio stock`,
      checkoutBtn: 'Order via WhatsApp →',
      orderMsg: `WhatsApp order ready: ${bagCount}× Solaris (${activeVariant.label.en}, ${fit}) — € ${totalEur}`,
    },
  }[lang];

  return (
    <section
      aria-label={t.demoTag}
      className="relative overflow-hidden rounded-3xl border border-[#4A0F24]/15 bg-[#F6CBD4] text-[#4A0F24] shadow-[0_24px_60px_-24px_rgba(74,15,36,0.22)]"
    >
      {/* HEADER VARIANT 5: Bold Deep Wine Capsule Header with Translucent Glass Active Tile + Kelly Green Bag Pop (Skin 1 from screenshot) */}
      <div className="px-4 pt-4 md:px-8 md:pt-6">
        <header className="flex items-center justify-between gap-4 rounded-full bg-[#4A0F24] px-3.5 py-2 text-[#F6CBD4] shadow-[0_14px_34px_-12px_rgba(74,15,36,0.45)] md:px-5">
          <a
            href="#demo-fashion"
            onClick={(e) => {
              e.preventDefault();
              setActiveNavIdx(0);
              scrollToDrop();
            }}
            className="pl-1 text-[13.5px] font-bold tracking-[0.16em] text-[#F6CBD4] uppercase whitespace-nowrap shrink-0 md:text-[14.5px]"
          >
            STUDIO VESPER
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
                    scrollToDrop();
                  }}
                  className={`relative inline-flex h-9 items-center gap-1.5 rounded-2xl px-3.5 text-[11.5px] font-semibold tracking-[0.06em] uppercase whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-[#F6CBD4]/72 hover:text-[#F6CBD4]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="fashion-nav-capsule"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-2xl bg-white/18 backdrop-blur-xs"
                    />
                  )}
                  <Icon className="relative z-10 h-3.5 w-3.5" />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <motion.button
            key={`bag-${bagCount}`}
            type="button"
            onClick={scrollToDrop}
            initial={
              prefersReducedMotion
                ? false
                : { scale: 1.24, rotate: -4 }
            }
            animate={{ scale: [1.24, 0.94, 1.06, 1], rotate: [-4, 4, 0] }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-[#2DC92A] px-4 text-[12px] font-bold tracking-[0.06em] text-[#142914] uppercase whitespace-nowrap shrink-0 shadow-[0_0_20px_-4px_rgba(45,201,42,0.7)] transition-colors hover:bg-[#25B122]"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="font-mono-tabular">
              {t.bagLabel} ({bagCount})
            </span>
          </motion.button>
        </header>
      </div>

      {/* HERO SECTION */}
      <div className="px-5 pt-7 pb-8 md:px-10 md:pt-10 md:pb-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-[#4A0F24]/70 uppercase">
              <span>{t.demoTag}</span>
              <span aria-hidden="true">·</span>
              <span>#F6CBD4 · #4A0F24 · #2DC92A</span>
            </div>

            <p className="mt-4 text-[12px] font-bold tracking-[0.14em] text-[#4A0F24]/80 uppercase">
              {t.eyebrow}
            </p>

            <h2 className="font-demo-antonio mt-1 text-[clamp(4rem,10vw,7.25rem)] leading-[0.86] font-bold tracking-[-0.02em] text-[#4A0F24] uppercase">
              {t.headline}
            </h2>

            <p className="mt-4 max-w-[38ch] text-[13.5px] font-medium tracking-[0.04em] text-[#4A0F24]/85 uppercase">
              {t.specs}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={scrollToDrop}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#2DC92A] px-6 text-[13px] font-bold tracking-[0.04em] text-[#142914] uppercase whitespace-nowrap shadow-xs transition-colors hover:bg-[#25B122]"
              >
                <span>{t.ctaHero}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onBuildInStyle(
                    `Fashion Store Demo (Blush, Deep Wine & Kelly Green) — ${activeVariant.label[lang]}`,
                  )
                }
                className="text-[12.5px] font-bold text-[#4A0F24]/80 underline-offset-4 hover:text-[#4A0F24] hover:underline"
              >
                {t.buildThis}
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <motion.div
              key={`fashion-ring-${variantId}`}
              initial={prefersReducedMotion ? false : { scale: 0.96, rotate: -1 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.025 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="relative overflow-hidden rounded-2xl border-2 bg-[#F2BDCA] shadow-xl transition-colors duration-300"
              style={{
                borderColor: activeVariant.swatchHex,
                boxShadow: `0 24px 60px -18px ${activeVariant.swatchHex}66`,
              }}
            >
              {/* Camera shutter burst synced to variant switch */}
              {!prefersReducedMotion && (
                <motion.div
                  key={`shutter-${variantId}`}
                  aria-hidden="true"
                  initial={{ opacity: 0.55 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="pointer-events-none absolute inset-0 z-20"
                  style={{ backgroundColor: activeVariant.swatchHex }}
                />
              )}

              <motion.img
                src={fashionModelImg}
                alt={
                  lang === 'nl'
                    ? 'Campagnebeeld mode-model met opvallende Kelly-groene zonnebril op roze achtergrond'
                    : 'Editorial fashion portrait in bright kelly green shield sunglasses on blush backdrop'
                }
                referrerPolicy="no-referrer"
                animate={
                  prefersReducedMotion ? undefined : { scale: [1, 1.03, 1] }
                }
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 aspect-[4/3] w-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* INTERACTIVE DROP CONFIGURATOR + WHATSAPP BAG */}
        <div
          id="fashion-drop-module"
          className="mt-8 rounded-2xl border border-[#4A0F24]/15 bg-white/85 p-5 md:p-6"
        >
          <div className="flex flex-col justify-between gap-2 border-b border-[#4A0F24]/10 pb-3.5 sm:flex-row sm:items-center">
            <span className="inline-flex items-center gap-2 text-[12.5px] font-bold tracking-[0.06em] text-[#4A0F24] uppercase">
              <Sparkles className="h-4 w-4 text-[#2DC92A]" />
              <span>{t.moduleTitle}</span>
            </span>
            <span className="font-mono-tabular text-[12px] font-semibold text-[#4A0F24]/70">
              {t.stockText}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            {/* Colorway & Fit Selectors */}
            <div className="space-y-4 lg:col-span-7">
              <div>
                <p className="text-[11px] font-bold tracking-[0.1em] text-[#4A0F24]/65 uppercase">
                  {t.colorLabel}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {FASHION_VARIANTS.map((variant) => {
                    const active = variant.id === variantId;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => {
                          setVariantId(variant.id);
                          setOrderSubmitted(false);
                        }}
                        className={`inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-[12px] font-semibold transition-colors ${
                          active
                            ? 'bg-[#4A0F24] text-[#F6CBD4]'
                            : 'border border-[#4A0F24]/20 bg-[#F6CBD4]/35 text-[#4A0F24] hover:border-[#4A0F24]'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="h-3 w-3 rounded-full border border-black/15"
                          style={{ backgroundColor: variant.swatchHex }}
                        />
                        <span>{variant.label[lang]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold tracking-[0.1em] text-[#4A0F24]/65 uppercase">
                  {t.fitLabel}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {FASHION_FITS.map((fitOption) => {
                    const activeFit = fit === fitOption;
                    return (
                      <button
                        key={fitOption}
                        type="button"
                        onClick={() => {
                          setFit(fitOption);
                          setOrderSubmitted(false);
                        }}
                        className={`font-mono-tabular relative h-9 rounded-lg px-3.5 text-[12px] font-semibold transition-colors ${
                          activeFit
                            ? 'text-[#142914]'
                            : 'border border-[#4A0F24]/20 bg-white text-[#4A0F24] hover:border-[#4A0F24]'
                        }`}
                      >
                        {activeFit && (
                          <motion.span
                            layoutId="fashion-fit-pill"
                            transition={{
                              type: 'spring',
                              stiffness: 440,
                              damping: 30,
                            }}
                            className="absolute inset-0 rounded-lg bg-[#2DC92A]"
                          />
                        )}
                        <span className="relative z-10">{fitOption}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live Bag Summary & WhatsApp Checkout */}
            <div className="rounded-xl border border-[#4A0F24]/15 bg-[#FCEAF0] p-4 lg:col-span-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-bold text-[#4A0F24]">
                    Solaris 01 · {activeVariant.label[lang]}
                  </p>
                  <p className="font-mono-tabular text-[11.5px] text-[#4A0F24]/65">
                    {fit} · € {activeVariant.price}/st
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-[#4A0F24]/20 bg-white px-2 py-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => {
                      setBagCount((c) => Math.max(1, c - 1));
                      setOrderSubmitted(false);
                    }}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[#4A0F24] hover:bg-[#F6CBD4]/50"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="font-mono-tabular w-5 text-center text-[13px] font-bold">
                    {bagCount}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => {
                      setBagCount((c) => Math.min(activeVariant.stock, c + 1));
                      setOrderSubmitted(false);
                    }}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[#4A0F24] hover:bg-[#F6CBD4]/50"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-[#4A0F24]/12 pt-3">
                <span className="text-[12px] font-medium text-[#4A0F24]/70">
                  {lang === 'nl' ? 'Totaalbedrag' : 'Order total'}
                </span>
                <motion.span
                  key={totalEur}
                  initial={prefersReducedMotion ? false : { scale: 1.2, y: -2 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                  className="font-mono-tabular text-[20px] font-bold text-[#4A0F24]"
                >
                  € {totalEur}
                </motion.span>
              </div>

              <button
                type="button"
                onClick={() => setOrderSubmitted(true)}
                className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#4A0F24] px-5 text-[12.5px] font-bold text-[#F6CBD4] transition-colors hover:bg-[#2DC92A] hover:text-[#142914]"
              >
                <span>{t.checkoutBtn}</span>
              </button>

              {orderSubmitted && (
                <p className="mt-2 inline-flex items-start gap-1.5 text-[11.5px] font-semibold text-emerald-900">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{t.orderMsg}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
