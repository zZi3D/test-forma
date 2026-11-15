import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/projects';
import { useProjectThumbnails } from '../utils/mockupGenerator';

interface ProjectWheel3DProps {
  onSelectProject: (project: ProjectItem) => void;
  isPaused?: boolean;
}

const CARD_COUNT = PROJECTS.length;
const STEP_DEG = 360 / CARD_COUNT;
const AUTO_SPIN_DELAY_MS = 2500;
const MAX_SWIPE_STEP_DEG = 8;
const MAX_SWIPE_VELOCITY = 110;

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

function normalizeIndex(angleDeg: number): number {
  const raw = Math.round(-angleDeg / STEP_DEG);
  return ((raw % CARD_COUNT) + CARD_COUNT) % CARD_COUNT;
}

const FOCUSED_CLASSES = [
  'border-[#C98A3A]/55',
  'shadow-[0_16px_32px_-12px_rgba(28,27,24,0.18)]',
];
const UNFOCUSED_CLASSES = [
  'border-white/85',
  'shadow-[0_10px_22px_-10px_rgba(28,27,24,0.12)]',
  'opacity-95',
];

function applyButtonFocusState(
  btn: HTMLButtonElement | null | undefined,
  focused: boolean,
) {
  if (!btn) return;
  if (focused) {
    btn.classList.remove(...UNFOCUSED_CLASSES);
    btn.classList.add(...FOCUSED_CLASSES);
  } else {
    btn.classList.remove(...FOCUSED_CLASSES);
    btn.classList.add(...UNFOCUSED_CLASSES);
  }
}

interface WheelCaptionButtonProps {
  initialIndex: number;
  registerSetter: (setter: ((index: number) => void) | null) => void;
  onSelectProject: (project: ProjectItem) => void;
}

function WheelCaptionButton({
  initialIndex,
  registerSetter,
  onSelectProject,
}: WheelCaptionButtonProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    registerSetter(setActiveIndex);
    return () => registerSetter(null);
  }, [registerSetter]);

  const activeProject = PROJECTS[activeIndex] ?? PROJECTS[0];

  return (
    <button
      type="button"
      onClick={() => onSelectProject(activeProject)}
      className="min-w-0 flex-1 truncate text-center text-[11px] font-medium text-[#1C1B18] transition-colors hover:text-[#C98A3A] sm:text-[12px]"
    >
      <span className="font-mono-tabular mr-1.5 text-[#C98A3A] sm:mr-2">
        {activeProject.index}
      </span>
      <span className="font-semibold">{activeProject.businessTitle}</span>
      <span className="mx-1.5 hidden text-[#1C1B18]/35 sm:inline">·</span>
      <span className="hidden text-[#1C1B18]/65 sm:inline">
        {activeProject.targetBusinesses}
      </span>
    </button>
  );
}

