const songs = [
  {
    name: "Song 1",
    src: "songs/song1.mp3",
    cover: "images/cover1.jpg",
    category: "Pop"
  },
  {
    name: "Song 2",
    src: "songs/song2.mp3",
    cover: "images/cover2.jpg",
    category: "Rock"
  }
];

let currentIndex = 0;

const audio = document.getElementById("audio");
const playlist = document.getElementById("playlist");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const search = document.getElementById("search");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

// Load Playlist
function loadSongs(list) {
  playlist.innerHTML = "";
  list.forEach((song, index) => {
    const div = document.createElement("div");
    div.classList.add("song");
    div.innerText = song.name + " (" + song.category + ")";
    div.onclick = () => selectSong(index);
    playlist.appendChild(div);
  });
}

function selectSong(index) {
  currentIndex = index;
  const song = songs[index];

  audio.src = song.src;
  title.innerText = song.name;
  cover.src = song.cover;

  audio.play();
}

function playSong() {
  audio.play();
}

function pauseSong() {
  audio.pause();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  selectSong(currentIndex);
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  selectSong(currentIndex);
}

// Progress Bar
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Search
search.addEventListener("keyup", () => {
  const filtered = songs.filter(song =>
    song.name.toLowerCase().includes(search.value.toLowerCase())
  );
  loadSongs(filtered);
});

// Load initial songs
loadSongs(songs);