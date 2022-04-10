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
}

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
