import { ProjectConfig } from '../../data/projects';
import { drawBrowserChrome, drawWrappedText } from './canvasPrimitives';

function drawBrutalistBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  ink: string,
  offset = 8,
) {
  // Hard zero-blur drop shadow
  ctx.fillStyle = ink;
  ctx.fillRect(x + offset, y + offset, w, h);

  // Main surface with thick black frame
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 3.5;
  ctx.strokeRect(x, y, w, h);
}

export function renderNeoBrutalism(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;
  const ink = palette.text; // #0A0A0A

  // Warm off-white (#FAF8F2)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: palette.surface, // Butter yellow #FACC15 chrome
    borderAlpha: 1,
    navItemsColor: ink,
    solidDivider: true,
  });

  // Asymmetric split screen with thick 3px border down center-right
  const splitX = width * 0.54;
  ctx.strokeStyle = ink;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(splitX, headerBottom);
  ctx.lineTo(splitX, height);
  ctx.stroke();

  // LEFT SIDE: Oversized overlapping typography & exhibition schedule
  const leftW = splitX - padX - width * 0.035;
  const tagY = headerBottom + height * 0.05;

  // Eyebrow ribbon
  drawBrutalistBox(ctx, padX, tagY, width * 0.24, height * 0.052, palette.secondary, ink, 5);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX + width * 0.014, tagY + height * 0.028);

  // Oversized stacked headline
  ctx.fillStyle = ink;
  ctx.font = `800 ${Math.round(width * 0.058)}px "Plus Jakarta Sans", sans-serif`;
  const words = previewSample.headline.split(' ');
  ctx.fillText(words[0] || 'FORM', padX, tagY + height * 0.155);
  ctx.fillStyle = palette.accent; // Terracotta #E05A36
  ctx.fillText(words.slice(1).join(' ') || 'AGAINST SILENCE', padX, tagY + height * 0.245);

  ctx.fillStyle = ink;
  ctx.font = `600 ${Math.round(width * 0.0122)}px "Plus Jakarta Sans", sans-serif`;
  drawWrappedText(
    ctx,
    previewSample.subheadline,
    padX,
    tagY + height * 0.315,
    leftW - 10,
    height * 0.026,
    2,
  );

  // Energetic Exhibition Agenda Rows
  const agendaY = tagY + height * 0.398;
  const rowColors = ['#FFFFFF', palette.surface, '#FFFFFF'];
  previewSample.metrics.forEach((item, idx) => {
    const ry = agendaY + idx * height * 0.112;
    drawBrutalistBox(ctx, padX, ry, leftW, height * 0.09, rowColors[idx], ink, 6);

    ctx.fillStyle = ink;
    ctx.font = `700 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
    ctx.fillText(item.label, padX + width * 0.018, ry + height * 0.048);

    ctx.font = `700 ${Math.round(width * 0.0125)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(item.value, padX + width * 0.145, ry + height * 0.048);
  });

  // RIGHT SIDE: Poster-style geometric color blocks + rotated sticker stamp
  const rightX = splitX + width * 0.032;
  const rightW = width - rightX - padX;
  const posterY = headerBottom + height * 0.048;
  const posterH = height - posterY - height * 0.175;

  drawBrutalistBox(ctx, rightX, posterY, rightW, posterH, palette.secondary, ink, 10);

  // Geometric poster composition inside right container
  ctx.save();
  ctx.beginPath();
  ctx.rect(rightX + 3, posterY + 3, rightW - 6, posterH - 6);
  ctx.clip();

  // Giant butter-yellow quarter arc
  ctx.fillStyle = palette.surface;
  ctx.beginPath();
  ctx.arc(rightX + rightW * 0.85, posterY + posterH * 0.25, rightW * 0.56, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = ink;
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Terracotta geometric monolith block
  ctx.fillStyle = palette.accent;
  ctx.fillRect(rightX + rightW * 0.12, posterY + posterH * 0.34, rightW * 0.55, posterH * 0.52);
  ctx.strokeRect(rightX + rightW * 0.12, posterY + posterH * 0.34, rightW * 0.55, posterH * 0.52);

  // Overlapping stark black circle
  ctx.fillStyle = ink;
  ctx.beginPath();
  ctx.arc(rightX + rightW * 0.44, posterY + posterH * 0.58, rightW * 0.16, 0, Math.PI * 2);
  ctx.fill();

  // Oversized overlapping "26" poster numeral
  ctx.fillStyle = '#FAF8F2';
  ctx.font = `800 ${Math.round(width * 0.11)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('26', rightX + rightW * 0.16, posterY + posterH * 0.72);
  ctx.restore();

  // Rotated Stamp / Sticker overlapping top-right corner
  ctx.save();
  ctx.translate(rightX + rightW * 0.82, posterY + height * 0.06);
  ctx.rotate(-0.14);
  drawBrutalistBox(ctx, -width * 0.075, -height * 0.04, width * 0.15, height * 0.08, palette.accent, ink, 5);
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = `800 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.cardLabels[0], 0, 2);
  ctx.restore();
  ctx.textAlign = 'left';

  // Bottom CTA Bar on right
  const btnY = posterY + posterH + height * 0.035;
  drawBrutalistBox(ctx, rightX, btnY, rightW, height * 0.082, palette.surface, ink, 7);
  ctx.fillStyle = ink;
  ctx.font = `800 ${Math.round(width * 0.0135)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, rightX + width * 0.025, btnY + height * 0.044);
  ctx.font = `700 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.cardLabels[2], rightX + rightW - width * 0.11, btnY + height * 0.044);
}
