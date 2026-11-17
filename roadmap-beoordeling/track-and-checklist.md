# EDITION ONE — Track & Checklist (Compleet Totaal-Bouwplan)

> **Doel van dit bestand:** Eén afvinkbare master-checklist van **Stap 1A t/m het einde**, waarin alle bouw-, beveiligings-, SEO-, AI-, juridische en operationele taken uit `beoordeling-en-roadmap.md`, `systeem-en-code-overzicht.md` en `prijsmodel-en-modulaire-opties.md` zijn samengebracht.  
> **Merknaam:** **Edition One** (`editionone.nl`)  
> **Belangrijke spelregel:** Prijssectie en FAQ bewaren we voor **Fase 5 (helemaal op het laatst)**.

---

## Reeds Gebouwd in Huidige Codebase *(Basis Staat — Vinkcheck)*

- [x] **3D-Golfachtergrond (`WaveBackground.tsx`):** 52-lijns perspectiefgolf (44 punten/lijn, 36fps-cap, `IntersectionObserver`).
- [x] **Pure CSS-3D Wiel (`ProjectWheel3D.tsx`):** 12 cilinderkaarten (`30°`), swipe + scroll + auto-spin + focus-zoom.
- [x] **Openklappende 3D-Tegels (`SelectedWorkGrid.tsx` & `ProjectPreviewModal.tsx`):** 12 procedurale canvas-mockups (`01` t/m `12`, incl. vernieuwde `05`, `06`, `09` t/m `12`), 5 industrie-filters en scroll-scrub 3-staps animatie.
- [x] **`03 · Interactive Lab` (`StylePlayground.tsx`):** 5 industrieën × 9 visuele skins, Motion 1 (*Levitate & Pulse*), Motion 2 (*Kinetic Pop & Tilt*), Studio Workbench scroll-entree, Skin Wipe + Diagonal Light Sweep en *Shuffle Combo*.
- [x] **Basis Shell & Overlays (`App.tsx`, `GlassHeader.tsx`, `WorkPage.tsx`, `MenuOverlay.tsx`, `SprintBookingDrawer.tsx`, `ProcessSection.tsx`):** Volledig omgezet naar **Edition One** (`editionone.nl`) en **Nederland (`Europe/Amsterdam` / `CET`)** in Stap 1A.

---

## Fase 1 · Bouwronde 1 — Rebranding, Hero-Balans, 24u-Belofte & Klantbewijs
*(100% statisch compatibel met GitHub Pages)*

### Stap 1A — Volledige Rebranding & Lokalisatie (`nr. 8`, `nr. 31` + code-audit) *(Afgerond)*
- [x] Alle zichtbare resten van `FORMA` omgezet naar **Edition One** (`editionone.nl`) in:
  - [x] `src/components/GlassHeader.tsx` *(mobiel + gecentreerd boven de taille van de gesculpteerde header)*
  - [x] `src/components/HeroSection.tsx` *(`aria-label="Edition One Overview"`)*
  - [x] `src/components/ProjectWheel3D.tsx` *(kaart-achterkanten: `EDITION ONE`)*
  - [x] `src/components/SelectedWorkGrid.tsx` *(tegel-achterkanten: `Edition One`)*
  - [x] `src/components/MenuOverlay.tsx` *(`EDITION ONE INDEX`, `Edition One · Netherlands · hello@editionone.nl`)*
  - [x] `src/components/SprintBookingDrawer.tsx` *(`EDITION ONE · 24H SPRINT DESK`, reserveringscode `FRM-xxxx` → `ED1-xxxx`)*
  - [x] `src/components/ProcessSection.tsx`
  - [x] `src/components/WorkPage.tsx`
  - [x] `src/components/ProjectPreviewModal.tsx` *(gecontroleerd — geen oude naam/copy aanwezig)*
  - [x] `index.html` *(`<title>`, `og:title`, `description`, `og:description`)*
  - [x] `metadata.json` *(bewust ongewijzigd gelaten per platformregel: app-manifest naam nooit hernoemen na aanmaak)*
