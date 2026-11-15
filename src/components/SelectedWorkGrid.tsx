import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  ProjectCategory,
  ProjectConfig,
} from '../data/projects';
import { useProjectThumbnails } from '../utils/mockupGenerator';

interface SelectedWorkGridProps {
  onSelectProject: (project: ProjectConfig) => void;
  onStartProject: () => void;
  variant?: 'section' | 'page';
  onBackToOverview?: () => void;
}

type FilterOption = 'All' | ProjectCategory;

const FILTERS: FilterOption[] = ['All', ...PROJECT_CATEGORIES];

interface MetricDef {
  id: string;
  target?: number;
  suffix?: string;
  staticValue?: string;
  label: string;
}

const STUDIO_METRICS: MetricDef[] = [
  { id: 'hours', target: 24, suffix: ' Hours', label: 'Concept to live launch' },
  { id: 'editions', target: 340, suffix: '+', label: 'Editorial editions shipped' },
  { id: 'layers', target: 52, suffix: '-Layer', label: 'Procedural canvas craft' },
  { id: 'desks', staticValue: 'NYC · ZRH', label: 'Synchronized studio desk' },
];

type RowTiltSubscriber = (progress: number) => void;

interface WorkTileCardProps {
  project: ProjectConfig;
  index: number;
  cols: number;
  rowIndex: number;
  isOpen: boolean;
  subscribeRowTilt: (rowIdx: number, cb: RowTiltSubscriber) => () => void;
  anchorRef?: (el: HTMLDivElement | null) => void;
  imgSrc?: string;
  isDimmed: boolean;
  isSpotlighted: boolean;
  reducedMotion: boolean;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  onSelect: (project: ProjectConfig) => void;
}

