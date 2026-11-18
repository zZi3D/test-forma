import { ProjectConfig } from '../../data/projects';
import {
  applyEditorialGrain,
  drawBrowserChrome,
  drawRoundedRect,
  drawWrappedText,
} from './canvasPrimitives';

function drawArchedFrame(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  bottomRadius: number,
) {
  const archR = w * 0.5;
  ctx.beginPath();
  ctx.moveTo(x, y + archR);
  ctx.arc(x + archR, y + archR, archR, Math.PI, 0, false);
  ctx.lineTo(x + w, y + h - bottomRadius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - bottomRadius, y + h);
  ctx.lineTo(x + bottomRadius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bottomRadius);
  ctx.closePath();
}

export function renderNewAgeGradient(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;
  const deepWine = palette.text; // #4A0F24
  const kellyGreen = palette.accent; // #2DC92A

  // Soft blush campaign canvas (#F6CBD4)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Ethereal diffused rose & pearl aura gradients across background
  const aura1 = ctx.createRadialGradient(
    width * 0.64,
    height * 0.48,
    width * 0.02,
    width * 0.64,
    height * 0.48,
    width * 0.48,
  );
  aura1.addColorStop(0, '#FFE4EA');
  aura1.addColorStop(0.5, 'rgba(232, 175, 192, 0.52)');
  aura1.addColorStop(1, 'transparent');
  ctx.fillStyle = aura1;
  ctx.fillRect(0, 0, width, height);

  const aura2 = ctx.createRadialGradient(
    width * 0.2,
    height * 0.85,
    width * 0.01,
    width * 0.2,
    height * 0.85,
    width * 0.35,
  );
  aura2.addColorStop(0, 'rgba(74, 15, 36, 0.14)');
  aura2.addColorStop(1, 'transparent');
  ctx.fillStyle = aura2;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: 'rgba(246, 203, 212, 0.78)',
    borderAlpha: 0.14,
    navItemsColor: palette.secondary,
  });

  // Kelly-Green status pulse dot beside top nav right "BAG (1)"
  ctx.fillStyle = kellyGreen;
  ctx.beginPath();
  ctx.arc(width - padX - width * 0.062, headerBottom - height * 0.04, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // RIGHT FOCAL VISUAL: Arched Editorial Lookbook / Solaris Eyewear Campaign Frame
  const archX = width * 0.46;
  const archY = headerBottom + height * 0.05;
  const archW = width * 0.46;
  const archH = height - archY - height * 0.06;

  // Soft wine-plum shadow behind arched lookbook frame
  ctx.save();
  ctx.shadowColor = 'rgba(74, 15, 36, 0.18)';
  ctx.shadowBlur = 38;
  ctx.shadowOffsetY = 18;
  ctx.fillStyle = '#E8AFC0';
  drawArchedFrame(ctx, archX, archY, archW, archH, 24);
  ctx.fill();
  ctx.restore();

  ctx.save();
  drawArchedFrame(ctx, archX, archY, archW, archH, 24);
  ctx.clip();

  // Editorial blush-rose sunset studio backdrop inside arched frame
  const photoGrad = ctx.createLinearGradient(
    archX,
    archY,
    archX + archW,
    archY + archH,
  );
  photoGrad.addColorStop(0, '#FDF1F4');
  photoGrad.addColorStop(0.48, '#F2B8C6');
  photoGrad.addColorStop(1, '#8C3554');
  ctx.fillStyle = photoGrad;
  ctx.fillRect(archX, archY, archW, archH);

  // Soft backlit halo behind editorial silhouette
  const halo = ctx.createRadialGradient(
    archX + archW * 0.56,
    archY + archH * 0.36,
    archW * 0.02,
    archX + archW * 0.56,
    archY + archH * 0.38,
    archW * 0.48,
  );
  halo.addColorStop(0, '#FFFDF9');
  halo.addColorStop(0.38, 'rgba(255, 232, 238, 0.55)');
  halo.addColorStop(1, 'transparent');
  ctx.fillStyle = halo;
  ctx.fillRect(archX, archY, archW, archH);

  // Refined Inner Hairline Ring
  ctx.strokeStyle = 'rgba(255, 250, 252, 0.52)';
  ctx.lineWidth = 1.75;
  drawArchedFrame(ctx, archX + 12, archY + 12, archW - 24, archH - 24, 18);
  ctx.stroke();

  // FASHION SILHOUETTE: Deep Wine Tailored Look + Solaris Mirrored Shield Sunglass Glint
  const figX = archX + archW * 0.53;
  const figTop = archY + archH * 0.17;
  const figBottom = archY + archH;

  ctx.fillStyle = deepWine;

  // Sculpted head + sleek editorial chignon
  ctx.beginPath();
  ctx.ellipse(figX - 2, figTop + 34, 24, 29, -0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(figX - 24, figTop + 36, 11, 0, Math.PI * 2);
  ctx.fill();

  // Sleek Kelly-Green Mirrored Shield Sunglasses Visor across face silhouette
  ctx.save();
  const visorGrad = ctx.createLinearGradient(figX - 18, figTop + 26, figX + 26, figTop + 38);
  visorGrad.addColorStop(0, '#142914');
  visorGrad.addColorStop(0.5, kellyGreen);
  visorGrad.addColorStop(1, '#A7F3D0');
  ctx.fillStyle = visorGrad;
  drawRoundedRect(ctx, figX - 14, figTop + 26, 36, 12, 5);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = deepWine;
  // Neck
  ctx.fillRect(figX - 10, figTop + 56, 18, 28);

  // Tailored structured coat silhouette
  ctx.beginPath();
  ctx.moveTo(figX - 66, figTop + 98);
  ctx.quadraticCurveTo(figX - 2, figTop + 76, figX + 68, figTop + 102);
  ctx.bezierCurveTo(
    figX + 96,
    figTop + 150,
    figX + 106,
    figTop + 215,
    figX + 86,
    figTop + 255,
  );
  ctx.bezierCurveTo(
    figX + 104,
    figTop + 340,
    figX + 124,
    figTop + 445,
    figX + 132,
    figBottom,
  );
  ctx.lineTo(figX - 104, figBottom);
  ctx.bezierCurveTo(
    figX - 96,
    figTop + 435,
    figX - 78,
    figTop + 315,
    figX - 58,
    figTop + 225,
  );
  ctx.bezierCurveTo(
    figX - 74,
    figTop + 178,
    figX - 74,
    figTop + 130,
    figX - 66,
    figTop + 98,
  );
  ctx.closePath();
  ctx.fill();

  // Structured Boutique Handbag hanging from poised right arm
  const bagX = figX + 68;
  const bagY = figTop + 266;
  const bagW = 58;
  const bagH = 52;

  ctx.strokeStyle = deepWine;
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.arc(bagX + bagW * 0.5, bagY + 4, 15, Math.PI, 0, false);
  ctx.stroke();

  ctx.fillStyle = '#330818';
  drawRoundedRect(ctx, bagX, bagY, bagW, bagH, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(246, 203, 212, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#F6CBD4';
  drawRoundedRect(ctx, bagX + bagW * 0.5 - 5, bagY + 12, 10, 6, 3);
  ctx.fill();

  // Minimalist lapel & belt highlight
  ctx.strokeStyle = 'rgba(246, 203, 212, 0.36)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(figX - 18, figTop + 90);
  ctx.lineTo(figX + 6, figTop + 166);
  ctx.lineTo(figX + 20, figTop + 90);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(figX - 56, figTop + 222);
  ctx.quadraticCurveTo(figX + 4, figTop + 230, figX + 58, figTop + 222);
  ctx.stroke();

  // Rim light along right silhouette contour
  ctx.strokeStyle = 'rgba(255, 240, 245, 0.78)';
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(figX + 18, figTop + 14);
  ctx.bezierCurveTo(
    figX + 34,
    figTop + 42,
    figX + 30,
    figTop + 76,
    figX + 68,
    figTop + 102,
  );
  ctx.bezierCurveTo(
    figX + 96,
    figTop + 150,
    figX + 106,
    figTop + 215,
    figX + 86,
    figTop + 255,
  );
  ctx.stroke();

  applyEditorialGrain(ctx, archX, archY, archW, archH, 404, 0.036);
  ctx.restore();

  // Hairline outline on arched frame
  ctx.strokeStyle = 'rgba(74, 15, 36, 0.18)';
  ctx.lineWidth = 1.5;
  drawArchedFrame(ctx, archX, archY, archW, archH, 24);
  ctx.stroke();

  // FLOATING TRANSLUCENT DROP TAG overlaid at bottom-right of arch
  const tagW = width * 0.265;
  const tagH = height * 0.145;
  const tagX = archX + archW - tagW - 22;
  const tagY = archY + archH - tagH - 22;

  ctx.save();
  ctx.shadowColor = 'rgba(74, 15, 36, 0.16)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = 'rgba(255, 246, 248, 0.92)';
  drawRoundedRect(ctx, tagX, tagY, tagW, tagH, 18);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, tagX, tagY, tagW, tagH, 18);
  ctx.stroke();

  ctx.fillStyle = palette.secondary;
  ctx.font = `600 ${Math.round(width * 0.008)}px "JetBrains Mono", monospace`;
  ctx.fillText('SUMMER CAPSULE · UV400', tagX + 20, tagY + 28);

  ctx.fillStyle = deepWine;
  ctx.font = `700 ${Math.round(width * 0.013)}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillText('Solaris Shield Acetate', tagX + 20, tagY + 58);

  // 3 Exact Demo 5 Variant Swatches (Kelly Green, Deep Wine, Blush Mirror)
  const fabricSwatches = [kellyGreen, deepWine, '#E88FA5'];
  fabricSwatches.forEach((col, idx) => {
    const sx = tagX + 28 + idx * 24;
    const sy = tagY + tagH - 24;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(sx, sy, 7, 0, Math.PI * 2);
    ctx.fill();
    if (idx === 0) {
      ctx.strokeStyle = 'rgba(74, 15, 36, 0.55)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(sx, sy, 10, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  ctx.textAlign = 'right';
  ctx.fillStyle = deepWine;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText('€165 · 7 LEFT', tagX + tagW - 20, tagY + tagH - 22);
  ctx.textAlign = 'left';

  // Weightless Editorial Titles on Left
  ctx.fillStyle = palette.secondary;
  ctx.font = `600 ${Math.round(width * 0.0096)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX, headerBottom + height * 0.14);

  ctx.fillStyle = deepWine;
  ctx.font = `italic 400 ${Math.round(width * 0.088)}px "Cormorant Garamond", Georgia, serif`;
  const [line1, ...rest] = previewSample.headline.split(' ');
  ctx.fillText(line1, padX, headerBottom + height * 0.29);
  ctx.fillText(rest.join(' '), padX + width * 0.045, headerBottom + height * 0.415);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0122)}px "Plus Jakarta Sans", sans-serif`;
  drawWrappedText(
    ctx,
    previewSample.subheadline,
    padX,
    headerBottom + height * 0.5,
    width * 0.34,
    height * 0.027,
    3,
  );

  // Minimal floating capsule metrics on bottom left
  const footY = height * 0.77;
  previewSample.metrics.forEach((m, idx) => {
    const mx = padX + idx * width * 0.128;
    ctx.fillStyle = palette.secondary;
    ctx.font = `500 ${Math.round(width * 0.0082)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, mx, footY);
    ctx.fillStyle = deepWine;
    ctx.font = `600 ${Math.round(width * 0.0118)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.value, mx, footY + height * 0.036);
  });

  // High-pop Kelly Green "SHOP SOLARIS DROP →" Pill Button matching Demo 5
  const btnX = padX;
  const btnY = height * 0.865;
  const btnW = width * 0.19;
  const btnH = height * 0.062;

  ctx.save();
  ctx.shadowColor = 'rgba(45, 201, 42, 0.35)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;
  ctx.fillStyle = kellyGreen;
  drawRoundedRect(ctx, btnX, btnY, btnW, btnH, 31);
  ctx.fill();
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#142914';
  ctx.font = `700 ${Math.round(width * 0.0094)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, btnX + btnW * 0.5, btnY + btnH * 0.52);
  ctx.textAlign = 'left';
}
