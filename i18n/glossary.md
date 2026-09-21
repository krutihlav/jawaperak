# jawaperak.cz — CS→EN glosář a stylistický průvodce

> **Účel:** Tenhle soubor je jediný zdroj pravdy pro terminologii při překladu
> obsahu webu z CS do EN. Před každým překladem se pošle jako kontext.
> Když se objeví nekonzistence nebo Adam opraví návrh, **zapisuje se sem
> hned** — je to živý dokument, ne jednorázový seznam.
>
> Umístění v repu: `i18n/glossary.md` (návrh — uprav podle skutečné
> struktury projektu).

## Obecná pravidla stylu

- **Rejstřík:** věcný, encyklopedický tón, ne marketingový/hovorový.
  Odpovídá stylu knihy Procházka, ne blogovému psaní.
- **Oslovení uživatele:** ve formulářích/UI text neutrální, bez
  přímého oslovování ("you" jen tam, kde je to nutné pro srozumitelnost
  UI textu — např. "Add your machine" je OK, ale vyhýbat se
  přehnaně neformálnímu tónu).
- **Jednotky:** zachovat metrické jednotky (ccm, kg, km/h) — nepřevádět
  na imperiální. Psát `cm³` nebo `ccm` konzistentně s tím, jak je to
  v CS verzi (zkontrolovat úzus webu).
- **Datace a nejistota:** reliability tagy (OVĚŘENO / ODHAD / SPORNÉ /
  ODVOZENO / KNIHA + strana) se v EN verzi překládají jako
  VERIFIED / ESTIMATED / DISPUTED / DERIVED / BOOK + page — **potvrdit
  s Adamem, než se použije napříč webem**, zatím jen návrh.
- **Název motocyklu "Pérák":** ponechat nepřeloženo jako vlastní název
  (podobně jako "Vespa" nebo "Beetle"), v EN textu psát kurzívou nebo
  s vysvětlivkou při prvním výskytu na stránce, např.
  *"Pérák" (Czech for "the springer," a nickname referring to its
  distinctive front suspension)* — **potvrdit preferovaný způsob s Adamem**.

## Termíny — motocykl a technika

| CS | EN | Poznámka |
|---|---|---|
| Jawa 250/350 Pérák | Jawa 250/350 Pérák | vlastní název, nepřekládat |
| typ 10 / typ 11 / typ 18 | Type 10 / Type 11 / Type 18 | "Typ" s velkým T jako součást označení modelu |
| motor | engine | |
| podvozek | chassis / frame | podle kontextu — u stránky `/perak/podvozek/` použít "chassis" jako název sekce |
| elektro / elektrická výbava | electrics / electrical system | |
| kompresní poměr | compression ratio | |
| výkon (motoru) | power (output) | |
| zdvihový objem | displacement | |
| vrtání a zdvih | bore and stroke | |
| rám | frame | pozor na odlišení od "podvozek" (chassis) — ujasnit rozdíl v úzu webu |
| výrobní číslo | serial number | používáno i v `vyrobni_cisla` tabulce |
| rodný list (motocyklu) | machine passport / heritage certificate | **potvrdit s Adamem** — "birth certificate" zní v AJ kontextu motocyklů neobvykle |
| barvy a provedení | colors and finishes | |
| patina | patina | mezinárodní termín, nepřekládat |
| dobová (výbava/podoba) | period-correct / period | |

## Termíny — struktura webu / UI

| CS | EN | Poznámka |
|---|---|---|
| registr | registry | |
| přidat stroj | add a machine | |
| stroj (jako záznam v registru) | machine | ne "vehicle" — konzistentně "machine" napříč UI |
| moderace | moderation | |
| ke schválení / čeká na schválení | pending approval | odpovídá `stav_moderace = 'ceka'` |
| schváleno | approved | |
| zamítnuto | rejected | |
| dílna | workshop | |
| návody | guides | |
| histoire / historie | history | pozor — pokud se ve zdrojácích používá francouzské "histoire" jako název souboru, v EN UI textu je to prostě "History" |
| encyklopedie | encyclopedia | |
| katalog dílů | parts catalog | |
| prohlídka před koupí | pre-purchase inspection | |
| služby | services | |
| poptávka / poptat | inquiry / request a quote | podle kontextu formuláře |

## Chybové hlášky a systémové texty (registr / pridat-stroj)

*(doplní se při zpracování kroku 7.1)*

## Rozhodnutá terminologie z konverzací (potvrzeno Adamem)

*(zatím prázdné — sem se zapisují opravy z review)*
