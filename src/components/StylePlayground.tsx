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
        {/* STEP 1 OF WORKBENCH ENTRANCE: Section Header + Both Selector Rows */}
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
          <div className="mb-7 flex flex-col gap-4 border-t border-[#1C1B18]/12 pt-14 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono-tabular text-[11px] font-semibold tracking-[0.06em] text-[#C98A3A] uppercase">
                03 · Interactive Lab
              </p>
              <h2 className="display-tight mt-2 text-[clamp(2rem,3.6vw,3.15rem)] leading-[1.06] font-semibold text-[#1C1B18]">
                Live Style Playground
              </h2>
              <p className="mt-3 max-w-[60ch] text-[14px] leading-[1.6] text-[#1C1B18]/72 sm:text-[15px]">
                Pick your industry, switch visual skins, and toggle live
                micro-animations to feel how different design languages work for
                your business.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="font-mono-tabular text-[11px] font-medium text-[#1C1B18]/55">
                Previewing:{' '}
                <span className="font-semibold text-[#C98A3A]">
                  {activeIndustry}
                </span>{' '}
                ·{' '}
                <span className="font-semibold text-[#1C1B18]">
                  {activeTheme.label}
                </span>
              </div>

              <button
                type="button"
                onClick={handleShuffleCombo}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#C98A3A]/45 bg-[#FFFBF4] px-3.5 text-[11.5px] font-semibold text-[#1C1B18] whitespace-nowrap shadow-xs transition-all duration-200 hover:border-[#C98A3A] hover:bg-[#C98A3A] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
              >
                <Shuffle className="h-3 w-3" />
                <span>Shuffle Combo ✦</span>
              </button>
            </div>
          </div>

          {/* 2A. Industry Context Selector Row */}
          <div className="glass-subtle mb-3.5 flex flex-wrap items-center gap-2 rounded-2xl px-3.5 py-2.5">
            <span className="font-mono-tabular mr-1 text-[10.5px] font-semibold tracking-[0.05em] text-[#1C1B18]/55 uppercase">
              1. Your Industry:
            </span>
            <div
              role="tablist"
              aria-label="Choose business industry context"
              className="flex flex-wrap items-center gap-1.5"
            >
              {INDUSTRY_FILTERS.map((industry) => {
                const isSelected = industry === activeIndustry;
                return (
                  <button
                    key={industry}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectIndustry(industry)}
                    className={`inline-flex h-8 items-center rounded-full px-3 text-[11.5px] font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] ${
                      isSelected
                        ? 'bg-[#C98A3A] font-semibold text-white shadow-xs'
                        : 'bg-white/65 text-[#1C1B18]/72 hover:bg-white hover:text-[#1C1B18]'
                    }`}
                  >
                    {industry}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2B. Top Visual Skin Selector Bar (9 Pill Buttons) */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="font-mono-tabular mr-1 text-[10.5px] font-semibold tracking-[0.05em] text-[#1C1B18]/55 uppercase">
              2. Visual Skin:
            </span>
            <div
              role="tablist"
              aria-label="Choose a website visual skin"
              className="flex flex-wrap items-center gap-2"
            >
              {PLAYGROUND_THEMES.map((theme) => {
                const isSelected = theme.id === activeTheme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectTheme(theme.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-medium whitespace-nowrap transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] ${
                      isSelected
                        ? 'bg-[#1C1B18] text-[#F7F5F0] shadow-[0_8px_20px_-8px_rgba(28,27,24,0.45)]'
                        : 'border border-[#1C1B18]/12 bg-white/75 text-[#1C1B18]/78 hover:border-[#1C1B18]/30 hover:bg-white hover:text-[#1C1B18]'
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
        </motion.div>

        {/* STEP 2 OF WORKBENCH ENTRANCE: Scroll-scrubbed 3D Workbench tilt → locks flat at center viewport */}
        <div
          ref={stageWrapperRef}
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
              className={`relative z-10 flex flex-wrap items-center justify-between gap-4 rounded-t-[22px] px-5 py-3.5 transition-all duration-300 md:px-8 ${activeTheme.navClass}`}
            >
              <div className="flex items-center gap-2.5">
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
                <span className="text-[12.5px] font-bold tracking-[0.06em]">
                  {industryCopy.brandName}
                </span>
              </div>

              <div className="flex items-center gap-5 text-[12.5px]">
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
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10.5px] tracking-[0.04em] transition-all duration-300 ${activeTheme.statusPillClass}`}
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
            <div className="relative z-10 grid grid-cols-1 items-center gap-8 px-6 py-9 md:px-10 md:py-12 lg:grid-cols-12 lg:gap-10">
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
                  className={`inline-block text-[11px] font-semibold tracking-[0.06em] uppercase transition-all duration-300 ${activeTheme.eyebrowClass}`}
                >
                  {industryCopy.eyebrowTag} · {activeTheme.shortTag}
                </span>

                <h3
                  className={`mt-4 text-[clamp(1.85rem,3.4vw,2.75rem)] leading-[1.08] transition-all duration-300 ${activeTheme.headlineClass}`}
                >
                  {industryCopy.headline}
                </h3>

                <p
                  className={`mt-4 max-w-[46ch] text-[14.5px] leading-[1.65] transition-colors duration-300 sm:text-[15.5px] ${activeTheme.descClass}`}
                >
                  {industryCopy.description}
                </p>

                {/* Button Style 1 & Button Style 2 */}
                <div className="mt-7 flex flex-wrap items-center gap-3.5">
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
                    className={`inline-flex h-11 items-center justify-center px-6 text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 ${activeTheme.primaryBtnClass}`}
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
                    className={`inline-flex h-11 items-center justify-center gap-2 px-5 text-[13px] font-semibold whitespace-nowrap transition-all duration-300 ${activeTheme.secondaryBtnClass}`}
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>{industryCopy.secondaryCta}</span>
                  </motion.button>
                </div>

                {/* Subtle Micro-Feedback Line */}
                <div className="mt-4 h-5">
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
                    className={`relative mx-auto max-w-[440px] p-6 transition-colors duration-300 ${activeTheme.cardClass}`}
                  >
                    {/* Card Top Badge & Short Tag */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-block px-3 py-1 text-[10.5px] font-bold tracking-[0.05em] ${activeTheme.badgeClass}`}
                      >
                        {industryCopy.productBadge}
                      </span>
                      <span
                        className={`font-mono-tabular text-[11px] ${
                          activeTheme.isDark
                            ? 'text-white/55'
                            : 'text-black/45'
                        }`}
                      >
                        {activeTheme.label}
                      </span>
                    </div>

                    {/* Product Visual Stage + Motion 1 Ambient Glow Pulse */}
                    <div className="relative my-5 flex items-center justify-center rounded-2xl py-3">
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
                          className="pointer-events-none absolute h-28 w-44 rounded-full"
                          style={{
                            background: `radial-gradient(circle, ${activeTheme.pulseGlowColor} 0%, transparent 72%)`,
                          }}
                        />
                      )}
                      <div className="relative z-10 w-full">
                        <PlaygroundProductVisual styleId={activeTheme.id} />
                      </div>
                    </div>

                    {/* Product Metadata & Price Footer */}
                    <div className="flex items-end justify-between gap-4 border-t border-current/10 pt-4">
                      <div>
                        <h4 className="text-[17px] font-bold tracking-[-0.015em]">
                          {industryCopy.productTitle}
                        </h4>
                        <p
                          className={`mt-0.5 text-[12px] ${
                            activeTheme.isDark
                              ? 'text-white/60'
                              : 'text-black/55'
                          }`}
                        >
                          {industryCopy.productSubtitle}
                        </p>
                      </div>
                      <span
                        className={`text-[22px] font-bold tracking-[-0.02em] whitespace-nowrap ${activeTheme.priceClass}`}
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

        {/* STEP 3 OF WORKBENCH ENTRANCE: Bottom Controls Bar clicks into place */}
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
          className="glass-tile mt-5 flex flex-col items-stretch justify-between gap-4 rounded-2xl px-4 py-3.5 sm:flex-row sm:items-center md:px-6"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono-tabular mr-1 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.04em] text-[#1C1B18]/55 uppercase">
              <Sparkles className="h-3.5 w-3.5 text-[#C98A3A]" />
              <span>Live Motion:</span>
            </span>

            {/* Motion 1: Levitate & Pulse (0ms apply) */}
            <button
              type="button"
              aria-pressed={levitateOn}
              onClick={() => setLevitateOn((prev) => !prev)}
              className={`inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-[12px] font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] ${
                levitateOn
                  ? 'border border-[#1C1B18] bg-[#1C1B18] text-[#F7F5F0]'
                  : 'border border-[#1C1B18]/15 bg-white/80 text-[#1C1B18]/75 hover:border-[#1C1B18]/35'
              }`}
            >
              <Activity className="h-3.5 w-3.5 text-[#C98A3A]" />
              <span>Motion 1: Levitate &amp; Pulse</span>
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  levitateOn ? 'bg-emerald-400' : 'bg-[#1C1B18]/25'
                }`}
              />
            </button>

            {/* Motion 2: Kinetic Pop & Tilt (0ms apply) */}
            <button
              type="button"
              aria-pressed={kineticOn}
              onClick={handleToggleKinetic}
              className={`inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-[12px] font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] ${
                kineticOn
                  ? 'border border-[#1C1B18] bg-[#1C1B18] text-[#F7F5F0]'
                  : 'border border-[#1C1B18]/15 bg-white/80 text-[#1C1B18]/75 hover:border-[#1C1B18]/35'
              }`}
            >
              <Zap className="h-3.5 w-3.5 text-[#C98A3A]" />
              <span>Motion 2: Kinetic Pop &amp; Tilt</span>
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  kineticOn ? 'bg-emerald-400' : 'bg-[#1C1B18]/25'
                }`}
              />
            </button>
          </div>

          <button
            type="button"
            onClick={handleBuildHandoff}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
          >
            <span>Build in this style</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
