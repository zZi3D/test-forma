import { ProjectConfig } from '../../data/projects';
import {
  drawBrowserChrome,
  drawRoundedRect,
  drawWrappedText,
} from './canvasPrimitives';

export function renderDarkKinetic(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;
  const orange = '#FF4D24';

  // Deep carbon black (#09090B)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Dramatic diagonal studio / stadium light beams across background
  ctx.save();
  for (let b = 0; b < 4; b++) {
    const bx = width * (0.22 + b * 0.21);
    const beamGrad = ctx.createLinearGradient(bx, 0, bx - width * 0.24, height);
    beamGrad.addColorStop(0, b === 2 ? 'rgba(255, 77, 36, 0.14)' : 'rgba(228, 228, 231, 0.055)');
    beamGrad.addColorStop(0.55, b === 2 ? 'rgba(255, 77, 36, 0.04)' : 'rgba(228, 228, 231, 0.015)');
    beamGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx + width * 0.075, 0);
    ctx.lineTo(bx - width * 0.18, height);
    ctx.lineTo(bx - width * 0.255, height);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Warm signal-orange underglow behind athlete stage
  const stageGlow = ctx.createRadialGradient(
    width * 0.36,
    height * 0.56,
    18,
    width * 0.36,
    height * 0.56,
    width * 0.44,
  );
  stageGlow.addColorStop(0, 'rgba(255, 77, 36, 0.22)');
  stageGlow.addColorStop(0.55, 'rgba(255, 77, 36, 0.06)');
  stageGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = stageGlow;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#121216',
    borderAlpha: 0.14,
    navItemsColor: 'rgba(228, 228, 231, 0.68)',
  });

  const contentW = width - padX * 2;
  const topY = headerBottom + height * 0.042;

  // TOP HERO ROW: Left (Clean Wide Headline — never overlaps right widget!) | Right (Live Performance Pulse Card)
  const leftHeroW = contentW * 0.58;

  ctx.fillStyle = orange;
  ctx.font = `700 ${Math.round(width * 0.0095)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX, topY + height * 0.02);

  ctx.fillStyle = palette.text;
  ctx.font = `italic 800 ${Math.round(width * 0.046)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText('TRAIN WITHOUT', padX, topY + height * 0.095);
  ctx.fillStyle = orange;
  ctx.fillText('LIMITS.', padX, topY + height * 0.158);

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0114)}px "Plus Jakarta Sans", sans-serif`;
  drawWrappedText(
    ctx,
    previewSample.subheadline,
    padX,
    topY + height * 0.195,
    leftHeroW - 12,
    height * 0.024,
    2,
  );

  // RIGHT HERO WIDGET: Live Pulse & Output Wave Card
  const pulseW = contentW - leftHeroW - width * 0.03;
  const pulseH = height * 0.215;
  const pulseX = width - padX - pulseW;
  const pulseY = topY;

  ctx.fillStyle = '#121217';
  drawRoundedRect(ctx, pulseX, pulseY, pulseW, pulseH, 14);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 77, 36, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Header inside Pulse Widget
  ctx.fillStyle = orange;
  ctx.beginPath();
  ctx.arc(pulseX + 24, pulseY + 28, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = palette.secondary;
  ctx.font = `600 12px "JetBrains Mono", monospace`;
  ctx.fillText('LIVE PERFORMANCE PULSE', pulseX + 38, pulseY + 29);

  ctx.textAlign = 'right';
  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.0165)}px "JetBrains Mono", monospace`;
  ctx.fillText('168 BPM', pulseX + pulseW - 22, pulseY + 30);
  ctx.textAlign = 'left';

  // Crisp ECG / Performance Pulse Wave inside widget
  const wLeft = pulseX + 22;
  const wRight = pulseX + pulseW - 22;
  const wSpan = wRight - wLeft;
  const wMidY = pulseY + pulseH * 0.64;

  const wavePoints = [
    { x: wLeft, y: wMidY },
    { x: wLeft + wSpan * 0.14, y: wMidY },
    { x: wLeft + wSpan * 0.2, y: wMidY - 14 },
    { x: wLeft + wSpan * 0.26, y: wMidY + 18 },
    { x: wLeft + wSpan * 0.34, y: wMidY - 52 },
    { x: wLeft + wSpan * 0.41, y: wMidY + 26 },
    { x: wLeft + wSpan * 0.47, y: wMidY - 8 },
    { x: wLeft + wSpan * 0.58, y: wMidY },
    { x: wLeft + wSpan * 0.65, y: wMidY - 16 },
    { x: wLeft + wSpan * 0.72, y: wMidY + 12 },
    { x: wLeft + wSpan * 0.8, y: wMidY - 46 },
    { x: wLeft + wSpan * 0.86, y: wMidY + 20 },
    { x: wLeft + wSpan * 0.92, y: wMidY },
    { x: wRight, y: wMidY },
  ];

  // Subtle glow fill under pulse wave
  const waveArea = ctx.createLinearGradient(0, wMidY - 52, 0, pulseY + pulseH - 12);
  waveArea.addColorStop(0, 'rgba(255, 77, 36, 0.28)');
  waveArea.addColorStop(1, 'transparent');
  ctx.fillStyle = waveArea;
  ctx.beginPath();
  ctx.moveTo(wLeft, pulseY + pulseH - 14);
  wavePoints.forEach((pt) => ctx.lineTo(pt.x, pt.y));
  ctx.lineTo(wRight, pulseY + pulseH - 14);
  ctx.closePath();
  ctx.fill();

  ctx.save();
  ctx.shadowColor = orange;
  ctx.shadowBlur = 12;
  ctx.strokeStyle = orange;
  ctx.lineWidth = 2.8;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  wavePoints.forEach((pt, idx) => {
    if (idx === 0) ctx.moveTo(pt.x, pt.y);
    else ctx.lineTo(pt.x, pt.y);
  });
  ctx.stroke();
  ctx.restore();

  // ATHLETIC STUDIO STAGE: Dynamic Stylized Sprinter / Athlete Silhouette in Motion
  const stageY = topY + height * 0.248;
  const stageH = height * 0.402;

  ctx.save();
  drawRoundedRect(ctx, padX, stageY, contentW, stageH, 16);
  ctx.clip();

  const stageGrad = ctx.createLinearGradient(padX, stageY, padX + contentW, stageY + stageH);
  stageGrad.addColorStop(0, '#101014');
  stageGrad.addColorStop(0.6, '#17171E');
  stageGrad.addColorStop(1, '#0B0B0F');
  ctx.fillStyle = stageGrad;
  ctx.fillRect(padX, stageY, contentW, stageH);

  // Perspective Track / Floor Grid Lines
  const floorY = stageY + stageH * 0.84;
  ctx.strokeStyle = 'rgba(228, 228, 231, 0.16)';
  ctx.lineWidth = 1.25;
  ctx.beginPath();
  ctx.moveTo(padX + contentW * 0.04, floorY);
  ctx.lineTo(padX + contentW * 0.96, floorY);
  ctx.stroke();

  // Horizontal Kinetic Speed Lines trailing behind sprinter
  const speedLines = [
    { y: 0.26, len: 0.36, glow: false },
    { y: 0.38, len: 0.44, glow: true },
    { y: 0.51, len: 0.3, glow: false },
    { y: 0.64, len: 0.4, glow: true },
    { y: 0.74, len: 0.26, glow: false },
  ];
  speedLines.forEach((sl) => {
    ctx.strokeStyle = sl.glow ? 'rgba(255, 77, 36, 0.65)' : 'rgba(228, 228, 231, 0.16)';
    ctx.lineWidth = sl.glow ? 2.4 : 1.25;
    ctx.beginPath();
    ctx.moveTo(padX + contentW * 0.05, stageY + stageH * sl.y);
    ctx.lineTo(padX + contentW * (0.05 + sl.len), stageY + stageH * sl.y);
    ctx.stroke();
  });

  // STYLIZED SPRINTER SILHOUETTE IN FULL MOTION (centered-left at x = 0.42)
  const athX = padX + contentW * 0.42;
  const athScale = stageH / 340;

  ctx.save();
  ctx.translate(athX, floorY);
  ctx.scale(athScale, athScale);

  // Subtle floor shadow directly beneath stride
  ctx.fillStyle = 'rgba(255, 77, 36, 0.24)';
  ctx.beginPath();
  ctx.ellipse(-10, 6, 125, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Draw cohesive athletic sprinter silhouette (#050507 body + fiery orange speed rim)
  ctx.fillStyle = '#050507';
  ctx.strokeStyle = orange;
  ctx.lineWidth = 2.6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Head leaning aggressively forward
  ctx.beginPath();
  ctx.ellipse(54, -238, 21, 24, 0.32, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Dynamic Forward-Leaning Torso
  ctx.beginPath();
  ctx.moveTo(28, -214); // Front shoulder
  ctx.lineTo(54, -196); // Chest top
  ctx.lineTo(14, -112); // Front hip
  ctx.lineTo(-22, -124); // Back hip
  ctx.lineTo(4, -210); // Upper back
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Pumping Front Arm (raised forward)
  ctx.beginPath();
  ctx.moveTo(40, -200);
  ctx.lineTo(94, -172);
  ctx.lineTo(126, -218);
  ctx.lineTo(108, -226);
  ctx.lineTo(84, -190);
  ctx.lineTo(36, -214);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Driving Back Arm (extended behind torso)
  ctx.beginPath();
  ctx.moveTo(6, -202);
  ctx.lineTo(-56, -182);
  ctx.lineTo(-104, -150);
  ctx.lineTo(-92, -138);
  ctx.lineTo(-46, -166);
  ctx.lineTo(12, -184);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Driving Front Knee + Lower Leg reaching forward
  ctx.beginPath();
  ctx.moveTo(12, -118);
  ctx.lineTo(86, -132); // Front knee apex
  ctx.lineTo(74, -42); // Front shin
  ctx.lineTo(102, -34); // Shoe forward toe
  ctx.lineTo(100, -22);
  ctx.lineTo(56, -28);
  ctx.lineTo(62, -108);
  ctx.lineTo(-8, -104);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Extended Trailing Push-Off Leg
  ctx.beginPath();
  ctx.moveTo(-20, -122);
  ctx.lineTo(-86, -68);
  ctx.lineTo(-152, -14);
  ctx.lineTo(-164, -22);
  ctx.lineTo(-138, 2); // Toe pushing off track
  ctx.lineTo(-124, -4);
  ctx.lineTo(-70, -48);
  ctx.lineTo(2, -106);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();

  // Right-Side Coaching Telemetry Readout inside Stage
  const splitX = padX + contentW * 0.67;
  const splitMetrics = [
    { k: 'AVG SPLIT', v: '03:42 /KM', highlight: true },
    { k: 'TRAINING ZONE', v: 'ZONE 4 · THRESHOLD', highlight: false },
    { k: 'NEXT COACHING', v: 'TODAY · 18:00', highlight: false },
  ];

  splitMetrics.forEach((sm, idx) => {
    const sy = stageY + stageH * (0.22 + idx * 0.25);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    drawRoundedRect(ctx, splitX, sy, contentW * 0.28, stageH * 0.19, 10);
    ctx.fill();
    ctx.strokeStyle = sm.highlight ? 'rgba(255, 77, 36, 0.45)' : 'rgba(228, 228, 231, 0.1)';
    ctx.lineWidth = 1.25;
    ctx.stroke();

    ctx.fillStyle = palette.secondary;
    ctx.font = `600 11px "JetBrains Mono", monospace`;
    ctx.fillText(sm.k, splitX + 18, sy + stageH * 0.072);

    ctx.fillStyle = sm.highlight ? orange : palette.text;
    ctx.font = `700 ${Math.round(width * 0.0135)}px "JetBrains Mono", monospace`;
    ctx.fillText(sm.v, splitX + 18, sy + stageH * 0.145);
  });

  ctx.restore();
  ctx.strokeStyle = 'rgba(228, 228, 231, 0.12)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, padX, stageY, contentW, stageH, 16);
  ctx.stroke();

  // BOTTOM ACTION ROW: 3 Program Cards + High-Contrast Orange "BOOK TRIAL SESSION →" CTA
  const footY = stageY + stageH + height * 0.032;
  const footH = height - footY - height * 0.055;
  const cellGap = width * 0.016;
  const cellW = (contentW - cellGap * 3) / 4;
  const subLabels = ['Mon–Sat · 45 min', 'Custom Athlete Plan', 'VO2 & Speed Testing'];

  previewSample.metrics.forEach((m, idx) => {
    const cx = padX + idx * (cellW + cellGap);
    ctx.fillStyle = '#121216';
    drawRoundedRect(ctx, cx, footY, cellW, footH, 12);
    ctx.fill();
    ctx.strokeStyle = 'rgba(228, 228, 231, 0.14)';
    ctx.lineWidth = 1.25;
    ctx.stroke();

    ctx.fillStyle = orange;
    ctx.font = `700 12px "JetBrains Mono", monospace`;
    ctx.fillText(`${m.label} ·`, cx + 20, footY + footH * 0.34);

    ctx.fillStyle = palette.text;
    ctx.font = `800 ${Math.round(width * 0.0125)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(m.value, cx + 52, footY + footH * 0.34);

    ctx.fillStyle = palette.secondary;
    ctx.font = `500 ${Math.round(width * 0.0095)}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillText(subLabels[idx] || 'Small group session', cx + 20, footY + footH * 0.72);
  });

  // 4th Column: High-Contrast Signal-Orange "BOOK TRIAL SESSION →" CTA Button
  const ctaX = padX + 3 * (cellW + cellGap);
  ctx.save();
  ctx.shadowColor = 'rgba(255, 77, 36, 0.38)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = orange;
  drawRoundedRect(ctx, ctaX, footY, cellW, footH, 12);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `800 ${Math.round(width * 0.0108)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.ctaLabel, ctaX + 20, footY + footH * 0.44);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.84)';
  ctx.font = `600 11px "JetBrains Mono", monospace`;
  ctx.fillText('FREE INTRO · 60 MIN', ctaX + 20, footY + footH * 0.74);
}
