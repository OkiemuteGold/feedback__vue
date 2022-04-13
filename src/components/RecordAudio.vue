<template>
    <div class="record">
        <!-- <p>Record and Play audio</p> -->

        <div v-if="!notAvailable">
            <div class="tab_item">
                <label for="name">Consumer name</label>
                <input
                    class="inputs form-control mb-0"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Please enter consumer name"
                    v-model="consumerName"
                    @input="uploadReferencePossible()"
                />
            </div>

            <div class="record_action_buttons">
                <button
                    id="btnRecord"
                    class="btn btn-primary me-2"
                    @click="changeRecordState($event)"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        id="btnRecordIcon"
                        @click="changeRecordState($event)"
                    >
                        <path
                            d="M256 152a104 104 0 1 0 104 104 104 104 0 0 0-104-104zm0 128a24 24 0 1 1 24-24 24 24 0 0 1-24 24zm0-272C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 376a128 128 0 1 1 128-128 128 128 0 0 1-128 128z"
                        />
                    </svg>
                    <span id="btnRecordText" @click="changeRecordState($event)"
                        >Record</span
                    >
                </button>
                <button
                    id="btnStop"
                    class="btn btn-danger me-2"
                    @click="changeRecordState($event)"
                    :disabled="notStartedRecording || stoppedRecording"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        id="btnStopIcon"
                    >
                        <path
                            d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"
                        />
                    </svg>
                    <span id="btnStopText">Stop</span>
                </button>
                <button
                    id="btnPlay"
                    class="btn btn-success"
                    @click="changeRecordState($event)"
                    :disabled="notStartedRecording || !stoppedRecording"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        id="btnPlayIcon"
                    >
                        <path
                            d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                        />
                    </svg>
                    <span id="btnPlayText">Play</span>
                </button>
            </div>

            <!--for play the audio-->
            <audio id="audioRecorder" muted></audio>
            <p id="record_state_message" v-if="nowRecording || isInvalidInput">
                {{ recordStateMessage }}
            </p>

            <audio id="audioPlayer" controls>
                Your browser does not support the <code>audio</code> element.
            </audio>

            <button
                type="submit"
                :disabled="!stoppedRecording || isInvalidInput"
                class="btn btn-success"
                @click="sendToFirebaseStorage()"
            >
                Upload Audio
            </button>
        </div>

        <p v-else>Not currently available</p>
    </div>
</template>

<script>
import "@/mixins";
import { db, fbase } from "../firebase";

