# Marketing Hero Images

Large background images for hero sections, about pages, and marketing materials.

## Expected Files

| Filename | Description | Suggested Use |
|----------|-------------|---------------|
| `forge-molten.png` | Molten rock infinity with dripping gold/lava | Hero sections, About page |
| `mobile-hologram.png` | Holographic infinity from smartphone | App marketing, Digital services |
| `marble-monument.png` | Marble-to-crystal infinity in metal ring | Holding company, Investor materials |
| `forge-anvil.png` | Gold infinity with anvil + PC component | PC building, Hardware services |
| `boardroom-cosmic.png` | Gold infinity in futuristic boardroom | Investor pages, Corporate about |
| `energy-electric.png` | Blue electric infinity with HUD | Energy subsidiary hero |
| `ai-neural.png` | Blue neural infinity with circuit ring | AI subsidiary hero |
| `entertainment-cosmic.png` | Purple cosmic infinity in silver ring | Entertainment subsidiary hero |

## Recommended Specifications

- **Format:** PNG or WebP
- **Resolution:** 1920x1080 minimum (2560x1440 or higher preferred)
- **Aspect Ratios:** 16:9 for full-width heroes, 1:1 for flexible use
- **File Size:** Optimize for web (< 500KB if possible)

## Usage in Code

```tsx
import { getMarketingImage } from '@lib/constants/brand-assets';

// Get specific image
const heroImage = getMarketingImage('boardroom-cosmic');

// Use in component
<div style={{ backgroundImage: `url(${heroImage?.path})` }}>
  ...
</div>
```

## Export from Figma

1. Select the marketing image frame
2. Export as PNG at 2x scale
3. Optionally convert to WebP for smaller file sizes
4. Save with the filename from the table above
