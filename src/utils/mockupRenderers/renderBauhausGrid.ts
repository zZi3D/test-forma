import { ProjectConfig } from '../../data/projects';
import { drawBrowserChrome } from './canvasPrimitives';

export function renderBauhausGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, content } = project;
  const ink = palette.text; // #111111
  const red = palette.accent; // #D93829
  const blue = palette.secondary; // #1D4ED8

  // Unbleached archival paper (#F4F1EA)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#EAE5DA',
    borderAlpha: 1,
    navItemsColor: ink,
    solidDivider: true,
  });

  // Constructivist Structural Grid Rules across entire page
  const gridX1 = width * 0.36;
  const gridX2 = width * 0.68;
  const midY = headerBottom + (height - headerBottom) * 0.62;

  ctx.strokeStyle = ink;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(gridX1, headerBottom);
  ctx.lineTo(gridX1, height);
  ctx.moveTo(gridX2, headerBottom);
  ctx.lineTo(gridX2, midY);
  ctx.moveTo(0, midY);
  ctx.lineTo(width, midY);
  ctx.stroke();

  // TOP-LEFT CELL: Oversized Multi-Scale Sans Glyphs (Aa Bb Cc)
  const topH = midY - headerBottom;
  ctx.fillStyle = ink;
  ctx.font = `700 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.fillText(content.eyebrow, padX, headerBottom + topH * 0.12);

  ctx.font = `800 ${Math.round(width * 0.088)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Aa', padX, headerBottom + topH * 0.44);

  ctx.fillStyle = red;
  ctx.font = `700 ${Math.round(width * 0.056)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Bb', padX + width * 0.145, headerBottom + topH * 0.44);

  ctx.fillStyle = blue;
  ctx.font = `600 ${Math.round(width * 0.036)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Cc', padX + width * 0.245, headerBottom + topH * 0.44);

  ctx.fillStyle = ink;
  ctx.font = `700 ${Math.round(width * 0.022)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(content.headline, padX, headerBottom + topH * 0.68);
  ctx.font = `400 ${Math.round(width * 0.0115)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(content.subheadline.slice(0, 40), padX, headerBottom + topH * 0.8);

  // TOP-CENTER CELL: Abstract Bauhaus Circle + Triangle + Structural Bars
  const cenW = gridX2 - gridX1;
  ctx.save();
  ctx.beginPath();
  ctx.rect(gridX1, headerBottom, cenW, topH);
  ctx.clip();

  // Cobalt blue block quadrant
  ctx.fillStyle = blue;
  ctx.fillRect(gridX1 + cenW * 0.52, headerBottom, cenW * 0.48, topH * 0.46);

  // Bauhaus red circle
  ctx.fillStyle = red;
  ctx.beginPath();
  ctx.arc(gridX1 + cenW * 0.42, headerBottom + topH * 0.48, cenW * 0.26, 0, Math.PI * 2);
  ctx.fill();

  // Pitch-black geometric triangle intersecting circle
  ctx.fillStyle = ink;
  ctx.beginPath();
  ctx.moveTo(gridX1 + cenW * 0.12, headerBottom + topH * 0.88);
  ctx.lineTo(gridX1 + cenW * 0.48, headerBottom + topH * 0.2);
  ctx.lineTo(gridX1 + cenW * 0.84, headerBottom + topH * 0.88);
  ctx.closePath();
  ctx.fill();

  // Clean structural white cross rule
  ctx.strokeStyle = palette.bg;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(gridX1 + cenW * 0.48, headerBottom + topH * 0.14);
  ctx.lineTo(gridX1 + cenW * 0.48, headerBottom + topH * 0.92);
  ctx.stroke();
  ctx.restore();

  // TOP-RIGHT CELL: Bold Primary Color Blocks & Weight Specimens
  const rightW = width - gridX2;
  ctx.fillStyle = red;
  ctx.fillRect(gridX2, headerBottom, rightW, topH * 0.5);
  ctx.strokeStyle = ink;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(gridX2, headerBottom + topH * 0.5);
  ctx.lineTo(width, headerBottom + topH * 0.5);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `800 ${Math.round(width * 0.044)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('1926', gridX2 + width * 0.025, headerBottom + topH * 0.27);
  ctx.font = `600 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.fillText('GEOMETRIC GROTESK', gridX2 + width * 0.025, headerBottom + topH * 0.4);

  // Lower right cell: interactive weight pills
  content.cardLabels.forEach((lbl, idx) => {
    const ly = headerBottom + topH * (0.61 + idx * 0.125);
    ctx.fillStyle = idx === 1 ? blue : ink;
    ctx.fillRect(gridX2 + width * 0.025, ly - 10, 12, 12);
    ctx.fillStyle = ink;
    ctx.font = `700 ${Math.round(width * 0.0115)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(lbl, gridX2 + width * 0.045, ly);
  });

  // BOTTOM BAND: Interactive Type-Specimen Tester
  const botH = height - midY;
  // Left bottom: specimen controls
  ctx.fillStyle = ink;
  ctx.font = `700 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText('INTERACTIVE SPECIMEN TESTER', padX, midY + botH * 0.24);

  content.metrics.forEach((m, idx) => {
    const my = midY + botH * (0.48 + idx * 0.18);
    ctx.fillStyle = ink;
    ctx.font = `600 12px "JetBrains Mono", monospace`;
    ctx.fillText(`${m.label}: ${m.value}`, padX, my);
  });

  // Slider track inside specimen bar
  const trackX = padX;
  const trackW = gridX1 - padX * 2;
  const trackY = midY + botH * 0.86;
  ctx.fillStyle = ink;
  ctx.fillRect(trackX, trackY, trackW, 4);
  ctx.fillStyle = red;
  ctx.fillRect(trackX + trackW * 0.56, trackY - 8, 16, 20);

  // Right bottom: Large live editable type tester preview
  const testerX = gridX1 + width * 0.03;
  ctx.fillStyle = ink;
  ctx.font = `800 ${Math.round(width * 0.056)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('FORM FOLLOWS', testerX, midY + botH * 0.52);

  // Highlighted blue CTA pill bottom-right
  const ctaW = width * 0.18;
  const ctaH = botH * 0.34;
  const ctaX = width - padX - ctaW;
  const ctaY = midY + botH * 0.54;
  ctx.fillStyle = blue;
  ctx.fillRect(ctaX, ctaY, ctaW, ctaH);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.011)}px "JetBrains Mono", monospace`;
  ctx.fillText(content.ctaLabel, ctaX + 26, ctaY + ctaH * 0.55);
}