- [x] `NYC · ZRH` en `America/New_York` (`EST`) in de Metrics Strip, Processectie (3 sprint-blokken + live `Europe/Amsterdam` klok + footer), `WorkPage.tsx` en Booking Drawer (`CET` + `Amsterdam · CET`) omgezet naar **Nederland (`Europe/Amsterdam` / `CET`)** met studio-afzender: **`Edition One · Netherlands · Crafted for Modern Business`**.
- [x] **Vaste taalregel (`nr. 8`) aangehouden:** Hoofdsite is 100% Engels; bij Nederlandse klantcases (Stap 1D) behouden we de originele merknamen met badge **`Dutch Market Launch`**.

### Stap 1B — Hero Witruimte & 3-Vragen Stijl-Keuzehulp (`nr. 1` + `nr. 15`)
- [ ] Onderste padding van `src/components/HeroSection.tsx` (`md:pb-[30svh]`) strak trekken naar `md:pb-12` zodat de sticky-overgang direct aansluit zonder groot leeg gat.
- [ ] In die overgangsruimte een compacte glazen **Stijl-Keuzehulp balk** plaatsen met:
  - [ ] **3-vragen Stijl-Keuzehulp popup:** *1. Branche (5 sectoren) → 2. Hoofddoel → 3. Sfeer* → geeft 1 directe aanbevolen stijlmatch met 1-klik knop naar **Playground** of **SprintBookingDrawer**.
  - [ ] Twee directe snelkoppelingen: **`Browse 12 Directions ↓`** en **`Jump to Playground ↓`**.

### Stap 1C — Realistische 24u-Belofte, USPs & Feitelijke Metrics (`nr. 11`, `nr. 16`, `nr. 20`)
- [ ] Belofte in Hero, Processectie en Drawer aanscherpen naar: ***"Your website plan & first clickable live concept within 24 hours"*** (volledige oplevering 2–5 werkdagen), aangevuld met een subtiele wekelijkse slot-indicator (*"Next 24h concept slot: ... · 2 spots left this week"*).
- [ ] Onbewezen/verzonnen cijfers in de Metrics Strip (`340+ Editorial editions shipped`) verwijderen en vervangen door keiharde feiten:
  - [ ] `24h` — *Plan & Live Concept*
  - [ ] `3+` — *Live Dutch Launches*
  - [ ] `12` — *Design Directions*
  - [ ] `NL · CET` — *Live Studio Time*
- [ ] Sterkere conversiekoppen (`nr. 11`) en de **4 Anti-Bureau USPs (`nr. 20`)** verwerken in de copy en Processectie:
  1. Geen saaie PDF-offertes (binnen 24u een klikbaar live-concept met eigen merknaam)
  2. WhatsApp-to-Live beheer (wijzigen via appje/spraakbericht i.p.v. log CMS)
  3. Geen wurggreep (na 12 mnd maandelijks opzegbaar of volledig overneembaar)
  4. Gebouwd voor 0,05 sec vertrouwen

### Stap 1D — Nieuwe Sectie: *Selected Client Launches · Real Results* (`nr. 3`)
- [ ] Drie glazen kaarten naast elkaar (zonder verzonnen percentages!) met één hoofdscreenshot per case + een **"View case screens"** modal voor de overige schermen uit `public/assets/aistudio/`:
  - [ ] **New Look Barbershop Uithoorn:** `4.9★ Google Rating (136 reviews)` · `3-Step Price & Gallery Structure` · `Direct WhatsApp Booking` *(strakke crop zonder wit/leeg kaartblok)*.
  - [ ] **Rijschool Vreugdenhil:** `5-Page Custom Platform` · `WhatsApp Lead Pre-Fill + Portal Sync` · `Custom Route Loader` · `4.6★ Google (24 reviews)` *(6 schermen in modal)*.
  - [ ] **Deen Clothing:** `18-SKU Filterable Catalog` · `Zero-Checkout WhatsApp Commerce` · `Interactive Size & FAQ System` *(4 schermen in modal)*.

### Stap 1E — Documentatie Opschonen (`systeem-en-code-overzicht.md` Hoofdstuk 10)
- [ ] Verouderde root-bestanden (`ARCHITECTURE.md` en `implementation_plan.md` met oude Three.js/WebGL-verwijzingen) markeren als verouderd of opruimen.

---

## Fase 2 · Bouwronde 2 — Playground als Verkoopmachine, Werkende Flow & Footer

