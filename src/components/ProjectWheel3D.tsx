import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/projects';
import { getProjectDataUrl } from '../utils/mockupGenerator';

interface ProjectWheel3DProps {
  onSelectProject: (project: ProjectItem) => void;
}

const CARD_COUNT = PROJECTS.length;
const STEP_DEG = 360 / CARD_COUNT;

function normalizeIndex(angleDeg: number): number {
  const raw = Math.round(-angleDeg / STEP_DEG);
  return ((raw % CARD_COUNT) + CARD_COUNT) % CARD_COUNT;
}

export function ProjectWheel3D({ onSelectProject }: ProjectWheel3DProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rigRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dimensions, setDimensions] = useState<{
    radius: number;
    cardWidth: number;
    maxZoomScale: number;
  }>({
    radius: 540,
    cardWidth: 268,
    maxZoomScale: 1.19,
  });

  // Mutable animation state inside refs for zero-overhead 60fps animation
  const angleRef = useRef(0);
  const targetAngleRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const autoSpinRef = useRef(isAutoSpin);
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const pointerTravelRef = useRef(0);
  const scrollTargetRef = useRef(0);
  const scrollSmoothRef = useRef(0);
  const lastReportedIndexRef = useRef(0);
  const dimensionsRef = useRef(dimensions);

  autoSpinRef.current = isAutoSpin;
  dimensionsRef.current = dimensions;

  const thumbnails = useMemo(() => {
    const map = new Map<string, string>();
    PROJECTS.forEach((p) => {
      map.set(p.id, getProjectDataUrl(p));
    });
    return map;
  }, []);

  // Responsive cylinder geometry tuned for 12 3D cards (larger stage + prominent center zoom)
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ radius: 260, cardWidth: 196, maxZoomScale: 1.14 });
      } else if (w < 1024) {
        setDimensions({ radius: 410, cardWidth: 224, maxZoomScale: 1.17 });
      } else {
        setDimensions({ radius: 540, cardWidth: 268, maxZoomScale: 1.19 });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Track vertical scroll to briskly turn & gently tilt the 3D wheel
  useEffect(() => {
    scrollTargetRef.current = window.scrollY;
    scrollSmoothRef.current = window.scrollY;
    const onScroll = () => {
      scrollTargetRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Main 60fps CSS-3D animation loop with smoothstep center card zoom-in / zoom-out
  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Stronger scroll coupling so scrolling down rotates the wheel cards noticeably
      const isMobile = window.innerWidth < 768;
      scrollSmoothRef.current +=
        (scrollTargetRef.current - scrollSmoothRef.current) * 0.09;
      const scrollSensitivity = isMobile ? 0.08 : 0.15;
      const scrollAngleOffset = scrollSmoothRef.current * scrollSensitivity;
      const scrollTiltX = isMobile
        ? -7.5
        : Math.max(-10, Math.min(-7.5, -7.5 - (scrollSmoothRef.current / 900) * 2.5));

      if (targetAngleRef.current !== null) {
        const diff = targetAngleRef.current - angleRef.current;
        angleRef.current += diff * Math.min(1, dt * 8.5);
        if (Math.abs(diff) < 0.05) {
          angleRef.current = targetAngleRef.current;
          targetAngleRef.current = null;
        }
      } else if (!isDraggingRef.current) {
        // Inertia decay
        angleRef.current += velocityRef.current * dt;
        velocityRef.current *= Math.pow(0.06, dt);
        if (Math.abs(velocityRef.current) < 0.25) {
          velocityRef.current = 0;
        }

        // Gentle continuous 3D turn when idle
        if (autoSpinRef.current && !isHoveringRef.current) {
          angleRef.current -= 11.5 * dt;
        }
      }

      const displayAngle = angleRef.current - scrollAngleOffset;

      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${displayAngle.toFixed(3)}deg)`;
      }

      if (rigRef.current) {
        const w = window.innerWidth;
        const rigLiftY = w < 640 ? 0 : w < 1024 ? -20 : -30;
        rigRef.current.style.transform = `translateY(${rigLiftY}px) rotateX(${scrollTiltX.toFixed(2)}deg) rotateZ(4.5deg)`;
      }

      // Per-card smooth center zoom-in & gentle zoom-out based on angular distance from front center (0 deg)
      const { radius, maxZoomScale } = dimensionsRef.current;
      const zoomRangeDeg = 44; // Smooth interpolation across ~1.45 card steps on each side
      for (let i = 0; i < CARD_COUNT; i += 1) {
        const cardEl = cardRefs.current[i];
        if (!cardEl) continue;

        const cardAngle = i * STEP_DEG;
        const relDeg = ((((cardAngle + displayAngle) % 360) + 540) % 360) - 180;
        const absDeg = Math.abs(relDeg);

        const linearT = Math.max(0, 1 - absDeg / zoomRangeDeg);
        const smoothT = linearT * linearT * (3 - 2 * linearT);

        const scale = 1 + smoothT * (maxZoomScale - 1);
        const extraZ = smoothT * (isMobile ? 22 : 38);
        const liftY = -smoothT * 5;

        cardEl.style.transform = `rotateY(${cardAngle}deg) translateZ(${(
          radius + extraZ
        ).toFixed(2)}px) translateY(${liftY.toFixed(2)}px) scale(${scale.toFixed(4)})`;
      }

      const nearest = normalizeIndex(displayAngle);
      if (nearest !== lastReportedIndexRef.current) {
        lastReportedIndexRef.current = nearest;
        setActiveIndex(nearest);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const stepWheel = useCallback((direction: -1 | 1) => {
    targetAngleRef.current = null;
    velocityRef.current = 0;
    const isMobile = window.innerWidth < 768;
    const currentScrollOffset =
      scrollSmoothRef.current * (isMobile ? 0.08 : 0.15);
    const currentDisplay = angleRef.current - currentScrollOffset;
    const snappedBase = Math.round(currentDisplay / STEP_DEG) * STEP_DEG;
    targetAngleRef.current =
      snappedBase + direction * STEP_DEG + currentScrollOffset;
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    targetAngleRef.current = null;
    isDraggingRef.current = true;
    setIsDragging(true);
    lastPointerXRef.current = e.clientX;
    pointerTravelRef.current = 0;
    velocityRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    pointerTravelRef.current += Math.abs(dx);

    const deltaDeg = dx * 0.28;
    angleRef.current += deltaDeg;
    velocityRef.current = deltaDeg * 42;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
    if (!isHorizontal) return;
    e.preventDefault();
    targetAngleRef.current = null;
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    angleRef.current -= delta * 0.14;
    velocityRef.current = -delta * 2.2;
  };

  const activeProject = PROJECTS[activeIndex];

  return (
    <div className="relative mt-2 w-full select-none sm:mt-3">
      {/* 3D Perspective Stage (pure CSS 3D + rAF, zero WebGL) */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={() => {
          isHoveringRef.current = true;
        }}
        onPointerLeave={() => {
          isHoveringRef.current = false;
        }}
        onWheel={handleWheel}
        role="region"
        aria-roledescription="3D rotating project wheel"
        aria-label="Interactive 3D showcase wheel — drag horizontally to turn, click any card to inspect"
        className={`relative mx-auto flex h-[285px] w-full items-center justify-center overflow-visible touch-pan-y sm:h-[340px] md:h-[380px] lg:h-[395px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ perspective: '1750px' }}
      >
        <div
          ref={rigRef}
          className="relative flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-7.5deg) rotateZ(4.5deg)',
          }}
        >
          <div
            ref={ringRef}
            className="relative flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateY(0deg)',
            }}
          >
            {PROJECTS.map((project, idx) => {
              const cardAngle = idx * STEP_DEG;
              const imgSrc = thumbnails.get(project.id);
              const isFocused = idx === activeIndex;

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  style={{
                    width: `${dimensions.cardWidth}px`,
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${cardAngle}deg) translateZ(${dimensions.radius}px)`,
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
                >
                  {/* Front Face */}
                  <button
                    type="button"
                    onClick={() => {
                      if (pointerTravelRef.current < 8) {
                        onSelectProject(project);
                      }
                    }}
                    className={`glass-tile group relative block w-full rounded-xl p-2 text-left transition-shadow duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-[#C98A3A] ${
                      isFocused
                        ? 'ring-1 ring-[#C98A3A]/60 shadow-[0_28px_56px_-14px_rgba(28,27,24,0.26)]'
                        : 'opacity-95'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div
                      className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#1C1B18]/10"
                      style={{ backgroundColor: project.palette.bg }}
                    >
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt={`${project.title} — ${project.styleLabel}`}
                          draggable={false}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      )}
                    </div>
                    <div className="mt-2 flex items-baseline justify-between gap-2 px-1">
                      <span className="truncate text-[12px] font-semibold tracking-[-0.01em] text-[#1C1B18]">
                        {project.title}
                      </span>
                      <span className="font-mono-tabular shrink-0 text-[10px] text-[#1C1B18]/60">
                        {project.index}
                      </span>
                    </div>
                  </button>

                  {/* Translucent Frosted Backplate so far-side cards never mirror backwards text */}
                  <div
                    aria-hidden="true"
                    className="glass-subtle pointer-events-none absolute inset-0 flex flex-col justify-between rounded-xl p-3"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#1C1B18]/35">
                      <span className="font-mono-tabular">{project.index}</span>
                      <span>FORMA</span>
                    </div>
                    <div className="border-t border-[#1C1B18]/10 pt-2 text-[11px] font-medium text-[#1C1B18]/35">
                      {project.styleLabel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wheel Navigation & Turn Controls (Directly Under Wheel Stage — lower on desktop to clear zoomed front card) */}
      <div className="glass-subtle relative z-20 mx-auto mt-7 flex max-w-[680px] items-center justify-between gap-2.5 rounded-full px-3 py-1.5 sm:mt-16 sm:gap-3 sm:px-4 sm:py-2 md:mt-24 lg:mt-32">
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <button
            type="button"
            onClick={() => stepWheel(1)}
            aria-label="Turn 3D wheel left"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1C1B18]/15 text-[#1C1B18] transition-colors hover:bg-[#1C1B18] hover:text-[#F7F5F0]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => stepWheel(-1)}
            aria-label="Turn 3D wheel right"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1C1B18]/15 text-[#1C1B18] transition-colors hover:bg-[#1C1B18] hover:text-[#F7F5F0]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onSelectProject(activeProject)}
          className="min-w-0 flex-1 truncate text-center text-[11px] font-medium text-[#1C1B18] transition-colors hover:text-[#C98A3A] sm:text-[12px]"
        >
          <span className="font-mono-tabular mr-1.5 text-[#C98A3A] sm:mr-2">
            {activeProject.index}
          </span>
          <span className="font-semibold">{activeProject.title}</span>
          <span className="mx-1.5 hidden text-[#1C1B18]/35 sm:inline">·</span>
          <span className="hidden text-[#1C1B18]/65 sm:inline">
            {activeProject.styleLabel}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setIsAutoSpin((prev) => !prev)}
          aria-pressed={isAutoSpin}
          className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-[#1C1B18]/15 px-2.5 text-[11px] font-medium whitespace-nowrap text-[#1C1B18] transition-colors hover:bg-[#1C1B18] hover:text-[#F7F5F0] sm:px-3"
        >
          {isAutoSpin ? (
            <>
              <Pause className="h-3 w-3" />
              <span className="hidden sm:inline">Pause Spin</span>
              <span className="sm:hidden">Pause</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3" />
              <span className="hidden sm:inline">Turn Wheel</span>
              <span className="sm:hidden">Turn</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
