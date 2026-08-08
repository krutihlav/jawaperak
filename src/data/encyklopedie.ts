// Jediné místo, kde se udržuje seznam encyklopedických stránek.
// Čte ho rozcestník /perak/, rejstřík v patičce článku i navigace v hlavičce.
// Nová stránka = přidat řádek sem a nastavit hotovo: true.

export interface EncyStranka {
  href: string;
  titul: string;
  popis: string;
  hotovo: boolean;
}

export const encyklopedie: EncyStranka[] = [
  {
    href: '/perak/typ-10-a-typ-11/',
    titul: 'Typ 10 a typ 11',
    popis: 'Jeden stroj, dvě jména. Co se v roce 1948 skutečně změnilo a podle čeho poznáte raný kus.',
    hotovo: true,
  },
  {
    href: '/perak/motor-12-vs-18/',
    titul: 'Motor 12 vs 18',
    popis: 'Technické rozdíly mezi oběma třistapadesátkami, včetně toho, co jde a co nejde zaměnit.',
    hotovo: true,
  },
  {
    href: '/perak/identifikace/',
    titul: 'Výrobní čísla a datování',
    popis: 'Kde má Pérák čísla, co z nich vyčtete a proč rok na štítku nemusí být rok výroby.',
    hotovo: true,
  },
  {
    href: '/perak/podvozek/',
    titul: 'Podvozek a odpružení',
    popis: 'To, čemu Pérák vděčí za přezdívku. Vidlice, zadní odpružení, rám.',
    hotovo: false,
  },
  {
    href: '/perak/elektro/',
    titul: 'Elektroinstalace',
    popis: 'Dobové schéma, dynamo, cívky a moderní náhrady včetně bezkontaktních sad.',
    hotovo: false,
  },
  {
    href: '/perak/barvy-a-provedeni/',
    titul: 'Barvy a provedení',
    popis: 'Odstíny, linky, nápisy a chrom podle období. Podle čeho poznáte lak, který neodpovídá roku.',
    hotovo: false,
  },
  {
    href: '/perak/vojenske-verze/',
    titul: 'Vojenské verze',
    popis: 'Značení, odlišnosti výbavy a zvláštní formát výrobního čísla.',
    hotovo: false,
  },
  {
    href: '/perak/sidecary/',
    titul: 'Sidecary a tříkolky',
    popis: 'Dobové postranní vozíky, uchycení a co obnáší provoz s vozíkem dnes.',
    hotovo: false,
  },
  {
    href: '/perak/technicke-udaje/',
    titul: 'Technické údaje',
    popis: 'Srovnávací tabulka všech typů na jednom místě — rozměry, hmotnosti, výkony.',
    hotovo: false,
  },
  {
    href: '/historie/',
    titul: 'Historie a vývoj',
    popis: 'Tajný vývoj za okupace, poválečný rozjezd a cesta na světové trhy.',
    hotovo: true,
  },
  {
    href: '/perak/sport/',
    titul: 'Sportovní nasazení',
    popis: 'Šestidenní, soutěže a to, co z nich zpětně ovlivnilo sériovou výrobu.',
    hotovo: false,
  },
  {
    href: '/perak/konec-vyroby/',
    titul: 'Nástupci a konec výroby',
    popis: 'Čím byl Pérák nahrazen, kdy skončil a co z něj přešlo do dalších modelů.',
    hotovo: false,
  },
];
