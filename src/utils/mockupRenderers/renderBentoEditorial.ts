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
  const pineBg = palette.bg; // #162921
  const ivory = palette.surface; // #F3EFE6
  const copper = palette.accent; // #C86D44
  const mutedPine = palette.secondary; // #9BB0A5

  // Midnight Pine canvas (#162921)
  ctx.fillStyle = pineBg;
  ctx.fillRect(0, 0, width, height);

  // Delicate ambient glow from warm garden pavilion hearth on upper right
  const hearthGlow = ctx.createRadialGradient(
    width * 0.74,
    height * 0.36,
    20,
    width * 0.74,
    height * 0.36,
    width * 0.42,
  );
  hearthGlow.addColorStop(0, 'rgba(200, 109, 68, 0.22)');
  hearthGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = hearthGlow;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#10201A',
    borderAlpha: 0.14,
    navItemsColor: mutedPine,
    highlightLastNav: true,
  });

  const contentW = width - padX * 2;
  const gap = width * 0.022;
  const heroY = headerBottom + height * 0.042;
  const heroH = height * 0.45;
  const leftW = contentW * 0.54;
  const rightW = contentW - leftW - gap;
  const rightX = padX + leftW + gap;

  // =========================================================================
  // UPPER LEFT: Midnight Pine Editorial Copy & PDOK Quick Postals
  // =========================================================================
  ctx.fillStyle = 'rgba(200, 109, 68, 0.18)';
  const tagW = width * 0.26;
  const tagH = 34;
  drawRoundedRect(ctx, padX, heroY, tagW, tagH, 17);
  ctx.fill();
  ctx.strokeStyle = 'rgba(200, 109, 68, 0.52)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = '#F3B496';
  ctx.font = `600 ${Math.round(width * 0.0082)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX + 16, heroY + tagH * 0.53);

  // Fraunces-style Ivory Editorial Headline
  ctx.fillStyle = ivory;
  ctx.font = `600 ${Math.round(width * 0.041)}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillText('Architectural Gardens', padX, heroY + height * 0.125);
  ctx.fillText('Built for Every Season.', padX, heroY + height * 0.20);

  ctx.fillStyle = mutedPine;
  ctx.font = `400 ${Math.round(width * 0.0122)}px "Plus Jakarta Sans", sans-serif`;
  drawWrappedText(
    ctx,
    previewSample.subheadline,
    padX,
    heroY + height * 0.268,
    leftW - 20,
    height * 0.027,
    2,
  );

  // Copper CTA Pill + Quick Dutch Postal Chips
  const ctaY = heroY + heroH - height * 0.072;
  const ctaW = width * 0.185;
  const ctaH = height * 0.062;
  ctx.fillStyle = copper;
  drawRoundedRect(ctx, padX, ctaY, ctaW, ctaH, 31);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.0092)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, padX + ctaW * 0.5, ctaY + ctaH * 0.52);
  ctx.textAlign = 'left';

  const postals = ['1012 JS AMSTERDAM', '2611 GW DELFT'];
  let px = padX + ctaW + 14;
  postals.forEach((p, idx) => {
    ctx.font = `500 ${Math.round(width * 0.0078)}px "JetBrains Mono", monospace`;
    const pw = ctx.measureText(p).width + 22;
    ctx.fillStyle = idx === 0 ? 'rgba(243, 239, 230, 0.14)' : 'rgba(243, 239, 230, 0.06)';
    drawRoundedRect(ctx, px, ctaY + 8, pw, ctaH - 16, 16);
    ctx.fill();
    ctx.strokeStyle = 'rgba(243, 239, 230, 0.22)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = ivory;
    ctx.fillText(p, px + 11, ctaY + ctaH * 0.52);
    px += pw + 8;
  });

  // =========================================================================
  // UPPER RIGHT: Modern Charred Cedar Pavilion & Slate Patio Dusk Illustration
  // =========================================================================
  ctx.save();
  drawRoundedRect(ctx, rightX, heroY, rightW, heroH, 22);
  ctx.clip();

  // Dusk twilight gradient behind garden architecture
  const skyGrad = ctx.createLinearGradient(rightX, heroY, rightX, heroY + heroH);
  skyGrad.addColorStop(0, '#0E1C16');
  skyGrad.addColorStop(0.6, '#1E382D');
  skyGrad.addColorStop(1, '#111E18');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(rightX, heroY, rightW, heroH);

  // Soft golden moon / dusk glow
  const moonGlow = ctx.createRadialGradient(
    rightX + rightW * 0.72,
    heroY + heroH * 0.28,
    4,
    rightX + rightW * 0.72,
    heroY + heroH * 0.28,
    rightW * 0.35,
  );
  moonGlow.addColorStop(0, 'rgba(243, 239, 230, 0.24)');
  moonGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = moonGlow;
  ctx.fillRect(rightX, heroY, rightW, heroH);

  // Garden Patio Slate Floor Horizon
  const deckY = heroY + heroH * 0.72;
  ctx.fillStyle = '#18241F';
  ctx.fillRect(rightX, deckY, rightW, heroH - (deckY - heroY));

  // Subtle Belgian slate terrace slab joints
  ctx.strokeStyle = 'rgba(243, 239, 230, 0.12)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(rightX, deckY);
  ctx.lineTo(rightX + rightW, deckY);
  for (let s = 1; s < 5; s++) {
    const sx = rightX + (rightW / 5) * s;
    ctx.moveTo(sx, deckY);
    ctx.lineTo(sx - 24, heroY + heroH);
  }
  ctx.stroke();

  // Architectural Charred Cedar Pavilion Structure
  const pavX = rightX + rightW * 0.14;
  const pavW = rightW * 0.72;
  const pavTop = heroY + heroH * 0.22;
  const pavBot = deckY;

  // Warm illuminated interior amber-copper pavilion recess
  const intGlow = ctx.createLinearGradient(pavX, pavTop, pavX + pavW, pavBot);
  intGlow.addColorStop(0, '#E89D5A');
  intGlow.addColorStop(0.6, '#C86D44');
  intGlow.addColorStop(1, '#5C2F1E');
  ctx.fillStyle = intGlow;
  ctx.fillRect(pavX + 18, pavTop + 18, pavW - 36, pavBot - pavTop - 18);

  // Warm ambient light spilled onto slate patio
  const spillGrad = ctx.createLinearGradient(0, deckY, 0, heroY + heroH);
  spillGrad.addColorStop(0, 'rgba(232, 157, 90, 0.32)');
  spillGrad.addColorStop(1, 'rgba(232, 157, 90, 0)');
  ctx.fillStyle = spillGrad;
  ctx.beginPath();
  ctx.moveTo(pavX + 18, deckY);
  ctx.lineTo(pavX + pavW - 18, deckY);
  ctx.lineTo(pavX + pavW + 24, heroY + heroH);
  ctx.lineTo(pavX - 24, heroY + heroH);
  ctx.closePath();
  ctx.fill();

  // Dark Zinc Overhanging Flat Roof Fascia
  ctx.fillStyle = '#0D1311';
  drawRoundedRect(ctx, pavX - 18, pavTop, pavW + 36, 20, 4);
  ctx.fill();
  ctx.fillStyle = copper;
  ctx.fillRect(pavX - 16, pavTop + 17, pavW + 32, 2.5);

  // Charred Cedar Columns & Vertical Timber Slats
  ctx.fillStyle = '#121815';
  ctx.fillRect(pavX + 8, pavTop + 18, 16, pavBot - pavTop - 18);
  ctx.fillRect(pavX + pavW - 24, pavTop + 18, 16, pavBot - pavTop - 18);
  ctx.fillRect(pavX + pavW * 0.42, pavTop + 18, 10, pavBot - pavTop - 18);

  for (let slat = 0; slat < 6; slat++) {
    ctx.fillRect(pavX + 40 + slat * 20, pavTop + 18, 7, pavBot - pavTop - 18);
  }

  // Stylized Garden Pines / Shrubs framing pavilion
  ctx.fillStyle = '#0F221A';
  ctx.beginPath();
  ctx.arc(rightX + 34, deckY - 12, 42, 0, Math.PI * 2);
  ctx.arc(rightX + rightW - 28, deckY - 6, 48, 0, Math.PI * 2);
  ctx.fill();

  // Tag overlay on pavilion photo
  ctx.fillStyle = 'rgba(22, 41, 33, 0.85)';
  drawRoundedRect(ctx, rightX + 18, heroY + 18, width * 0.145, 28, 14);
  ctx.fill();
  ctx.fillStyle = ivory;
  ctx.font = `600 ${Math.round(width * 0.0074)}px "JetBrains Mono", monospace`;
  ctx.fillText('CHARRED CEDAR PAVILION', rightX + 30, heroY + 33);

  ctx.restore();
  ctx.strokeStyle = 'rgba(243, 239, 230, 0.18)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, rightX, heroY, rightW, heroH, 22);
  ctx.stroke();

  // =========================================================================
  // BOTTOM FULL-WIDTH SANDSTONE IVORY (#F3EFE6) ESTIMATOR & WEATHER BAR
  // =========================================================================
  const botY = heroY + heroH + height * 0.04;
  const botH = height - botY - height * 0.055;

  ctx.fillStyle = ivory;
  drawRoundedRect(ctx, padX, botY, contentW, botH, 22);
  ctx.fill();

  const bPad = 28;
  const halfW = (contentW - bPad * 3) * 0.5;

  // Vertical hairline divider inside sandstone card
  ctx.strokeStyle = 'rgba(22, 41, 33, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padX + bPad + halfW + bPad * 0.5, botY + 24);
  ctx.lineTo(padX + bPad + halfW + bPad * 0.5, botY + botH - 24);
  ctx.stroke();

  // LEFT HALF: PDOK Address & 3-Day Site Build Weather
  const wx = padX + bPad;
  ctx.fillStyle = copper;
  ctx.font = `700 ${Math.round(width * 0.0084)}px "JetBrains Mono", monospace`;
  ctx.fillText('PDOK PARCEL · DAM, 1012 JS AMSTERDAM', wx, botY + 38);

  const weatherDays = [
    { day: 'WED', temp: '13°C', status: 'Ideal outdoor', dry: true },
    { day: 'THU', temp: '14°C', status: 'Clear window', dry: true },
    { day: 'FRI', temp: '11°C', status: 'Roofed prep', dry: false },
  ];
  const wGap = 12;
  const dayW = (halfW - wGap * 2) / 3;
  const dayY = botY + 62;
  const dayH = botH - 86;

  weatherDays.forEach((d, idx) => {
    const dx = wx + idx * (dayW + wGap);
    ctx.fillStyle = '#FFFFFF';
    drawRoundedRect(ctx, dx, dayY, dayW, dayH, 14);
    ctx.fill();
    ctx.strokeStyle = 'rgba(22, 41, 33, 0.1)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = '#586E63';
    ctx.font = `600 ${Math.round(width * 0.008)}px "JetBrains Mono", monospace`;
    ctx.fillText(d.day, dx + 14, dayY + 26);

    ctx.fillStyle = pineBg;
    ctx.font = `700 ${Math.round(width * 0.019)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(d.temp, dx + 14, dayY + 62);

    ctx.fillStyle = d.dry ? '#166534' : copper;
    ctx.font = `600 ${Math.round(width * 0.008)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(d.status, dx + 14, dayY + dayH - 18);
  });

  // RIGHT HALF: Project Scope Tabs + 48 m² Slider + Price Range
  const ex = padX + bPad * 2 + halfW;
  ctx.fillStyle = '#586E63';
  ctx.font = `700 ${Math.round(width * 0.0084)}px "JetBrains Mono", monospace`;
  ctx.fillText('TURNKEY M² SCOPE ESTIMATOR', ex, botY + 38);

  // Scope Pill Tabs
  let sx = ex;
  previewSample.cardLabels.forEach((lbl, idx) => {
    const isAct = idx === 0;
    ctx.font = `600 ${Math.round(width * 0.0082)}px "JetBrains Mono", monospace`;
    const sw = ctx.measureText(lbl).width + 24;
    ctx.fillStyle = isAct ? pineBg : 'rgba(22, 41, 33, 0.08)';
    drawRoundedRect(ctx, sx, botY + 56, sw, 32, 16);
    ctx.fill();
    ctx.fillStyle = isAct ? ivory : pineBg;
    ctx.fillText(lbl, sx + 12, botY + 73);
    sx += sw + 8;
  });

  // Slider Bar for 48 m²
  const trackY = botY + 114;
  ctx.fillStyle = 'rgba(22, 41, 33, 0.14)';
  drawRoundedRect(ctx, ex, trackY, halfW - 95, 8, 4);
  ctx.fill();
  ctx.fillStyle = copper;
  drawRoundedRect(ctx, ex, trackY, (halfW - 95) * 0.45, 8, 4);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(ex + (halfW - 95) * 0.45, trackY + 4, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = 'right';
  ctx.fillStyle = pineBg;
  ctx.font = `700 ${Math.round(width * 0.011)}px "JetBrains Mono", monospace`;
  ctx.fillText('48 m²', ex + halfW, trackY + 5);
  ctx.textAlign = 'left';

  // Estimated Price Range
  ctx.fillStyle = pineBg;
  ctx.font = `700 ${Math.round(width * 0.024)}px "Cormorant Garamond", Georgia, serif`;
  ctx.fillText('€ 5.960 – € 7.260', ex, botY + botH - 28);

  ctx.textAlign = 'right';
  ctx.fillStyle = copper;
  ctx.font = `700 ${Math.round(width * 0.0094)}px "JetBrains Mono", monospace`;
  ctx.fillText('INCL. INSTALL →', ex + halfW, botY + botH - 30);
  ctx.textAlign = 'left';

  applyEditorialGrain(ctx, 0, headerBottom, width, height - headerBottom, 707, 0.025);
}
