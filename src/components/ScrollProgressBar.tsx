import { useEffect, useRef } from 'react';

/**
 * Subtle hairline scroll-progress indicator anchored to the very top of the viewport,
 * styled in Edition One's obsidian ink and warm burnished amber (#C98A3A).
 */
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;
    let cachedVw = Math.max(window.innerWidth, 1);
    let cachedMaxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );

    const measure = () => {
      cachedVw = Math.max(window.innerWidth, 1);
      cachedMaxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
    };

    const updateProgress = () => {
      rafId = 0;
      const bar = barRef.current;
      if (!bar) return;

      const rawProgress =
        cachedMaxScroll > 0
          ? Math.min(1, Math.max(0, window.scrollY / cachedMaxScroll))
          : 0;

      bar.style.transform = `scale3d(${rawProgress.toFixed(4)}, 1, 1)`;

      if (glowRef.current) {
        glowRef.current.style.opacity = rawProgress > 0.004 ? '1' : '0';
        const tipX = Math.max(0, rawProgress * cachedVw - 32);
        glowRef.current.style.transform = `translate3d(${tipX.toFixed(1)}px, 0, 0)`;
      }
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    const onResize = () => {
      measure();
      scheduleUpdate();
    };

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(onResize)
        : null;
    ro?.observe(document.documentElement);

    measure();
    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      ro?.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-[2px] bg-[#1C1B18]/[0.06]"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left will-change-transform"
        style={{
          transform: 'scale3d(0, 1, 1)',
          background:
            'linear-gradient(90deg, rgba(28, 27, 24, 0.72) 0%, #C98A3A 68%, #E2AD5E 100%)',
        }}
      />
      <div
        ref={glowRef}
        className="absolute top-0 left-0 h-[2px] w-8 opacity-0 transition-opacity duration-200 will-change-transform"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(201, 138, 58, 0.85) 100%)',
          boxShadow: '0 0 8px rgba(201, 138, 58, 0.45)',
        }}
      />
    </div>
  );
}
