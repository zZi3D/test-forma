import { ProjectConfig } from '../../data/projects';
import {
  applyEditorialGrain,
  drawBrowserChrome,
  drawRoundedRect,
} from './canvasPrimitives';

export function renderNewAgeGradient(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, content } = project;

  // Soft sand canvas (#F3ECE1)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Ethereal diffused peach / amber radial aura gradients across background
  const aura1 = ctx.createRadialGradient(
    width * 0.62,
    height * 0.5,
    width * 0.02,
    width * 0.62,
    height * 0.5,
    width * 0.48,
  );
  aura1.addColorStop(0, '#E8B89A');
  aura1.addColorStop(0.5, 'rgba(232, 184, 154, 0.45)');
  aura1.addColorStop(1, 'transparent');
  ctx.fillStyle = aura1;
  ctx.fillRect(0, 0, width, height);

  const aura2 = ctx.createRadialGradient(
    width * 0.22,
    height * 0.85,
    width * 0.01,
    width * 0.22,
    height * 0.85,
    width * 0.35,
  );
  aura2.addColorStop(0, 'rgba(201, 123, 87, 0.28)');
  aura2.addColorStop(1, 'transparent');
  ctx.fillStyle = aura2;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: 'rgba(243, 236, 225, 0.72)',
    borderAlpha: 0.1,
    navItemsColor: palette.secondary,
  });

  // Editorial Photographic Aura Frame centered-right
  const imgX = width * 0.41;
  const imgY = headerBottom + height * 0.06;
  const imgW = width * 0.52;
  const imgH = height - imgY - height * 0.075;

  ctx.save();
  drawRoundedRect(ctx, imgX, imgY, imgW, imgH, 14);
  ctx.clip();

  // Warm glowing studio aura backdrop inside frame
  const photoGrad = ctx.createLinearGradient(imgX, imgY, imgX + imgW, imgY + imgH);
  photoGrad.addColorStop(0, '#F0DFCE');
  photoGrad.addColorStop(0.5, '#E8B89A');
  photoGrad.addColorStop(1, '#B87654');
  ctx.fillStyle = photoGrad;
  ctx.fillRect(imgX, imgY, imgW, imgH);

  // Soft solar halo behind sculptural fashion figure
  const halo = ctx.createRadialGradient(
    imgX + imgW * 0.56,
    imgY + imgH * 0.38,
    imgW * 0.02,
    imgX + imgW * 0.56,
    imgY + imgH * 0.4,
    imgW * 0.45,
  );
  halo.addColorStop(0, '#FFF8F0');
  halo.addColorStop(0.45, 'rgba(255, 240, 224, 0.42)');
  halo.addColorStop(1, 'transparent');
  ctx.fillStyle = halo;
  ctx.fillRect(imgX, imgY, imgW, imgH);

  // High-contrast sculptural fashion silhouette (#1F1A17 deep espresso)
  ctx.fillStyle = palette.text;
  ctx.beginPath();
  ctx.moveTo(imgX + imgW * 0.58, imgY + imgH * 0.22);
  ctx.bezierCurveTo(
    imgX + imgW * 0.76,
    imgY + imgH * 0.3,
    imgX + imgW * 0.84,
    imgY + imgH * 0.65,
    imgX + imgW * 0.88,
    imgY + imgH,
  );
  ctx.lineTo(imgX + imgW * 0.24, imgY + imgH);
  ctx.bezierCurveTo(
    imgX + imgW * 0.32,
    imgY + imgH * 0.62,
    imgX + imgW * 0.42,
    imgY + imgH * 0.3,
    imgX + imgW * 0.58,
    imgY + imgH * 0.22,
  );
  ctx.closePath();
  ctx.fill();

  // Silhouette head
  ctx.beginPath();
  ctx.arc(imgX + imgW * 0.58, imgY + imgH * 0.155, imgW * 0.052, 0, Math.PI * 2);
  ctx.fill();

  // Flowing silk highlight contour
  ctx.strokeStyle = '#F3ECE1';
  ctx.globalAlpha = 0.42;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(imgX + imgW * 0.51, imgY + imgH * 0.31);
  ctx.bezierCurveTo(
    imgX + imgW * 0.58,
    imgY + imgH * 0.52,
    imgX + imgW * 0.66,
    imgY + imgH * 0.72,
    imgX + imgW * 0.71,
    imgY + imgH * 0.96,
  );
  ctx.stroke();
  ctx.globalAlpha = 1;

  applyEditorialGrain(ctx, imgX, imgY, imgW, imgH, 404, 0.04);
  ctx.restore();

  // Weightless Editorial Magazine Titles bleeding gracefully OVER the left edge of the image
  ctx.fillStyle = palette.accent;
  ctx.font = `500 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.fillText(content.eyebrow, padX, headerBottom + height * 0.14);

  ctx.fillStyle = palette.text;
  ctx.font = `italic 400 ${Math.round(width * 0.088)}px "Cormorant Garamond", Georgia, serif`;
  const [line1, ...rest] = content.headline.split(' ');
  ctx.fillText(line1, padX, headerBottom + height * 0.29);
  ctx.fillText(rest.join(' '), padX + width * 0.045, headerBottom + height * 0.415);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.013)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(content.subheadline.slice(0, 44), padX, headerBottom + height * 0.52);

  // Minimal floating lookbook metrics on bottom left
  const footY = height * 0.79;
  content.metrics.forEach((m, idx) => {
    const mx = padX + idx * width * 0.12;
    ctx.fillStyle = palette.secondary;
    ctx.font = `500 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, mx, footY);
    ctx.fillStyle = palette.text;
    ctx.font = `500 ${Math.round(width * 0.013)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.value, mx, footY + height * 0.036);
  });

  // Soft translucent capsule button
  ctx.strokeStyle = palette.text;
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, padX, height * 0.875, width * 0.17, height * 0.06, 30);
  ctx.stroke();
  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(content.ctaLabel, padX + width * 0.025, height * 0.907);
}
