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
      'Po celou dobu výroby 1946–1954 hlava výhradně bez dekompresoru (pouze centrální otvor M14 pro svíčku), rané stroje štítek Zbrojovka Ing. F. Janeček.',
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
    { year: 1946, from: 1, to: 1500, label: 'Nultá / raná série, štítek Zbrojovka Janeček, 150mm brzdy, hlava bez dekompresoru' },
    { year: 1947, from: 1501, to: 15800, label: 'Standardní poválečná série, karburace Amal/Jikov, hlava bez dekompresoru' },
    { year: 1948, from: 15801, to: 34900, label: 'Přechodné období znárodnění, hlava bez dekompresoru' },
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
