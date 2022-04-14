<template>
    <div class="user-login">
        <main>
            <div class="logo_container">
                <img
                    src="@/assets/soulcomms-logo.png"
                    alt="logo of soulcomms"
                />
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
                        @click="changeInstructionText('login')"
                    >
                        Login
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
                        @click="changeInstructionText('signup')"
                    >
                        Signup
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
                    <form>
                        <div class="form-group mb-3">
                            <label for="loginEmail" class="form-label"
                                >Email address</label
                            >
                            <input
                                type="email"
                                class="form-control"
                                id="loginEmail"
                                aria-describedby="emailHelp"
                                placeholder="Enter your email"
                                v-model="form.email"
                            />
                        </div>

                        <div class="form-group mb-3">
                            <label for="loginPassword" class="form-label"
                                >Password</label
                            >
                            <input
                                type="password"
                                class="form-control"
                                id="loginPassword"
                                aria-describedby="passwordHelp"
                                placeholder="Enter your password"
                                v-model="form.password"
                            />
                            <!-- <div id="passwordHelp" class="form-text">
                                Password must be 8-20 characters long, and must
                                contain letters and numbers.

                                {{ loginHelp }}
                            </div> -->

                            {{ loginHelp }}
                        </div>

                        <!-- <div class="mb-3 form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="rememberCheck"
                            />
                            <label class="form-check-label" for="rememberCheck"
                                >Remember me</label
                            >
                        </div> -->

                        <button
                            type="submit"
                            class="btn login"
                            @click.prevent="login()"
                            :disabled="!isValidLoginInfo"
                        >
                            Login
                            <span
                                class="spinner-border text-light"
                                role="status"
                                v-if="isLoading"
                            ></span>
                        </button>
                    </form>
                </div>

                <div
                    class="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                >
                    <form>
                        <div class="form-group mb-3">
                            <label for="nameInput" class="form-label"
                                >Your name</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="nameInput"
                                placeholder="Enter your full name"
                                v-model="form.fullname"
                            />
                        </div>

                        <div class="form-group mb-3">
                            <label for="signupEmail" class="form-label"
                                >Email address</label
                            >
                            <input
                                type="email"
                                class="form-control"
                                id="signupEmail"
                                aria-describedby="emailHelp"
                                placeholder="Enter your email"
                                v-model="form.email"
                            />
                            <!-- <div id="emailHelp" class="form-text">
                                We'll never share your email with anyone else.
                            </div> -->
                        </div>

                        <div class="form-group mb-3">
                            <label for="signupPassword" class="form-label"
                                >Password</label
                            >
                            <input
                                type="password"
                                class="form-control"
                                id="signupPassword"
                                aria-describedby="passwordHelp"
                                placeholder="Enter your password"
                                v-model="form.password"
                            />
                            <div id="passwordHelp" class="form-text">
                                <!-- Password must be 8-20 characters long, and must
                                contain letters and numbers. -->

                                {{ passwordHelp }}
                            </div>
                        </div>

                        <!-- <div class="mb-3 form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="agreeCheck"
                            />
                            <label class="form-check-label" for="agreeCheck"
                                >Agree to terms and conditions</label
                            >
                        </div> -->

                        <button
                            type="submit"
                            class="btn signup"
                            @click.prevent="registerUser()"
                            :disabled="!isValidSignupInfo"
                        >
                            Signup
                            <span
                                class="spinner-border text-light"
                                role="status"
                                v-if="isLoading"
                            ></span>
                        </button>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import $ from "jquery";
import "@/mixins";
import { fbase } from "../firebase";

export default {
    name: "UserLogin",

    data() {
        return {
            instructionText: "Please Login or Signup to continue",
            loginHelp: "",
            passwordHelp: "",

            form: {
                fullname: null,
                email: null,
                password: null,
            },

            isLoading: false,
        };
    },

    computed: {
        isValidLoginInfo() {
            return this.form.email !== null && this.form.password !== null;
        },
        isValidSignupInfo() {
            return (
                this.form.fullname !== null &&
                this.form.email !== null &&
                this.form.password !== null
            );
        },
    },

    methods: {
        changeInstructionText(action) {
            // console.log(action.toLowerCase());

            action.toLowerCase() == "login"
                ? (this.instructionText = "Please Login")
                : (this.instructionText = "Please Signup");
        },

        login() {
            this.isLoading = true;
            $(".login .spinner-border").show();

            fbase
                .auth()
                .signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(() => {
                    // $("#loginModal").modal("hide");

                    setTimeout(() => {
                        this.$router.replace("/feedback");
                        this.isLoading = false;
                    }, 700);
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    $(".login .spinner-border").hide();

                    // auth/user-not-found
                    if (errorCode == "auth/wrong-password") {
                        setTimeout(() => {
                            alert(errorMessage);
                        }, 700);
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
        },

        registerUser() {
            this.isLoading = true;
            $(".signup .spinner-border").show();

            fbase
                .auth()
                .createUserWithEmailAndPassword(
                    this.form.email,
                    this.form.password
                )
                .then(() => {
                    // $("#loginModal").modal("hide");

                    // clear field only when its successful
                    this.resetFormData();
                    setTimeout(() => {
                        this.$router.replace("/feedback");
                        this.isLoading = false;
                    }, 700);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    $(".signup .spinner-border").hide();

                    if (errorCode == "auth/weak-password") {
                        setTimeout(() => {
                            this.passwordHelp = `
                                The password is too weak! ${errorMessage}.
                            `;
                        }, 700);
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });

            // this.form = {
            //     fullname: null,
            //     email: null,
            //     password: null,
            // };
        },
    },
};
</script>

<style scoped lang="scss">
main .logo_container {
    max-width: 73px;
    margin: -40px auto 35px;
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
    margin-top: 1.25rem;
    background: transparent;
    color: var(--customBlueLight);
    border-color: var(--customBlue);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

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

    span.spinner-border {
        display: none;
        font-size: 0.75rem;
        width: 0.875rem;
        height: 0.875rem;
        margin-left: 0.5rem;
        vertical-align: text-bottom;
    }
}
</style>
