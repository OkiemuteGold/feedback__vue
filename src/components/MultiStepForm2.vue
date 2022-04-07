<template>
    <form id="regForm">
        <h2 class="form_title">Form</h2>

        <div class="form-group tab">
            <h3 class="tab_title">Consumer Info</h3>

            <div class="tab_item">
                <label for="email">Consumer Name:</label>
                <input
                    class="inputs form-control"
                    placeholder="Full name..."
                    name="email"
                    v-model="cName"
                />
            </div>
            <div class="tab_item">
                <label for="email">Email:</label>
                <input
                    class="inputs form-control"
                    placeholder="E-mail..."
                    name="email"
                    v-model="email"
                />
            </div>
            <div class="tab_item">
                <label for="phone">Phone:</label>
                <input
                    class="inputs form-control"
                    placeholder="Phone..."
                    name="phone"
                    v-model="phone"
                />
            </div>
            <div class="tab_item">
                <label for="phone">Location/Address:</label>
                <input
                    class="inputs form-control"
                    placeholder="Address..."
                    name="address"
                    v-model="address"
                />
            </div>

            <div class="tab_item">
                <label for="gender">Gender:</label>
                <div class="radio_inputs">
                    <label for="male">Male:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="male"
                        name="gender"
                        v-model="male"
                    />

                    <label for="female">Female:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="female"
                        name="gender"
                        v-model="female"
                    />

                    <label for="others">Others:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="others"
                        name="gender"
                        v-model="others"
                    />
                </div>
            </div>

            <div class="tab_item">
                <label for="age">Age (Years):</label>
                <div class="radio_inputs">
                    <label for="age1">15 - 25:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="age1"
                        name="age"
                        v-model="age1"
                    />

                    <label for="age2">26 - 35:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="age2"
                        name="age"
                        v-model="age2"
                    />

                    <label for="age3">36 - 45:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="age3"
                        name="age"
                        v-model="age3"
                    />

                    <label for="age4">46 - 60:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="age4"
                        name="age"
                        v-model="age4"
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
            <h3 class="tab_title">Responses</h3>

            <div class="tab_item">
                <label for="productSampling">Product for sampling</label>
                <select id="productSampling">
                    <option value="Product for sampling">
                        Select product for sampling
                    </option>
                    <option value="Product for sampling">
                        Vita Milk Strawberry
                    </option>
                </select>
            </div>

            <div class="tab_item">
                <label for="feedbackTaste">Feedback on taste</label>
                <select id="feedbackTaste">
                    <option disabled>Select feedback on taste</option>
                    <option value="very good">The taste was very good</option>
                    <option value="not okay">The taste was not okay</option>
                </select>
            </div>

            <div class="tab_item">
                <label for="testdislike">Feedback on packaging</label>
                <select id="testdislike">
                    <option disabled>
                        What is your feedback on packaging?
                    </option>
                    <option value="nice and colorful">
                        The packaging is very nice and colorful
                    </option>
                    <option value="needs improvement">
                        The packaging needs improvement
                    </option>
                </select>
            </div>

            <div class="tab_item">
                <label for="rad1mark" class="question_label"
                    >How do you see the appearance of the product you just
                    tasted?
                    <span>
                        (Very good: 5, Good enough: 3, Not at all good: 1)
                    </span>
                </label>
                <div class="radio_inputs">
                    <label for="rad1one">1:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad1one"
                        name="rad1mark"
                        v-model="rad1one"
                    />

                    <label for="rad1two">2:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad1two"
                        name="rad1mark"
                        v-model="rad1two"
                    />

                    <label for="rad1three">3:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad1three"
                        name="rad1mark"
                        v-model="rad1three"
                    />

                    <label for="rad1four">4:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad1four"
                        name="rad1mark"
                        v-model="rad1four"
                    />

                    <label for="rad1five">5:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad1five"
                        name="rad1mark"
                        v-model="rad1five"
                    />
                </div>
            </div>

            <div class="tab_item">
                <label for="rad2mark" class="question_label"
                    >How sweet is the product you just tasted?
                    <span>
                        (Very sweet: 5, Sweet enough: 3, Not at all sweet: 1)
                    </span>
                </label>
                <div class="radio_inputs">
                    <label for="rad2one">1:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad2one"
                        name="rad2mark"
                        v-model="rad2one"
                    />

                    <label for="rad2two">2:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad2two"
                        name="rad2mark"
                        v-model="rad2two"
                    />

                    <label for="rad2three">3:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad2three"
                        name="rad2mark"
                        v-model="rad2three"
                    />

                    <label for="rad2four">4:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad2four"
                        name="rad2mark"
                        v-model="rad2four"
                    />

                    <label for="rad2five">5:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad2five"
                        name="rad2mark"
                        v-model="rad2five"
                    />
                </div>
            </div>

            <div class="tab_item">
                <label for="rad3mark" class="question_label"
                    >What is your overall ratings for the product you just
                    tasted?
                    <span>
                        (Very good: 5, Good enough: 3, Not at all good: 1)
                    </span>
                </label>
                <div class="radio_inputs">
                    <label for="rad3one">1:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad3one"
                        name="rad3mark"
                        v-model="rad3one"
                    />

                    <label for="rad3two">2:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad3two"
                        name="rad3mark"
                        v-model="rad3two"
                    />

                    <label for="rad3three">3:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad3three"
                        name="rad3mark"
                        v-model="rad3three"
                    />

                    <label for="rad3four">4:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad3four"
                        name="rad3mark"
                        v-model="rad3four"
                    />

                    <label for="rad3five">5:</label>
                    <input
                        class="inputs"
                        type="radio"
                        id="rad3five"
                        name="rad3mark"
                        v-model="rad3five"
                    />
                </div>
            </div>

            <div class="tab_item">
                <label for="productsampling"
                    >How do you feel about the product you just tasted?</label
                >
                <select id="productsampling">
                    <option value="Product for sampling">
                        Select Product For Sampling
                    </option>
                    <option value="Product for sampling">
                        Vita Milk Strawberry
                    </option>
                </select>
            </div>
            <div class="tab_item">
                <label for="productsampling"
                    >What do you dislike about the test?
                </label>
                <select id="productsampling">
                    <option value="Product for sampling">
                        Select what you dislike about the test?
                    </option>
                    <option value="Product for sampling">
                        The appearance is very nice and attractive.
                    </option>
                </select>
            </div>
            <div class="tab_item">
                <label for="question3"
                    >What would you recommend differently?</label
                >
                <textarea
                    class="inputs form-control"
                    name="question3"
                    id="question3"
                    cols="30"
                    rows="5"
                    placeholder="Response..."
                    oninput="this.className = ''"
                ></textarea>
            </div>
        </div>

        <div class="form-group tab">
            <h3 class="tab_title">Please give us your feedback</h3>

            <div class="tab_item">
                <label for="question1"
                    >What do you dislike about the product?</label
                >
                <textarea
                    class="inputs form-control"
                    name="question1"
                    id="question1"
                    cols="30"
                    rows="5"
                    placeholder="Response..."
                    oninput="this.className = ''"
                ></textarea>
            </div>
            <div class="tab_item">
                <label for="question2"
                    >What do you dislike about the taste?</label
                >
                <textarea
                    class="inputs form-control"
                    name="question2"
                    id="question2"
                    cols="30"
                    rows="5"
                    placeholder="Response..."
                    oninput="this.className = ''"
                ></textarea>
            </div>
            <div class="tab_item">
                <label for="question3"
                    >What would you recommend differently?</label
                >
                <textarea
                    class="inputs form-control"
                    name="question3"
                    id="question3"
                    cols="30"
                    rows="5"
                    placeholder="Response..."
                    oninput="this.className = ''"
                ></textarea>
            </div>
        </div>

        <div class="button_container">
            <div class="buttons">
                <button type="button" id="prevBtn" @click="nextPrev(-1)">
                    Previous
                </button>
                <button type="button" id="nextBtn" @click="nextPrev(1)">
                    Next
                </button>
            </div>
        </div>

        <!-- indicators -->
        <div id="indicators" class="indicators"></div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            currentTab: 0,
            valid: true,

            cName: "",
            email: "",
            phone: "",
            address: "",
            date: "",

            male: "",
            female: "",
            others: "",

            age1: "",
            age2: "",
            age3: "",
            age4: "",

            rad1one: "",
            rad1two: "",
            rad1three: "",
            rad1four: "",
            rad1five: "",

            rad2one: "",
            rad2two: "",
            rad2three: "",
            rad2four: "",
            rad2five: "",

            rad3one: "",
            rad3two: "",
            rad3three: "",
            rad3four: "",
            rad3five: "",
        };
    },
    computed: {
        // form validation
        isValid() {
            console.log(this.valid);
            return this.valid;
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

                    valid = false;
                } else {
                    valid = true;
                }
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
        // display the specified tab of the form...
        showTab(n) {
            var x = document.getElementsByClassName("tab");
            const prevBtn = document.getElementById("prevBtn");
            const nextBtn = document.getElementById("nextBtn");

            // console.log(x);

            x[n].style.display = "block";

            if (n == 0) {
                prevBtn.style.display = "none";
            } else {
                prevBtn.style.display = "inline";
            }
            if (n == x.length - 1) {
                nextBtn.innerHTML = "Submit";
            } else {
                nextBtn.innerHTML = "Next";
            }

            this.fixStepIndicator(n);
        },

        // determine which tab to display
        nextPrev(n) {
            var x = document.getElementsByClassName("tab");

            // Exit if any field in the current tab is invalid:
            if (n == 1 && !this.validateForm) return false;

            // hide the current tab:
            x[this.currentTab].style.display = "none";

            // increase or decrease the current tab by 1:
            this.currentTab = this.currentTab + n;

            // if last form... submit
            if (this.currentTab >= x.length) {
                document.getElementById("regForm").submit();

                return false;
            }

            // Otherwise, display the correct tab:
            this.showTab(this.currentTab);
        },

        fixStepIndicator(n) {
            // remove active class of all steps and add to the current step
            var i,
                x = document.getElementsByClassName("step");
            for (i = 0; i < x.length; i++) {
                x[i].className = x[i].className.replace(" active", "");
            }

            x[n].className += " active";
        },

        load() {
            let tabs = document.getElementsByClassName("tab");
            const indicators = document.getElementById("indicators");

            let i = 0;

            while (i < tabs.length) {
                let span = document.createElement("span");
                span.classList = "step";
                indicators.appendChild(span);

                i += 1;
            }

            this.currentTab = 0;

            // display the specified tab of the form...
            this.showTab(this.currentTab);

            // determine which tab to display
            this.nextPrev(this.currentTab);
        },
    },

    mounted() {
        this.load();
    },
};
</script>