export default {
    props: ["notAvailable"],

    data() {
        return {
            nowRecording: false,
            notStartedRecording: true,
            stoppedRecording: false,
            recordStateMessage: "",

            consumerName: "",
            recordedAudio: null,
            audioSize: "",
        };
    },

    computed: {
        isInvalidInput() {
            return this.consumerName == "";
        },
    },

    methods: {
        uploadReferencePossible() {
            if (this.consumerName == "") {
                this.recordStateMessage =
                    "Please enter a consumer name to upload.";
            } else {
                this.recordStateMessage = "";
            }
        },

        changeRecordState(event) {
            const audioPlayer = document.getElementById("audioPlayer");

            audioPlayer.addEventListener("ended", () => {
                // this.stoppedRecording = true;
                this.recordStateMessage =
                    "Please enter a consumer name to upload.";
            });

            let svgPath = event.target.parentElement.id;
            let id = event.target.id;
            this.nowRecording = true;

            if (
                id == "btnRecord" ||
                id == "btnRecordIcon" ||
                id == "btnRecordText" ||
                svgPath == "btnRecordIcon"
            ) {
                this.notStartedRecording = false;
                this.stoppedRecording = false;
                this.recordStateMessage = "Started recording!";
            } else if (
                id == "btnStop" ||
                id == "btnStopIcon" ||
                id == "btnStopText" ||
                svgPath == "btnStopIcon"
            ) {
                this.stoppedRecording = true;
                this.recordStateMessage = "Finished recording! Please upload.";
            } else if (
                id == "btnPlay" ||
                id == "btnPlayIcon" ||
                id == "btnPlayText" ||
                svgPath == "btnPlayIcon"
            ) {
                this.recordStateMessage = "Playing audio!";
            }
        },

        initializeRecording() {
            const btnRecord = document.getElementById("btnRecord");
            const btnStop = document.getElementById("btnStop");
            const btnPlay = document.getElementById("btnPlay");

            const audioRecorder = document.getElementById("audioRecorder");
            const audioPlayer = document.getElementById("audioPlayer");

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                console.log("getUserMedia supported.");
                navigator.mediaDevices
                    .getUserMedia({
                        audio: true,
                        video: false,
                    })

                    // Success callback
                    .then((stream) => {
                        if ("srcObject" in audioRecorder) {
                            audioRecorder.srcObject = stream;
                        } else {
                            // Old version
                            audioRecorder.src =
                                window.URL.createObjectURL(stream);
                        }

                        const mediaRecorder = new MediaRecorder(stream);

                        btnRecord.onclick = () => {
                            mediaRecorder.start();
                            // audioRecorder.play();

                            console.log(mediaRecorder.state);
                            console.log("recorder started");
                        };

                        let chunks = [];

                        mediaRecorder.ondataavailable = (e) => {
                            chunks.push(e.data);

                            this.recordedAudio = chunks[0];
                            this.audioSize = this.recordedAudio.size;
                            // console.log(this.recordedAudio, this.audioSize);

                            btnPlay.onclick = () => {
                                audioPlayer.play();
                            };
                        };

                        btnStop.onclick = () => {
                            mediaRecorder.stop();

                            console.log(mediaRecorder.state);
                            console.log("recorder stopped");
                        };

                        mediaRecorder.onstop = () => {
                            console.log("recorder stopped");

                            // type: ["audio/ogg; codecs=opus"],
                            const blob = new Blob(chunks, {
                                type: "audio/mp3",
                            });

                            chunks = [];
                            const audioURL = window.URL.createObjectURL(blob);
                            audioPlayer.src = audioURL;
                        };
                    })

                    // Error callback
                    .catch((err) => {
                        console.log(`Error Type - ${err.name}: ${err.message}`);
                    });
            } else {
                console.log("getUserMedia not supported on your browser!");
            }
        },

        sendToFirebaseStorage() {
            let audio = this.recordedAudio;
            let consumerName = this.consumerName;
            let audioPath = "RecordedFeedbacks/" + consumerName;

            var storageRef = fbase.storage().ref(audioPath);

            const metadata = {
                customMetadata: {
                    location: "Nigeria",
                    activity: `${consumerName}'s recorded feedback`,
                },
                contentType: "audio/mp3",
            };

            let uploadTask = storageRef.child("feedback").put(audio, metadata);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");

                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    uploadTask.snapshot.ref
                        .getDownloadURL()
                        .then((downloadUrl) => {
                            // this.audioUrl = downloadUrl;
                            // console.log("File available at", downloadUrl);

                            if (downloadUrl) {
                                this.addAudioFeedback(downloadUrl);
                            }
                        });
                }
            );
        },

        addAudioFeedback(downloadUrl) {
            let consumerName = this.consumerName;

            let recordedData = {
                ConsumerName: consumerName,
                Size: this.audioSize,
                DownloadUrl: downloadUrl,
                feedbackCreatedAt: this.convertEpochDate(new Date()),
            };

            console.log(recordedData);

            db.collection("RecordedFeedbacks/")
                .add(recordedData)
                .then((audioRef) => {
                    audioRef;
                    // console.log("Audio written with ID: ", audioRef.id);

                    if (audioRef.id) {
                        this.updateFileMetaWithId(audioRef.id);
                    }
                })
                .catch((err) => {
                    this.successMessage = err;
                    console.log(err);
                });
        },

        updateFileMetaWithId(audioRefId) {
            let consumerName = this.consumerName;
            let audioPath = "RecordedFeedbacks/" + consumerName;

            var forestRef = fbase.storage().ref(audioPath).child("feedback");

            var newMetadata = {
                customMetadata: {
                    recordedDocumentReferenceID: audioRefId,
                },
            };

            forestRef
                .updateMetadata(newMetadata)
                .then((metadata) => {
                    // console.log(metadata);
                    this.consumerName = "";

                    return metadata;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    mounted() {
        this.initializeRecording();
        this.uploadReferencePossible();

        setTimeout(() => {
            this.recordStateMessage = "";
        }, 5000);
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
        margin-bottom: 1.25rem;
    }
}

.tab_item {
    margin-bottom: 2rem;

    & * {
        font-size: 15px;
    }

    label {
        display: inline-block;
        margin-bottom: 0.5rem;
        text-transform: capitalize;
        font-size: 16px;
    }
}

.record_action_buttons {
    display: flex;
    margin-bottom: 1.25rem;

    #btnRecord {
        background: var(--customBlue);
        border-color: var(--customBlue);

        &:hover {
            background: #216e8d;
            border-color: #216e8d;
        }
    }

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
            opacity: 0.45;
        }

        &:not(:disabled) > span,
        &:hover > span,
        &:focus > span,
        &:active > span {
            opacity: 1;
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

#record_state_message {
    font-style: italic;
    text-transform: initial;
}
</style>