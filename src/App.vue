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
    --customYellow: #ffc107;
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
}

#regForm,
input,
textarea,
button {
    -o-transition: 0.4s ease;
    -moz-transition: 0.4s ease;
    -webkit-transition: 0.4s ease;
    transition: 0.4s ease;
}

.product .quillWrapper .ql-snow.ql-toolbar {
    display: none;
}
.product .ql-container.ql-snow {
    border: 1px solid #ccc !important;
}
.ql-editor {
    font-size: 14px !important;
}

p {
    color: var(--customParaText);
}

tbody tr td.description p {
    margin-bottom: 0;
    color: var(--customText);
}

#nav {
    // padding: 30px;

    a {
        font-weight: bold;
        color: var(--customText);

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.btn:active,
.btn:focus {
    box-shadow: none !important;
}

.side-content-shadow {
    border-radius: 0 20px 20% 5%;
    box-shadow: 0px 20px 0px #fafafa;
}

img {
    max-width: 100%;
    height: auto;
}

.title {
    margin-bottom: 30px;
    text-transform: capitalize;
}

.section-padd {
    padding-top: 100px;
    padding-bottom: 100px;
}

.section-padd-70 {
    padding-top: 70px;
    padding-bottom: 70px;
}

.section-padd-40 {
    padding-top: 40px;
    padding-bottom: 40px;
}

.no-top {
    padding-top: 0;
}
.no-bottom {
    padding-bottom: 0;
}
</style>
