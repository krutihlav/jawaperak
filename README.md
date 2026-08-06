# jawaperak.cz — kostra projektu

Astro + Supabase, podle `jawaperak-cz-architektura.md` a `jawaperak-shrnuti.md`.

## Co tu je

- `src/layouts/Layout.astro` — hlavička, patička, veškeré CSS z prototypu (beze změny vizuálu)
- `src/pages/index.astro` — domovská stránka, 1:1 převod prototypu do layoutu
- `src/pages/registr/index.astro` — čte z pohledu `stroje_verejne` v Supabase (schválené záznamy, maskovaná výrobní čísla)
- `src/pages/perak-vs-perak.astro` — povinná disambiguační stránka (indická Jawa Perak), viz priorita v architektuře
- `src/lib/supabase.ts` — anon klient + typ `Stroj`
- `public/stitek-perak.png` — fotografie štítku

## Supabase

Projekt **jawaperak** (ref `hcszrmqtwnkzlbrecrey`, eu-west-1) je založený a aktivní.
Datový model registru je nasazený:

- `public.stroje` — plná data, RLS zapnuto, přímé čtení tabulky je pro anon/authenticated zakázané
- `public.stroje_fotky` — fotky ke stroji
- `public.stroje_verejne` — veřejný pohled: jen `schvaleno = true`, výrobní čísla maskovaná funkcí `masked_serial()` (např. `11-24×××`), bez kontaktních údajů
- anonymní vložení nového záznamu je povolené, ale vždy s `schvaleno = false` (jde do fronty ke schválení)

**Zbývá:** admin/moderátorské rozhraní pro schvalování (přes servisní klíč, mimo tenhle veřejný Astro build — typicky malá oddělená stránka nebo přímo Supabase Studio zatím stačí).

Bezpečnostní lint hlásí `stroje_verejne` jako `SECURITY DEFINER` pohled — to je tady záměr (jinak by anon roli nešlo ukázat maskovaná data, aniž by viděla plnou tabulku), ne chyba k opravě.

## Než se dá nasadit

1. `npm install`
2. Vyplnit `.env` podle `.env.example` (anon klíč najdeš v nastavení Supabase projektu → API)
3. `npm run dev` pro lokální náhled
4. Pro `/registr/*` na produkci: přidat `@astrojs/vercel` adaptér a přepnout `output` v `astro.config.mjs` na `'hybrid'` — zatím je web čistě statický
5. Zbytek stránek ze sitemapy v architektuře (`/perak/typ-11/` atd.) zatím chybí — čekají na obsah (fotoarchiv, ověřená data z tištěných pramenů, ceníky), viz sekce "Co zbývá dodat" v shrnutí

## Deployment

Repozitář `jawaperak` na GitHubu (zakládá se) → import do Vercelu → doména `jawaperak.cz` se přesměruje z Webglobe na Vercel až po ověření na dočasné `*.vercel.app` adrese.
