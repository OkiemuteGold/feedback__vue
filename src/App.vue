<template>
    <div id="app">
        <transition name="page" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;700&display=swap');

:root {
    --appBackgroundLight: #152733;
    --appBackgroundDark: #0f202c;
    --customBlue: #2c84a7;
    --customBlueLight: #39aad6;
    --errorColor: #dc3545;
    --customSectionBg: #f1f1f1;
    --customParaText: #737373;
    --customText: #2c3e50;
}

*,
body {
    margin: 0;
    padding: 0;
}

#app {
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    color: var(--customText);
    overflow-x: hidden;

    .page-enter,
    .page-leave-to {
        opacity: 0;
        transform: translateY(-30px);
    }

    .page-enter-active,
    .page-leave-active {
        transition: all 0.3s ease;
    }

    .page-enter-to,
    .page-leave {
        opacity: 1;
        transform: translateY(0);
    }

    ::-webkit-scrollbar,
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-thumb,
    .record_action_buttons .btn span,
    .logoutBtn,
    #regForm,
    #audioForm .labels label,
    input,
    textarea,
    button {
        -o-transition: 0.4s ease;
        -moz-transition: 0.4s ease;
        -webkit-transition: 0.4s ease;
        transition: 0.4s ease;
    }

    /* scrollbar */
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #bbb;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #9a9a9a;
    }

    input,
    input::placeholder {
        color: var(--appBackgroundLight) !important;
    }

    .user-login {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: var(--appBackgroundLight);
        overflow: hidden;

        main {
            max-width: 700px;
            padding: 50px 60px;
            margin: 2rem 1rem;
            background: var(--appBackgroundDark);
            color: #fff;
            border-radius: 0.25rem;
            position: relative;
            overflow-y: auto;

            @media screen and (max-width: 426px) {
                & {
                    margin: 0;
                    padding: 70px 20px 50px;
                    height: 100%;
                    width: 100%;

                    .logo_container {
                        margin-top: -70px;
                        margin-left: -18px;
                    }
                }
            }
        }

        .welcome-text {
            padding-bottom: 20px;
            text-align: center;

            h1 {
                font-size: 35px;
                text-shadow: 0.5px 0.75px 2px var(--customParaText);
                letter-spacing: 0.5px;
            }

            p {
                color: #fff;
                font-size: 1rem;
            }

            @media screen and (max-width: 426px) {
                & h1 {
                    font-size: 28px;
                }
                & p {
                    font-size: 15px;
                }
            }
        }

        .tab-content {
            text-transform: capitalize;
            margin-top: 1.75rem;
        }

        form {
            input,
            input::placeholder {
                font-size: 14px;
            }

            .form-text {
                color: #bbb;
                font-style: italic;
                font-size: 13px;
                margin-top: 10px;
            }
        }

        .form-check-input:checked {
            background-color: var(--customBlue);
            border-color: var(--customBlue);
        }

        .back_to_submit_feedback,
        .view_all_feedback {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 8%;
            right: 2%;

            .btn {
                font-size: 12px;
                background: var(--customBlue);
                color: #fff;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;

                &:hover {
                    background: var(--appBackgroundLight);
                }
            }
        }
    }

    // input:focus,
    button:focus,
    .btn:active,
    .btn:focus {
        box-shadow: none !important;
    }

    // p {
    //     color: var(--customParaText);
    // }

    img,
    svg {
        max-width: 100%;
        height: auto;
    }

    svg {
        vertical-align: middle;
    }

    hr {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }

    // pagination
    @import "@/assets/styles/_radioInputs.scss";
    @import "@/assets/styles/_pagination.scss";
}
</style>
