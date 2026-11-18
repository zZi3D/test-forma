import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface GlassHeaderProps {
  activePage: 'home' | 'work' | 'examples';
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenMenu: () => void;
}

interface NavLinkItem {
  label: string;
  target: string;
  page: 'home' | 'work' | 'examples' | null;
}

const LEFT_LINKS: NavLinkItem[] = [
  { label: 'Overview', target: 'hero-wave', page: 'home' },
  { label: 'Directions', target: 'work', page: 'work' },
  { label: 'Examples', target: 'examples', page: 'examples' },
];

const RIGHT_LINKS: NavLinkItem[] = [
  { label: 'Process', target: 'process-studio', page: null },
  { label: 'Contact', target: 'studio-footer', page: null },
];

const DESKTOP_BAR_HEIGHT = 56;
const DESKTOP_CAP_RADIUS = DESKTOP_BAR_HEIGHT / 2;
const DESKTOP_TOP_PINCH_Y = 22.5;
const DESKTOP_BOTTOM_PINCH_Y = 33.5;

function getDesktopHalfGap(width: number): number {
  const w = Math.max(width, 640);
  const cx = w / 2;
  const maxHalfGap = Math.max(58, cx - (w < 880 ? 256 : 312));
  return Math.min(136, maxHalfGap);
}

function buildSculptedWaistPath(width: number): string {
  const w = Math.max(width, 640);
  const h = DESKTOP_BAR_HEIGHT;
  const r = DESKTOP_CAP_RADIUS;
  const cx = w / 2;

  const halfGap = getDesktopHalfGap(w);
  const ls = cx - halfGap;
  const rs = cx + halfGap;
  const c = halfGap * 0.48;

  return [
    `M ${r} 0`,
    `L ${ls} 0`,
    `C ${ls + c} 0, ${cx - c} ${DESKTOP_TOP_PINCH_Y}, ${cx} ${DESKTOP_TOP_PINCH_Y}`,
    `C ${cx + c} ${DESKTOP_TOP_PINCH_Y}, ${rs - c} 0, ${rs} 0`,
    `L ${w - r} 0`,
    `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
    `L ${rs} ${h}`,
    `C ${rs - c} ${h}, ${cx + c} ${DESKTOP_BOTTOM_PINCH_Y}, ${cx} ${DESKTOP_BOTTOM_PINCH_Y}`,
    `C ${cx - c} ${DESKTOP_BOTTOM_PINCH_Y}, ${ls + c} ${h}, ${ls} ${h}`,
    `L ${r} ${h}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    'Z',
  ].join(' ');
}

function buildCurvedArchTextPath(halfGap: number, pinchY: number, yOffset: number): string {
  const w = halfGap * 2;
  const cx = halfGap;
  const c = halfGap * 0.48;
  const yEdge = yOffset;
  const yPeak = pinchY + yOffset;
  return `M 0 ${yEdge} C ${c} ${yEdge}, ${cx - c} ${yPeak}, ${cx} ${yPeak} C ${cx + c} ${yPeak}, ${w - c} ${yEdge}, ${w} ${yEdge}`;
}

const MOBILE_BAR_HEIGHT = 52;
const MOBILE_CAP_RADIUS = MOBILE_BAR_HEIGHT / 2;
const MOBILE_TOP_PINCH_Y = 13.5;
const MOBILE_BOTTOM_PINCH_Y = 38.5;

function getMobileHalfGap(width: number): number {
  const w = Math.max(width, 290);
  return Math.min(72, Math.max(46, w * 0.165));
}

