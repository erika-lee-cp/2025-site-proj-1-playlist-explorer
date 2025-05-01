// JavaScript for Opening and Closing the Modal
var modal = document.getElementById("playlist-modal");
var span = document.getElementsByClassName("close")[0];

function openModal(playlist) {
    console.log(playlist)
    document.getElementById('playlist-title').innerText = playlist.playlist_name;
    document.getElementById('playlist-creator').innerText = playlist.playlist_author;
    document.getElementById('playlist-cover-img').src = playlist.playlist_art;

    const songsContainer = document.getElementsByClassName("songs-container")[0];
    for(const song of playlist.songs) {
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
   modal.style.display = "block";
}

span.onclick = function() {
   modal.style.display = "none";
}
window.onclick = function(event) {
   if (event.target == modal) {
      modal.style.display = "none";
   }
}

fetch(
    'http://localhost:5500/music-playlist-creator/data/data.json')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const mainContainer = document.getElementsByClassName("playlist-cards")[0];
        for (const playlist of data.playlists) {
            let playlistContainer = document.createElement('div');
            playlistContainer.className = "playlist-card";
            playlistContainer.innerHTML = 
            `<img class="playlist-img" src="${playlist.playlist_art}"/>
                <div class="playlist-text">
                    <div class="bold">${playlist.playlist_name}</div>
                    <div>${playlist.playlist_author}</div>
                    <div>
                        <img class="like-button" src="assets/heart.svg"/>
                        <span>5</span>
                    </div>
                </div>`;
            playlistContainer.addEventListener('click', () => {
                openModal(playlist);
            });
            mainContainer.appendChild(playlistContainer);
        }
      })
      .catch(error => {
        console.error('There was a problem:', error);
      });
