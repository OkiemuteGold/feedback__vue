<template>
    <div>
        <div
            v-if="isShownNewRespose"
            id="new_feedback_container"
            class="new_feedback_container"
        >
            <h3 class="tab_title">Thank you for your feedback</h3>
            <p>Please submit another feedback</p>

            <button @click="submitNewFeedback()">Submit New Feedback</button>
        </div>

        <form id="regForm" @submit.prevent="submitForm()" v-else>
            <!-- <h2 class="form_title">Form</h2> -->

            <div class="form-group tab" v-if="!isShownNewRespose">
                <div class="tab_item">
                    <label for="promoterName">Promoter</label>
                    <input
                        class="inputs form-control mb-0"
                        type="text"
                        id="promoterName"
                        name="promoterName"
                        placeholder="Full name"
                        v-model="promoterName"
                    />
                </div>

                <h3 class="tab_title mt-5">Consumer Info</h3>
                <p class="instruction">All fields are required**</p>

                <div
                    class="tab_item"
                    v-for="info in consumerInfos"
                    :key="info.code"
                >
                    <label :for="info.code">{{ info.name }}:</label>

                    <input
                        v-if="info.type === 'number'"
                        class="inputs form-control"
                        type="number"
                        min="0"
                        :id="info.code"
                        :name="info.code"
                        :placeholder="info.placeholder"
                        @input="getConsumerInfo($event)"
                    />
                    <input
                        v-else
                        class="inputs form-control"
                        :type="info.type"
                        :id="info.code"
                        :name="info.code"
                        :placeholder="info.placeholder"
                        @input="getConsumerInfo($event)"
                    />

                    <!-- <span v-if="info.code === 'consumerName'">
                        {{ consumerName }}
                    </span>
                    <span v-if="info.code === 'consumerEmail'">
                        {{ consumerEmail }}
                    </span>
                    <span v-if="info.code === 'consumerPhone'">
                        {{ consumerPhone }}
                    </span>
                    <span v-if="info.code === 'consumerAddress'">
                        {{ consumerAddress }}
                    </span> -->
                </div>

                <div class="tab_item">
                    <label for="genderInput">Gender:</label>

                    <div class="radio_inputs" id="genderInput">
                        <div
                            v-for="genderItem in genders"
                            :key="genderItem.code"
                        >
                            <input
                                class="inputs"
                                type="radio"
                                :id="genderItem.code"
                                :value="genderItem.code"
                                v-model="gender"
                            />

                            <label :for="genderItem.code">{{
                                genderItem.name
                            }}</label>
                        </div>
                    </div>
                </div>

                <div class="tab_item">
                    <label for="ageInput">Age (Years):</label>

                    <div class="radio_inputs" id="ageInput">
                        <div v-for="ageItem in ages" :key="ageItem.code">
                            <input
                                class="inputs"
                                type="radio"
                                :id="ageItem.code"
                                :value="`${ageItem.name} years`"
                                v-model="age"
                            />

                            <label :for="ageItem.code">{{
                                ageItem.name
                            }}</label>
                        </div>
                    </div>
                </div>

                <div class="tab_item">
                    <label for="date">Date:</label>
                    <input
                        class="inputs form-control"
                        type="date"
                        name="date"
                        v-model="date"
                    />
                </div>
            </div>

            <div class="form-group tab">
                <h3 class="tab_title">Please give us your feedback</h3>

                <div class="tab_item">
                    <label for="productSampling">Product for sampling</label>
                    <select id="productSampling" v-model="samplingOption">
                        <option disabled value="">
                            Select product for sampling
                        </option>
                        <option
                            v-for="option in samplingOptions"
                            :key="option.id"
                        >
                            {{ option.value }}
                        </option>
                    </select>
                </div>

                <!-- <div class="tab_item">
                    <label for="feedbackTaste" class="question_label"
                        >How would you rate the taste?</label
                    >
                    <select id="feedbackTaste" v-model="tasteOption">
                        <option disabled value="">
                            Select ratings on taste
                        </option>
                        <option v-for="option in tasteOptions" :key="option.id">
                            {{ option.value }}
                        </option>
                    </select>
                </div> -->

                <!-- <div class="tab_item">
                    <label for="feedbackPackaging" class="question_label"
                        >Feedback on packaging</label
                    >
                    <select id="feedbackPackaging" v-model="packagingOption">
                        <option disabled value="">
                            Select feedback on packaging
                        </option>
                        <option
                            v-for="option in packagingOptions"
                            :key="option.id"
                        >
                            {{ option.value }}
                        </option>
                    </select>
                </div> -->

                <div
                    class="tab_item"
                    v-for="singleRating in ratings"
                    :key="singleRating.id"
                >
                    <label :for="singleRating.id" class="question_label">
                        <span>{{ singleRating.label }}</span>

                        <!-- <ul>
                            (
                            <li
                                v-for="rating in singleRating.ratings"
                                :key="rating.code"
                            >
                                {{ rating.value }}: {{ rating.code }}
                            </li>
                            )
                        </ul> -->
                    </label>

                    <div class="radio_inputs" :id="singleRating.id">
                        <div
                            v-for="rating in singleRating.ratings"
                            :key="rating.name + rating.code"
                        >
                            <input
                                class="inputs"
                                type="radio"
                                :name="rating.name"
                                :id="rating.name + rating.code"
                                :value="rating.value"
                                @input="getRatings($event)"
                            />

                            <label :for="rating.name + rating.code">{{
                                rating.value
                            }}</label>
                        </div>
                    </div>
                </div>

                <!-- <div class="tab_item">
                    <label for="tasteLike" class="question_label">
                        <span>What do you like about the taste?</span>
                    </label>
                    <select id="tasteLike" v-model="tasteLikeOption">
                        <option disabled value="">Select what you like</option>
                        <option
                            v-for="option in tasteLikeOptions"
                            :key="option.id"
                        >
                            {{ option.value }}
                        </option>
                    </select>
                </div> -->

                <!-- <div class="tab_item">
                    <label for="tasteDislike" class="question_label">
                        <span>What do you dislike about the taste?</span>
                    </label>
                    <select id="tasteDislike" v-model="tasteDislikeOption">
                        <option disabled value="">
                            Select what you dislike
                        </option>
                        <option
                            v-for="option in tasteDislikeOptions"
                            :key="option.id"
                        >
                            {{ option.value }}
                        </option>
                    </select>
                </div> -->
            </div>

            <div class="form-group tab">
                <!-- <h3 class="tab_title">Please give us your feedback</h3> -->

                <div
                    class="tab_item"
                    v-for="response in textAreaResponse"
                    :key="response.id"
                >
                    <label :for="response.id" class="question_label">
                        <span>{{ response.question }}</span>
                    </label>
                    <textarea
                        class="inputs form-control"
                        :name="response.id"
                        :id="response.id"
                        cols="30"
                        rows="5"
                        :placeholder="response.placeholder"
                        @input="getTextAreaResponse($event)"
                    ></textarea>
                </div>
            </div>

            <div class="error_message_contianer" v-if="error">
                <p class="error_message">{{ errorMessage }}</p>
            </div>

            <div class="button_container">
                <div class="buttons">
                    <button
                        type="button"
                        id="prevBtn"
                        class="me-2"
                        @click="prevTab()"
                    >
                        Previous
                    </button>
                    <button type="button" id="nextBtn" @click="nextTab()">
                        Next
                    </button>
                    <button
                        type="submit"
                        :disabled="!isValid"
                        v-if="showSubmitBtn"
                        id="submitButton"
                    >
                        Submit
                    </button>
                </div>
            </div>

            <!-- indicators -->
            <!-- <div id="indicators" class="indicators"></div> -->
        </form>
    </div>
