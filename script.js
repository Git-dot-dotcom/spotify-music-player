
// ==========================================
// SPOTIFY MUSIC PLAYER JAVASCRIPT
// ==========================================


// Get HTML elements

var audioPlayer = document.getElementById("audioPlayer");

var playButton = document.getElementById("playButton");

var previousButton = document.getElementById("previousButton");

var nextButton = document.getElementById("nextButton");

var progressBar = document.getElementById("progressBar");

var volumeBar = document.getElementById("volumeBar");

var currentTime = document.getElementById("currentTime");

var totalTime = document.getElementById("totalTime");

var songTitle = document.getElementById("songTitle");

var songArtist = document.getElementById("songArtist");

var albumImage = document.getElementById("albumImage");

var likeButton = document.getElementById("likeButton");

var searchInput = document.getElementById("searchInput");


// ==========================================
// SONG LIST
// ==========================================

var songs = [

    {
        title: "Daylight",
        artist: "David Kushner",
        image: "icon/card3img.jpeg",
        file: "songs/song1.mp3"
    },

    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        image: "icon/card3img.jpeg",
        file: "songs/song2.mp3"
    },

    {
        title: "Perfect",
        artist: "Ed Sheeran",
        image: "icon/card4img.jpeg",
        file: "songs/song3.mp3"
    },

    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        image: "icon/card2img.jpeg",
        file: "songs/song4.mp3"
    },

    {
        title: "Starboy",
        artist: "The Weeknd",
        image: "icon/card3img.jpeg",
        file: "songs/song5.mp3"
    }

];


// Current song number

var currentSong = 0;


// ==========================================
// LOAD SONG
// ==========================================

function loadSong(index) {

    currentSong = index;

    var song = songs[currentSong];

    songTitle.innerText = song.title;

    songArtist.innerText = song.artist;

    albumImage.src = song.image;

    audioPlayer.src = song.file;

    progressBar.value = 0;

    currentTime.innerText = "00:00";

    totalTime.innerText = "00:00";
}


// ==========================================
// PLAY SONG
// ==========================================

function playSong() {

    audioPlayer.play();

    playButton.innerHTML =
        '<i class="fa-solid fa-pause"></i>';
}


// ==========================================
// PAUSE SONG
// ==========================================

function pauseSong() {

    audioPlayer.pause();

    playButton.innerHTML =
        '<i class="fa-solid fa-play"></i>';
}


// ==========================================
// PLAY / PAUSE
// ==========================================

