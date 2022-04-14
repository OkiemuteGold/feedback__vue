<template>
    <form id="audioForm" @submit.prevent="submitFeedbackReference()">
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
                :disabled="isInvalidInput"
            />

            <p id="record_state_message" v-if="isInvalidInput">
                {{ successMessage }}
            </p>

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
                v-if="showField && !showFileInfo && !isInvalidInput"
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

        <button
            type="submit"
            :disabled="!showFileInfo || isInvalidInput"
            class="btn btn-success"
        >
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
            consumerName: "",

            uploadedAudioName: "",

            successMessage: "",
            dragAndDropMessage: "Drop audio files here",
        };
    },
    computed: {
        isInvalidInput() {
            return this.consumerName == "";
        },
    },

    methods: {
        generateUniqueId(fileName) {
            let d = new Date();
            let year = d.getFullYear(),
                month = d.getMonth() + 1,
                day = d.getDate(),
                hours = d.getHours(),
                minutes = d.getMinutes(),
                seconds = d.getSeconds();

            let dateOutput = `${day}-${month}-${year} | ${hours}:${minutes}:${seconds}`;
            return (this.uploadedAudioName = `${fileName}__${dateOutput}`);
        },

        uploadReferencePossible() {
            if (this.consumerName == "") {
                this.successMessage = "Please enter a consumer name.";
            } else {
                this.successMessage = "";
            }
            // if (this.showFileInfo == true) {
            //     if (this.isInvalidInput) {
            //         this.successMessage =
            //             "Please enter a consumer name to upload reference.";
            //     } else {
            //         this.successMessage = "";
            //     }
            // }
        },

        showSuccessMessage() {
            this.successMessage = "Done! Please submit another feedback.";

            setTimeout(() => {
                this.successMessage = "";
            }, 5000);
        },

        hideDragDropField() {
            this.showField = false;
            this.uploadReferencePossible();
        },

        showDragDropField() {
            this.showField = true;
            this.showFileInfo = false;
            this.uploadReferencePossible();
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
            let consumerName = this.consumerName;
            let audioPath = "AudioFeedbacks/" + consumerName;

            this.generateUniqueId(audio.name);
            let uploadedAudioName = this.uploadedAudioName;

            var storageRef = fbase.storage().ref(audioPath);

            const metadata = {
                customMetadata: {
                    location: "Nigeria",
                    activity: `${consumerName}'s recorded feedback`,
                },
            };

            let uploadTask = storageRef
                .child(`${uploadedAudioName}`)
                .put(audio, metadata);

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

        updateFileMetaWithId(audioRefId) {
            let consumerName = this.consumerName;
            let uploadedAudioName = this.uploadedAudioName;
            let audioPath = "AudioFeedbacks/" + consumerName;

            var forestRef = fbase
                .storage()
                .ref(audioPath)
                .child(`${uploadedAudioName}`);

            // Create file metadata to update
            var newMetadata = {
                customMetadata: {
                    DocumentReferenceID: audioRefId,
                },
            };

            // Update metadata properties
            forestRef
                .updateMetadata(newMetadata)
                .then((metadata) => {
                    console.log(metadata);
                    this.consumerName = "";
                    this.resetFeedbackData();

                    this.showFileInfo = false;
                    this.showSuccessMessage();

                    return metadata;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        addAudioFeedback() {
            let consumerName = this.consumerName;
            let audioFiles = this.audioFiles;

            audioFiles.forEach((audio) => {
                let audioFileData = {
                    ConsumerName: consumerName,
                    UploadedAudioName: this.uploadedAudioName,
                    Size: audio.audioSize,
                    DownloadUrl: this.audioUrl,
                    LastModifiedDate: audio.lastModifiedDate,
                    FeedbackCreatedAt: this.convertEpochDate(new Date()),
                };

                console.log(audioFileData);

                db.collection("AudioFeedbacks")
                    .add(audioFileData)
                    .then((audioRef) => {
                        audioRef;
                        console.log("Audio written with ID: ", audioRef.id);

                        this.updateFileMetaWithId(audioRef.id);
                    })
                    .catch((err) => {
                        this.successMessage = err;
                        console.log(err);
                    });
            });
        },

        submitFeedbackReference() {
            this.addAudioFeedback();
        },
    },

    mounted() {
        this.uploadReferencePossible();

        setTimeout(() => {
            this.recordStateMessage = "";
        }, 5000);
    },
};
</script>

<style lang="scss" scoped>
#audioForm {
    & * {
        font-size: 15px;
    }

    .tab_item {
        margin-bottom: 2rem;

        label {
            margin-bottom: 0.5rem;
            font-size: 1rem;
        }
    }

    .labels {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.25rem;

        @media screen and (max-width: 360px) {
            & {
                flex-direction: column;
            }
        }

        & label {
            font-size: 15px;
            border: 1px solid rgba(105, 105, 105, 0.3);
            border-radius: 0.25rem;
            width: fit-content;
            padding: 0.125rem 0.5rem;
            margin-bottom: 0.625rem;
            cursor: pointer;

            &:hover {
                color: #bbb;
            }
        }
    }

    input {
        // font-size: 15px;
        margin-bottom: 0.5rem;
    }

    #record_state_message {
        font-style: italic;
        text-transform: initial;
    }

    p {
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
        border: 1px solid rgba(105, 105, 105, 0.3);
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

    button {
        font-size: 15px;
    }
}
</style>