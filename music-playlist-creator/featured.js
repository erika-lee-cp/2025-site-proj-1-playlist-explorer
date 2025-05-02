
fetch(
    'http://localhost:5500/music-playlist-creator/data/data.json')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
            const featured = document.getElementById("featured-img");
            const idx =  Math.floor(Math.random() * data.playlists.length);
            const playlist = data.playlists[idx];
            featured.src = playlist.playlist_art;
            drawSongs(playlist.songs);
      })
      .catch(error => {
        console.error('There was a problem:', error);
      });

const drawSongs = (songsList) => {
    const songsContainer = document.getElementById("songs-container");
    songsContainer.innerHTML = '';
    for(const song of songsList) {
        let songsEl = document.createElement('div');
        songsEl.className = "song-item";
        songsEl.innerHTML = 
                `<img class="song-img" src=${song.art}>
                <div class="song-title-container">
                    <h1 class="song-title">${song.title}</h1>
                    <div class="song-artist">${song.artist}</div>    
                    <div class="song-album">${song.album}</div>    
                </div>
                <div class="duration">${song.duration}</div>`;
            songsContainer.appendChild(songsEl);  
    }
}