<template>
    <form id="audioForm" @submit.prevent="submitFeedbackReference()">
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
                multiple
                accept="audio/*"
                v-if="!showField"
                @input="getAudio($event)"
                @change="newAudioUpload($event)"
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
                @dragenter="atDragEnterOver($event)"
                @dragover="atDragEnterOver($event)"
                @dragleave="atDragLeave($event)"
                @drop="initDragAndDrop($event)"
                @dragend="newAudioUpload($event)"
            >
                <p>{{ dragAndDropMessage }}</p>
            </div>
        </div>

        <button type="submit" :disabled="!showFileInfo" class="btn btn-success">
            Upload Reference
        </button>
    </form>
</template>

<script>
// import $ from "jquery";
import "@/mixins";
import { db, fbase } from "../firebase";

export default {
    data() {
        return {
            showFileInfo: false,
            showField: false,
            audioFiles: null,

            lastModifiedDate: "",
            audioSize: "",
            audioUrl: "",

            successMessage: "",
            dragAndDropMessage: "Drop audio files here",
        };
    },

    methods: {
        showSuccessMessage() {
            this.successMessage = "Done! Please submit another feedback.";

            setTimeout(() => {
                this.successMessage = "";
            }, 4000);
        },

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

        atDragEnterOver(event) {
            this.preventDefStopProp(event);
            this.dragAndDropMessage = "Release files to upload";
        },

        atDragLeave(event) {
            this.preventDefStopProp(event);
            this.dragAndDropMessage = "Drop audio files here";
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
                    let name = file.name;
                    let epochDate = file.lastModifiedDate;
                    this.convertEpochDate(epochDate);

                    let fileSize = file.size;
                    this.validateSize(fileSize);

                    let fileObj = {
                        audioName: name,
                        audioSize: this.audioSize,
                        lastModifiedDate: this.lastModifiedDate,
                        audioUrl: this.audioUrl,
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

        sendToFirebaseStorage(audio) {
            var storageRef = fbase
                .storage()
                .ref("audioFeedbacks/" + audio.name);

            const metadata = {
                customMetadata: {
                    location: "Nigeria",
                    activity: "Feedback",
                },
            };

            let uploadTask = storageRef.put(audio, metadata);

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
                            this.audioUrl = downloadUrl;

                            console.log("File available at", downloadUrl);
                        });
                }
            );

            console.log(audio, this.audioUrl);
        },

        initDragAndDrop(event) {
            this.preventDefStopProp(event);

            const dt = event.dataTransfer;
            let allFiles = dt.files;
            this.getFiles(allFiles);
            this.dragAndDropMessage = "Drop audio files here";

            // let audio = dt.files[0];
            let audios = dt.files;
            audios.forEach((audio) => {
                this.sendToFirebaseStorage(audio);
            });
        },

        newAudioUpload(event) {
            // let audio = event.target.files[0];
            let audios = event.target.files;
            audios.forEach((audio) => {
                this.sendToFirebaseStorage(audio);
            });
        },

        updateFileMetaWithId(audioRefId, audio) {
            var forestRef = fbase
                .storage()
                .ref("audioFeedbacks/" + audio.audioName);

            // Create file metadata to update
            var newMetadata = {
                customMetadata: {
                    documentReferenceID: audioRefId,
                },
            };

            // Update metadata properties
            forestRef
                .updateMetadata(newMetadata)
                .then((metadata) => {
                    console.log(metadata);
                    return metadata;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        addAudioFeedback() {
            let audioFiles = this.audioFiles;
            audioFiles.forEach((audio) => {
                let audioFileData = {
                    Name: audio.audioName,
                    Size: audio.audioSize,
                    DownloadUrl: this.audioUrl,
                    LastModifiedDate: audio.lastModifiedDate,
                    feedbackCreatedAt: this.convertEpochDate(new Date()),
                };

                console.log(audioFileData);

                db.collection("audioFeedbacks")
                    .add(audioFileData)
                    .then((audioRef) => {
                        audioRef;
                        console.log("Audio written with ID: ", audioRef.id);

                        this.updateFileMetaWithId(audioRef.id, audio);
                    })
                    .catch((err) => {
                        this.successMessage = err;
                        console.log(err);
                    });
            });
        },

        submitFeedbackReference() {
            this.addAudioFeedback();
            this.resetFeedbackData();

            this.showFileInfo = false;

            this.showSuccessMessage();
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
            cursor: pointer;
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