</template>

<script>
import $ from "jquery";
import "@/mixins";
import { db } from "../firebase";

import genders from "@/api/genders";
import ages from "@/api/ages";
import consumerInfos from "@/api/consumerInfos";
// import packagingOptions from "@/api/packagingOptions";
// import tasteOptions from "@/api/tasteOptions";
// import tasteLikeOptions from "@/api/tasteLikeOptions";
// import tasteDislikeOptions from "@/api/tasteDislikeOptions";
import samplingOptions from "@/api/samplingOptions";
import ratings from "@/api/ratings";
import textAreaResponse from "@/api/textAreaResponse";

export default {
    data() {
        return {
            genders,
            ages,
            consumerInfos,
            // packagingOptions,
            // tasteOptions,
            // tasteLikeOptions,
            // tasteDislikeOptions,
            samplingOptions,
            ratings,
            textAreaResponse,

            allFeedbacks: [],

            errorMessage:
                "All fields are required... Please fill in the empty fields!",
            error: false,

            currentTab: 0,
            showSubmitBtn: false,
            isShownNewRespose: false,

            promoterName: "",
            consumerName: "",
            consumerEmail: "",
            consumerPhone: "",
            consumerAddress: "",
            date: "",
            gender: "",
            age: "",

            // tasteOption: "",
            // packagingOption: "",
            // tasteLikeOption: "",
            // tasteDislikeOption: "",

            samplingOption: "",
            tasteRatings: "",
            experienceRatings: "",
            packageRatings: "",
            overallRatings: "",
            wouldBuy: "",
            wouldRecommend: "",

            question1Response: "",
            // question2Response: "",
        };
    },
    computed: {
        // form validation
        isValidEmail() {
            let email = this.validEmail(this.consumerEmail);
            return email;
        },

        isValidTab1() {
            return (
                this.promoterName !== "" &&
                this.consumerName !== "" &&
                this.consumerPhone !== "" &&
                this.consumerAddress !== "" &&
                this.date !== "" &&
                this.gender !== "" &&
                this.age !== ""
            );
        },

        isValidTab2() {
            return (
                // this.tasteOption !== "" &&
                // this.packagingOption !== "" &&
                // this.tasteLikeOption !== "" &&
                // this.tasteDislikeOption !== "" &&
                this.samplingOption !== "" &&
                this.tasteRatings !== "" &&
                this.experienceRatings !== "" &&
                this.packageRatings !== "" &&
                this.overallRatings !== "" &&
                this.wouldBuy !== "" &&
                this.wouldRecommend !== ""
            );
        },

        isValidTab3() {
            return (
                this.question1Response !== ""
                //  && this.question2Response !== ""
            );
        },

        isValid() {
            return (
                this.isValidEmail &&
                this.isValidTab1 &&
                this.isValidTab2 &&
                this.isValidTab3
            );
        },
    },

    methods: {
        prevTab() {
            this.nextPrev(-1);
        },
        nextTab() {
            this.nextPrev(1);
        },

        removeErrorMessage() {
            $(".inputs").change(function () {
                $(".error_message_contianer").hide();
            });
            $(".error_message_contianer").show();
        },

        validEmail(email) {
            let emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailReg.test(email);
        },

        getConsumerInfo(event) {
            let name = event.target.name;

            if (name === "consumerName") {
                this.consumerName = event.target.value;
            } else if (name === "consumerEmail") {
                this.consumerEmail = event.target.value;
            } else if (name === "consumerPhone") {
                this.consumerPhone = event.target.value;
            } else if (name === "consumerAddress") {
                this.consumerAddress = event.target.value;
            }
        },

        getRatings(event) {
            let name = event.target.name;

            if (name === "tasteRatings") {
                this.tasteRatings = event.target.value;
            } else if (name === "experienceRatings") {
                this.experienceRatings = event.target.value;
            } else if (name === "packageRatings") {
                this.packageRatings = event.target.value;
            } else if (name === "overallRatings") {
                this.overallRatings = event.target.value;
            } else if (name === "wouldBuy") {
                this.wouldBuy = event.target.value;
            } else if (name === "wouldRecommend") {
                this.wouldRecommend = event.target.value;
            }
        },

        getTextAreaResponse(event) {
            let name = event.target.name;

            if (name === "question1") {
                this.question1Response = event.target.value;
            }
            // else if (name === "question2") {
            //     this.question2Response = event.target.value;
            // }
        },

        submitNewFeedback() {
            this.resetFeedbackData();
            this.isShownNewRespose = false;
            $("#regForm").show("slow");

            setTimeout(() => {
                this.currentTab = 0;
                this.showTab(this.currentTab);
            }, 500);
        },

        addFormFeedback() {
            let feedbackData = {
                Promoter: this.promoterName,
                Consumer: this.consumerName,
                ConsumerEmail: this.consumerEmail,
                ConsumerPhone: this.consumerPhone,
                ConsumerAddress: this.consumerAddress,
                Gender: this.gender,
                Age: this.age,
                Date: this.date,

                // TasteOption: this.tasteOption,
                // PackagingOption: this.packagingOption,
                // TasteLikeOption: this.tasteLikeOption,
                // TasteDislikeOption: this.tasteDislikeOption,

                SamplingOption: this.samplingOption,
                TasteRatings: this.tasteRatings,
                ExperienceRatings: this.experienceRatings,
                PackageRatings: this.packageRatings,
                OverallRatings: this.overallRatings,
                WouldBuy: this.wouldBuy,
                WouldRecommend: this.wouldRecommend,

                Question1Response: this.question1Response,
                // Question2Response: this.question2Response,

                CreatedAt: new Date(),
            };

            console.log(feedbackData);

            db.collection("feedbacks")
                .add(feedbackData)
                .then((docRef) => {
                    docRef;
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    error;
                    console.error("Error adding document: ", error);
                });
        },

        getFormFeedbacks() {
            /* And use .orderBy("createdAt").onSnapshot() to order by time
                replace .get().then() with .onSnapshot() for realtime update
            */
            db.collection("feedbacks")
                .orderBy("createdAt")
                .get()
                .then((querySnapshot) => {
                    let allFeebacks = [];

                    querySnapshot.forEach((doc) => {
                        allFeebacks.push(doc.data());
                    });

                    this.allFeedbacks = allFeebacks;
                    console.log(this.allFeedbacks);
                });
        },

        // if last form... submit
        submitForm() {
            if (this.isValid) {
                this.addFormFeedback();

                this.isShownNewRespose = true;
                $("#regForm").hide("slow");

                this.errorMessage =
                    "All fields are required... Please fill in the empty fields!";
                $(".error_message_contianer").hide();
            } else {
                this.currentTab = 2;
                this.showTab(this.currentTab);

                this.errorMessage =
                    "Please check all tabs and fill in the empty fields!";
                $(".error_message_contianer").show();

                this.isShownNewRespose = false;
                $("#regForm").show("slow");
            }
        },

        // display the specified tab of the form...
        showTab(n) {
            let tab = document.getElementsByClassName("tab");
            let prevBtn = document.getElementById("prevBtn");
            let nextBtn = document.getElementById("nextBtn");

            tab[n].style.display = "block";

            if (n == 0) {
                prevBtn.style.display = "none";
            } else {
                prevBtn.style.display = "inline";
            }

            if (n == tab.length - 1) {
                nextBtn.style.display = "none";
                this.showSubmitBtn = true;
            } else {
                this.showSubmitBtn = false;
                nextBtn.style.display = "inline";
            }

            // this.fixStepIndicator(n);
        },

        // determine which tab to display
        nextPrev(n) {
            let tab = document.getElementsByClassName("tab");

            // hide the current tab:
            tab[this.currentTab].style.display = "none";

            // increase or decrease the current tab by 1:
            this.currentTab += n;

            // Otherwise, display the correct tab:
            if (this.currentTab == 1) {
                this.errorMessage =
                    "All fields are required... Please fill in the empty fields!";

                if (!this.isValidTab1) {
                    this.error = true;
                    $(".error_message_contianer").show();
                    this.currentTab = 0;

                    // hide error message on input
                    this.removeErrorMessage();
                }

                if (this.isValidTab1) {
                    if (!this.isValidEmail) {
                        this.error = true;
                        this.errorMessage =
                            "Please enter a valid email address";
                        $(".error_message_contianer").show();

                        this.currentTab = 0;
                    } else {
                        $(".error_message_contianer").hide();
                        this.currentTab = 1;
                    }
                }
            } else if (this.currentTab == 2) {
                if (!this.isValidTab2) {
                    this.error = true;
                    $(".error_message_contianer").show();

                    this.currentTab = 1;
                } else {
                    $(".error_message_contianer").hide();
                    this.currentTab = 2;
                }
            }

            this.showTab(this.currentTab);
        },
    },

    mounted() {
        this.currentTab = 0;
        this.showTab(this.currentTab);
        this.removeErrorMessage();
    },

    created() {
        this.getFormFeedbacks();
    },
};
</script>

