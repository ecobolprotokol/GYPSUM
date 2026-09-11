export function buildWhatsAppURL(opts: {
  number: string;
  message: string;
}): string {
  const encoded = encodeURIComponent(opts.message.trim());
  return `https://wa.me/${opts.number}?text=${encoded}`;
}

export function formatWhatsAppMessage(opts: {
  number: string;
  message: string;
}): string {
  return buildWhatsAppURL({
    number: opts.number,
    message: opts.message,
  });
}

export function validateWhatsAppNumber(number: string): boolean {
  return /^62[0-9]{8,13}$/.test(number);
}

export function formatWhatsAppNumber(input: string): string {
  let cleaned = input.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (cleaned.startsWith('62')) {
    // already correct
  } else {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

export function buildProductMessage(opts: {
  productName: string;
  price: string;
  unit: string;
}): string {
  return `Halo, saya tertarik dengan produk:

*${opts.productName}*
Harga: ${opts.price}
Satuan: ${opts.unit}

Mohon informasi lebih lanjut.`;
}

export function buildBoronganMessage(opts: {
  serviceName: string;
  presetLabel: string;
  area: number;
  estimateMin: string;
  estimateMax: string;
}): string {
  return `Halo, saya ingin konsultasi layanan borringan:

Layanan: ${opts.serviceName}
Tipe: ${opts.presetLabel}
Estimasi luas: ${opts.area} m²
Estimasi biaya: Rp ${opts.estimateMin} – Rp ${opts.estimateMax}

Mohon dijadwalkan untuk survey.`;
}

export function buildContactMessage(): string {
  return 'Halo, saya ingin bertanya tentang layanan Anda.';
}

export function buildGalleryMessage(projectTitle: string): string {
  return `Halo, saya melihat portfolio "${projectTitle}" dan tertarik dengan hasil serupa.`;
}
