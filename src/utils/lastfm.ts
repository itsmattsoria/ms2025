/**
 * LastFM API utility functions
 */
export interface LastFMTrack {
  artist: string;
  name: string;
  album: string;
  url: string;
  image: string;
  nowPlaying: boolean;
}

/**
 * Blocklist for albums with NSFW artwork
 * Add entries with artist and album names (will be matched case-insensitively)
 */
const ALBUM_ARTWORK_BLOCKLIST: Array<{ artist: string; album: string }> = [
  // Example: { artist: 'artist name', album: 'album name' },
  { artist: 'Deftones', album: 'Around the Fur' },
  { artist: 'Dimmu Borgir', album: 'In Sorte Diaboli' },
  { artist: 'Dimmu Borgir', album: 'Puritanical Euphoric Misanthropia' },
  { artist: 'Halsey', album: 'If I Can’t Have Love, I Want Power' },
  { artist: 'Halsey', album: 'If I Can’t Have Love, I Want Power (Deluxe)' },
  { artist: 'Grails', album: "Doomsdayer's Holiday" },
];

/**
 * Check if an album is in the blocklist
 */
function isAlbumBlocked(artist: string, album: string): boolean {
  const artistLower = artist.toLowerCase();
  const albumLower = album.toLowerCase();

  return ALBUM_ARTWORK_BLOCKLIST.some(
    blocked =>
      blocked.artist.toLowerCase() === artistLower &&
      blocked.album.toLowerCase() === albumLower
  );
}

/**
 * Fetch the most recent track for a LastFM user
 */
export async function getRecentTrack(
  username: string
): Promise<LastFMTrack | null> {
  const apiKey = 'c3d5cf45ea0b15fd91993cf6846ab664';
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const track = data.recenttracks.track[0];

    const artist = track.artist['#text'];
    const album = track.album['#text'];
    const albumImage = track.image[3]['#text']; // extralarge image

    // Check if album is in the blocklist and use fallback if needed
    const isBlocked = isAlbumBlocked(artist, album);
    const imageUrl = isBlocked ? '' : albumImage;

    return {
      artist,
      name: track.name,
      album,
      url: track.url,
      image: imageUrl,
      nowPlaying: track['@attr']?.nowplaying === 'true',
    };
  } catch (error) {
    console.error('Error fetching LastFM data:', error);
    return null;
  }
}
