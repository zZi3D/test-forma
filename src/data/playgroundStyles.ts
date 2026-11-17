import { IndustryFilter } from './projects';

export type PlaygroundStyleId =
  | 'glassmorphism'
  | 'claymorphism'
  | 'cyberpunk'
  | 'illustration'
  | 'candy-pop'
  | 'pop-cartoon'
  | 'holographic-hud'
  | 'neon-dark'
  | 'cyber-id';

export interface PlaygroundTheme {
  id: PlaygroundStyleId;
  label: string;
  shortTag: string;
  matchedIndustry: IndustryFilter;
  isDark: boolean;
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  productBadge: string;
  productTitle: string;
  productSubtitle: string;
  productPrice: string;
  statusLabel: string;
  // Stage Styling Classes
  stageClass: string;
  stageBgStyle?: React.CSSProperties;
  navClass: string;
  navLinkClass: string;
  navActiveClass: string;
  statusPillClass: string;
  eyebrowClass: string;
  headlineClass: string;
  descClass: string;
  primaryBtnClass: string;
  primaryBtnStyle?: React.CSSProperties;
  secondaryBtnClass: string;
  cardClass: string;
  cardStyle?: React.CSSProperties;
  badgeClass: string;
  priceClass: string;
  accentHex: string;
  pulseGlowColor: string;
}

