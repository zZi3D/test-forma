import { ProjectConfig } from '../../data/projects';
import { drawBrowserChrome, drawRoundedRect } from './canvasPrimitives';

function drawRotaryKnob(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  knobColor: string,
  pointerColor: string,
  angleRad: number,
  label: string,
  textColor: string,
) {
  for (let t = 0; t <= 10; t++) {
    const a = Math.PI * 0.75 + (t / 10) * Math.PI * 1.5;
    const r1 = r + 8;
    const r2 = r + (t % 5 === 0 ? 16 : 12);
    ctx.strokeStyle = t === 10 ? '#FF4D24' : 'rgba(212, 212, 216, 0.45)';
    ctx.lineWidth = t % 5 === 0 ? 2 : 1.2;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.stroke();
  }

  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 9;
  ctx.fillStyle = knobColor;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const rimGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  rimGrad.addColorStop(0, 'rgba(255,255,255,0.28)');
  rimGrad.addColorStop(0.5, 'rgba(255,255,255,0.03)');
  rimGrad.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.strokeStyle = rimGrad;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 1.5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = knobColor;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.82, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = pointerColor;
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx + Math.cos(angleRad) * (r * 0.25), cy + Math.sin(angleRad) * (r * 0.25));
  ctx.lineTo(cx + Math.cos(angleRad) * (r * 0.72), cy + Math.sin(angleRad) * (r * 0.72));
  ctx.stroke();

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.font = `600 13px "JetBrains Mono", monospace`;
  ctx.fillText(label, cx, cy + r + 32);
  ctx.textAlign = 'left';
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

  // TOP EDITORIAL HARDWARE PRODUCT HERO BAND
  const topY = headerBottom + height * 0.045;
  const contentW = width - padX * 2;
  const heroH = height * 0.32;

  // Left: Clean Technical Headline & Product Callout
  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.0098)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX, topY + 22);

  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.038)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.headline, padX, topY + 82);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0128)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.subheadline.slice(0, 62), padX, topY + 134);

  // Tactile Signal-Orange CTA Button
  const ctaY = topY + 178;
  ctx.fillStyle = palette.accent;
  drawRoundedRect(ctx, padX, ctaY, width * 0.185, 50, 25);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.ctaLabel, padX + 26, ctaY + 27);

  // Right: Technical Spec Matrix Card + Perforated Grille Accent
  const specBoxW = contentW * 0.38;
  const specBoxX = width - padX - specBoxW;
  ctx.fillStyle = '#202025';
  drawRoundedRect(ctx, specBoxX, topY, specBoxW, heroH * 0.85, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(212,212,216,0.22)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  previewSample.metrics.forEach((m, idx) => {
    const sy = topY + 34 + idx * 66;
    ctx.fillStyle = palette.secondary;
    ctx.font = `600 12px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, specBoxX + 28, sy);

    ctx.fillStyle = idx === 1 ? palette.accent : palette.text;
    ctx.font = `700 22px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.value, specBoxX + 28, sy + 28);

    // Subtle LED indicator dot on right
    ctx.fillStyle = idx === 0 ? '#22C55E' : idx === 1 ? palette.accent : 'rgba(212,212,216,0.3)';
    ctx.beginPath();
    ctx.arc(specBoxX + specBoxW - 32, sy + 14, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  // BOTTOM INTERACTIVE HARDWARE CONFIGURATOR BAY
  const bayY = topY + heroH + height * 0.025;
  const bayH = height - bayY - height * 0.06;

  ctx.fillStyle = '#1F1F24';
  drawRoundedRect(ctx, padX, bayY, contentW, bayH, 18);
  ctx.fill();
  ctx.strokeStyle = 'rgba(212,212,216,0.24)';
  ctx.lineWidth = 2;
  ctx.stroke();

  const innerPad = width * 0.022;
  const bayInnerY = bayY + innerPad;
  const bayInnerH = bayH - innerPad * 2;

  // Left: Speaker Perforation Grille
  const speakerW = contentW * 0.18;
  ctx.fillStyle = '#141417';
  drawRoundedRect(ctx, padX + innerPad, bayInnerY, speakerW, bayInnerH, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(212,212,216,0.16)';
  ctx.lineWidth = 1.25;
  ctx.stroke();

  const cols = 8;
  const rows = 8;
  const spGapX = (speakerW - 36) / (cols - 1);
  const spGapY = (bayInnerH - 36) / (rows - 1);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = '#09090B';
      ctx.beginPath();
      ctx.arc(padX + innerPad + 18 + c * spGapX, bayInnerY + 18 + r * spGapY, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Center-Right: 4 Precision Rotary Dials inside Structured Aluminum Grid
  const dialGridX = padX + innerPad + speakerW + innerPad;
  const dialGridW = contentW - innerPad * 3 - speakerW;
  const segW = dialGridW / 4;

  for (let k = 1; k < 4; k++) {
    ctx.strokeStyle = 'rgba(212,212,216,0.14)';
    ctx.beginPath();
    ctx.moveTo(dialGridX + k * segW, bayInnerY + 12);
    ctx.lineTo(dialGridX + k * segW, bayInnerY + bayInnerH - 12);
    ctx.stroke();
  }

  const knobConfigs = [
    { color: '#111113', pointer: '#FAFAFA', angle: -Math.PI * 0.65 },
    { color: '#FAFAFA', pointer: '#18181B', angle: -Math.PI * 0.25 },
    { color: '#FF4D24', pointer: '#FAFAFA', angle: Math.PI * 0.15 },
    { color: '#D4D4D8', pointer: '#FF4D24', angle: -Math.PI * 0.45 },
  ];

  knobConfigs.forEach((cfg, idx) => {
    const cx = dialGridX + segW * (idx + 0.5);
    const cy = bayInnerY + bayInnerH * 0.45;
    drawRotaryKnob(
      ctx,
      cx,
      cy,
      Math.min(segW, bayInnerH) * 0.24,
      cfg.color,
      cfg.pointer,
      cfg.angle,
      previewSample.cardLabels[idx] || `CTRL 0${idx + 1}`,
      palette.surface,
    );
  });
}
