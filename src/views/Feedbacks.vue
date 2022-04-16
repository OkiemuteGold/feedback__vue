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

            <ul
                class="nav nav-tabs nav-pills nav-justified pb-3"
                id="pills-tab"
                role="tablist"
            >
                <li class="nav-item" role="presentation">
                    <button
                        class="nav-link active"
                        id="pills-formUpload-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-formUpload"
                        type="button"
                        role="tab"
                        aria-controls="pills-formUpload"
                        aria-selected="true"
                    >
                        Form Upload
                    </button>
                </li>

                <!-- <li class="nav-item" role="presentation">
                    <button
                        class="nav-link"
                        id="pills-uploadedAudio-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-uploadedAudio"
                        type="button"
                        role="tab"
                        aria-controls="pills-uploadedAudio"
                        aria-selected="false"
                    >
                        Uploaded Audio
                    </button>
                </li> -->

                <li class="nav-item" role="presentation">
                    <button
                        class="nav-link"
                        id="pills-recordedAudio-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-recordedAudio"
                        type="button"
                        role="tab"
                        aria-controls="pills-recordedAudio"
                        aria-selected="false"
                    >
                        Recorded Audio
                    </button>
                </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
                <div
                    class="tab-pane fade show active"
                    id="pills-formUpload"
                    role="tabpanel"
                    aria-labelledby="pills-formUpload-tab"
                >
                    <AllFormFeedbacks />
                </div>

                <!-- <div
                    class="tab-pane fade"
                    id="pills-uploadedAudio"
                    role="tabpanel"
                    aria-labelledby="pills-uploadedAudio-tab"
                >
                    <MultiStepForm />
                </div> -->

                <div
                    class="tab-pane fade"
                    id="pills-recordedAudio"
                    role="tabpanel"
                    aria-labelledby="pills-recordedAudio-tab"
                >
                    <AllRecordedAudios />
                </div>
            </div>
        </main>
    </div>
</template>

<script>
// import $ from "jquery";
import { fbase } from "../firebase";
import AllFormFeedbacks from "../components/AllFormFeedbacks.vue";
import AllRecordedAudios from "../components/AllRecordedAudios.vue";

export default {
    components: { AllFormFeedbacks, AllRecordedAudios },
    name: "Feedbacks",

    data() {
        return {};
    },

    methods: {
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
        }, 1000 * 60 * 60 * 3);
    },
};
</script>

<style scoped lang="scss">
main {
    // max-width: 750px !important;
    min-height: 400px;
}

.back_to_submit_feedback {
    top: 50px !important;
}

.welcome-text {
    padding-top: 25px;
    padding-bottom: 25px !important;
}

@import "@/assets/styles/_logoLogout.scss";
@import "@/assets/styles/_navTabs.scss";
</style>