function WorkTileCard({
  project,
  index,
  cols,
  rowIndex,
  isOpen,
  subscribeRowTilt,
  anchorRef,
  imgSrc,
  isDimmed,
  isSpotlighted,
  reducedMotion,
  onHoverStart,
  onHoverEnd,
  onSelect,
}: WorkTileCardProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const sheenRef = useRef<HTMLDivElement | null>(null);

  // Stage 1 (Start Punt): -176deg (upright closed alabaster card)
  // Stage 2 (Tijdens Scrollen): -110deg (tilted flat in 3D tabletop perspective)
  // Stage 3 (Eind Punt): 0deg (flipped upright to full project card, stays open)
  const rotateX = useMotionValue(-176);
  const tiltY = useMotionValue(4);
  const tiltScale = useMotionValue(0.95);
  const floorShadowOpacity = useMotionValue(0.08);

  useEffect(() => {
    if (isOpen) {
      const col = cols > 1 ? index % cols : 0;
      const delay = col * 0.085;
      const transition = {
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      };
      const controls = [
        animate(rotateX, 0, transition),
        animate(tiltY, 0, transition),
        animate(tiltScale, 1, transition),
        animate(floorShadowOpacity, 0, { duration: 0.45, delay }),
      ];
      return () => {
        controls.forEach((ctrl) => ctrl.stop());
      };
    }

    return subscribeRowTilt(rowIndex, (p) => {
      // Hold -176deg smoothly at entry, then tilt backward into tabletop pose (-110deg)
      const eased = p * p * (3 - 2 * p);
      rotateX.set(-176 + eased * 66);
      tiltY.set(4 + eased * 14);
      tiltScale.set(0.95 - eased * 0.04);
      floorShadowOpacity.set(0.08 + eased * 0.48);
    });
  }, [
    isOpen,
    index,
    cols,
    rowIndex,
    subscribeRowTilt,
    rotateX,
    tiltY,
    tiltScale,
    floorShadowOpacity,
  ]);

  const handlePointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'touch' || !isOpen) return;
    onHoverStart(project.id);
    if (buttonRef.current && !reducedMotion) {
      buttonRef.current.style.transition =
        'transform 120ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 250ms ease, border-color 250ms ease';
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'touch' || reducedMotion || !isOpen) return;
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 .. 1
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 .. 1

    const rotX = (-ny * 3.4).toFixed(2);
    const rotY = (nx * 4.2).toFixed(2);

    el.style.transform = `perspective(920px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, -4px, 0) scale(1.012)`;

    if (sheenRef.current) {
      const shiftX = (nx * 26).toFixed(1);
      const shiftY = (ny * 20).toFixed(1);
      sheenRef.current.style.opacity = '1';
      sheenRef.current.style.transform = `translate3d(${shiftX}%, ${shiftY}%, 0) rotate(18deg)`;
    }
  };

  const handlePointerLeave = () => {
    onHoverEnd();
    if (buttonRef.current) {
      buttonRef.current.style.transition =
        'transform 340ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 280ms ease, border-color 280ms ease';
      buttonRef.current.style.transform =
        'perspective(920px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0) scale(1)';
    }
    if (sheenRef.current) {
      sheenRef.current.style.opacity = '0';
      sheenRef.current.style.transform =
        'translate3d(-10%, -10%, 0) rotate(18deg)';
    }
  };

  return (
    <div
      ref={anchorRef}
      style={{ perspective: '1050px' }}
      className="relative"
    >
      {/* Subtle tabletop floor shadow visible during Stage 2 tilt */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: floorShadowOpacity }}
        className="pointer-events-none absolute inset-x-4 bottom-1 h-8 rounded-full bg-[#1C1B18]/18 blur-xl"
      />

      <motion.article
        style={{
          rotateX,
          y: tiltY,
          scale: tiltScale,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        {/* Front Face: Project Card */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(1px)',
          }}
          className={`transition-opacity duration-300 ${
            isDimmed ? 'opacity-72' : 'opacity-100'
          } ${isOpen ? '' : 'pointer-events-none'}`}
        >
          <button
            ref={buttonRef}
            type="button"
            tabIndex={isOpen ? 0 : -1}
            onPointerEnter={handlePointerEnter}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onClick={() => onSelect(project)}
            className={`glass-tile group relative block w-full overflow-hidden rounded-2xl p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A] ${
              isSpotlighted
                ? 'border-white/75 shadow-[0_24px_48px_-14px_rgba(28,27,24,0.16)]'
                : ''
            }`}
          >
            {/* Specular Diagonal Glass Sheen Overlay (mouse hover only) */}
            <div
              ref={sheenRef}
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1/2 z-20 opacity-0 transition-opacity duration-300 bg-gradient-to-tr from-transparent via-white/32 to-transparent"
              style={{
                transform: 'translate3d(-10%, -10%, 0) rotate(18deg)',
              }}
            />

            <div
              className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#1C1B18]/10"
              style={{ backgroundColor: project.palette.bg }}
            >
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt={`${project.styleName} — ${project.tagline}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-4 text-sm font-medium text-[#1C1B18]">
                  {project.styleName}
                </div>
              )}
            </div>

            <div className="relative z-10 mt-3 flex items-baseline justify-between gap-2 px-0.5">
              <div className="min-w-0">
                <h3 className="truncate text-[15px] font-semibold tracking-[-0.015em] text-[#1C1B18] transition-colors group-hover:text-[#C98A3A]">
                  {project.styleName}
                </h3>
                <p className="mt-0.5 truncate text-[11px] text-[#1C1B18]/65">
                  {project.tagline}
                </p>
              </div>
              <span className="font-mono-tabular shrink-0 text-[11px] font-medium text-[#1C1B18]/50">
                {project.index}
              </span>
            </div>
          </button>
        </div>

        {/* Back Face: Warm Alabaster Glass Cover matching FORMA brand palette */}
        <div
          aria-hidden="true"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateX(180deg) translateZ(1px)',
            background:
              'linear-gradient(150deg, rgba(255,255,255,0.82) 0%, rgba(247,245,240,0.72) 55%, rgba(240,236,227,0.8) 100%)',
          }}
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl border border-white/65 p-3 shadow-[0_16px_36px_-14px_rgba(28,27,24,0.12)]"
        >
          {/* Inner Frosted Preview Frame (mirrors open card proportions) */}
          <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl border border-[#1C1B18]/8 bg-[#F4F1EA]/70">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.55) 0%, transparent 55%)',
              }}
            />
            <span className="relative text-[10px] font-medium tracking-[0.26em] text-[#1C1B18]/25 uppercase">
              FORMA
            </span>
          </div>

          {/* Matching Editorial Metadata Footer */}
          <div className="mt-3 flex items-baseline justify-between gap-2 px-0.5">
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold tracking-[-0.015em] text-[#1C1B18]/80">
                {project.styleName}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-[#1C1B18]/50">
                {project.tagline}
              </p>
            </div>
            <span className="font-mono-tabular shrink-0 text-[11px] font-medium text-[#1C1B18]/45">
              {project.index}
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function SelectedWorkGrid({
  onSelectProject,
  onStartProject,
  variant = 'section',
  onBackToOverview,
}: SelectedWorkGridProps) {
  const isStandalonePage = variant === 'page';
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [gridCols, setGridCols] = useState<number>(() => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  });
  const [metricProgress, setMetricProgress] = useState<number>(() =>
    prefersReducedMotion ? 1 : 0,
  );
  const [openedRows, setOpenedRows] = useState<number[]>([]);
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedMetricsRef = useRef(false);
  const rowAnchorRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const rowTiltSubscribersRef = useRef<Map<number, Set<RowTiltSubscriber>>>(
    new Map(),
  );
  const prevFilterRef = useRef<FilterOption>(activeFilter);

  const subscribeRowTilt = useMemo(
    () => (rowIdx: number, cb: RowTiltSubscriber) => {
      let set = rowTiltSubscribersRef.current.get(rowIdx);
      if (!set) {
        set = new Set();
        rowTiltSubscribersRef.current.set(rowIdx, set);
      }
      set.add(cb);
      return () => {
        set?.delete(cb);
      };
    },
    [],
  );

  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      if (w < 640) setGridCols(1);
      else if (w < 1024) setGridCols(2);
      else setGridCols(4);
    };
    updateCols();
    window.addEventListener('resize', updateCols, { passive: true });
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const thumbnails = useProjectThumbnails();

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // 3-stage scroll choreography:
  // 1) Start Punt (upright closed alabaster cover) -> 2) Tijdens Scrollen (tilts backward in 3D) -> 3) Eind Punt (flips open and stays open)
  useEffect(() => {
    const filterChanged = prevFilterRef.current !== activeFilter;
    prevFilterRef.current = activeFilter;
    if (filterChanged) {
      setOpenedRows([]);
    }

    let rafId = 0;

    const evaluateRows = () => {
      rafId = 0;
      const vh = Math.max(window.innerHeight, 1);
      const startY = gridCols <= 1 ? vh * 0.84 : vh * 0.72;
      const triggerY =
        gridCols <= 1
          ? vh * 0.62
          : isStandalonePage
            ? vh * 0.58
            : vh * 0.48;
      const tiltSpan = Math.max(startY - triggerY, 1);
      const atPageBottom =
        window.scrollY + vh >= document.documentElement.scrollHeight - 48;

      const toOpen: number[] = [];
      rowAnchorRefs.current.forEach((el, rowIdx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerY || atPageBottom) {
          toOpen.push(rowIdx);
        } else {
          const progress = Math.min(Math.max((startY - rect.top) / tiltSpan, 0), 1);
          const subscribers = rowTiltSubscribersRef.current.get(rowIdx);
          subscribers?.forEach((cb) => cb(progress));
        }
      });

      if (toOpen.length > 0) {
        setOpenedRows((prev) => {
          const next = new Set(prev);
          let changed = false;
          for (const r of toOpen) {
            if (!next.has(r)) {
              next.add(r);
              changed = true;
            }
          }
          return changed ? Array.from(next) : prev;
        });
      }
    };

    const onScrollOrResize = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(evaluateRows);
      }
    };

    const initialDelay = filterChanged ? 80 : isStandalonePage ? 160 : 16;
    const timerId = window.setTimeout(evaluateRows, initialDelay);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [activeFilter, gridCols, isStandalonePage]);

  // Animate Studio Metrics count-up cleanly once when scrolled into view
  useEffect(() => {
    if (prefersReducedMotion) {
      setMetricProgress(1);
      return;
    }

    const targetEl = metricsRef.current;
    if (!targetEl || hasAnimatedMetricsRef.current) return;

    let rafId = 0;
    const startCount = () => {
      if (hasAnimatedMetricsRef.current) return;
      hasAnimatedMetricsRef.current = true;
      const startTime = performance.now();
      const durationMs = 880;

      const step = (now: number) => {
        const rawT = Math.min(Math.max((now - startTime) / durationMs, 0), 1);
        const eased = 1 - Math.pow(1 - rawT, 3);
        setMetricProgress(eased);
        if (rawT < 1) {
          rafId = window.requestAnimationFrame(step);
        }
      };

      rafId = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startCount();
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(targetEl);
    return () => {
      observer.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id={isStandalonePage ? 'work-archive' : 'selected-work'}
      aria-label="Website Design Directions"
      className={`relative z-10 w-full px-4 md:px-8 ${
        isStandalonePage
          ? 'pt-28 pb-12 md:pt-34 md:pb-16'
          : 'pt-14 pb-16 md:pt-20 md:pb-24'
      }`}
    >
      <div className="mx-auto max-w-[1200px]">
        {isStandalonePage && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            {onBackToOverview && (
              <button
                type="button"
                onClick={onBackToOverview}
                className="glass-subtle inline-flex h-9 items-center gap-2 rounded-full px-4 text-[12px] font-medium text-[#1C1B18] transition-colors hover:bg-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Overview</span>
              </button>
            )}
            <span className="font-mono-tabular text-[11px] font-medium tracking-[0.06em] text-[#1C1B18]/55 uppercase">
              02 / Design Directions · {PROJECTS.length} Styles
            </span>
          </div>
        )}

        {/* Section / Page Header */}
        {isStandalonePage ? (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 flex flex-col gap-5 border-b border-[#1C1B18]/12 pb-8 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="max-w-2xl">
              <p className="text-[12px] font-medium tracking-[0.04em] text-[#C98A3A]">
                {PROJECTS.length} Signature Styles — Choose your visual foundation
              </p>
              <h1 className="display-tight mt-2 text-[clamp(2.35rem,4.5vw,3.85rem)] leading-[1.03] font-semibold text-[#1C1B18]">
                Design Directions
              </h1>
              <p className="mt-3 max-w-[56ch] text-[14px] leading-[1.65] text-[#1C1B18]/72 sm:text-[15px]">
                Twelve signature website design directions—built for corporate SaaS,
                luxury ateliers, technical products, and editorial brands. Select any
                direction to inspect its blueprint and tailor it to your business in 24 hours.
              </p>
            </div>

            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex h-10 items-center justify-center self-start rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] sm:self-auto"
            >
              + Start a project
            </button>
          </motion.div>
        ) : null}

        {/* Studio Proof Metrics Strip (live count-up on first reveal) */}
        <motion.div
          ref={metricsRef}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={`glass-tile grid grid-cols-2 gap-4 rounded-2xl p-4 md:grid-cols-4 md:gap-6 md:px-7 md:py-5 ${
            isStandalonePage ? 'mb-8 md:mb-10' : 'mb-12 md:mb-14'
          }`}
        >
          {STUDIO_METRICS.map((metric) => {
            const displayValue =
              metric.target !== undefined
                ? `${Math.round(metric.target * metricProgress)}${metric.suffix ?? ''}`
                : metric.staticValue;

            return (
              <div key={metric.id}>
                <p className="font-mono-tabular text-[19px] font-semibold tracking-[-0.02em] text-[#1C1B18] md:text-[22px]">
                  {displayValue}
                </p>
                <p className="mt-0.5 text-[12px] text-[#1C1B18]/70">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </motion.div>

        {/* Section Header (home section only; standalone page displays full h1 above) */}
        {!isStandalonePage && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5 border-b border-[#1C1B18]/12 pb-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-[12px] font-medium tracking-[0.04em] text-[#C98A3A]">
                {PROJECTS.length} Signature Styles — Choose your visual foundation
              </p>
              <h2 className="display-tight mt-1.5 text-[clamp(2rem,3.4vw,3rem)] leading-[1.06] font-semibold text-[#1C1B18]">
                Design Directions
              </h2>
            </div>

            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex h-10 items-center justify-center self-start rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] sm:self-auto"
            >
              + Start a project
            </button>
          </motion.div>
        )}

        {/* Interactive Filter Tabs with Sliding Active Pill */}
        <div
          role="tablist"
          aria-label="Filter design directions by sector"
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          {FILTERS.map((filter) => {
            const isSelected = activeFilter === filter;
            const count =
              filter === 'All'
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === filter).length;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setHoveredId(null);
                  setActiveFilter(filter);
                }}
                className={`relative rounded-full px-4 py-1.5 text-[12px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#C98A3A] ${
                  isSelected
                    ? 'text-[#F7F5F0]'
                    : 'glass-subtle text-[#1C1B18]/75 hover:bg-white/30 hover:text-[#1C1B18]'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="selected-work-filter-pill"
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 460, damping: 36 }
                    }
                    className="absolute inset-0 rounded-full bg-[#1C1B18]"
                  />
                )}
                <span className="relative z-10">
                  {filter}{' '}
                  <span className="font-mono-tabular opacity-65">({count})</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Standard Glassmorphism 4-Column Responsive Portfolio Grid */}
        <div
          key={activeFilter}
          onPointerLeave={() => setHoveredId(null)}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {visibleProjects.map((project, idx) => {
            const rowIndex = gridCols > 1 ? Math.floor(idx / gridCols) : idx;
            const isRowLeader = gridCols <= 1 || idx % gridCols === 0;
            const isRowOpen = openedRows.includes(rowIndex);

            return (
              <WorkTileCard
                key={project.id}
                project={project}
                index={idx}
                cols={gridCols}
                rowIndex={rowIndex}
                isOpen={isRowOpen}
                subscribeRowTilt={subscribeRowTilt}
                anchorRef={
                  isRowLeader
                    ? (el) => {
                        if (el) rowAnchorRefs.current.set(rowIndex, el);
                        else rowAnchorRefs.current.delete(rowIndex);
                      }
                    : undefined
                }
                imgSrc={thumbnails.get(project.id)}
                isDimmed={hoveredId !== null && hoveredId !== project.id}
                isSpotlighted={hoveredId === project.id}
                reducedMotion={prefersReducedMotion}
                onHoverStart={(id) => setHoveredId(id)}
                onHoverEnd={() => setHoveredId(null)}
                onSelect={onSelectProject}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
