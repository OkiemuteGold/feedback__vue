<template>
    <form id="audioForm" @submit.prevent="submitAudioFeedback()">
        <div class="tab_item">
            <label for="audioUpload">Upload audio</label>
            <input
                type="file"
                name="audioUpload"
                id="audioUpload"
                class="inputs form-control"
                @change="getAudio($event)"
            />

            <p>{{ successMessage }}</p>

            <ul class="file_info" v-if="showFileInfo">
                <li>
                    <span>File:</span>
                    {{ file.audioName }}
                </li>
                <li>
                    <span>Size:</span>
                    {{ file.audioSize }}
                </li>
                <!-- <li>
                    <span>Date Modified:</span>
                    {{ file.lastModifiedDate }}
                </li> -->
            </ul>
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

export default {
    data() {
        return {
            showFileInfo: false,
            file: {
                audio: null,
                type: null,
                audioName: "",
                audioSize: "",
                lastModifiedDate: "",
            },
            successMessage: "",
        };
    },

    methods: {
        getAudio(event) {
            console.log(event);

            this.file.audio = event.target.files[0].file;
            this.file.audioName = event.target.files[0].name;
            this.file.type = event.target.files[0].type;

            let epochDate = event.target.files[0].lastModified;
            this.convertEpochDate(epochDate);

            let size = event.target.files[0].size;
            let stringSize = String(size);

            console.log(size, stringSize, this.file.type);

            /* formats: audio/x-m4a */
            if (this.file.type == "audio/x-m4a") {
                if (stringSize.length < 3) {
                    this.showFileInfo = false;
                    this.successMessage = `
                        Please upload an audio file higher than ${size} bytes.
                    `;
                } else {
                    this.showFileInfo = true;
                    this.successMessage = null;

                    if (stringSize.length <= 6) {
                        this.file.audioSize = `
                            ${(size / 1000).toFixed(2)}kb
                        `;
                    }
                    if (stringSize.length > 6) {
                        this.file.audioSize = `
                            ${(size / 1000 / 1000).toFixed(2)}mb
                        `;
                    }
                }
            } else {
                this.showFileInfo = false;
                this.successMessage = "Please upload audio file only.";
            }
        },

        addAudioFeedback() {
            let audioFileData = {
                Audio: this.file.audio,
                Name: this.file.audioName,
                Size: this.file.audioSize,
                // Type: this.file.audio.type,
                LastModifiedDate: this.file.lastModifiedDate,
                feedbackCreatedAt: this.convertEpochDate(new Date()),
            };

            console.log(audioFileData);

            db.collection("audioFeedbacks")
                .add(audioFileData)
                .then((docRef) => {
                    docRef;
                    console.log("Audio written with ID: ", docRef.id);
                })
                .catch((err) => {
                    this.successMessage = err;
                    console.log(err);
                });
        },

        submitAudioFeedback() {
            // if (this.file.audio !== null || this.file.audioName !== "") {
            //     this.addAudioFeedback();

            //     this.showFileInfo = false;
            //     // this.file.audio = "";

            //     this.successMessage = "Done! Please submit another feedback.";

            //     setTimeout(() => {
            //         this.resetFeedbackData();
            //         this.successMessage = "";
            //     }, 4000);
            // }

            this.addAudioFeedback();

            this.showFileInfo = false;
            // this.file.audio = "";

            this.successMessage = "Done! Please submit another feedback.";

            setTimeout(() => {
                this.resetFeedbackData();
                this.successMessage = "";
            }, 4000);
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

            return (this.file.lastModifiedDate = dateOutput);
        },
    },
};
</script>

<style lang="scss" scoped>
#audioForm {
    .tab_item {
        margin-bottom: 1.5rem;
    }

    label,
    input {
        font-size: 15px;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 15px;
        color: #fff;
        margin-top: 1rem;
        text-transform: initial;
    }

    .file_info {
        padding-left: 0;
        li {
            color: #bbb;
            font-size: 13px;
            list-style-type: none;
            letter-spacing: 0.5px;

            span {
                color: #fff;
                font-size: 15px;
                margin-right: 0.25rem;
                letter-spacing: 0px;
            }
        }
    }

    button {
        font-size: 15px;
    }
}
</style>