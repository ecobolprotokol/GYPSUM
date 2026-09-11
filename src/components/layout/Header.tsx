import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { getBusinessSettings } from '@/lib/metadata';
import MobileNav from './MobileNav';

export default async function Header() {
  const settings = await getBusinessSettings();
  const businessName = settings?.business_name ?? 'Gypsum Katalog Pro';
  const logoUrl = settings?.logo_url ?? null;

  const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Produk', href: '/produk' },
    { label: 'Borningan', href: '/borringan' },
    { label: 'Galeri', href: '/galeri' },
    { label: 'Tentang', href: '/tentang' },
    { label: 'Kontak', href: '/kontak' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={businessName}
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
          ) : (
            <span className="text-xl font-bold text-primary">{businessName}</span>
          )}
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Menu"
          className="md:hidden"
          onClick={() => {
            const event = new Event('toggleMobileNav');
            window.dispatchEvent(event);
          }}
        >
          <Menu className="h-5 w-5 text-foreground" />
        </button>

        <MobileNav />
      </div>
    </header>
  );
}