export function ProjectWheel3D({
  onSelectProject,
  isPaused = false,
}: ProjectWheel3DProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rigRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const captionSetterRef = useRef<((index: number) => void) | null>(null);

  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dimensions, setDimensions] = useState<{
    radius: number;
    cardWidth: number;
    perspective: number;
    outerScale: number;
    centerScale: number;
    extraZ: number;
  }>({
    radius: 620,
    cardWidth: 460,
    perspective: 3200,
    outerScale: 0.67,
    centerScale: 0.80,
    extraZ: 34,
  });

  // Mutable animation state inside refs for zero-overhead 60fps animation
  const angleRef = useRef(0);
  const targetAngleRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const autoSpinRef = useRef(isAutoSpin);
  const userToggledAutoSpinRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const pointerTravelRef = useRef(0);
  const scrollTargetRef = useRef(0);
  const scrollSmoothRef = useRef(0);
  const lastReportedIndexRef = useRef(0);
  const dimensionsRef = useRef(dimensions);
  const isPausedRef = useRef(isPaused);
  const loopControlsRef = useRef<{ sync: () => void } | null>(null);

  autoSpinRef.current = isAutoSpin;
  dimensionsRef.current = dimensions;
  isPausedRef.current = isPaused;

  const registerCaptionSetter = useCallback(
    (setter: ((index: number) => void) | null) => {
      captionSetterRef.current = setter;
      if (setter) {
        setter(lastReportedIndexRef.current);
      }
    },
    [],
  );

  // Always start auto-spin automatically after a 2.5s initial pause
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      if (!userToggledAutoSpinRef.current) {
        setIsAutoSpin(true);
      }
    }, AUTO_SPIN_DELAY_MS);
    return () => window.clearTimeout(timerId);
  }, []);

  const thumbnails = useProjectThumbnails();

  // Responsive cylinder geometry:
  // 1) (cardWidth * outerScale) < 2 * radius * tan(15deg) prevents 3D neighbor card intersection
  // 2) (centerScale * perspectiveMag) stays <= ~1.0 to preserve Retina sharpness
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDimensions({
          radius: 415,
          cardWidth: 270,
          perspective: 2400,
          outerScale: 0.72,
          centerScale: 0.82,
          extraZ: 36,
        });
      } else if (w < 1024) {
        setDimensions({
          radius: 500,
          cardWidth: 370,
          perspective: 2800,
          outerScale: 0.68,
          centerScale: 0.81,
          extraZ: 34,
        });
      } else {
        setDimensions({
          radius: 620,
          cardWidth: 460,
          perspective: 3200,
          outerScale: 0.67,
          centerScale: 0.80,
          extraZ: 34,
        });
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

  // Main 60fps CSS-3D animation loop (automatically pauses when scrolled offscreen or tab is hidden)
  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();
    let isStageVisible = true;

    const tick = (now: number) => {
      rafId = 0;
      if (isPausedRef.current || !isStageVisible || document.hidden) return;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Stronger scroll coupling so scrolling down rotates the wheel cards noticeably
      const isMobile = window.innerWidth < 768;
      scrollSmoothRef.current +=
        (scrollTargetRef.current - scrollSmoothRef.current) * 0.09;
      const scrollSensitivity = isMobile ? 0.08 : 0.15;
      const scrollAngleOffset = scrollSmoothRef.current * scrollSensitivity;
      const scrollTiltX = isMobile
        ? -5.5
        : Math.max(-10, Math.min(-7.5, -7.5 - (scrollSmoothRef.current / 900) * 2.5));

      if (targetAngleRef.current !== null) {
        const diff = targetAngleRef.current - angleRef.current;
        angleRef.current += diff * Math.min(1, dt * 8.5);
        if (Math.abs(diff) < 0.05) {
          angleRef.current = targetAngleRef.current;
          targetAngleRef.current = null;
        }
      } else if (!isDraggingRef.current) {
        // Controlled inertia decay
        angleRef.current += velocityRef.current * dt;
        velocityRef.current *= Math.pow(0.035, dt);
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
        const rigLiftY = w < 640 ? -12 : w < 1024 ? -20 : -30;
        rigRef.current.style.transform = `translateY(${rigLiftY}px) rotateX(${scrollTiltX.toFixed(2)}deg) rotateZ(${
          w < 640 ? 3 : 4.5
        }deg)`;
      }

      // Per-card smooth center zoom-in & gentle zoom-out (never upscaling past native resolution)
      const { radius, outerScale, centerScale, extraZ } = dimensionsRef.current;
      const zoomRangeDeg = 44; // Smooth interpolation across ~1.45 card steps on each side
      for (let i = 0; i < CARD_COUNT; i += 1) {
        const cardEl = cardRefs.current[i];
        if (!cardEl) continue;

        const cardAngle = i * STEP_DEG;
        const relDeg = ((((cardAngle + displayAngle) % 360) + 540) % 360) - 180;
        const absDeg = Math.abs(relDeg);

        const linearT = Math.max(0, 1 - absDeg / zoomRangeDeg);
        const smoothT = linearT * linearT * (3 - 2 * linearT);

        const scale = outerScale + smoothT * (centerScale - outerScale);
        const zOffset = smoothT * extraZ;
        const liftY = -smoothT * 5;

        cardEl.style.transform = `rotateY(${cardAngle}deg) translateZ(${(
          radius + zOffset
        ).toFixed(2)}px) translateY(${liftY.toFixed(2)}px) scale(${scale.toFixed(4)})`;
      }

      const nearest = normalizeIndex(displayAngle);
      if (nearest !== lastReportedIndexRef.current) {
        applyButtonFocusState(
          cardButtonRefs.current[lastReportedIndexRef.current],
          false,
        );
        applyButtonFocusState(cardButtonRefs.current[nearest], true);
        lastReportedIndexRef.current = nearest;
        captionSetterRef.current?.(nearest);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (
        !rafId &&
        !isPausedRef.current &&
        isStageVisible &&
        !document.hidden
      ) {
        lastTime = performance.now();
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const syncLoop = () => {
      if (!isPausedRef.current && isStageVisible && !document.hidden) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    loopControlsRef.current = { sync: syncLoop };

    const observer =
      typeof IntersectionObserver !== 'undefined' && stageRef.current
        ? new IntersectionObserver(
            (entries) => {
              const visible = entries.some((entry) => entry.isIntersecting);
              isStageVisible = visible;
              syncLoop();
            },
            { threshold: 0.01 },
          )
        : null;

    if (observer && stageRef.current) {
      observer.observe(stageRef.current);
    }

    const handleVisibilityChange = () => {
      syncLoop();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    syncLoop();

    return () => {
      loopControlsRef.current = null;
      stopLoop();
      observer?.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    isPausedRef.current = isPaused;
    loopControlsRef.current?.sync();
  }, [isPaused]);

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
    lastPointerTimeRef.current = performance.now();
    pointerTravelRef.current = 0;
    velocityRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dtMove = Math.max((now - lastPointerTimeRef.current) / 1000, 0.008);
    lastPointerTimeRef.current = now;

    const dx = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    pointerTravelRef.current += Math.abs(dx);

    const deltaDeg = clamp(dx * 0.17, -MAX_SWIPE_STEP_DEG, MAX_SWIPE_STEP_DEG);
    angleRef.current += deltaDeg;

    const instantVelocity = clamp(
      deltaDeg / dtMove,
      -MAX_SWIPE_VELOCITY,
      MAX_SWIPE_VELOCITY,
    );
    velocityRef.current = clamp(
      velocityRef.current * 0.55 + instantVelocity * 0.45,
      -MAX_SWIPE_VELOCITY,
      MAX_SWIPE_VELOCITY,
    );
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
    const stepDeg = clamp(delta * 0.08, -MAX_SWIPE_STEP_DEG, MAX_SWIPE_STEP_DEG);
    angleRef.current -= stepDeg;
    velocityRef.current = clamp(
      velocityRef.current * 0.5 - stepDeg * 10,
      -MAX_SWIPE_VELOCITY,
      MAX_SWIPE_VELOCITY,
    );
  };

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
        className={`relative mx-auto flex h-[295px] w-full items-center justify-center overflow-visible touch-pan-y sm:h-[340px] md:h-[380px] lg:h-[395px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ perspective: `${dimensions.perspective}px` }}
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
              const isFocused = idx === lastReportedIndexRef.current;

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  style={{
                    width: `${dimensions.cardWidth}px`,
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${cardAngle}deg) translateZ(${dimensions.radius}px) scale(${dimensions.outerScale})`,
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  {/* Front Face — avoids CSS backdrop-filter inside 3D preserve-3d so Chromium keeps full Retina sharpness */}
                  <button
                    ref={(el) => {
                      cardButtonRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => {
                      if (pointerTravelRef.current < 8) {
                        onSelectProject(project);
                      }
                    }}
                    className={`group relative block w-full rounded-2xl border bg-[#FAF8F4]/92 p-2.5 text-left transition-colors duration-200 sm:p-3 focus-visible:outline-2 focus-visible:outline-[#C98A3A] ${
                      isFocused
                        ? 'border-[#C98A3A]/55 shadow-[0_16px_32px_-12px_rgba(28,27,24,0.18)]'
                        : 'border-white/85 shadow-[0_10px_22px_-10px_rgba(28,27,24,0.12)] opacity-95'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div
                      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#1C1B18]/10"
                      style={{ backgroundColor: project.palette.bg }}
                    >
                      {imgSrc && (
                        <img
                          src={imgSrc}
                          alt={`${project.businessTitle} (${project.styleSubtitle}) — ${project.targetBusinesses}`}
                          draggable={false}
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      )}
                    </div>
                    <div className="mt-2.5 flex items-baseline justify-between gap-2 px-1">
                      <div className="min-w-0">
                        <span className="block truncate text-[13px] font-semibold tracking-[-0.015em] text-[#1C1B18] sm:text-[15px]">
                          {project.businessTitle}
                        </span>
                        <span className="block truncate text-[10px] text-[#1C1B18]/60 sm:text-[11px]">
                          {project.targetBusinesses}
                        </span>
                      </div>
                      <span className="font-mono-tabular shrink-0 text-[11px] text-[#1C1B18]/65 sm:text-[12px]">
                        {project.index}
                      </span>
                    </div>
                  </button>

                  {/* Translucent Frosted Backplate without backdrop-filter blur penalty */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/70 bg-[#F7F5F0]/75 p-4 shadow-[0_12px_32px_-12px_rgba(28,27,24,0.08)]"
                    style={{
                      transform: 'rotateY(180deg)',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="flex items-center justify-between text-[12px] text-[#1C1B18]/35">
                      <span className="font-mono-tabular">{project.index}</span>
                      <span>FORMA</span>
                    </div>
                    <div className="border-t border-[#1C1B18]/10 pt-2.5 text-[13px] font-medium text-[#1C1B18]/35">
                      {project.businessTitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Wheel Navigation & Turn Controls (Directly Under Wheel Stage — lower on desktop to clear zoomed front card) */}
      <div className="glass-subtle relative z-20 mx-auto mt-8 flex max-w-[680px] items-center justify-between gap-2.5 rounded-full px-3 py-1.5 sm:mt-16 sm:gap-3 sm:px-4 sm:py-2 md:mt-24 lg:mt-32">
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

        <WheelCaptionButton
          initialIndex={lastReportedIndexRef.current}
          registerSetter={registerCaptionSetter}
          onSelectProject={onSelectProject}
        />

        <button
          type="button"
          onClick={() => {
            userToggledAutoSpinRef.current = true;
            setIsAutoSpin((prev) => !prev);
          }}
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
