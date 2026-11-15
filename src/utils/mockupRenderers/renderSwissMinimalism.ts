import { ProjectConfig } from '../../data/projects';
import {
  applyEditorialGrain,
  drawBrowserChrome,
  drawRoundedRect,
} from './canvasPrimitives';

export function renderSwissMinimalism(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;

  // Warm Off-White Canvas (#F5F3EE)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: palette.surface,
    borderAlpha: 0.12,
    navItemsColor: palette.secondary,
  });

  // Asymmetric 3-column Swiss Grid Hairlines
  const contentW = width - padX * 2;
  const colGap = width * 0.022;
  const colW = (contentW - colGap * 2) / 3;

  ctx.strokeStyle = 'rgba(20, 20, 20, 0.11)';
  ctx.lineWidth = 1.5;
  for (let c = 0; c < 3; c++) {
    const cx = padX + c * (colW + colGap);
    ctx.beginPath();
    ctx.moveTo(cx, headerBottom);
    ctx.lineTo(cx, height - height * 0.05);
    ctx.stroke();
  }

  // Hero Headline Row across Columns 1–2 + Clean Editorial Counter in Col 3
  const topY = headerBottom + height * 0.055;
  ctx.fillStyle = palette.secondary;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX, topY);

  const col3X = padX + (colW + colGap) * 2;
  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.024)}px "JetBrains Mono", monospace`;
  ctx.fillText('SWISS / 01', col3X + width * 0.012, topY + height * 0.014);

  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.048)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.headline, padX, topY + height * 0.09);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.013)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.subheadline, padX, topY + height * 0.155);

  // Horizontal Section Divider
  const bodyY = topY + height * 0.22;
  const bodyH = height - bodyY - height * 0.065;

  ctx.strokeStyle = 'rgba(20, 20, 20, 0.12)';
  ctx.beginPath();
  ctx.moveTo(padX, bodyY - height * 0.02);
  ctx.lineTo(width - padX, bodyY - height * 0.02);
  ctx.stroke();

  // Column 1: Clean B2B Value Pillars + Primary Action Button
  previewSample.metrics.forEach((metric, idx) => {
    const my = bodyY + height * (0.04 + idx * 0.145);
    ctx.fillStyle = palette.secondary;
    ctx.font = `500 ${Math.round(width * 0.009)}px "JetBrains Mono", monospace`;
    ctx.fillText(metric.label, padX + width * 0.008, my);

    ctx.fillStyle = palette.text;
    ctx.font = `600 ${Math.round(width * 0.02)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(metric.value, padX + width * 0.008, my + height * 0.045);

    ctx.strokeStyle = 'rgba(20, 20, 20, 0.12)';
    ctx.beginPath();
    ctx.moveTo(padX, my + height * 0.088);
    ctx.lineTo(padX + colW * 0.9, my + height * 0.088);
    ctx.stroke();
  });

  // High-Contrast Crisp Black Swiss CTA Button
  const btnY = bodyY + bodyH - height * 0.075;
  ctx.fillStyle = palette.text;
  drawRoundedRect(ctx, padX + width * 0.008, btnY, colW * 0.84, height * 0.066, 4);
  ctx.fill();
  ctx.fillStyle = palette.bg;
  ctx.font = `600 ${Math.round(width * 0.0092)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.ctaLabel, padX + width * 0.024, btnY + height * 0.035);

  // Columns 2 & 3 Combined: Clean Editorial Architectural Website Visual + 3 Service Pillars
  const plateX = padX + colW + colGap;
  const plateW = colW * 2 + colGap;
  const plateY = bodyY;
  const plateH = bodyH * 0.8;

  ctx.save();
  drawRoundedRect(ctx, plateX, plateY, plateW, plateH, 6);
  ctx.clip();

  // Clean sunlit gallery architectural composition
  const sky = ctx.createLinearGradient(plateX, plateY, plateX, plateY + plateH);
  sky.addColorStop(0, '#E6E3DC');
  sky.addColorStop(0.6, '#C8C5BC');
  sky.addColorStop(1, '#A8A59D');
  ctx.fillStyle = sky;
  ctx.fillRect(plateX, plateY, plateW, plateH);

  const baseFloor = plateY + plateH * 0.84;
  ctx.fillStyle = '#181816';
  ctx.beginPath();
  ctx.moveTo(plateX + plateW * 0.08, baseFloor);
  ctx.lineTo(plateX + plateW * 0.08, plateY + plateH * 0.25);
  ctx.lineTo(plateX + plateW * 0.56, plateY + plateH * 0.15);
  ctx.lineTo(plateX + plateW * 0.56, baseFloor);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#363532';
  ctx.beginPath();
  ctx.moveTo(plateX + plateW * 0.56, plateY + plateH * 0.15);
  ctx.lineTo(plateX + plateW * 0.89, plateY + plateH * 0.3);
  ctx.lineTo(plateX + plateW * 0.89, baseFloor);
  ctx.lineTo(plateX + plateW * 0.56, baseFloor);
  ctx.closePath();
  ctx.fill();

  // Bright minimalist gallery window opening
  ctx.fillStyle = '#F5F3EE';
  ctx.fillRect(
    plateX + plateW * 0.24,
    plateY + plateH * 0.38,
    plateW * 0.17,
    baseFloor - (plateY + plateH * 0.38),
  );

  applyEditorialGrain(ctx, plateX, plateY, plateW, plateH, 101, 0.035);
  ctx.restore();

  // Clean 3-column Service / Practice Pillars below Hero Image
  const capY = plateY + plateH + height * 0.05;
  previewSample.cardLabels.forEach((lbl, idx) => {
    const lx = plateX + idx * (plateW / 3);
    ctx.fillStyle = palette.secondary;
    ctx.font = `500 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
    ctx.fillText(`0${idx + 1}`, lx, capY);
    ctx.fillStyle = palette.text;
    ctx.font = `600 ${Math.round(width * 0.013)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(lbl, lx, capY + height * 0.034);
  });
}
