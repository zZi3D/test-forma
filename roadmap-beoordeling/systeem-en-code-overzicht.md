# FORMA → EDITION ONE — Volledig Technisch Overzicht & Herstelgids (As-Built)

> **Doel van dit document:** Mocht deze chat ooit wegvallen of opnieuw gestart moeten worden, dan staat hier **tot in detail** hoe de volledige huidige website is opgebouwd, van Header tot Footer, inclusief exacte animaties, 3D-wiskunde, CSS-lagen, performance-optimalisaties en bestandsstructuur.  
> **Huidige codestaat (na Stap 1A):** Alle zichtbare UI-onderdelen zijn omgezet naar **Edition One** (`editionone.nl`) met **`NL · CET`** (`Europe/Amsterdam`) tijden en Nederlandse afzender (`Edition One · Netherlands · Crafted for Modern Business`). De site bevat **Header + Sectie 1 + Sectie 2 + Sectie 3 (`03 · Interactive Lab`) + Sectie 4 (`Process`) + Footer + 3 Overlays + 1 Subpagina (`#/directions`)**. Overige stappen (`1B` t/m `Fase 5`) staan in `track-and-checklist.md`.

---

## 1. Tech Stack, Configuratie & Bestandsboom

### Stack (`package.json`)
- **Framework:** React `19.0.1` + ReactDOM `19.0.1` + TypeScript (`tsc --noEmit` als `npm run lint`)
- **Build tool:** Vite `8.3.0` (`@vitejs/plugin-react`), poort `3000`, HMR uitgeschakeld via `DISABLE_HMR === 'true'` in `vite.config.ts`
- **Styling:** Tailwind CSS `4.3.3` via `@tailwindcss/vite` (`@import "tailwindcss";` in `src/index.css`)
- **Animaties:** `motion` `12.23.24` (`motion/react` — o.a. `AnimatePresence`, `motion`, `useMotionValue`, `useSpring`, `animate`, `useReducedMotion`) + native `requestAnimationFrame` loops
- **Iconen:** `lucide-react` `0.546.0`
- **Let op overgebleven template-packages:** `@google/genai`, `express`, `dotenv`, `tsx` staan wel in `package.json`, maar worden in de huidige frontend **niet gebruikt** (alles draait nu 100% client-side als Vite SPA).

### Lettertypen & HTML Entry (`index.html` & `src/index.css`)
- Google Fonts:
  - `--font-sans`: `"Plus Jakarta Sans"` (basis UI & headlines)
  - `--font-serif`: `"Cormorant Garamond"` (`.font-editorial`)
  - `--font-mono`: `"JetBrains Mono"` (`.font-mono-tabular`, `tabular-nums`)
- Kleurenpalet tokens (`:root` in `src/index.css`):
  - `--canvas-warm`: `#f7f5f0` (warme off-white basis)
  - `--ink-graphite`: `#1c1b18` (diep grafiet-zwart)
  - `--accent-amber`: `#c98a3a` (warm amber-goud accent)
- Typografie-hulpklassen:
  - `.display-tight`: `letter-spacing: -0.03em; text-wrap: balance;`
  - `.font-mono-tabular`: monospace met `tabular-nums` zodat tellers/klokken niet springen.

