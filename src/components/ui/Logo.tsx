import Image from 'next/image';
import { cn } from '@lib/utils/styles';
import { getLogoPath, type LogoVariant } from '@lib/constants/brand-assets';

/**
 * Logo System
 *
 * Supports multiple companies in the Epic Dreams Organization:
 * - epic-dreams-holding (parent company)
 * - epic-dreams-entertainment (music label & merch)
 * - epic-dreams-energy (energy & sustainability)
 * - epic-dreams-ai (AI solutions)
 * - epic-dreams-forge (PC building & hardware)
 *
 * Each company has three logo variants:
 * - primary: Simple mark for nav, tags, labels (gold/colored infinity-in-circle)
 * - hero: Detailed 3D cosmic version for marketing assets
 * - embroidery: 1-2 color version for merchandise
 */

interface LogoProps {
  /** Company ID - defaults to entertainment (current site) */
  company?: 'epic-dreams-holding' | 'epic-dreams-entertainment' | 'epic-dreams-energy' | 'epic-dreams-ai' | 'epic-dreams-forge';
  /** Logo variant to display */
  variant?: LogoVariant;
  /** Display size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  /** Show company name alongside logo */
  showText?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const sizeMap = {
  xs: { width: 24, height: 24 },
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 56, height: 56 },
  xl: { width: 80, height: 80 },
  hero: { width: 200, height: 200 }
};

const companyNames: Record<string, string> = {
  'epic-dreams-holding': 'Epic Dreams',
  'epic-dreams-entertainment': 'Epic Dreams Entertainment',
  'epic-dreams-energy': 'Epic Dreams Energy',
  'epic-dreams-ai': 'Epic Dreams AI',
  'epic-dreams-forge': 'Epic Dreams Forge',
};

export function Logo({
  company = 'epic-dreams-entertainment',
  variant = 'primary',
  size = 'md',
  showText = false,
  className
}: LogoProps) {
  const dimensions = sizeMap[size];
  const logoPath = getLogoPath(company, variant);
  const companyName = companyNames[company] || 'Epic Dreams';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Image
        src={logoPath}
        alt={`${companyName} Logo`}
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain"
        priority
      />
      {showText && (
        <span className="font-display text-lg font-semibold uppercase tracking-[0.2em]">
          {companyName}
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
        src="/images/logos/holding-primary.png"
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

/** Hero logo for marketing sections - uses the detailed 3D cosmic variant */
export function HeroLogo({
  company = 'epic-dreams-entertainment',
  className
}: {
  company?: LogoProps['company'];
  className?: string;
}) {
  const logoPath = getLogoPath(company || 'epic-dreams-entertainment', 'hero');
  const companyName = companyNames[company || 'epic-dreams-entertainment'];

  return (
    <div className={cn('relative', className)}>
      <Image
        src={logoPath}
        alt={`${companyName} Hero Logo`}
        width={300}
        height={300}
        className="object-contain"
        priority
      />
    </div>
  );
}
