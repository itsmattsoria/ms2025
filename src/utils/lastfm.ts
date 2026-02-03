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
  mbid: string | null;
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
    const albumMbid = track.album.mbid || null; // Extract album MBID

    return {
      artist,
      name: track.name,
      album,
      url: track.url,
      image: albumImage,
      nowPlaying: track['@attr']?.nowplaying === 'true',
      mbid: albumMbid,
    };
  } catch (error) {
    console.error('Error fetching LastFM data:', error);
    return null;
  }
}

/**
 * Check if an album has the "nsfw cover art" tag on MusicBrainz
 * Checks both community tags and user-specific tags (if credentials provided)
 */
export async function checkNSFWTag(mbid: string): Promise<boolean> {
  if (!mbid) return false;

  try {
    // First, check public community tags (no auth required)
    const publicResponse = await fetch(
      `https://musicbrainz.org/ws/2/release/${mbid}?fmt=json&inc=tags`,
      {
        headers: {
          'User-Agent': 'ms2025-website/1.0 (https://mattsoria.com)',
        },
      }
    );

    if (publicResponse.ok) {
      const publicData = await publicResponse.json();
      const tags = publicData['tags'] || [];

      const hasPublicNSFWTag = tags.some(
        (tag: any) => tag.name.toLowerCase() === 'nsfw cover art'
      );

      if (hasPublicNSFWTag) {
        return true;
      }
    }

    // Then check user-specific tags (requires auth)
    const username = import.meta.env.MUSICBRAINZ_USERNAME;
    const password = import.meta.env.MUSICBRAINZ_PASSWORD;

    if (username && password) {
      const userResponse = await fetch(
        `https://musicbrainz.org/ws/2/release/${mbid}?fmt=json&inc=user-tags`,
        {
          headers: {
            'User-Agent': 'ms2025-website/1.0 (https://mattsoria.com)',
            Authorization: 'Basic ' + btoa(`${username}:${password}`),
          },
        }
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();
        const userTags = userData['user-tags'] || [];

        return userTags.some(
          (tag: any) => tag.name.toLowerCase() === 'nsfw cover art'
        );
      }
    }

    // If no NSFW tag found in either place, allow artwork
    return false;
  } catch (error) {
    console.error('Error checking MusicBrainz NSFW tag:', error);
    return true; // Fail safe: hide artwork if check fails
  }
}
