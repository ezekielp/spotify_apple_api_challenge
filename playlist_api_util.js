const fetch = require("node-fetch");

const fetchSpotifyPlaylist = async playlistId => {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}`
    );

    return await response.json();
    
  } catch(err) {
    console.log(err);
    return null;
  }
}

const fetchApplePlaylist = async playlistId => {
  try {
    const response = await fetch(
      `https://api.music.apple.com/v1/catalog/us/playlists/${playlistId}`
    );

    return await response.json();

  } catch(err) {
    console.log(err);
    return null;
  }
}

const fetchRandomTodo = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    return await response.json();
  } catch(err) {
    console.log(err);
    return null;
  }
}

const fetchRandomPost = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    return await response.json();
  } catch(err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  fetchSpotifyPlaylist,
  fetchApplePlaylist,
  fetchRandomTodo,
  fetchRandomPost
}