export const PLAYGROUND_THEMES: PlaygroundTheme[] = [
  {
    id: 'glassmorphism',
    label: 'Glassmorphism',
    shortTag: 'Frosted Depth',
    matchedIndustry: 'Tech & Products',
    isDark: false,
    eyebrow: 'SPATIAL GLASS // EDITION 01',
    headline: 'Light, depth & translucent clarity.',
    description:
      'Layered frosted panes catch ambient studio gradients while keeping every product action weightless and effortless.',
    primaryCta: 'Get Started →',
    secondaryCta: 'Watch Demo',
    productBadge: 'NEW EDITION',
    productTitle: 'Aura Glass Studio',
    productSubtitle: 'Adaptive interface kit · Spatial optics',
    productPrice: '€189',
    statusLabel: 'OPTICS ONLINE',
    stageClass: 'text-slate-900 border border-white/75 shadow-[0_24px_60px_-16px_rgba(30,41,59,0.16)]',
    stageBgStyle: {
      background:
        'radial-gradient(circle at 14% 18%, rgba(165, 180, 252, 0.58) 0%, transparent 48%), radial-gradient(circle at 86% 80%, rgba(251, 207, 232, 0.62) 0%, transparent 52%), radial-gradient(circle at 55% 35%, rgba(186, 230, 253, 0.55) 0%, transparent 55%), linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 52%, #FDF2F8 100%)',
    },
    navClass: 'bg-white/45 backdrop-blur-md border-b border-white/65',
    navLinkClass: 'text-slate-600 hover:text-slate-950',
    navActiveClass: 'text-indigo-700 font-semibold',
    statusPillClass: 'bg-white/60 text-indigo-700 border border-white/80',
    eyebrowClass: 'bg-white/55 text-indigo-700 border border-white/80 rounded-full px-3 py-1',
    headlineClass: 'font-semibold tracking-[-0.03em] text-slate-900',
    descClass: 'text-slate-600',
    primaryBtnClass:
      'rounded-full bg-slate-900 text-white shadow-[0_10px_24px_-6px_rgba(15,23,42,0.45)] hover:bg-indigo-600',
    secondaryBtnClass:
      'rounded-full bg-white/55 backdrop-blur-md text-slate-800 border border-white/80 hover:bg-white/80',
    cardClass:
      'rounded-2xl bg-gradient-to-br from-white/78 via-white/58 to-indigo-50/50 border border-white/85 shadow-[0_20px_44px_-12px_rgba(79,70,229,0.18),inset_0_1px_0_rgba(255,255,255,0.95)]',
    badgeClass: 'bg-indigo-600/12 text-indigo-700 border border-indigo-500/20 rounded-full',
    priceClass: 'text-slate-900',
    accentHex: '#6366F1',
    pulseGlowColor: 'rgba(99, 102, 241, 0.28)',
  },
  {
    id: 'claymorphism',
    label: 'Claymorphism',
    shortTag: 'Soft 3D Matte',
    matchedIndustry: 'Advisory & B2B',
    isDark: false,
    eyebrow: 'TACTILE CLAY // SOFT UI',
    headline: 'Friendly, pillowed & human-first.',
    description:
      'Rounded 3D matte surfaces with soft inner highlights turn complex products into approachable everyday tools.',
    primaryCta: 'Get Started →',
    secondaryCta: 'Watch Demo',
    productBadge: 'NEW EDITION',
    productTitle: 'Plush Pod Tactile',
    productSubtitle: 'Matte sculpted form · Zero harsh edges',
    productPrice: '€165',
    statusLabel: 'SOFT 3D READY',
    stageClass: 'text-[#1E293B] border border-white/90',
    stageBgStyle: {
      background: 'linear-gradient(145deg, #EEF1F8 0%, #E5E9F4 100%)',
    },
    navClass: 'bg-white/75 border-b border-slate-200/70',
    navLinkClass: 'text-slate-500 hover:text-slate-900',
    navActiveClass: 'text-[#E06D4B] font-semibold',
    statusPillClass:
      'bg-[#FFF3EE] text-[#D95A36] border border-white shadow-[0_4px_12px_rgba(224,109,75,0.14)]',
    eyebrowClass:
      'bg-white text-[#E06D4B] rounded-full px-3.5 py-1 shadow-[0_6px_14px_rgba(148,163,184,0.22),inset_0_2px_4px_rgba(255,255,255,0.9)]',
    headlineClass: 'font-bold tracking-[-0.025em] text-[#1E293B]',
    descClass: 'text-[#64748B]',
    primaryBtnClass:
      'rounded-2xl bg-[#E06D4B] text-white shadow-[0_12px_24px_-6px_rgba(224,109,75,0.48),inset_0_3px_5px_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(154,52,18,0.25)] hover:brightness-105',
    secondaryBtnClass:
      'rounded-2xl bg-white text-[#1E293B] shadow-[0_10px_22px_-6px_rgba(148,163,184,0.34),inset_0_2px_4px_rgba(255,255,255,1)] hover:bg-[#FAFBFD]',
    cardClass:
      'rounded-[28px] bg-white shadow-[12px_18px_36px_rgba(148,163,184,0.30),-8px_-8px_22px_rgba(255,255,255,0.95),inset_0_-4px_10px_rgba(203,213,225,0.35)]',
    badgeClass: 'bg-[#FFF1EC] text-[#D95A36] rounded-full',
    priceClass: 'text-[#1E293B]',
    accentHex: '#E06D4B',
    pulseGlowColor: 'rgba(224, 109, 75, 0.25)',
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    shortTag: 'High-Voltage Dark',
    matchedIndustry: 'Sports & Events',
    isDark: true,
    eyebrow: 'SYS // OVERDRIVE 2077',
    headline: 'HIGH-VOLTAGE. ZERO APOLOGIES.',
    description:
      'Carbon steel surfaces slashed with electric yellow, hot magenta, and chamfered tactical hardware framing.',
    primaryCta: 'Get Started →',
    secondaryCta: 'Watch Demo',
    productBadge: 'LIMITED DROP',
    productTitle: 'MK-IX Cyber Deck',
    productSubtitle: 'Carbon chassis · Neural overclock',
    productPrice: '€249',
    statusLabel: 'VOLT // 99.4%',
    stageClass: 'text-zinc-100 border border-[#FACC15]/45 shadow-[0_24px_60px_-14px_rgba(236,72,153,0.28)]',
    stageBgStyle: {
      background:
        'radial-gradient(circle at 82% 20%, rgba(236, 72, 153, 0.22) 0%, transparent 42%), radial-gradient(circle at 12% 85%, rgba(250, 204, 21, 0.14) 0%, transparent 45%), repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px), #0A0A0E',
    },
    navClass: 'bg-[#121218]/90 border-b border-[#FACC15]/30',
    navLinkClass: 'text-zinc-400 hover:text-[#FACC15]',
    navActiveClass: 'text-[#FACC15] font-bold',
    statusPillClass:
      'bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/50 font-mono-tabular',
    eyebrowClass:
      'bg-[#EC4899]/18 text-[#F472B6] border border-[#EC4899]/55 px-3 py-1 font-mono-tabular',
    headlineClass: 'font-extrabold uppercase tracking-[-0.02em] text-white',
    descClass: 'text-zinc-400',
    primaryBtnClass:
      'bg-[#FACC15] text-black font-extrabold uppercase tracking-wide shadow-[4px_4px_0_#EC4899] hover:bg-[#fde047]',
    primaryBtnStyle: {
      clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
    },
    secondaryBtnClass:
      'bg-zinc-900 text-[#EC4899] border border-[#EC4899]/70 font-mono-tabular uppercase hover:bg-[#EC4899]/15',
    cardClass:
      'bg-[#13131A] border border-[#FACC15]/45 shadow-[8px_8px_0_rgba(236,72,153,0.45)]',
    cardStyle: {
      clipPath: 'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))',
    },
    badgeClass: 'bg-[#EC4899] text-white font-mono-tabular uppercase',
    priceClass: 'text-[#FACC15] font-mono-tabular',
    accentHex: '#FACC15',
    pulseGlowColor: 'rgba(236, 72, 153, 0.34)',
  },
  {
    id: 'illustration',
    label: 'Illustration Style',
    shortTag: 'Organic & Drawn',
    matchedIndustry: 'Salons & Local',
    isDark: false,
    eyebrow: 'CRAFTED BY HAND · ATELIER',
    headline: 'Warm paper, ink & living craft.',
    description:
      'Hand-drawn botanical strokes, organic shapes, and warm archival paper bring unmistakable soul to local & creative brands.',
    primaryCta: 'Get Started →',
    secondaryCta: 'Watch Demo',
    productBadge: 'ARTISAN PICK',
    productTitle: 'Botanical Sketch Kit',
    productSubtitle: 'Archival linen · Hand-inked artwork',
    productPrice: '€129',
    statusLabel: 'SMALL BATCH',
    stageClass: 'text-[#233228] border border-[#2F4538]/18 shadow-[0_20px_50px_-16px_rgba(47,69,56,0.16)]',
    stageBgStyle: {
      background:
        'radial-gradient(circle at 86% 18%, rgba(217, 119, 87, 0.14) 0%, transparent 45%), radial-gradient(circle at 12% 88%, rgba(132, 169, 140, 0.18) 0%, transparent 45%), #FBF6EC',
    },
    navClass: 'bg-[#F6EFE2] border-b border-[#2F4538]/12',
    navLinkClass: 'text-[#5A6B5F] hover:text-[#233228]',
    navActiveClass: 'text-[#C46243] font-semibold',
    statusPillClass: 'bg-[#EAE2D2] text-[#2F4538] border border-[#2F4538]/15',
    eyebrowClass: 'bg-[#EFE6D5] text-[#B85739] border border-[#C46243]/25 rounded-full px-3 py-1',
    headlineClass: 'font-editorial font-semibold tracking-[-0.02em] text-[#233228]',
    descClass: 'text-[#57685C]',
    primaryBtnClass:
      'rounded-full bg-[#2F4538] text-[#FBF6EC] shadow-[0_8px_18px_-6px_rgba(47,69,56,0.4)] hover:bg-[#C46243]',
    secondaryBtnClass:
      'rounded-full bg-transparent text-[#2F4538] border-2 border-[#2F4538]/35 hover:border-[#2F4538] hover:bg-[#2F4538]/5',
    cardClass:
      'rounded-[28px] bg-[#FFFDF8] border-2 border-[#2F4538]/20 shadow-[0_14px_30px_-12px_rgba(47,69,56,0.16)]',
    badgeClass: 'bg-[#D97757]/15 text-[#B85739] rounded-full',
    priceClass: 'text-[#2F4538] font-editorial',
    accentHex: '#C46243',
    pulseGlowColor: 'rgba(217, 119, 87, 0.26)',
  },
  {
    id: 'candy-pop',
    label: 'Candy Pop Art',
    shortTag: 'Dopamine Bright',
    matchedIndustry: 'Retail & Webshops',
    isDark: false,
    eyebrow: 'SWEET DROP · LIMITED BATCH',
    headline: 'Bright joy that converts fast.',
    description:
      'Juicy strawberry, lemon & mint accents with playful halftone texture built to spark smiles and instant checkouts.',
    primaryCta: 'Get Started →',
    secondaryCta: 'Watch Demo',
    productBadge: 'BESTSELLER ★',
    productTitle: 'Sugar Rush Bundle',
    productSubtitle: 'Glossy retail pack · Same-day ship',
    productPrice: '€48',
    statusLabel: '4.9 ★ RATED',
    stageClass: 'text-[#1C1917] border-2 border-[#FF3B6B]/25 shadow-[0_24px_55px_-16px_rgba(255,59,107,0.22)]',
    stageBgStyle: {
      backgroundImage:
        'radial-gradient(rgba(255, 59, 107, 0.14) 1.5px, transparent 1.5px), linear-gradient(135deg, #FFFDF5 0%, #FFF1F5 55%, #ECFDF5 100%)',
      backgroundSize: '18px 18px, 100% 100%',
    },
    navClass: 'bg-white/90 border-b border-pink-200/80',
    navLinkClass: 'text-stone-500 hover:text-[#FF3B6B]',
    navActiveClass: 'text-[#FF3B6B] font-bold',
    statusPillClass: 'bg-[#FFD60A] text-stone-900 font-bold border border-amber-400',
    eyebrowClass: 'bg-[#34D399]/25 text-emerald-900 border border-[#34D399] rounded-full px-3 py-1 font-bold',
    headlineClass: 'font-extrabold tracking-[-0.03em] text-stone-900',
    descClass: 'text-stone-600',
    primaryBtnClass:
      'rounded-full bg-[#FF3B6B] text-white font-bold shadow-[0_10px_22px_-6px_rgba(255,59,107,0.55),inset_0_3px_0_rgba(255,255,255,0.35)] hover:bg-[#e11d48]',
    secondaryBtnClass:
      'rounded-full bg-[#FFD60A] text-stone-900 font-bold shadow-[0_8px_18px_-6px_rgba(234,179,8,0.45),inset_0_2px_0_rgba(255,255,255,0.6)] hover:bg-amber-300',
    cardClass:
      'rounded-3xl bg-white border-2 border-pink-200 shadow-[0_20px_40px_-14px_rgba(255,59,107,0.24)]',
    badgeClass: 'bg-[#FFD60A] text-stone-950 font-extrabold rounded-full -rotate-2 shadow-xs',
    priceClass: 'text-[#FF3B6B] font-extrabold',
    accentHex: '#FF3B6B',
    pulseGlowColor: 'rgba(255, 59, 107, 0.28)',
  },
  {
    id: 'pop-cartoon',
    label: 'Pop Art Cartoon',
    shortTag: 'Comic Ink & Block',
    matchedIndustry: 'Sports & Events',
    isDark: false,
    eyebrow: 'ISSUE #06 // BOLD PRINT',
    headline: 'IMPOSSIBLE TO SCROLL PAST.',
    description:
      'Thick 3px ink outlines, punchy primary colors, and hard offset comic shadows for brands that refuse to blend in.',
    primaryCta: 'Get Started →',
    secondaryCta: 'Watch Demo',
    productBadge: 'POW! NEW',
    productTitle: 'Comic Edition Box',
    productSubtitle: '3px ink frame · Hard shadow block',
    productPrice: '€95',
    statusLabel: 'ALL ACCESS!',
    stageClass: 'text-[#09090B] border-[3px] border-[#09090B] shadow-[10px_10px_0_#09090B]',
    stageBgStyle: {
      background: '#FAF6EB',
    },
    navClass: 'bg-[#FFD60A] border-b-[3px] border-[#09090B]',
    navLinkClass: 'text-[#09090B]/80 hover:text-[#09090B] font-bold',
    navActiveClass: 'text-[#2563EB] font-extrabold underline decoration-2 underline-offset-4',
    statusPillClass: 'bg-white text-[#09090B] border-2 border-[#09090B] font-extrabold shadow-[2px_2px_0_#09090B]',
    eyebrowClass: 'bg-[#2563EB] text-white border-2 border-[#09090B] px-3 py-1 font-extrabold shadow-[3px_3px_0_#09090B]',
    headlineClass: 'font-black uppercase tracking-[-0.02em] text-[#09090B]',
    descClass: 'text-zinc-800 font-medium',
    primaryBtnClass:
      'rounded-xl bg-[#EF4444] text-white border-[2.5px] border-[#09090B] font-extrabold uppercase shadow-[4px_4px_0_#09090B] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#09090B]',
    secondaryBtnClass:
      'rounded-xl bg-white text-[#09090B] border-[2.5px] border-[#09090B] font-extrabold uppercase shadow-[4px_4px_0_#09090B] hover:bg-[#FFD60A]',
    cardClass:
      'rounded-2xl bg-white border-[3px] border-[#09090B] shadow-[7px_7px_0_#09090B]',
    badgeClass: 'bg-[#FFD60A] text-[#09090B] border-2 border-[#09090B] font-black uppercase shadow-[3px_3px_0_#09090B]',
    priceClass: 'text-[#2563EB] font-black',
    accentHex: '#EF4444',
    pulseGlowColor: 'rgba(37, 99, 235, 0.28)',
  },
  {
    id: 'holographic-hud',
    label: 'Holographic HUD & Sci-Fi',
    shortTag: 'Telemetry Grid',
    matchedIndustry: 'Tech & Products',
    isDark: true,
    eyebrow: '[ HUD-07 // SECTOR ORBIT ]',
    headline: 'Precision orbital interface.',
    description:
      'Deep space navy blueprint grid with luminous cyan wireframe optics, telemetry brackets, and crisp scanlines.',
    primaryCta: 'Get Started →',
    secondaryCta: 'Watch Demo',
    productBadge: 'MK-VII CORE',
    productTitle: 'Orbital Wireframe Unit',
    productSubtitle: 'Telemetry array · Holographic sync',
    productPrice: '€320',
    statusLabel: 'SIGNAL LOCKED',
    stageClass: 'text-sky-100 border border-sky-400/35 shadow-[0_24px_60px_-14px_rgba(14,165,233,0.3)]',
    stageBgStyle: {
      backgroundImage:
        'linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px), radial-gradient(circle at 72% 45%, rgba(56, 189, 248, 0.16) 0%, transparent 55%), linear-gradient(180deg, #030917 0%, #07132B 100%)',
      backgroundSize: '28px 28px, 28px 28px, 100% 100%, 100% 100%',
    },
    navClass: 'bg-[#051025]/85 border-b border-sky-400/25',
    navLinkClass: 'text-sky-300/70 hover:text-sky-200 font-mono-tabular',
    navActiveClass: 'text-sky-300 font-bold',
    statusPillClass: 'bg-sky-400/12 text-sky-300 border border-sky-400/45 font-mono-tabular',
    eyebrowClass: 'bg-sky-500/12 text-sky-300 border border-sky-400/40 px-3 py-1 font-mono-tabular',
    headlineClass: 'font-semibold tracking-[-0.02em] text-white',
    descClass: 'text-sky-200/75',
    primaryBtnClass:
      'rounded-md bg-sky-400 text-[#030917] font-mono-tabular font-bold uppercase shadow-[0_0_24px_rgba(56,189,248,0.45)] hover:bg-sky-300',
    secondaryBtnClass:
      'rounded-md bg-sky-950/60 text-sky-300 border border-sky-400/50 font-mono-tabular uppercase hover:bg-sky-400/15',
    cardClass:
      'rounded-xl bg-[#07142C]/85 border border-sky-400/45 shadow-[0_0_32px_rgba(56,189,248,0.16),inset_0_0_20px_rgba(56,189,248,0.08)]',
    badgeClass: 'bg-sky-400/15 text-sky-300 border border-sky-400/50 font-mono-tabular',
    priceClass: 'text-sky-300 font-mono-tabular',
    accentHex: '#38BDF8',
    pulseGlowColor: 'rgba(56, 189, 248, 0.34)',
  },
  {
    id: 'neon-dark',
    label: 'Neon Dark Mode',
    shortTag: 'Luminous Emerald',
    matchedIndustry: 'Tech & Products',
    isDark: true,
    eyebrow: 'NEON PULSE // NIGHT MODE',
    headline: 'Luminous precision after dark.',
    description:
      'Pitch-black canvas ignited by electric emerald glow borders, crisp luminous typography, and nocturnal depth.',
    primaryCta: 'Get Started →',
    secondaryCta: 'Watch Demo',
    productBadge: 'GLOW EDITION',
    productTitle: 'Pulse Synth Module',
    productSubtitle: 'Luminous ring · Ultra-low latency',
    productPrice: '€215',
    statusLabel: 'ACTIVE · 60FPS',
    stageClass: 'text-emerald-50 border border-emerald-400/35 shadow-[0_24px_60px_-14px_rgba(16,185,129,0.26)]',
    stageBgStyle: {
      background:
        'radial-gradient(circle at 75% 35%, rgba(16, 185, 129, 0.18) 0%, transparent 45%), radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.14) 0%, transparent 45%), #050507',
    },
    navClass: 'bg-[#09090D]/90 border-b border-emerald-500/25',
    navLinkClass: 'text-zinc-400 hover:text-emerald-300',
    navActiveClass: 'text-emerald-400 font-semibold',
    statusPillClass: 'bg-emerald-500/12 text-emerald-300 border border-emerald-400/45 shadow-[0_0_12px_rgba(16,185,129,0.25)]',
    eyebrowClass: 'bg-emerald-500/12 text-emerald-300 border border-emerald-400/40 rounded-full px-3 py-1',
    headlineClass: 'font-bold tracking-[-0.03em] text-white',
    descClass: 'text-zinc-400',
    primaryBtnClass:
      'rounded-full bg-emerald-400 text-zinc-950 font-bold shadow-[0_0_26px_rgba(16,185,129,0.55)] hover:bg-emerald-300',
    secondaryBtnClass:
      'rounded-full bg-transparent text-emerald-300 border border-emerald-400/60 shadow-[0_0_14px_rgba(16,185,129,0.16)] hover:bg-emerald-400/12',
    cardClass:
      'rounded-2xl bg-[#0B0C10] border border-emerald-400/45 shadow-[0_0_34px_rgba(16,185,129,0.16),inset_0_1px_0_rgba(16,185,129,0.3)]',
    badgeClass: 'bg-emerald-400/15 text-emerald-300 border border-emerald-400/45 rounded-full',
    priceClass: 'text-emerald-400 font-mono-tabular',
    accentHex: '#10B981',
    pulseGlowColor: 'rgba(16, 185, 129, 0.36)',
  },
  {
    id: 'cyber-id',
    label: 'Cyber-ID & Translucent Cards',
    shortTag: 'Biometric Slate',
    matchedIndustry: 'Advisory & B2B',
    isDark: true,
    eyebrow: 'ID // 09-VERIFIED CLEARANCE',
    headline: 'Trusted identity in sharp layers.',
    description:
      'Frosted dark identity cards, micro-grid hairlines, and crisp biometric badges for modern security & fintech platforms.',
    primaryCta: 'Get Started →',
    secondaryCta: 'Watch Demo',
    productBadge: 'VERIFIED PASS',
    productTitle: 'Bio-Key Access Card',
    productSubtitle: 'Encrypted NFC · Frosted titanium pass',
    productPrice: '€140',
    statusLabel: 'AUTH // 256-BIT',
    stageClass: 'text-slate-100 border border-slate-500/30 shadow-[0_24px_60px_-14px_rgba(15,23,42,0.55)]',
    stageBgStyle: {
      backgroundImage:
        'radial-gradient(circle at 20% 20%, rgba(129, 140, 248, 0.16) 0%, transparent 45%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), #101319',
      backgroundSize: '100% 100%, 36px 36px, 36px 36px, 100% 100%',
    },
    navClass: 'bg-slate-900/75 backdrop-blur-md border-b border-white/10',
    navLinkClass: 'text-slate-400 hover:text-white font-mono-tabular',
    navActiveClass: 'text-indigo-300 font-semibold',
    statusPillClass: 'bg-white/8 text-slate-200 border border-white/18 font-mono-tabular',
    eyebrowClass: 'bg-white/6 text-indigo-300 border border-white/15 rounded-md px-3 py-1 font-mono-tabular',
    headlineClass: 'font-semibold tracking-[-0.025em] text-white',
    descClass: 'text-slate-400',
    primaryBtnClass:
      'rounded-xl bg-white text-slate-950 font-semibold shadow-[0_10px_24px_-6px_rgba(255,255,255,0.22)] hover:bg-indigo-100',
    secondaryBtnClass:
      'rounded-xl bg-white/6 backdrop-blur-md text-slate-200 border border-white/18 font-mono-tabular hover:bg-white/12',
    cardClass:
      'rounded-2xl bg-gradient-to-br from-slate-800/85 via-slate-900/78 to-slate-950/88 border border-white/20 shadow-[0_22px_44px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22)]',
    badgeClass: 'bg-indigo-400/15 text-indigo-200 border border-indigo-300/30 font-mono-tabular rounded-md',
    priceClass: 'text-white font-mono-tabular',
    accentHex: '#818CF8',
    pulseGlowColor: 'rgba(129, 140, 248, 0.30)',
  },
];

