# EDITION ONE — Beoordeling & Roadmap (Punt nr. 1 t/m nr. 32)

> **Merkidentiteit:** Voorheen werknaam *FORMA* — definitieve merknaam: **Edition One** (`editionone.nl`).  
> **Status:** Complete documentatie, strategie & technische roadmap — **klaar voor Bouwronde 1 in applicatiecode**.  
> Alle aangeleverde screenshots uit onze chat zijn veilig opgeslagen in `public/assets/aistudio/` en worden hieronder direct gelinkt ter referentie.

---

## Overzicht van alle punten (nr. 1 t/m nr. 32)

| Nr. | Onderwerp | Status / Actie | Prioriteit |
| :--- | :--- | :--- | :--- |
| **nr. 1** | Witruimte onderaan Hero-sectie oplossen | Gecombineerd met `nr. 15` (Keuzehulp + snelkoppelingen) | Hoog |
| **nr. 2** | Sectie 4: Transparante Sprint-pakketten / Prijzen | **Nog even wachten** (model eerst bepalen) | Later |
| **nr. 3** | Echte klantcases & resultaten (3 echte websites) | Klaar voor Bouwronde 1 (`New Look`, `Vreugdenhil`, `Deen`) | Hoog |
| **nr. 4** | FAQ-sectie (bezwaren wegnemen) | **Nog even wachten** (na prijzen/flow) | Later |
| **nr. 5** | Live eigen merknaam typen in Style Playground | Meenemen in Bouwronde 2 | Hoog |
| **nr. 6** | Mobile vs. Desktop toggle in Playground-podium | Meenemen in Bouwronde 2 | Hoog |
| **nr. 7** | Directe "Share / Bewaar combo" URL-link | Meenemen in Bouwronde 2 | Midden |
| **nr. 8** | Taalkeuze (voorlopig 100% Engels) | Akkoord — één bron bijhouden tot alles staat | Afgesproken |
| **nr. 9** | Werkende afhandeling van `SprintBookingDrawer` | WhatsApp Smart-Fill + Webhook/Mail + Cal.com | Hoog |
| **nr. 10a** | Footer met directe contactopties, WhatsApp & Legal | NL/EU-gegevens (`Europe/Amsterdam`) + directe acties | Midden |
| **nr. 10b** | Klantcommunicatie, 3-uurs feedbackregel & WhatsApp-alerts | Operationele workflow & `/review` checkpoint-pagina | Hoog |
| **nr. 11** | Sterkere marketing- en conversieteksten | Copy-richting per sectie verwerken | Hoog |
| **nr. 12** | Interactieve fictieve Demo One-Pagers (RDW, Weer, etc.) | One-pagers gekoppeld aan de 9 Playground-stijlen | Hoog |
| **nr. 13** | Strategische Beoordeling & Aanbevolen Bouwvolgorde | 3-sprint bouwplan als leidraad voor uitvoering | Overzicht |
| **nr. 14** | Live URL Before/After Transformatie-Slider | Eigen URL invullen → huidige site vs. Edition One versie | Hoog |
| **nr. 15** | 3-Vragen Stijl-Keuzehulp (in Hero-overgang) | Compacte keuzebalk + 3-vragen popup + directe knoppen | Hoog |
| **nr. 16** | Realistische 24u-belofte + Beschikbaarheidsindicator | *"Websiteplan & eerste live-concept binnen 24 uur"* | Hoog |
| **nr. 17** | 5-Minuten Content Intake | Logo, Google Bedrijfsprofiel, 3 kernpunten & WhatsApp | Hoog |
| **nr. 18** | "Trojan Horse" Modules op eigen site | Bezoekers ervaren WhatsApp-flow & AI-bot zelf op site | Midden |
| **nr. 19** | Live Google PageSpeed Check (in `nr. 14`) | Toont echte mobiele snelheidsscore (0–100) bij URL-check | Hoog |
| **nr. 20** | "WhatsApp-to-Live" & "Geen Wurggreep" USPs | Wijzigen via appje/spraakbericht + vrijheid na 12 mnd | Hoog |
| **nr. 21** | KVK & Google Bedrijfsprofiel Autocomplete | Automatisch adres, openingstijden & reviews ophalen | Midden |
| **nr. 22** | Subtiele Regio-personalisatie (Edge Geo) | Lokale vertrouwensregel op basis van IP-regio | Laag |
| **nr. 23** | Security, HTTPS & Anti-Scraping | WAF/Bot-bescherming, rate-limits & selectieve `robots.txt` | Hoog |
| **nr. 24** | 20-Punten Technische & On-Page SEO | `sitemap.xml`, canonicals, `1x H1`, `og:image`, WebP & CWV | Hoog |
| **nr. 25** | AI SEO / GEO (`llms.txt` & Schema.org) | Gestructureerde JSON-LD + `/llms.txt` voor LLM-vindbaarheid | Hoog |
| **nr. 26** | SEPA Incasso & 1-Klik Digitaal Akkoord | Mollie/Stripe incasso + akkoord op 12-mnd & 3-uurs regel | Hoog |
| **nr. 27** | Domein- & Verhuis-Assistent (in `nr. 17`) | RDAP/DNS-check haalt technische verhuisangst weg | Midden |
| **nr. 28** | Ondernemers Referral-Programma | Collega aandragen = allebei 1 maand gratis of 1 add-on | Midden |
| **nr. 29** | NFC / QR "Live Pitch Mode" | URL-parameter voor directe mobiele Playground-demo | Laag |
| **nr. 30** | AVG-Proof Account- & Credentialbeleid | Standaard nieuw account + versleutelde overdracht | Hoog |
| **nr. 31** | Merkimago & Positionering (**Edition One**) | Luxe *editorial* uitstraling + Nederlandse snelheid | Hoog |
| **nr. 32** | Beveiligde AI-Chatbot Architectuur & Branche-Templates | Gesloten kennisbestand (geen scraping) + 5 branche-templates | Hoog |

