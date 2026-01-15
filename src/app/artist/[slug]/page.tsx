import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@lib/db/prisma';
import Link from 'next/link';

export const revalidate = 120;

// Platform display names and icons
const platformConfig: Record<string, { label: string; icon: string }> = {
  spotify: { label: 'Spotify', icon: '🎧' },
  appleMusic: { label: 'Apple Music', icon: '🍎' },
  apple_music: { label: 'Apple Music', icon: '🍎' },
  soundcloud: { label: 'SoundCloud', icon: '☁️' },
  youtube: { label: 'YouTube', icon: '▶️' },
  youtubeMusic: { label: 'YouTube Music', icon: '🎵' },
  youtube_music: { label: 'YouTube Music', icon: '🎵' },
  tidal: { label: 'Tidal', icon: '🌊' },
  amazon: { label: 'Amazon Music', icon: '📦' },
  amazonMusic: { label: 'Amazon Music', icon: '📦' },
  amazon_music: { label: 'Amazon Music', icon: '📦' },
  deezer: { label: 'Deezer', icon: '🎶' },
  bandcamp: { label: 'Bandcamp', icon: '💿' },
  audiomack: { label: 'Audiomack', icon: '🔊' },
  instagram: { label: 'Instagram', icon: '📸' },
  twitter: { label: 'Twitter', icon: '🐦' },
  x: { label: 'X', icon: '𝕏' },
  tiktok: { label: 'TikTok', icon: '🎬' },
  facebook: { label: 'Facebook', icon: '📘' },
  website: { label: 'Website', icon: '🌐' },
  linktree: { label: 'Linktree', icon: '🌳' },
};

function getPlatformDisplay(key: string): { label: string; icon: string } {
  const normalized = key.toLowerCase().replace(/[-_]/g, '');
  const config = platformConfig[key] || platformConfig[normalized];
  if (config) return config;
  // Capitalize first letter for unknown platforms
  return { label: key.charAt(0).toUpperCase() + key.slice(1), icon: '🔗' };
}

export default async function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = await prisma.artist.findUnique({
    where: { slug: params.slug },
    include: {
      releases: true,
      products: {
        include: {
          product: { include: { images: true, variants: true } }
        }
      }
    }
  });
  if (!artist) return notFound();

  const socials = (artist.socials as Record<string, string>) || {};
  const hasSocials = Object.keys(socials).length > 0;

  // Separate music platforms from social media
  const musicPlatforms = ['spotify', 'appleMusic', 'apple_music', 'soundcloud', 'youtube', 'youtubeMusic', 'youtube_music', 'tidal', 'amazon', 'amazonMusic', 'amazon_music', 'deezer', 'bandcamp', 'audiomack'];
  const musicLinks: [string, string][] = [];
  const socialLinks: [string, string][] = [];

  Object.entries(socials).forEach(([platform, url]) => {
    const normalizedPlatform = platform.toLowerCase().replace(/[-_]/g, '');
    if (musicPlatforms.some(mp => mp.toLowerCase().replace(/[-_]/g, '') === normalizedPlatform)) {
      musicLinks.push([platform, url]);
    } else {
      socialLinks.push([platform, url]);
    }
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-[320px,1fr]">
        <div className="space-y-6">
          <div className="relative h-80 overflow-hidden rounded-3xl border border-white/10">
            <Image
              src={artist.heroImage || '/images/placeholder-artist.jpg'}
              alt={artist.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white">{artist.name}</h1>
            <p className="mt-3 text-sm text-white/70 whitespace-pre-line">{artist.bio}</p>
          </div>

          {/* Music Platforms */}
          {musicLinks.length > 0 && (
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-white/50 mb-3">Listen On</h3>
              <div className="flex flex-wrap gap-2">
                {musicLinks.map(([platform, url]) => {
                  const { label, icon } = getPlatformDisplay(platform);
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70 transition-all hover:border-accent-teal hover:bg-accent-teal/10 hover:text-white"
                    >
                      <span>{icon}</span>
                      <span>{label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Social Media Links */}
          {socialLinks.length > 0 && (
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.3em] text-white/50 mb-3">Follow</h3>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(([platform, url]) => {
                  const { label, icon } = getPlatformDisplay(platform);
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white/70 transition-all hover:border-accent-teal hover:bg-accent-teal/10 hover:text-white"
                    >
                      <span>{icon}</span>
                      <span>{label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-10">
          <div>
            <h2 className="text-lg font-semibold text-white">Releases</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {artist.releases.map((release) => (
                <Link
                  key={release.id}
                  href={`/releases/${release.slug}`}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={release.coverImage || '/images/placeholder-release.jpg'}
                      alt={release.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">{release.releaseDate.toDateString()}</p>
                    <p className="mt-2 text-base font-semibold text-white">{release.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Merch</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {artist.products.map(({ product }) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={product.images[0]?.url || '/images/placeholder-product.jpg'}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">Merch</p>
                    <p className="mt-2 text-base font-semibold text-white">{product.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
