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

            <div class="view_all_feedback" v-if="showViewFeedbackBtn">
                <button class="btn" @click="goToFeedbacksPage()">
                    View Feedbacks
                </button>
            </div>

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
                    <div class="audio_buttons" v-if="!notAvailable">
                        <button
                            class="btn"
                            v-if="!recordAudio"
                            @click="toggleAudioOption()"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                            >
                                <path
                                    d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm-64 268c0 10.7-12.9 16-20.5 8.5L104 376H76c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h28l35.5-36.5c7.6-7.6 20.5-2.2 20.5 8.5v136zm33.2-47.6c9.1-9.3 9.1-24.1 0-33.4-22.1-22.8 12.2-56.2 34.4-33.5 27.2 27.9 27.2 72.4 0 100.4-21.8 22.3-56.9-10.4-34.4-33.5zm86-117.1c54.4 55.9 54.4 144.8 0 200.8-21.8 22.4-57-10.3-34.4-33.5 36.2-37.2 36.3-96.5 0-133.8-22.1-22.8 12.3-56.3 34.4-33.5zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"
                                />
                            </svg>
                            <span>Upload audio instead</span>
                        </button>
                        <button
                            class="btn"
                            v-if="recordAudio"
                            @click="toggleAudioOption()"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    d="M256 152a104 104 0 1 0 104 104 104 104 0 0 0-104-104zm0 128a24 24 0 1 1 24-24 24 24 0 0 1-24 24zm0-272C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 376a128 128 0 1 1 128-128 128 128 0 0 1-128 128z"
                                />
                            </svg>
                            <span>Record audio instead</span>
                        </button>
                    </div>

                    <!-- <div v-if="notAvailable">
                        <UploadAudio v-if="recordAudio" />
                        <RecordAudio v-else :notAvailable="notAvailable" />
                    </div>

                    <p v-else class="text-white text-center">
                        Not currently available <br />
                        Please use the form!
                    </p> -->

                    <UploadAudio v-if="recordAudio" />
                    <RecordAudio v-else :notAvailable="notAvailable" />
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
import UploadAudio from "../components/UploadAudio.vue";
import RecordAudio from "../components/RecordAudio.vue";
import adminUsers from "../../adminUsers";

export default {
    name: "SubmitFeedback",

    components: { MultiStepForm, UploadAudio, RecordAudio },
    data() {
        return {
            instructionText: "How do you want to submit your feedback?",
            recordAudio: true,
            notAvailable: false,

            showViewFeedbackBtn: false,
            adminUsers,
        };
    },

    methods: {
        changeInstructionText(action) {
            action.toLowerCase() == "form"
                ? (this.instructionText = "Submit feedback using a Form")
                : (this.instructionText = "Submit feedback using an Audio");
        },

        toggleAudioOption() {
            this.recordAudio = !this.recordAudio;
        },

        getauthorizedUsers() {
            const user = fbase.auth().currentUser;
            const uid = user.uid;
            const adminUsers = this.adminUsers;

            if (user !== null) {
                user.providerData.forEach((profile) => {
                    // console.log(profile);
                    const profileId = profile.uid;

                    adminUsers.forEach((admin) => {
                        // console.log(uid, admin.uid, admin.profid);

                        if (uid === admin.uid && profileId === admin.profid) {
                            this.showViewFeedbackBtn = true;
                        }
                    });
                });
            }
        },

        goToFeedbacksPage() {
            this.$router.replace("/feedbacks");
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
        this.getauthorizedUsers();

        setTimeout(() => {
            this.logout();
        }, 1000 * 60 * 60 * 3);
    },
};
</script>

<style scoped lang="scss">
main {
    width: 100%;

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
        transform: scale(0.98);
    }

    & span {
        margin-right: 0.5rem;
        font-size: 12px;
    }

    & svg {
        fill: #fff;
        height: 1rem;
        width: 1rem;
    }
}

// .view_all_feedback {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     position: absolute;
//     top: 7.5%;
//     right: 2%;

//     .btn {
//         font-size: 12px;
//         background: var(--customBlue);
//         color: #fff;
//         padding: 0.25rem 0.5rem;
//         border-radius: 0.25rem;

//         &:hover {
//             background: var(--appBackgroundLight);
//         }
//     }
// }

.welcome-text {
    padding-top: 20px;
    padding-bottom: 35px !important;
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

.audio_buttons {
    display: flex;
    margin-bottom: 2rem;

    & .btn {
        display: flex;
        align-items: center;
        font-size: 14px;
        border: 1px solid var(--customBlueLight);
        color: var(--customBlueLight);

        & svg {
            fill: var(--errorColor);
            height: 1rem;
            width: 1rem;
            margin-right: 0.25rem;
        }
    }
}
</style>