export interface PlaygroundIndustryCopy {
  brandName: string;
  navItems: [string, string, string];
  eyebrowTag: string;
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  productBadge: string;
  productTitle: string;
  productSubtitle: string;
  productPrice: string;
  statusLabel: string;
}

export const PLAYGROUND_INDUSTRY_COPY: Record<
  IndustryFilter,
  PlaygroundIndustryCopy
> = {
  'Advisory & B2B': {
    brandName: 'VANDENBERG ADVISORY',
    navItems: ['Practice', 'Track Record', 'Contact'],
    eyebrowTag: 'ADVISORY & B2B',
    headline: 'Trusted counsel, framed with clarity.',
    description:
      'Position senior expertise with calm visual authority so high-value clients trust your firm and book a consultation.',
    primaryCta: 'Book Consultation →',
    secondaryCta: 'View Case Studies',
    productBadge: 'CLIENT MANDATE',
    productTitle: 'Executive Strategy Retainer',
    productSubtitle: 'Senior partner access · 48h roadmap',
    productPrice: '€1,850',
    statusLabel: 'ACCEPTING CLIENTS',
  },
  'Salons & Local': {
    brandName: 'ATELIER NOIR STUDIO',
    navItems: ['Treatments', 'Pricing', 'Reviews'],
    eyebrowTag: 'SALONS & LOCAL',
    headline: 'Sharp craft & effortless chair bookings.',
    description:
      'Showcase your atmosphere, transparent € pricing, and 4.9★ reviews upfront to keep your weekly calendar full.',
    primaryCta: 'Book Appointment →',
    secondaryCta: 'See Price Menu',
    productBadge: '4.9 ★ RATED',
    productTitle: 'Signature Cut & Styling',
    productSubtitle: '45 min private session · Hot towel ritual',
    productPrice: '€55',
    statusLabel: 'OPEN · NEXT 14:30',
  },
  'Retail & Webshops': {
    brandName: 'GOODS & TREATS',
    navItems: ['Shop All', 'Gift Boxes', 'Reviews'],
    eyebrowTag: 'RETAIL & WEBSHOPS',
    headline: 'Tactile storefront built to convert.',
    description:
      'Irresistible product framing, bright social proof, and frictionless one-tap checkout that lifts average order value.',
    primaryCta: 'Add to Bag — €28 →',
    secondaryCta: 'Explore Bundles',
    productBadge: 'BESTSELLER ★',
    productTitle: 'Signature Treat Box',
    productSubtitle: 'Gift wrapped · Same-day dispatch',
    productPrice: '€28',
    statusLabel: 'SAME-DAY SHIP',
  },
  'Tech & Products': {
    brandName: 'SYNTHESIS SUITE',
    navItems: ['Platform', 'Workflows', 'Pricing'],
    eyebrowTag: 'TECH & PRODUCTS',
    headline: 'Complex software made crystal clear.',
    description:
      'Turn abstract workflows, hardware specs, or SaaS dashboards into tangible visual modules users grasp in seconds.',
    primaryCta: 'Start Free Trial →',
    secondaryCta: 'Watch Demo',
    productBadge: 'V2.4 RELEASE',
    productTitle: 'Pro Automation Workspace',
    productSubtitle: 'Live AI workflows · 99.99% uptime SLA',
    productPrice: '€89/mo',
    statusLabel: 'SYSTEMS LIVE',
  },
  'Sports & Events': {
    brandName: 'APEX PERFORMANCE',
    navItems: ['Programs', 'Coaching', 'Passes'],
    eyebrowTag: 'SPORTS & EVENTS',
    headline: 'High-energy momentum that fills spots.',
    description:
      'Kinetic typography, bold contrast, and urgent action triggers engineered to drive trial sessions and ticket drops.',
    primaryCta: 'Book Trial Session →',
    secondaryCta: 'View Schedule',
    productBadge: 'LIMITED SPOTS',
    productTitle: '8-Week Performance Club',
    productSubtitle: '1-on-1 coaching · Unlimited studio access',
    productPrice: '€129/mo',
    statusLabel: '3 SPOTS LEFT',
  },
};

