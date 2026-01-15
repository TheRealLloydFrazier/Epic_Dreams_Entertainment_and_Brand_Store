import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@lib/db/prisma';
import { displayClass } from '@lib/utils/fonts';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ArtistsPage() {
  const artists = await prisma.artist.findMany({
    orderBy: { name: 'asc' },
    include: {
      releases: {
        orderBy: { releaseDate: 'desc' },
        take: 4
      }
    }
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center mb-12">
        <h1 className={`${displayClass} text-4xl`}>Artists</h1>
        <p className="mt-4 text-base text-white/60 max-w-2xl mx-auto">
          Meet the Epic Dreams roster—artists who pour their souls into every note,
          every lyric, and every performance. Explore their music and discover your next favorite sound.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {artists.map((artist) => {
          // Get first paragraph of bio for preview
          const bioPreview = artist.bio.split('\n\n')[0].slice(0, 280) + (artist.bio.length > 280 ? '...' : '');

          return (
            <Link
              key={artist.id}
              href={`/artist/${artist.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 transition-all duration-300 hover:border-teal-500/30 hover:shadow-xl hover:shadow-teal-500/5"
            >
              <div className="flex flex-col md:flex-row">
                {/* Artist Image */}
                <div className="relative h-72 md:h-auto md:w-64 flex-shrink-0 overflow-hidden">
                  <Image
                    src={artist.heroImage || '/images/placeholder-artist.jpg'}
                    alt={artist.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:block hidden" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:hidden" />
                </div>

                {/* Artist Info */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className={`${displayClass} text-2xl text-white group-hover:text-teal-400 transition-colors`}>
                      {artist.name}
                    </h2>
                    <p className="mt-3 text-sm text-white/70 leading-relaxed line-clamp-4">
                      {bioPreview}
                    </p>
                  </div>

                  {/* Recent Releases Preview */}
                  {artist.releases.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50 mb-3">
                        Latest Releases
                      </p>
                      <div className="flex gap-2">
                        {artist.releases.slice(0, 4).map((release) => (
                          <div
                            key={release.id}
                            className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10"
                          >
                            <Image
                              src={release.coverImage || '/images/placeholder-release.jpg'}
                              alt={release.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                        {artist.releases.length > 4 && (
                          <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-xs text-white/60">
                            +{artist.releases.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Call to Action */}
                  <div className="mt-4 flex items-center text-sm text-teal-400 group-hover:text-teal-300 transition-colors">
                    <span>View Artist</span>
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
