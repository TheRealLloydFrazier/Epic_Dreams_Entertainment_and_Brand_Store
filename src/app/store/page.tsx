import { Suspense } from 'react';
import { StoreFilters } from '@components/store/StoreFilters';
import { StoreGrid } from '@components/store/StoreGrid';
import { displayClass } from '@lib/utils/fonts';
import { Logo } from '@components/ui/Logo';

export const dynamic = 'force-dynamic';

export default function StorePage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-center gap-4">
        <Logo company="epic-dreams-entertainment" variant="primary" size="xl" />
        <div>
          <h1 className={`${displayClass} text-3xl`}>Store</h1>
          <p className="mt-1 text-sm text-white/60">
            Explore signature drops across tees, hoodies, headwear, posters, and accessories.
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-[240px,1fr]">
        <StoreFilters />
        <Suspense fallback={<p className="text-white/60">Loading products…</p>}>
          <StoreGrid searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
