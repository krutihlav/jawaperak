// Jediný zdroj pravdy pro konstrukční skupiny katalogu dílů 1949.
// Používá ho prohlížeč katalogu (tlačítka data-jump) i homepage (karty skupin).
// `index` je 0-based index dvoustrany v prohlížeči (0 = obálka, 1 = titulní list,
// 2 = str. 2–3, …); adresa v prohlížeči je 1-based: #s{index + 1}.
// Začátky skupin jsou orientační — je třeba je ověřit proti rejstříku v knize.
export const KATALOG_URL = '/navody/katalog-dilu-jawa-250-1949/';

export const KATALOG_SKUPINY = [
  { name: 'Motor', index: 2 },
  { name: 'Karburace a filtr', index: 14 },
  { name: 'Převodovka a spojka', index: 26 },
  { name: 'Rám a pérování', index: 38 },
  { name: 'Kola a brzdy', index: 50 },
  { name: 'Elektrická výzbroj PAL', index: 62 },
];

export const katalogSkupinaUrl = (index: number) => `${KATALOG_URL}#s${index + 1}`;
