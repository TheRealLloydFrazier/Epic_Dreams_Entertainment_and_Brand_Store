import Image from 'next/image';
import { cn } from '@lib/utils/styles';
import { getMarketingImage, type MarketingImageType } from '@lib/constants/brand-assets';

interface HeroBackgroundProps {
  /** Marketing image ID to use as background */
  image: MarketingImageType;
  /** Content to overlay on the hero */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Overlay darkness (0-100) */
  overlayOpacity?: number;
  /** Height variant */
  height?: 'sm' | 'md' | 'lg' | 'full';
}

const heightMap = {
  sm: 'min-h-[300px]',
  md: 'min-h-[500px]',
  lg: 'min-h-[700px]',
  full: 'min-h-screen',
};

/**
 * Hero section with marketing background image
 *
 * Usage:
 * ```tsx
 * <HeroBackground image="boardroom-cosmic" height="lg">
 *   <h1>Welcome to Epic Dreams</h1>
 * </HeroBackground>
 * ```
 */
export function HeroBackground({
  image,
  children,
  className,
  overlayOpacity = 50,
  height = 'lg',
}: HeroBackgroundProps) {
  const marketingImage = getMarketingImage(image);

  if (!marketingImage) {
    // Fallback to gradient background
    return (
      <div
        className={cn(
          'relative flex items-center justify-center bg-gradient-to-br from-background via-accent-violet/20 to-background',
          heightMap[height],
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', heightMap[height], className)}>
      {/* Background Image */}
      <Image
        src={marketingImage.path}
        alt={marketingImage.name}
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity / 100 }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/**
 * Simple hero image display (no overlay)
 */
export function MarketingImage({
  image,
  className,
}: {
  image: MarketingImageType;
  className?: string;
}) {
  const marketingImage = getMarketingImage(image);

  if (!marketingImage) return null;

  return (
    <div className={cn('relative aspect-video overflow-hidden rounded-lg', className)}>
      <Image
        src={marketingImage.path}
        alt={marketingImage.name}
        fill
        className="object-cover"
      />
    </div>
  );
}
