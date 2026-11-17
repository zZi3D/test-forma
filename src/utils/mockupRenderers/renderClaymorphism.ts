import { ProjectConfig } from '../../data/projects';
import {
  drawBrowserChrome,
  drawRoundedRect,
  drawWrappedText,
} from './canvasPrimitives';

function drawElevatedCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: string,
) {
  ctx.save();
  // Warm, gentle ambient shadow instead of harsh cool grey
  ctx.shadowColor = 'rgba(120, 105, 92, 0.14)';
  ctx.shadowBlur = 34;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 14;
  ctx.fillStyle = fill;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.restore();

  // Crisp subtle warm border
  ctx.strokeStyle = 'rgba(224, 109, 75, 0.10)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.stroke();
}

export function renderClaymorphism(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;

  // Warm alabaster off-white canvas (#F8F7F4)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#FFFFFF',
    borderAlpha: 0.08,
    navItemsColor: palette.secondary,
  });

  const topY = headerBottom + height * 0.048;
  const contentW = width - padX * 2;
  const gap = width * 0.025;
  const radius = 36;

  // =========================================================================
  // LEFT LARGE ELEVATED HERO CARD (58% width): Human Coaching & Advisory
  // =========================================================================
  const mainW = contentW * 0.58;
  const mainH = height - topY - height * 0.068;
  drawElevatedCard(ctx, padX, topY, mainW, mainH, radius, palette.surface);

  const cardPad = width * 0.034;

  // Warm terracotta eyebrow pill
  ctx.fillStyle = 'rgba(224, 109, 75, 0.11)';
  drawRoundedRect(ctx, padX + cardPad, topY + height * 0.052, width * 0.195, 34, 17);
  ctx.fill();
  ctx.fillStyle = palette.accent;
  ctx.font = `700 ${Math.round(width * 0.0085)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX + cardPad + 16, topY + height * 0.052 + 18);

  // Calm, inviting headline: "Clarity for Your Next Chapter."
  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.039)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Clarity for Your', padX + cardPad, topY + height * 0.165);
  ctx.fillText('Next Chapter.', padX + cardPad, topY + height * 0.235);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0128)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Calm, personal 1-on-1 guidance built around', padX + cardPad, topY + height * 0.298);
  ctx.fillText('your goals, pace, and key life decisions.', padX + cardPad, topY + height * 0.328);

  // Warm Advisor Portrait Badge ("1-on-1 Guidance")
  const bioY = topY + height * 0.382;
  const bioW = mainW - cardPad * 2;
  const bioH = height * 0.145;
  ctx.fillStyle = '#FDF9F6';
  drawRoundedRect(ctx, padX + cardPad, bioY, bioW, bioH, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(224, 109, 75, 0.18)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Stylized warm advisor portrait avatar inside rounded badge
  const avR = bioH * 0.34;
  const avX = padX + cardPad + 24 + avR;
  const avY = bioY + bioH * 0.5;

  const avBgGrad = ctx.createLinearGradient(avX - avR, avY - avR, avX + avR, avY + avR);
  avBgGrad.addColorStop(0, '#F6DFD3');
  avBgGrad.addColorStop(1, '#E9B9A2');
  ctx.fillStyle = avBgGrad;
  ctx.beginPath();
  ctx.arc(avX, avY, avR, 0, Math.PI * 2);
  ctx.fill();

  // Stylized warm portrait silhouette (head + shoulders) clipped inside circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(avX, avY, avR, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = '#2F3A4B';
  // Shoulders arc
  ctx.beginPath();
  ctx.arc(avX, avY + avR * 1.05, avR * 0.78, Math.PI, 0);
  ctx.fill();
  // Head
  ctx.fillStyle = '#43332B';
  ctx.beginPath();
  ctx.arc(avX, avY - avR * 0.16, avR * 0.32, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Online calm presence dot
  ctx.fillStyle = '#22C55E';
  ctx.beginPath();
  ctx.arc(avX + avR * 0.72, avY + avR * 0.68, 6.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#FDF9F6';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Advisor badge text
  const bioTextX = avX + avR + 22;
  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.014)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('1-on-1 Guidance · Vera Lindeman', bioTextX, bioY + bioH * 0.38);

  ctx.fillStyle = palette.secondary;
  ctx.font = `500 ${Math.round(width * 0.0108)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('Certified Executive & Personal Advisor · Online & Studio', bioTextX, bioY + bioH * 0.68);

  // Prominent Warm Terracotta Discovery Call CTA Button
  const ctaY = topY + mainH - height * 0.115;
  const ctaW = width * 0.21;
  ctx.save();
  ctx.shadowColor = 'rgba(224, 109, 75, 0.32)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = palette.accent;
  drawRoundedRect(ctx, padX + cardPad, ctaY, ctaW, 56, 28);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.0102)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, padX + cardPad + 26, ctaY + 29);

  // Subtle calm reassurance text beside CTA
  ctx.fillStyle = palette.secondary;
  ctx.font = `500 ${Math.round(width * 0.0102)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('No obligation · 30 min', padX + cardPad + ctaW + 20, ctaY + 29);

  // =========================================================================
  // RIGHT COLUMN (39.5% width): 3-Step Client Roadmap Cards (No Charts!)
  // =========================================================================
  const rightX = padX + mainW + gap;
  const rightW = contentW - mainW - gap;
  const cardGap = height * 0.028;
  const cardH = (mainH - cardGap * 2) / 3;

  const roadmapSteps = [
    {
      num: '01',
      title: 'Discovery Call',
      desc: '30-minute conversation to map your goals and questions.',
      active: true,
    },
    {
      num: '02',
      title: 'Personal Roadmap',
      desc: 'A clear, practical plan tailored to your pace and priorities.',
      active: false,
    },
    {
      num: '03',
      title: 'Guided Growth',
      desc: 'Ongoing 1-on-1 check-ins and calm, steady accountability.',
      active: false,
    },
  ];

  roadmapSteps.forEach((step, idx) => {
    const cy = topY + idx * (cardH + cardGap);
    drawElevatedCard(ctx, rightX, cy, rightW, cardH, 28, palette.surface);

    // Step Number Pill
    const pillX = rightX + width * 0.022;
    const pillY = cy + cardH * 0.24;
    ctx.fillStyle = step.active ? palette.accent : '#F5ECE6';
    drawRoundedRect(ctx, pillX, pillY, 48, 30, 15);
    ctx.fill();

    ctx.fillStyle = step.active ? '#FFFFFF' : palette.accent;
    ctx.textAlign = 'center';
    ctx.font = `700 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
    ctx.fillText(step.num, pillX + 24, pillY + 16);
    ctx.textAlign = 'left';

    // Step Title
    ctx.fillStyle = palette.text;
    ctx.font = `700 ${Math.round(width * 0.0175)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(step.title, pillX + 64, pillY + 16);

    // Concise human description
    ctx.fillStyle = palette.secondary;
    ctx.font = `400 ${Math.round(width * 0.0112)}px "Plus Jakarta Sans", sans-serif`;
    drawWrappedText(
      ctx,
      step.desc,
      pillX,
      cy + cardH * 0.65,
      rightW - width * 0.044,
      cardH * 0.17,
      2,
    );
  });
}
