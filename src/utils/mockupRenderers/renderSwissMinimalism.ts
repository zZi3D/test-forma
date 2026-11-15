import { ProjectConfig } from '../../data/projects';
import {
  applyEditorialGrain,
  drawBrowserChrome,
  drawRoundedRect,
} from './canvasPrimitives';

const PRACTICE_SUBTITLES = [
  'Entity structuring, governance & commercial contracts',
  'Cross-border acquisitions, exits & investor representation',
  'Regulatory risk audits & executive board advisory',
];

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

  // Hero Headline Row across Columns 1–2 + Editorial Index in Col 3
  const topY = headerBottom + height * 0.055;
  ctx.fillStyle = palette.secondary;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX, topY);

  const col3X = padX + (colW + colGap) * 2;
  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.022)}px "JetBrains Mono", monospace`;
  ctx.fillText(`COUNSEL / ${project.index}`, col3X + width * 0.012, topY + height * 0.014);

  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.045)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.headline, padX, topY + height * 0.088);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0125)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.subheadline, padX, topY + height * 0.152);

  // Horizontal Section Divider
  const bodyY = topY + height * 0.22;
  const bodyH = height - bodyY - height * 0.065;

  ctx.strokeStyle = 'rgba(20, 20, 20, 0.12)';
  ctx.beginPath();
  ctx.moveTo(padX, bodyY - height * 0.02);
  ctx.lineTo(width - padX, bodyY - height * 0.02);
  ctx.stroke();

  // Column 1: Senior Firm Credentials & Primary Action Button
  previewSample.metrics.forEach((metric, idx) => {
    const my = bodyY + height * (0.04 + idx * 0.145);
    ctx.fillStyle = palette.secondary;
    ctx.font = `500 ${Math.round(width * 0.009)}px "JetBrains Mono", monospace`;
    ctx.fillText(metric.label, padX + width * 0.008, my);

    ctx.fillStyle = palette.text;
    ctx.font = `600 ${Math.round(width * 0.021)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(metric.value, padX + width * 0.008, my + height * 0.046);

    ctx.strokeStyle = 'rgba(20, 20, 20, 0.12)';
    ctx.beginPath();
    ctx.moveTo(padX, my + height * 0.088);
    ctx.lineTo(padX + colW * 0.9, my + height * 0.088);
    ctx.stroke();
  });

  // High-Contrast Crisp Black Consultation CTA Button
  const btnY = bodyY + bodyH - height * 0.075;
  ctx.fillStyle = palette.text;
  drawRoundedRect(ctx, padX + width * 0.008, btnY, colW * 0.86, height * 0.066, 4);
  ctx.fill();
  ctx.fillStyle = palette.bg;
  ctx.font = `600 ${Math.round(width * 0.009)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.ctaLabel, padX + width * 0.022, btnY + height * 0.036);

  // Columns 2 & 3 Combined: Authoritative Legal & Advisory Practice Panel
  const plateX = padX + colW + colGap;
  const plateW = colW * 2 + colGap;
  const plateY = bodyY;
  const plateH = bodyH * 0.81;

  ctx.save();
  drawRoundedRect(ctx, plateX, plateY, plateW, plateH, 8);
  ctx.clip();

  // Warm stone advisory card surface
  ctx.fillStyle = '#EBE7DE';
  ctx.fillRect(plateX, plateY, plateW, plateH);
  ctx.strokeStyle = 'rgba(20, 20, 20, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(plateX + 0.75, plateY + 0.75, plateW - 1.5, plateH - 1.5);

  // Top Credential Header Bar inside Practice Panel
  const credH = plateH * 0.19;
  ctx.fillStyle = '#181816';
  ctx.fillRect(plateX, plateY, plateW, credH);

  ctx.fillStyle = '#D5CFC3';
  ctx.font = `500 ${Math.round(width * 0.0086)}px "JetBrains Mono", monospace`;
  ctx.fillText(
    'SENIOR PARTNER CREDENTIALS',
    plateX + width * 0.022,
    plateY + credH * 0.42,
  );
  ctx.fillStyle = '#F5F3EE';
  ctx.font = `600 ${Math.round(width * 0.0122)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(
    'Chambers Tier 1 Recognized · Direct Partner Access · Transparent Mandates',
    plateX + width * 0.022,
    plateY + credH * 0.76,
  );

  // 3 Clean Practice Area Rows with Swiss Divider Hairlines
  const listTop = plateY + credH + plateH * 0.04;
  const rowH = (plateH - credH - plateH * 0.08) / 3;

  previewSample.cardLabels.forEach((lbl, idx) => {
    const ry = listTop + idx * rowH;
    const rx = plateX + width * 0.022;
    const rw = plateW - width * 0.044;

    if (idx > 0) {
      ctx.strokeStyle = 'rgba(20, 20, 20, 0.12)';
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + rw, ry);
      ctx.stroke();
    }

    // Practice Index Tag
    ctx.fillStyle = palette.secondary;
    ctx.font = `600 ${Math.round(width * 0.0092)}px "JetBrains Mono", monospace`;
    ctx.fillText(`PRACTICE 0${idx + 1}`, rx, ry + rowH * 0.36);

    // Practice Title
    ctx.fillStyle = palette.text;
    ctx.font = `700 ${Math.round(width * 0.0165)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(lbl, rx + width * 0.11, ry + rowH * 0.41);

    // Concise Scope Line
    ctx.fillStyle = palette.secondary;
    ctx.font = `400 ${Math.round(width * 0.0108)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(
      PRACTICE_SUBTITLES[idx] || 'Senior advisory & counsel',
      rx + width * 0.11,
      ry + rowH * 0.74,
    );

    // Crisp Right Arrow Badge
    const pillW = width * 0.036;
    const pillH = rowH * 0.46;
    const pillX = rx + rw - pillW;
    const pillY = ry + (rowH - pillH) * 0.5;
    ctx.fillStyle = idx === 0 ? palette.text : '#F5F3EE';
    drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 4);
    ctx.fill();
    if (idx !== 0) {
      ctx.strokeStyle = 'rgba(20, 20, 20, 0.18)';
      ctx.stroke();
    }
    ctx.fillStyle = idx === 0 ? palette.bg : palette.text;
    ctx.font = `600 ${Math.round(width * 0.0115)}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('→', pillX + pillW * 0.5, pillY + pillH * 0.56);
    ctx.textAlign = 'left';
  });

  applyEditorialGrain(ctx, plateX, plateY, plateW, plateH, 101, 0.028);
  ctx.restore();

  // Clean 3-column Trust Pillars below Practice Panel
  const capY = plateY + plateH + height * 0.05;
  const bottomPillars = ['PARTNER-LED', 'FIXED RETAINER', 'CONFIDENTIAL'];
  bottomPillars.forEach((lbl, idx) => {
    const lx = plateX + idx * (plateW / 3);
    ctx.fillStyle = palette.secondary;
    ctx.font = `500 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
    ctx.fillText(`0${idx + 1}`, lx, capY);
    ctx.fillStyle = palette.text;
    ctx.font = `600 ${Math.round(width * 0.012)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(lbl, lx, capY + height * 0.033);
  });
}
