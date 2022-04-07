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

        <!--for record-->
        <audio controls></audio>

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
            // audio is true, for recording
            let audioIN = { audio: true };

            // Access the permission for use of microphone
            navigator.mediaDevices
                .getUserMedia(audioIN)

                // 'then()' method returns a Promise
                .then(function (mediaStreamObj) {
                    // Connect the media stream to the first audio element
                    let audio = document.querySelector("audio");
                    // 2nd audio tag for play the audio
                    let audioPlayer = document.getElementById("audioPlay");

                    let startRecord = document.getElementById("btnRecord"),
                        stopRecord = document.getElementById("btnStop"),
                        playBtn = document.getElementById("btnPlay");

                    // 'srcObject' is a property which takes the media object
                    // This is supported in the newer browsers
                    if ("srcObject" in audio) {
                        audio.srcObject = mediaStreamObj;
                    } else {
                        // Old version
                        audio.src = window.URL.createObjectURL(mediaStreamObj);
                    }

                    // It will play the audio
                    audio.onloadedmetadata = function () {
                        // Play the audio in the 2nd audio element what is being recorded
                        playBtn.addEventListener("click", () => {
                            audioPlayer.play();
                        });
                    };

                    // This is the main thing to recorded the audio 'MediaRecorder' API
                    let mediaRecorder = new MediaRecorder(mediaStreamObj);

                    // Start Record
                    startRecord.addEventListener("click", function () {
                        mediaRecorder.start();
                        console.log(mediaRecorder.state);
                    });

                    // Stop event
                    stopRecord.addEventListener("click", function () {
                        mediaRecorder.stop();
                        console.log(mediaRecorder.state);
                    });

                    // If audio data available then push it to the chunk array
                    mediaRecorder.ondataavailable = function (ev) {
                        dataArray.push(ev.data);
                    };

                    // Chunk array to store the audio data
                    let dataArray = [];

                    // Convert the audio data in to blob after stopping the recording
                    mediaRecorder.onstop = function () {
                        // blob of type mp3
                        let audioData = new Blob(dataArray, {
                            type: "audio/mp3;",
                        });

                        // After fill up the chunk array make it empty
                        dataArray = [];

                        // Creating audio url with reference of created blob named 'audioData'
                        let audioSrc = window.URL.createObjectURL(audioData);

                        // Pass the audio url to the 2nd video tag
                        audioPlayer.src = audioSrc;
                    };
                })

                // If any error occurs then handles the error
                .catch(function (err) {
                    console.log(err.name, err.message);
                });
        },
    },

    mounted() {
        this.initializeRecording();
    },
};
</script>

<style lang="scss" scoped>
.record p {
    color: #fff;
    font-size: 15px;
}

.record_action_buttons {
    display: flex;
    margin-bottom: 1.5rem;

    & .btn {
        display: flex;
        align-items: center;
        font-size: 14px;

        svg {
            fill: #fff;
            height: 16px;
            width: 16px;
            margin-right: 0.25rem;
        }

        span {
            opacity: 0.55;
        }
    }
}
</style>