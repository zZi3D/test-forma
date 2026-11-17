import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu } from 'lucide-react';

interface GlassHeaderProps {
  activePage: 'home' | 'work';
  onNavigateSection: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenMenu: () => void;
}

interface NavLinkItem {
  label: string;
  target: string;
  page: 'home' | 'work' | null;
}

const LEFT_LINKS: NavLinkItem[] = [
  { label: 'Overview', target: 'hero-wave', page: 'home' },
  { label: 'Directions', target: 'work', page: 'work' },
  { label: 'Playground', target: 'style-playground', page: null },
];

const RIGHT_LINKS: NavLinkItem[] = [
  { label: 'Process', target: 'process-studio', page: null },
  { label: 'Contact', target: 'studio-footer', page: null },
];

const BAR_HEIGHT = 56;
const CAP_RADIUS = BAR_HEIGHT / 2; // 28px semicircular end caps
const TOP_PINCH_Y = 22.5;
const BOTTOM_PINCH_Y = 33.5;

function buildSculptedWaistPath(width: number): string {
  const w = Math.max(width, 640);
  const h = BAR_HEIGHT;
  const r = CAP_RADIUS;
  const cx = w / 2;

  // Adapt the pinched-waist span so side lobes always keep generous room for nav links
  const maxHalfGap = Math.max(58, cx - (w < 880 ? 256 : 312));
  const halfGap = Math.min(136, maxHalfGap);
  const ls = cx - halfGap;
  const rs = cx + halfGap;
  const c = halfGap * 0.48;

  return [
    `M ${r} 0`,
    `L ${ls} 0`,
    `C ${ls + c} 0, ${cx - c} ${TOP_PINCH_Y}, ${cx} ${TOP_PINCH_Y}`,
    `C ${cx + c} ${TOP_PINCH_Y}, ${rs - c} 0, ${rs} 0`,
    `L ${w - r} 0`,
    `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
    `L ${rs} ${h}`,
    `C ${rs - c} ${h}, ${cx + c} ${BOTTOM_PINCH_Y}, ${cx} ${BOTTOM_PINCH_Y}`,
    `C ${cx - c} ${BOTTOM_PINCH_Y}, ${ls + c} ${h}, ${ls} ${h}`,
    `L ${r} ${h}`,
    `A ${r} ${r} 0 0 1 ${r} 0`,
    'Z',
  ].join(' ');
}

function StudioReticleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="10.5" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="14" cy="14" r="3.4" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="20.4" cy="14" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function GlassHeader({
  activePage,
  onNavigateSection,
  onOpenBooking,
  onOpenMenu,
}: GlassHeaderProps) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [barWidth, setBarWidth] = useState<number>(976);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const updateWidth = () => {
      const next = Math.round(el.getBoundingClientRect().width);
      if (next > 0) {
        setBarWidth((prev) => (prev === next ? prev : next));
      }
    };

    updateWidth();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateWidth, { passive: true });
      return () => window.removeEventListener('resize', updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const waistPath = useMemo(() => buildSculptedWaistPath(barWidth), [barWidth]);

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
    <header className="pointer-events-none fixed inset-x-0 top-3.5 z-40 px-4 md:top-4 md:px-8">
      {/* Mobile Compact Glass Pill (< 768px) */}
      <div className="glass-elevated pointer-events-auto mx-auto flex max-w-[600px] items-center justify-between gap-4 rounded-full px-5 py-2.5 md:hidden">
        <button
          type="button"
          onClick={() => onNavigateSection('hero-wave')}
          className="group flex items-center gap-2.5 text-[#1C1B18] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A]"
        >
          <StudioReticleIcon size={21} />
          <span className="text-[12.5px] font-semibold tracking-[0.16em]">EDITION ONE</span>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1C1B18]/15 text-[#1C1B18] transition-colors hover:bg-[#1C1B18]/5"
          >
            <Menu className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex h-9 items-center justify-center rounded-full bg-[#1C1B18] px-4 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
          >
            Start a Sprint
          </button>
        </div>
      </div>

      {/* Desktop Sculpted Hourglass Glass Header (md+) */}
      <div className="pointer-events-auto relative mx-auto hidden max-w-[1040px] pt-[8px] pb-[8px] md:block">
        {/* Centered Wordmark Nestled in Upper Arch & Reticle Icon in Lower Arch */}
        <button
          type="button"
          onClick={() => onNavigateSection('hero-wave')}
          aria-label="Edition One — Return to top"
          className="group absolute inset-y-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center justify-between px-3 pt-[7px] text-[#1C1B18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A]"
        >
          <span className="pl-[0.18em] text-[12.5px] lg:text-[13.5px] leading-none font-semibold tracking-[0.18em] whitespace-nowrap transition-colors duration-200 group-hover:text-[#C98A3A]">
            EDITION ONE
          </span>
          <span className="transition-colors duration-200 group-hover:text-[#C98A3A]">
            <StudioReticleIcon size={24} />
          </span>
        </button>

        {/* Sculpted Pinched-Waist Pill Bar */}
        <div ref={barRef} className="relative h-[56px] w-full">
          {/* Ambient Drop Shadow Envelope (separate SVG so filter doesn't isolate backdrop-filter) */}
          <svg
            aria-hidden="true"
            width={barWidth}
            height={BAR_HEIGHT}
            viewBox={`0 0 ${barWidth} ${BAR_HEIGHT}`}
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
            height={BAR_HEIGHT}
            viewBox={`0 0 ${barWidth} ${BAR_HEIGHT}`}
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