function buildMobileSculptedWaistPath(width: number): string {
  const w = Math.max(width, 290);
  const h = MOBILE_BAR_HEIGHT;
  const r = MOBILE_CAP_RADIUS;
  const cx = w / 2;

  // Preserve generous left lobe for Menu and right lobe for Start a Sprint while pinching the center
  const halfGap = getMobileHalfGap(w);
  const ls = cx - halfGap;
  const rs = cx + halfGap;
  const c = halfGap * 0.48;

  return [
    `M ${r} 0`,
    `L ${ls} 0`,
    `C ${ls + c} 0, ${cx - c} ${MOBILE_TOP_PINCH_Y}, ${cx} ${MOBILE_TOP_PINCH_Y}`,
    `C ${cx + c} ${MOBILE_TOP_PINCH_Y}, ${rs - c} 0, ${rs} 0`,
    `L ${w - r} 0`,
    `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
    `L ${rs} ${h}`,
    `C ${rs - c} ${h}, ${cx + c} ${MOBILE_BOTTOM_PINCH_Y}, ${cx} ${MOBILE_BOTTOM_PINCH_Y}`,
    `C ${cx - c} ${MOBILE_BOTTOM_PINCH_Y}, ${ls + c} ${h}, ${ls} ${h}`,
    `L ${r} ${h}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    'Z',
  ].join(' ');
}

