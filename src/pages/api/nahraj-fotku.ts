export const prerender = false;

import type { APIRoute } from 'astro';
import { sanitizeUploadedImage } from '../../utils/imageSanitizer';
import { validateUploadedBuffer } from '../../utils/uploadValidator';

// CS-PRIV-001: fotky strojů se nahrávají SEM (server), ne přímo z prohlížeče
// do Supabase Storage — jedině tak jde před uložením spolehlivě odstranit
// EXIF/GPS metadata (sharp běží jen v Node, ne v prohlížeči). Endpoint navíc
// službu-klíčem ověří, že cílový stroj skutečně čeká na schválení (stejné
// pravidlo, jaké by jinak vynucovalo RLS pro anon roli), aby nešlo nahrávat
// fotky k cizímu/neexistujícímu/už schválenému záznamu. Výjimka: přihlášený
// správce (Authorization: Bearer <access_token> z jeho Supabase Auth session,
// ověřený proti /auth/v1/user) smí nahrávat fotky k libovolnému existujícímu
// stroji bez ohledu na stav_moderace — používá to editace v /admin/stroje.
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_ROLE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

const MAX_VELIKOST = 8 * 1024 * 1024; // 8 MB, musí odpovídat limitu ve formuláři/bucketu
const POVOLENE_TYPY = new Set(['image/jpeg', 'image/png', 'image/webp']);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function strojCekaNaSchvaleni(strojId: string): Promise<boolean> {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/stroje?id=eq.${strojId}&stav_moderace=eq.ceka&select=id`,
    {
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
    }
  );
  if (!r.ok) return false;
  const radky = await r.json();
  return Array.isArray(radky) && radky.length === 1;
}

async function strojExistuje(strojId: string): Promise<boolean> {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/stroje?id=eq.${strojId}&select=id`, {
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
  });
  if (!r.ok) return false;
  const radky = await r.json();
  return Array.isArray(radky) && radky.length === 1;
}

async function overSpravce(authHlavicka: string | null): Promise<boolean> {
  if (!authHlavicka?.startsWith('Bearer ')) return false;
  const token = authHlavicka.slice('Bearer '.length);
  if (!token) return false;
  const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  return r.ok;
}

const MAX_FOTEK = 6;

async function overLimitFotek(
  strojId: string,
  poradi: number
): Promise<{ ok: true } | { ok: false; chyba: string }> {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/stroje_fotky?stroj_id=eq.${strojId}&select=poradi`,
    {
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
    }
  );
  if (!r.ok) {
    return { ok: false, chyba: 'Nepodařilo se ověřit existující fotky.' };
  }
  const existujici: Array<{ poradi: number }> = await r.json();

  if (existujici.length >= MAX_FOTEK) {
    return {
      ok: false,
      chyba: `K tomuto stroji již byl nahrán maximální počet fotografií (${MAX_FOTEK}).`,
    };
  }
  if (existujici.some((f) => f.poradi === poradi)) {
    return { ok: false, chyba: `Fotografie s pořadím ${poradi} již byla nahrána.` };
  }
  return { ok: true };
}

export const POST: APIRoute = async ({ request }) => {
  if (!SERVICE_ROLE_KEY) {
    return json({ chyba: 'Server není nakonfigurovaný pro nahrávání fotek.' }, 500);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ chyba: 'Neplatný požadavek.' }, 400);
  }

  const strojId = String(formData.get('strojId') || '');
  const poradiRaw = formData.get('poradi');
  const soubor = formData.get('soubor');

  if (!UUID_RE.test(strojId)) {
    return json({ chyba: 'Neplatné ID stroje.' }, 400);
  }
  const poradi = Number(poradiRaw);
  if (!Number.isInteger(poradi) || poradi < 0 || poradi > 5) {
    return json({ chyba: 'Neplatné pořadí fotky.' }, 400);
  }
  if (!(soubor instanceof Blob) || soubor.size === 0) {
    return json({ chyba: 'Chybí soubor.' }, 400);
  }
  if (soubor.size > MAX_VELIKOST) {
    return json({ chyba: 'Fotka je příliš velká.' }, 400);
  }
  if (!POVOLENE_TYPY.has(soubor.type)) {
    return json({ chyba: 'Nepovolený typ souboru.' }, 400);
  }

  const jeSpravce = await overSpravce(request.headers.get('authorization'));
  const povoleno = jeSpravce
    ? await strojExistuje(strojId)
    : await strojCekaNaSchvaleni(strojId);
  if (!povoleno) {
    return json({ chyba: 'Stroj nebyl nalezen, nebo už neceká na schválení.' }, 403);
  }

  const limit = await overLimitFotek(strojId, poradi);
  if (!limit.ok) {
    return json({ chyba: limit.chyba }, 400);
  }

  const vstup = Buffer.from(await soubor.arrayBuffer());

  // CS-UPL-003: Content-Type z formuláře je jen tvrzení prohlížeče — ověříme
  // podle skutečného obsahu souboru (magic bytes) a výslovně odmítneme SVG/
  // HTML/skripty přejmenované na .jpg, než cokoliv dalšího (včetně sharp)
  // soubor vůbec uvidí.
  const validace = validateUploadedBuffer(vstup);
  if (!validace.valid) {
    return json({ chyba: validace.error ?? 'Nepodporovaný formát souboru.' }, 415);
  }

  let sanitizovano: Buffer;
  try {
    sanitizovano = await sanitizeUploadedImage(vstup);
  } catch {
    return json({ chyba: 'Fotku se nepodařilo zpracovat.' }, 400);
  }

  const cesta = `${strojId}/${crypto.randomUUID()}.webp`;

  const rUpload = await fetch(`${SUPABASE_URL}/storage/v1/object/stroje-fotky/${cesta}`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'image/webp',
    },
    body: sanitizovano,
  });
  if (!rUpload.ok) {
    return json({ chyba: 'Nahrání fotky selhalo.' }, 502);
  }

  const rZaznam = await fetch(`${SUPABASE_URL}/rest/v1/stroje_fotky`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ stroj_id: strojId, url: cesta, poradi }),
  });
  if (!rZaznam.ok) {
    return json({ chyba: 'Uložení záznamu o fotce selhalo.' }, 502);
  }

  return json({ ok: true });
};
