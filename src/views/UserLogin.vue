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
                            <div id="passwordHelp" class="form-text">
                                Password must be 8-20 characters long, and must
                                contain letters and numbers.
                            </div>
                        </div>

                        <div class="mb-3 form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="rememberCheck"
                            />
                            <label class="form-check-label" for="rememberCheck"
                                >Remember me</label
                            >
                        </div>

                        <button
                            type="submit"
                            class="btn"
                            @click.prevent="login"
                        >
                            Login
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
                            <div id="emailHelp" class="form-text">
                                We'll never share your email with anyone else.
                            </div>
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
                                Password must be 8-20 characters long, and must
                                contain letters and numbers.
                            </div>
                        </div>

                        <div class="mb-3 form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                id="agreeCheck"
                            />
                            <label class="form-check-label" for="agreeCheck"
                                >Agree to terms and conditions</label
                            >
                        </div>

                        <button
                            type="submit"
                            class="btn"
                            @click.prevent="registerUser"
                        >
                            Signup
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
            instructionText: "Please LOGIN or SIGNUP to continue",

            form: {
                fullname: null,
                email: null,
                password: null,
            },
        };
    },

    methods: {
        changeInstructionText(action) {
            // console.log(action.toLowerCase());

            action.toLowerCase() == "login"
                ? (this.instructionText = "Please Login")
                : (this.instructionText = "Please Signup");
        },

        login() {
            fbase
                .auth()
                .signInWithEmailAndPassword(this.form.email, this.form.password)
                .then(() => {
                    $("#loginModal").modal("hide");
                    this.$router.replace("/feedback");
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === "auth/wrong-password") {
                        alert("Wrong password.");
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
        },

        registerUser() {
            fbase
                .auth()
                .createUserWithEmailAndPassword(
                    this.form.email,
                    this.form.password
                )
                .then(() => {
                    $("#loginModal").modal("hide");
                    // clear field only when its successful
                    this.resetFormData();
                    this.$router.replace("feedback");
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == "auth/weak-password") {
                        alert("The password is too weak.");
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
.user-login {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #152733;
    overflow: hidden;
}

main {
    max-width: 700px;
    padding: 50px 60px;
    background: #0f202c;
    color: #fff;
    border-radius: 3px;
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
        font-size: 16px;
    }
}

.nav-pills .nav-link {
    text-transform: uppercase;
    color: var(--customBlue);

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
