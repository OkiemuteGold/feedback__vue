<template>
    <div id="app">
        <router-view />
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
    // font-family: "Raleway", sans-serif;
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    color: var(--customText);
    overflow-x: hidden;

    hr {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
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

    input[type="radio"] {
        accent-color: var(--customBlueLight);
        width: 0.875rem;
        height: 0.875rem;
    }

    input[type="radio"] {
        width: 1rem;
        height: 1rem;
        border-radius: 0.25rem;
        -webkit-appearance: none;
        appearance: none;
        display: grid;
        place-content: center;

        font: inherit;
        border: 0.075rem solid rgba(105, 105, 105, 0.5);
    }

    input[type="radio"]::before {
        content: "";
        width: 0.75rem;
        height: 0.45rem;
        border-left: 0.15rem solid var(--customBlueLight);
        border-bottom: 0.15rem solid var(--customBlueLight);
        border-radius: 0.125rem;
        transform: scale(0);
        /* for checkmark shape
            transform-origin: bottom left;
            clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        */
        transition: 120ms transform ease-in-out;
    }

    input[type="radio"]:focus,
    input[type="radio"]:checked {
        background: rgba(105, 105, 105, 0.3);
        border-color: transparent;
        outline: max(0rem, 0.015rem) solid rgba(105, 105, 105, 0.3);
        outline-offset: max(0rem, 0.125rem);
    }

    input[type="radio"]:focus {
        outline-offset: max(0rem, 0.15rem);
    }

    input[type="radio"]:checked::before {
        transform: scale(1) rotate(-30deg) translate(1px, -1.5px);
        animation: checkMark 0.65s ease-in-out;
    }

    @keyframes checkMark {
        from {
            height: 0.45rem;
            width: 0rem;
        }
        to {
            height: 0.45rem;
            width: 0.75rem;
        }
    }
}

::-webkit-scrollbar,
::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb,
.record_action_buttons .btn span,
.logoutBtn,
#regForm,
input,
textarea,
button {
    -o-transition: 0.4s ease;
    -moz-transition: 0.4s ease;
    -webkit-transition: 0.4s ease;
    transition: 0.4s ease;
}

// input:focus,
button:focus,
.btn:active,
.btn:focus {
    box-shadow: none !important;
}

p {
    color: var(--customParaText);
}

img,
svg {
    max-width: 100%;
    height: auto;
}

svg {
    vertical-align: middle;
}
</style>
