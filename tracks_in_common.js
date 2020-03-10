const { fetchApplePlaylist, fetchSpotifyPlaylist } = require('./playlist_api_util');

// Can load sample API responses below for offline testing purposes
// const applePlaylist = require('./sample_apple_res');
// const spotifyPlaylist = require('./sample_spotify_res');

const tracksInCommon = async (spotifyPlaylistId, applePlaylistId) => {

  // Fetch each playlist in parallel
  const [spotifyPlaylist, applePlaylist] = await Promise.all([
    fetchSpotifyPlaylist(spotifyPlaylistId),
    fetchApplePlaylist(applePlaylistId)
  ]);

  // Error-logging in case either API request fails
  if (!spotifyPlaylist.tracks || !applePlaylist.data[0]) {
    console.log("fetchSpotifyPlaylist return value:", spotifyPlaylist);
    console.log("fetchApplePlaylist return value:", applePlaylist);
    return null;
  };

  const spotifyTracks = spotifyPlaylist.tracks.items;
  const spotifyTracksISRCs = new Set();

  // Add each track's ISRC to the set created above
  spotifyTracks.forEach(spotifyTrack => {
    spotifyTracksISRCs.add(spotifyTrack.track.external_ids.isrc);
  })
  
  const appleTracks = applePlaylist.data[0].relationships.tracks.data;
  
  let count = 0;

  // Check how many tracks in the Apple playlist are in the Spotify ISRC set
  appleTracks.forEach(appleTrack => {
    if (spotifyTracksISRCs.has(appleTrack.attributes.isrc)) {
      count++;
    };
  })

  return count;

}

module.exports = tracksInCommon;