<style scoped lang="scss">
.error_message_contianer {
    // position: absolute;
    // top: 50%;
    // bottom: 50%;
    // left: 0;
    // right: 0;
    // width: 100%;
    // max-width: 270px;
    // height: 150px;
    // background: rgba(15, 16, 24, 0.85);
    // margin: 0 auto;
    // padding: 10px 20px;
    // border-radius: 0.25rem;
    // text-align: center;
    // display: flex;
    // justify-content: center;
    // align-items: center;

    .error_message {
        color: var(--errorColor);
        text-transform: initial;
        letter-spacing: 1px;
        font-size: 14px;
        font-style: italic;
    }
}

#regForm {
    padding-top: 1rem;
    padding-bottom: 1rem;
    position: relative;
}

/* hide all steps by default: */
.tab {
    display: none;

    & p {
        color: #fff;
        font-size: 15px;
        font-style: italic;
        text-transform: initial;
    }

    .instruction {
        color: var(--customParaText);
    }
}

.button_container {
    overflow: auto;
}

.buttons {
    float: right;
}

.tab_title,
.tab_item {
    margin-bottom: 1.5rem;
}

.tab_item label {
    display: inline-block;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    text-transform: capitalize;

    &.question_label,
    &.question_label span {
        text-transform: initial;
    }

    & ul {
        display: flex;
        flex-wrap: wrap;
        font-size: 13px;
        font-style: italic;
        color: #bbb;
        padding-left: 0;
        margin-top: 0.125rem;
        margin-bottom: 0.25rem;

        & li {
            display: flex;
            list-style: none;
            margin-left: 0.25rem;
            margin-right: 0.25rem;
            letter-spacing: 0.25px;
            text-transform: capitalize;
        }
    }
}

