import { useEffect, useState } from 'react';
import {
  ArrowRight,
  CloudSun,
  Compass,
  Loader2,
  MapPin,
  Moon,
  Ruler,
  Sun,
  Umbrella,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import gardenPavilionImg from '../../assets/images/demo_buitenwerk_garden_1794958789119.jpg';
import {
  BUITENWERK_QUICK_LOCATIONS,
  DemoLang,
} from '../../data/examplesDemosContent';

interface DemoBuitenwerkBandProps {
  lang: DemoLang;
  onBuildInStyle: (description: string) => void;
}

interface LocationWeatherResult {
  addressLabel: string;
  city: string;
  lat: number;
  lon: number;
  days: {
    date: string;
    maxTemp: number;
    rainProb: number;
  }[];
  source: 'live' | 'fallback';
}

const FALLBACK_LOCATION: LocationWeatherResult = {
  addressLabel: 'Dam, 1012 JS Amsterdam',
  city: 'Amsterdam',
  lat: 52.3729,
  lon: 4.8941,
  days: [
    { date: '2026-11-18', maxTemp: 13, rainProb: 15 },
    { date: '2026-11-19', maxTemp: 14, rainProb: 20 },
    { date: '2026-11-20', maxTemp: 11, rainProb: 55 },
  ],
  source: 'fallback',
};

const WORK_TYPES = [
  { id: 'terrace', ratePerSqm: 135, label: { nl: 'Natuursteen Terras', en: 'Natural Stone Patio' } },
  { id: 'roof', ratePerSqm: 185, label: { nl: 'Zinken & Sedum Dakwerk', en: 'Zinc & Sedum Roofing' } },
  { id: 'pavilion', ratePerSqm: 390, label: { nl: 'Ceder Tuinpaviljoen', en: 'Cedar Garden Pavilion' } },
];

export function DemoBuitenwerkBand({
  lang,
  onBuildInStyle,
}: DemoBuitenwerkBandProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isDark, setIsDark] = useState(true);
  const [query, setQuery] = useState('1012JS');
  const [loading, setLoading] = useState(false);
  const [weatherCycle, setWeatherCycle] = useState(0);
  const [locWeather, setLocWeather] =
    useState<LocationWeatherResult>(FALLBACK_LOCATION);
  const [workTypeId, setWorkTypeId] = useState<string>('terrace');
  const [areaSqm, setAreaSqm] = useState<number>(48);
  const [estimateSent, setEstimateSent] = useState(false);

  const lookupLocationAndWeather = async (searchText: string) => {
    const cleanQ = searchText.trim();
    if (cleanQ.length < 2) return;
    setLoading(true);
    setEstimateSent(false);

    try {
      const pdokRes = await fetch(
        `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=${encodeURIComponent(cleanQ)}&rows=1`,
      );
      if (!pdokRes.ok) throw new Error('PDOK failed');
      const pdokData = (await pdokRes.json()) as {
        response?: {
          docs?: Array<{
            weergavenaam?: string;
            woonplaatsnaam?: string;
            centroide_ll?: string;
          }>;
        };
      };

      const doc = pdokData.response?.docs?.[0];
      if (!doc || !doc.centroide_ll) throw new Error('No address');

      const match = doc.centroide_ll.match(/POINT\(([-\d.]+)\s+([-\d.]+)\)/);
      if (!match) throw new Error('Invalid coords');

      const lon = Number(match[1]);
      const lat = Number(match[2]);

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}&daily=temperature_2m_max,precipitation_probability_max&timezone=Europe%2FAmsterdam&forecast_days=3`,
      );
      if (!weatherRes.ok) throw new Error('Weather failed');
      const weatherData = (await weatherRes.json()) as {
        daily?: {
          time: string[];
          temperature_2m_max: number[];
          precipitation_probability_max: number[];
        };
      };

      const days =
        weatherData.daily?.time.map((dt, idx) => ({
          date: dt,
          maxTemp: Math.round(weatherData.daily?.temperature_2m_max[idx] ?? 12),
          rainProb: Math.round(
            weatherData.daily?.precipitation_probability_max[idx] ?? 20,
          ),
        })) ?? FALLBACK_LOCATION.days;

      setLocWeather({
        addressLabel: doc.weergavenaam || cleanQ,
        city: doc.woonplaatsnaam || cleanQ,
        lat,
        lon,
        days,
        source: 'live',
      });
      setWeatherCycle((c) => c + 1);
    } catch {
      setLocWeather({
        ...FALLBACK_LOCATION,
        addressLabel: `${cleanQ} (NL)`,
        source: 'fallback',
      });
      setWeatherCycle((c) => c + 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void lookupLocationAndWeather('1012JS');
  }, []);

  const activeWork = WORK_TYPES.find((w) => w.id === workTypeId) ?? WORK_TYPES[0];
  const minEstimate = Math.round(areaSqm * activeWork.ratePerSqm * 0.92);
  const maxEstimate = Math.round(areaSqm * activeWork.ratePerSqm * 1.12);

  const scrollToTool = () => {
    document
      .getElementById('buitenwerk-pdok-tool')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const t = {
    nl: {
      demoTag: 'Demo 02 · Hovenier & Architecturaal Dakwerk',
      nav: ['Projecten', 'Tuinpaviljoens', 'Werkweer', 'Over ons'],
      ctaNav: 'Richtprijs',
      ctaNavDesktop: 'Richtprijs berekenen',
      headline: 'Buitenarchitectuur en dakwerk voor elk Nederlands seizoen.',
      sub: 'Van verduurzaamd cederhout en natuursteen tot waterdicht zinkwerk — op maat ontworpen rond jouw perceel en weersplanning.',
      ctaHero: 'Check locatie & richtprijs ↓',
      buildThis: 'Bouw in deze architectuur-stijl →',
      toolTitle: 'Live PDOK Overheids-adres + Open-Meteo Werkweer & m² Calculator',
      searchPlaceholder: 'Postcode of plaats (bijv. 2611GW)',
      checkBtn: 'Zoek locatie',
      dryDay: 'Ideaal buitenwerk',
      wetDay: 'Overkapping / voorbereiding',
      rainLabel: 'kans op neerslag',
      areaLabel: 'Oppervlakte',
      estimateLabel: 'Indicatieve projectrange (incl. montage)',
      requestBtn: 'Vraag maatwerk opname aan →',
      sentMsg: 'Opname-aanvraag met locatiegegevens klaargezet.',
      themeLabel: isDark ? 'Wissel naar lichte zandsteen-modus' : 'Wissel naar donkere pine-modus',
    },
    en: {
      demoTag: 'Demo 02 · Landscape & Architectural Roofing',
      nav: ['Projects', 'Pavilions', 'Weather Tool', 'Studio'],
      ctaNav: 'Estimate',
      ctaNavDesktop: 'Estimate Project',
      headline: 'Architectural gardens and roofing crafted for Dutch weather.',
      sub: 'From charred cedar pavilions and Belgian slate patios to precision zinc roofing — planned around real local site conditions.',
      ctaHero: 'Check site & estimate ↓',
      buildThis: 'Build in this pine-serif style →',
      toolTitle: 'Live Dutch PDOK Address API + Open-Meteo Site Weather & m² Estimator',
      searchPlaceholder: 'Postal code or city (e.g. 2611GW)',
      checkBtn: 'Lookup Site',
      dryDay: 'Clear outdoor build day',
      wetDay: 'Covered prep day',
      rainLabel: 'rain probability',
      areaLabel: 'Project Area',
      estimateLabel: 'Estimated turnkey range (incl. install)',
      requestBtn: 'Book on-site survey →',
      sentMsg: 'Survey request prepared with local coordinates & scope.',
      themeLabel: isDark ? 'Switch to light sandstone mode' : 'Switch to dark pine mode',
    },
  }[lang];

  return (
    <section
      aria-label={t.demoTag}
      className={`font-demo-dmsans relative overflow-hidden rounded-3xl border transition-colors duration-300 ${
        isDark
          ? 'border-[#F3EFE6]/12 bg-[#162921] text-[#F3EFE6] shadow-[0_24px_60px_-24px_rgba(22,41,33,0.42)]'
          : 'border-[#162921]/14 bg-[#F3EFE6] text-[#162921] shadow-[0_24px_60px_-24px_rgba(22,41,33,0.16)]'
      }`}
    >
      {/* HEADER VARIANT 2: Editorial Hairline Framing */}
      <header
        className={`flex items-center justify-between gap-2 border-b px-4 py-3 md:gap-8 md:px-10 md:py-4 ${
          isDark ? 'border-[#F3EFE6]/12' : 'border-[#162921]/12'
        }`}
      >
        <a
          href="#demo-buitenwerk"
          onClick={(e) => {
            e.preventDefault();
            scrollToTool();
          }}
          className={`font-demo-fraunces text-[18px] font-semibold tracking-[-0.02em] whitespace-nowrap shrink-0 md:text-[21px] ${
            isDark ? 'text-[#F3EFE6]' : 'text-[#162921]'
          }`}
        >
          Groeneveld
        </a>

        <nav
          className={`hidden items-center gap-7 text-[13px] font-medium lg:flex ${
            isDark ? 'text-[#F3EFE6]/72' : 'text-[#162921]/72'
          }`}
        >
          {t.nav.map((item) => (
            <button
              key={item}
              type="button"
              onClick={scrollToTool}
              className={`whitespace-nowrap shrink-0 underline-offset-4 transition-colors hover:underline ${
                isDark ? 'hover:text-[#F3EFE6]' : 'hover:text-[#162921]'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            aria-label={t.themeLabel}
            aria-pressed={isDark}
            className={`inline-flex h-8 items-center gap-0.5 rounded-full border p-0.5 transition-colors shrink-0 ${
              isDark
                ? 'border-[#F3EFE6]/18 bg-[#102019] text-[#F3EFE6]'
                : 'border-[#162921]/14 bg-white text-[#162921]'
            }`}
          >
            <span
              className={`flex h-6.5 w-6.5 items-center justify-center rounded-full transition-colors ${
                !isDark
                  ? 'bg-[#C86D44] text-white shadow-xs'
                  : 'text-[#F3EFE6]/45'
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
            </span>
            <span
              className={`flex h-6.5 w-6.5 items-center justify-center rounded-full transition-colors ${
                isDark
                  ? 'bg-[#C86D44] text-white shadow-xs'
                  : 'text-[#162921]/45'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
            </span>
          </button>

          <button
            type="button"
            onClick={scrollToTool}
            className={`inline-flex h-8 items-center justify-center rounded-sm border border-[#C86D44] px-3 text-[11.5px] font-medium whitespace-nowrap shrink-0 transition-colors hover:bg-[#C86D44] hover:text-white md:h-9 md:px-4 md:text-[12.5px] ${
              isDark ? 'text-[#F3EFE6]' : 'text-[#162921]'
            }`}
          >
            <span className="sm:hidden">{t.ctaNav}</span>
            <span className="hidden sm:inline">{t.ctaNavDesktop}</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <div className="px-4 pt-5 pb-5 md:px-10 md:pt-12 md:pb-10">
        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] font-medium text-[#C86D44] md:text-[12px]">
              <span>{t.demoTag}</span>
              <span aria-hidden="true">·</span>
              <span>
                {isDark
                  ? '#162921 · #F3EFE6 · #C86D44'
                  : '#F3EFE6 · #162921 · #C86D44'}
              </span>
            </div>

            <h2
              className={`font-demo-fraunces mt-2 text-[clamp(1.85rem,4vw,3.35rem)] leading-[1.06] font-medium tracking-[-0.02em] [text-wrap:balance] md:mt-3 ${
                isDark ? 'text-[#F3EFE6]' : 'text-[#162921]'
              }`}
            >
              {t.headline}
            </h2>

            <p
              className={`mt-2.5 max-w-[46ch] text-[13.5px] leading-[1.55] md:mt-4 md:text-[15.5px] md:leading-[1.65] ${
                isDark ? 'text-[#F3EFE6]/78' : 'text-[#162921]/78'
              }`}
            >
              {t.sub}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 md:mt-6 md:gap-4">
              <button
                type="button"
                onClick={scrollToTool}
                className="inline-flex h-10 items-center gap-2 rounded-sm bg-[#C86D44] px-4 text-[13px] font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#B05C36] md:h-11 md:px-5 md:text-[13.5px]"
              >
                <span>{t.ctaHero}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onBuildInStyle(
                    `Buitenwerk Demo (${isDark ? 'Deep Pine' : 'Sandstone Light'} & Copper Serif) — ${locWeather.city} (${areaSqm}m²)`,
                  )
                }
                className={`text-[12.5px] font-medium underline-offset-4 transition-colors hover:underline md:text-[13px] ${
                  isDark
                    ? 'text-[#F3EFE6]/78 hover:text-[#F3EFE6]'
                    : 'text-[#162921]/78 hover:text-[#162921]'
                }`}
              >
                {t.buildThis}
              </button>
            </div>
          </div>

          <div className="lg:col-span-6" style={{ perspective: 900 }}>
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.03, y: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className={`group relative overflow-hidden rounded-xl border ${
                isDark
                  ? 'border-[#F3EFE6]/18 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.5)]'
                  : 'border-[#162921]/15 shadow-[0_22px_48px_-20px_rgba(22,41,33,0.28)]'
              }`}
            >
              <motion.img
                src={gardenPavilionImg}
                alt={
                  lang === 'nl'
                    ? 'Modern tuinpaviljoen van verduurzaamd hout en natuurstenen terras'
                    : 'Architectural charred timber garden pavilion with slate patio'
                }
                referrerPolicy="no-referrer"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [1.01, 1.06, 1.01] }
                }
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="aspect-[16/9] w-full object-cover sm:aspect-[16/10]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-[#C86D44]/0 transition-all duration-300 group-hover:ring-[#C86D44]/60"
              />
            </motion.div>
          </div>
        </div>

        {/* WORKING PDOK + OPEN-METEO + CALCULATOR MODULE */}
        <div
          id="buitenwerk-pdok-tool"
          className={`mt-5 rounded-2xl border p-3.5 transition-colors duration-300 md:mt-8 md:p-6 ${
            isDark
              ? 'border-[#F3EFE6]/12 bg-[#102019] text-[#F3EFE6]'
              : 'border-[#162921]/12 bg-white/90 text-[#162921]'
          }`}
        >
          <div
            className={`flex flex-col justify-between gap-3 border-b pb-4 md:flex-row md:items-center ${
              isDark ? 'border-[#F3EFE6]/10' : 'border-[#162921]/12'
            }`}
          >
            <div
              className={`flex items-center gap-2 text-[13px] font-semibold ${
                isDark ? 'text-[#F3EFE6]' : 'text-[#162921]'
              }`}
            >
              <Compass className="h-4 w-4 text-[#C86D44]" />
              <span>{t.toolTitle}</span>
            </div>
            <span
              className={`font-mono-tabular text-[11px] ${
                isDark ? 'text-[#F3EFE6]/60' : 'text-[#162921]/60'
              }`}
            >
              {locWeather.source === 'live'
                ? 'PDOK + Open-Meteo Live'
                : 'Sample Data'}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left: PDOK Address Lookup + Staggered 3-Day Build Weather */}
            <div className="lg:col-span-7">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void lookupLocationAndWeather(query);
                }}
                className="flex flex-wrap items-center gap-2"
              >
                <div className="relative min-w-[200px] flex-1">
                  <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#C86D44]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className={`h-10 w-full rounded-md border pr-3 pl-9 text-[13.5px] font-medium focus:border-[#C86D44] focus:outline-none ${
                      isDark
                        ? 'border-[#F3EFE6]/18 bg-[#182E25] text-[#F3EFE6] placeholder:text-[#F3EFE6]/45'
                        : 'border-[#162921]/20 bg-white text-[#162921] placeholder:text-[#162921]/45'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex h-10 items-center gap-1.5 rounded-md px-4 text-[12.5px] font-semibold transition-colors disabled:opacity-60 ${
                    isDark
                      ? 'bg-[#C86D44] text-white hover:bg-[#B05C36]'
                      : 'bg-[#162921] text-[#F3EFE6] hover:bg-[#C86D44]'
                  }`}
                >
                  {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>{t.checkBtn}</span>
                </button>
              </form>

              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                {BUITENWERK_QUICK_LOCATIONS.map((preset) => (
                  <button
                    key={preset.query}
                    type="button"
                    onClick={() => {
                      setQuery(preset.query);
                      void lookupLocationAndWeather(preset.query);
                    }}
                    className={`rounded border px-2.5 py-1 text-[11px] font-medium transition-colors hover:border-[#C86D44] ${
                      isDark
                        ? 'border-[#F3EFE6]/16 bg-[#182E25] text-[#F3EFE6]/88'
                        : 'border-[#162921]/15 bg-[#F3EFE6]/70 text-[#162921]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <p
                  className={`text-[12px] font-semibold ${
                    isDark ? 'text-[#F3EFE6]' : 'text-[#162921]'
                  }`}
                >
                  {locWeather.addressLabel}{' '}
                  <span
                    className={`font-mono-tabular ml-1 text-[11px] font-normal ${
                      isDark ? 'text-[#F3EFE6]/55' : 'text-[#162921]/55'
                    }`}
                  >
                    ({locWeather.lat.toFixed(2)}°N, {locWeather.lon.toFixed(2)}°E)
                  </span>
                </p>

                <div
                  className="mt-2.5 grid grid-cols-3 gap-2 sm:gap-2.5"
                  style={{ perspective: 700 }}
                >
                  {locWeather.days.map((day, idx) => {
                    const isDry = day.rainProb < 40;
                    const formattedDate = new Date(day.date).toLocaleDateString(
                      lang === 'nl' ? 'nl-NL' : 'en-GB',
                      { weekday: 'short', day: 'numeric', month: 'short' },
                    );
                    return (
                      <motion.div
                        key={`${weatherCycle}-${day.date}`}
                        initial={
                          prefersReducedMotion
                            ? false
                            : { opacity: 0, y: 20, rotateX: -20, scale: 0.94 }
                        }
                        animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                        whileHover={
                          prefersReducedMotion ? undefined : { y: -3, scale: 1.02 }
                        }
                        transition={{
                          duration: 0.42,
                          delay: prefersReducedMotion ? 0 : idx * 0.09,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`rounded-lg border p-2 shadow-xs sm:p-3 ${
                          isDark
                            ? 'border-[#F3EFE6]/12 bg-[#182E25]'
                            : 'border-[#162921]/12 bg-[#F8F5EE]'
                        }`}
                      >
                        <div
                          className={`flex items-center justify-between gap-1 text-[10px] font-semibold sm:text-[11.5px] ${
                            isDark ? 'text-[#F3EFE6]/70' : 'text-[#162921]/70'
                          }`}
                        >
                          <span className="truncate capitalize">{formattedDate}</span>
                          <motion.span
                            animate={
                              prefersReducedMotion
                                ? undefined
                                : { y: [-2, 2, -2], rotate: isDry ? [0, 8, 0] : 0 }
                            }
                            transition={{
                              duration: 3.2,
                              delay: idx * 0.3,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                            className="shrink-0"
                          >
                            {isDry ? (
                              <CloudSun className="h-3.5 w-3.5 text-[#C86D44] sm:h-4 sm:w-4" />
                            ) : (
                              <Umbrella
                                className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                                  isDark ? 'text-[#F3EFE6]/55' : 'text-[#162921]/55'
                                }`}
                              />
                            )}
                          </motion.span>
                        </div>
                        <p
                          className={`font-mono-tabular mt-1 text-[15px] font-bold sm:text-[18px] ${
                            isDark ? 'text-[#F3EFE6]' : 'text-[#162921]'
                          }`}
                        >
                          {day.maxTemp}°C
                        </p>
                        <p
                          className={`text-[10px] sm:text-[11px] ${
                            isDark ? 'text-[#F3EFE6]/65' : 'text-[#162921]/65'
                          }`}
                        >
                          {day.rainProb}%{' '}
                          <span className="hidden sm:inline">{t.rainLabel}</span>
                        </p>
                        <p className="mt-0.5 truncate text-[10px] font-semibold text-[#C86D44] sm:mt-1 sm:text-[11px]">
                          {isDry ? t.dryDay : t.wetDay}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Interactive m² Price Range Calculator */}
            <div
              className={`flex flex-col justify-between rounded-xl border p-4 lg:col-span-5 ${
                isDark
                  ? 'border-[#F3EFE6]/12 bg-[#182E25]'
                  : 'border-[#162921]/12 bg-[#F8F5EE]'
              }`}
            >
              <div>
                <div
                  className={`flex items-center justify-between gap-2 text-[12px] font-semibold ${
                    isDark ? 'text-[#F3EFE6]/72' : 'text-[#162921]/70'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-[#C86D44]" />
                    <span>{t.areaLabel}</span>
                  </span>
                  <motion.strong
                    key={areaSqm}
                    initial={prefersReducedMotion ? false : { scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                    className={`font-mono-tabular text-[14px] ${
                      isDark ? 'text-[#F3EFE6]' : 'text-[#162921]'
                    }`}
                  >
                    {areaSqm} m²
                  </motion.strong>
                </div>

                {/* Animated scale visualization bar */}
                <div
                  className={`mt-2 h-1.5 w-full overflow-hidden rounded-full ${
                    isDark ? 'bg-[#102019]' : 'bg-[#E5DEC9]'
                  }`}
                >
                  <motion.div
                    className="h-full rounded-full bg-[#C86D44]"
                    animate={{ width: `${((areaSqm - 20) / 140) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  />
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {WORK_TYPES.map((wt) => {
                    const active = workTypeId === wt.id;
                    return (
                      <button
                        key={wt.id}
                        type="button"
                        onClick={() => setWorkTypeId(wt.id)}
                        className={`relative rounded px-2.5 py-1.5 text-[11.5px] font-semibold transition-colors ${
                          active
                            ? isDark
                              ? 'text-[#162921]'
                              : 'text-[#F3EFE6]'
                            : isDark
                              ? 'bg-[#102019] text-[#F3EFE6]/82 hover:bg-[#162921]'
                              : 'bg-white text-[#162921]/80 hover:bg-[#EFE9DC]'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="buitenwerk-worktype-pill"
                            transition={{
                              type: 'spring',
                              stiffness: 420,
                              damping: 30,
                            }}
                            className={`absolute inset-0 rounded ${
                              isDark ? 'bg-[#F3EFE6]' : 'bg-[#162921]'
                            }`}
                          />
                        )}
                        <span className="relative z-10">{wt.label[lang]}</span>
                      </button>
                    );
                  })}
                </div>

                <input
                  type="range"
                  min={20}
                  max={160}
                  step={4}
                  value={areaSqm}
                  onChange={(e) => setAreaSqm(Number(e.target.value))}
                  aria-label={t.areaLabel}
                  className="mt-4 w-full accent-[#C86D44]"
                />
                <div
                  className={`font-mono-tabular flex justify-between text-[11px] ${
                    isDark ? 'text-[#F3EFE6]/55' : 'text-[#162921]/55'
                  }`}
                >
                  <span>20 m²</span>
                  <span>90 m²</span>
                  <span>160 m²</span>
                </div>
              </div>

              <div
                className={`mt-4 border-t pt-3 ${
                  isDark ? 'border-[#F3EFE6]/12' : 'border-[#162921]/10'
                }`}
              >
                <p
                  className={`text-[11px] ${
                    isDark ? 'text-[#F3EFE6]/60' : 'text-[#162921]/60'
                  }`}
                >
                  {t.estimateLabel}
                </p>
                <motion.p
                  key={`${workTypeId}-${minEstimate}`}
                  initial={prefersReducedMotion ? false : { opacity: 0.6, scale: 0.96, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  className={`font-demo-fraunces font-mono-tabular mt-0.5 text-[24px] font-bold ${
                    isDark ? 'text-[#F3EFE6]' : 'text-[#162921]'
                  }`}
                >
                  € {minEstimate.toLocaleString('nl-NL')} – €{' '}
                  {maxEstimate.toLocaleString('nl-NL')}
                </motion.p>

                <button
                  type="button"
                  onClick={() => setEstimateSent(true)}
                  className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#C86D44] px-4 text-[12.5px] font-semibold text-white transition-all active:scale-98 hover:bg-[#B05C36]"
                >
                  <span>{t.requestBtn}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                {estimateSent && (
                  <motion.p
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-1.5 text-center text-[11px] font-medium ${
                      isDark ? 'text-emerald-400' : 'text-emerald-800'
                    }`}
                  >
                    {t.sentMsg}
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
