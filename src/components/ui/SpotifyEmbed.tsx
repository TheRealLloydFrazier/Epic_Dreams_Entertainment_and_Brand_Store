import { cn } from '@lib/utils/styles';

type SpotifyEmbedType = 'artist' | 'album' | 'track' | 'playlist';

interface SpotifyEmbedProps {
  /** Spotify URI or ID (e.g., "2KXWFz3CD7BXxrPfTk0xTw" or full URI) */
  spotifyId: string;
  /** Type of Spotify content */
  type?: SpotifyEmbedType;
  /** Height of the embed in pixels */
  height?: number;
  /** Whether to use compact mode (for tracks/albums) */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Spotify Embed Component
 *
 * Displays an embedded Spotify player for artists, albums, tracks, or playlists.
 *
 * Usage:
 * ```tsx
 * // Artist embed
 * <SpotifyEmbed spotifyId="2KXWFz3CD7BXxrPfTk0xTw" type="artist" />
 *
 * // Album embed
 * <SpotifyEmbed spotifyId="4aawyAB9vmqN3uQ7FjRGTy" type="album" />
 *
 * // Track embed (compact)
 * <SpotifyEmbed spotifyId="3n3Ppam7vgaVa1iaRUc9Lp" type="track" compact />
 * ```
 */
export function SpotifyEmbed({
  spotifyId,
  type = 'artist',
  height = 352,
  compact = false,
  className,
}: SpotifyEmbedProps) {
  // Extract ID if full URI is provided
  const id = spotifyId.includes(':')
    ? spotifyId.split(':').pop()
    : spotifyId;

  const embedUrl = `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;

  // Compact mode uses smaller height
  const embedHeight = compact ? 152 : height;

  return (
    <div className={cn('w-full overflow-hidden rounded-xl', className)}>
      <iframe
        src={embedUrl}
        width="100%"
        height={embedHeight}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl"
        title={`Spotify ${type} player`}
      />
    </div>
  );
}

/**
 * Extract Spotify ID from various URL/URI formats
 */
export function extractSpotifyId(input: string): string | null {
  // Handle full URLs like https://open.spotify.com/artist/2KXWFz3CD7BXxrPfTk0xTw
  const urlMatch = input.match(/spotify\.com\/(?:embed\/)?(\w+)\/([a-zA-Z0-9]+)/);
  if (urlMatch) return urlMatch[2];

  // Handle URIs like spotify:artist:2KXWFz3CD7BXxrPfTk0xTw
  const uriMatch = input.match(/spotify:(\w+):([a-zA-Z0-9]+)/);
  if (uriMatch) return uriMatch[2];

  // Assume it's already just an ID
  if (/^[a-zA-Z0-9]{22}$/.test(input)) return input;

  return null;
}
