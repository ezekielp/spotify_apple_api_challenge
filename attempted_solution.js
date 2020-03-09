const spotifyPlaylist = require('./sample_spotify_res_2');
const applePlaylist = require('./sample_apple_res');
const fetch = require("node-fetch");

const fetchRandomData = async () => {

  try {

    // const todoRes = await fetch(
    //   "https://jsonplaceholder.typicode.com/todos/1"
    // );
    // const todo = await todoRes.json();

    // const postRes = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    // const post = await postRes.json()

    // return [todo, post];

    return await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos/1").then(res =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/posts/1").then(res =>
        res.json()
      )
    ]);

  } catch (error) {
    console.log(error);
    return null;
  }

}

const fetchPlaylists = async (spotifyPlaylistId, applePlaylistId) => {
  try {
    return await Promise.all([
      fetch(
        `https://api.spotify.com/v1/playlists/${spotifyPlaylistId}`
      ).then(res => res.json()),
      fetch(
        `https://api.music.apple.com/v1/catalog/us/playlists/${applePlaylistId}`
      ).then(res => res.json())
    ]);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const tracksInCommon = async (spotifyPlaylistId, applePlaylistId) => {

  let result = 0;
  // const [spotifyPlaylist, applePlaylist] = await fetchPlaylists(spotifyPlaylistId, applePlaylistId);

  const spotifyTracks = spotifyPlaylist.tracks.tracks.items;
  const spotifyTracksISRCs = new Set();

  spotifyTracks.forEach(spotifyTrack => {
    // console.log(spotifyTrack.track.external_ids.isrc);
    spotifyTracksISRCs.add(spotifyTrack.track.external_ids.isrc);
  })
  
  const appleTracks = applePlaylist.tracks.data[0].relationships.tracks.data;
  
  appleTracks.forEach(appleTrack => {
    // console.log(appleTrack.attributes.isrc);
    if (spotifyTracksISRCs.has(appleTrack.attributes.isrc)) {
      result++;
    };
  })

  return result;

}

// tracksInCommon();







