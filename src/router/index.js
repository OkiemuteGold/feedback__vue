import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Admin from '../views/Admin.vue'
import UserLogin from '../views/UserLogin.vue'
import Feedback from '../views/Feedback.vue'

// import Overview from '../admin-pages/Overview.vue'
// import Products from '../admin-pages/Products.vue'
// import Orders from '../admin-pages/Orders.vue'
// import Settings from '../admin-pages/Settings.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
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
    {
        path: '/user-login',
        name: 'UserLogin',
        component: UserLogin,
    },
    {
        path: '/feedback',
        name: 'Feedback',
        component: Feedback,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '*',
        name: 'UserLogin',
        component: UserLogin,
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
        next("/user-login");
    } else if (requiresAuth && currentUser) {
        next();
    } else {
        next();
    }
})

export default router
