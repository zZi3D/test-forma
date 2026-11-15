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
}

export type ProjectConfig = DesignDirection;
export type ProjectItem = DesignDirection;

/**
 * CENTRAL WEBSITE DESIGN DIRECTIONS (01 – 12)
 * Ordered sequentially for the 3D Hero Wheel, 4×3 Grid, and /directions page.
 */
export const PROJECTS: DesignDirection[] = [
  // =========================================================================
  // 01 — HIGH-CONVERTING WEBSHOP (Dopamine Commerce · Vibrant Cream #FFFDF7)
  // =========================================================================
  {
    id: 'dopamine-commerce',
    index: '01',
    businessTitle: 'High-Converting Webshop',
    styleSubtitle: 'Dopamine Commerce',
    targetBusinesses: 'Treat & Gift Shops, D2C Stores',
    industries: ['Retail & Webshops'],
    bestMatchFor: ['Retail & Webshops'],
    problemSolved:
      'Boring online stores struggle to justify impulse purchases or bundle upsells. Playful color pops, social-proof review pills, and instant add-to-bag actions spark excitement and lift average order value.',
    bestFor: [
      'Treat, Confectionery & Snack Shops',
      'Curated Gift Boxes & Stationery Stores',
      'Direct-to-Consumer Food & Drink Brands',
      'Subscription Boxes & Retail Launches',
    ],
    visualCharacteristics: [
      'Energetic multi-color accents on warm cream',
      'Heavy friendly display typography',
      'Review pills, bundle savings & quick-add cards',
      'High-visibility checkout call-to-actions',
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

  // =========================================================================
  // 02 — DARK SALON & LOCAL LUXURY (Noir Luxury · Dark #0C0C0C)
  // =========================================================================
  {
    id: 'noir-luxury',
    index: '02',
    businessTitle: 'Dark Salon & Local Luxury',
    styleSubtitle: 'Noir Luxury',
    targetBusinesses: 'Barbershops, Salons & Clinics',
    industries: ['Salons & Local'],
    bestMatchFor: ['Salons & Local'],
    problemSolved:
      'Local service businesses often lose bookings to generic template sites that undersell their craft. This moody luxury layout showcases your services, pricing, and 4.9★ reputation upfront to turn visitors into booked chairs.',
    bestFor: [
      'Barbershops & Men’s Grooming Studios',
      'Hair Salons & Color Specialists',
      'Aesthetic & Cosmetic Clinics',
      'Private Spas & Tattoo Ateliers',
    ],
    visualCharacteristics: [
      'Matte obsidian palette with warm amber glow',
      'Prominent Google review score & clear menu pricing',
      'Tactile raised booking buttons & service cards',
      'High-contrast editorial serif headlines',
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
      masthead: 'ATELIER NOIR · SALON',
      navItems: ['SERVICES', 'PRICING', 'REVIEWS', 'BOOK NOW'],
      eyebrow: '4.9 ★ · 420+ VERIFIED CLIENT REVIEWS',
      headline: 'Sharp Craft. Effortless Booking.',
      subheadline:
        'Private grooming & hair studio experience engineered to fill your weekly appointment calendar.',
      ctaLabel: 'BOOK APPOINTMENT →',
      metrics: [
        { label: 'SIGNATURE CUT & STYLE · 45M', value: '$55' },
        { label: 'BEARD SCULPT & HOT TOWEL · 30M', value: '$40' },
        { label: 'FULL STUDIO RITUAL · 75M', value: '$85' },
      ],
      cardLabels: ['HAIR & STYLING', 'BEARD CARE', 'TREATMENTS'],
    },
  },

  // =========================================================================
  // 03 — AUTHORITY & TRUST (Swiss Minimalism · Light #F5F3EE)
  // =========================================================================
  {
    id: 'swiss-minimalism',
    index: '03',
    businessTitle: 'Authority & Trust',
    styleSubtitle: 'Swiss Minimalism',
    targetBusinesses: 'Law Firms, Consultants & B2B',
    industries: ['Advisory & B2B'],
    bestMatchFor: ['Advisory & B2B'],
    problemSolved:
      'High-value B2B clients leave dated or cluttered websites before ever reading your credentials. This structured editorial layout signals senior credibility in seconds and guides prospects straight to booking a consultation.',
    bestFor: [
      'Law & Legal Advisory Firms',
      'Management & Strategy Consultants',
      'Accounting & Tax Practices',
      'Architecture & Engineering Firms',
    ],
    visualCharacteristics: [
      'Asymmetric 3-column grid with 1px hairlines',
      'Warm off-white & deep graphite contrast',
      'Clear practice-area index & partner credentials',
      'Direct consultation booking hierarchy',
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
      masthead: 'VANDENBERG & PARTNERS',
      navItems: ['PRACTICE AREAS', 'PARTNERS', 'INSIGHTS', 'CONTACT'],
      eyebrow: '03 — LEGAL & ADVISORY PRACTICE',
      headline: 'Trusted Counsel. Proven Clarity.',
      subheadline:
        'Disciplined digital presence built to win corporate retainers and high-trust client inquiries.',
      ctaLabel: 'SCHEDULE CONSULTATION →',
      metrics: [
        { label: 'CLIENT RETENTION', value: '96%' },
        { label: 'PARTNER TENURE', value: '25+ YRS' },
        { label: 'FIRST RESPONSE', value: '< 2 HRS' },
      ],
      cardLabels: ['CORPORATE LAW', 'M&A ADVISORY', 'COMPLIANCE'],
    },
  },

  // =========================================================================
  // 04 — FUTURE TECH & AI (Spatial Glass & AI · Dark #07080C)
  // =========================================================================
  {
    id: 'spatial-glass-ai',
    index: '04',
    businessTitle: 'Future Tech & AI',
    styleSubtitle: 'Spatial Glass & AI',
    targetBusinesses: 'AI Startups, Software & Tech',
    industries: ['Tech & Products'],
    bestMatchFor: ['Tech & Products'],
    problemSolved:
      'AI tools and technical platforms can feel abstract or intimidating on plain white pages. Translucent floating panels and crisp telemetry make invisible technology look tangible, modern, and investor-ready.',
    bestFor: [
      'AI & Automation Startups',
      'Developer Tools & API Platforms',
      'Cybersecurity & Cloud Infrastructure',
      'Data & Analytics Software',
    ],
    visualCharacteristics: [
      'Layered frosted glass panels with luminous borders',
      'Deep midnight canvas with cyan & amber accents',
      'Crisp technical micro-labels & live status tags',
      'Spatial depth over an interactive grid stage',
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
  // 05 — BOUTIQUE & FASHION EDITORIAL (Soft Aura Atelier · Warm Sand #F3ECE1)
  // =========================================================================
  {
    id: 'soft-aura-atelier',
    index: '05',
    businessTitle: 'Boutique & Fashion Editorial',
    styleSubtitle: 'Soft Aura Atelier',
    targetBusinesses: 'Clothing Stores, Stylists & Salons',
    industries: ['Salons & Local', 'Retail & Webshops'],
    bestMatchFor: ['Salons & Local'],
    problemSolved:
      'Style-driven boutiques and beauty brands lose their magic on rigid, boxy web templates. Warm ambient gradients and magazine-like framing make visitors feel the atmosphere of your store and buy with emotion.',
    bestFor: [
      'Independent Clothing Boutiques',
      'Personal Stylists & Bridal Studios',
      'Boutique Hair & Beauty Salons',
      'Interior Design & Curated Showrooms',
    ],
    visualCharacteristics: [
      'Warm sand & soft peach ambient gradients',
      'Oversized editorial serif titles overlapping visuals',
      'Weightless, uncluttered boutique navigation',
      'Lookbook-style collection presentation',
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
      navItems: ['COLLECTION', 'STYLING', 'APPOINTMENTS'],
      eyebrow: 'SEASONAL EDITORIAL',
      headline: 'Softness in Motion',
      subheadline:
        'Warm ambient gradients and sculptural editorial framing for modern boutiques and salons.',
      ctaLabel: 'EXPLORE COLLECTION',
      metrics: [
        { label: 'CURATION', value: 'SEASONAL' },
        { label: 'FITTING', value: 'PRIVATE' },
        { label: 'LOOKBOOK', value: 'ATELIER' },
      ],
      cardLabels: ['NEW ARRIVALS', 'STYLING', 'SHOWROOM'],
    },
  },

  // =========================================================================
  // 06 — HIGH-ENERGY & ACTION (Kinetic Performance · Dark #09090B)
  // =========================================================================
  {
    id: 'kinetic-performance',
    index: '06',
    businessTitle: 'High-Energy & Action',
    styleSubtitle: 'Kinetic Performance',
    targetBusinesses: 'Gyms, Trainers & E-Mobility',
    industries: ['Sports & Events', 'Tech & Products'],
    bestMatchFor: ['Sports & Events'],
    problemSolved:
      'Fitness studios, coaches, and performance brands fail when their site feels slow or passive. Bold diagonal typography and high-contrast action blocks inject instant momentum and drive trial sign-ups.',
    bestFor: [
      'Boutique Gyms & Training Studios',
      'Personal Trainers & Athletic Coaches',
      'E-Bikes, Automotive & Mobility Brands',
      'Sports Gear & Endurance Events',
    ],
    visualCharacteristics: [
      'Carbon black with chrome & signal-orange energy',
      'Wide angled display headlines that command action',
      'Dynamic speed lines & live performance stats',
      'High-visibility trial & reservation CTAs',
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
      masthead: 'APEX PERFORMANCE',
      navItems: ['COACHING', 'PROGRAMS', 'SPECS', 'BOOK TRIAL'],
      eyebrow: 'HIGH-OUTPUT TRAINING & MOBILITY // 06',
      headline: 'ENGINEERED FOR ACTION',
      subheadline:
        'High-velocity dark typography built to fill coaching rosters, gym trials, and test rides.',
      ctaLabel: 'BOOK FREE TRIAL →',
      metrics: [
        { label: 'COACHING', value: '1-ON-1' },
        { label: 'EFFICIENCY', value: '98.4%' },
        { label: 'MEMBER SCORE', value: '4.9 ★' },
      ],
      cardLabels: ['STRENGTH', 'CONDITIONING', 'MOBILITY'],
    },
  },

  // =========================================================================
  // 07 — WARM, NATURAL & LOCAL (Organic Biophilic · Warm Linen #EFECE6)
  // =========================================================================
  {
    id: 'organic-biophilic',
    index: '07',
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
  // 08 — UNFORGETTABLE STANDOUT (Neo-Brutalist Pop · High-Contrast #FAF8F2)
  // =========================================================================
  {
    id: 'neo-brutalist-pop',
    index: '08',
    businessTitle: 'Unforgettable Standout',
    styleSubtitle: 'Neo-Brutalist Pop',
    targetBusinesses: 'Festivals, Agencies & Culture',
    industries: ['Sports & Events'],
    bestMatchFor: ['Sports & Events'],
    problemSolved:
      'Events, festivals, and bold creative studios cannot afford to blend in with lookalike websites. Thick ink borders, primary color blocking, and fearless typography make your brand impossible to scroll past.',
    bestFor: [
      'Music Festivals, Events & Pop-Ups',
      'Creative & Branding Agencies',
      'Streetwear & Youth Culture Labels',
      'Independent Media & Live Podcasts',
    ],
    visualCharacteristics: [
      'Crisp 2px black borders & hard offset shadows',
      'Bold cobalt blue, butter yellow & rust orange blocks',
      'Expressive oversized typography & stamp badges',
      'High-impact ticket & drop callouts',
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
      navItems: ['LINEUP', 'SCHEDULE', 'SHOP', 'TICKETS!'],
      eyebrow: 'HIGH-IMPACT CREATIVE & EVENTS',
      headline: 'FORM AGAINST SILENCE',
      subheadline:
        'Unapologetic color blocking, hard ink borders, and expressive energy that sells out tickets.',
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
  // 09 — EXPERTISE & PUBLICATIONS (Editorial Monograph · Warm Paper #F7F5F0)
  // =========================================================================
  {
    id: 'editorial-monograph',
    index: '09',
    businessTitle: 'Expertise & Publications',
    styleSubtitle: 'Editorial Monograph',
    targetBusinesses: 'Speakers, Authors & Media',
    industries: ['Advisory & B2B'],
    bestMatchFor: [],
    problemSolved:
      'Thought leaders, keynote speakers, and research platforms need more than a landing page—they need depth. Magazine-grade reading hierarchy turns longform articles, books, and keynotes into undeniable authority.',
    bestFor: [
      'Keynote Speakers & Authors',
      'Research Institutes & Think Tanks',
      'Digital Magazines & Newsletters',
      'Cultural Foundations & Museums',
    ],
    visualCharacteristics: [
      'Multi-column magazine layout with pull quotes',
      'Warm archival paper & sepia-graphite tones',
      'Chapter navigation & longform reading flow',
      'Curated essay & editorial image pairings',
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
      navItems: ['ISSUES', 'ESSAYS', 'KEYNOTES', 'SUBSCRIBE'],
      eyebrow: 'FEATURE STORY · LONGFORM',
      headline: 'On Quiet Rooms & Daylight',
      subheadline:
        'Literary typography, modular reading cards, and archival warmth built for speakers and authors.',
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
  // 10 — CRAFT & PRODUCT PRECISION (Industrial Precision · Dark #18181B)
  // =========================================================================
  {
    id: 'industrial-precision',
    index: '10',
    businessTitle: 'Craft & Product Precision',
    styleSubtitle: 'Industrial Precision',
    targetBusinesses: 'Physical Products, Audio & Makers',
    industries: ['Tech & Products', 'Retail & Webshops'],
    bestMatchFor: ['Tech & Products'],
    problemSolved:
      'Generic ecommerce grids flatten the quality of finely engineered products. Inspired by classic Dieter Rams hardware, tactile dials and calibrated grid compartments highlight craftsmanship so buyers happily pay a premium.',
    bestFor: [
      'Audio, Hi-Fi & Studio Gear Brands',
      'Coffee Machines & Kitchen Hardware',
      'Smart-Home & Consumer Electronics',
      'Bespoke Makers & Hardware Shops',
    ],
    visualCharacteristics: [
      'Anodized matte black & brushed aluminum tones',
      'Tactile rotary controls & LED status indicators',
      'Structured technical spec compartments',
      'Crisp signal-orange action highlights',
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
      navItems: ['PRODUCTS', 'CRAFT', 'SPECS', 'ORDER'],
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
  // 11 — APPROACHABLE FINANCE & ADVICE (Dimensional SaaS · Light #ECEEF2)
  // =========================================================================
  {
    id: 'dimensional-saas',
    index: '11',
    businessTitle: 'Approachable Finance & Advice',
    styleSubtitle: 'Dimensional SaaS',
    targetBusinesses: 'Advisors, Coaches & Portals',
    industries: ['Advisory & B2B'],
    bestMatchFor: ['Advisory & B2B'],
    problemSolved:
      'Financial advice, insurance, and business coaching often feel cold or overly complicated online. Friendly 3D-elevated cards and clean visual charts make complex numbers feel approachable and easy to act on.',
    bestFor: [
      'Financial Advisors & Wealth Planners',
      'Business Coaches & Masterminds',
      'Modern Insurance & Mortgage Brokers',
      'Client Portals & Accounting SaaS',
    ],
    visualCharacteristics: [
      'Soft elevated 3D cards with generous 24px corners',
      'Crisp white surfaces on calm light slate',
      'Clean growth charts with tabular figures',
      'Warm orange call-to-action buttons',
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
      masthead: 'CLARITY ADVISORY',
      navItems: ['SERVICES', 'RESULTS', 'PORTAL', 'BOOK CALL'],
      eyebrow: 'WEALTH & COACHING OVERVIEW',
      headline: '99.4% Clarity',
      subheadline:
        'Approachable visual cards that turn financial planning and coaching plans into clear next steps.',
      ctaLabel: 'BOOK A DEMO',
      metrics: [
        { label: 'NET GROWTH', value: '+24.8%' },
        { label: 'TIME SAVED', value: '14 HRS/WK' },
        { label: 'CLIENT SCORE', value: '4.9 / 5' },
      ],
      cardLabels: ['PLANNING 54%', 'TAX 28%', 'RESERVE 18%'],
    },
  },

  // =========================================================================
  // 12 — CLEAR SERVICE & PRODUCT MAP (Modular Bento · Light #F4F5F7)
  // =========================================================================
  {
    id: 'modular-bento',
    index: '12',
    businessTitle: 'Clear Service & Product Map',
    styleSubtitle: 'Modular Bento',
    targetBusinesses: 'SaaS, Apps & Service Companies',
    industries: ['Tech & Products', 'Advisory & B2B'],
    bestMatchFor: ['Tech & Products'],
    problemSolved:
      'When your software or service does several things at once, long walls of text confuse buyers. This Apple-inspired bento grid breaks every feature, benefit, and proof point into scannable cards anyone grasps in 5 seconds.',
    bestFor: [
      'SaaS & Cloud Software Companies',
      'Mobile Apps & Digital Tools',
      'Multi-Service Agencies & IT Firms',
      'Growing B2B Service Businesses',
    ],
    visualCharacteristics: [
      'Rounded modular cards of varying proportions',
      'Bright neutral canvas with a focused cobalt accent',
      'Scannable metric & workflow feature blocks',
      'Clear trial and demo conversion triggers',
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
];
