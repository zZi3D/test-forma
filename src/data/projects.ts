export type IndustryFilter =
  | 'Advisory & B2B'
  | 'Salons & Local'
  | 'Retail & Webshops'
  | 'Tech & Products'
  | 'Sports & Events';

export const INDUSTRY_FILTERS: IndustryFilter[] = [
  'Advisory & B2B',
  'Salons & Local',
  'Retail & Webshops',
  'Tech & Products',
  'Sports & Events',
];

export type ProjectCategory = IndustryFilter;
export const PROJECT_CATEGORIES: IndustryFilter[] = INDUSTRY_FILTERS;

export type UiStyle =
  | 'swiss-minimalism'
  | 'dark-neumorphism'
  | 'modular-bento'
  | 'cyberpunk-glass'
  | 'new-age-gradient'
  | 'dark-kinetic'
  | 'claymorphism'
  | 'skeuomorphism'
  | 'organic-biophilic'
  | 'neo-brutalism'
  | 'bento-editorial'
  | 'dopamine-commerce';

export interface ProjectPalette {
  bg: string;
  surface: string;
  text: string;
  accent: string;
  secondary: string;
}

export interface MockupPreviewContent {
  masthead: string;
  navItems: string[];
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  metrics: { label: string; value: string }[];
  cardLabels: string[];
  quote?: string;
}

export interface DesignDirection {
  id: string;
  index: string;
  businessTitle: string;
  styleSubtitle: string;
  targetBusinesses: string;
  industries: IndustryFilter[];
  bestMatchFor: IndustryFilter[];
  problemSolved: string;
  bestFor: string[];
  visualCharacteristics: string[];
  typographyNote: string;
  uiStyle: UiStyle;
  palette: ProjectPalette;
  previewSample: MockupPreviewContent;
  linkedDemoId?: string;
  linkedDemoLabel?: string;
}

export type ProjectConfig = DesignDirection;
export type ProjectItem = DesignDirection;

/**
 * CENTRAL WEBSITE DESIGN DIRECTIONS (01 – 12)
 * Ordered sequentially for the 3D Hero Wheel, 4×3 Grid, and /directions page.
 */
