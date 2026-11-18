import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { DEMO_JUMP_ITEMS, DemoLang } from '../data/examplesDemosContent';
import { DemoWorkbenchFrame } from './examples/DemoWorkbenchFrame';
import { DemoGarageBand } from './examples/DemoGarageBand';
import { DemoBuitenwerkBand } from './examples/DemoBuitenwerkBand';
import { DemoBarberBand } from './examples/DemoBarberBand';
import { DemoHorecaBand } from './examples/DemoHorecaBand';
import { DemoFashionBand } from './examples/DemoFashionBand';
import { DemoCandyPopBand } from './examples/DemoCandyPopBand';

interface ExamplesPageProps {
  initialDemoId?: string | null;
  onConsumeInitialDemo?: () => void;
  onStartProject: (prefilledStyle?: string) => void;
  onBookCall: () => void;
  onBackToOverview: () => void;
}

export function ExamplesPage({
  initialDemoId,
  onConsumeInitialDemo,
  onStartProject,
  onBookCall,
  onBackToOverview,
}: ExamplesPageProps) {
  const [lang, setLang] = useState<DemoLang>('nl');
  const [activeDemoId, setActiveDemoId] = useState<string>(
    initialDemoId || DEMO_JUMP_ITEMS[0].id,
  );
  const stickyBarRef = useRef<HTMLDivElement | null>(null);
  const manualLockUntilRef = useRef<number>(0);

  // Deterministic scroll-spy: matches whichever demo contains the reading probe below the sticky bar
  useEffect(() => {
    let rafId = 0;

    const updateActiveDemo = () => {
      rafId = 0;
      if (Date.now() < manualLockUntilRef.current) return;

      const stickyBottom =
        stickyBarRef.current?.getBoundingClientRect().bottom ?? 140;
      const probeY = stickyBottom + Math.min(window.innerHeight * 0.2, 160);

      const candidates = DEMO_JUMP_ITEMS.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      })).filter(
        (entry): entry is { id: string; el: HTMLElement } => Boolean(entry.el),
      );

      if (candidates.length === 0) return;

      // If near very bottom of page, highlight last visible demo
      const nearPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 40;
      if (nearPageBottom) {
        const lastVisible = [...candidates]
          .reverse()
          .find((c) => c.el.getBoundingClientRect().top < window.innerHeight * 0.75);
        if (lastVisible) {
          setActiveDemoId((prev) =>
            prev === lastVisible.id ? prev : lastVisible.id,
          );
          return;
        }
      }

      // 1) Exact hit: section whose vertical span surrounds probeY
      const containing = candidates.find(({ el }) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom > probeY;
      });
      if (containing) {
        setActiveDemoId((prev) =>
          prev === containing.id ? prev : containing.id,
        );
        return;
      }

      // 2) Fallback before first section or in gaps: latest section whose top <= probeY, else first
      let matchedId = candidates[0].id;
      for (const { id, el } of candidates) {
        if (el.getBoundingClientRect().top <= probeY) {
          matchedId = id;
        }
      }
      setActiveDemoId((prev) => (prev === matchedId ? prev : matchedId));
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateActiveDemo);
      }
    };

    const initTimer = window.setTimeout(updateActiveDemo, 40);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      window.clearTimeout(initTimer);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!initialDemoId) return;
    const raf = window.requestAnimationFrame(() => {
      const target = document.getElementById(initialDemoId);
      if (target) {
        setActiveDemoId(initialDemoId);
        manualLockUntilRef.current = Date.now() + 900;
        const stickyHeight = stickyBarRef.current?.offsetHeight ?? 62;
        const stickyTop = window.innerWidth >= 768 ? 78 : 70;
        const clearance = stickyTop + stickyHeight + 8;
        const targetTop =
          target.getBoundingClientRect().top + window.scrollY - clearance;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth',
        });
      }
      onConsumeInitialDemo?.();
    });
    return () => window.cancelAnimationFrame(raf);
  }, [initialDemoId, onConsumeInitialDemo]);

  const jumpToBand = (id: string) => {
    setActiveDemoId(id);
    manualLockUntilRef.current = Date.now() + 750;
    const target = document.getElementById(id);
    if (!target) return;

    const stickyHeight = stickyBarRef.current?.offsetHeight ?? 62;
    const stickyTop = window.innerWidth >= 768 ? 78 : 70;
    const clearance = stickyTop + stickyHeight + 8;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - clearance;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: 'smooth',
    });
  };

  const t = {
    nl: {
      back: 'Terug naar Studio Overview',
      kicker: 'Testpagina · 6 Interactieve Branch-Demo’s',
      title: 'Zes eigen werelden. Werkend met echte API’s.',
      subtitle:
        'Scroll door alle zes volledige demo’s — elk met een eigen header, eigen typografie, uniek kleurenpalet en direct testbare interactieve functies.',
      closingKicker: 'Klaar voor een eigen live concept?',
      closingTitle:
        'Ontvang binnen 24 uur jouw persoonlijke websiteplan en eerste klikbare concept.',
      startBtn: 'Start een 24u Sprint',
      callBtn: 'Plan 15-min gesprek',
      footerTag: 'Nederland · Gebouwd voor moderne ondernemers',
    },
    en: {
      back: 'Back to Studio Overview',
      kicker: 'Test Sandbox · 6 Interactive Industry Demos',
      title: 'Six distinct web worlds. Live working APIs.',
      subtitle:
        'Scroll through all six showcase bands — each crafted with its own header geometry, typography pairing, color palette, and live interactive tools.',
      closingKicker: 'Ready for your own live concept?',
      closingTitle:
        'Receive your tailored website plan and first clickable concept within 24 hours.',
      startBtn: 'Start a 24h Sprint',
      callBtn: 'Book a 15-min Call',
      footerTag: 'Netherlands · Crafted for Modern Business',
    },
  }[lang];

  return (
    <div className="relative z-10 min-h-screen w-full pb-20 md:pb-24">
      {/* Subtle canvas veil keeping WaveBackground softly visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#F7F5F0]/80 via-[#F7F5F0]/52 to-[#F7F5F0]/68"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-3 pt-24 md:px-8 md:pt-28">
        {/* Top Controls + Editorial Intro */}
        <section className="pb-3 md:pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBackToOverview}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#1C1B18]/70 transition-colors hover:text-[#1C1B18] md:text-[12.5px]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t.back}</span>
            </button>
          </div>

          <div className="mt-3 max-w-3xl md:mt-4">
            <p className="font-mono-tabular text-[10.5px] font-semibold tracking-[0.06em] text-[#C98A3A] uppercase md:text-[11px]">
              {t.kicker}
            </p>
            <h1 className="display-tight mt-1 text-[clamp(1.65rem,3.8vw,3.15rem)] leading-[1.06] font-semibold text-[#1C1B18] md:mt-1.5">
              {t.title}
            </h1>
            <p className="mt-2 max-w-[62ch] text-[13.5px] leading-[1.5] text-[#1C1B18]/72 md:mt-2.5 md:text-[15.5px] md:leading-[1.55]">
              {t.subtitle}
            </p>
          </div>
        </section>

        {/* STICKY 5-DEMO JUMP FILTER + INTEGRATED NL / EN SWITCHER */}
        <div
          ref={stickyBarRef}
          className="sticky top-[74px] z-30 -mx-1 px-1 pb-3 md:top-[82px] md:-mx-2 md:px-2 md:pb-4"
        >
          <div className="glass-elevated flex items-center justify-between gap-1.5 rounded-full p-1 shadow-[0_14px_34px_-12px_rgba(28,27,24,0.16)] md:gap-2 md:p-1.5">
            <nav
              aria-label="Jump to demo section"
              className="no-scrollbar flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto md:gap-1"
            >
              {DEMO_JUMP_ITEMS.map((item) => {
                const isActive = activeDemoId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => jumpToBand(item.id)}
                    className={`relative inline-flex h-7.5 shrink-0 items-center gap-1 rounded-full px-2 text-[11px] font-semibold whitespace-nowrap transition-colors sm:px-3 md:h-9 md:gap-1.5 md:px-3.5 md:text-[12px] ${
                      isActive
                        ? 'text-[#F7F5F0]'
                        : 'text-[#1C1B18]/78 hover:text-[#1C1B18]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="examples-sticky-pill"
                        transition={{ type: 'spring', stiffness: 440, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-[#1C1B18]"
                      />
                    )}
                    <span className="font-mono-tabular relative z-10 text-[10px] text-[#C98A3A] md:text-[10.5px]">
                      {item.num}
                    </span>
                    <span className="relative z-10 sm:hidden">
                      {item.shortLabel[lang]}
                    </span>
                    <span className="relative z-10 hidden sm:inline">
                      {item.label[lang]}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Compact NL / EN Switcher pinned alongside filter */}
            <div
              role="group"
              aria-label="Demo language selector"
              className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-[#1C1B18]/12 bg-white/80 p-0.5"
            >
              <span className="hidden items-center pl-2 text-[#1C1B18]/50 sm:inline-flex">
                <Globe className="h-3 w-3" />
              </span>
              <button
                type="button"
                onClick={() => setLang('nl')}
                className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold transition-colors sm:px-2.5 sm:py-1 sm:text-[11px] ${
                  lang === 'nl'
                    ? 'bg-[#1C1B18] text-[#F7F5F0]'
                    : 'text-[#1C1B18]/65 hover:text-[#1C1B18]'
                }`}
              >
                NL
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold transition-colors sm:px-2.5 sm:py-1 sm:text-[11px] ${
                  lang === 'en'
                    ? 'bg-[#1C1B18] text-[#F7F5F0]'
                    : 'text-[#1C1B18]/65 hover:text-[#1C1B18]'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* 5 SCROLLABLE FULL-BAND DEMOS WITH 3D WORKBENCH ENTRANCE */}
        <div className="space-y-8 border-t border-[#1C1B18]/12 pt-4 md:space-y-16 md:pt-8">
          <DemoWorkbenchFrame id="demo-garage">
            <DemoGarageBand
              lang={lang}
              onBuildInStyle={(desc) => onStartProject(desc)}
            />
          </DemoWorkbenchFrame>

          <DemoWorkbenchFrame
            id="demo-buitenwerk"
            className="border-t border-[#1C1B18]/10 pt-10 md:pt-12"
          >
            <DemoBuitenwerkBand
              lang={lang}
              onBuildInStyle={(desc) => onStartProject(desc)}
            />
          </DemoWorkbenchFrame>

          <DemoWorkbenchFrame
            id="demo-barber"
            className="border-t border-[#1C1B18]/10 pt-10 md:pt-12"
          >
            <DemoBarberBand
              lang={lang}
              onBuildInStyle={(desc) => onStartProject(desc)}
            />
          </DemoWorkbenchFrame>

          <DemoWorkbenchFrame
            id="demo-horeca"
            className="border-t border-[#1C1B18]/10 pt-10 md:pt-12"
          >
            <DemoHorecaBand
              lang={lang}
              onBuildInStyle={(desc) => onStartProject(desc)}
            />
          </DemoWorkbenchFrame>

          <DemoWorkbenchFrame
            id="demo-fashion"
            className="border-t border-[#1C1B18]/10 pt-10 md:pt-12"
          >
            <DemoFashionBand
              lang={lang}
              onBuildInStyle={(desc) => onStartProject(desc)}
            />
          </DemoWorkbenchFrame>

          <DemoWorkbenchFrame
            id="demo-candyshop"
            className="border-t border-[#1C1B18]/10 pt-10 md:pt-12"
          >
            <DemoCandyPopBand
              lang={lang}
              onBuildInStyle={(desc) => onStartProject(desc)}
            />
          </DemoWorkbenchFrame>
        </div>

        {/* Closing CTA & Studio Footer */}
        <section
          aria-label="Start a 24h Sprint"
          className="pt-12 md:pt-16"
        >
          <div className="glass-elevated flex flex-col items-start justify-between gap-6 rounded-2xl p-6 md:flex-row md:items-center md:p-9">
            <div className="max-w-xl">
              <p className="text-[12px] font-medium tracking-[0.04em] text-[#C98A3A]">
                {t.closingKicker}
              </p>
              <h2 className="display-tight mt-2 text-[clamp(1.6rem,2.8vw,2.35rem)] leading-[1.1] font-semibold text-[#1C1B18]">
                {t.closingTitle}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onStartProject()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A]"
              >
                <span>{t.startBtn}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={onBookCall}
                className="glass-tile inline-flex h-10 items-center justify-center rounded-full px-5 text-[12px] font-medium text-[#1C1B18] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-white/35"
              >
                {t.callBtn}
              </button>
            </div>
          </div>

          <footer className="glass-subtle mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl px-6 py-5 text-[12px] text-[#1C1B18]/70 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#1C1B18]">Edition One</span>
              <span aria-hidden="true">·</span>
              <span>{t.footerTag}</span>
            </div>

            <button
              type="button"
              onClick={onBackToOverview}
              className="inline-flex items-center gap-1.5 font-medium text-[#1C1B18] transition-colors hover:text-[#C98A3A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{t.back}</span>
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}
