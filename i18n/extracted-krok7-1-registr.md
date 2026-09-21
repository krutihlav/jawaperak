# Extrakce natvrdo psaných CS textů — /registr/ a /registr/pridat-stroj/

Krok 7.1 — technický podklad pro překlad. Nic z tohoto souboru není
přeloženo, jen vypsáno tak, jak je to v kódu. Seskupeno podle souboru,
shora dolů v pořadí, jak texty jdou v UI.

Součástí jsou i sdílené komponenty, které obě routy vykreslují
(`Layout.astro`, `LanguageSwitcher.astro`, `CookieConsent.astro`) —
hlavička, patička a cookie lišta se zobrazují na obou stránkách,
ale nejsou specifické jen pro registr/pridat-stroj (jsou na celém webu).

---

## src/pages/registr/index.astro

- `10`: "Registr dochovaných Péráků | jawaperak.cz" (`<title>` přes `Layout` prop `title`)
- `11`: "Veřejná databáze dochovaných motocyklů Jawa 250 a 350 Pérák. Přidejte svůj stroj a pomozte zmapovat, kolik jich přežilo." (meta description přes `Layout` prop `description`)
- `18`: "Registr" (kicker)
- `19`: "Kolik Péráků přežilo?" (h1)
- `21-24`: "Nikdo to neví. Vyráběly se desítky tisíc kusů, dochovala se neznámá část — roztroušená po garážích, stodolách a sbírkách. Tenhle registr to zkouší zmapovat." (lead)
- `27`: "strojů" (popisek statistiky)
- `29`: "zemí" (popisek statistiky) — pozn.: "250 ccm" / "350 ccm" na řádcích 28–29 jsou jen číslo + jednotka, neobsahují CS text k překladu
- `35`: "Máte Péráka?"
- `36`: "I nekompletní nebo rozebraný stroj do registru patří."
- `38`: "Přidat stroj" (text odkazu/tlačítka)
- `43`: "Dochované stroje" (h2)
- `45`: "Filtry" (`aria-label` na `role="group"`)
- `46`: "Typ" (`aria-label` na select)
- `47`: "Všechny typy" (`<option>`)
- `49`: "Stav" (`aria-label` na select)
- `50`: "Všechny stavy" (`<option>`)
- `52`: "Výrobní fáze" (`aria-label` na select)
- `53`: "Všechny fáze" (`<option>`)
- `55`: "Jen na prodej" (label checkboxu)
- `59`: "Načítám registr…" (počáteční stav výpisu)
- `64`: "Jak registr funguje" (h2)
- `67`: "Co je veřejné a co ne" (`<caption>` tabulky)
- `69`: "Údaj" / "Viditelnost" (hlavičky tabulky)
- `72`: "Typ, rok, stav, barva" / "Veřejné"
- `73`: "Výrobní čísla" / "Veřejně jen částečně — poslední tři znaky zakryté"
- `74`: "Kraj / země" / "Veřejné (ne přesná adresa)"
- `75`: "Jméno a kontakt majitele" / "Nikdy veřejné, jen přes formulář a se souhlasem"
- `76`: "Fotky a příběh stroje" / "Veřejné"
- `81`: "Proč zakrýváme část čísel" (popisek boxu)
- `83-86`: "Kompletní výrobní číslo se dá zneužít ke klonování identity — přeražením na jiný, třeba kradený stroj. Zakrytá část zůstává v databázi a používá se při ověřování, jen není veřejně čitelná."
- `90-93`: "Každý záznam před zveřejněním ručně zkontrolujeme — ne kvůli přísnosti, ale kvůli kvalitě dat. Neúplný záznam ale vítáme, doplnit se dá kdykoli."

### Texty generované klientským JS (stejný soubor, `<script>` blok)

- `214`: "Na prodej" (`<span class="tagx tagx--red">Na prodej</span>`, zobrazí se u karty stroje na prodej)
- `217`: `Bez<br>fotky` (placeholder karty bez fotky — template string se zachovaným `<br>`)
- `223`: `` `Typ ${s.typ}` `` — fallback název typu, když typ chybí v číselníku (např. "Typ 10")
- `265-269`: prázdný stav výpisu:
  ```
  <p><b>Zatím tu nic není.</b></p>
  <p>Registr se teprve plní. Když přidáte svůj stroj, budete mezi prvními.</p>
  <a class="btn" href="/registr/pridat-stroj/">Přidat stroj</a>
  ```
- `275`: "Registr se nepodařilo načíst. Zkuste to prosím později." (chyba načtení výpisu, zobrazená uživateli)

