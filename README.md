# Stationhead backend coding challenge

## Pull request: Create tracksInCommon function to check number of tracks in common between an Apple and a Spotify playlist

This pull request adds a function, `tracksInCommon(spotifyPlaylistId, applePlaylistId)`, that counts the number of tracks in common between a Spotify playlist and an Apple playlist. The function first makes API calls to the Spotify and Apple Music APIs, then iterates over the ISRCs for each track in the two playlists and compares them. Sample API responses taken from the API reference docs for each service are also provided for offline testing purposes.