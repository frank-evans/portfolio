import { musicInit } from './musicInit.js';

// set up sound effects
export function Sound(src, maxStreams = 1, vol = 1.0) {
    this.streamNum = 0;
    this.streams = [];
    for (var i = 0; i < maxStreams; i++) {
        this.streams.push(new Audio(src));
        this.streams[i].volume = vol;
    }

    this.play = function() {
        this.streamNum = (this.streamNum +1) % maxStreams;
        this.streams[this.streamNum].play();
    }

    this.stop = function() {
        this.streams[this.streamNum].pause();
        this.streams[this.streamNum].currentTime = 0;
    }
}
export const audioMusic = new Audio("./sounds/audioMusic.mp3");
    audioMusic.volume = (0.3);
    audioMusic.autoplay = true;
    audioMusic.muted = true;
    audioMusic.loop = true;

export const musicToggle = document.addEventListener('DOMContentLoaded', function() {
	
    const music = document.getElementById('music');

    music.onclick = () => {

        // if muted
        if (audioMusic.muted == true) {
            if (musicInit.stat == false) {
                audioMusic.load();
                musicInit.stat = true;
            }
            // update music !mute image
            music.src = "./static/mNote.png";
            // play music
            audioMusic.play();
            audioMusic.muted = false;

        // if playing
        } else if (audioMusic.muted == false) {
            // update music mute image
            music.src = "./static/mNoteRed.png";
            // pause music
            audioMusic.pause();
            audioMusic.muted = true;
        }
    }
});