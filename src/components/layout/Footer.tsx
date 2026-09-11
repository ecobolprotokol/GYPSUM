import Link from 'next/link';
import Image from 'next/image';
import { getBusinessSettings } from '@/lib/metadata';

export default async function Footer() {
  const settings = await getBusinessSettings();
  const businessName = settings?.business_name ?? 'Gypsum Katalog Pro';
  const whatsappNumber = settings?.whatsapp_number ?? '6281234567890';
  const address = settings?.address ?? 'Jl. Contoh No. 123, Jakarta';
  const operatingHours = settings?.operating_hours ?? 'Senin–Sabtu, 08.00–17.00';
  const logoUrl = settings?.logo_url ?? null;
  const email = settings?.email ?? null;
  const instagramUrl = settings?.instagram_url ?? null;
  const facebookUrl = settings?.facebook_url ?? null;
  const tiktokUrl = settings?.tiktok_url ?? null;

  const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Produk', href: '/produk' },
    { label: 'Borningan', href: '/borringan' },
    { label: 'Galeri', href: '/galeri' },
    { label: 'Tentang', href: '/tentang' },
    { label: 'Kontak', href: '/kontak' },
  ];

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={businessName}
                width={150}
                height={50}
                className="h-12 w-auto object-contain"
              />
            ) : (
              <span className="text-xl font-bold text-primary">{businessName}</span>
            )}
            {settings?.tagline && (
              <p className="mt-3 text-sm text-muted-foreground">
                {settings.tagline}
              </p>
            )}
            {email && (
              <p className="mt-3 text-sm text-muted-foreground">{email}</p>
            )}
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Navigasi
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Kontak
            </h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground">{address}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {operatingHours}
              </p>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm text-accent hover:underline"
              >
                {whatsappNumber}
              </a>
            </address>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Sosial Media
            </h3>
            <div className="flex space-x-4">
              {instagramUrl && (
                <Link
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent"
                  aria-label="Instagram"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.2c3.2 0 4.4.01 5.9.07 1.4.05 2.2.24 2.7.41.6.2 1.1.47 1.6.97.5.4.76.9 1 1.5.17.5.36 1.3.41 2.7.06 1.5.07 2.7.07 5.9s-.01 4.4-.07 5.9c-.05 1.4-.24 2.2-.41 2.7-.2.6-.47 1.1-.97 1.6-.4.5-.9.76-1.5.9-.5.17-1.3.36-2.7.41-1.5.06-2.7.07-5.9.07s-4.4-.01-5.9-.07c-1.4-.05-2.2-.24-2.7-.41-.6-.2-1.1-.47-1.6-.97-.5-.4-.76-.9-1-1.5-.17-.5-.36-1.3-.41-2.7-.06-1.5-.07-2.7-.07-5.9s.01-4.4.07-5.9c.05-1.4.24-2.2.41-2.7.2-.6.47-1.1.97-1.6.4-.5.9-.76 1.5-.9.5-.17 1.3-.36 2.7-.41 1.5-.06 2.7-.07 5.9-.07zm0-1.2C8.7 1 7.5 1.01 6.1 1.07c-1.3.06-2.2.26-3 .53-.8.27-1.5.63-2.2 1.3C.2 3.6.2 4.3.2 5.2c-.28.8-.48 1.7-.53 3C-1 9.9-1 11-1 12s.01 2.1.07 3.5c.05 1.3.26 2.2.53 3 .27.8.63 1.5 1.3 2.2.7.7 1.4 1.07 2.2 1.3.8.27 1.7.47 3 .53 1.4.06 2.6.07 3.5.07h2s1.1-.01 3.5-.07c1.3-.06 2.2-.26 3-.53.8-.27 1.5-.63 2.2-1.3.7-.7 1.07-1.4 1.3-2.2.27-.8.47-1.7.5-3 .07-1.4.07-2.6.07-3.5s0-2.1-.07-3.5c-.03-1.3-.23-2.2-.5-3-.27-.8-.63-1.5-1.3-2.2-.7-.7-1.4-1.1-2.2-1.3-.8-.27-1.7-.47-3-.53-1.4-.06-2.6-.07-3.5-.07h-2z" />
                    <path d="M12 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                    <circle cx="18.4" cy="5.6" r="1.2" />
                  </svg>
                </Link>
              )}
              {facebookUrl && (
                <Link
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.68 0H1.32C.63 0 0 .63 0 1.32v21.36C0 23.37.63 24 1.32 24h11.66v-9.29H9.65V11.41h3.33V8.66c0-3.3 2-5.96 5.68-5.96 1.64 0 2.84.12 3.22.18.56.08.68.17.68.33v3.2h-4.7c-2.03 0-2.42.78-2.42 2.37v2.9h4.84l-.53 3.21h-4.29V24H22.68c.69 0 1.32-.63 1.32-1.32V1.32C24 .63 23.37 0 22.68 0z" />
                  </svg>
                </Link>
              )}
              {tiktokUrl && (
                <Link
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent"
                  aria-label="TikTok"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 10.51c-.17-.07-.34-.14-.51-.21.68-.49 1.17-1.22 1.37-2.17.69-3.57-.35-6.35-3.26-7.78-.77-.37-1.6-.66-2.46-.86v3.46c0 .25-.2.45-.45.45a.45.45 0 0 1-.45-.45V4.32c-4.12.77-7.08 4.62-7.08 9 0 5.13 4.08 9.31 9.28 9.31 4.23 0 7.74-2.68 8.73-6.33 2.07-1.88 3.25-4.47 3.25-7.38-.01-2.13-.69-4.09-1.85-5.62-1.3-.69-2.7-1.23-4.15-1.47v3.24c0 .57-.46 1.03-1.03 1.03-.57 0-1.03-.46-1.03-1.03V3.22c.02 0 .04 0 .06 0 .19 0 .38.01.56.03-.03.05-.06.09-.08.14-.33.62-.49 1.3-.49 2C0 11.14 5.86 17 13.5 17c4.14 0 7.74-3.28 7.98-7.45.05-.99.09-1.99.09-3 0 .16 0 .31-.01.46z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