<style scoped lang="scss">
#regForm,
input,
textarea,
button {
    -o-transition: 0.4s ease;
    -moz-transition: 0.4s ease;
    -webkit-transition: 0.4s ease;
    transition: 0.4s ease;
}

select {
    display: inline-block;
    width: 100%;
    padding: 12px 20px 12px 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

#regForm,
#newFeedback {
    background-color: #0f202c;
    width: 100%;
    max-width: 600px;
    position: relative;
}

// #newFeedback {
//     display: none;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     text-align: center;
// }

// .tab {
//     margin-bottom: 2rem;
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
    margin-bottom: 0.5rem;

    & span {
        display: inline-block;
        font-style: italic;
        font-size: 0.875rem;
        color: #ccc;
    }
}

input,
textarea {
    padding: 10px;
    width: 100%;
    font-size: 15px;
    border: 1px solid #aaaaaa;
    margin-bottom: 1rem;
}

textarea {
    resize: vertical;
    max-height: 80px;
}

.question_label {
    text-transform: initial;
}

.radio_inputs {
    display: flex;
    align-items: center;
}

.radio_inputs label {
    margin-right: 0.5rem;
}

.radio_inputs input[type="radio"] {
    width: fit-content;
    height: auto;
    margin-bottom: 0.5rem;
    margin-right: 1.5rem;
    cursor: pointer;
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
    font-size: 17px;
    cursor: pointer;
}

button:hover {
    opacity: 0.8;
}

#prevBtn {
    background-color: #777;
}

/* steps */
.indicators {
    text-align: center;
    margin-top: 40px;
}

.step {
    height: 15px;
    width: 15px;
    margin: 0 3px;
    background-color: #bbbbbb;
    border: none;
    border-radius: 50%;
    display: inline-block;
    opacity: 0.5;
}

.step.active {
    opacity: 1;
}

/* steps that's finished and valid: */
.step.finish {
    background-color: #04aa6d;
}

/* new feedback --------- */
/* .new_feedback {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
} */

.new_feedback p {
    margin-bottom: 2rem;
}

// @media screen and (max-width: 426px) {
//     #regForm {
//         padding: 40px 20px;
//     }
// }
</style>