<template>
    <div class="record">
        <p>Record and Play audio</p>

        <div class="record_action_buttons">
            <button id="btnRecord" class="btn btn-success me-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        d="M256 152a104 104 0 1 0 104 104 104 104 0 0 0-104-104zm0 128a24 24 0 1 1 24-24 24 24 0 0 1-24 24zm0-272C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 376a128 128 0 1 1 128-128 128 128 0 0 1-128 128z"
                    />
                </svg>
                <span>Record</span>
            </button>
            <button id="btnStop" class="btn btn-danger me-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                        d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"
                    />
                </svg>
                <span>Stop</span>
            </button>
            <button id="btnPlay" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                        d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                    />
                </svg>
                <span>Play</span>
            </button>
        </div>

        <!--for play the audio-->
        <audio id="audioPlay" controls></audio>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        initializeRecording() {
            const btnRecord = document.getElementById("btnRecord");
            const btnStop = document.getElementById("btnStop");
            const btnPlay = document.getElementById("btnPlay");

            const audioPlayer = document.getElementById("audioPlay");

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                console.log("getUserMedia supported.");
                navigator.mediaDevices
                    .getUserMedia({
                        audio: true,
                    })

                    // Success callback
                    .then(function (stream) {
                        const mediaRecorder = new MediaRecorder(stream);

                        btnRecord.onclick = function () {
                            mediaRecorder.start();

                            console.log(mediaRecorder.state);
                            console.log("recorder started");

                            btnRecord.style.background = "red";
                            btnRecord.style.color = "black";
                        };

                        let chunks = [];

                        mediaRecorder.ondataavailable = function (e) {
                            chunks.push(e.data);

                            btnPlay.onclick = function () {
                                audioPlayer.play();
                            };
                        };

                        btnStop.onclick = function () {
                            mediaRecorder.stop();

                            console.log(mediaRecorder.state);
                            console.log("recorder stopped");

                            btnRecord.style.background = "";
                            btnRecord.style.color = "";
                        };

                        mediaRecorder.onstop = function () {
                            console.log("recorder stopped");

                            const blob = new Blob(chunks, {
                                type: ["audio/ogg; audio/mp3; codecs=opus"],
                            });

                            chunks = [];
                            const audioURL = window.URL.createObjectURL(blob);
                            audioPlayer.src = audioURL;
                        };
                    })

                    // Error callback
                    .catch(function (err) {
                        console.log(`Error Type - ${err.name}: ${err.message}`);
                    });
            } else {
                console.log("getUserMedia not supported on your browser!");
            }
        },
    },

    mounted() {
        this.initializeRecording();
    },
};
</script>

<style lang="scss" scoped>
.record {
    width: 100%;

    p {
        color: #fff;
        font-size: 15px;
    }

    audio {
        width: 100%;
    }
}

.record_action_buttons {
    display: flex;
    margin-bottom: 1.5rem;

    & .btn {
        display: flex;
        align-items: center;
        font-size: 13px;

        svg {
            fill: #fff;
            height: 12px;
            width: 12px;
            margin-right: 0.25rem;
        }

        span {
            opacity: 0.55;
        }

        @media screen and (max-width: 426px) {
            & {
                width: 100%;
            }

            svg {
                height: 16px;
                width: 16px;
                margin: 0 auto;
            }
            span {
                display: none;
            }
        }
    }
}
</style>