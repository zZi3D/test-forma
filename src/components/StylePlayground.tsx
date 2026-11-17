import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Check,
  Play,
  Shuffle,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { INDUSTRY_FILTERS, IndustryFilter } from '../data/projects';
import {
  PLAYGROUND_INDUSTRY_COPY,
  PLAYGROUND_THEMES,
  PlaygroundStyleId,
  PlaygroundTheme,
} from '../data/playgroundStyles';
import { PlaygroundAmbientLayer } from './PlaygroundAmbientLayer';
import { PlaygroundProductVisual } from './PlaygroundProductVisual';
import { StagePerspectiveWave } from './StagePerspectiveWave';

interface StylePlaygroundProps {
  onBuildInStyle: (
    industry: IndustryFilter,
    prefilledDescription: string,
  ) => void;
}

const WORKBENCH_EASE = [0.22, 1, 0.36, 1] as const;

export function StylePlayground({ onBuildInStyle }: StylePlaygroundProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const headerRef = useRef<HTMLDivElement | null>(null);
  const stageWrapperRef = useRef<HTMLDivElement | null>(null);
  const [headerEntered, setHeaderEntered] = useState<boolean>(
    prefersReducedMotion,
  );
  const [stageEntered, setStageEntered] = useState<boolean>(
    prefersReducedMotion,
  );
  const [stageSettled, setStageSettled] = useState<boolean>(
    prefersReducedMotion,
  );

  // Direct MotionValues for zero-rerender scroll scrubbing (matching SelectedWorkGrid)
  const stageRotateX = useMotionValue(prefersReducedMotion ? 0 : 22);
  const stageScale = useMotionValue(prefersReducedMotion ? 1 : 0.89);
  const stageY = useMotionValue(prefersReducedMotion ? 0 : 34);
  const stageOpacity = useMotionValue(prefersReducedMotion ? 1 : 0.25);

  const [activeIndustry, setActiveIndustry] =
    useState<IndustryFilter>('Tech & Products');
  const [activeId, setActiveId] = useState<PlaygroundStyleId>('glassmorphism');
  const [activeNavIdx, setActiveNavIdx] = useState<number>(0);

  // Separate counters so Motion 1 / 2 toggles apply instantly (0ms) without triggering skin-wipe stagger
  const [skinWipeKey, setSkinWipeKey] = useState<number>(0);
  const [levitateOn, setLevitateOn] = useState<boolean>(true);
  const [kineticOn, setKineticOn] = useState<boolean>(true);
  const [kineticBurst, setKineticBurst] = useState<number>(0);
  const [interactionFeedback, setInteractionFeedback] = useState<string | null>(
    null,
  );

  const cardRef = useRef<HTMLDivElement | null>(null);
  const industryTablistRef = useRef<HTMLDivElement | null>(null);
  const skinTablistRef = useRef<HTMLDivElement | null>(null);
  const industryBtnRefs = useRef<
    Partial<Record<IndustryFilter, HTMLButtonElement | null>>
  >({});
  const skinBtnRefs = useRef<
    Partial<Record<PlaygroundStyleId, HTMLButtonElement | null>>
  >({});
  const hasMountedTabSyncRef = useRef<boolean>(false);
  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const rotateX = useSpring(tiltXRaw, { stiffness: 260, damping: 20 });
  const rotateY = useSpring(tiltYRaw, { stiffness: 260, damping: 20 });

  const activeTheme: PlaygroundTheme =
    PLAYGROUND_THEMES.find((t) => t.id === activeId) ?? PLAYGROUND_THEMES[0];
  const industryCopy = PLAYGROUND_INDUSTRY_COPY[activeIndustry];

  // Scroll-linked "Studio Workbench" choreography:
  // Tilts upright in real time as the stage scrolls into view, then locks flat at center viewport.
  useEffect(() => {
    if (prefersReducedMotion) {
      setHeaderEntered(true);
      setStageEntered(true);
      stageRotateX.set(0);
      stageScale.set(1);
      stageY.set(0);
      stageOpacity.set(1);
      return;
    }

    let rafId = 0;
    let headerDone = headerEntered;
    let stageDone = stageEntered;

    const evaluate = () => {
      rafId = 0;
      const vh = Math.max(window.innerHeight, 1);
      const atPageBottom =
        window.scrollY + vh >= document.documentElement.scrollHeight - 48;

      if (!headerDone && headerRef.current) {
        const hRect = headerRef.current.getBoundingClientRect();
        if (hRect.top <= vh * 0.78 || atPageBottom) {
          headerDone = true;
          setHeaderEntered(true);
        }
      }

      if (!stageDone && stageWrapperRef.current) {
        const sRect = stageWrapperRef.current.getBoundingClientRect();
        const startY = vh * 0.94;
        const lockY = vh * 0.54;

        if (sRect.top <= lockY || atPageBottom) {
          stageDone = true;
          setStageEntered(true);
          animate(stageRotateX, 0, { duration: 0.45, ease: WORKBENCH_EASE });
          animate(stageScale, 1, { duration: 0.45, ease: WORKBENCH_EASE });
          animate(stageY, 0, { duration: 0.45, ease: WORKBENCH_EASE });
          animate(stageOpacity, 1, { duration: 0.35, ease: WORKBENCH_EASE });
        } else {
          const span = Math.max(startY - lockY, 1);
          const p = Math.min(Math.max((startY - sRect.top) / span, 0), 1);
          stageRotateX.set(22 * (1 - p * 0.72));
          stageScale.set(0.89 + p * 0.08);
          stageY.set(34 * (1 - p));
          stageOpacity.set(0.25 + p * 0.65);
        }
      }
    };

    const onScrollOrResize = () => {
      if (headerDone && stageDone) return;
      if (!rafId) {
        rafId = window.requestAnimationFrame(evaluate);
      }
    };

    const initTimer = window.setTimeout(evaluate, 40);
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.clearTimeout(initTimer);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [
    headerEntered,
    stageEntered,
    prefersReducedMotion,
    stageRotateX,
    stageScale,
    stageY,
    stageOpacity,
  ]);

  useEffect(() => {
    if (!stageEntered || stageSettled) return;
    const timer = window.setTimeout(() => setStageSettled(true), 480);
    return () => window.clearTimeout(timer);
  }, [stageEntered, stageSettled]);

  useEffect(() => {
    if (!interactionFeedback) return;
    const timer = window.setTimeout(() => setInteractionFeedback(null), 2200);
    return () => window.clearTimeout(timer);
  }, [interactionFeedback]);

  // Keep the active industry & visual skin pills visible inside horizontal swipe strips (mobile)
  useEffect(() => {
    const scrollTabIntoStrip = (
      container: HTMLDivElement | null,
      tabEl: HTMLButtonElement | null,
      behavior: ScrollBehavior,
    ) => {
      if (!container || !tabEl) return;
      if (container.scrollWidth <= container.clientWidth + 2) return;
      const targetLeft =
        tabEl.offsetLeft - (container.clientWidth - tabEl.offsetWidth) / 2;
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollTo({
        left: Math.max(0, Math.min(targetLeft, maxScroll)),
        behavior,
      });
    };

    const syncTabs = (behavior: ScrollBehavior) => {
      scrollTabIntoStrip(
        industryTablistRef.current,
        industryBtnRefs.current[activeIndustry] ?? null,
        behavior,
      );
      scrollTabIntoStrip(
        skinTablistRef.current,
        skinBtnRefs.current[activeId] ?? null,
        behavior,
      );
    };

    const behavior: ScrollBehavior =
      !hasMountedTabSyncRef.current || prefersReducedMotion ? 'auto' : 'smooth';
    hasMountedTabSyncRef.current = true;
    syncTabs(behavior);

    const onResize = () => syncTabs('auto');
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [activeIndustry, activeId, prefersReducedMotion]);

  const handleSelectIndustry = (industry: IndustryFilter) => {
    if (industry === activeIndustry) return;
    setActiveIndustry(industry);
    setActiveNavIdx(0);
    if (!prefersReducedMotion) {
      setSkinWipeKey((k) => k + 1);
      if (kineticOn) setKineticBurst((c) => c + 1);
    }
  };

  const handleSelectTheme = (id: PlaygroundStyleId) => {
    if (id === activeId) return;
    setActiveId(id);
    if (!prefersReducedMotion) {
      setSkinWipeKey((k) => k + 1);
      if (kineticOn) setKineticBurst((c) => c + 1);
    }
  };

  const handleShuffleCombo = () => {
    const otherThemes = PLAYGROUND_THEMES.filter((t) => t.id !== activeId);
    const nextTheme =
      otherThemes[Math.floor(Math.random() * otherThemes.length)] ??
      PLAYGROUND_THEMES[0];
    const nextIndustry =
      INDUSTRY_FILTERS[Math.floor(Math.random() * INDUSTRY_FILTERS.length)] ??
      activeIndustry;

    // Smartly ensure at least one motion mode is active on shuffle
    const nextLevitate = Math.random() > 0.3;
    const nextKinetic = nextLevitate ? Math.random() > 0.35 : true;

    setActiveId(nextTheme.id);
    setActiveIndustry(nextIndustry);
    setActiveNavIdx(0);
    setLevitateOn(nextLevitate);
    setKineticOn(nextKinetic);

    if (!nextKinetic) {
      tiltXRaw.set(0);
      tiltYRaw.set(0);
    }

    if (!prefersReducedMotion) {
      setSkinWipeKey((k) => k + 1);
      if (nextKinetic) setKineticBurst((c) => c + 1);
    }

    setInteractionFeedback(
      `Shuffled: ${nextTheme.label} × ${nextIndustry}`,
    );
  };

  // Immediate (0ms) toggle without re-triggering the skin-wipe stagger
  const handleToggleKinetic = () => {
    setKineticOn((prev) => {
      const next = !prev;
      if (next && !prefersReducedMotion) {
        setKineticBurst((c) => c + 1);
      } else {
        tiltXRaw.set(0);
        tiltYRaw.set(0);
      }
      return next;
    });
  };

  const handleCardPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!kineticOn || prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltYRaw.set(px * 14);
    tiltXRaw.set(-py * 12);
  };

  const handleCardPointerLeave = () => {
    tiltXRaw.set(0);
    tiltYRaw.set(0);
  };

  const handleBuildHandoff = () => {
    const enabledMotions: string[] = [];
    if (levitateOn) enabledMotions.push('Levitate & Pulse');
    if (kineticOn) enabledMotions.push('Kinetic Pop & Tilt');
    const motionSuffix =
      enabledMotions.length > 0
        ? ` + Motion (${enabledMotions.join(', ')})`
        : '';
    onBuildInStyle(
      activeIndustry,
      `Live Style Playground: ${activeTheme.label} for ${activeIndustry}${motionSuffix}`,
    );
  };

  const popSpring =
    kineticOn && !prefersReducedMotion
      ? { type: 'spring' as const, stiffness: 380, damping: 18 }
      : { duration: 0.2 };

  return (
    <section
      id="style-playground"
      aria-label="Live Style Playground"
      className="relative z-10 w-full px-4 pt-12 pb-16 md:px-8 md:pt-16 md:pb-24"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* STEP 1 OF WORKBENCH ENTRANCE: Section Header */}
        <motion.div
          ref={headerRef}
          initial={
            prefersReducedMotion ? false : { opacity: 0, y: 24 }
          }
          animate={
            headerEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
          }
          transition={{ duration: 0.55, ease: WORKBENCH_EASE }}
        >
          {/* Section Header */}
          <div className="mb-5 flex flex-col gap-3.5 border-t border-[#1C1B18]/12 pt-10 md:mb-7 md:flex-row md:items-end md:justify-between md:gap-4 md:pt-14">
            <div className="min-w-0 flex-1">
              <span className="font-mono-tabular inline-flex items-center gap-2 rounded-full border border-[#1C1B18]/12 bg-white/75 px-3 py-1 text-[10.5px] font-semibold tracking-[0.06em] text-[#C98A3A] uppercase shadow-2xs">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: activeTheme.accentHex }}
                />
                03 · Interactive Lab
              </span>
              <h2 className="display-tight mt-2.5 text-[clamp(1.85rem,3.6vw,3.15rem)] leading-[1.06] font-semibold text-[#1C1B18] md:mt-3">
                Live Style Playground
              </h2>
              <p className="mt-2.5 max-w-[60ch] text-[13.5px] leading-[1.55] text-[#1C1B18]/75 sm:text-[15px] md:mt-3 md:leading-[1.6]">
                Pick your industry, switch visual skins, and toggle live
                micro-animations to feel how different design languages work for
                your business.
              </p>
            </div>

            <div className="flex min-w-0 items-center md:max-w-[46%] md:shrink-0 md:justify-end lg:max-w-none">
              <div className="font-mono-tabular inline-flex h-7 max-w-full min-w-0 items-center gap-1.5 rounded-full border border-[#1C1B18]/10 bg-white/65 px-2.5 text-[10px] font-medium whitespace-nowrap text-[#1C1B18]/60 sm:h-8 sm:px-3 sm:text-[11px]">
                <span className="shrink-0">Previewing:</span>
                <span className="shrink-0 font-semibold text-[#C98A3A]">
                  {activeIndustry}
                </span>
                <span aria-hidden="true" className="shrink-0">
                  ·
                </span>
                <span className="min-w-0 truncate font-semibold text-[#1C1B18]">
                  {activeTheme.label}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* INTEGRATED STUDIO WORKBENCH FRAME (Controls + Live Stage + Motion Dock) */}
        <div className="rounded-[24px] border border-[#1C1B18]/10 bg-white/58 p-2.5 shadow-[0_28px_64px_-24px_rgba(28,27,24,0.16),inset_0_1px_0_rgba(255,255,255,0.92)] md:rounded-[32px] md:p-5">
          {/* Unified Top Control Console (Step 1 Industry + Step 2 Visual Skin — horizontal swipe strips on mobile) */}
          <div className="rounded-xl border border-[#1C1B18]/8 bg-[#FAF8F4]/92 p-3 md:rounded-2xl md:p-4">
            {/* 2A. Industry Context Selector Row + Shuffle Combo (Optie A) */}
            <div className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-2.5">
              <div className="flex items-center justify-between gap-2 md:contents">
                <span className="font-mono-tabular order-1 text-[9.5px] font-semibold tracking-[0.05em] text-[#1C1B18]/55 uppercase md:mr-1 md:text-[10.5px]">
                  1. Your Industry:
                </span>

                <button
                  type="button"
                  onClick={handleShuffleCombo}
                  className="order-2 inline-flex h-7 items-center gap-1.5 rounded-full border border-[#C98A3A]/45 bg-[#FFFBF4] px-2.5 text-[10.5px] font-semibold text-[#1C1B18] whitespace-nowrap shrink-0 shadow-xs transition-all duration-200 hover:border-[#C98A3A] hover:bg-[#C98A3A] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] md:order-3 md:ml-auto md:h-8 md:px-3.5 md:text-[11.5px]"
                >
                  <Shuffle className="h-3 w-3" />
                  <span>Shuffle Combo ✦</span>
                </button>
              </div>

              <div
                ref={industryTablistRef}
                role="tablist"
                aria-label="Choose business industry context"
                className="no-scrollbar relative order-3 -mx-3 flex flex-nowrap items-center gap-1.5 overflow-x-auto px-3 py-0.5 md:order-2 md:mx-0 md:flex-1 md:flex-wrap md:overflow-visible md:px-0 md:py-0"
              >
                {INDUSTRY_FILTERS.map((industry) => {
                  const isSelected = industry === activeIndustry;
                  return (
                    <button
                      key={industry}
                      ref={(el) => {
                        industryBtnRefs.current[industry] = el;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => handleSelectIndustry(industry)}
                      className={`inline-flex h-8 items-center rounded-full px-3 text-[11.5px] font-medium whitespace-nowrap shrink-0 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] ${
                        isSelected
                          ? 'bg-[#C98A3A] font-semibold text-white shadow-xs'
                          : 'border border-[#1C1B18]/10 bg-white text-[#1C1B18]/75 hover:border-[#1C1B18]/25 hover:text-[#1C1B18]'
                      }`}
                    >
                      {industry}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="my-2.5 border-t border-[#1C1B18]/8 md:my-3" />

            {/* 2B. Visual Skin Selector Row */}
            <div className="flex flex-col gap-1.5 md:flex-row md:flex-wrap md:items-center md:gap-2">
              <span className="font-mono-tabular text-[9.5px] font-semibold tracking-[0.05em] text-[#1C1B18]/55 uppercase md:mr-1 md:text-[10.5px]">
                2. Visual Skin:
              </span>
              <div
                ref={skinTablistRef}
                role="tablist"
                aria-label="Choose a website visual skin"
                className="no-scrollbar relative -mx-3 flex flex-nowrap items-center gap-1.5 overflow-x-auto px-3 py-0.5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:py-0"
              >
                {PLAYGROUND_THEMES.map((theme) => {
                  const isSelected = theme.id === activeTheme.id;
                  return (
                    <button
                      key={theme.id}
                      ref={(el) => {
                        skinBtnRefs.current[theme.id] = el;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => handleSelectTheme(theme.id)}
                      className={`inline-flex h-8 items-center gap-2 rounded-full px-3 text-[11.5px] font-medium whitespace-nowrap shrink-0 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] ${
                        isSelected
                          ? 'bg-[#1C1B18] text-[#F7F5F0] shadow-[0_8px_20px_-8px_rgba(28,27,24,0.45)]'
                          : 'border border-[#1C1B18]/10 bg-white text-[#1C1B18]/78 hover:border-[#1C1B18]/30 hover:text-[#1C1B18]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full transition-transform duration-300"
                        style={{
                          backgroundColor: theme.accentHex,
                          transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                        }}
                      />
                      <span>{theme.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* STEP 2 OF WORKBENCH ENTRANCE: Scroll-scrubbed 3D Workbench tilt → locks flat at center viewport */}
          <div
            ref={stageWrapperRef}
            className="mt-2.5 md:mt-4"
            style={stageSettled ? undefined : { perspective: 1200 }}
          >
          <motion.div
            style={
              stageSettled
                ? { transform: 'none', opacity: 1 }
                : {
                    rotateX: stageRotateX,
                    scale: stageScale,
                    y: stageY,
                    opacity: stageOpacity,
                    transformOrigin: 'center bottom',
                  }
            }
            className={`relative overflow-hidden rounded-3xl transition-colors duration-300 ${activeTheme.stageClass}`}
          >
            <div className="relative overflow-hidden rounded-[22px]">
              {/* Stage Background Layer (0ms immediate morph) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[22px] transition-all duration-300"
                style={activeTheme.stageBgStyle}
              />

              {/* Style-Native Low-CPU Background Ambiance */}
              <PlaygroundAmbientLayer
                styleId={activeTheme.id}
                reducedMotion={prefersReducedMotion}
              />

              {/* Subtle 16-Line 2D Perspective Contour Wave (Accent-Reactive & Motion-Coupled) */}
              <StagePerspectiveWave
                accentHex={activeTheme.accentHex}
                isDark={activeTheme.isDark}
                levitateOn={levitateOn}
                kineticOn={kineticOn}
                reducedMotion={prefersReducedMotion}
              />

            {/* Diagonal Light Sweep on Workbench Power-On & Skin Change (450ms) */}
            {stageEntered && !prefersReducedMotion && (
              <motion.div
                key={`sweep-${skinWipeKey}`}
                aria-hidden="true"
                initial={{ x: '-115%', opacity: 0.78 }}
                animate={{ x: '215%', opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: skinWipeKey === 0 ? 0.36 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 -skew-x-[22deg]"
                style={{
                  background: activeTheme.isDark
                    ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.16) 50%, transparent 100%)'
                    : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
                }}
              />
            )}

            {/* Mini Stage Top Navbar (Tight Stagger: 35ms) */}
            <motion.div
              key={`nav-${skinWipeKey}`}
              initial={
                skinWipeKey > 0 && !prefersReducedMotion
                  ? { opacity: 0.75, y: -4 }
                  : false
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.28,
                delay: skinWipeKey > 0 ? 0.035 : 0,
                ease: WORKBENCH_EASE,
              }}
              className={`relative z-10 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-t-[22px] px-4 py-2.5 transition-all duration-300 md:px-8 md:py-3.5 ${activeTheme.navClass}`}
            >
              <div className="order-1 flex items-center gap-2 md:gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold"
                  style={{
                    backgroundColor: activeTheme.accentHex,
                    color:
                      activeTheme.id === 'cyberpunk' ? '#09090B' : '#FFFFFF',
                  }}
                >
                  {industryCopy.brandName.charAt(0)}
                </span>
                <span className="text-[11.5px] font-bold tracking-[0.06em] md:text-[12.5px]">
                  {industryCopy.brandName}
                </span>
              </div>

              <div className="order-3 flex basis-full items-center gap-4 border-t border-current/8 pt-2 text-[11.5px] md:order-2 md:basis-auto md:gap-5 md:border-t-0 md:pt-0 md:text-[12.5px]">
                {industryCopy.navItems.map((item, idx) => {
                  const isNavActive = activeNavIdx === idx;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setActiveNavIdx(idx)}
                      className={`transition-colors duration-200 ${
                        isNavActive
                          ? activeTheme.navActiveClass
                          : activeTheme.navLinkClass
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <span
                className={`order-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9.5px] tracking-[0.04em] transition-all duration-300 md:order-3 md:px-3 md:py-1 md:text-[10.5px] ${activeTheme.statusPillClass}`}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: activeTheme.accentHex }}
                />
                {industryCopy.statusLabel}
              </span>
            </motion.div>

            {/* Stage Split Body: Left (Copy + Button Style 1 & 2) | Right (Product Showcase) */}
            <div className="relative z-10 grid grid-cols-1 items-center gap-5 px-4 py-5 md:gap-10 md:px-10 md:py-12 lg:grid-cols-12">
              {/* Left Column: Tight Stagger Wave at 35ms */}
              <motion.div
                key={`left-${skinWipeKey}`}
                initial={
                  skinWipeKey > 0 && !prefersReducedMotion
                    ? { opacity: 0.7, y: 8 }
                    : false
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: skinWipeKey > 0 ? 0.035 : 0,
                  ease: WORKBENCH_EASE,
                }}
                className="lg:col-span-6"
              >
                <span
                  className={`inline-block text-[10px] font-semibold tracking-[0.06em] uppercase transition-all duration-300 md:text-[11px] ${activeTheme.eyebrowClass}`}
                >
                  {industryCopy.eyebrowTag} · {activeTheme.shortTag}
                </span>

                <h3
                  className={`mt-2.5 text-[clamp(1.45rem,3.4vw,2.75rem)] leading-[1.08] transition-all duration-300 md:mt-4 ${activeTheme.headlineClass}`}
                >
                  {industryCopy.headline}
                </h3>

                <p
                  className={`mt-2.5 max-w-[46ch] text-[13px] leading-[1.55] transition-colors duration-300 sm:text-[15.5px] md:mt-4 md:leading-[1.65] ${activeTheme.descClass}`}
                >
                  {industryCopy.description}
                </p>

                {/* Button Style 1 & Button Style 2 */}
                <div className="mt-4 flex flex-wrap items-center gap-2.5 md:mt-7 md:gap-3.5">
                  <motion.button
                    key={`btn1-${kineticBurst}`}
                    type="button"
                    onClick={() =>
                      setInteractionFeedback(
                        `Primary action tested (${industryCopy.primaryCta.replace(' →', '')})`,
                      )
                    }
                    initial={
                      kineticOn && kineticBurst > 0 && !prefersReducedMotion
                        ? { scale: 0.92, y: 5 }
                        : false
                    }
                    animate={{ scale: 1, y: 0 }}
                    whileHover={
                      kineticOn && !prefersReducedMotion
                        ? { scale: 1.05, y: -2 }
                        : levitateOn && !prefersReducedMotion
                          ? { y: -2 }
                          : { opacity: 0.94 }
                    }
                    whileTap={
                      kineticOn && !prefersReducedMotion
                        ? { scale: 0.94, y: 1 }
                        : { scale: 0.98 }
                    }
                    transition={popSpring}
                    style={activeTheme.primaryBtnStyle}
                    className={`inline-flex h-9 items-center justify-center px-4 text-[12px] font-semibold whitespace-nowrap transition-colors duration-300 md:h-11 md:px-6 md:text-[13px] ${activeTheme.primaryBtnClass}`}
                  >
                    {industryCopy.primaryCta}
                  </motion.button>

                  <motion.button
                    key={`btn2-${kineticBurst}`}
                    type="button"
                    onClick={() =>
                      setInteractionFeedback(
                        `${industryCopy.secondaryCta} previewed`,
                      )
                    }
                    initial={
                      kineticOn && kineticBurst > 0 && !prefersReducedMotion
                        ? { scale: 0.94, y: 5 }
                        : false
                    }
                    animate={{ scale: 1, y: 0 }}
                    whileHover={
                      kineticOn && !prefersReducedMotion
                        ? { scale: 1.04, y: -2 }
                        : levitateOn && !prefersReducedMotion
                          ? { y: -2 }
                          : { opacity: 0.92 }
                    }
                    whileTap={
                      kineticOn && !prefersReducedMotion
                        ? { scale: 0.95 }
                        : { scale: 0.98 }
                    }
                    transition={popSpring}
                    className={`inline-flex h-9 items-center justify-center gap-1.5 px-4 text-[12px] font-semibold whitespace-nowrap transition-all duration-300 md:h-11 md:gap-2 md:px-5 md:text-[13px] ${activeTheme.secondaryBtnClass}`}
                  >
                    <Play className="h-3 w-3 fill-current md:h-3.5 md:w-3.5" />
                    <span>{industryCopy.secondaryCta}</span>
                  </motion.button>
                </div>

                {/* Subtle Micro-Feedback Line */}
                <div className="mt-2 min-h-[16px] md:mt-4 md:h-5">
                  {interactionFeedback && (
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11.5px] font-medium ${
                        activeTheme.isDark ? 'text-white/75' : 'text-black/65'
                      }`}
                    >
                      <Check
                        className="h-3.5 w-3.5"
                        style={{ color: activeTheme.accentHex }}
                      />
                      {interactionFeedback}
                    </span>
                  )}
                </div>
              </motion.div>

              {/* Right Column: Product Card lands with spring bounce at 70ms */}
              <div className="lg:col-span-6" style={{ perspective: 950 }}>
                <motion.div
                  key={`card-wipe-${skinWipeKey}`}
                  initial={
                    skinWipeKey > 0 && !prefersReducedMotion
                      ? { opacity: 0.78, scale: 0.94, y: 12 }
                      : false
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 22,
                    delay: skinWipeKey > 0 ? 0.07 : 0,
                  }}
                >
                  <motion.div
                    ref={cardRef}
                    key={`card-kinetic-${kineticBurst}`}
                    onPointerMove={handleCardPointerMove}
                    onPointerLeave={handleCardPointerLeave}
                    style={{
                      rotateX:
                        kineticOn && !prefersReducedMotion ? rotateX : 0,
                      rotateY:
                        kineticOn && !prefersReducedMotion ? rotateY : 0,
                      transformStyle: 'preserve-3d',
                      ...(activeTheme.cardStyle ?? {}),
                    }}
                    initial={
                      kineticOn && kineticBurst > 0 && !prefersReducedMotion
                        ? { scale: 0.96 }
                        : false
                    }
                    animate={{
                      scale: 1,
                      y:
                        levitateOn && !prefersReducedMotion
                          ? [0, -10, 0]
                          : 0,
                    }}
                    whileHover={
                      kineticOn && !prefersReducedMotion
                        ? { scale: 1.025 }
                        : levitateOn && !prefersReducedMotion
                          ? { y: -6 }
                          : undefined
                    }
                    transition={{
                      scale: popSpring,
                      y:
                        levitateOn && !prefersReducedMotion
                          ? {
                              duration: 3.4,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                          : { duration: 0.25 },
                    }}
                    className={`relative mx-auto max-w-[440px] p-4 transition-colors duration-300 md:p-6 ${activeTheme.cardClass}`}
                  >
                    {/* Card Top Badge & Short Tag */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-block shrink-0 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.05em] whitespace-nowrap md:px-3 md:py-1 md:text-[10.5px] ${activeTheme.badgeClass}`}
                      >
                        {industryCopy.productBadge}
                      </span>
                      <span
                        className={`font-mono-tabular min-w-0 truncate text-[10.5px] whitespace-nowrap md:text-[11px] ${
                          activeTheme.isDark
                            ? 'text-white/55'
                            : 'text-black/45'
                        }`}
                      >
                        {activeTheme.label}
                      </span>
                    </div>

                    {/* Product Visual Stage + Motion 1 Ambient Glow Pulse */}
                    <div className="relative my-3 flex items-center justify-center rounded-2xl py-1 md:my-5 md:py-3">
                      {levitateOn && !prefersReducedMotion && (
                        <motion.div
                          aria-hidden="true"
                          animate={{
                            scale: [0.92, 1.1, 0.92],
                            opacity: [0.4, 0.8, 0.4],
                          }}
                          transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="pointer-events-none absolute h-20 w-36 rounded-full md:h-28 md:w-44"
                          style={{
                            background: `radial-gradient(circle, ${activeTheme.pulseGlowColor} 0%, transparent 72%)`,
                          }}
                        />
                      )}
                      <div className="relative z-10 w-full [&>svg]:h-24 md:[&>svg]:h-32">
                        <PlaygroundProductVisual styleId={activeTheme.id} />
                      </div>
                    </div>

                    {/* Product Metadata & Price Footer */}
                    <div className="flex items-end justify-between gap-3 border-t border-current/10 pt-3 md:gap-4 md:pt-4">
                      <div>
                        <h4 className="text-[15px] font-bold tracking-[-0.015em] md:text-[17px]">
                          {industryCopy.productTitle}
                        </h4>
                        <p
                          className={`mt-0.5 text-[11.5px] md:text-[12px] ${
                            activeTheme.isDark
                              ? 'text-white/60'
                              : 'text-black/55'
                          }`}
                        >
                          {industryCopy.productSubtitle}
                        </p>
                      </div>
                      <span
                        className={`text-[19px] font-bold tracking-[-0.02em] whitespace-nowrap md:text-[22px] ${activeTheme.priceClass}`}
                      >
                        {industryCopy.productPrice}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            </div>
          </motion.div>
        </div>

        {/* STEP 3 OF WORKBENCH ENTRANCE: Bottom Controls Dock inside Workbench Frame */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          animate={
            stageEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
          }
          transition={{
            duration: 0.5,
            delay: stageEntered && !prefersReducedMotion ? 0.28 : 0,
            ease: WORKBENCH_EASE,
          }}
          className="mt-2.5 flex flex-col items-stretch justify-between gap-3 rounded-xl border border-[#1C1B18]/8 bg-[#FAF8F4]/92 p-3 sm:flex-row sm:items-center md:mt-4 md:rounded-2xl md:px-5 md:py-3"
        >
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5">
            <span className="font-mono-tabular col-span-2 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.04em] text-[#1C1B18]/55 uppercase sm:col-span-1 sm:mr-1 sm:text-[11px]">
              <Sparkles className="h-3.5 w-3.5 text-[#C98A3A]" />
              <span>Live Motion:</span>
            </span>

            {/* Motion 1: Levitate & Pulse (0ms apply) */}
            <button
              type="button"
              aria-pressed={levitateOn}
              onClick={() => setLevitateOn((prev) => !prev)}
              className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] sm:justify-start sm:gap-2 sm:px-3.5 sm:text-[12px] ${
                levitateOn
                  ? 'border border-[#1C1B18] bg-[#1C1B18] text-[#F7F5F0]'
                  : 'border border-[#1C1B18]/15 bg-white text-[#1C1B18]/75 hover:border-[#1C1B18]/35'
              }`}
            >
              <Activity className="h-3.5 w-3.5 shrink-0 text-[#C98A3A]" />
              <span>
                <span className="hidden sm:inline">Motion 1: </span>Levitate &amp; Pulse
              </span>
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  levitateOn ? 'bg-emerald-400' : 'bg-[#1C1B18]/25'
                }`}
              />
            </button>

            {/* Motion 2: Kinetic Pop & Tilt (0ms apply) */}
            <button
              type="button"
              aria-pressed={kineticOn}
              onClick={handleToggleKinetic}
              className={`inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] sm:justify-start sm:gap-2 sm:px-3.5 sm:text-[12px] ${
                kineticOn
                  ? 'border border-[#1C1B18] bg-[#1C1B18] text-[#F7F5F0]'
                  : 'border border-[#1C1B18]/15 bg-white text-[#1C1B18]/75 hover:border-[#1C1B18]/35'
              }`}
            >
              <Zap className="h-3.5 w-3.5 shrink-0 text-[#C98A3A]" />
              <span>
                <span className="hidden sm:inline">Motion 2: </span>Kinetic Pop &amp; Tilt
              </span>
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  kineticOn ? 'bg-emerald-400' : 'bg-[#1C1B18]/25'
                }`}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={handleBuildHandoff}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] sm:w-auto"
          >
            <span>Build in this style</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
