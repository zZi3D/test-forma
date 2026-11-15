import { ProjectConfig } from '../../data/projects';
import {
  applyEditorialGrain,
  drawBrowserChrome,
  drawRoundedRect,
} from './canvasPrimitives';

export function renderOrganicBiophilic(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;

  // Warm linen canvas (#EFECE6)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Subtle organic botanical warmth gradient wash
  const warmWash = ctx.createRadialGradient(
    width * 0.68,
    height * 0.45,
    width * 0.04,
    width * 0.68,
    height * 0.45,
    width * 0.55,
  );
  warmWash.addColorStop(0, 'rgba(196, 116, 81, 0.14)');
  warmWash.addColorStop(0.55, 'rgba(47, 69, 56, 0.06)');
  warmWash.addColorStop(1, 'transparent');
  ctx.fillStyle = warmWash;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#E6E1D8',
    borderAlpha: 0.1,
    navItemsColor: palette.secondary,
  });

  const topY = headerBottom + height * 0.05;
  const contentW = width - padX * 2;
  const gap = width * 0.026;
  const leftW = contentW * 0.46;
  const rightW = contentW - leftW - gap;
  const fullH = height - topY - height * 0.068;

  // LEFT COLUMN: Flowing organic rounded botanical cards
  const topCardH = fullH * 0.6;
  ctx.fillStyle = '#F7F5F0';
  drawRoundedRect(ctx, padX, topY, leftW, topCardH, 36);
  ctx.fill();
  ctx.strokeStyle = 'rgba(47, 69, 56, 0.14)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const innerPad = width * 0.028;
  // Quiet Botanical Index Tag (FORMULATION 09)
  ctx.fillStyle = palette.accent; // Terracotta #C47451
  ctx.font = `600 ${Math.round(width * 0.0098)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX + innerPad, topY + height * 0.065);

  // Elegant Serif Display Title
  ctx.fillStyle = palette.text; // Deep sage green #2F4538
  ctx.font = `500 ${Math.round(width * 0.048)}px "Cormorant Garamond", Georgia, serif`;
  const [w1, w2, ...wRest] = previewSample.headline.split(' ');
  ctx.fillText(`${w1} ${w2}`, padX + innerPad, topY + height * 0.155);
  if (wRest.length > 0) {
    ctx.fillText(wRest.join(' '), padX + innerPad, topY + height * 0.24);
  }

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0122)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.subheadline.slice(0, 44), padX + innerPad, topY + height * 0.315);

  // Soft Sage Botanical Pill CTA
  const btnY = topY + topCardH - height * 0.105;
  ctx.fillStyle = palette.text;
  drawRoundedRect(ctx, padX + innerPad, btnY, width * 0.19, height * 0.066, 33);
  ctx.fill();
  ctx.fillStyle = palette.bg;
  ctx.font = `600 ${Math.round(width * 0.01)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, padX + innerPad + width * 0.024, btnY + height * 0.036);

  // Bottom-left Organic Spec Notes (3 soft botanical cards)
  const specY = topY + topCardH + gap * 0.85;
  const specH = fullH - topCardH - gap * 0.85;
  const specW = (leftW - gap * 1.4) / 3;
  previewSample.metrics.forEach((m, idx) => {
    const sx = padX + idx * (specW + gap * 0.7);
    ctx.fillStyle = idx === 1 ? '#E6E1D8' : '#F7F5F0';
    drawRoundedRect(ctx, sx, specY, specW, specH, 26);
    ctx.fill();
    ctx.strokeStyle = 'rgba(47, 69, 56, 0.12)';
    ctx.lineWidth = 1.25;
    ctx.stroke();

    ctx.fillStyle = palette.accent;
    ctx.font = `600 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, sx + 18, specY + specH * 0.36);

    ctx.fillStyle = palette.text;
    ctx.font = `600 ${Math.round(width * 0.0145)}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillText(m.value, sx + 18, specY + specH * 0.68);
  });

  // RIGHT COLUMN: Minimalist Close-Up of Amber Glassware & Botanical Shadows
  const rightX = padX + leftW + gap;
  ctx.save();
  drawRoundedRect(ctx, rightX, topY, rightW, fullH, 42);
  ctx.clip();

  // Warm sunlit stone wall backdrop
  const stoneGrad = ctx.createLinearGradient(rightX, topY, rightX + rightW, topY + fullH);
  stoneGrad.addColorStop(0, '#E9E2D6');
  stoneGrad.addColorStop(0.55, '#DDD2C2');
  stoneGrad.addColorStop(1, '#C4B39D');
  ctx.fillStyle = stoneGrad;
  ctx.fillRect(rightX, topY, rightW, fullH);

  // Dappled diagonal window shadow
  const shadowGrad = ctx.createLinearGradient(
    rightX + rightW * 0.1,
    topY,
    rightX + rightW * 0.9,
    topY + fullH,
  );
  shadowGrad.addColorStop(0, 'rgba(47, 69, 56, 0.20)');
  shadowGrad.addColorStop(0.5, 'rgba(47, 69, 56, 0.04)');
  shadowGrad.addColorStop(1, 'rgba(47, 69, 56, 0.28)');
  ctx.fillStyle = shadowGrad;
  ctx.fillRect(rightX, topY, rightW, fullH);

  // Botanical eucalyptus/leaf silhouettes casting soft shadows across stone
  ctx.save();
  ctx.fillStyle = 'rgba(47, 69, 56, 0.24)';
  for (let leaf = 0; leaf < 6; leaf++) {
    const lx = rightX + rightW * (0.22 + leaf * 0.09);
    const ly = topY + fullH * (0.16 + (leaf % 2) * 0.08 + leaf * 0.06);
    ctx.beginPath();
    ctx.ellipse(lx, ly, rightW * 0.09, fullH * 0.04, -0.55 + leaf * 0.14, 0, Math.PI * 2);
    ctx.fill();
  }
  // Curved botanical stem
  ctx.strokeStyle = 'rgba(47, 69, 56, 0.32)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(rightX + rightW * 0.15, topY + fullH * 0.08);
  ctx.quadraticCurveTo(
    rightX + rightW * 0.48,
    topY + fullH * 0.34,
    rightX + rightW * 0.72,
    topY + fullH * 0.65,
  );
  ctx.stroke();
  ctx.restore();

  // Apothecary Amber & Frosted Sage Glass Vessel (center-right foreground)
  const vesselX = rightX + rightW * 0.44;
  const vesselW = rightW * 0.32;
  const vesselY = topY + fullH * 0.36;
  const vesselH = fullH * 0.56;

  // Cast shadow on plinth
  ctx.fillStyle = 'rgba(47, 69, 56, 0.26)';
  ctx.beginPath();
  ctx.ellipse(
    vesselX + vesselW * 0.72,
    vesselY + vesselH,
    vesselW * 0.65,
    18,
    0,
    0,
    Math.PI * 2,
  );
  ctx.fill();

  // Bottle neck
  ctx.fillStyle = '#24352B';
  drawRoundedRect(
    ctx,
    vesselX + vesselW * 0.36,
    vesselY - fullH * 0.09,
    vesselW * 0.28,
    fullH * 0.11,
    10,
  );
  ctx.fill();

  // Amber-terracotta glass bottle body with specular glass rim
  const glassGrad = ctx.createLinearGradient(vesselX, vesselY, vesselX + vesselW, vesselY + vesselH);
  glassGrad.addColorStop(0, '#D48A68');
  glassGrad.addColorStop(0.45, '#C47451');
  glassGrad.addColorStop(1, '#5D3526');
  ctx.fillStyle = glassGrad;
  drawRoundedRect(ctx, vesselX, vesselY, vesselW, vesselH, 32);
  ctx.fill();

  // Specular highlight strip on glass cylinder
  ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
  drawRoundedRect(ctx, vesselX + vesselW * 0.14, vesselY + 24, vesselW * 0.09, vesselH - 48, 12);
  ctx.fill();

  // Minimal linen label on apothecary bottle
  const lblY = vesselY + vesselH * 0.28;
  ctx.fillStyle = '#F7F5F0';
  drawRoundedRect(ctx, vesselX + vesselW * 0.16, lblY, vesselW * 0.68, vesselH * 0.42, 8);
  ctx.fill();

  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
  ctx.fillText('ARTISAN 09', vesselX + vesselW * 0.24, lblY + 34);
  ctx.font = `italic 600 ${Math.round(width * 0.015)}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillText('Local Craft', vesselX + vesselW * 0.24, lblY + 66);
  ctx.fillStyle = palette.accent;
  ctx.font = `500 ${Math.round(width * 0.0075)}px "JetBrains Mono", monospace`;
  ctx.fillText('NATURAL // WARMTH', vesselX + vesselW * 0.24, lblY + 96);

  // Subtle paper-grain overlay across entire composition
  applyEditorialGrain(ctx, rightX, topY, rightW, fullH, 909, 0.055);
  ctx.restore();

  applyEditorialGrain(ctx, 0, headerBottom, width, height - headerBottom, 910, 0.032);
}
