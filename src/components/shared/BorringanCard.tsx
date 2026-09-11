import Link from 'next/link';
import Image from 'next/image';
import { formatPriceRange } from '@/lib/currency';
import type { BorringanService } from '@/types';

export function BorringanCard({ service }: { service: BorringanService }) {
  return (
    <Link href="/borringan" className="group block">
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {service.cover_url ? (
            <Image
              src={service.cover_url}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <svg
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M14 10l2-2m0 0l2 2m-2-2l-2 2"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-semibold text-primary">
            {service.name}
          </h3>
          <p className="mt-2 text-lg font-bold text-accent">
            {formatPriceRange(service.price_min, service.price_max, service.unit)}
          </p>
          {service.description && (
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {service.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}