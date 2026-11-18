import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  CalendarCheck,
  CarFront,
  CheckCircle2,
  Loader2,
  Phone,
  Search,
  ShieldCheck,
  Tag,
  Wrench,
} from 'lucide-react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import brakeDiscImg from '../../assets/images/demo_garage_brakedisc_1794958788436.jpg';
import {
  DemoLang,
  GARAGE_TEST_PLATES,
  RDW_FALLBACK_RECORDS,
  RdwFallbackRecord,
} from '../../data/examplesDemosContent';

interface DemoGarageBandProps {
  lang: DemoLang;
  onBuildInStyle: (description: string) => void;
}

function formatApkDate(raw?: string, lang: DemoLang = 'nl'): string {
  if (!raw || raw.length !== 8) {
    return lang === 'nl' ? 'Niet geregistreerd' : 'Not registered';
  }
  return `${raw.slice(6, 8)}-${raw.slice(4, 6)}-${raw.slice(0, 4)}`;
}

function getApkDaysLeft(raw?: string): number | null {
  if (!raw || raw.length !== 8) return null;
  const target = new Date(
    Number(raw.slice(0, 4)),
    Number(raw.slice(4, 6)) - 1,
    Number(raw.slice(6, 8)),
  );
  const now = new Date();
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function DemoGarageBand({ lang, onBuildInStyle }: DemoGarageBandProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [plateInput, setPlateInput] = useState('KXT-67-P');
  const [vehicle, setVehicle] = useState<RdwFallbackRecord>(
    RDW_FALLBACK_RECORDS.KXT67P,
  );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'fallback'>('fallback');
  const [scanCycle, setScanCycle] = useState(0);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const imgCardRef = useRef<HTMLDivElement | null>(null);
  const tiltXRaw = useMotionValue(0);
  const tiltYRaw = useMotionValue(0);
  const rotateX = useSpring(tiltXRaw, { stiffness: 240, damping: 22 });
  const rotateY = useSpring(tiltYRaw, { stiffness: 240, damping: 22 });

  const lookupPlate = async (rawInput: string) => {
    const cleaned = rawInput.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (cleaned.length < 4) {
      setErrorMsg(
        lang === 'nl'
          ? 'Voer een geldig Nederlands kenteken in (min. 4 tekens).'
          : 'Enter a valid Dutch license plate (min. 4 characters).',
      );
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setBookingConfirmed(false);

    try {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), 5000);
      const res = await fetch(
        `https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=${encodeURIComponent(cleaned)}`,
        { signal: controller.signal },
      );
      window.clearTimeout(timer);

      if (!res.ok) throw new Error('RDW lookup failed');
      const rows = (await res.json()) as RdwFallbackRecord[];
      if (!rows || rows.length === 0) {
        if (RDW_FALLBACK_RECORDS[cleaned]) {
          setVehicle(RDW_FALLBACK_RECORDS[cleaned]);
          setDataSource('fallback');
          setScanCycle((c) => c + 1);
        } else {
          setErrorMsg(
            lang === 'nl'
              ? `Geen voertuig gevonden voor kenteken ${cleaned}. Probeer één van de voorbeeld-kentekens.`
              : `No vehicle found for plate ${cleaned}. Try one of the sample plates.`,
          );
        }
      } else {
        setVehicle(rows[0]);
        setDataSource('live');
        setScanCycle((c) => c + 1);
      }
    } catch {
      if (RDW_FALLBACK_RECORDS[cleaned]) {
        setVehicle(RDW_FALLBACK_RECORDS[cleaned]);
        setDataSource('fallback');
        setScanCycle((c) => c + 1);
      } else {
        setErrorMsg(
          lang === 'nl'
            ? 'Live RDW-verbinding tijdelijk niet bereikbaar. Kies een testkenteken voor voorbeelden.'
            : 'Live RDW lookup unavailable right now. Select a sample plate above.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void lookupPlate('KXT67P');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const daysLeft = getApkDaysLeft(vehicle.vervaldatum_apk);

  const scrollToApi = () => {
    document
      .getElementById('garage-rdw-tool')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const navItems = [
    { label: lang === 'nl' ? 'Onderhoud' : 'Services', icon: Wrench },
    { label: lang === 'nl' ? 'APK-Check' : 'MOT Check', icon: ShieldCheck },
    { label: lang === 'nl' ? 'Tarieven' : 'Pricing', icon: Tag },
    { label: lang === 'nl' ? 'Contact' : 'Contact', icon: Phone },
  ];

  const t = {
    nl: {
      demoTag: 'Demo 01 · Garage & Werkplaats',
      ctaNav: 'Afspraak →',
      headline: 'Onderhoud en APK, volgens fabrieksnorm.',
      sub: 'Remmen, distributie, aircoservice en merkonafhankelijke diagnose — transparant gepland met directe kentekencheck.',
      ctaHero: 'Check je APK & plan in →',
      proof: ['Brug 1–4', 'APK-straat', '4.9★ Google (214)'],
      toolTitle: 'Live RDW Kentekencheck',
      toolSub:
        'Haalt direct echte voertuigdata en APK-vervaldatum op via de openbare RDW-database.',
      searchBtn: 'Kenteken ophalen',
      testLabel: 'Test direct:',
      liveLabel: 'Live RDW Open Data',
      cachedLabel: 'RDW Voorbeelddata',
      fields: {
        brand: 'Merk & Uitvoering',
        apk: 'APK Vervaldatum',
        color: 'Kleur',
        recall: 'Terugroepactie',
      },
      daysText:
        daysLeft !== null
          ? daysLeft >= 0
            ? `Nog ${daysLeft} dagen geldig`
            : `Verlopen (${Math.abs(daysLeft)} dagen geleden)`
          : '—',
      bookVehicleBtn: 'Plan APK voor deze auto →',
      bookedFeedback:
        'APK-aanvraag klaargezet — datumvoorstel verstuurd via WhatsApp.',
      buildThis: 'Bouw deze garage-stijl →',
    },
    en: {
      demoTag: 'Demo 01 · Automotive & MOT Workshop',
      ctaNav: 'Book now →',
      headline: 'Car repairs and MOT, done to spec.',
      sub: 'Brakes, suspension, timing belts, tyres, A/C and diagnostics — scheduled directly with live license plate lookup.',
      ctaHero: 'Check MOT & book →',
      proof: ['Bays 1–4', 'MOT Lane', '4.9★ Google (214)'],
      toolTitle: 'Live Dutch RDW Vehicle Check',
      toolSub:
        'Pulls real-time vehicle specs and MOT expiry directly from Dutch RDW Open Data.',
      searchBtn: 'Lookup Plate',
      testLabel: 'Quick test:',
      liveLabel: 'Live RDW Open Data',
      cachedLabel: 'RDW Sample Record',
      fields: {
        brand: 'Make & Model',
        apk: 'MOT Expiry Date',
        color: 'Color',
        recall: 'Open Recall',
      },
      daysText:
        daysLeft !== null
          ? daysLeft >= 0
            ? `${daysLeft} days remaining`
            : `Expired (${Math.abs(daysLeft)} days ago)`
          : '—',
      bookVehicleBtn: 'Book MOT for this car →',
      bookedFeedback:
        'Workshop request prepared — available slots ready via WhatsApp.',
      buildThis: 'Build in this garage style →',
    },
  }[lang];

  return (
    <section
      aria-label={t.demoTag}
      className="font-demo-outfit relative overflow-hidden rounded-3xl border border-[#1C1C1C]/12 bg-[#F3ECE1] text-[#1C1C1C] shadow-[0_24px_60px_-24px_rgba(28,28,28,0.16)]"
    >
      {/* HEADER VARIANT 1: Floating Crisp White Capsule Header with Sliding Crimson Pill (Skin 3 from screenshot) */}
      <div className="px-4 pt-4 md:px-8 md:pt-6">
        <header className="flex items-center justify-between gap-4 rounded-full border border-[#1C1C1C]/8 bg-white px-3 py-1.5 shadow-[0_10px_28px_-12px_rgba(28,28,28,0.14)] md:px-4">
          <a
            href="#demo-garage"
            onClick={(e) => {
              e.preventDefault();
              setActiveTabIdx(0);
              scrollToApi();
            }}
            className="pl-2 text-[15px] font-extrabold tracking-[0.06em] text-[#1C1C1C] uppercase whitespace-nowrap shrink-0 md:text-[16px]"
          >
            KORVER AUTO
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTabIdx === idx;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setActiveTabIdx(idx);
                    scrollToApi();
                  }}
                  className={`relative inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[12.5px] font-semibold whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-[#1C1C1C]/68 hover:text-[#1C1C1C]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="garage-nav-capsule"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#B8291E]"
                    />
                  )}
                  <Icon className="relative z-10 h-3.5 w-3.5" />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={scrollToApi}
            className="inline-flex h-9 items-center justify-center rounded-full bg-[#1C1C1C] px-4 text-[12px] font-semibold text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#B8291E]"
          >
            {t.ctaNav}
          </button>
        </header>
      </div>

      {/* HERO SECTION */}
      <div className="relative px-5 pt-7 pb-6 md:px-10 md:pt-10 md:pb-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-[12px] font-medium text-[#1C1C1C]/60">
              <span>{t.demoTag}</span>
              <span aria-hidden="true">·</span>
              <span>#F3ECE1 · #1C1C1C · #B8291E</span>
            </div>

            <h2 className="mt-3 max-w-[14ch] text-[clamp(2.2rem,4.4vw,3.85rem)] leading-[1.02] font-bold tracking-[-0.03em] text-[#1C1C1C] [text-wrap:balance]">
              {t.headline}
            </h2>

            <p className="mt-4 max-w-[44ch] text-[14.5px] leading-[1.6] text-[#1C1C1C]/75 md:text-[16px]">
              {t.sub}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={scrollToApi}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-[#B8291E] px-5 text-[13.5px] font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#961F16]"
              >
                <span>{t.ctaHero}</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onBuildInStyle(
                    `Garage Demo (Warm Bone & Workshop Crimson) — ${vehicle.merk} RDW`,
                  )
                }
                className="text-[13px] font-semibold text-[#1C1C1C]/75 underline-offset-4 transition-colors hover:text-[#1C1C1C] hover:underline"
              >
                {t.buildThis}
              </button>
            </div>

            {/* Unboxed Metadata Bar */}
            <div className="mt-7 inline-flex flex-wrap items-center gap-3 rounded-lg bg-[#1C1C1C] px-4 py-2 text-[11.5px] font-medium text-[#F3ECE1]">
              {t.proof.map((item, idx) => (
                <span key={item} className="inline-flex items-center gap-3">
                  {idx > 0 && (
                    <span aria-hidden="true" className="text-[#F3ECE1]/40">
                      ·
                    </span>
                  )}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6" style={{ perspective: 950 }}>
            <motion.div
              ref={imgCardRef}
              onPointerMove={(e) => {
                if (prefersReducedMotion || !imgCardRef.current) return;
                const rect = imgCardRef.current.getBoundingClientRect();
                const px = (e.clientX - rect.left) / rect.width - 0.5;
                const py = (e.clientY - rect.top) / rect.height - 0.5;
                tiltYRaw.set(px * 15);
                tiltXRaw.set(-py * 13);
              }}
              onPointerLeave={() => {
                tiltXRaw.set(0);
                tiltYRaw.set(0);
              }}
              whileHover={prefersReducedMotion ? undefined : { scale: 1.025 }}
              style={
                prefersReducedMotion
                  ? undefined
                  : { rotateX, rotateY, transformStyle: 'preserve-3d' }
              }
              className="group relative overflow-hidden rounded-2xl bg-[#EAE0D0] shadow-[0_22px_50px_-20px_rgba(28,28,28,0.28)]"
            >
              {/* Warm workshop red rim pulse */}
              {!prefersReducedMotion && (
                <motion.div
                  aria-hidden="true"
                  animate={{
                    opacity: [0.16, 0.36, 0.16],
                    scale: [0.95, 1.08, 0.95],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="pointer-events-none absolute -top-12 -right-12 z-0 h-56 w-56 rounded-full blur-2xl"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(184,41,30,0.55) 0%, transparent 72%)',
                  }}
                />
              )}

              <motion.img
                src={brakeDiscImg}
                alt={
                  lang === 'nl'
                    ? 'Fictieve studio-render van geventileerde remschijf en remklauw'
                    : 'Studio 3D render of slotted automotive brake rotor and caliper'
                }
                referrerPolicy="no-referrer"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -6, 0], scale: [1.02, 1.045, 1.02] }
                }
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 aspect-[4/3] w-full object-cover"
              />

              {/* Subtle sweeping diagnostic gloss reflection */}
              {!prefersReducedMotion && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* WORKING RDW API MODULE */}
        <div
          id="garage-rdw-tool"
          className="mt-8 rounded-2xl border border-[#1C1C1C]/12 bg-white/85 p-5 md:p-6"
        >
          <div className="flex flex-col justify-between gap-4 border-b border-[#1C1C1C]/10 pb-4 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 text-[12px] font-semibold text-[#B8291E]">
                <CarFront className="h-4 w-4" />
                <span>{t.toolTitle}</span>
              </div>
              <p className="mt-1 text-[13.5px] text-[#1C1C1C]/70">{t.toolSub}</p>
            </div>

            <div className="font-mono-tabular flex items-center gap-2 text-[11px] text-[#1C1C1C]/60">
              <span>{dataSource === 'live' ? t.liveLabel : t.cachedLabel}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void lookupPlate(plateInput);
              }}
              className="flex flex-1 flex-wrap items-center gap-2.5"
            >
              <div className="flex h-11 min-w-[210px] overflow-hidden rounded-md border-2 border-[#1C1C1C] bg-[#F5BA18] shadow-xs">
                <div className="flex w-8 flex-col items-center justify-center bg-[#003399] text-[10px] font-bold text-white">
                  NL
                </div>
                <input
                  type="text"
                  value={plateInput}
                  maxLength={9}
                  onChange={(e) => setPlateInput(e.target.value.toUpperCase())}
                  placeholder="KXT-67-P"
                  aria-label="Kenteken"
                  className="font-mono-tabular w-36 bg-transparent px-3 text-[15px] font-bold tracking-[0.14em] text-[#1C1C1C] uppercase placeholder:text-[#1C1C1C]/40 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-[#1C1C1C] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#B8291E] disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span>{t.searchBtn}</span>
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[11.5px] font-medium text-[#1C1C1C]/60">
                {t.testLabel}
              </span>
              {GARAGE_TEST_PLATES.map((sample) => (
                <button
                  key={sample.raw}
                  type="button"
                  onClick={() => {
                    setPlateInput(sample.plate);
                    void lookupPlate(sample.raw);
                  }}
                  className="font-mono-tabular inline-flex h-8 items-center rounded border border-[#1C1C1C]/15 bg-[#F3ECE1] px-2.5 text-[11.5px] font-semibold text-[#1C1C1C] transition-colors hover:border-[#B8291E] hover:text-[#B8291E]"
                >
                  {sample.plate}
                </button>
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#B8291E]/30 bg-[#B8291E]/8 px-3.5 py-2.5 text-[12.5px] text-[#B8291E]">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Live RDW Data Readout with Kinetic Laser Scan-Sweep + Staggered Telemetry Snap */}
          <motion.div
            key={`rdw-${scanCycle}`}
            initial={prefersReducedMotion ? false : { opacity: 0.72, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-4 grid grid-cols-1 gap-4 overflow-hidden rounded-xl border border-[#1C1C1C]/12 bg-[#FAF6EE] p-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-center"
          >
            {!prefersReducedMotion && (loading || scanCycle > 0) && (
              <motion.div
                key={`scan-${scanCycle}-${loading ? 'loading' : 'done'}`}
                aria-hidden="true"
                initial={{ x: '-25%', opacity: 0.95 }}
                animate={{ x: '120%', opacity: loading ? [0.65, 0.95, 0.65] : 0 }}
                transition={{
                  duration: loading ? 1.1 : 0.72,
                  repeat: loading ? Infinity : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 -skew-x-12 bg-gradient-to-r from-transparent via-[#B8291E]/32 to-transparent"
              />
            )}

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.04 }}
            >
              <p className="text-[11px] font-medium text-[#1C1C1C]/55">
                {t.fields.brand}
              </p>
              <p className="mt-0.5 text-[14.5px] font-bold text-[#1C1C1C]">
                {vehicle.merk} · {vehicle.handelsbenaming}
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.1 }}
            >
              <p className="text-[11px] font-medium text-[#1C1C1C]/55">
                {t.fields.apk}
              </p>
              <p className="font-mono-tabular mt-0.5 text-[14.5px] font-bold text-[#1C1C1C]">
                {formatApkDate(vehicle.vervaldatum_apk, lang)}
              </p>
              <p className="text-[11px] font-medium text-[#B8291E]">
                {t.daysText}
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.16 }}
            >
              <p className="text-[11px] font-medium text-[#1C1C1C]/55">
                {t.fields.color}
              </p>
              <p className="mt-0.5 text-[14px] font-semibold text-[#1C1C1C] capitalize">
                {(vehicle.eerste_kleur || '—').toLowerCase()}
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.22 }}
            >
              <p className="text-[11px] font-medium text-[#1C1C1C]/55">
                {t.fields.recall}
              </p>
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#1C1C1C]">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                <span>
                  {vehicle.openstaande_terugroepactie_indicator === 'Ja'
                    ? lang === 'nl'
                      ? 'Actie open'
                      : 'Recall open'
                    : lang === 'nl'
                      ? 'Geen openstaand'
                      : 'None open'}
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.26 }}
              className="flex flex-col items-start lg:items-end"
            >
              <button
                type="button"
                onClick={() => setBookingConfirmed(true)}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-[#1C1C1C] px-4 text-[12.5px] font-semibold text-white whitespace-nowrap transition-transform active:scale-95 hover:bg-[#B8291E]"
              >
                <Wrench className="h-3.5 w-3.5" />
                <span>{t.bookVehicleBtn}</span>
              </button>
              {bookingConfirmed && (
                <motion.p
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800"
                >
                  <CalendarCheck className="h-3.5 w-3.5" />
                  <span>{t.bookedFeedback}</span>
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          {!errorMsg && dataSource === 'live' && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-[#1C1C1C]/55">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
              <span>
                {lang === 'nl'
                  ? `Opgehaald uit officiële RDW API voor kenteken ${vehicle.kenteken}`
                  : `Fetched live from Dutch RDW Open Data for plate ${vehicle.kenteken}`}
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
