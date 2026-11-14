export type ProjectCategory =
  | 'Architecture'
  | 'Luxury & Fashion'
  | 'Cultural & Editorial'
  | 'Product & Spatial';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Architecture',
  'Luxury & Fashion',
  'Cultural & Editorial',
  'Product & Spatial',
];

export type UiStyle =
  | 'swiss-minimalism'
  | 'dark-neumorphism'
  | 'neo-brutalism'
  | 'new-age-gradient'
  | 'claymorphism'
  | 'skeuomorphism'
  | 'bento-editorial'
  | 'cyberpunk-glass'
  | 'organic-biophilic'
  | 'dark-kinetic'
  | 'bauhaus-grid'
  | 'retro-crt';

export interface ProjectPalette {
  bg: string;
  surface: string;
  text: string;
  accent: string;
  secondary: string;
}

export interface ProjectContent {
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

export interface ProjectConfig {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  client: string;
  category: ProjectCategory;
  year: string;
  sprintDuration: string;
  slug: string;
  uiStyle: UiStyle;
  styleLabel: string;
  summary: string;
  deliverables: string[];
  palette: ProjectPalette;
  content: ProjectContent;
}

export type ProjectItem = ProjectConfig;

/**
 * CENTRAL PORTFOLIO CONFIGURATION (01 – 12)
 * Ordered in curated Light / Dark rhythm across the 3D wheel and 4×3 grid.
 * Edit any text, color, style, or metric below to update all views automatically.
 */
export const PROJECTS: ProjectConfig[] = [
  // =========================================================================
  // 01 — KENGO & PARTNERS (Light · Swiss Minimalism · Architecture)
  // =========================================================================
  {
    id: 'kengo-partners',
    index: '01',
    title: 'Kengo & Partners',
    subtitle: 'Brutalist Concrete Monograph & Structural Archive',
    client: 'Kengo Architects Tokyo / Zurich',
    category: 'Architecture',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'kengo-partners.ch',
    uiStyle: 'swiss-minimalism',
    styleLabel: 'Swiss Minimalism',
    summary:
      'Ultra-disciplined Swiss 3-column architectural monograph pairing concrete photography with technical CAD elevation dimensions, section coordinates, and generous negative space.',
    deliverables: ['Swiss Grid System', 'Technical CAD Plates', 'Monograph Index'],
    palette: {
      bg: '#F5F3EE',
      surface: '#EAE7DF',
      text: '#141414',
      accent: '#141414',
      secondary: '#73716C',
    },
    content: {
      masthead: 'KENGO & PARTNERS',
      navItems: ['PROJECTS', 'ELEVATIONS', 'PRACTICE', 'CONTACT'],
      eyebrow: '01 — 12 / MONOGRAPH ARCHIVE',
      headline: 'Concrete & Quiet Geometry.',
      subheadline: 'Civic pavilions, daylight apertures & structural honesty across Zurich and Kyoto.',
      ctaLabel: 'VIEW SECTION A-A →',
      metrics: [
        { label: 'SPAN ELEVATION', value: '+14.80 M' },
        { label: 'BUILT WORKS', value: '42 SITES' },
        { label: 'GRID MODULE', value: '3-COL / 12PX' },
      ],
      cardLabels: ['KYOTO PAVILION', 'ZURICH ANNEX', 'NAOSHIMA PIER'],
    },
  },

  // =========================================================================
  // 02 — CHRONOS GENÈVE (Dark · Dark Neumorphism · Luxury & Fashion)
  // =========================================================================
  {
    id: 'chronos-geneve',
    index: '02',
    title: 'Chronos Genève',
    subtitle: 'Haute Horlogerie Collector Allocation Portal',
    client: 'Manufacture Chronos SA',
    category: 'Luxury & Fashion',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'chronos-geneve.ch',
    uiStyle: 'dark-neumorphism',
    styleLabel: 'Dark Neumorphism',
    summary:
      'Tactile matte-black horology showcase sculpted with soft recessed and extruded neumorphic controls, centered editorial serif headings, and warm amber dial illumination.',
    deliverables: ['Macro Watch Direction', 'Tactile Dark UI', 'Private Allocation'],
    palette: {
      bg: '#0C0C0C',
      surface: '#161616',
      text: '#F5F2EB',
      accent: '#D98A2B',
      secondary: '#8C877E',
    },
    content: {
      masthead: 'CHRONOS GENÈVE',
      navItems: ['CALIBRES', 'ATELIER', 'HERITAGE', 'SALON'],
      eyebrow: 'CALIBRE NO. 09 · TOURBILLON',
      headline: 'Precision Sculpted in Shadow.',
      subheadline: 'Hand-beveled bridges, 72-hour reserve, limited to 18 numbered pieces.',
      ctaLabel: 'RESERVE VIEWING',
      metrics: [
        { label: 'POWER RESERVE', value: '72 HRS' },
        { label: 'FREQUENCY', value: '21,600 VPH' },
        { label: 'EDITION', value: '18 PCS' },
      ],
      cardLabels: ['TOURBILLON', 'CHRONOGRAPH', 'PERPETUAL'],
    },
  },

  // =========================================================================
  // 03 — KUNSTHALLE ZÜRICH (Light / Color · Neo-Brutalism · Cultural & Editorial)
  // =========================================================================
  {
    id: 'kunsthalle-zurich',
    index: '03',
    title: 'Kunsthalle Zürich',
    subtitle: '2026 Contemporary Art Season & Exhibition Agenda',
    client: 'Kunsthalle Zürich',
    category: 'Cultural & Editorial',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'kunsthallezurich.ch',
    uiStyle: 'neo-brutalism',
    styleLabel: 'Neo-Brutalism',
    summary:
      'High-energy neo-brutalist cultural platform defined by heavy 3px ink frames, zero-blur hard drop shadows, rotated exhibition stamps, and stark geometric color blocks.',
    deliverables: ['Exhibition Agenda', 'Brutalist Poster System', 'Ticketing UI'],
    palette: {
      bg: '#FAF8F2',
      surface: '#FACC15',
      text: '#0A0A0A',
      accent: '#E05A36',
      secondary: '#1D4ED8',
    },
    content: {
      masthead: 'KUNSTHALLE ZÜRICH',
      navItems: ['PROGRAM', 'ARCHIVE', 'SHOP', 'TICKETS!'],
      eyebrow: 'AUTUMN / WINTER 2026 SEASON',
      headline: 'FORM AGAINST SILENCE',
      subheadline: 'Twelve kinetic installations across Limmatquai Halls A–D.',
      ctaLabel: 'GET PASSES ↗',
      metrics: [
        { label: 'HALL 01', value: '14 OCT — KINETIC' },
        { label: 'HALL 02', value: '02 NOV — SOUND' },
        { label: 'HALL 03', value: '19 NOV — PRINT' },
      ],
      cardLabels: ['OPEN DAILY', 'FREE FRIDAYS', 'HALLE 01–04'],
    },
  },

  // =========================================================================
  // 04 — AETHER SPATIAL OS (Dark / Cyan · Cyberpunk Glass · Product & Spatial)
  // =========================================================================
  {
    id: 'aether-spatial-os',
    index: '04',
    title: 'Aether Spatial OS',
    subtitle: 'Volumetric Telemetry & Glassmorphic Spatial Interface',
    client: 'Aether Labs Zürich',
    category: 'Product & Spatial',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'aether-os.io',
    uiStyle: 'cyberpunk-glass',
    styleLabel: 'Cyberpunk Glass',
    summary:
      'Pitch-black spatial operating environment featuring floating smoked-glass HUD panels, specular cyan-and-amber edge reflections, wireframe grids, and volumetric 3D orbs.',
    deliverables: ['Spatial HUD System', 'Telemetry Widgets', 'Glass Shader Spec'],
    palette: {
      bg: '#07080C',
      surface: '#111622',
      text: '#F8FAFC',
      accent: '#22D3EE',
      secondary: '#F59E0B',
    },
    content: {
      masthead: 'AETHER OS v4.2',
      navItems: ['VIEWPORT', 'NODES', 'ORBIT', 'TERMINAL'],
      eyebrow: 'SYS.04 // SPATIAL TELEMETRY',
      headline: 'VOLUMETRIC FIELD ACTIVE',
      subheadline: 'Real-time orbital mesh & neural raycast cluster synchronization.',
      ctaLabel: 'ENGAGE LINK',
      metrics: [
        { label: 'COORDINATES', value: 'X:48.2 Y:-12.0' },
        { label: 'LATENCY', value: '0.84 MS' },
        { label: 'SYNC NODES', value: '128 / 128' },
      ],
      cardLabels: ['CORE ORB', 'FLUX MESH', 'VECTOR HUD'],
    },
  },

  // =========================================================================
  // 05 — STUDIO SØRENSEN (Warm Sand · Ethereal Gradient · Luxury & Fashion)
  // =========================================================================
  {
    id: 'studio-sorensen',
    index: '05',
    title: 'Studio Sørensen',
    subtitle: 'Sculptural Knitwear & Atmospheric Lookbook',
    client: 'Sørensen Copenhagen',
    category: 'Luxury & Fashion',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'studiosorensen.dk',
    uiStyle: 'new-age-gradient',
    styleLabel: 'Ethereal Gradient',
    summary:
      'Weightless editorial lookbook bathed in diffused sand-and-peach aura gradients, oversized serif headlines bleeding cleanly over sculptural silhouette photography.',
    deliverables: ['Lookbook Narrative', 'Aura Color System', 'Showroom Booking'],
    palette: {
      bg: '#F3ECE1',
      surface: '#E8B89A',
      text: '#1F1A17',
      accent: '#C97B57',
      secondary: '#6D5D53',
    },
    content: {
      masthead: 'STUDIO SØRENSEN',
      navItems: ['COLLECTION', 'ATELIER', 'JOURNAL'],
      eyebrow: 'COLLECTION IV · COPENHAGEN',
      headline: 'Softness in Motion',
      subheadline: 'Draped organic wool silhouettes against Nordic morning light.',
      ctaLabel: 'EXPLORE LOOKBOOK',
      metrics: [
        { label: 'SILHOUETTES', value: '24 LOOKS' },
        { label: 'FIBERS', value: 'RAW CASHMERE' },
        { label: 'SHOWROOM', value: 'BREDGADE 41' },
      ],
      cardLabels: ['LOOK 01', 'LOOK 08', 'LOOK 16'],
    },
  },

  // =========================================================================
  // 06 — KLANGWERK BERLIN (Dark · Skeuomorphism · Product & Spatial)
  // =========================================================================
  {
    id: 'klangwerk-berlin',
    index: '06',
    title: 'Klangwerk Berlin',
    subtitle: 'Precision Analog Synthesizer & Audio Hardware UI',
    client: 'Klangwerk Audio GmbH',
    category: 'Product & Spatial',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'klangwerk.audio',
    uiStyle: 'skeuomorphism',
    styleLabel: 'Skeuomorphism',
    summary:
      'Dieter Rams-inspired industrial hardware interface built around anodized matte-black panels, brushed aluminum dividers, speaker perforation matrices, and rotary encoders.',
    deliverables: ['Hardware Console UI', 'Rotary Knob System', 'OLED Telemetry'],
    palette: {
      bg: '#18181B',
      surface: '#D4D4D8',
      text: '#FAFAFA',
      accent: '#FF4D24',
      secondary: '#71717A',
    },
    content: {
      masthead: 'KLANGWERK MK-II',
      navItems: ['OSC', 'FILTER', 'ENV', 'OUTPUT'],
      eyebrow: 'MODEL KW-06 · BERLIN',
      headline: 'ANALOG HARMONIC ENGINE',
      subheadline: 'Dual voltage-controlled oscillators with stepped aluminum attenuators.',
      ctaLabel: 'REC // LIVE',
      metrics: [
        { label: 'CUTOFF', value: '4.82 KHZ' },
        { label: 'RESONANCE', value: '68 %' },
        { label: 'DRIVE', value: '+3.5 DB' },
      ],
      cardLabels: ['OSC A', 'SUB', 'LOWPASS', 'REVERB'],
    },
  },

  // =========================================================================
  // 07 — VANGUARDIA PRIVATE (Light · Claymorphism · Product & Spatial)
  // =========================================================================
  {
    id: 'vanguardia-private',
    index: '07',
    title: 'Vanguardia Private',
    subtitle: 'Tactile Wealth Management & Portfolio Cockpit',
    client: 'Vanguardia Wealth Zurich',
    category: 'Product & Spatial',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'vanguardia.private',
    uiStyle: 'claymorphism',
    styleLabel: 'Claymorphism',
    summary:
      'Soft, pillowed 3D claymorphic private banking dashboard featuring generous 28px+ rounded modules, dual inner/outer bevel shadows, and crisp tabular wealth analytics.',
    deliverables: ['Wealth Cockpit', 'Data Visualization', 'Clay UI Kit'],
    palette: {
      bg: '#ECEEF2',
      surface: '#FFFFFF',
      text: '#1E293B',
      accent: '#FF4D24',
      secondary: '#64748B',
    },
    content: {
      masthead: 'VANGUARDIA',
      navItems: ['OVERVIEW', 'ALLOCATION', 'YIELD', 'VAULT'],
      eyebrow: 'PRIVATE WEALTH · Q4 REPORT',
      headline: '$48,420,890',
      subheadline: 'Net Liquidity & Sovereign Yield Portfolio',
      ctaLabel: 'REBALANCE',
      metrics: [
        { label: 'YTD RETURN', value: '+18.42%' },
        { label: 'LIQUIDITY', value: '$12.60M' },
        { label: 'SHARPE', value: '2.14' },
      ],
      cardLabels: ['EQUITIES 54%', 'BONDS 28%', 'PRIVATE 18%'],
    },
  },

  // =========================================================================
  // 08 — VELOCE AUTOMOBILI (Dark / Orange · Dark Kinetic · Product & Spatial)
  // =========================================================================
  {
    id: 'veloce-automobili',
    index: '08',
    title: 'Veloce Automobili',
    subtitle: 'Electric Hypercar Telemetry & Aero Configurator',
    client: 'Veloce Modena S.p.A.',
    category: 'Product & Spatial',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'veloce-modena.it',
    uiStyle: 'dark-kinetic',
    styleLabel: 'Dark Kinetic',
    summary:
      'High-velocity carbon-black hypercar cockpit pairing slanted kinetic display type with live CFD aerodynamics airflow curves, chrome silhouette lighting, and tabular telemetry.',
    deliverables: ['Telemetry Cockpit', 'CFD Aero Visualizer', 'Track Configurator'],
    palette: {
      bg: '#09090B',
      surface: '#141418',
      text: '#E4E4E7',
      accent: '#FF4D24',
      secondary: '#8A8A94',
    },
    content: {
      masthead: 'VELOCE MODENA',
      navItems: ['MONOPOSTO', 'AERO LAB', 'TELEMETRY', 'ALLOCATION'],
      eyebrow: 'PROTOTYPE V-08 // TRACK SPEC',
      headline: 'ELECTRIC HYPER VELOCITY',
      subheadline: 'Quad-motor torque vectoring with 1,420 kg active ground-effect downforce.',
      ctaLabel: 'LAUNCH TELEMETRY →',
      metrics: [
        { label: '0–100 KM/H', value: '1.88 SEC' },
        { label: 'DOWNFORCE', value: '1,420 KG' },
        { label: 'POWER', value: '1,980 HP' },
      ],
      cardLabels: ['TRACK', 'CFD AERO', 'CARBON'],
    },
  },

  // =========================================================================
  // 09 — BOTANICA ATELIER (Light · Organic Biophilic · Luxury & Fashion)
  // =========================================================================
  {
    id: 'botanica-atelier',
    index: '09',
    title: 'Botanica Atelier',
    subtitle: 'Botanical Apothecary & Distillate Archive',
    client: 'Botanica Grasse',
    category: 'Luxury & Fashion',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'botanica-atelier.fr',
    uiStyle: 'organic-biophilic',
    styleLabel: 'Organic Biophilic',
    summary:
      'Tactile linen-and-sage biophilic apothecary storefront featuring flowing organic rounded cards, subtle paper grain, botanical shadow studies, and serene serif indexing.',
    deliverables: ['Biophilic Art Direction', 'Formulation Index', 'Packaging Storytelling'],
    palette: {
      bg: '#EFECE6',
      surface: '#F7F5F0',
      text: '#2F4538',
      accent: '#C47451',
      secondary: '#627266',
    },
    content: {
      masthead: 'BOTANICA ATELIER',
      navItems: ['FORMULATIONS', 'DISTILLERY', 'NOTES', 'APOTHECARY'],
      eyebrow: 'FORMULATION 09 // GRASSE HARVEST',
      headline: 'Wild Botanicals & Stone.',
      subheadline: 'Cold-pressed cedar leaf, neroli blossom, and terracotta mineral extracts.',
      ctaLabel: 'EXPLORE FORMULATION',
      metrics: [
        { label: 'EXTRACTION', value: 'STEAM 42°C' },
        { label: 'ORIGIN', value: 'GRASSE, FR' },
        { label: 'VOLUME', value: '50 ML GLASS' },
      ],
      cardLabels: ['CEDAR LEAF', 'NEROLI', 'VETIVER'],
    },
  },

  // =========================================================================
  // 10 — NOCTURNE LAB (Dark / Lime · Retro-Futurism CRT · Product & Spatial)
  // =========================================================================
  {
    id: 'nocturne-lab',
    index: '10',
    title: 'Nocturne Lab',
    subtitle: 'Phosphor CRT Oscilloscope & Modular Sequencer',
    client: 'Nocturne Sound Systems',
    category: 'Product & Spatial',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'nocturnelab.io',
    uiStyle: 'retro-crt',
    styleLabel: 'Retro-Futurism CRT',
    summary:
      'Phosphor-lime and amber CRT sound workstation featuring scanline telemetry, pixel-crisp terminal bars, an oscillating central waveform scope, and a 16-step modular sequencer.',
    deliverables: ['CRT Shader Aesthetic', 'Audio Sequencer UI', 'Oscilloscope Engine'],
    palette: {
      bg: '#0A0C0B',
      surface: '#1A1D1B',
      text: '#BEF264',
      accent: '#BEF264',
      secondary: '#F59E0B',
    },
    content: {
      masthead: 'NOCTURNE LAB // OS',
      navItems: ['SCOPE', 'SEQ-16', 'PATCH', 'EXPORT'],
      eyebrow: 'TERM.10 // PHOSPHOR AUDIO ENGINE',
      headline: 'CLOCK 128.0 BPM · SYNC OK',
      subheadline: '16-channel step matrix with sub-millisecond analog clock modulation.',
      ctaLabel: 'RUN PATCH',
      metrics: [
        { label: 'TEMPO', value: '128.0 BPM' },
        { label: 'SAMPLE RATE', value: '96.0 KHZ' },
        { label: 'BUFFER', value: '1.2 MS' },
      ],
      cardLabels: ['CH 01', 'CH 02', 'CH 03', 'CH 04'],
    },
  },

  // =========================================================================
  // 11 — DESSAU TYPE FOUNDRY (Light / Primary · Bauhaus Grid · Cultural & Editorial)
  // =========================================================================
  {
    id: 'dessau-type-foundry',
    index: '11',
    title: 'Dessau Type Foundry',
    subtitle: 'Constructivist Specimen & Interactive Type Tester',
    client: 'Dessau Press Berlin',
    category: 'Cultural & Editorial',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'dessautype.de',
    uiStyle: 'bauhaus-grid',
    styleLabel: 'Bauhaus Grid',
    summary:
      'Constructivist typographic foundry built on primary red/cobalt/ink geometry, multi-scale glyph specimens (Aa Bb Cc), and a real-time interactive optical tracking tester.',
    deliverables: ['Type Specimen Engine', 'Variable Axis UI', 'Constructivist Grid'],
    palette: {
      bg: '#F4F1EA',
      surface: '#EAE5DA',
      text: '#111111',
      accent: '#D93829',
      secondary: '#1D4ED8',
    },
    content: {
      masthead: 'DESSAU FOUNDRY',
      navItems: ['TYPEFACES', 'TESTER', 'SPECIMENS', 'LICENSING'],
      eyebrow: 'SPECIMEN 11 // DESSAU GROTESK',
      headline: 'Constructive Form.',
      subheadline: 'Geometric sans-serif architecture engineered in 9 optical weights.',
      ctaLabel: 'TRY LICENSE →',
      metrics: [
        { label: 'SIZE', value: '112 PT' },
        { label: 'TRACKING', value: '-0.03 EM' },
        { label: 'GLYPHS', value: '840 CHARS' },
      ],
      cardLabels: ['LIGHT 300', 'BOLD 700', 'BLACK 900'],
    },
  },

  // =========================================================================
  // 12 — MONOLITH JOURNAL (Light / Warm · Bento Editorial · Cultural & Editorial)
  // =========================================================================
  {
    id: 'monolith-journal',
    index: '12',
    title: 'Monolith Journal',
    subtitle: 'Architectural Criticism & Spatial Essays',
    client: 'Monolith Press London',
    category: 'Cultural & Editorial',
    year: '2025',
    sprintDuration: '24h Sprint',
    slug: 'monolithjournal.co',
    uiStyle: 'bento-editorial',
    styleLabel: 'Bento Editorial',
    summary:
      'Paper-warm editorial publication marrying long-form magazine columns and a top reading progress rule with modular Bento story cards and sepia-duotone photography.',
    deliverables: ['Editorial Reader', 'Bento Card System', 'Duotone Treatment'],
    palette: {
      bg: '#F7F5F0',
      surface: '#EAE5DC',
      text: '#1C1B18',
      accent: '#6B5B4B',
      secondary: '#8E8070',
    },
    content: {
      masthead: 'MONOLITH JOURNAL',
      navItems: ['ISSUES', 'ESSAYS', 'INDEX', 'SUBSCRIBE'],
      eyebrow: 'ISSUE 14 · LIGHT & LIMESTONE',
      headline: 'On Quiet Rooms & Daylight',
      subheadline: 'How Mediterranean courtyards shape acoustic stillness in modern civic spaces.',
      ctaLabel: 'READ ESSAY · 12 MIN',
      metrics: [
        { label: 'READING TIME', value: '12 MIN' },
        { label: 'CHAPTERS', value: '06 PARTS' },
        { label: 'PLATES', value: '28 ARCHIVAL' },
      ],
      cardLabels: ['ESSAY I', 'DAYLIGHT', 'COURTYARD'],
      quote: '“Architecture begins when light enters a silent room and defines its weight.”',
    },
  },
];
