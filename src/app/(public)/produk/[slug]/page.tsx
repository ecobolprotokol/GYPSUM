import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createMetadata, getBusinessSettings } from '@/lib/metadata';
import { createClient } from '@/lib/supabase/server';
import { WhatsAppCTA } from '@/components/shared/WhatsAppCTA';
import { PriceTag } from '@/components/shared/PriceTag';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/lib/currency';
import { buildProductMessage } from '@/lib/whatsapp';
import sanitizeHtml from 'dompurify';
import type { Product, Category } from '@/types';

type ProductWithCategory = Product & {
  category: Pick<Category, 'name' | 'slug'> | null;
};

async function getProduct(slug: string): Promise<ProductWithCategory | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    return null;
  }
  return data as ProductWithCategory;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan',
    };
  }
  const settings = await getBusinessSettings();
  const businessName = settings?.business_name ?? 'Gypsum Katalog Pro';
  return createMetadata({
    title: `${product.name} | ${businessName}`,
    description:
      product.short_description ??
      `Produk ${product.name} dengan kualitas terjamin.`,
    image: product.cover_url,
    path: `/produk/${slug}`,
  });
}

export const revalidate = 3600;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) {
    notFound();
  }

  const settings = await getBusinessSettings();
  const whatsappNumber = settings?.whatsapp_number ?? '6281234567890';

  const price =
    product.price_mode === 'exact'
      ? (product.price ?? 0)
      : (product.price_start ?? 0);
  const priceStr = formatRupiah(price);

  const specs = Array.isArray(product.specification_json)
    ? (product.specification_json as { label: string; value: string }[])
    : [];

  const gallery = product.cover_url
    ? [product.cover_url, ...(product.gallery_urls ?? [])]
    : (product.gallery_urls ?? []);

  const waMessage = buildProductMessage({
    productName: product.name,
    price: priceStr,
    unit: product.unit,
  });

  return (
    <div className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-8">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/">Beranda</Link>
          <span className="mx-2">/</span>
          <Link href="/produk">Produk</Link>
          {product.category && (
            <>
              <span className="mx-2">/</span>
              <Link href={`/produk?kategori=${product.category.slug}`}>
                {product.category.name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
              <Image
                src={product.cover_url}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {gallery.slice(1).map((url, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square overflow-hidden rounded-lg bg-muted"
                  >
                    <Image
                      src={url}
                      alt={`${product.name} - gambar ${idx + 2}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 120px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            {product.category && (
              <Badge variant="secondary">{product.category.name}</Badge>
            )}
            <h1 className="display-text text-4xl font-bold text-primary">
              {product.name}
            </h1>

            <PriceTag
              amount={price}
              unit={product.unit}
              priceMode={product.price_mode}
              className="text-2xl"
            />

            <div className="flex flex-wrap gap-2">
              {product.is_pickup_only && (
                <Badge variant="outline">Ambil di toko</Badge>
              )}
              {product.delivery_available && (
                <Badge variant="outline">Bisa diantar</Badge>
              )}
              {product.min_order && (
                <Badge variant="outline">
                  Min. {product.min_order} {product.unit}
                </Badge>
              )}
            </div>

            {product.short_description && (
              <p className="text-muted-foreground">
                {product.short_description}
              </p>
            )}

            {specs.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold text-primary">
                  Spesifikasi
                </h3>
                <div className="overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      {specs.map((spec, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? 'bg-muted/30' : ''}
                        >
                          <td className="border-b border-border px-4 py-2.5 font-medium">
                            {spec.label}
                          </td>
                          <td className="border-b border-border px-4 py-2.5 text-muted-foreground">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {product.min_order_note && (
              <p className="text-sm text-muted-foreground">
                {product.min_order_note}
              </p>
            )}

            <div className="sticky bottom-0 flex flex-col gap-3 border-t border-border bg-background pt-6 lg:static lg:border-0 lg:pt-0">
              <WhatsAppCTA
                whatsappNumber={whatsappNumber}
                message={waMessage}
                size="lg"
                className="w-full"
              >
                Pesan via WhatsApp
              </WhatsAppCTA>
            </div>
          </div>
        </div>

        {product.full_description && (
          <div className="mt-12">
            <h2 className="display-text mb-4 text-2xl font-bold text-primary">
              Deskripsi
            </h2>
            <div
              className="prose prose-lg max-w-none text-foreground"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(product.full_description),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}