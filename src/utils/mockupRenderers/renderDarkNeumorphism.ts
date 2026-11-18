import { ProjectConfig } from '../../data/projects';
import {
  applyEditorialGrain,
  drawBrowserChrome,
  drawRoundedRect,
  drawWrappedText,
} from './canvasPrimitives';

function drawNeumorphicSurface(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  surface: string,
  recessed = false,
) {
  ctx.save();
  ctx.shadowColor = recessed ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.82)';
  ctx.shadowBlur = recessed ? 6 : 18;
  ctx.shadowOffsetX = recessed ? -3 : 6;
  ctx.shadowOffsetY = recessed ? -3 : 7;
  ctx.fillStyle = surface;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();

  ctx.shadowColor = recessed ? 'rgba(0,0,0,0.88)' : 'rgba(255,255,255,0.06)';
  ctx.shadowBlur = recessed ? 8 : 14;
  ctx.shadowOffsetX = recessed ? 4 : -5;
  ctx.shadowOffsetY = recessed ? 4 : -5;
  ctx.fillStyle = surface;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = recessed
    ? 'rgba(0, 0, 0, 0.55)'
    : 'rgba(237, 230, 216, 0.09)';
  ctx.lineWidth = 1.25;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.stroke();
  ctx.restore();
}

export function renderDarkNeumorphism(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;
  const barberRed = palette.accent; // #B3261E
  const brightCrimson = '#E14B42';

  // Deep matte charcoal canvas (#1C1C1C)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Atmospheric breathing Barber Red spotlight illuminating the upper-right portrait & hero
  const studioSpotlight = ctx.createRadialGradient(
    width * 0.77,
    height * 0.34,
    width * 0.02,
    width * 0.77,
    height * 0.34,
    width * 0.44,
  );
  studioSpotlight.addColorStop(0, 'rgba(179, 38, 30, 0.40)');
  studioSpotlight.addColorStop(0.45, 'rgba(179, 38, 30, 0.14)');
  studioSpotlight.addColorStop(1, 'transparent');
  ctx.fillStyle = studioSpotlight;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#141416',
    borderAlpha: 0.1,
    navItemsColor: palette.secondary,
  });

  const contentW = width - padX * 2;
  const gap = width * 0.026;
  const leftW = contentW * 0.59;
  const rightW = contentW - leftW - gap;
  const rightX = padX + leftW + gap;

  // TOP HERO SECTION: Left (4.9★ Google Review Badge + Headline + WhatsApp CTA) | Right (Barber Red Studio Portrait)
  const heroY = headerBottom + height * 0.04;
  const heroH = height * 0.34;

  // 4.9★ Google Review Badge Pill
  const badgeW = width * 0.285;
  const badgeH = height * 0.048;
  drawNeumorphicSurface(ctx, padX, heroY, badgeW, badgeH, 24, '#241717', true);
  ctx.strokeStyle = 'rgba(179, 38, 30, 0.58)';
  ctx.lineWidth = 1.25;
  drawRoundedRect(ctx, padX, heroY, badgeW, badgeH, 24);
  ctx.stroke();

  ctx.fillStyle = '#F28B82';
  ctx.font = `600 ${Math.round(width * 0.0088)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX + width * 0.015, heroY + badgeH * 0.55);

  // Hero Headline & Subheadline
  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.036)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.headline, padX, heroY + height * 0.125);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0118)}px "Plus Jakarta Sans", sans-serif`;
  drawWrappedText(
    ctx,
    previewSample.subheadline,
    padX,
    heroY + height * 0.168,
    leftW - 18,
    height * 0.026,
    2,
  );

  // Primary Crimson "CONFIRM VIA WHATSAPP →" Pill
  const ctaW = width * 0.225;
  const ctaH = height * 0.068;
  const ctaY = heroY + height * 0.242;
  ctx.save();
  ctx.shadowColor = 'rgba(179, 38, 30, 0.42)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = barberRed;
  drawRoundedRect(ctx, padX, ctaY, ctaW, ctaH, 34);
  ctx.fill();
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `600 ${Math.round(width * 0.0098)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.ctaLabel, padX + ctaW * 0.5, ctaY + ctaH * 0.53);
  ctx.textAlign = 'left';

  // UPPER-RIGHT BARBER STUDIO PORTRAIT FRAME
  const portX = rightX;
  const portY = heroY;
  const portW = rightW;
  const portH = heroH;

  drawNeumorphicSurface(ctx, portX, portY, portW, portH, 24, '#151518', false);

  ctx.save();
  drawRoundedRect(ctx, portX + 10, portY + 10, portW - 20, portH - 20, 18);
  ctx.clip();

  // Crimson studio backlight inside portrait frame
  const portBackdrop = ctx.createRadialGradient(
    portX + portW * 0.58,
    portY + portH * 0.44,
    8,
    portX + portW * 0.55,
    portY + portH * 0.46,
    portW * 0.62,
  );
  portBackdrop.addColorStop(0, 'rgba(179, 38, 30, 0.52)');
  portBackdrop.addColorStop(0.5, 'rgba(120, 22, 18, 0.24)');
  portBackdrop.addColorStop(1, '#111113');
  ctx.fillStyle = portBackdrop;
  ctx.fillRect(portX + 10, portY + 10, portW - 20, portH - 20);

  // Subtle barber mirror halo behind silhouette
  const haloX = portX + portW * 0.56;
  const haloY = portY + portH * 0.52;
  ctx.strokeStyle = 'rgba(237, 230, 216, 0.14)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(haloX, haloY - 12, portH * 0.36, 0, Math.PI * 2);
  ctx.stroke();

  // Stylized Grooming / Fade Silhouette Portrait
  const silBaseY = portY + portH - 8;
  const silCenterX = portX + portW * 0.56;

  ctx.fillStyle = '#09090B';
  ctx.beginPath();
  ctx.moveTo(silCenterX - portW * 0.34, silBaseY);
  ctx.bezierCurveTo(
    silCenterX - portW * 0.3,
    silBaseY - portH * 0.26,
    silCenterX - portW * 0.14,
    silBaseY - portH * 0.32,
    silCenterX - portW * 0.065,
    silBaseY - portH * 0.35,
  );
  ctx.lineTo(silCenterX + portW * 0.065, silBaseY - portH * 0.35);
  ctx.bezierCurveTo(
    silCenterX + portW * 0.14,
    silBaseY - portH * 0.32,
    silCenterX + portW * 0.3,
    silBaseY - portH * 0.26,
    silCenterX + portW * 0.34,
    silBaseY,
  );
  ctx.closePath();
  ctx.fill();

  ctx.fillRect(
    silCenterX - portW * 0.048,
    silBaseY - portH * 0.48,
    portW * 0.096,
    portH * 0.16,
  );

  ctx.beginPath();
  ctx.ellipse(
    silCenterX - 2,
    silBaseY - portH * 0.62,
    portH * 0.175,
    portH * 0.22,
    -0.06,
    0,
    Math.PI * 2,
  );
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(silCenterX - portH * 0.18, silBaseY - portH * 0.65);
  ctx.bezierCurveTo(
    silCenterX - portH * 0.17,
    silBaseY - portH * 0.9,
    silCenterX + portH * 0.14,
    silBaseY - portH * 0.89,
    silCenterX + portH * 0.18,
    silBaseY - portH * 0.66,
  );
  ctx.lineTo(silCenterX + portH * 0.08, silBaseY - portH * 0.56);
  ctx.closePath();
  ctx.fill();

  // Crimson rim light tracing right contour
  ctx.strokeStyle = 'rgba(235, 92, 82, 0.82)';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(silCenterX + portH * 0.12, silBaseY - portH * 0.82);
  ctx.bezierCurveTo(
    silCenterX + portH * 0.2,
    silBaseY - portH * 0.7,
    silCenterX + portH * 0.18,
    silBaseY - portH * 0.5,
    silCenterX + portW * 0.065,
    silBaseY - portH * 0.35,
  );
  ctx.stroke();

  // Tag top-left of portrait frame
  ctx.fillStyle = 'rgba(17, 17, 19, 0.78)';
  drawRoundedRect(ctx, portX + 22, portY + 22, width * 0.125, 28, 14);
  ctx.fill();
  ctx.fillStyle = '#EDE6D8';
  ctx.font = `600 ${Math.round(width * 0.0074)}px "JetBrains Mono", monospace`;
  ctx.fillText('NOORD BARBERS', portX + 34, portY + 37);

  ctx.restore();

  // LOWER BODY: Left (Category Pills + Barber Service Menu) | Right (Chair Time Slot Picker)
  const bodyY = heroY + heroH + height * 0.042;
  const bodyH = height - bodyY - height * 0.058;

  const catGap = width * 0.014;
  const catW = (leftW - catGap * 2) / 3;
  const catH = bodyH * 0.22;
  previewSample.cardLabels.forEach((lbl, idx) => {
    const cx = padX + idx * (catW + catGap);
    const active = idx === 0;
    drawNeumorphicSurface(ctx, cx, bodyY, catW, catH, 14, palette.surface, active);

    ctx.fillStyle = active ? brightCrimson : palette.secondary;
    ctx.beginPath();
    ctx.arc(cx + width * 0.018, bodyY + catH * 0.5, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = active ? palette.text : palette.secondary;
    ctx.font = `600 ${Math.round(width * 0.0094)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(lbl, cx + width * 0.03, bodyY + catH * 0.54);
  });

  // Compact Service Price List Panel
  const listY = bodyY + catH + height * 0.025;
  const listH = bodyH - catH - height * 0.025;
  drawNeumorphicSurface(ctx, padX, listY, leftW, listH, 20, '#161619', false);

  const rowH = (listH - height * 0.036) / previewSample.metrics.length;
  previewSample.metrics.forEach((m, idx) => {
    const ry = listY + height * 0.018 + idx * rowH;
    const rx = padX + width * 0.024;
    const rw = leftW - width * 0.048;

    if (idx > 0) {
      ctx.strokeStyle = 'rgba(237, 230, 216, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + rw, ry);
      ctx.stroke();
    }

    ctx.fillStyle = idx === 0 ? palette.text : '#D6CFC1';
    ctx.font = `600 ${Math.round(width * 0.011)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.label, rx, ry + rowH * 0.54);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#F28B82';
    ctx.font = `700 ${Math.round(width * 0.0165)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.value, rx + rw, ry + rowH * 0.55);
    ctx.textAlign = 'left';
  });

  // LOWER-RIGHT: Chair Availability & Google Review Card
  drawNeumorphicSurface(ctx, rightX, bodyY, rightW, bodyH, 22, '#161619', false);

  const slotPad = width * 0.02;
  const innerX = rightX + slotPad;
  const innerW = rightW - slotPad * 2;

  ctx.fillStyle = '#F28B82';
  ctx.font = `600 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
  ctx.fillText('NEXT AVAILABLE CHAIR TODAY', innerX, bodyY + height * 0.058);

  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.015)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Pick treatment & time slot', innerX, bodyY + height * 0.108);

  const times = ['13:30', '14:45', '16:15'];
  const slotGap = width * 0.01;
  const slotW = (innerW - slotGap * 2) / 3;
  const slotH = height * 0.068;
  const slotY = bodyY + height * 0.155;
  times.forEach((time, idx) => {
    const sx = innerX + idx * (slotW + slotGap);
    const isPicked = idx === 1;
    drawNeumorphicSurface(
      ctx,
      sx,
      slotY,
      slotW,
      slotH,
      12,
      isPicked ? '#2A1414' : '#1E1E22',
      !isPicked,
    );
    if (isPicked) {
      ctx.strokeStyle = 'rgba(179, 38, 30, 0.8)';
      ctx.lineWidth = 1.5;
      drawRoundedRect(ctx, sx, slotY, slotW, slotH, 12);
      ctx.stroke();
    }
    ctx.textAlign = 'center';
    ctx.fillStyle = isPicked ? '#FFFFFF' : palette.text;
    ctx.font = `600 ${Math.round(width * 0.0108)}px "JetBrains Mono", monospace`;
    ctx.fillText(time, sx + slotW * 0.5, slotY + slotH * 0.55);
    ctx.textAlign = 'left';
  });

  // Trust & Confirmation Note at Bottom
  ctx.strokeStyle = 'rgba(237, 230, 216, 0.08)';
  ctx.beginPath();
  ctx.moveTo(innerX, bodyY + bodyH - height * 0.088);
  ctx.lineTo(innerX + innerW, bodyY + bodyH - height * 0.088);
  ctx.stroke();

  ctx.fillStyle = brightCrimson;
  ctx.beginPath();
  ctx.arc(innerX + 5, bodyY + bodyH - height * 0.048, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = palette.secondary;
  ctx.font = `500 ${Math.round(width * 0.0092)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(
    'Instant WhatsApp confirmation · 4.9★ Google',
    innerX + 18,
    bodyY + bodyH - height * 0.044,
  );

  applyEditorialGrain(ctx, 0, headerBottom, width, height - headerBottom, 202, 0.025);
}
