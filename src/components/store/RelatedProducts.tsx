import Link from 'next/link';
import Image from 'next/image';
import type { StoreProduct } from '@lib/types/store';

export function RelatedProducts({ products }: { products: StoreProduct[] }) {
  if (products.length === 0) return null;
  return (
    <div>
      <h2 className="text-lg font-semibold text-white">You May Also Like</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={product.images[0]?.url || '/images/placeholder-product.jpg'}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Luxury Collection</p>
              <p className="mt-2 text-base font-semibold text-white">{product.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-accent-violet">
                Made to Order
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
