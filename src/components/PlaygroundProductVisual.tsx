import { PlaygroundStyleId } from '../data/playgroundStyles';

interface PlaygroundProductVisualProps {
  styleId: PlaygroundStyleId;
}

export function PlaygroundProductVisual({
  styleId,
}: PlaygroundProductVisualProps) {
  switch (styleId) {
    case 'glassmorphism':
      return (
        <svg viewBox="0 0 220 140" className="h-32 w-full" aria-hidden="true">
          <defs>
            <linearGradient id="glassOrb" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#F472B6" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="glassPane" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <circle cx="84" cy="70" r="44" fill="url(#glassOrb)" />
          <circle cx="152" cy="46" r="22" fill="#F472B6" fillOpacity="0.45" />
          <rect
            x="54"
            y="28"
            width="116"
            height="84"
            rx="18"
            fill="url(#glassPane)"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2"
          />
          <circle cx="88" cy="70" r="18" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
          <line x1="116" y1="58" x2="152" y2="58" stroke="rgba(15,23,42,0.55)" strokeWidth="4" strokeLinecap="round" />
          <line x1="116" y1="72" x2="144" y2="72" stroke="rgba(15,23,42,0.3)" strokeWidth="3" strokeLinecap="round" />
          <line x1="116" y1="84" x2="136" y2="84" stroke="rgba(99,102,241,0.65)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'claymorphism':
      return (
        <svg viewBox="0 0 220 140" className="h-32 w-full" aria-hidden="true">
          <defs>
            <radialGradient id="claySphere" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFB097" />
              <stop offset="65%" stopColor="#E06D4B" />
              <stop offset="100%" stopColor="#B84B2A" />
            </radialGradient>
            <linearGradient id="clayBlock" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#DCE3F0" />
            </linearGradient>
          </defs>
          <ellipse cx="110" cy="122" rx="58" ry="10" fill="rgba(148,163,184,0.32)" />
          <rect x="46" y="34" width="128" height="82" rx="30" fill="url(#clayBlock)" stroke="#FFFFFF" strokeWidth="3" />
          <circle cx="88" cy="75" r="28" fill="url(#claySphere)" />
          <ellipse cx="78" cy="64" rx="9" ry="5" transform="rotate(-25 78 64)" fill="rgba(255,255,255,0.6)" />
          <rect x="128" y="54" width="28" height="14" rx="7" fill="#E06D4B" fillOpacity="0.22" />
          <rect x="128" y="78" width="28" height="18" rx="9" fill="#CBD5E1" fillOpacity="0.6" />
        </svg>
      );

    case 'cyberpunk':
      return (
        <svg viewBox="0 0 220 140" className="h-32 w-full" aria-hidden="true">
          <polygon
            points="44,24 176,24 192,40 192,116 44,116 28,100 28,40"
            fill="#171722"
            stroke="#FACC15"
            strokeWidth="2.5"
          />
          <polygon
            points="54,36 164,36 176,48 176,104 54,104 42,92 42,48"
            fill="#0D0D14"
            stroke="#EC4899"
            strokeWidth="1.5"
          />
          <rect x="58" y="50" width="52" height="40" fill="#FACC15" fillOpacity="0.14" stroke="#FACC15" strokeWidth="1.5" />
          <polygon points="72,62 96,70 72,78" fill="#FACC15" />
          <line x1="124" y1="54" x2="164" y2="54" stroke="#EC4899" strokeWidth="4" />
          <line x1="124" y1="68" x2="156" y2="68" stroke="#FACC15" strokeWidth="3" />
          <line x1="124" y1="82" x2="148" y2="82" stroke="#38BDF8" strokeWidth="3" />
          <circle cx="166" cy="92" r="4" fill="#EC4899" />
        </svg>
      );

    case 'illustration':
      return (
        <svg viewBox="0 0 220 140" className="h-32 w-full" aria-hidden="true">
          <circle cx="112" cy="68" r="48" fill="#EFE4D1" />
          {/* Hand-drawn botanical stems */}
          <path d="M110 112 C108 82 112 52 126 24" fill="none" stroke="#2F4538" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M112 78 C92 68 78 52 72 34" fill="none" stroke="#2F4538" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="70" cy="38" rx="14" ry="8" transform="rotate(-35 70 38)" fill="#84A98C" stroke="#2F4538" strokeWidth="2" />
          <ellipse cx="130" cy="34" rx="15" ry="9" transform="rotate(28 130 34)" fill="#D97757" fillOpacity="0.82" stroke="#2F4538" strokeWidth="2" />
          <ellipse cx="136" cy="64" rx="13" ry="7" transform="rotate(-18 136 64)" fill="#84A98C" stroke="#2F4538" strokeWidth="2" />
          {/* Sketchy ceramic vessel */}
          <path
            d="M84 82 L136 82 L142 118 C142 122 138 124 134 124 L86 124 C82 124 78 122 78 118 Z"
            fill="#FFFDF8"
            stroke="#2F4538"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <line x1="90" y1="96" x2="130" y2="96" stroke="#C46243" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'candy-pop':
      return (
        <svg viewBox="0 0 220 140" className="h-32 w-full" aria-hidden="true">
          <ellipse cx="110" cy="122" rx="54" ry="8" fill="rgba(255,59,107,0.16)" />
          {/* Ribbon bow */}
          <ellipse cx="96" cy="36" rx="14" ry="9" transform="rotate(-20 96 36)" fill="#FFD60A" stroke="#1C1917" strokeWidth="2" />
          <ellipse cx="124" cy="36" rx="14" ry="9" transform="rotate(20 124 36)" fill="#34D399" stroke="#1C1917" strokeWidth="2" />
          {/* Gift box */}
          <rect x="66" y="50" width="88" height="68" rx="14" fill="#FFE4EC" stroke="#1C1917" strokeWidth="2.2" />
          <rect x="60" y="42" width="100" height="18" rx="8" fill="#FF3B6B" stroke="#1C1917" strokeWidth="2.2" />
          <rect x="102" y="42" width="16" height="76" fill="#2563EB" stroke="#1C1917" strokeWidth="2" />
          <circle cx="110" cy="38" r="6" fill="#FFD60A" stroke="#1C1917" strokeWidth="2" />
          {/* Pop sparkles */}
          <path d="M40 48 L44 38 L48 48 L58 52 L48 56 L44 66 L40 56 L30 52 Z" fill="#FFD60A" />
          <circle cx="178" cy="78" r="6" fill="#34D399" />
          <circle cx="48" cy="94" r="5" fill="#FF3B6B" />
        </svg>
      );

    case 'pop-cartoon':
      return (
        <svg viewBox="0 0 220 140" className="h-32 w-full" aria-hidden="true">
          {/* Comic starburst behind box */}
          <polygon
            points="110,10 124,28 148,18 148,42 174,44 162,66 184,82 158,92 164,116 138,110 126,132 108,114 86,130 82,106 56,112 64,88 40,80 62,64 52,40 78,42 84,18 102,28"
            fill="#FFD60A"
            stroke="#09090B"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Bold black offset box */}
          <rect x="76" y="44" width="76" height="60" rx="8" fill="#09090B" />
          <rect x="70" y="38" width="76" height="60" rx="8" fill="#2563EB" stroke="#09090B" strokeWidth="3" />
          {/* Lightning icon */}
          <polygon
            points="114,48 96,70 108,70 102,90 122,66 110,66"
            fill="#FFD60A"
            stroke="#09090B"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'holographic-hud':
      return (
        <svg viewBox="0 0 220 140" className="h-32 w-full" aria-hidden="true">
          {/* HUD corner brackets */}
          <path d="M36 32 L36 20 L52 20 M184 32 L184 20 L168 20 M36 108 L36 120 L52 120 M184 108 L184 120 L168 120" fill="none" stroke="#38BDF8" strokeWidth="2" />
          {/* Orbital rings */}
          <circle cx="110" cy="70" r="44" fill="none" stroke="#38BDF8" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="5 4" />
          <ellipse cx="110" cy="70" rx="52" ry="18" transform="rotate(-16 110 70)" fill="none" stroke="#38BDF8" strokeOpacity="0.65" strokeWidth="1.5" />
          {/* Wireframe octahedron */}
          <polygon points="110,28 144,70 110,112 76,70" fill="rgba(56,189,248,0.12)" stroke="#38BDF8" strokeWidth="2" />
          <line x1="110" y1="28" x2="110" y2="112" stroke="#38BDF8" strokeOpacity="0.7" strokeWidth="1.5" />
          <line x1="76" y1="70" x2="144" y2="70" stroke="#38BDF8" strokeOpacity="0.7" strokeWidth="1.5" />
          <circle cx="110" cy="70" r="5" fill="#7DD3FC" />
        </svg>
      );

    case 'neon-dark':
      return (
        <svg viewBox="0 0 220 140" className="h-32 w-full" aria-hidden="true">
          <circle cx="110" cy="70" r="46" fill="rgba(16,185,129,0.08)" stroke="#10B981" strokeWidth="2.5" />
          <circle cx="110" cy="70" r="34" fill="none" stroke="#06B6D4" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="8 6" />
          {/* Neon equalizer bars */}
          <rect x="82" y="64" width="8" height="24" rx="4" fill="#10B981" />
          <rect x="96" y="48" width="8" height="40" rx="4" fill="#34D399" />
          <rect x="110" y="38" width="8" height="50" rx="4" fill="#6EE7B7" />
          <rect x="124" y="54" width="8" height="34" rx="4" fill="#06B6D4" />
          <rect x="138" y="68" width="8" height="20" rx="4" fill="#10B981" />
        </svg>
      );

    case 'cyber-id':
      return (
        <svg viewBox="0 0 220 140" className="h-32 w-full" aria-hidden="true">
          <rect
            x="40"
            y="24"
            width="140"
            height="92"
            rx="14"
            fill="rgba(30,41,59,0.72)"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="1.8"
          />
          {/* Biometric circle */}
          <circle cx="76" cy="64" r="18" fill="rgba(129,140,248,0.16)" stroke="#818CF8" strokeWidth="1.8" />
          <circle cx="76" cy="64" r="10" fill="none" stroke="#C7D2FE" strokeWidth="1.2" strokeDasharray="4 3" />
          <circle cx="76" cy="64" r="3.5" fill="#FFFFFF" />
          {/* Identity data lines */}
          <line x1="106" y1="52" x2="162" y2="52" stroke="#F8FAFC" strokeWidth="4" strokeLinecap="round" />
          <line x1="106" y1="65" x2="148" y2="65" stroke="rgba(148,163,184,0.6)" strokeWidth="3" strokeLinecap="round" />
          <line x1="106" y1="77" x2="136" y2="77" stroke="#818CF8" strokeWidth="3" strokeLinecap="round" />
          {/* Barcode strip bottom */}
          <g fill="rgba(255,255,255,0.55)">
            <rect x="58" y="96" width="3" height="10" />
            <rect x="64" y="96" width="6" height="10" />
            <rect x="73" y="96" width="2" height="10" />
            <rect x="78" y="96" width="5" height="10" />
            <rect x="86" y="96" width="3" height="10" />
            <rect x="93" y="96" width="7" height="10" />
            <rect x="104" y="96" width="2" height="10" />
            <rect x="110" y="96" width="4" height="10" />
          </g>
          <rect x="132" y="95" width="32" height="12" rx="3" fill="rgba(16,185,129,0.22)" stroke="#34D399" strokeWidth="1" />
        </svg>
      );
  }
}
