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
 * Brand assets for Epic Dreams Forge
 * Molten gold/fire infinity with anvil aesthetic - PC building & hardware
 */
export const FORGE_BRAND: BrandAsset = {
  companyId: 'epic-dreams-forge',
  name: 'Epic Dreams Forge',
  colorScheme: {
    primary: '#ff6b35', // Molten orange
    secondary: '#d4af37', // Gold
    accent: '#1a1a1a', // Dark iron/steel
  },
  logos: {
    // Using SVG placeholders - replace with PNG exports from Figma
    primary: '/images/logos/forge-primary.svg',
    hero: '/images/logos/forge-hero.svg',
    embroidery: '/images/logos/forge-embroidery.svg',
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
  'epic-dreams-forge': FORGE_BRAND,
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

/**
 * Marketing Hero Images
 *
 * Large background images for hero sections, about pages, marketing materials.
 * These are full scene renders featuring the infinity symbol in various contexts.
 * Save to /public/images/marketing/
 */
export type MarketingImageType =
  | 'forge-molten'      // Molten rock infinity with dripping gold/lava
  | 'mobile-hologram'   // Holographic infinity emerging from smartphone
  | 'marble-monument'   // Marble-to-crystal infinity in metal ring
  | 'forge-anvil'       // Gold infinity with anvil + PC component
  | 'boardroom-cosmic'  // Gold infinity in futuristic boardroom
  | 'energy-electric'   // Blue electric infinity (Energy brand)
  | 'ai-neural'         // Neural network infinity (AI brand)
  | 'entertainment-cosmic' // Purple cosmic infinity (Entertainment brand)
  | 'cosmic-particle-trail' // Gold/blue infinity with particle disintegration
  | 'lunar-boardroom'   // Moon/starfield infinity in space boardroom
  | 'stone-star-rain';  // Stone/star duality infinity with rain and embers

export interface MarketingImage {
  id: MarketingImageType;
  name: string;
  description: string;
  suggestedUse: string[];
  path: string;
}

export const MARKETING_IMAGES: MarketingImage[] = [
  {
    id: 'forge-molten',
    name: 'Molten Forge',
    description: 'Infinity symbol carved in molten rock with dripping gold/magma, cosmic fire background',
    suggestedUse: ['Hero sections', 'About page', 'Creation/building themes'],
    path: '/images/marketing/forge-molten.png',
  },
  {
    id: 'mobile-hologram',
    name: 'Mobile Hologram',
    description: 'Holographic gold infinity emerging from smartphone with purple/gold energy effects',
    suggestedUse: ['App marketing', 'Digital services', 'Tech products'],
    path: '/images/marketing/mobile-hologram.png',
  },
  {
    id: 'marble-monument',
    name: 'Marble Monument',
    description: 'Marble-to-crystal infinity symbol in massive metallic ring, futuristic setting',
    suggestedUse: ['Holding company pages', 'Investor materials', 'Corporate presentations'],
    path: '/images/marketing/marble-monument.png',
  },
  {
    id: 'forge-anvil',
    name: 'Tech Forge',
    description: 'Gold cosmic infinity with anvil and PC motherboard, creation/building theme',
    suggestedUse: ['PC building services', 'Hardware subsidiary', 'Tech creation'],
    path: '/images/marketing/forge-anvil.png',
  },
  {
    id: 'boardroom-cosmic',
    name: 'Cosmic Boardroom',
    description: 'Gold infinity in futuristic boardroom with galaxy view and holographic displays',
    suggestedUse: ['Investor pages', 'Corporate about', 'Leadership sections'],
    path: '/images/marketing/boardroom-cosmic.png',
  },
  {
    id: 'energy-electric',
    name: 'Electric Energy',
    description: 'Blue electric infinity with HUD elements and energy effects',
    suggestedUse: ['Energy subsidiary hero', 'Sustainability pages'],
    path: '/images/marketing/energy-electric.png',
  },
  {
    id: 'ai-neural',
    name: 'Neural Network',
    description: 'Blue neural infinity with circuit ring and tech aesthetics',
    suggestedUse: ['AI subsidiary hero', 'Technology pages'],
    path: '/images/marketing/ai-neural.png',
  },
  {
    id: 'entertainment-cosmic',
    name: 'Cosmic Entertainment',
    description: 'Purple/pink cosmic infinity in silver ring with galaxy background',
    suggestedUse: ['Entertainment subsidiary hero', 'Music/merch pages'],
    path: '/images/marketing/entertainment-cosmic.png',
  },
  {
    id: 'cosmic-particle-trail',
    name: 'Cosmic Particle Trail',
    description: 'Gold/orange cosmic infinity with blue particle trail disintegration effect',
    suggestedUse: ['Dynamic hero sections', 'Transformation themes', 'About pages'],
    path: '/images/marketing/cosmic-particle-trail.png',
  },
  {
    id: 'lunar-boardroom',
    name: 'Lunar Boardroom',
    description: 'Moon/starfield infinity in futuristic space boardroom with galaxy views',
    suggestedUse: ['Space/exploration themes', 'Corporate sci-fi', 'Investor materials'],
    path: '/images/marketing/lunar-boardroom.png',
  },
  {
    id: 'stone-star-rain',
    name: 'Stone & Stars',
    description: 'Stone/star duality infinity with rain drops and ember sparks, moody atmosphere',
    suggestedUse: ['Duality themes', 'Creation/transformation', 'Artistic pages'],
    path: '/images/marketing/stone-star-rain.png',
  },
];

/**
 * Get marketing image by ID
 */
export function getMarketingImage(id: MarketingImageType): MarketingImage | undefined {
  return MARKETING_IMAGES.find(img => img.id === id);
}

/**
 * Get marketing images by suggested use
 */
export function getMarketingImagesByUse(use: string): MarketingImage[] {
  return MARKETING_IMAGES.filter(img =>
    img.suggestedUse.some(u => u.toLowerCase().includes(use.toLowerCase()))
  );
}
