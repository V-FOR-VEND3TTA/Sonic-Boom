let previous = document.querySelector("#pre");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let title = document.querySelector("#title");
let recentVolume = document.querySelector("#volume");
let volumeShow = document.querySelector("#volume_show");
let slider = document.querySelector("#duration_slider");
let showDuration = document.querySelector("#show_duration");
let trackImage = document.querySelector("#track_image");
let autoPlay = document.querySelector("#auto");
let present = document.querySelector("#present");
let total = document.querySelector("#total");
let artist = document.querySelector("#artist");

let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

let track = document.createElement("audio");

// All songs list
let All_songs = [
  {
    name: "D.R.U.G.S.",
    path: "music/Ab-Soul ft Mac Miller - D.R.U.G.S..mp3",
    img: "img/absoul_dwtw.jpeg",
    singer: "Ab-Soul ft Mac Miller",
  },
  {
    name: "Trippy",
    path: "music/Anderson Paak. - Trippy (feat. J. Cole).mp3",
    img: "img/Oxnard_alternate.jpeg",
    singer: "Anderson Paak. ft J. Cole",
  },
  {
    name: "Too High To Riot",
    path: "music/Bas - Too High To Riot.mp3",
    img: "img/images-4.jpeg",
    singer: "Bas",
  },
  {
    name: "January 28th",
    path: "music/J Cole - January 28th.mp3",
    img: "img/ForestHillsDrive.jpeg",
    singer: "J. Cole",
  },
  {
    name: "Way Back",
    path: "music/Travis Scott - Way Back (Ft. Kid Cudi).mp3",
    img: "img/binttsm.jpeg",
    singer: "Travis Scott ft Kid Cudi",
  },
];

// A function to load the track
function loadTrack(index_no) {
  clearInterval(timer);
  resetSlider();
  track.src = All_songs[index_no].path;
  title.innerHTML = All_songs[index_no].name;
  trackImage.src = All_songs[index_no].img;
  artist.innerHTML = All_songs[index_no].singer;
  track.load();

  total.innerHTML = All_songs.length;
  present.innerHTML = index_no + 1;
  timer = setInterval(range_slider, 1000);
}

loadTrack(index_no);

// Mute Sound
function muteSound() {
  track.volume = 0;
  volume.value = 0;
  volumeShow.innerHTML = 0;
}

// Reset song slider on song change
function resetSlider() {
  slider.value = 0;
}

function justPlay() {
  if (playing_song == false) {
    playSong();
  } else {
    pauseSong();
  }
}

// Play the song
function playSong() {
  track.play();
  playing_song = true;
  play.innerHTML = '<i class="fa fa-pause"></i>';
}

// Pause the song
function pauseSong() {
  track.pause();
  playing_song = false;
  play.innerHTML = '<i class="fa fa-play"></i>';
}

// Play the next song
function nextSong() {
  if (index_no < All_songs.length - 1) {
    index_no += 1;
    loadTrack(index_no);
    playSong();
  } else {
    index_no = 0;
    loadTrack(index_no);
    playSong();
  }
}

// Play the previous song
function previousSong() {
  if (index_no > 0) {
    index_no -= 1;
    loadTrack(index_no);
    playSong();
  } else {
    index_no = All_songs.length;
    loadTrack(index_no);
    playSong();
  }
}

// Changing the volume
function volumeChange() {
  volumeShow.innerHTML = recentVolume.value;
  track.volume = recentVolume.value / 100;
}

// Change slide position
function changeDuration() {
  slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}

// Autoplay function
function autoPlaySwitch() {
  if (autoplay == 1) {
    autoplay = 0;
    auto.style.background = "rgba(255, 255, 255, 0.2)";
  } else {
    autoplay = 1;
    auto.style.background = "#FF8A65";
  }
}

function rangeSlider() {
  let position = 0;
  // update slider position
  if (!isNaN(track.duration)) {
    position = track.currentTime * (100 / track.duration);
    slider.value = position;
  }

  // function will run when the song is over
  if (track.ended) {
    if (track.ended) {
      play.innerHTML = '<i class="fa fa-play"></i>';
      if (autoplay == 1) {
        index_no += 1;
        loadTrack(index_no);
        playSong();
      }
    }
  }
}
