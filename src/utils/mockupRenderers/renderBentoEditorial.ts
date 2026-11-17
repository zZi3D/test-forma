import { ProjectConfig } from '../../data/projects';
import {
  applyEditorialGrain,
  drawBrowserChrome,
  drawRoundedRect,
  drawWrappedText,
} from './canvasPrimitives';

export function renderBentoEditorial(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;

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
  ctx.fillStyle = palette.accent;
  ctx.fillRect(0, headerBottom, width * 0.62, 5);

  const topY = headerBottom + height * 0.048;
  const contentW = width - padX * 2;
  const gap = width * 0.02;

  // 3 Bento Columns
  const leftW = contentW * 0.37;
  const midW = contentW * 0.39;
  const rightW = contentW - leftW - midW - gap * 2;
  const fullH = height - topY - height * 0.065;

  // =========================================================================
  // LEFT COLUMN: Feature Editorial Headline + Pull-Quote & Keynote CTA
  // =========================================================================
  const leftTopH = fullH * 0.57;
  ctx.fillStyle = '#FFFFFF';
  drawRoundedRect(ctx, padX, topY, leftW, leftTopH, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(28, 27, 24, 0.10)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const innerPad = width * 0.023;
  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.0092)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX + innerPad, topY + height * 0.052);

  // Literary serif headline: "Ideas Worth / Sharing on Stage."
  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.039)}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillText('Ideas Worth', padX + innerPad, topY + height * 0.13);
  ctx.fillText('Sharing on Stage.', padX + innerPad, topY + height * 0.205);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0115)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Book showcases, keynote recordings & essays.', padX + innerPad, topY + height * 0.275);

  // Two-column simulated editorial text rules inside magazine tile
  ctx.fillStyle = 'rgba(28, 27, 24, 0.20)';
  const miniColW = (leftW - innerPad * 2 - 18) / 2;
  for (let line = 0; line < 4; line++) {
    ctx.fillRect(
      padX + innerPad,
      topY + height * (0.33 + line * 0.028),
      miniColW * (line === 3 ? 0.65 : 1),
      4,
    );
    ctx.fillRect(
      padX + innerPad + miniColW + 18,
      topY + height * (0.33 + line * 0.028),
      miniColW * (line === 3 ? 0.5 : 1),
      4,
    );
  }

  // Bottom-left Editorial Pull-Quote & Keynote CTA Tile
  const quoteY = topY + leftTopH + gap;
  const quoteH = fullH - leftTopH - gap;
  ctx.fillStyle = palette.text; // Deep espresso-graphite contrast tile
  drawRoundedRect(ctx, padX, quoteY, leftW, quoteH, 16);
  ctx.fill();

  ctx.fillStyle = palette.surface;
  ctx.font = `italic 500 ${Math.round(width * 0.0188)}px "Cormorant Garamond", Georgia, serif`;
  const quoteText =
    previewSample.quote || '“Great editorial design gives every idea room to breathe.”';
  drawWrappedText(
    ctx,
    quoteText,
    padX + innerPad,
    quoteY + quoteH * 0.34,
    leftW - innerPad * 2,
    quoteH * 0.19,
    2,
  );

  ctx.fillStyle = '#D6C4AD';
  ctx.font = `600 ${Math.round(width * 0.009)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.ctaLabel, padX + innerPad, quoteY + quoteH * 0.78);

  // =========================================================================
  // CENTER COLUMN: Author Hardcover Book Mockup + Embedded Keynote Audio Bar
  // =========================================================================
  const midX = padX + leftW + gap;
  ctx.save();
  drawRoundedRect(ctx, midX, topY, midW, fullH, 16);
  ctx.clip();

  // Warm archival sunlit desk background
  const showcaseGrad = ctx.createLinearGradient(midX, topY, midX + midW, topY + fullH);
  showcaseGrad.addColorStop(0, '#EFEAE1');
  showcaseGrad.addColorStop(0.6, '#E2DACD');
  showcaseGrad.addColorStop(1, '#CFC3B2');
  ctx.fillStyle = showcaseGrad;
  ctx.fillRect(midX, topY, midW, fullH);

  // Subtle warm radial spotlight behind hardcover book
  const bookCenterX = midX + midW * 0.5;
  const bookCenterY = topY + fullH * 0.39;
  const spotGrad = ctx.createRadialGradient(
    bookCenterX - 30,
    bookCenterY - 40,
    20,
    bookCenterX,
    bookCenterY,
    midW * 0.55,
  );
  spotGrad.addColorStop(0, 'rgba(255, 253, 248, 0.75)');
  spotGrad.addColorStop(1, 'rgba(255, 253, 248, 0)');
  ctx.fillStyle = spotGrad;
  ctx.fillRect(midX, topY, midW, fullH * 0.75);

  // Book dimensions
  const bookW = midW * 0.48;
  const bookH = fullH * 0.56;
  const bookX = bookCenterX - bookW * 0.5;
  const bookY = topY + fullH * 0.095;

  // Drop shadow beneath hardcover book
  ctx.save();
  ctx.shadowColor = 'rgba(28, 27, 24, 0.28)';
  ctx.shadowBlur = 34;
  ctx.shadowOffsetX = 16;
  ctx.shadowOffsetY = 24;
  ctx.fillStyle = '#1C1B18';
  drawRoundedRect(ctx, bookX, bookY, bookW, bookH, 8);
  ctx.fill();
  ctx.restore();

  // Subtle cream page thickness protruding slightly at right & bottom
  ctx.fillStyle = '#F7F5F0';
  drawRoundedRect(ctx, bookX + 8, bookY + 5, bookW + 6, bookH - 4, 6);
  ctx.fill();
  // Fine horizontal page striations on right edge
  ctx.strokeStyle = 'rgba(107, 91, 75, 0.28)';
  ctx.lineWidth = 1;
  for (let p = 1; p <= 4; p++) {
    ctx.beginPath();
    ctx.moveTo(bookX + bookW + p * 1.4, bookY + 8);
    ctx.lineTo(bookX + bookW + p * 1.4, bookY + bookH - 2);
    ctx.stroke();
  }

  // Bookmark ribbon peeking from bottom edge of book
  ctx.fillStyle = '#8C4A32';
  ctx.beginPath();
  ctx.moveTo(bookX + bookW * 0.74, bookY + bookH - 2);
  ctx.lineTo(bookX + bookW * 0.80, bookY + bookH - 2);
  ctx.lineTo(bookX + bookW * 0.80, bookY + bookH + 34);
  ctx.lineTo(bookX + bookW * 0.77, bookY + bookH + 25);
  ctx.lineTo(bookX + bookW * 0.74, bookY + bookH + 34);
  ctx.closePath();
  ctx.fill();

  // Main tactile linen-bound hardcover front cover
  const coverGrad = ctx.createLinearGradient(bookX, bookY, bookX + bookW, bookY + bookH);
  coverGrad.addColorStop(0, '#292622');
  coverGrad.addColorStop(0.5, '#1F1D1A');
  coverGrad.addColorStop(1, '#141311');
  ctx.fillStyle = coverGrad;
  drawRoundedRect(ctx, bookX, bookY, bookW, bookH, 7);
  ctx.fill();

  // Tactile spine crease & brass-gold foil spine rule
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.fillRect(bookX + 16, bookY, 3, bookH);
  ctx.fillStyle = '#C9A875';
  ctx.fillRect(bookX + 20, bookY + 28, 1.5, bookH - 56);

  // Subtle brass frame inside book cover
  ctx.strokeStyle = 'rgba(201, 168, 117, 0.35)';
  ctx.lineWidth = 1.2;
  drawRoundedRect(ctx, bookX + 32, bookY + 24, bookW - 48, bookH - 48, 3);
  ctx.stroke();

  // Book cover typography (gold-foil embossed style)
  ctx.fillStyle = '#C9A875';
  ctx.font = `600 ${Math.round(width * 0.0075)}px "JetBrains Mono", monospace`;
  ctx.fillText('MONOGRAPH VOL. IV', bookX + 46, bookY + 54);

  ctx.fillStyle = '#F7F5F0';
  ctx.font = `600 ${Math.round(width * 0.021)}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillText('The Architecture', bookX + 46, bookY + 114);
  ctx.fillText('of Clear Ideas', bookX + 46, bookY + 148);

  // Minimal geometric book emblem
  const embX = bookX + bookW * 0.53;
  const embY = bookY + bookH * 0.62;
  ctx.strokeStyle = '#C9A875';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(embX, embY, 26, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(embX, embY, 13, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#C9A875';
  ctx.beginPath();
  ctx.arc(embX, embY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(247, 245, 240, 0.68)';
  ctx.font = `500 ${Math.round(width * 0.0072)}px "JetBrains Mono", monospace`;
  ctx.fillText('4TH PRINT // HARDCOVER', bookX + 46, bookY + bookH - 42);

  // Sleek Embedded Podcast / Keynote Audio Player Bar (bottom of center tile)
  const playerPad = 24;
  const playerW = midW - playerPad * 2;
  const playerH = fullH * 0.195;
  const playerX = midX + playerPad;
  const playerY = topY + fullH - playerH - 22;

  ctx.save();
  ctx.shadowColor = 'rgba(28, 27, 24, 0.22)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = '#1C1B18';
  drawRoundedRect(ctx, playerX, playerY, playerW, playerH, 14);
  ctx.fill();
  ctx.restore();

  // Play Button Circle
  const playR = playerH * 0.27;
  const playCX = playerX + 26 + playR;
  const playCY = playerY + playerH * 0.5;
  ctx.fillStyle = '#EAE5DC';
  ctx.beginPath();
  ctx.arc(playCX, playCY, playR, 0, Math.PI * 2);
  ctx.fill();

  // Play Triangle
  ctx.fillStyle = '#1C1B18';
  ctx.beginPath();
  ctx.moveTo(playCX - playR * 0.24, playCY - playR * 0.34);
  ctx.lineTo(playCX + playR * 0.38, playCY);
  ctx.lineTo(playCX - playR * 0.24, playCY + playR * 0.34);
  ctx.closePath();
  ctx.fill();

  // Track Title & Duration
  const trackX = playCX + playR + 20;
  ctx.fillStyle = '#F7F5F0';
  ctx.font = `600 ${Math.round(width * 0.0086)}px "JetBrains Mono", monospace`;
  ctx.fillText('EP. 14 · THE FUTURE OF WORK', trackX, playerY + playerH * 0.34);

  ctx.fillStyle = '#A89B8C';
  ctx.font = `500 ${Math.round(width * 0.0076)}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'right';
  ctx.fillText('14:22 / 28:40', playerX + playerW - 22, playerY + playerH * 0.34);
  ctx.textAlign = 'left';

  // Waveform bars inside audio player
  const waveHeights = [0.35, 0.65, 0.9, 0.5, 0.85, 0.45, 0.95, 0.7, 0.4, 0.8, 0.6, 0.9, 0.55, 0.75, 0.45, 0.85, 0.6, 0.35, 0.7, 0.5, 0.65, 0.4];
  const waveStartX = trackX;
  const waveEndX = playerX + playerW - 24;
  const waveSpan = waveEndX - waveStartX;
  const barStep = waveSpan / waveHeights.length;
  const barW = Math.max(3, barStep * 0.52);
  const maxWaveH = playerH * 0.34;
  const waveBaseY = playerY + playerH * 0.76;

  waveHeights.forEach((wh, i) => {
    const bx = waveStartX + i * barStep;
    const bh = maxWaveH * wh;
    const isPlayed = i < 12;
    ctx.fillStyle = isPlayed ? '#EAE5DC' : 'rgba(234, 229, 220, 0.28)';
    drawRoundedRect(ctx, bx, waveBaseY - bh * 0.7, barW, bh, 2);
    ctx.fill();
  });

  applyEditorialGrain(ctx, midX, topY, midW, fullH, 707, 0.035);
  ctx.restore();

  // =========================================================================
  // RIGHT COLUMN: 3 Stacked Modular Index Cards (Speaking, Monograph, Podcast)
  // =========================================================================
  const rightX = midX + midW + gap;
  const tileH = (fullH - gap * 2) / 3;
  previewSample.metrics.forEach((m, idx) => {
    const ty = topY + idx * (tileH + gap);
    ctx.fillStyle = idx === 1 ? palette.surface : '#FFFFFF';
    drawRoundedRect(ctx, rightX, ty, rightW, tileH, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(28, 27, 24, 0.10)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = palette.accent;
    ctx.font = `600 ${Math.round(width * 0.0082)}px "JetBrains Mono", monospace`;
    ctx.fillText(previewSample.cardLabels[idx] || m.label, rightX + 22, ty + tileH * 0.28);

    ctx.fillStyle = palette.text;
    ctx.font = `600 ${Math.round(width * 0.0195)}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillText(m.value, rightX + 22, ty + tileH * 0.58);

    ctx.fillStyle = palette.secondary;
    ctx.font = `500 ${Math.round(width * 0.0084)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.label, rightX + 22, ty + tileH * 0.8);
  });
}
