import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBusinessSettings } from '@/lib/metadata';

export default async function HomePage() {
  const settings = await getBusinessSettings();
  const businessName = settings?.business_name ?? 'Gypsum Katalog Pro';
  const tagline = settings?.tagline ?? 'Solusi gypsum premium untuk ruang Anda';
  const coverImage = settings?.cover_image_url ?? null;
  const whatsappNumber = settings?.whatsapp_number ?? '6281234567890';
  const highlights = settings?.highlights_json ?? [];

  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] min-h-[400px] w-full overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={businessName}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container flex h-full flex-col items-center justify-center px-4 text-center">
          <h1
            className="display-text text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ lineHeight: 1.05 }}
          >
            {tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            {businessName}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/produk"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Lihat Produk
            </Link>
            <Link
              href={`/kontak`}
              className="inline-flex items-center justify-center rounded-lg border border-white/30 bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Konsultasi via WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(highlights) &&
            highlights.length > 0 ? (
              highlights.map((h: { title?: string; description?: string; icon?: string }) => (
                <div
                  key={h.title ?? 'highlight'}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent/20">
                    {h.icon ? (
                      <span className="text-3xl">{h.icon}</span>
                    ) : (
                      <svg
                        className="h-8 w-8 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <circle
                          className="stroke-current"
                          cx="12"
                          cy="12"
                          r="10"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-primary">
                    {h.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {h.description}
                  </p>
                </div>
              ))
            ) : (
              <FallbackHighlights />
            )}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8">
          <h2 className="display-text text-3xl font-bold text-center text-primary sm:text-4xl">
            Kategori Produk
          </h2>
          <p className="mt-4 text-center text-muted-foreground">
            Berbagai macam gypsum untuk kebutuhan Anda
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<div>Loading...</div>}>
              <CategoriesGrid />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="display-text text-3xl font-bold text-primary sm:text-4xl">
              Produk Unggulan
            </h2>
            <Link
              href="/produk"
              className="text-sm font-medium text-accent hover:underline"
            >
              Lihat semua
            </Link>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <FeaturedProducts />
          </Suspense>
        </div>
      </section>

      <section className="bg-muted/30 py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="display-text text-3xl font-bold text-primary sm:text-4xl">
              Portfolio
            </h2>
            <Link
              href="/galeri"
              className="text-sm font-medium text-accent hover:underline"
            >
              Lihat semua
            </Link>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <GalleryPreview />
          </Suspense>
        </div>
      </section>

      <section className="py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="display-text text-3xl font-bold text-primary sm:text-4xl">
              Layanan Borningan
            </h2>
            <p className="mt-4 text-muted-foreground">
              Solusi lengkap untuk kebutuhan gypsum rumahan Anda
            </p>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <BorringanPreview />
          </Suspense>
        </div>
      </section>

      <section className="bg-primary py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-8 text-center">
          <h2 className="display-text text-3xl font-bold text-primary-foreground sm:text-4xl">
            Siap memulai proyek?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Hubungi kami untuk konsultasi gratis dan penawaran terbaik
          </p>
          <div className="mt-8">
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Konsultasi Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FallbackHighlights() {
  return (
    <>
      <FallbackHighlight title="Premium Quality" description="Material gypsum berkualitas tinggi" />
      <FallbackHighlight title="Custom Design" description="Desain disesuaikan dengan kebutuhan" />
      <FallbackHighlight title="Fast Delivery" description="Pengiriman cepat dan tepat waktu" />
    </>
  );
}

function FallbackHighlight({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
        </svg>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-primary">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

async function CategoriesGrid() {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (!categories || categories.length === 0) {
    return <p className="text-center text-muted-foreground col-span-3">Belum ada kategori tersedia.</p>;
  }

  return categories.map((cat) => (
    <Link
      key={cat.id}
      href={`/produk?kategori=${cat.slug}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      {cat.cover_url ? (
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={cat.cover_url}
            alt={cat.name}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-muted flex items-center justify-center">
          <span className="text-muted-foreground">{cat.name}</span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-primary">{cat.name}</h3>
        {cat.description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {cat.description}
          </p>
        )}
      </div>
    </Link>
  ));
}

async function FeaturedProducts() {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name,slug)')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(4);

  if (!products || products.length === 0) {
    return <p className="text-muted-foreground">Belum ada produk unggulan.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <Link key={product.id} href={`/produk/${product.slug}`} className="block">
          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.cover_url}
              alt={product.name}
              width={300}
              height={225}
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-primary">{product.name}</h3>
          {product.price_mode === 'exact' && product.price && (
            <p className="mt-2 text-lg font-bold text-accent">
              Rp{Number(product.price).toLocaleString('id-ID')}
            </p>
          )}
          {product.price_mode === 'start' && product.price_start && (
            <p className="mt-2 text-lg font-bold text-accent">
              Mulai Rp{Number(product.price_start).toLocaleString('id-ID')}
            </p>
          )}
        </Link>
      ))}
    </div>
  );
}

async function GalleryPreview() {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = createClient();
  const { data: gallery } = await supabase
    .from('gallery_projects')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(6);

  if (!gallery || gallery.length === 0) {
    return <p className="text-muted-foreground">Belum ada portfolio tersedia.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {gallery.map((item) => (
        <Link key={item.id} href={`/galeri/${item.slug}`} className="block">
          <div className="overflow-hidden rounded-lg bg-muted">
            <Image
              src={item.cover_url}
              alt={item.title}
              width={300}
              height={225}
              className="aspect-[4/3] h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <h3 className="mt-3 text-lg font-semibold text-primary">{item.title}</h3>
          {item.location && (
            <p className="text-sm text-muted-foreground">{item.location}</p>
          )}
        </Link>
      ))}
    </div>
  );
}

async function BorringanPreview() {
  const { createClient } = await import('@/lib/supabase/server');
  const supabase = createClient();
  const { data: services } = await supabase
    .from('borringan_services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(3);

  if (!services || services.length === 0) {
    return <p className="text-muted-foreground">Belum ada layanan tersedia.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Link key={service.id} href="/borringan" className="block">
          <div className="overflow-hidden rounded-lg bg-muted aspect-[4/3]">
            {service.cover_url && (
              <Image
                src={service.cover_url}
                alt={service.name}
                width={300}
                height={225}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-primary">{service.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {service.description}
            </p>
            <p className="mt-3 text-lg font-bold text-accent">
              Rp{Number(service.price_min).toLocaleString('id-ID')} – Rp{Number(service.price_max).toLocaleString('id-ID')} / {service.unit}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
