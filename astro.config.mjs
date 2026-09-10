import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import decapCmsOauth from 'astro-decap-cms-oauth';

// Sveltia CMS engine (lepší i18n cs/en) místo výchozího Decap UI.
const SVELTIA_CMS_SRC_URL = 'https://unpkg.com/@sveltia/cms/dist/sveltia-cms.js';

// output: 'hybrid' — vše zůstává staticky předgenerované (encyklopedie,
// návody, historie), kromě stránek, které si samy řeknou
// `export const prerender = false` (detail stroje v registru, moderace
// nepotřebuje SSR, jede čistě klientsky; totéž platí pro /admin a /oauth
// routy, které mountuje astro-decap-cms-oauth).
export default defineConfig({
  site: 'https://jawaperak.cz',
  output: 'hybrid',
  redirects: {
  '/perak/typ-10-a-typ-11': '/perak/250/',
  '/perak/motor-12-vs-18': '/perak/350/',
},
  adapter: vercel(),
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: { prefixDefaultLocale: false }
  },
  // adminDisabled: true — vlastní /admin stránku máme v src/pages/admin/,
  // protože potřebuje navíc polyfill pro Uint8Array.prototype.toBase64()
  // (viz komentář tam), který balíčkem dodaná admin.astro nemá jak vložit.
  integrations: [decapCmsOauth({ decapCMSSrcUrl: SVELTIA_CMS_SRC_URL, adminDisabled: true })],
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
