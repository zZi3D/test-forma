import { ProjectConfig } from '../../data/projects';
import { drawBrowserChrome, drawRoundedRect } from './canvasPrimitives';

function drawRotaryKnob(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  knobColor: string,
  pointerColor: string,
  angleRad: number,
  label: string,
  textColor: string,
) {
  // Calibration tick arc around knob
  for (let t = 0; t <= 10; t++) {
    const a = Math.PI * 0.75 + (t / 10) * Math.PI * 1.5;
    const r1 = r + 10;
    const r2 = r + (t % 5 === 0 ? 20 : 15);
    ctx.strokeStyle = t === 10 ? '#FF4D24' : 'rgba(212, 212, 216, 0.45)';
    ctx.lineWidth = t % 5 === 0 ? 2.2 : 1.3;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.stroke();
  }

  // Deep tactile hardware shadow beneath knob
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
  ctx.shadowBlur = 22;
  ctx.shadowOffsetX = 6;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = knobColor;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Machined metallic bevel rim
  const rimGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  rimGrad.addColorStop(0, 'rgba(255,255,255,0.28)');
  rimGrad.addColorStop(0.5, 'rgba(255,255,255,0.03)');
  rimGrad.addColorStop(1, 'rgba(0,0,0,0.45)');
  ctx.strokeStyle = rimGrad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 1.5, 0, Math.PI * 2);
  ctx.stroke();

  // Top dial cap
  ctx.fillStyle = knobColor;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.82, 0, Math.PI * 2);
  ctx.fill();

  // Indicator notch
  ctx.strokeStyle = pointerColor;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx + Math.cos(angleRad) * (r * 0.28), cy + Math.sin(angleRad) * (r * 0.28));
  ctx.lineTo(cx + Math.cos(angleRad) * (r * 0.74), cy + Math.sin(angleRad) * (r * 0.74));
  ctx.stroke();

  // Engraved label below knob
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.font = `600 14px "JetBrains Mono", monospace`;
  ctx.fillText(label, cx, cy + r + 40);
  ctx.textAlign = 'left';
}