Pozn.: texty v `console.error(...)` (řádky 136, 162, 193, 206) jsou jen
vývojářské logy do konzole, ne uživatelský obsah — nejsou zahrnuté.

---

## src/pages/registr/pridat-stroj/index.astro

Tahle stránka už má rozdělené CS/EN texty do objektů `CS`/`EN` (řádky
12–78), podle kterých se vybírá `t = locale === 'en' ? EN : CS`. Níže je
CS varianta (`CS`, řádky 12–44) plus pár textů, které v objektu nejsou
(placeholdery a jedna JS hláška mimo `msgs`).

- `84`: "Přidat stroj do registru | jawaperak.cz" (`<title>` — mimo `CS`/`EN` objekt, natvrdo jen v CS)
- `85`: "Přidejte svůj motocykl Jawa Pérák do veřejného registru dochovaných strojů. Kontaktní údaje zůstávají skryté, výrobní čísla se zveřejňují jen částečně." (meta description — mimo `CS`/`EN` objekt, natvrdo jen v CS)
- `90`: "Registr" (kicker — natvrdo, není v `CS`/`EN` objektu, na EN routě se tedy nepřekládá)
- `13`: `h1`: "Přidat stroj"
- `14`: `lead`: "Vyplňte, co víte. Neúplný záznam je lepší než žádný — doplnit se dá kdykoli."
- `15`: `privH`: "Co se zveřejní"
- `16`: `priv1`: "Typ, rok, stav, barva, kraj — veřejně"
- `17`: `priv2`: "Výrobní čísla — jen částečně, poslední tři znaky zakryté"
- `18`: `priv3`: "Jméno, e-mail a telefon — nikdy veřejně"
- `19`: `priv4`: "Záznam zveřejníme až po ruční kontrole"
- `20`: `fsStroj`: "Stroj" (legenda fieldsetu)
- `20`: `lTyp`: "Typ *" (label)
- `20`: `lRok`: "Rok výroby" (label)
- `126`: "1951" (`placeholder` inputu roku výroby — jen ukázkové číslo, bez CS textu)
- `21`: `lRam`: "Výrobní číslo rámu" (label)
- `21`: `hRam`: "Zveřejní se jako 11-102•••" (nápověda pod polem)
- `133`: "11-102934" (`placeholder` — ukázkové číslo)
- `22`: `lMotor`: "Výrobní číslo motoru" (label)
- `139`: "12-5845" (`placeholder` — ukázkové číslo)
- `22`: `lFaze`: "Výrobní fáze" (label)
- `22`: `lStav`: "Stav *" (label)
- `23`: `lBarva`: "Barva" (label)
- `162`: "Červená" (`placeholder` pole barvy)
- `23`: `lSpz`: "Historická SPZ" (label)
- `166`: "Nepovinné" (`placeholder` pole SPZ)
- `24`: `fsFoto`: "Fotografie" (legenda fieldsetu)
- `25`: `fotoHint`: "Aspoň jedna fotka výrazně pomůže s ověřením záznamu. JPG, PNG nebo WebP, max. 8 MB na fotku, max. 6 fotek."
- `26`: `lFoto`: "Fotky stroje" (label)
- `31`: `fsKde`: "Kde stroj je" (legenda fieldsetu)
- `31`: `lZeme`: "Země" (label)
- `189`: "Česko" (`placeholder` i výchozí `value` pole země)
- `31`: `lRegion`: "Kraj / region" (label)
- `193`: "Olomoucký" (`placeholder` pole regionu)
- `32`: `hRegion`: "Přesnou adresu nezadávejte" (nápověda pod polem)
- `33`: `fsPribeh`: "Příběh stroje" (legenda fieldsetu)
- `34`: `lPribeh`: "Jak jste ke stroji přišli, co víte o jeho historii" (label)
- `203`: "Nepovinné, ale je to nejzajímavější část registru." (`placeholder` textarey příběhu)
- `35`: `lPribehEn`: "Anglicky (nepovinné)" (label pro pole `pribeh_en`)
- `36`: `fsKontakt`: "Kontakt" (legenda fieldsetu)
- `37`: `kontaktNote`: "Kontakt slouží k ověření záznamu. Veřejně se nikdy nezobrazí."
- `38`: `lEmail`: "E-mail *" (label)
- `38`: `lTel`: "Telefon" (label)
- `38`: `lProdej`: "Stroj je na prodej" (label checkboxu)
- `39`: `lSouhlas`: "Souhlasím, aby mě zájemci mohli kontaktovat přes formulář (kontakt zůstává skrytý)" (label checkboxu)
- `40`: `btnSend`: "Odeslat ke schválení" (text tlačítka submit)

