import { useEffect, useRef } from 'react';

const LINE_COUNT = 16;
const POINTS_PER_LINE = 28;
const FOV = 480;
const Z_FAR = 720;
const Z_NEAR = 60;
const MAX_DPR = 1.25;
const MIN_FRAME_INTERVAL_MS = 1000 / 30;

interface StagePerspectiveWaveProps {
  accentHex: string;
  isDark: boolean;
  levitateOn: boolean;
  kineticOn: boolean;
  reducedMotion: boolean;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return [201, 138, 58];
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return [
    Number.isNaN(r) ? 201 : r,
    Number.isNaN(g) ? 138 : g,
    Number.isNaN(b) ? 58 : b,
  ];
}

export function StagePerspectiveWave({
  accentHex,
  isDark,
  levitateOn,
  kineticOn,
  reducedMotion,
}: StagePerspectiveWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({
    accentRgb: hexToRgb(accentHex),
    isDark,
    levitateOn,
    kineticOn,
    reducedMotion,
  });

  stateRef.current = {
    accentRgb: hexToRgb(accentHex),
    isDark,
    levitateOn,
    kineticOn,
    reducedMotion,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hostEl = canvas.parentElement;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    let isVisible = true;
    let time = 0;
    let targetCamX = 0;
    let targetCamY = 0;
    let smoothCamX = 0;
    let smoothCamY = 0;
    let rafId = 0;
    let lastNow = performance.now();
    let lastDrawNow = 0;

    const points = Array.from({ length: POINTS_PER_LINE }, () => ({
      x: 0,
      y: 0,
    }));

    const drawFrame = () => {
      if (width <= 0 || height <= 0) return;

      const {
        accentRgb,
        isDark: dark,
        kineticOn: useParallax,
      } = stateRef.current;
      const [ar, ag, ab] = accentRgb;

      ctx.clearRect(0, 0, width, height);

      const camX = useParallax ? smoothCamX * 42 : 0;
      const camY = useParallax ? smoothCamY * 22 : 0;
      const horizonY = height * 0.62;
      const halfWorldWidth = Math.max(width * 1.15, 760);

      for (let i = 0; i < LINE_COUNT; i++) {
        const depthNorm = i / (LINE_COUNT - 1);
        const z = Z_FAR - depthNorm * (Z_FAR - Z_NEAR);
        const scale = FOV / (z + FOV);
        const zPhase = depthNorm * 4.2;
        const depthOffset = depthNorm - 0.5;
        const isAccentLine = i % 3 === 2;

        // Subtle 7%–16% opacity so headlines, buttons, and cards stay crisp
        const alpha = isAccentLine
          ? (dark ? 0.095 : 0.075) + depthNorm * (dark ? 0.11 : 0.09)
          : (dark ? 0.045 : 0.032) + depthNorm * (dark ? 0.07 : 0.065);

        const ridgeWave = Math.sin(zPhase * 0.9 + time * 0.5) * 26 + 22;
        const depthBias = depthOffset * 68;

        for (let j = 0; j < POINTS_PER_LINE; j++) {
          const u = j / (POINTS_PER_LINE - 1);
          const nx = u * 2 - 1;
          const worldX = nx * halfWorldWidth;

          const broadSwell =
            Math.sin(nx * 2.4 + zPhase * 0.72 + time * 0.85) * 34;
          const crossRipple =
            Math.sin(nx * 3.8 - zPhase * 1.1 + time * 0.52) *
            Math.cos(zPhase * 0.45 + nx * 1.3) *
            22;
          const centralRidge = Math.exp(-nx * nx * 2.2) * ridgeWave;

          const worldY = broadSwell + crossRipple - centralRidge + depthBias;

          points[j].x = width * 0.5 + (worldX - camX) * scale;
          points[j].y = horizonY + (worldY - camY) * scale;
        }

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let j = 1; j < POINTS_PER_LINE; j++) {
          ctx.lineTo(points[j].x, points[j].y);
        }

        ctx.strokeStyle = isAccentLine
          ? `rgba(${ar}, ${ag}, ${ab}, ${alpha.toFixed(3)})`
          : dark
            ? `rgba(255, 255, 255, ${alpha.toFixed(3)})`
            : `rgba(28, 27, 24, ${alpha.toFixed(3)})`;
        ctx.lineWidth = (isAccentLine ? 0.75 : 0.55) + depthNorm * 0.75;
        ctx.stroke();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.round(rect.width);
      const nextHeight = Math.round(rect.height);
      const nextDpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      if (nextWidth <= 0 || nextHeight <= 0) return;
      if (nextWidth === width && nextHeight === height && nextDpr === dpr) {
        return;
      }

      width = nextWidth;
      height = nextHeight;
      dpr = nextDpr;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDrawNow = 0;
      drawFrame();
    };

    const tick = (now: number) => {
      rafId = 0;
      const {
        levitateOn: animateWave,
        kineticOn: useParallax,
        reducedMotion: reduced,
      } = stateRef.current;

      const dt = Math.min((now - lastNow) / 1000, 0.05);
      lastNow = now;

      if (animateWave && !reduced) {
        time += dt * 0.78;
      }

      const goalX = useParallax && !reduced ? targetCamX : 0;
      const goalY = useParallax && !reduced ? targetCamY : 0;
      const lerp = 1 - Math.exp(-6.5 * dt);
      smoothCamX += (goalX - smoothCamX) * lerp;
      smoothCamY += (goalY - smoothCamY) * lerp;

      const parallaxActive =
        useParallax &&
        !reduced &&
        (Math.abs(goalX - smoothCamX) > 0.002 ||
          Math.abs(goalY - smoothCamY) > 0.002 ||
          Math.abs(smoothCamX) > 0.002 ||
          Math.abs(smoothCamY) > 0.002);

      if (now - lastDrawNow >= MIN_FRAME_INTERVAL_MS) {
        lastDrawNow = now;
        drawFrame();
      }

      if (
        isVisible &&
        document.visibilityState !== 'hidden' &&
        !reduced &&
        (animateWave || parallaxActive)
      ) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const ensureRunning = (forceImmediate = false) => {
      if (forceImmediate) {
        lastDrawNow = 0;
        drawFrame();
      }
      if (rafId || !isVisible || document.visibilityState === 'hidden') return;
      lastNow = performance.now();
      rafId = window.requestAnimationFrame(tick);
    };

    const handleWake = () => ensureRunning(true);

    const onPointerMove = (e: PointerEvent) => {
      if (
        e.pointerType === 'touch' ||
        !hostEl ||
        !stateRef.current.kineticOn ||
        stateRef.current.reducedMotion
      ) {
        return;
      }
      const rect = hostEl.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      // Invert subtly against foreground card tilt to amplify 3D parallax separation
      targetCamX = -nx;
      targetCamY = -ny;
      ensureRunning(false);
    };

    const onPointerLeave = () => {
      targetCamX = 0;
      targetCamY = 0;
      ensureRunning(false);
    };

    resize();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(resize)
        : null;
    resizeObserver?.observe(canvas);

    const visibilityObserver =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const visible = entries.some((e) => e.isIntersecting);
              isVisible = visible;
              if (visible) ensureRunning(false);
              else if (rafId) {
                window.cancelAnimationFrame(rafId);
                rafId = 0;
              }
            },
            { threshold: 0.02 },
          )
        : null;
    visibilityObserver?.observe(canvas);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      } else {
        ensureRunning(false);
      }
    };

    hostEl?.addEventListener('pointermove', onPointerMove, { passive: true });
    hostEl?.addEventListener('pointerleave', onPointerLeave, { passive: true });
    canvas.addEventListener('stagewave:wake', handleWake);
    document.addEventListener('visibilitychange', onVisibilityChange);
    ensureRunning(false);

    return () => {
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      hostEl?.removeEventListener('pointermove', onPointerMove);
      hostEl?.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('stagewave:wake', handleWake);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.dispatchEvent(new Event('stagewave:wake'));
  }, [accentHex, isDark, levitateOn, kineticOn, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full rounded-[22px]"
    />
  );
}
