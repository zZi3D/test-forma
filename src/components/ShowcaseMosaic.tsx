import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  INDUSTRY_FILTERS,
  IndustryFilter,
  PROJECTS,
  ProjectConfig,
} from '../data/projects';
import { useProjectThumbnails } from '../utils/mockupGenerator';
import { hasLiveDemoArtboard, ScaledDemoArtboard } from './DemoArtboardPreview';

interface ShowcaseMosaicProps {
  onSelectProject: (project: ProjectConfig) => void;
  onOpenLiveDemo?: (demoId: string) => void;
  isHeroPage?: boolean;
}

type FilterOption = 'All' | IndustryFilter;
const FILTERS: FilterOption[] = ['All', ...INDUSTRY_FILTERS];

// Desktop: 3 rows × 4 columns = all 12 Design Directions in order 01–12
// Row 0: [01, 02, 03, 04]  <- all four stay open by default at start
const DESKTOP_ROWS: ProjectConfig[][] = [
  [PROJECTS[0], PROJECTS[1], PROJECTS[2], PROJECTS[3]],
  [PROJECTS[4], PROJECTS[5], PROJECTS[6], PROJECTS[7]],
  [PROJECTS[8], PROJECTS[9], PROJECTS[10], PROJECTS[11]],
];

// Mobile: 2 columns × 3 rows initially (01–06), expandable to 2×6 (all 12) via "See more"
// Row 0: [01, 02]  <- first two stay open by default at start
const MOBILE_INITIAL_ROWS: ProjectConfig[][] = [
  [PROJECTS[0], PROJECTS[1]],
  [PROJECTS[2], PROJECTS[3]],
  [PROJECTS[4], PROJECTS[5]],
];

const MOBILE_ALL_ROWS: ProjectConfig[][] = [
  [PROJECTS[0], PROJECTS[1]],
  [PROJECTS[2], PROJECTS[3]],
  [PROJECTS[4], PROJECTS[5]],
  [PROJECTS[6], PROJECTS[7]],
  [PROJECTS[8], PROJECTS[9]],
  [PROJECTS[10], PROJECTS[11]],
];

const DESKTOP_START_IDS = new Set([
  PROJECTS[0].id,
  PROJECTS[1].id,
  PROJECTS[2].id,
  PROJECTS[3].id,
]);

const MOBILE_START_IDS = new Set([PROJECTS[0].id, PROJECTS[1].id]);

const FLIP_EASE = [0.16, 1, 0.3, 1] as const;
const MIN_PIN_TOP_PX = 112;
const MAX_PIN_TOP_PX = 152;
const DESKTOP_HOLD_PX = 540;
const MOBILE_MIN_PIN_TOP_PX = 78;
const MOBILE_MAX_PIN_TOP_PX = 92;
const MOBILE_HOLD_PX = 280;

function clamp01(val: number): number {
  return Math.max(0, Math.min(1, val));
}

function easeOutCubic(val: number): number {
  const c = clamp01(val);
  return 1 - Math.pow(1 - c, 3);
}

interface CardFaceProps {
  project: ProjectConfig;
  imageUrl?: string;
  isStartCard?: boolean;
  isBestMatch?: boolean;
  isClickable: boolean;
  onSelect: (project: ProjectConfig) => void;
  onOpenLiveDemo?: (demoId: string) => void;
}

