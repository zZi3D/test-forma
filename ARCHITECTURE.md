# FORMA — Pure HTML5 2D Canvas 3D-Wave & Glassmorphism Architecture

This document details the architecture of **FORMA**, built exclusively with **React, TypeScript, Tailwind CSS, and native HTML5 `<canvas>` 2D Context API** (zero external 3D or WebGL libraries).

---

## 1. Visual & Spatial Architecture

1. **Pinned 3D-Wave Background (`src/components/WaveBackground.tsx`)**
   - Full-viewport `<canvas>` pinned via `fixed inset-0 z-0 pointer-events-none` beneath the scrolling page (`relative z-10`).
   - Retina `devicePixelRatio` scaling (`ctx.setTransform(dpr, 0, 0, dpr, 0, 0)`) and clean teardown of `scroll`, `mousemove`, `resize`, and `requestAnimationFrame` on unmount.
   - Renders **52 curved lines** from back (`zFar = 860`) to front (`zNear = 45`), each built from **90 smooth points** joined with `ctx.quadraticCurveTo(...)` (pre-allocated point buffer for zero GC pressure at 60fps).
   - Projects `(worldX, worldY, z)` to 2D screen space using `scale = FOV / (z + FOV)` (`FOV = 640`).

2. **Wave Math, Motion & Atmosphere**
   - **Three combined height fields**:
     - `broadSwell`: elongated `Math.sin` across the viewport width.
     - `diagonalCross`: counter-moving `Math.sin` × `Math.cos` cross-wave for organic topographic relief.
     - `centralRidge`: central Gaussian crest (`Math.exp(-nx * nx * 2.35)`) accentuating 3D elevation.
   - **Three motion layers**:
     - Lerped scroll response (`scrollFactor += (targetScrollY - scrollFactor) * 0.06`) shifting wave phases and subtly tilting the terrain (`scrollTilt`).
     - Interpolated mouse parallax (`smoothMouseX`, `smoothMouseY`) shifting the virtual camera `(camX, camY)`.
     - Slow continuous `time` progression (`0.0065` per frame, paused when `prefers-reduced-motion` is enabled).
   - **Palette & Mist**:
     - Base canvas: warm off-white `#F7F5F0`.
     - Graphite lines (`#1C1B18`): opacity rises from `0.12` (far back) to `0.67` (foreground), with thinner strokes behind and crisper strokes ahead.
     - **Every 6th line** (`i % 6 === 5`) is drawn in warm amber-gold (`#C98A3A`) at higher opacity (`0.22` → `0.80`).
     - Non-interactive `.wave-mist-overlay` (`z-[1]`) adds a `30%` `#F7F5F0` veil and 3 radial highlights (bright top-center + warm sand/cream corners bottom-left and bottom-right).

3. **Three-Tier Glassmorphism UI (`src/index.css`)**
   - `.glass-tile` (standard grid & metric tiles): `rgba(255, 255, 255, 0.16)`, `backdrop-filter: blur(11px) saturate(145%)`.
   - `.glass-elevated` (featured spotlight card, manifesto card, floating header): `rgba(255, 255, 255, 0.24)`, `backdrop-filter: blur(14px) saturate(145%)`, `1px solid rgba(255, 255, 255, 0.55)`, inset top highlight, and deep soft drop shadow.
   - `.glass-subtle` (metrics bar, filter pills, footer, secondary phase box): `rgba(255, 255, 255, 0.10)`, `backdrop-filter: blur(8px) saturate(145%)`.

---

## 2. Module Reference

| File | Responsibility |
| :--- | :--- |
| `src/components/WaveBackground.tsx` | Pinned `<canvas>` 2D renderer with 52 × 90 `quadraticCurveTo` perspective wave lines, lerped scroll & parallax, `#C98A3A` accent lines, and `.wave-mist-overlay`. |
| `src/components/GlassHeader.tsx` | Centered floating `.glass-elevated` header with `FORMA` emblem, 4 section links, mobile menu trigger, and `Start a Sprint` CTA. |
| `src/components/HeroSection.tsx` | Compact split editorial hero hosting the 3D animation wheel and `.glass-subtle` metrics strip. |
| `src/components/ProjectWheel3D.tsx` | Pure CSS-3D (`perspective`, `preserve-3d`, `rotateY` + `translateZ`) & `requestAnimationFrame` rotating 12-card wheel with drag inertia, scroll coupling, step buttons, and frosted backplates. |
| `src/components/SelectedWorkGrid.tsx` | Filterable 12-card portfolio archive using `.glass-tile` cards and `.glass-subtle` filter tabs. |
| `src/components/ProcessSection.tsx` | 24h Sprint methodology bento demonstrating all 3 glassmorphism tiers and a live `America/New_York` studio clock footer. |
| `src/components/ProjectPreviewModal.tsx` | Full-scale `16:10` preview modal with `←` / `→` / `ESC` keyboard navigation. |
| `src/components/MenuOverlay.tsx` | Slide-in drawer for quick section navigation and booking shortcuts. |
| `src/components/SprintBookingDrawer.tsx` | Two-tab slide-over drawer (`24h Sprint Brief` and `15-Min Discovery Call`). |
| `src/utils/mockupGenerator.ts` | Pure 2D HTML5 Canvas procedural website mockup generator (`getProjectDataUrl`). |
