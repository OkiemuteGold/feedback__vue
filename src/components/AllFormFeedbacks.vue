<template>
    <div>
        <div class="form-group tab" v-if="isFeedbackAvailable">
            <div v-for="feedback in displayedFeedbacks" :key="feedback.id">
                <h2 class="promoter">Promoter: {{ feedback.Promoter }}</h2>
                <p class="date">Date: {{ feedback.Date }}</p>

                <hr />

                <div class="feedbacks_container">
                    <span>
                        <h3 class="title">Consumer Info</h3>
                        <p>
                            <span class="sub_title">Name:</span>
                            {{ feedback.Consumer }}
                        </p>
                        <p>
                            <span class="sub_title">Age:</span>
                            {{ feedback.Age }}
                        </p>
                        <p>
                            <span class="sub_title">Gender:</span>
                            {{ feedback.Gender }}
                        </p>

                        <p>
                            <span class="sub_title">E-mail:</span>
                            {{ feedback.ConsumerEmail }}
                        </p>
                        <p>
                            <span class="sub_title">Phone No:</span>
                            {{ feedback.ConsumerPhone }}
                        </p>
                        <p>
                            <span class="sub_title">Address:</span>
                            {{ feedback.ConsumerAddress }}
                        </p>
                        <p>
                            <span class="sub_title">Would Buy:</span>
                            {{ feedback.WouldBuy }}
                        </p>
                    </span>
                    <span>
                        <h3 class="title">Feedback</h3>
                        <p>
                            <span class="sub_title">Sampling Option:</span>
                            {{ feedback.SamplingOption }}
                        </p>
                        <p>
                            <span class="sub_title">Taste Ratings:</span>
                            {{ feedback.TasteRatings }}
                        </p>
                        <p>
                            <span class="sub_title">Experience Ratings:</span>
                            {{ feedback.ExperienceRatings }}
                        </p>
                        <p>
                            <span class="sub_title">Package Ratings:</span>
                            {{ feedback.PackageRatings }}
                        </p>
                        <p>
                            <span class="sub_title">Overall Ratings:</span>
                            {{ feedback.OverallRatings }}
                        </p>
                        <p>
                            <span class="sub_title">Would Recommend:</span>
                            {{ feedback.WouldRecommend }}
                        </p>
                        <p>
                            <span class="sub_title">Recommendation:</span>
                            {{ feedback.Question1Response }}
                        </p>
                    </span>
                </div>
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
import { db } from "../firebase";

export default {
    name: "Feedbacks",

    data() {
        return {
            allFeedbacks: [],
            displayedFeedbacks: [],
            records: null,
            page: 1,
            perSize: 2,
            perPage: null,

            errorMessage: "Feedback currently not available.",
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
            // console.log(
            //     `Page ${this.page} was selected. Do something about it`
            // );

            let x = (this.page - 1) * this.perSize,
                y = this.page * this.perSize;

            let feedbacks = this.allFeedbacks.slice(x, y);
            this.displayedFeedbacks = feedbacks;

            // console.log(feedbacks, x, y);
        },

        getFormFeedbacks() {
            /* And use .orderBy("createdAt--field used") to order by time..
                Replace .get().then() with .onSnapshot() for realtime update, and change .catch((error) => {} to , (error) => {}
            */
            db
                .collection("feedbacks")
                // .orderBy("createdAt")
                .onSnapshot((querySnapshot) => {
                    let allFeedbacks = [];

                    querySnapshot.forEach((doc) => {
                        allFeedbacks.push(doc.data());
                    });

                    this.allFeedbacks = allFeedbacks;
                    this.records = allFeedbacks.length;
                    this.perPage = Math.ceil(
                        allFeedbacks.length / this.perSize
                    );

                    this.nextPrevFeedback();

                    // console.log(this.allFeedbacks);
                }),
                (error) => {
                    console.log(error);
                    // this.errorMessage = error.message;
                };
        },
    },

    mounted() {
        this.getFormFeedbacks();

        // if (this.allFeedbacks) {
        //     this.nextPrevFeedback();
        // }
    },
};
</script>

<style scoped lang="scss">
.tab p {
    font-size: 15px;
}

.promoter {
    font-size: 1.5rem;
}

.feedbacks_container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    margin-bottom: 1.25rem;

    .title {
        font-size: 1.25rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }

    & p {
        color: #ccc;
        font-size: 15px;
        font-weight: 300;
        text-transform: initial;

        .sub_title {
            color: #fff;
        }
    }

    @media screen and (max-width: 426px) {
        & span + span {
            margin-top: 2rem;
        }

        & span p:last-child {
            margin-bottom: 0;
        }
    }
}

.error_message {
    width: 100%;
    max-width: 270px;
    margin: 2rem auto 0;
    text-align: center;

    .error_text {
        font-weight: 300;
        font-size: 1rem;
        font-style: italic;
        line-height: 1.5;
    }
}
</style>