function StudioReticleIcon({
  size = 24,
  spinning = false,
}: {
  size?: number;
  spinning?: boolean;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={spinning ? { rotate: 360, scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="10.5" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="14" cy="14" r="3.4" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="20.4" cy="14" r="1.25" fill="currentColor" />
    </motion.svg>
  );
}

export function GlassHeader({
  activePage,
  onNavigateSection,
  onOpenBooking,
  onOpenMenu,
}: GlassHeaderProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const barRef = useRef<HTMLDivElement | null>(null);
  const mobileBarRef = useRef<HTMLDivElement | null>(null);
  const revealTimerRef = useRef<number | null>(null);

  const desktopCurveId = useId();
  const mobileCurveId = useId();

  const [barWidth, setBarWidth] = useState<number>(976);
  const [mobileBarWidth, setMobileBarWidth] = useState<number>(360);
  const [brandRevealActive, setBrandRevealActive] = useState(false);

  useEffect(() => {
    const observeEl = (
      el: HTMLDivElement | null,
      setter: (w: number) => void,
    ) => {
      if (!el) return () => {};
      const updateWidth = () => {
        const next = Math.round(el.getBoundingClientRect().width);
        if (next > 0) setter(next);
      };
      updateWidth();

      if (typeof ResizeObserver === 'undefined') {
        window.addEventListener('resize', updateWidth, { passive: true });
        return () => window.removeEventListener('resize', updateWidth);
      }

      const observer = new ResizeObserver(updateWidth);
      observer.observe(el);
      return () => observer.disconnect();
    };

    const cleanupDesktop = observeEl(barRef.current, setBarWidth);
    const cleanupMobile = observeEl(mobileBarRef.current, setMobileBarWidth);
    return () => {
      cleanupDesktop();
      cleanupMobile();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (revealTimerRef.current !== null) {
        window.clearTimeout(revealTimerRef.current);
      }
    };
  }, []);

  const handleGoHome = () => {
    if (revealTimerRef.current !== null) {
      window.clearTimeout(revealTimerRef.current);
    }
    setBrandRevealActive(true);
    onNavigateSection('hero-wave');
    revealTimerRef.current = window.setTimeout(() => {
      setBrandRevealActive(false);
    }, 1250);
  };

  const waistPath = useMemo(() => buildSculptedWaistPath(barWidth), [barWidth]);
  const mobileWaistPath = useMemo(
    () => buildMobileSculptedWaistPath(mobileBarWidth),
    [mobileBarWidth],
  );
  const desktopHalfGap = useMemo(() => getDesktopHalfGap(barWidth), [barWidth]);
  const mobileHalfGap = useMemo(
    () => getMobileHalfGap(mobileBarWidth),
    [mobileBarWidth],
  );
  const desktopTextCurvePath = useMemo(
    () => buildCurvedArchTextPath(desktopHalfGap, DESKTOP_TOP_PINCH_Y, -5.5),
    [desktopHalfGap],
  );
  const mobileTextCurvePath = useMemo(
    () => buildCurvedArchTextPath(mobileHalfGap, MOBILE_TOP_PINCH_Y, -4.5),
    [mobileHalfGap],
  );

  const renderNavLink = (link: NavLinkItem) => {
    const isActive = link.page !== null && link.page === activePage;
    return (
      <button
        key={link.target}
        type="button"
        aria-current={isActive ? 'page' : undefined}
        onClick={() => onNavigateSection(link.target)}
        className={`relative inline-flex items-center gap-1.5 text-[12.5px] lg:text-[13px] whitespace-nowrap shrink-0 underline-offset-4 transition-colors hover:text-[#1C1B18] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A] ${
          isActive
            ? 'font-semibold text-[#1C1B18]'
            : 'font-medium text-[#1C1B18]/78'
        }`}
      >
        {isActive && (
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[#C98A3A]"
          />
        )}
        <span>{link.label}</span>
      </button>
    );
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3.5 z-40 px-3.5 md:top-4 md:px-8">
      {/* Mobile Sculpted Hourglass Header (< 768px) — logo-only hourglass + Home EDITION ONE reveal */}
      <div className="pointer-events-auto relative mx-auto max-w-[540px] pt-1 pb-1 md:hidden">
        <div ref={mobileBarRef} className="relative h-[52px] w-full">
          {/* Drop Shadow Envelope */}
          <svg
            aria-hidden="true"
            width={mobileBarWidth}
            height={MOBILE_BAR_HEIGHT}
            viewBox={`0 0 ${mobileBarWidth} ${MOBILE_BAR_HEIGHT}`}
            fill="none"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            style={{
              filter:
                'drop-shadow(0 12px 24px rgba(28, 27, 24, 0.09)) drop-shadow(0 3px 8px rgba(28, 27, 24, 0.05))',
            }}
          >
            <path d={mobileWaistPath} fill="rgba(255, 255, 255, 0.42)" />
          </svg>

          {/* Clipped Luminous Frosted Fill (avoids WebKit clip-path + backdrop-filter sticky flicker on mobile) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(250, 248, 243, 0.88) 100%)',
              WebkitClipPath: `path('${mobileWaistPath}')`,
              clipPath: `path('${mobileWaistPath}')`,
            }}
          />

          {/* Crisp Edge Stroke */}
          <svg
            aria-hidden="true"
            width={mobileBarWidth}
            height={MOBILE_BAR_HEIGHT}
            viewBox={`0 0 ${mobileBarWidth} ${MOBILE_BAR_HEIGHT}`}
            fill="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <path
              d={mobileWaistPath}
              stroke="rgba(255, 255, 255, 0.94)"
              strokeWidth="1.25"
            />
          </svg>

          {/* Left & Right Lobe Controls */}
          <div className="relative z-10 flex h-full items-center justify-between pl-2.5 pr-1.5">
            <button
              type="button"
              onClick={onOpenMenu}
              aria-label="Open navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1C1B18]/12 bg-white/45 text-[#1C1B18] transition-colors hover:bg-[#1C1B18]/8"
            >
              <Menu className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#1C1B18] px-3.5 text-[11.5px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
            >
              Start a Sprint
            </button>
          </div>
        </div>

        {/* Centered Hourglass Logo Emblem + Curved "EDITION ONE" Home-Arrival Reveal */}
        <button
          type="button"
          onClick={handleGoHome}
          aria-label="Edition One — Return to Home"
          className="group absolute inset-y-0 left-1/2 z-20 flex w-28 -translate-x-1/2 items-center justify-center text-[#1C1B18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A]"
        >
          <AnimatePresence>
            {brandRevealActive && (
              <motion.svg
                aria-hidden="true"
                width={Math.round(mobileHalfGap * 2)}
                height={MOBILE_BAR_HEIGHT}
                viewBox={`0 0 ${Math.round(mobileHalfGap * 2)} ${MOBILE_BAR_HEIGHT}`}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 4, scale: 0.92 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 3, scale: 0.94 }
                }
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute top-1 left-1/2 -translate-x-1/2 overflow-visible text-[#1C1B18]"
              >
                <defs>
                  <path id={mobileCurveId} d={mobileTextCurvePath} />
                </defs>
                <text
                  fill="currentColor"
                  className="text-[9.5px] font-semibold tracking-[0.14em] uppercase"
                >
                  <textPath
                    href={`#${mobileCurveId}`}
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    EDITION ONE
                  </textPath>
                </text>
              </motion.svg>
            )}
          </AnimatePresence>

          <span
            className={`transition-colors duration-200 ${
              brandRevealActive ? 'text-[#C98A3A]' : 'group-hover:text-[#C98A3A]'
            }`}
          >
            <StudioReticleIcon
              size={22}
              spinning={!prefersReducedMotion && brandRevealActive}
            />
          </span>
        </button>
      </div>

      {/* Desktop Sculpted Hourglass Glass Header (md+) */}
      <div className="pointer-events-auto relative mx-auto hidden max-w-[1040px] pt-[8px] pb-[8px] md:block">
        {/* Centered Curved Wordmark Nestled Along Upper Arch & Reticle Icon in Lower Arch */}
        <button
          type="button"
          onClick={handleGoHome}
          aria-label="Edition One — Return to top"
          className="group absolute inset-y-0 left-1/2 z-20 flex w-[280px] -translate-x-1/2 flex-col items-center justify-end text-[#1C1B18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A]"
        >
          <svg
            aria-hidden="true"
            width={Math.round(desktopHalfGap * 2)}
            height={DESKTOP_BAR_HEIGHT}
            viewBox={`0 0 ${Math.round(desktopHalfGap * 2)} ${DESKTOP_BAR_HEIGHT}`}
            className={`pointer-events-none absolute top-[8px] left-1/2 -translate-x-1/2 overflow-visible transition-colors duration-200 ${
              brandRevealActive ? 'text-[#C98A3A]' : 'group-hover:text-[#C98A3A]'
            }`}
          >
            <defs>
              <path id={desktopCurveId} d={desktopTextCurvePath} />
            </defs>
            <text
              fill="currentColor"
              className="text-[12.5px] lg:text-[13.5px] font-semibold tracking-[0.18em] uppercase"
            >
              <textPath
                href={`#${desktopCurveId}`}
                startOffset="50%"
                textAnchor="middle"
              >
                EDITION ONE
              </textPath>
            </text>
          </svg>

          <span
            className={`transition-colors duration-200 ${
              brandRevealActive ? 'text-[#C98A3A]' : 'group-hover:text-[#C98A3A]'
            }`}
          >
            <StudioReticleIcon
              size={24}
              spinning={!prefersReducedMotion && brandRevealActive}
            />
          </span>
        </button>

        {/* Sculpted Pinched-Waist Pill Bar */}
        <div ref={barRef} className="relative h-[56px] w-full">
          {/* Ambient Drop Shadow Envelope */}
          <svg
            aria-hidden="true"
            width={barWidth}
            height={DESKTOP_BAR_HEIGHT}
            viewBox={`0 0 ${barWidth} ${DESKTOP_BAR_HEIGHT}`}
            fill="none"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            style={{
              filter:
                'drop-shadow(0 14px 28px rgba(28, 27, 24, 0.08)) drop-shadow(0 3px 8px rgba(28, 27, 24, 0.04))',
            }}
          >
            <path d={waistPath} fill="rgba(255, 255, 255, 0.35)" />
          </svg>

          {/* Clipped Frosted Glass Fill */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.80) 0%, rgba(255, 255, 255, 0.66) 100%)',
              WebkitBackdropFilter: 'blur(14px)',
              backdropFilter: 'blur(14px)',
              WebkitClipPath: `path('${waistPath}')`,
              clipPath: `path('${waistPath}')`,
            }}
          />

          {/* Crisp Luminous Edge Stroke */}
          <svg
            aria-hidden="true"
            width={barWidth}
            height={DESKTOP_BAR_HEIGHT}
            viewBox={`0 0 ${barWidth} ${DESKTOP_BAR_HEIGHT}`}
            fill="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <path
              d={waistPath}
              stroke="rgba(255, 255, 255, 0.94)"
              strokeWidth="1.25"
            />
          </svg>

          {/* Left & Right Lobe Navigation */}
          <nav
            aria-label="Primary navigation"
            className="relative z-10 flex h-full items-center justify-between pl-6 pr-[9px] lg:pl-8"
          >
            <div className="flex items-center gap-4 lg:gap-7">
              {LEFT_LINKS.map(renderNavLink)}
            </div>

            <div className="flex items-center gap-4 lg:gap-7">
              {RIGHT_LINKS.map(renderNavLink)}
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex h-[38px] items-center justify-center rounded-full bg-[#1C1B18] px-5 text-[12.5px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
              >
                Start a Sprint
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
