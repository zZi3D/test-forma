import { ProjectConfig } from '../../data/projects';
import {
  drawBrowserChrome,
  drawRoundedRect,
  drawWrappedText,
} from './canvasPrimitives';

export function renderCyberpunkGlass(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;
  const creamBg = palette.bg; // #EFE2CF
  const surface = palette.surface; // #FAF4EA
  const espresso = palette.text; // #4A2C1D
  const mustard = palette.accent; // #E0A526
  const muted = palette.secondary; // #7D5A47

  // Warm Latte Cream canvas (#EFE2CF)
  ctx.fillStyle = creamBg;
  ctx.fillRect(0, 0, width, height);

  // Subtle ambient warm espresso vignette along edges
  const vignette = ctx.createRadialGradient(
    width * 0.68,
    height * 0.42,
    width * 0.05,
    width * 0.65,
    height * 0.42,
    width * 0.6,
  );
  vignette.addColorStop(0, 'rgba(250, 244, 234, 0.55)');
  vignette.addColorStop(1, 'rgba(74, 44, 29, 0.05)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#E6D6BF',
    borderAlpha: 0.14,
    navItemsColor: muted,
  });

  const contentW = width - padX * 2;
  const gap = width * 0.024;

  // =========================================================================
  // UPPER HERO: Left Storytelling + Mustard CTA | Right Cozy Coffee & Croissant Visual
  // =========================================================================
  const heroY = headerBottom + height * 0.04;
  const heroH = height * 0.44;
  const leftW = contentW * 0.55;
  const rightW = contentW - leftW - gap;
  const rightX = padX + leftW + gap;

  // Monthly Promo Badge Pill
  ctx.fillStyle = 'rgba(74, 44, 29, 0.08)';
  const promoW = width * 0.275;
  const promoH = 34;
  drawRoundedRect(ctx, padX, heroY, promoW, promoH, 17);
  ctx.fill();

  ctx.fillStyle = espresso;
  ctx.font = `600 ${Math.round(width * 0.0086)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX + 16, heroY + promoH * 0.53);

  // Condensed Hero Display Headline: "COFFEE &" / "CROISSANT"
  ctx.fillStyle = espresso;
  ctx.font = `800 ${Math.round(width * 0.052)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('COFFEE &', padX, heroY + height * 0.125);
  ctx.fillText('CROISSANT', padX, heroY + height * 0.205);

  // Mustard Underline Rule under headline
  ctx.fillStyle = mustard;
  drawRoundedRect(ctx, padX, heroY + height * 0.228, width * 0.085, 5, 2.5);
  ctx.fill();

  // Warm story copy
  ctx.fillStyle = muted;
  ctx.font = `400 ${Math.round(width * 0.0124)}px "Plus Jakarta Sans", sans-serif`;
  drawWrappedText(
    ctx,
    previewSample.subheadline,
    padX,
    heroY + height * 0.272,
    leftW - 24,
    height * 0.027,
    2,
  );

  // Mustard CTA Button + City Location Pills
  const ctaY = heroY + heroH - height * 0.075;
  const ctaW = width * 0.165;
  const ctaH = height * 0.064;
  ctx.fillStyle = mustard;
  drawRoundedRect(ctx, padX, ctaY, ctaW, ctaH, 32);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#1D120C';
  ctx.font = `700 ${Math.round(width * 0.0096)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, padX + ctaW * 0.5, ctaY + ctaH * 0.52);
  ctx.textAlign = 'left';

  // Quick City Selector Chips (Utrecht · Amsterdam · Haarlem)
  const cities = ['UTRECHT', 'AMSTERDAM', 'HAARLEM'];
  let chipX = padX + ctaW + 18;
  cities.forEach((city, idx) => {
    const isSel = idx === 0;
    ctx.font = `600 ${Math.round(width * 0.0082)}px "JetBrains Mono", monospace`;
    const cw = ctx.measureText(city).width + 24;
    ctx.fillStyle = isSel ? espresso : 'rgba(74, 44, 29, 0.08)';
    drawRoundedRect(ctx, chipX, ctaY + 8, cw, ctaH - 16, 18);
    ctx.fill();
    ctx.fillStyle = isSel ? creamBg : espresso;
    ctx.fillText(city, chipX + 12, ctaY + ctaH * 0.52);
    chipX += cw + 8;
  });

  // RIGHT VISUAL TILE: Overhead Coffee Mug with Latte Art + Golden Croissant
  ctx.save();
  drawRoundedRect(ctx, rightX, heroY, rightW, heroH, 24);
  ctx.clip();

  // Dark Roasted Café Table Background
  const tableGrad = ctx.createLinearGradient(rightX, heroY, rightX + rightW, heroY + heroH);
  tableGrad.addColorStop(0, '#3D2417');
  tableGrad.addColorStop(0.55, '#2A180E');
  tableGrad.addColorStop(1, '#1A0F09');
  ctx.fillStyle = tableGrad;
  ctx.fillRect(rightX, heroY, rightW, heroH);

  // Soft sunlit table glare
  const sunBeam = ctx.createRadialGradient(
    rightX + rightW * 0.34,
    heroY + heroH * 0.38,
    12,
    rightX + rightW * 0.42,
    heroY + heroH * 0.46,
    rightW * 0.65,
  );
  sunBeam.addColorStop(0, 'rgba(239, 226, 207, 0.24)');
  sunBeam.addColorStop(1, 'transparent');
  ctx.fillStyle = sunBeam;
  ctx.fillRect(rightX, heroY, rightW, heroH);

  // Ceramic Saucer Plate
  const cupCX = rightX + rightW * 0.37;
  const cupCY = heroY + heroH * 0.54;
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = '#EFE2CF';
  ctx.beginPath();
  ctx.arc(cupCX, cupCY, heroH * 0.31, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Cup Handle
  ctx.strokeStyle = '#FAF4EA';
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(cupCX + heroH * 0.21, cupCY, heroH * 0.08, -Math.PI * 0.35, Math.PI * 0.35);
  ctx.stroke();

  // Ceramic Cup Rim
  ctx.fillStyle = '#FAF4EA';
  ctx.beginPath();
  ctx.arc(cupCX, cupCY, heroH * 0.22, 0, Math.PI * 2);
  ctx.fill();

  // Espresso & Crema Surface
  ctx.fillStyle = '#73452A';
  ctx.beginPath();
  ctx.arc(cupCX, cupCY, heroH * 0.185, 0, Math.PI * 2);
  ctx.fill();

  // Cream Latte Art Heart / Rosetta Leaves
  ctx.fillStyle = '#F7EFE2';
  for (let leaf = -2; leaf <= 2; leaf++) {
    ctx.beginPath();
    ctx.ellipse(
      cupCX + leaf * 6,
      cupCY - 4 + Math.abs(leaf) * 5,
      14 - Math.abs(leaf) * 2,
      7,
      leaf * 0.25,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(cupCX, cupCY + 14, 7, 0, Math.PI * 2);
  ctx.fill();

  // Flaky Golden Croissant on Right Side Plate
  const pastryX = rightX + rightW * 0.71;
  const pastryY = heroY + heroH * 0.52;
  ctx.fillStyle = '#FAF4EA';
  ctx.beginPath();
  ctx.arc(pastryX, pastryY, heroH * 0.21, 0, Math.PI * 2);
  ctx.fill();

  // Crescent Baked Pastry Layers
  ctx.save();
  ctx.translate(pastryX, pastryY);
  ctx.rotate(-0.35);
  const pastryGrad = ctx.createLinearGradient(-46, -24, 46, 24);
  pastryGrad.addColorStop(0, '#E0A526');
  pastryGrad.addColorStop(0.5, '#C8801C');
  pastryGrad.addColorStop(1, '#8C4E12');
  ctx.fillStyle = pastryGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, 52, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(250, 244, 234, 0.35)';
  ctx.lineWidth = 2;
  for (let r = -18; r <= 18; r += 18) {
    ctx.beginPath();
    ctx.arc(r, 0, 22, -Math.PI * 0.42, Math.PI * 0.42);
    ctx.stroke();
  }
  ctx.restore();

  // Floating Café Location Badge top-left of image frame
  ctx.fillStyle = 'rgba(29, 18, 12, 0.78)';
  drawRoundedRect(ctx, rightX + 20, heroY + 20, width * 0.145, 30, 15);
  ctx.fill();
  ctx.fillStyle = mustard;
  ctx.beginPath();
  ctx.arc(rightX + 35, heroY + 35, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FAF4EA';
  ctx.font = `600 ${Math.round(width * 0.0078)}px "JetBrains Mono", monospace`;
  ctx.fillText('OUDEGRACHT · UTRECHT', rightX + 46, heroY + 36);

  ctx.restore();

  // =========================================================================
  // BOTTOM INTERACTIVE WIDGET ROW: Open-Meteo Terrace Check | Menu Card
  // =========================================================================
  const botY = heroY + heroH + height * 0.042;
  const botH = height - botY - height * 0.055;
  const weatherW = contentW * 0.40;
  const menuW = contentW - weatherW - gap;
  const menuX = padX + weatherW + gap;

  // --- LEFT CARD: LIVE OPEN-METEO TERRACE CHECK ---
  ctx.fillStyle = surface;
  drawRoundedRect(ctx, padX, botY, weatherW, botH, 20);
  ctx.fill();
  ctx.strokeStyle = 'rgba(74, 44, 29, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const wPad = 28;
  ctx.fillStyle = muted;
  ctx.font = `600 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
  ctx.fillText('LIVE OPEN-METEO TERRACE CHECK', padX + wPad, botY + 38);

  // Temperature Hero Value
  ctx.fillStyle = espresso;
  ctx.font = `800 ${Math.round(width * 0.036)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('18°C', padX + wPad, botY + 106);

  ctx.fillStyle = muted;
  ctx.font = `500 ${Math.round(width * 0.0108)}px "JetBrains Mono", monospace`;
  ctx.fillText('WIND 11 KM/H · DRY', padX + wPad + 128, botY + 100);

  // Terrace Status Banner
  const statusY = botY + botH - 72;
  ctx.fillStyle = 'rgba(224, 165, 38, 0.22)';
  drawRoundedRect(ctx, padX + wPad, statusY, weatherW - wPad * 2, 46, 12);
  ctx.fill();
  ctx.strokeStyle = mustard;
  ctx.lineWidth = 1.25;
  ctx.stroke();

  ctx.fillStyle = '#166534';
  ctx.beginPath();
  ctx.arc(padX + wPad + 18, statusY + 23, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = espresso;
  ctx.font = `700 ${Math.round(width * 0.0094)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Mild weather — Canal terrace open', padX + wPad + 34, statusY + 24);

  // --- RIGHT CARD: INTERACTIVE CATEGORY MENU ---
  ctx.fillStyle = surface;
  drawRoundedRect(ctx, menuX, botY, menuW, botH, 20);
  ctx.fill();
  ctx.strokeStyle = 'rgba(74, 44, 29, 0.12)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Category Tabs across top of menu card
  const tabY = botY + 24;
  let tx = menuX + wPad;
  previewSample.cardLabels.forEach((cat, idx) => {
    const isAct = idx === 0;
    ctx.font = `700 ${Math.round(width * 0.0088)}px "JetBrains Mono", monospace`;
    const tw = ctx.measureText(cat).width + 28;
    ctx.fillStyle = isAct ? espresso : 'rgba(74, 44, 29, 0.07)';
    drawRoundedRect(ctx, tx, tabY, tw, 32, 16);
    ctx.fill();
    ctx.fillStyle = isAct ? creamBg : espresso;
    ctx.fillText(cat, tx + 14, tabY + 17);
    tx += tw + 10;
  });

  // Menu Pricing Rows
  const listStartY = botY + 72;
  const rowSpan = (botH - 92) / previewSample.metrics.length;
  previewSample.metrics.forEach((m, idx) => {
    const ry = listStartY + idx * rowSpan;
    if (idx > 0) {
      ctx.strokeStyle = 'rgba(74, 44, 29, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(menuX + wPad, ry);
      ctx.lineTo(menuX + menuW - wPad, ry);
      ctx.stroke();
    }

    ctx.fillStyle = espresso;
    ctx.font = `600 ${Math.round(width * 0.0112)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.label, menuX + wPad, ry + rowSpan * 0.54);

    ctx.textAlign = 'right';
    ctx.fillStyle = espresso;
    ctx.font = `700 ${Math.round(width * 0.0135)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.value, menuX + menuW - wPad, ry + rowSpan * 0.54);
    ctx.textAlign = 'left';
  });
}