### Bestandsstructuur (`src/`)
- `src/main.tsx` — mount React `<App />` + `./index.css`.
- `src/App.tsx` — hoofd-shell, routing (`home` vs `#/directions` / `#/work`), state voor `selectedProject`, `isMenuOpen`, `bookingState`, lazy-loading van overlays (`loadedOverlays`) en Rising Sheet wrapper rond Sectie 2 t/m 4.
- `src/components/WaveBackground.tsx` — vaste 3D-golf achtergrond op HTML5 2D `<canvas>` + mist overlay.
- `src/components/GlassHeader.tsx` — vaste zwevende glazen header.
- `src/components/HeroSection.tsx` — Sectie 1 (Sticky Hero + 3D Wiel + CTA's).
- `src/components/ProjectWheel3D.tsx` — Pure CSS-3D draaiend wiel met 12 kaarten.
- `src/components/SelectedWorkGrid.tsx` — Sectie 2 (Metrics + Filtertabs + 12 3D-openklappende tegels).
- `src/components/StylePlayground.tsx` — Sectie 3 (`03 · Interactive Lab` met 5 industrieën, 9 stijlen, Motion 1 & 2, Shuffle).
- `src/components/PlaygroundAmbientLayer.tsx` — subtiele stijl-eigen achtergrondanimaties per skin.
- `src/components/StagePerspectiveWave.tsx` — lichte 16-lijns 2D-perspectiefgolf in het Playground-podium, gekoppeld aan huidig skin-accent en Motion 1 & 2.
- `src/components/PlaygroundProductVisual.tsx` — 9 op maat gemaakte SVG productillustraties per skin.
- `src/components/ProcessSection.tsx` — Sectie 4 (`24-Hour Digital Practice` manifesto + 3 CET sprint-fases + Footer met `NL · CET` / `Europe/Amsterdam` klok).
- `src/components/WorkPage.tsx` — aparte `#/directions` overzichtspagina met `SelectedWorkGrid variant="page"` + closing CTA + footer.
- `src/components/ProjectPreviewModal.tsx` — Blueprint Lightbox Modal bij klik op kaart uit wiel of tegelgrid.
- `src/components/MenuOverlay.tsx` — donker slide-over navigatiemenu (mobile & drawer).
- `src/components/SprintBookingDrawer.tsx` — slide-over aanvraag- & afsprakendrawer (`24h Sprint Brief` / `15-Min Discovery Call`).
- `src/data/projects.ts` — 12 `PROJECTS` (`DesignDirection[]`) + 5 `INDUSTRY_FILTERS`.
- `src/data/playgroundStyles.ts` — 9 `PLAYGROUND_THEMES` + `PLAYGROUND_INDUSTRY_COPY`.
- `src/utils/mockupGenerator.ts` + `src/utils/mockupRenderers/*` — procedurele 2D canvas generator voor alle 12 website-thumbnails.

---

## 2. Globale Architectuur, Z-Index Lagen & Routing (`src/App.tsx`)

### Z-index Stapeling (van achter naar voor)
1. `z-0` — `<canvas>` van `WaveBackground` (`fixed inset-0 pointer-events-none`)
2. `z-[1]` — `.wave-mist-overlay` (`fixed inset-0 pointer-events-none`)
3. `z-10` — `<main>` (bevat `HeroSection` óf `WorkPage`)
4. `z-20` — **Rising Sheet Wrapper** in `App.tsx` (bevat `SelectedWorkGrid`, `StylePlayground`, `ProcessSection`):
   - `rounded-t-[28px] md:rounded-t-[40px] border-t border-white/75 overflow-hidden`
   - `shadow-[0_-24px_60px_-18px_rgba(28,27,24,0.12)]`
   - Bovenste frosted lip: gradient `from-white/75 via-white/35 to-transparent` (`h-20`) + verticale canvas-sluier `from-[#F7F5F0]/90 via-[#F7F5F0]/45 to-[#F7F5F0]/25` (bewust zonder dure full-width `backdrop-blur` zodat scrollen 60fps blijft!).
5. `z-40` — `GlassHeader` (`fixed inset-x-0 top-4 md:top-5`)
6. `z-50` — Overlays (`ProjectPreviewModal`, `MenuOverlay`, `SprintBookingDrawer`) — lazy loaded via `React.lazy` zodra ze voor het eerst geopend worden (`loadedOverlays`), zodat het uit-elkaar-schuiven (`AnimatePresence`) na één keer laden wel altijd vloeiend blijft werken.

### Routing & Navigatie
- Geen `react-router`: lichtgewicht hash/history state (`PageView = 'home' | 'work'`).
- `#/directions` of `#/work` opent `WorkPage`.
- `navigateTo(target)` in `App.tsx`:
  - `'work'` → `window.history.pushState(null, '', '#/directions')`, `setCurrentPage('work')`, scroll naar top.
  - Andere targets (`'hero-wave'`, `'selected-work'`, `'style-playground'`, `'process-studio'`, `'studio-footer'`) → als je op `'work'` zit, eerst terug naar `'home'` via `pushState` en daarna na 2× `requestAnimationFrame` smooth scrollen naar `document.getElementById(target)`.

---

## 3. Achtergrond & Glazen Oppervlakken (`WaveBackground.tsx` & `src/index.css`)

### 3D-Golf Canvas Wiskunde (`WaveBackground.tsx`)
- **Instellingen (bewust CPU/GPU-vriendelijk begrensd):**
  - `LINE_COUNT = 52` lijnen (van achter `Z_FAR = 860` naar voor `Z_NEAR = 45`)
  - `POINTS_PER_LINE = 44` punten per lijn (herbruikbare `points[]` array tegen Garbage Collection)
  - `FOV = 640`, `MAX_WAVE_DPR = 1.25`, `MIN_FRAME_INTERVAL_MS = 1000 / 36` (max ~36fps cap om hoofdthread vrij te houden)
  - Elke 6e lijn (`i % 6 === 5`) is amber-goud `rgba(201, 138, 58, alpha)`, overige lijnen zijn grafiet `rgba(28, 27, 24, alpha)`.
- **Projectie & Golfhoogte:**
  - `scale = FOV / (z + FOV)`
  - 3 gecombineerde functies voor `worldY`:
    1. `broadSwell`: `Math.sin(nx * 2.55 + zPhase * 0.68 + time * 0.85 + scrollPhase) * 62`
    2. `diagonalCross`: `Math.sin(nx * 4.1 - zPhase * 1.15 + time * 0.55 - scrollPhase * 0.72) * Math.cos(zPhase * 0.45 + nx * 1.35) * 44`
    3. `centralRidge`: `Math.exp(-nx * nx * 2.35) * ridgeWave` (centrale Gaussische piek)
  - `depthBias = (depthNorm - 0.5) * (scrollTilt * 175 + 32)`
  - Camera-parallax via muis (`camX = smoothMouseX * 52`, `camY = smoothMouseY * 24`) en exponentiële lerp (`1 - Math.exp(-3.7 * dt)`).
  - Pauzeert automatisch bij `document.hidden` of `prefers-reduced-motion: reduce`.
- **Mist Overlay (`.wave-mist-overlay`):** `rgba(247, 245, 240, 0.30)` + 3 radiale gradients (wit bovenaan, warme zandkleur linksonder/rechtsonder).

### Drie-Lagen Glassmorphism (`src/index.css`)
- **`.glass-tile`** (standaard kaarten & metrics): *Zonder* dure live `backdrop-filter` (betere iGPU-performance op veel kaarten tegelijk); lichte diagonale gradient `rgba(255,255,255,0.74 -> 250,248,243,0.62)`, witte rand `rgba(255,255,255,0.78)` en top inner-highlight.
- **`.glass-elevated`** (Header, Manifesto card, WorkPage closing CTA): `rgba(255,255,255,0.42)` + **echte `backdrop-filter: blur(10px)`** + diepe schaduw `0 20px 44px -14px rgba(28,27,24,0.13)`.
- **`.glass-subtle`** (Filterknoppen, wheel-controls, footer, 3e procesfase): `rgba(255,255,255,0.5)` + witte rand.

---

## 4. Header (`GlassHeader.tsx`)
- **Desktop (`md+`, `max-w-[960px]`):** Gesculpteerde **pinched-waist ("zandloper") zwevende glazen pil** (`top-4 z-40`, `56px` hoog met `28px` ronde einden en een compacte, strak naar binnen lopende S-curve taille van `10px` in het midden via dynamische `ResizeObserver`-breedte, asymmetrische Bezier-handles + CSS `clip-path: path(...)` + `backdrop-filter: blur(14px)` + lichte SVG-rand + `drop-shadow`).
- **Midden (boven/onder de taille):** Gecentreerde terug-naar-top knop met het woordmerk **`EDITION ONE`** verlaagd in de bovenste boog en het circulaire reticle/kompas-icoon (`StudioReticleIcon`, `24px`, roteert `group-hover:rotate-45`) verhoogd in de onderste boog.
- **Linkerkant (linker lob):** `Overview` (`hero-wave`), `Directions` (`work` subpagina), `Playground` (`style-playground`) — actieve pagina krijgt het amberkleurige bolletje (`#C98A3A`).
- **Rechterkant (rechter lob):** `Process` (`process-studio`), `Contact` (`studio-footer`) + `Start a Sprint` (`h-[38px] rounded-full bg-[#1C1B18]` hover `#C98A3A` → opent `SprintBookingDrawer` tab `'brief'`).
- **Mobiel (`< 768px`):** Compacte `.glass-elevated rounded-full` pil met icoon + woordmerk links, en hamburgerknop (`MenuOverlay`) + `Start a Sprint` rechts.

---

## 5. Sectie 1: Sticky Hero & 3D Wiel (`HeroSection.tsx` + `ProjectWheel3D.tsx`)

### A. `HeroSection.tsx` — Sticky Depth Overgang
- **Layout:** `#hero-wave`, `md:sticky` met `pt-22 md:pt-20 pb-14 md:pb-[30svh]` *(let op: die `md:pb-[30svh]` veroorzaakt de witruimte uit nr. 1 van de roadmap)*.
- **Koptekst:** Amber eyebrow `"Editorial Digital Architecture · 24h Sprint Practice"` + H1 `"We design refined web worlds, really fast."` (`clamp(1.85rem, 3.5vw, 3.15rem)`).
- **Sticky Scroll Logic (`useEffect`):**
  - Op mobiel (`< 768px`): normaal scrollend, niet sticky.
  - Op desktop: berekent `stickyTop = Math.min(0, vh - heroHeight)` en `stickyStart = Math.max(0, heroHeight - vh)`. Zodra de bezoeker voorbij `stickyStart` scrolt terwijl de Rising Sheet (Sectie 2) over de Hero heen schuift, zakt `opacity` van `1 → 0`, schaalt Hero heel subtiel naar `0.96` (`transformOrigin: center bottom`), en bij `opacity <= 0.08` wordt `isWheelPaused = true` gezet zodat het 3D-wiel **0% CPU verbruikt** zodra het verborgen zit!
- **CTA's onderaan:** `"Book a 15-min Discovery Call"` (opent Booking Drawer op `'call'`) + `"Design Directions ↓"` (scrolt naar `'selected-work'`).

### B. `ProjectWheel3D.tsx` — Hoe het 3D Wiel Werkt (Exacte Techniek)
- **Zero-WebGL CSS 3D:** Gebruikt `perspective` op `stageRef`, `transformStyle: preserve-3d` op `rigRef` (`rotateX` + `rotateZ`) en `ringRef` (`rotateY`).
- **12 Kaarten op een Cilinder (`STEP_DEG = 30°`):**
  - Responsive dimensies:
    - `< 640px`: `radius: 415`, `cardWidth: 270`, `perspective: 2400`, `outerScale: 0.72`, `centerScale: 0.82`, `extraZ: 36`
    - `< 1024px`: `radius: 500`, `cardWidth: 370`, `perspective: 2800`, `outerScale: 0.68`, `centerScale: 0.81`, `extraZ: 34`
    - `>= 1024px`: `radius: 620`, `cardWidth: 460`, `perspective: 3200`, `outerScale: 0.67`, `centerScale: 0.80`, `extraZ: 34`
  - **Belangrijke anti-clipping/scherpte regel:** `(cardWidth * outerScale) < 2 * radius * tan(15°)` voorkomt dat 3D-kaarten door elkaar heen snijden; `centerScale` blijft `<= 0.82` zodat gezoomde kaarten nooit onscherp opschalen; `backdrop-filter` wordt **bewust vermeden** op kaarten binnen `preserve-3d` (gebruikt `bg-[#FAF8F4]/92`) omdat Chromium anders 3D-lagen wazig rastert!
  - Elke kaart heeft een **Voorkant** en een **Achterkant** (`rotateY(180deg)`, `backfaceVisibility: 'hidden'`) met het indexnummer, `FORMA` en projecttitel.
- **Per-kaart Dynamische Focus Zoom (in `requestAnimationFrame` loop):**
  - Berekent hoekafstand `absDeg` van elke kaart t.o.v. de voorkant (`0°`). Binnen `zoomRangeDeg = 44°` wordt een smoothstep `smoothT = t*t*(3 - 2*t)` berekend die `scale` van `outerScale → centerScale`, `zOffset` tot `+extraZ`, en `liftY` tot `-5px` stuurt.
- **3 Interactiemodi + Momentum:**
  1. **Pointer Drag:** `setPointerCapture`, `dx * 0.17` begrensd op `MAX_SWIPE_STEP_DEG = 8`, berekent `velocityRef` (max `110 deg/s`) en dempt na loslaten exponentieel met `Math.pow(0.035, dt)`. Klik wordt alleen afgevuurd als `pointerTravelRef < 8px`.
  2. **Horizontale Trackpad/Shift-Wheel:** roteert vloeiend met inertia.
  3. **Verticale Scroll-koppeling + Auto-spin:** `scrollSmoothRef` (lerp `0.09`) draait `scrollAngleOffset = scrollSmooth * (0.15 desktop / 0.08 mobile)` en kantelt `scrollTiltX` subtiel (`-7.5deg → -10deg`). Na `2500ms` (`AUTO_SPIN_DELAY_MS`) start automatisch langzaam draaien (`-11.5 * dt`), pauzeert tijdens hover (`isHoveringRef`) of wanneer gebruiker op `Pause Spin` klikt.
- **Zero React Re-renders bij 60fps:** Alle 3D-transforms, focus-klassen (`FOCUSED_CLASSES` / `UNFOCUSED_CLASSES` via `classList`) en `WheelCaptionButton` (via `registerCaptionSetter`) worden direct via refs bijgewerkt. `IntersectionObserver` + `visibilitychange` + `isPaused` stoppen de `rAF`-loop volledig wanneer het wiel uit beeld is.

---

## 6. Sectie 2: Metrics Strip & 3D-Openklappende Tegels (`SelectedWorkGrid.tsx`)

### A. Studio Proof Metrics Strip
- 4-koloms `.glass-tile` balk (`24 Hours`, `340+`, `52-Layer`, `NL · CET`).
- Tellers tellen **eenmalig** op via `IntersectionObserver` (`threshold: 0.25`) met cubic ease-out (`1 - (1 - t)^3`, `880ms`).

### B. 12 Filterbare Tegels & 3-Staps "Openklappen met Scrollen" Animatie
- **Grid & Mobiele Weergave:** `4` kolommen op desktop (`lg+`), `2` kolommen op tablet én mobiel (`grid-cols-2 lg:grid-cols-4`). Op de homepagina (`!isStandalonePage`) toont mobiel (`< 640px`) standaard maximaal **4 tegels** (2×2) met daaronder een **`See more (X more)` / `Show fewer`** knop zodat de pagina op telefoon compact blijft.
- **Filters:** `All` + 5 `INDUSTRY_FILTERS` (`Advisory & B2B`, `Salons & Local`, `Retail & Webshops`, `Tech & Products`, `Sports & Events`). Actieve tab gebruikt Framer Motion `layoutId="selected-work-filter-pill"` (`stiffness: 460, damping: 36`).
- **3-Staps Scroll Choreografie per rij (`evaluateRows` + `WorkTileCard`):**
  - **Stage 1 (Startpunt):** Kaart begint omgeklapt op `-176deg` (`rotateX(-176deg)`, `y: 4`, `scale: 0.95`) — toont de warme albaster achterkant met subtiel `Edition One`-watermerk.
  - **Stage 2 (Tijdens scrollen naar trigger):** Tussen `startY` (`0.72 * vh` desktop / `0.84 * vh` mobiel) en `triggerY` (`0.48 * vh` desktop / `0.62 * vh` mobiel) scrubt de scrollpositie direct de `MotionValues` zonder React re-renders: `rotateX` kantelt van `-176deg → -110deg` (tafelblad-perspectief), `y: 4 → 18`, `scale: 0.95 → 0.91` en een pure CSS-gradient vloerschaduw (`floorShadowOpacity`) wordt zichtbaar.
  - **Stage 3 (Eindpunt — opengeklapt):** Zodra een rij `triggerY` passeert (of onderkant pagina bereikt), wordt de rij in `openedRows` gezet. Met een kolom-stagger van `col * 85ms` klappen de kaarten via `animate(..., { duration: 0.85, ease: [0.16, 1, 0.3, 1] })` open naar `rotateX(0deg)`, `y: 0`, `scale: 1`. Na `920ms + col * 85ms` wordt `isSettled = true` gezet: de achterkant en vloerschaduw worden ge-unmount en `transformStyle` wordt `'flat'`.
- **Hover Interactie na landen (`isSettled`):**
  - Cursor-tilt (`rotateX` max `±3.4°`, `rotateY` max `±4.2°`, `translateY(-4px)`, `scale(1.012)`) + diagonale glanzende glanslaag (`sheenRef`) berekend in één `rAF`-batch. Niet-gehoverde kaarten dimmen subtiel naar `opacity-72`.
  - Bij actief filter krijgen perfecte matches een `Best Match` label rechtsboven op de thumbnail.

---

## 7. Sectie 3 (`03 · Interactive Lab`): Live Style Playground (`StylePlayground.tsx`)

### A. Geïntegreerde "Studio Workbench"
- **Uniforme Achtergrond + Workbench Frame:** `#style-playground` deelt dezelfde uniforme canvas-achtergrond als Sectie 2 en 4 (`border-t` scheidingslijn), maar groepeert de bovenste Control Console (`1. Your Industry` + hairline + `2. Visual Skin` in één paneel, voorbereid op Stap 2A), de 3D Live Preview Stage en de onderste Motion & CTA Dock visueel als één aaneengesloten werkbank. Op mobiel (`< md`) zijn beide pillenrijen horizontaal swipebaar met rechts "aansnijden" en een compacte stage + 2-koloms Motion-dock zodat controls en podium samen in beeld passen.
- **Scroll Entrance (`evaluate()` in `useEffect`):**
  1. **Header + badge** (`headerRef`): verschijnen bij `hRect.top <= vh * 0.78` (`opacity: 0 → 1`, `y: 24 → 0`, `550ms`, ease `[0.22, 1, 0.36, 1]`).
  2. **Live Preview Stage** (`stageWrapperRef`): begint gekanteld met `perspective: 1200`, `rotateX: 22deg`, `scale: 0.89`, `y: 34`, `opacity: 0.25`. Scrolt live rechterop tussen `vh * 0.94` en `vh * 0.54`; zodra `sRect.top <= vh * 0.54` klapt hij vlak naar `rotateX: 0`, `scale: 1`, `opacity: 1` (`450ms`). Na `480ms` (`stageSettled = true`) verdwijnt de 3D-wrapper (`transform: none`) zodat knoppen 100% klikbaar & haarscherp blijven.
  3. **Bottom Controls Dock** (`Motion 1`, `Motion 2`, `Build in this style`): schuift met `280ms` delay onderaan omhoog (`y: 22 → 0`).

### B. Controls & Stagger Morph op Stijlwissel
- **Rij 1 (`1. Your Industry`):** 5 sectoren uit `INDUSTRY_FILTERS` (beïnvloedt merknaam, navigatielinks, koptekst, CTA's, productkaart & prijs via `PLAYGROUND_INDUSTRY_COPY`).
- **Rij 2 (`2. Visual Skin`):** 9 visuele stijlen (`PLAYGROUND_THEMES`):
  1. `glassmorphism` — *Glassmorphism* (licht, frosted optics, paars/roze gradient)
  2. `claymorphism` — *Claymorphism* (zachte 3D matte kleikaarten, terracotta `#E06D4B`)
  3. `cyberpunk` — *Cyberpunk* (donker scanline grid, geel `#FACC15` + magenta `#EC4899`, `clip-path` afgeschuinde hoeken)
  4. `illustration` — *Illustration Style* (warm papier `#FBF6EC`, serif `font-editorial`, botanische SVG)
  5. `candy-pop` — *Candy Pop Art* (polka-halftone dots, roze `#FF3B6B` + geel `#FFD60A` + mint)
  6. `pop-cartoon` — *Pop Art Cartoon* (3px dikke zwarte inktranden + harde comic-schaduw)
  7. `holographic-hud` — *Holographic HUD & Sci-Fi* (ruimte-blauw blueprint grid, cyaan `#38BDF8`)
  8. `neon-dark` — *Neon Dark Mode* (zwart canvas met emerald `#10B981` neon gloed)
  9. `cyber-id` — *Cyber-ID & Translucent Cards* (biometrische slate/indigo UI)
- **`Shuffle Combo ✦` knop (rechts in Control Console op Rij 1):** kiest willekeurige andere skin + willekeurige industrie + zorgt dat minstens 1 animatiemodus aanstaat.
- **Snelle "Skin Wipe / Morph" bij Skin/Industry-wissel (`skinWipeKey`):**
  - Achtergrond wisselt direct (`0ms`), **Diagonal Light Sweep** (schuine lichtveeg `-skew-x-[22deg]`, `500ms`) trekt over het podium.
  - Mini-navbar en linkerkolom landen op `35ms` delay.
  - Productkaart landt op `70ms` delay met spring (`stiffness: 400, damping: 22`).
- **Glassmorphism Hoekfix (technisch detail):** De buitenste stage-container heeft `overflow-hidden rounded-3xl` én binnenin zit een `overflow-hidden rounded-[22px]` wrapper + de navbar heeft `rounded-t-[22px]`, terwijl `PlaygroundAmbientLayer` ook `overflow-hidden rounded-3xl` draagt — zo snijden afgeronde hoeken nooit meer hoekig af.

### C. Live Motion Toggles (direct `0ms`, zonder skin-wipe) & Ambient Layers
- **`Motion 1: Levitate & Pulse` (`levitateOn`):** laat de productkaart rustig zweven (`y: [0, -10, 0]`, `3.4s infinite`) en pulseert een radiale glow (`pulseGlowColor`) achter de SVG (`scale [0.92, 1.1, 0.92]`).
- **`Motion 2: Kinetic Pop & Tilt` (`kineticOn`):** spring-bounce op knoppen & kaart (`stiffness: 380, damping: 18`) + interactieve **3D cursor-tilt** op de productkaart (`useSpring` stiffness `260`, damping `20`; max `±14deg` Y / `±12deg` X).
- **`PlaygroundAmbientLayer.tsx`:** Per skin eigen lichte achtergrond-ambiance (alleen `transform`/`opacity`, dus laag CPU-verbruik): o.a. drijvende orbs bij Glassmorphism, dalende scanlines bij Holographic HUD & Cyberpunk, ademende border bij Neon Dark Mode, zwevende vormen bij Candy/Pop Cartoon.
- **`StagePerspectiveWave.tsx`:** 2D-geprojecteerde 16-lijns contourgolf (`30fps` cap, `MAX_DPR = 1.25`, pauzeert via `IntersectionObserver` + `visibilitychange`) achter het podium met ~7%–16% dekking. Kleurt automatisch mee met `activeTheme.accentHex` en past basislijnen aan `activeTheme.isDark` aan; golft zacht mee bij `levitateOn` en verschuift de virtuele camera omgekeerd aan de voorgrondkaart bij desktop-pointerbeweging wanneer `kineticOn` aanstaat.
- **`PlaygroundProductVisual.tsx`:** 9 op maat gemaakte SVG-illustraties passend bij elke skin.
- **Handoff knop (`Build in this style →`):** opent `SprintBookingDrawer` met `activeIndustry` en een vooringevulde samenvatting van gekozen stijl + actieve Motion 1/2.

---

## 8. Sectie 4 (`ProcessSection.tsx`) & Footer
- **Manifesto Card (`.glass-elevated`, 7/12 kolommen):** `"Time is money. We build publication-grade websites in 24 hours."` + knoppen `"→ Book a 15-min discovery call"` en `"Submit a 24h brief"`.
- **3 Sprint Fases (5/12 kolommen, gebruikt alle 3 glass-tiers):**
  - `01.` `09:00 – 13:00 CET` — *Architecture & Typographic Grid* (`.glass-tile`)
  - `02.` `13:00 – 19:00 CET` — *Visual Direction & Motion* (`.glass-tile`)
  - `03.` `19:00 – 09:00 CET` — *Refinement & Live Launch* (`.glass-subtle`)
- **Footer (`#studio-footer`, `.glass-subtle`):** Toont `Edition One · Netherlands · Crafted for Modern Business` + live tikkende `Europe/Amsterdam` klok (`NL · CET`, `Intl.DateTimeFormat`, 1s interval) + `© 2026`.

---

## 9. Overlays, Subpagina & Mockup Engine

1. **`WorkPage.tsx` (`#/directions`):** Standalone overzichtspagina met `SelectedWorkGrid variant="page"`, terugknop naar Overview, grote CTA-kaart en eigen footer.
2. **`ProjectPreviewModal.tsx`:**
   - Opent bij klik op een kaart in het 3D-wiel of in Sectie 2.
   - Toont `16:10` high-DPI canvas preview (`1600×1000`), gevolgd door een **3-koloms Blueprint** (*01 · The Problem It Solves + Typography Pairing*, *02 · Ideal For* checklist, *03 · Visual Characteristics + klikbare kleurstalen*), keyboard navigatie (`ESC`, `←`, `→`), en `"Build my site in this style →"` handoff naar de booking drawer.
3. **`MenuOverlay.tsx`:** Rechts uitschuivend donker menu (`#1C1B18`, max `460px`), 4 hoofdlinks (`01` t/m `04`), `Start a 24h Sprint` / `15-Min Discovery Call` knoppen en studio-e-mail `Edition One · Netherlands · hello@editionone.nl`.
4. **`SprintBookingDrawer.tsx`:**
   - Rechts uitschuivend (`#F7F5F0`, max `540px`) met tabs **`24h Sprint Brief`** en **`15-Min Discovery Call`**.
   - Bevat Business Type chips, Call Window (`Tomorrow`, `In 48 Hours`, `Next Monday`) + `CET` tijdsloten (`10:00`, `11:30`, `14:00`, `16:30 CET`), velden voor Naam*, E-mail*, Bedrijfsnaam, Notities, en validatie.
   - *Huidige werking:* Toont lokaal een gegenereerde reserveringscode (`ED1-xxxx`) — echte verzending/WhatsApp-koppeling volgt in Stap 2B.
5. **Procedurele Mockup Engine (`src/utils/mockupGenerator.ts` + `src/utils/mockupRenderers/*`):**
   - Genereert alle 12 website-previews puur in HTML5 2D Canvas (zonder externe afbeeldingen of 404-risico!).
   - **Progressieve cache-wachtrij:** Rendert eerst de voorste wielkaarten `[0, 1, 11, 2, 10, ...]` op `960×600` (`outputScale: 0.6`, WebP `0.94` blob URL) met telkens `yieldFrame()` ertussen zodat de pagina direct soepel start; bij openen van de Modal wordt asymptotisch opgeschaald naar `1600×1000` (`outputScale: 1`).
   - **Alle 12 gekoppelde Renderers (`projects.ts` → `mockupRenderers/`):**
     - `01` `dopamine-commerce` → `renderDopamineCommerce.ts`
     - `02` `noir-luxury` → `renderDarkNeumorphism.ts`
     - `03` `swiss-minimalism` → `renderSwissMinimalism.ts`
     - `04` `spatial-glass-ai` → `renderCyberpunkGlass.ts`
     - `05` `soft-aura-atelier` → `renderNewAgeGradient.ts`
     - `06` `kinetic-performance` → `renderDarkKinetic.ts`
     - `07` `organic-biophilic` → `renderOrganicBiophilic.ts`
     - `08` `neo-brutalist-pop` → `renderNeoBrutalism.ts`
     - `09` `editorial-monograph` → `renderBentoEditorial.ts`
     - `10` `industrial-precision` → `renderSkeuomorphism.ts`
     - `11` `dimensional-saas` → `renderClaymorphism.ts`
     - `12` `modular-bento` → `renderModularBento.ts`
     - Gedeelde tekenhulpfuncties staan in `src/utils/mockupRenderers/canvasPrimitives.ts`.

---

## 10. Waarom bepaalde zaken bewust *niet* volledig zijn uitgeschreven of afwijken van oudere docs
1. **Geen regel-voor-regel canvas-coördinaten uit de 12 `render*.ts` bestanden:** Elke renderer bevat honderden regels 2D-canvas `fillRect`/`arc`/`fillText` tekencoördinaten. Alle 12 bestandsnamen, bijbehorende `uiStyle`-koppeling en de cache/blob-pipeline staan hierboven exact gedocumenteerd, zodat een herstellende agent ze meteen kan teruglezen zonder dat dit bestand onleesbaar groot wordt.
2. **Oude `ARCHITECTURE.md` en `implementation_plan.md` niet blind vertrouwen:** In die oudere ontwerpbestanden staan nog verwijzingen naar Three.js / WebGL / R3F / donkere Section 3 Fibonacci-sphere en `quadraticCurveTo` met 90 punten. De **werkelijke, werkende code** gebruikt géén WebGL, maar pure CSS-3D (`ProjectWheel3D.tsx`), scroll-gestuurde 3D-tegels (`SelectedWorkGrid.tsx`), het Interactive Lab (`StylePlayground.tsx`) en 44-punts 36fps-capped golflijnen (`WaveBackground.tsx`). Dit document (`systeem-en-code-overzicht.md`) is daarom de enige actuele waarheid.
3. **Nog geen Sectie 5 aanwezig:** De huidige app heeft Sectie 1 t/m 4 + Footer. Eventuele extra secties (klantcases, prijzen, demo one-pagers, FAQ) staan alleen gepland in `beoordeling-en-roadmap.md` en `prijsmodel-en-modulaire-opties.md`.

---

## 11. Technische Review & Aandachtspunten voor Uitbreiding (`Edition One` Transitie)

### Sterke punten van de huidige architectuur
- **Zero-WebGL & 60fps-focus:** De combinatie van pure CSS-3D (`ProjectWheel3D.tsx`), een op `36fps` begrensde 2D-golfachtergrond met herbruikbare `points[]`-arrays (`WaveBackground.tsx`) en automatische pauzering via `IntersectionObserver` + `visibilitychange` voorkomt GPU-overbelasting.
- **Scherpe 3D-rendering zonder blur-artefacten:** Het bewust vermijden van `backdrop-filter` binnen `preserve-3d` en op dichte grids (`.glass-tile`), terwijl header en manifesto-kaart wel echte blur krijgen (`.glass-elevated`), voorkomt wazige Chromium-rendering.
- **Progressieve Canvas-cache:** Gefaseerde WebP-opbouw (`960×600` voor het wiel met `yieldFrame()`, opschalen naar `1600×1000` bij openen modal) zorgt voor directe laadtijd zonder gebroken links.

### Vier technische aandachtspunten bij Bouwronde 1 t/m 4
1. **Hash-routing (`#/`) vs. Hostingkeuze (GitHub Pages vs. Serverless/Node):**
   - De app wordt nu via `.github/workflows/deploy-pages.yml` als statische SPA op **GitHub Pages** gedeployed met hash-routing (`#/directions`).
   - Zolang we statisch op GitHub Pages blijven (Ronde 1 t/m begin Ronde 3), moeten nieuwe demo's en het review-portaal óók op hash-routes blijven (`#/demo/garage`, `#/review/new-look`) zodat verversen en directe WhatsApp-links altijd werken.
   - Zodra **backend-afhankelijke onderdelen** uit `beoordeling-en-roadmap.md` live gaan (`nr. 14` screenshot-API, `nr. 19` PageSpeed-proxy, `nr. 21` KVK/Places-keys, `nr. 22` Edge IP-Geo, `nr. 23` HTTP Security Headers + WAF, `nr. 24` schone URL-slugs zonder `#/`, `nr. 26` Mollie SEPA webhooks en `nr. 32` `/api/chat`), is een overstap naar **Vercel / Cloudflare Pages+Functions** of een **Node/Express backend (`server.ts`)** noodzakelijk.
2. **Rebranding (`FORMA` → `Edition One`) + Locatie/Tijdzone (`CET`) *(Afgerond in Stap 1A)*:**
   - Alle UI-vermeldingen van `FORMA` zijn vervangen door **Edition One** (`editionone.nl`) in `GlassHeader.tsx`, `HeroSection.tsx`, `ProjectWheel3D.tsx`, `SelectedWorkGrid.tsx`, `ProcessSection.tsx`, `WorkPage.tsx`, `MenuOverlay.tsx`, `SprintBookingDrawer.tsx` en `index.html` (`metadata.json` is bewust ongewijzigd gebleven).
   - `NYC · ZRH` en `EST` / `America/New_York` zijn omgezet naar Nederland (`NL · CET` / `Europe/Amsterdam`), inclusief reserveringscode `ED1-xxxx`.
3. **Al geïnstalleerde backend-packages in `package.json`:**
   - `@google/genai`, `express`, `dotenv` en `tsx` staan nu ongebruikt in `package.json`. Laat deze staan: ze vormen direct de basis voor `/api/chat` (`nr. 32`) en eventuele API-routes (`nr. 9`, `nr. 10b`, `nr. 19`, `nr. 21`).
4. **Hero witruimte (`HeroSection.tsx`) aanpassen bij Bouwronde 1:**
   - Verklein `md:pb-[30svh]` naar `md:pb-12` om de overgangsruimte (`nr. 1`) te dichten met de compacte **3-vragen Stijl-Keuzehulp** (`nr. 15`).

