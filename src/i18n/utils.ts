// Jeden zdroj pravdy pro "má stránka EN verzi?" — používá ho language
// switcher, hreflang generování v Layoutu i middleware pro cookie redirect.
// DB-řízené stránky (registr strojů, katalog dílů, …) EN verzi zatím nemají
// — radši žádný hreflang/switcher/redirect na ně než hreflang/redirect na 404.
const PATHS_WITHOUT_EN: RegExp[] = [
  /^\/perak\/motor\/?$/,
  /^\/perak\/zmeny-v-case\/?$/,
  /^\/navody\/katalog-dilu-jawa-250-1949\/?$/,
  /^\/registr\/stroj\/.+/,
];

export function hasLocaleVersion(pathname: string, locale: 'en'): boolean {
  const path = pathname.replace(/^\/en(\/|$)/, '/');
  return !PATHS_WITHOUT_EN.some((re) => re.test(path));
}

// Zpětně kompatibilní obal nad hasLocaleVersion pro stávající volání v
// LanguageSwitcher a Layoutu: na EN stránce se vždy chová, jako by
// ekvivalent existoval (EN routy se generují jen pro obsah, který
// ekvivalent má).
export function hasNoEnEquivalent(currentLocale: string, pathname: string): boolean {
  if (currentLocale !== 'cs') return false;
  return !hasLocaleVersion(pathname, 'en');
}
