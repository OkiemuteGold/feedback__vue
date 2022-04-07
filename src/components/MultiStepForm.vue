<template>
    <div>
        <form
            id="regForm"
            @submit.prevent="submitForm()"
            v-if="!isShownNewRespose"
        >
            <!-- <h2 class="form_title">Form</h2> -->

            <div class="form-group tab">
                <h3 class="tab_title">Consumer Info</h3>

                <div class="tab_item">
                    <label for="name">Consumer Name:</label>
                    <input
                        class="inputs form-control"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Full name"
                        v-model="cName"
                    />
                </div>
                <div class="tab_item">
                    <label for="email">Email:</label>
                    <input
                        class="inputs form-control"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-mail address"
                        v-model="cEmail"
                    />
                </div>
                <div class="tab_item">
                    <label for="phone">Phone:</label>
                    <input
                        class="inputs form-control"
                        type="number"
                        min="0"
                        id="phone"
                        name="phone"
                        placeholder="Phone number"
                        v-model="cPhone"
                    />
                </div>
                <div class="tab_item">
                    <label for="address">Location/Address:</label>
                    <input
                        class="inputs form-control"
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Location/address..."
                        v-model="cAddress"
                    />
                </div>

                <div class="tab_item">
                    <label for="genderInput">Gender:</label>
                    <div class="radio_inputs" id="genderInput">
                        <label for="male">Male</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            @input="getGender($event)"
                        />

                        <label for="female">Female</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            @input="getGender($event)"
                        />

                        <label for="other">Other</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="other"
                            name="gender"
                            value="other"
                            @input="getGender($event)"
                        />
                    </div>
                </div>
                <div class="tab_item">
                    <label for="ageInput">Age (Years):</label>
                    <div class="radio_inputs" id="ageInput">
                        <label for="age1">15 - 25</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="age1"
                            name="age"
                            value="15-25"
                            @input="getAge($event)"
                        />

                        <label for="age2">26 - 35</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="age2"
                            name="age"
                            value="26-35"
                            @input="getAge($event)"
                        />

                        <label for="age3">36 - 45</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="age3"
                            name="age"
                            value="36-45"
                            @input="getAge($event)"
                        />

                        <label for="age4">46 - 60</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="age4"
                            name="age"
                            value="46-60"
                            @input="getAge($event)"
                        />
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
                    <select
                        id="productSampling"
                        @input="getSampleOption($event)"
                    >
                        <option disabled>Select product for sampling</option>
                        <option value="Vita Milk Strawberry">
                            Vita Milk Strawberry
                        </option>
                        <option value="Vita Milk Chocolate">
                            Vita Milk Chocolate
                        </option>
                    </select>
                </div>
                <div class="tab_item">
                    <label for="feedbackTaste">Feedback on taste</label>
                    <select id="feedbackTaste" @input="getTasteOption($event)">
                        <option disabled>Select feedback on taste</option>
                        <option value="very good">
                            The taste was very good
                        </option>
                        <option value="not okay">The taste was not okay</option>
                    </select>
                </div>
                <div class="tab_item">
                    <label for="feedbackPackaging">Feedback on packaging</label>
                    <select
                        id="feedbackPackaging"
                        @input="getPackagingOption($event)"
                    >
                        <option disabled>Select feedback on packaging</option>
                        <option value="nice and colorful">
                            The packaging is very nice and colorful
                        </option>
                        <option value="needs improvement">
                            The packaging needs improvement
                        </option>
                    </select>
                </div>

                <div class="tab_item">
                    <label for="rad1Input" class="question_label"
                        >How do you see the appearance of the product you just
                        tasted?
                        <span>
                            (Very good: 5, Good: 4, Fair: 3, Poor: 2, Bad: 1)
                        </span>
                    </label>

                    <div class="radio_inputs" id="rad1Input">
                        <label for="rad1one">1</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad1one"
                            name="rad1"
                            value="Bad"
                            @input="getRadioInput1($event)"
                        />

                        <label for="rad1two">2</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad1two"
                            name="rad1"
                            value="Poor"
                            @input="getRadioInput1($event)"
                        />

                        <label for="rad1three">3</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad1three"
                            name="rad1"
                            value="Fair"
                            @input="getRadioInput1($event)"
                        />

                        <label for="rad1four">4</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad1four"
                            name="rad1"
                            value="Good"
                            @input="getRadioInput1($event)"
                        />

                        <label for="rad1five">5</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad1five"
                            name="rad1"
                            value="Very good"
                            @input="getRadioInput1($event)"
                        />
                    </div>
                </div>
                <div class="tab_item">
                    <label for="rad2Input" class="question_label"
                        >How sweet is the product you just tasted?
                        <span>
                            (Very sweet: 5, Sweet: 4, Fair: 3, Poor: 2, Bad: 1)
                        </span>
                    </label>

                    <div class="radio_inputs" id="rad2Input">
                        <label for="rad2one">1</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad2one"
                            name="rad2"
                            value="Bad"
                            @input="getRadioInput2($event)"
                        />

                        <label for="rad2two">2</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad2two"
                            name="rad2"
                            value="Poor"
                            @input="getRadioInput2($event)"
                        />

                        <label for="rad2three">3</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad2three"
                            name="rad2"
                            value="Fair"
                            @input="getRadioInput2($event)"
                        />

                        <label for="rad2four">4</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad2four"
                            name="rad2"
                            value="Good"
                            @input="getRadioInput2($event)"
                        />

                        <label for="rad2five">5</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad2five"
                            name="rad2"
                            value="Very good"
                            @input="getRadioInput2($event)"
                        />
                    </div>
                </div>
                <div class="tab_item">
                    <label for="rad3Input" class="question_label"
                        >What is your overall ratings for the product you just
                        tasted?
                        <span>
                            (Very good: 5, Good: 4, Fair: 3, Poor: 2, Bad: 1)
                        </span>
                    </label>

                    <div class="radio_inputs" id="rad3Input">
                        <label for="rad3one">1</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad3one"
                            name="rad3"
                            value="Bad"
                            @input="getRadioInput3($event)"
                        />

                        <label for="rad3two">2</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad3two"
                            name="rad3"
                            value="Poor"
                            @input="getRadioInput3($event)"
                        />

                        <label for="rad3three">3</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad3three"
                            name="rad3"
                            value="Fair"
                            @input="getRadioInput3($event)"
                        />

                        <label for="rad3four">4</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad3four"
                            name="rad3"
                            value="Good"
                            @input="getRadioInput3($event)"
                        />

                        <label for="rad3five">5</label>
                        <input
                            class="inputs"
                            type="radio"
                            id="rad3five"
                            name="rad3"
                            value="Very good"
                            @input="getRadioInput3($event)"
                        />
                    </div>
                </div>

                <div class="tab_item">
                    <label for="tasteLike"
                        >What do you like about the taste?</label
                    >
                    <select id="tasteLike" @input="getTasteLikeOption($event)">
                        <option disabled value="">Select what you like</option>
                        <option value="nice chocolate taste">
                            The Chocolate taste is very nice
                        </option>
                    </select>
                    {{ tasteLikeOption }}
                </div>
                <div class="tab_item">
                    <label for="tasteDislike"
                        >What do you dislike about the taste?
                    </label>
                    <select
                        id="tasteDislike"
                        @input="getTasteDislikeOption($event)"
                    >
                        <option disabled>Select what you dislike</option>
                        <option value="the aroma">
                            I am allergic to such aroma
                        </option>
                        <option value="taste is sour">
                            The product has a sour taste
                        </option>
                    </select>
                    {{ tasteDislikeOption }}
                </div>
            </div>

            <div class="form-group tab">
                <!-- <h3 class="tab_title">Please give us your feedback</h3> -->

                <div class="tab_item">
                    <label for="question1"
                        >What do you like about the product?</label
                    >
                    <textarea
                        class="inputs form-control"
                        name="question1"
                        id="question1"
                        cols="30"
                        rows="5"
                        placeholder="Your response"
                        @input="getQuestion1Response($event)"
                    ></textarea>

                    {{ question1Response }}
                </div>
                <div class="tab_item">
                    <label for="question2"
                        >What would you recommend we do differently?</label
                    >
                    <textarea
                        class="inputs form-control"
                        name="question2"
                        id="question2"
                        cols="30"
                        rows="5"
                        placeholder="Your recommendation"
                        @input="getQuestion2Response($event)"
                    ></textarea>

                    {{ question2Response }}
                </div>
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
                    >
                        Submit
                    </button>
                </div>
            </div>

            <!-- indicators -->
            <!-- <div id="indicators" class="indicators"></div> -->
        </form>

        <div
            v-if="isShownNewRespose"
            id="new_feedback_container"
            class="new_feedback_container"
        >
            <h3 class="tab_title">Thank you for your feedback</h3>
            <p>Please submit another feedback</p>

            <button @click="submitNewFeedback()">Submit New Feedback</button>
        </div>
    </div>