### Stap 2A — Live Style Playground Upgrades (`nr. 5`, `nr. 6`, `nr. 7`) + Modal Brug
- [ ] Invoerveld **`"Your brand name..."`** in `StylePlayground.tsx` dat live de demo-merknaam, het initiaal-icoon en de subtitel vervangt en doorstuurt naar `SprintBookingDrawer`.
- [ ] **Monitor / Smartphone** schakelaar rechtsboven in het podium om de preview vloeiend naar `390px` mobiele weergave te schakelen.
- [ ] Knop **`"Share combo"`** die een directe URL met query-parameters kopieert (`?industry=...&skin=...&brand=...&view=mobile#style-playground`) voor snelle B2B WhatsApp-pitches.
- [ ] *(Extra brug vanuit PDF p. 7)* In `ProjectPreviewModal.tsx` naast `"Build my site in this style →"` optioneel een tweede knop toevoegen: **`Try different skins in Playground ↓`** zodat bezoekers soepel doorscrollen naar Sectie 03.

### Stap 2B — Werkende Aanvraagflow, 5-Minuten Intake & Trojan Horse (`nr. 9`, `nr. 17`, `nr. 18`, `nr. 27`)
- [ ] `SprintBookingDrawer.tsx` voorzien van echte formulierverzending (mail/webhook) + directe knop **`"Send brief directly via WhatsApp →"`** met vooringevuld `wa.me`-bericht + subtiel **Trojan Horse-label (`nr. 18`)**: *"⚡ Dit is Edition One's WhatsApp-module — ook voor jouw website?"*.
- [ ] Tab 2 (`15-Min Discovery Call`) koppelen aan **Cal.com / Google Calendar** in `Europe/Amsterdam` (`CET`) i.p.v. statische tijden.
- [ ] **5-Minuten Content Intake (`nr. 17`)** na boeking: logo-upload, Google Bedrijfsprofiel-URL, 3 kernpunten, WhatsApp-nummer + ingebouwde **RDAP/DNS Domein- & Verhuis-Assistent (`nr. 27`)**.
- [ ] **Google Reviews / Social Proof (`nr. 18`)** meenemen als zichtbaar live bewijs op de eigen site.

### Stap 2C — Complete Footer & Legal (`nr. 10a`)
- [ ] Zowel in `ProcessSection.tsx` als `WorkPage.tsx` de volledige footer inrichten:
  - `Edition One · Netherlands · Crafted for Modern Business`
  - Live `Europe/Amsterdam` klok
  - Klikbaar e-mailadres + directe **WhatsApp Studio-knop**
  - KvK-nummer (en evt. BTW-id)
  - Links/modals voor `Privacy Policy` en `Sprint Terms (3h Review Policy)`

---

## Fase 3 · Bouwronde 3 — Alle 5 Live API Demo One-Pagers, Pitch Mode, Review Portal & URL-Slider

### Stap 3A — De 5 Interactieve Fictieve Demo One-Pagers (`nr. 12`) + Live Pitch Mode (`nr. 29`)
- [ ] Alle demo's bouwen op hash-routes (`#/demo/...`), voorzien van:
  - Vaste **Demo Showcase Bar** bovenaan: `← Back to Edition One` · `Live Interactive Demo · Built by Edition One` · invoerveld `"Your business name..."` · knop `Build this for my business →`.
  - Vaste footer credit: `Interactive One-Pager Concept · Built by Edition One`.
  - Strikte koppeling aan de vaste **9 Playground-stijlen** (inclusief optionele 9-stijlen switcher binnen de demo).
