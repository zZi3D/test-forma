import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Coffee,
  MapPin,
  Scissors,
  ShoppingBag,
  Star,
  Wrench,
} from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import brakeDiscImg from '../assets/images/demo_garage_brakedisc_1794958788436.jpg';
import barberPortraitImg from '../assets/images/demo_barber_portrait_1794958788770.jpg';
import cafeCroissantImg from '../assets/images/demo_horeca_coffee_1794958789876.jpg';
import fashionModelImg from '../assets/images/demo_fashion_campaign_1794958789947.jpg';
import gardenPavilionImg from '../assets/images/demo_buitenwerk_garden_1794958789119.jpg';

interface DirectionsMarqueeShowcaseProps {
  onOpenLiveDemo: (demoId: string) => void;
}

const DEMO_SLIDE_COUNT = 5;

/** Wix-Studio-style blue selection box + circular corner/edge handles */
function StudioWidgetFrame({
  pillLabel,
  children,
}: {
  pillLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Floating blue widget category pill */}
      <span className="mb-1.5 inline-flex items-center rounded-md bg-[#2563EB] px-2.5 py-1 text-[10px] font-semibold tracking-[0.02em] text-white shadow-md md:text-[11px]">
        {pillLabel}
      </span>

      {/* Highlighted blue bounding box with 8 white-filled circle handles */}
      <div className="relative border-[1.75px] border-[#2563EB] bg-white/95 shadow-[0_18px_38px_-14px_rgba(37,99,235,0.42)]">
        {/* Corner & Midpoint Handles */}
        <span className="pointer-events-none absolute -top-1 -left-1 h-2 w-2 rounded-full border border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute -top-1 -right-1 h-2 w-2 rounded-full border border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rounded-full border border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full border border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute -bottom-1 -left-1 h-2 w-2 rounded-full border border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute -bottom-1 -right-1 h-2 w-2 rounded-full border border-[#2563EB] bg-white" />

        {children}
      </div>
    </div>
  );
}

