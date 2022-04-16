<template>
    <div>
        <div class="form-group tab" v-if="isFeedbackAvailable">
            <div
                class="feedbacks_container"
                v-for="feedback in displayedFeedbacks"
                :key="feedback.id"
            >
                <h2 class="promoter">Consumer: {{ feedback.ConsumerName }}</h2>
                <p>
                    <span class="sub_title">Upload Date:</span>
                    {{ feedback.FeedbackCreatedAt }}
                </p>
                <p>
                    <span class="sub_title">Reference Name:</span>
                    {{ feedback.RecordName }}
                </p>
                <p><span class="sub_title">File Size:</span> {{ audioSize }}</p>
                <p>
                    <a
                        :href="feedback.DownloadUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Click to play audio online</a
                    >
                </p>

                <hr />
            </div>

            <div
                class="pagination_container"
                v-if="displayedFeedbacks && records > 1"
            >
                <pagination
                    v-model="page"
                    :records="records"
                    :per-page="perPage"
                    @paginate="nextPrevFeedback"
                />
            </div>
        </div>

        <div class="error_message" v-else>
            <p class="error_text">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
// import $ from "jquery";
import "@/mixins";
import { db } from "../firebase";

export default {
    name: "Feedbacks",

    data() {
        return {
            allFeedbacks: null,
            displayedFeedbacks: null,
            audioSize: "",
            records: null,
            page: 1,
            perSize: 2,
            perPage: null,

            errorMessage: "Feedback currently not available.",
        };
    },

    computed: {
        isFeedbackAvailable() {
            return this.displayedFeedbacks !== null;
        },
    },

    methods: {
        nextPrevFeedback() {
            let x = (this.page - 1) * this.perSize,
                y = this.page * this.perSize;

            let feedbacks = this.allFeedbacks.slice(x, y);
            this.displayedFeedbacks = feedbacks;
        },

        getRecordedAudioRefernce() {
            db
                .collection("RecordedFeedbacks")
                // .orderBy("createdAt")
                .onSnapshot((querySnapshot) => {
                    let allFeedbacks = [];

                    querySnapshot.forEach((doc) => {
                        this.validateSize(doc.data().Size);
                        allFeedbacks.push(doc.data());
                    });

                    this.allFeedbacks = allFeedbacks;
                    this.records = allFeedbacks.length;
                    this.perPage = Math.ceil(
                        allFeedbacks.length / this.perSize
                    );

                    this.nextPrevFeedback();

                    console.log(this.allFeedbacks);
                }),
                (error) => {
                    console.log(error);
                    // this.errorMessage = error.message;
                };
        },

        // getUploadedAudios() {
        //     var storageRef = fbase.storage().ref();
        //     // Create a reference under which you want to list
        //     var listRef = storageRef.child("files/uid");

        //     // Find all the prefixes and items.
        //     listRef
        //         .listAll()
        //         .then((res) => {
        //             res.prefixes.forEach((folderRef) => {
        //                 // All the prefixes under listRef.
        //                 // You may call listAll() recursively on them.
        //                 console.log(folderRef);
        //             });
        //             res.items.forEach((itemRef) => {
        //                 // All the items under listRef.
        //                 console.log(itemRef);
        //             });
        //         })
        //         .catch((error) => {
        //             // Uh-oh, an error occurred!
        //             console.log(error);
        //         });
        // },
    },

    mounted() {
        this.getRecordedAudioRefernce();
    },
};
</script>

<style scoped lang="scss">
.promoter {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.feedbacks_container {
    margin-bottom: 1.5rem;

    & p {
        color: #ccc;
        font-size: 15px;
        text-transform: initial;
        margin-bottom: 0.5rem;

        .sub_title {
            font-size: 16px;
            color: #fff;
        }
    }

    // @media screen and (max-width: 426px) {
    //     & span + span {
    //         margin-top: 2rem;
    //     }

    //     & span p:last-child {
    //         margin-bottom: 0;
    //     }
    // }
}

.error_message {
    margin-top: 2rem;
    text-align: center;

    .error_text {
        font-weight: 300;
        font-size: 1.25rem;
        font-style: italic;
        line-height: 1.5;
    }
}
</style>