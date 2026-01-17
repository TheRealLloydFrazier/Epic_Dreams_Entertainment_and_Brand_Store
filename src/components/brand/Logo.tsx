'use client';

import { cn } from '@lib/utils/styles';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'full' | 'mark';
}

export function Logo({ className, size = 'md', showText = true, variant = 'full' }: LogoProps) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl'
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Infinity Mark in Circle */}
      <div className={cn('relative flex-shrink-0', sizes[size])}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Cosmic purple gradient and glow effect */}
          <defs>
            <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Circle outline */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="url(#cosmicGradient)"
            strokeWidth="2"
            fill="none"
            filter="url(#glow)"
          />

          {/* Infinity symbol */}
          <path
            d="M32 50c0-6 4-11 10-11 8 0 8 11 8 11s0 11 8 11c6 0 10-5 10-11s-4-11-10-11c-8 0-8 11-8 11s0-11-8-11c-6 0-10 5-10 11z"
            stroke="url(#cosmicGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter="url(#glow)"
          />
        </svg>
      </div>

      {/* Text wordmark */}
      {showText && variant === 'full' && (
        <div className="flex flex-col">
          <span
            className={cn(
              'font-display font-semibold uppercase tracking-[0.2em] text-white',
              textSizes[size]
            )}
          >
            Epic Dreams
          </span>
        </div>
      )}
    </div>
  );
}

export function LogoMark({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizes[size], className)}
    >
      <defs>
        <linearGradient id="cosmicGradientMark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <filter id="glowMark" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle
        cx="50"
        cy="50"
        r="46"
        stroke="url(#cosmicGradientMark)"
        strokeWidth="2"
        fill="none"
        filter="url(#glowMark)"
      />

      <path
        d="M32 50c0-6 4-11 10-11 8 0 8 11 8 11s0 11 8 11c6 0 10-5 10-11s-4-11-10-11c-8 0-8 11-8 11s0-11-8-11c-6 0-10 5-10 11z"
        stroke="url(#cosmicGradientMark)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#glowMark)"
      />
    </svg>
  );
}
