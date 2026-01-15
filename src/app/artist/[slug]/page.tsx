import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@lib/db/prisma';
import Link from 'next/link';
import { displayClass } from '@lib/utils/fonts';

export const revalidate = 120;

interface Release {
  id: number;
  title: string;
  slug: string;
  releaseDate: Date;
  coverImage: string | null;
  tracks: unknown;
}

export default async function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = await prisma.artist.findUnique({
    where: { slug: params.slug },
    include: {
      releases: {
        orderBy: { releaseDate: 'desc' }
      },
      products: {
        include: {
          product: { include: { images: true, variants: true } }
        }
      }
    }
  });
  if (!artist) return notFound();

  // Separate featured album (more than 1 track) from singles
  const featuredReleases = artist.releases.filter((r: Release) => {
    const tracks = r.tracks as Array<{ title: string; duration: string }> | null;
    return tracks && tracks.length > 1;
  });
  const singles = artist.releases.filter((r: Release) => {
    const tracks = r.tracks as Array<{ title: string; duration: string }> | null;
    return !tracks || tracks.length <= 1;
  });

  const socials = artist.socials as Record<string, string> | null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      {/* Hero Section */}
      <div className="grid gap-10 lg:grid-cols-[380px,1fr]">
        {/* Artist Profile Sidebar */}
        <div className="space-y-6">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <Image
              src={artist.heroImage || '/images/placeholder-artist.jpg'}
              alt={artist.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className={`${displayClass} text-4xl text-white`}>{artist.name}</h1>
            <p className="mt-4 text-sm leading-relaxed text-white/70 whitespace-pre-line">{artist.bio}</p>
          </div>

          {/* Social Links */}
          {socials && Object.keys(socials).length > 0 && (
            <div className="flex flex-wrap gap-3 pt-4">
              {socials.youtube && (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/20"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  YouTube
                </a>
              )}
              {socials.spotify && (
                <a
                  href={socials.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/20"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
                  Spotify
                </a>
              )}
              {socials.appleMusic && (
                <a
                  href={socials.appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/20"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
                  Apple Music
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/20"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  Instagram
                </a>
              )}
            </div>
          )}

          {/* Spotify Embed */}
          {socials?.spotifyEmbed && (
            <div className="pt-4">
              <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: '12px' }}
                src={socials.spotifyEmbed}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Featured Albums */}
          {featuredReleases.length > 0 && (
            <section>
              <h2 className={`${displayClass} text-2xl text-white mb-6`}>Featured Albums</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {featuredReleases.map((release: Release) => {
                  const tracks = release.tracks as Array<{ title: string; duration: string }> | null;
                  return (
                    <Link
                      key={release.id}
                      href={`/releases/${release.slug}`}
                      className="group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 transition-all duration-300 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10"
                    >
                      <div className="relative aspect-square w-full">
                        <Image
                          src={release.coverImage || '/images/placeholder-release.jpg'}
                          alt={release.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-xs font-medium uppercase tracking-[0.2em] text-teal-400">
                            {tracks?.length || 0} Tracks
                          </p>
                          <p className="mt-2 text-xl font-bold text-white">{release.title}</p>
                          <p className="mt-1 text-sm text-white/60">
                            {release.releaseDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Singles & EPs */}
          {singles.length > 0 && (
            <section>
              <h2 className={`${displayClass} text-2xl text-white mb-6`}>
                Singles & EPs
                <span className="ml-3 text-base font-normal text-white/50">({singles.length})</span>
              </h2>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {singles.map((release: Release) => (
                  <Link
                    key={release.id}
                    href={`/releases/${release.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-teal-500/30 hover:bg-white/10"
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={release.coverImage || '/images/placeholder-release.jpg'}
                        alt={release.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-white/50">
                        {release.releaseDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </p>
                      <p className="mt-1 text-sm font-medium text-white line-clamp-2 leading-tight">{release.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Legacy section for artists without the album/single distinction */}
          {featuredReleases.length === 0 && singles.length === 0 && artist.releases.length > 0 && (
            <section>
              <h2 className={`${displayClass} text-2xl text-white mb-6`}>Releases</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {artist.releases.map((release: Release) => (
                  <Link
                    key={release.id}
                    href={`/releases/${release.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-teal-500/30"
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
                      <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                        {release.releaseDate.toDateString()}
                      </p>
                      <p className="mt-2 text-base font-semibold text-white">{release.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Merch Section */}
          {artist.products.length > 0 && (
            <section>
              <h2 className={`${displayClass} text-2xl text-white mb-6`}>Official Merch</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {artist.products.map(({ product }) => {
                  const minPrice = Math.min(...product.variants.map((v: { priceCents: number }) => v.priceCents));
                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-teal-500/30"
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
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-teal-400">Merch</p>
                        <p className="mt-2 text-base font-semibold text-white">{product.title}</p>
                        <p className="mt-1 text-sm text-white/60">From ${(minPrice / 100).toFixed(2)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
