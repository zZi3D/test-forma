import { useEffect, useRef, useState } from 'react';
import { ProjectItem } from '../data/projects';
import { ProjectWheel3D } from './ProjectWheel3D';

interface HeroSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenBooking: () => void;
  onJumpToWork: () => void;
}

export function HeroSection({
  onSelectProject,
  onOpenBooking,
  onJumpToWork,
}: HeroSectionProps) {
  const stickyRef = useRef<HTMLElement | null>(null);
  const [isWheelPaused, setIsWheelPaused] = useState(false);

  // Scroll until the bottom CTA block is in view, then pin Hero sticky while Section 2 rises over it
  useEffect(() => {
    let rafId = 0;
    let cachedWidth = window.innerWidth;
    let stableVh = Math.max(window.innerHeight, 1);
    let cachedHeroHeight = stickyRef.current?.offsetHeight ?? 0;

    const syncMetrics = () => {
      const el = stickyRef.current;
      if (!el) return;
      const nextWidth = window.innerWidth;
      const nextVh = Math.max(window.innerHeight, 1);
      // Ignore small mobile browser toolbar height fluctuations unless viewport width changed
      if (nextWidth !== cachedWidth || Math.abs(nextVh - stableVh) > 130) {
        cachedWidth = nextWidth;
        stableVh = nextVh;
      }
      cachedHeroHeight = el.offsetHeight;
      const stickyTop = Math.min(0, stableVh - cachedHeroHeight);
      el.style.top = `${stickyTop}px`;
    };

    const updateDepth = () => {
      rafId = 0;
      const el = stickyRef.current;
      if (!el) return;

      const vh = stableVh;
      const heroHeight = cachedHeroHeight || el.offsetHeight;
      const stickyStart = Math.max(0, heroHeight - vh);

      if (window.scrollY <= stickyStart) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.pointerEvents = 'auto';
        el.style.visibility = 'visible';
        setIsWheelPaused((prev) => (prev ? false : prev));
        return;
      }

      const overlapProgress = Math.min(
        Math.max((window.scrollY - stickyStart) / vh, 0),
        1,
      );
      const fadeT = Math.min(Math.max((overlapProgress - 0.18) / 0.72, 0), 1);
      const opacity = 1 - fadeT;
      const scale = 1 - fadeT * 0.04;
      const shouldPause = opacity <= 0.08;

      el.style.opacity = opacity.toFixed(3);
      el.style.transform = `translate3d(0, 0, 0) scale(${scale.toFixed(4)})`;
      el.style.pointerEvents = shouldPause ? 'none' : 'auto';
      el.style.visibility = opacity <= 0.01 ? 'hidden' : 'visible';
      setIsWheelPaused((prev) => (prev === shouldPause ? prev : shouldPause));
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateDepth);
      }
    };

    const onResize = () => {
      syncMetrics();
      onScroll();
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' && stickyRef.current
        ? new ResizeObserver(onResize)
        : null;
    if (resizeObserver && stickyRef.current) {
      resizeObserver.observe(stickyRef.current);
    }

    syncMetrics();
    updateDepth();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="hero-wave"
      ref={stickyRef}
      aria-label="Edition One Overview"
      style={{ transformOrigin: 'center bottom' }}
      className="sticky z-10 flex w-full flex-col justify-start overflow-x-clip px-4 pt-22 pb-[20svh] will-change-[opacity,transform] md:px-8 md:pt-26 md:pb-[30svh]"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col">
        {/* Centered Editorial Headline */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium tracking-[0.04em] text-[#C98A3A] sm:text-[12px]">
            Editorial Digital Architecture · 24h Sprint Practice
          </p>
          <h1 className="display-tight mx-auto mt-2 max-w-2xl text-[clamp(1.85rem,3.5vw,3.15rem)] leading-[1.04] font-semibold text-[#1C1B18]">
            We design refined web worlds, really fast.
          </h1>
        </div>

        {/* Enlarged 3D Wheel with Smooth Center Zoom + Turn Wheel Bar Directly Underneath */}
        <ProjectWheel3D
          onSelectProject={onSelectProject}
          isPaused={isWheelPaused}
        />

        {/* CTA Block Below Wheel Controls — triggers Section 2 overlap once positioned just below screen center */}
        <div className="mx-auto mt-10 flex max-w-xl flex-col items-center text-center md:mt-12">
          <p className="max-w-md text-[13px] leading-[1.6] text-[#1C1B18]/75 sm:text-[14px]">
            Twelve signature website design directions—drag or spin the 3D wheel
            above to find the style that fits your business.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-[#1C1B18] px-5 text-[12px] font-semibold whitespace-nowrap text-[#F7F5F0] transition-colors duration-200 hover:bg-[#C98A3A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A] sm:px-6"
            >
              Book a 15-min Discovery Call
            </button>
            <button
              type="button"
              onClick={onJumpToWork}
              className="glass-tile inline-flex h-10 shrink-0 items-center justify-center rounded-full px-5 text-[12px] font-medium whitespace-nowrap text-[#1C1B18] transition-colors duration-200 hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C98A3A]"
            >
              Design Directions ↓
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