---

## nr. 1 — Witruimte onderaan de Hero-sectie oplossen

![Huidige Hero witruimte](../public/assets/aistudio/image_33a3f147.png)

### Diagnose (uit huidige code `src/components/HeroSection.tsx`)
- De Hero heeft momenteel `md:pb-[30svh]` (30% van de schermhoogte aan lege ondermarge) zodat er scrollruimte is voordat Sectie 2 over de Hero heen schuift, plus `mt-10 md:mt-12` boven de subtekst.
- Gevolg op desktop (zoals zichtbaar in de screenshot): zodra je net iets scrolt, ontstaat er een groot leeg vlak onder de twee knoppen (`Book a 15-min Discovery Call` & `Design Directions ↓`).

### Gekozen Oplossing (Gecombineerd met `nr. 15`)
- Verklein de onderste padding van `md:pb-[30svh]` naar `md:pb-12` zodat de sticky-overgang direct strak aansluit.
- Vul deze overgangsruimte met een compacte glazen **Stijl-Keuzehulp balk** (`nr. 15`) met drie heldere routes:
  1. **Primaire knop:** *"Not sure what fits? Take the 3-question Style Match →"* (opent een 3-stappen keuzehulp-popup).
  2. **Directe snelkoppeling 1:** *"Browse 12 Directions ↓"*
  3. **Directe snelkoppeling 2:** *"Jump to Playground ↓"*

---

## nr. 2 — Transparante Sprint-pakketten / Prijzen (Sectie 4 — *Nog even wachten*)

### Beoordeling
Goed dat je hier nog even mee wacht tot je exact weet hoe je je aanbod wilt positioneren. Twee routes die in Nederland voor dit type studio het best converteren:

