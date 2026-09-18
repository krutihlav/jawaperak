import sharp from 'sharp';

// CS-PRIV-001: fotky z telefonů nesou v EXIF přesné GPS souřadnice garáže/dílny
// majitele. `sharp` bez explicitního `withMetadata()` metadata (EXIF včetně
// GPSInfo, ICC, XMP, IPTC) do výstupu vůbec nepřenáší — je to bezpečnější než
// `withMetadata({ exif: {} })`, které naopak PŮVODNÍ EXIF blok (GPS nevyjímaje)
// ve výstupu zachová beze změny, protože `exif` v `withMetadata()` jen
// přimíchává vlastní klíče navrch, nenahrazuje ani nemaže nic existujícího.
export async function sanitizeUploadedImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .rotate() // fyzicky otočí podle EXIF Orientation, než metadata zmizí
    .webp({ quality: 84, effort: 4 })
    .toBuffer();
}
