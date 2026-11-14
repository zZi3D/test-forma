import { ProjectConfig } from '../../data/projects';
import { drawBrowserChrome, drawRoundedRect } from './canvasPrimitives';

export function renderRetroCrt(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, content } = project;
  const lime = palette.accent; // #BEF264 phosphor lime
  const amber = palette.secondary; // #F59E0B warm amber

  // Deep CRT monitor black (#0A0C0B)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Dark phosphor pixel raster grid
  ctx.strokeStyle = '#1A1D1B';
  ctx.lineWidth = 1;
  const gridStep = 40;
  for (let gx = 0; gx < width; gx += gridStep) {
    ctx.beginPath();
    ctx.moveTo(gx, 0);
    ctx.lineTo(gx, height);
    ctx.stroke();
  }
  for (let gy = 0; gy < height; gy += gridStep) {
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(width, gy);
    ctx.stroke();
  }

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#121513',
    borderAlpha: 0.25,
    navItemsColor: lime,
  });

  // Pixel-crisp CRT Status Strip
  const statusY = headerBottom + height * 0.032;
  const statusW = width - padX * 2;
  const statusH = height * 0.068;
  ctx.fillStyle = '#111412';
  ctx.fillRect(padX, statusY, statusW, statusH);
  ctx.strokeStyle = 'rgba(190, 242, 100, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(padX, statusY, statusW, statusH);

  ctx.fillStyle = lime;
  ctx.font = `700 ${Math.round(width * 0.011)}px "JetBrains Mono", monospace`;
  ctx.fillText(`> ${content.eyebrow}`, padX + 20, statusY + statusH * 0.54);

  ctx.fillStyle = amber;
  ctx.fillText(content.headline, padX + width * 0.34, statusY + statusH * 0.54);

  ctx.fillStyle = lime;
  ctx.fillText(`[${content.ctaLabel}]`, width - padX - width * 0.145, statusY + statusH * 0.54);

  // CENTER OSCILLOSCOPE CRT FRAME: Glowing Oscillating Phosphor-Lime Waveform
  const scopeY = statusY + statusH + height * 0.035;
  const scopeH = height * 0.43;

  // Phosphor radial glow behind oscilloscope
  const crtGlow = ctx.createRadialGradient(
    width * 0.5,
    scopeY + scopeH * 0.5,
    12,
    width * 0.5,
    scopeY + scopeH * 0.5,
    width * 0.42,
  );
  crtGlow.addColorStop(0, 'rgba(190, 242, 100, 0.18)');
  crtGlow.addColorStop(0.6, 'rgba(190, 242, 100, 0.04)');
  crtGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = crtGlow;
  ctx.fillRect(padX, scopeY, statusW, scopeH);

  ctx.fillStyle = '#070908';
  drawRoundedRect(ctx, padX, scopeY, statusW, scopeH, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(190, 242, 100, 0.45)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Center oscilloscope axis crosshair
  const midScopeY = scopeY + scopeH * 0.5;
  ctx.strokeStyle = 'rgba(190, 242, 100, 0.16)';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(padX + 20, midScopeY);
  ctx.lineTo(padX + statusW - 20, midScopeY);
  ctx.moveTo(width * 0.5, scopeY + 18);
  ctx.lineTo(width * 0.5, scopeY + scopeH - 18);
  ctx.stroke();
  ctx.setLineDash([]);

  // Secondary harmonic ghost trace in warm amber
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  const samples = 120;
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = padX + 28 + t * (statusW - 56);
    const env = Math.sin(t * Math.PI);
    const y =
      midScopeY +
      Math.cos(t * Math.PI * 10) * (scopeH * 0.24) * env;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Primary Glowing Phosphor-Lime Waveform
  ctx.save();
  ctx.shadowColor = lime;
  ctx.shadowBlur = 18;
  ctx.strokeStyle = lime;
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = padX + 28 + t * (statusW - 56);
    const env = Math.pow(Math.sin(t * Math.PI), 0.7);
    const y =
      midScopeY +
      (Math.sin(t * Math.PI * 8) * 0.68 + Math.sin(t * Math.PI * 22) * 0.32) *
        (scopeH * 0.36) *
        env;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();

  // Telemetry overlays inside oscilloscope corners
  ctx.fillStyle = lime;
  ctx.font = `600 13px "JetBrains Mono", monospace`;
  ctx.fillText('OSC.A // 440.0 HZ  [LOCKED]', padX + 24, scopeY + 30);
  ctx.fillStyle = amber;
  ctx.fillText('PEAK +0.84 DB', width - padX - 160, scopeY + 30);

  // BOTTOM SECTION: Modular 16-Step Audio Sequencer & Status Metrics
  const seqY = scopeY + scopeH + height * 0.032;
  const seqH = height - seqY - height * 0.055;
  const leftSeqW = statusW * 0.66;
  const rightStatsX = padX + leftSeqW + width * 0.02;
  const rightStatsW = statusW - leftSeqW - width * 0.02;

  ctx.fillStyle = '#111412';
  ctx.fillRect(padX, seqY, leftSeqW, seqH);
  ctx.strokeStyle = 'rgba(190, 242, 100, 0.28)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(padX, seqY, leftSeqW, seqH);

  ctx.fillStyle = lime;
  ctx.font = `600 13px "JetBrains Mono", monospace`;
  ctx.fillText('STEP SEQUENCER // 16-CH MATRIX', padX + 20, seqY + 30);

  // 4 rows × 16 step sequencer pads
  const padGap = 8;
  const gridLeft = padX + 20;
  const gridTop = seqY + 48;
  const stepW = (leftSeqW - 40 - padGap * 15) / 16;
  const stepH = (seqH - 68 - padGap * 3) / 4;

  const activePattern = [
    [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1],
  ];

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 16; c++) {
      const sx = gridLeft + c * (stepW + padGap);
      const sy = gridTop + r * (stepH + padGap);
      const isActive = activePattern[r][c] === 1;
      const isPlayhead = c === 8;
      ctx.fillStyle = isActive
        ? isPlayhead
          ? amber
          : lime
        : '#1A1D1B';
      ctx.fillRect(sx, sy, stepW, stepH);
      if (isPlayhead) {
        ctx.strokeStyle = amber;
        ctx.lineWidth = 2;
        ctx.strokeRect(sx - 1, sy - 1, stepW + 2, stepH + 2);
      }
    }
  }

  // Right status metrics box
  ctx.fillStyle = '#111412';
  ctx.fillRect(rightStatsX, seqY, rightStatsW, seqH);
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(rightStatsX, seqY, rightStatsW, seqH);

  content.metrics.forEach((m, idx) => {
    const my = seqY + 38 + idx * ((seqH - 40) / 3);
    ctx.fillStyle = 'rgba(245, 158, 11, 0.72)';
    ctx.font = `500 12px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, rightStatsX + 22, my);

    ctx.fillStyle = idx === 1 ? amber : lime;
    ctx.font = `700 22px "JetBrains Mono", monospace`;
    ctx.fillText(m.value, rightStatsX + 22, my + 28);
  });

  // Subtle Horizontal CRT Scanlines across whole screen
  ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
  for (let sy = 0; sy < height; sy += 6) {
    ctx.fillRect(0, sy, width, 2);
  }
}
