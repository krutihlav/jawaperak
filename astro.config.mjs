import { defineConfig, envField, passthroughImageService } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import decapCmsOauth from 'astro-decap-cms-oauth';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Sveltia CMS engine (lepší i18n cs/en) místo výchozího Decap UI.
const SVELTIA_CMS_SRC_URL = 'https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js';

// output: 'hybrid' — vše zůstává staticky předgenerované (encyklopedie,
// návody, historie), kromě stránek, které si samy řeknou
// `export const prerender = false` (detail stroje v registru, moderace
// nepotřebuje SSR, jede čistě klientsky; totéž platí pro /admin a /oauth
// routy, které mountuje astro-decap-cms-oauth).
export default defineConfig({
  // www.jawaperak.cz je skutečná produkční doména na Vercelu — apex
  // jawaperak.cz na ni jen 308 redirectuje (ověřeno přes Vercel domény
  // projektu), takže sitemapa a canonical URL musí ukazovat na www.
  site: 'https://www.jawaperak.cz',
  output: 'hybrid',
  redirects: {
  '/perak/typ-10-a-typ-11': '/perak/250/',
  '/perak/motor-12-vs-18': '/perak/350/',
  '/moderace': {
    status: 301,
    destination: '/admin',
  },
  '/moderace/': {
    status: 301,
    destination: '/admin',
  },
},
  // edgeMiddleware: true — bez toho by src/middleware.ts běžel jen pro
  // on-demand (SSR) routy, ne pro staticky předgenerované stránky, které
  // tvoří většinu webu; cookie redirect na EN verzi je ale potřeba
  // vyhodnocovat na každém requestu, statické stránky nevyjímaje.
  adapter: vercel({ webAnalytics: { enabled: true }, edgeMiddleware: true }),
  // Web nikde nepoužívá <Image>/astro:assets (jen syrové <img> na
  // veřejné/nahrané soubory) — výchozí sharp image service by se ale i tak
  // natáhla do bundlu pro edge middleware výše a esbuild na ní pro edge
  // runtime spadne (sharp importuje node: moduly, které edge nemá).
  // passthroughImageService se tomu vyhne.
  image: { service: passthroughImageService() },
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: { prefixDefaultLocale: false }
  },
  // adminDisabled: true — vlastní CMS stránku máme v
  // src/pages/admin/obsah.astro (dashboard moderace registru je na
  // src/pages/admin/index.astro), protože potřebuje navíc polyfill pro
  // Uint8Array.prototype.toBase64() (viz komentář tam), který balíčkem
  // dodaná admin.astro nemá jak vložit.
  integrations: [
    tailwind(),
    decapCmsOauth({ decapCMSSrcUrl: SVELTIA_CMS_SRC_URL, adminDisabled: true }),
    // Vyloučit /admin/* ze sitemapy — jsou noindex a zakázané v robots.txt,
    // nemá smysl je nabízet vyhledávačům k procházení.
    // i18n mapování (cs i en musí být v `locales`, i když cs nemá URL
    // prefix — @astrojs/sitemap ho páruje přes `defaultLocale`) zajistí, že
    // sitemapa u stránek s EN ekvivalentem obsahuje xhtml:link alternates;
    // DB-řízené cs-only stránky bez EN protějšku zůstanou bez alternates.
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith('/admin/'),
      i18n: {
        defaultLocale: 'cs',
        locales: {
          cs: 'cs',
          en: 'en',
        },
      },
    }),
  ],
  // astro-decap-cms-oauth@0.4.x (poslední verze pro Astro 4.x) registruje
  // svoje astro:env schéma přes updateConfig({ env }) na top-level klíči,
  // ale Astro 4.15 čte schéma jen z `experimental.env.schema` — top-level
  // `env` se při validaci configu zahodí. Schéma proto deklarujeme tady
  // sami (stejné proměnné, které by jinak registrovala integrace), aby
  // `astro:env/client` a `astro:env/server` skutečně obsahovaly
  // PUBLIC_DECAP_CMS_SRC_URL a OAUTH_GITHUB_* proměnné.
  //
  // OAUTH_GITHUB_CLIENT_ID/SECRET jsou schválně `optional` s prázdným
  // defaultem (a validateSecrets: false) — jsou to proměnné jen pro
  // /admin přihlášení, ne pro zbytek webu. Kdyby byly povinné, chybějící
  // proměnná (např. na Preview deployi, kde ještě nejsou nastavené) by
  // shodila build CELÉHO webu místo toho, aby jen nefungovalo přihlášení
  // do CMS. Přesně tohle se stalo při prvním nasazení.
  experimental: {
    env: {
      validateSecrets: false,
      schema: {
        PUBLIC_DECAP_CMS_SRC_URL: envField.string({
          context: 'client',
          access: 'public',
          optional: true,
          default: SVELTIA_CMS_SRC_URL,
        }),
        PUBLIC_DECAP_CMS_VERSION: envField.string({
          context: 'client',
          access: 'public',
          optional: true,
          default: '3.3.3',
        }),
        OAUTH_GITHUB_CLIENT_ID: envField.string({
          context: 'server',
          access: 'secret',
          optional: true,
          default: '',
        }),
        OAUTH_GITHUB_CLIENT_SECRET: envField.string({
          context: 'server',
          access: 'secret',
          optional: true,
          default: '',
        }),
        OAUTH_GITHUB_REPO_ID: envField.string({
          context: 'server',
          access: 'secret',
          optional: true,
          default: '',
        }),
      },
    },
  },
});
