import { ProjectConfig } from '../../data/projects';
import {
  applyEditorialGrain,
  drawBrowserChrome,
  drawRoundedRect,
} from './canvasPrimitives';

function drawNeumorphicPill(
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
  // Bottom-right dark shadow
  ctx.shadowColor = recessed ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.85)';
  ctx.shadowBlur = recessed ? 6 : 18;
  ctx.shadowOffsetX = recessed ? -3 : 6;
  ctx.shadowOffsetY = recessed ? -3 : 7;
  ctx.fillStyle = surface;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();

  // Top-left soft tactile light highlight
  ctx.shadowColor = recessed ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.08)';
  ctx.shadowBlur = recessed ? 8 : 14;
  ctx.shadowOffsetX = recessed ? 4 : -5;
  ctx.shadowOffsetY = recessed ? 4 : -5;
  ctx.fillStyle = surface;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.restore();

  // Crisp subtle edge rim
  ctx.save();
  ctx.strokeStyle = recessed
    ? 'rgba(0, 0, 0, 0.55)'
    : 'rgba(255, 255, 255, 0.07)';
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

  // Subtle ambient warm amber bloom behind watch dial
  const glow = ctx.createRadialGradient(
    width * 0.5,
    height * 0.62,
    width * 0.02,
    width * 0.5,
    height * 0.62,
    width * 0.42,
  );
  glow.addColorStop(0, 'rgba(217, 138, 43, 0.24)');
  glow.addColorStop(0.55, 'rgba(217, 138, 43, 0.06)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#121212',
    borderAlpha: 0.08,
    navItemsColor: palette.secondary,
  });

  // Centered Editorial Serif Typography with rich dark negative space
  const centerX = width * 0.5;
  ctx.textAlign = 'center';

  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, centerX, headerBottom + height * 0.068);

  ctx.fillStyle = palette.text;
  ctx.font = `500 ${Math.round(width * 0.05)}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillText(previewSample.headline, centerX, headerBottom + height * 0.145);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0125)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.subheadline, centerX, headerBottom + height * 0.205);

  // Tactile Neumorphic Macro Watch Visual in Center
  const dialX = centerX;
  const dialY = height * 0.61;
  const dialR = height * 0.23;

  // Recessed outer bezel shadow ring
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.92)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetX = 14;
  ctx.shadowOffsetY = 16;
  ctx.fillStyle = palette.surface;
  ctx.beginPath();
  ctx.arc(dialX, dialY, dialR + 22, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowColor = 'rgba(255,255,255,0.06)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetX = -10;
  ctx.shadowOffsetY = -10;
  ctx.beginPath();
  ctx.arc(dialX, dialY, dialR + 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Brushed bezel ring
  const bezelGrad = ctx.createLinearGradient(
    dialX - dialR,
    dialY - dialR,
    dialX + dialR,
    dialY + dialR,
  );
  bezelGrad.addColorStop(0, '#2B2926');
  bezelGrad.addColorStop(0.5, '#171717');
  bezelGrad.addColorStop(1, '#090909');
  ctx.fillStyle = bezelGrad;
  ctx.beginPath();
  ctx.arc(dialX, dialY, dialR, 0, Math.PI * 2);
  ctx.fill();

  // Inner dial face with warm amber edge reflection
  const dialGrad = ctx.createRadialGradient(
    dialX - dialR * 0.2,
    dialY - dialR * 0.2,
    dialR * 0.05,
    dialX,
    dialY,
    dialR * 0.88,
  );
  dialGrad.addColorStop(0, '#221D17');
  dialGrad.addColorStop(0.65, '#111111');
  dialGrad.addColorStop(1, '#070707');
  ctx.fillStyle = dialGrad;
  ctx.beginPath();
  ctx.arc(dialX, dialY, dialR * 0.86, 0, Math.PI * 2);
  ctx.fill();

  // 60 Precision dial ticks & 12 amber indices
  for (let t = 0; t < 60; t++) {
    const ang = (t / 60) * Math.PI * 2 - Math.PI / 2;
    const isHour = t % 5 === 0;
    const r1 = dialR * (isHour ? 0.72 : 0.78);
    const r2 = dialR * 0.82;
    ctx.strokeStyle = isHour ? palette.accent : 'rgba(245, 242, 235, 0.25)';
    ctx.lineWidth = isHour ? 2.5 : 1;
    ctx.beginPath();
    ctx.moveTo(dialX + Math.cos(ang) * r1, dialY + Math.sin(ang) * r1);
    ctx.lineTo(dialX + Math.cos(ang) * r2, dialY + Math.sin(ang) * r2);
    ctx.stroke();
  }

  // Open tourbillon cage ring at 6 o'clock
  const tourY = dialY + dialR * 0.34;
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(dialX, tourY, dialR * 0.22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(dialX - dialR * 0.22, tourY);
  ctx.lineTo(dialX + dialR * 0.22, tourY);
  ctx.moveTo(dialX, tourY - dialR * 0.22);
  ctx.lineTo(dialX, tourY + dialR * 0.22);
  ctx.stroke();

  // Hands (10:10 classic horology angle)
  ctx.strokeStyle = palette.text;
  ctx.lineCap = 'round';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(dialX, dialY);
  ctx.lineTo(dialX - dialR * 0.42, dialY - dialR * 0.25);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(dialX, dialY);
  ctx.lineTo(dialX + dialR * 0.56, dialY - dialR * 0.32);
  ctx.stroke();

  // Center jewel cap
  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.arc(dialX, dialY, 6, 0, Math.PI * 2);
  ctx.fill();

  // Left Tactile Neumorphic Spec Cards (recessed + raised)
  ctx.textAlign = 'left';
  previewSample.metrics.forEach((m, idx) => {
    const cardW = width * 0.19;
    const cardH = height * 0.11;
    const cardX = padX;
    const cardY = height * (0.44 + idx * 0.145);
    drawNeumorphicPill(ctx, cardX, cardY, cardW, cardH, 16, palette.surface, idx === 1);

    ctx.fillStyle = palette.secondary;
    ctx.font = `500 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, cardX + width * 0.018, cardY + cardH * 0.34);

    ctx.fillStyle = palette.text;
    ctx.font = `600 ${Math.round(width * 0.0165)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.value, cardX + width * 0.018, cardY + cardH * 0.72);
  });

  // Right Tactile Neumorphic Mode Buttons & CTA
  previewSample.cardLabels.forEach((lbl, idx) => {
    const btnW = width * 0.19;
    const btnH = height * 0.088;
    const btnX = width - padX - btnW;
    const btnY = height * (0.44 + idx * 0.125);
    drawNeumorphicPill(ctx, btnX, btnY, btnW, btnH, 44, palette.surface, idx === 0);

    ctx.fillStyle = idx === 0 ? palette.accent : palette.text;
    ctx.beginPath();
    ctx.arc(btnX + width * 0.02, btnY + btnH * 0.5, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = idx === 0 ? palette.text : palette.secondary;
    ctx.font = `600 ${Math.round(width * 0.0105)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(lbl, btnX + width * 0.036, btnY + btnH * 0.52);
  });

  // Elevated Amber-rimmed Reserve Button bottom-right
  const ctaW = width * 0.19;
  const ctaH = height * 0.088;
  const ctaX = width - padX - ctaW;
  const ctaY = height * 0.825;
  drawNeumorphicPill(ctx, ctaX, ctaY, ctaW, ctaH, 44, '#1B1712', false);
  ctx.strokeStyle = 'rgba(217, 138, 43, 0.5)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, ctaX, ctaY, ctaW, ctaH, 44);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.0105)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.ctaLabel, ctaX + ctaW * 0.5, ctaY + ctaH * 0.52);
  ctx.textAlign = 'left';

  applyEditorialGrain(ctx, 0, headerBottom, width, height - headerBottom, 202, 0.035);
}
