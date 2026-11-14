import { useEffect, useRef } from 'react';
import { ProjectItem } from '../data/projects';
import { ProjectWheel3D } from './ProjectWheel3D';

interface HeroSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenBooking: () => void;
  onJumpToWork: () => void;
}

const HERO_METRICS = [
  { value: '24 Hours', label: 'Concept to live launch' },
  { value: '340+', label: 'Editorial editions shipped' },
  { value: '52-Layer', label: 'Procedural canvas craft' },
  { value: 'NYC · ZRH', label: 'Synchronized studio desk' },
];

export function HeroSection({
  onSelectProject,
  onOpenBooking,
  onJumpToWork,
}: HeroSectionProps) {
  const stickyRef = useRef<HTMLElement | null>(null);

  // Smoothly recede & fade fixed Hero only after Section 2 rises over it
  useEffect(() => {
    let rafId = 0;

    const updateDepth = () => {
      rafId = 0;
      const el = stickyRef.current;
      if (!el) return;

      const vh = Math.max(window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / vh, 0), 1);

      // Stay crisp while Section 2 starts entering, then smoothly recede
      const fadeT = Math.min(Math.max((progress - 0.18) / 0.72, 0), 1);
      const opacity = 1 - fadeT;
      const scale = 1 - fadeT * 0.04;

      el.style.opacity = opacity.toFixed(3);
      el.style.transform = `scale(${scale.toFixed(4)})`;
      el.style.pointerEvents = opacity < 0.08 ? 'none' : 'auto';
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateDepth);
      }
    };

    updateDepth();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="hero-wave"
      ref={stickyRef}
      aria-label="FORMA Studio Overview"
      className="sticky top-0 z-10 flex min-h-[100svh] w-full flex-col justify-center overflow-x-clip px-4 pt-22 pb-6 will-change-[opacity,transform] md:px-8 md:pt-22 md:pb-8"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Compact Split Editorial Hero Header */}
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-[12px] font-medium tracking-[0.04em] text-[#C98A3A]">
              Editorial Digital Architecture · 24h Sprint Practice
            </p>
            <h1 className="display-tight mt-2.5 max-w-2xl text-[clamp(2.25rem,4.3vw,3.75rem)] leading-[1.03] font-semibold text-[#1C1B18]">
              We design refined web worlds, really fast.
            </h1>
          </div>

          <div className="flex flex-col items-start gap-3.5 lg:max-w-[400px] lg:items-end lg:text-right">
            <p className="text-[14px] leading-[1.55] text-[#1C1B18]/75 md:text-[15px]">
              Twelve distinct digital design systems—drag or spin the 3D wheel
              below to inspect each edition.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold text-[#F7F5F0] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
              >
                Book a 15-min Discovery Call
              </button>
              <button
                type="button"
                onClick={onJumpToWork}
                className="glass-tile inline-flex h-10 items-center justify-center rounded-full px-4 text-[12px] font-medium text-[#1C1B18] whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
              >
                Selected Work ↓
              </button>
            </div>
          </div>
        </div>

        {/* Pure CSS-3D + rAF Interactive Animation Wheel */}
        <ProjectWheel3D onSelectProject={onSelectProject} />

        {/* Subtle Glass Metrics Strip */}
        <div className="glass-subtle mt-5 grid grid-cols-2 gap-4 rounded-2xl p-4 md:mt-6 md:grid-cols-4 md:gap-6 md:px-7 md:py-5">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label}>
              <p className="font-mono-tabular text-[19px] font-semibold tracking-[-0.02em] text-[#1C1B18] md:text-[22px]">
                {metric.value}
              </p>
              <p className="mt-0.5 text-[12px] text-[#1C1B18]/70">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
