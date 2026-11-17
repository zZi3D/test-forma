import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  INDUSTRY_FILTERS,
  IndustryFilter,
  PROJECTS,
  ProjectItem,
} from '../data/projects';
import {
  useProjectModalPreview,
  useProjectThumbnails,
} from '../utils/mockupGenerator';

interface ExamplesPageProps {
  onSelectProject: (project: ProjectItem) => void;
  onStartProject: () => void;
  onBookCall: () => void;
  onBackToOverview: () => void;
}

type FilterOption = 'All' | IndustryFilter;
const FILTERS: FilterOption[] = ['All', ...INDUSTRY_FILTERS];

// Desktop: 3 rows × 4 columns = all 12 Design Directions in order 01–12
// Row 0: [01, 02 (START), 03 (START), 04]
const DESKTOP_ROWS: ProjectItem[][] = [
  [PROJECTS[0], PROJECTS[1], PROJECTS[2], PROJECTS[3]],
  [PROJECTS[4], PROJECTS[5], PROJECTS[6], PROJECTS[7]],
  [PROJECTS[8], PROJECTS[9], PROJECTS[10], PROJECTS[11]],
];

// Mobile: 3 columns × 2 rows initially (max 6 visible), expandable to 3×4 via "See more"
// Row 0: [01, 02 (START), 03 (START)]
const MOBILE_INITIAL_ROWS: ProjectItem[][] = [
  [PROJECTS[0], PROJECTS[1], PROJECTS[2]],
  [PROJECTS[3], PROJECTS[4], PROJECTS[5]],
];

const MOBILE_ALL_ROWS: ProjectItem[][] = [
  [PROJECTS[0], PROJECTS[1], PROJECTS[2]],
  [PROJECTS[3], PROJECTS[4], PROJECTS[5]],
  [PROJECTS[6], PROJECTS[7], PROJECTS[8]],
  [PROJECTS[9], PROJECTS[10], PROJECTS[11]],
];

const START_IDS = new Set([PROJECTS[1].id, PROJECTS[2].id]); // 02 & 03 (Row 1, cards 2 & 3)

const FLIP_EASE = [0.16, 1, 0.3, 1] as const;
const MIN_PIN_TOP_PX = 112;
const MAX_PIN_TOP_PX = 152;
const DESKTOP_HOLD_PX = 540;
const MOBILE_PIN_TOP_PX = 86;
const MOBILE_HOLD_PX = 250;

function clamp01(val: number): number {
  return Math.max(0, Math.min(1, val));
}

function easeOutCubic(val: number): number {
  const c = clamp01(val);
  return 1 - Math.pow(1 - c, 3);
}

interface CardFaceProps {
  project: ProjectItem;
  imageUrl?: string;
  isStartCard?: boolean;
  isBestMatch?: boolean;
  isClickable: boolean;
  onSelect: (project: ProjectItem) => void;
}

