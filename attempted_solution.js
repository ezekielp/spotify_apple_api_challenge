const spotifyPlaylist = require('./sample_spotify_res_2');
const applePlaylist = require('./sample_apple_res');

const tracksInCommon = (spotifyPlaylistId, applePlaylistId) => {

  let result = 0;
  // const [spotifyPlaylist, applePlaylist] = fetchPlaylists(spotifyPlaylistId, applePlaylistId);

  const spotifyTracks = spotifyPlaylist.tracks.tracks.items;
  const spotifyTracksISRCs = new Set();

  spotifyTracks.forEach(spotifyTrack => {
    console.log(spotifyTrack.track.external_ids.isrc);
    spotifyTracksISRCs.add(spotifyTrack.track.external_ids.isrc);
  })
  
  const appleTracks = applePlaylist.tracks.data[0].relationships.tracks.data;
  
  appleTracks.forEach(appleTrack => {
    console.log(appleTrack.attributes.isrc);
    if (spotifyTracksISRCs.has(appleTrack.attributes.isrc)) {
      result++;
    };
  })

  return result;

}

// tracksInCommon();

const fetchPlaylists = async (spotifyPlaylistId, applePlaylistId) => {
  return await Promise.all([
    fetch(`https://api.spotify.com/v1/playlists/${spotifyPlaylistId}`),
    fetch(`https://api.music.apple.com/v1/catalog/us/playlists/${applePlaylistId}`)
  ])
}



