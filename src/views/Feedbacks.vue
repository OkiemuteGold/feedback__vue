<template>
    <div class="user-login">
        <main>
            <div class="logo_container">
                <img
                    src="@/assets/soulcomms-logo.png"
                    alt="logo of soulcomms"
                />
            </div>

            <div class="logoutBtn" @click="logout()" role="button">
                <span>Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <!-- <title>Logout</title> -->
                    <path
                        d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z"
                    />
                </svg>
            </div>

            <div class="back_to_submit_feedback">
                <router-link class="btn" to="/submit-feedback">
                    Submit Feedback
                </router-link>
            </div>

            <div class="welcome-text">
                <h1 class="form_title">All Feedbacks</h1>
                <!-- <hr /> -->
            </div>

            <div class="form-group tab" v-if="isFeedbackAvailable">
                <div v-for="feedback in displayedFeedbacks" :key="feedback.id">
                    <hr />

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
                                <span class="sub_title"
                                    >Experience Ratings:</span
                                >
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
        </main>
    </div>
</template>

<script>
// import $ from "jquery";
import { fbase, db } from "../firebase";

export default {
    name: "Feedbacks",

    data() {
        return {
            allFeedbacks: null,
            displayedFeedbacks: null,
            records: null,
            page: 1,
            perSize: 2,
            perPage: null,

            errorMessage: "You don't currently have any consumer feedback.",
        };
    },

    computed: {
        isFeedbackAvailable() {
            return this.displayedFeedbacks !== null;
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

        logout() {
            fbase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.replace("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    mounted() {
        this.getFormFeedbacks();

        // if (this.allFeedbacks) {
        //     this.nextPrevFeedback();
        // }

        setTimeout(() => {
            this.logout();
        }, 1000 * 60 * 60 * 3);
    },
};
</script>

<style scoped lang="scss">
main {
    width: 100%;
    // max-width: 750px !important;
    min-height: 400px;

    .logo_container {
        max-width: 73px;
        margin-top: -50px;
        margin-bottom: 35px;
        margin-left: -45px;
    }
}

.logoutBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 2%;
    right: 2%;
    width: 100%;
    max-width: 85px;
    padding: 0.125rem;
    border: 1px solid #fff;
    border-radius: 0.25rem;
    cursor: pointer;

    &:hover {
        transform: scale(0.95);
    }

    & span {
        margin-right: 0.5rem;
        font-size: 14px;
    }

    & svg {
        fill: #fff;
        height: 1rem;
        width: 1rem;
    }
}

.back_to_submit_feedback {
    top: 50px !important;
}

.welcome-text {
    padding-top: 25px;
    padding-bottom: 5px !important;
}

/* hide all steps by default: */
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

.pagination_container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    text-align: center;
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