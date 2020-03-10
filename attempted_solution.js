// const spotifyPlaylist = require('./sample_spotify_res');
// const applePlaylist = require('./sample_apple_res');
const playlistAPIUtil = require('./playlist_api_util');

const fetchRandomData = async () => {

  try {

    const todoRes = fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const postRes = fetch("https://jsonplaceholder.typicode.com/posts/1");

    const todo = await todoRes;
    const post = await postRes;
    // const todo = await todoRes.json();
    // const post = await postRes.json();

    return [await todo.json(), await post.json()];

    // return await Promise.all([
    //   fetch("https://jsonplaceholder.typicode.com/todos/1").then(res =>
    //     res.json()
    //   ),
    //   fetch("https://jsonplaceholder.typicode.com/posts/1").then(res =>
    //     res.json()
    //   )
    // ]);

  } catch (error) {
    console.log(error);
    return null;
  }

}

const tracksInCommon = async (spotifyPlaylistId, applePlaylistId) => {

  const [spotifyPlaylist, applePlaylist] = await Promise.all([
    playlistAPIUtil.fetchSpotifyPlaylist(spotifyPlaylistId),
    playlistAPIUtil.fetchApplePlaylist(applePlaylistId)
  ]);

  // Error-handling in case either API request fails
  if (!spotifyPlaylist.tracks || !applePlaylist.data[0]) {
    console.log("fetchSpotifyPlaylist return value:", spotifyPlaylist);
    console.log("fetchApplePlaylist return value:", applePlaylist);
    return null;
  }

  // const [randomTodo, randomPost] = await Promise.all([
    //   playlistAPIUtil.fetchRandomTodo(),
    //   playlistAPIUtil.fetchRandomPost()
    // ]);

    // console.log(randomTodo);
    // console.log(randomPost);

  const spotifyTracks = spotifyPlaylist.tracks.items;
  const spotifyTracksISRCs = new Set();

  spotifyTracks.forEach(spotifyTrack => {
    spotifyTracksISRCs.add(spotifyTrack.track.external_ids.isrc);
  })
  
  const appleTracks = applePlaylist.data[0].relationships.tracks.data;
  
  let count = 0;

  appleTracks.forEach(appleTrack => {
    if (spotifyTracksISRCs.has(appleTrack.attributes.isrc)) {
      count++;
    };
  })

  return count;

}

tracksInCommon('214235', '325235234');







