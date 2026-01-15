/**
 * Brand Assets Configuration
 *
 * This file maps each company/subsidiary to its logo assets.
 * Logo files should be placed in /public/images/logos/
 *
 * Naming convention:
 * - {company-id}-primary.png    - Primary mark (gold infinity-in-circle style)
 * - {company-id}-hero.png       - Hero emblem (3D cosmic style for marketing)
 * - {company-id}-embroidery.png - Embroidery mark (1-2 color for merch)
 */

export type LogoVariant = 'primary' | 'hero' | 'embroidery';

export interface BrandAsset {
  companyId: string;
  name: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  logos: {
    primary: string;
    hero: string;
    embroidery: string;
  };
}

/**
 * Brand assets for the holding company
 * Gold infinity with galaxies - represents the parent organization
 */
export const HOLDING_COMPANY_BRAND: BrandAsset = {
  companyId: 'epic-dreams-holding',
  name: 'Epic Dreams Organization',
  colorScheme: {
    primary: '#d4af37', // Gold
    secondary: '#0a0a1a', // Cosmic dark
    accent: '#f5d17a', // Light gold
  },
  logos: {
    // Using SVG placeholders - replace with PNG exports from Figma
    primary: '/images/logos/holding-primary.svg',
    hero: '/images/logos/holding-hero.svg',
    embroidery: '/images/logos/holding-embroidery.svg',
  },
};

/**
 * Brand assets for Epic Dreams Entertainment
 * Purple/pink cosmic infinity in silver ring
 */
export const ENTERTAINMENT_BRAND: BrandAsset = {
  companyId: 'epic-dreams-entertainment',
  name: 'Epic Dreams Entertainment',
  colorScheme: {
    primary: '#6a4bff', // Violet
    secondary: '#ff6bff', // Pink
    accent: '#c0c0c0', // Silver
  },
  logos: {
    // Using SVG placeholders - replace with PNG exports from Figma
    primary: '/images/logos/entertainment-primary.svg',
    hero: '/images/logos/entertainment-hero.svg',
    embroidery: '/images/logos/entertainment-embroidery.svg',
  },
};

/**
 * Brand assets for Epic Dreams Energy
 * Blue electric infinity with HUD elements
 */
export const ENERGY_BRAND: BrandAsset = {
  companyId: 'epic-dreams-energy',
  name: 'Epic Dreams Energy',
  colorScheme: {
    primary: '#00f5ff', // Electric blue/teal
    secondary: '#0066ff', // Deep blue
    accent: '#f5d17a', // Gold accent
  },
  logos: {
    // Using SVG placeholders - replace with PNG exports from Figma
    primary: '/images/logos/energy-primary.svg',
    hero: '/images/logos/energy-hero.svg',
    embroidery: '/images/logos/energy-embroidery.svg',
  },
};

/**
 * Brand assets for Epic Dreams AI Solutions
 * Blue neural infinity with circuit ring
 */
export const AI_BRAND: BrandAsset = {
  companyId: 'epic-dreams-ai',
  name: 'Epic Dreams AI Solutions',
  colorScheme: {
    primary: '#00f5ff', // Teal/cyan
    secondary: '#1a1a3e', // Deep space blue
    accent: '#6a4bff', // Violet
  },
  logos: {
    // Using SVG placeholders - replace with PNG exports from Figma
    primary: '/images/logos/ai-primary.svg',
    hero: '/images/logos/ai-hero.svg',
    embroidery: '/images/logos/ai-embroidery.svg',
  },
};

/**
 * All brand assets indexed by company ID
 */
export const BRAND_ASSETS: Record<string, BrandAsset> = {
  'epic-dreams-holding': HOLDING_COMPANY_BRAND,
  'epic-dreams-entertainment': ENTERTAINMENT_BRAND,
  'epic-dreams-energy': ENERGY_BRAND,
  'epic-dreams-ai': AI_BRAND,
};

/**
 * Get brand assets for a specific company
 */
export function getBrandAssets(companyId: string): BrandAsset | undefined {
  return BRAND_ASSETS[companyId];
}

/**
 * Get logo path for a specific company and variant
 */
export function getLogoPath(companyId: string, variant: LogoVariant): string {
  const brand = BRAND_ASSETS[companyId];
  if (!brand) {
    // Fallback to holding company
    return HOLDING_COMPANY_BRAND.logos[variant];
  }
  return brand.logos[variant];
}

/**
 * Expected logo files - use this to verify all assets are present
 * Export from Figma and save to /public/images/logos/
 */
export const EXPECTED_LOGO_FILES = [
  // Holding Company
  'holding-primary.png',
  'holding-hero.png',
  'holding-embroidery.png',
  // Entertainment
  'entertainment-primary.png',
  'entertainment-hero.png',
  'entertainment-embroidery.png',
  // Energy
  'energy-primary.png',
  'energy-hero.png',
  'energy-embroidery.png',
  // AI Solutions
  'ai-primary.png',
  'ai-hero.png',
  'ai-embroidery.png',
] as const;
