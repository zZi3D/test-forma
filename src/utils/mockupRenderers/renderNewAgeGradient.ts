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

  // Soft sand canvas (#F3ECE1)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Ethereal diffused peach / amber radial aura gradients across background
  const aura1 = ctx.createRadialGradient(
    width * 0.64,
    height * 0.48,
    width * 0.02,
    width * 0.64,
    height * 0.48,
    width * 0.48,
  );
  aura1.addColorStop(0, '#E8B89A');
  aura1.addColorStop(0.5, 'rgba(232, 184, 154, 0.45)');
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
  aura2.addColorStop(0, 'rgba(201, 123, 87, 0.25)');
  aura2.addColorStop(1, 'transparent');
  ctx.fillStyle = aura2;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: 'rgba(243, 236, 225, 0.72)',
    borderAlpha: 0.1,
    navItemsColor: palette.secondary,
  });

  // RIGHT FOCAL VISUAL: Arched Boutique Mirror / Editorial Frame
  const archX = width * 0.46;
  const archY = headerBottom + height * 0.05;
  const archW = width * 0.46;
  const archH = height - archY - height * 0.06;

  // Soft golden shadow behind arched mirror
  ctx.save();
  ctx.shadowColor = 'rgba(138, 86, 56, 0.16)';
  ctx.shadowBlur = 38;
  ctx.shadowOffsetY = 18;
  ctx.fillStyle = '#EBD2BE';
  drawArchedFrame(ctx, archX, archY, archW, archH, 24);
  ctx.fill();
  ctx.restore();

  ctx.save();
  drawArchedFrame(ctx, archX, archY, archW, archH, 24);
  ctx.clip();

  // Golden-hour studio backdrop inside arched frame
  const photoGrad = ctx.createLinearGradient(
    archX,
    archY,
    archX + archW,
    archY + archH,
  );
  photoGrad.addColorStop(0, '#F7ECE0');
  photoGrad.addColorStop(0.45, '#E9C1A4');
  photoGrad.addColorStop(1, '#BA7B59');
  ctx.fillStyle = photoGrad;
  ctx.fillRect(archX, archY, archW, archH);

  // Soft solar backlit glow behind editorial silhouette
  const halo = ctx.createRadialGradient(
    archX + archW * 0.56,
    archY + archH * 0.38,
    archW * 0.02,
    archX + archW * 0.56,
    archY + archH * 0.4,
    archW * 0.48,
  );
  halo.addColorStop(0, '#FFFDF9');
  halo.addColorStop(0.38, 'rgba(255, 242, 224, 0.52)');
  halo.addColorStop(1, 'transparent');
  ctx.fillStyle = halo;
  ctx.fillRect(archX, archY, archW, archH);

  // Refined Editorial Mirror Inner Hairline Ring
  ctx.strokeStyle = 'rgba(255, 250, 244, 0.48)';
  ctx.lineWidth = 1.75;
  drawArchedFrame(ctx, archX + 12, archY + 12, archW - 24, archH - 24, 18);
  ctx.stroke();

  // FASHION SILHOUETTE: Tailored Coat & Boutique Handbag in Golden-Hour Rim Light
  const figX = archX + archW * 0.53;
  const figTop = archY + archH * 0.17;
  const figBottom = archY + archH;

  ctx.fillStyle = '#1D1815';

  // Sculpted head + sleek editorial chignon hair bun
  ctx.beginPath();
  ctx.ellipse(figX - 2, figTop + 34, 24, 29, -0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(figX - 24, figTop + 36, 11, 0, Math.PI * 2);
  ctx.fill();

  // Neck
  ctx.fillRect(figX - 10, figTop + 56, 18, 28);

  // Tailored structured coat silhouette (defined shoulders, waist cinch, flared A-line drape)
  ctx.beginPath();
  ctx.moveTo(figX - 66, figTop + 98); // Left shoulder
  ctx.quadraticCurveTo(figX - 2, figTop + 76, figX + 68, figTop + 102); // Collar & right shoulder
  // Right arm poised outward at hip / elbow
  ctx.bezierCurveTo(
    figX + 96,
    figTop + 150,
    figX + 106,
    figTop + 215,
    figX + 86,
    figTop + 255,
  );
  // Sweeping coat flare down right side
  ctx.bezierCurveTo(
    figX + 104,
    figTop + 340,
    figX + 124,
    figTop + 445,
    figX + 132,
    figBottom,
  );
  ctx.lineTo(figX - 104, figBottom);
  // Left coat hem & waist taper
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

  // Structured Boutique Handbag hanging cleanly from poised right arm
  const bagX = figX + 68;
  const bagY = figTop + 266;
  const bagW = 58;
  const bagH = 52;

  // Handbag top curved leather handle
  ctx.strokeStyle = '#1D1815';
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.arc(bagX + bagW * 0.5, bagY + 4, 15, Math.PI, 0, false);
  ctx.stroke();

  // Handbag structured silhouette
  ctx.fillStyle = '#14110F';
  drawRoundedRect(ctx, bagX, bagY, bagW, bagH, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(243, 236, 225, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Tiny warm champagne bag clasp
  ctx.fillStyle = '#E8C5A0';
  drawRoundedRect(ctx, bagX + bagW * 0.5 - 5, bagY + 12, 10, 6, 3);
  ctx.fill();

  // Minimalist tailored lapel highlight & waist belt seam on coat
  ctx.strokeStyle = 'rgba(243, 236, 225, 0.34)';
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

  // Golden-hour warm rim light along right silhouette edge
  ctx.strokeStyle = 'rgba(255, 245, 230, 0.72)';
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

  // Subtle brass hairline outline on arched frame
  ctx.strokeStyle = 'rgba(31, 26, 23, 0.16)';
  ctx.lineWidth = 1.5;
  drawArchedFrame(ctx, archX, archY, archW, archH, 24);
  ctx.stroke();

  // FLOATING TRANSLUCENT BOUTIQUE LOOKBOOK TAG overlaid at bottom-right of arch
  const tagW = width * 0.255;
  const tagH = height * 0.145;
  const tagX = archX + archW - tagW - 22;
  const tagY = archY + archH - tagH - 22;

  ctx.save();
  ctx.shadowColor = 'rgba(31, 26, 23, 0.12)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = 'rgba(255, 250, 245, 0.88)';
  drawRoundedRect(ctx, tagX, tagY, tagW, tagH, 18);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, tagX, tagY, tagW, tagH, 18);
  ctx.stroke();

  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.0082)}px "JetBrains Mono", monospace`;
  ctx.fillText('NEW SEASON · LOOK 04', tagX + 20, tagY + 28);

  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.013)}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillText('Tailored Trench & Bag', tagX + 20, tagY + 58);

  // 3 Fabric / Color Swatch Dots
  const fabricSwatches = ['#1D1815', '#C97B57', '#DFC9B0'];
  fabricSwatches.forEach((col, idx) => {
    const sx = tagX + 28 + idx * 24;
    const sy = tagY + tagH - 24;
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(sx, sy, 7, 0, Math.PI * 2);
    ctx.fill();
    if (idx === 0) {
      ctx.strokeStyle = 'rgba(31, 26, 23, 0.4)';
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.arc(sx, sy, 10, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  ctx.textAlign = 'right';
  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.0098)}px "JetBrains Mono", monospace`;
  ctx.fillText('€240 · IN STOCK', tagX + tagW - 20, tagY + tagH - 22);
  ctx.textAlign = 'left';

  // Weightless Editorial Magazine Titles overlapping left edge of arched mirror
  ctx.fillStyle = palette.accent;
  ctx.font = `500 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX, headerBottom + height * 0.14);

  ctx.fillStyle = palette.text;
  ctx.font = `italic 400 ${Math.round(width * 0.086)}px "Cormorant Garamond", Georgia, serif`;
  const [line1, ...rest] = previewSample.headline.split(' ');
  ctx.fillText(line1, padX, headerBottom + height * 0.29);
  ctx.fillText(rest.join(' '), padX + width * 0.045, headerBottom + height * 0.415);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0122)}px "Plus Jakarta Sans", sans-serif`;
  drawWrappedText(
    ctx,
    previewSample.subheadline,
    padX,
    headerBottom + height * 0.50,
    width * 0.34,
    height * 0.027,
    3,
  );

  // Minimal floating lookbook metrics on bottom left
  const footY = height * 0.77;
  previewSample.metrics.forEach((m, idx) => {
    const mx = padX + idx * width * 0.125;
    ctx.fillStyle = palette.secondary;
    ctx.font = `500 ${Math.round(width * 0.0084)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, mx, footY);
    ctx.fillStyle = palette.text;
    ctx.font = `500 ${Math.round(width * 0.0125)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.value, mx, footY + height * 0.036);
  });

  // Refined "SHOP THE EDIT →" Boutique Pill Button
  const btnX = padX;
  const btnY = height * 0.865;
  const btnW = width * 0.18;
  const btnH = height * 0.062;

  ctx.fillStyle = palette.text;
  drawRoundedRect(ctx, btnX, btnY, btnW, btnH, 31);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = palette.bg;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, btnX + btnW * 0.5, btnY + btnH * 0.52);
  ctx.textAlign = 'left';
}
