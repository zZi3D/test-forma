import { ProjectConfig } from '../../data/projects';
import { drawBrowserChrome, drawRoundedRect } from './canvasPrimitives';

function drawClayCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string,
) {
  ctx.save();
  // Soft outer clay drop shadow
  ctx.shadowColor = 'rgba(148, 163, 184, 0.34)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetX = 12;
  ctx.shadowOffsetY = 16;
  ctx.fillStyle = fill;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();

  // Secondary top-left outer bounce highlight
  ctx.shadowColor = 'rgba(255, 255, 255, 0.92)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetX = -8;
  ctx.shadowOffsetY = -8;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.restore();

  // Inner pillowed rim bevel (top-left bright highlight + bottom-right soft slate shade)
  ctx.save();
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.clip();

  const innerShade = ctx.createLinearGradient(x, y, x + w, y + h);
  innerShade.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
  innerShade.addColorStop(0.45, 'rgba(255, 255, 255, 0.0)');
  innerShade.addColorStop(1, 'rgba(203, 213, 225, 0.42)');
  ctx.strokeStyle = innerShade;
  ctx.lineWidth = 8;
  drawRoundedRect(ctx, x + 2, y + 2, w - 4, h - 4, Math.max(4, r - 2));
  ctx.stroke();
  ctx.restore();
}

export function renderClaymorphism(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, content } = project;

  // Soft light lavender-gray canvas (#ECEEF2)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#F6F7FA',
    borderAlpha: 0.08,
    navItemsColor: palette.secondary,
  });

  const topY = headerBottom + height * 0.045;
  const contentW = width - padX * 2;
  const gap = width * 0.025;
  const radius = 44; // Generous ~28px scaled to 1600px width

  // LEFT LARGE CLAY HERO CHART CARD (64% width)
  const mainW = contentW * 0.64;
  const mainH = height - topY - height * 0.07;
  drawClayCard(ctx, padX, topY, mainW, mainH, radius, palette.surface);

  const cardPad = width * 0.032;
  ctx.fillStyle = palette.secondary;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(content.eyebrow, padX + cardPad, topY + height * 0.065);

  // Tabular Wealth Growth Headline ($48,420,890)
  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.046)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(content.headline, padX + cardPad, topY + height * 0.145);

  ctx.fillStyle = palette.secondary;
  ctx.font = `500 ${Math.round(width * 0.0125)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(content.subheadline, padX + cardPad, topY + height * 0.205);

  // Coral-orange raised clay pill badge top-right of main card
  const badgeW = width * 0.11;
  const badgeH = height * 0.06;
  const badgeX = padX + mainW - cardPad - badgeW;
  const badgeY = topY + height * 0.055;
  drawClayCard(ctx, badgeX, badgeY, badgeW, badgeH, 28, palette.accent);
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = `700 ${Math.round(width * 0.0115)}px "JetBrains Mono", monospace`;
  ctx.fillText(content.metrics[0].value, badgeX + badgeW * 0.5, badgeY + badgeH * 0.52);
  ctx.textAlign = 'left';

  // Smooth 3D-shaded curve chart inside main clay card
  const chartX = padX + cardPad;
  const chartY = topY + height * 0.27;
  const chartW = mainW - cardPad * 2;
  const chartH = mainH - height * 0.36;

  // Soft recessed inner well for chart
  ctx.save();
  ctx.fillStyle = '#F4F6FA';
  drawRoundedRect(ctx, chartX, chartY, chartW, chartH, 28);
  ctx.fill();

  // Horizontal subtle guide rules
  ctx.strokeStyle = 'rgba(30, 41, 59, 0.07)';
  ctx.lineWidth = 1.5;
  for (let g = 1; g <= 3; g++) {
    const gy = chartY + (chartH / 4) * g;
    ctx.beginPath();
    ctx.moveTo(chartX + 24, gy);
    ctx.lineTo(chartX + chartW - 24, gy);
    ctx.stroke();
  }

  // Smooth curve coordinates with peak near 78% X
  const pts = [
    { x: chartX + chartW * 0.06, y: chartY + chartH * 0.78 },
    { x: chartX + chartW * 0.24, y: chartY + chartH * 0.65 },
    { x: chartX + chartW * 0.44, y: chartY + chartH * 0.7 },
    { x: chartX + chartW * 0.62, y: chartY + chartH * 0.36 },
    { x: chartX + chartW * 0.78, y: chartY + chartH * 0.22 }, // Peak!
    { x: chartX + chartW * 0.94, y: chartY + chartH * 0.3 },
  ];

  // Area fill under curve
  const areaGrad = ctx.createLinearGradient(0, chartY, 0, chartY + chartH);
  areaGrad.addColorStop(0, 'rgba(255, 77, 36, 0.22)');
  areaGrad.addColorStop(1, 'rgba(255, 77, 36, 0.0)');
  ctx.fillStyle = areaGrad;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, chartY + chartH - 16);
  ctx.lineTo(pts[0].x, pts[0].y);
  for (let i = 0; i < pts.length - 1; i++) {
    const xc = (pts[i].x + pts[i + 1].x) * 0.5;
    const yc = (pts[i].y + pts[i + 1].y) * 0.5;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
  }
  ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
  ctx.lineTo(pts[pts.length - 1].x, chartY + chartH - 16);
  ctx.closePath();
  ctx.fill();

  // Thick 3D-shaded line stroke
  ctx.save();
  ctx.shadowColor = 'rgba(30, 41, 59, 0.28)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 10;
  ctx.strokeStyle = palette.text;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 0; i < pts.length - 1; i++) {
    const xc = (pts[i].x + pts[i + 1].x) * 0.5;
    const yc = (pts[i].y + pts[i + 1].y) * 0.5;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
  }
  ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
  ctx.stroke();
  ctx.restore();

  // Single glossy coral-orange accent beacon dot at data peak
  const peak = pts[4];
  ctx.save();
  ctx.shadowColor = 'rgba(255, 77, 36, 0.55)';
  ctx.shadowBlur = 22;
  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.arc(peak.x, peak.y, 15, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Gloss specular crescent inside orange dot
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(peak.x - 4, peak.y - 4, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // RIGHT STACKED CLAY METRIC & ALLOCATION CARDS (33.5% width)
  const rightX = padX + mainW + gap;
  const rightW = contentW - mainW - gap;
  const cardGap = height * 0.028;
  const cardH = (mainH - cardGap * 2) / 3;

  content.metrics.forEach((metric, idx) => {
    const cy = topY + idx * (cardH + cardGap);
    drawClayCard(ctx, rightX, cy, rightW, cardH, 34, palette.surface);

    ctx.fillStyle = palette.secondary;
    ctx.font = `600 ${Math.round(width * 0.009)}px "JetBrains Mono", monospace`;
    ctx.fillText(metric.label, rightX + width * 0.024, cy + cardH * 0.34);

    ctx.fillStyle = idx === 0 ? palette.accent : palette.text;
    ctx.font = `700 ${Math.round(width * 0.025)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(metric.value, rightX + width * 0.024, cy + cardH * 0.68);

    // Mini puffed clay allocation bar pill
    const barW = rightW - width * 0.048;
    const barY = cy + cardH * 0.8;
    ctx.fillStyle = '#E5E8EF';
    drawRoundedRect(ctx, rightX + width * 0.024, barY, barW, 10, 5);
    ctx.fill();

    ctx.fillStyle = idx === 0 ? palette.accent : palette.text;
    drawRoundedRect(
      ctx,
      rightX + width * 0.024,
      barY,
      barW * (0.78 - idx * 0.16),
      10,
      5,
    );
    ctx.fill();
  });
}
