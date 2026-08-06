import { defineConfig } from 'astro/config';

// Zatím čistě statický výstup — encyklopedie, návody, historie.
// Než se nasadí registr (fáze 2), je potřeba doplnit @astrojs/vercel
// adaptér a output: 'hybrid', aby stránky /registr/* mohly číst
// ze Supabase za běhu (viz poznámka v src/pages/registr/index.astro).
export default defineConfig({
  site: 'https://jawaperak.cz',
  output: 'static',
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: { prefixDefaultLocale: false }
  }
});
