import { useEffect, useRef } from 'react';

const LINE_COUNT = 52;
const POINTS_PER_LINE = 44;
const FOV = 640;
const Z_FAR = 860;
const Z_NEAR = 45;
const MAX_WAVE_DPR = 1.25;
const MOBILE_WAVE_DPR = 1;
const DESKTOP_FRAME_INTERVAL_MS = 1000 / 36;
const MOBILE_FRAME_INTERVAL_MS = 1000 / 24;

interface WaveLineDescriptor {
  depthNorm: number;
  scale: number;
  zPhase: number;
  depthOffset: number;
  strokeStyle: string;
  lineWidth: number;
}

const WAVE_LINES: WaveLineDescriptor[] = Array.from(
  { length: LINE_COUNT },
  (_, i) => {
    const depthNorm = i / (LINE_COUNT - 1);
    const z = Z_FAR - depthNorm * (Z_FAR - Z_NEAR);
    const scale = FOV / (z + FOV);
    const zPhase = depthNorm * 4.4;
    const isGoldAccent = i % 6 === 5;
    const alpha = isGoldAccent ? 0.22 + depthNorm * 0.58 : 0.12 + depthNorm * 0.55;

    return {
      depthNorm,
      scale,
      zPhase,
      depthOffset: depthNorm - 0.5,
      strokeStyle: isGoldAccent
        ? `rgba(201, 138, 58, ${alpha.toFixed(3)})`
        : `rgba(28, 27, 24, ${alpha.toFixed(3)})`,
      lineWidth: (isGoldAccent ? 0.7 : 0.55) + depthNorm * (isGoldAccent ? 1.1 : 1.0),
    };
  },
);

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
    let isMobileViewport = window.innerWidth < 768;
    let minFrameInterval = isMobileViewport
      ? MOBILE_FRAME_INTERVAL_MS
      : DESKTOP_FRAME_INTERVAL_MS;
    let dpr = Math.min(
      window.devicePixelRatio || 1,
      isMobileViewport ? MOBILE_WAVE_DPR : MAX_WAVE_DPR,
    );

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
    let lastDrawNow = 0;

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
      const scrollPhase = scrollFactor * 0.0022;
      const tiltScale = scrollTilt * 175 + 32;

      // Draw 52 curved lines from back (i = 0) to front (i = 51)
      for (let i = 0; i < LINE_COUNT; i++) {
        const line = WAVE_LINES[i];
        const { scale, zPhase, depthOffset, strokeStyle, lineWidth } = line;
        const ridgeWave =
          Math.sin(zPhase * 0.92 + time * 0.45 + scrollPhase * 0.35) * 48 + 38;
        const depthBias = depthOffset * tiltScale;

        for (let j = 0; j < POINTS_PER_LINE; j++) {
          const u = j / (POINTS_PER_LINE - 1);
          const nx = u * 2 - 1;
          const worldX = nx * halfWorldWidth;

          const broadSwell =
            Math.sin(nx * 2.55 + zPhase * 0.68 + time * 0.85 + scrollPhase) * 62;
          const diagonalCross =
            Math.sin(nx * 4.1 - zPhase * 1.15 + time * 0.55 - scrollPhase * 0.72) *
            Math.cos(zPhase * 0.45 + nx * 1.35) *
            44;
          const centralRidge = Math.exp(-nx * nx * 2.35) * ridgeWave;

          const worldY = broadSwell + diagonalCross - centralRidge + depthBias;

          points[j].x = width * 0.5 + (worldX - camX) * scale;
          points[j].y = horizonY + (worldY - camY) * scale;
        }

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let j = 1; j < POINTS_PER_LINE; j++) {
          ctx.lineTo(points[j].x, points[j].y);
        }

        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    };

    const resizeCanvas = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const mobile = nextWidth < 768;
      // Avoid clearing and reallocating full-screen backing canvas on mobile URL-bar height flicker
      if (
        mobile &&
        isMobileViewport &&
        nextWidth === width &&
        Math.abs(nextHeight - height) < 130
      ) {
        return;
      }
      isMobileViewport = mobile;
      minFrameInterval = mobile
        ? MOBILE_FRAME_INTERVAL_MS
        : DESKTOP_FRAME_INTERVAL_MS;
      const nextDpr = Math.min(
        window.devicePixelRatio || 1,
        mobile ? MOBILE_WAVE_DPR : MAX_WAVE_DPR,
      );
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

    const renderFrame = (now: number) => {
      rafId = 0;
      if (document.hidden) return;

      if (lastDrawNow !== 0 && now - lastDrawNow < minFrameInterval) {
        rafId = window.requestAnimationFrame(renderFrame);
        return;
      }

      const dt = Math.min(Math.max((now - lastNow) / 1000, 0.001), 0.05);
      lastNow = now;
      lastDrawNow = now;

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

    const startWave = () => {
      if (!rafId && !document.hidden) {
        lastNow = performance.now();
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      } else {
        startWave();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    startWave();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibility);
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
