import { NextRequest, NextResponse } from 'next/server';
import {
  buildProductMessage,
  buildBorringanMessage,
  buildContactMessage,
  buildGalleryMessage,
} from '@/lib/whatsapp';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'contact';
  const number = url.searchParams.get('number') || '';

  let message = '';

  switch (type) {
    case 'product':
      message = buildProductMessage({
        productName: url.searchParams.get('name') || '',
        price: url.searchParams.get('price') || '',
        unit: url.searchParams.get('unit') || '',
      });
      break;
    case 'borringan':
      message = buildBorringanMessage({
        serviceName: url.searchParams.get('service') || '',
        presetLabel: url.searchParams.get('preset') || '',
        area: Number(url.searchParams.get('area') || '0'),
        estimateMin: url.searchParams.get('min') || '',
        estimateMax: url.searchParams.get('max') || '',
      });
      break;
    case 'gallery':
      message = buildGalleryMessage(url.searchParams.get('title') || '');
      break;
    default:
      message = buildContactMessage();
  }

  const encoded = encodeURIComponent(message);
  return NextResponse.json({
    url: `https://wa.me/${number}?text=${encoded}`,
    message,
  });
}
