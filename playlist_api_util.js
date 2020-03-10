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

module.exports = {
  fetchSpotifyPlaylist,
  fetchApplePlaylist
}