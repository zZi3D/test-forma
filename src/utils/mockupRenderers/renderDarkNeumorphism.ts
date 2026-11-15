import { ProjectConfig } from '../../data/projects';
import {
  applyEditorialGrain,
  drawBrowserChrome,
  drawRoundedRect,
} from './canvasPrimitives';

function drawNeumorphicSurface(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  surface: string,
  recessed = false,
) {
  ctx.save();
  ctx.shadowColor = recessed ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.85)';
  ctx.shadowBlur = recessed ? 6 : 18;
  ctx.shadowOffsetX = recessed ? -3 : 6;
  ctx.shadowOffsetY = recessed ? -3 : 7;
  ctx.fillStyle = surface;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();

  ctx.shadowColor = recessed ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.07)';
  ctx.shadowBlur = recessed ? 8 : 14;
  ctx.shadowOffsetX = recessed ? 4 : -5;
  ctx.shadowOffsetY = recessed ? 4 : -5;
  ctx.fillStyle = surface;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = recessed
    ? 'rgba(0, 0, 0, 0.55)'
    : 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.25;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.stroke();
  ctx.restore();
}

export function renderDarkNeumorphism(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;

  // Deep matte black canvas (#0C0C0C)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Warm studio spotlight glow behind booking showcase
  const glow = ctx.createRadialGradient(
    width * 0.65,
    height * 0.42,
    width * 0.03,
    width * 0.65,
    height * 0.42,
    width * 0.48,
  );
  glow.addColorStop(0, 'rgba(217, 138, 43, 0.22)');
  glow.addColorStop(0.55, 'rgba(217, 138, 43, 0.05)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#121212',
    borderAlpha: 0.08,
    navItemsColor: palette.secondary,
  });

  // HERO HEADER: 4.9★ Review Badge + Editorial Serif Title + Book Appointment CTA
  const heroY = headerBottom + height * 0.045;
  const contentW = width - padX * 2;

  // 4.9★ Google Review Badge Pill
  const badgeW = width * 0.275;
  const badgeH = height * 0.05;
  drawNeumorphicSurface(ctx, padX, heroY, badgeW, badgeH, 24, '#161310', true);
  ctx.strokeStyle = 'rgba(217, 138, 43, 0.48)';
  ctx.lineWidth = 1.25;
  drawRoundedRect(ctx, padX, heroY, badgeW, badgeH, 24);
  ctx.stroke();

  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.0092)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX + width * 0.016, heroY + badgeH * 0.56);

  // Hero Headline & Subheadline
  ctx.fillStyle = palette.text;
  ctx.font = `500 ${Math.round(width * 0.047)}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillText(previewSample.headline, padX, heroY + height * 0.13);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0124)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.subheadline, padX, heroY + height * 0.19);

  // Right-aligned Primary "BOOK APPOINTMENT →" Pill
  const ctaW = width * 0.21;
  const ctaH = height * 0.076;
  const ctaX = width - padX - ctaW;
  const ctaY = heroY + height * 0.085;
  drawNeumorphicSurface(ctx, ctaX, ctaY, ctaW, ctaH, 38, '#1B1610', false);
  ctx.strokeStyle = 'rgba(217, 138, 43, 0.65)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, ctaX, ctaY, ctaW, ctaH, 38);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.0102)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.ctaLabel, ctaX + ctaW * 0.5, ctaY + ctaH * 0.55);
  ctx.textAlign = 'left';

  // MAIN BODY SPLIT: Left (3 Service Category Pills + Menu Price List) | Right (Salon Availability Card)
  const bodyY = heroY + height * 0.245;
  const bodyH = height - bodyY - height * 0.06;
  const gap = width * 0.025;
  const leftW = contentW * 0.59;
  const rightW = contentW - leftW - gap;
  const rightX = padX + leftW + gap;

  // 3 Service Category Cards across top of Left Column
  const catGap = width * 0.014;
  const catW = (leftW - catGap * 2) / 3;
  const catH = bodyH * 0.21;
  previewSample.cardLabels.forEach((lbl, idx) => {
    const cx = padX + idx * (catW + catGap);
    const active = idx === 0;
    drawNeumorphicSurface(ctx, cx, bodyY, catW, catH, 14, palette.surface, active);

    ctx.fillStyle = active ? palette.accent : palette.secondary;
    ctx.beginPath();
    ctx.arc(cx + width * 0.018, bodyY + catH * 0.5, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = active ? palette.text : palette.secondary;
    ctx.font = `600 ${Math.round(width * 0.0098)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(lbl, cx + width * 0.03, bodyY + catH * 0.54);
  });

  // Compact Luxury Price List Panel below category pills
  const listY = bodyY + catH + height * 0.026;
  const listH = bodyH - catH - height * 0.026;
  drawNeumorphicSurface(ctx, padX, listY, leftW, listH, 20, '#131313', false);

  const rowH = (listH - height * 0.04) / previewSample.metrics.length;
  previewSample.metrics.forEach((m, idx) => {
    const ry = listY + height * 0.02 + idx * rowH;
    const rx = padX + width * 0.024;
    const rw = leftW - width * 0.048;

    if (idx > 0) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + rw, ry);
      ctx.stroke();
    }

    // Service Name & Duration
    ctx.fillStyle = idx === 0 ? palette.text : '#D6D1C7';
    ctx.font = `600 ${Math.round(width * 0.0115)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.label, rx, ry + rowH * 0.54);

    // Price Tag Pill
    ctx.textAlign = 'right';
    ctx.fillStyle = palette.accent;
    ctx.font = `700 ${Math.round(width * 0.016)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.value, rx + rw, ry + rowH * 0.56);
    ctx.textAlign = 'left';
  });

  // RIGHT COLUMN: Private Salon Suite & Instant Chair Availability Card
  drawNeumorphicSurface(ctx, rightX, bodyY, rightW, bodyH, 24, '#141414', false);

  // Recessed warm amber illuminated frame at top of right card
  const framePad = width * 0.02;
  const frameX = rightX + framePad;
  const frameY = bodyY + framePad;
  const frameW = rightW - framePad * 2;
  const frameH = bodyH * 0.44;
  drawNeumorphicSurface(ctx, frameX, frameY, frameW, frameH, 16, '#0E0D0B', true);

  // Warm ambient studio light inside recessed frame
  const studioGlow = ctx.createRadialGradient(
    frameX + frameW * 0.5,
    frameY + frameH * 0.45,
    10,
    frameX + frameW * 0.5,
    frameY + frameH * 0.5,
    frameW * 0.55,
  );
  studioGlow.addColorStop(0, 'rgba(217, 138, 43, 0.25)');
  studioGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = studioGlow;
  ctx.fillRect(frameX, frameY, frameW, frameH);

  // Architectural Arched Salon Mirror Motif inside studio frame
  const archW = frameW * 0.28;
  const archH = frameH * 0.62;
  const archX = frameX + (frameW - archW) * 0.5;
  const archY = frameY + (frameH - archH) * 0.5;
  ctx.strokeStyle = 'rgba(217, 138, 43, 0.65)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, archX, archY, archW, archH, archW * 0.5);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
  ctx.fillText('PRIVATE SUITE', frameX + frameW * 0.5, archY + archH * 0.54);
  ctx.textAlign = 'left';

  // Availability Timeslots below frame
  const slotTitleY = frameY + frameH + height * 0.05;
  ctx.fillStyle = palette.secondary;
  ctx.font = `600 ${Math.round(width * 0.0088)}px "JetBrains Mono", monospace`;
  ctx.fillText('NEXT AVAILABLE TODAY', frameX, slotTitleY);

  const times = ['14:30', '16:00', '17:45'];
  const slotGap = width * 0.01;
  const slotW = (frameW - slotGap * 2) / 3;
  const slotH = height * 0.056;
  const slotY = slotTitleY + height * 0.025;
  times.forEach((time, idx) => {
    const sx = frameX + idx * (slotW + slotGap);
    const isPicked = idx === 1;
    drawNeumorphicSurface(
      ctx,
      sx,
      slotY,
      slotW,
      slotH,
      10,
      isPicked ? '#241B11' : '#181818',
      !isPicked,
    );
    if (isPicked) {
      ctx.strokeStyle = 'rgba(217, 138, 43, 0.55)';
      ctx.lineWidth = 1.25;
      drawRoundedRect(ctx, sx, slotY, slotW, slotH, 10);
      ctx.stroke();
    }
    ctx.textAlign = 'center';
    ctx.fillStyle = isPicked ? palette.accent : palette.text;
    ctx.font = `600 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
    ctx.fillText(time, sx + slotW * 0.5, slotY + slotH * 0.57);
    ctx.textAlign = 'left';
  });

  // Footer guarantee note
  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0095)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(
    'Instant SMS confirmation · No prepayment needed',
    frameX,
    bodyY + bodyH - height * 0.032,
  );

  applyEditorialGrain(ctx, 0, headerBottom, width, height - headerBottom, 202, 0.03);
}
