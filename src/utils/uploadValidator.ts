// src/utils/uploadValidator.ts

export interface ValidationResult {
  valid: boolean;
  mimeType?: 'image/jpeg' | 'image/png' | 'image/webp';
  error?: string;
}

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8 MB

/**
 * Striktně validuje nahraný soubor dle binárních magic bytes.
 * Odmítá SVG, HTML, skripty i poškozené soubory přejmenované na .jpg.
 */
export function validateUploadedBuffer(buffer: Buffer): ValidationResult {
  if (!buffer || buffer.length === 0) {
    return { valid: false, error: 'Soubor je prázdný.' };
  }

  if (buffer.length > MAX_FILE_SIZE) {
    return { valid: false, error: 'Maximální povolená velikost fotografie je 8 MB.' };
  }

  // 1. JPEG: FF D8 FF
  if (buffer.length >= 3 && buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
    return { valid: true, mimeType: 'image/jpeg' };
  }

  // 2. PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4E &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0D &&
    buffer[5] === 0x0A &&
    buffer[6] === 0x1A &&
    buffer[7] === 0x0A
  ) {
    return { valid: true, mimeType: 'image/png' };
  }

  // 3. WebP: RIFF .... WEBP
  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return { valid: true, mimeType: 'image/webp' };
  }

  // Detekce SVG / XML / HTML
  const headerSample = buffer.toString('utf8', 0, Math.min(buffer.length, 512)).toLowerCase();
  if (
    headerSample.includes('<svg') ||
    headerSample.includes('<?xml') ||
    headerSample.includes('<html') ||
    headerSample.includes('<script')
  ) {
    return {
      valid: false,
      error: 'Vektorové formáty (SVG) nejsou povoleny. Nahrajte standardní fotografii (JPG, PNG nebo WebP).'
    };
  }

  return {
    valid: false,
    error: 'Nepodporovaný formát souboru. Povoleny jsou pouze fotografie JPEG, PNG a WebP.'
  };
}
