export type ProjectCategory = 'Luxury Fashion' | 'Architecture' | 'Cultural Publication';

export type MockupArchetype =
  | 'atelier-lookbook'
  | 'brutalist-monograph'
  | 'biennale-journal'
  | 'maison-runway'
  | 'spatial-pavilion'
  | 'opera-season'
  | 'horology-editorial'
  | 'timber-residence'
  | 'archive-index'
  | 'silk-capsule'
  | 'museum-retrospective'
  | 'alpine-sanctuary';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  sprintDuration: string;
  slug: string;
  summary: string;
  deliverables: string[];
  archetype: MockupArchetype;
  palette: {
    bg: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
  };
  masthead: string;
  subline: string;
  featuredStat: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'maison-verrier',
    index: '01',
    title: 'Maison Verrier',
    client: 'Verrier Paris',
    category: 'Luxury Fashion',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'maisonverrier.paris',
    summary:
      'Autumn/Winter couture digital flagship designed around full-bleed editorial lookbook spreads, whisper-quiet typography, and instant private client fitting reservations.',
    deliverables: ['Art Direction', 'Lookbook System', 'Interactive Motion'],
    archetype: 'atelier-lookbook',
    palette: {
      bg: '#F4F1EC',
      surface: '#EAE4DA',
      ink: '#141311',
      muted: '#6E685F',
      accent: '#B34329',
    },
    masthead: 'VERRIER — AW26',
    subline: 'SILHOUETTES IN RAW LINEN & SCULPTED WOOL',
    featuredStat: '18 Looks · Paris',
  },
  {
    id: 'kurokawa-atelier',
    index: '02',
    title: 'Kurokawa & Partners',
    client: 'Kurokawa Architecture',
    category: 'Architecture',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'kurokawa-arch.jp',
    summary:
      'Monolithic architectural monograph showcasing concrete civic pavilions, structural elevation drawings, and spatial daylight studies across Kyoto and Zurich.',
    deliverables: ['Monograph Grid', 'Elevation Archive', 'WebGL Transitions'],
    archetype: 'brutalist-monograph',
    palette: {
      bg: '#EBEBEB',
      surface: '#DFDFDF',
      ink: '#0D0D0D',
      muted: '#5E5E5E',
      accent: '#FF4D24',
    },
    masthead: 'KUROKAWA ARCHITECTS',
    subline: 'MONOGRAPH NO. 14 · CONCRETE & LIGHT',
    featuredStat: '42 Works · Kyoto',
  },
  {
    id: 'fondazione-lumen',
    index: '03',
    title: 'Fondazione Lumen',
    client: 'Fondazione Lumen Milan',
    category: 'Cultural Publication',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'fondazionelumen.org',
    summary:
      'Biannual contemporary art and architectural theory journal uniting long-form critical essays, exhibition calendars, and multi-column Swiss typesetting.',
    deliverables: ['Editorial System', 'Essay Reader', 'Exhibition Index'],
    archetype: 'biennale-journal',
    palette: {
      bg: '#111110',
      surface: '#1C1C1A',
      ink: '#F5F4F0',
      muted: '#9C9A93',
      accent: '#FF4D24',
    },
    masthead: 'LUMEN JOURNAL · ISSUE 09',
    subline: 'ESSAYS ON SPACE, SOUND & MEMORY',
    featuredStat: 'Milan · Autumn',
  },
  {
    id: 'atelier-solis',
    index: '04',
    title: 'Atelier Solis',
    client: 'Solis Milano',
    category: 'Luxury Fashion',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'ateliersolis.com',
    summary:
      'Runway capsule portal for an independent Milanese tailoring house featuring kinetic editorial plates, fabric provenance indices, and showroom appointment booking.',
    deliverables: ['Runway Showcase', 'Editorial Typography', 'Showroom Flow'],
    archetype: 'maison-runway',
    palette: {
      bg: '#181615',
      surface: '#252220',
      ink: '#F7F4EF',
      muted: '#A69F95',
      accent: '#D97B48',
    },
    masthead: 'SOLIS MILANO',
    subline: 'TAILORED ARCHIVE · COLLECTION IV',
    featuredStat: 'Milan · Runway',
  },
  {
    id: 'nordic-pavilion',
    index: '05',
    title: 'Oslo Timber Pavilion',
    client: 'Nordform Studio',
    category: 'Architecture',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'oslopavilion.no',
    summary:
      'Interactive architectural competition dossier presenting cross-laminated timber acoustics, site topography contours, and civic promenade studies.',
    deliverables: ['Competition Microsite', 'Drawing Viewer', 'Press Kit'],
    archetype: 'spatial-pavilion',
    palette: {
      bg: '#F7F7F5',
      surface: '#ECECE7',
      ink: '#121311',
      muted: '#666861',
      accent: '#2B5B4E',
    },
    masthead: 'OSLO PAVILION 2026',
    subline: 'CIVIC TIMBER STRUCTURE · FJORD PROMENADE',
    featuredStat: '4,800 m² · Oslo',
  },
  {
    id: 'teatro-forma',
    index: '06',
    title: 'Teatro Nuovo',
    client: 'Teatro Nuovo Venezia',
    category: 'Cultural Publication',
    year: '2026',
    sprintDuration: '24h Sprint',
    slug: 'teatronuovo.it',
    summary:
      'Season announcement and cultural calendar for Venice’s avant-garde chamber opera, pairing dramatic chiaroscuro visuals with instant repertoire filtering.',
    deliverables: ['Season Identity', 'Program Grid', 'Ticket Concierge'],
    archetype: 'opera-season',
    palette: {
      bg: '#0D0E12',
      surface: '#171920',
      ink: '#F2F0EB',
      muted: '#8E929E',
      accent: '#E04F33',
    },
    masthead: 'TEATRO NUOVO',
    subline: 'STAGIONE 2026 · VENEZIA',
    featuredStat: '12 Premieres',
  },
  {
    id: 'calibre-voss',
    index: '07',
    title: 'Voss Genève',
    client: 'Voss Horlogerie',
    category: 'Luxury Fashion',
    year: '2025',
    sprintDuration: '24h Sprint',
    slug: 'voss-geneve.ch',
    summary:
      'High-horology collector monograph spotlighting mechanical tourbillon editions, hand-beveled dial finishes, and private salon allocations.',
    deliverables: ['Collector Portal', 'Macro Showcase', 'Allocation Form'],
    archetype: 'horology-editorial',
    palette: {
      bg: '#F2F2F0',
      surface: '#E4E4E0',
      ink: '#111111',
      muted: '#636360',
      accent: '#FF4D24',
    },
    masthead: 'VOSS GENÈVE',
    subline: 'CALIBRE 07 · ULTRA-THIN MONOGRAPH',
    featuredStat: '25 Pieces · Geneva',
  },
  {
    id: 'casa-terracotta',
    index: '08',
    title: 'Casa Alentejo',
    client: 'Estúdio Barroso',
    category: 'Architecture',
    year: '2025',
    sprintDuration: '24h Sprint',
    slug: 'casaalentejo.pt',
    summary:
      'Residential architectural case study celebrating rammed-earth courtyards, shadow-line geometry, and Mediterranean passive thermal design.',
    deliverables: ['Project Monograph', 'Material Index', 'Press Archive'],
    archetype: 'timber-residence',
    palette: {
      bg: '#F5EFE8',
      surface: '#E9DFD3',
      ink: '#1A1613',
      muted: '#74685E',
      accent: '#C4532E',
    },
    masthead: 'CASA ALENTEJO',
    subline: 'ESTÚDIO BARROSO · MONOLITHIC COURTYARD',
    featuredStat: '620 m² · Portugal',
  },
  {
    id: 'kunsthalle-basel',
    index: '09',
    title: 'Edition 04 Monograph',
    client: 'Edition Basel Press',
    category: 'Cultural Publication',
    year: '2025',
    sprintDuration: '24h Sprint',
    slug: 'editionbasel.ch',
    summary:
      'Digital catalogue raisonné and Swiss typographic archive documenting fifty years of constructive graphic art and architectural print.',
    deliverables: ['Digital Archive', 'Index Search', 'Print Specimen'],
    archetype: 'archive-index',
    palette: {
      bg: '#FFFFFF',
      surface: '#F0F0EE',
      ink: '#0A0A0A',
      muted: '#646464',
      accent: '#FF4D24',
    },
    masthead: 'EDITION BASEL',
    subline: 'CATALOGUE RAISONNÉ · 1974–2025',
    featuredStat: '340 Plates · Basel',
  },
  {
    id: 'maison-celeste',
    index: '10',
    title: 'Céleste Cashmere',
    client: 'Céleste Paris',
    category: 'Luxury Fashion',
    year: '2025',
    sprintDuration: '24h Sprint',
    slug: 'celesteparis.fr',
    summary:
      'Minimalist knitwear capsule experience built with generous gallery whitespace, tactile swatch inspection, and editorial campaign sequencing.',
    deliverables: ['Capsule Flagship', 'Swatch System', 'Editorial Grid'],
    archetype: 'silk-capsule',
    palette: {
      bg: '#ECEAE4',
      surface: '#DFDCD4',
      ink: '#151412',
      muted: '#6E6B64',
      accent: '#23201E',
    },
    masthead: 'CÉLESTE PARIS',
    subline: 'ESSENTIALS IN UNDYED MONGOLIAN CASHMERE',
    featuredStat: 'Paris · Capsule',
  },
  {
    id: 'galerie-nord',
    index: '11',
    title: 'Galerie Nord',
    client: 'Kunstmuseum Stockholm',
    category: 'Cultural Publication',
    year: '2025',
    sprintDuration: '24h Sprint',
    slug: 'galerienord.se',
    summary:
      'Interactive curatorial guide for a Nordic minimalism retrospective featuring spatial room indexes, audio notes, and bilingual essays.',
    deliverables: ['Exhibition Guide', 'Curatorial Essays', 'Room Map'],
    archetype: 'museum-retrospective',
    palette: {
      bg: '#141517',
      surface: '#1E2024',
      ink: '#F4F4F2',
      muted: '#90949C',
      accent: '#FF4D24',
    },
    masthead: 'GALERIE NORD',
    subline: 'FORM & SILENCE · RETROSPECTIVE 2025',
    featuredStat: 'Stockholm · Hall B',
  },
  {
    id: 'therme-vals-digital',
    index: '12',
    title: 'Atelier Graubünden',
    client: 'Graubünden Bau',
    category: 'Architecture',
    year: '2025',
    sprintDuration: '24h Sprint',
    slug: 'graubuenden-bau.ch',
    summary:
      'Alpine architectural portfolio showcasing quartzite stone bathhouses, timber mountain cabins, and high-altitude structural engineering.',
    deliverables: ['Portfolio System', 'Material Library', 'Studio Profile'],
    archetype: 'alpine-sanctuary',
    palette: {
      bg: '#E8ECEB',
      surface: '#D8DFDD',
      ink: '#101413',
      muted: '#57625F',
      accent: '#FF4D24',
    },
    masthead: 'GRAUBÜNDEN BAU',
    subline: 'ALPINE STONE & TIMBER ARCHITECTURE',
    featuredStat: '1,940m · Alps',
  },
];

export interface SphereTileSpec {
  id: string;
  baseProject: ProjectItem;
  variantSeed: number;
  label: string;
}

export const SPHERE_TILES: SphereTileSpec[] = Array.from({ length: 54 }, (_, i) => {
  const base = PROJECTS[i % PROJECTS.length];
  const edition = Math.floor(i / PROJECTS.length) + 1;
  return {
    id: `sphere-tile-${i}`,
    baseProject: base,
    variantSeed: i,
    label: edition === 1 ? base.title : `${base.title} · Vol. ${edition}`,
  };
});
