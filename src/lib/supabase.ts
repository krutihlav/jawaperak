import { createClient } from '@supabase/supabase-js';

// Veřejný (anon) klient — smí číst jen pohled `stroje_verejne`
// (schválené záznamy, maskovaná výrobní čísla, bez kontaktů)
// a vkládat nové záznamy do `stroje` / `stroje_fotky` (jdou do fronty ke schválení).
// Servisní klíč pro moderaci se používá jen v odděleném adminím rozhraní, nikdy zde.
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Stroj = {
  id: string;
  typ: '11' | '12' | '18';
  rok_vyroby: number | null;
  cislo_ramu_masked: string | null;
  cislo_motoru_masked: string | null;
  stav: 'puvodni' | 'renovovano' | 'v_renovaci' | 'vrak' | 'na_dily';
  renovoval: string | null;
  renovoval_odkaz: string | null;
  zeme: string | null;
  region: string | null;
  lat: number | null;
  lng: number | null;
  pribeh: string | null;
  na_prodej: boolean;
  vytvoreno_at: string;
};
