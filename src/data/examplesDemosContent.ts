export type DemoLang = 'nl' | 'en';

export interface DemoSectionNav {
  id: string;
  num: string;
  label: Record<DemoLang, string>;
}

export const DEMO_JUMP_ITEMS: DemoSectionNav[] = [
  { id: 'demo-garage', num: '01', label: { nl: 'Garage · RDW API', en: 'Garage · RDW API' } },
  { id: 'demo-buitenwerk', num: '02', label: { nl: 'Buitenwerk · PDOK + Weer', en: 'Outdoor · PDOK + Weather' } },
  { id: 'demo-barber', num: '03', label: { nl: 'Barber · Reviews & Boeking', en: 'Barber · Reviews & Booking' } },
  { id: 'demo-horeca', num: '04', label: { nl: 'Horeca · Terrasweer API', en: 'Cafe · Terrace Weather' } },
  { id: 'demo-fashion', num: '05', label: { nl: 'Fashion · Drop & WhatsApp', en: 'Fashion · Drop & Cart' } },
];

export const GARAGE_TEST_PLATES = [
  { plate: 'KXT-67-P', raw: 'KXT67P', label: 'Audi A5' },
  { plate: '91-LBL-6', raw: '91LBL6', label: 'Toyota Yaris' },
  { plate: 'KXT-67-S', raw: 'KXT67S', label: 'Mercedes CLA' },
];

export interface RdwFallbackRecord {
  kenteken: string;
  merk: string;
  handelsbenaming: string;
  vervaldatum_apk: string;
  eerste_kleur: string;
  brandstof_omschrijving: string;
  datum_eerste_toelating: string;
  openstaande_terugroepactie_indicator: string;
}

export const RDW_FALLBACK_RECORDS: Record<string, RdwFallbackRecord> = {
  KXT67P: {
    kenteken: 'KXT67P',
    merk: 'AUDI',
    handelsbenaming: 'A5 AVANT 220KW TFSI E',
    vervaldatum_apk: '20301001',
    eerste_kleur: 'BLAUW',
    brandstof_omschrijving: 'Benzine / Hybride',
    datum_eerste_toelating: '20260401',
    openstaande_terugroepactie_indicator: 'Nee',
  },
  '91LBL6': {
    kenteken: '91LBL6',
    merk: 'TOYOTA',
    handelsbenaming: 'TOYOTA YARIS',
    vervaldatum_apk: '20270504',
    eerste_kleur: 'GRIJS',
    brandstof_omschrijving: 'Benzine',
    datum_eerste_toelating: '20100219',
    openstaande_terugroepactie_indicator: 'Nee',
  },
  KXT67S: {
    kenteken: 'KXT67S',
    merk: 'MERCEDES-BENZ',
    handelsbenaming: 'CLA 250',
    vervaldatum_apk: '20300929',
    eerste_kleur: 'WIT',
    brandstof_omschrijving: 'Benzine',
    datum_eerste_toelating: '20260401',
    openstaande_terugroepactie_indicator: 'Nee',
  },
};

export const BUITENWERK_QUICK_LOCATIONS = [
  { query: '1012JS', label: '1012 JS Amsterdam' },
  { query: '2611GW', label: '2611 GW Delft' },
  { query: '3511EJ', label: '3511 EJ Utrecht' },
];

export interface BarberServiceItem {
  id: string;
  name: Record<DemoLang, string>;
  duration: string;
  price: number;
}

export const BARBER_SERVICES: BarberServiceItem[] = [
  {
    id: 'cut',
    name: { nl: 'Knippen & Faden', en: 'Precision Cut & Fade' },
    duration: '35 min',
    price: 34,
  },
  {
    id: 'beard',
    name: { nl: 'Baard & Hot Towel', en: 'Beard & Hot Towel' },
    duration: '25 min',
    price: 26,
  },
  {
    id: 'combo',
    name: { nl: 'Complete Behandeling', en: 'Full Grooming Session' },
    duration: '55 min',
    price: 54,
  },
];

export const BARBER_SLOTS = ['13:30', '14:45', '16:15', '17:30', '19:00'];

export interface BarberReviewItem {
  id: string;
  author: string;
  rating: number;
  date: Record<DemoLang, string>;
  text: Record<DemoLang, string>;
}

