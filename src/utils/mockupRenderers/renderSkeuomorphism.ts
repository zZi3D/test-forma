import { ProjectConfig } from '../../data/projects';
import { drawBrowserChrome, drawRoundedRect } from './canvasPrimitives';

function drawMachinedDial(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  angleRad: number,
) {
  // Subtle dial calibration ticks
  for (let t = 0; t <= 12; t++) {
    const a = Math.PI * 0.75 + (t / 12) * Math.PI * 1.5;
    const r1 = r + 9;
    const r2 = r + (t % 4 === 0 ? 17 : 13);
    ctx.strokeStyle = t === 12 ? '#FF4D24' : 'rgba(24, 24, 27, 0.42)';
    ctx.lineWidth = t % 4 === 0 ? 2 : 1.2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.stroke();
  }

  // Dial machined recess & shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.38)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 7;
  const knobGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  knobGrad.addColorStop(0, '#F4F4F5');
  knobGrad.addColorStop(0.5, '#D4D4D8');
  knobGrad.addColorStop(1, '#8E8E98');
  ctx.fillStyle = knobGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Inner concentric chamfer ring
  ctx.strokeStyle = 'rgba(24, 24, 27, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.82, 0, Math.PI * 2);
  ctx.stroke();

  // Signal-orange indicator groove
  ctx.strokeStyle = '#FF4D24';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx + Math.cos(angleRad) * (r * 0.28), cy + Math.sin(angleRad) * (r * 0.28));
  ctx.lineTo(cx + Math.cos(angleRad) * (r * 0.72), cy + Math.sin(angleRad) * (r * 0.72));
  ctx.stroke();
}