</template>

<script>
// import $ from "jquery";

export default {
    data() {
        return {
            currentTab: 0,
            showSubmitBtn: false,
            isShownNewRespose: false,

            cName: "",
            cEmail: "",
            cPhone: "",
            cAddress: "",
            date: "",

            gender: "",
            age: "",

            sampleOption: "",
            tasteOption: "",
            packagingOption: "",
            tasteLikeOption: "",
            tasteDislikeOption: "",

            rad1: "",
            rad2: "",
            rad3: "",

            question1Response: "",
            question2Response: "",
        };
    },
    computed: {
        // form validation
        isValidTab1() {
            return (
                this.cName !== "" &&
                this.cEmail !== "" &&
                this.cPhone !== "" &&
                this.cAddress !== "" &&
                this.date !== "" &&
                this.gender !== "" &&
                this.age !== ""
            );
        },

        isValidTab2() {
            return this.rad1 !== "" && this.rad2 !== "" && this.rad3 !== "";
        },

        isValidTab3() {
            return (
                this.question1Response !== "" && this.question2Response !== ""
            );
        },

        isValid() {
            return this.isValidTab1 && this.isValidTab2 && this.isValidTab3;
        },

        validateForm() {
            let x,
                y,
                i,
                valid = true;

            x = document.getElementsByClassName("tab");
            y = x[this.currentTab].getElementsByClassName(
                "inputs form-control"
            );

            // loop through / checks all input / textarea fields in the current tab:
            for (i = 0; i < y.length; i++) {
                if (y[i].value == "") {
                    y[i].className += " invalid";

                    valid = true;
                }
                //  else {
                //     valid = true;
                // }
            }

            // If the valid status is true, mark the step as finished and valid:
            if (valid) {
                document.getElementsByClassName("step")[
                    this.currentTab
                ].className += " finish";
            }
            return valid;
        },
    },

    methods: {
        prevTab() {
            this.nextPrev(-1);
        },
        nextTab() {
            this.nextPrev(1);
        },

        getAge(event) {
            this.age = event.target.value;
        },
        getGender(event) {
            this.gender = event.target.value;
        },
        getSampleOption(event) {
            this.sampleOption = event.target.value;
        },
        getTasteOption(event) {
            this.tasteOption = event.target.value;
        },
        getPackagingOption(event) {
            this.packagingOption = event.target.value;
        },
        getTasteLikeOption(event) {
            this.tasteLikeOption = event.target.value;
            console.log(this.tasteDislikeOption);
        },
        getTasteDislikeOption(event) {
            this.tasteDislikeOption = event.target.value;
            console.log(this.tasteDislikeOption);
        },
        getRadioInput1(event) {
            this.rad1 = event.target.value;
        },
        getRadioInput2(event) {
            this.rad2 = event.target.value;
        },
        getRadioInput3(event) {
            this.rad3 = event.target.value;
        },
        getQuestion1Response(event) {
            this.question1Response = event.target.value;
        },
        getQuestion2Response(event) {
            this.question2Response = event.target.value;
        },

        submitNewFeedback() {
            window.location.reload();

            let tab = document.getElementsByClassName("tab");
            this.currentTab = 0;
            tab[0].style.display = "block";
            this.showTab(this.currentTab);
            this.isShownNewRespose = false;
            // $("#regForm").hide();
        },

        // if last form... submit
        submitForm() {
            console.log(
                this.question1Response,
                this.question2Response,
                this.tasteDislikeOption,
                this.tasteLikeOption
            );
            this.isShownNewRespose = true;
        },

        // display the specified tab of the form...
        showTab(n) {
            let tab = document.getElementsByClassName("tab");
            let prevBtn = document.getElementById("prevBtn");
            let nextBtn = document.getElementById("nextBtn");

            if (tab) {
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
            }

            // this.fixStepIndicator(n);
        },

        // determine which tab to display
        nextPrev(n) {
            let tab = document.getElementsByClassName("tab");

            if (tab) {
                // hide the current tab:
                tab[this.currentTab].style.display = "none";

                // increase or decrease the current tab by 1:
                this.currentTab += n;

                // if (this.currentTab >= tab.length) {
                //     this.submitForm();
                //     this.isShownNewRespose = true;
                //     return true;
                // }

                // Otherwise, display the correct tab:
                if (this.currentTab == 1) {
                    if (!this.isValidTab1) {
                        console.log("false1");
                        this.currentTab = 0;
                    } else {
                        console.log("true1");
                        this.currentTab = 1;
                    }
                } else if (this.currentTab == 2) {
                    if (!this.isValidTab2) {
                        console.log("false1");
                        this.currentTab = 1;
                    } else {
                        console.log("true1");
                        this.currentTab = 2;
                    }
                } else if (this.currentTab == 3) {
                    if (!this.isValidTab3) {
                        console.log("false1");
                        this.currentTab = 2;
                    } else {
                        // this.currentTab = 0;
                        // this.showTab(this.currentTab);
                        this.isShownNewRespose = true;
                    }
                }

                this.showTab(this.currentTab);
            }
        },

        // fixStepIndicator(n) {
        //     let tabs = document.getElementsByClassName("tab");
        //     let indicators = document.getElementById("indicators");

        //     let i = 0;
        //     while (i < tabs.length) {
        //         let span = document.createElement("span");
        //         console.log(span);

        //         span.classList = "step";
        //         indicators.appendChild(span);

        //         i += 1;
        //     }

        //     // remove active class of all steps and add to the current step
        //     let j,
        //         x = document.getElementsByClassName("step");
        //     for (j = 0; j < x.length; j++) {
        //         x[j].className = x[j].className.replace(" active", "");
        //     }

        //     x[n].className += " active";
        // },

        // load() {
        //     // let tabs = document.getElementsByClassName("tab");
        //     // console.log(tabs);
        //     // const indicators = document.getElementById("indicators");

        //     // let i = 0;

        //     // while (i < tabs.length) {
        //     //     let span = document.createElement("span");
        //     //     console.log(span);
        //     //     span.classList = "step";
        //     //     indicators.appendChild(span);

        //     //     i += 1;
        //     // }

        //     this.currentTab = 0;

        //     // display the specified tab of the form...
        //     this.showTab(this.currentTab);

        //     // determine which tab to display
        //     this.nextPrev(this.currentTab);
        // },
    },

    mounted() {
        this.currentTab = 0;
        this.showTab(this.currentTab);
    },
};
</script>