export const INITIAL_BARBER_REVIEWS: BarberReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Bram Verhoeven',
    rating: 5,
    date: { nl: '2 dagen geleden', en: '2 days ago' },
    text: {
      nl: 'Strakste skin-fade van de stad en altijd stipt op tijd. Fijne sfeer zonder gehaast.',
      en: 'Sharpest skin fade in town and always right on schedule. Great relaxed atmosphere.',
    },
  },
  {
    id: 'rev-2',
    author: 'Joris van Dijk',
    rating: 5,
    date: { nl: '1 week geleden', en: '1 week ago' },
    text: {
      nl: 'Hot towel scheerbeurt is elke keer top. Online zo geboekt via WhatsApp.',
      en: 'The hot towel shave never misses. Booked my chair in seconds.',
    },
  },
  {
    id: 'rev-3',
    author: 'Timo Bakker',
    rating: 5,
    date: { nl: '2 weken geleden', en: '2 weeks ago' },
    text: {
      nl: 'Eindelijk een barbier die echt luistert naar hoe je haar groeit. Top resultaat.',
      en: 'Finally a barber who pays attention to growth direction and crown detail.',
    },
  },
];

export interface CafeCityCoord {
  id: string;
  city: string;
  address: string;
  lat: number;
  lon: number;
}

export const CAFE_CITIES: CafeCityCoord[] = [
  { id: 'utrecht', city: 'Utrecht', address: 'Oudegracht 148', lat: 52.0907, lon: 5.1214 },
  { id: 'amsterdam', city: 'Amsterdam', address: 'Prinsengracht 412', lat: 52.3676, lon: 4.8845 },
  { id: 'haarlem', city: 'Haarlem', address: 'Grote Markt 29', lat: 52.3813, lon: 4.6361 },
];

export interface CafeMenuItem {
  id: string;
  category: 'coffee' | 'breakfast' | 'pastry';
  title: Record<DemoLang, string>;
  note: Record<DemoLang, string>;
  price: string;
}

export const CAFE_MENU_ITEMS: CafeMenuItem[] = [
  {
    id: 'flat-white',
    category: 'coffee',
    title: { nl: 'Dubbele Flat White', en: 'Double Flat White' },
    note: { nl: 'Ethiopië branding · havermelk optie', en: 'Ethiopian roast · oat milk option' },
    price: '€ 4,20',
  },
  {
    id: 'cortado',
    category: 'coffee',
    title: { nl: 'Huisgemaakte Cortado', en: 'House Cortado' },
    note: { nl: 'Dubbele espresso · warme microfoam', en: 'Double shot · textured warm milk' },
    price: '€ 3,80',
  },
  {
    id: 'croissant-menu',
    category: 'breakfast',
    title: { nl: 'Croissant + Cappuccino', en: 'Croissant + Cappuccino' },
    note: { nl: 'Ochtendmenu tot 11:30 · roomboter', en: 'Morning pairing until 11:30' },
    price: '€ 7,50',
  },
  {
    id: 'brioche-egg',
    category: 'breakfast',
    title: { nl: 'Brioche Roerei & Truffel', en: 'Brioche Soft Scramble' },
    note: { nl: 'Vers gebakken · bieslook & oude kaas', en: 'Baked to order · chives & aged cheese' },
    price: '€ 11,90',
  },
  {
    id: 'amandel-croissant',
    category: 'pastry',
    title: { nl: 'Amandelcroissant', en: 'Roasted Almond Croissant' },
    note: { nl: 'Gevuld met frangipane · 2x gebakken', en: 'Frangipane filled · twice baked' },
    price: '€ 4,60',
  },
  {
    id: 'kardemom-bun',
    category: 'pastry',
    title: { nl: 'Scandinavisch Kardemombroodje', en: 'Cardamom Morning Bun' },
    note: { nl: 'Vers uit de steenoven · parelsuiker', en: 'Fresh out the deck oven · pearl sugar' },
    price: '€ 4,40',
  },
];

export interface FashionVariant {
  id: string;
  label: Record<DemoLang, string>;
  swatchHex: string;
  price: number;
  stock: number;
}

export const FASHION_VARIANTS: FashionVariant[] = [
  {
    id: 'kelly-green',
    label: { nl: 'Kelly Groen Schild', en: 'Kelly Green Shield' },
    swatchHex: '#2DC92A',
    price: 165,
    stock: 7,
  },
  {
    id: 'deep-wine',
    label: { nl: 'Diep Wijnrood Acetaat', en: 'Deep Wine Acetate' },
    swatchHex: '#4A0F24',
    price: 165,
    stock: 4,
  },
  {
    id: 'blush-mirror',
    label: { nl: 'Blush Roze Spiegel', en: 'Blush Mirror Edition' },
    swatchHex: '#E88FA5',
    price: 185,
    stock: 2,
  },
];

export const FASHION_FITS = ['Regular · 52mm', 'Wide · 56mm'];
