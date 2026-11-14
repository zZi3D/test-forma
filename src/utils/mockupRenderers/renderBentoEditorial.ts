import { ProjectConfig } from '../../data/projects';
import {
  applyEditorialGrain,
  drawBrowserChrome,
  drawRoundedRect,
} from './canvasPrimitives';

export function renderBentoEditorial(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, content } = project;

  // Warm archival paper white (#F7F5F0)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#EFECE4',
    borderAlpha: 0.14,
    navItemsColor: palette.accent,
  });

  // Subtle Reading Progress Bar along bottom edge of top navigation
  ctx.fillStyle = 'rgba(28, 27, 24, 0.08)';
  ctx.fillRect(0, headerBottom, width, 5);
  ctx.fillStyle = palette.accent; // #6B5B4B sepia-brown reading progress
  ctx.fillRect(0, headerBottom, width * 0.62, 5);

  const topY = headerBottom + height * 0.048;
  const contentW = width - padX * 2;
  const gap = width * 0.02;

  // LEFT BENTO COLUMN (38%): Editorial Issue Headline + Pull Quote Tile
  const leftW = contentW * 0.38;
  const midW = contentW * 0.36;
  const rightW = contentW - leftW - midW - gap * 2;
  const fullH = height - topY - height * 0.065;

  // Top-left Feature Editorial Column Tile
  const leftTopH = fullH * 0.58;
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, padX, topY, leftW, leftTopH, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(28, 27, 24, 0.10)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const innerPad = width * 0.024;
  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(content.eyebrow, padX + innerPad, topY + height * 0.055);

  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.042)}px "Cormorant Garamond", Georgia, serif`;
  const [h1, h2, ...hRest] = content.headline.split(' ');
  ctx.fillText(`${h1} ${h2}`, padX + innerPad, topY + height * 0.135);
  ctx.fillText(hRest.join(' '), padX + innerPad, topY + height * 0.21);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.012)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(content.subheadline.slice(0, 44), padX + innerPad, topY + height * 0.285);

  // Two-column simulated editorial text rules inside magazine tile
  ctx.fillStyle = 'rgba(28, 27, 24, 0.22)';
  const miniColW = (leftW - innerPad * 2 - 18) / 2;
  for (let line = 0; line < 4; line++) {
    ctx.fillRect(
      padX + innerPad,
      topY + height * (0.34 + line * 0.03),
      miniColW * (line === 3 ? 0.65 : 1),
      4,
    );
    ctx.fillRect(
      padX + innerPad + miniColW + 18,
      topY + height * (0.34 + line * 0.03),
      miniColW * (line === 3 ? 0.5 : 1),
      4,
    );
  }

  // Bottom-left Editorial Pull-Quote Bento Tile
  const quoteY = topY + leftTopH + gap;
  const quoteH = fullH - leftTopH - gap;
  ctx.fillStyle = palette.text; // Deep graphite contrast tile
  drawRoundedRect(ctx, padX, quoteY, leftW, quoteH, 16);
  ctx.fill();

  ctx.fillStyle = palette.surface;
  ctx.font = `italic 500 ${Math.round(width * 0.02)}px "Cormorant Garamond", Georgia, serif`;
  const quoteText =
    content.quote || '“Architecture begins when light enters a silent room.”';
  ctx.fillText(quoteText.slice(0, 36), padX + innerPad, quoteY + quoteH * 0.38);
  ctx.fillText(quoteText.slice(36, 74), padX + innerPad, quoteY + quoteH * 0.56);

  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(content.ctaLabel, padX + innerPad, quoteY + quoteH * 0.8);

  // CENTER BENTO TILE (36%): Warm Sepia & Graphite Duotone Interior Photo
  const midX = padX + leftW + gap;
  ctx.save();
  drawRoundedRect(ctx, midX, topY, midW, fullH, 16);
  ctx.clip();

  // Sepia duotone architectural room wash
  const roomGrad = ctx.createLinearGradient(midX, topY, midX + midW, topY + fullH);
  roomGrad.addColorStop(0, '#E8DFD2');
  roomGrad.addColorStop(0.55, '#9F8E7B');
  roomGrad.addColorStop(1, '#26231E');
  ctx.fillStyle = roomGrad;
  ctx.fillRect(midX, topY, midW, fullH);

  // Perspective architectural colonnade / limestone interior walls
  ctx.fillStyle = '#1C1B18';
  ctx.fillRect(midX, topY, midW * 0.24, fullH);
  ctx.fillRect(midX + midW * 0.78, topY, midW * 0.22, fullH);

  // Sunlit window aperture + diagonal daylight beam across floor
  ctx.fillStyle = '#F7F5F0';
  ctx.fillRect(midX + midW * 0.34, topY + fullH * 0.14, midW * 0.32, fullH * 0.52);

  // Diagonal shaft of warm sepia daylight
  const sunBeam = ctx.createLinearGradient(
    midX + midW * 0.34,
    topY + fullH * 0.45,
    midX + midW * 0.9,
    topY + fullH,
  );
  sunBeam.addColorStop(0, 'rgba(247, 245, 240, 0.78)');
  sunBeam.addColorStop(1, 'rgba(107, 91, 75, 0.12)');
  ctx.fillStyle = sunBeam;
  ctx.beginPath();
  ctx.moveTo(midX + midW * 0.34, topY + fullH * 0.66);
  ctx.lineTo(midX + midW * 0.66, topY + fullH * 0.66);
  ctx.lineTo(midX + midW * 0.95, topY + fullH);
  ctx.lineTo(midX + midW * 0.14, topY + fullH);
  ctx.closePath();
  ctx.fill();

  // Photographic plate label bottom-left
  ctx.fillStyle = '#F7F5F0';
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText('PLATE IV // VILLA MIES, DAYLIGHT STUDY', midX + 26, topY + fullH - 28);

  applyEditorialGrain(ctx, midX, topY, midW, fullH, 707, 0.045);
  ctx.restore();

  // RIGHT BENTO COLUMN: 3 Stacked Modular Index Cards
  const rightX = midX + midW + gap;
  const tileH = (fullH - gap * 2) / 3;
  content.metrics.forEach((m, idx) => {
    const ty = topY + idx * (tileH + gap);
    ctx.fillStyle = idx === 1 ? palette.surface : '#FFFFFF';
    drawRoundedRect(ctx, rightX, ty, rightW, tileH, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(28, 27, 24, 0.10)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = palette.accent;
    ctx.font = `600 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
    ctx.fillText(content.cardLabels[idx] || m.label, rightX + 24, ty + tileH * 0.3);

    ctx.fillStyle = palette.text;
    ctx.font = `600 ${Math.round(width * 0.02)}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillText(m.value, rightX + 24, ty + tileH * 0.62);

    ctx.fillStyle = palette.secondary;
    ctx.font = `500 ${Math.round(width * 0.009)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.label, rightX + 24, ty + tileH * 0.82);
  });
}
