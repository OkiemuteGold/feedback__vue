<template>
    <div>
        <div class="form-group tab" v-if="isFeedbackAvailable">
            <div
                class="feedbacks_container"
                v-for="(feedback, index) in displayedFeedbacks"
                :key="index"
            >
                <h2 class="promoter">Consumer: {{ feedback.ConsumerName }}</h2>
                <p>
                    <span class="sub_title">Reference Name:</span>
                    {{ feedback.RecordName }}
                </p>
                <p v-if="audioSize">
                    <span class="sub_title">File Size:</span>
                    {{ feedback.Size }}
                </p>
                <p>
                    <span class="sub_title">Upload Date:</span>
                    {{ feedback.FeedbackCreatedAt }}
                </p>

                <!-- <p>
                    <a
                        :href="feedback.DownloadUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Click to play audio online</a
                    >
                </p> -->

                <!-- Button trigger modal -->
                <button
                    type="button"
                    class="btn btn-primary play_button"
                    data-bs-toggle="modal"
                    :data-bs-target="`#modalRec${index}`"
                >
                    <svg
                        data-v-0eb3a1f7=""
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                    >
                        <path
                            data-v-0eb3a1f7=""
                            d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm-64 268c0 10.7-12.9 16-20.5 8.5L104 376H76c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h28l35.5-36.5c7.6-7.6 20.5-2.2 20.5 8.5v136zm33.2-47.6c9.1-9.3 9.1-24.1 0-33.4-22.1-22.8 12.2-56.2 34.4-33.5 27.2 27.9 27.2 72.4 0 100.4-21.8 22.3-56.9-10.4-34.4-33.5zm86-117.1c54.4 55.9 54.4 144.8 0 200.8-21.8 22.4-57-10.3-34.4-33.5 36.2-37.2 36.3-96.5 0-133.8-22.1-22.8 12.3-56.3 34.4-33.5zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
                        ></path>
                    </svg>
                    Click to play audio
                </button>

                <audioRecordModal :feedback="feedback" :index="index" />

                <hr />
            </div>
        </div>

        <div class="error_message" v-else>
            <p class="error_text">{{ errorMessage }}</p>
        </div>

        <div
            class="pagination_container"
            v-if="displayedFeedbacks && records > 1"
        >
            <pagination
                v-model="page"
                :records="records"
                :per-page="perPage"
                @paginate="getRecordedAudioRefernce"
            />
        </div>
    </div>
</template>

<script>
// import $ from "jquery";
import "@/mixins";
import { db } from "../firebase";
import audioRecordModal from "./extra/audioRecordModal.vue";

export default {
    name: "Feedbacks",

    components: {
        audioRecordModal,
    },

    data() {
        return {
            allFeedbacks: [],
            displayedFeedbacks: [],
            audioSize: null,
            records: null,
            page: 1,
            perSize: 2,
            perPage: null,

            errorMessage: "No Feedback Available.",
        };
    },

    computed: {
        isFeedbackAvailable() {
            return (
                this.displayedFeedbacks !== null &&
                this.displayedFeedbacks.length > 0
            );
        },
    },

    methods: {
        nextPrevFeedback() {
            let x = (this.page - 1) * this.perSize,
                y = this.page * this.perSize;

            let allFeedbacks = this.allFeedbacks.slice(x, y);
            // console.log(allFeedbacks);

            this.displayedFeedbacks = allFeedbacks;

            this.displayedFeedbacks.forEach((feedback) => {
                this.validateSize(feedback.Size);
                feedback.Size = this.audioSize;
            });
        },

        getRecordedAudioRefernce() {
            db
                .collection("RecordedFeedbacks")
                // .orderBy("createdAt")
                .onSnapshot((querySnapshot) => {
                    let feedbacks = [];

                    querySnapshot.forEach((doc) => {
                        feedbacks.push(doc.data());
                    });

                    this.allFeedbacks = feedbacks;
                    this.records = this.allFeedbacks.length;
                    this.perPage = Math.ceil(this.records / this.perSize);

                    this.nextPrevFeedback();
                }),
                (error) => {
                    console.log(error);
                    // this.errorMessage = error.message;
                };
        },
    },

    mounted() {
        this.getRecordedAudioRefernce();
    },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_allFeedbacks.scss";
</style>