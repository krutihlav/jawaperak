import { defineMiddleware } from 'astro:middleware';
import { hasLocaleVersion } from './i18n/utils';

// Trvalá jazyková preference: cookie `locale` se zapisuje jen kliknutím na
// language switcher (viz LanguageSwitcher.astro), middleware ji jen čte a
// podle ní přesměruje CS stránky s EN ekvivalentem na jejich /en/ protějšek.
export const onRequest = defineMiddleware(async (context, next) => {
  const { request, cookies, url } = context;

  if (request.method !== 'GET') return next();

  const accept = request.headers.get('accept') ?? '';
  if (!accept.includes('text/html')) return next(); // vynechat assety, API, obrázky

  if (url.pathname.startsWith('/admin')) return next(); // Sveltia CMS beze změny

  const isEnPath = url.pathname === '/en' || url.pathname.startsWith('/en/');
  const cookieLocale = cookies.get('locale')?.value;

  if (!isEnPath && cookieLocale === 'en' && hasLocaleVersion(url.pathname, 'en')) {
    const target = `/en${url.pathname === '/' ? '' : url.pathname}${url.search}`;
    return context.redirect(target, 302);
  }

  return next();
});