export function DirectionsMarqueeShowcase({
  onOpenLiveDemo,
}: DirectionsMarqueeShowcaseProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const spacerRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [spacerHeight, setSpacerHeight] = useState<number>(1900);
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const maxShiftRef = useRef<number>(0);

  const measureAndSync = useCallback(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    const spacer = spacerRef.current;
    if (!stage || !track || !spacer) return;

    const stageWidth = stage.clientWidth;
    const trackWidth = track.scrollWidth;
    const maxShift = Math.max(0, trackWidth - stageWidth);
    maxShiftRef.current = maxShift;

    const stickyTopPx = window.innerWidth >= 768 ? 82 : 72;
    const vh = Math.max(window.innerHeight, 640);
    const stageHeight = stage.offsetHeight || Math.max(vh - stickyTopPx, 520);
    // Match exact sticky travel span (spacerHeight - stageHeight) for crisp pin start/end
    const desiredHeight = Math.round(stageHeight + Math.max(480, maxShift * 1.05));
    setSpacerHeight((prev) =>
      Math.abs(prev - desiredHeight) > 8 ? desiredHeight : prev,
    );

    if (prefersReducedMotion) {
      track.style.transform = 'none';
      return;
    }

    const rect = spacer.getBoundingClientRect();
    const scrollableSpan = Math.max(spacer.offsetHeight - stageHeight, 1);
    const scrolled = stickyTopPx - rect.top;
    const progress = Math.min(Math.max(scrolled / scrollableSpan, 0), 1);

    const translateX = -(progress * maxShift);
    track.style.transform = `translate3d(${translateX.toFixed(1)}px, 0, 0)`;

    const nextActive = Math.min(
      DEMO_SLIDE_COUNT - 1,
      Math.round(progress * (DEMO_SLIDE_COUNT - 1)),
    );
    setActiveSlideIdx((prev) => (prev === nextActive ? prev : nextActive));
  }, [prefersReducedMotion]);

  useEffect(() => {
    let rafId = 0;

    const scheduleSync = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          measureAndSync();
        });
      }
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(scheduleSync)
        : null;

    if (resizeObserver) {
      if (stageRef.current) resizeObserver.observe(stageRef.current);
      if (trackRef.current) resizeObserver.observe(trackRef.current);
    }

    const initTimer = window.setTimeout(measureAndSync, 40);
    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync, { passive: true });

    return () => {
      window.clearTimeout(initTimer);
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [measureAndSync]);

  const scrollToSlide = (targetIdx: number) => {
    const clampedIdx = Math.max(0, Math.min(DEMO_SLIDE_COUNT - 1, targetIdx));
    const spacer = spacerRef.current;
    const stage = stageRef.current;
    if (!spacer || !stage) return;

    if (prefersReducedMotion && trackRef.current) {
      const cardEl = trackRef.current.children[clampedIdx] as HTMLElement | undefined;
      cardEl?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      return;
    }

    const vh = Math.max(window.innerHeight, 640);
    const stickyTopPx = window.innerWidth >= 768 ? 82 : 72;
    const stageHeight = stage.offsetHeight || Math.max(vh - stickyTopPx, 520);
    const spacerDocTop = spacer.getBoundingClientRect().top + window.scrollY;
    const scrollableSpan = Math.max(spacer.offsetHeight - stageHeight, 1);
    const ratio = clampedIdx / (DEMO_SLIDE_COUNT - 1);
    const targetScrollY = spacerDocTop - stickyTopPx + ratio * scrollableSpan;

    window.scrollTo({
      top: Math.max(0, targetScrollY),
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={spacerRef}
      aria-label="Live Interactive Demos Showcase"
      style={prefersReducedMotion ? undefined : { height: `${spacerHeight}px` }}
      className="relative w-full"
    >
      <div
        ref={stageRef}
        className={`${
          prefersReducedMotion
            ? 'relative py-10 md:py-14'
            : 'sticky top-[72px] flex min-h-[calc(100vh-84px)] flex-col justify-center overflow-x-clip py-6 md:top-[82px] md:py-8'
        }`}
      >
        {/* Header Bar & Progress Indicator */}
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
          <div className="flex flex-col justify-between gap-4 border-t border-[#1C1B18]/12 pt-5 md:flex-row md:items-end md:pt-7">
            <div>
              <p className="font-mono-tabular text-[11px] font-semibold tracking-[0.06em] text-[#C98A3A] uppercase">
                Live Interactive Demos · Scroll Om Te Verkennen · Klik Om Te Testen
              </p>
              <h2 className="display-tight mt-1.5 text-[clamp(1.55rem,3vw,2.4rem)] leading-[1.08] font-semibold text-[#1C1B18]">
                Barber, Autogarage, Horeca, Fashionshop &amp; Architectuur
              </h2>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="font-mono-tabular flex items-center gap-1 rounded-full border border-[#1C1B18]/12 bg-white/80 px-3 py-1 text-[11px] font-semibold text-[#1C1B18]">
                <span>0{activeSlideIdx + 1}</span>
                <span className="opacity-35">/</span>
                <span className="opacity-55">0{DEMO_SLIDE_COUNT}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToSlide(activeSlideIdx - 1)}
                  disabled={activeSlideIdx === 0}
                  aria-label="Previous demo card"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1C1B18]/14 bg-white/85 text-[#1C1B18] transition-colors hover:bg-[#1C1B18] hover:text-white disabled:opacity-35 disabled:hover:bg-white/85 disabled:hover:text-[#1C1B18]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSlide(activeSlideIdx + 1)}
                  disabled={activeSlideIdx === DEMO_SLIDE_COUNT - 1}
                  aria-label="Next demo card"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1C1B18]/14 bg-white/85 text-[#1C1B18] transition-colors hover:bg-[#1C1B18] hover:text-white disabled:opacity-35 disabled:hover:bg-white/85 disabled:hover:text-[#1C1B18]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll-Scrubbed Horizontal 5-Demo Track (No auto-scroll: glides strictly on user scroll) */}
        <div
          className={`mt-6 w-full md:mt-7 ${
            prefersReducedMotion ? 'overflow-x-auto px-4 md:px-8' : 'overflow-x-clip'
          }`}
        >
          <div
            ref={trackRef}
            className="flex w-max items-stretch gap-6 px-4 sm:gap-8 sm:px-8 md:px-[max(2rem,calc((100vw-1200px)/2+2rem))]"
            style={{ willChange: 'transform' }}
          >
            {/* ============================================================ */}
            {/* DEMO 1: BARBER · NOORD BARBERS                              */}
            {/* ============================================================ */}
            <button
              type="button"
              onClick={() => onOpenLiveDemo('demo-barber')}
              aria-label="Open Demo 03 Noord Barbers"
              className="group font-demo-dmsans relative h-[350px] w-[320px] shrink-0 overflow-hidden rounded-[20px] border border-[#EDE6D8]/16 bg-[#1C1C1C] text-left text-[#EDE6D8] shadow-[0_26px_60px_-20px_rgba(28,27,24,0.34)] transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-[#2563EB] sm:h-[400px] sm:w-[540px] md:h-[430px] md:w-[660px]"
            >
              {/* Atmospheric Barber-Red Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full opacity-55 blur-3xl"
                style={{
                  background:
                    'radial-gradient(circle, rgba(179,38,30,0.9) 0%, rgba(179,38,30,0) 70%)',
                }}
              />

              {/* Real Demo Header: Capsule Pill Header */}
              <div className="relative z-10 px-4 pt-3.5 md:px-6 md:pt-4">
                <div className="flex items-center justify-between rounded-full border border-[#EDE6D8]/14 bg-[#111113] px-3.5 py-2">
                  <span className="font-demo-oswald inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[0.07em] uppercase md:text-[14px]">
                    <Scissors className="h-3.5 w-3.5 text-[#B3261E]" />
                    <span>NOORD BARBERS</span>
                  </span>
                  <div className="hidden items-center gap-4 text-[10.5px] text-[#EDE6D8]/70 sm:flex">
                    <span>Behandelingen</span>
                    <span>Galerij</span>
                    <span>Reviews</span>
                  </div>
                  <span className="rounded-full bg-[#B3261E] px-2.5 py-1 text-[10px] font-semibold text-white">
                    Stoel reserveren
                  </span>
                </div>
              </div>

              {/* Hero Copy + Real Barber Portrait Image */}
              <div className="relative z-10 grid h-[calc(100%-64px)] grid-cols-12 gap-3 px-4 pt-4 pb-4 md:px-6 md:pt-5">
                <div className="col-span-7 flex flex-col justify-between">
                  <div>
                    <h3 className="font-demo-oswald text-[24px] leading-[0.98] font-bold tracking-[0.01em] uppercase sm:text-[32px] md:text-[38px]">
                      EEN STIJL DIE VOOR ZICH SPREEKT
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[11px] leading-[1.45] text-[#EDE6D8]/70 md:text-[12px]">
                      Strakke fades, verzorgde baarden en directe boeking in een moderne Rotterdamse herenzaak.
                    </p>
                  </div>

                  {/* Studio-Highlighted Interactive Booking Widget Box */}
                  <div className="mt-2">
                    <StudioWidgetFrame pillLabel="1. Barber · Reviews & Boeking">
                      <div className="p-2.5 text-[#1C1B18] md:p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-[11px] font-bold md:text-[12.5px]">
                              Knippen &amp; Faden · €34
                            </p>
                            <p className="mt-0.5 flex items-center gap-1 text-[9.5px] text-[#1C1B18]/65">
                              <Star className="h-2.5 w-2.5 fill-[#E0A526] text-[#E0A526]" />
                              <span>4.9/5 · 320+ Google reviews</span>
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <span className="font-mono-tabular rounded bg-[#1C1C1C]/8 px-1.5 py-0.5 text-[9px] font-semibold">
                              13:30
                            </span>
                            <span className="font-mono-tabular rounded bg-[#B3261E] px-1.5 py-0.5 text-[9px] font-semibold text-white">
                              14:45
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between rounded bg-[#B3261E] px-2.5 py-1.5 text-[10px] font-semibold text-white">
                          <span>Bevestig via WhatsApp</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </div>
                      </div>
                    </StudioWidgetFrame>
                  </div>
                </div>

                <div className="col-span-5 overflow-hidden rounded-xl border border-[#EDE6D8]/14">
                  <img
                    src={barberPortraitImg}
                    alt="Noord Barbers grooming studio"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </button>

            {/* ============================================================ */}
            {/* DEMO 2: AUTOGARAGE · KORVER AUTO · RDW API                   */}
            {/* ============================================================ */}
            <button
              type="button"
              onClick={() => onOpenLiveDemo('demo-garage')}
              aria-label="Open Demo 01 Korver Auto Garage"
              className="group font-demo-outfit relative h-[350px] w-[320px] shrink-0 overflow-hidden rounded-[20px] border border-[#1C1C1C]/12 bg-[#F3ECE1] text-left text-[#1C1C1C] shadow-[0_26px_60px_-20px_rgba(28,27,24,0.24)] transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-[#2563EB] sm:h-[400px] sm:w-[540px] md:h-[430px] md:w-[660px]"
            >
              {/* Floating White Capsule Header */}
              <div className="relative z-10 px-4 pt-3.5 md:px-6 md:pt-4">
                <div className="flex items-center justify-between rounded-full border border-[#1C1C1C]/10 bg-white px-3.5 py-2 shadow-xs">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[-0.01em] md:text-[14px]">
                    <Wrench className="h-3.5 w-3.5 text-[#B8291E]" />
                    <span>KORVER AUTO</span>
                  </span>
                  <div className="hidden items-center gap-4 text-[10.5px] font-medium text-[#1C1C1C]/65 sm:flex">
                    <span>Onderhoud</span>
                    <span>APK-Check</span>
                    <span>Tarieven</span>
                  </div>
                  <span className="rounded-full bg-[#B8291E] px-2.5 py-1 text-[10px] font-semibold text-white">
                    Afspraak →
                  </span>
                </div>
              </div>

              <div className="relative z-10 grid h-[calc(100%-64px)] grid-cols-12 gap-3 px-4 pt-4 pb-4 md:px-6 md:pt-5">
                <div className="col-span-7 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[22px] leading-[1.03] font-bold tracking-[-0.025em] sm:text-[29px] md:text-[34px]">
                      Onderhoud en APK, volgens fabrieksnorm.
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.45] text-[#1C1C1C]/70 md:text-[12px]">
                      Remmen, distributie en merkonafhankelijke diagnose met directe kentekencheck.
                    </p>
                  </div>

                  {/* Studio-Highlighted Live RDW Plate Widget Box */}
                  <div className="mt-2">
                    <StudioWidgetFrame pillLabel="2. Autogarage · Live RDW API">
                      <div className="p-2.5 md:p-3">
                        <div className="flex items-center gap-2">
                          {/* Dutch Yellow License Plate */}
                          <div className="flex h-7 flex-1 items-center overflow-hidden rounded border border-[#1C1C1C] bg-[#F7C600]">
                            <span className="flex h-full items-center bg-[#003399] px-1.5 text-[8.5px] font-bold text-white">
                              NL
                            </span>
                            <span className="font-mono-tabular flex-1 text-center text-[11.5px] font-extrabold tracking-[0.08em] text-[#111]">
                              KXT-67-P
                            </span>
                          </div>
                          <span className="rounded bg-[#1C1C1C] px-2 py-1 text-[9.5px] font-semibold text-white">
                            AUDI A5
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between rounded bg-[#B8291E] px-2.5 py-1.5 text-[10px] font-semibold text-white">
                          <span>APK Geldig t/m 01-10-2030 · Plan APK</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </div>
                      </div>
                    </StudioWidgetFrame>
                  </div>
                </div>

                <div className="col-span-5 overflow-hidden rounded-xl border border-[#1C1C1C]/12 bg-[#141416]">
                  <img
                    src={brakeDiscImg}
                    alt="Korver Auto performance brake rotor"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </button>

            {/* ============================================================ */}
            {/* DEMO 3: HORECA · CAFÉ KORNELIS · TERRASWEER API              */}
            {/* ============================================================ */}
            <button
              type="button"
              onClick={() => onOpenLiveDemo('demo-horeca')}
              aria-label="Open Demo 04 Café Kornelis Horeca"
              className="group relative h-[350px] w-[320px] shrink-0 overflow-hidden rounded-[20px] border border-[#4A2C1D]/15 bg-[#EFE2CF] text-left text-[#4A2C1D] shadow-[0_26px_60px_-20px_rgba(74,44,29,0.26)] transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-[#2563EB] sm:h-[400px] sm:w-[540px] md:h-[430px] md:w-[660px]"
            >
              {/* Centered Brasserie Crest Header */}
              <div className="flex items-center justify-between border-b border-[#4A2C1D]/12 px-4 py-3 md:px-6">
                <div className="hidden items-center gap-3 text-[10.5px] font-medium text-[#4A2C1D]/75 sm:flex">
                  <span>Menukaart</span>
                  <span>Verhaal</span>
                  <span>Utrecht</span>
                </div>
                <span className="font-demo-oswald text-[14px] font-bold tracking-[0.04em] uppercase md:text-[17px]">
                  CAFÉ KORNELIS
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#E0A526] px-2.5 py-1 text-[10px] font-semibold text-[#1D120C]">
                  <span>Tafel reserveren</span>
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>

              <div className="grid h-[calc(100%-54px)] grid-cols-12 gap-3 px-4 pt-4 pb-4 md:px-6 md:pt-5">
                <div className="col-span-7 flex flex-col justify-between">
                  <div>
                    <h3 className="font-demo-oswald text-[26px] leading-[0.95] font-bold uppercase sm:text-[34px] md:text-[40px]">
                      KOFFIE &amp; CROISSANT
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[11px] leading-[1.45] text-[#4A2C1D]/75 md:text-[12px]">
                      Goede koffie, knapperig roombotergebak en actueel grachtenterras-weer.
                    </p>
                  </div>

                  {/* Studio-Highlighted Live Open-Meteo Terrace Weather Box */}
                  <div className="mt-2">
                    <StudioWidgetFrame pillLabel="3. Horeca · Open-Meteo Terrasweer">
                      <div className="p-2.5 text-[#4A2C1D] md:p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Coffee className="h-4 w-4 text-[#E0A526]" />
                            <div>
                              <p className="text-[11.5px] font-bold">
                                Utrecht · Oudegracht
                              </p>
                              <p className="text-[9.5px] text-[#4A2C1D]/68">
                                18°C · Grachtenterras geopend
                              </p>
                            </div>
                          </div>
                          <span className="font-mono-tabular rounded bg-[#4A2C1D] px-2 py-0.5 text-[10px] font-bold text-[#EFE2CF]">
                            € 4,20
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between rounded bg-[#E0A526] px-2.5 py-1.5 text-[10px] font-bold text-[#1D120C]">
                          <span>Bekijk menukaart &amp; terrasstatus</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </div>
                      </div>
                    </StudioWidgetFrame>
                  </div>
                </div>

                <div className="col-span-5 overflow-hidden rounded-xl border border-[#4A2C1D]/15">
                  <img
                    src={cafeCroissantImg}
                    alt="Café Kornelis koffie en croissant"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </button>

            {/* ============================================================ */}
            {/* DEMO 4: FASHIONSHOP · STUDIO VESPER · SOLARIS                */}
            {/* ============================================================ */}
            <button
              type="button"
              onClick={() => onOpenLiveDemo('demo-fashion')}
              aria-label="Open Demo 05 Studio Vesper Fashionshop"
              className="group relative h-[350px] w-[320px] shrink-0 overflow-hidden rounded-[20px] border border-[#4A0F24]/15 bg-[#F6CBD4] text-left text-[#4A0F24] shadow-[0_26px_60px_-20px_rgba(74,15,36,0.26)] transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-[#2563EB] sm:h-[400px] sm:w-[540px] md:h-[430px] md:w-[660px]"
            >
              {/* Deep Wine Capsule Header with Kelly Green Bag */}
              <div className="px-4 pt-3.5 md:px-6 md:pt-4">
                <div className="flex items-center justify-between rounded-full bg-[#4A0F24] px-3.5 py-2 text-[#F6CBD4]">
                  <span className="text-[11px] font-bold tracking-[0.14em] uppercase md:text-[12.5px]">
                    STUDIO VESPER
                  </span>
                  <div className="hidden items-center gap-3 text-[10px] font-semibold tracking-[0.06em] text-[#F6CBD4]/75 uppercase sm:flex">
                    <span>Zonnebrillen</span>
                    <span>Optiek</span>
                    <span>Drops</span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#2DC92A] px-2.5 py-1 text-[10px] font-bold text-[#142914] uppercase">
                    <ShoppingBag className="h-3 w-3" />
                    <span>Tas (1)</span>
                  </span>
                </div>
              </div>

              <div className="grid h-[calc(100%-64px)] grid-cols-12 gap-3 px-4 pt-4 pb-4 md:px-6 md:pt-5">
                <div className="col-span-7 flex flex-col justify-between">
                  <div>
                    <p className="font-mono-tabular text-[9.5px] font-bold tracking-[0.08em] text-[#4A0F24]/65 uppercase">
                      Zomercollectie · Gelimiteerde Drop
                    </p>
                    <h3 className="mt-1 text-[30px] leading-[0.94] font-black tracking-[-0.03em] uppercase sm:text-[38px] md:text-[46px]">
                      SOLARIS
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.45] text-[#4A0F24]/75 md:text-[12px]">
                      Spiegelende UV400 schildlenzen · Handgemaakt Italiaans acetaat.
                    </p>
                  </div>

                  {/* Studio-Highlighted Solaris Variant & WhatsApp Box */}
                  <div className="mt-2">
                    <StudioWidgetFrame pillLabel="4. Fashionshop · Drop & WhatsApp">
                      <div className="p-2.5 text-[#4A0F24] md:p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="h-4 w-4 rounded-full border-2 border-[#4A0F24] bg-[#2DC92A]" />
                            <span className="h-3.5 w-3.5 rounded-full bg-[#4A0F24]" />
                            <span className="h-3.5 w-3.5 rounded-full bg-[#E88FA5]" />
                            <span className="ml-1 text-[10.5px] font-bold">
                              Kelly Groen · €165
                            </span>
                          </div>
                          <span className="font-mono-tabular text-[9.5px] font-semibold text-[#4A0F24]/65">
                            Nog 7 op voorraad
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between rounded bg-[#2DC92A] px-2.5 py-1.5 text-[10px] font-bold text-[#142914]">
                          <span>Bestel direct via WhatsApp</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </div>
                      </div>
                    </StudioWidgetFrame>
                  </div>
                </div>

                <div className="col-span-5 overflow-hidden rounded-xl border border-[#4A0F24]/15">
                  <img
                    src={fashionModelImg}
                    alt="Studio Vesper Solaris eyewear campaign"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </button>

            {/* ============================================================ */}
            {/* DEMO 5: ARCHITECTUUR & BUITENWERK · GROENEVELD · PDOK + WEER */}
            {/* ============================================================ */}
            <button
              type="button"
              onClick={() => onOpenLiveDemo('demo-buitenwerk')}
              aria-label="Open Demo 02 Groeneveld Architectuur"
              className="group font-demo-dmsans relative h-[350px] w-[320px] shrink-0 overflow-hidden rounded-[20px] border border-[#F3EFE6]/16 bg-[#162921] text-left text-[#F3EFE6] shadow-[0_26px_60px_-20px_rgba(22,41,33,0.4)] transition-all duration-300 hover:-translate-y-1 hover:ring-2 hover:ring-[#2563EB] sm:h-[400px] sm:w-[540px] md:h-[430px] md:w-[660px]"
            >
              {/* Hairline Editorial Header */}
              <div className="flex items-center justify-between border-b border-[#F3EFE6]/14 px-4 py-3 md:px-6">
                <span className="font-demo-fraunces text-[16px] font-semibold tracking-[-0.02em] md:text-[18px]">
                  Groeneveld
                </span>
                <div className="hidden items-center gap-4 text-[10.5px] font-medium text-[#F3EFE6]/72 sm:flex">
                  <span>Projecten</span>
                  <span>Tuinpaviljoens</span>
                  <span>Werkweer</span>
                </div>
                <span className="rounded-full bg-[#C86D44] px-2.5 py-1 text-[10px] font-semibold text-white">
                  Richtprijs
                </span>
              </div>

              <div className="grid h-[calc(100%-54px)] grid-cols-12 gap-3 px-4 pt-4 pb-4 md:px-6 md:pt-5">
                <div className="col-span-7 flex flex-col justify-between">
                  <div>
                    <h3 className="font-demo-fraunces text-[21px] leading-[1.05] font-semibold sm:text-[26px] md:text-[31px]">
                      Buitenarchitectuur en dakwerk voor elk seizoen.
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[11px] leading-[1.45] text-[#F3EFE6]/72 md:text-[12px]">
                      Cederhout, natuursteen en zinkwerk afgestemd op perceel en weersplanning.
                    </p>
                  </div>

                  {/* Studio-Highlighted Live PDOK + Weather + m² Widget Box */}
                  <div className="mt-2">
                    <StudioWidgetFrame pillLabel="5. Architectuur · PDOK + Werkweer">
                      <div className="p-2.5 text-[#162921] md:p-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-[#C86D44]" />
                            <span className="text-[10.5px] font-bold">
                              Dam, 1012 JS · Amsterdam
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1 rounded bg-[#162921]/8 px-1.5 py-0.5 text-[9.5px] font-semibold">
                            <CloudSun className="h-3 w-3 text-[#C86D44]" />
                            13°C Droog
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between rounded bg-[#162921] px-2.5 py-1.5 text-[10px] font-semibold text-[#F3EFE6]">
                          <span>48 m² Richtprijs: € 5.960 – € 7.260</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </div>
                      </div>
                    </StudioWidgetFrame>
                  </div>
                </div>

                <div className="col-span-5 overflow-hidden rounded-xl border border-[#F3EFE6]/16">
                  <img
                    src={gardenPavilionImg}
                    alt="Groeneveld architectural charred cedar pavilion"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Bottom Scroll Cue / Dot Nav */}
        <div className="mx-auto mt-4 flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 md:mt-6 md:px-8">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: DEMO_SLIDE_COUNT }).map((_, i) => (
              <button
                key={`slide-dot-${i}`}
                type="button"
                aria-label={`Scroll to demo ${i + 1}`}
                onClick={() => scrollToSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  activeSlideIdx === i
                    ? 'w-7 bg-[#1C1B18]'
                    : 'w-2 bg-[#1C1B18]/22 hover:bg-[#1C1B18]/45'
                }`}
              />
            ))}
          </div>

          <span className="font-mono-tabular text-[10.5px] text-[#1C1B18]/55">
            Scroll door voor de volgende demo’s of klik een voorbeeld aan →
          </span>
        </div>
      </div>
    </section>
  );
}
