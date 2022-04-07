<template>
    <div class="user-login">
        <main>
            <div class="welcome-text">
                <h1><span>VitaMilk</span> Feedback Form</h1>
                <hr />
                <p>{{ instructionText }}</p>
            </div>

            <ul
                class="nav nav-tabs nav-pills nav-justified pb-3"
                id="pills-tab"
                role="tablist"
            >
                <li class="nav-item" role="presentation">
                    <button
                        class="nav-link active"
                        id="pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                        @click="changeInstructionText('form')"
                    >
                        Form
                    </button>
                </li>

                <li class="nav-item" role="presentation">
                    <button
                        class="nav-link"
                        id="pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                        @click="changeInstructionText('audio')"
                    >
                        Audio
                    </button>
                </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
                <div
                    class="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                >
                    <MultiStepForm />
                </div>

                <div
                    class="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                >
                    <form
                        id="audioForm"
                        @submit.prevent="submitAudioFeedback()"
                    >
                        <div class="tab_item">
                            <label for="audio">Upload audio</label>
                            <input
                                type="file"
                                name="audio"
                                id="audio"
                                class="inputs form-control"
                                @input="getAudio($event)"
                            />

                            <p>{{ successMessage }}</p>
                        </div>

                        <button type="submit" :disabled="!audio" class="btn">
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
// import $ from "jquery";
// import "@/mixins";
import { fbase } from "../firebase";
import MultiStepForm from "../components/MultiStepForm.vue";

export default {
    name: "Feedback",

    components: { MultiStepForm },
    data() {
        return {
            instructionText: "How do you want to submit your feedback?",
            audio: null,
            successMessage: "",

            form: {
                fullname: null,
                email: null,
                password: null,
            },
        };
    },

    methods: {
        changeInstructionText(action) {
            action.toLowerCase() == "form"
                ? (this.instructionText = "Submit feedback using a Form")
                : (this.instructionText = "Submit feedback using an Audio");
        },

        getAudio(event) {
            this.audio = event.target.value;
        },

        submitAudioFeedback() {
            if (this.audio !== null) {
                console.log(this.audio);
                this.successMessage = "Done! Please submit another feedback.";

                setTimeout(() => {
                    this.successMessage = "";
                }, 4000);
            }
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
        setTimeout(() => {
            this.logout();
        }, 10000 * 6 * 30);
    },
};
</script>

<style scoped lang="scss">
.user-login {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--appBackgroundLight);
    overflow: hidden;
}

main {
    width: 100%;
    max-width: 700px;
    padding: 50px 60px;
    margin: 2rem 1rem;
    background: var(--appBackgroundDark);
    color: #fff;
    border-radius: 0.25rem;
    position: relative;
    overflow-y: auto;
}

.header {
    position: absolute;
    top: 0;
    left: 0;
    margin: 3px;

    a {
        border-radius: 3px;
        background: #fff;
        color: var(--customBlue);
    }
}

.welcome-text {
    padding-bottom: 20px;
    text-align: center;

    h1 {
        font-size: 35px;
        text-shadow: 0.5px 0.5px 1px var(--customParaText);
        letter-spacing: 0.5px;
    }

    p {
        color: #fff;
        font-size: 15px;
    }
}

.nav-pills .nav-link {
    text-transform: uppercase;
    color: var(--customBlue);
    font-size: 15px;

    &:not(.nav-link.active):hover {
        color: var(--customBlueLight);
        background: rgba(0, 0, 0, 0.2);
    }
}

.nav-pills .nav-link.active {
    background: var(--customBlue);
}

.tab-content {
    text-transform: capitalize;
    margin-top: 1.75rem;
}

form {
    label {
        font-size: 15px;
    }

    input,
    input::placeholder {
        font-size: 13px;
    }

    .form-text {
        color: var(--customParaText);
        font-style: italic;
        font-size: 12px;
        margin-top: 10px;
    }
}

.form-check-input:checked {
    background-color: var(--customBlue);
    border-color: var(--customBlue);
}

form button {
    margin-top: 10px;
    background: transparent;
    color: var(--customBlueLight);
    border-color: var(--customBlue);
    width: 100%;

    &:hover,
    &:active,
    &:focus {
        box-shadow: none;
        background: var(--customBlue);
        color: #fff;
    }

    &.disabled {
        opacity: 0.5;
    }
}

#audioForm {
    .tab_item {
        margin-bottom: 1.25rem;
    }

    label {
        margin-bottom: 1rem;
    }

    p {
        color: #fff;
        margin-top: 1rem;
    }
}

@media screen and (max-width: 426px) {
    main {
        padding: 50px 20px;
        height: 100%;
    }

    .header {
        a {
            padding: 0.25rem 0.5rem;
        }
    }

    .welcome-text {
        padding-bottom: 15px;

        h1 {
            font-size: 24px;
        }
        // p {
        //     font-size: 13px;
        // }
    }

    .tab-content {
        text-transform: capitalize;
        margin-top: 1.5rem;
    }

    label {
        font-size: 13px !important;
    }
}
</style>
