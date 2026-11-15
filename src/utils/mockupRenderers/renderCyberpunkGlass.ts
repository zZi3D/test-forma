import { ProjectConfig } from '../../data/projects';
import { drawBrowserChrome, drawRoundedRect } from './canvasPrimitives';

function drawGlassHudPanel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  edgeAccent: string,
) {
  ctx.save();
  // Translucent smoked glass fill
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();

  // Light-catching gradient specular border
  const borderGrad = ctx.createLinearGradient(x, y, x + w, y + h);
  borderGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
  borderGrad.addColorStop(0.5, edgeAccent + '66');
  borderGrad.addColorStop(1, 'rgba(255, 255, 255, 0.12)');
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 1.75;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.stroke();
  ctx.restore();
}

export function renderCyberpunkGlass(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;

  // Pitch-black futuristic canvas (#07080C)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Subtle background wireframe perspective grid
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.12)';
  ctx.lineWidth = 1;
  const horizonY = height * 0.56;
  for (let gx = -8; gx <= 8; gx++) {
    ctx.beginPath();
    ctx.moveTo(width * 0.5 + gx * width * 0.04, horizonY);
    ctx.lineTo(width * 0.5 + gx * width * 0.18, height);
    ctx.stroke();
  }
  for (let gy = 0; gy < 9; gy++) {
    const t = gy / 8;
    const yLine = horizonY + t * t * (height - horizonY);
    ctx.beginPath();
    ctx.moveTo(0, yLine);
    ctx.lineTo(width, yLine);
    ctx.stroke();
  }

  // Cyan & amber ambient energy bloom behind center orb
  const cyanGlow = ctx.createRadialGradient(
    width * 0.56,
    height * 0.53,
    10,
    width * 0.56,
    height * 0.53,
    width * 0.34,
  );
  cyanGlow.addColorStop(0, 'rgba(34, 211, 238, 0.34)');
  cyanGlow.addColorStop(0.55, 'rgba(34, 211, 238, 0.08)');
  cyanGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = cyanGlow;
  ctx.fillRect(0, 0, width, height);

  const amberGlow = ctx.createRadialGradient(
    width * 0.64,
    height * 0.45,
    8,
    width * 0.64,
    height * 0.45,
    width * 0.25,
  );
  amberGlow.addColorStop(0, 'rgba(245, 158, 11, 0.28)');
  amberGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = amberGlow;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#0D1017',
    borderAlpha: 0.16,
    navItemsColor: 'rgba(248, 250, 252, 0.72)',
  });

  // Center Glowing 3D Orb with Cyan & Amber Orbital Light Ribbons
  const orbX = width * 0.57;
  const orbY = height * 0.54;
  const orbR = height * 0.24;

  // Inner plasma core
  const orbGrad = ctx.createRadialGradient(
    orbX - orbR * 0.28,
    orbY - orbR * 0.28,
    orbR * 0.05,
    orbX,
    orbY,
    orbR,
  );
  orbGrad.addColorStop(0, '#FFFFFF');
  orbGrad.addColorStop(0.28, palette.accent); // #22D3EE
  orbGrad.addColorStop(0.72, '#0E7490');
  orbGrad.addColorStop(1, 'rgba(7, 8, 12, 0.92)');
  ctx.fillStyle = orbGrad;
  ctx.beginPath();
  ctx.arc(orbX, orbY, orbR, 0, Math.PI * 2);
  ctx.fill();

  // Fine spherical wireframe meridians & parallels
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1.25;
  for (let m = 1; m <= 3; m++) {
    ctx.beginPath();
    ctx.ellipse(orbX, orbY, orbR * (m / 3.5), orbR, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.ellipse(orbX, orbY, orbR, orbR * 0.38, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Glowing Cyan & Amber Orbital Light Trails
  ctx.save();
  ctx.shadowColor = palette.accent;
  ctx.shadowBlur = 18;
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.ellipse(orbX, orbY, orbR * 1.48, orbR * 0.42, -0.32, 0, Math.PI * 2);
  ctx.stroke();

  ctx.shadowColor = palette.secondary;
  ctx.strokeStyle = palette.secondary; // #F59E0B warm amber
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(orbX, orbY, orbR * 1.38, orbR * 0.36, 0.46, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Floating Frosted Glass Window 1 (Left Primary Spatial HUD)
  const hudX = padX;
  const hudY = headerBottom + height * 0.06;
  const hudW = width * 0.36;
  const hudH = height * 0.48;
  drawGlassHudPanel(ctx, hudX, hudY, hudW, hudH, 20, palette.accent);

  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, hudX + 30, hudY + 48);

  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.028)}px "Plus Jakarta Sans", sans-serif`;
  const [w1, ...wRest] = previewSample.headline.split(' ');
  ctx.fillText(w1, hudX + 30, hudY + 112);
  ctx.fillText(wRest.join(' '), hudX + 30, hudY + 162);

  ctx.fillStyle = 'rgba(248, 250, 252, 0.72)';
  ctx.font = `400 ${Math.round(width * 0.0115)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.subheadline.slice(0, 42), hudX + 30, hudY + 216);

  // Engage Link glowing button inside glass HUD
  const btnY = hudY + hudH - 86;
  ctx.fillStyle = palette.accent;
  drawRoundedRect(ctx, hudX + 30, btnY, hudW * 0.56, 48, 24);
  ctx.fill();
  ctx.fillStyle = '#07080C';
  ctx.font = `700 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.ctaLabel, hudX + 64, btnY + 26);

  // Floating Frosted Glass Window 2 (Bottom-left Telemetry Matrix)
  const telY = hudY + hudH + height * 0.035;
  const telH = height - telY - height * 0.065;
  drawGlassHudPanel(ctx, hudX, telY, hudW, telH, 16, palette.secondary);

  previewSample.metrics.forEach((m, idx) => {
    const mx = hudX + 28 + idx * (hudW * 0.31);
    ctx.fillStyle = 'rgba(248, 250, 252, 0.55)';
    ctx.font = `500 12px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, mx, telY + telH * 0.36);

    ctx.fillStyle = idx === 1 ? palette.accent : idx === 2 ? palette.secondary : palette.text;
    ctx.font = `700 18px "JetBrains Mono", monospace`;
    ctx.fillText(m.value, mx, telY + telH * 0.68);
  });

  // Floating Frosted Glass Window 3 (Right Node Status Overlay)
  const rightW = width * 0.21;
  const rightX = width - padX - rightW;
  const rightY = headerBottom + height * 0.08;
  const rightH = height * 0.36;
  drawGlassHudPanel(ctx, rightX, rightY, rightW, rightH, 18, palette.accent);

  ctx.fillStyle = palette.secondary;
  ctx.font = `600 13px "JetBrains Mono", monospace`;
  ctx.fillText('ACTIVE MODULES', rightX + 24, rightY + 38);

  previewSample.cardLabels.forEach((lbl, idx) => {
    const ly = rightY + 86 + idx * 64;
    ctx.fillStyle = idx === 0 ? palette.accent : palette.secondary;
    ctx.beginPath();
    ctx.arc(rightX + 32, ly, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = palette.text;
    ctx.font = `600 16px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(lbl, rightX + 52, ly + 2);
  });
}