1. **Model 1: Eenmalig Bouwen + Optioneel Maandelijks Care-pakket (Meest laagdrempelig qua administratie):**
   - **Sprint One-Pager** — *Vanaf €X eenmalig* (eerste live concept binnen 24u, 1 sterke landingspagina, WhatsApp/contact-flow, basis SEO).
   - **Multi-Page Studio Website** — *Vanaf €Y eenmalig* (3–6 pagina's zoals Rijschool Vreugdenhil, maatwerk interacties, Google Reviews integratie). *(Label: `Most Popular`)*
   - **Commerce / Catalogus op maat** — *Vanaf €Z eenmalig* (zoals Deen Clothing met collecties, filters, maatadvies & WhatsApp-bestelflow).
   - *Optionele toggle/add-on:* **Monthly Care & Hosting (€X/mnd)** — snelle aanpassingen, hosting, SSL en uptime monitoring.
2. **Model 2: Maandelijks Abonnement (WaaS) vs. Eenmalig (Toggle zoals Monthly / Annual):**
   - Zie uitgewerkte varianten in `prijsmodel-en-modulaire-opties.md` (Model A zonder opstartkosten vs. Model B met opstartkosten).

---

## nr. 3 — Echte Klantcases & Resultaten (3 Echte Projecten)

Je hebt 3 sterke, heel uiteenlopende praktijkcases aangeleverd. Dit is goud waard voor vertrouwen: bezoekers zien direct dat je niet alleen mooie concepten maakt, maar **echte Nederlandse ondernemers helpt met snelle, conversiegerichte websites**.

### Case 1: New Look Barbershop Uithoorn (`newlookuithoorn.nl`)
![New Look Uithoorn screenshot](../public/assets/aistudio/image_736f48d5.png)

- **Wat we op de site zien:**
  - Donker luxe zwart/goud design met duidelijke diensten (*Vakmanschap, Knippen & Scheren, Service*), 3-koloms transparante prijslijst, 4-foto galerij, productlijn, fysieke stempelkaart-sectie, openingstijden en **4.9 / 5 Google Reviews (136 reviews)**.
  - Directe WhatsApp-actie voor afspraken zonder ingewikkeld boekingssysteem.
- **Sterke case-instek voor Edition One:**
  - *Sector:* Salons & Local
  - *Opgelost probleem:* Lokale klanten willen binnen 10 seconden prijzen, sfeer, openingstijden en bewijs (reviews) zien.
  - *Hard bewijs / metric voor op de kaart:* `4.9★ Google Rating (136 reviews)` · `3-Step Price & Gallery Structure` · `Direct WhatsApp Booking`.
  - *(Let op voor visual in case-card: gebruik het bovenste hero/services/reviews gedeelte of een strakke crop zonder leeg kaartblok.)*

---

### Case 2: Rijschool Vreugdenhil — Westland & Den Haag (`rijschoolvreugdenhil.nl`)
| Homepage | Over ons & Specialisaties | Rijbewijs B Pakketten |
| :---: | :---: | :---: |
| ![Rijschool Home](../public/assets/aistudio/image_8535511d.png) | ![Rijschool Over ons](../public/assets/aistudio/image_a689cb3d.png) | ![Rijschool B](../public/assets/aistudio/image_3435db1f.png) |

| Rijbewijs BE (1 Dag) | Contact & WhatsApp | Custom Route Laadanimatie |
| :---: | :---: | :---: |
| ![Rijschool BE](../public/assets/aistudio/image_2d7a2bc0.png) | ![Rijschool Contact](../public/assets/aistudio/image_6ba1925e.png) | ![Rijschool Loader](../public/assets/aistudio/image_6056b9c9.png) |

- **Wat we op de site zien:**
  - Compleet multi-page platform (Home, Over ons, Rijbewijs B, Rijbewijs BE, Contact) in donkerblauw/electric blue.
  - Sterke positionering op vertrouwen & specialisaties (ASS, ADHD, Faalangst), transparante lespakketten (`€1.250 / €2.165 Meest Gekozen / €3.070`), losse CBR-tarieven, 1-daagse aanhangeropleiding (`€835`), koppeling met officieel leerlingportaal (*Startmetjerijbewijs.nl*) én WhatsApp-formulier dat de chat kant-en-klaar opent.
  - **Signature detail:** De custom route-laadanimatie (*"Jouw route naar het rijbewijs ... · Klaar voor de start!"*) — laat zien dat je ook merkgerichte micro-animaties bouwt.
- **Sterke case-instek voor Edition One:**
  - *Sector:* Advisory & B2B / Local Services
  - *Hard bewijs / metric voor op de kaart:* `5-Page Custom Platform` · `WhatsApp Lead Pre-Fill + Portal Sync` · `4.6★ Google (24 reviews)`.

---

### Case 3: Deen Clothing (`deenclothing.nl`)
| Homepage | Volledige Collectie (18 items) | Maatadvies & Tabellen | FAQ met Zoekfunctie |
| :---: | :---: | :---: | :---: |
| ![Deen Home](../public/assets/aistudio/image_2d5fdc17.png) | ![Deen Collectie](../public/assets/aistudio/image_32d01a91.png) | ![Deen Maatadvies](../public/assets/aistudio/image_1e582282.png) | ![Deen FAQ](../public/assets/aistudio/image_58f0821c.png) |

- **Wat we op de site zien:**
  - Donker editorial catalogusplatform met 18 artikelen, live zoek- en categoriefilter (`Arabische style`, `Omani Style`, `A'Immah`, `Kufi`), voorraadindicatie per product en bewust **géén onpersoonlijke kassa**, maar directe 1-op-1 bestelknoppen via WhatsApp & E-mail.
  - Inclusief uitgebreid **Maatadvies** (`54–62` lengte & `S–XXL` cm-tabel) en een doorzoekbare **FAQ met categoriefilters** — waardoor klantvragen vóór het appen al worden opgelost.
- **Sterke case-instek voor Edition One:**
  - *Sector:* Retail & Webshops
  - *Hard bewijs / metric voor op de kaart:* `18-SKU Filterable Catalog` · `Zero-Checkout WhatsApp Commerce` · `Interactive Size & FAQ System`.

### Belangrijke checklist voor nr. 3
- **Geen verzonnen percentages gebruiken:** Gebruik alleen echte feiten/cijfers (`4.9★ Google (136 reviews)`, `18-item live catalog`, `5-page platform`).
- **Waar plaatsen?** Een compacte sectie **"Selected Client Launches · Real Results"** (3 strakke glazen kaarten naast elkaar met screenshot-preview + 2 harde specs + optionele quote + *"View case details"* modal).

---

## nr. 4 — FAQ-sectie (*Nog even wachten*)

- **Beoordeling:** Pas bouwen na **nr. 2 (Prijzen)** en **nr. 10b (Werkwijze/3-uursregel)**, zodat elk antwoord 100% klopt met je echte voorwaarden.
- **Aanbevolen vragen:**
  1. *How do you deliver a tailored website plan and live interactive concept within 24 hours?*
  2. *How does the live feedback & 3-hour approval window work?*
  3. *What do I need to prepare (texts, photos, domain)?*
  4. *Are hosting, domain transfer, and WhatsApp integrations included?*
  5. *How do edits via WhatsApp work after launch?*

---

## nr. 5, nr. 6 & nr. 7 — Upgrades voor Sectie 03 (`StylePlayground.tsx`)

1. **nr. 5 — Live eigen merknaam invoeren:**
   - Klein, strak invoerveld (`"Your brand name..."`) in de balk van de Playground.
   - Vervangt live de demo-merknaam in de podium-navbar, het initiaal-icoon en de subtitel, en wordt doorgestuurd naar `SprintBookingDrawer`.
2. **nr. 6 — Mobile vs. Desktop toggle:**
   - Compacte icon-switch (`Monitor` / `Smartphone`) rechtsboven in het Playground-podium om vloeiend naar `390px` mobiele weergave te schakelen.
3. **nr. 7 — Directe "Share / Bewaar combo" link:**
   - Knop `"Share combo"` kopieert URL met query-parameters, bijv.:  
     `?industry=Salons+%26+Local&skin=glassmorphism&brand=New+Look&view=mobile#style-playground`

---

## nr. 8 — Taal voorlopig 100% Engels houden

- Eerst alle functionaliteit, structuur en copy in één taal (Engels) perfectioneren, passend bij de merknaam **Edition One**. Pas later eventueel een schone NL/EN taalwissel toevoegen.

---

## nr. 9 — Werkende afhandeling van `SprintBookingDrawer.tsx`

1. **Tab 1 (`24h Concept Brief`) → Server/Webhook + WhatsApp Smart-Fill:**
   - Verzendt het formulier naar een backend-route/webhook + directe **"Send brief directly via WhatsApp →"** knop met alle ingevulde gegevens + gekozen stijl al vooringevuld.
2. **Tab 2 (`15-Min Discovery Call`) → Cal.com / Google Calendar (`Europe/Amsterdam`):**
   - Echte beschikbaarheid in Nederlandse tijdzone (`CET`) met automatische Google Meet-link en herinnering.

---

## nr. 10a — Footer met directe contactopties & legal (`ProcessSection.tsx`)

- Vervang `FORMA Studio · New York & Zurich` door **`Edition One · Netherlands · Crafted for Modern Business`**.
- Live studio-klok op `Europe/Amsterdam` (`CET`).
- Direct klikbaar e-mailadres, directe **WhatsApp Studio-knop**, KvK-gegevens, `Privacy Policy` en `Sprint Terms (3h Review Policy)`.

---

## nr. 10b — Klantcommunicatie, 3-Uurs Evaluatieregel & Directe WhatsApp-Meldingen

### 1. De 3 Vaste Checkpoints tijdens een Project
- **Checkpoint 1 (Structuur & Designrichting):** Eerste Hero + kleuren + typografie op een live preview-link.
- **Checkpoint 2 (Volledige Pagina & Mobiel):** Alle secties + teksten + knoppen testen.
- **Checkpoint 3 (Finale Oplevering):** Laatste check vóór livegang op domein.

#### Concepttekst voor je Akkoordverklaring / Voorwaarden:
> **Review & 3-Uurs Regel:**  
> *"Om een snelle oplevering te garanderen werkt elk traject met vaste review-momenten. Zodra een preview-link wordt gedeeld via WhatsApp, gaat een reactietijd van **3 uur** in. Ontvangen wij binnen 3 uur geen reactie, dan wordt de getoonde versie automatisch als akkoord beschouwd en bepaalt Edition One de optimale invulling voor de volgende fase. Aanpassingen aan reeds gepasseerde checkpoints of extra revisierondes na oplevering worden apart gefactureerd als meerwerk."*

### 2. Technische Uitvoering
- Eigen `/review/:projectId` pagina (hash-route `#/review/...`) met **live 3-uurs aftelklok**, Desktop/Mobiel frame en 2 knoppen (`✓ Akkoord` / `✎ Feedback doorgeven`) die via een webhook direct een WhatsApp-ping naar jou sturen.

---

## nr. 11 — Sterkere Marketing- & Conversieteksten

- *"Your website is more than a digital business card — let it speak and sell for you 24/7."*
- *"Visitors decide whether they trust your business in 0.05 seconds. Make those milliseconds count."*
- *"Stop guessing what your next website could look like — test your brand name inside 9 live design worlds right now."*
- *"No endless agency timelines or vague PDF quotes. Receive your tailored website plan and clickable live concept within 24 hours."*

---

## nr. 12 — Interactieve Fictieve Demo One-Pagers (Klant-Sandbox met Gratis API's)

1. **Vaste Demo Showcase Bar bovenaan elke demo:**
   - `← Back to Edition One` · `Live Interactive Demo · Built by Edition One` · invoerveld `"Your business name..."` · knop `Build this for my business →`.
2. **Strikte koppeling aan de 9 stijlen uit `03 · Interactive Lab`:** Elke demo draait binnen de vaste 9 stijlen zonder extra stijlverwarring.
3. **Demo-concepten:**
   - **Demo A (Prioriteit #1): Garage / Autobedrijf One-Pager + Échte RDW APK-Check** (`opendata.rdw.nl/resource/m9d7-ebf2.json`).
   - **Demo B: Hovenier / Dakdekker / Schilder** (PDOK Postcode API + Open-Meteo Weer API + m²-calculator).
   - **Demo C: Horeca / Beachclub** (Open-Meteo Terrasweer + Menu + WhatsApp reserveren).
   - **Demo D: Kapsalon / Coach** (Behandelkiezer + Agenda + Reviews widget).
   - **Demo E: Lokale D2C Webshop** (WhatsApp-Commerce catalogus geïnspireerd op Deen Clothing).

---

## nr. 13 — Overall Beoordeling & Geadviseerde Uitvoeringsvolgorde

### Kernconclusie
De combinatie van een realistische 24-uurs conceptbelofte (`nr. 16`), harde Nederlandse praktijkcases (`nr. 3`), een gepersonaliseerde verkoop-playground (`nr. 5` t/m `nr. 7`), live API-demo's (`nr. 12`) en strakke procesbewaking (`nr. 10b` & `nr. 30`) vormt een ijzersterke basis om bezoekers direct om te zetten in betalende klanten.

### Aanbevolen Bouwvolgorde (3 Sprints)
1. **Bouwronde 1 — Rebranding, Hero & Vertrouwen (`Edition One` + `nr. 1` + `nr. 3` + `nr. 15` + `nr. 16`):**
   - Volledige rebranding van `FORMA` naar **Edition One** + tijdzone `Europe/Amsterdam`.
   - Hero-witruimte strak trekken + **3-vragen Stijl-Keuzehulp** (`nr. 15`) + realistische 24u-conceptbelofte (`nr. 16`).
   - Sectie *Selected Client Launches* bouwen met de 3 echte klantcases (`nr. 3`).
2. **Bouwronde 2 — Playground als Verkoopmachine & Werkende Flow (`nr. 5` + `nr. 6` + `nr. 7` + `nr. 9` + `nr. 10a` + `nr. 17`):**
   - Eigen merknaam-invoer, Desktop/Mobile toggle en `Share combo` URL toevoegen aan Sectie 03.
   - `SprintBookingDrawer` voorzien van echte verzending, 5-minuten intake (`nr. 17`), directe *"Send brief via WhatsApp →"* actie, en complete NL/EU footer.
3. **Bouwronde 3 — Live URL Slider, API Demo One-Pagers & Review Portal (`nr. 14` + `nr. 19` + `nr. 12` + `nr. 10b`):**
   - Live Website URL *Before/After* slider met Google PageSpeed score.
   - Eerste interactieve one-pager bouwen (**Garage / RDW APK-Check**) inclusief `Built by Edition One` balk + `/review` checkpoint-pagina met 3-uurs aftelklok.

---

## nr. 14 t/m nr. 18 — Conversie-, Intake- & Zelf-Demo Uitbreidingen

| Nr. | Onderwerp | Kernfunctie & Doel | Prioriteit |
| :--- | :--- | :--- | :--- |
| **nr. 14** | Live URL Before/After Slider | Bezoeker vult eigen URL in en vergelijkt zijn huidige site live met een automatisch gegenereerde Edition One-versie | Hoog |
| **nr. 15** | 3-Vragen Stijl-Keuzehulp (Hero-overgang) | Vult de Hero-overgang (`nr. 1`) met een 3-stappen popup + directe keuzes naar `12 Directions` of `Playground` | Hoog |
| **nr. 16** | Realistische 24u-belofte + Slot-indicator | Verschuift *"live in 24h"* naar *"Persoonlijk websiteplan & eerste live-concept binnen 24 uur"* + echte weekbeschikbaarheid | Hoog |
| **nr. 17** | 5-Minuten Content Intake | Snelle intake-flow (logo, Google Bedrijfsprofiel-link, 3 kernpunten, WhatsApp) om wachttijd na boeking te elimineren | Hoog |
| **nr. 18** | "Trojan Horse" Modules op eigen site | Bezoekers gebruiken WhatsApp Smart-Fill, Reviews en de 24/7 AI-assistent ongemerkt zelf op Edition One's eigen site | Midden |

### Technische & Commerciële Uitwerking

#### nr. 14 — Live Website URL-Transformatie (`Before / After` Slider)
- **Werking:** Bezoeker vult zijn bestaande domeinnaam in (bijv. `www.bedrijf.nl`).
- **Links (`Before`):** Via een lichte screenshot/metadata-API (zoals *Microlink API* of een serverless screenshot-endpoint) wordt een actuele schermafbeelding van de huidige website opgehaald.
- **Rechts (`After`):** Dezelfde koppeling leest automatisch bedrijfsnaam, H1-kop, omschrijving en merkkleur uit en plaatst die live in een strak Edition One-template. Met één sleepbeweging ziet de ondernemer zijn eigen merk getransformeerd.

#### nr. 15 — 3-Vragen Stijl-Keuzehulp in de Hero-overgang
- **Locatie:** In de overgangsruimte onderaan de Hero (`nr. 1`), als compacte glazen keuzebalk boven Sectie 2.
- **Flow:**
  - Primaire actie opent een compacte **3-vragen popup** (*Branche → Hoofddoel → Gewenste sfeer*) en geeft direct één passende aanbeveling (bijv. *Direction 02 + Glassmorphism*) met een 1-klik knop naar de Playground.
  - Daarnaast twee directe knoppen voor bezoekers die zelf willen ontdekken: `Bekijk 12 Richtingen ↓` en `Open Playground ↓`.

#### nr. 16 — Herpositionering van de 24-Uurs Belofte & Beschikbaarheid
- **Belofte-aanpassing:** Vervang *"Website live in 24 uur"* op alle plekken door **"Jouw websiteplan & eerste interactieve live-concept binnen 24 uur"** (volledige oplevering binnen 2–5 werkdagen conform `prijsmodel-en-modulaire-opties.md`). Dit voorkomt misverstanden over domeinverhuizingen en maakt de belofte 100% geloofwaardig.
- **Beschikbaarheid:** Subtiele indicator in de drawer/header (*"Next 24h concept slot: Thursday · 2 spots left this week"*).

#### nr. 17 — 5-Minuten Content Intake
- Direct gekoppeld na het insturen van een aanvraag: begeleid invulscherm voor logo-upload, Google Bedrijfsprofiel-URL (voor automatische overname van adres, openingstijden en reviews), 3 kernpunten en WhatsApp-nummer.

#### nr. 18 — Eigen Modules als Live Verkoopbewijs ("Trojan Horse")
- Bouw de belangrijkste add-ons uit `prijsmodel-en-modulaire-opties.md` direct in op de eigen Edition One-website, zodat bezoekers ze eerst zelf ervaren en pas daarna een subtiele studio-tag zien:
  1. **WhatsApp Smart-Fill:** Vooringevuld aanvraagbericht + subtiel label (*"⚡ Dit is Edition One's WhatsApp-module — ook voor jouw site"*).
  2. **24/7 Edition One AI-Assistent:** Beantwoordt vragen over werkwijze en opties op de site zelf, met verwijzing naar de eigen AI-bot module (`€ 14,50/mnd`).
  3. **Google Reviews & Social Proof:** Direct verwerkt in de vertrouwenssectie.

---

## nr. 19 t/m nr. 22 — Onderscheidende USPs & Live API's op Eigen Site

| Nr. | Onderwerp | Kernfunctie & Commercieel Doel | Prioriteit |
| :--- | :--- | :--- | :--- |
| **nr. 19** | Live Google PageSpeed Check (in `nr. 14`) | Haalt bij URL-invoer direct de echte mobiele snelheidsscore (0–100) van de huidige site op naast Edition One's 98+ score | Hoog |
| **nr. 20** | "WhatsApp-to-Live" & "Geen Wurggreep" USPs | Unieke positionering: wijzigingen doorgeven via spraakbericht/appje + na 12 mnd maandelijks opzegbaar of overneembaar | Hoog |
| **nr. 21** | KVK & Google Bedrijfsprofiel Autocomplete | Bedrijfsnaam intypen in drawer/intake vult automatisch adres, openingstijden, KVK en reviews in | Midden |
| **nr. 22** | Subtiele Regio-personalisatie (Edge Geo) | Toont automatisch een lokale vertrouwensregel afgestemd op de regio/stad van de bezoeker zonder locatie-popup | Laag |

### Uitwerking per punt
- **nr. 19 · Google PageSpeed Insights API (Gratis):** Versterkt de *Before/After URL Slider* (`nr. 14`) met harde cijfers. Bezoekers zien niet alleen dat hun huidige site gedateerd oogt, maar ook dat ze mobiele bezoekers verliezen door een lage Google-snelheidsscore.
- **nr. 20 · Anti-Bureau USPs:** Onderscheidt Edition One van zowel trage bureaus als wurgcontract-aanbieders: (1) Klikbaar live-concept binnen 24u i.p.v. saaie PDF-offertes, (2) aanpassingen via WhatsApp/spraakbericht i.p.v. een ingewikkeld CMS, en (3) transparant eigendom na de eerste 12 maanden.
- **nr. 21 · Slimme Intake-API's:** Door KVK-data en Google Bedrijfsprofiel-gegevens automatisch op te halen bij aanvraag (`nr. 17`), ervaart de klant direct de technische kwaliteit van Edition One terwijl jij alle gegevens foutloos binnenkrijgt.
- **nr. 22 · Edge IP-Geolocatie:** Een lichte server-header leest de stad/regio van de bezoeker uit voor een subtiele lokale accentregel (*"Ready for ambitious businesses in [Region]"*), zonder privacy-intrusieve browser-popups.

---

## nr. 23 t/m nr. 25 — Beveiliging, Anti-Scraping & 20-Punten SEO / AI-SEO Checklist

| Nr. | Onderwerp | Kernfunctie & Doel | Prioriteit |
| :--- | :--- | :--- | :--- |
| **nr. 23** | Security, HTTPS & Anti-Scraping | WAF/Bot-bescherming, rate-limiting op API's/formulieren, security headers + selectieve `robots.txt` | Hoog |
| **nr. 24** | 20-Punten Technische & On-Page SEO | `sitemap.xml`, canonicals, `1x H1` hiërarchie, `og:image`, WebP-compressie, Core Web Vitals & Search Console | Hoog |
| **nr. 25** | AI SEO / GEO (`llms.txt` & Schema) | Gestructureerde JSON-LD `Schema.org` markup + `/llms.txt` zodat ChatGPT, Perplexity & Google AI Edition One aanbevelen | Hoog |

### Uitwerking & Technische Checklist

#### nr. 23 — Beveiliging & Bescherming tegen Scrapers / AI-Training
- **Selectieve Bot-sturing (`robots.txt`):** Sta zoek- en antwoordbots toe (`Googlebot`, `Bingbot`, `OAI-SearchBot`, `PerplexityBot`), maar blokkeer ongewenste bulk-scrapers en trainingsbots (`CCBot`, `Bytespider`, `GPTBot`).
- **Edge Firewall & Rate Limiting:** Schakel op hosting/CDN-niveau (Cloudflare / Vercel) Bot-bescherming en rate-limiting in tegen geautomatiseerd scrapen.
- **API & Formulier-beveiliging:** Bescherm toekomstige endpoints (PageSpeed, KVK, RDW, WhatsApp-webhook) met CORS-restricties, rate-limits en honeypot-velden.
- **Hardening & HTTPS (`Punt 16`):** Forceer HTTPS (HSTS), zet `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` en schakel productie source maps uit.

#### nr. 24 — Complete SEO-Basis (Checklist Punten 1 t/m 19)
- **Crawl & Indexatie:** `sitemap.xml` (`1`), `robots.txt` (`2`), geen onbedoelde `noindex`-tags (`3`), `<link rel="canonical">` (`4`), schone URL-slugs (`17`) en aanmelding bij Google Search Console + Bing Webmaster Tools (`19`).
- **Meta & Social Sharing:** Unieke `<title>` (`5`), `<meta name="description">` (`6`) en een strakke `1200×630` `og:image` (`18`) voor previews bij delen via WhatsApp en LinkedIn.
- **Semantiek & Links:** Strikt één `<h1>` per pagina (`7`), logische `H2 → H3` koppenvolgorde (`8`), beschrijvende `alt`-teksten op alle case- en productafbeeldingen (`9`), sterke interne links (`11`) en nul gebroken links (`12`).
- **Snelheid & Mobiel:** Gecomprimeerde WebP-afbeeldingen met vaste dimensies (`13`), groene Core Web Vitals (`14`) en foutloze mobiele weergave vanaf `360px` (`15`).

#### nr. 25 — AI SEO & Vindbaarheid in LLM's (`Punt 10` & `Punt 20`)
- **`/llms.txt` (`20`):** Statisch Markdown-bestand in `public/` met een heldere samenvatting van Edition One's diensten, 12 designrichtingen, klantcases, modulaire opties en contactroutes — direct leesbaar voor AI-agents zonder zware JS/Canvas-parsing.
- **JSON-LD Schema Markup (`10`):** Gestructureerde `WebDesign` / `ProfessionalService` + `FAQPage` schema-data in `index.html` voor maximale herkenning in Google Rich Results en AI-antwoorden.

---

## nr. 26 t/m nr. 29 — Operations, Domein-Onboarding & Groei-Mechanieken

| Nr. | Onderwerp | Kernfunctie & Commercieel Doel | Prioriteit |
| :--- | :--- | :--- | :--- |
| **nr. 26** | SEPA Incasso & 1-Klik Contract | Automatische maandelijkse incasso (Mollie/Stripe) + digitaal akkoord op 12-mnd termijn & 3-uurs reviewregel | Hoog |
| **nr. 27** | Domein- & Verhuis-Assistent (in `nr. 17`) | Automatische check op huidige domeinprovider/beschikbaarheid om technische verhuisangst bij MKB'ers weg te nemen | Midden |
| **nr. 28** | Ondernemers Referral-Programma | Na oplevering: *"Draag een collega-ondernemer aan = allebei 1 maand gratis of 1 gratis add-on module"* | Midden |
| **nr. 29** | NFC / QR "Live Pitch Mode" | Directe URL-snelkoppeling naar de Live Style Playground voor live demo's op locatie of tijdens netwerkgesprekken | Laag |

### Uitwerking per punt
- **nr. 26 · Volautomatische Abonnementsadministratie:** Voorkomt handmatig factuurwerk bij maandtarieven vanaf € 35/mnd. Eerste betaling via iDEAL machtigt direct voor maandelijkse SEPA-incasso, gekoppeld aan digitaal akkoord op de sprint- en revisievoorwaarden.
- **nr. 27 · Zero-Stress Domeinoverdracht:** Via een lichte RDAP/DNS-lookup in de intake ziet Edition One direct waar een bestaand domein geregistreerd staat, zodat de klant geen technische vragen hoeft te beantwoorden.
- **nr. 28 · Lokale Mond-tot-Mond Versneller:** Benut het sterke lokale netwerk van huidige klanten (zoals salons, rijscholen en winkels) voor warme aanbevelingen met lage acquisitiekosten.
- **nr. 29 · Mobiele Pitch-Modus:** Opent met één scan of tap direct de Playground op mobiel zonder eerst door de Hero te hoeven scrollen — ideaal voor live verkoopgesprekken.

---

## nr. 30 — AVG-Conform Klantgegevens-, Account- & Wachtwoordbeleid

| Nr. | Onderwerp | Kernfunctie & Commercieel Doel | Prioriteit |
| :--- | :--- | :--- | :--- |
| **nr. 30** | AVG-Proof Account- & Credentialbeleid | Standaard nieuwe gescheiden accounts aanmaken + versleutelde wachtwoordoverdracht zonder WhatsApp/mail-risico | Hoog |

### Vaste Studio-Richtlijnen (Privacy by Design)
1. **Standaard Nieuw Account Aanmaken:**
   - Voor elk nieuw project en elke externe dienst (hosting, DNS, zakelijke e-mail, analytics, koppelingen) wordt standaard een **nieuw, gescheiden account** aangemaakt (of wordt Edition One uitgenodigd als beheerder met afgebakende rechten).
   - Bestaande privé- of hoofdwachtwoorden van de klant worden **nooit** opgevraagd of gebruikt.
2. **Zero-Plaintext Overdracht (Geen wachtwoorden via WhatsApp of E-mail):**
   - Tijdelijke inloggegevens, API-keys en verhuiscodes (EPP) worden uitsluitend gedeeld via een versleutelde wachtwoordmanager (Bitwarden / 1Password) of een eenmalige zelfvernietigende deellink, nooit als platte tekst in chat of mail.
   - Waar mogelijk wordt direct meerfactorauthenticatie (2FA/MFA) geactiveerd.
3. **Dataminimalisatie & Beheer na Oplevering:**
   - In de intake (`nr. 17`) worden uitsluitend noodzakelijke bedrijfsgegevens uitgevraagd. Tijdelijke toegangen worden na livegang direct ingetrokken of overgedragen.
4. **Verwerkersclausule & Verwerkingsregister:**
   - Standaard AVG-verwerkersbepaling opnemen in de algemene voorwaarden voor hosting, formulierafhandeling en zakelijk e-mailbeheer, plus een compact intern verwerkingsregister van gebruikte subverwerkers.

---

## nr. 31 — Merkimago, Positionering & Tone of Voice (`Edition One`)

| Nr. | Onderwerp | Kernfunctie & Commercieel Doel | Prioriteit |
| :--- | :--- | :--- | :--- |
| **nr. 31** | Merkimago & Positionering (`Edition One`) | Eenduidige studio-identiteit (*Editorial Design Studio* + Nederlandse snelheid) doorvoeren in copy, footer & klantcontact | Hoog |

### Gekozen Positionering & Merkpijlers
- **Merknaam & Domein:** **Edition One** (`editionone.nl`) — straalt exclusiviteit en eerste-druk vakmanschap uit en sluit naadloos aan op een eerste werkend live-concept binnen 24 uur.
- **Kernidentiteit:** Combineert de rust en verfijning van een internationaal ontwerphuis (warm albaster, grafiet-inkt, amber-goud) met Nederlandse nuchterheid, snelheid en directe bereikbaarheid.
- **Hoofdbelofte:** *"Design van topniveau zonder bureau-gedoe — binnen 24 uur een werkend live-concept met jouw eigen merknaam, en daarna beheer via een simpel appje."*
- **Tone of Voice:**
  - Helder, rustig en zonder technisch vakjargon (focus op vertrouwen, snelheid en klantconversie i.p.v. code-termen).
  - Eerlijke studio-afzender: `Edition One · Netherlands · Crafted for Modern Business`.
- **Merkbeleving in de praktijk:**
  - **Show, Don't Tell:** Elke prospect ervaart Edition One's kwaliteit al vóór aankoop via de gepersonaliseerde Playground, live URL-vergelijking en het 24-uurs concept.
  - **Signature Detail & Footprints:** Elke opgeleverde website krijgt een merkgerichte micro-animatie (zoals de route-loader bij Rijschool Vreugdenhil) en een subtiele `Crafted by Edition One` vermelding in de footer.
  - **Verzorgd WhatsApp Business-profiel:** Zakelijk profiel met Edition One kompas-logo, directe Playground-link en overzichtelijke pakketinformatie.

---

## nr. 32 — Beveiligde AI-Chatbot Architectuur & Branche-Templates

| Nr. | Onderwerp | Kernfunctie & Commercieel Doel | Prioriteit |
| :--- | :--- | :--- | :--- |
| **nr. 32** | AI Chatbot Security & Branche-Blauwdrukken | Gesloten kennisbestand (geen live scraping), lage `temperature`, prompt-injection filter + 5 kant-en-klare branche-templates | Hoog |

### Technische & Operationele Aanpak
- **Geen Live Scraping & Strict Grounding:** De AI-bot (zowel voor Edition One zelf als voor de `€ 14,50/mnd` klantmodule) krijgt **geen** internet- of crawler-toegang. Hij leest uitsluitend één goedgekeurd Markdown-kennisbestand met een lage `temperature` (`0.1–0.2`) en een strikt verbod om prijzen, acties of beloftes aan te vullen.
- **Prompt-Injection Bescherming:** Gebruikersinvoer wordt op de server gescheiden verpakt (`<user_query>`) zodat bezoekers systeemregels niet kunnen overschrijven.
- **5 Branche-Templates + 10-Vragen Invulkaart:** Voor klanten zonder eigen documentatie gebruikt Edition One vooraf gebouwde Q&A-blauwdrukken per sector (*Salons & Local*, *Advisory & B2B*, *Retail & Webshops*, *Sports & Events*, *Tech & Products*), aangevuld met website-copy, Google Bedrijfsprofiel-data en een korte 10-vragen checklist. Ontbrekende antwoorden leiden automatisch tot een warme doorverwijzing naar WhatsApp.