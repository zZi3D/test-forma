import { ProjectConfig } from '../../data/projects';
import {
  drawBrowserChrome,
  drawRoundedRect,
  drawWrappedText,
} from './canvasPrimitives';

function drawBrakeRotorGraphic(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  crimson: string,
) {
  // Outer ventilated steel disc ring
  const rotorGrad = ctx.createRadialGradient(
    cx - radius * 0.25,
    cy - radius * 0.25,
    radius * 0.15,
    cx,
    cy,
    radius,
  );
  rotorGrad.addColorStop(0, '#E4E4E7');
  rotorGrad.addColorStop(0.55, '#9CA3AF');
  rotorGrad.addColorStop(1, '#52525B');

  ctx.fillStyle = rotorGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Concentric machine turning grooves
  ctx.strokeStyle = 'rgba(24, 24, 27, 0.28)';
  ctx.lineWidth = 1.2;
  [0.92, 0.78, 0.62].forEach((rMul) => {
    ctx.beginPath();
    ctx.arc(cx, cy, radius * rMul, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Cross-drilled ceramic cooling holes
  ctx.fillStyle = '#18181B';
  for (let spoke = 0; spoke < 12; spoke++) {
    const baseAngle = (spoke / 12) * Math.PI * 2;
    for (let ring = 0; ring < 3; ring++) {
      const a = baseAngle + ring * 0.08;
      const dist = radius * (0.58 + ring * 0.13);
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * dist, cy + Math.sin(a) * dist, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Dark anodized center hat & 5 lug bolts
  ctx.fillStyle = '#27272A';
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.42, 0, Math.PI * 2);
  ctx.fill();

  for (let bolt = 0; bolt < 5; bolt++) {
    const ba = (bolt / 5) * Math.PI * 2 - Math.PI * 0.5;
    ctx.fillStyle = '#D4D4D8';
    ctx.beginPath();
    ctx.arc(
      cx + Math.cos(ba) * (radius * 0.27),
      cy + Math.sin(ba) * (radius * 0.27),
      5.5,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  ctx.fillStyle = '#141416';
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.14, 0, Math.PI * 2);
  ctx.fill();

  // Crimson 6-piston Performance Brake Caliper hugging top-right quadrant
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.07, -Math.PI * 0.38, Math.PI * 0.14);
  ctx.arc(cx, cy, radius * 0.66, Math.PI * 0.14, -Math.PI * 0.38, true);
  ctx.closePath();
  ctx.fillStyle = crimson;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

export function renderSkeuomorphism(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;
  const boneBg = palette.bg; // #F3ECE1
  const cardWhite = palette.surface; // #FFFFFF
  const ink = palette.text; // #1C1C1C
  const crimson = palette.accent; // #B8291E
  const muted = palette.secondary; // #6E6961

  // Warm Bone Workshop Canvas (#F3ECE1)
  ctx.fillStyle = boneBg;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#E8DFD1',
    borderAlpha: 0.12,
    navItemsColor: muted,
  });

  const topY = headerBottom + height * 0.045;
  const contentW = width - padX * 2;
  const gap = width * 0.028;
  const leftW = contentW * 0.47;
  const rightW = contentW - leftW - gap;
  const rightX = padX + leftW + gap;
  const totalH = height - topY - height * 0.06;

  // =========================================================================
  // LEFT COLUMN: Workshop Hero + Perforated Brake Rotor Visual Frame
  // =========================================================================
  ctx.fillStyle = 'rgba(28, 28, 28, 0.07)';
  const pillW = width * 0.235;
  const pillH = 32;
  drawRoundedRect(ctx, padX, topY, pillW, pillH, 16);
  ctx.fill();

  ctx.fillStyle = crimson;
  ctx.beginPath();
  ctx.arc(padX + 16, topY + pillH * 0.5, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = ink;
  ctx.font = `600 ${Math.round(width * 0.0082)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX + 28, topY + pillH * 0.53);

  ctx.fillStyle = ink;
  ctx.font = `800 ${Math.round(width * 0.038)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Repairs & MOT,', padX, topY + 94);
  ctx.fillText('done to spec.', padX, topY + 150);

  ctx.fillStyle = muted;
  ctx.font = `400 ${Math.round(width * 0.0122)}px "Plus Jakarta Sans", sans-serif`;
  drawWrappedText(
    ctx,
    previewSample.subheadline,
    padX,
    topY + 196,
    leftW - 16,
    height * 0.026,
    2,
  );

  // Lower-left Workshop Brake Rotor Card
  const rotorCardY = topY + 278;
  const rotorCardH = totalH - 278;
  ctx.save();
  ctx.shadowColor = 'rgba(28, 28, 28, 0.18)';
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 14;
  ctx.fillStyle = '#141416';
  drawRoundedRect(ctx, padX, rotorCardY, leftW, rotorCardH, 22);
  ctx.fill();
  ctx.restore();

  // Subtle dark workshop grid lines inside rotor card
  ctx.save();
  drawRoundedRect(ctx, padX, rotorCardY, leftW, rotorCardH, 22);
  ctx.clip();

  const bayGlow = ctx.createRadialGradient(
    padX + leftW * 0.72,
    rotorCardY + rotorCardH * 0.48,
    10,
    padX + leftW * 0.72,
    rotorCardY + rotorCardH * 0.48,
    leftW * 0.48,
  );
  bayGlow.addColorStop(0, 'rgba(184, 41, 30, 0.25)');
  bayGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = bayGlow;
  ctx.fillRect(padX, rotorCardY, leftW, rotorCardH);

  drawBrakeRotorGraphic(
    ctx,
    padX + leftW * 0.72,
    rotorCardY + rotorCardH * 0.52,
    rotorCardH * 0.37,
    crimson,
  );

  // Technical spec overlay text on left side of brake card
  ctx.fillStyle = '#F3ECE1';
  ctx.font = `700 ${Math.round(width * 0.0088)}px "JetBrains Mono", monospace`;
  ctx.fillText('BAY 02 // BRAKES & CHASSIS', padX + 26, rotorCardY + 42);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.0175)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Factory Calibration', padX + 26, rotorCardY + rotorCardH * 0.48);

  ctx.fillStyle = 'rgba(243, 236, 225, 0.65)';
  ctx.font = `400 ${Math.round(width * 0.0102)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('OEM diagnostics, MOT & brakes', padX + 26, rotorCardY + rotorCardH * 0.62);

  ctx.fillStyle = '#22C55E';
  ctx.beginPath();
  ctx.arc(padX + 32, rotorCardY + rotorCardH - 34, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#F3ECE1';
  ctx.font = `600 ${Math.round(width * 0.0086)}px "JetBrains Mono", monospace`;
  ctx.fillText('4.9★ GOOGLE · 214 REVIEWS', padX + 46, rotorCardY + rotorCardH - 33);

  ctx.restore();

  // =========================================================================
  // RIGHT COLUMN: LIVE DUTCH RDW LICENSE PLATE & MOT CONSOLE CARD
  // =========================================================================
  ctx.save();
  ctx.shadowColor = 'rgba(28, 28, 28, 0.10)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetY = 14;
  ctx.fillStyle = cardWhite;
  drawRoundedRect(ctx, rightX, topY, rightW, totalH, 24);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = 'rgba(28, 28, 28, 0.1)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const cPad = 32;
  const ix = rightX + cPad;
  const iw = rightW - cPad * 2;

  // Card header + Live RDW Open Data pill
  ctx.fillStyle = ink;
  ctx.font = `700 ${Math.round(width * 0.0148)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Live RDW Vehicle Check', ix, topY + 42);

  const liveBadgeW = 148;
  ctx.fillStyle = 'rgba(22, 163, 74, 0.12)';
  drawRoundedRect(ctx, ix + iw - liveBadgeW, topY + 26, liveBadgeW, 28, 14);
  ctx.fill();
  ctx.fillStyle = '#16A34A';
  ctx.beginPath();
  ctx.arc(ix + iw - liveBadgeW + 16, topY + 40, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = `700 ${Math.round(width * 0.0076)}px "JetBrains Mono", monospace`;
  ctx.fillText('LIVE RDW DATA', ix + iw - liveBadgeW + 26, topY + 41);

  // Realistic Dutch Yellow License Plate Input + Crimson Lookup Button
  const plateY = topY + 76;
  const plateH = 66;
  const btnW = 166;
  const plateW = iw - btnW - 14;

  // Plate Frame
  ctx.fillStyle = '#F7C600';
  drawRoundedRect(ctx, ix, plateY, plateW, plateH, 10);
  ctx.fill();
  ctx.strokeStyle = '#1C1C1C';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Blue EU "NL" side band
  ctx.save();
  drawRoundedRect(ctx, ix, plateY, plateW, plateH, 10);
  ctx.clip();
  ctx.fillStyle = '#003399';
  ctx.fillRect(ix, plateY, 44, plateH);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `800 ${Math.round(width * 0.0096)}px "Plus Jakarta Sans", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('NL', ix + 22, plateY + plateH * 0.66);
  // Subtle EU stars dot ring
  ctx.fillStyle = '#F7C600';
  for (let s = 0; s < 6; s++) {
    const sa = (s / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(ix + 22 + Math.cos(sa) * 9, plateY + 19 + Math.sin(sa) * 9, 1.3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Bold Dutch Plate Characters: KXT-67-P
  ctx.fillStyle = '#111111';
  ctx.font = `800 ${Math.round(width * 0.022)}px "JetBrains Mono", monospace`;
  ctx.fillText('KXT-67-P', ix + 44 + (plateW - 44) * 0.5, plateY + plateH * 0.54);
  ctx.textAlign = 'left';
  ctx.restore();

  // Crimson Lookup Button beside plate
  ctx.fillStyle = crimson;
  drawRoundedRect(ctx, ix + plateW + 14, plateY, btnW, plateH, 10);
  ctx.fill();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.01)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Lookup Plate', ix + plateW + 14 + btnW * 0.5, plateY + plateH * 0.52);
  ctx.textAlign = 'left';

  // Quick Test Plate Chips
  let tx = ix;
  const chipY = plateY + plateH + 18;
  previewSample.cardLabels.forEach((p, idx) => {
    const isAct = idx === 0;
    ctx.font = `600 ${Math.round(width * 0.0082)}px "JetBrains Mono", monospace`;
    const pw = ctx.measureText(p).width + 24;
    ctx.fillStyle = isAct ? '#1C1C1C' : '#F3ECE1';
    drawRoundedRect(ctx, tx, chipY, pw, 28, 14);
    ctx.fill();
    ctx.fillStyle = isAct ? '#FFFFFF' : ink;
    ctx.fillText(p, tx + 12, chipY + 15);
    tx += pw + 8;
  });

  // 2x2 RDW Vehicle Spec & MOT Telemetry Cards
  const gridY = chipY + 46;
  const gridGap = 14;
  const cellW = (iw - gridGap) / 2;
  const cellH = 88;
  const rdwCells = [
    { label: 'MAKE & MODEL', value: 'AUDI A5 AVANT', accent: false },
    { label: 'MOT EXPIRY', value: '01-10-2030', accent: true },
    { label: 'POWERTRAIN', value: 'HYBRID · BLUE', accent: false },
    { label: 'OPEN RECALL', value: 'NONE · CLEAR', accent: false },
  ];

  rdwCells.forEach((cell, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cx = ix + col * (cellW + gridGap);
    const cy = gridY + row * (cellH + gridGap);

    ctx.fillStyle = '#F7F3EC';
    drawRoundedRect(ctx, cx, cy, cellW, cellH, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(28, 28, 28, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = muted;
    ctx.font = `600 ${Math.round(width * 0.0078)}px "JetBrains Mono", monospace`;
    ctx.fillText(cell.label, cx + 18, cy + 28);

    ctx.fillStyle = cell.accent ? '#15803D' : ink;
    ctx.font = `700 ${Math.round(width * 0.0128)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(cell.value, cx + 18, cy + 58);
  });

  // Bottom Full-Width Crimson Booking CTA
  const bookY = topY + totalH - 74;
  ctx.fillStyle = crimson;
  drawRoundedRect(ctx, ix, bookY, iw, 48, 24);
  ctx.fill();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.0098)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, ix + iw * 0.5, bookY + 25);
  ctx.textAlign = 'left';
}
