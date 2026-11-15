import { ProjectConfig } from '../../data/projects';

export function seededRandom(seed: number): () => number {
  let s = (seed + 1) * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export function applyEditorialGrain(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  seed: number,
  intensity = 0.06,
) {
  const rand = seededRandom(seed);
  ctx.save();
  const dotCount = Math.min(2400, Math.round((w * h) / 180));
  for (let i = 0; i < dotCount; i++) {
    const gx = x + rand() * w;
    const gy = y + rand() * h;
    ctx.fillStyle =
      rand() > 0.5
        ? `rgba(255,255,255,${intensity})`
        : `rgba(0,0,0,${intensity + 0.01})`;
    ctx.fillRect(gx, gy, 1.6, 1.6);
  }
  ctx.restore();
}

export interface ChromeMetrics {
  padX: number;
  browserH: number;
  navH: number;
  headerBottom: number;
}

export function drawBrowserChrome(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
  options?: {
    chromeBg?: string;
    borderAlpha?: number;
    navItemsColor?: string;
    solidDivider?: boolean;
  },
): ChromeMetrics {
  const { palette, previewSample } = project;
  const padX = width * 0.048;
  const browserH = height * 0.052;
  const navH = height * 0.082;
  const headerBottom = browserH + navH;

  // Top browser window strip
  ctx.fillStyle = options?.chromeBg ?? palette.surface;
  ctx.fillRect(0, 0, width, browserH);

  const dotY = browserH * 0.5;
  for (let d = 0; d < 3; d++) {
    ctx.fillStyle = palette.text;
    ctx.globalAlpha = d === 0 ? 0.52 : 0.22;
    ctx.beginPath();
    ctx.arc(padX + d * (width * 0.014), dotY, Math.max(3, width * 0.004), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 0.55;
  ctx.fillStyle = palette.text;
  ctx.font = `500 ${Math.round(width * 0.0098)}px "JetBrains Mono", monospace`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(`direction // ${project.index}-${project.id}`, width * 0.5, dotY);
  ctx.textAlign = 'left';
  ctx.globalAlpha = 1;

  // Divider lines
  ctx.strokeStyle = palette.text;
  ctx.globalAlpha = options?.solidDivider ? 1 : (options?.borderAlpha ?? 0.12);
  ctx.lineWidth = options?.solidDivider ? 3 : 1.5;
  ctx.beginPath();
  ctx.moveTo(0, browserH);
  ctx.lineTo(width, browserH);
  ctx.moveTo(0, headerBottom);
  ctx.lineTo(width, headerBottom);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Masthead & Navigation Links
  const navY = browserH + navH * 0.52;
  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.0155)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.masthead, padX, navY);

  ctx.font = `600 ${Math.round(width * 0.01)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillStyle = options?.navItemsColor ?? palette.secondary;
  let navX = width - padX;
  for (let i = previewSample.navItems.length - 1; i >= 0; i--) {
    const label = previewSample.navItems[i];
    const tw = ctx.measureText(label).width;
    navX -= tw;
    ctx.fillText(label, navX, navY);
    navX -= width * 0.025;
  }

  return { padX, browserH, navH, headerBottom };
}
