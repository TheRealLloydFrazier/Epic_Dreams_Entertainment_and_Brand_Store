import Image from 'next/image';
import { cn } from '@lib/utils/styles';

/**
 * Logo System Variants:
 * - primary: Gold infinity-in-circle on dark. For product tags, labels, nav. Simple luxury aesthetic.
 * - hero: 3D galaxy cosmic infinity. For marketing assets and site hero sections only.
 * - embroidery: 1-2 color mark. For merch display (hats, polos, clothing).
 */
type LogoVariant = 'primary' | 'hero' | 'embroidery';

interface LogoProps {
  /** Logo variant to display */
  variant?: LogoVariant;
  /** Display size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  /** Show "Epic Dreams" text alongside logo */
  showText?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const sizeMap = {
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 56, height: 56 },
  xl: { width: 80, height: 80 },
  hero: { width: 200, height: 200 }
};

const variantSrcMap: Record<LogoVariant, string> = {
  primary: '/images/logo-primary-mark.svg',
  hero: '/images/logo-hero-emblem.svg',
  embroidery: '/images/logo-embroidery.svg'
};

const variantAltMap: Record<LogoVariant, string> = {
  primary: 'Epic Dreams - Primary Mark',
  hero: 'Epic Dreams - Hero Emblem',
  embroidery: 'Epic Dreams - Embroidery Mark'
};

export function Logo({
  variant = 'primary',
  size = 'md',
  showText = false,
  className
}: LogoProps) {
  const dimensions = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Image
        src={variantSrcMap[variant]}
        alt={variantAltMap[variant]}
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
        priority
      />
      {showText && (
        <span className="font-display text-lg font-semibold uppercase tracking-[0.2em]">
          Epic Dreams
        </span>
      )}
    </div>
  );
}

/** Product tag logo with "Epic Dreams" text - luxury aesthetic */
export function ProductTagLogo({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <Image
        src="/images/logo-primary-mark.svg"
        alt="Epic Dreams"
        width={48}
        height={48}
        className="object-contain"
      />
      <span className="font-display text-[10px] uppercase tracking-[0.3em] text-gold">
        Epic Dreams
      </span>
    </div>
  );
}

/** Infinity symbol badge used to indicate part of Epic Dreams Organization */
export function OrganizationBadge({ className }: { className?: string }) {
  return (
    <div className={cn(
      'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1',
      className
    )}>
      <span className="text-sm text-accent-teal">∞</span>
      <span className="text-[10px] text-white/50">Part of Epic Dreams Organization</span>
    </div>
  );
}
