// src/utils/privacy.ts

export interface MaskOptions {
  /** Počet maskovaných číslic na konci (výchozí: 2) */
  maskDigits?: number;
  /** Znak maskování (výchozí: 'X') */
  maskChar?: string;
}

/**
 * Bezpečně maskuje výrobní číslo rámu nebo motoru pro veřejné výpisy.
 * Příklady:
 * - "11-48291" -> "11-482XX" (zachová typ a sérii, skryje koncovku)
 * - "18-0421"  -> "18-04XX"
 * - "48291"    -> "482XX"
 * - "11/48291" -> "11/482XX"
 * - "" / null  -> "—"
 */
export function maskMotorcycleSerial(
  serial: string | number | undefined | null,
  options: MaskOptions = {}
): string {
  if (serial === undefined || serial === null) return '—';
  const clean = String(serial).trim();
  if (!clean || clean === '-' || clean === '—') return '—';

  const { maskDigits = 2, maskChar = 'X' } = options;

  if (clean.length <= 3) {
    return maskChar.repeat(clean.length);
  }

  const delimiterIndex = Math.max(clean.lastIndexOf('-'), clean.lastIndexOf('/'));
  if (delimiterIndex !== -1 && delimiterIndex < clean.length - 1) {
    const prefix = clean.substring(0, delimiterIndex + 1);
    const body = clean.substring(delimiterIndex + 1);

    if (body.length <= maskDigits) {
      return prefix + maskChar.repeat(body.length);
    }
    const visiblePart = body.substring(0, body.length - maskDigits);
    return prefix + visiblePart + maskChar.repeat(maskDigits);
  }

  const visibleLength = Math.max(clean.length - maskDigits, 2);
  const visible = clean.substring(0, visibleLength);
  return visible + maskChar.repeat(clean.length - visibleLength);
}

/**
 * Očistí objekt stroje před serializací nebo klientským renderem
 */
export function sanitizeMachineRecord<T extends Record<string, any>>(machine: T): T {
  const sanitized: Record<string, any> = { ...machine };
  const keysToMask = ['frameNumber', 'engineNumber', 'cislo_ramu', 'cislo_motoru', 'serialNumber'];
  for (const key of keysToMask) {
    if (key in sanitized && sanitized[key]) {
      sanitized[key] = maskMotorcycleSerial(sanitized[key]);
    }
  }
  return sanitized as T;
}
