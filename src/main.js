import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import jQuery from 'jquery'
import { fbase } from './firebase'
import VueFirestore from 'vue-firestore'
import Pagination from 'vue-pagination-2';

window.$ = window.jQuery = jQuery;

import "popper.js";
import "bootstrap";
import "./assets/styles/app.scss";

import ScrollAnimation from "./directives/scroll_animation"
Vue.directive("scroll_animation", ScrollAnimation);

// Vue.filter("stripHTML", function (value) {
//     const div = document.createElement("div")
//     div.innerHTML = value
//     const text = div.textContent || div.innerText || ""
//     return text
// });

Vue.use(VueFirestore);
Vue.component('pagination', Pagination);

Vue.config.productionTip = false

let app;
fbase.auth().onAuthStateChanged(function () {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})