function OpenProjectCard({
  project,
  imageUrl,
  isStartCard,
  isBestMatch,
  isClickable,
  onSelect,
  onOpenLiveDemo,
}: CardFaceProps) {
  return (
    <div className="relative">
      <button
        type="button"
        tabIndex={isClickable ? 0 : -1}
        onClick={() => onSelect(project)}
        aria-label={`Inspect ${project.businessTitle} (${project.styleSubtitle})`}
        className={`glass-tile group relative block w-full overflow-hidden rounded-2xl p-2 text-left transition-[border-color,box-shadow] duration-200 hover:border-[#C98A3A]/55 hover:shadow-[0_24px_48px_-14px_rgba(28,27,24,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A] md:p-2.5 ${
          isStartCard
            ? 'border-white/85 shadow-[0_24px_54px_-18px_rgba(28,27,24,0.16)]'
            : ''
        }`}
      >
        <div
          className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#1C1B18]/10"
          style={{ backgroundColor: project.palette.bg }}
        >
          {isBestMatch && (
            <span className="font-mono-tabular pointer-events-none absolute top-1.5 right-1.5 z-10 rounded-md border border-[#C98A3A]/45 bg-[#FAF8F4]/95 px-1.5 py-0.5 text-[8px] font-semibold tracking-[0.04em] text-[#B47323] uppercase shadow-xs md:top-2 md:right-2 md:px-2 md:text-[9px]">
              Best Match
            </span>
          )}
          {hasLiveDemoArtboard(project.id) ? (
            <div className="h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]">
              <ScaledDemoArtboard projectId={project.id} initialWidth={270} />
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt={`${project.businessTitle} (${project.styleSubtitle}) — ${project.targetBusinesses}`}
              referrerPolicy="no-referrer"
              decoding="async"
              draggable={false}
              className="h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-3 text-xs font-medium text-[#1C1B18] md:p-4 md:text-sm">
              {project.businessTitle}
            </div>
          )}
        </div>

        <div className="relative z-10 mt-2 flex items-center justify-between gap-1.5 px-0.5 md:mt-2.5 md:gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-[12px] font-semibold tracking-[-0.015em] text-[#1C1B18] transition-colors group-hover:text-[#C98A3A] md:text-[13.5px]">
              {project.businessTitle}
            </h3>
            <p className="mt-0.5 truncate text-[10px] text-[#1C1B18]/65 md:text-[10.5px]">
              {project.targetBusinesses}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-0.5">
            <span className="font-mono-tabular text-[10px] font-medium leading-none text-[#1C1B18]/50 md:text-[10.5px]">
              {project.index}
            </span>
            {project.linkedDemoId && onOpenLiveDemo && (
              <span
                aria-hidden="true"
                className="font-mono-tabular invisible inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-bold tracking-[0.04em] uppercase md:px-2.5 md:text-[8.5px]"
              >
                Live Demo ↗
              </span>
            )}
          </div>
        </div>
      </button>

      {project.linkedDemoId && onOpenLiveDemo && (
        <button
          type="button"
          tabIndex={isClickable ? 0 : -1}
          onClick={() => onOpenLiveDemo(project.linkedDemoId!)}
          aria-label={`Open live demo for ${project.businessTitle}`}
          className="font-mono-tabular absolute right-2 bottom-1.5 z-20 inline-flex items-center gap-1 rounded-full bg-[#2563EB] px-2 py-0.5 text-[8px] font-bold tracking-[0.04em] text-white uppercase shadow-sm transition-transform duration-150 hover:scale-105 hover:bg-[#1D4ED8] md:right-3 md:bottom-2 md:px-2.5 md:text-[8.5px]"
        >
          <span>Live Demo</span>
          <span aria-hidden="true">↗</span>
        </button>
      )}
    </div>
  );
}

function ClosedProjectBack({ project }: { project: ProjectConfig }) {
  return (
    <div
      aria-hidden="true"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'rotateX(180deg) translateZ(1px)',
        background:
          'linear-gradient(150deg, rgba(255,255,255,0.88) 0%, rgba(247,245,240,0.78) 55%, rgba(240,236,227,0.86) 100%)',
      }}
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl border border-white/75 p-2 shadow-[0_16px_36px_-14px_rgba(28,27,24,0.12)] md:p-2.5"
    >
      <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl border border-[#1C1B18]/8 bg-[#F4F1EA]/75">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.58) 0%, transparent 55%)',
          }}
        />
        <span className="relative text-[9px] font-medium tracking-[0.18em] whitespace-nowrap text-[#1C1B18]/28 uppercase md:text-[9.5px] md:tracking-[0.2em]">
          Edition One
        </span>
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-1.5 px-0.5 md:mt-2.5 md:gap-2">
        <div className="min-w-0">
          <p className="truncate text-[12px] font-semibold tracking-[-0.015em] text-[#1C1B18]/80 md:text-[13.5px]">
            {project.businessTitle}
          </p>
          <p className="mt-0.5 truncate text-[10px] text-[#1C1B18]/50 md:text-[10.5px]">
            {project.targetBusinesses}
          </p>
        </div>
        <span className="font-mono-tabular shrink-0 text-[10px] font-medium text-[#1C1B18]/45 md:text-[10.5px]">
          {project.index}
        </span>
      </div>
    </div>
  );
}

interface UnfoldingGridCardProps {
  project: ProjectConfig;
  imageUrl?: string;
  isOpen: boolean;
  colIndex: number;
  cols: number;
  reducedMotion: boolean;
  onSelect: (project: ProjectConfig) => void;
  onOpenLiveDemo?: (demoId: string) => void;
}

