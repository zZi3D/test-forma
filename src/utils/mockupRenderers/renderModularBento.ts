import { ProjectConfig } from '../../data/projects';
import { drawBrowserChrome, drawRoundedRect } from './canvasPrimitives';

function drawBentoCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string,
  borderColor = 'rgba(17, 24, 39, 0.08)',
) {
  ctx.save();
  ctx.shadowColor = 'rgba(15, 23, 42, 0.06)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = fill;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.stroke();
}

export function renderModularBento(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;

  // Bright neutral cool gray canvas (#F4F5F7)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#FFFFFF',
    borderAlpha: 0.08,
    navItemsColor: palette.secondary,
  });

  const topY = headerBottom + height * 0.042;
  const contentW = width - padX * 2;
  const totalH = height - topY - height * 0.06;
  const gap = width * 0.018;

  // 3-Column Bento Matrix
  const colLeftW = contentW * 0.44;
  const colMidW = contentW * 0.27;
  const colRightW = contentW - colLeftW - colMidW - gap * 2;

  // 1. LARGE HERO PRODUCT CARD (Left Top)
  const heroH = totalH * 0.62;
  drawBentoCard(ctx, padX, topY, colLeftW, heroH, 24, palette.surface);

  const cardPad = width * 0.026;
  // Eyebrow Pill
  ctx.fillStyle = 'rgba(37, 99, 235, 0.1)';
  drawRoundedRect(ctx, padX + cardPad, topY + cardPad * 0.85, width * 0.17, 32, 16);
  ctx.fill();
  ctx.fillStyle = palette.accent;
  ctx.font = `700 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX + cardPad + 16, topY + cardPad * 0.85 + 17);

  // Clean Bold Product Headline
  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.036)}px "Plus Jakarta Sans", sans-serif`;
  const words = previewSample.headline.split(' ');
  const midSplit = Math.ceil(words.length / 2);
  ctx.fillText(words.slice(0, midSplit).join(' '), padX + cardPad, topY + height * 0.16);
  ctx.fillText(words.slice(midSplit).join(' '), padX + cardPad, topY + height * 0.225);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.012)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.subheadline.slice(0, 48), padX + cardPad, topY + height * 0.29);

  // Focal Action Button inside Hero Card
  const btnY = topY + heroH - height * 0.105;
  ctx.fillStyle = palette.accent;
  drawRoundedRect(ctx, padX + cardPad, btnY, width * 0.175, 50, 25);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.01)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, padX + cardPad + 24, btnY + 26);

  // 2. BOTTOM LEFT TWO MINI BENTO METRIC TILES
  const botY = topY + heroH + gap;
  const botH = totalH - heroH - gap;
  const miniW = (colLeftW - gap) / 2;

  previewSample.metrics.slice(0, 2).forEach((m, idx) => {
    const mx = padX + idx * (miniW + gap);
    drawBentoCard(ctx, mx, botY, miniW, botH, 22, palette.surface);

    ctx.fillStyle = palette.secondary;
    ctx.font = `600 ${Math.round(width * 0.0088)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, mx + 24, botY + botH * 0.34);

    ctx.fillStyle = idx === 1 ? palette.accent : palette.text;
    ctx.font = `700 ${Math.round(width * 0.028)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.value, mx + 24, botY + botH * 0.72);
  });

  // 3. CENTER FOCAL ACCENT BENTO MODULE (Cobalt Blue Highlight Card + Bottom Preview Card)
  const midX = padX + colLeftW + gap;
  const midTopH = totalH * 0.44;
  drawBentoCard(ctx, midX, topY, colMidW, midTopH, 24, palette.accent, palette.accent);

  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font = `600 ${Math.round(width * 0.009)}px "JetBrains Mono", monospace`;
  ctx.fillText('CONVERSION METRIC', midX + 26, topY + 38);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.042)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.metrics[2]?.value || '99.99%', midX + 26, topY + midTopH * 0.56);

  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = `500 ${Math.round(width * 0.0115)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.cardLabels[1] || 'LIVE SYNC', midX + 26, topY + midTopH * 0.8);

  // Center Bottom Card: Clean Activity Bar Preview
  const midBotY = topY + midTopH + gap;
  const midBotH = totalH - midTopH - gap;
  drawBentoCard(ctx, midX, midBotY, colMidW, midBotH, 24, palette.surface);

  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.014)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.cardLabels[2] || 'ANALYTICS', midX + 26, midBotY + 38);

  const barHeights = [0.38, 0.56, 0.48, 0.76, 0.64, 0.92, 0.8];
  const barZoneW = colMidW - 52;
  const barW = barZoneW / barHeights.length - 8;
  barHeights.forEach((bh, idx) => {
    const bx = midX + 26 + idx * (barW + 8);
    const maxBarH = midBotH * 0.52;
    const hVal = maxBarH * bh;
    const by = midBotY + midBotH - 28 - hVal;
    ctx.fillStyle = idx === 5 ? palette.accent : '#E2E8F0';
    drawRoundedRect(ctx, bx, by, barW, hVal, 6);
    ctx.fill();
  });

  // 4. RIGHT COLUMN: STACKED WORKFLOW CARDS + INTEGRATIONS
  const rightX = midX + colMidW + gap;
  const rightTopH = totalH * 0.54;
  drawBentoCard(ctx, rightX, topY, colRightW, rightTopH, 24, palette.surface);

  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.014)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.cardLabels[0] || 'AUTOMATION', rightX + 24, topY + 38);

  const stepItems = ['01  Instant Onboarding', '02  Unified Workspace', '03  Smart Alerts', '04  Global Export'];
  stepItems.forEach((step, idx) => {
    const sy = topY + 72 + idx * 54;
    ctx.fillStyle = idx === 0 ? 'rgba(37, 99, 235, 0.09)' : '#F8FAFC';
    drawRoundedRect(ctx, rightX + 22, sy, colRightW - 44, 42, 12);
    ctx.fill();

    ctx.fillStyle = idx === 0 ? palette.accent : palette.text;
    ctx.font = `600 ${Math.round(width * 0.0105)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(step, rightX + 38, sy + 22);
  });

  // Bottom Right Dark Contrast Module
  const rBotY = topY + rightTopH + gap;
  const rBotH = totalH - rightTopH - gap;
  drawBentoCard(ctx, rightX, rBotY, colRightW, rBotH, 24, '#111827', '#111827');

  ctx.fillStyle = '#94A3B8';
  ctx.font = `600 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
  ctx.fillText('RESPONSIVE SYSTEM', rightX + 24, rBotY + 38);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.0175)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Desktop + Mobile', rightX + 24, rBotY + rBotH * 0.56);

  ctx.fillStyle = '#60A5FA';
  ctx.font = `600 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.fillText('BENTO GRID READY ↗', rightX + 24, rBotY + rBotH * 0.8);
}
