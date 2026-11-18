import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Coffee,
  Loader2,
  MapPin,
  Moon,
  Sun,
  Wind,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import cafeCroissantImg from '../../assets/images/demo_horeca_coffee_1794958789876.jpg';
import {
  CAFE_CITIES,
  CAFE_MENU_ITEMS,
  DemoLang,
} from '../../data/examplesDemosContent';

interface DemoHorecaBandProps {
  lang: DemoLang;
  onBuildInStyle: (description: string) => void;
}

interface TerraceWeather {
  temp: number;
  wind: number;
  isRainy: boolean;
  source: 'live' | 'fallback';
}

export function DemoHorecaBand({ lang, onBuildInStyle }: DemoHorecaBandProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isDark, setIsDark] = useState(false);
  const [cityId, setCityId] = useState(CAFE_CITIES[0].id);
  const [weather, setWeather] = useState<TerraceWeather>({
    temp: 18,
    wind: 11,
    isRainy: false,
    source: 'fallback',
  });
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [menuCategory, setMenuCategory] = useState<'coffee' | 'breakfast' | 'pastry'>(
    'coffee',
  );
  const [tableBooked, setTableBooked] = useState(false);

  const activeCity =
    CAFE_CITIES.find((c) => c.id === cityId) ?? CAFE_CITIES[0];

  const loadTerraceWeather = async (lat: number, lon: number) => {
    setLoadingWeather(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,precipitation&timezone=Europe%2FAmsterdam`,
      );
      if (!res.ok) throw new Error('Weather error');
      const data = (await res.json()) as {
        current?: {
          temperature_2m: number;
          wind_speed_10m: number;
          precipitation: number;
        };
      };
      if (!data.current) throw new Error('Empty current weather');
      setWeather({
        temp: Math.round(data.current.temperature_2m),
        wind: Math.round(data.current.wind_speed_10m),
        isRainy: data.current.precipitation > 0.2,
        source: 'live',
      });
    } catch {
      setWeather({
        temp: 18,
        wind: 12,
        isRainy: false,
        source: 'fallback',
      });
    } finally {
      setLoadingWeather(false);
    }
  };

  useEffect(() => {
    void loadTerraceWeather(activeCity.lat, activeCity.lon);
  }, [activeCity.lat, activeCity.lon]);

  const filteredMenu = CAFE_MENU_ITEMS.filter((m) => m.category === menuCategory);
  const terraceNice = !weather.isRainy && weather.temp >= 14;

  const scrollToMenu = () => {
    document
      .getElementById('horeca-weather-menu')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const t = {
    nl: {
      demoTag: 'Demo 04 · Specialiteiten Café & Patisserie',
      leftNav: ['Menukaart', 'Ons Verhaal', 'Vestigingen'],
      ctaNav: 'Tafel reserveren',
      kickerRight: 'Deze maand · Croissant + koffie −15%',
      headline: 'KOFFIE & CROISSANT',
      storyText:
        'Een warme plek waar goede koffie, knapperig roombotergebak en ontspannen ochtenden samenkomen.',
      ctaMenu: 'Bekijk menukaart',
      buildThis: 'Bouw in deze Horeca-stijl →',
      weatherTitle: 'Live Open-Meteo Terrasweer',
      terraceOpen: 'Zonnig of mild — Grachtenterras geopend',
      terraceIndoor: 'Frisser buiten — Knus binnen bij de espressobar',
      cats: [
        { id: 'coffee' as const, label: 'Koffie' },
        { id: 'breakfast' as const, label: 'Ontbijt' },
        { id: 'pastry' as const, label: 'Patisserie' },
      ],
      bookConfirm: `Tafel voor 2 aangevraagd in ${activeCity.city} (${activeCity.address}).`,
      themeLabel: isDark ? 'Wissel naar lichte latte-modus' : 'Wissel naar donkere espresso-modus',
    },
    en: {
      demoTag: 'Demo 04 · Specialty Roastery & Bakery',
      leftNav: ['Menu', 'Our Story', 'Locations'],
      ctaNav: 'Book a table',
      kickerRight: 'This month · Croissant + coffee −15%',
      headline: 'COFFEE & CROISSANT',
      storyText:
        'A sunlit corner where single-origin espresso, flaky pastry, and unhurried mornings come together.',
      ctaMenu: 'Explore menu',
      buildThis: 'Build in this Cafe style →',
      weatherTitle: 'Live Open-Meteo Terrace Check',
      terraceOpen: 'Mild outdoor weather — Canal terrace open',
      terraceIndoor: 'Brisk outside — Warm seating at the espresso bar',
      cats: [
        { id: 'coffee' as const, label: 'Coffee' },
        { id: 'breakfast' as const, label: 'Breakfast' },
        { id: 'pastry' as const, label: 'Pastry' },
      ],
      bookConfirm: `Table request prepared for ${activeCity.city} (${activeCity.address}).`,
      themeLabel: isDark ? 'Switch to light latte cream mode' : 'Switch to dark roast espresso mode',
    },
  }[lang];

  return (
    <section
      aria-label={t.demoTag}
      className={`relative overflow-hidden rounded-3xl border transition-colors duration-300 ${
        isDark
          ? 'border-[#EFE2CF]/14 bg-[#1D120C] text-[#EFE2CF] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]'
          : 'border-[#4A2C1D]/15 bg-[#EFE2CF] text-[#4A2C1D] shadow-[0_24px_60px_-24px_rgba(74,44,29,0.2)]'
      }`}
    >
      {/* HEADER VARIANT 4: Classic Centered Brasserie Crest Header + Sun/Moon Toggle */}
      <header
        className={`flex items-center justify-between gap-2 border-b px-4 py-3 md:grid md:grid-cols-3 md:gap-4 md:px-10 md:py-4 ${
          isDark ? 'border-[#EFE2CF]/12' : 'border-[#4A2C1D]/12'
        }`}
      >
        <nav
          className={`hidden items-center gap-5 text-[13px] font-medium md:flex ${
            isDark ? 'text-[#EFE2CF]/78' : 'text-[#4A2C1D]/80'
          }`}
        >
          {t.leftNav.map((item) => (
            <button
              key={item}
              type="button"
              onClick={scrollToMenu}
              className={`whitespace-nowrap shrink-0 transition-colors ${
                isDark ? 'hover:text-[#EFE2CF]' : 'hover:text-[#4A2C1D]'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <a
          href="#demo-horeca"
          onClick={(e) => {
            e.preventDefault();
            scrollToMenu();
          }}
          className={`font-demo-oswald text-left text-[17px] font-bold tracking-[0.04em] uppercase whitespace-nowrap md:text-center md:text-[22px] ${
            isDark ? 'text-[#EFE2CF]' : 'text-[#4A2C1D]'
          }`}
        >
          CAFÉ KORNELIS
        </a>

        <div className="flex items-center justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            aria-label={t.themeLabel}
            aria-pressed={isDark}
            className={`inline-flex h-8 items-center gap-0.5 rounded-full border p-0.5 transition-colors shrink-0 ${
              isDark
                ? 'border-[#EFE2CF]/18 bg-[#2A1B12] text-[#EFE2CF]'
                : 'border-[#4A2C1D]/15 bg-[#FAF4EA] text-[#4A2C1D]'
            }`}
          >
            <span
              className={`flex h-6.5 w-6.5 items-center justify-center rounded-full transition-colors ${
                !isDark
                  ? 'bg-[#E0A526] text-[#4A2C1D] shadow-xs'
                  : 'text-[#EFE2CF]/45'
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
            </span>
            <span
              className={`flex h-6.5 w-6.5 items-center justify-center rounded-full transition-colors ${
                isDark
                  ? 'bg-[#E0A526] text-[#1D120C] shadow-xs'
                  : 'text-[#4A2C1D]/45'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTableBooked(true);
              scrollToMenu();
            }}
            className="inline-flex h-8 items-center gap-1 rounded-full bg-[#E0A526] px-3 text-[11px] font-semibold text-[#1D120C] whitespace-nowrap shrink-0 transition-colors hover:bg-[#CA921B] md:h-9 md:gap-1.5 md:px-4 md:text-[12.5px]"
          >
            <span>{t.ctaNav}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <div className="px-4 pt-5 pb-5 md:px-10 md:pt-10 md:pb-10">
        <div
          className={`flex flex-wrap items-center justify-between gap-2 text-[11.5px] font-medium md:text-[12px] ${
            isDark ? 'text-[#EFE2CF]/70' : 'text-[#4A2C1D]/72'
          }`}
        >
          <span>
            {t.demoTag} ·{' '}
            {isDark ? '#1D120C · #EFE2CF · #E0A526' : '#EFE2CF · #4A2C1D · #E0A526'}
          </span>
          <span
            className={`font-semibold ${
              isDark ? 'text-[#E0A526]' : 'text-[#4A2C1D]'
            }`}
          >
            {t.kickerRight}
          </span>
        </div>

        <h2
          className={`font-demo-oswald mt-3 text-center text-[clamp(2.25rem,7vw,5.4rem)] leading-[0.94] font-bold tracking-[-0.015em] uppercase md:mt-4 ${
            isDark ? 'text-[#EFE2CF]' : 'text-[#4A2C1D]'
          }`}
        >
          {t.headline}
        </h2>

        <div className="mt-4 grid grid-cols-1 items-center gap-4 md:mt-6 lg:grid-cols-12 lg:gap-6">
          <div className="order-2 lg:order-1 lg:col-span-4">
            <p
              className={`text-[13.5px] leading-[1.55] md:text-[14.5px] md:leading-[1.6] ${
                isDark ? 'text-[#EFE2CF]/80' : 'text-[#4A2C1D]/82'
              }`}
            >
              {t.storyText}
            </p>
            <div className="mt-3.5 flex flex-wrap items-center gap-3 md:mt-4 md:gap-4">
              <button
                type="button"
                onClick={scrollToMenu}
                className="inline-flex h-9.5 items-center rounded-full bg-[#E0A526] px-4.5 text-[12.5px] font-semibold text-[#1D120C] transition-colors hover:bg-[#CA921B] md:h-10 md:px-5 md:text-[13px]"
              >
                {t.ctaMenu}
              </button>
              <button
                type="button"
                onClick={() =>
                  onBuildInStyle(
                    `Horeca Demo (${isDark ? 'Roast Espresso Dark' : 'Latte Cream'} & Mustard) — ${activeCity.city}`,
                  )
                }
                className={`text-[12.5px] font-semibold underline-offset-4 hover:underline ${
                  isDark ? 'text-[#EFE2CF]/80 hover:text-[#EFE2CF]' : 'text-[#4A2C1D]/80'
                }`}
              >
                {t.buildThis}
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="relative overflow-hidden rounded-2xl border border-[#4A2C1D]/15 shadow-[0_20px_48px_-20px_rgba(74,44,29,0.3)]"
            >
              {/* Soft rising coffee-steam ambience */}
              {!prefersReducedMotion && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-4 left-1/3 z-10 flex gap-3"
                >
                  {[0, 1, 2].map((w) => (
                    <motion.span
                      key={w}
                      animate={{
                        y: [16, -24],
                        opacity: [0, 0.45, 0],
                        scaleX: [1, 1.35, 1],
                      }}
                      transition={{
                        duration: 3.4,
                        delay: w * 1.1,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="h-12 w-3 rounded-full bg-white/55 blur-md"
                    />
                  ))}
                </div>
              )}

              <motion.img
                src={cafeCroissantImg}
                alt={
                  lang === 'nl'
                    ? 'Keramische kop latte met croissant op mosterdlinnen servet'
                    : 'Ceramic latte cup and golden croissant on mustard linen'
                }
                referrerPolicy="no-referrer"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.045 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-[16/9] w-full object-cover sm:aspect-[4/3]"
              />
            </motion.div>
          </div>

          <div
            className={`order-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3.5 transition-colors duration-300 lg:col-span-3 lg:block lg:p-4 ${
              isDark
                ? 'border-[#EFE2CF]/12 bg-[#261810]'
                : 'border-[#4A2C1D]/12 bg-[#FAF4EA]'
            }`}
          >
            <div>
              <div
                className={`flex items-center gap-1.5 text-[12px] font-bold uppercase ${
                  isDark ? 'text-[#EFE2CF]' : 'text-[#4A2C1D]'
                }`}
              >
                <MapPin className="h-3.5 w-3.5 text-[#E0A526] md:h-4 md:w-4" />
                <span>{activeCity.city}</span>
              </div>
              <p
                className={`mt-0.5 text-[12.5px] md:mt-1 md:text-[13px] ${
                  isDark ? 'text-[#EFE2CF]/75' : 'text-[#4A2C1D]/75'
                }`}
              >
                {activeCity.address}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 lg:mt-3">
              {CAFE_CITIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setCityId(c.id);
                    setTableBooked(false);
                  }}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                    cityId === c.id
                      ? isDark
                        ? 'bg-[#E0A526] text-[#1D120C]'
                        : 'bg-[#4A2C1D] text-[#EFE2CF]'
                      : isDark
                        ? 'border border-[#EFE2CF]/18 bg-[#1D120C] text-[#EFE2CF]/85 hover:border-[#E0A526]/60'
                        : 'border border-[#4A2C1D]/20 bg-white/70 text-[#4A2C1D]'
                  }`}
                >
                  {c.city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* WORKING TERRACE WEATHER API + CASCADE MENU */}
        <div
          id="horeca-weather-menu"
          className={`mt-5 grid grid-cols-1 gap-4 rounded-2xl border p-3.5 transition-colors duration-300 md:mt-8 md:gap-5 md:p-5 lg:grid-cols-12 ${
            isDark
              ? 'border-[#EFE2CF]/12 bg-[#261810]'
              : 'border-[#4A2C1D]/12 bg-[#FAF4EA]'
          }`}
        >
          {/* Left: Live Terrace Weather Readout with Rotating Warm Sun Ring */}
          <div
            className={`relative flex flex-col justify-between overflow-hidden rounded-xl border p-4 lg:col-span-4 ${
              isDark
                ? 'border-[#EFE2CF]/10 bg-[#1A100A]'
                : 'border-[#4A2C1D]/10 bg-[#EFE2CF]/70'
            }`}
          >
            {terraceNice && !prefersReducedMotion && (
              <motion.div
                aria-hidden="true"
                animate={{
                  scale: [0.92, 1.14, 0.92],
                  opacity: isDark ? [0.24, 0.48, 0.24] : [0.3, 0.58, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(224,165,38,0.72) 0%, transparent 70%)',
                }}
              />
            )}

            <div className="relative z-10">
              <div
                className={`flex items-center justify-between text-[12px] font-semibold ${
                  isDark ? 'text-[#EFE2CF]' : 'text-[#4A2C1D]'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <motion.span
                    animate={
                      terraceNice && !prefersReducedMotion
                        ? { rotate: 360 }
                        : undefined
                    }
                    transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sun className="h-4 w-4 text-[#E0A526]" />
                  </motion.span>
                  <span>{t.weatherTitle}</span>
                </span>
                {loadingWeather && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                )}
              </div>

              <motion.div
                key={`${activeCity.id}-${weather.temp}`}
                initial={
                  prefersReducedMotion ? false : { opacity: 0.4, scale: 0.85, y: 8 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="mt-3 flex items-baseline gap-4"
              >
                <span
                  className={`font-demo-oswald font-mono-tabular text-[38px] font-bold ${
                    isDark ? 'text-[#EFE2CF]' : 'text-[#4A2C1D]'
                  }`}
                >
                  {weather.temp}°C
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[12.5px] font-medium ${
                    isDark ? 'text-[#EFE2CF]/75' : 'text-[#4A2C1D]/75'
                  }`}
                >
                  <Wind className="h-3.5 w-3.5" />
                  <span className="font-mono-tabular">{weather.wind} km/u</span>
                </span>
              </motion.div>

              <p
                className={`mt-2 text-[13px] font-semibold ${
                  isDark ? 'text-[#EFE2CF]' : 'text-[#4A2C1D]'
                }`}
              >
                {terraceNice ? t.terraceOpen : t.terraceIndoor}
              </p>
            </div>

            <div
              className={`relative z-10 mt-4 border-t pt-3 ${
                isDark ? 'border-[#EFE2CF]/10' : 'border-[#4A2C1D]/10'
              }`}
            >
              <span
                className={`font-mono-tabular text-[11px] ${
                  isDark ? 'text-[#EFE2CF]/55' : 'text-[#4A2C1D]/55'
                }`}
              >
                {weather.source === 'live'
                  ? `Open-Meteo Live · ${activeCity.city}`
                  : activeCity.city}
              </span>
            </div>
          </div>

          {/* Right: Filterable Menu with Sliding Pill + Energetic Cascade */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div
                className={`inline-flex items-center gap-1 rounded-full p-1 ${
                  isDark ? 'bg-[#1D120C]' : 'bg-[#EFE2CF]'
                }`}
              >
                {t.cats.map((cat) => {
                  const activeCat = menuCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setMenuCategory(cat.id)}
                      className={`relative rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
                        activeCat
                          ? isDark
                            ? 'text-[#1D120C]'
                            : 'text-[#EFE2CF]'
                          : isDark
                            ? 'text-[#EFE2CF]/75 hover:text-[#EFE2CF]'
                            : 'text-[#4A2C1D]/75 hover:text-[#4A2C1D]'
                      }`}
                    >
                      {activeCat && (
                        <motion.span
                          layoutId="horeca-cat-pill"
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 30,
                          }}
                          className={`absolute inset-0 rounded-full ${
                            isDark ? 'bg-[#E0A526]' : 'bg-[#4A2C1D]'
                          }`}
                        />
                      )}
                      <span className="relative z-10">{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {tableBooked && (
                <motion.span
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`inline-flex items-center gap-1.5 text-[12px] font-semibold ${
                    isDark ? 'text-emerald-400' : 'text-emerald-800'
                  }`}
                >
                  <Check className="h-4 w-4" />
                  <span>{t.bookConfirm}</span>
                </motion.span>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={menuCategory}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {filteredMenu.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 18, scale: 0.94 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={
                      prefersReducedMotion ? undefined : { y: -3, scale: 1.015 }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 340,
                      damping: 26,
                      delay: prefersReducedMotion ? 0 : idx * 0.065,
                    }}
                    className={`flex items-start justify-between gap-3 rounded-xl border p-3.5 shadow-xs ${
                      isDark
                        ? 'border-[#EFE2CF]/12 bg-[#301E14]'
                        : 'border-[#4A2C1D]/12 bg-white'
                    }`}
                  >
                    <div>
                      <p
                        className={`inline-flex items-center gap-1.5 text-[14px] font-bold ${
                          isDark ? 'text-[#EFE2CF]' : 'text-[#4A2C1D]'
                        }`}
                      >
                        <Coffee className="h-3.5 w-3.5 text-[#E0A526]" />
                        <span>{item.title[lang]}</span>
                      </p>
                      <p
                        className={`mt-0.5 text-[12px] ${
                          isDark ? 'text-[#EFE2CF]/68' : 'text-[#4A2C1D]/65'
                        }`}
                      >
                        {item.note[lang]}
                      </p>
                    </div>
                    <span
                      className={`font-mono-tabular shrink-0 text-[13.5px] font-bold ${
                        isDark ? 'text-[#E0A526]' : 'text-[#4A2C1D]'
                      }`}
                    >
                      {item.price}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
