import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// output: 'hybrid' — vše zůstává staticky předgenerované (encyklopedie,
// návody, historie), kromě stránek, které si samy řeknou
// `export const prerender = false` (detail stroje v registru, moderace
// nepotřebuje SSR, jede čistě klientsky).
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
  }
});
