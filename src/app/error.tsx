import { useEffect } from 'react';
import Link from 'next/link';
import { Home, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <html lang="id">
      <body className="bg-background text-foreground">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <div className="mb-8 rounded-full bg-muted p-6">
            <svg
              className="h-16 w-16 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3m0 3h.01m-6.99 2.52a9 9 0 1118 0v1a2 2 0 01-2 2H7a2 2 0 01-2-2v-1a9 9 0 016.99-3.48z"
              />
            </svg>
          </div>
          <h1 className="display-text text-3xl font-bold text-primary sm:text-4xl">
            Terjadi Kesalahan
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Maaf, terjadi kesalahan tak terduga. Tim kami telah diberitahu.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Coba Lagi
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-sm font-medium text-primary transition-colors hover:bg-muted"
            >
              <Home className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