function OpenProjectCard({
  project,
  imageUrl,
  isStartCard,
  isBestMatch,
  isClickable,
  onSelect,
}: CardFaceProps) {
  return (
    <button
      type="button"
      tabIndex={isClickable ? 0 : -1}
      onClick={() => onSelect(project)}
      aria-label={`Inspect ${project.businessTitle} (${project.styleSubtitle})`}
      className={`glass-tile group relative block w-full overflow-hidden rounded-xl p-1.5 text-left transition-all duration-200 hover:border-[#C98A3A]/55 hover:shadow-[0_24px_48px_-14px_rgba(28,27,24,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A] sm:rounded-2xl sm:p-2 md:p-2.5 ${
        isStartCard
          ? 'border-white/85 shadow-[0_24px_54px_-18px_rgba(28,27,24,0.18)]'
          : ''
      }`}
    >
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#1C1B18]/10 sm:rounded-xl"
        style={{ backgroundColor: project.palette.bg }}
      >
        {isBestMatch && (
          <span className="font-mono-tabular pointer-events-none absolute top-1 right-1 z-10 rounded border border-[#C98A3A]/45 bg-[#FAF8F4]/95 px-1 py-0.5 text-[7px] font-semibold tracking-[0.04em] text-[#B47323] uppercase shadow-xs sm:top-2 sm:right-2 sm:rounded-md sm:px-2 sm:text-[9px]">
            Best Match
          </span>
        )}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${project.businessTitle} (${project.styleSubtitle}) — ${project.targetBusinesses}`}
            referrerPolicy="no-referrer"
            draggable={false}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-2 text-[10px] font-medium text-[#1C1B18] sm:p-4 sm:text-sm">
            {project.businessTitle}
          </div>
        )}
      </div>

      <div className="relative z-10 mt-1.5 flex items-baseline justify-between gap-1 px-0.5 sm:mt-2 sm:gap-2 md:mt-2.5">
        <div className="min-w-0">
          <h3 className="truncate text-[10.5px] font-semibold tracking-[-0.015em] text-[#1C1B18] transition-colors group-hover:text-[#C98A3A] sm:text-[12.5px] md:text-[13.5px]">
            {project.businessTitle}
          </h3>
          <p className="mt-0.5 truncate text-[8.5px] text-[#1C1B18]/65 sm:text-[10px] md:text-[10.5px]">
            {project.targetBusinesses}
          </p>
        </div>
        <span className="font-mono-tabular shrink-0 text-[9px] font-medium text-[#1C1B18]/50 sm:text-[10px] md:text-[10.5px]">
          {project.index}
        </span>
      </div>
    </button>
  );
}

function ClosedProjectBack({ project }: { project: ProjectItem }) {
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
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl border border-white/75 p-1.5 shadow-[0_16px_36px_-14px_rgba(28,27,24,0.12)] sm:rounded-2xl sm:p-2 md:p-2.5"
    >
      <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-lg border border-[#1C1B18]/8 bg-[#F4F1EA]/75 sm:rounded-xl">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.58) 0%, transparent 55%)',
          }}
        />
        <span className="relative text-[7.5px] font-medium tracking-[0.14em] whitespace-nowrap text-[#1C1B18]/28 uppercase sm:text-[9.5px] sm:tracking-[0.2em]">
          Edition One
        </span>
      </div>

      <div className="mt-1.5 flex items-baseline justify-between gap-1 px-0.5 sm:mt-2 sm:gap-2 md:mt-2.5">
        <div className="min-w-0">
          <p className="truncate text-[10.5px] font-semibold tracking-[-0.015em] text-[#1C1B18]/80 sm:text-[12.5px] md:text-[13.5px]">
            {project.businessTitle}
          </p>
          <p className="mt-0.5 truncate text-[8.5px] text-[#1C1B18]/50 sm:text-[10px] md:text-[10.5px]">
            {project.targetBusinesses}
          </p>
        </div>
        <span className="font-mono-tabular shrink-0 text-[9px] font-medium text-[#1C1B18]/45 sm:text-[10px] md:text-[10.5px]">
          {project.index}
        </span>
      </div>
    </div>
  );
}

interface UnfoldingGridCardProps {
  project: ProjectItem;
  imageUrl?: string;
  isOpen: boolean;
  colIndex: number;
  cols: number;
  reducedMotion: boolean;
  onSelect: (project: ProjectItem) => void;
}

function UnfoldingGridCard({
  project,
  imageUrl,
  isOpen,
  colIndex,
  cols,
  reducedMotion,
  onSelect,
}: UnfoldingGridCardProps) {
  const [isSettled, setIsSettled] = useState(reducedMotion || isOpen);
  const centerIdx = (cols - 1) / 2;
  const outwardStep = Math.floor(Math.abs(colIndex - centerIdx));

  useEffect(() => {
    if (reducedMotion) {
      setIsSettled(true);
      return;
    }
    if (!isOpen) {
      setIsSettled(false);
      return;
    }
    const timer = window.setTimeout(
      () => setIsSettled(true),
      720 + outwardStep * 70,
    );
    return () => window.clearTimeout(timer);
  }, [isOpen, outwardStep, reducedMotion]);

  return (
    <div style={isSettled ? undefined : { perspective: 1050 }}>
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
          transformStyle: isSettled ? 'flat' : 'preserve-3d',
        }}
        className="relative"
      >
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: isSettled ? 'none' : 'translateZ(1px)',
          }}
        >
          <OpenProjectCard
            project={project}
            imageUrl={imageUrl}
            isClickable={isOpen || reducedMotion}
            onSelect={onSelect}
          />
        </div>

        {!isSettled && <ClosedProjectBack project={project} />}
      </motion.div>
    </div>
  );
}

export function ExamplesPage({
  onSelectProject,
  onStartProject,
  onBookCall,
  onBackToOverview,
}: ExamplesPageProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const thumbnails = useProjectThumbnails();
  const start02PreviewUrl = useProjectModalPreview(PROJECTS[1]);
  const start03PreviewUrl = useProjectModalPreview(PROJECTS[2]);

  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );
  const [showAllMobile, setShowAllMobile] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');

  const heroRef = useRef<HTMLElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);
  const pinWrapperRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const outerRevealRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Supports up to 4 rows (desktop: 3 rows of 4; mobile: 2 rows of 3 initially, 4 rows when expanded)
  const [openedRows, setOpenedRows] = useState<boolean[]>(() =>
    prefersReducedMotion
      ? [true, true, true, true]
      : [false, false, false, false],
  );
  const [filtersVisible, setFiltersVisible] = useState<boolean>(
    () => prefersReducedMotion,
  );

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport, { passive: true });
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const isFiltered = activeFilter !== 'All';
  const gridCols = isMobile ? 3 : 4;
  const activeRows = isMobile
    ? showAllMobile
      ? MOBILE_ALL_ROWS
      : MOBILE_INITIAL_ROWS
    : DESKTOP_ROWS;

  const initialRowsComplete = isMobile
    ? openedRows[0] && openedRows[1]
    : openedRows[0] && openedRows[1] && openedRows[2];

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

  // Reveal filter pills (and mobile "See more" toggle) once the visible initial rows have flipped open
  useEffect(() => {
    if (prefersReducedMotion || isFiltered) {
      setFiltersVisible(true);
      return;
    }
    if (!initialRowsComplete) {
      setFiltersVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setFiltersVisible(true), 440);
    return () => window.clearTimeout(timer);
  }, [initialRowsComplete, isFiltered, prefersReducedMotion]);

  // Ensure newly expanded rows on mobile (07-12) immediately appear open & opaque
  useEffect(() => {
    if (showAllMobile) {
      setOpenedRows([true, true, true, true]);
      outerRevealRefs.current.forEach((el) => {
        if (el) el.style.opacity = '1';
      });
    }
  }, [showAllMobile]);

  // Unified responsive scroll-tracked pinning + zoom-out choreography (desktop 4×3 & mobile 3×2/3×4)
  useEffect(() => {
    const spacer = spacerRef.current;
    const pinWrapper = pinWrapperRef.current;
    const stage = stageRef.current;

    const resetPinStyles = () => {
      if (spacer) spacer.style.height = '';
      if (pinWrapper) {
        pinWrapper.style.position = '';
        pinWrapper.style.top = '';
        pinWrapper.style.left = '';
        pinWrapper.style.right = '';
        pinWrapper.style.zIndex = '';
      }
      if (stage) stage.style.transform = 'none';
    };

    if (prefersReducedMotion || isFiltered) {
      resetPinStyles();
      outerRevealRefs.current.forEach((el) => {
        if (el) el.style.opacity = '1';
      });
      setOpenedRows([true, true, true, true]);
      return;
    }

    let rafId = 0;
    let currentScale = -1;
    let targetScale = 1;
    let currentShiftX = 0;
    let targetShiftX = 0;
    let currentOuterAlpha = 0;
    let targetOuterAlpha = 0;
    let animating = false;

    const getHoldDist = () => (isMobile ? MOBILE_HOLD_PX : DESKTOP_HOLD_PX);

    const syncSpacerHeight = () => {
      if (!spacer || !stage) return;
      const stageH = stage.offsetHeight;
      if (stageH > 0) {
        spacer.style.height = `${stageH + getHoldDist()}px`;
      }
    };

    const getMaxZoom = () => {
      if (isMobile) return 1.38;
      return window.innerWidth >= 1024 ? 1.4 : 1.24;
    };

    const getInitialShiftX = () => (isMobile ? -17 : 0);

    const evaluateScroll = () => {
      syncSpacerHeight();

      const vh = Math.max(window.innerHeight, 1);
      const scrollY = window.scrollY;
      const heroH = heroRef.current?.offsetHeight ?? (isMobile ? 225 : 255);
      const stageH = stage?.offsetHeight ?? (isMobile ? 290 : 700);
      const holdDist = getHoldDist();
      const pinTopPx = isMobile
        ? MOBILE_PIN_TOP_PX
        : Math.min(
            MAX_PIN_TOP_PX,
            Math.max(MIN_PIN_TOP_PX, Math.round(vh - stageH - 40)),
          );
      const approachDist = Math.max(40, heroH - pinTopPx);

      if (spacer && pinWrapper) {
        const spacerTop = spacer.getBoundingClientRect().top;

        if (spacerTop > pinTopPx) {
          pinWrapper.style.position = 'relative';
          pinWrapper.style.top = '0px';
          pinWrapper.style.left = 'auto';
          pinWrapper.style.right = 'auto';
          pinWrapper.style.zIndex = 'auto';
        } else if (spacerTop >= pinTopPx - holdDist) {
          pinWrapper.style.position = 'fixed';
          pinWrapper.style.top = `${pinTopPx}px`;
          pinWrapper.style.left = '0px';
          pinWrapper.style.right = '0px';
          pinWrapper.style.zIndex = '20';
        } else {
          pinWrapper.style.position = 'absolute';
          pinWrapper.style.top = `${holdDist}px`;
          pinWrapper.style.left = '0px';
          pinWrapper.style.right = '0px';
          pinWrapper.style.zIndex = 'auto';
        }
      }

      const zoomDistance = approachDist + (isMobile ? 95 : 130);
      const rawT = clamp01(scrollY / zoomDistance);
      const easedZoomT = easeOutCubic(rawT);

      const maxZoom = getMaxZoom();
      const initShiftX = getInitialShiftX();
      targetScale = maxZoom - (maxZoom - 1) * easedZoomT;
      targetShiftX = initShiftX * (1 - easedZoomT);
      targetOuterAlpha = showAllMobile ? 1 : easeOutCubic(clamp01(rawT / 0.36));

      if (currentScale < 0) {
        currentScale = targetScale;
        currentShiftX = targetShiftX;
        currentOuterAlpha = targetOuterAlpha;
      }

      const atBottom =
        scrollY + vh >= document.documentElement.scrollHeight - 40;

      setOpenedRows((prev) => {
        if (scrollY <= 18 && !atBottom && !showAllMobile) {
          return prev[0] || prev[1] || prev[2] || prev[3]
            ? [false, false, false, false]
            : prev;
        }

        const nextRow0 =
          prev[0] || scrollY >= Math.max(34, approachDist * 0.4) || atBottom;
        const nextRow1 = prev[1] || scrollY >= approachDist + 35 || atBottom;
        const nextRow2 =
          prev[2] ||
          (isMobile ? showAllMobile : scrollY >= approachDist + 130) ||
          atBottom;
        const nextRow3 = prev[3] || showAllMobile || atBottom;

        if (
          nextRow0 === prev[0] &&
          nextRow1 === prev[1] &&
          nextRow2 === prev[2] &&
          nextRow3 === prev[3]
        ) {
          return prev;
        }
        return [nextRow0, nextRow1, nextRow2, nextRow3];
      });

      if (!animating) {
        animating = true;
        rafId = window.requestAnimationFrame(stepLerp);
      }
    };

    const stepLerp = () => {
      rafId = 0;
      const st = stageRef.current;
      if (!st) {
        animating = false;
        return;
      }

      currentScale += (targetScale - currentScale) * 0.22;
      currentShiftX += (targetShiftX - currentShiftX) * 0.22;
      currentOuterAlpha += (targetOuterAlpha - currentOuterAlpha) * 0.22;

      const settledZoom =
        Math.abs(targetScale - 1) < 0.002 &&
        Math.abs(currentScale - 1) < 0.002 &&
        Math.abs(targetShiftX) < 0.08 &&
        Math.abs(currentShiftX) < 0.08;

      if (settledZoom) {
        currentScale = 1;
        currentShiftX = 0;
        currentOuterAlpha = 1;
        st.style.transform = 'none';
      } else {
        st.style.transform = `translate3d(${currentShiftX.toFixed(2)}%, 0, 0) scale(${currentScale.toFixed(4)})`;
      }

      outerRevealRefs.current.forEach((el) => {
        if (el) el.style.opacity = currentOuterAlpha.toFixed(3);
      });

      const needsMoreFrames =
        !settledZoom &&
        (Math.abs(targetScale - currentScale) > 0.001 ||
          Math.abs(targetShiftX - currentShiftX) > 0.05 ||
          Math.abs(targetOuterAlpha - currentOuterAlpha) > 0.004);

      if (needsMoreFrames) {
        rafId = window.requestAnimationFrame(stepLerp);
      } else {
        animating = false;
      }
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' && stage
        ? new ResizeObserver(evaluateScroll)
        : null;
    if (resizeObserver && stage) {
      resizeObserver.observe(stage);
    }

    evaluateScroll();
    window.addEventListener('scroll', evaluateScroll, { passive: true });
    window.addEventListener('resize', evaluateScroll, { passive: true });

    return () => {
      resizeObserver?.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', evaluateScroll);
      window.removeEventListener('resize', evaluateScroll);
      resetPinStyles();
    };
  }, [prefersReducedMotion, isFiltered, isMobile, showAllMobile]);

  outerRevealRefs.current = [];
  let outerRefCounter = 0;

  const getCardImageUrl = (project: ProjectItem) => {
    if (project.id === PROJECTS[1].id) {
      return start02PreviewUrl ?? thumbnails.get(project.id);
    }
    if (project.id === PROJECTS[2].id) {
      return start03PreviewUrl ?? thumbnails.get(project.id);
    }
    return thumbnails.get(project.id);
  };

  return (
    <div className="relative z-10 min-h-screen w-full pb-20 md:pb-24">
      {/* Subtle canvas veil keeping WaveBackground softly visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#F7F5F0]/78 via-[#F7F5F0]/46 to-[#F7F5F0]/62"
      />

      <div className="relative z-10">
        {/* Top Editorial Hero */}
        <section
          ref={heroRef}
          className="mx-auto max-w-[1040px] px-4 pt-20 pb-3 text-center md:px-8 md:pt-24 md:pb-5"
        >
          <div className="mb-2 flex justify-center md:mb-2.5">
            <button
              type="button"
              onClick={onBackToOverview}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#1C1B18]/65 transition-colors hover:text-[#1C1B18] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C98A3A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Overview</span>
            </button>
          </div>

          <h1 className="display-tight mx-auto max-w-[18ch] text-[clamp(1.75rem,4.4vw,3.35rem)] leading-[1.06] font-semibold text-[#1C1B18] md:max-w-[20ch]">
            Design with impact. Deliver in 24 hours.
          </h1>

          <p className="mx-auto mt-2 max-w-[46ch] text-[13px] leading-[1.48] text-[#1C1B18]/72 sm:text-[14.5px] md:mt-2.5 md:max-w-[54ch] md:text-[15.5px]">
            Scroll to zoom out from our opening pair into a{' '}
            {isMobile ? 'mosaic' : '4×3 mosaic'} of our website directions.
          </p>

          <div className="mt-3.5 flex justify-center md:mt-4">
            <button
              type="button"
              onClick={onStartProject}
              className="inline-flex h-9 items-center gap-2 rounded-full bg-[#1C1B18] px-4.5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] md:h-10 md:px-5 md:text-[12.5px]"
            >
              <span>Start a 24h Sprint</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>

        {/* UNIFIED SCROLL-PINNED STAGE: Mobile 3×2 (+ See more -> 3×4) & Desktop 4×3 */}
        <div ref={spacerRef} className="relative w-full">
          <div
            ref={pinWrapperRef}
            className="mx-auto w-full max-w-[1160px] px-3.5 sm:px-6 lg:px-8"
          >
            <div
              ref={stageRef}
              style={
                prefersReducedMotion || isFiltered
                  ? undefined
                  : {
                      transformOrigin: isMobile ? '67% 44px' : '50% 44px',
                      willChange: 'transform',
                    }
              }
            >
              {/* Swipeable Industry Filter Bar — reveals smoothly once cards flip open */}
              <div
                aria-hidden={!filtersVisible}
                className={`mb-3 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] md:mb-3.5 ${
                  filtersVisible
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-2 opacity-0'
                }`}
              >
                <div
                  role="tablist"
                  aria-label="Filter website directions by business type"
                  className="no-scrollbar -mx-3.5 flex flex-nowrap items-center gap-2 overflow-x-auto px-3.5 py-1 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:py-0"
                >
                  {FILTERS.map((filter) => {
                    const isSelected = activeFilter === filter;
                    const count =
                      filter === 'All'
                        ? PROJECTS.length
                        : PROJECTS.filter((p) =>
                            p.industries.includes(filter),
                          ).length;
                    return (
                      <button
                        key={filter}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={(e) => {
                          setActiveFilter(filter);
                          e.currentTarget.scrollIntoView({
                            behavior: prefersReducedMotion ? 'auto' : 'smooth',
                            block: 'nearest',
                            inline: 'center',
                          });
                        }}
                        className={`relative rounded-full px-3 py-1.5 text-[11.5px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#C98A3A] sm:px-3.5 md:px-4 md:text-[12px] ${
                          isSelected
                            ? 'text-[#F7F5F0]'
                            : 'glass-subtle text-[#1C1B18]/75 hover:bg-white/40 hover:text-[#1C1B18]'
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="examples-filter-pill"
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
                <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-4 md:gap-3.5">
                  {filteredProjects.map((project) => (
                    <OpenProjectCard
                      key={project.id}
                      project={project}
                      imageUrl={getCardImageUrl(project)}
                      isBestMatch={project.bestMatchFor.includes(activeFilter)}
                      isClickable
                      onSelect={onSelectProject}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2 sm:gap-3">
                  {activeRows.map((rowProjects, rowIdx) => (
                    <div
                      key={`row-${rowIdx}`}
                      className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-4 md:gap-3.5"
                    >
                      {rowProjects.map((project, colIdx) => {
                        const isStartCard = START_IDS.has(project.id);
                        const imgUrl = getCardImageUrl(project);

                        if (isStartCard) {
                          return (
                            <div key={project.id} className="relative z-10">
                              <OpenProjectCard
                                project={project}
                                imageUrl={imgUrl}
                                isStartCard
                                isClickable
                                onSelect={onSelectProject}
                              />
                            </div>
                          );
                        }

                        const revealRefIdx = outerRefCounter++;
                        const skipInitialHide =
                          prefersReducedMotion ||
                          showAllMobile ||
                          (isMobile && rowIdx >= 2);

                        return (
                          <div
                            key={project.id}
                            ref={(el) => {
                              outerRevealRefs.current[revealRefIdx] = el;
                            }}
                            style={
                              skipInitialHide ? undefined : { opacity: 0 }
                            }
                          >
                            <UnfoldingGridCard
                              project={project}
                              imageUrl={imgUrl}
                              isOpen={openedRows[rowIdx]}
                              colIndex={colIdx}
                              cols={gridCols}
                              reducedMotion={prefersReducedMotion}
                              onSelect={onSelectProject}
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
                  className={`mt-4 flex justify-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    filtersVisible
                      ? 'translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-2 opacity-0'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setShowAllMobile((prev) => !prev)}
                    className="glass-subtle inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-4 text-[11.5px] font-semibold text-[#1C1B18] transition-colors duration-200 hover:bg-white/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
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

        {/* Closing CTA & Studio Footer */}
        <section
          aria-label="Start a 24h Sprint"
          className="mx-auto max-w-[1160px] px-4 pt-10 md:px-8 md:pt-16"
        >
          <div className="glass-elevated flex flex-col items-start justify-between gap-6 rounded-2xl p-6 md:flex-row md:items-center md:p-9">
            <div className="max-w-xl">
              <p className="text-[12px] font-medium tracking-[0.04em] text-[#C98A3A]">
                Ready for your own live concept?
              </p>
              <h2 className="display-tight mt-2 text-[clamp(1.6rem,2.8vw,2.35rem)] leading-[1.1] font-semibold text-[#1C1B18]">
                Receive your tailored website plan & first clickable concept within 24 hours.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
              >
                Start a 24h Sprint
              </button>
              <button
                type="button"
                onClick={onBookCall}
                className="glass-tile inline-flex h-10 items-center justify-center rounded-full px-5 text-[12px] font-medium text-[#1C1B18] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-white/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
              >
                Book a 15-min Call
              </button>
            </div>
          </div>

          <footer className="glass-subtle mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl px-6 py-5 text-[12px] text-[#1C1B18]/70 sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#1C1B18]">Edition One</span>
              <span aria-hidden="true">·</span>
              <span>Netherlands</span>
              <span aria-hidden="true">·</span>
              <span>Crafted for Modern Business</span>
            </div>

            <button
              type="button"
              onClick={onBackToOverview}
              className="inline-flex items-center gap-1.5 font-medium text-[#1C1B18] transition-colors hover:text-[#C98A3A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Studio Overview</span>
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}
