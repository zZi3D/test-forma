import { ProjectConfig } from '../../data/projects';
import { drawBrowserChrome, drawRoundedRect } from './canvasPrimitives';

function drawModernGlassCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  topTint = 'rgba(255, 255, 255, 0.065)',
) {
  ctx.save();
  const fillGrad = ctx.createLinearGradient(x, y, x, y + h);
  fillGrad.addColorStop(0, topTint);
  fillGrad.addColorStop(1, 'rgba(17, 19, 28, 0.72)');
  ctx.fillStyle = fillGrad;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();

  const borderGrad = ctx.createLinearGradient(x, y, x + w, y + h);
  borderGrad.addColorStop(0, 'rgba(255, 255, 255, 0.24)');
  borderGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.25)');
  borderGrad.addColorStop(1, 'rgba(255, 255, 255, 0.08)');
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 1.5;
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
  const indigo = '#6366F1';
  const violet = '#8B5CF6';
  const cyan = '#22D3EE';
  const mint = '#34D399';

  // Deep midnight carbon background (#08090D)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Diffuse Linear / Apple Intelligence inspired indigo-violet & soft cyan aurora behind hero
  const indigoAurora = ctx.createRadialGradient(
    width * 0.46,
    height * 0.42,
    20,
    width * 0.46,
    height * 0.42,
    width * 0.44,
  );
  indigoAurora.addColorStop(0, 'rgba(99, 102, 241, 0.30)');
  indigoAurora.addColorStop(0.45, 'rgba(139, 92, 246, 0.14)');
  indigoAurora.addColorStop(1, 'transparent');
  ctx.fillStyle = indigoAurora;
  ctx.fillRect(0, 0, width, height);

  const cyanAurora = ctx.createRadialGradient(
    width * 0.64,
    height * 0.48,
    10,
    width * 0.64,
    height * 0.48,
    width * 0.36,
  );
  cyanAurora.addColorStop(0, 'rgba(34, 211, 238, 0.22)');
  cyanAurora.addColorStop(0.55, 'rgba(34, 211, 238, 0.06)');
  cyanAurora.addColorStop(1, 'transparent');
  ctx.fillStyle = cyanAurora;
  ctx.fillRect(0, 0, width, height);

  // Subtle ambient dot matrix texture across top canvas (subtle precision SaaS backdrop)
  ctx.fillStyle = 'rgba(248, 250, 252, 0.055)';
  for (let gx = width * 0.08; gx < width * 0.92; gx += 34) {
    for (let gy = height * 0.18; gy < height * 0.64; gy += 34) {
      ctx.fillRect(gx, gy, 1.5, 1.5);
    }
  }

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#0E1018',
    borderAlpha: 0.12,
    navItemsColor: 'rgba(248, 250, 252, 0.7)',
    highlightLastNav: true,
  });

  // CENTERED HERO: Eyebrow Pill + Precision Headline + Subheadline
  const centerX = width * 0.5;
  ctx.textAlign = 'center';

  // Subtle intelligence pill badge
  const pillW = width * 0.19;
  const pillH = 34;
  const pillY = headerBottom + height * 0.048;
  drawModernGlassCard(ctx, centerX - pillW * 0.5, pillY, pillW, pillH, 17);

  ctx.fillStyle = cyan;
  ctx.beginPath();
  ctx.arc(centerX - pillW * 0.5 + 22, pillY + pillH * 0.5, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#CBD5E1';
  ctx.font = `600 ${Math.round(width * 0.0086)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, centerX + 8, pillY + pillH * 0.52);

  // Crisp Headline: "Intelligence Built Into Every Workflow."
  const words = previewSample.headline.split(' ');
  const splitPoint = Math.ceil(words.length / 2);
  const line1 = words.slice(0, splitPoint).join(' ');
  const line2 = words.slice(splitPoint).join(' ');

  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.045)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(line1, centerX, pillY + height * 0.105);

  const headGrad = ctx.createLinearGradient(
    centerX - width * 0.25,
    0,
    centerX + width * 0.25,
    0,
  );
  headGrad.addColorStop(0, '#F8FAFC');
  headGrad.addColorStop(0.55, '#C7D2FE');
  headGrad.addColorStop(1, '#67E8F9');
  ctx.fillStyle = headGrad;
  ctx.fillText(line2, centerX, pillY + height * 0.175);

  ctx.fillStyle = 'rgba(203, 213, 225, 0.72)';
  ctx.font = `400 ${Math.round(width * 0.0128)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.subheadline, centerX, pillY + height * 0.232);

  // CENTRAL GLASSMORPHIC AI PROMPT INPUT BAR
  const barW = width * 0.66;
  const barH = 74;
  const barX = centerX - barW * 0.5;
  const barY = pillY + height * 0.285;

  // Soft aurora outer bloom around prompt bar
  ctx.save();
  ctx.shadowColor = 'rgba(99, 102, 241, 0.36)';
  ctx.shadowBlur = 36;
  ctx.shadowOffsetY = 12;
  drawModernGlassCard(ctx, barX, barY, barW, barH, 22, 'rgba(255, 255, 255, 0.09)');
  ctx.restore();

  // Left Sparkle Glyph inside prompt bar
  ctx.textAlign = 'left';
  ctx.fillStyle = cyan;
  ctx.font = `700 ${Math.round(width * 0.014)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('✦', barX + 26, barY + barH * 0.51);

  // Prompt Placeholder Text + subtle cursor
  ctx.fillStyle = 'rgba(248, 250, 252, 0.78)';
  ctx.font = `400 ${Math.round(width * 0.0128)}px "Plus Jakarta Sans", sans-serif`;
  const promptText = 'Ask AI to automate reports, leads & support...';
  ctx.fillText(promptText, barX + 58, barY + barH * 0.51);
  const cursorX = barX + 58 + ctx.measureText(promptText).width + 6;
  ctx.fillStyle = cyan;
  ctx.fillRect(cursorX, barY + barH * 0.5 - 12, 2, 24);

  // Right Glowing "Generate ✦" Pill Button inside prompt bar
  const genW = 162;
  const genH = 48;
  const genX = barX + barW - genW - 13;
  const genY = barY + (barH - genH) * 0.5;

  ctx.save();
  const genGrad = ctx.createLinearGradient(genX, genY, genX + genW, genY + genH);
  genGrad.addColorStop(0, indigo);
  genGrad.addColorStop(0.55, violet);
  genGrad.addColorStop(1, '#0891B2');
  ctx.shadowColor = 'rgba(99, 102, 241, 0.55)';
  ctx.shadowBlur = 18;
  ctx.fillStyle = genGrad;
  drawRoundedRect(ctx, genX, genY, genW, genH, 14);
  ctx.fill();
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.011)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, genX + genW * 0.5, genY + genH * 0.52);
  ctx.textAlign = 'left';

  // BOTTOM FEATURE ROW: 3 Sleek Translucent Dark Glass Cards
  const cardsY = barY + barH + height * 0.055;
  const cardsH = height - cardsY - height * 0.062;
  const contentW = width - padX * 2;
  const cardGap = width * 0.02;
  const cardW = (contentW - cardGap * 2) / 3;

  // --- CARD 1: 01 · Instant Insights (with Mini Sparkline) ---
  const c1X = padX;
  drawModernGlassCard(ctx, c1X, cardsY, cardW, cardsH, 20);
  ctx.fillStyle = cyan;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.metrics[0].label, c1X + 26, cardsY + 38);

  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.019)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.metrics[0].value, c1X + 26, cardsY + 78);

  // Clean Glowing Mini Area Sparkline
  const spX = c1X + 26;
  const spW = cardW - 52;
  const spTop = cardsY + cardsH * 0.52;
  const spBot = cardsY + cardsH - 26;
  const pts = [
    { x: spX, y: spBot - 8 },
    { x: spX + spW * 0.2, y: spBot - 22 },
    { x: spX + spW * 0.38, y: spBot - 16 },
    { x: spX + spW * 0.58, y: spBot - 44 },
    { x: spX + spW * 0.78, y: spBot - 38 },
    { x: spX + spW, y: spTop + 6 },
  ];

  const areaGrad = ctx.createLinearGradient(0, spTop, 0, spBot);
  areaGrad.addColorStop(0, 'rgba(34, 211, 238, 0.28)');
  areaGrad.addColorStop(1, 'rgba(34, 211, 238, 0.0)');
  ctx.fillStyle = areaGrad;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, spBot);
  pts.forEach((p) => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length - 1].x, spBot);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = cyan;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  pts.forEach((p, idx) => {
    if (idx === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.stroke();

  // Glowing end-point dot
  const lastPt = pts[pts.length - 1];
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(lastPt.x, lastPt.y, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // --- CARD 2: 02 · Smart Workflows (Connected Node Pills) ---
  const c2X = padX + cardW + cardGap;
  drawModernGlassCard(ctx, c2X, cardsY, cardW, cardsH, 20);
  ctx.fillStyle = '#A5B4FC';
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.metrics[1].label, c2X + 26, cardsY + 38);

  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.019)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.metrics[1].value, c2X + 26, cardsY + 78);

  // 3 Connected Workflow Node Pills
  const nodes = ['Trigger', 'Enrich', 'Sync'];
  const nodeW = (cardW - 52 - 36) / 3;
  const nodeH = 42;
  const nodeY = cardsY + cardsH - 72;

  ctx.strokeStyle = 'rgba(165, 180, 252, 0.45)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(c2X + 26 + nodeW * 0.5, nodeY + nodeH * 0.5);
  ctx.lineTo(c2X + cardW - 26 - nodeW * 0.5, nodeY + nodeH * 0.5);
  ctx.stroke();

  nodes.forEach((nodeLabel, idx) => {
    const nx = c2X + 26 + idx * (nodeW + 18);
    ctx.fillStyle = idx === 1 ? 'rgba(99, 102, 241, 0.34)' : '#161926';
    drawRoundedRect(ctx, nx, nodeY, nodeW, nodeH, 12);
    ctx.fill();
    ctx.strokeStyle = idx === 1 ? indigo : 'rgba(255, 255, 255, 0.16)';
    ctx.lineWidth = 1.4;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = palette.text;
    ctx.font = `600 ${Math.round(width * 0.0086)}px "JetBrains Mono", monospace`;
    ctx.fillText(nodeLabel, nx + nodeW * 0.5, nodeY + nodeH * 0.52);
  });
  ctx.textAlign = 'left';

  // --- CARD 3: 03 · 24/7 AI Agent (Live Status Indicator) ---
  const c3X = padX + (cardW + cardGap) * 2;
  drawModernGlassCard(ctx, c3X, cardsY, cardW, cardsH, 20);
  ctx.fillStyle = mint;
  ctx.font = `600 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.metrics[2].label, c3X + 26, cardsY + 38);

  // Glowing live green status indicator beside value
  ctx.save();
  ctx.shadowColor = mint;
  ctx.shadowBlur = 12;
  ctx.fillStyle = mint;
  ctx.beginPath();
  ctx.arc(c3X + 34, cardsY + 76, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.019)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.metrics[2].value, c3X + 52, cardsY + 78);

  // Two compact live activity lines inside Card 3
  const actY = cardsY + cardsH - 76;
  const activities = ['24 leads qualified today', 'Avg response: 1.4 sec'];
  activities.forEach((act, idx) => {
    const ay = actY + idx * 32;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    drawRoundedRect(ctx, c3X + 26, ay, cardW - 52, 24, 8);
    ctx.fill();

    ctx.fillStyle = idx === 0 ? mint : cyan;
    ctx.beginPath();
    ctx.arc(c3X + 39, ay + 12, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(248, 250, 252, 0.8)';
    ctx.font = `500 ${Math.round(width * 0.0085)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(act, c3X + 50, ay + 13);
  });
}
