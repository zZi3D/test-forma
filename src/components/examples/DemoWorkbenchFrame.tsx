import { ReactNode, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

interface DemoWorkbenchFrameProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function DemoWorkbenchFrame({
  id,
  children,
  className = '',
}: DemoWorkbenchFrameProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const rotateXTarget = useMotionValue(0);
  const scaleTarget = useMotionValue(1);
  const yTarget = useMotionValue(0);
  const opacityTarget = useMotionValue(1);

  const springConfig = { stiffness: 200, damping: 26, mass: 0.65 };
  const rotateX = useSpring(rotateXTarget, springConfig);
  const scale = useSpring(scaleTarget, springConfig);
  const y = useSpring(yTarget, springConfig);
  const opacity = useSpring(opacityTarget, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) {
      rotateXTarget.set(0);
      scaleTarget.set(1);
      yTarget.set(0);
      opacityTarget.set(1);
      return;
    }

    let rafId = 0;

    const evaluate = () => {
      rafId = 0;
      const el = wrapperRef.current;
      if (!el) return;

      const vh = Math.max(window.innerHeight, 1);
      const rect = el.getBoundingClientRect();

      // Phase 1 — Entering from bottom of viewport:
      // Tilts backward (+18deg -> 0deg) & rises cleanly into flat reading plateau
      const enterStart = vh * 0.98;
      const enterEnd = vh * 0.42;

      // Phase 2 — Leaving out top of viewport when scrolling further down:
      // Tilts gently forward (0deg -> -11deg) & recedes so scrolling back up re-enters flat
      const exitStart = vh * 0.34;
      const exitEnd = -Math.min(rect.height * 0.28, 220);

      if (rect.top > enterEnd) {
        const span = Math.max(enterStart - enterEnd, 1);
        const t = Math.min(Math.max((enterStart - rect.top) / span, 0), 1);
        const eased = 1 - Math.pow(1 - t, 2.2);

        rotateXTarget.set((1 - eased) * 18);
        scaleTarget.set(0.9 + eased * 0.1);
        yTarget.set((1 - eased) * 44);
        opacityTarget.set(0.45 + eased * 0.55);
      } else if (rect.bottom < exitStart) {
        const span = Math.max(exitStart - exitEnd, 1);
        const t = Math.min(Math.max((exitStart - rect.bottom) / span, 0), 1);
        const eased = t * t * (3 - 2 * t);

        rotateXTarget.set(-11 * eased);
        scaleTarget.set(1 - eased * 0.07);
        yTarget.set(-22 * eased);
        opacityTarget.set(1 - eased * 0.42);
      } else {
        // Active reading & interactive plateau: dead-flat for sharp copy & clicks
        rotateXTarget.set(0);
        scaleTarget.set(1);
        yTarget.set(0);
        opacityTarget.set(1);
      }
    };

    const schedule = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(evaluate);
      }
    };

    const initTimer = window.setTimeout(evaluate, 24);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      window.clearTimeout(initTimer);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [
    opacityTarget,
    prefersReducedMotion,
    rotateXTarget,
    scaleTarget,
    yTarget,
  ]);

  return (
    <div
      id={id}
      ref={wrapperRef}
      className={`scroll-mt-36 md:scroll-mt-40 ${className}`}
      style={prefersReducedMotion ? undefined : { perspective: 1300 }}
    >
      <motion.div
        style={
          prefersReducedMotion
            ? { opacity: 1 }
            : {
                rotateX,
                scale,
                y,
                opacity,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