export function renderSkeuomorphism(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;

  // Anodized matte black canvas (#18181B)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#121215',
    borderAlpha: 0.14,
    navItemsColor: palette.surface,
  });

  const topY = headerBottom + height * 0.055;
  const contentW = width - padX * 2;
  const totalH = height - topY - height * 0.07;

  // =========================================================================
  // LEFT EDITORIAL & MATERIAL CALLOUT COLUMN (~43% width)
  // =========================================================================
  const leftW = contentW * 0.43;

  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX, topY + 24);

  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.039)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Built with', padX, topY + 90);
  ctx.fillText('Tactile Honesty.', padX, topY + 158);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0124)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Milled aluminum, honest materials, and flagship', padX, topY + 216);
  ctx.fillText('product storytelling engineered for makers.', padX, topY + 244);

  // 3 Clean Material Craftsmanship Callout Pills
  const badges = [
    { label: 'MILLED ALUMINUM', active: true },
    { label: 'HAND-ASSEMBLED', active: false },
    { label: '5-YR WARRANTY', active: false },
  ];
  const badgeY = topY + 292;
  let bx = padX;
  badges.forEach((b) => {
    ctx.font = `600 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
    const bw = ctx.measureText(b.label).width + 30;
    ctx.fillStyle = '#222227';
    drawRoundedRect(ctx, bx, badgeY, bw, 38, 8);
    ctx.fill();
    ctx.strokeStyle = b.active ? 'rgba(255, 77, 36, 0.55)' : 'rgba(212, 212, 216, 0.2)';
    ctx.lineWidth = 1.25;
    ctx.stroke();

    ctx.fillStyle = b.active ? '#FAFAFA' : palette.surface;
    ctx.fillText(b.label, bx + 15, badgeY + 20);
    bx += bw + 12;
  });

  // Tactile Signal-Orange CTA Button + Price Note
  const ctaY = topY + totalH - 86;
  const ctaW = width * 0.195;
  ctx.save();
  ctx.shadowColor = 'rgba(255, 77, 36, 0.35)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = palette.accent;
  drawRoundedRect(ctx, padX, ctaY, ctaW, 56, 28);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.0098)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.ctaLabel, padX + 26, ctaY + 29);

  // Subtle edition & price tag right of CTA
  ctx.fillStyle = palette.secondary;
  ctx.font = `600 ${Math.round(width * 0.0092)}px "JetBrains Mono", monospace`;
  ctx.fillText('M-01 UNIT · FROM €490', padX + ctaW + 24, ctaY + 29);

  // =========================================================================
  // RIGHT SHOWCASE STAGE: Dieter Rams / Teenage Engineering Physical Product
  // =========================================================================
  const stageX = padX + leftW + width * 0.03;
  const stageW = contentW - leftW - width * 0.03;
  const stageH = totalH;

  // Matte precision display stage card
  ctx.fillStyle = '#1E1E23';
  drawRoundedRect(ctx, stageX, topY, stageW, stageH, 22);
  ctx.fill();
  ctx.strokeStyle = 'rgba(212, 212, 216, 0.18)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Subtle architectural grid lines inside showcase stage
  ctx.strokeStyle = 'rgba(212, 212, 216, 0.05)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(stageX + stageW * 0.5, topY + 24);
  ctx.lineTo(stageX + stageW * 0.5, topY + stageH - 24);
  ctx.moveTo(stageX + 24, topY + stageH * 0.5);
  ctx.lineTo(stageX + stageW - 24, topY + stageH * 0.5);
  ctx.stroke();

  // Top stage engineering telemetry header
  ctx.fillStyle = palette.secondary;
  ctx.font = `600 ${Math.round(width * 0.0084)}px "JetBrains Mono", monospace`;
  ctx.fillText('SERIES 01 // ACOUSTIC MONITOR', stageX + 32, topY + 34);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#D4D4D8';
  ctx.fillText('ANODIZED AL-6061', stageX + stageW - 32, topY + 34);
  ctx.textAlign = 'left';

  // Soft studio pedestal shadow under hardware unit
  const hwW = stageW * 0.80;
  const hwH = stageH * 0.56;
  const hwX = stageX + (stageW - hwW) * 0.5;
  const hwY = topY + (stageH - hwH) * 0.5 + 8;

  // Rubber elastomer isolation feet under chassis
  ctx.fillStyle = '#09090B';
  drawRoundedRect(ctx, hwX + 42, hwY + hwH - 2, 42, 12, 4);
  ctx.fill();
  drawRoundedRect(ctx, hwX + hwW - 84, hwY + hwH - 2, 42, 12, 4);
  ctx.fill();

  // Milled Brushed Aluminum Enclosure Body
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.72)';
  ctx.shadowBlur = 42;
  ctx.shadowOffsetY = 24;
  const metalGrad = ctx.createLinearGradient(hwX, hwY, hwX + hwW, hwY + hwH);
  metalGrad.addColorStop(0, '#E4E4E7');
  metalGrad.addColorStop(0.45, '#D4D4D8');
  metalGrad.addColorStop(1, '#A1A1AA');
  ctx.fillStyle = metalGrad;
  drawRoundedRect(ctx, hwX, hwY, hwW, hwH, 24);
  ctx.fill();
  ctx.restore();

  // Crisp machined bevel highlight along top edge of chassis
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, hwX + 2, hwY + 2, hwW - 4, hwH - 4, 22);
  ctx.stroke();

  // Left 62% of hardware face: Recessed Matte Charcoal Acoustic Grille
  const innerPad = 24;
  const grilleW = hwW * 0.60;
  const grilleH = hwH - innerPad * 2;
  const grilleX = hwX + innerPad;
  const grilleY = hwY + innerPad;

  ctx.fillStyle = '#18181B';
  drawRoundedRect(ctx, grilleX, grilleY, grilleW, grilleH, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(24, 24, 27, 0.45)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Precision circular acoustic perforation grid inside speaker grille
  const cols = 12;
  const rows = 9;
  const dotGapX = (grilleW - 44) / (cols - 1);
  const dotGapY = (grilleH - 44) / (rows - 1);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = '#09090B';
      ctx.beginPath();
      ctx.arc(grilleX + 22 + c * dotGapX, grilleY + 22 + r * dotGapY, 4.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Right 35% of hardware face: Control Bay with Machined Dial, Warm LED & Switch
  const ctrlX = grilleX + grilleW + 24;
  const ctrlW = hwX + hwW - innerPad - ctrlX;
  const ctrlCenterX = ctrlX + ctrlW * 0.5;

  // Vertical machined hairline seam separating grille & controls
  ctx.strokeStyle = 'rgba(24, 24, 27, 0.16)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(ctrlX - 12, grilleY + 8);
  ctx.lineTo(ctrlX - 12, grilleY + grilleH - 8);
  ctx.stroke();

  // Top Control Status Row: Engraved Model Code + Warm Signal-Orange Status LED
  ctx.fillStyle = '#27272A';
  ctx.font = `700 ${Math.round(width * 0.0082)}px "JetBrains Mono", monospace`;
  ctx.fillText('M-01', ctrlX + 6, grilleY + 22);

  // Glowing Status LED
  const ledX = ctrlX + ctrlW - 14;
  const ledY = grilleY + 21;
  ctx.save();
  ctx.shadowColor = 'rgba(255, 77, 36, 0.85)';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#FF4D24';
  ctx.beginPath();
  ctx.arc(ledX, ledY, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Precision Machined Volume Dial
  const dialR = Math.min(ctrlW * 0.34, grilleH * 0.25);
  const dialCY = grilleY + grilleH * 0.52;
  drawMachinedDial(ctx, ctrlCenterX, dialCY, dialR, -Math.PI * 0.28);

  // Minimalist tactile rocker switch bottom of control panel
  const swW = 46;
  const swH = 18;
  const swX = ctrlCenterX - swW * 0.5;
  const swY = grilleY + grilleH - 28;
  ctx.fillStyle = '#27272A';
  drawRoundedRect(ctx, swX, swY, swW, swH, 9);
  ctx.fill();
  ctx.fillStyle = '#FF4D24';
  drawRoundedRect(ctx, swX + swW - 20, swY + 3, 16, swH - 6, 6);
  ctx.fill();

  // Subtle dimension & craftsmanship footer inside showcase stage
  ctx.fillStyle = palette.secondary;
  ctx.font = `500 ${Math.round(width * 0.008)}px "JetBrains Mono", monospace`;
  ctx.fillText('220 × 140 × 115 MM', stageX + 32, topY + stageH - 28);
  ctx.textAlign = 'right';
  ctx.fillStyle = palette.accent;
  ctx.fillText('ZERO-RESONANCE ENCLOSURE', stageX + stageW - 32, topY + stageH - 28);
  ctx.textAlign = 'left';
}
