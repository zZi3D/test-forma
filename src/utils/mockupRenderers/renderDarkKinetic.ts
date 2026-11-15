import { ProjectConfig } from '../../data/projects';
import { drawBrowserChrome, drawRoundedRect } from './canvasPrimitives';

export function renderDarkKinetic(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  project: ProjectConfig,
) {
  const { palette, previewSample } = project;

  // Deep carbon black (#09090B)
  ctx.fillStyle = palette.bg;
  ctx.fillRect(0, 0, width, height);

  // Subtle diagonal kinetic speed grid lines
  ctx.strokeStyle = 'rgba(228, 228, 231, 0.05)';
  ctx.lineWidth = 1.25;
  for (let d = -4; d < 18; d++) {
    const x1 = d * (width * 0.085);
    ctx.beginPath();
    ctx.moveTo(x1, 0);
    ctx.lineTo(x1 - width * 0.16, height);
    ctx.stroke();
  }

  // Coral-orange ambient underglow under hypercar studio floor
  const underGlow = ctx.createRadialGradient(
    width * 0.56,
    height * 0.65,
    12,
    width * 0.56,
    height * 0.65,
    width * 0.42,
  );
  underGlow.addColorStop(0, 'rgba(255, 77, 36, 0.24)');
  underGlow.addColorStop(0.55, 'rgba(255, 77, 36, 0.06)');
  underGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = underGlow;
  ctx.fillRect(0, 0, width, height);

  const { padX, headerBottom } = drawBrowserChrome(ctx, width, height, project, {
    chromeBg: '#121216',
    borderAlpha: 0.14,
    navItemsColor: 'rgba(228, 228, 231, 0.68)',
  });

  const topY = headerBottom + height * 0.045;

  // Dynamic Slanted Display Typography
  ctx.fillStyle = palette.accent; // #FF4D24
  ctx.font = `700 ${Math.round(width * 0.01)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.eyebrow, padX, topY + height * 0.02);

  ctx.save();
  ctx.fillStyle = palette.text; // Chrome silver #E4E4E7
  ctx.font = `italic 800 ${Math.round(width * 0.058)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.headline, padX, topY + height * 0.115);
  ctx.restore();

  ctx.fillStyle = palette.secondary;
  ctx.font = `400 ${Math.round(width * 0.0125)}px "Plus Jakarta Sans", sans-serif`;
  ctx.fillText(previewSample.subheadline, padX, topY + height * 0.17);

  // Top-right Live Telemetry Speed Badge
  const badgeW = width * 0.18;
  const badgeH = height * 0.125;
  const badgeX = width - padX - badgeW;
  ctx.fillStyle = '#131317';
  drawRoundedRect(ctx, badgeX, topY, badgeW, badgeH, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 77, 36, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = palette.secondary;
  ctx.font = `600 12px "JetBrains Mono", monospace`;
  ctx.fillText('V-MAX TELEMETRY', badgeX + 20, topY + 28);
  ctx.fillStyle = palette.accent;
  ctx.font = `700 ${Math.round(width * 0.028)}px "JetBrains Mono", monospace`;
  ctx.fillText('348 KM/H', badgeX + 20, topY + 78);

  // STUDIO STAGE: Sleek Electric Hypercar Wireframe / Lit Silhouette Profile
  const stageY = topY + height * 0.22;
  const stageW = width - padX * 2;
  const stageH = height * 0.44;

  ctx.save();
  drawRoundedRect(ctx, padX, stageY, stageW, stageH, 14);
  ctx.clip();

  const stageGrad = ctx.createLinearGradient(padX, stageY, padX, stageY + stageH);
  stageGrad.addColorStop(0, '#101014');
  stageGrad.addColorStop(0.75, '#17171D');
  stageGrad.addColorStop(1, '#09090B');
  ctx.fillStyle = stageGrad;
  ctx.fillRect(padX, stageY, stageW, stageH);

  // Aerodynamic CFD Airflow Curves sweeping over car roofline
  for (let stream = 0; stream < 4; stream++) {
    ctx.strokeStyle =
      stream === 1 ? 'rgba(255, 77, 36, 0.55)' : 'rgba(228, 228, 231, 0.14)';
    ctx.lineWidth = stream === 1 ? 2.2 : 1.25;
    ctx.beginPath();
    const yBase = stageY + stageH * (0.28 + stream * 0.065);
    ctx.moveTo(padX + stageW * 0.06, yBase + 46);
    ctx.bezierCurveTo(
      padX + stageW * 0.34,
      yBase - 42,
      padX + stageW * 0.62,
      yBase - 36,
      padX + stageW * 0.94,
      yBase + 14,
    );
    ctx.stroke();
  }

  // Hypercar Ground Plane
  const roadY = stageY + stageH * 0.78;
  ctx.strokeStyle = 'rgba(228, 228, 231, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padX + stageW * 0.08, roadY);
  ctx.lineTo(padX + stageW * 0.92, roadY);
  ctx.stroke();

  // Electric Hypercar Silhouette Body
  const carLeft = padX + stageW * 0.18;
  const carW = stageW * 0.64;
  ctx.fillStyle = '#070709';
  ctx.beginPath();
  ctx.moveTo(carLeft, roadY - 18); // Front splitter
  ctx.bezierCurveTo(
    carLeft + carW * 0.06,
    roadY - 76,
    carLeft + carW * 0.24,
    roadY - 96,
    carLeft + carW * 0.38,
    roadY - 134, // Windshield apex
  );
  ctx.bezierCurveTo(
    carLeft + carW * 0.54,
    roadY - 144,
    carLeft + carW * 0.72,
    roadY - 118,
    carLeft + carW * 0.94,
    roadY - 82, // Rear deck & active wing
  );
  ctx.lineTo(carLeft + carW * 0.98, roadY - 86);
  ctx.lineTo(carLeft + carW * 0.96, roadY - 18);
  ctx.closePath();
  ctx.fill();

  // Chrome rim specular highlight along hypercar profile
  ctx.strokeStyle = palette.text;
  ctx.lineWidth = 2.6;
  ctx.beginPath();
  ctx.moveTo(carLeft + 4, roadY - 22);
  ctx.bezierCurveTo(
    carLeft + carW * 0.06,
    roadY - 76,
    carLeft + carW * 0.24,
    roadY - 96,
    carLeft + carW * 0.38,
    roadY - 134,
  );
  ctx.bezierCurveTo(
    carLeft + carW * 0.54,
    roadY - 144,
    carLeft + carW * 0.72,
    roadY - 118,
    carLeft + carW * 0.94,
    roadY - 82,
  );
  ctx.stroke();

  // Glowing Coral-Orange Headlight & Tail Light Blades
  ctx.save();
  ctx.shadowColor = palette.accent;
  ctx.shadowBlur = 16;
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(carLeft + carW * 0.04, roadY - 46);
  ctx.lineTo(carLeft + carW * 0.13, roadY - 56);
  ctx.moveTo(carLeft + carW * 0.91, roadY - 62);
  ctx.lineTo(carLeft + carW * 0.97, roadY - 62);
  ctx.stroke();
  ctx.restore();

  // Aero Turbine Wheels (Front & Rear)
  [0.21, 0.78].forEach((pos) => {
    const wx = carLeft + carW * pos;
    const wy = roadY - 24;
    const wr = 46;
    ctx.fillStyle = '#0A0A0D';
    ctx.beginPath();
    ctx.arc(wx, wy, wr, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = palette.text;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(wx, wy, wr * 0.45, 0, Math.PI * 2);
    ctx.stroke();
  });

  ctx.restore();

  // BOTTOM ROW: Tabular Race Telemetry Strip + Aero Downforce Mini Curve
  const footY = stageY + stageH + height * 0.032;
  const footH = height - footY - height * 0.055;
  const cellGap = width * 0.018;
  const cellW = (stageW - cellGap * 3) / 4;

  previewSample.metrics.forEach((m, idx) => {
    const cx = padX + idx * (cellW + cellGap);
    ctx.fillStyle = '#121216';
    drawRoundedRect(ctx, cx, footY, cellW, footH, 10);
    ctx.fill();
    ctx.strokeStyle = 'rgba(228, 228, 231, 0.12)';
    ctx.lineWidth = 1.25;
    ctx.stroke();

    ctx.fillStyle = palette.secondary;
    ctx.font = `600 12px "JetBrains Mono", monospace`;
    ctx.fillText(m.label, cx + 22, footY + footH * 0.36);

    ctx.fillStyle = idx === 0 ? palette.accent : palette.text;
    ctx.font = `700 ${Math.round(width * 0.02)}px "JetBrains Mono", monospace`;
    ctx.fillText(m.value, cx + 22, footY + footH * 0.72);
  });

  // 4th cell: CTA & Aero Mode
  const ctaX = padX + 3 * (cellW + cellGap);
  ctx.fillStyle = palette.accent;
  drawRoundedRect(ctx, ctaX, footY, cellW, footH, 10);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `700 ${Math.round(width * 0.012)}px "JetBrains Mono", monospace`;
  ctx.fillText(previewSample.ctaLabel, ctaX + 24, footY + footH * 0.48);
  ctx.font = `500 12px "JetBrains Mono", monospace`;
  ctx.fillText('PERFORMANCE // ACTIVE', ctaX + 24, footY + footH * 0.76);
}