export const PROJECTS: DesignDirection[] = [
  // =========================================================================
  // 01 — AUTOMOTIVE & RDW SERVICE (Warm Bone & Crimson · #F3ECE1) [was 10]
  // =========================================================================
  {
    id: 'automotive-rdw',
    index: '01',
    businessTitle: 'Automotive & RDW Service',
    styleSubtitle: 'Warm Bone & Crimson',
    targetBusinesses: 'Garages, MOT Stations & Specialists',
    industries: ['Salons & Local', 'Tech & Products'],
    bestMatchFor: ['Tech & Products'],
    linkedDemoId: 'demo-garage',
    linkedDemoLabel: 'Demo 01 · Garage',
    problemSolved:
      'Drivers hesitate to book service online when garages look outdated or hide vehicle pricing. Combining warm industrial typography with a live Dutch RDW license plate & MOT lookup builds instant technical confidence and turns car owners into booked service bays.',
    bestFor: [
      'Independent Garages & MOT Stations',
      'Brake, Suspension & Timing Specialists',
      'EV & Hybrid Diagnostic Workshops',
      'Multi-Bay Automotive Service Centers',
    ],
    visualCharacteristics: [
      'Warm bone #F3ECE1 & workshop crimson #B8291E',
      'Floating white capsule header & brake rotor showcase',
      'Interactive Dutch yellow license plate RDW lookup',
      'Live MOT validity date & recall check before booking',
    ],
    typographyNote: 'Technical Outfit Sans + Tabular Plate Mono',
    uiStyle: 'skeuomorphism',
    palette: {
      bg: '#F3ECE1',
      surface: '#FFFFFF',
      text: '#1C1C1C',
      accent: '#B8291E',
      secondary: '#6E6961',
    },
    previewSample: {
      masthead: 'KORVER AUTO',
      navItems: ['SERVICES', 'MOT CHECK', 'PRICING', 'BOOK BAY →'],
      eyebrow: 'BAYS 1–4 · MOT LANE · 4.9★ GOOGLE',
      headline: 'Repairs & MOT, Done to Spec.',
      subheadline:
        'Brakes, diagnostics & factory-spec maintenance paired with live Dutch RDW license plate lookup.',
      ctaLabel: 'BOOK MOT FOR THIS CAR →',
      metrics: [
        { label: 'MAKE & MODEL', value: 'AUDI A5 AVANT' },
        { label: 'MOT EXPIRY', value: '01-10-2030' },
        { label: 'OPEN RECALL', value: 'NONE · CLEAR' },
      ],
      cardLabels: ['KXT-67-P', '91-LBL-6', 'KXT-67-S'],
    },
  },

  // =========================================================================
  // 02 — BARBERSHOP & GROOMING (Barber Red & Charcoal · Dark #1C1C1C) [was 02]
  // =========================================================================
  {
    id: 'noir-luxury',
    index: '02',
    businessTitle: 'Barbershop & Grooming',
    styleSubtitle: 'Barber Red & Charcoal',
    targetBusinesses: 'Barbershops, Salons & Grooming',
    industries: ['Salons & Local'],
    bestMatchFor: ['Salons & Local'],
    linkedDemoId: 'demo-barber',
    linkedDemoLabel: 'Demo 03 · Barber',
    problemSolved:
      'Local barbershops and grooming studios lose bookings on generic template sites that undersell their craft. A matte charcoal look with atmospheric Barber Red backlight, Google 4.9★ reviews, and instant WhatsApp chair booking turns visitors into booked chairs.',
    bestFor: [
      'Barbershops & Men’s Grooming Studios',
      'Fade & Beard Sculpting Specialists',
      'Hair Salons & Color Studios',
      'Private Spas & Tattoo Ateliers',
    ],
    visualCharacteristics: [
      'Matte charcoal #1C1C1C with Barber Red #B3261E glow',
      'Liquid-wave capsule header & studio portrait frame',
      'Clear service menu with Fade, Hot Towel & Combo',
      'Interactive Google 4.9★ reviews & WhatsApp chair slot',
    ],
    typographyNote: 'Bold Oswald Display + Clean DM Sans',
    uiStyle: 'dark-neumorphism',
    palette: {
      bg: '#1C1C1C',
      surface: '#252528',
      text: '#EDE6D8',
      accent: '#B3261E',
      secondary: '#A39C8E',
    },
    previewSample: {
      masthead: 'NOORD BARBERS',
      navItems: ['SERVICES', 'GALLERY', 'REVIEWS', 'BOOK CHAIR'],
      eyebrow: '4.9 ★ · 320+ VERIFIED GOOGLE REVIEWS',
      headline: 'A Cut That Speaks for Itself.',
      subheadline:
        'Precision fades, hot towel shaves, and WhatsApp chair booking built to keep every barber chair filled.',
      ctaLabel: 'CONFIRM VIA WHATSAPP →',
      metrics: [
        { label: 'KNIPPEN & FADEN · 35M', value: '€34' },
        { label: 'BAARD & HOT TOWEL · 25M', value: '€26' },
        { label: 'COMPLETE BEHANDELING · 55M', value: '€54' },
      ],
      cardLabels: ['FADE & SCISSOR', 'HOT TOWEL', 'FULL RITUAL'],
    },
  },

  // =========================================================================
  // 03 — FASHION & EYEWEAR DROP (Blush Wine Atelier · Soft Blush #F6CBD4) [was 05]
  // =========================================================================
  {
    id: 'soft-aura-atelier',
    index: '03',
    businessTitle: 'Fashion & Eyewear Drop',
    styleSubtitle: 'Blush Wine Atelier',
    targetBusinesses: 'Fashion Labels, Eyewear & Boutiques',
    industries: ['Retail & Webshops', 'Salons & Local'],
    bestMatchFor: ['Retail & Webshops', 'Salons & Local'],
    linkedDemoId: 'demo-fashion',
    linkedDemoLabel: 'Demo 05 · Fashion',
    problemSolved:
      'Fashion capsules and style boutiques lose their allure in rigid white grids. Editorial blush-rose framing, deep wine contrast, and a vibrant Kelly-green instant drop selector build desire and convert visitors straight via WhatsApp or quick bag.',
    bestFor: [
      'Fashion & Eyewear Capsule Drops',
      'Independent Clothing Boutiques',
      'Personal Stylists & Bridal Studios',
      'Curated Interior & Perfume Showrooms',
    ],
    visualCharacteristics: [
      'Soft blush #F6CBD4 & deep wine #4A0F24 contrast',
      'Kelly green #2DC92A high-pop Bag & Drop CTA',
      'Arched editorial lookbook frame with Solaris shield motif',
      'Floating colorway swatch & frame fit selector card',
    ],
    typographyNote: 'High-Contrast Serif + Refined Sans',
    uiStyle: 'new-age-gradient',
    palette: {
      bg: '#F6CBD4',
      surface: '#4A0F24',
      text: '#4A0F24',
      accent: '#2DC92A',
      secondary: '#7D3950',
    },
    previewSample: {
      masthead: 'STUDIO VESPER',
      navItems: ['SUNGLASSES', 'OPTICAL', 'DROPS', 'BAG (1)'],
      eyebrow: 'THE SUMMER CAPSULE · LIMITED DROP',
      headline: 'Solaris Edition',
      subheadline:
        'Mirrored UV400 shield acetate, studio colorway swatches & instant WhatsApp drop checkout.',
      ctaLabel: 'SHOP SOLARIS DROP →',
      metrics: [
        { label: 'LENS SPEC', value: 'UV400 SHIELD' },
        { label: 'FRAME FIT', value: '52MM / 56MM' },
        { label: 'STUDIO STOCK', value: '7 PIECES' },
      ],
      cardLabels: ['KELLY GREEN', 'DEEP WINE', 'BLUSH MIRROR'],
    },
  },

  // =========================================================================
  // 04 — SPECIALTY CAFÉ & TERRACE (Latte Cream & Espresso · #EFE2CF) [was 04]
  // =========================================================================
  {
    id: 'specialty-cafe-terrace',
    index: '04',
    businessTitle: 'Specialty Café & Terrace',
    styleSubtitle: 'Latte Cream & Espresso',
    targetBusinesses: 'Cafés, Bakeries & Hospitality',
    industries: ['Salons & Local', 'Retail & Webshops'],
    bestMatchFor: ['Salons & Local'],
    linkedDemoId: 'demo-horeca',
    linkedDemoLabel: 'Demo 04 · Horeca',
    problemSolved:
      'Neighborhood cafés and restaurants hide their menu inside clunky PDFs and miss spontaneous foot traffic. Rich espresso-on-cream storytelling paired with live Open-Meteo terrace weather and a tabbed coffee & pastry menu brings guests straight to your tables.',
    bestFor: [
      'Specialty Coffee Bars & Roasteries',
      'Artisan Bakeries & Patisseries',
      'All-Day Brunch & Canal Brasseries',
      'Neighborhood Bistros & Wine Bars',
    ],
    visualCharacteristics: [
      'Latte cream #EFE2CF & roasted espresso #4A2C1D',
      'Warm honey mustard #E0A526 highlights & table CTA',
      'Centered brasserie crest header & condensed typography',
      'Live Open-Meteo terrace check & interactive menu tabs',
    ],
    typographyNote: 'Bold Condensed Display + Warm Sans',
    uiStyle: 'cyberpunk-glass',
    palette: {
      bg: '#EFE2CF',
      surface: '#FAF4EA',
      text: '#4A2C1D',
      accent: '#E0A526',
      secondary: '#7D5A47',
    },
    previewSample: {
      masthead: 'CAFÉ KORNELIS',
      navItems: ['MENU', 'OUR STORY', 'LOCATIONS', 'BOOK A TABLE ↗'],
      eyebrow: 'THIS MONTH · CROISSANT + COFFEE −15%',
      headline: 'COFFEE & CROISSANT',
      subheadline:
        'Single-origin espresso, flaky pastries & live Open-Meteo canal terrace weather for three Dutch cities.',
      ctaLabel: 'EXPLORE MENU →',
      metrics: [
        { label: 'DOUBLE FLAT WHITE', value: '€ 4,20' },
        { label: 'CROISSANT + CAPPUCCINO', value: '€ 7,50' },
        { label: 'ROASTED ALMOND CROISSANT', value: '€ 4,60' },
      ],
      cardLabels: ['COFFEE', 'BREAKFAST', 'PASTRY'],
    },
  },

  // =========================================================================
  // 05 — BOUTIQUE GYM (Dark Performance Studio · Charcoal & Ember #EA580C) [was 06]
  // =========================================================================
  {
    id: 'kinetic-performance',
    index: '05',
    businessTitle: 'Boutique Gym',
    styleSubtitle: 'Dark Performance Studio',
    targetBusinesses: 'Gyms, Trainers & Personal Coaching',
    industries: ['Sports & Events', 'Tech & Products'],
    bestMatchFor: ['Sports & Events'],
    problemSolved:
      'Exclusieve sportstudio’s en personal trainers missen proeflessen wanneer hun website oogt als een generieke prijsvechter. Sfeervolle donkere interieurfotografie met krachtig oranje accent brengt rust, focus en directe proefles-aanvragen.',
    bestFor: [
      'Boutique Strength & PT Studio’s',
      'Personal Trainers & Athletic Coaches',
      'Small-Group Conditioning Clubs',
      'Performance & Recovery Centers',
    ],
    visualCharacteristics: [
      'Donkere studiofoto met warme spiegelverlichting',
      'Scherp contrast met oranje #EA580C actieknoppen',
      'Overzicht voor roosters, trainers en programma’s',
      'Directe proefles-knop boven de vouw',
    ],
    typographyNote: 'Bold Display Sans + Technical Mono',
    uiStyle: 'dark-kinetic',
    palette: {
      bg: '#111113',
      surface: '#1C1B1A',
      text: '#F5F2EB',
      accent: '#EA580C',
      secondary: '#A1A1AA',
    },
    previewSample: {
      masthead: 'BOUTIQUE GYM',
      navItems: ['ROOSTERS', 'PROGRAMMA', 'TRAINERS', 'TRAIN GRATIS MEE'],
      eyebrow: 'BOUTIQUE GYM & PERSONAL TRAINING',
      headline: 'Train op jouw niveau, zonder drukte.',
      subheadline:
        'Persoonlijke begeleiding en kleine groepen in een rustige, luxe trainingsruimte.',
      ctaLabel: 'PLAN PROEFLES →',
      metrics: [
        { label: 'GROEPEN', value: 'MAX 8 PERS.' },
        { label: 'COACHING', value: '1-OP-1 FOCUS' },
        { label: 'OPENING', value: '06:00 – 22:00' },
      ],
      cardLabels: ['STRENGTH STUDIO', '1-ON-1 COACHING', 'SMALL GROUP'],
    },
  },

  // =========================================================================
  // 06 — HIGH-CONVERTING WEBSHOP (Dopamine Commerce · Vibrant Cream #FFFDF7) [was 01]
  // =========================================================================
  {
    id: 'dopamine-commerce',
    index: '06',
    businessTitle: 'High-Converting Webshop',
    styleSubtitle: 'Dopamine Commerce',
    targetBusinesses: 'Treat & Gift Shops, D2C Stores',
    industries: ['Retail & Webshops'],
    bestMatchFor: ['Retail & Webshops'],
    linkedDemoId: 'demo-candyshop',
    linkedDemoLabel: 'Demo 06 · Candy Pop',
    problemSolved:
      'Boring online stores struggle to justify impulse purchases or bundle upsells. Playful color pops, social-proof review pills, and instant add-to-bag actions spark excitement and lift average order value.',
    bestFor: [
      'Treat, Confectionery & Snack Shops',
      'Curated Gift Boxes & Stationery Stores',
      'Direct-to-Consumer Food & Drink Brands',
      'Subscription Boxes & Retail Launches',
    ],
    visualCharacteristics: [
      'Candy-bright pink, lemon, mint & cobalt accents',
      'Subtle pop-art halftone dots & bestseller sticker',
      'Chunky two-tone display typography',
      'Social-proof review cards & one-tap €28 checkout',
    ],
    typographyNote: 'Chunky Rounded Display + Crisp Sans',
    uiStyle: 'dopamine-commerce',
    palette: {
      bg: '#FFFDF7',
      surface: '#FFE4EC',
      text: '#1C1917',
      accent: '#FF3B6B',
      secondary: '#2563EB',
    },
    previewSample: {
      masthead: 'GOODS & TREATS',
      navItems: ['SHOP ALL', 'GIFT BOXES', 'REVIEWS', 'BAG (2)'],
      eyebrow: 'BESTSELLER · LIMITED BATCH',
      headline: 'Daily Joy, Delivered.',
      subheadline:
        'Playful product cards, bright pops & one-tap checkout.',
      ctaLabel: 'ADD TO BAG — €28 →',
      metrics: [
        { label: 'RATED', value: '4.9 ★ (2.4K)' },
        { label: 'DISPATCH', value: 'SAME DAY' },
        { label: 'PACKAGING', value: 'GIFT WRAPPED' },
      ],
      cardLabels: ['TREATS', 'GIFT BOXES', 'LIMITED'],
    },
  },

  // =========================================================================
  // 07 — ARCHITECTURE & OUTDOOR CRAFT (Midnight Pine & Copper · #162921) [was 09]
  // =========================================================================
  {
    id: 'architectural-outdoor',
    index: '07',
    businessTitle: 'Architecture & Outdoor Craft',
    styleSubtitle: 'Midnight Pine & Copper',
    targetBusinesses: 'Landscapers, Architects & Roofing',
    industries: ['Advisory & B2B', 'Salons & Local'],
    bestMatchFor: ['Advisory & B2B'],
    linkedDemoId: 'demo-buitenwerk',
    linkedDemoLabel: 'Demo 02 · Architecture',
    problemSolved:
      'Architectural landscapers and bespoke roofing studios undersell €10k–€50k projects on generic contractor sites. Midnight pine editorial framing paired with live Dutch PDOK address lookup, 3-day build weather, and a transparent m² estimator pre-qualifies serious homeowners.',
    bestFor: [
      'Architectural Garden & Landscape Studios',
      'Zinc, Sedum & Custom Timber Roofers',
      'Exterior Architects & Cedar Pavilion Makers',
      'Bespoke Outdoor Living Contractors',
    ],
    visualCharacteristics: [
      'Midnight pine #162921 & warm sandstone #F3EFE6',
      'Burnished copper #C86D44 accent & editorial hairlines',
      'Live PDOK address lookup + 3-day Open-Meteo build weather',
      'Interactive scope & m² turnkey price range estimator',
    ],
    typographyNote: 'Editorial Fraunces Serif + Crisp DM Sans',
    uiStyle: 'bento-editorial',
    palette: {
      bg: '#162921',
      surface: '#F3EFE6',
      text: '#F3EFE6',
      accent: '#C86D44',
      secondary: '#9BB0A5',
    },
    previewSample: {
      masthead: 'Groeneveld',
      navItems: ['PROJECTS', 'PAVILIONS', 'WEATHER TOOL', 'ESTIMATE'],
      eyebrow: 'PDOK ADDRESS + OPEN-METEO · AMSTERDAM',
      headline: 'Architectural Gardens Built for Every Season.',
      subheadline:
        'Charred cedar pavilions, Belgian slate patios & precision zinc roofing planned around local site weather.',
      ctaLabel: 'BOOK ON-SITE SURVEY →',
      metrics: [
        { label: 'PARCEL / POSTAL', value: '1012 JS · AMSTERDAM' },
        { label: 'BUILD WEATHER', value: '14°C · CLEAR WINDOW' },
        { label: '48 M² ESTIMATE', value: '€ 5.960 – € 7.260' },
      ],
      cardLabels: ['SLATE PATIO', 'ZINC ROOFING', 'CEDAR PAVILION'],
    },
  },

  // =========================================================================
  // 08 — WARM, NATURAL & LOCAL (Organic Biophilic · Warm Linen #EFECE6) [was 07]
  // =========================================================================
  {
    id: 'organic-biophilic',
    index: '08',
    businessTitle: 'Warm, Natural & Local',
    styleSubtitle: 'Organic Biophilic',
    targetBusinesses: 'Wellness, Gift Shops & Bakeries',
    industries: ['Salons & Local', 'Retail & Webshops'],
    bestMatchFor: ['Retail & Webshops'],
    problemSolved:
      'Neighborhood bakeries, wellness studios, and handmade gift shops lose their personal warmth on cold corporate layouts. Earthy sage, linen, and terracotta tones evoke authenticity and invite local foot traffic and orders.',
    bestFor: [
      'Wellness, Yoga & Massage Studios',
      'Local Treat, Gift & Flower Shops',
      'Artisan Bakeries & Specialty Cafés',
      'Organic Skincare & Boutique Hospitality',
    ],
    visualCharacteristics: [
      'Warm linen, deep sage green & terracotta palette',
      'Soft organic shapes with subtle paper grain',
      'Warm editorial serif & friendly sans pairing',
      'Daylight product framing & trust notes',
    ],
    typographyNote: 'Warm Editorial Serif + Organic Sans',
    uiStyle: 'organic-biophilic',
    palette: {
      bg: '#EFECE6',
      surface: '#F7F5F0',
      text: '#2F4538',
      accent: '#C47451',
      secondary: '#627266',
    },
    previewSample: {
      masthead: 'SAGE & LINEN HOUSE',
      navItems: ['SHOP GOODS', 'WELLNESS', 'STORY', 'VISIT US'],
      eyebrow: 'WELLNESS, ARTISAN BAKERY & GIFTS',
      headline: 'Natural Warmth Crafted Daily.',
      subheadline:
        'Inviting earthy tones and tactile framing built for loyal local customers and online orders.',
      ctaLabel: 'RESERVE OR ORDER →',
      metrics: [
        { label: 'CRAFT', value: 'SMALL BATCH' },
        { label: 'SOURCING', value: '100% LOCAL' },
        { label: 'REVIEWS', value: '4.9 ★ LOCAL' },
      ],
      cardLabels: ['WELLNESS', 'GIFT BOXES', 'ARTISAN'],
    },
  },

  // =========================================================================
  // 09 — CREATIVE STUDIO & EVENTS (Editorial Bento Collage · Pure White #FFFFFF) [was 08]
  // =========================================================================
  {
    id: 'neo-brutalist-pop',
    index: '09',
    businessTitle: 'Creative Studio & Events',
    styleSubtitle: 'Editorial Bento Showcase',
    targetBusinesses: 'Agencies, Festivals & Cultuur',
    industries: ['Sports & Events'],
    bestMatchFor: ['Sports & Events'],
    problemSolved:
      'Creatieve bureaus, culturele podia en eventproducties moeten binnen drie seconden hun signatuur tonen. Een strakke witte bento-collage met krachtige podium- en portretfotografie maakt je portfolio direct onvergetelijk.',
    bestFor: [
      'Music Festivals, Events & Culture',
      'Creative, Brand & Film Studios',
      'Stage, Lighting & Media Agencies',
      'Exhibition & Experience Collectives',
    ],
    visualCharacteristics: [
      'Helder wit canvas met redactioneel bento-fotokader',
      'Contrastrijke rood/cyaan podium- & monochrome portretten',
      'Compacte 18+ statistiekkaart & zwart showcase-blok',
      'Strakke navigatie voor Portfolio, Media, Events & Contact',
    ],
    typographyNote: 'Bold Geometric Display + Editorial Sans',
    uiStyle: 'neo-brutalism',
    palette: {
      bg: '#FFFFFF',
      surface: '#F4F4F5',
      text: '#09090B',
      accent: '#EF4444',
      secondary: '#71717A',
    },
    previewSample: {
      masthead: 'STUDIO CULTUUR',
      navItems: ['PORTFOLIO', 'MEDIA', 'EVENTS', 'CONTACT'],
      eyebrow: 'AGENCIES, FESTIVALS & CULTUUR',
      headline: 'Merken en evenementen die blijven hangen.',
      subheadline:
        'Visueel sprekende case-collage met sprekende fotografie, compacte cijfers en snelle eventboekingen.',
      ctaLabel: 'BEKIJK PORTFOLIO →',
      metrics: [
        { label: 'PROJECTEN', value: '18+ JAAR' },
        { label: 'PRODUCTIES', value: '120+ LIVE' },
        { label: 'BEREIK', value: 'LANDELIJK' },
      ],
      cardLabels: ['PORTFOLIO', 'PODIUM & MEDIA', 'LIVE EVENTS'],
    },
  },

  // =========================================================================
  // 10 — NOTARIS & RECHT (Warm Heritage Desk · Espresso & Gold #E2AD5E) [was 03]
  // =========================================================================
  {
    id: 'swiss-minimalism',
    index: '10',
    businessTitle: 'Notaris & Recht',
    styleSubtitle: 'Heritage Notary & Legal',
    targetBusinesses: 'Notariaat & Juridisch',
    industries: ['Advisory & B2B'],
    bestMatchFor: ['Advisory & B2B'],
    problemSolved:
      'Cliënten die een huis kopen, een bedrijf oprichten of hun nalatenschap regelen zoeken direct vertrouwen en heldere uitleg. Warme kantoorfotografie met gouden accenten en overzichtelijke praktijkkaarten neemt drempels weg en nodigt uit tot kennismaking.',
    bestFor: [
      'Notariskantoren & Familierecht',
      'Advocaten & Juridisch Advies',
      'Vastgoed- & Ondernemingsrecht',
      'Vermogens- & Estate Planners',
    ],
    visualCharacteristics: [
      'Warme notenhouten kantoorfoto met gouden #E2AD5E accent',
      'Drie zwevende praktijkkaarten voor Oprichting, Kosten & Advies',
      'Heldere typografie met directe kennismakingsknop',
      'Rustige, gezaghebbende structuur voor complexe aktes',
    ],
    typographyNote: 'Modern Editorial Sans + Warm Gold Hierarchy',
    uiStyle: 'swiss-minimalism',
    palette: {
      bg: '#2B211A',
      surface: '#FAF5ED',
      text: '#FAF5ED',
      accent: '#E2AD5E',
      secondary: '#A89888',
    },
    previewSample: {
      masthead: 'Notaris & Recht',
      navItems: ['VAKGEBIEDEN', 'KANTOREN', 'OVER ONS', 'KENNISMAKING'],
      eyebrow: 'NOTARIAAT & JURIDISCH',
      headline: 'Zekerheid bij elke grote stap.',
      subheadline:
        'Persoonlijk advies en heldere notariële aktes voor gezin, vastgoed en onderneming.',
      ctaLabel: 'CONTACT OP MAAT →',
      metrics: [
        { label: 'OPRICHTING', value: 'VASTE PRIJS' },
        { label: 'VASTGOED', value: 'SNELLE AKTE' },
        { label: 'FAMILIERECHT', value: 'PERSOONLIJK' },
      ],
      cardLabels: ['OPRICHTING', 'KOSTENBEHEER', 'VERMOGENSPLANNING'],
    },
  },

  // =========================================================================
  // 11 — PERSONAL COACHING & ADVISORY (Warm Dimensional · Alabaster #F8F7F4)
  // =========================================================================
  {
    id: 'dimensional-saas',
    index: '11',
    businessTitle: 'Personal Coaching & Advisory',
    styleSubtitle: 'Warm Dimensional',
    targetBusinesses: 'Coaches, Therapists & Advisors',
    industries: ['Advisory & B2B'],
    bestMatchFor: ['Advisory & B2B'],
    problemSolved:
      'Personal coaching, therapy, and boutique advisory thrive on human warmth and clarity—not cold corporate charts. Softly elevated cards, a personal guidance portrait, and a clear 3-step roadmap help clients feel safe booking a first call.',
    bestFor: [
      'Executive, Life & Career Coaches',
      'Independent Therapists & Counselors',
      'Personal Financial & Family Advisors',
      'Boutique Mentors & Consultants',
    ],
    visualCharacteristics: [
      'Warm alabaster & soft white elevated 24px cards',
      'Human portrait badge highlighting 1-on-1 guidance',
      'Calm 3-step client roadmap from call to growth',
      'Inviting terracotta discovery call CTA',
    ],
    typographyNote: 'Friendly Humanist Sans + Warm Serif Accent',
    uiStyle: 'claymorphism',
    palette: {
      bg: '#F8F7F4',
      surface: '#FFFFFF',
      text: '#1E293B',
      accent: '#E06D4B',
      secondary: '#64748B',
    },
    previewSample: {
      masthead: 'VERA ADVISORY',
      navItems: ['APPROACH', 'ROADMAP', 'ABOUT', 'BOOK CALL'],
      eyebrow: 'PERSONAL COACHING & ADVISORY',
      headline: 'Clarity for Your Next Chapter.',
      subheadline:
        'Calm, personal 1-on-1 guidance built around your goals, pace, and decisions.',
      ctaLabel: 'BOOK DISCOVERY CALL →',
      metrics: [
        { label: '01 · DISCOVERY CALL', value: '30-Min Intro' },
        { label: '02 · PERSONAL ROADMAP', value: 'Clear Next Steps' },
        { label: '03 · GUIDED GROWTH', value: 'Ongoing Support' },
      ],
      cardLabels: ['1-on-1 Guidance', 'Warm & Human', 'Tailored Pace'],
    },
  },

  // =========================================================================
  // 12 — B2B SOFTWARE & SAAS (Modular Analytics Bento · Bright Slate #F8FAFC)
  // =========================================================================
  {
    id: 'modular-bento',
    index: '12',
    businessTitle: 'B2B Software & SaaS',
    styleSubtitle: 'Modular Analytics Bento',
    targetBusinesses: 'SaaS, Apps & Automatisering',
    industries: ['Tech & Products', 'Advisory & B2B'],
    bestMatchFor: ['Tech & Products'],
    problemSolved:
      'Wanneer je B2B-software, app of automatisering veel kan, haken beslissers af door lange teksten. Een helder dashboard-venster met directe grafieken, checklijsten en KPI-tegels laat de waarde in 5 seconden zien.',
    bestFor: [
      'B2B SaaS & Cloud Platformen',
      'Financiële & Boekhoudkundige Apps',
      'Workflow- & CRM-Automatisering',
      'Klantportalen & Analytics Suites',
    ],
    visualCharacteristics: [
      'Heldere interface in browserkader met kobalt #2563EB focus',
      'Interactieve staafgrafiek, donut-efficiency & checklistkaart',
      'Donkere rekentegel & snelle 4.500+ / 98.4% KPI-bewijzen',
      'Directe Gratis Proberen en Proefperiode-knop',
    ],
    typographyNote: 'Crisp Geometric Sans + Tabular Metrics',
    uiStyle: 'modular-bento',
    palette: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#0F172A',
      accent: '#2563EB',
      secondary: '#64748B',
    },
    previewSample: {
      masthead: 'B2B Software Suite',
      navItems: ['PRODUCT', 'DASHBOARD', 'PRIJZEN', 'GRATIS PROBEREN'],
      eyebrow: 'SAAS, APPS & AUTOMATISERING',
      headline: 'Minder handwerk, meer grip op je cijfers.',
      subheadline:
        'Overzichtelijke dashboards, automatische rapportages en live teamworkflows in één B2B-portaal.',
      ctaLabel: 'START PROEFPERIODE →',
      metrics: [
        { label: 'ACTIEVE TEAMS', value: '4.500+' },
        { label: 'TEVREDENHEID', value: '98.4%' },
        { label: 'UPTIME SLA', value: '99.99%' },
      ],
      cardLabels: ['ACTIVITY', 'CHECKLIST', 'EFFICIENCY'],
    },
  },
];