playButton.addEventListener("click", function () {

    if (audioPlayer.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// ==========================================
// NEXT SONG
// ==========================================

nextButton.addEventListener("click", function () {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// ==========================================
// PREVIOUS SONG
// ==========================================

previousButton.addEventListener("click", function () {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

});


// ==========================================
// SONG ENDED
// ==========================================

audioPlayer.addEventListener("ended", function () {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

});


// ==========================================
// UPDATE PROGRESS BAR
// ==========================================

audioPlayer.addEventListener("timeupdate", function () {

    if (audioPlayer.duration) {

        var progress =
            (audioPlayer.currentTime / audioPlayer.duration) * 100;

        progressBar.value = progress;

        currentTime.innerText =
            formatTime(audioPlayer.currentTime);

        totalTime.innerText =
            formatTime(audioPlayer.duration);

    }

});


// ==========================================
// CHANGE SONG POSITION
// ==========================================

progressBar.addEventListener("input", function () {

    if (audioPlayer.duration) {

        audioPlayer.currentTime =
            (progressBar.value / 100) *
            audioPlayer.duration;

    }

});


// ==========================================
// VOLUME CONTROL
// ==========================================

audioPlayer.volume = 0.8;

volumeBar.addEventListener("input", function () {

    audioPlayer.volume =
        volumeBar.value / 100;

    updateVolumeIcon();

});


// ==========================================
// VOLUME ICON
// ==========================================

function updateVolumeIcon() {

    var volumeIcon =
        document.getElementById("volumeIcon");

    if (audioPlayer.volume == 0) {

        volumeIcon.className =
            "fa-solid fa-volume-xmark sound-control";

    }

    else if (audioPlayer.volume < 0.5) {

        volumeIcon.className =
            "fa-solid fa-volume-low sound-control";

    }

    else {

        volumeIcon.className =
            "fa-solid fa-volume-high sound-control";

    }

}


// ==========================================
// LIKE BUTTON
// ==========================================

likeButton.addEventListener("click", function () {

    if (likeButton.classList.contains("fa-regular")) {

        likeButton.classList.remove("fa-regular");

        likeButton.classList.add("fa-solid");

        likeButton.style.color = "#1ed760";

    }

    else {

        likeButton.classList.remove("fa-solid");

        likeButton.classList.add("fa-regular");

        likeButton.style.color = "white";

    }

});


// ==========================================
// CARD PLAY BUTTON
// ==========================================

var musicCards =
    document.querySelectorAll(".music-card");


musicCards.forEach(function (card) {

    card.addEventListener("click", function (event) {

        // Don't run twice when play button is clicked

        if (event.target.closest(".play-card")) {

            return;

        }

        var title =
            card.getAttribute("data-song");

        var artist =
            card.getAttribute("data-artist");

        var image =
            card.getAttribute("data-image");

        var songFile =
            card.getAttribute("data-songfile");


        songTitle.innerText = title;

        songArtist.innerText = artist;

        albumImage.src = image;

        audioPlayer.src = songFile;

        audioPlayer.play();


        playButton.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

    });

});


// ==========================================
// CARD PLAY BUTTON
// ==========================================

var playCards =
    document.querySelectorAll(".play-card");


playCards.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.stopPropagation();

        var card =
            button.closest(".music-card");

        var title =
            card.getAttribute("data-song");

        var artist =
            card.getAttribute("data-artist");

        var image =
            card.getAttribute("data-image");

        var songFile =
            card.getAttribute("data-songfile");


        songTitle.innerText = title;

        songArtist.innerText = artist;

        albumImage.src = image;

        audioPlayer.src = songFile;

        audioPlayer.play();


        playButton.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

    });

});


// ==========================================
// SEARCH SONG
// ==========================================

searchInput.addEventListener("input", function () {

    var searchText =
        searchInput.value.toLowerCase();


    musicCards.forEach(function (card) {

        var title =
            card.getAttribute("data-song").toLowerCase();

        var artist =
            card.getAttribute("data-artist").toLowerCase();


        if (
            title.includes(searchText) ||
            artist.includes(searchText)
        ) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

});


// ==========================================
// CREATE PLAYLIST BUTTON
// ==========================================

document
    .getElementById("createPlaylist")
    .addEventListener("click", function () {

        alert(
            "Your new playlist has been created!"
        );

    });


// ==========================================
// BROWSE PODCAST BUTTON
// ==========================================

document
    .getElementById("browsePodcast")
    .addEventListener("click", function () {

        alert(
            "Podcast section will be available soon!"
        );

    });


// ==========================================
// ADD PLAYLIST ICON
// ==========================================

document
    .getElementById("addPlaylist")
    .addEventListener("click", function () {

        var playlistName =
            prompt("Enter playlist name:");

        if (playlistName != null &&
            playlistName != "") {

            alert(
                "Playlist '" +
                playlistName +
                "' created successfully!"
            );

        }

    });


// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(seconds) {

    var minutes =
        Math.floor(seconds / 60);

    var secondsRemaining =
        Math.floor(seconds % 60);


    if (secondsRemaining < 10) {

        secondsRemaining =
            "0" + secondsRemaining;

    }


    if (minutes < 10) {

        minutes = "0" + minutes;

    }


    return minutes + ":" + secondsRemaining;

}


// ==========================================
// LOAD FIRST SONG
// ==========================================

loadSong(0);
