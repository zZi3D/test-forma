export type ProjectCategory =
  | 'Corporate & SaaS'
  | 'Luxury & Lifestyle'
  | 'Tech & Product'
  | 'Creative & Editorial';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Corporate & SaaS',
  'Luxury & Lifestyle',
  'Tech & Product',
  'Creative & Editorial',
];

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
  styleName: string;
  tagline: string;
  category: ProjectCategory;
  shortDescription: string;
  bestFor: string[];
  visualCharacteristics: string[];
  typographyNote: string;
  uiStyle: UiStyle;
  palette: ProjectPalette;
  previewSample: MockupPreviewContent;
}

export type ProjectConfig = DesignDirection;
export type ProjectItem = DesignDirection;

/**
 * CENTRAL DESIGN DIRECTIONS (01 – 12)
 * Ordered in a rhythmic Light / Dark cadence across the 3D Hero Wheel and 4×3 Grid.
 * Strictly 3 items per category (Corporate & SaaS, Luxury & Lifestyle, Tech & Product, Creative & Editorial).
 */
export const PROJECTS: DesignDirection[] = [
  // =========================================================================
  // 01 — SWISS MINIMALISM (Light #F5F3EE · Corporate & SaaS)
  // =========================================================================
  {
    id: 'swiss-minimalism',
    index: '01',
    styleName: 'Swiss Minimalism',
    tagline: 'Clean, precise & architectural.',
    category: 'Corporate & SaaS',
    shortDescription:
      'A calm, authoritative layout built on a razor-sharp grid, generous whitespace, and disciplined typography. Communicates trust, clarity, and craftsmanship without visual clutter.',
    bestFor: [
      'Architecture & Design Studios',
      'Strategy Consultancies',
      'Law & Advisory Firms',
      'B2B Service Providers',
    ],
    visualCharacteristics: [
      'Asymmetric 3-column grid with 1px hairlines',
      'Warm off-white & deep graphite contrast',
      'Bold neo-grotesque headlines',
      'Index-driven hierarchy',
    ],
    typographyNote: 'Neo-Grotesque Sans + Technical Mono',
    uiStyle: 'swiss-minimalism',
    palette: {
      bg: '#F5F3EE',
      surface: '#EAE7DF',
      text: '#141414',
      accent: '#141414',
      secondary: '#73716C',
    },
    previewSample: {
      masthead: 'STUDIO / PRACTICE',
      navItems: ['SERVICES', 'APPROACH', 'WORK', 'CONTACT'],
      eyebrow: '01 — SWISS ARCHITECTURE',
      headline: 'Clarity Built to Scale.',
      subheadline:
        'Disciplined digital presence for advisory, engineering, and B2B leadership teams.',
      ctaLabel: 'SCHEDULE CONSULTATION →',
      metrics: [
        { label: 'DELIVERY CADENCE', value: '24 HOURS' },
        { label: 'GRID PRECISION', value: '3-COL / 1PX' },
        { label: 'FOCUS', value: 'HIGH TRUST' },
      ],
      cardLabels: ['STRATEGY', 'SYSTEMS', 'EXECUTION'],
    },
  },

  // =========================================================================
  // 02 — NOIR LUXURY (Dark #0C0C0C · Luxury & Lifestyle)
  // =========================================================================
  {
    id: 'noir-luxury',
    index: '02',
    styleName: 'Noir Luxury',
    tagline: 'Sophisticated, tactile & exclusive.',
    category: 'Luxury & Lifestyle',
    shortDescription:
      'A matte-black, atmospheric presentation with warm amber illumination and subtle sculpted depth in buttons and frames. Feels like stepping into a private luxury showroom.',
    bestFor: [
      'Fine Watch & Jewelry Brands',
      'High-End Real Estate',
      'Private Members Clubs',
      'Gastronomy & Luxury Launches',
    ],
    visualCharacteristics: [
      'Matte obsidian palette with warm amber glow',
      'High-contrast editorial serif typography',
      'Tactile recessed & raised UI controls',
      'Dramatic studio spotlighting',
    ],
    typographyNote: 'Editorial Serif + Clean Minimal Sans',
    uiStyle: 'dark-neumorphism',
    palette: {
      bg: '#0C0C0C',
      surface: '#161616',
      text: '#F5F2EB',
      accent: '#D98A2B',
      secondary: '#8C877E',
    },
    previewSample: {
      masthead: 'PRIVATE SHOWROOM',
      navItems: ['COLLECTION', 'ATELIER', 'HERITAGE', 'SALON'],
      eyebrow: 'SIGNATURE EDITION · NOIR',
      headline: 'Presence Sculpted in Shadow.',
      subheadline:
        'Atmospheric dark presentation crafted for rare objects and private appointments.',
      ctaLabel: 'REQUEST ACCESS',
      metrics: [
        { label: 'EXPERIENCE', value: 'PRIVATE' },
        { label: 'FINISH', value: 'OBSIDIAN' },
        { label: 'ACCENT', value: 'WARM AMBER' },
      ],
      cardLabels: ['BESPOKE', 'LIMITED', 'CONCIERGE'],
    },
  },

  // =========================================================================
  // 03 — MODULAR BENTO (Light #F4F5F7 · Corporate & SaaS)
  // =========================================================================
  {
    id: 'modular-bento',
    index: '03',
    styleName: 'Modular Bento',
    tagline: 'Structured, scannable & feature-rich.',
    category: 'Corporate & SaaS',
    shortDescription:
      'An Apple-inspired modular card system that organizes product features, key metrics, and visual previews into a crisp, easy-to-scan grid. Built for instant comprehension across desktop and mobile.',
    bestFor: [
      'Growing Tech Companies',
      'Digital Products & SaaS',
      'Mobile Apps',
      'Modern Service Businesses',
    ],
    visualCharacteristics: [
      'Rounded modular bento cards of varying proportions',
      'Bright neutral canvas with a single bold focal accent',
      'Scannable metric & feature blocks',
      'High conversion clarity',
    ],
    typographyNote: 'Clean Geometric Sans + Tabular Figures',
    uiStyle: 'modular-bento',
    palette: {
      bg: '#F4F5F7',
      surface: '#FFFFFF',
      text: '#111827',
      accent: '#2563EB',
      secondary: '#64748B',
    },
    previewSample: {
      masthead: 'PLATFORM SUITE',
      navItems: ['FEATURES', 'WORKFLOWS', 'PRICING', 'DEMO'],
      eyebrow: 'MODULAR PRODUCT OVERVIEW',
      headline: 'Every capability, crystal clear.',
      subheadline:
        'Structured bento modules engineered so buyers understand your product in seconds.',
      ctaLabel: 'START FREE TRIAL →',
      metrics: [
        { label: 'SETUP TIME', value: '4 MIN' },
        { label: 'ADOPTION', value: '98.4%' },
        { label: 'UPTIME SLA', value: '99.99%' },
      ],
      cardLabels: ['AUTOMATION', 'LIVE SYNC', 'ANALYTICS'],
    },
  },

  // =========================================================================
  // 04 — SPATIAL GLASS & AI (Dark #07080C · Tech & Product)
  // =========================================================================
  {
    id: 'spatial-glass-ai',
    index: '04',
    styleName: 'Spatial Glass & AI',
    tagline: 'Futuristic, translucent & intelligent.',
    category: 'Tech & Product',
    shortDescription:
      'Floating frosted-glass panels layered over a deep, luminous 3D visual field. Makes complex software, AI capabilities, and technical data feel tangible and forward-thinking.',
    bestFor: [
      'AI & Machine Learning Startups',
      'Next-Gen SaaS Platforms',
      'Cybersecurity & Cloud Infra',
      'Deep-Tech Companies',
    ],
    visualCharacteristics: [
      'Layered frosted glassmorphism with light-catching borders',
      'Deep midnight canvas with cyan & amber accents',
      'Crisp technical micro-labels',
      'Spatial 3D depth',
    ],
    typographyNote: 'Precision Sans + Monospace Telemetry',
    uiStyle: 'cyberpunk-glass',
    palette: {
      bg: '#07080C',
      surface: '#111622',
      text: '#F8FAFC',
      accent: '#22D3EE',
      secondary: '#F59E0B',
    },
    previewSample: {
      masthead: 'NEURAL ENGINE',
      navItems: ['PLATFORM', 'MODELS', 'SECURITY', 'DOCS'],
      eyebrow: 'INTELLIGENCE LAYER // LIVE',
      headline: 'SPATIAL COMPUTE ACTIVE',
      subheadline:
        'Translucent glass HUD architecture built for real-time AI and developer products.',
      ctaLabel: 'LAUNCH CONSOLE',
      metrics: [
        { label: 'INFERENCE', value: '12.4 MS' },
        { label: 'THROUGHPUT', value: '48K / SEC' },
        { label: 'CLUSTERS', value: 'GLOBAL' },
      ],
      cardLabels: ['AI CORE', 'DATA MESH', 'API STREAM'],
    },
  },

  // =========================================================================
  // 05 — SOFT AURA ATELIER (Warm Sand #F3ECE1 · Luxury & Lifestyle)
  // =========================================================================
  {
    id: 'soft-aura-atelier',
    index: '05',
    styleName: 'Soft Aura Atelier',
    tagline: 'Poetic, editorial & effortless.',
    category: 'Luxury & Lifestyle',
    shortDescription:
      'A soft, luminous experience where warm ambient gradients, fluid spacing, and expressive serif typography merge into a digital lookbook. Elevates brand storytelling over hard selling.',
    bestFor: [
      'Fashion & Apparel Houses',
      'Interior Design Studios',
      'Skincare & Beauty Brands',
      'Photography & Art Galleries',
    ],
    visualCharacteristics: [
      'Diffuse sand & warm peach aura gradients',
      'Oversized editorial serif titles overlapping imagery',
      'Weightless borderless navigation',
      'High-contrast silhouette compositions',
    ],
    typographyNote: 'High-Contrast Serif + Refined Sans',
    uiStyle: 'new-age-gradient',
    palette: {
      bg: '#F3ECE1',
      surface: '#E8B89A',
      text: '#1F1A17',
      accent: '#C97B57',
      secondary: '#6D5D53',
    },
    previewSample: {
      masthead: 'ATELIER LOOKBOOK',
      navItems: ['COLLECTION', 'STORY', 'APPOINTMENTS'],
      eyebrow: 'SEASONAL EDITORIAL',
      headline: 'Softness in Motion',
      subheadline:
        'Warm ambient gradients and sculptural editorial framing for modern lifestyle brands.',
      ctaLabel: 'EXPLORE COLLECTION',
      metrics: [
        { label: 'MOOD', value: 'LUMINOUS' },
        { label: 'CRAFT', value: 'EDITORIAL' },
        { label: 'EXPERIENCE', value: 'BESPOKE' },
      ],
      cardLabels: ['CHAPTER I', 'CURATION', 'ATELIER'],
    },
  },

  // =========================================================================
  // 06 — KINETIC PERFORMANCE (Dark #09090B · Tech & Product)
  // =========================================================================
  {
    id: 'kinetic-performance',
    index: '06',
    styleName: 'Kinetic Performance',
    tagline: 'Fast, dynamic & engineered for impact.',
    category: 'Tech & Product',
    shortDescription:
      'A high-energy dark interface built around forward motion, wide display typography, and precision telemetry. Projects speed, engineering power, and bold ambition.',
    bestFor: [
      'Automotive & E-Mobility',
      'Sports & Performance Brands',
      'Hardware Product Launches',
      'Clean Energy Innovators',
    ],
    visualCharacteristics: [
      'Carbon black with chrome silver & signal-orange accents',
      'Wide angled display headlines',
      'Integrated performance specs & aerodynamic curves',
      'Horizontal speed lines',
    ],
    typographyNote: 'Wide Display Sans + Technical Mono',
    uiStyle: 'dark-kinetic',
    palette: {
      bg: '#09090B',
      surface: '#141418',
      text: '#E4E4E7',
      accent: '#FF4D24',
      secondary: '#8A8A94',
    },
    previewSample: {
      masthead: 'VELOCITY LAB',
      navItems: ['ENGINEERING', 'SPECS', 'DESIGN', 'RESERVE'],
      eyebrow: 'PERFORMANCE SERIES // 06',
      headline: 'ENGINEERED FOR MOTION',
      subheadline:
        'High-velocity dark typography paired with live performance curves and spec readouts.',
      ctaLabel: 'EXPLORE SPECS →',
      metrics: [
        { label: 'RESPONSE', value: 'INSTANT' },
        { label: 'EFFICIENCY', value: '96.2%' },
        { label: 'OUTPUT', value: 'PEAK SPEC' },
      ],
      cardLabels: ['DYNAMICS', 'AERODYNAMICS', 'CARBON'],
    },
  },

  // =========================================================================
  // 07 — DIMENSIONAL SAAS (Light #ECEEF2 · Corporate & SaaS)
  // =========================================================================
  {
    id: 'dimensional-saas',
    index: '07',
    styleName: 'Dimensional SaaS',
    tagline: 'Approachable, tactile & conversion-focused.',
    category: 'Corporate & SaaS',
    shortDescription:
      'A bright, welcoming interface where cards, charts, and controls carry soft 3D elevation. Turns complex financial or business data into an intuitive, friendly product experience.',
    bestFor: [
      'Fintech & Wealth Platforms',
      'HR & Productivity Software',
      'Modern Insurance Providers',
      'B2B Client Portals',
    ],
    visualCharacteristics: [
      'Soft elevated 3D cards with generous 24px corners',
      'Crisp white surfaces on cool light gray',
      'Smooth area charts with tabular figures',
      'High-contrast action buttons',
    ],
    typographyNote: 'Friendly Humanist Sans + Tabular Figures',
    uiStyle: 'claymorphism',
    palette: {
      bg: '#ECEEF2',
      surface: '#FFFFFF',
      text: '#1E293B',
      accent: '#FF4D24',
      secondary: '#64748B',
    },
    previewSample: {
      masthead: 'FINTECH COCKPIT',
      navItems: ['OVERVIEW', 'ANALYTICS', 'TREASURY', 'PORTAL'],
      eyebrow: 'BUSINESS INTELLIGENCE',
      headline: '99.4% Clarity',
      subheadline:
        'Tactile soft-elevated cards that transform dense workflows into effortless control.',
      ctaLabel: 'BOOK A DEMO',
      metrics: [
        { label: 'NET GROWTH', value: '+24.8%' },
        { label: 'TIME SAVED', value: '14 HRS/WK' },
        { label: 'TEAM SCORE', value: '4.9 / 5' },
      ],
      cardLabels: ['REVENUE 54%', 'OPS 28%', 'RESERVE 18%'],
    },
  },

  // =========================================================================
  // 08 — INDUSTRIAL PRECISION (Dark #18181B · Tech & Product)
  // =========================================================================
  {
    id: 'industrial-precision',
    index: '08',
    styleName: 'Industrial Precision',
    tagline: 'Tactile, engineered & functional.',
    category: 'Tech & Product',
    shortDescription:
      'Inspired by Dieter Rams industrial design: a website structured like a precision-crafted physical instrument with tactile dials, grid dividers, and honest functionality.',
    bestFor: [
      'Audio & Music Hardware',
      'Consumer Electronics',
      'Smart-Home Devices',
      'Industrial Design & Engineering',
    ],
    visualCharacteristics: [
      'Anodized matte black & brushed aluminum tones',
      'Tactile rotary controls & LED status indicators',
      'Structured technical grid compartments',
      'Signal-orange highlights',
    ],
    typographyNote: 'Technical Grotesque + Instrument Mono',
    uiStyle: 'skeuomorphism',
    palette: {
      bg: '#18181B',
      surface: '#D4D4D8',
      text: '#FAFAFA',
      accent: '#FF4D24',
      secondary: '#8E8E98',
    },
    previewSample: {
      masthead: 'PRECISION HARDWARE',
      navItems: ['PRODUCTS', 'ARCHITECTURE', 'SPECS', 'ORDER'],
      eyebrow: 'DESIGNED LIKE AN INSTRUMENT',
      headline: 'Built with Tactile Honesty.',
      subheadline:
        'Anodized surfaces, calibrated micro-controls, and clear engineering storytelling.',
      ctaLabel: 'CONFIGURE UNIT →',
      metrics: [
        { label: 'CHASSIS', value: 'MILLED AL' },
        { label: 'RESPONSE', value: 'ZERO LAG' },
        { label: 'WARRANTY', value: '5 YEARS' },
      ],
      cardLabels: ['GAIN', 'TONE', 'STAGE', 'POWER'],
    },
  },

  // =========================================================================
  // 09 — ORGANIC BIOPHILIC (Warm Linen #EFECE6 · Luxury & Lifestyle)
  // =========================================================================
  {
    id: 'organic-biophilic',
    index: '09',
    styleName: 'Organic Biophilic',
    tagline: 'Natural, calm & grounded.',
    category: 'Luxury & Lifestyle',
    shortDescription:
      'A warm, restorative aesthetic pairing earthy tones, soft organic shapes, and subtle paper textures. Immediately builds authenticity, calm, and human trust.',
    bestFor: [
      'Sustainable Lifestyle Brands',
      'Botanical Skincare & Beauty',
      'Boutique Hotels & Retreats',
      'Wellness & Culinary Concepts',
    ],
    visualCharacteristics: [
      'Unbleached linen, deep sage green & terracotta palette',
      'Soft organic framing with subtle paper grain',
      'Balanced editorial serif & clean sans typography',
      'Natural daylight shadows',
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
      masthead: 'BOTANICAL LIVING',
      navItems: ['RITUALS', 'ORIGINS', 'JOURNAL', 'VISIT'],
      eyebrow: 'EARTH-FIRST CRAFT',
      headline: 'Natural Calm & Craft.',
      subheadline:
        'Grounded earthy palettes and soft organic silhouettes designed for human connection.',
      ctaLabel: 'DISCOVER COLLECTION',
      metrics: [
        { label: 'MATERIALS', value: '100% PURE' },
        { label: 'SOURCING', value: 'TRACEABLE' },
        { label: 'PALETTE', value: 'SAGE & CLAY' },
      ],
      cardLabels: ['BOTANICAL', 'MINERAL', 'CRAFTED'],
    },
  },

  // =========================================================================
  // 10 — NEO-BRUTALIST POP (High-Contrast #FAF8F2 · Creative & Editorial)
  // =========================================================================
  {
    id: 'neo-brutalist-pop',
    index: '10',
    styleName: 'Neo-Brutalist Pop',
    tagline: 'Bold, unapologetic & unforgettable.',
    category: 'Creative & Editorial',
    shortDescription:
      'A rebellious, high-energy layout that breaks safe web conventions with thick black borders, hard block shadows, and primary color blocking. Designed to make challenger brands impossible to ignore.',
    bestFor: [
      'Creative & Branding Agencies',
      'Cultural Institutions & Festivals',
      'Youth & Street Culture Brands',
      'Independent Media & Podcasts',
    ],
    visualCharacteristics: [
      'Crisp 2px black borders & hard offset shadows',
      'Bold cobalt blue, butter yellow & rust orange blocks',
      'Expressive oversized typography & stamp badges',
      'Asymmetric split layout',
    ],
    typographyNote: 'Heavy Display Grotesque + Bold Mono',
    uiStyle: 'neo-brutalism',
    palette: {
      bg: '#FAF8F2',
      surface: '#FACC15',
      text: '#0A0A0A',
      accent: '#E05A36',
      secondary: '#1D4ED8',
    },
    previewSample: {
      masthead: 'CULTURE & EVENTS',
      navItems: ['PROGRAM', 'ARCHIVE', 'SHOP', 'TICKETS!'],
      eyebrow: 'HIGH-IMPACT CREATIVE',
      headline: 'FORM AGAINST SILENCE',
      subheadline:
        'Unapologetic color blocking, hard ink borders, and expressive typographic energy.',
      ctaLabel: 'CLAIM PASSES ↗',
      metrics: [
        { label: 'STAGE 01', value: 'LIVE EXPERIENCES' },
        { label: 'STAGE 02', value: 'SOUND & ART' },
        { label: 'STAGE 03', value: 'LIMITED DROPS' },
      ],
      cardLabels: ['NEW SEASON', 'ALL ACCESS', 'STAND OUT'],
    },
  },

  // =========================================================================
  // 11 — EDITORIAL MONOGRAPH (Warm Paper #F7F5F0 · Creative & Editorial)
  // =========================================================================
  {
    id: 'editorial-monograph',
    index: '11',
    styleName: 'Editorial Monograph',
    tagline: 'Story-driven, cultured & authoritative.',
    category: 'Creative & Editorial',
    shortDescription:
      'The digital equivalent of a collectible print magazine or coffee-table monograph. Crafted to present deep stories, essays, and photography with literary gravitas.',
    bestFor: [
      'Digital Publications & Magazines',
      'Research & Knowledge Platforms',
      'Cultural Foundations & Museums',
      'Think Tanks & Authors',
    ],
    visualCharacteristics: [
      'Multi-column magazine layout with pull quotes',
      'Warm archival paper & sepia-graphite tones',
      'Chapter navigation & reading progress bar',
      'Curated essay & image pairings',
    ],
    typographyNote: 'Classic Book Serif + Archival Sans',
    uiStyle: 'bento-editorial',
    palette: {
      bg: '#F7F5F0',
      surface: '#EAE5DC',
      text: '#1C1B18',
      accent: '#6B5B4B',
      secondary: '#8E8070',
    },
    previewSample: {
      masthead: 'MONOGRAPH PRESS',
      navItems: ['ISSUES', 'ESSAYS', 'INDEX', 'SUBSCRIBE'],
      eyebrow: 'FEATURE STORY · LONGFORM',
      headline: 'On Quiet Rooms & Daylight',
      subheadline:
        'Literary typography, modular reading cards, and archival warmth built for deep stories.',
      ctaLabel: 'READ FEATURE · 8 MIN',
      metrics: [
        { label: 'READING FLOW', value: 'LONGFORM' },
        { label: 'STRUCTURE', value: 'CHAPTERED' },
        { label: 'TONE', value: 'ARCHIVAL' },
      ],
      cardLabels: ['FEATURE', 'PULL QUOTE', 'GALLERY'],
      quote: '“Great editorial design gives every idea room to breathe and resonate.”',
    },
  },

  // =========================================================================
  // 12 — DOPAMINE COMMERCE (Vibrant Light #FFFDF7 · Creative & Editorial)
  // =========================================================================
  {
    id: 'dopamine-commerce',
    index: '12',
    styleName: 'Dopamine Commerce',
    tagline: 'Vibrant, playful & built to convert.',
    category: 'Creative & Editorial',
    shortDescription:
      'A joyful, high-energy consumer brand experience bursting with rich color contrasts, chunky display type, and playful pill badges. Engineered to spark excitement and drive action.',
    bestFor: [
      'Modern D2C E-Commerce',
      'Food & Beverage Brands',
      'Consumer Mobile Apps',
      'Subscription Services & Retail',
    ],
    visualCharacteristics: [
      'Energetic multi-color accents on warm cream',
      'Heavy friendly display typography',
      'Playful pill tags & interactive product cards',
      'High-visibility conversion CTAs',
    ],
    typographyNote: 'Chunky Rounded Display + Crisp Sans',
    uiStyle: 'dopamine-commerce',
    palette: {
      bg: '#FFFDF7',
      surface: '#FFE8D6',
      text: '#1C1917',
      accent: '#FF4D24',
      secondary: '#2563EB',
    },
    previewSample: {
      masthead: 'GOODS & DROPS',
      navItems: ['SHOP ALL', 'BUNDLES', 'REVIEWS', 'BAG (2)'],
      eyebrow: 'BESTSELLER · LIMITED BATCH',
      headline: 'Daily Joy, Delivered.',
      subheadline:
        'Playful product cards, high-contrast color pops, and frictionless checkout paths.',
      ctaLabel: 'ADD TO BAG — $38 →',
      metrics: [
        { label: 'RATED', value: '4.9 ★ (2.4K)' },
        { label: 'DISPATCH', value: 'SAME DAY' },
        { label: 'BUNDLES', value: 'SAVE 20%' },
      ],
      cardLabels: ['CITRUS', 'BERRY', 'MATCHA'],
    },
  },
];
