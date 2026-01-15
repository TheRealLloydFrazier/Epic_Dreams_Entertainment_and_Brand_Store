import Image from 'next/image';
import { cn } from '@lib/utils/styles';

interface LogoProps {
  /** Display size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Show text alongside logo */
  showText?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const sizeMap = {
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 56, height: 56 },
  xl: { width: 80, height: 80 }
};

export function Logo({ size = 'md', showText = false, className }: LogoProps) {
  const dimensions = sizeMap[size];

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Image
        src="/images/epic-dreams-entertainment-logo.svg"
        alt="Epic Dreams Entertainment"
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
