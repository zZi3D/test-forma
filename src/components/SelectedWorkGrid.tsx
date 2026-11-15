import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  ProjectCategory,
  ProjectConfig,
} from '../data/projects';
import { getProjectDataUrl } from '../utils/mockupGenerator';

interface SelectedWorkGridProps {
  onSelectProject: (project: ProjectConfig) => void;
  onStartProject: () => void;
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

interface CardVariantCustom {
  index: number;
  cols: number;
  totalItems: number;
  reducedMotion: boolean;
}

const CARD_VARIANTS: Variants = {
  hidden: ({ index, cols, totalItems, reducedMotion }: CardVariantCustom) => {
    if (reducedMotion) {
      return {
        opacity: 1,
        x: '0%',
        y: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
      };
    }

    const rowIndex = cols > 1 ? Math.floor(index / cols) : index;
    const rowItems =
      cols > 1 ? Math.min(cols, Math.max(1, totalItems - rowIndex * cols)) : 1;

    if (cols <= 1 || rowItems <= 1) {
      return {
        opacity: 0.92,
        x: '0%',
        y: 28,
        scale: 0.84,
        rotateX: -48,
        rotateY: 0,
        rotateZ: index % 2 === 0 ? -3 : 3,
      };
    }

    const col = index % cols;
    const center = (rowItems - 1) / 2;
    const offsetFromCenter = center - col;
    const spreadPct = rowItems >= 4 ? 95 : rowItems === 3 ? 92 : 88;

    return {
      opacity: 0.92,
      x: `${Math.round(offsetFromCenter * spreadPct)}%`,
      y: Math.round(Math.abs(offsetFromCenter) * 7 + 20),
      scale: 0.8,
      rotateX: -36,
      rotateY: Number((-offsetFromCenter * 18).toFixed(1)),
      rotateZ: Number((-offsetFromCenter * 5.2).toFixed(1)),
    };
  },
  visible: ({ index, cols, reducedMotion }: CardVariantCustom) => {
    const col = cols > 1 ? index % cols : 0;
    const delay = reducedMotion ? 0 : col * 0.07;

    return {
      opacity: 1,
      x: '0%',
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.78,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    };
  },
};

interface WorkTileCardProps {
  project: ProjectConfig;
  index: number;
  cols: number;
  totalItems: number;
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
  totalItems,
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

  const handlePointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'touch') return;
    onHoverStart(project.id);
    if (buttonRef.current && !reducedMotion) {
      buttonRef.current.style.transition =
        'transform 120ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 250ms ease, border-color 250ms ease';
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'touch' || reducedMotion) return;
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
    <motion.article
      custom={{ index, cols, totalItems, reducedMotion }}
      variants={CARD_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: cols <= 1 ? 0.4 : 0.55,
        margin: cols <= 1 ? '0px 0px -70px 0px' : '0px 0px -130px 0px',
      }}
      style={{
        transformPerspective: 1100,
        zIndex: cols > 1 ? cols - (index % cols) : 1,
      }}
      className="relative"
    >
      <div
        className={`transition-opacity duration-300 ${
          isDimmed ? 'opacity-72' : 'opacity-100'
        }`}
      >
        <button
          ref={buttonRef}
          type="button"
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
                alt={`${project.title} — ${project.styleLabel} UI/UX interface`}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-4 text-sm font-medium text-[#1C1B18]">
                {project.title}
              </div>
            )}
          </div>

          <div className="relative z-10 mt-3 flex items-baseline justify-between gap-2 px-0.5">
            <div className="min-w-0">
              <h3 className="truncate text-[15px] font-semibold tracking-[-0.015em] text-[#1C1B18] transition-colors group-hover:text-[#C98A3A]">
                {project.title}
              </h3>
              <p className="mt-0.5 truncate text-[11px] text-[#1C1B18]/65">
                {project.styleLabel} · {project.year}
              </p>
            </div>
            <span className="font-mono-tabular shrink-0 text-[11px] font-medium text-[#1C1B18]/50">
              {project.index}
            </span>
          </div>
        </button>
      </div>
    </motion.article>
  );
}

export function SelectedWorkGrid({
  onSelectProject,
  onStartProject,
}: SelectedWorkGridProps) {
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
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedMetricsRef = useRef(false);

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

  const thumbnails = useMemo(() => {
    const map = new Map<string, string>();
    PROJECTS.forEach((p) => {
      map.set(p.id, getProjectDataUrl(p));
    });
    return map;
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

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
      id="selected-work"
      aria-label="Selected Work Portfolio Archive"
      className="relative z-10 w-full px-4 pt-14 pb-16 md:px-8 md:pt-20 md:pb-24"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Studio Proof Metrics Strip (live count-up on first reveal) */}
        <motion.div
          ref={metricsRef}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="glass-tile mb-12 grid grid-cols-2 gap-4 rounded-2xl p-4 md:mb-14 md:grid-cols-4 md:gap-6 md:px-7 md:py-5"
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

        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5 border-b border-[#1C1B18]/12 pb-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-[12px] font-medium tracking-[0.04em] text-[#C98A3A]">
              Archive · {PROJECTS.length} Editions
            </p>
            <h2 className="display-tight mt-1.5 text-[clamp(2rem,3.4vw,3rem)] leading-[1.06] font-semibold text-[#1C1B18]">
              Selected Work
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

        {/* Interactive Filter Tabs with Sliding Active Pill */}
        <div
          role="tablist"
          aria-label="Filter projects by discipline"
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
          {visibleProjects.map((project, idx) => (
            <WorkTileCard
              key={project.id}
              project={project}
              index={idx}
              cols={gridCols}
              totalItems={visibleProjects.length}
              imgSrc={thumbnails.get(project.id)}
              isDimmed={hoveredId !== null && hoveredId !== project.id}
              isSpotlighted={hoveredId === project.id}
              reducedMotion={prefersReducedMotion}
              onHoverStart={(id) => setHoveredId(id)}
              onHoverEnd={() => setHoveredId(null)}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
