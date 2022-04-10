<template>
    <form id="audioForm" @submit.prevent="submitAudioFeedback()">
        <div class="tab_item">
            <div class="labels">
                <label for="audioUpload" @click="hideDragDropField()"
                    >Upload audio</label
                >
                <label for="dragAndDrop" @click="showDragDropField()"
                    >Use Drag &amp; Drop</label
                >
            </div>
            <input
                type="file"
                name="audioUpload"
                id="audioUpload"
                class="inputs form-control"
                accept="audio/*"
                multiple
                v-if="!showField"
                @input="getAudio($event)"
            />

            <p>{{ successMessage }}</p>

            <div v-if="showFileInfo" class="file_info_container">
                <ul
                    class="file_info"
                    v-for="(file, index) in audioFiles"
                    :key="index"
                >
                    <li>
                        <span>File:</span>
                        {{ file.audioName }}
                    </li>
                    <li>
                        <span>Size:</span>
                        {{ file.audioSize }}
                    </li>
                    <li>
                        <span>Date:</span>
                        {{ file.lastModifiedDate }}
                    </li>
                </ul>
            </div>

            <div
                v-if="showField && !showFileInfo"
                id="drag_and_drop"
                class="file_info_container drag_and_drop"
                @dragenter="preventDefStopProp($event)"
                @dragover="preventDefStopProp($event)"
                @drop="initDragAndDrop($event)"
            >
                <p>Drop audio files here</p>
            </div>
        </div>

        <button type="submit" :disabled="!showFileInfo" class="btn btn-success">
            Upload Audio
        </button>
    </form>
</template>

<script>
// import $ from "jquery";
import "@/mixins";
import { db } from "../firebase";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

export default {
    data() {
        return {
            showFileInfo: false,
            showField: false,
            audioFiles: null,

            // audio: null,
            lastModifiedDate: "",
            audioSize: "",

            successMessage: "",
        };
    },

    methods: {
        hideDragDropField() {
            this.showField = false;
        },

        showDragDropField() {
            this.showField = true;
            this.showFileInfo = false;
        },

        preventDefStopProp(event) {
            event.stopPropagation();
            event.preventDefault();
        },

        convertEpochDate(date) {
            let epochDate = date;
            let d = new Date(epochDate);

            let year = d.getFullYear(),
                month = d.getMonth() + 1,
                day = d.getDate(),
                hours = d.getHours(),
                minutes = d.getMinutes(),
                seconds = d.getSeconds();

            let dateOutput = `${day}-${month}-${year} | ${hours}:${minutes}:${seconds}`;

            return (this.lastModifiedDate = dateOutput);
        },

        validateSize(fileSize) {
            let stringSize = String(fileSize);

            if (stringSize.length < 3) {
                this.showFileInfo = false;
                this.successMessage = `
                        Please upload an audio file higher than ${fileSize} bytes.
                    `;
            } else {
                this.showFileInfo = true;
                this.successMessage = "";

                if (stringSize.length <= 6) {
                    this.audioSize = `
                            ${(fileSize / 1000).toFixed(2)}kb
                        `;
                }
                if (stringSize.length > 6) {
                    this.audioSize = `
                            ${(fileSize / 1000 / 1000).toFixed(2)}mb
                        `;
                }
            }
        },

        getFiles(allFiles) {
            let array = [];

            if (allFiles.length > 0) {
                allFiles.forEach((file) => {
                    let type = file.type;
                    let name = file.name;
                    let epochDate = file.lastModifiedDate;
                    this.convertEpochDate(epochDate);

                    let fileSize = file.size;
                    this.validateSize(fileSize);

                    let fileObj = {
                        audioType: type,
                        audioName: name,
                        audioSize: this.audioSize,
                        lastModifiedDate: this.lastModifiedDate,
                    };

                    array.push(fileObj);
                    this.audioFiles = array;
                });

                // console.log(this.audioFiles);
                return this.audioFiles;
            }
        },

        getAudio(event) {
            console.log(event);
            let allFiles = event.target.files;
            this.getFiles(allFiles);
        },

        initDragAndDrop(event) {
            this.preventDefStopProp(event);

            const dt = event.dataTransfer;
            let allFiles = dt.files;
            this.getFiles(allFiles);
        },

        // readAudioFile(audio) {
        //     var reader = new FileReader();
        //     reader.addEventListener("load", function (e) {
        //         let result = e;
        //         console.log(result);
        //     });
        //     reader.readAsText(audio.audioName);
        // },

        addAudioFeedback() {
            let audioFiles = this.audioFiles;
            audioFiles.forEach((audio) => {
                let audioFileData = {
                    Name: audio.audioName,
                    Size: audio.audioSize,
                    // Type: audio.audioType,
                    LastModifiedDate: audio.lastModifiedDate,
                    feedbackCreatedAt: this.convertEpochDate(new Date()),
                };

                console.log(audioFileData);

                db.collection("audioFeedbacks")
                    .add(audioFileData)
                    .then((audioRef) => {
                        audioRef;
                        console.log(
                            "Audio written with ID: ",
                            audioRef,
                            audioRef.id
                        );
                    })
                    .catch((err) => {
                        this.successMessage = err;
                        console.log(err);
                    });
            });
        },

        submitAudioFeedback() {
            this.addAudioFeedback();
            this.resetFeedbackData();

            this.showFileInfo = false;

            this.successMessage = "Done! Please submit another feedback.";

            setTimeout(() => {
                this.successMessage = "";
            }, 4000);
        },
    },
};
</script>

<style lang="scss" scoped>
#audioForm {
    & * {
        font-size: 15px;
    }

    .tab_item {
        margin-bottom: 1.5rem;
    }

    .labels {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.25rem;

        @media screen and (max-width: 315px) {
            & {
                flex-direction: column;
            }
        }

        & label {
            border: 1px solid rgba(105, 105, 105, 0.4);
            border-radius: 0.25rem;
            width: fit-content;
            padding: 0.125rem 0.5rem;
            margin-bottom: 0.625rem;
        }
    }

    input {
        // font-size: 15px;
        margin-bottom: 0.5rem;
    }

    p {
        // font-size: 15px;
        color: #fff;
        margin-top: 1rem;
        text-transform: initial;
    }

    .file_info_container {
        // display: flex;
        // flex-wrap: wrap;
        // align-items: center;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        padding: 1rem 0 0;
        width: 100%;
        border: 1px solid rgba(105, 105, 105, 0.4);
        border-radius: 0.25rem;

        &.drag_and_drop {
            min-height: 100px;
            margin-top: -0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 0;

            p {
                text-align: center;
                margin: 0;
                color: #bbb;
                text-transform: capitalize;
            }
        }

        .file_info {
            padding: 0 0.75rem;
            margin-bottom: 1rem;

            li {
                color: #bbb;
                font-size: 13px;
                list-style-type: none;
                letter-spacing: 0.5px;
                margin-bottom: 0.125rem;

                span {
                    color: #fff;
                    // font-size: 15px;
                    margin-right: 0.125rem;
                    letter-spacing: 0px;
                }
            }
        }
    }

    // button {
    //     font-size: 15px;
    // }
}
</style>