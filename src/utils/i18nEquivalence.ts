// Stránky, které v EN verzi zatím nemají ekvivalent (DB-řízené stránky jako
// /perak/motor/, /registr/stroj/[slug]/, katalog dílů) — sdílené mezi
// LanguageSwitcher (kam vést místo 404) a Layout (jestli vůbec vykreslit
// hreflang alternate odkazy — radši žádný hreflang než hreflang na 404).
export const NO_EN_EQUIVALENT = [
  /^\/perak\/motor\/?$/,
  /^\/perak\/zmeny-v-case\/?$/,
  /^\/navody\/katalog-dilu-jawa-250-1949\/?$/,
  /^\/registr\/stroj\/.+/,
];

export function hasNoEnEquivalent(currentLocale: string, pathname: string): boolean {
  if (currentLocale !== 'cs') return false;
  const path = pathname.replace(/^\/en(\/|$)/, '/');
  return NO_EN_EQUIVALENT.some((re) => re.test(path));
}