### Validační a stavové hlášky (`CS`, používané v `<script>` bloku)

- `27`: `fotoPocet`: "Nejvýše 6 fotek." (klientská validace počtu fotek)
- `28`: `fotoTyp`: "Povolené jsou jen soubory JPG, PNG nebo WebP." (klientská validace typu souboru)
- `29`: `fotoVelikost`: "Každá fotka musí být do 8 MB." (klientská validace velikosti)
- `30`: `fotoUploadErr`: "Záznam jsme odeslali, ale některé fotky se nepodařilo nahrát. Ozveme se vám." (částečné selhání uploadu fotek)
- `41`: `okMsg`: "Děkujeme. Záznam jsme odeslali ke schválení." (úspěšné odeslání formuláře; použito i pro honeypot, řádek 356)
- `42`: `errMsg`: "Něco se pokazilo. Zkuste to prosím znovu, nebo nám napište." (obecná chyba odeslání)
- `43`: `reqMsg`: "Vyplňte prosím povinná pole." (chybí povinná pole)
- `363`: "Formulář byl odeslán příliš rychle. Zkuste to prosím znovu." (anti-spam časová past — natvrdo v `<script>`, **není** v objektu `CS`/`EN`, takže se nepřekládá ani na EN routě)

Pozn.: texty v `console.error(...)` (řádek 285) nejsou uživatelský obsah,
nejsou zahrnuté.

---

## src/layouts/Layout.astro

Sdílený layout, který obě routy vykreslují (hlavička, patička,
cookie lišta). Texty níže nejsou specifické pro registr/pridat-stroj —
zobrazují se na celém webu — ale protože layout tyto dvě stránky
skutečně používá, jsou pro úplnost vypsané.

- `150`: "Jawa 250 Pérák (1951) v NTM Praha" (`og:image:alt` — stejný obrázek/alt na všech stránkách včetně obou cílových routů)
- `854`: "Jawapérák — domů" (`aria-label` loga v hlavičce)
- `857`: "Otevřít menu" (`aria-label` hamburger tlačítka)
- `862`: "Hlavní" (`aria-label` hlavní navigace)
- `864`: "Encyklopedie" (položka menu)
- `868`: "Celý přehled" (položka podmenu)
- `870`: "Registr" (položka menu)
- `871`: "Návody" (položka menu)
- `872`: "Dílna" (položka menu)
- `886`: "Jawapérák — domů" (`aria-label` loga v patičce)
- `887`: "Nezávislý web o motocyklu Jawa 250/350 Pérák. Píše **Adam Kment**, dílna PureBikes, Drahanovice u Olomouce." (text o webu v patičce)
- `890`: "Encyklopedie" (nadpis sloupce patičky)
- `891`: "Pérák 250" (odkaz)
- `892`: "Pérák 350" (odkaz)
- `893`: "Výrobní čísla" (odkaz)
- `894`: "Technické údaje" (odkaz)
- `897`: "Registr" (nadpis sloupce patičky)
- `898`: "Dochované stroje" (odkaz)
- `899`: "Přidat stroj" (odkaz)
- `900`: "Statistiky" (odkaz)
- `903`: "Dílna PureBikes" (nadpis sloupce patičky)
- `904`: "Prohlídka před koupí" (odkaz)
- `905`: "Výroba dílů" (odkaz)
- `906`: "Renovace a patina" (odkaz)
- `907`: "Kontakt" (odkaz)
- `911`: "jawaperak.cz — není spojeno se značkou Jawa Moto ani Classic Legends" (patička, copyright řádek)

Pozn.: `og:site_name` a značka "Jawa Pérák"/"Jawapérák" (řádky 60, 144,
854, 886...) beru jako vlastní název dle glosáře (nepřekládat), proto
nejsou samostatně vypsané jako text k překladu.

---

## src/components/LanguageSwitcher.astro

Vykresluje se v `Layout.astro` (2× v hlavičce, 1× v patičce), tedy i na
obou cílových routách.

- `21`: "Česky" (text odkazu, zobrazí se jen quando `currentLocale === 'en'`, tj. na `/en/registr/` a `/en/registr/pridat-stroj/` — přepíná zpět na češtinu)

Pozn.: text "English" (stejný řádek, zobrazí se na CS routách) už je
anglicky, není co překládat.

---

## src/components/CookieConsent.astro

Vykresluje se v `Layout.astro` (patička), tedy i na obou cílových
routách.

- `4`: "Používáme jednu cookie, která si pamatuje zvolený jazyk stránky." (text cookie lišty)
- `5`: "Souhlasím" (tlačítko)
- `6`: "Odmítnout" (tlačítko)
