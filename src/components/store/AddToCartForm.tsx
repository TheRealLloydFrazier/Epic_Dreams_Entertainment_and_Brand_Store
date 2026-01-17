'use client';

import { useState } from 'react';
import { useCart } from '@lib/hooks/use-cart';
import type { StoreProduct } from '@lib/types/store';

export function AddToCartForm({ product }: { product: StoreProduct }) {
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = product.variants.find((variant) => variant.id === variantId);

  // Check if product has signed variants
  const hasSignedVariants = product.variants.some((v) => v.signed);
  const signedVariants = product.variants.filter((v) => v.signed);
  const standardVariants = product.variants.filter((v) => !v.signed);

  const addToCart = () => {
    if (!selectedVariant) return;
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productSlug: product.slug,
      title: product.title,
      variantName: selectedVariant.name,
      priceCents: 0, // Price calculated at checkout
      quantity,
      imageUrl: product.images[0]?.url,
      signed: selectedVariant.signed,
      attributes: selectedVariant.attributes as Record<string, unknown>
    });
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Personalized Fit Banner */}
      <div className="rounded-2xl border border-accent-violet/30 bg-accent-violet/5 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-accent-violet">Personalized Fit</p>
        <p className="mt-2 text-sm text-white/70">
          Every piece is made-to-order using AI-powered measurements from your uploaded photo.
          Your exact dimensions ensure a perfect, luxury fit.
        </p>
      </div>

      {/* Edition Selection */}
      {hasSignedVariants && (
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Select Edition</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {standardVariants.length > 0 && (
              <button
                onClick={() => setVariantId(standardVariants[0]?.id)}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  selectedVariant && !selectedVariant.signed
                    ? 'border-accent-violet bg-accent-violet/10 text-white'
                    : 'border-white/20 text-white/70 hover:border-accent-violet hover:text-white'
                }`}
              >
                <span className="text-sm font-medium">Standard Edition</span>
                <p className="mt-1 text-xs text-white/50">Premium craftsmanship</p>
              </button>
            )}
            {signedVariants.length > 0 && (
              <button
                onClick={() => setVariantId(signedVariants[0]?.id)}
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  selectedVariant?.signed
                    ? 'border-accent-violet bg-accent-violet/10 text-white'
                    : 'border-white/20 text-white/70 hover:border-accent-violet hover:text-white'
                }`}
              >
                <span className="text-sm font-medium">Signed Edition</span>
                <p className="mt-1 text-xs text-accent-violet">Limited availability</p>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quantity Selection */}
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Quantity</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-full border border-white/20 bg-black/40">
            <button
              className="px-4 py-2 text-lg text-white/70 hover:text-white disabled:opacity-40"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="px-4 text-sm uppercase tracking-[0.3em]">{quantity}</span>
            <button
              className="px-4 py-2 text-lg text-white/70 hover:text-white"
              onClick={() => setQuantity((prev) => prev + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Price Notice */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Pricing</p>
        <p className="mt-2 text-sm text-white/70">
          Final price calculated at checkout based on your custom specifications and personalization options.
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={addToCart}
        disabled={!selectedVariant}
        className="w-full rounded-full bg-accent-violet px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-accent-violet-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        Add to Cart
      </button>

      {/* Request Quote Button */}
      <button
        className="w-full rounded-full border border-white/20 px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-accent-violet hover:text-accent-violet"
      >
        Request Custom Quote
      </button>

      {/* Signed Edition Notice */}
      {selectedVariant?.signed && (
        <p className="text-center text-xs uppercase tracking-[0.3em] text-accent-violet">
          Signed edition · Authenticated certificate included
        </p>
      )}
    </div>
  );
}