- [ ] **Demo A (Prioriteit #1): Garage / Autobedrijf** + échte **RDW Open Data API** (`opendata.rdw.nl/resource/m9d7-ebf2.json`) APK-check + 1-klik testkentekens + dienstenkiezer + WhatsApp-afspraak.
- [ ] **Demo B: Hovenier / Dakdekker / Schilder** + **PDOK Locatieserver** + **Open-Meteo Weer API** + m² offerte-calculator.
- [ ] **Demo C: Horeca / Beachclub** + **Open-Meteo Terrasweer** + filterbare menukaart + WhatsApp reserveren.
- [ ] **Demo D: Kapsalon / Coach / Fysio** + behandelkiezer + tijdsloten + gesimuleerde interactieve Google Reviews widget *(incl. "Voeg test-review toe" in sandbox)*.
- [ ] **Demo E: Lokale D2C Webshop** + 4–6 SKU's + maat/kleur + winkelwagen-drawer + 1-klik WhatsApp-Commerce.
- [ ] **NFC / QR Live Pitch Mode (`nr. 29`):** URL-parameter `?pitch=true&brand=...#style-playground` zodat je onderweg direct een mobiele Playground-demo opent zonder langs de Hero te scrollen.

### Stap 3B — 3-Uurs Klantcommunicatie & Review Portal (`nr. 10b`)
- [ ] **Vaste Werkafspraken in teksten verankeren (`nr. 10b`):** Vooraf vast **Sprint Window** afspreken (bijv. *09:00–17:00 standby op WhatsApp*) + concreet **meerwerktarief** (€XX/uur of €XX per extra revisieronde) opnemen in de Sprint Terms.
- [ ] **Route 1 (Zero-code start binnen 30 min):** Preview-link + **Tally.so** mini-formulier (`Akkoord` / `Feedback`) → **Make.com** → **CallMeBot / WhatsApp Cloud API**.
- [ ] **Route 2 (Eigen Review Portaal):** `#/review/:projectId` pagina met **live 3-uurs aftelklok**, Desktop/Mobiel frame en 2 knoppen (`✓ Akkoord` / `✎ Feedback doorgeven`) die binnen 2 seconden een WhatsApp-ping sturen.

### Stap 3C — Live Website URL Before/After Slider + PageSpeed API (`nr. 14`, `nr. 19`)
- [ ] Eigen domein invullen → via lichte screenshot/metadata-API (zoals *Microlink API* of serverless endpoint) live huidige website (**Before**) vergelijken met automatisch gevuld Edition One-concept (**After**).
- [ ] Koppelen aan gratis **Google PageSpeed Insights API** (`nr. 19`): echte mobiele score (`0–100`) van de huidige site tonen naast Edition One's `98+` score.

---

## Fase 4 · Bouwronde 4 — Hosting-Upgrade, Security, 20-Punten SEO, AI-SEO, SEPA & AI-Chatbot
*(Overstap van puur statische GitHub Pages naar Vercel / Cloudflare Pages+Functions / Express `server.ts` met de al geïnstalleerde packages `@google/genai`, `express`, `dotenv`, `tsx`.)*

### Stap 4A — Security, Anti-Scraping, Geo & Intake-Proxies (`nr. 21`, `nr. 22`, `nr. 23`)
- [ ] **HTTP Security Headers & Hardening (`nr. 23`):** HSTS (Enforce HTTPS), `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `sourcemap: false` in productiebuild.
- [ ] **WAF, Anti-Scraping & API-bescherming:** Bot Fight Mode + rate-limiting (bijv. max. 30 req/min per IP), CORS/origin-restricties en onzichtbare honeypot-velden op formulieren.
- [ ] **Selectieve `robots.txt`:** Zoek-/antwoordbots toestaan (`Googlebot`, `Bingbot`, `OAI-SearchBot`, `PerplexityBot`); bulk-scrapers & trainingsbots blokkeren (`CCBot`, `Bytespider`, `GPTBot`).
- [ ] **Edge IP-Geolocatie (`nr. 22`):** Subtiele lokale vertrouwensregel op basis van regio/stad via Edge-headers zonder privacy-popup.
- [ ] **Veilige Server-Proxies (`nr. 21`):** KVK / OpenKVK & Google Places Autocomplete voor automatisch invullen van adres, openingstijden, KVK en reviews.

### Stap 4B — Complete 20-Punten SEO & AI-SEO / GEO (`nr. 24`, `nr. 25`)
- [ ] Technische crawl-basis: `sitemap.xml`, `<link rel="canonical">`, geen onbedoelde `noindex`-tags, 301-redirects (`http`/`www` → `https`) en schone URL-slugs.
- [ ] Meta & Social: `<title>` (< 60 tekens), unieke `<meta name="description">` (< 155 tekens) en scherpe `1200×630` `og:image`.
- [ ] Semantiek & Links: Strikt `1× <h1>` per pagina, logische `H2 → H3` structuur, beschrijvende `alt`-teksten + `aria-hidden="true"` op decoratieve SVG's, sterke interne links en nul 404/dode links.
- [ ] Performance & Mobiel: Gecomprimeerde WebP-afbeeldingen met vaste `width`/`height` (`CLS = 0`), groene Core Web Vitals, mobiele weergave vanaf `360px` met ≥ `44×44px` touch-targets.
- [ ] **AI SEO / GEO (`nr. 25`):** `/llms.txt` in `public/` + **JSON-LD `Schema.org`** (`WebDesign` / `ProfessionalService` + `FAQPage`) in `index.html`.
- [ ] Aanmelding en verificatie in **Google Search Console** én **Bing Webmaster Tools** *(cruciaal voor ChatGPT Search)*.

### Stap 4C — SEPA Incasso, Referral, AVG & Beveiligde AI-Chatbot (`nr. 18`, `nr. 26`, `nr. 28`, `nr. 30`, `nr. 32`)
- [ ] **Mollie / Stripe (`nr. 26`):** iDEAL eerste betaling → automatische maandelijkse SEPA-incasso + boekhoudkoppeling (*Moneybird / e-Boekhouden*) gekoppeld aan 1-klik digitaal akkoord op 12-mnd termijn & 3-uurs reviewregel.
- [ ] **Ondernemers Referral-programma (`nr. 28`):** Na oplevering & op `#/review`: *"Draag een collega aan = allebei 1 maand gratis hosting & onderhoud (of 1 gratis add-on)"*.
- [ ] **AVG-proof werkwijze (`nr. 30`):** Standaard gescheiden nieuw account + `beheer@editionone.nl`, zero-plaintext wachtwoorden via Bitwarden/1Password & `OneTimeSecret / PassTransfer` + 2FA, dataminimalisatie & opschonen na livegang, art. 28 AVG verwerkersclausule.
- [ ] **Beveiligde `/api/chat` AI-Assistent (`nr. 18` + `nr. 32`):**
  - Derde *Trojan Horse* widget op de eigen site (met onderin label: *"💬 Ik ben Edition One's 24/7 AI-module — binnen 24 uur getraind op jouw bedrijf"*).
  - Server-side `/api/chat` via `express` + `@google/genai`, CORS-check & rate-limiting (bijv. max. 15 berichten/uur per bezoeker).
  - Géén live scraping/browsing: alleen één goedgekeurd `knowledge.md` (synchroon met `/llms.txt`), lage `temperature` (`0.1–0.2`) en `<user_query>` prompt-injection filter.
  - **Live React Pagina-Acties** i.p.v. verzonnen URL's + **Fair Use limiet (max. 500 berichten/mnd)** op de € 14,50/mnd klantmodule.
  - Uitgewerkt 3-lagen systeem voor klanten zonder documentatie (website/Google Bedrijfsprofiel + 5 branche-blauwdrukken + 10-vragen invulkaart).

---

## Fase 5 (Helemaal op het Laatst) — Prijzen (`nr. 2`), FAQ (`nr. 4`) & Latere Uitbreiding

### Stap 5A — Complete Prijssectie (`prijsmodel-en-modulaire-opties.md` Hoofdstuk 1 t/m 5)
- [ ] De **3 Basisabonnementen** (12 maanden minimale looptijd, excl. btw):
  - **Tier 1 · The One-Pager (`€ 35/mnd`):** 1 pagina, live-concept 24u / oplevering 2–3 werkdagen, strikte 3-uurs regel.
  - **Tier 2 · Velocity (`€ 55/mnd` — *Most Popular*):** Tot 5 pagina's, oplevering 3–5 werkdagen, standaard incl. **WhatsApp Direct Chat, AVG Cookiebanner & Basis-SEO**.
  - **Tier 3 · Scale (`€ 95/mnd`):** Onbeperkt pagina's *(Fair Use: max. 2 actieve aanvragen tegelijk)*, standaard incl. **Google Reviews Koppeling**.
- [ ] De **Model A** (puur maandelijks) vs. **Model B** (eenmalige setup + lagere maandprijs) schakelaar met alle **22 modulaire add-ons** verdeeld over 6 categorieën (*SEO & Vindbaarheid · Systeem/API/DNS · Content & Schaalbaarheid · Conversie/Leads/Betalingen · Design/Taal/Social · Juridisch/Data/SLA*).
- [ ] Het transparante **Rekenvoorbeeld** (`€ 69,50/mnd` resp. `€ 84,00/mnd` incl. AI-bot) én het blok **Maatwerk App Services (op aanvraag)** uit Hoofdstuk 4.

### Stap 5B — Definitieve FAQ-Sectie (`nr. 4`)
- [ ] De 5 kernvragen afgestemd op echte prijzen en voorwaarden:
  1. 24-uurs websiteplan & live concept
  2. Live feedback & 3-uurs approval window
  3. Benodigde aanlevering (teksten, foto's, domein)
  4. Hosting, domeinverhuizing & WhatsApp-integraties
  5. Aanpassingen via WhatsApp na livegang

### Stap 5C — Eventuele Latere Taalswitch (`nr. 8`)
- [ ] Pas nadat de gehele Engelse site, klantcases, demo's, prijzen en FAQ definitief staan: optioneel een schone **NL / EN taalswitch** toevoegen.

---

## Operationele Checklist *(Buiten de Website-Code & Bij Elke Oplevering)*

- [ ] **Domein & E-mail (`nr. 30`, `nr. 31`):** `editionone.nl` (en `.com`) vastleggen + `hello@editionone.nl` en `beheer@editionone.nl` aanmaken.
- [ ] **WhatsApp Business (`nr. 31`):** Kompas-logo, vaste openingstijden, directe Playground-link en korte pakketcatalogus instellen.
- [ ] **Externe Tools (`nr. 9`, `nr. 10b`, `nr. 24`, `nr. 26`):** Cal.com (`Europe/Amsterdam`), Mollie/Stripe + Moneybird/e-Boekhouden, Google Search Console + Bing Webmaster Tools (en optioneel Tally.so + Make.com + CallMeBot) inrichten.
- [ ] **Juridisch & AVG (`nr. 10a`, `nr. 10b`, `nr. 26`, `nr. 30`):** KvK/BTW-gegevens, Privacy Policy, Algemene Voorwaarden (12-mnd termijn, 3-uurs regel + concreet meerwerktarief, art. 28 AVG verwerkersclausule), intern verwerkingsregister en wachtwoordkluis (**Bitwarden / 1Password + OneTimeSecret + 2FA**) klaarzetten.
- [ ] **Kennisbank & Templates (`nr. 32`):** Goedgekeurde `edition-one-knowledge.md` (synchroon met `/llms.txt`), de **5 Branche-Blauwdrukken** (*Salons, Advisory/B2B, Retail/Webshops, Sports/Events, Tech/Products*) en de **10-Vragen Invulkaart** opstellen.
- [ ] **Standaard Klantoplevering (`nr. 31`):** Bij elke opgeleverde klantwebsite één merkgerichte **Signature micro-animatie** (zoals de route-loader bij Vreugdenhil) + subtiele footer-credit **`Crafted by Edition One`** meenemen.

---

## Beslispunten Vóór Start van Fase 1 (Bouwronde 1)

*(Pas invullen zodra we samen klaar zijn om te beginnen — nog geen code geschreven.)*

1. **Keuze 1 (Afzender & E-mail):** Akkoord met `Edition One · Netherlands · Crafted for Modern Business` + welk e-mailadres mag erin (bijv. `hello@editionone.nl`)? *(Let op: `metadata.json` is het interne AI Studio project-manifest; alle zichtbare namen in HTML/UI/titles gaan naar Edition One.)*
2. **Keuze 2 (Plek van *Selected Client Launches*):** Boven `02 · Design Directions` (direct na het 3D-wiel) of tussen `02 · Design Directions` en `03 · Interactive Lab`?
3. **Keuze 3 (Klantcases `nr. 3`):** Hoofdscreenshot op de kaart + extra schermen in een *"View case screens"* modal — alleen feitelijke badges/metrics of ook echte eigenaarsquotes?
4. **Keuze 4 (3-Vragen Stijl-Keuzehulp `nr. 15`):** Akkoord met *1. Branche (5 sectoren) → 2. Hoofddoel → 3. Sfeer* uitkomend op 1 directe stijlmatch?
