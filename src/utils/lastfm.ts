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
 * Sanitize the track name to keep it PG
 */
function sanitizeTrackName(name: string): string {
  const curseWords = [
    'fuck',
    'shit',
    'bitch',
    'cunt',
    'cock',
    'dick',
    'asshole',
    'ass',
    'pussy',
    'bastard',
    'nigger',
    'nigga',
    'cum',
    'titties',
    'whore',
    'faggot',
    'dyke',
    'tranny',
    'retard',
  ];

  // Censor curse words
  return name.replace(new RegExp(`(${curseWords.join('|')})`, 'gi'), match => {
    if (match.length <= 3) {
      // For 3 or fewer characters, replace all but the first letter
      return match.charAt(0) + '*'.repeat(match.length - 1);
    } else {
      // For 4+ characters, keep first and last, replace middle
      return (
        match.charAt(0) +
        '*'.repeat(match.length - 2) +
        match.charAt(match.length - 1)
      );
    }
  });
}

/**
 * Fetch the most recent track for a LastFM user
 */
export async function getRecentTrack(
  username: string
): Promise<LastFMTrack | null> {
  const apiKey = 'c3d5cf45ea0b15fd91993cf6846ab664';
  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1&extended=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const track = data.recenttracks.track[0];

    const artist = track.artist['name'];
    const album = track.album['#text'];
    const albumImage = track.image[3]['#text']; // extralarge image

    return {
      artist,
      name: sanitizeTrackName(track.name),
      album,
      url: track.url,
      image: albumImage,
      nowPlaying: track['@attr']?.nowplaying === 'true',
    };
  } catch (error) {
    console.error('Error fetching LastFM data:', error);
    return null;
  }
}

/**
 * Check if an album has the "nsfw cover art" tag on Last.fm
 * Checks user-specific tags for the given album
 */
export async function checkNSFWTag(
  artist: string,
  album: string,
  username: string
): Promise<boolean> {
  if (!artist || !album) return false;

  const apiKey = 'c3d5cf45ea0b15fd91993cf6846ab664';
  const url = `https://ws.audioscrobbler.com/2.0/?method=album.gettags&artist=${encodeURIComponent(
    artist
  )}&album=${encodeURIComponent(
    album
  )}&api_key=${apiKey}&format=json&user=${username}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Check if tags exist and are in an array
    const tags = data.tags?.tag;
    if (!tags) return false;

    // Handle both single tag object and array of tags
    const tagArray = Array.isArray(tags) ? tags : [tags];

    // Check if any tag matches "nsfw cover art"
    return tagArray.some(
      (tag: any) => tag.name?.toLowerCase() === 'nsfw cover art'
    );
  } catch (error) {
    console.error('Error checking Last.fm NSFW tag:', error);
    return true; // Fail safe: hide artwork if check fails
  }
}
