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
  const { palette, content } = project;

  // Background (#F5F3EE)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: palette.surface,
    borderAlpha: 0.12,
    navItemsColor: palette.secondary,
  });

  // Ultra-crisp Swiss 3-column hairline grid
  const contentW = width - padX * 2;
  const colGap = width * 0.022;
  const colW = (contentW - colGap * 2) / 3;

  ctx.strokeStyle = 'rgba(20, 20, 20, 0.12)';
  ctx.lineWidth = 1.5;
  for (let c = 0; c < 3; c++) {
    const cx = padX + c * (colW + colGap);
    ctx.beginPath();
    ctx.moveTo(cx, headerBottom);
    ctx.lineTo(cx, height - height * 0.05);
    ctx.stroke();
  }

  // Top Header Row across Columns 1–2 & Index in Col 3
  const topY = headerBottom + height * 0.055;
  ctx.fillStyle = palette.secondary;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(content.eyebrow, padX, topY);

  // Numbered project index badge ("01 — 08") in column 3
  const col3X = padX + (colW + colGap) * 2;
  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.026)}px "JetBrains Mono", monospace`;
  ctx.fillText('01 — 08', col3X + width * 0.012, topY + height * 0.016);

  // Large clean sans headline across cols 1-2
  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.044)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(content.headline, padX, topY + height * 0.088);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0125)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(content.subheadline, padX, topY + height * 0.155);

  // Column 1: Metrics & Technical Specs
  const bodyY = topY + height * 0.22;
  const bodyH = height - bodyY - height * 0.065;

  ctx.strokeStyle = 'rgba(20, 20, 20, 0.12)';
  ctx.beginPath();
  ctx.moveTo(padX, bodyY - height * 0.02);
  ctx.lineTo(width - padX, bodyY - height * 0.02);
  ctx.stroke();

  content.metrics.forEach((metric, idx) => {
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

  // Minimal Swiss CTA Button at bottom of Column 1
  const btnY = bodyY + bodyH - height * 0.075;
  ctx.strokeStyle = palette.text;
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, padX + width * 0.008, btnY, colW * 0.72, height * 0.064, 4);
  ctx.stroke();
  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(content.ctaLabel, padX + width * 0.024, btnY + height * 0.034);

  // Columns 2 & 3 Combined: B&W Brutalist Concrete Architecture Photo + Technical CAD Lines
  const plateX = padX + colW + colGap;
  const plateW = colW * 2 + colGap;
  const plateY = bodyY;
  const plateH = bodyH * 0.84;

  ctx.save();
  ctx.fillStyle = '#E0DDD5';
  ctx.fillRect(plateX, plateY, plateW, plateH);
  ctx.beginPath();
  ctx.rect(plateX, plateY, plateW, plateH);
  ctx.clip();

  // Monochrome sky gradient
  const sky = ctx.createLinearGradient(plateX, plateY, plateX, plateY + plateH);
  sky.addColorStop(0, '#DCDAD3');
  sky.addColorStop(0.65, '#BFBDB5');
  sky.addColorStop(1, '#9E9C94');
  ctx.fillStyle = sky;
  ctx.fillRect(plateX, plateY, plateW, plateH);

  // Brutalist concrete cantilever slabs (pure B&W contrast)
  const baseFloor = plateY + plateH * 0.82;
  ctx.fillStyle = '#141414';
  ctx.beginPath();
  ctx.moveTo(plateX + plateW * 0.08, baseFloor);
  ctx.lineTo(plateX + plateW * 0.08, plateY + plateH * 0.28);
  ctx.lineTo(plateX + plateW * 0.56, plateY + plateH * 0.14);
  ctx.lineTo(plateX + plateW * 0.56, baseFloor);
  ctx.closePath();
  ctx.fill();

  // Concrete shadow fascia & recessed gallery slit
  ctx.fillStyle = '#333330';
  ctx.beginPath();
  ctx.moveTo(plateX + plateW * 0.56, plateY + plateH * 0.14);
  ctx.lineTo(plateX + plateW * 0.88, plateY + plateH * 0.31);
  ctx.lineTo(plateX + plateW * 0.88, baseFloor);
  ctx.lineTo(plateX + plateW * 0.56, baseFloor);
  ctx.closePath();
  ctx.fill();

  // Stark daylight aperture slot in concrete wall
  ctx.fillStyle = '#F5F3EE';
  ctx.fillRect(plateX + plateW * 0.24, plateY + plateH * 0.42, plateW * 0.16, baseFloor - (plateY + plateH * 0.42));

  // Concrete horizontal board-form texture lines
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  for (let l = 0; l < 12; l++) {
    const ly = plateY + plateH * (0.24 + l * 0.048);
    ctx.beginPath();
    ctx.moveTo(plateX + plateW * 0.08, ly);
    ctx.lineTo(plateX + plateW * 0.88, ly);
    ctx.stroke();
  }

  // Technical architectural floor-plan & elevation CAD overlay lines
  ctx.strokeStyle = 'rgba(20, 20, 20, 0.55)';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 4]);
  // Dimension line top
  const dimY = plateY + plateH * 0.09;
  ctx.beginPath();
  ctx.moveTo(plateX + plateW * 0.08, dimY);
  ctx.lineTo(plateX + plateW * 0.88, dimY);
  ctx.moveTo(plateX + plateW * 0.08, dimY - 8);
  ctx.lineTo(plateX + plateW * 0.08, baseFloor);
  ctx.moveTo(plateX + plateW * 0.56, dimY - 8);
  ctx.lineTo(plateX + plateW * 0.56, plateY + plateH * 0.14);
  ctx.moveTo(plateX + plateW * 0.88, dimY - 8);
  ctx.lineTo(plateX + plateW * 0.88, baseFloor);
  ctx.stroke();
  ctx.setLineDash([]);

  // Technical CAD Labels
  ctx.fillStyle = '#141414';
  ctx.font = `600 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
  ctx.fillText('18,400 MM', plateX + plateW * 0.28, dimY - 12);
  ctx.fillText('ELEV +14.80', plateX + plateW * 0.62, dimY - 12);
  ctx.fillText('SECTION A-A // SCALE 1:100', plateX + plateW * 0.08, baseFloor + height * 0.045);

  applyEditorialGrain(ctx, plateX, plateY, plateW, plateH, 101, 0.045);
  ctx.restore();

  // Plate captions under photo across cols 2–3
  const capY = plateY + plateH + height * 0.045;
  content.cardLabels.forEach((lbl, idx) => {
    const lx = plateX + idx * (plateW / 3);
    ctx.fillStyle = palette.secondary;
    ctx.font = `500 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
    ctx.fillText(`FIG. 0${idx + 1}`, lx, capY);
    ctx.fillStyle = palette.text;
    ctx.font = `600 ${Math.round(width * 0.0115)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(lbl, lx, capY + height * 0.032);
  });
}