<style scoped lang="scss">
select {
    display: inline-block;
    width: 100%;
    padding: 12px 20px 12px 10px;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
}

// #regForm,
// #newFeedback {
//     background-color: #0f202c;
// }

.form_title {
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 2rem;
}

.tab_title,
.tab_item {
    margin-bottom: 1.25rem;
}

.tab_item label {
    display: inline-block;
    font-size: 15px;
    margin-bottom: 0.5rem;

    & span {
        display: inline-block;
        font-style: italic;
        font-size: 13.5px;
        color: #ccc;
        margin-bottom: 0.5rem;
    }
}

.question_label {
    text-transform: initial;
}

input,
textarea {
    padding: 10px;
    width: 100%;
    font-size: 15px;
    border: 1px solid #aaaaaa;
    margin-bottom: 1rem;
    border-radius: 0.25rem;
}

textarea {
    resize: vertical;
    max-height: 80px;
}

.radio_inputs {
    display: flex;
    align-items: center;

    & label {
        margin-bottom: 0;
        margin-right: 0.5rem;
    }

    & input[type="radio"] {
        width: fit-content;
        height: auto;
        margin-bottom: 0;
        margin-right: 1.5rem;
        cursor: pointer;
    }
}

/* input / textarea error validation */
input.invalid,
textarea.invalid {
    background-color: #ffdddd;
}

/* hide all steps by default: */
.tab {
    display: none;
}

.button_container {
    overflow: auto;
}

.buttons {
    float: right;
}

button {
    background-color: #04aa6d;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    font-size: 15px;
    cursor: pointer;
    border-radius: 0.25rem;

    &:disabled,
    &:hover {
        opacity: 0.8;
    }

    &#prevBtn {
        background-color: var(--customText);
    }
}

/* steps */
.indicators {
    text-align: center;
    margin-top: 40px;

    & .step {
        height: 15px;
        width: 15px;
        margin: 0 3px;
        background-color: #bbbbbb;
        border: none;
        border-radius: 50%;
        display: inline-block;
        opacity: 0.5;

        &.active {
            opacity: 1;
        }

        /* steps that's finished and valid: */
        &.finish {
            background-color: #04aa6d;
        }
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