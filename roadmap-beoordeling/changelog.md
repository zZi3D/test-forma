# EDITION ONE — Changelog

> **Doel van dit bestand:** Chronologisch overzicht van alle doorgevoerde wijzigingen, nieuwe onderdelen en opgeloste bugs in **Edition One** (`editionone.nl`).  
> **Samenhang:** Gebruik dit logboek naast `track-and-checklist.md` (wat nog moet gebeuren) en `systeem-en-code-overzicht.md` (technische architectuur).

---

## [Unreleased] *(Gepland volgens `track-and-checklist.md`)*

- **Fase 1B–1E:** 3-vragen Stijl-Keuzehulp onder het 3D-wiel, realistische 24u-belofte + 4 Anti-Bureau USPs + feitelijke Metrics Strip, sectie *Selected Client Launches · Real Results* (3 NL-cases) en opschonen van verouderde `ARCHITECTURE.md`.
- **Fase 2A–2C:** Live merknaam-invoer, Monitor/Mobiel (`390px`) schakelaar & *"Share combo"* in `StylePlayground`, WhatsApp-koppeling + Cal.com + 5-Minuten Intake in `SprintBookingDrawer`, en complete Footer + Legal modals.
- **Fase 3 t/m 5:** NFC/QR Pitch Mode, 3-uurs Review Portal, Live URL Before/After Slider, Security/SEO/SEPA/AI-assistent (`server.ts`) en als laatste de Prijssectie + definitieve FAQ.

---

## [2026-11-18] — Mobiele Scroll-Overlap, 3D-Wiel Hold & Anti-Flikker Optimalisatie

### Toegevoegd
- **2–3 Scrolls 3D-Wiel Hold (`HeroSection.tsx`):** Sticky hold-runway (`wheelHoldPx`) toegevoegd voor zowel mobiel als desktop, zodat bezoekers eerst ~2–3 scrolls bovenaan door het 3D-wiel draaien voordat Sectie 2 eroverheen schuift.
- **Mobiele Sectie-Overlap (`App.tsx`, `HeroSection.tsx`):** De overgang waarbij `#rising-sheet` (Sectie 2 en lager) over het vastgepinde 3D-wiel heen schuift, gelijkgetrokken tussen mobiel en desktop.

### Gewijzigd & Opgelost (iPhone Safari & Samsung Chrome Scroll-Stabiliteit)
- **Transparante Sectie-Overlap zonder Sticky-Clipping (`App.tsx`):** Afgeronde bovenrand, schaduw en doorschijnende gradiënten verplaatst naar een aparte `aria-hidden` achtergrondlaag binnen `#rising-sheet`, en `overflow-x-clip` / `border-radius` clipping rond `position: sticky` elementen verwijderd zodat mobiele browsers de lagen niet opnieuw hoeven op te bouwen.
- **Stabiele 3D-Tegels & Scroll-Zoom (`ShowcaseMosaic.tsx`):**
  - Native sticky-positionering behouden zonder tussentijds wisselen van positionering of concurrerende lerp-loops; `spacerDocTop` en viewportmetingen gecachet en kleine mobiele adresbalk-schommelingen genegeerd.
  - 3D-laag (`perspective`, `preserve-3d`, `translateZ(1px)`) constant gehouden zonder halverwege af te breken (verhelpt GPU-flits) en React `opacity: 0`-resets bij het openen van rijen opgelost.
- **1-op-1 Synchrone 5-Demo Carrousel (`DirectionsMarqueeShowcase.tsx`):**
  - Enkele brede `w-max` scroll-rail vervangen door 5 individueel met `translate3d` gepositioneerde kaartwrappers (plus `visibility: hidden` buiten beeld) om kaartflitsen in Safari/Chrome weg te nemen.
  - Teller (`01 / 05` – `05 / 05`), pijltjes en stippen via DOM-refs bijgewerkt zonder extra React re-renders tijdens het scrollen, en concurrerende lerp-animatielus verwijderd.
- **Doorlopend Bewegende 3D-Golfachtergrond (`WaveBackground.tsx`):**
  - De 52-lijns perspectiefgolf blijft continu geanimeerd zichtbaar achter het transparante oprijzende blad, met efficiëntere mobiele instellingen (`24fps` / max `DPR 1` onder `768px`, `36fps` / max `DPR 1.25` op desktop).
- **Header, Miniatuur-Artboards & Voortgangsbalk (`GlassHeader.tsx`, `DemoArtboardPreview.tsx`, `ScrollProgressBar.tsx`):**
  - Conflicterende mobiele `clip-path + backdrop-filter` combinatie op `< 768px` uitgeschakeld om sticky header-flikkeren te voorkomen.
  - GPU-geheugen op geschaalde live miniatuur-artboards verlicht (`contain: 'layout style'`).
  - Layout-reads tijdens scrollen in de voortgangsbalk vervangen door een gecachete `ResizeObserver`-meting.

---

## [Basis & Stap 1A + Stap 3A] — Edition One Rebranding, Homepage Showcase & Live API Demo’s

### Toegevoegd
- **Rebranding & Nederlandse Lokalisatie (`Stap 1A`):**
  - Alle zichtbare onderdelen omgezet van FORMA naar **Edition One** (`editionone.nl`) en Nederland (`NL · CET`, live `Europe/Amsterdam` klok en afzender `Edition One · Netherlands · Crafted for Modern Business`) in `GlassHeader.tsx`, `HeroSection.tsx`, `ProjectWheel3D.tsx`, `SelectedWorkGrid.tsx`, `MenuOverlay.tsx`, `SprintBookingDrawer.tsx`, `ProcessSection.tsx`, `WorkPage.tsx` en `index.html`.
- **Homepage Showcase-Uitbreidingen:**
  - `ShowcaseMosaic.tsx` & `DemoArtboardPreview.tsx`: Openklappend 3D-tegeloverzicht (`01–12`) op de homepage met live geschaalde preview-artboards, filtertabbladen, mobiele *"See more"* toggle en directe *"Live Demo ↗"* knoppen.
  - `DirectionsMarqueeShowcase.tsx`: Scroll-gekoppelde horizontale 5-demo carrousel boven `03 · Interactive Lab` met live interactieve widget-previews.
  - `ScrollProgressBar.tsx`: Subtiele 2px voortgangsbalk in inkt & amber-goud bovenaan de viewport.
- **5 Interactieve Fictieve Branch-Demo’s op `#/examples` (`Stap 3A`):**
  - `ExamplesPage.tsx` + modules in `src/components/examples/`: Complete showcasepagina met `NL/EN`-taalswitch, vaste `01–05` sprongnavigatie, 3D Workbench scroll-entree en directe koppeling naar `SprintBookingDrawer`.
  - Werkende open data & live widgets voor **Korver Auto** (RDW Open Data API APK-check), **Groeneveld** (PDOK Locatieserver + Open-Meteo werkweer + m² calculator), **Noord Barbers** (behandelkiezer + reviews widget), **Café Kornelis** (Open-Meteo terrasweer + menukaart + reservering) en **Studio Vesper** (kleur/pasvorm-configurator + live winkelmand).

### Oorspronkelijke Basisarchitectuur
- **Kerncomponenten:** 52-lijns 3D-golfcanvas (`WaveBackground.tsx`), 12-kaarts CSS 3D-wiel (`ProjectWheel3D.tsx`), `03 · Interactive Lab` (`StylePlayground.tsx` met 5 industrieën × 9 visuele skins), overzichtspagina `#/directions` (`WorkPage.tsx`), `ProjectPreviewModal.tsx`, `MenuOverlay.tsx` en `SprintBookingDrawer.tsx`.
