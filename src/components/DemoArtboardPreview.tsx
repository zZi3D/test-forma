import { useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  CloudSun,
  Coffee,
  FileCheck2,
  Landmark,
  MapPin,
  Menu,
  Scale,
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
import notarisWalnutImg from '../assets/images/notaris_walnut_desk_1794998687602.jpg';
import boutiqueGymImg from '../assets/images/boutique_gym_interior_1794998688220.jpg';
import studioEditorialImg from '../assets/images/studio_editorial_portrait_1794998687094.jpg';
import studioMonoImg from '../assets/images/studio_monochrome_profile_1794998704973.jpg';
import studioCrimsonImg from '../assets/images/studio_crimson_closeup_1794998704495.jpg';

const ARTBOARD_WIDTH = 680;
const ARTBOARD_HEIGHT = 425; // Exact 16:10 aspect ratio (680 × 425)

const LIVE_DEMO_TILE_IDS = new Set([
  'dopamine-commerce',
  'noir-luxury',
  'swiss-minimalism',
  'specialty-cafe-terrace',
  'soft-aura-atelier',
  'kinetic-performance',
  'neo-brutalist-pop',
  'architectural-outdoor',
  'automotive-rdw',
  'modular-bento',
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
          className="pointer-events-none absolute -top-24 -right-6 h-80 w-80 rounded-full opacity-55"
          style={{
            background:
              'radial-gradient(circle, rgba(179,38,30,0.85) 0%, rgba(179,38,30,0.22) 38%, rgba(179,38,30,0) 70%)',
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
              decoding="async"
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
              decoding="async"
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
              decoding="async"
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
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  // 10 — KORVER AUTO (Autogarage · Demo 01)
  if (projectId === 'automotive-rdw') {
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
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  // 03 — NOTARIS & RECHT (Notariaat & Juridisch)
  if (projectId === 'swiss-minimalism') {
    return (
      <div className="font-demo-dmsans relative h-[425px] w-[680px] overflow-hidden bg-[#241911] text-[#FAF5ED]">
        <img
          src={notarisWalnutImg}
          alt="Warm notary wood office interior"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(98deg, rgba(24,17,12,0.92) 0%, rgba(30,21,15,0.74) 48%, rgba(24,17,12,0.22) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(18,13,9,0.78) 100%)',
          }}
        />

        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-4">
          <span className="inline-flex items-center gap-2 text-[14px] font-semibold tracking-[-0.01em] text-[#FAF5ED]">
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-[#E2AD5E]/60 bg-[#E2AD5E]/15 text-[#E2AD5E]">
              <Scale className="h-3.5 w-3.5" />
            </span>
            <span>Notaris &amp; Recht</span>
          </span>
          <div className="flex items-center gap-4 text-[10px] font-medium text-[#FAF5ED]/75">
            <span>Vakgebieden</span>
            <span>Kantoren</span>
            <span>Over ons</span>
            <span>Log in</span>
          </div>
          <span className="rounded-md bg-[#E2AD5E] px-3 py-1.5 text-[10px] font-semibold text-[#1C140D] shadow-sm">
            Kennismaking
          </span>
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 px-6 pt-7">
          <p className="text-[10.5px] font-semibold tracking-[0.04em] text-[#E2AD5E]">
            Notariaat &amp; Juridisch
          </p>
          <h3 className="mt-1.5 max-w-[350px] text-[34px] leading-[1.03] font-bold tracking-[-0.02em] text-white">
            Zekerheid bij elke grote stap.
          </h3>
          <p className="mt-2 max-w-[320px] text-[11px] leading-[1.45] text-[#FAF5ED]/78">
            Persoonlijk advies en duidelijke notariële aktes voor gezin, vastgoed en onderneming.
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <span className="rounded-md bg-[#E2AD5E] px-3.5 py-2 text-[10.5px] font-bold text-[#1C140D] shadow-sm">
              Contact op maat
            </span>
            <span className="rounded-md border border-[#FAF5ED]/30 bg-black/25 px-3.5 py-2 text-[10.5px] font-medium text-[#FAF5ED]">
              Vakgebieden →
            </span>
          </div>
        </div>

        {/* Floating 3 Cream Legal Feature Cards */}
        <div className="relative z-10 mt-6 grid grid-cols-3 gap-3 px-6">
          <div className="rounded-xl border border-white/75 bg-[#FBF6EE] p-3 text-[#1C1917] shadow-lg">
            <div className="flex items-center gap-1.5">
              <FileCheck2 className="h-3.5 w-3.5 text-[#C58C3C]" />
              <span className="text-[11px] font-bold">Oprichting</span>
            </div>
            <p className="mt-1.5 text-[8.5px] leading-[1.4] text-[#1C1917]/65">
              Heldere statuten, aandeelhoudersovereenkomst en snelle inschrijving.
            </p>
          </div>
          <div className="rounded-xl border border-white/75 bg-[#FBF6EE] p-3 text-[#1C1917] shadow-lg">
            <div className="flex items-center gap-1.5">
              <Landmark className="h-3.5 w-3.5 text-[#C58C3C]" />
              <span className="text-[11px] font-bold">Kostenbeheer</span>
            </div>
            <p className="mt-1.5 text-[8.5px] leading-[1.4] text-[#1C1917]/65">
              Transparante vaste tarieven voor iedere leverings- of hypotheekakte.
            </p>
          </div>
          <div className="rounded-xl border border-white/75 bg-[#FBF6EE] p-3 text-[#1C1917] shadow-lg">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#C58C3C]" />
              <span className="text-[11px] font-bold">Vastgoed &amp; Familie</span>
            </div>
            <p className="mt-1.5 text-[8.5px] leading-[1.4] text-[#1C1917]/65">
              Zorgvuldige begeleiding bij overdracht, samenwonen en testament.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 06 — BOUTIQUE GYM (Gyms, Trainers & Personal Coaching)
  if (projectId === 'kinetic-performance') {
    return (
      <div className="font-demo-outfit relative h-[425px] w-[680px] overflow-hidden bg-[#111113] text-[#F5F2EB]">
        <img
          src={boutiqueGymImg}
          alt="Boutique gym strength training interior"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(95deg, rgba(10,10,12,0.92) 0%, rgba(12,12,15,0.72) 48%, rgba(10,10,12,0.28) 100%)',
          }}
        />

        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-4">
          <span className="font-demo-oswald text-[16px] font-bold tracking-[0.04em] text-white uppercase">
            BOUTIQUE GYM
          </span>
          <div className="flex items-center gap-4 text-[10px] font-medium text-white/75">
            <span>Roosters</span>
            <span>Programma</span>
            <span>Trainers</span>
            <span>Log in</span>
          </div>
          <span className="rounded-md bg-[#EA580C] px-3 py-1.5 text-[10px] font-semibold text-white shadow-sm">
            Train gratis mee
          </span>
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 flex h-[calc(100%-60px)] flex-col justify-between px-6 pt-12 pb-3">
          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.02em] text-[#EA580C]">
              Boutique Gym &amp; Personal Training
            </p>
            <h3 className="mt-1.5 max-w-[390px] text-[37px] leading-[1.03] font-bold tracking-[-0.025em] text-white">
              Train op jouw niveau, zonder drukte.
            </h3>
            <p className="mt-2.5 max-w-[310px] text-[11px] leading-[1.45] text-white/72">
              Persoonlijke krachttraining en small-group coaching in een rustige studio met vaste begeleiding.
            </p>
            <div className="mt-5">
              <span className="inline-flex rounded-md bg-[#EA580C] px-4 py-2 text-[11px] font-semibold text-white shadow-md">
                Plan proefles
              </span>
            </div>
          </div>

          {/* Subtle Bottom Tab Strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-t-xl border-t border-x border-white/10 bg-[#141417]/88 px-3 py-2 text-[9.5px] font-semibold text-white/78">
              01 · Strength Club
            </div>
            <div className="rounded-t-xl border-t border-x border-white/10 bg-[#141417]/88 px-3 py-2 text-[9.5px] font-semibold text-white/78">
              02 · 1-op-1 Coaching
            </div>
            <div className="rounded-t-xl border-t border-x border-white/10 bg-[#141417]/88 px-3 py-2 text-[9.5px] font-semibold text-white/78">
              03 · Small Group
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 08 — CREATIVE STUDIO & EVENTS (Agencies, Festivals & Cultuur)
  if (projectId === 'neo-brutalist-pop') {
    return (
      <div className="font-demo-dmsans relative h-[425px] w-[680px] overflow-hidden bg-white text-[#09090B]">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-black/8 px-6 py-3">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-[#09090B] text-[11px] font-black text-white">
            S
          </span>
          <div className="flex items-center gap-5 text-[10.5px] font-medium text-[#09090B]/70">
            <span>Portfolio</span>
            <span>Media</span>
            <span>Events</span>
            <span>Contact</span>
          </div>
          <Menu className="h-4 w-4 text-[#09090B]" />
        </div>

        {/* 2-Row Bento Masonry Grid matching screenshot proportions */}
        <div className="grid h-[calc(100%-49px)] grid-rows-2 gap-2.5 px-6 pt-3 pb-4">
          {/* Top Row */}
          <div className="grid grid-cols-12 gap-2.5">
            <div className="col-span-6 flex items-center pr-2">
              <h3 className="text-[28px] leading-[1.06] font-bold tracking-[-0.03em] text-[#09090B]">
                Merken en evenementen die blijven hangen.
              </h3>
            </div>
            <div className="col-span-3 overflow-hidden rounded-xl bg-[#0B0B0E]">
              <img
                src={studioEditorialImg}
                alt="Stage spotlight editorial portrait"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="col-span-3 flex flex-col gap-2">
              <div className="flex-1 overflow-hidden rounded-xl bg-[#E4E4E7]">
                <img
                  src={studioMonoImg}
                  alt="Creative director monochrome portrait"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="rounded-xl bg-[#09090B] px-3 py-2 text-white">
                <p className="text-[8px] font-semibold tracking-[0.04em] text-white/75 uppercase">
                  Live Stages &amp; Film
                </p>
                <p className="mt-0.5 text-[9px] font-bold">
                  120+ Producties
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-12 gap-2.5">
            <div className="col-span-3 overflow-hidden rounded-xl bg-[#EF4444]">
              <img
                src={studioCrimsonImg}
                alt="Crimson concert portrait"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="col-span-3 overflow-hidden rounded-xl bg-[#18181B]">
              <img
                src={studioMonoImg}
                alt="Monochrome festival profile"
                decoding="async"
                className="h-full w-full scale-110 object-cover object-center grayscale contrast-125"
              />
            </div>
            <div className="col-span-3 flex flex-col justify-between rounded-xl bg-[#F4F4F5] p-3 text-[#09090B]">
              <div>
                <p className="text-[11px] font-bold">18+</p>
                <p className="mt-1 text-[8.5px] leading-[1.35] text-[#09090B]/70">
                  Jaar ervaring met merkactivaties, festivals en culturele campagnes.
                </p>
              </div>
              <span className="text-[8.5px] font-semibold text-[#09090B]">
                Meer →
              </span>
            </div>
            <div className="col-span-3 overflow-hidden rounded-xl bg-[#DC2626]">
              <img
                src={studioCrimsonImg}
                alt="Live event close-up stage"
                decoding="async"
                className="h-full w-full scale-125 object-cover object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 12 — B2B SOFTWARE & SAAS (SaaS, Apps & Automatisering)
  return (
    <div className="font-demo-dmsans relative h-[425px] w-[680px] overflow-hidden bg-[#F1F5F9] p-3 text-[#0F172A]">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#CBD5E1]/70 bg-[#F8FAFC] shadow-sm">
        {/* Browser Chrome Strip */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-white px-4 py-1.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#FCA5A5]" />
            <span className="h-2 w-2 rounded-full bg-[#FDE047]" />
            <span className="h-2 w-2 rounded-full bg-[#86EFAC]" />
          </div>
          <span className="font-mono-tabular rounded bg-[#F1F5F9] px-3 py-0.5 text-[8px] text-[#64748B]">
            app.b2bsuite.nl/dashboard
          </span>
          <span className="w-8" />
        </div>

        {/* App Nav Bar */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0]/70 bg-white px-5 py-2.5">
          <span className="text-[12px] font-bold tracking-[-0.015em] text-[#0F172A]">
            B2B Software &amp; ...
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[9.5px] font-medium text-[#64748B]">Log in</span>
            <span className="rounded-md bg-[#2563EB] px-2.5 py-1 text-[9.5px] font-semibold text-white">
              Gratis proberen
            </span>
          </div>
        </div>

        {/* Split Hero + Bento Analytics Dashboard */}
        <div className="grid flex-1 grid-cols-12 gap-3.5 p-4">
          {/* Left SaaS Value Prop + KPI cards */}
          <div className="col-span-5 flex flex-col justify-between py-1">
            <div>
              <span className="inline-flex rounded-full bg-[#DBEAFE] px-2.5 py-0.5 text-[8.5px] font-semibold text-[#1D4ED8]">
                Nieuw · Slimme Automatisering
              </span>
              <h3 className="mt-2.5 text-[23px] leading-[1.08] font-bold tracking-[-0.025em] text-[#0F172A]">
                Minder handwerk, meer grip op je cijfers.
              </h3>
              <p className="mt-2 text-[9.5px] leading-[1.45] text-[#64748B]">
                Automatische facturatie, realtime dashboards en foutloze synchronisatie voor teams.
              </p>
              <div className="mt-3.5 flex items-center gap-2.5">
                <span className="rounded-md bg-[#2563EB] px-3 py-1.5 text-[9.5px] font-semibold text-white shadow-xs">
                  Start proefperiode
                </span>
                <span className="text-[9.5px] font-semibold text-[#475569]">
                  Bekijk demo →
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-2.5">
                <p className="font-mono-tabular text-[13px] font-bold text-[#0F172A]">
                  4.500+
                </p>
                <p className="text-[8px] text-[#64748B]">Actieve bedrijven</p>
              </div>
              <div className="rounded-xl border border-[#E2E8F0] bg-white p-2.5">
                <p className="font-mono-tabular text-[13px] font-bold text-[#2563EB]">
                  98.4%
                </p>
                <p className="text-[8px] text-[#64748B]">Klantscore</p>
              </div>
            </div>
          </div>

          {/* Right 4 Dashboard Bento Modules */}
          <div className="col-span-7 grid grid-cols-2 grid-rows-2 gap-2.5">
            {/* Module 1: Activity Bar Chart */}
            <div className="flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] font-semibold text-[#64748B]">
                  Activity Dashboard
                </span>
                <span className="font-mono-tabular text-[9px] font-bold text-[#0F172A]">
                  € 142.8K
                </span>
              </div>
              <div className="mt-2 flex h-20 items-end justify-between gap-2 px-1">
                <span className="h-[46%] w-full rounded-t bg-[#3B82F6]" />
                <span className="h-[72%] w-full rounded-t bg-[#F97316]" />
                <span className="h-[54%] w-full rounded-t bg-[#FACC15]" />
                <span className="h-[88%] w-full rounded-t bg-[#2563EB]" />
                <span className="h-[64%] w-full rounded-t bg-[#10B981]" />
                <span className="h-[78%] w-full rounded-t bg-[#6366F1]" />
              </div>
            </div>

            {/* Module 2: Workflow Checklist */}
            <div className="flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-[8.5px] font-semibold text-[#64748B]">
                  Checklist
                </span>
                <span className="rounded-full bg-[#DCFCE7] px-1.5 py-0.5 text-[7.5px] font-bold text-[#15803D]">
                  LIVE SYNC
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 rounded-md bg-[#F8FAFC] px-2 py-1 text-[8.5px] font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#F97316]" />
                  <span>Factuur koppeling</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-[#F8FAFC] px-2 py-1 text-[8.5px] font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                  <span>Bank mutaties</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-md bg-[#F8FAFC] px-2 py-1 text-[8.5px] font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                  <span>BTW rapportage</span>
                </div>
              </div>
            </div>

            {/* Module 3: Efficiency Donut */}
            <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-white p-3">
              <div>
                <p className="text-[8.5px] font-semibold text-[#64748B]">
                  Efficiency
                </p>
                <p className="font-mono-tabular mt-1 text-[16px] font-bold text-[#0F172A]">
                  +78%
                </p>
                <p className="text-[7.5px] text-[#64748B]">Minder handwerk</p>
              </div>
              <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="13"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="13"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="5"
                  strokeDasharray="34 82"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="13"
                  fill="none"
                  stroke="#FACC15"
                  strokeWidth="5"
                  strokeDasharray="22 82"
                  strokeDashoffset="-34"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="13"
                  fill="none"
                  stroke="#F97316"
                  strokeWidth="5"
                  strokeDasharray="16 82"
                  strokeDashoffset="-56"
                />
              </svg>
            </div>

            {/* Module 4: Dark Calculator Quickpad */}
            <div className="flex flex-col justify-between rounded-xl bg-[#0F172A] p-3 text-white">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-semibold tracking-[0.04em] text-white/60 uppercase">
                  Margin Calc
                </span>
                <span className="font-mono-tabular text-[9.5px] font-bold text-[#60A5FA]">
                  € 4.250
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', 'OK'].map(
                  (key) => (
                    <span
                      key={key}
                      className={`font-mono-tabular flex h-4.5 items-center justify-center rounded text-[8px] font-semibold ${
                        key === 'OK'
                          ? 'bg-[#2563EB] text-white'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {key}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
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
        const nextScale = w / ARTBOARD_WIDTH;
        setScale((prev) => (Math.abs(prev - nextScale) > 0.002 ? nextScale : prev));
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
      style={{ contain: 'layout style paint' }}
      className={`pointer-events-none relative h-full w-full overflow-hidden select-none ${className}`}
    >
      <div
        style={{
          width: ARTBOARD_WIDTH,
          height: ARTBOARD_HEIGHT,
          transform: `translate3d(0, 0, 0) scale(${scale})`,
          transformOrigin: 'top left',
          willChange: 'transform',
        }}
      >
        <DemoArtboardCanvas projectId={projectId} />
      </div>
    </div>
  );
}
