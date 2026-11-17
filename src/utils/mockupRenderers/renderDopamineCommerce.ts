import { ProjectConfig } from '../../data/projects';
import {
  drawBrowserChrome,
  drawRoundedRect,
  drawWrappedText,
} from './canvasPrimitives';

function drawHalftonePattern(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  cols: number,
  rows: number,
  spacing: number,
  color: string,
  maxRadius: number,
) {
  ctx.save();
  ctx.fillStyle = color;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const falloff = 1 - (r + c) / (rows + cols);
      const radius = maxRadius * Math.max(0.22, falloff);
      ctx.beginPath();
      ctx.arc(startX + c * spacing, startY + r * spacing, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawFourPointSparkle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string,
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - size);
  ctx.quadraticCurveTo(cx + size * 0.18, cy - size * 0.18, cx + size, cy);
  ctx.quadraticCurveTo(cx + size * 0.18, cy + size * 0.18, cx, cy + size);
  ctx.quadraticCurveTo(cx - size * 0.18, cy + size * 0.18, cx - size, cy);
  ctx.quadraticCurveTo(cx - size * 0.18, cy - size * 0.18, cx, cy - size);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function renderDopamineCommerce(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;
  const pink = '#FF3B6B';
  const lemon = '#FFD60A';
  const mint = '#34D399';
  const cobalt = '#2563EB';

  // Warm cream base (#FFFDF7)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Joyful radial candy aura behind right storefront card
  const candyGlow = ctx.createRadialGradient(
    width * 0.72,
    height * 0.45,
    width * 0.03,
    width * 0.72,
    height * 0.45,
    width * 0.46,
  );
  candyGlow.addColorStop(0, 'rgba(255, 59, 107, 0.16)');
  candyGlow.addColorStop(0.45, 'rgba(255, 214, 10, 0.14)');
  candyGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = candyGlow;
  ctx.fillRect(0, 0, width, height);

  // Subtle pop-art halftone dot accents in corners
  drawHalftonePattern(ctx, width * 0.03, height * 0.78, 8, 5, 20, 'rgba(255, 59, 107, 0.14)', 4.2);
  drawHalftonePattern(ctx, width * 0.84, height * 0.14, 7, 5, 20, 'rgba(37, 99, 235, 0.12)', 3.8);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#FFF3F7',
    borderAlpha: 0.1,
    navItemsColor: palette.text,
  });

  const topY = headerBottom + height * 0.048;
  const contentW = width - padX * 2;
  const leftW = contentW * 0.48;
  const gap = width * 0.03;
  const rightX = padX + leftW + gap;
  const rightW = contentW - leftW - gap;
  const bodyH = height - topY - height * 0.065;

  // LEFT COLUMN: Colorful Category Pill Tags
  const pillBg = [lemon, '#FFE4EC', '#D1FAE5'];
  const pillBorder = ['rgba(28, 25, 23, 0.16)', 'rgba(255, 59, 107, 0.35)', 'rgba(16, 185, 129, 0.35)'];
  const pillText = ['#1C1917', '#BE123C', '#065F46'];

  let tagX = padX;
  previewSample.cardLabels.forEach((lbl, idx) => {
    ctx.font = `800 ${Math.round(width * 0.0086)}px "JetBrains Mono", monospace`;
    const tagW = Math.max(width * 0.088, ctx.measureText(lbl).width + 34);
    ctx.fillStyle = pillBg[idx % pillBg.length];
    drawRoundedRect(ctx, tagX, topY, tagW, 36, 18);
    ctx.fill();
    ctx.strokeStyle = pillBorder[idx % pillBorder.length];
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = pillText[idx % pillText.length];
    ctx.textAlign = 'center';
    ctx.fillText(lbl, tagX + tagW * 0.5, topY + 19);
    tagX += tagW + 12;
  });
  ctx.textAlign = 'left';

  // Chunky Two-Tone Playful Display Headline
  ctx.fillStyle = palette.text;
  ctx.font = `800 ${Math.round(width * 0.056)}px "Plus Jakarta Sans", sans-serif`;
  const words = previewSample.headline.split(' ');
  const splitIdx = Math.ceil(words.length / 2);
  ctx.fillText(words.slice(0, splitIdx).join(' '), padX, topY + height * 0.165);
  ctx.fillStyle = pink;
  ctx.fillText(words.slice(splitIdx).join(' '), padX, topY + height * 0.26);

  ctx.fillStyle = '#57534E';
  ctx.font = `500 ${Math.round(width * 0.0126)}px "Plus Jakarta Sans", sans-serif`;
  drawWrappedText(
    ctx,
    previewSample.subheadline,
    padX,
    topY + height * 0.328,
    leftW - 16,
    height * 0.028,
    2,
  );

  // High-Contrast CTA Pill ("ADD TO BAG — €28 →") + Cobalt Shipping Pill
  const ctaY = topY + height * 0.422;
  ctx.save();
  ctx.shadowColor = 'rgba(255, 59, 107, 0.34)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = pink;
  drawRoundedRect(ctx, padX, ctaY, width * 0.22, 60, 30);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `800 ${Math.round(width * 0.0112)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, padX + 28, ctaY + 31);

  ctx.fillStyle = cobalt;
  drawRoundedRect(ctx, padX + width * 0.236, ctaY + 6, width * 0.145, 48, 24);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.0092)}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('FREE SHIPPING', padX + width * 0.236 + width * 0.0725, ctaY + 31);
  ctx.textAlign = 'left';

  // Bottom-Left Trio of Pastel Social-Proof Cards
  const statY = topY + bodyH * 0.68;
  const statH = bodyH * 0.32;
  const statW = (leftW - width * 0.024) / 3;
  const cardTints = ['#FEF3C7', '#D1FAE5', '#DBEAFE'];
  const cardBorders = ['rgba(245, 158, 11, 0.28)', 'rgba(16, 185, 129, 0.28)', 'rgba(37, 99, 235, 0.22)'];

  previewSample.metrics.forEach((m, idx) => {
    const sx = padX + idx * (statW + width * 0.012);
    ctx.fillStyle = cardTints[idx % cardTints.length];
    drawRoundedRect(ctx, sx, statY, statW, statH, 20);
    ctx.fill();
    ctx.strokeStyle = cardBorders[idx % cardBorders.length];
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#57534E';
    ctx.font = `700 ${Math.round(width * 0.008)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, sx + 18, statY + statH * 0.35);

    ctx.fillStyle = palette.text;
    ctx.font = `800 ${Math.round(width * 0.0155)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.value, sx + 18, statY + statH * 0.68);
  });

  // RIGHT COLUMN: Featured Product Spotlight Card
  ctx.save();
  ctx.shadowColor = 'rgba(28, 25, 23, 0.11)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetY = 14;
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, rightX, topY, rightW, bodyH, 32);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = 'rgba(28, 25, 23, 0.12)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, rightX, topY, rightW, bodyH, 32);
  ctx.stroke();

  // Candy Pastel Product Stage
  const stagePad = 22;
  const stageX = rightX + stagePad;
  const stageY = topY + stagePad;
  const stageW = rightW - stagePad * 2;
  const stageH = bodyH * 0.64;

  ctx.save();
  drawRoundedRect(ctx, stageX, stageY, stageW, stageH, 24);
  ctx.clip();

  const stageGrad = ctx.createLinearGradient(stageX, stageY, stageX + stageW, stageY + stageH);
  stageGrad.addColorStop(0, '#FFF1F5');
  stageGrad.addColorStop(0.55, '#FEF9C3');
  stageGrad.addColorStop(1, '#D1FAE5');
  ctx.fillStyle = stageGrad;
  ctx.fillRect(stageX, stageY, stageW, stageH);

  // Subtle pop-art halftone texture in stage corner
  drawHalftonePattern(ctx, stageX + 20, stageY + 20, 6, 4, 18, 'rgba(255, 59, 107, 0.16)', 3.6);

  // Soft floor shadow under treat box
  const boxCenterX = stageX + stageW * 0.48;
  const boxBottomY = stageY + stageH * 0.84;
  ctx.fillStyle = 'rgba(28, 25, 23, 0.14)';
  ctx.beginPath();
  ctx.ellipse(boxCenterX, boxBottomY, stageW * 0.25, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // ILLUSTRATED LUXURY TREAT / GIFT BOX
  const boxW = stageW * 0.42;
  const boxH = stageH * 0.42;
  const boxX = boxCenterX - boxW * 0.5;
  const boxY = boxBottomY - boxH - 4;

  // Box Base (pastel strawberry cream + subtle side shading)
  ctx.fillStyle = '#FFE0EB';
  drawRoundedRect(ctx, boxX, boxY, boxW, boxH, 16);
  ctx.fill();

  // Right depth panel on base for tactile box volume
  ctx.fillStyle = '#FFC2D6';
  drawRoundedRect(ctx, boxX + boxW * 0.72, boxY, boxW * 0.28, boxH, 14);
  ctx.fill();

  // Crisp ink outline on box base
  ctx.strokeStyle = '#1C1917';
  ctx.lineWidth = 2.5;
  drawRoundedRect(ctx, boxX, boxY, boxW, boxH, 16);
  ctx.stroke();

  // Vertical Cobalt Satin Ribbon across box base
  const ribW = boxW * 0.16;
  const ribX = boxCenterX - ribW * 0.5;
  ctx.fillStyle = cobalt;
  ctx.fillRect(ribX, boxY + 2, ribW, boxH - 4);
  ctx.strokeStyle = '#1C1917';
  ctx.lineWidth = 2;
  ctx.strokeRect(ribX, boxY + 1, ribW, boxH - 2);

  // Decorative Candy Stripe Label on Box Front
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, boxX + boxW * 0.22, boxY + boxH * 0.44, boxW * 0.56, boxH * 0.34, 10);
  ctx.fill();
  ctx.strokeStyle = '#1C1917';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#1C1917';
  ctx.textAlign = 'center';
  ctx.font = `800 ${Math.round(width * 0.0086)}px "JetBrains Mono", monospace`;
  ctx.fillText('EDITION Nº1', boxCenterX, boxY + boxH * 0.62);
  ctx.textAlign = 'left';

  // Overhanging Colorful Lid (Strawberry Pink)
  const lidW = boxW + 24;
  const lidH = boxH * 0.27;
  const lidX = boxCenterX - lidW * 0.5;
  const lidY = boxY - lidH * 0.65;

  // Lid bottom shadow cast onto box base
  ctx.fillStyle = 'rgba(28, 25, 23, 0.12)';
  ctx.fillRect(boxX + 3, lidY + lidH, boxW - 6, 8);

  ctx.fillStyle = pink;
  drawRoundedRect(ctx, lidX, lidY, lidW, lidH, 12);
  ctx.fill();
  ctx.strokeStyle = '#1C1917';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Cobalt Ribbon Band across Lid
  ctx.fillStyle = cobalt;
  ctx.fillRect(ribX - 2, lidY + 1, ribW + 4, lidH - 2);
  ctx.strokeStyle = '#1C1917';
  ctx.lineWidth = 2;
  ctx.strokeRect(ribX - 2, lidY + 1, ribW + 4, lidH - 2);

  // Sculpted Lemon Yellow & Mint Bow on Top of Lid
  const bowY = lidY;
  // Left ribbon loop
  ctx.fillStyle = lemon;
  ctx.beginPath();
  ctx.moveTo(boxCenterX, bowY);
  ctx.bezierCurveTo(
    boxCenterX - 52,
    bowY - 46,
    boxCenterX - 78,
    bowY - 6,
    boxCenterX - 10,
    bowY + 2,
  );
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#1C1917';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Right ribbon loop
  ctx.fillStyle = mint;
  ctx.beginPath();
  ctx.moveTo(boxCenterX, bowY);
  ctx.bezierCurveTo(
    boxCenterX + 52,
    bowY - 46,
    boxCenterX + 78,
    bowY - 6,
    boxCenterX + 10,
    bowY + 2,
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Center bow knot
  ctx.fillStyle = cobalt;
  drawRoundedRect(ctx, boxCenterX - 13, bowY - 12, 26, 22, 9);
  ctx.fill();
  ctx.stroke();

  // Pop-Art Sparkles around Gift Box
  drawFourPointSparkle(ctx, boxX - 38, boxY + 28, 16, pink);
  drawFourPointSparkle(ctx, boxX + boxW + 42, boxY + 52, 13, cobalt);
  drawFourPointSparkle(ctx, boxX - 20, lidY - 24, 11, mint);
  drawFourPointSparkle(ctx, boxX + boxW + 24, lidY - 18, 15, lemon);

  ctx.restore();

  // Floating Rotated Yellow "BESTSELLER ★" Sticker Badge
  ctx.save();
  ctx.translate(stageX + stageW - 76, stageY + 58);
  ctx.rotate(0.12);
  ctx.shadowColor = 'rgba(28, 25, 23, 0.16)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 5;
  ctx.fillStyle = lemon;
  drawRoundedRect(ctx, -64, -22, 128, 44, 22);
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.strokeStyle = '#1C1917';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.fillStyle = '#1C1917';
  ctx.textAlign = 'center';
  ctx.font = `800 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
  ctx.fillText('BESTSELLER ★', 0, 2);
  ctx.restore();
  ctx.textAlign = 'left';

  // Bottom Card Details: Signature Treat Box + €28.00 + Color Swatches + QUICK ADD +
  const footY = stageY + stageH + 22;
  ctx.fillStyle = palette.text;
  ctx.font = `800 ${Math.round(width * 0.018)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Signature Treat Box', stageX, footY + 26);

  ctx.textAlign = 'right';
  ctx.fillStyle = pink;
  ctx.font = `800 ${Math.round(width * 0.0175)}px "JetBrains Mono", monospace`;
  ctx.fillText('€28.00', stageX + stageW, footY + 26);
  ctx.textAlign = 'left';

  // Candy Swatches
  const swatches = [pink, lemon, mint, cobalt];
  swatches.forEach((col, idx) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(stageX + 16 + idx * 36, footY + 84, 12, 0, Math.PI * 2);
    ctx.fill();
    if (idx === 0) {
      ctx.strokeStyle = palette.text;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(stageX + 16, footY + 84, 17, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  // QUICK ADD + Pill Button
  ctx.fillStyle = '#1C1917';
  drawRoundedRect(ctx, stageX + stageW * 0.48, footY + 60, stageW * 0.52, 48, 24);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = `800 ${Math.round(width * 0.0102)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('QUICK ADD +', stageX + stageW * 0.74, footY + 85);
  ctx.textAlign = 'left';
}
