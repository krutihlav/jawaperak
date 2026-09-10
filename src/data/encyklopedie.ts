// Jediné místo, kde se udržuje seznam encyklopedických stránek.
// Čte ho rozcestník /perak/, rejstřík pod články i menu v hlavičce.
// Data žijí v encyklopedie.json (editovatelné přes CMS na /admin),
// tento soubor jen dodává typy a re-exportuje je pro zbytek webu.

import data from './encyklopedie.json';

export type Skupina = 'model' | 'uzel' | 'data' | 'verze';

export interface EncyStranka {
  href: string;
  titul: string;
  popis: string;
  skupina: Skupina;
  hotovo: boolean;
}

export const skupiny: { klic: Skupina; nazev: string; popis: string }[] = data.skupiny as {
  klic: Skupina;
  nazev: string;
  popis: string;
}[];

export const encyklopedie: EncyStranka[] = data.encyklopedie as EncyStranka[];
