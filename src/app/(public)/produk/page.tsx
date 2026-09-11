import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { createMetadata, getBusinessSettings } from '@/lib/metadata';
import { createClient } from '@/lib/supabase/server';
import { ProductCard } from '@/components/shared/ProductCard';
import { EmptyState } from '@/components/shared/EmptyState';
import type { Product, Category } from '@/types';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBusinessSettings();
  const businessName = settings?.business_name ?? 'Gypsum Katalog Pro';
  return createMetadata({
    title: `Produk | ${businessName}`,
    description:
      'Katalog produk gypsum berkualitas tinggi untuk kebutuhan rumahan dan komersial.',
    path: '/produk',
  });
}

export const revalidate = 3600;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; sort?: string }>;
}) {
  const { kategori, sort } = await searchParams;
  const supabase = createClient();

  let query = supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_active', true);

  if (kategori) {
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', kategori)
      .single();
    if (cat) {
      query = query.eq('category_id', cat.id);
    }
  }

  switch (sort) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    default:
      query = query.order('sort_order', { ascending: true });
  }

  const { data: products } = await query;

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  return (
    <div className="py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-8">
        <div className="mb-12">
          <h1 className="display-text text-4xl font-bold text-primary">
            Katalog Produk
          </h1>
          <p className="mt-4 text-muted-foreground">
            Pilihan produk gypsum terbaik untuk kebutuhan Anda.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:w-64">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">
                  Kategori
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/produk"
                      className={`text-sm transition-colors hover:text-accent ${
                        !kategori
                          ? 'text-accent'
                          : 'text-muted-foreground'
                      }`}
                    >
                      Semua
                    </a>
                  </li>
                  {categories?.map((cat) => (
                    <li key={cat.id}>
                      <a
                        href={`/produk?kategori=${cat.slug}`}
                        className={`text-sm transition-colors hover:text-accent ${
                          kategori === cat.slug
                            ? 'text-accent'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {cat.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {products?.length ?? 0} produk
              </p>
              <select
                value={sort ?? ''}
                onChange={(e) => {
                  const url = new URL(window.location.href);
                  if (e.target.value) {
                    url.searchParams.set('sort', e.target.value);
                  } else {
                    url.searchParams.delete('sort');
                  }
                  window.location.href = url.toString();
                }}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <option value="">Urutan default</option>
                <option value="price-asc">Harga terendah</option>
                <option value="price-desc">Harga tertinggi</option>
                <option value="newest">Terbaru</option>
              </select>
            </div>

            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="Belum ada produk"
                description={
                  kategori
                    ? 'Belum ada produk di kategori ini.'
                    : 'Belum ada produk yang tersedia.'
                }
                action={{
                  label: 'Kembali ke semua produk',
                  href: '/produk',
                }}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}