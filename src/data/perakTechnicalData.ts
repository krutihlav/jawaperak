// src/data/perakTechnicalData.ts
export interface PerakModelSpec {
  id: string;
  name: string;
  internalCode: string;
  years: string;
  engineType: string;
  displacement: string;
  power: string;
  maxSpeed: string;
  weight: string;
  brakes: string;
  electrical: string;
  typicalColor: string;
  rarityScore: number;
  restorationDifficulty: string;
  keyDistinctions: string[];
}

export interface SerialRange {
  year: number;
  from: number;
  to: number;
  label: string;
}

export const PERAK_SPECS: PerakModelSpec[] = [
  {
    id: 'typ-11',
    name: 'Jawa 250 Pérák',
    internalCode: 'Typ 11 (předválečný kód 10)',
    years: '1946 – 1954',
    engineType: 'Vzduchem chlazený dvoutaktní jednoválec s vratným vyplachováním',
    displacement: '248,5 cm³ (vrtání 65 mm × zdvih 75 mm)',
    power: '9,0 k (od r. 1950: 10,0 k) při 4 000 ot./min',
    maxSpeed: '100 km/h',
    weight: '115 kg (pohotovostní 125 kg)',
    brakes: 'Půlbubny 150 mm (od čísla 11-61551 v r. 1950 zvětšeny na 160 mm)',
    electrical: 'PAL 6 V / 45 W, dynamo na pravé straně klikového hřídele',
    typicalColor: 'ČSN 8850 (tmavá červeň vínového tónu), ruční zlaté linkování',
    rarityScore: 4,
    restorationDifficulty: 'Střední (spotřební díly a repliky jsou v ČR dostupné)',
    keyDistinctions: [
      'Do roku 1949 dekompresor v hlavě válce a štítek Zbrojovka Ing. F. Janeček.',
      'Karburátor Amal 276 (rané kusy) nebo Jikov 2924 s otočnou clonou.',
      'Legendární kryté zadní kluzáky s vinutými pružinami integrované do rámu.',
      'Jednoduchý kolébkový rám svařený ze čtyřhranných ocelových profilů.'
    ]
  },
  {
    id: 'typ-12',
    name: 'Jawa 350 Pérák (Ogar)',
    internalCode: 'Typ 12',
    years: '1948 – 1950',
    engineType: 'Vzduchem chlazený dvoutaktní řadový dvouválec s dělenou klikovkou',
    displacement: '344 cm³ (vrtání 58 mm × zdvih 65 mm)',
    power: '12,0 k při 4 000 ot./min',
    maxSpeed: '110–115 km/h',
    weight: '120 kg (pohotovostní 132 kg)',
    brakes: 'Půlbubny 150 mm (stejné jako raná 250)',
    electrical: 'PAL 6 V / 45 W, dvě zapalovací cívky, dva přerušovače',
    typicalColor: 'Holubičí šedá se zlatou linkou a logem Ogar, na export vínová ČSN 8850',
    rarityScore: 9,
    restorationDifficulty: 'Extrémní (specifické díly motoru a kliky, minimální druhovýroba)',
    keyDistinctions: [
      'Vyvinuto původně v továrně Ogar v Praze-Strašnicích těsně po válce.',
      'Kartery s hladkým zaobleným tvarem, odlišné uchycení dynama a zapalování.',
      'Vyrobeno jen cca 10 000 kusů před nucenou unifikací s typem 18.',
      'Sběratelsky nejvzácnější sériový poválečný Pérák na českém i evropském trhu.'
    ]
  },
  {
    id: 'typ-18',
    name: 'Jawa 350 Pérák',
    internalCode: 'Typ 18',
    years: '1950 – 1954',
    engineType: 'Vzduchem chlazený dvoutaktní řadový dvouválec s unifikovaným motorem',
    displacement: '344 cm³ (vrtání 58 mm × zdvih 65 mm)',
    power: '12,0 k (později 14,0 k s upraveným sáním)',
    maxSpeed: '115 km/h',
    weight: '122 kg',
    brakes: 'Zvětšené půlbubny 160 mm s chladicími žebry na víkách',
    electrical: 'PAL 6 V / 45 W se zdokonaleným vačkovým unašečem',
    typicalColor: 'ČSN 8850 tmavá vínová červeň, exportní verze též v černé',
    rarityScore: 7,
    restorationDifficulty: 'Vyšší (díly motoru dražší než na 250, ale dostupnější než typ 12)',
    keyDistinctions: [
      'Přepracované bloky motoru s unifikovanými ložisky a vylepšeným chlazením válců.',
      'Standardně velké 160mm brzdové bubny již přímo z výroby.',
      'Ideální tažný stroj pro postranní vozík (sidecar Tůma nebo Velorex).',
      'Modernizovaná spínací skříňka v nádrži s ampérmetrem PAL.'
    ]
  }
];