select,
input,
textarea {
    width: 100%;
    font-size: 15px;
    border: 1px solid #bbb;
    border-radius: 0.25rem;
    padding: 10px;
    margin-bottom: 1rem;
}

select {
    display: inline-block;
    padding-right: 20px;
    margin-bottom: 0;
}

textarea {
    resize: vertical;
    max-height: 80px;
    // white-space: pre-line;
}

.radio_inputs {
    display: flex;
    align-items: center;

    & > div {
        display: flex;
        align-items: center;
    }

    & label {
        margin-bottom: 0;
        margin-right: 1.5rem;
        font-size: 14px;
        // color: #bbb;
    }

    & input[type="radio"] {
        // width: fit-content;
        // height: auto;
        margin-bottom: 0;
        margin-right: 0.5rem;
        cursor: pointer;
    }

    @media screen and (max-width: 426px) {
        & {
            flex-wrap: wrap;

            label,
            input[type="radio"] {
                margin-bottom: 0.65rem;
            }
        }
    }
}

/* input / textarea error validation */
input.invalid,
textarea.invalid {
    background-color: #ffdddd;
}

button {
    background-color: #04aa6d;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    font-size: 15px;
    cursor: pointer;
    border-radius: 0.25rem;

    &:disabled {
        cursor: auto;
    }

    &:disabled,
    &:hover {
        opacity: 0.8;
    }

    &#prevBtn {
        background-color: var(--customText);
    }
}

/* new feedback --------- */
.new_feedback_container {
    text-align: center;

    & p {
        margin-bottom: 2rem;
        color: #fff;
    }
}
</style>