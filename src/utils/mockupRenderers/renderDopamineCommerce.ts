import { ProjectConfig } from '../../data/projects';
import { drawBrowserChrome, drawRoundedRect } from './canvasPrimitives';

export function renderDopamineCommerce(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;

  // Warm cream base (#FFFDF7)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Subtle cheerful radial peach/lemon glow
  const glow = ctx.createRadialGradient(
    width * 0.72,
    height * 0.42,
    width * 0.02,
    width * 0.72,
    height * 0.42,
    width * 0.42,
  );
  glow.addColorStop(0, 'rgba(250, 204, 21, 0.28)');
  glow.addColorStop(0.55, 'rgba(255, 77, 36, 0.10)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#FFF5EB',
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

  // LEFT COLUMN: Playful Pill Tags, Chunky Display Headline & Conversion CTA
  const pillColors = ['#FACC15', '#DBEAFE', '#D1FAE5'];
  const pillTextColors = ['#1C1917', '#1D4ED8', '#065F46'];
  previewSample.cardLabels.forEach((lbl, idx) => {
    const px = padX + idx * width * 0.102;
    ctx.fillStyle = pillColors[idx % pillColors.length];
    drawRoundedRect(ctx, px, topY, width * 0.092, 34, 17);
    ctx.fill();

    ctx.fillStyle = pillTextColors[idx % pillTextColors.length];
    ctx.font = `700 ${Math.round(width * 0.0088)}px "JetBrains Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(lbl, px + width * 0.046, topY + 18);
  });
  ctx.textAlign = 'left';

  // Chunky Display Headline
  ctx.fillStyle = palette.text;
  ctx.font = `800 ${Math.round(width * 0.056)}px "Plus Jakarta Sans", sans-serif`;
  const words = previewSample.headline.split(' ');
  const splitIdx = Math.ceil(words.length / 2);
  ctx.fillText(words.slice(0, splitIdx).join(' '), padX, topY + height * 0.165);
  ctx.fillStyle = palette.accent;
  ctx.fillText(words.slice(splitIdx).join(' '), padX, topY + height * 0.26);

  ctx.fillStyle = '#57534E';
  ctx.font = `500 ${Math.round(width * 0.013)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.subheadline.slice(0, 50), padX, topY + height * 0.345);

  // High-Visibility Conversion CTA Pill + Secondary Cobalt Badge
  const ctaY = topY + height * 0.415;
  ctx.save();
  ctx.shadowColor = 'rgba(255, 77, 36, 0.32)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = palette.accent;
  drawRoundedRect(ctx, padX, ctaY, width * 0.22, 60, 30);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `800 ${Math.round(width * 0.0115)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, padX + 28, ctaY + 31);

  // Secondary social-proof pill beside CTA
  ctx.fillStyle = palette.secondary;
  drawRoundedRect(ctx, padX + width * 0.238, ctaY + 6, width * 0.145, 48, 24);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText('FREE SHIPPING', padX + width * 0.256, ctaY + 31);

  // Bottom-Left Trio of Playful Review / Value Stat Cards
  const statY = topY + bodyH * 0.68;
  const statH = bodyH * 0.32;
  const statW = (leftW - width * 0.024) / 3;
  const cardTints = ['#FEF3C7', '#E0E7FF', '#DCFCE7'];

  previewSample.metrics.forEach((m, idx) => {
    const sx = padX + idx * (statW + width * 0.012);
    ctx.fillStyle = cardTints[idx % cardTints.length];
    drawRoundedRect(ctx, sx, statY, statW, statH, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(28, 25, 23, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#57534E';
    ctx.font = `700 ${Math.round(width * 0.0082)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, sx + 18, statY + statH * 0.35);

    ctx.fillStyle = palette.text;
    ctx.font = `800 ${Math.round(width * 0.0175)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.value, sx + 18, statY + statH * 0.68);
  });

  // RIGHT COLUMN: Vibrant Product Spotlight Card
  ctx.save();
  ctx.shadowColor = 'rgba(28, 25, 23, 0.1)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetY = 14;
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, rightX, topY, rightW, bodyH, 32);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = 'rgba(28, 25, 23, 0.1)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, rightX, topY, rightW, bodyH, 32);
  ctx.stroke();

  // Colorful Product Stage inside Card
  const stagePad = 24;
  const stageX = rightX + stagePad;
  const stageY = topY + stagePad;
  const stageW = rightW - stagePad * 2;
  const stageH = bodyH * 0.64;

  const stageGrad = ctx.createLinearGradient(stageX, stageY, stageX + stageW, stageY + stageH);
  stageGrad.addColorStop(0, '#FFEDD5');
  stageGrad.addColorStop(0.55, '#FDE68A');
  stageGrad.addColorStop(1, '#FCA5A5');
  ctx.fillStyle = stageGrad;
  drawRoundedRect(ctx, stageX, stageY, stageW, stageH, 24);
  ctx.fill();

  // Playful geometric product packaging visual
  const canW = stageW * 0.34;
  const canH = stageH * 0.72;
  const canX = stageX + (stageW - canW) * 0.5;
  const canY = stageY + (stageH - canH) * 0.52;

  ctx.save();
  ctx.shadowColor = 'rgba(28, 25, 23, 0.18)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = palette.accent;
  drawRoundedRect(ctx, canX, canY, canW, canH, 28);
  ctx.fill();
  ctx.restore();

  // Bright cobalt decorative wave label on product
  ctx.fillStyle = palette.secondary;
  drawRoundedRect(ctx, canX + 14, canY + canH * 0.28, canW - 28, canH * 0.42, 16);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = `800 ${Math.round(width * 0.017)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('DROP 01', canX + canW * 0.5, canY + canH * 0.47);
  ctx.font = `600 ${Math.round(width * 0.009)}px "JetBrains Mono", monospace`;
  ctx.fillText('BESTSELLER', canX + canW * 0.5, canY + canH * 0.59);
  ctx.textAlign = 'left';

  // Floating Yellow Sticker Badge top-right of stage
  ctx.save();
  ctx.translate(stageX + stageW - 62, stageY + 52);
  ctx.rotate(0.14);
  ctx.fillStyle = '#FACC15';
  ctx.beginPath();
  ctx.arc(0, 0, 44, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#1C1917';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.fillStyle = '#1C1917';
  ctx.textAlign = 'center';
  ctx.font = `800 ${Math.round(width * 0.011)}px "JetBrains Mono", monospace`;
  ctx.fillText('NEW!', 0, 3);
  ctx.restore();
  ctx.textAlign = 'left';

  // Bottom Card Interactive Selector Strip inside Product Spotlight
  const footY = stageY + stageH + 22;
  ctx.fillStyle = palette.text;
  ctx.font = `800 ${Math.round(width * 0.019)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Starter Trio Pack', stageX, footY + 26);

  ctx.fillStyle = palette.secondary;
  ctx.font = `700 ${Math.round(width * 0.016)}px "JetBrains Mono", monospace`;
  ctx.fillText('$38.00', stageX + stageW - 92, footY + 26);

  // Swatch dots + Quick Add Bar
  const swatches = ['#FF4D24', '#2563EB', '#10B981', '#FACC15'];
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

  ctx.fillStyle = '#1C1917';
  drawRoundedRect(ctx, stageX + stageW * 0.44, footY + 60, stageW * 0.56, 48, 24);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = `700 ${Math.round(width * 0.01)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('QUICK ADD TO BAG +', stageX + stageW * 0.72, footY + 85);
  ctx.textAlign = 'left';
}
