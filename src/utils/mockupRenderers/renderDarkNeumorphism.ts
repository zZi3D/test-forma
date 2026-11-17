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
  ctx.shadowColor = recessed ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.85)';
  ctx.shadowBlur = recessed ? 6 : 18;
  ctx.shadowOffsetX = recessed ? -3 : 6;
  ctx.shadowOffsetY = recessed ? -3 : 7;
  ctx.fillStyle = surface;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();

  ctx.shadowColor = recessed ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.07)';
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
    : 'rgba(255, 255, 255, 0.08)';
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

  // Deep obsidian canvas (#0B0B0D)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Rich warm amber studio spotlight illuminating the upper-right portrait & hero
  const studioSpotlight = ctx.createRadialGradient(
    width * 0.77,
    height * 0.34,
    width * 0.02,
    width * 0.77,
    height * 0.34,
    width * 0.44,
  );
  studioSpotlight.addColorStop(0, 'rgba(217, 138, 43, 0.34)');
  studioSpotlight.addColorStop(0.45, 'rgba(217, 138, 43, 0.11)');
  studioSpotlight.addColorStop(1, 'transparent');
  ctx.fillStyle = studioSpotlight;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#121215',
    borderAlpha: 0.09,
    navItemsColor: palette.secondary,
  });

  const contentW = width - padX * 2;
  const gap = width * 0.026;
  const leftW = contentW * 0.59;
  const rightW = contentW - leftW - gap;
  const rightX = padX + leftW + gap;

  // TOP HERO SECTION: Left (4.9★ Review Badge + Headline + Booking CTA) | Right (Warm Studio Portrait Silhouette)
  const heroY = headerBottom + height * 0.04;
  const heroH = height * 0.34;

  // 4.9★ Google Review Badge Pill
  const badgeW = width * 0.275;
  const badgeH = height * 0.048;
  drawNeumorphicSurface(ctx, padX, heroY, badgeW, badgeH, 24, '#171410', true);
  ctx.strokeStyle = 'rgba(217, 138, 43, 0.5)';
  ctx.lineWidth = 1.25;
  drawRoundedRect(ctx, padX, heroY, badgeW, badgeH, 24);
  ctx.stroke();

  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.009)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX + width * 0.015, heroY + badgeH * 0.55);

  // Hero Headline & Subheadline
  ctx.fillStyle = palette.text;
  ctx.font = `500 ${Math.round(width * 0.044)}px "Cormorant Garamond", Georgia, serif`;
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

  // Primary Tactile "BOOK APPOINTMENT →" Pill
  const ctaW = width * 0.215;
  const ctaH = height * 0.07;
  const ctaY = heroY + height * 0.242;
  drawNeumorphicSurface(ctx, padX, ctaY, ctaW, ctaH, 35, '#1D1710', false);
  ctx.strokeStyle = 'rgba(217, 138, 43, 0.72)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, padX, ctaY, ctaW, ctaH, 35);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.0102)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.ctaLabel, padX + ctaW * 0.5, ctaY + ctaH * 0.54);
  ctx.textAlign = 'left';

  // UPPER-RIGHT STUDIO PORTRAIT FRAME (Stylized Salon / Grooming Silhouette + Amber Backlight)
  const portX = rightX;
  const portY = heroY;
  const portW = rightW;
  const portH = heroH;

  drawNeumorphicSurface(ctx, portX, portY, portW, portH, 24, '#131215', false);

  ctx.save();
  drawRoundedRect(ctx, portX + 10, portY + 10, portW - 20, portH - 20, 18);
  ctx.clip();

  // Warm illuminated studio backdrop inside portrait frame
  const portBackdrop = ctx.createRadialGradient(
    portX + portW * 0.58,
    portY + portH * 0.44,
    8,
    portX + portW * 0.55,
    portY + portH * 0.46,
    portW * 0.62,
  );
  portBackdrop.addColorStop(0, 'rgba(217, 138, 43, 0.46)');
  portBackdrop.addColorStop(0.5, 'rgba(138, 82, 24, 0.22)');
  portBackdrop.addColorStop(1, '#09090B');
  ctx.fillStyle = portBackdrop;
  ctx.fillRect(portX + 10, portY + 10, portW - 20, portH - 20);

  // Soft studio arch mirror halo behind silhouette
  const haloX = portX + portW * 0.56;
  const haloY = portY + portH * 0.52;
  ctx.strokeStyle = 'rgba(245, 242, 235, 0.14)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(haloX, haloY - 12, portH * 0.36, 0, Math.PI * 2);
  ctx.stroke();

  // Stylized Grooming / Salon Silhouette Portrait (sculpted head, tailored hair & collar shoulders)
  const silBaseY = portY + portH - 8;
  const silCenterX = portX + portW * 0.56;

  // Shoulders & tailored dark jacket silhouette
  ctx.fillStyle = '#070709';
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

  // Neck
  ctx.fillRect(
    silCenterX - portW * 0.048,
    silBaseY - portH * 0.48,
    portW * 0.096,
    portH * 0.16,
  );

  // Crisp Hair & Editorial Profile Silhouette
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

  // Sculpted haircut sweep along crown
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

  // Warm amber rim light tracing right contour of face & shoulder
  ctx.strokeStyle = 'rgba(245, 184, 96, 0.78)';
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

  // Subtle editorial tag top-left of portrait frame
  ctx.fillStyle = 'rgba(11, 11, 13, 0.68)';
  drawRoundedRect(ctx, portX + 22, portY + 22, width * 0.118, 28, 14);
  ctx.fill();
  ctx.fillStyle = '#F5F2EB';
  ctx.font = `600 ${Math.round(width * 0.0076)}px "JetBrains Mono", monospace`;
  ctx.fillText('MASTER STUDIO', portX + 34, portY + 37);

  ctx.restore();

  // LOWER BODY: Left (Category Pills + Compact Service Menu) | Right (Instant Time Slot Booking)
  const bodyY = heroY + heroH + height * 0.042;
  const bodyH = height - bodyY - height * 0.058;

  // 3 Service Category Cards across top of Left Column
  const catGap = width * 0.014;
  const catW = (leftW - catGap * 2) / 3;
  const catH = bodyH * 0.22;
  previewSample.cardLabels.forEach((lbl, idx) => {
    const cx = padX + idx * (catW + catGap);
    const active = idx === 0;
    drawNeumorphicSurface(ctx, cx, bodyY, catW, catH, 14, palette.surface, active);

    ctx.fillStyle = active ? palette.accent : palette.secondary;
    ctx.beginPath();
    ctx.arc(cx + width * 0.018, bodyY + catH * 0.5, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = active ? palette.text : palette.secondary;
    ctx.font = `600 ${Math.round(width * 0.0098)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(lbl, cx + width * 0.03, bodyY + catH * 0.54);
  });

  // Compact Luxury Price List Panel
  const listY = bodyY + catH + height * 0.025;
  const listH = bodyH - catH - height * 0.025;
  drawNeumorphicSurface(ctx, padX, listY, leftW, listH, 20, '#141417', false);

  const rowH = (listH - height * 0.036) / previewSample.metrics.length;
  previewSample.metrics.forEach((m, idx) => {
    const ry = listY + height * 0.018 + idx * rowH;
    const rx = padX + width * 0.024;
    const rw = leftW - width * 0.048;

    if (idx > 0) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + rw, ry);
      ctx.stroke();
    }

    ctx.fillStyle = idx === 0 ? palette.text : '#D6D1C7';
    ctx.font = `600 ${Math.round(width * 0.0112)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.label, rx, ry + rowH * 0.54);

    ctx.textAlign = 'right';
    ctx.fillStyle = palette.accent;
    ctx.font = `700 ${Math.round(width * 0.0165)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.value, rx + rw, ry + rowH * 0.55);
    ctx.textAlign = 'left';
  });

  // LOWER-RIGHT: Today's Chair Availability Card
  drawNeumorphicSurface(ctx, rightX, bodyY, rightW, bodyH, 22, '#141417', false);

  const slotPad = width * 0.02;
  const innerX = rightX + slotPad;
  const innerW = rightW - slotPad * 2;

  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
  ctx.fillText('NEXT AVAILABLE TODAY', innerX, bodyY + height * 0.058);

  ctx.fillStyle = palette.text;
  ctx.font = `600 ${Math.round(width * 0.0155)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Select your chair & time', innerX, bodyY + height * 0.108);

  const times = ['14:30', '16:00', '17:45'];
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
      isPicked ? '#251B10' : '#18181C',
      !isPicked,
    );
    if (isPicked) {
      ctx.strokeStyle = 'rgba(217, 138, 43, 0.65)';
      ctx.lineWidth = 1.5;
      drawRoundedRect(ctx, sx, slotY, slotW, slotH, 12);
      ctx.stroke();
    }
    ctx.textAlign = 'center';
    ctx.fillStyle = isPicked ? palette.accent : palette.text;
    ctx.font = `600 ${Math.round(width * 0.0108)}px "JetBrains Mono", monospace`;
    ctx.fillText(time, sx + slotW * 0.5, slotY + slotH * 0.55);
    ctx.textAlign = 'left';
  });

  // Trust & Confirmation Note at Bottom
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.beginPath();
  ctx.moveTo(innerX, bodyY + bodyH - height * 0.088);
  ctx.lineTo(innerX + innerW, bodyY + bodyH - height * 0.088);
  ctx.stroke();

  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.arc(innerX + 5, bodyY + bodyH - height * 0.048, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = palette.secondary;
  ctx.font = `500 ${Math.round(width * 0.0095)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(
    'Instant SMS confirmation · No prepayment needed',
    innerX + 18,
    bodyY + bodyH - height * 0.044,
  );

  applyEditorialGrain(ctx, 0, headerBottom, width, height - headerBottom, 202, 0.025);
}
