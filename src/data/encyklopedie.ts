// Jediné místo, kde se udržuje seznam encyklopedických stránek.
// Čte ho rozcestník /perak/, rejstřík pod články i menu v hlavičce.
// Nová stránka = přidat řádek sem a přehodit hotovo na true.

export type Skupina = 'model' | 'uzel' | 'data' | 'verze';

export interface EncyStranka {
  href: string;
  titul: string;
  popis: string;
  skupina: Skupina;
  hotovo: boolean;
}

export const skupiny: { klic: Skupina; nazev: string; popis: string }[] = [
  {
    klic: 'model',
    nazev: 'Modely',
    popis: 'Co je to za stroj, jak vznikl a v čem se raný kus liší od pozdního.',
  },
  {
    klic: 'uzel',
    nazev: 'Technika po uzlech',
    popis: 'Jeden celek do hloubky, vždy pro obě kubatury vedle sebe.',
  },
  {
    klic: 'data',
    nazev: 'Identifikace a data',
    popis: 'Nástroje na určení konkrétního stroje podle výrobního čísla.',
  },
  {
    klic: 'verze',
    nazev: 'Zvláštní verze a kontext',
    popis: 'Vojenské stroje, vozíky a příběh značky.',
  },
];

export const encyklopedie: EncyStranka[] = [
  // ---------- modely ----------
  {
    href: '/perak/250/',
    titul: 'Pérák 250 — typ 10 a 11',
    popis: 'Celý příběh dvěstěpadesátky: vznik, přejmenování v roce 1948 a šedesát čtyři doložených konstrukčních změn během osmi let výroby.',
    skupina: 'model',
    hotovo: true,
  },
  {
    href: '/perak/350/',
    titul: 'Pérák 350 — typ 12 a 18',
    popis: 'Ogar, který se stal Jawou. V čem se typ 18 liší od typu 12 a proč jejich výrobní čísla nelze porovnávat.',
    skupina: 'model',
    hotovo: true,
  },
  {
    href: '/perak/250-vs-350/',
    titul: 'Pérák 250 nebo 350',
    popis: 'Kterou kubaturu si vybrat. Rozdíly v provozu, dostupnosti dílů i v ceně na trhu.',
    skupina: 'model',
    hotovo: true,
  },

  // ---------- uzly ----------
  {
    href: '/perak/motor/',
    titul: 'Motor',
    popis: 'Konstrukce obou motorů, žebrování hlavy a válce, klikové ústrojí a jeho sedm provedení u typu 12.',
    skupina: 'uzel',
    hotovo: true,
  },
  {
    href: '/perak/podvozek/',
    titul: 'Podvozek a odpružení',
    popis: 'To, čemu Pérák vděčí za přezdívku. Rám, teleskopická vidlice, zadní odpružení, brzdy a kola.',
    skupina: 'uzel',
    hotovo: true,
  },
  {
    href: '/perak/elektro/',
    titul: 'Elektroinstalace',
    popis: 'Dynamo, spínací skříňky ve všech provedeních, dobové schéma a moderní náhrady.',
    skupina: 'uzel',
    hotovo: true,
  },
  {
    href: '/perak/barvy-a-provedeni/',
    titul: 'Barvy a provedení',
    popis: 'Laky, linky, nápisy a chrom podle období. Podle čeho poznáte provedení, které neodpovídá roku výroby.',
    skupina: 'uzel',
    hotovo: false,
  },

  // ---------- data ----------
  {
    href: '/perak/identifikace/',
    titul: 'Výrobní čísla a datování',
    popis: 'Kde má Pérák čísla, co z nich vyčtete a proč rok na štítku nemusí být rokem výroby.',
    skupina: 'data',
    hotovo: true,
  },
  {
    href: '/perak/zmeny-v-case/',
    titul: 'Co má mít můj stroj',
    popis: 'Zadáte výrobní číslo a vypadne seznam dílů, které k němu podle databáze změn patří.',
    skupina: 'data',
    hotovo: false,
  },
  {
    href: '/perak/technicke-udaje/',
    titul: 'Technické údaje',
    popis: 'Srovnávací tabulka všech typů na jednom místě — rozměry, hmotnosti, převody, výkony.',
    skupina: 'data',
    hotovo: false,
  },

  // ---------- verze a kontext ----------
  {
    href: '/perak/vojenske-verze/',
    titul: 'Vojenské verze',
    popis: 'Značení, odlišnosti výbavy a zvláštní formát výrobního čísla.',
    skupina: 'verze',
    hotovo: false,
  },
  {
    href: '/perak/sidecary/',
    titul: 'Sidecary a tříkolky',
    popis: 'Dobové postranní vozíky, uchycení k rámu a co obnáší provoz s vozíkem dnes.',
    skupina: 'verze',
    hotovo: false,
  },
  {
    href: '/perak/riksa/',
    titul: 'Rikša',
    popis: 'Tovární tříkolka odvozená z Péráka, stavěná pro asijské trhy. Téma, o kterém český web mlčí.',
    skupina: 'verze',
    hotovo: false,
  },
  {
    href: '/historie/',
    titul: 'Historie a vývoj',
    popis: 'Tajný vývoj za okupace, poválečný rozjezd a cesta na světové trhy.',
    skupina: 'verze',
    hotovo: true,
  },
];
