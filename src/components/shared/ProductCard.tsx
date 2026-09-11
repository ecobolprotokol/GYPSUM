import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { PriceTag } from '@/components/shared/PriceTag';
import type { Product, Category } from '@/types';

type ProductWithCategory = Product & {
  category: Pick<Category, 'name' | 'slug'> | null;
};

export function ProductCard({ product }: { product: ProductWithCategory }) {
  const price =
    product.price_mode === 'exact' ? (product.price ?? 0) : (product.price_start ?? 0);

  return (
    <Link href={`/produk/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={product.cover_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.is_pickup_only && (
            <Badge variant="secondary" className="absolute left-2 top-2">
              Ambil di toko
            </Badge>
          )}
          {product.is_featured && (
            <Badge variant="default" className="absolute right-2 top-2">
              Unggulan
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-semibold text-primary">
            {product.name}
          </h3>
          <PriceTag
            amount={price}
            unit={product.unit}
            priceMode={product.price_mode}
            className="mt-2"
          />
          {product.min_order && (
            <Badge variant="outline" className="mt-2">
              Min. {product.min_order} {product.unit}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}