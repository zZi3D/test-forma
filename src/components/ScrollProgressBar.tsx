import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Subtle hairline scroll-progress indicator anchored to the very top of the viewport,
 * styled in Edition One's obsidian ink and warm burnished amber (#C98A3A).
 */
export function ScrollProgressBar() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const barRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const bar = barRef.current;
      if (!bar) return;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const rawProgress =
        maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

      bar.style.transform = `scaleX(${rawProgress.toFixed(4)})`;

      if (glowRef.current) {
        glowRef.current.style.opacity = rawProgress > 0.004 ? '1' : '0';
        glowRef.current.style.left = `${(rawProgress * 100).toFixed(3)}%`;
      }
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(scheduleUpdate)
        : null;
    if (resizeObserver) {
      resizeObserver.observe(document.documentElement);
    }

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
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
        className={`h-full w-full origin-left ${
          prefersReducedMotion
            ? ''
            : 'transition-transform duration-100 ease-out'
        }`}
        style={{
          transform: 'scaleX(0)',
          background:
            'linear-gradient(90deg, rgba(28, 27, 24, 0.72) 0%, #C98A3A 68%, #E2AD5E 100%)',
        }}
      />
      <div
        ref={glowRef}
        className="absolute top-0 h-[2px] w-8 -translate-x-full opacity-0 transition-opacity duration-200"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(201, 138, 58, 0.85) 100%)',
          boxShadow: '0 0 8px rgba(201, 138, 58, 0.45)',
        }}
      />
    </div>
  );
}
