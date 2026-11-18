import { useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CloudSun,
  Coffee,
  MapPin,
  Scissors,
  ShoppingBag,
  Sparkles,
  Star,
  Wrench,
} from 'lucide-react';
import brakeDiscImg from '../assets/images/demo_garage_brakedisc_1794958788436.jpg';
import barberPortraitImg from '../assets/images/demo_barber_portrait_1794958788770.jpg';
import cafeCroissantImg from '../assets/images/demo_horeca_coffee_1794958789876.jpg';
import fashionModelImg from '../assets/images/demo_fashion_campaign_1794958789947.jpg';
import gardenPavilionImg from '../assets/images/demo_buitenwerk_garden_1794958789119.jpg';

const ARTBOARD_WIDTH = 680;
const ARTBOARD_HEIGHT = 425; // Exact 16:10 aspect ratio (680 × 425)

const LIVE_DEMO_TILE_IDS = new Set([
  'dopamine-commerce',
  'noir-luxury',
  'specialty-cafe-terrace',
  'soft-aura-atelier',
  'architectural-outdoor',
  'automotive-rdw',
]);

export function hasLiveDemoArtboard(projectId: string): boolean {
  return LIVE_DEMO_TILE_IDS.has(projectId);
}

/** Wix-Studio-style blue selection box + 8 circular handles */
function TileStudioWidgetFrame({
  pillLabel,
  children,
}: {
  pillLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className="mb-1.5 inline-flex items-center rounded-md bg-[#2563EB] px-2.5 py-1 text-[11px] font-semibold tracking-[0.02em] text-white shadow-md">
        {pillLabel}
      </span>

      <div className="relative border-[2px] border-[#2563EB] bg-white/95 shadow-[0_18px_38px_-14px_rgba(37,99,235,0.42)]">
        <span className="pointer-events-none absolute -top-1.5 -left-1.5 h-2.5 w-2.5 rounded-full border-[1.5px] border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute -top-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-[1.5px] border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute -top-1.5 -right-1.5 h-2.5 w-2.5 rounded-full border-[1.5px] border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute top-1/2 -left-1.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-[1.5px] border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute top-1/2 -right-1.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-[1.5px] border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-2.5 w-2.5 rounded-full border-[1.5px] border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-[1.5px] border-[#2563EB] bg-white" />
        <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-2.5 w-2.5 rounded-full border-[1.5px] border-[#2563EB] bg-white" />
        {children}
      </div>
    </div>
  );
}

/** Fixed 680×425 artboard matching each realistic interactive demo */
function DemoArtboardCanvas({ projectId }: { projectId: string }) {
  // 01 — GOODS & TREATS (Candy Pop 3D Glassy Webshop · Demo 06)
  if (projectId === 'dopamine-commerce') {
    return (
      <div
        className="font-demo-dmsans relative h-[425px] w-[680px] overflow-hidden bg-[#FFFDF7] text-[#1C1917]"
        style={{
          backgroundImage: `radial-gradient(circle at 14% 16%, rgba(255,59,107,0.22), transparent 44%),
             radial-gradient(circle at 86% 24%, rgba(250,204,21,0.24), transparent 46%),
             radial-gradient(circle at 52% 92%, rgba(52,211,153,0.20), transparent 48%)`,
        }}
      >
        {/* Ambient 3D glossy candy sphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-12 -right-5 h-24 w-24 rounded-full opacity-85"
          style={{
            background:
              'radial-gradient(circle at 30% 28%, #FFFFFF 0%, #FDA4AF 28%, #FF3B6B 88%)',
            boxShadow:
              'inset 0 -8px 16px rgba(0,0,0,0.16), inset 0 6px 10px rgba(255,255,255,0.88)',
          }}
        />

        {/* Glossy Candy-Glass Floating Pill Header */}
        <div className="relative z-10 px-6 pt-4">
          <div className="flex items-center justify-between rounded-full border border-white/95 bg-white/80 px-4 py-2 shadow-[0_12px_28px_-12px_rgba(255,59,107,0.28),inset_0_2px_1px_rgba(255,255,255,0.95)]">
            <span className="inline-flex items-center gap-2 text-[13px] font-extrabold tracking-[0.04em] uppercase">
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full shadow-[inset_0_2px_2px_rgba(255,255,255,0.85)]"
                style={{
                  background:
                    'linear-gradient(145deg, #FF7CA0 0%, #FF3B6B 55%, #D91E4E 100%)',
                }}
              >
                <Sparkles className="h-3 w-3 text-white" />
              </span>
              <span>GOODS &amp; TREATS</span>
            </span>
            <div className="flex items-center gap-4 text-[10.5px] font-semibold text-[#1C1917]/70">
              <span>Shop Alles</span>
              <span>Gift Boxes</span>
              <span>Reviews</span>
            </div>
            <span
              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold text-white shadow-sm"
              style={{
                background:
                  'linear-gradient(180deg, #FF658E 0%, #FF3B6B 55%, #DC2658 100%)',
              }}
            >
              <ShoppingBag className="h-3 w-3" />
              <span>Tas (2)</span>
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="relative z-10 grid h-[calc(100%-64px)] grid-cols-12 gap-4 px-6 pt-5 pb-4">
          <div className="col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="text-[38px] leading-[0.98] font-black tracking-[-0.03em]">
                Dagelijks Geluk,{' '}
                <span className="text-[#FF3B6B]">Glossy Bezorgd.</span>
              </h3>
              <p className="mt-2 line-clamp-2 text-[12px] leading-[1.45] text-[#1C1917]/72">
                Speelse 3D glassy productkaarten, glanzende snoepaccenten en één-klik cadeauverpakking.
              </p>
            </div>

            <div className="mt-2">
              <TileStudioWidgetFrame pillLabel="Candy Pop · 3D Glossy Checkout">
                <div className="p-3 text-[#1C1917]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-4 w-4 rounded-full border-2 border-[#1C1917]"
                        style={{
                          background:
                            'radial-gradient(circle at 30% 25%, #fff 0%, #FF3B6B 75%)',
                        }}
                      />
                      <span
                        className="h-3.5 w-3.5 rounded-full"
                        style={{
                          background:
                            'radial-gradient(circle at 30% 25%, #fff 0%, #FACC15 75%)',
                        }}
                      />
                      <span
                        className="h-3.5 w-3.5 rounded-full"
                        style={{
                          background:
                            'radial-gradient(circle at 30% 25%, #fff 0%, #10B981 75%)',
                        }}
                      />
                      <span className="ml-1 text-[11px] font-bold">
                        Party Box (12 st.) · € 28
                      </span>
                    </div>
                    <span className="font-mono-tabular rounded bg-[#FACC15] px-1.5 py-0.5 text-[9px] font-extrabold text-[#1C1917]">
                      −15% CANDY15
                    </span>
                  </div>
                  <div
                    className="mt-2 flex items-center justify-between rounded px-2.5 py-1.5 text-[10px] font-bold text-white"
                    style={{
                      background:
                        'linear-gradient(180deg, #FF648D 0%, #FF3B6B 55%, #D91E4E 100%)',
                    }}
                  >
                    <span>Toevoegen aan tas — € 28</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </TileStudioWidgetFrame>
            </div>
          </div>

          {/* Right 3D Glossy Vitrine Gift Box */}
          <div
            className="relative col-span-5 flex flex-col items-center justify-between overflow-hidden rounded-2xl border border-white/95 p-3 shadow-[0_18px_38px_-14px_rgba(255,59,107,0.28),inset_0_2px_2px_rgba(255,255,255,0.95)]"
            style={{
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.88) 0%, rgba(255,228,236,0.72) 52%, rgba(254,243,199,0.78) 100%)',
            }}
          >
            <div className="flex w-full items-center justify-between">
              <span className="rounded-full bg-[#34D399]/25 px-2 py-0.5 text-[9px] font-bold text-[#065F46]">
                4.9 ★ (2.4K)
              </span>
              <span className="-rotate-2 rounded-md border border-[#1C1917] bg-[#FACC15] px-2 py-0.5 text-[9px] font-extrabold tracking-[0.04em] uppercase shadow-[2px_2px_0_#1C1917]">
                BESTSELLER ★
              </span>
            </div>

            {/* 3D Glossy Ribbon Treat Box */}
            <div className="relative flex flex-col items-center justify-center py-2">
              <div
                aria-hidden="true"
                className="absolute -top-2 -left-4 h-9 w-9 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 30% 28%, #FFFFFF 0%, #FEF08A 35%, #F59E0B 90%)',
                  boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.16)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -right-4 bottom-0 h-8 w-8 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 30% 28%, #FFFFFF 0%, #A7F3D0 35%, #10B981 90%)',
                  boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.16)',
                }}
              />

              {/* Bow */}
              <div className="mb-[-4px] flex items-end justify-center gap-0.5">
                <span className="h-4 w-6 -rotate-15 rounded-full border-2 border-[#1C1917] bg-[#FACC15]" />
                <span className="z-10 h-3 w-3 rounded-full border-2 border-[#1C1917] bg-[#2563EB]" />
                <span className="h-4 w-6 rotate-15 rounded-full border-2 border-[#1C1917] bg-[#34D399]" />
              </div>
              {/* Lid */}
              <div
                className="relative z-10 h-7 w-40 rounded-t-xl border-2 border-[#1C1917] shadow-[inset_0_3px_4px_rgba(255,255,255,0.6)]"
                style={{
                  background:
                    'linear-gradient(180deg, #FF658E 0%, #FF3B6B 100%)',
                }}
              >
                <div className="mx-auto h-full w-6 border-x-2 border-[#1C1917] bg-[#2563EB]" />
              </div>
              {/* Base */}
              <div
                className="relative flex h-24 w-36 items-center justify-center rounded-b-xl border-x-2 border-b-2 border-[#1C1917] shadow-[0_14px_24px_-10px_rgba(255,59,107,0.45)]"
                style={{
                  background:
                    'linear-gradient(145deg, #FFFFFF 0%, #FFE4EC 55%, #FBCFE8 100%)',
                }}
              >
                <div className="absolute inset-y-0 mx-auto w-6 border-x-2 border-[#1C1917] bg-[#2563EB]" />
                <span className="relative z-10 rounded-lg border-2 border-[#1C1917] bg-white px-2.5 py-1 text-[9.5px] font-black tracking-[0.06em] uppercase shadow-xs">
                  EDITION N°1
                </span>
              </div>
            </div>

            <div className="flex w-full items-center justify-between border-t border-[#1C1917]/10 pt-2">
              <span className="text-[11px] font-bold">Signature Treat Box</span>
              <span className="font-mono-tabular text-[12px] font-extrabold text-[#FF3B6B]">
                € 28.00
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 02 — NOORD BARBERS (Barber Red & Charcoal · Demo 03)
  if (projectId === 'noir-luxury') {
    return (
      <div className="font-demo-dmsans relative h-[425px] w-[680px] overflow-hidden bg-[#1C1C1C] text-[#EDE6D8]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full opacity-55 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(179,38,30,0.92) 0%, rgba(179,38,30,0) 70%)',
          }}
        />

        <div className="relative z-10 px-6 pt-4">
          <div className="flex items-center justify-between rounded-full border border-[#EDE6D8]/14 bg-[#111113] px-4 py-2">
            <span className="font-demo-oswald inline-flex items-center gap-1.5 text-[14px] font-bold tracking-[0.07em] uppercase">
              <Scissors className="h-3.5 w-3.5 text-[#B3261E]" />
              <span>NOORD BARBERS</span>
            </span>
            <div className="flex items-center gap-4 text-[10.5px] text-[#EDE6D8]/70">
              <span>Behandelingen</span>
              <span>Galerij</span>
              <span>Reviews</span>
            </div>
            <span className="rounded-full bg-[#B3261E] px-3 py-1 text-[10px] font-semibold text-white">
              Stoel reserveren
            </span>
          </div>
        </div>

        <div className="relative z-10 grid h-[calc(100%-64px)] grid-cols-12 gap-4 px-6 pt-5 pb-4">
          <div className="col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="font-demo-oswald text-[38px] leading-[0.98] font-bold tracking-[0.01em] uppercase">
                EEN STIJL DIE VOOR ZICH SPREEKT
              </h3>
              <p className="mt-2 line-clamp-2 text-[12px] leading-[1.45] text-[#EDE6D8]/72">
                Strakke fades, verzorgde baarden en directe boeking in een moderne Rotterdamse herenzaak.
              </p>
            </div>

            <div className="mt-2">
              <TileStudioWidgetFrame pillLabel="Barber · Reviews & Boeking">
                <div className="p-3 text-[#1C1B18]">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-[12.5px] font-bold">
                        Knippen &amp; Faden · €34
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[9.5px] text-[#1C1B18]/65">
                        <Star className="h-2.5 w-2.5 fill-[#E0A526] text-[#E0A526]" />
                        <span>4.9/5 · 320+ Google reviews</span>
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <span className="font-mono-tabular rounded bg-[#1C1C1C]/8 px-1.5 py-0.5 text-[9.5px] font-semibold">
                        13:30
                      </span>
                      <span className="font-mono-tabular rounded bg-[#B3261E] px-1.5 py-0.5 text-[9.5px] font-semibold text-white">
                        14:45
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded bg-[#B3261E] px-2.5 py-1.5 text-[10px] font-semibold text-white">
                    <span>Bevestig via WhatsApp</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </TileStudioWidgetFrame>
            </div>
          </div>

          <div className="col-span-5 overflow-hidden rounded-xl border border-[#EDE6D8]/16">
            <img
              src={barberPortraitImg}
              alt="Noord Barbers grooming studio"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    );
  }

  // 04 — CAFÉ KORNELIS (Horeca · Demo 04)
  if (projectId === 'specialty-cafe-terrace') {
    return (
      <div className="font-demo-dmsans relative h-[425px] w-[680px] overflow-hidden bg-[#EFE2CF] text-[#4A2C1D]">
        <div className="flex items-center justify-between border-b border-[#4A2C1D]/12 px-6 py-3">
          <div className="flex items-center gap-3.5 text-[10.5px] font-medium text-[#4A2C1D]/75">
            <span>Menukaart</span>
            <span>Verhaal</span>
            <span>Utrecht</span>
          </div>
          <span className="font-demo-oswald text-[17px] font-bold tracking-[0.04em] uppercase">
            CAFÉ KORNELIS
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E0A526] px-3 py-1 text-[10px] font-semibold text-[#1D120C]">
            <span>Tafel reserveren</span>
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>

        <div className="grid h-[calc(100%-54px)] grid-cols-12 gap-4 px-6 pt-5 pb-4">
          <div className="col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="font-demo-oswald text-[40px] leading-[0.95] font-bold uppercase">
                KOFFIE &amp; CROISSANT
              </h3>
              <p className="mt-2 line-clamp-2 text-[12px] leading-[1.45] text-[#4A2C1D]/75">
                Goede koffie, knapperig roombotergebak en actueel grachtenterras-weer.
              </p>
            </div>

            <div className="mt-2">
              <TileStudioWidgetFrame pillLabel="Horeca · Open-Meteo Terrasweer">
                <div className="p-3 text-[#4A2C1D]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4 text-[#E0A526]" />
                      <div>
                        <p className="text-[11.5px] font-bold">
                          Utrecht · Oudegracht
                        </p>
                        <p className="text-[9.5px] text-[#4A2C1D]/70">
                          18°C · Grachtenterras geopend
                        </p>
                      </div>
                    </div>
                    <span className="font-mono-tabular rounded bg-[#4A2C1D] px-2 py-0.5 text-[10px] font-bold text-[#EFE2CF]">
                      € 4,20
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded bg-[#E0A526] px-2.5 py-1.5 text-[10px] font-bold text-[#1D120C]">
                    <span>Bekijk menukaart &amp; terrasstatus</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </TileStudioWidgetFrame>
            </div>
          </div>

          <div className="col-span-5 overflow-hidden rounded-xl border border-[#4A2C1D]/16">
            <img
              src={cafeCroissantImg}
              alt="Café Kornelis koffie en croissant"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  // 05 — STUDIO VESPER (Fashionshop · Demo 05)
  if (projectId === 'soft-aura-atelier') {
    return (
      <div className="font-demo-dmsans relative h-[425px] w-[680px] overflow-hidden bg-[#F6CBD4] text-[#4A0F24]">
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between rounded-full bg-[#4A0F24] px-4 py-2 text-[#F6CBD4]">
            <span className="text-[12.5px] font-bold tracking-[0.14em] uppercase">
              STUDIO VESPER
            </span>
            <div className="flex items-center gap-3.5 text-[10px] font-semibold tracking-[0.06em] text-[#F6CBD4]/78 uppercase">
              <span>Zonnebrillen</span>
              <span>Optiek</span>
              <span>Drops</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#2DC92A] px-2.5 py-1 text-[10px] font-bold text-[#142914] uppercase">
              <ShoppingBag className="h-3 w-3" />
              <span>Tas (1)</span>
            </span>
          </div>
        </div>

        <div className="grid h-[calc(100%-64px)] grid-cols-12 gap-4 px-6 pt-5 pb-4">
          <div className="col-span-7 flex flex-col justify-between">
            <div>
              <p className="font-mono-tabular text-[9.5px] font-bold tracking-[0.08em] text-[#4A0F24]/65 uppercase">
                Zomercollectie · Gelimiteerde Drop
              </p>
              <h3 className="mt-1 text-[46px] leading-[0.94] font-black tracking-[-0.03em] uppercase">
                SOLARIS
              </h3>
              <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.45] text-[#4A0F24]/75">
                Spiegelende UV400 schildlenzen · Handgemaakt Italiaans acetaat.
              </p>
            </div>

            <div className="mt-2">
              <TileStudioWidgetFrame pillLabel="Fashionshop · Drop & WhatsApp">
                <div className="p-3 text-[#4A0F24]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-4 w-4 rounded-full border-2 border-[#4A0F24] bg-[#2DC92A]" />
                      <span className="h-3.5 w-3.5 rounded-full bg-[#4A0F24]" />
                      <span className="h-3.5 w-3.5 rounded-full bg-[#E88FA5]" />
                      <span className="ml-1 text-[11px] font-bold">
                        Kelly Groen · €165
                      </span>
                    </div>
                    <span className="font-mono-tabular text-[9.5px] font-semibold text-[#4A0F24]/65">
                      Nog 7 op voorraad
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded bg-[#2DC92A] px-2.5 py-1.5 text-[10px] font-bold text-[#142914]">
                    <span>Bestel direct via WhatsApp</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </TileStudioWidgetFrame>
            </div>
          </div>

          <div className="col-span-5 overflow-hidden rounded-xl border border-[#4A0F24]/16">
            <img
              src={fashionModelImg}
              alt="Studio Vesper Solaris eyewear campaign"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    );
  }

  // 09 — GROENEVELD (Architectuur & Buitenwerk · Demo 02)
  if (projectId === 'architectural-outdoor') {
    return (
      <div className="font-demo-dmsans relative h-[425px] w-[680px] overflow-hidden bg-[#162921] text-[#F3EFE6]">
        <div className="flex items-center justify-between border-b border-[#F3EFE6]/14 px-6 py-3">
          <span className="font-demo-fraunces text-[18px] font-semibold tracking-[-0.02em]">
            Groeneveld
          </span>
          <div className="flex items-center gap-4 text-[10.5px] font-medium text-[#F3EFE6]/72">
            <span>Projecten</span>
            <span>Tuinpaviljoens</span>
            <span>Werkweer</span>
          </div>
          <span className="rounded-full bg-[#C86D44] px-3 py-1 text-[10px] font-semibold text-white">
            Richtprijs
          </span>
        </div>

        <div className="grid h-[calc(100%-54px)] grid-cols-12 gap-4 px-6 pt-5 pb-4">
          <div className="col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="font-demo-fraunces text-[31px] leading-[1.05] font-semibold">
                Buitenarchitectuur en dakwerk voor elk seizoen.
              </h3>
              <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.45] text-[#F3EFE6]/72">
                Cederhout, natuursteen en zinkwerk afgestemd op perceel en weersplanning.
              </p>
            </div>

            <div className="mt-2">
              <TileStudioWidgetFrame pillLabel="Architectuur · PDOK + Werkweer">
                <div className="p-3 text-[#162921]">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#C86D44]" />
                      <span className="text-[11px] font-bold">
                        Dam, 1012 JS · Amsterdam
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded bg-[#162921]/8 px-1.5 py-0.5 text-[9.5px] font-semibold">
                      <CloudSun className="h-3 w-3 text-[#C86D44]" />
                      13°C Droog
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between rounded bg-[#162921] px-2.5 py-1.5 text-[10px] font-semibold text-[#F3EFE6]">
                    <span>48 m² Richtprijs: € 5.960 – € 7.260</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
              </TileStudioWidgetFrame>
            </div>
          </div>

          <div className="col-span-5 overflow-hidden rounded-xl border border-[#F3EFE6]/16">
            <img
              src={gardenPavilionImg}
              alt="Groeneveld architectural charred cedar pavilion"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  // 10 — KORVER AUTO (Autogarage · Demo 01)
  return (
    <div className="font-demo-outfit relative h-[425px] w-[680px] overflow-hidden bg-[#F3ECE1] text-[#1C1C1C]">
      <div className="relative z-10 px-6 pt-4">
        <div className="flex items-center justify-between rounded-full border border-[#1C1C1C]/10 bg-white px-4 py-2 shadow-xs">
          <span className="inline-flex items-center gap-1.5 text-[14px] font-bold tracking-[-0.01em]">
            <Wrench className="h-3.5 w-3.5 text-[#B8291E]" />
            <span>KORVER AUTO</span>
          </span>
          <div className="flex items-center gap-4 text-[10.5px] font-medium text-[#1C1C1C]/65">
            <span>Onderhoud</span>
            <span>APK-Check</span>
            <span>Tarieven</span>
          </div>
          <span className="rounded-full bg-[#B8291E] px-3 py-1 text-[10px] font-semibold text-white">
            Afspraak →
          </span>
        </div>
      </div>

      <div className="relative z-10 grid h-[calc(100%-64px)] grid-cols-12 gap-4 px-6 pt-5 pb-4">
        <div className="col-span-7 flex flex-col justify-between">
          <div>
            <h3 className="text-[34px] leading-[1.03] font-bold tracking-[-0.025em]">
              Onderhoud en APK, volgens fabrieksnorm.
            </h3>
            <p className="mt-1.5 line-clamp-2 text-[12px] leading-[1.45] text-[#1C1C1C]/70">
              Remmen, distributie en merkonafhankelijke diagnose met directe kentekencheck.
            </p>
          </div>

          <div className="mt-2">
            <TileStudioWidgetFrame pillLabel="Autogarage · Live RDW API">
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 flex-1 items-center overflow-hidden rounded border border-[#1C1C1C] bg-[#F7C600]">
                    <span className="flex h-full items-center bg-[#003399] px-1.5 text-[8.5px] font-bold text-white">
                      NL
                    </span>
                    <span className="font-mono-tabular flex-1 text-center text-[11.5px] font-extrabold tracking-[0.08em] text-[#111]">
                      KXT-67-P
                    </span>
                  </div>
                  <span className="rounded bg-[#1C1C1C] px-2 py-1 text-[9.5px] font-semibold text-white">
                    AUDI A5
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between rounded bg-[#B8291E] px-2.5 py-1.5 text-[10px] font-semibold text-white">
                  <span>APK Geldig t/m 01-10-2030 · Plan APK</span>
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            </TileStudioWidgetFrame>
          </div>
        </div>

        <div className="col-span-5 overflow-hidden rounded-xl border border-[#1C1C1C]/12 bg-[#141416]">
          <img
            src={brakeDiscImg}
            alt="Korver Auto performance brake rotor"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

interface ScaledDemoArtboardProps {
  projectId: string;
  initialWidth?: number;
  className?: string;
}

/** Scales the crisp 680×425 (16:10) demo artboard uniformly to fit any container width cleanly. */
export function ScaledDemoArtboard({
  projectId,
  initialWidth = 280,
  className = '',
}: ScaledDemoArtboardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState<number>(initialWidth / ARTBOARD_WIDTH);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const w = el.clientWidth;
      if (w > 0) {
        setScale(w / ARTBOARD_WIDTH);
      }
    };

    updateScale();

    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none relative h-full w-full overflow-hidden select-none ${className}`}
    >
      <div
        style={{
          width: ARTBOARD_WIDTH,
          height: ARTBOARD_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <DemoArtboardCanvas projectId={projectId} />
      </div>
    </div>
  );
}