export function renderSkeuomorphism(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, content } = project;

  // Anodized matte black chassis (#18181B)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#121215',
    borderAlpha: 0.14,
    navItemsColor: palette.surface,
  });

  // Main Industrial Chassis Panel
  const panelY = headerBottom + height * 0.04;
  const panelW = width - padX * 2;
  const panelH = height - panelY - height * 0.06;

  // Brushed aluminum outer trim border
  ctx.fillStyle = '#202024';
  drawRoundedRect(ctx, padX, panelY, panelW, panelH, 14);
  ctx.fill();
  ctx.strokeStyle = palette.surface;
  ctx.globalAlpha = 0.28;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Inner section grid bays
  const innerPad = width * 0.024;
  const bayX = padX + innerPad;
  const bayY = panelY + innerPad;
  const bayW = panelW - innerPad * 2;
  const bayH = panelH - innerPad * 2;

  // TOP ROW: Speaker Perforation Grille (Left) + Illuminated OLED Spectrum Display (Center-Right)
  const topRowH = bayH * 0.42;
  const speakerW = bayW * 0.26;
  const oledX = bayX + speakerW + innerPad;
  const oledW = bayW - speakerW - innerPad;

  // Dieter Rams perforated circular speaker dot matrix
  ctx.fillStyle = '#151518';
  drawRoundedRect(ctx, bayX, bayY, speakerW, topRowH, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(212,212,216,0.16)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const cols = 12;
  const rows = 9;
  const spGapX = (speakerW - 44) / (cols - 1);
  const spGapY = (topRowH - 44) / (rows - 1);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = '#09090B';
      ctx.beginPath();
      ctx.arc(bayX + 22 + c * spGapX, bayY + 22 + r * spGapY, 4.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Recessed OLED Hardware Display
  ctx.fillStyle = '#090A0C';
  drawRoundedRect(ctx, oledX, bayY, oledW, topRowH, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(212,212,216,0.22)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Display Telemetry Header
  ctx.fillStyle = palette.accent;
  ctx.font = `600 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.fillText(content.eyebrow, oledX + 28, bayY + 34);

  ctx.fillStyle = palette.text;
  ctx.font = `700 ${Math.round(width * 0.022)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(content.headline, oledX + 28, bayY + 72);

  // Waveform & Bar Spectrum inside OLED
  const waveY = bayY + topRowH * 0.56;
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let s = 0; s <= 48; s++) {
    const sx = oledX + 28 + (s / 48) * (oledW * 0.56);
    const amp = Math.sin(s * 0.45) * 28 * Math.sin((s / 48) * Math.PI);
    const sy = waveY + amp;
    if (s === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  }
  ctx.stroke();

  // Right OLED numerical metrics
  content.metrics.forEach((m, idx) => {
    const mx = oledX + oledW * 0.66;
    const my = bayY + 46 + idx * 62;
    ctx.fillStyle = palette.secondary;
    ctx.font = `500 13px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, mx, my);
    ctx.fillStyle = idx === 2 ? palette.accent : palette.text;
    ctx.font = `700 22px "JetBrains Mono", monospace`;
    ctx.fillText(m.value, mx, my + 24);
  });

  // BOTTOM ROW: Tactile Rotary Synthesizer Knobs & Physical Switches
  const botY = bayY + topRowH + innerPad;
  const botH = bayH - topRowH - innerPad;

  ctx.fillStyle = '#1C1C20';
  drawRoundedRect(ctx, bayX, botY, bayW, botH, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(212,212,216,0.18)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Vertical aluminum section lines
  const knobCount = 4;
  const segW = (bayW * 0.74) / knobCount;
  for (let k = 1; k <= knobCount; k++) {
    ctx.strokeStyle = 'rgba(212,212,216,0.12)';
    ctx.beginPath();
    ctx.moveTo(bayX + k * segW, botY + 18);
    ctx.lineTo(bayX + k * segW, botY + botH - 18);
    ctx.stroke();
  }

  // 4 Top-Down Hardware Knobs (Matte Black, Technical White, Signal Orange, Aluminum)
  const knobConfigs = [
    { color: '#111113', pointer: '#FAFAFA', angle: -Math.PI * 0.65 },
    { color: '#FAFAFA', pointer: '#18181B', angle: -Math.PI * 0.25 },
    { color: '#FF4D24', pointer: '#FAFAFA', angle: Math.PI * 0.15 },
    { color: '#D4D4D8', pointer: '#FF4D24', angle: -Math.PI * 0.45 },
  ];

  knobConfigs.forEach((cfg, idx) => {
    const cx = bayX + segW * (idx + 0.5);
    const cy = botY + botH * 0.46;
    drawRotaryKnob(
      ctx,
      cx,
      cy,
      Math.min(segW, botH) * 0.26,
      cfg.color,
      cfg.pointer,
      cfg.angle,
      content.cardLabels[idx] || `CH 0${idx + 1}`,
      palette.surface,
    );
  });

  // Far-right Hardware Toggle Switches & Red REC Key
  const switchAreaX = bayX + bayW * 0.76;
  const switchAreaW = bayW * 0.21;
  for (let sw = 0; sw < 2; sw++) {
    const sy = botY + 34 + sw * 82;
    ctx.fillStyle = '#0F0F12';
    drawRoundedRect(ctx, switchAreaX, sy, switchAreaW, 56, 8);
    ctx.fill();

    // Physical slide thumb
    const thumbX = sw === 0 ? switchAreaX + switchAreaW * 0.52 : switchAreaX + 8;
    ctx.fillStyle = sw === 0 ? palette.accent : palette.surface;
    drawRoundedRect(ctx, thumbX, sy + 6, switchAreaW * 0.44, 44, 6);
    ctx.fill();

    ctx.fillStyle = sw === 0 ? '#FFFFFF' : '#18181B';
    ctx.font = `700 13px "JetBrains Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(sw === 0 ? 'POWER ON' : 'BYPASS', thumbX + switchAreaW * 0.22, sy + 30);
    ctx.textAlign = 'left';
  }

  // Bottom REC indicator button
  const recY = botY + botH - 70;
  ctx.fillStyle = palette.accent;
  drawRoundedRect(ctx, switchAreaX, recY, switchAreaW, 44, 22);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.font = `700 14px "JetBrains Mono", monospace`;
  ctx.fillText(content.ctaLabel, switchAreaX + switchAreaW * 0.5, recY + 24);
  ctx.textAlign = 'left';
}
