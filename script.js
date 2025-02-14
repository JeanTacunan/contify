let currentSongIndex = 0;
let songs = [];
let favorites = new Set();

function toggleSongs(albumId) {
    const songList = document.getElementById(albumId);
    if (songList.style.display === "none" || songList.style.display === "") {
        songList.style.display = "block";
    } else {
        songList.style.display = "none";
    }
}

function playSong(songPath) {
    const audioPlayer = document.getElementById('audioPlayer');
    const currentSongElement = document.getElementById('currentSong');
    audioPlayer.src = songPath;
    audioPlayer.play();
    updateCurrentSongIndex(songPath);
    currentSongElement.textContent = `Reproduciendo: ${songPath.split('/').pop().split('.')[0]}`;
}

function updateCurrentSongIndex(songPath) {
    songs = Array.from(document.querySelectorAll('.song-list li')).map(li => li.getAttribute('onclick').match(/'([^']+)'/)[1]);
    currentSongIndex = songs.indexOf(songPath);
}

document.getElementById('prev').addEventListener('click', () => {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        playSong(songs[currentSongIndex]);
    }
});

document.getElementById('playPause').addEventListener('click', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
        playSong(songs[currentSongIndex]);
    }
});

document.getElementById('shuffle').addEventListener('click', () => {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    playSong(songs[currentSongIndex]);
});

document.getElementById('addToFavorites').addEventListener('click', () => {
    const currentSong = songs[currentSongIndex];
    const favoritesList = document.querySelector('.favorites-list');
    if (favorites.has(currentSong)) {
        favorites.delete(currentSong);
        const favoriteItem = favoritesList.querySelector(`a[onclick="playSong('${currentSong}')"]`).parentElement;
        favoritesList.removeChild(favoriteItem);
    } else {
        favorites.add(currentSong);
        const newFavorite = document.createElement('li');
        newFavorite.innerHTML = `<a href="#" onclick="playSong('${currentSong}')">${currentSong.split('/').pop().split('.')[0]}</a>`;
        favoritesList.appendChild(newFavorite);
    }
});

function showFavorites() {
    const albumList = document.querySelector('.album-list');
    const favoritesList = document.querySelector('.favorites-list');
    if (favoritesList.style.display === "none" || favoritesList.style.display === "") {
        favoritesList.style.display = "block";
        albumList.style.display = "none";
    } else {
        favoritesList.style.display = "none";
        albumList.style.display = "flex";
    }
}