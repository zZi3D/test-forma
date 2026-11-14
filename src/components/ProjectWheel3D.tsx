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

  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dimensions, setDimensions] = useState<{
    radius: number;
    cardWidth: number;
  }>({
    radius: 470,
    cardWidth: 236,
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

  autoSpinRef.current = isAutoSpin;

  const thumbnails = useMemo(() => {
    const map = new Map<string, string>();
    PROJECTS.forEach((p) => {
      map.set(p.id, getProjectDataUrl(p));
    });
    return map;
  }, []);

  // Responsive cylinder geometry
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({ radius: 265, cardWidth: 168 });
      } else if (w < 1024) {
        setDimensions({ radius: 375, cardWidth: 204 });
      } else {
        setDimensions({ radius: 485, cardWidth: 240 });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Track vertical scroll to gently turn & tilt the 3D wheel
  useEffect(() => {
    scrollTargetRef.current = window.scrollY;
    scrollSmoothRef.current = window.scrollY;
    const onScroll = () => {
      scrollTargetRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Main 60fps CSS-3D animation loop
  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Smooth scroll coupling
      scrollSmoothRef.current +=
        (scrollTargetRef.current - scrollSmoothRef.current) * 0.08;
      const scrollAngleOffset = scrollSmoothRef.current * 0.065;
      const scrollTiltX = Math.max(
        -15,
        Math.min(-4, -9 - (scrollSmoothRef.current / 900) * 4),
      );

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
        rigRef.current.style.transform = `rotateX(${scrollTiltX.toFixed(2)}deg) rotateZ(5.5deg)`;
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
    const currentScrollOffset = scrollSmoothRef.current * 0.065;
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
    <div className="relative mt-6 w-full select-none md:mt-8">
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
        className={`relative mx-auto flex h-[300px] w-full items-center justify-center overflow-visible touch-pan-y sm:h-[340px] md:h-[380px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ perspective: '1500px' }}
      >
        <div
          ref={rigRef}
          className="relative flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-9deg) rotateZ(5.5deg)',
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
                  style={{
                    width: `${dimensions.cardWidth}px`,
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${cardAngle}deg) translateZ(${dimensions.radius}px)`,
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  {/* Front Face */}
                  <button
                    type="button"
                    onClick={() => {
                      if (pointerTravelRef.current < 8) {
                        onSelectProject(project);
                      }
                    }}
                    className={`glass-tile group relative block w-full rounded-xl p-2 text-left transition-all duration-300 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-[#C98A3A] ${
                      isFocused
                        ? 'ring-1 ring-[#C98A3A]/55 shadow-[0_24px_48px_-14px_rgba(28,27,24,0.22)]'
                        : 'opacity-95'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div
                      className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[#1C1B18]/10"
                      style={{ backgroundColor: project.palette.surface }}
                    >
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt={`${project.title} — ${project.category}`}
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
                      {project.category}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wheel Navigation & Turn Controls */}
      <div className="mx-auto mt-2 flex max-w-[680px] flex-wrap items-center justify-between gap-3 rounded-full px-4 py-2 glass-subtle">
        <div className="flex items-center gap-1.5">
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
          className="min-w-0 flex-1 truncate text-center text-[12px] font-medium text-[#1C1B18] transition-colors hover:text-[#C98A3A]"
        >
          <span className="font-mono-tabular mr-2 text-[#C98A3A]">
            {activeProject.index}
          </span>
          <span className="font-semibold">{activeProject.title}</span>
          <span className="mx-1.5 text-[#1C1B18]/35">·</span>
          <span className="text-[#1C1B18]/65">{activeProject.category}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsAutoSpin((prev) => !prev)}
          aria-pressed={isAutoSpin}
          className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#1C1B18]/15 px-3 text-[11px] font-medium text-[#1C1B18] whitespace-nowrap shrink-0 transition-colors hover:bg-[#1C1B18] hover:text-[#F7F5F0]"
        >
          {isAutoSpin ? (
            <>
              <Pause className="h-3 w-3" />
              <span>Pause Spin</span>
            </>
          ) : (
            <>
              <Play className="h-3 w-3" />
              <span>Turn Wheel</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
