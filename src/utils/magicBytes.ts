// CS-UPL-003: prohlížeč posílá Content-Type podle přípony souboru, ne podle
// jeho obsahu — útočník tak může nahrát cokoliv (např. spustitelný soubor,
// HTML/SVG s vloženým skriptem) pod hlavičkou "image/jpeg". Tahle kontrola
// čte první bajty souboru (magic bytes / file signature) a ověří, že jde
// skutečně o JPEG, PNG nebo WebP bez ohledu na to, co tvrdí Content-Type
// nebo přípona.

export type PovolenyObrazovyTyp = 'image/jpeg' | 'image/png' | 'image/webp';

function zacinaNa(buffer: Buffer, offset: number, bajty: number[]): boolean {
  if (buffer.length < offset + bajty.length) return false;
  return bajty.every((b, i) => buffer[offset + i] === b);
}

/**
 * Rozpozná skutečný typ obrázku podle jeho binárního obsahu (magic bytes).
 * Vrací null, pokud obsah neodpovídá žádnému z podporovaných formátů.
 */
export function detekujObrazovyTyp(buffer: Buffer): PovolenyObrazovyTyp | null {
  // JPEG: FF D8 FF
  if (zacinaNa(buffer, 0, [0xff, 0xd8, 0xff])) return 'image/jpeg';

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (zacinaNa(buffer, 0, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'image/png';

  // WebP: "RIFF" + 4 bajty velikosti + "WEBP"
  if (zacinaNa(buffer, 0, [0x52, 0x49, 0x46, 0x46]) && zacinaNa(buffer, 8, [0x57, 0x45, 0x42, 0x50])) {
    return 'image/webp';
  }

  return null;
}

/**
 * True, pokud binární obsah souboru skutečně odpovídá deklarovanému
 * obrázkovému MIME typu. Použít VŽDY před jakýmkoliv dalším zpracováním
 * nahraného souboru (nikdy nespoléhat jen na Content-Type/příponu).
 */
export function jeSkutecneObrazek(buffer: Buffer, deklarovanyTyp: string): boolean {
  const skutecnyTyp = detekujObrazovyTyp(buffer);
  return skutecnyTyp !== null && skutecnyTyp === deklarovanyTyp;
}
