const tracksInCommon = (spotifyPlaylistId, applePlaylistId) => {

  const [spotifyPlaylist, applePlaylist] = fetchPlaylists(spotifyPlaylistId, applePlaylistId);

  
  


}

async const fetchPlaylists = (spotifyPlaylistId, applePlaylistId) => {
  return await Promise.all([
    fetch(`https://api.spotify.com/v1/playlists/${spotifyPlaylistId}`),
    fetch(`https://api.music.apple.com/v1/catalog/us/playlists/${applePlaylistId}`)
  ])
}