export const SERIAL_RANGES: Record<string, SerialRange[]> = {
  '11': [
    { year: 1946, from: 1, to: 1500, label: 'Nultá / raná série, dekompresor, Zbrojovka Janeček štítek, 150mm brzdy' },
    { year: 1947, from: 1501, to: 15800, label: 'Standardní poválečná série, dekompresor, karburace Amal/Jikov' },
    { year: 1948, from: 15801, to: 34900, label: 'Přechodné období znárodnění, postupné mizení dekompresoru' },
    { year: 1949, from: 34901, to: 53800, label: 'Hlava bez dekompresoru, unifikovaná spínačka, 150mm bubny' },
    { year: 1950, from: 53801, to: 73000, label: 'Zlomový milník: od čísla 11-61551 náběh 160mm brzd a výkonu 10 k' },
    { year: 1951, from: 73001, to: 90000, label: 'Pozdní série s 160mm bubny a novým žebrováním válce' },
    { year: 1952, from: 90001, to: 110000, label: 'Roční řada (dvouciferný rok 52 na štítku), exportní série' },
    { year: 1953, from: 110001, to: 125000, label: 'Předposlední ročník před nástupem Kývačky 353' },
    { year: 1954, from: 125001, to: 135000, label: 'Dobíhající výroba, souběh s prvními Kývačkami' }
  ],
  '12': [
    { year: 1948, from: 1, to: 900, label: 'Ogar 350 raná série, holubičí šedý lak, původní logo Ogar na nádrži' },
    { year: 1949, from: 901, to: 4500, label: 'Ogar / Jawa 350, náběh červeného laku ČSN 8850' },
    { year: 1950, from: 4501, to: 10000, label: 'Závěrečná série typu 12 před unifikací na typ 18' }
  ],
  '18': [
    { year: 1950, from: 1, to: 8000, label: 'Nová unifikovaná Jawa 350, nový blok motoru, 160mm brzdy' },
    { year: 1951, from: 8001, to: 14200, label: 'Standardní typ 18, souběžná výroba s typem 11' },
    { year: 1952, from: 14201, to: 22000, label: 'Roční řada, vyšší komprese, exportní provedení' }
  ]
};

export const PARTS_CATALOG_GROUPS = [
  {
    id: 'motor',
    name: 'Skupina I — Motor & Klikové ústrojí',
    pages: 'Strany 4–32',
    count: 142,
    highlights: ['Válec a hlava válce', 'Klikový hřídel a ojnice', 'Píst a kroužky', 'Kartery motoru']
  },
  {
    id: 'karburator',
    name: 'Skupina II — Karburace a Sání',
    pages: 'Strany 33–48',
    count: 68,
    highlights: ['Karburátor Jikov 2924', 'Vzduchový filtr s přívěrou', 'Palivový kohout se sítkem', 'Rukojeť plynu']
  },
  {
    id: 'prevodovka',
    name: 'Skupina III — Spojka a Převodovka',
    pages: 'Strany 49–74',
    count: 114,
    highlights: ['Čtyřstupňová převodovka', 'Poloautomatické vypínání', 'Řadicí a startovací páka', 'Primární řetěz']
  },
  {
    id: 'podvozek',
    name: 'Skupina IV — Rám, Vidlice a Pérování',
    pages: 'Strany 75–108',
    count: 156,
    highlights: ['Svařovaný kolébkový rám', 'Teleskopická vidlice', 'Zadní kluzáky (péra)', 'Tandemové sedlo']
  },
  {
    id: 'kola-brzdy',
    name: 'Skupina V — Kola a Brzdové bubny',
    pages: 'Strany 109–126',
    count: 82,
    highlights: ['Ráfky 19" a výplet', 'Půlbubny 150 vs 160 mm', 'Brzdové čelisti', 'Hnací řetěz a rozeta']
  },
  {
    id: 'elektrika',
    name: 'Skupina VI — Elektroinstalace & Reflektor',
    pages: 'Strany 127–140',
    count: 76,
    highlights: ['Dynamo PAL 6V/45W', 'Spínací skříňka v nádrži', 'Přední světlomet a parabola', 'Zadní svítilna']
  }
];

export const SAMPLE_REGISTRY = [
  {
    id: 'jp-11-00128',
    serialMasked: '11-001××',
    type: 'Jawa 250 (Typ 11)',
    yearEstimated: 1946,
    condition: 'Původní funkční patina',
    color: 'ČSN 8850 původní lak s patinou',
    region: 'Olomoucký kraj',
    badge: 'Zbrojovka Ing. F. Janeček štítek',
    notes: 'Raná série č. 128, dekompresor, dochován v původním funkčním stavu.'
  },
  {
    id: 'jp-12-00412',
    serialMasked: '12-004××',
    type: 'Jawa 350 Ogar (Typ 12)',
    yearEstimated: 1948,
    condition: 'Holubičí šedá patina',
    color: 'Holubičí šedá se zlatou linkou',
    region: 'Praha',
    badge: 'Tachometr v mílích (GB export)',
    notes: 'Unikátní dochovaný Ogar v šedé barvě s původními kartery typu 12.'
  },
  {
    id: 'jp-18-03420',
    serialMasked: '18-034××',
    type: 'Jawa 350 (Typ 18)',
    yearEstimated: 1951,
    condition: 'Precizní renovace',
    color: 'ČSN 8850 tmavá vínová červeň',
    region: 'Jihomoravský kraj',
    badge: 'Sidecar Tůma',
    notes: '160mm brzdové bubny, dobový postranní vozík Tůma.'
  },
  {
    id: 'jp-11-military-08',
    serialMasked: '11-voj-0××',
    type: 'Jawa 250 Vojenská',
    yearEstimated: 1951,
    condition: 'Vojenská patina',
    color: 'ČSN 5450 Khaki matná',
    region: 'Královéhradecký kraj',
    badge: 'Vojenský přejímací štítek ČSLA',
    notes: 'Armádní provedení bez zlatých linek, původní kryt zapalování.'
  }
];
