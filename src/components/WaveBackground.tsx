import { useEffect, useRef } from 'react';

const LINE_COUNT = 52;
const POINTS_PER_LINE = 90;
const FOV = 640;

interface ProjectedPoint {
  x: number;
  y: number;
}

export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2.5);

    // Pre-allocate reusable point buffer to eliminate GC churn inside the rAF loop
    const points: ProjectedPoint[] = Array.from(
      { length: POINTS_PER_LINE },
      () => ({ x: 0, y: 0 }),
    );

    let targetScrollY = window.scrollY;
    let scrollFactor = window.scrollY;
    let smoothVelocity = 0;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    let time = 0;
    let rafId = 0;
    let lastNow = performance.now();

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const drawWave = () => {
      if (width <= 0 || height <= 0) return;

      const scrollTilt = Math.max(
        -0.38,
        Math.min(
          0.38,
          smoothVelocity * 0.00075 + Math.sin(scrollFactor * 0.0011) * 0.16,
        ),
      );

      ctx.clearRect(0, 0, width, height);

      const camX = smoothMouseX * 52;
      const camY = smoothMouseY * 24;
      const horizonY = height * 0.56;
      const halfWorldWidth = Math.max(width * 1.18, 980);

      const zFar = 860;
      const zNear = 45;
      const scrollPhase = scrollFactor * 0.0022;

      // Draw 52 curved lines from back (i = 0) to front (i = 51)
      for (let i = 0; i < LINE_COUNT; i++) {
        const depthNorm = i / (LINE_COUNT - 1); // 0 = far back, 1 = close front
        const z = zFar - depthNorm * (zFar - zNear);
        const scale = FOV / (z + FOV);
        const zPhase = depthNorm * 4.4;

        for (let j = 0; j < POINTS_PER_LINE; j++) {
          const u = j / (POINTS_PER_LINE - 1);
          const nx = u * 2 - 1; // [-1, 1] across width
          const worldX = nx * halfWorldWidth;

          // 1. Broad swell (elongated sine across width)
          const broadSwell =
            Math.sin(nx * 2.55 + zPhase * 0.68 + time * 0.85 + scrollPhase) * 62;

          // 2. Diagonal counter cross-wave for organic topographic relief
          const diagonalCross =
            Math.sin(nx * 4.1 - zPhase * 1.15 + time * 0.55 - scrollPhase * 0.72) *
            Math.cos(zPhase * 0.45 + nx * 1.35) *
            44;

          // 3. Central Gaussian ridge accentuating 3D elevation crest
          const centralRidge =
            Math.exp(-nx * nx * 2.35) *
            (Math.sin(zPhase * 0.92 + time * 0.45 + scrollPhase * 0.35) * 48 + 38);

          // Combine waves + terrain scrollTilt across depth
          const worldY =
            broadSwell +
            diagonalCross -
            centralRidge +
            (depthNorm - 0.5) * scrollTilt * 175 +
            (depthNorm - 0.5) * 32;

          points[j].x = width * 0.5 + (worldX - camX) * scale;
          points[j].y = horizonY + (worldY - camY) * scale;
        }

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let j = 1; j < POINTS_PER_LINE - 2; j++) {
          const midX = (points[j].x + points[j + 1].x) * 0.5;
          const midY = (points[j].y + points[j + 1].y) * 0.5;
          ctx.quadraticCurveTo(points[j].x, points[j].y, midX, midY);
        }

        const lastIdx = POINTS_PER_LINE - 1;
        ctx.quadraticCurveTo(
          points[lastIdx - 1].x,
          points[lastIdx - 1].y,
          points[lastIdx].x,
          points[lastIdx].y,
        );

        const isGoldAccent = i % 6 === 5;
        if (isGoldAccent) {
          // Every 6th line: warm amber-gold (#C98A3A) with slightly higher depth opacity
          const accentAlpha = 0.22 + depthNorm * 0.58;
          ctx.strokeStyle = `rgba(201, 138, 58, ${accentAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.7 + depthNorm * 1.1;
        } else {
          // Main graphite lines (#1C1B18): ~12% in back -> ~67% in front
          const mainAlpha = 0.12 + depthNorm * 0.55;
          ctx.strokeStyle = `rgba(28, 27, 24, ${mainAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.55 + depthNorm * 1.0;
        }

        ctx.stroke();
      }
    };

    const resizeCanvas = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2.5);
      if (nextWidth === width && nextHeight === height && nextDpr === dpr) {
        return;
      }
      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawWave();
    };

    resizeCanvas();

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / Math.max(width, 1)) * 2 - 1;
      targetMouseY = (e.clientY / Math.max(height, 1)) * 2 - 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const renderFrame = (now: number) => {
      const dt = Math.min(Math.max((now - lastNow) / 1000, 0.001), 0.05);
      lastNow = now;

      // Frame-rate independent exponential smoothing (~0.06 per frame at 60Hz)
      const lerpAlpha = 1 - Math.exp(-3.7 * dt);
      const velAlpha = 1 - Math.exp(-2.4 * dt);

      scrollFactor += (targetScrollY - scrollFactor) * lerpAlpha;
      const rawVelocity = targetScrollY - scrollFactor;
      smoothVelocity += (rawVelocity - smoothVelocity) * velAlpha;

      smoothMouseX += (targetMouseX - smoothMouseX) * lerpAlpha;
      smoothMouseY += (targetMouseY - smoothMouseY) * lerpAlpha;

      if (!prefersReducedMotion) {
        time += 0.39 * dt;
      }

      drawWave();
      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 transform-gpu will-change-transform"
      />
      <div
        aria-hidden="true"
        className="wave-mist-overlay pointer-events-none fixed inset-0 z-[1]"
      />
    </>
  );
}
