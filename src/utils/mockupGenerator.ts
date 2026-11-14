import { ProjectItem } from '../data/projects';

const dataUrlCache = new Map<string, string>();

function seededRandom(seed: number): () => number {
  let s = (seed + 1) * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
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

function applyEditorialGrain(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  seed: number,
) {
  const rand = seededRandom(seed);
  ctx.save();
  const dotCount = Math.min(1800, Math.round((w * h) / 140));
  for (let i = 0; i < dotCount; i++) {
    const gx = x + rand() * w;
    const gy = y + rand() * h;
    const isLight = rand() > 0.5;
    ctx.fillStyle = isLight ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
    ctx.fillRect(gx, gy, 1.5, 1.5);
  }
  ctx.restore();
}

function drawPhotographicPlate(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  project: ProjectItem,
  variantOffset = 0,
) {
  const { palette, archetype } = project;
  const seed = project.index.charCodeAt(1) * 17 + variantOffset * 31;
  ctx.save();
  drawRoundedRect(ctx, x, y, w, h, 4);
  ctx.clip();

  // 1. Deep photographic base wash
  const baseGrad = ctx.createLinearGradient(x, y, x + w, y + h);
  baseGrad.addColorStop(0, palette.ink);
  baseGrad.addColorStop(0.55, palette.surface);
  baseGrad.addColorStop(1, palette.bg);
  ctx.fillStyle = baseGrad;
  ctx.fillRect(x, y, w, h);

  // 2. Procedural multi-node gradient mesh lighting (key light + rim light + fill)
  const keyMesh = ctx.createRadialGradient(
    x + w * (0.28 + (variantOffset % 3) * 0.16),
    y + h * 0.24,
    w * 0.02,
    x + w * 0.35,
    y + h * 0.3,
    w * 0.72,
  );
  keyMesh.addColorStop(0, palette.accent + 'CC');
  keyMesh.addColorStop(0.45, palette.accent + '44');
  keyMesh.addColorStop(1, 'transparent');
  ctx.fillStyle = keyMesh;
  ctx.fillRect(x, y, w, h);

  const rimMesh = ctx.createRadialGradient(
    x + w * 0.85,
    y + h * 0.78,
    w * 0.02,
    x + w * 0.78,
    y + h * 0.7,
    w * 0.62,
  );
  rimMesh.addColorStop(0, palette.bg + 'AA');
  rimMesh.addColorStop(0.5, palette.surface + '33');
  rimMesh.addColorStop(1, 'transparent');
  ctx.fillStyle = rimMesh;
  ctx.fillRect(x, y, w, h);

  // 3. Domain-specific photographic silhouettes & lighting planes
  if (
    archetype === 'atelier-lookbook' ||
    archetype === 'maison-runway' ||
    archetype === 'silk-capsule'
  ) {
    // Soft studio cyclorama shadow sweep
    const cyc = ctx.createLinearGradient(x, y + h * 0.55, x, y + h);
    cyc.addColorStop(0, 'transparent');
    cyc.addColorStop(1, 'rgba(0,0,0,0.42)');
    ctx.fillStyle = cyc;
    ctx.fillRect(x, y + h * 0.55, w, h * 0.45);

    // Sculptural draped couture figure with rim-lit edge
    ctx.fillStyle = palette.ink;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.5, y + h * 0.18);
    ctx.bezierCurveTo(
      x + w * 0.67,
      y + h * 0.25,
      x + w * 0.75,
      y + h * 0.6,
      x + w * 0.8,
      y + h * 0.98,
    );
    ctx.lineTo(x + w * 0.2, y + h * 0.98);
    ctx.bezierCurveTo(
      x + w * 0.26,
      y + h * 0.6,
      x + w * 0.34,
      y + h * 0.25,
      x + w * 0.5,
      y + h * 0.18,
    );
    ctx.closePath();
    ctx.fill();

    // Rim highlight fold
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = Math.max(2, w * 0.01);
    ctx.beginPath();
    ctx.moveTo(x + w * 0.42, y + h * 0.28);
    ctx.bezierCurveTo(
      x + w * 0.48,
      y + h * 0.46,
      x + w * 0.56,
      y + h * 0.58,
      x + w * 0.64,
      y + h * 0.94,
    );
    ctx.stroke();

    // Portrait silhouette head
    ctx.fillStyle = palette.ink;
    ctx.beginPath();
    ctx.arc(x + w * 0.5, y + h * 0.125, w * 0.055, 0, Math.PI * 2);
    ctx.fill();
  } else if (
    archetype === 'brutalist-monograph' ||
    archetype === 'spatial-pavilion' ||
    archetype === 'timber-residence' ||
    archetype === 'alpine-sanctuary'
  ) {
    // Dramatic architectural horizon sky & reflection
    const horizonY = y + h * 0.76;
    const skyGrad = ctx.createLinearGradient(x, y, x, horizonY);
    skyGrad.addColorStop(0, palette.ink + 'D8');
    skyGrad.addColorStop(0.65, palette.accent + '55');
    skyGrad.addColorStop(1, palette.bg + 'DD');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(x, y, w, horizonY - y);

    // Brutalist concrete cantilever volume
    ctx.fillStyle = palette.ink;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.1, horizonY);
    ctx.lineTo(x + w * 0.1, y + h * 0.28);
    ctx.lineTo(x + w * 0.64, y + h * 0.16);
    ctx.lineTo(x + w * 0.64, horizonY);
    ctx.closePath();
    ctx.fill();

    // Sunlit warm glass aperture
    const glassGrad = ctx.createLinearGradient(
      x + w * 0.24,
      y + h * 0.4,
      x + w * 0.46,
      horizonY,
    );
    glassGrad.addColorStop(0, palette.accent);
    glassGrad.addColorStop(1, palette.bg);
    ctx.fillStyle = glassGrad;
    ctx.fillRect(x + w * 0.25, y + h * 0.42, w * 0.21, horizonY - (y + h * 0.42));

    // Secondary wing shadow
    ctx.fillStyle = palette.surface;
    ctx.globalAlpha = 0.72;
    ctx.beginPath();
    ctx.moveTo(x + w * 0.64, y + h * 0.16);
    ctx.lineTo(x + w * 0.92, y + h * 0.34);
    ctx.lineTo(x + w * 0.92, horizonY);
    ctx.lineTo(x + w * 0.64, horizonY);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    // Ground reflection strip
    ctx.fillStyle = palette.ink;
    ctx.globalAlpha = 0.28;
    ctx.fillRect(x, horizonY, w, y + h - horizonY);
    ctx.globalAlpha = 1;
  } else {
    // Cultural monograph / exhibition poster lighting & geometric sculpture
    const sphereGrad = ctx.createRadialGradient(
      x + w * 0.44,
      y + h * 0.4,
      w * 0.04,
      x + w * 0.5,
      y + h * 0.48,
      Math.min(w, h) * 0.36,
    );
    sphereGrad.addColorStop(0, palette.bg);
    sphereGrad.addColorStop(0.55, palette.accent);
    sphereGrad.addColorStop(1, palette.ink);
    ctx.fillStyle = sphereGrad;
    ctx.beginPath();
    ctx.arc(x + w * 0.5, y + h * 0.48, Math.min(w, h) * 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Constructivist crosshair & rings
    ctx.strokeStyle = palette.bg;
    ctx.globalAlpha = 0.42;
    ctx.lineWidth = Math.max(1, w * 0.004);
    ctx.beginPath();
    ctx.arc(x + w * 0.5, y + h * 0.48, Math.min(w, h) * 0.42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + w * 0.12, y + h * 0.48);
    ctx.lineTo(x + w * 0.88, y + h * 0.48);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // 4. Fine editorial halftone / film grain overlay
  applyEditorialGrain(ctx, x, y, w, h, seed);

  // 5. Crisp Swiss photographic registration marks
  ctx.strokeStyle = palette.bg;
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 1;
  const mark = Math.max(6, w * 0.03);
  ctx.beginPath();
  ctx.moveTo(x + 10, y + 10 + mark);
  ctx.lineTo(x + 10, y + 10);
  ctx.lineTo(x + 10 + mark, y + 10);
  ctx.moveTo(x + w - 10 - mark, y + h - 10);
  ctx.lineTo(x + w - 10, y + h - 10);
  ctx.lineTo(x + w - 10, y + h - 10 - mark);
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.restore();
}

export function renderMockupToCanvas(
  project: ProjectItem,
  width = 960,
  height = 600,
  variantSeed = 0,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const { palette } = project;
  const padX = width * 0.05;
  const browserH = height * 0.055;
  const navH = height * 0.085;
  const headerBottom = browserH + navH;

  // 1. Page background
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Subtle Swiss column guide grid lines across canvas
  ctx.strokeStyle = palette.ink;
  ctx.globalAlpha = 0.045;
  ctx.lineWidth = 1;
  for (let col = 1; col < 6; col++) {
    const gx = (width / 6) * col;
    ctx.beginPath();
    ctx.moveTo(gx, headerBottom);
    ctx.lineTo(gx, height);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // 2. Minimal Browser Chrome Bar
  ctx.fillStyle = palette.surface;
  ctx.fillRect(0, 0, width, browserH);
  const dotY = browserH * 0.5;
  for (let d = 0; d < 3; d++) {
    ctx.fillStyle = palette.ink;
    ctx.globalAlpha = d === 0 ? 0.45 : 0.2;
    ctx.beginPath();
    ctx.arc(padX + d * width * 0.015, dotY, Math.max(2, width * 0.004), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 0.45;
  ctx.fillStyle = palette.ink;
  ctx.font = `500 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.textBaseline = 'middle';
  ctx.fillText(project.slug, width * 0.43, dotY);
  ctx.globalAlpha = 1;

  // Hairline under browser chrome & nav bar
  ctx.strokeStyle = palette.ink;
  ctx.globalAlpha = 0.1;
  ctx.beginPath();
  ctx.moveTo(0, browserH);
  ctx.lineTo(width, browserH);
  ctx.moveTo(0, headerBottom);
  ctx.lineTo(width, headerBottom);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // 3. Real-looking Site Navigation Bar
  const navY = browserH + navH * 0.52;
  ctx.fillStyle = palette.ink;
  ctx.font = `700 ${Math.round(width * 0.017)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(project.masthead, padX, navY);

  const navItems = ['INDEX', 'ARCHIVE', 'EDITORIAL', 'INQUIRE'];
  ctx.font = `500 ${Math.round(width * 0.0105)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillStyle = palette.muted;
  let navX = width - padX;
  for (let i = navItems.length - 1; i >= 0; i--) {
    const label = navItems[i];
    const metrics = ctx.measureText(label);
    navX -= metrics.width;
    ctx.fillText(label, navX, navY);
    navX -= width * 0.024;
  }

  // 4. Layout Composition
  const contentY = headerBottom + height * 0.048;
  const contentH = height - contentY - height * 0.065;
  const layoutKind = (project.index.charCodeAt(1) + variantSeed) % 3;

  if (layoutKind === 0) {
    // Editorial Asymmetric Split: Bold Serif Title + Photographic Plate
    const leftW = width * 0.43;
    const rightX = padX + leftW + width * 0.038;
    const rightW = width - rightX - padX;

    ctx.fillStyle = palette.accent;
    ctx.font = `600 ${Math.round(width * 0.0115)}px "JetBrains Mono", monospace`;
    ctx.fillText(
      `${project.index} / ${project.category.toUpperCase()}`,
      padX,
      contentY + height * 0.03,
    );

    ctx.fillStyle = palette.ink;
    ctx.font = `600 ${Math.round(width * 0.064)}px "Cormorant Garamond", Georgia, serif`;
    const words = project.title.split(' ');
    words.slice(0, 2).forEach((word, idx) => {
      ctx.fillText(word, padX, contentY + height * (0.145 + idx * 0.12));
    });

    ctx.fillStyle = palette.muted;
    ctx.font = `500 ${Math.round(width * 0.0115)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(project.subline.slice(0, 38), padX, contentY + height * 0.39);

    // Editorial body copy rules
    ctx.fillStyle = palette.ink;
    ctx.globalAlpha = 0.25;
    for (let line = 0; line < 3; line++) {
      ctx.fillRect(
        padX,
        contentY + height * (0.47 + line * 0.034),
        leftW * (line === 2 ? 0.56 : 0.88),
        Math.max(2, height * 0.008),
      );
    }
    ctx.globalAlpha = 1;

    const btnY = contentY + contentH - height * 0.092;
    ctx.fillStyle = palette.ink;
    drawRoundedRect(ctx, padX, btnY, width * 0.175, height * 0.072, height * 0.036);
    ctx.fill();
    ctx.fillStyle = palette.bg;
    ctx.font = `600 ${Math.round(width * 0.0105)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText('EXPLORE WORK →', padX + width * 0.022, btnY + height * 0.038);

    drawPhotographicPlate(ctx, rightX, contentY, rightW, contentH, project, variantSeed);
  } else if (layoutKind === 1) {
    // Full-Bleed Hero Showcase with Bold Overlaid Headline
    const heroH = contentH * 0.7;
    drawPhotographicPlate(
      ctx,
      padX,
      contentY,
      width - padX * 2,
      heroH,
      project,
      variantSeed,
    );

    // Editorial contrast scrim strip over hero photo
    const scrimGrad = ctx.createLinearGradient(
      padX,
      contentY + heroH * 0.35,
      padX,
      contentY + heroH,
    );
    scrimGrad.addColorStop(0, 'transparent');
    scrimGrad.addColorStop(1, 'rgba(8,8,8,0.82)');
    ctx.fillStyle = scrimGrad;
    ctx.fillRect(padX, contentY + heroH * 0.35, width - padX * 2, heroH * 0.65);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 ${Math.round(width * 0.044)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(project.title, padX + width * 0.03, contentY + heroH - height * 0.085);

    ctx.fillStyle = palette.accent;
    ctx.font = `600 ${Math.round(width * 0.011)}px "JetBrains Mono", monospace`;
    ctx.fillText(
      project.featuredStat.toUpperCase(),
      padX + width * 0.03,
      contentY + heroH - height * 0.032,
    );

    const rowY = contentY + heroH + height * 0.05;
    ctx.fillStyle = palette.ink;
    ctx.font = `600 ${Math.round(width * 0.022)}px "Cormorant Garamond", Georgia, serif`;
    ctx.fillText(project.subline.slice(0, 34), padX, rowY + height * 0.035);

    const col2X = width * 0.58;
    const col3X = width * 0.78;

    ctx.fillStyle = palette.muted;
    ctx.font = `500 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
    ctx.fillText('DISCIPLINE', col2X, rowY + height * 0.005);
    ctx.fillText('SPRINT', col3X, rowY + height * 0.005);

    ctx.fillStyle = palette.ink;
    ctx.font = `500 ${Math.round(width * 0.014)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(project.category, col2X, rowY + height * 0.052);
    ctx.fillText(project.sprintDuration, col3X, rowY + height * 0.052);
  } else {
    // Swiss 3-Column Cultural Index Spread
    ctx.fillStyle = palette.ink;
    ctx.font = `600 ${Math.round(width * 0.046)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(project.title, padX, contentY + height * 0.052);

    ctx.fillStyle = palette.accent;
    ctx.font = `600 ${Math.round(width * 0.0115)}px "JetBrains Mono", monospace`;
    ctx.fillText(
      project.featuredStat.toUpperCase(),
      width - padX - width * 0.21,
      contentY + height * 0.052,
    );

    const gridY = contentY + height * 0.135;
    const gap = width * 0.024;
    const colW = (width - padX * 2 - gap * 2) / 3;
    const plateH = contentH - height * 0.15;

    for (let c = 0; c < 3; c++) {
      const cx = padX + c * (colW + gap);
      drawPhotographicPlate(
        ctx,
        cx,
        gridY,
        colW,
        plateH * 0.75,
        project,
        variantSeed + c,
      );

      ctx.fillStyle = palette.ink;
      ctx.font = `600 ${Math.round(width * 0.0125)}px "Plus Jakarta Sans", sans-serif`;
      ctx.fillText(`PLATE 0${c + 1}`, cx, gridY + plateH * 0.83);

      ctx.fillStyle = palette.muted;
      ctx.font = `400 ${Math.round(width * 0.0105)}px "Plus Jakarta Sans", sans-serif`;
      ctx.fillText(
        project.deliverables[c % project.deliverables.length],
        cx,
        gridY + plateH * 0.9,
      );
    }
  }

  // Outer hairline frame
  ctx.strokeStyle = palette.ink;
  ctx.globalAlpha = 0.14;
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, width - 2, height - 2);
  ctx.globalAlpha = 1;

  return canvas;
}

export function getProjectDataUrl(project: ProjectItem): string {
  const cached = dataUrlCache.get(project.id);
  if (cached) return cached;
  const canvas = renderMockupToCanvas(project, 960, 600, 0);
  const url = canvas.toDataURL('image/jpeg', 0.92);
  dataUrlCache.set(project.id, url);
  return url;
}
