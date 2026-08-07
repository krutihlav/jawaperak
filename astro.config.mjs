import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// output: 'hybrid' — vše zůstává staticky předgenerované (encyklopedie,
// návody, historie), kromě stránek, které si samy řeknou
// `export const prerender = false` (detail stroje v registru, moderace
// nepotřebuje SSR, jede čistě klientsky).
export default defineConfig({
  site: 'https://jawaperak.cz',
  output: 'hybrid',
  adapter: vercel(),
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: { prefixDefaultLocale: false }
  }
});
