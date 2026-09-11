import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-8 rounded-full bg-muted p-6">
        <Search className="h-16 w-16 text-muted-foreground" />
      </div>
      <h1 className="display-text text-4xl font-bold text-primary sm:text-5xl">
        404 — Halaman Tidak Ditemukan
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          <Home className="mr-2 h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
