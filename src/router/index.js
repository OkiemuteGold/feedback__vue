import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Admin from '../views/Admin.vue'
// import UserLogin from '../views/UserLogin.vue'
import SubmitFeedback from '../views/SubmitFeedback.vue'
import Feedbacks from '../views/Feedbacks.vue'

// import Overview from '../admin-pages/Overview.vue'
// import Products from '../admin-pages/Products.vue'
// import Orders from '../admin-pages/Orders.vue'
// import Settings from '../admin-pages/Settings.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: "Home page",
            metaTags: [
                {
                    name: "description",
                    content:
                        "Home page of feedback form",
                },
                {
                    property: "og:description",
                    content: "Home page of feedback form",
                },
            ],
        },
    },
    // {
    //     path: '/admin',
    //     name: 'Admin',
    //     component: Admin,
    //     meta: {
    //         requiresAuth: true,
    //     },

    //     children: [
    //         {
    //             path: 'overview',
    //             name: 'Overview',
    //             component: Overview,
    //         },
    //         {
    //             path: 'products',
    //             name: 'Products',
    //             component: Products,
    //         },
    //         {
    //             path: 'orders',
    //             name: 'Orders',
    //             component: Orders,
    //         },
    //         {
    //             path: 'settings',
    //             name: 'Settings',
    //             component: Settings,
    //         },
    //     ]
    // },

    // {
    //     path: '/user-login',
    //     name: 'UserLogin',
    //     component: UserLogin,
    // },
    {
        path: '/submit-feedback',
        name: 'SubmitFeedback',
        component: SubmitFeedback,
        meta: {
            requiresAuth: true,
            title: "Submit feedback form page",
            metaTags: [
                {
                    name: "description",
                    content:
                        "Submit feedback form page to collect all consumers feedbacks",
                },
                {
                    property: "og:description",
                    content: "Submit feedback form page to collect all consumers feedbacks",
                },
            ],
        },
    },
    {
        path: '/feedbacks',
        name: 'Feedbacks',
        component: Feedbacks,
        meta: {
            requiresAuth: true,
            title: "Feedbacks page",
            metaTags: [
                {
                    name: "description",
                    content:
                        "Feedbacks page for all consumers feedbacks collected",
                },
                {
                    property: "og:description",
                    content: "Feedbacks page for all consumers feedbacks collected",
                },
            ],
        },
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

import { fbase } from "../firebase"

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const currentUser = fbase.auth().currentUser;

    // this route requires auth, user is not registered
    if (requiresAuth && !currentUser) {
        next("/");
    } else if (requiresAuth && currentUser) {
        next();
    } else {
        next();
    }
})

export default router
