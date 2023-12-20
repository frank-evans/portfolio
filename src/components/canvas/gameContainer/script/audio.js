// set up sound effects
function Sound(src, maxStreams = 1, vol = 1.0) {
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

// Reference only **************************************************************************
function update() {
    // when keydown Up/Down thrust/stop the ship.  ship.thrusting set to true/false.
    if (ship.thrusting) {
        fxThrust.play();
    } else {
        fxThrust.stop();
    }
}

export { Sound };