function UnfoldingGridCard({
  project,
  imageUrl,
  isOpen,
  colIndex,
  cols,
  reducedMotion,
  onSelect,
  onOpenLiveDemo,
}: UnfoldingGridCardProps) {
  const centerIdx = (cols - 1) / 2;
  const outwardStep = Math.floor(Math.abs(colIndex - centerIdx));

  return (
    <div style={{ perspective: 1050 }}>
      <motion.div
        initial={false}
        animate={{
          rotateX: isOpen || reducedMotion ? 0 : -176,
          scale: isOpen || reducedMotion ? 1 : 0.94,
        }}
        transition={{
          duration: 0.68,
          delay: isOpen && !reducedMotion ? outwardStep * 0.065 : 0,
          ease: FLIP_EASE,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="relative"
      >
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(1px)',
          }}
        >
          <OpenProjectCard
            project={project}
            imageUrl={imageUrl}
            isClickable={isOpen || reducedMotion}
            onSelect={onSelect}
            onOpenLiveDemo={onOpenLiveDemo}
          />
        </div>

        {!reducedMotion && <ClosedProjectBack project={project} />}
      </motion.div>
    </div>
  );
}

export function ShowcaseMosaic({
  onSelectProject,
  onOpenLiveDemo,
  isHeroPage = false,
}: ShowcaseMosaicProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const thumbnails = useProjectThumbnails();

  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [hasCompletedIntro, setHasCompletedIntro] = useState<boolean>(
    () => prefersReducedMotion,
  );
  const [pinTopPxState, setPinTopPxState] = useState<number>(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 82 : 120,
  );
  const [spacerHeightPx, setSpacerHeightPx] = useState<number | null>(null);
  const metricsRef = useRef<{ pinTopPx: number; stableVh: number; stageH: number }>({
    pinTopPx: 120,
    stableVh: 800,
    stageH: 640,
  });

  const spacerRef = useRef<HTMLDivElement | null>(null);
  const pinWrapperRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const outerRevealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasCompletedIntroRef = useRef<boolean>(prefersReducedMotion);

  // Supports up to 6 rows (desktop: 3 rows of 4; mobile: 3 rows of 2 initially, 6 rows when expanded)
  const [openedRows, setOpenedRows] = useState<boolean[]>(() =>
    prefersReducedMotion
      ? [true, true, true, true, true, true]
      : [true, false, false, false, false, false],
  );
  const [filtersVisible, setFiltersVisible] = useState<boolean>(true);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport, { passive: true });
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const isFiltered = activeFilter !== 'All';
  const gridCols = isMobile ? 2 : 4;
  const startIds = isMobile ? MOBILE_START_IDS : DESKTOP_START_IDS;
  const activeRows = isMobile
    ? showAllMobile
      ? MOBILE_ALL_ROWS
      : MOBILE_INITIAL_ROWS
    : DESKTOP_ROWS;

  // Both desktop (4×3) and mobile initial (2×3) use rows 0, 1, 2
  const initialRowsComplete = openedRows[0] && openedRows[1] && openedRows[2];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.industries.includes(activeFilter)).sort(
      (a, b) => {
        const aBest = a.bestMatchFor.includes(activeFilter) ? 0 : 1;
        const bBest = b.bestMatchFor.includes(activeFilter) ? 0 : 1;
        return aBest - bBest;
      },
    );
  }, [activeFilter]);

  // Once the intro finishes flipping open, lock it permanently so scrolling back up never re-animates
  useEffect(() => {
    if (prefersReducedMotion || isFiltered || hasCompletedIntroRef.current) {
      if (prefersReducedMotion || isFiltered) setFiltersVisible(true);
      return;
    }
    if (!initialRowsComplete) return;

    const timer = window.setTimeout(() => {
      hasCompletedIntroRef.current = true;
      setHasCompletedIntro(true);
      setFiltersVisible(true);
      setOpenedRows([true, true, true, true, true, true]);
    }, 440);
    return () => window.clearTimeout(timer);
  }, [initialRowsComplete, isFiltered, prefersReducedMotion]);

  // Ensure newly expanded rows on mobile (07-12) immediately appear open & opaque
  useEffect(() => {
    if (showAllMobile) {
      hasCompletedIntroRef.current = true;
      setHasCompletedIntro(true);
      setOpenedRows([true, true, true, true, true, true]);
      setFiltersVisible(true);
      outerRevealRefs.current.forEach((el) => {
        if (el) el.style.opacity = '1';
      });
    }
  }, [showAllMobile]);

  // Section-relative zoom-out (Desktop: 01-04, Mobile: 01-02) + native CSS sticky pinning
  useEffect(() => {
    const spacer = spacerRef.current;
    const stage = stageRef.current;

    if (prefersReducedMotion || isFiltered) {
      setSpacerHeightPx(null);
      if (stage) stage.style.transform = 'none';
      outerRevealRefs.current.forEach((el) => {
        if (el) el.style.opacity = '1';
      });
      setOpenedRows([true, true, true, true, true, true]);
      return;
    }

    let lerpRafId = 0;
    let scrollRafId = 0;
    let currentScale = hasCompletedIntroRef.current ? 1 : -1;
    let targetScale = 1;
    let currentOuterAlpha = hasCompletedIntroRef.current ? 1 : 0;
    let targetOuterAlpha = hasCompletedIntroRef.current ? 1 : 0;
    let animating = false;
    let lastMeasuredWidth = window.innerWidth;
    let stableVh = Math.max(window.innerHeight, 1);

    const getHoldDist = () => (isMobile ? MOBILE_HOLD_PX : DESKTOP_HOLD_PX);
    const getMaxZoom = () => {
      if (isMobile) return 1.08;
      return window.innerWidth >= 1280 ? 1.18 : 1.09;
    };

    const measureMetrics = () => {
      const st = stageRef.current;
      if (!st) return;

      const nextW = window.innerWidth;
      const nextVh = Math.max(window.innerHeight, 1);
      if (nextW !== lastMeasuredWidth || Math.abs(nextVh - stableVh) > 130) {
        lastMeasuredWidth = nextW;
        stableVh = nextVh;
      }

      const stageH = st.offsetHeight || (isMobile ? 540 : 680);
      const pinTopPx = isMobile
        ? Math.min(
            MOBILE_MAX_PIN_TOP_PX,
            Math.max(MOBILE_MIN_PIN_TOP_PX, Math.round(stableVh - stageH - 24)),
          )
        : Math.min(
            MAX_PIN_TOP_PX,
            Math.max(MIN_PIN_TOP_PX, Math.round(stableVh - stageH - 40)),
          );
      const nextSpacerH = Math.round(stageH + getHoldDist());

      metricsRef.current = { pinTopPx, stableVh, stageH };
      setPinTopPxState((prev) => (prev === pinTopPx ? prev : pinTopPx));
      setSpacerHeightPx((prev) =>
        prev !== null && Math.abs(prev - nextSpacerH) <= 4 ? prev : nextSpacerH,
      );
    };

    const stepLerp = () => {
      lerpRafId = 0;
      const st = stageRef.current;
      if (!st) {
        animating = false;
        return;
      }

      if (hasCompletedIntroRef.current) {
        currentScale = 1;
        currentOuterAlpha = 1;
        st.style.transform = 'translate3d(0, 0, 0) scale(1)';
        outerRevealRefs.current.forEach((el) => {
          if (el) el.style.opacity = '1';
        });
        animating = false;
        return;
      }

      currentScale += (targetScale - currentScale) * 0.24;
      currentOuterAlpha += (targetOuterAlpha - currentOuterAlpha) * 0.24;

      const settledZoom =
        Math.abs(targetScale - 1) < 0.002 && Math.abs(currentScale - 1) < 0.002;

      if (settledZoom) {
        currentScale = 1;
        currentOuterAlpha = 1;
        st.style.transform = 'translate3d(0, 0, 0) scale(1)';
      } else {
        st.style.transform = `translate3d(0, 0, 0) scale(${currentScale.toFixed(4)})`;
      }

      outerRevealRefs.current.forEach((el) => {
        if (el) el.style.opacity = currentOuterAlpha.toFixed(3);
      });

      const needsMoreFrames =
        !settledZoom &&
        (Math.abs(targetScale - currentScale) > 0.001 ||
          Math.abs(targetOuterAlpha - currentOuterAlpha) > 0.004);

      if (needsMoreFrames) {
        lerpRafId = window.requestAnimationFrame(stepLerp);
      } else {
        animating = false;
      }
    };

    const evaluateScroll = () => {
      scrollRafId = 0;
      if (!spacer) return;
      if (hasCompletedIntroRef.current) {
        const st = stageRef.current;
        if (st && st.style.transform !== 'translate3d(0, 0, 0) scale(1)') {
          st.style.transform = 'translate3d(0, 0, 0) scale(1)';
        }
        return;
      }

      const { pinTopPx, stableVh: vh } = metricsRef.current;
      const scrollY = window.scrollY;
      const spacerTop = spacer.getBoundingClientRect().top;

      const zoomStartTop = Math.min(
        Math.round(vh * 0.8),
        pinTopPx + (isMobile ? 220 : 300),
      );
      const zoomEndTop = pinTopPx - (isMobile ? 55 : 80);
      const zoomSpan = Math.max(120, zoomStartTop - zoomEndTop);
      const rawT = isHeroPage
        ? clamp01(scrollY / (isMobile ? 190 : 240))
        : clamp01((zoomStartTop - spacerTop) / zoomSpan);
      const easedZoomT = easeOutCubic(rawT);

      const maxZoom = getMaxZoom();
      targetScale = maxZoom - (maxZoom - 1) * easedZoomT;
      targetOuterAlpha = showAllMobile
        ? 1
        : easeOutCubic(clamp01(rawT / 0.36));

      if (currentScale < 0) {
        currentScale = targetScale;
        currentOuterAlpha = targetOuterAlpha;
      }

      const atBottom =
        scrollY + vh >= document.documentElement.scrollHeight - 40;

      setOpenedRows((prev) => {
        const nextRow1 =
          prev[1] || spacerTop <= pinTopPx + (isMobile ? 45 : 15) || atBottom;
        const nextRow2 =
          prev[2] || spacerTop <= pinTopPx - (isMobile ? 35 : 95) || atBottom;
        const extraOpen = showAllMobile || atBottom;

        if (
          prev[0] &&
          nextRow1 === prev[1] &&
          nextRow2 === prev[2] &&
          prev[3] === (prev[3] || extraOpen) &&
          prev[4] === (prev[4] || extraOpen) &&
          prev[5] === (prev[5] || extraOpen)
        ) {
          return prev;
        }
        return [
          true,
          nextRow1,
          nextRow2,
          prev[3] || extraOpen,
          prev[4] || extraOpen,
          prev[5] || extraOpen,
        ];
      });

      if (!animating) {
        animating = true;
        lerpRafId = window.requestAnimationFrame(stepLerp);
      }
    };

    const scheduleScroll = () => {
      if (!scrollRafId) {
        scrollRafId = window.requestAnimationFrame(evaluateScroll);
      }
    };

    const handleResizeOrStageChange = () => {
      measureMetrics();
      scheduleScroll();
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' && stage
        ? new ResizeObserver(handleResizeOrStageChange)
        : null;
    if (resizeObserver && stage) {
      resizeObserver.observe(stage);
    }

    measureMetrics();
    evaluateScroll();
    window.addEventListener('scroll', scheduleScroll, { passive: true });
    window.addEventListener('resize', handleResizeOrStageChange, {
      passive: true,
    });

    return () => {
      resizeObserver?.disconnect();
      if (lerpRafId) window.cancelAnimationFrame(lerpRafId);
      if (scrollRafId) window.cancelAnimationFrame(scrollRafId);
      window.removeEventListener('scroll', scheduleScroll);
      window.removeEventListener('resize', handleResizeOrStageChange);
      if (stage) stage.style.transform = 'none';
    };
  }, [prefersReducedMotion, isFiltered, isMobile, showAllMobile, isHeroPage]);

  outerRevealRefs.current = [];
  let outerRefCounter = 0;

  const handleSelectFilter = (
    filter: FilterOption,
    btnEl: HTMLButtonElement,
  ) => {
    if (filter !== activeFilter && spacerRef.current) {
      const { pinTopPx } = metricsRef.current;
      const spacerTop = spacerRef.current.getBoundingClientRect().top;
      if (spacerTop < pinTopPx) {
        window.scrollTo({
          top: Math.max(0, window.scrollY + spacerTop - pinTopPx),
          behavior: 'instant',
        });
      }
    }

    setActiveFilter(filter);
    btnEl.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  return (
    <div
      ref={spacerRef}
      style={
        prefersReducedMotion || isFiltered || spacerHeightPx === null
          ? undefined
          : { height: `${spacerHeightPx}px` }
      }
      className="relative mt-5 w-full md:mt-6"
    >
      <div
        ref={pinWrapperRef}
        style={
          prefersReducedMotion || isFiltered
            ? undefined
            : { top: `${pinTopPxState}px` }
        }
        className={`${
          prefersReducedMotion || isFiltered ? 'relative' : 'sticky z-20'
        } mx-auto w-full max-w-[1200px] px-4 md:px-8`}
      >
        <div
          ref={stageRef}
          style={{
            transformOrigin: '50% 44px',
            transform: 'translate3d(0, 0, 0) scale(1)',
          }}
        >
          {/* Interactive Business Owner Filter Tabs — reveals smoothly once cards flip open */}
          <div
            aria-hidden={!filtersVisible}
            className={`mb-4 transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] md:mb-5 ${
              filtersVisible
                ? 'translate-y-0 opacity-100'
                : 'pointer-events-none translate-y-2 opacity-0'
            }`}
          >
            <div
              role="tablist"
              aria-label="Filter website directions by business type"
              className="no-scrollbar -mx-4 flex flex-nowrap items-center gap-2 overflow-x-auto px-4 py-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:py-0"
            >
              {FILTERS.map((filter) => {
                const isSelected = activeFilter === filter;
                const count =
                  filter === 'All'
                    ? PROJECTS.length
                    : PROJECTS.filter((p) => p.industries.includes(filter))
                        .length;
                return (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={(e) => handleSelectFilter(filter, e.currentTarget)}
                    className={`relative rounded-full px-3.5 py-1.5 text-[12px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#C98A3A] md:px-4 ${
                      isSelected
                        ? 'text-[#F7F5F0]'
                        : 'glass-subtle text-[#1C1B18]/75 hover:bg-white/40 hover:text-[#1C1B18]'
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
                      <span className="font-mono-tabular opacity-65">
                        ({count})
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {isFiltered ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-3.5">
              {filteredProjects.map((project) => (
                <OpenProjectCard
                  key={project.id}
                  project={project}
                  imageUrl={thumbnails.get(project.id)}
                  isBestMatch={project.bestMatchFor.includes(activeFilter)}
                  isClickable
                  onSelect={onSelectProject}
                  onOpenLiveDemo={onOpenLiveDemo}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {activeRows.map((rowProjects, rowIdx) => (
                <div
                  key={`row-${rowIdx}`}
                  className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-3.5"
                >
                  {rowProjects.map((project, colIdx) => {
                    const isStartCard = startIds.has(project.id);
                    const imgUrl = thumbnails.get(project.id);

                    if (isStartCard) {
                      return (
                        <div key={project.id} className="relative z-10">
                          <OpenProjectCard
                            project={project}
                            imageUrl={imgUrl}
                            isStartCard
                            isClickable
                            onSelect={onSelectProject}
                            onOpenLiveDemo={onOpenLiveDemo}
                          />
                        </div>
                      );
                    }

                    const revealRefIdx = outerRefCounter++;
                    const skipInitialHide =
                      prefersReducedMotion ||
                      hasCompletedIntro ||
                      showAllMobile ||
                      (isMobile && rowIdx >= 3);

                    return (
                      <div
                        key={project.id}
                        ref={(el) => {
                          outerRevealRefs.current[revealRefIdx] = el;
                        }}
                        style={skipInitialHide ? undefined : { opacity: 0 }}
                      >
                        <UnfoldingGridCard
                          project={project}
                          imageUrl={imgUrl}
                          isOpen={hasCompletedIntro || openedRows[rowIdx]}
                          colIndex={colIdx}
                          cols={gridCols}
                          reducedMotion={prefersReducedMotion}
                          onSelect={onSelectProject}
                          onOpenLiveDemo={onOpenLiveDemo}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* Mobile Only: See more / Show fewer toggle (max 6 initially -> 12 on tap) */}
          {isMobile && !isFiltered && (
            <div
              className={`mt-4 flex justify-center transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                filtersVisible
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-2 opacity-0'
              }`}
            >
              <button
                type="button"
                onClick={() => setShowAllMobile((prev) => !prev)}
                className="glass-subtle inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-4 text-[12px] font-semibold text-[#1C1B18] transition-colors duration-200 hover:bg-white/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
              >
                {showAllMobile ? (
                  <>
                    <span>Show fewer</span>
                    <ChevronUp className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    <span>See more (6 more)</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
